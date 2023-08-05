import { Field , ErrorMessage } from 'formik'
import TextError from '../error/TextError';
import './input.scss'
const Input = (props) => {
const {label ,name , ...rest} = props;
  return (
    <div className='input'>
     <Field id={name} name={name} {...rest}></Field>
     <label htmlFor={name}>{label}</label>
     <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  )
}

export default Input
