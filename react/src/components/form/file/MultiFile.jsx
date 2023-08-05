import React from "react";
import "./file.scss";
import { ErrorMessage } from "formik";
import TextError from "../error/TextError";
import load from "../../../services/loading/load";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import constant from "../../../services/const/const";
const MultiFile = (props) => {
  const { label, name, formik, ...rest } = props;
  //   const { SIZE_FILE } = constant();
  const handleFile = (event) => {
    console.log(event.target.files);
    formik.setFieldValue("image", event.target.files);
    let progress = document.querySelector(".load");
    let result = document.querySelector(".result");
    document.querySelector(
      ".namefile"
    ).innerHTML = `${event.target.files.length} files to upload`;
    load(result, progress);
    // if (event.target.files[0].size <= SIZE_FILE) {
    // } else {
    //   document.querySelector(".namefile").innerHTML =
    //     "must upload file under 2 MB";
    // }
  };
  const open = () => {
    let area = document.querySelector("#file");
    area.click();
  };

  return (
    <div className="file">
      <label htmlFor={name}>{label}</label>
      {/* area upload file */}
      <div onClick={open} className="form">
        <CloudUploadIcon className="icon" />
        <p className="namefile">Browse File To Upload</p>
        <input
          type="file"
          id="file"
          name={name}
          onChange={handleFile}
          {...rest}
          hidden
          multiple
        />
      </div>

      <ErrorMessage name={name} component={TextError}></ErrorMessage>
      {/*progress Bar*/}
      <div className="result"></div>
      <div className="progress">
        <span className="load"></span>
      </div>
    </div>
  );
};

export default MultiFile;
