import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {addProject, deleteProject, editProject} from "../firebaseDao";
import "./AddProject.css";
import { Toast, Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from "reactstrap";
import AddMember from "./AddMember";

function AddProject() {
    const { state } = useLocation();
    const { projectId, _leaderName, _projectName, _teamMembers, workFunction } = state;

    const _projectNameNonNull = (_projectName === null) ? "" : _projectName;
    const _teamMembersNonNull = (_teamMembers === null) ? [] : _teamMembers;
    const [leaderName, setLeaderName] = useState(_leaderName);
    const [projectName, setProjectName] = useState(_projectNameNonNull);
    const [validEntry, setValidEntry] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState(_teamMembersNonNull);
    const navigate = useNavigate();

    const confirmAddOrEdit = () => {
        setValidEntry(!(leaderName === "" || projectName === ""))
    }

    useEffect(() => {
        if (validEntry){ //validEntry has 3 states: null, false, true
            const startDate = new Date(Date());
            const data = { leaderName, projectName, teamMembers, startDate };
            if (workFunction === "Add") addProject(data);
            else editProject(data, projectId);
            navigate(-1);
        }
    }, [validEntry])

    const confirmDeleteProject = () => {
        deleteProject(projectId);
        navigate(-1)
    }

    const getTeamMembers = (membersList) => {
        setTeamMembers(membersList);
    }

    return (
        <div className="addproject">
            <Form className="addproject__container">
                <FormGroup>
                    <Label>Project Name</Label>
                    <Input 
                    type="text"
                    className="addproject__textBox"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Leader Name</Label>
                    <Input 
                    type="text"
                    className="addproject__textBox"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="Leader Name"
                    />
                </FormGroup>
                <AddMember getTeamMembers={getTeamMembers} currentTeamMembers={teamMembers}/>
                
                
               
                { validEntry === false && <Toast className="p-3 bg-danger my-2 rounded">Please fill in empty fields.</Toast>}
                <Button className="addproject__btn"
                onClick={confirmAddOrEdit}>
                    {workFunction} Project
                </Button>
                { workFunction === "Edit" && 
                    <Button className="addproject__btn" onClick={() => setOpenModal(true)}>Delete Project</Button>
                }
                <Modal toggle={() => openModal} isOpen={openModal}>
                    <ModalHeader toggle={() => openModal}>Alert</ModalHeader>
                    <ModalBody>Are you sure you want to delete this bug?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={confirmDeleteProject}>Confirm</Button>
                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </div>
    )
};

export default AddProject;