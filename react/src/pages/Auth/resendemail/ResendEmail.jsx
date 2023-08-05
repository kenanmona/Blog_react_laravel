import React from "react";
import "./resendEmail.scss";
import FormControl from "../../../components/form/Formcontrol/FormControl";
import Button from "../../../components/form/button/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { resendEmailUser } from "../../../store/user/resendEmail";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import LoaderButton from "../../../components/loaderButton/LoaderButton";

const ResendEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);

  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email Required"),
  });
  const onSubmit = (values) => {
    dispatch(resendEmailUser(values))
      .unwrap()
      .then((props) => {
        toast(
          <div>
            <SentimentSatisfiedAltIcon
              color="success"
              style={{ fontSize: "40px" }}
            />{" "}
            Success
          </div>
        );
        console.log("props then", props);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((err) => {
        toast(
          <div>
            <SentimentVeryDissatisfiedIcon
              style={{ fontSize: "40px", color: "red" }}
            />
            {err === "Request failed with status code 422"
              ? "you need to verify email account"
              : ""}
          </div>
        );
        console.log("error catch", err);
      });
  };

  return (
    <div className="resend-email">
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
              {globalState.resendEmail.loader ? <LoaderButton /> : "Send"}
            </Button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResendEmail;
