import { OptionRadioButton } from "../types";

export type CustomRadioButtonProps = {
    value?: any;
    label?: string;
    customClasses?: any;
    options?: OptionRadioButton[];
    handleOnChangeValue?: (value: string) => void;
};