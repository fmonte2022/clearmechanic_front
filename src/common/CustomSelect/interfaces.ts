import { OptionSelect } from "../types";

export type CustomSelectProps = {
    value?: any;
    label?: string;
    customClasses?: any;
    options?: OptionSelect[];
    handleOnChangeValue?: (value: string) => void;
};