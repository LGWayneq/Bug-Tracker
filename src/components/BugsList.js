import { getAllBugs, getBugsByProject } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Spinner } from "reactstrap";
import "./BugsList.css"

function BugsList(props) {
    const { state } = useLocation();
    const { projectId } = state;
    const [bugs, setBugs] = useState([]);
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = (projectId !== null) ? await getBugsByProject(projectId) : await getAllBugs();
            setBugs(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    const goToAddBug = () => {
        navigate("/addbug", { state: { projectId, _reporterName : props.name, workFunction : "Add"}});
    }

    const editBug = (bug) => {
        navigate("/projects/overview/" + bug.id, { state: {
            _bugId : bug.id,
            projectId, 
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
            <Button className="buglist__btn" onClick={goToAddBug}>
                    Add Bug
            </Button>
            <div className="buglist__container">
                {bugs.length === 0 && <Spinner className="buglist__spinner"/>}
                {bugs.map(bug => (
                    <Card className="buglist__card" key={bug.id} style={{backgroundColor: '#fafffe', borderRadius: '12px'}} onClick={(e) => editBug(bug)}>
                        <div className="buglist__bugName">
                            <strong>{bug.data().bugName}</strong>
                        </div>
                        <div className="buglist__reporterName">
                            <strong>Reported by: </strong>{bug.data().reporterName}
                        </div>
                        <div className="buglist__severity">
                            <strong>Severity: </strong>{bug.data().severity}
                        </div>
                        <div className="buglist__status">
                            <strong>Status: </strong>{bug.data().status}
                        </div>
                        <div className="buglist__bugDescription">
                            {bug.data().bugDescription}
                        </div>
                    </Card>    
                ))}            
            </div>
        </div>
    )
}

export default BugsList;