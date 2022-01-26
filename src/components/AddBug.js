import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {addBug, deleteBug, editBug} from "../firebaseDao";
import "./AddBug.css";

function AddBug() {
    const { state } = useLocation();
    const { _bugId, _reporterName, _bugName, _bugDescription, _severity, _status, workFunction } = state;

    const _bugNameNonNull = (_bugName == null) ? "" : _bugName;
    const _bugDescriptionNonNull = (_bugDescription == null) ? "" : _bugDescription;
    const _severityNonNull = (_severity == null) ? "High" : _severity;
    const _statusNonNull = (_status == null) ? "Open" : _status;
    const [reporterName, setReporterName] = useState(_reporterName);
    const [bugName, setBugName] = useState(_bugNameNonNull);
    const [bugDescription, setBugDescription] = useState(_bugDescriptionNonNull);
    const [severity, setSeverity] = useState(_severityNonNull);
    const [status, setStatus] = useState(_statusNonNull);
    
    const navigate = useNavigate();

    const confirmAddOrEdit = () => {
        const startDate = new Date(Date());
        const data = { reporterName, bugName, bugDescription, severity, status, startDate };
        if (workFunction === "Add") addBug(data);
        else editBug(data, _bugId);
        navigate(-1);
    }


    const confirmDeleteBug = () => {
        deleteBug(_bugId);
        navigate(-1)
    }


    return (
        <div className="addbug">
            <div className="addbug__container">
                <input 
                type="text"
                className="addbug__textBox"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Reporter"
                />
                <input 
                type="text"
                className="addbug__textBox"
                value={bugName}
                onChange={(e) => setBugName(e.target.value)}
                placeholder="Bug Name"
                />
                <input 
                type="text"
                className="addbug__textBox"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                placeholder="Bug Description"
                />
                <select className="addbug__dropdown" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select className="addbug__dropdown" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending retest">Pending retest</option>
                    <option value="Reopened">Reopened</option>
                    <option value="Closed">Closed</option>
                </select>
                <button className="addbug__btn"
                onClick={confirmAddOrEdit}>
                    {workFunction} Bug
                </button>
                { workFunction === "Edit" && 
                    <button className="addbug__btn" onClick={confirmDeleteBug}>
                        Delete Bug
                    </button>
                }
            </div>
        </div>
    )
};

export default AddBug;