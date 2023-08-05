import "./textarea.scss"
import { Field,ErrorMessage } from "formik"
import TextError from "../error/TextError";
const TextArea = (props) => {
    const {name ,label , ...rest} = props;
  return (
    <div className="textarea">
      <Field as='textarea' id={name} name={name} {...rest} />
      <label htmlFor={name}>{label}</label>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default TextArea
