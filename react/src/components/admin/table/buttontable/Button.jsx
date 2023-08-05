import LoaderButton from "../../../loaderButton/LoaderButton";
import "./button.scss";
const Button = ({ crudButton, backgroundColor, children, load }) => {
  return (
    <div
      className="button-list"
      onClick={crudButton}
      style={{ backgroundColor: backgroundColor }}
    >
      {load ? <LoaderButton className="icon-without-animation" /> : children}
    </div>
  );
};

export default Button;
