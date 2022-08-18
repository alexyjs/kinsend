import { Button, Col, Form, Modal, Row, Input, Select, Divider } from "antd";
import React, { useEffect, useState } from "react";

import { DropdownReactSelect } from "../../../../components";

import "./styles.less";

const SendTestMessage = ({
  visible,
  handleOk,
  handleCancel,
  phoneOptions,
  dataSubmit,
}) => {
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleChangePhone = (value) => {
    setPhone(value);
  };

  const handleChangeFname = (e) => {
    setFname(e.target.value);
  };

  const handleChangeLname = (e) => {
    setLname(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
  };

  const handleSubmitPhone = () => {
    handleOk({
      phone,
      fname,
      lname,
      name,
      mobile,
    });
  };

  useEffect(() => {
    if (phone) {
      setFname(phone.firstName);
      setLname(phone.lastName);
      setName(phone.firstName + " " + phone.lastName);
      setMobile(phone.phoneNumber.phone);
    }
  }, [phone]);

  useEffect(() => {
    setFname("");
    setLname("");
    setName("");
    setMobile("");
  }, [dataSubmit]);

  useEffect(() => {
    setPhone(null);
    setFname("");
    setLname("");
    setName("");
    setMobile("");
  }, [visible]);

  return (
    <Modal
      key="SendTestMessage"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="SendTestMessage"
      width={840}
    >
      <h3 className="font-bold text-center text-2xl mb-9">Send a Test</h3>
      <p className="text-center pb-5">
        Send a test message to for formatting before sending to your audience.
        Enter test values for the merge fields you mentioned
      </p>
      <div>
        <label>Segment test message to :</label>
        <DropdownReactSelect
          data={phoneOptions}
          placeholder="Find a contact or enter a number"
          onChange={handleChangePhone}
          // value={phone}
          isSearchable
        />
      </div>
      {phone && (
        <>
          <label className="mt-3">Merge fields</label>
          {dataSubmit.message.includes("<fname>") && (
            <div className="SendTestMessage-merge-field mt-3">
              <div className="relative">
                <Input
                  value={fname}
                  placeholder="Enter dummy text..."
                  onChange={handleChangeFname}
                />
                <span>{`<fname>`}</span>
              </div>
            </div>
          )}
          {dataSubmit.message.includes("<lname>") && (
            <div className="SendTestMessage-merge-field mt-3">
              <div className="relative">
                <Input
                  value={lname}
                  placeholder="Enter dummy text..."
                  onChange={handleChangeLname}
                />
                <span>{`<lname>`}</span>
              </div>
            </div>
          )}
          {dataSubmit.message.includes("<name>") && (
            <div className="SendTestMessage-merge-field mt-3">
              <div className="relative">
                <Input
                  value={name}
                  placeholder="Enter dummy text..."
                  onChange={handleChangeName}
                />
                <span>{`<name>`}</span>
              </div>
            </div>
          )}
          {dataSubmit.message.includes("<mobile>") && (
            <div className="SendTestMessage-merge-field mt-3">
              <div className="relative">
                <Input
                  value={mobile}
                  placeholder="Enter dummy text..."
                  onChange={handleChangeMobile}
                />
                <span>{`<mobile>`}</span>
              </div>
            </div>
          )}
        </>
      )}

      <Row justify="space-around" className="mt-12">
        <Col>
          <Form.Item noStyle>
            <Button
              className="md:min-w-200"
              type="primary"
              size="large"
              onClick={handleCancel}
              block
            >
              Cancel
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item noStyle shouldUpdate>
            <Button
              className="md:min-w-200"
              type="primary"
              size="large"
              block
              onClick={handleSubmitPhone}
              disabled={!phone}
            >
              Schedule
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default SendTestMessage;
