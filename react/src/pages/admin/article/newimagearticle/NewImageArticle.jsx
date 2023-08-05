import React from "react";
import "./newimagearticle.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createImagesArticle } from "../../../../store/admin/articleSlice";
import { ToastContainer } from "react-toastify";
import LoaderButton from "../../../../components/loaderButton/LoaderButton";
import { useParams } from "react-router";
import decrypt from "../../../../services/crypto/decrypt";

const NewImageArticle = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const { article } = useParams();
  const initialValues = {
    image: [],
  };

  const validationSchema = yup.object({
    image: yup.mixed(),
  });

  const onSubmit = (values) => {
    // console.log([values.image[0], values.image[1]]);
    let data = new FormData();
    if (values.image.length !== 0) {
      Array.from(values.image).forEach((element) => {
        data.append("image[]", element);
      });
      data.append("article_id", decrypt(article));
      dispatch(createImagesArticle(data));
    }
  };
  return (
    <div className="new-image-article">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormControl
              control="multiFile"
              label="Enter Images For Article"
              name="image"
              formik={formik}
            />
            <Button disabled={globalState.article.loader} className="button">
              {globalState.article.loader ? <LoaderButton /> : "Send"}
            </Button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewImageArticle;
