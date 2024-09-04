import { md5 } from 'js-md5';

import API from 'src/services/BaseService';
import URLS from 'src/services/Urls.json';
import StringUtility from 'src/utilities/StringUtility';

const UserService = () => {

    const validateUser = (userName: string, password: string) => {
        const url = StringUtility.repalacePathParams(URLS.GET_ACTIVE_USER, { userName, password: md5(password) });

        return API.get(url);
    }

    return { validateUser }

}

export default UserService();