import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />}/>
                    <Route exact path="/register" element={<Register />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;