import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../error/TextError'
import './radio.scss'

const Radio = (props) => {
    const {name,label,options , ...rest} = props
  return (
    <div className='radio'>
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
                    <div className='radioContent'>
                    <input 
                        type='radio'
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
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

export default Radio
