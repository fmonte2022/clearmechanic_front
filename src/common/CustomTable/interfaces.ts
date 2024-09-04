export declare type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export type CustomTableColumn = {
    id: string;
    align?: AlignType;
    label: string;
    minWidth?: number;
    type?: string;
    required?: boolean;
    visible?: boolean,
    isField?: boolean,
    defaultValue?: any;
    info?: string;
    format?: (value: any) => string;
    showAlert?:  (row: any) => string;
};

export type CustomTableProps = {
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
    page: number;
    totalItems: number;
    withPagination?: boolean;
    columns: CustomTableColumn[];
    items: any[];
    handleChangePage?: (page: number) => void;
    handleChangeRowsPerPage?: (rowsPerPage: number) => void;
};