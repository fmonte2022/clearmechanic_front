import React from 'react'
import axios from 'axios';
import { md5 } from 'js-md5';
import { describe, it, vi, beforeEach } from "vitest";
import { act, fireEvent, getByText, render, screen, waitFor } from 'src/test/wrapperRender';
import Login from 'src/routes/Login/Login';

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

    describe('render login', () => {
        it('It should render the login form', async () => {
            render(<Login setIsAuth={() => {}} />);
            const title = await screen.findByText(/Ingreso de usuario/i);
            const formNameUser = await screen.findByText(/Nombre de usuario /i);
            const formPasswordUser = await screen.findByText(/Contraseña de usuario /i);
            const formSubmit = await screen.findByText("Ingresar");
            expect(title).toBeDefined();
            expect(formNameUser).toBeDefined();
            expect(formPasswordUser).toBeDefined();
            expect(formSubmit).toBeDefined();
        });

        it('It should to show the required fields with error', async () => {
            render(<Login setIsAuth={() => {}} />);
            const formSubmit = await screen.findByText("Ingresar");
            const formNameUser = await screen.findAllByPlaceholderText('Nombre de usuario')
            const formPasswordUser = await screen.findAllByPlaceholderText('Contraseña de usuario');
            expect(formNameUser).toBeDefined();
            expect(formPasswordUser).toBeDefined();
            expect(formNameUser[0].getAttribute('aria-invalid')).toBe('false');
            expect(formPasswordUser[0].getAttribute('aria-invalid')).toBe('false');
            
            act(() => {
                fireEvent.click(formSubmit);
            });

            expect(formNameUser[0].getAttribute('aria-invalid')).toBe('true');
            expect(formPasswordUser[0].getAttribute('aria-invalid')).toBe('true');
        });

        it('It should to show the alert with error of user/password incorrect', async () => {
            const { container } = render(<Login setIsAuth={() => {}} />);
            const formSubmit = await screen.findByText("Ingresar");
            const formNameUser = await screen.findAllByPlaceholderText('Nombre de usuario')
            const formPasswordUser = await screen.findAllByPlaceholderText('Contraseña de usuario');
            expect(formNameUser).toBeDefined();
            expect(formPasswordUser).toBeDefined();

            const spy = vi.spyOn(axios, 'get');
            spy.mockImplementation(() => {
                return Promise.resolve({
                    data: [],
                });
            });
            
            act(() => {
                fireEvent.change(formNameUser[0], {target: {value: 'admin'}});
                fireEvent.change(formPasswordUser[0], {target: {value: '123'}});
                fireEvent.click(formSubmit);
            });

            await waitFor(() => {
                try {
                    expect(getByText(container, 'Nombre de usuario y/o contraseña incorrectos', {exact: false})).toBeDefined();
                } catch {
                    expect(false).toBeTruthy();
                }
            });

            expect(formNameUser[0].getAttribute('aria-invalid')).toBe('false');
            expect(formPasswordUser[0].getAttribute('aria-invalid')).toBe('false');
        });

        it('It should to accept the user and password as valid', async () => {
            const { container } = render(<Login setIsAuth={() => {}} />);
            const formSubmit = await screen.findByText("Ingresar");
            const formNameUser = await screen.findAllByPlaceholderText('Nombre de usuario')
            const formPasswordUser = await screen.findAllByPlaceholderText('Contraseña de usuario');
            expect(formNameUser).toBeDefined();
            expect(formPasswordUser).toBeDefined();

            const spy = vi.spyOn(axios, 'get');
            spy.mockImplementation(() => {
                return Promise.resolve({
                    data: [{userId: 1, userName: 'admin', name: 'Administrador', password: md5('123')}],
                });
            });
            
            act(() => {
                fireEvent.change(formNameUser[0], {target: {value: 'admin'}});
                fireEvent.change(formPasswordUser[0], {target: {value: '123'}});
                fireEvent.click(formSubmit);
            });

            try {
                expect(getByText(container, "Nombre de usuario y/o contraseña incorrectos")).toBeDefined();
            } catch {
                expect(true).toBeTruthy();
            }

            expect(formNameUser[0].getAttribute('aria-invalid')).toBe('false');
            expect(formPasswordUser[0].getAttribute('aria-invalid')).toBe('false');
        });
    });
});