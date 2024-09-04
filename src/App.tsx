import React, { useState } from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { isNil } from 'lodash';

import './App.css';
import { useSelector } from "src/redux/store";
import { routes } from "src/routes";
import Login from 'src/routes/Login/Login';
import MainLayout from 'src/common/layout/MainLayout';

function App() {
    const user = useSelector((state) => state?.appState.auth);
    const [isAuth, setIsAuth] = useState<boolean>(!isNil(user));

    return (
        <>
            <div className='app__root'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
                        {isAuth && (
                            <Route path="/" element={<MainLayout />}>
                                {routes}
                            </Route>
                        )}
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App