import React from "react";
import "./login.scss";
import FormControl from "../../../components/form/Formcontrol/FormControl";
import Button from "../../../components/form/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/user/login";
import LoaderButton from "../../../components/loaderButton/LoaderButton";
import { toast, ToastContainer } from "react-toastify";
import ToastStyle from "../../../components/toaststyle/ToastStyle";

const Login = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email Required"),
    password: yup.string().required("Please Enter your password"),
    /* .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ) */
  });

  const onSubmit = (values) => {
    dispatch(loginUser(values))
      .unwrap()
      .then((props) => {
        toast(<ToastStyle icon={true} result={"success login"} />);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        toast(
          <ToastStyle
            icon={false}
            result={
              error === 422
                ? "data is invalid ... try again"
                : "alerdy login cannot do this"
            }
          />
        );
      });
  };
  return (
    <div className="login">
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
              label="password"
              name="password"
            />
            <Button disabled={globalState.login.loader}>
              {" "}
              {globalState.login.loader ? <LoaderButton /> : "Sign In"}
            </Button>
            <ToastContainer />
            <NavLink to="/resend-email">Resend Email</NavLink>
            <NavLink to="/forget-password">Forget password</NavLink>
            <span>
              If you not have an account ,
              <NavLink to="/register">click here</NavLink>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
