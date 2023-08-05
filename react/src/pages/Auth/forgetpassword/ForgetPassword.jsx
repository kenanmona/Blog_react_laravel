import React from "react";
import "./forgetpassword.scss";
import FormControl from "../../../components/form/Formcontrol/FormControl";
import Button from "../../../components/form/button/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import LoaderButton from "../../../components/loaderButton/LoaderButton";
import { forgetPasswordUser } from "../../../store/user/forgetPasswordSlice";
import ToastStyle from "../../../components/toaststyle/ToastStyle";

const ForgetPassword = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email Required"),
  });
  const onSubmit = (values) => {
    dispatch(forgetPasswordUser(values))
      .unwrap()
      .then((props) => {
        toast(
          <ToastStyle
            icon={true}
            result={"success send email... visit it to change password"}
          />
        );
      })
      .catch((err) => {
        toast(<ToastStyle icon={true} result={err.error} />);
      });
  };

  return (
    <div className="forgetpassword">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <Button>
              {globalState.forgetPassword.loader ? <LoaderButton /> : "Send"}
            </Button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
