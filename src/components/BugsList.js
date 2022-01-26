import { getAllBugs } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "./BugsList.css"

function BugsList() {
    const [bugs, setBugs] = useState([]);
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = await getAllBugs();
            setBugs(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    const editBug = (bug) => {
        navigate("/edit", { state: {
            _bugId : bug.id,
            _reporterName : bug.data().reporterName, 
            _bugName : bug.data().bugName, 
            _bugDescription : bug.data().bugDescription,
            _severity : bug.data().severity, 
            _status : bug.data().status,
            workFunction : "Edit"
        }
        });
    }

    return (
        <div className="buglist">
            {bugs.map(bug => (
                <div className="buglist__container" key={bug.id} onClick={(e) => editBug(bug)}>
                    <div className="buglist__bugName">
                        {bug.data().bugName}
                    </div>
                    <div className="buglist__reporterName">
                        {bug.data().reporterName}
                    </div>
                    <div className="buglist__severity">
                        {bug.data().severity}
                    </div>
                    <div className="buglist__status">
                        {bug.data().status}
                    </div>
                    <div className="buglist__bugDescription">
                        {bug.data().bugDescription}
                    </div>
                </div>    
            ))}            
        </div>
    )
}

export default BugsList;