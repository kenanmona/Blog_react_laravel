import "./select.scss";
import { Field, ErrorMessage } from "formik";
import TextError from "../error/TextError";

const SelectTag = (props) => {
  const { label, name, options, realData, ...rest } = props;
  const checkElement = (option) => {
    return realData?.includes(option) ? "**" : "";
  };
  return (
    <div className="selectTag">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest} multiple={true}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
              {checkElement(option.name)}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
};

export default SelectTag;
