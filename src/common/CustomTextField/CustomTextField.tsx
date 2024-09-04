import React from 'react';
import { TextField } from '@mui/material';
import classNames from 'classnames';

import './styles.css';
import { CustomTextFieldProps } from './interfaces';

const CustomTextField = ({
    value,
    label,
    error,
    required,
    placeholder,
    inputProps,
    inputRef,
    customClasses,
    disabled,
    focused,
    isPassword,
    handleOnChangeValue,
}: CustomTextFieldProps) => {
  return (
    <TextField
        className={classNames("customTextField__textField", customClasses && customClasses.textField)}
        error={error}
        label={label}
        required={required}
        value={value}
        size="medium"
        variant="outlined"
        placeholder={placeholder}
        onChange={(event) => handleOnChangeValue && handleOnChangeValue(event.target.value) }
        InputProps={inputProps}
        inputRef={inputRef}
        disabled={disabled}
        autoComplete='off'
        autoFocus={focused}
        type={isPassword ? "password" : "text"}
    />
  );
}

export default CustomTextField;