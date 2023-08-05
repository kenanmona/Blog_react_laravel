import React from "react";
import "../../category/updateCategory/updateCategory.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import LoaderButton from "../../../../components/loaderButton/LoaderButton";
import { useParams } from "react-router";
import decrypt from "../../../../services/crypto/decrypt";
import { updateTag } from "../../../../store/admin/tagSlice";

const UpdateTag = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialValues = {
    name: "",
    normalized: "",
    id: decrypt(id),
  };
  const validationSchema = yup.object({
    name: yup.string().required("Tag Required"),
    normalized: yup.string().required("Normalized Required"),
  });
  const onSubmit = (values) => {
    dispatch(updateTag(values));
    values.name = "";
    values.normalized = "";
  };

  return (
    <div className="new-category">
      <div className="top">
        <h3>UPDATE TAG</h3>
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
                <div className="input-category">
                  <FormControl
                    control="input"
                    type="text"
                    label="Tag"
                    name="name"
                  />
                  <FormControl
                    control="input"
                    type="text"
                    label="Normalized"
                    name="normalized"
                  />
                </div>
                <Button disabled={globalState.tag.loader} className="button">
                  {globalState.tag.loader ? <LoaderButton /> : "Update"}
                </Button>
                <ToastContainer />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTag;
