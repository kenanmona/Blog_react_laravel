import "./select.scss";
import { Field, ErrorMessage } from "formik";
import TextError from "../error/TextError";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="select">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
};

export default Select;
