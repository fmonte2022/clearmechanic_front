import axios from 'axios';
import { describe, it, vi, expect, beforeEach } from "vitest";

import ActorService from "src/services/ActorService";

describe('Functions associated to the api of actors', () => {
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

    describe('getAllActors', () => {
        it('It should return all active actors lists', async () => {
            const actorMock = [
                { id: 1, name: "Actor 1" },
                { id: 2, name: "Actor 2" },
            ];
            vi.spyOn(axios, 'get').mockImplementation(() => {
                return Promise.resolve({
                    data: actorMock,
                });
            });
            const result = await ActorService.getAllActors();
            expect(result.data.length).toEqual(2);
        });
    });
});