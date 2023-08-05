import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../error/TextError'
import './checkbox.scss'

const CheckBox = (props) => {
    const {label , name, options , ...rest} = props
    return (
        <div className='checkbox'>
         <label >{label}</label>
          <Field name={name} {...rest}>
          {
            ({field})=>{
                return (
                    <div className='content'>
                    {
                    options.map(option=>
                    {
                    return (
                        <React.Fragment key={option.key}>
                        <div className='checkBoxContent'>
                        <input 
                            type='checkbox'
                            id={option.value}
                            {...field}
                            value={option.value}
                            checked={field.value.includes(option.value)}
                        />
                        <label htmlFor={option.value}>{option.key}</label>
                        </div>
                        </React.Fragment>
                    )
    
                })
                   }
                </div>
                )
    
            }
    
          }
          </Field>
        <ErrorMessage name={name} component={TextError}></ErrorMessage>
    
        </div>
      )
}

export default CheckBox
