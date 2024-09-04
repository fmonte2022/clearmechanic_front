import { ReactElement } from "react";

export type CustomTextFieldProps = {
    value?: any;
    required?: boolean;
    error?: boolean;
    label?: string;
    placeholder?: string;
    inputProps?: any;
    customClasses?: any;
    disabled?: boolean;
    focused?: boolean;
    inputRef?: any;
    isPassword?: boolean;
    handleOnChangeValue?: (value: any) => void;
};