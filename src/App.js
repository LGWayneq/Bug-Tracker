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
                    <Route exact path="/" element={<Login />}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path="/reset" element={<Reset />}/>
                    <Route exact path="/dashboard" element={<Dashboard />}/>
                    <Route exact path ="/addbug" element={<AddBug/>}/>
                    <Route exact path ="/editbug" element={<AddBug/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;