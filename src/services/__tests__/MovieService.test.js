import axios from 'axios';
import { describe, it, vi, expect, beforeEach } from "vitest";

import MovieService from "src/services/MovieService";

describe('Functions associated to the api of movies', () => {
    beforeEach(() => {
        vi.mock('axios', () => {
            return {
              default: {
                post: vi.fn(),
                get: vi.fn(),
                patch: vi.fn(),
                create: vi.fn().mockReturnThis(),
              },
            };
        });
    });

    describe('getAllMoviesPaginated', () => {
        it('It should return all active movies lists paginated', async () => {
            const moviesMock = {
                movies: [
                    { id: 1, title: "test1", genderId: 1 },
                    { id: 2, title: "test2", genderId: 2 },
                ],
                total: 2
            };
            vi.spyOn(axios, 'get').mockImplementation(() => {
                return Promise.resolve({
                    data: moviesMock,
                });
            });
            const result = await MovieService.getAllMoviesPaginated(1, 5, "");
            expect(result.data.movies.length).toEqual(2);
        });

        it('It should return all active movies lists paginated with search criteria', async () => {
            const moviesMock = {
                movies: [
                    { id: 1, title: "test1", genderId: 1 },
                ],
                total: 2
            };
            vi.spyOn(axios, 'get').mockImplementation(() => {
                return Promise.resolve({
                    data: moviesMock,
                });
            });
            const result = await MovieService.getAllMoviesPaginated(1, 5, "test1");
            expect(result.data.movies.length).toEqual(1);
        });

        it('It should return all active movies lists paginated with filter criteria', async () => {
            const moviesMock = {
                movies: [
                    { id: 1, title: "test1", genderId: 1 },
                    { id: 2, title: "test2", genderId: 2 },
                    { id: 2, title: "test3", genderId: 3 },
                ],
                total: 3
            };

            const spy = vi.spyOn(axios, 'get');
            spy.mockImplementation(() => {
                return Promise.resolve({
                    data: moviesMock,
                });
            });
            const result = await MovieService.getAllMoviesPaginated(1, 5, "", { title: "test" });
            expect(result.data.movies.length).toEqual(3);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});