import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {addBug, deleteBug, editBug, getUsersByProjectId} from "../firebaseDao";
import "./AddBug.css";
import { Toast, Form, FormGroup, Input, Label, Button } from "reactstrap";

function AddBug() {
    const { state } = useLocation();
    const { _bugId, projectId, _reporterName, _bugName, _bugDescription, _severity, _status, _assignedTo, workFunction } = state;

    const _bugNameNonNull = (_bugName == null) ? "" : _bugName;
    const _bugDescriptionNonNull = (_bugDescription == null) ? "" : _bugDescription;
    const _severityNonNull = (_severity == null) ? "High" : _severity;
    const _statusNonNull = (_status == null) ? "Open" : _status;
    const [reporterName, setReporterName] = useState(_reporterName);
    const [bugName, setBugName] = useState(_bugNameNonNull);
    const [bugDescription, setBugDescription] = useState(_bugDescriptionNonNull);
    const [severity, setSeverity] = useState(_severityNonNull);
    const [status, setStatus] = useState(_statusNonNull);
    const [validEntry, setValidEntry] = useState(null);
    const [assignedTo, setAssignedTo] = useState(_assignedTo);
    const [members, setMembers] = useState([]);
    
    const navigate = useNavigate();

    const confirmAddOrEdit = () => {
        setValidEntry(!(reporterName === "" || bugName === "" || bugDescription === ""))
    }

    useEffect(() => {
        const getProjectMembers = async() => {
            const docs = await getUsersByProjectId(projectId);
            setMembers(docs.map((doc) => 
                JSON.parse('{"name":"' + doc.data().name + '", "uid":"'+ doc.data().uid+'"}')
            ));
        }
        getProjectMembers()
    })
    const assignedToList = (
        <FormGroup>
            <Label>Assigned To</Label>
                <Input className="addbug__dropdown" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} type="select">
                    {members.map(member => (
                        <option key={member.uid} value={member.uid+member.name}>
                            {member.name}
                        </option>
                    ))}
                </Input>
        </FormGroup>)

    useEffect(() => {
        if (validEntry){ //validEntry has 3 states: null, false, true
            const startDate = new Date(Date());
            const data = { projectId, reporterName, bugName, bugDescription, severity, status, assignedTo, startDate };
            if (workFunction === "Add") addBug(data);
            else editBug(data, _bugId);
            navigate(-1);
        }
    }, [validEntry])

    const confirmDeleteBug = () => {
        deleteBug(_bugId);
        navigate(-1)
    }


    return (
        <div className="addbug">
            <Form className="addbug__container">
                <FormGroup>
                    <Label>Reporter Name</Label>
                    <Input 
                    type="text"
                    className="addbug__textBox"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Reporter Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Bug Name</Label>
                    <Input 
                    type="text"
                    className="addbug__textBox"
                    value={bugName}
                    onChange={(e) => setBugName(e.target.value)}
                    placeholder="Bug Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Bug Description</Label>
                    <Input 
                    type="textarea"
                    className="addbug__textBox"
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    placeholder="Bug Description"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Priority</Label>
                    <Input className="addbug__dropdown" value={severity} onChange={(e) => setSeverity(e.target.value)} type="select">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Status</Label>
                    <Input className="addbug__dropdown" value={status} onChange={(e) => setStatus(e.target.value)} type="select">
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending retest">Pending retest</option>
                        <option value="Reopened">Reopened</option>
                        <option value="Closed">Closed</option>
                    </Input>
                </FormGroup>
                { status === "Assigned" && assignedToList}
                { validEntry === false && <Toast className="p-3 bg-danger my-2 rounded">Please fill in empty fields.</Toast>}
                <Button className="addbug__btn"
                onClick={confirmAddOrEdit}>
                    {workFunction} Bug
                </Button>
                { workFunction === "Edit" && 
                    <Button className="addbug__btn" onClick={confirmDeleteBug}>
                        Delete Bug
                    </Button>
                }
            </Form>
        </div>
    )
};

export default AddBug;