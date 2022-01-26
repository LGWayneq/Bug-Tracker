import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import BugsList from "./BugsList";

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


    const goToAddBug = () => {
        navigate("/add", { state: {_reporterName : name, workFunction : "Add"}});
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
            <div className="dashboard__bug__container">
                <button className="dashboard__btn" onClick={goToAddBug}>
                    Add Bug
                </button>
                <div className="dashboard__bug">
                    <BugsList/>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;