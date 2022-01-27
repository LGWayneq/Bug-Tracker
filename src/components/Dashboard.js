import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {Route, Routes} from "react-router-dom";
import BugsList from "./BugsList";
import ProjectList from "./ProjectList";
import AppNavbar from "./AppNavbar";

import "./Dashboard.css";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async() => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (error) {
            console.error(error);
            alert("An error occurred while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <AppNavbar name={name} user={user}/>
                <div className="dashboard__bug__container">
                    <div className="dashboard__bug">
                        <Routes>
                            <Route exact path="/bugs" element={<BugsList />}/>
                            <Route exact path="/projects" element={<ProjectList />}/>
                        </Routes>
                        <BugsList name={name}/>
                        <ProjectList/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;