import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import './CustomField.scss';

const CustomField = Element => ({register, title, name, errors, ...rest}) => {

   return (
        <div className='field__group'>
            <div className='field__group_heading'>{title}</div>
            <Element {...rest} {...register(name)} />

            <span>
            <ErrorMessage errors={errors} name={name}/>
        </span>
        </div>
    )
}

export default CustomField;