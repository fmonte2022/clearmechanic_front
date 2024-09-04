import { useMemo } from "react";
import { AlignType, CustomTableColumn } from "src/common/CustomTable/interfaces";
import { useConfigMoviesProps } from "src/pages/manager/MovieListPage/interfaces";

const COLUMNS_PROPS = {
    ID: "id",
    TITLE: "title",
    GENDER: "gender",
    YEAR: "year",
    ACTIVE: "active",
}

// this hook is used to config the columns of the movies
export const useConfigMovies = ({ getText }: useConfigMoviesProps) => { 
    
    const columns: CustomTableColumn[] = [
        {
            id: "id",
            label: getText("table_column_id_label"),
            type: "number",
            visible: true,
            isField: true,
        },
        {
            id: "title",
            label: getText("table_column_title_label"),
            type: "string",
            required: true,
            visible: true,
            isField: true,
        },
        {
            id: "gender",
            label: getText("table_column_gender_label"),
            type: "string",
            required: true,
            visible: true,
            isField: true,
        },
        {
            id: "year",
            label: getText("table_column_year_label"),
            align: 'center' as AlignType,
            type: "string",
            visible: true,
            isField: true,
        },
        {
            id: "active",
            label: getText("table_column_active_label"),
            align: 'center' as AlignType,
            defaultValue: true,
            visible: false,
            isField: true,
        },
    ];

    const visibleColumns = useMemo(() => {
        return columns?.filter(columns => columns.visible);
    }, [columns]);

    return { COLUMNS_PROPS, visibleColumns }
}