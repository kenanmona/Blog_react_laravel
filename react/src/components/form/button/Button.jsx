import "./button.scss";

const Button = ({ children, disabled }) => {
  return (
    <>
      <button type="submit" disabled={disabled}>
        {children}
      </button>
    </>
  );
};

export default Button;
