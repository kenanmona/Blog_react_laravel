import React from "react";
import "./register.scss";
import FormControl from "../../../components/form/Formcontrol/FormControl";
import Button from "../../../components/form/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import constant from "../../../services/const/const";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/user/registerSlice";
import { toast, ToastContainer } from "react-toastify";
import LoaderButton from "../../../components/loaderButton/LoaderButton";
import ToastStyle from "../../../components/toaststyle/ToastStyle";

const Register = () => {
  const { SIZE_FILE } = constant();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("Name Required"),
    email: yup.string().required("Email Required"),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    password_confirmation: yup
      .string()
      .label("Confirm Password")
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    image: yup
      .mixed()
      .test(
        "Fichier taillr",
        "cannot upload file",
        (value) => !value || (value && value.size <= SIZE_FILE)
      ),
  });
  const onSubmit = (values) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("password_confirmation", values.password_confirmation);
    if (values.image.length !== 0) {
      data.append("image", values.image);
    }
    dispatch(registerUser(data))
      .unwrap()
      .then((result) => {
        toast(
          <ToastStyle
            icon={true}
            result={"success register go to your email for verfication "}
          />
        );
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        toast(<ToastStyle icon={false} result={"try again data invalid"} />);
      });
  };
  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormControl control="input" type="name" label="Name" name="name" />
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
            <FormControl
              control="input"
              type="password"
              label="password_confirmation"
              name="password_confirmation"
            />
            <FormControl
              control="file"
              label="Your Image"
              name="image"
              formik={formik}
            />
            <Button>
              {" "}
              {globalState.register.loader ? <LoaderButton /> : "Sign Up"}
            </Button>
            <ToastContainer />
            <span>
              If you have an account ,
              <NavLink to="/login"> click here </NavLink>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
