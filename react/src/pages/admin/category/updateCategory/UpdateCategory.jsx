import React from "react";
import "../newCategory/newCategory.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../../store/admin/categorySlice";
import { ToastContainer } from "react-toastify";
import LoaderButton from "../../../../components/loaderButton/LoaderButton";
import { useParams } from "react-router";
import decrypt from "../../../../services/crypto/decrypt";

const UpdateCategory = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialValues = {
    name: "",
    id: decrypt(id),
  };
  const validationSchema = yup.object({
    name: yup.string().required("Category Required"),
  });
  const onSubmit = (values) => {
    dispatch(updateCategory(values));
    values.name = "";
  };

  return (
    <div className="new-category">
      <div className="top">
        <h3> Update CATEGORY</h3>
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
                  {globalState.category.loader ? <LoaderButton /> : "Update"}
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

export default UpdateCategory;
