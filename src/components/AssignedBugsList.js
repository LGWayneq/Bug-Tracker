import { getAssignedBugs } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import { Card, Spinner, Button } from "reactstrap";
import "./BugsList.css"

function AssignedBugsList(props) {
    const [bugs, setBugs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async(props) => {
            const docs = await getAssignedBugs(props.uid + props.name);
            setBugs(docs);
        }
        fetchData(props);
    }, [props.uid])


    const editBug = (bug) => {
        navigate("/projects/overview/" + bug.id, { state: {
            _bugId : bug.id,
            projectId: bug.data().projectId,
            _reporterName : bug.data().reporterName, 
            _bugName : bug.data().bugName, 
            _bugDescription : bug.data().bugDescription,
            _severity : bug.data().severity, 
            _status : bug.data().status,
            _assignedTo: bug.data().assignedTo,
            workFunction : "Edit"
        }
        });
    }

    return (
        <div className="buglist">
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

export default AssignedBugsList;