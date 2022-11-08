import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { InputPhone, PhoneList } from ".";
import { getListPhoneAsync, selectPhones } from "../redux/phoneReducer";
import {
  phoneRequireValidator,
  phoneValidator,
  removeEmptyObject,
} from "../utils";
import { useModal } from "../hook/useModal";
import NumberAddedModal from "./NumberAddedModal";

const mapTwilioPhoneToPhoneNumber = (twilioPhone) => {
  const { friendlyName, phoneNumber, isoCountry } = twilioPhone;
  const phone = _.replace(friendlyName, /\D/g, "");
  return {
    phone,
    short: isoCountry,
    code: _.replace(_.replace(phoneNumber, phone, ""), "+", ""),
  };
};
const SelectNumberModal = ({
  visible,
  handleOk,
  handleCancel,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { close, show, visible: numberAddedModalVisible } = useModal();
  const [listPhoneShow, setListPhoneShow] = useState([]);
  const { listPhone } = useSelector(selectPhones);
  const [form] = Form.useForm();

  const handleFinish = () => {
    show();
  };

  const handleSelectPhone = useCallback(
    (phone) => {
      form.setFieldsValue({
        phoneNumber: mapTwilioPhoneToPhoneNumber(phone),
      });
    },
    [form]
  );

  const handleOkAddedModal = () => {
    close();
    handleClose();
  };

  const handleOnChangePhoneNumber = () => {
    const phoneNumber = form.getFieldValue("phoneNumber");
    getData(phoneNumber);
  };

  const getData = (data) => {
    const lenPhone = data?.phone?.length;
    // console.log("###Get data query", data);
    dispatch(
      getListPhoneAsync(
        // lenPhone < 6 is limit to check area code. Need more information for this
        removeEmptyObject({
          location: data?.short || "",
          phoneNumber: lenPhone < 6 ? "" : data?.phone || "",
          // code: 1,
          limit: 20,
          areaCode: lenPhone < 6 ? data?.phone || "" : "",
        })
      )
    );
  };

  useEffect(() => {
    setListPhoneShow(listPhone);
  }, [listPhone]);

  useEffect(() => {
    getData({});
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      mask={false}
      maskClosable={false}
      keyboard={false}
      centered
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-6">
        Select your number
      </h3>

      <p className="text-base text-dark-gray text-center mb-6">
        Can't find the number you are looking for? We support Toll-Free and
        phone numbers of almost all countries.{" "}
        <span className="text-primary">Get in touch</span>
      </p>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        form={form}
        initialValues={{
          phoneNumber: {
            phone: undefined,
            code: 1,
            short: "US",
          },
        }}
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            console.log("Phone Number", getFieldValue("phoneNumber"));
            return (
              <Form.Item
                name="phoneNumber"
                label="Phone"
                rules={[phoneRequireValidator, phoneValidator]}
                onChange={handleOnChangePhoneNumber}
              >
                <InputPhone placeholder="Enter your phone" />
              </Form.Item>
            );
          }}
        </Form.Item>
        <div className={`my-6 ${listPhoneShow && listPhoneShow.length === 0 && "centered"}`}>
          {listPhoneShow && listPhoneShow.length === 0 ?
            <p className="text-base text-primary text-center ">
              No results. Please make sure you're only searching area codes.
            </p> :
            <p className="text-base text-primary text-center ">
              How about any of these numbers?
            </p>
          }

          {listPhoneShow && listPhoneShow.length === 0 ?
            <span></span> :
            <p className="text-base text-primary text-center ">
              <PhoneList
                listPhone={listPhoneShow}
                onSelectPhone={handleSelectPhone}
              />
            </p>
          }
        </div>

        <Row justify="end" className="mt-6">
          {/* <Col>
            <Form.Item noStyle>
              <Button
                className="md:min-w-200"
                type="text"
                size="large"
                onClick={handleCancel}
              >
                Back
              </Button>
            </Form.Item>
          </Col> */}
          <Col>
            <Form.Item noStyle shouldUpdate>
              <Button
                className="md:min-w-200"
                type="primary"
                size="large"
                htmlType="submit"
              // onClick={show}
              >
                Confirm
              </Button>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const phoneNumber = getFieldValue("phoneNumber");
                return (
                  <NumberAddedModal
                    handleCancel={close}
                    handleOk={handleOkAddedModal}
                    visible={numberAddedModalVisible}
                    phoneNumber={phoneNumber}
                  />
                );
              }}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SelectNumberModal;
