import React from "react";
import {ErrorMessage} from "@hookform/error-message";

// eslint-disable-next-line react/prop-types
export const ConditionalInput = React.forwardRef(({value, index, errors, ...props}, ref) => {
    const inputValue = typeof value === 'string' ? value : '';

    return <div style={{width: 300}}>
        <input ref={ref} {...props} value={inputValue}/>
        <ErrorMessage errors={errors} name={`tags[${index}]`} render={({message}) => <div key={index} className='display-block errors'>{message}</div>}/>
    </div>
});