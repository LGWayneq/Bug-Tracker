import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {Button} from 'reactstrap';
import BugsList from "./BugsList";
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
                <AppNavbar name={name} user={user}/>
                <div className="dashboard__bug__container">
                    <Button className="dashboard__btn" onClick={goToAddBug}>
                        Add Bug
                    </Button>
                    <div className="dashboard__bug">
                        <BugsList/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;