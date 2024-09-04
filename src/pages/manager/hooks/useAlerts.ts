import { useState } from "react";
import { AlertColor } from "@mui/material";

//This hook is used for the alerts of the system
export const useAlerts = () => { 
    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [messageActions, setMessageActions] = useState<string | null>(null);
    const [severityMessage, setSeverityMessage] = useState<AlertColor>("info");

    const onHandleMessageClose = () => {
        setOpenMessage(false);
    };

    return { 
        openMessage,
        messageActions,
        severityMessage,
        onSetMessageActions: setMessageActions,
        onSetOpenMessage: setOpenMessage,
        onSetSeverityMessage: setSeverityMessage,
        onHandleMessageClose,
    }
}