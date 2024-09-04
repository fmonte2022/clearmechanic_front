import { useCallback, useEffect, useMemo, useState } from "react";
import { isEmpty, isNil } from "lodash";

import { useFilterMoviesPros } from "../interfaces";
import { MovieFilterConfig } from "../../../../pages/components/MovieFilterDrawer/interfaces";
import { useSelector } from "src/redux/store";
import { Actor, Gender } from "src/pages/types";
import MovieService from "../../../../services/MovieService";
import ActorService from "../../../../services/ActorService";
import GenderService from "../../../../services/GenderService";

const DEFAULT_PAGE = 0;

//This hook is used in order to store the state of filters of movies
export const useFilterMovies = ({ formatMovieList } : useFilterMoviesPros) => { 
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [movies, setMovies] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [filterCriteria, setFilterCriteria] = useState<any>(null);
    const [configFilter, setConfigFilter] = useState<MovieFilterConfig>({ actors: [], genders: [] });
    const [loadMovies, setLoadMovies] = useState<boolean>(true);
    const [loadActors, setLoadActors] = useState<boolean>(true);
    const [loadGenders, setLoadGenders] = useState<boolean>(false);

    const lang = useSelector((state) => state?.appState?.lang) || {};

    const isClearFilterVisible = useMemo<boolean>(() => {
        const criteriaFiltered = Object.keys(filterCriteria || []).some((field: any) => !isNil(filterCriteria[field]));

        return !isEmpty(searchText) || criteriaFiltered;
    }, [searchText, filterCriteria])

    //Here is get all movies for the first load.
    useEffect(() => {
        if (loadMovies) {
            setLoadMovies(false);
            onGetAllMovies(DEFAULT_PAGE, rowsPerPage, searchText, filterCriteria);
        }
    }, [loadMovies]);

    //Here is load all the actors in order to use in the filters
    useEffect(() => {
        if (loadActors) {
          setLoadActors(false);
          const onSuccess = (response: any) => {
            const data = response?.data || [];
            setConfigFilter({
                ...configFilter,
                actors: data.map((actor: Actor) => {
                    return {
                        value: actor.name,
                        label: actor.name
                    }
                })
            });

            setLoadGenders(true);
          }
          ActorService.getAllActors().then(onSuccess);
        }
    }, [loadActors, configFilter]);

    //Here is load all the genders in order to use in the filters
    useEffect(() => {
        if (loadGenders) {
            setLoadGenders(false);
            const onSuccess = (response: any) => {
                const data = response?.data || [];
                setConfigFilter({
                    ...configFilter,
                    genders: data.map((gender: Gender) => {
                        return {
                            value: gender.id,
                            label: lang == "es" ? gender.nameEs : gender.nameEn,
                        }
                    })
                });
            }
            GenderService.getAllGenders().then(onSuccess);
        }
    }, [loadGenders, configFilter]);

    // handle used to get all movies
    const onGetAllMovies = useCallback((
        page: number,
        rowsPerPage: number,
        searchText: string,
        filterCriteria?: any,
    ) => {
        const onSuccess = (response: any) => {
            const { movies: newMovies, total } = formatMovieList(response);
            setMovies(newMovies);
            setTotalItems(total);
        };

        MovieService.getAllMoviesPaginated(page, rowsPerPage, searchText, filterCriteria).then(onSuccess);
    }, [formatMovieList]);

    //handle used to change the page of movies
    const onChangePage = useCallback((newPage: number) => {
        const page = newPage + 1;
        setPage(page);
        onGetAllMovies(page, rowsPerPage, searchText, filterCriteria);
    }, [rowsPerPage, searchText, filterCriteria]);

    //handle used to change the rows per page of movies
    const onChangeRowsPerPage = useCallback((newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(DEFAULT_PAGE);
        onGetAllMovies(DEFAULT_PAGE, newRowsPerPage, searchText, filterCriteria);
    }, [searchText, filterCriteria]);

    //handle used to search movies by criteria
    const onChangeSearchText = useCallback((value: string) => {
        setSearchText(value);
        setPage(DEFAULT_PAGE);
        onGetAllMovies(DEFAULT_PAGE, rowsPerPage, value, filterCriteria);
    }, [rowsPerPage, filterCriteria]);

    //hanlde used to clear the filters
    const onResetFilters = useCallback(() => {
        setFilterCriteria(null);
        setSearchText("");
        setPage(DEFAULT_PAGE);
        onGetAllMovies(DEFAULT_PAGE, rowsPerPage, "", null);
    }, [rowsPerPage]);

    //hanlde used to apply search filters
    const onApplyFilters = useCallback((criteria: any) => {
        setFilterCriteria(criteria);
        setPage(DEFAULT_PAGE);
        onGetAllMovies(DEFAULT_PAGE, rowsPerPage, searchText, criteria);
    }, [rowsPerPage, searchText]);

    return {
        configFilter,
        filterCriteria,
        searchText,
        page,
        rowsPerPage,
        movies,
        totalItems,
        isClearFilterVisible,
        onChangePage,
        onChangeRowsPerPage,
        onChangeSearchText,
        onResetFilters,
        onApplyFilters,
        onGetAllMovies,
    }
}