import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadImage, createImage } from "model";
const { Dragger } = Upload;
export const UploadImage = () => {
  const dispatch = useDispatch();
  const image = useSelector(selectUploadImage);
  return (
    <div>
      <Dragger
        showUploadList={false}
        beforeUpload={(file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            dispatch(createImage(e.target.result));
          };
          reader.readAsDataURL(file);
          // Prevent upload
          return false;
        }}
        // {...props}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Загрузите изобржение блюда</p>
      </Dragger>
      <div style={{ marginTop: "20px" }}>
        {!!image ? (
          <img style={{ maxWidth: "100%", width: "30%" }} src={image} />
        ) : null}
      </div>
    </div>
  );
};
