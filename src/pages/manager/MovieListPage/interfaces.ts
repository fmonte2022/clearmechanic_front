import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export type useConfigMoviesProps = {
    getText: (id: string) => string,
};

export type useFilterMoviesPros = {
    dispatch: Dispatch<AnyAction>,
    formatMovieList: (response: any) => any,
};