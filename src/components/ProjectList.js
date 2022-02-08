import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects, getAuthorisedProjects } from "../firebaseDao";
import {Card, Button, Spinner} from "reactstrap"
import "./ProjectList.css";

function ProjectList(props) {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(async() => {
        try {
            const docs = await getAuthorisedProjects(props.uid);
            setProjects(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [props.uid])

    const goToAddProject = () => {
        navigate("/addproject", { state: {_teamMembers : [],workFunction: "Add"}});
    }

    const goToOverview = (project) => {
        navigate("/projects/overview", { state: {
            projectId : project.id,
            _projectName : project.data().projectName, 
        }
        });
    }

    const editProject = (project) => {
        navigate("/projects/editproject", { state: {
            projectId : project.id,
            _leaderName : project.data().leaderName, 
            _projectName : project.data().projectName, 
            _teamMembers : project.data().teamMembers,
            workFunction: "Edit"
        }
        });  
    };

    return (
        <div className="projectlist">
            <div className="projectlist__container">
                <Button className="projectlist__btn" onClick={goToAddProject}>Add Project</Button>
                {projects.length === 0 && <div className="projectlist__spinnerContainer"><Spinner className="projectlist__spinner"/></div>}
                <div className="projectlist__cardContainer">
                {projects.map(project => (
                    <Card className="projectlist__card" key={project.id} style={{backgroundColor: '#E3EAFF', borderRadius: '12px'}} >
                        <div className="projectlist__projectName">
                            <h4>{project.data().projectName}</h4>
                        </div>
                        <div className="projectlist__reporterName">
                            <strong>Project Lead: </strong>{project.data().leaderName}
                        </div>
                        <div className="projectlist__cardBtnContainer">
                            <Button className="projectlist__cardBtn" onClick={() => goToOverview(project)}>Project Overview</Button>
                            <Button className="projectlist__cardBtn" onClick={() => editProject(project)}>Edit Project</Button>
                        </div>
                    </Card>    
                ))}
                </div>  
            </div>
        </div>
    );
}

export default ProjectList;