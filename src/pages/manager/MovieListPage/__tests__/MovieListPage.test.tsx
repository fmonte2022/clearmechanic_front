import React from 'react'
import axios from 'axios';
import { describe, it, vi, beforeEach } from "vitest";
import { render } from 'src/test/wrapperRender';
import MovieListPage from 'src/pages/manager/MovieListPage/MovieListPage';

describe('Renders of the page', () => {
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

    describe('render movie list page', () => {
        it('It should render the movies list page', async () => {
            const moviesMock = {
                movies: [
                    { id: 1, title: "test1", genderId: 1, year: 2001, gender: { id: 1, nameEs: "Drama", nameEn: "Drama" } }, 
                    { id: 2, title: "test2", genderId: 2, year: 2001, gender: { id: 1, nameEs: "Drama", nameEn: "Drama" } },
                ],
                total: 2
            };
            const actorsMock = [
                { id: 1, name: "test1" },
            ];

            vi.spyOn(axios, 'get').mockImplementation((url) => {
                switch (url) {
                    case 'Actor':
                      return Promise.resolve({ data: actorsMock });
                    case 'Movie/getByFilter?page=0&limit=5&q=':
                      return Promise.resolve({ data: moviesMock });
                    default:
                      return Promise.reject(new Error('not found'))
                }
            });

            const { container } = render(<MovieListPage />);
 
            const trs = container.getElementsByTagName('tr');
            expect(trs).toBeDefined();
            expect(trs.length).toBe(3);
        });

    });
});