import { Actor, Gender } from "src/pages/types";

export type MovieFilterConfig = {
    actors: Actor[];
    genders: Gender[];
}

export type MovieFilterDrawerProps = {
    filterParams?: any;
    config?: MovieFilterConfig;
    handleOnApplyFilter?: (criteria: any) => void;
}