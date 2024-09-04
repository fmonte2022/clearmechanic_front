import axios from 'axios';
import { describe, it, vi, expect, beforeEach } from "vitest";

import GenderService from "src/services/GenderService";

describe('Functions associated to the api of genders', () => {
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

    describe('getAllGenders', () => {
        it('It should return all active genders lists', async () => {
            const genderMock = [
                { id: 1, nameEs: "Terror", nameEn: "Terror"},
                { id: 2, nameEs: "Drama", nameEn: "Drama" },
            ];
            vi.spyOn(axios, 'get').mockImplementation(() => {
                return Promise.resolve({
                    data: genderMock,
                });
            });
            const result = await GenderService.getAllGenders();
            expect(result.data.length).toEqual(2);
        });
    });
});