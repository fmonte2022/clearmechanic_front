import API from 'src/services/BaseService';
import URLS from 'src/services/Urls.json';

const ActorService = () => {

    const getAllActors = () => {
        return API.get(URLS.GET_ALL_ACTORS);
    }

    return { getAllActors }

}

export default ActorService();