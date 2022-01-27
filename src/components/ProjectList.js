import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getAllProjects } from "../firebaseDao";
import AppNavbar from "./AppNavbar";
import {Card} from "reactstrap"
import "./ProjectList.css";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = await getAllProjects();
            setProjects(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    const goToAddProject = () => {
        navigate("/addproject");
    }

    const editProject = (project) => {
        navigate("/editproject", { state: {
            _projectId : project.id,
            _leaderName : project.data().leaderName, 
            _projectName : project.data().projectName, 
        }
        });
    }

    return (
        <div>
            {projects.map(project => (
                <Card className="projectlist__container" key={project.id} style={{backgroundColor: '#fafffe', borderRadius: '12px'}} onClick={(e) => editProject(project)}>
                    <div className="projectlist__projectName">
                        {project.data().projectName}
                    </div>
                    <div className="projectlist__reporterName">
                        {project.data().leaderName}
                    </div>
                </Card>    
            ))}  
        </div>
    );
}

export default ProjectList;