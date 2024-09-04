import { isEmpty, isNil } from "lodash";

const FilterUtility = () => {

    const getQueryParamsByCriteria = (criteria: any) => {
    
        const keys = Object.keys(criteria);

        const queryParams = keys.reduce((param: string, key: string) => {
            const value = criteria[key];

            if (isEmpty(value) || isNil(value)) return param;

            if (Array.isArray(value)) {
                param += `&${key}_gte=${value[0]}&${key}_lte=${value[1]}`;
            } else {
                param += `&${key}=${value}`;
            }

            return param;
        }, "");


        return queryParams;
    }

    return { getQueryParamsByCriteria }

}

export default FilterUtility();