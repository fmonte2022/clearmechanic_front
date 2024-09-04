import API from 'src/services/BaseService';
import URLS from 'src/services/Urls.json';
import StringUtility from 'src/utilities/StringUtility';
import FilterUtility from "src/utilities/FilterUtility";

const MovieService = () => {

    const getAllMoviesPaginated = (page: number, limit: number, query: string, criteria?: any) => {
        let url = StringUtility.repalacePathParams(URLS.GET_ALL_MOVIES, { page, limit, query });

        if (criteria) {
            url = `${url}${FilterUtility.getQueryParamsByCriteria(criteria)}`;
        }

        return API.get(url);
    }

    return { getAllMoviesPaginated }
}

export default MovieService();