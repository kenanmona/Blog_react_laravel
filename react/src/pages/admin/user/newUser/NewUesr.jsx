import React from "react";
import "./newUser.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";

const NewUser = () => {
  const dropDown = [
    { key: "select item form list ", value: "" },
    { key: "option 1", value: "1" },
    { key: "option 2", value: "2" },
    { key: "option 3", value: "3" },
  ];
  const radioOptions = [
    { key: "option 1", value: "1" },
    { key: "option 2", value: "2" },
    { key: "option 3", value: "3" },
  ];

  const checkOptions = [
    { key: "option1y", value: "1w" },
    { key: "option2h", value: "2w" },
    { key: "option3b", value: "3w" },
  ];

  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkOption: [],
    file: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email Required"),
    description: yup.string().required("Description Required"),
    selectOption: yup.string().required("Select Item Required"),
    radioOption: yup.string().required("Select Item Required"),
    checkOption: yup.array().min(1),
    file: yup
      .mixed()
      .required("File Required")
      .test(
        "Fichier taille",
        "cannot upload file",
        (value) => !value || (value && value.size <= 1024 * 2)
      ),
  });
  const onSubmit = (values) => {
    console.log("data", values);
  };

  return (
    <div className="new-user">
      <div className="top">
        <h3> ADD NEW ARTICLE</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="container">
              <div className="bottom">
                <div className="left">
                  <FormControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                  />
                  <FormControl
                    control="select"
                    label="Select Topic"
                    name="selectOption"
                    options={dropDown}
                  />
                  <FormControl
                    control="checkbox"
                    label="CheckBox Topic"
                    name="checkOption"
                    options={checkOptions}
                  />
                </div>
                <div className="right">
                  <FormControl
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                  <FormControl
                    control="radio"
                    label="Radio Topic"
                    name="radioOption"
                    options={radioOptions}
                  />
                  <FormControl
                    control="file"
                    label="File Topic"
                    name="file"
                    formik={formik}
                  />
                </div>
              </div>
              <div className="button">
                <Button>send</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewUser;
