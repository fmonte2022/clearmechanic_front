import axios from 'axios';
import { describe, it, vi, expect, beforeEach } from "vitest";
import { md5 } from 'js-md5';

import UserService from "src/services/UserService";

describe('Functions associated to the api of users', () => {
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

    describe('validateUser', () => {
        it('It should to validate the user login successfully', async () => {
            const spy = vi.spyOn(axios, 'get');
            spy.mockImplementation(() => {
                return Promise.resolve({
                    data: [{ userId: 1, userName: 'admin', name: 'Administrador', password: md5('123') }],
                });
            });
            const result = await UserService.validateUser("admin", "123");
            expect(result.data.length).toEqual(1);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it.fails('It should to throw an error in the validate login', async () => {
            const spy = vi.spyOn(axios, 'get');
            spy.mockImplementation(() => {
                return Promise.reject(new Error('url fail'));
            });
            await TransactionService.validateUser("admin", "123");
        });
    });
});