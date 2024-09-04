import API from 'src/services/BaseService';
import URLS from 'src/services/Urls.json';

const GenderService = () => {

    const getAllGenders = () => {
        return API.get(URLS.GET_ALL_GENDERS);
    }

    return { getAllGenders }

}

export default GenderService();