import { AlertColor, SnackbarOrigin } from "@mui/material";

export type CustomSnackbarProps = {
    open: boolean;
    message: string | null;
    severity: AlertColor;
    duration?: number;
    variant?: 'standard' | 'filled' | 'outlined';
    anchorOrigin?: SnackbarOrigin;
    handleOnClose: () => void;
}