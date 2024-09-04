import React from 'react';
import { Alert, Snackbar } from '@mui/material';

import './styles.css';
import { CustomSnackbarProps } from './interfaces';

const CustomSnackbar = ({
    open,
    message,
    severity,
    duration,
    variant,
    anchorOrigin,
    handleOnClose,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
        anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={duration || 4000}
        onClose={handleOnClose}
    >
        <Alert
            onClose={handleOnClose}
            severity={severity}
            variant={variant || "filled"}
            className="customSnackbar__alert"
        >
            {message}
        </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;