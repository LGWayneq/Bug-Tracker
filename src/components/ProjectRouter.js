import {Route, Routes} from "react-router-dom";
import React, { useEffect, useState } from "react";
import BugsList from "./BugsList";
import ProjectList from "./ProjectList";
import AddBug from "./AddBug";
import AddProject from "./AddProject";

function ProjectRouter(props) {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<ProjectList/>}/>
                <Route path="/overview" element={<BugsList name={props.name}/>}/>
                <Route path="/overview/*" element={<AddBug/>}/>
                <Route path="/editproject" element={<AddProject/>}/>
            </Routes>
        </div>
    )
}

export default ProjectRouter;