import React, { useEffect, useState } from "react";
import "../newarticle/newarticle.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../../components/form/Formcontrol/FormControl";
import Button from "../../../../components/form/button/Button";
import ReactQuill from "react-quill";
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { showTag } from "../../../../store/admin/tagSlice";
import { ShowCategory } from "../../../../store/admin/categorySlice";
import {
  getArticleById,
  updateArticle,
} from "../../../../store/admin/articleSlice";
import { ToastContainer } from "react-toastify";
import LoaderButton from "../../../../components/loaderButton/LoaderButton";
import { useParams } from "react-router";
import decrypt from "../../../../services/crypto/decrypt";

const UpdateArticle = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");
  const [category, setCategory] = useState(true);
  const initialValues = {
    title: "",
    category_id: "",
    tag: [],
  };
  useEffect(() => {
    dispatch(showTag());
    dispatch(getArticleById({ id: decrypt(id) }))
      .unwrap()
      .then((data) => {
        setDescription(data.data.description);
      })
      .catch(() => {});
  }, [dispatch, id]);

  console.log("render");

  const validationSchema = yup.object({
    title: yup.string().required("Email Required"),
    category_id: yup.string().required("Select category Required"),
    tag: yup.array().min(1),
  });

  const dropCategoryApi = () => {
    if (category) {
      dispatch(ShowCategory());
      setCategory(false);
    }
  };

  const onSubmit = (values) => {
    if (description.length > 40) {
      let data = { ...values, id: decrypt(id), description };
      dispatch(updateArticle(data));
      setError("");
    } else {
      setError("description field required and need more 40 letters");
    }
  };
  return (
    <div className="new-article">
      <div className="top">
        <h3> UPDATE ARTICLE</h3>
      </div>
      <Formik
        initialValues={globalState.article.article || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className="container">
              <div className="bottom">
                <div className="left">
                  <FormControl
                    control="input"
                    type="text"
                    label="Title article"
                    name="title"
                  />

                  <FormControl
                    control="select"
                    label="Select Category"
                    name="category_id"
                    options={globalState.category.categories}
                    onClick={dropCategoryApi}
                  />

                  <FormControl
                    control="selectTag"
                    label="Select Tag"
                    name="tag"
                    realData={globalState.article.article?.tag}
                    options={globalState.tag.tags}
                  />
                  <div className="text-editor">
                    <div>Description for article</div>
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                    />
                    <div style={{ color: "red", marginTop: "40px" }}>
                      {error}
                    </div>
                  </div>
                </div>
              </div>
              <div className="button">
                <Button
                  disabled={globalState.article.loader}
                  className="button"
                >
                  {globalState.article.loader ? <LoaderButton /> : "Send"}
                </Button>
              </div>
              <ToastContainer />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
export default UpdateArticle;
