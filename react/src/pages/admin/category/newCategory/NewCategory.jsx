import React from "react";
import "./newCategory.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../../store/admin/categorySlice";
import { ToastContainer } from "react-toastify";
import LoaderButton from "../../../../components/loaderButton/LoaderButton";

const NewCategory = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("Category Required"),
  });
  const onSubmit = (values) => {
    dispatch(createCategory(values));
    values.name = "";
  };

  return (
    <div className="new-category">
      <div className="top">
        <h3> ADD NEW CATEGORY</h3>
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
                    label="Category"
                    name="name"
                  />
                </div>
                <Button
                  disabled={globalState.category.loader}
                  className="button"
                >
                  {globalState.category.loader ? <LoaderButton /> : "Send"}
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

export default NewCategory;
