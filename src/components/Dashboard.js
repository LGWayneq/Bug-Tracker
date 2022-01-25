import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getBug, deleteBug } from "../firebaseDao";

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

    const [bug, setBug] = useState("");
    const [bugId, setBugId] = useState("");
    const displayBug = async() => {
        try {
            const doc = await getBug("Test Bug");
            const bug = doc.data();
            setBugId(doc.id);
            setBug(bug.name);
        } catch (error) {
            console.error(error);
            setBug("error getting bug");
        }
    }

    const goToAddBug = () => {
        navigate("/addbug");
    }

    const confirmDeleteBug = () => {
        deleteBug(bugId); //not working yet
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
                <button className="dashboard__btn" onClick={ displayBug}>
                    Get Bug
                </button>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
            <div className="dashboard__bug__container">
                <button className="dashboard__btn" onClick={goToAddBug}>
                    Add Bug
                </button>
                <div className="dashboard__bug">
                    {bug}
                </div>
                <button className="dashboard__btn" onClick={confirmDeleteBug}>Delete Bug</button>
            </div>
        </div>
    )
};

export default Dashboard;