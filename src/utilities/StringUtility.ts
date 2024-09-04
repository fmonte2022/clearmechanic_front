import { isEmpty } from "lodash";

const StringUtility = () => {

    const repalacePathParams = (path: string, params: { [key: string]: any }, prefix = ':') => {
        let newPath = path;
    
        Object.entries(params).forEach(([key, value]) => {
          newPath = newPath.replace(prefix + key, value);
        })
        return newPath;
    }

    const validatePattern = (pattern?: string | null, value?: any) => {
      if (!pattern) return !isEmpty(value);

      return new RegExp(pattern).test(value);
    }

    return { repalacePathParams, validatePattern }

}

export default StringUtility();