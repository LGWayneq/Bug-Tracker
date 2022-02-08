import { getAllBugs, getBugsByProject, getUserById } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Spinner, Input, Col, Row } from "reactstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./BugsList.css"

function BugsList(props) {
    const { state } = useLocation();
    const { projectId, _projectName } = state;
    const [bugs, setBugs] = useState([null]);
    const [openBugs, setOpenBugs] = useState(0);
    const [inProgressBugs, setInProgressBugs] = useState(0);
    const [closedBugs, setClosedBugs] = useState(0);
    const [progressPercent, setProgressPercent] = useState(100);
    const [searchText, setSearchText] = useState("");
    const [sevFilter, setSevFilter] = useState("All");
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = await getBugsByProject(projectId)
            console.log(docs)
            setBugs(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    useEffect(() => {
        var _openBugs = 0, _inProgressBugs = 0, _closedBugs = 0;
        if (bugs[0] !== null) {
            bugs.forEach((bug) => {
                if (bug.data().status === "Open" || bug.data().status === "Reopened") _openBugs++;
                else if (bug.data().status === "Assigned" || bug.data().status === "Pending retest") _inProgressBugs++;
                else if (bug.data().status === "Closed") _closedBugs++;
            })
            setOpenBugs(_openBugs);
            setInProgressBugs(_inProgressBugs);
            setClosedBugs(_closedBugs);
            setProgressPercent((100*_closedBugs/bugs.length).toFixed(1));
        }
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
            <div className="buglist__container">
                <Card className="buglist__summary" style={{backgroundColor: '#E3EAFF', borderRadius: '12px'}}>
                    <Row className="buglist__summaryRow">
                        <Col>
                            <h5>{_projectName}</h5>
                            <strong>Project Summary</strong><br/>
                            Open: {openBugs}<br/>
                            In Progress: {inProgressBugs}<br/>
                            Closed: {closedBugs}<br/>
                        </Col>
                        <Col className="buglist__progressContainer" >
                            <CircularProgressbar className="buglist__progress" value={progressPercent} maxValue={100} text={`${progressPercent}%`}  />
                        </Col>
                    </Row>
                </Card>
                <Row className="buglist__btnContainer">
                    <Col><Button className="buglist__btn" onClick={goToAddBug}>
                        Add Bug
                    </Button></Col>
                    <Col><Input 
                        className="buglist__searchBar" 
                        style={{borderRadius: '8px'}}
                        onChange={(e) => setSevFilter(e.target.value)}
                        value={sevFilter}
                        type="select">
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input></Col>
                    <Col><Input className="buglist__searchBar" 
                        placeholder="Search Bug" 
                        style={{borderRadius: '8px'}}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}>
                    </Input></Col>
                </Row>
                {bugs[0] === null && <div className="buglist__spinnerContainer"><Spinner className="buglist__spinner"/></div>}
                {bugs.length === 0 && <div className="buglist__nobugText"><p>There are no bugs in this project.</p></div>}
                {bugs[0] !== null && bugs.map(bug => (
                    bug.data().bugName.includes(searchText) && (sevFilter === "All" || bug.data().severity === sevFilter) &&
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