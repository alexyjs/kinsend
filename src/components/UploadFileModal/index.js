import { Button, Col, Form, Modal, Row } from "antd";
import React, { useState } from "react";
import { notification } from "antd";

import { UploadFileIcon } from "./../../assets/svg";
import { handleUploadImageCallAPI } from "../../redux/helpers";

import "./styles.less";

const UploadFileModal = ({ visible, handleOk, handleCancel, onFileChange }) => {
  const [files, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const inputFileRef = React.useRef();
  // drag state
  const [dragActive, setDragActive] = React.useState(false);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files);
      const file = e.dataTransfer.files[0];
      const filename = file.name;
      console.log("###handleDrop", file, filename);
    }
  };

  const hanldeFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files);
    }
  };

  const onFinish = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0], files[0].name);

    handleUploadImageCallAPI(formData)
      .then((res) => {
        notification.success({
          title: "Action Completed",
          message: `Upload file sucessfully.`,
        });
        handleOk({
          url: res,
          name: files[0].name,
        });
      })
      .catch((err) => {
        notification.error({
          title: "Action failed",
          message: err || `Upload file failed`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      key="UploadFileModal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      className="uploadfile-modal"
    >
      <h3 className="font-bold text-center text-2xl mb-9">
        Select Files to Upload
      </h3>
      <Form
        id="upload-file-form-modal"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          className="flex justify-center items-center flex-col dirdrag-drop-label cursor-pointer"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {files && files[0]?.name ? (
            <>
              <UploadFileIcon />
              <b>{files[0]?.name}</b>
            </>
          ) : (
            <>
              <UploadFileIcon />
              <p>Drag and drop or browse to choose a file</p>
            </>
          )}
          <input
            className="hidden upload-file-input"
            type="file"
            ref={inputFileRef}
            onChangeCapture={hanldeFileChange}
          />
        </label>
      </Form>
      <Row justify="space-around" className="mt-12">
        <Col>
          <Form.Item noStyle>
            <Button
              className="md:min-w-200"
              type="primary"
              size="large"
              onClick={handleCancel}
              block
              disabled={loading}
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
              onClick={onFinish}
              disabled={loading}
            >
              Upload
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default UploadFileModal;
