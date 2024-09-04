import { ReactNode } from "react";

export type OptionItem = {
    id: number;
    label: string;
    isDisabled?: boolean;
    action?: (itemId: any) => void;
}

export type OptionRadioButton = {
    value: any;
    label: string;
    symbol?: any;
}

export type OptionSelect = {
    value: any;
    label: string;
}

export enum EditorAction {
    NONE = "none",
    DELETE = "delete",
    CREATE = "create",
    UPDATE = "update"
}

export enum TransactionEditorAction {
    none = "NONE",
    delete = "DELETED",
    create = "CREATED",
    update = "UPDATED"
}

export type ActionOptionType = {
    value: number;
    label:  string;
    symbol: ReactNode
}

export type ActionField = {
    name: string;
    label: string;
    type?: "string" | "number" | "options" | "select";
    value?: string | number | null;
    defaultValue?: string | number | null; 
    minValue?: number;
    maxValue?: number;
    symbol?: string;
    required?: boolean;
    isField?: boolean;
    options?: any;
}

export type ActionConfig = {
    title: string;
    subTitle: string;
    fields?: ActionField[];
    reasonTitle?: string;
    reasons?: OptionRadioButton[]; 
};

export type CustomEditorConfig = {
    delete: ActionConfig;
    update: ActionConfig;
    create: ActionConfig;
};

 
