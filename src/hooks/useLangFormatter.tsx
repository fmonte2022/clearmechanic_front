import { useState } from "react";
import { useIntl } from "react-intl";

export function useLangFormatter(basePrefixText?: string | undefined) {
    const [basePrefix] = useState<string | undefined>(basePrefixText);
    const { formatMessage } = useIntl();

    function getText(id: string) {
        return formatMessage({id: `${basePrefix}${id}`});
    }

    function getGlobalText(key: string) {
        return formatMessage({id: key});
    }

    return { getText, getGlobalText }

}