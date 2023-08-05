import CheckBox from "../checkbox/CheckBox";
import File from "../file/File";
import MultiFile from "../file/MultiFile";
import Input from "../input/Input";
import Radio from "../radio/Radio";
import Select from "../select/Select";
import SelectTag from "../select/SelectTag";
import TextArea from "../textarea/TextArea";
const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;

    case "select":
      return <Select {...rest} />;

    case "selectTag":
      return <SelectTag {...rest} />;

    case "radio":
      return <Radio {...rest} />;

    case "checkbox":
      return <CheckBox {...rest} />;

    case "file":
      return <File {...rest} />;

    case "multiFile":
      return <MultiFile {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
