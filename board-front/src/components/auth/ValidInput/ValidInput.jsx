/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';

function ValidInput({
    type = "text", 
    name = "", 
    placeholder = "", 
    value, 
    onChange = null,
    onFocus = null,
    regexp = null, 
    errorMessage = "",
    inputValidError = null,
    setInputValidError = null
}) {
    
    const handleOnBlur = () => {
        if(!regexp) {
            return;
        }

        setInputValidError(prev => ({
            ...prev,
            [name]: !regexp.test(value),
        }));
    }

    return (
        <div css={s.groupBox}>
            <input css={s.textInput} 
                type={type} 
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                onFocus={onFocus}
                onBlur={handleOnBlur}
            />
            {
                !!inputValidError &&
                !!inputValidError[name] &&
                <p css={s.messageText}>{errorMessage}</p>
            }
        </div>
    );
}

export default ValidInput;