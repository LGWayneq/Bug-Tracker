import { getAllBugs } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "reactstrap";
import "./BugsList.css"

function BugsList(props) {
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

    const goToAddBug = () => {
        navigate("/addbug", { state: {_reporterName : props.name, workFunction : "Add"}});
    }

    const editBug = (bug) => {
        navigate("/editbug", { state: {
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
            <Button className="dashboard__btn" onClick={goToAddBug}>
                    Add Bug
            </Button>
            {bugs.map(bug => (
                <Card className="buglist__container" key={bug.id} style={{backgroundColor: '#fafffe', borderRadius: '12px'}} onClick={(e) => editBug(bug)}>
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
                </Card>    
            ))}            
        </div>
    )
}

export default BugsList;