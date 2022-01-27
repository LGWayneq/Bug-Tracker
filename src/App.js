import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import AddBug from "./components/AddBug";


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/reset" element={<Reset />}/>
                    <Route path="/*" element={<Dashboard />}/>
                    <Route path ="/addbug" element={<AddBug/>}/>
                    <Route path ="/editbug" element={<AddBug/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;