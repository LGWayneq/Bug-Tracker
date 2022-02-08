import { getAssignedBugs } from "../firebaseDao";
import React, { useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import { Card, Spinner, Button, Input, Row, Col } from "reactstrap";
import "./BugsList.css"
import "./AssignedBugsList.css"

function AssignedBugsList(props) {
    const [bugs, setBugs] = useState([null]);
    const [searchText, setSearchText] = useState("");
    const [sevFilter, setSevFilter] = useState("All Severity");
    const [statusFilter, setStatusFilter] = useState("All Status");
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
                <div className="buglist__titleContainer">
                    <h3 className="buglist__title">Assigned Bugs</h3>
                </div>
                <Row className="buglist__btnContainer">
                    <Col><Input 
                            className="buglist__searchBar" 
                            style={{borderRadius: '8px'}}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            value={statusFilter}
                            type="select">
                            <option value="All Status">All Status</option>
                            <option value="Open">Open</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Pending retest">Pending retest</option>
                            <option value="Reopened">Reopened</option>
                            <option value="Closed">Closed</option>
                    </Input></Col>
                    <Col><Input 
                        className="buglist__searchBar" 
                        style={{borderRadius: '8px'}}
                        onChange={(e) => setSevFilter(e.target.value)}
                        value={sevFilter}
                        type="select">
                        <option value="All Status">All Status</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input></Col>
                    <Col/>
                    <Col><Input className="buglist__searchBar" 
                        placeholder="Search Bug" 
                        style={{borderRadius: '8px'}}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}>
                    </Input></Col>
                </Row>
                {bugs[0] === null && <div className="buglist__spinnerContainer"><Spinner className="buglist__spinner"/></div>}
                {bugs.length === 0 && <div className="buglist__nobugText"><p>There are no bugs assigned to you.</p></div>}
                {bugs[0] !== null && bugs.map(bug => ( bug.data().bugName.includes(searchText) && (sevFilter === "All Severity" || bug.data().severity === sevFilter) && (statusFilter === "All Status" || bug.data().status === statusFilter) &&
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