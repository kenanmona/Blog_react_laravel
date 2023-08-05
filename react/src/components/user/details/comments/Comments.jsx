import { Form, Formik } from "formik";
import React /* useState */ from "react";
import FormControl from "../../../form/Formcontrol/FormControl";
import * as yup from "yup";
import "./comments.scss";
import { addComment, deleteComment } from "../../../../store/user/detailsSlice";
import TelegramIcon from "@mui/icons-material/Telegram";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "react-reveal/Fade";

const Comments = ({ data, dispatch, article_id, isClicked, isLogged }) => {
  // const [clicked, setClicked] = useState("")
  const initialValues = {
    comment: "",
  };
  const validationSchema = yup.object({
    comment: yup.string().required("Comment Required"),
  });
  const onSubmit = (values) => {
    dispatch(addComment({ subject: values.comment, article_id }));
    values.comment = "";
  };

  return (
    <div className="comments">
      {data.map((comment) => {
        return (
          <Fade bottom>
            <div className="comment" key={comment.id}>
              <div className="left-section">
                <div className="profile-img">
                  <img src={comment.author.image} alt="" />
                </div>
              </div>
              <div className="right-section">
                <div className="info-comment">
                  <div className="auther-comment">{comment.author.name}</div>
                  <div className="date-comment">{comment.dates.created_at}</div>
                </div>
                <div className="subject-comment">{comment.content}</div>
              </div>
              {isLogged && (
                <div className="delete-comment">
                  <DeleteIcon
                    onClick={() =>
                      dispatch(deleteComment({ id: comment.id, article_id }))
                    }
                    className={`delete-icon ${isClicked ? " isClicked" : ""}`}
                  />
                </div>
              )}
            </div>
          </Fade>
        );
      })}

      <Fade bottom>
        <div className="add-comment">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="add-comment-form">
                <FormControl
                  control="input"
                  types="text"
                  label=""
                  name="comment"
                  placeholder="Add Commmet"
                />
                {isLogged && (
                  <button className="add-comment-button" type="submit">
                    <TelegramIcon />
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Fade>
    </div>
  );
};

export default Comments;
