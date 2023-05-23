import React from 'react';
import cn from '../../../lib/classNames'

const Input = (props) => {
    const { className, onChange, ...rest } = props;

    const rootClassName = cn(className, "form-control")

    const handleOnChange = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
        return null
    }

    return (
        <input 
            className={rootClassName}
            onChange={handleOnChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
        />
    )
 }

 export default Input;
