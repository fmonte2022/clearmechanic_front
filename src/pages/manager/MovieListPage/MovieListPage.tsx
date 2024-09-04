import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";

import './styles.css';
import { useSelector } from "src/redux/store";
import { Movie } from 'src/pages/types';
import {
    useConfigMovies,
    useLangFormatter,
    useAlerts,
    useFilterMovies,
} from 'src/pages/index';
import CustomTable from 'src/common/CustomTable/CustomTable';
import CustomSnackbar from 'src/common/CustomSnackbar/CustomSnackbar';
import SearchMovieFilter from 'src/pages/components/SearchMovieFilter/SearchMovieFilter';
import MovieFilterDrawer from 'src/pages/components/MovieFilterDrawer/MovieFilterDrawer';

const BASE_PREFIX = "MovieListPage_";

const MovieListPage = () => {
    const lang = useSelector((state) => state?.appState?.lang) || {};
    const { getText } = useLangFormatter(BASE_PREFIX);
    const dispatch = useDispatch();
    const clearFiltersLabel = getText("clear_filters_label");

    const formatMovieList = useCallback((response?: any) => {
        const data = response?.data || [];

        const movies = data.movies.map((movie: Movie) => {
            return {
                [COLUMNS_PROPS.ID]: movie.id,
                [COLUMNS_PROPS.TITLE]: movie.title,
                [COLUMNS_PROPS.GENDER]: lang == "es" ? movie.gender.nameEs : movie.gender.nameEn,
                [COLUMNS_PROPS.YEAR]: movie.year,
            }
        });

        return { movies, total: data.total };
    }, []);

    const {
        openMessage,
        messageActions,
        severityMessage,
        onHandleMessageClose,
    } = useAlerts();

    const {
        configFilter,
        filterCriteria,
        searchText,
        isClearFilterVisible,
        page,
        rowsPerPage,
        movies,
        totalItems,
        onChangePage,
        onChangeRowsPerPage,
        onChangeSearchText,
        onResetFilters,
        onApplyFilters,
    } = useFilterMovies({ dispatch, formatMovieList });

    const { COLUMNS_PROPS, visibleColumns } = useConfigMovies({ getText });

    return (
        <div className={"MovieListPage__container"}>
            <div className={"MovieListPage__header"}>
                <div className={"MovieListPage__filter"}>
                    <SearchMovieFilter
                        searchValue={searchText}
                        handleChangeValue={(value) => { onChangeSearchText(value); }}
                    />
                    <MovieFilterDrawer
                        filterParams={filterCriteria}
                        config={configFilter}
                        handleOnApplyFilter={(criteria: any) => { onApplyFilters(criteria);}}
                    />
                    {isClearFilterVisible && (
                        <Link
                            href="#"
                            underline="always"
                            className="MovieListPage__cleanFilter"
                            onClick={() => { 
                                onResetFilters();
                            }}
                        >
                            <div><ClearIcon /> {clearFiltersLabel}</div>
                        </Link>
                    )}
                </div>
            </div>
            <CustomTable
                page={page - 1}
                rowsPerPage={rowsPerPage}
                columns={visibleColumns}
                items={movies}
                totalItems={totalItems}
                withPagination
                handleChangePage={(page: number) => { onChangePage(page);}}
                handleChangeRowsPerPage={(rowsPerPage: number) => { onChangeRowsPerPage(rowsPerPage);}}
            />
            <CustomSnackbar
                open={openMessage}
                handleOnClose={onHandleMessageClose}
                severity={severityMessage}
                message={messageActions}
            />
        </div>
    );
}

export default MovieListPage;