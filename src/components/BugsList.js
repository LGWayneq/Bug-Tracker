import { getAllBugs, getBugsByProject, getUserById } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Spinner } from "reactstrap";
import "./BugsList.css"

function BugsList(props) {
    const { state } = useLocation();
    const { projectId } = state;
    const [bugs, setBugs] = useState([]);
    const [openBugs, setOpenBugs] = useState(0);
    const [inProgressBugs, setInProgressBugs] = useState(0);
    const [closedBugs, setClosedBugs] = useState(0);
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = await getBugsByProject(projectId)
            setBugs(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    useEffect(() => {
        var _openBugs = 0, _inProgressBugs = 0, _closedBugs = 0;
        bugs.forEach((bug) => {
            if (bug.data().status === "Open" || bug.data().status === "Reopened") _openBugs++;
            else if (bug.data().status === "Assigned" || bug.data().status === "Pending retest") _inProgressBugs++;
            else if (bug.data().status === "Closed") _closedBugs++;
        })
        setOpenBugs(_openBugs);
        setInProgressBugs(_inProgressBugs);
        setClosedBugs(_closedBugs);
    }, [bugs])


    const goToAddBug = () => {
        navigate("/addbug", { state: { projectId, _reporterName : props.name, workFunction : "Add"}});
    }

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
            <Button className="buglist__btn" onClick={goToAddBug}>
                    Add Bug
            </Button>
            <div className="buglist__container">
                <Card className="buglist__summary" style={{backgroundColor: '#fafffe', borderRadius: '12px'}}>
                    <strong>Project Summary</strong><br/>
                    Open: {openBugs}<br/>
                    In Progress: {inProgressBugs}<br/>
                    Closed: {closedBugs}<br/>
                </Card>
                {bugs.length === 0 && <Spinner className="buglist__spinner"/>}
                {bugs.map(bug => (
                    <Card className="buglist__card" key={bug.id} style={{backgroundColor: '#E7F5FF', borderRadius: '12px'}} onClick={(e) => editBug(bug)}>
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
                        { bug.data().assignedTo != "" && <div className="buglist__assignedTo">
                            <strong>Assigned To: </strong>{bug.data().assignedTo.slice(28)}
                        </div>}
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