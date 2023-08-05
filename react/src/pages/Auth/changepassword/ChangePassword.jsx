import React from "react";
import "./changepassword.scss";
import FormControl from "../../../components/form/Formcontrol/FormControl";
import Button from "../../../components/form/button/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import LoaderButton from "../../../components/loaderButton/LoaderButton";
import { changePasswordUser } from "../../../store/user/changePasswordSlice";
import { useSearchParams } from "react-router-dom";
import ToastStyle from "../../../components/toaststyle/ToastStyle";

const ChangePassword = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const [query] = useSearchParams();
  const email = query.get("email");

  const initialValues = {
    email: email,
    password: "",
    password_confirmation: "",
    token: token,
  };

  const validationSchema = yup.object({
    email: yup.string().required("Email Required"),
    password: yup.string().required("Password Required"),
    password_confirmation: yup
      .string()
      .label("Confirm Password")
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = (values) => {
    dispatch(changePasswordUser(values))
      .unwrap()
      .then((props) => {
        toast(<ToastStyle icon={true} result={"success change password"} />);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((err) => {
        toast(
          <ToastStyle
            icon={false}
            result={
              err === 422 ? "Try Again And Check Your Information" : "Try Again"
            }
          />
        );
      });
  };
  return (
    <div className="change-password">
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
            <FormControl
              control="input"
              type="password"
              label="New Passsword"
              name="password"
            />
            <FormControl
              control="input"
              type="password"
              label="Confirm Password"
              name="password_confirmation"
            />
            <Button>
              {globalState.changePassword.loader ? <LoaderButton /> : "Send"}
            </Button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
