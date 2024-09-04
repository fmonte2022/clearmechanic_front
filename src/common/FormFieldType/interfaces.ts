import { ActionField } from "../types";

export type FormFieldTypeProps = {
    fields: ActionField[];
    itemForm?: any;
    disableForm?: boolean;
    validateForm?: boolean;
    autoFocusDisabled?: boolean;
    showErrorInput?: boolean;
    handleOnError?: (isValid: boolean) => void;
    handleChangeItem: (item: any) => void;
};