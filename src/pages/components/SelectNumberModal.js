import { Button, Col, Form, Modal, Row } from "antd";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputPhone, PhoneList } from ".";
import { getListPhoneAsync, selectPhones } from "../../redux/phoneReducer";
import { phoneRequireValidator, phoneValidator } from "../../utils";
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

  useEffect(() => {
    dispatch(getListPhoneAsync());
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
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
            console.log("hpne nunber", getFieldValue("phoneNumber"));
            return (
              <Form.Item
                name="phoneNumber"
                label="Phone"
                rules={[phoneRequireValidator, phoneValidator]}
              >
                <InputPhone placeholder="Enter your phone" />
              </Form.Item>
            );
          }}
        </Form.Item>
        <div className="my-6">
          <p className="text-base text-primary text-center ">
            How about any of these numbers?
          </p>

          <PhoneList listPhone={listPhone} onSelectPhone={handleSelectPhone} />
        </div>

        <Row justify="end" className="mt-6">
          <Col>
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
          </Col>
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
