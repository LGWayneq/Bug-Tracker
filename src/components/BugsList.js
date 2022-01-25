import { getBug, getAllBugs, deleteBug } from "../firebaseDao";
import React, { useState, useEffect } from "react";

function BugsList() {
    const [bugs, setBugs] = useState([]);
    const [bugId, setBugId] = useState("");

    useEffect(async() => {
        try {
            const docs = await getAllBugs();
            setBugs(docs)
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }, [])

    const confirmDeleteBug = () => {
        deleteBug(bugId);
    }

    return (
        <div>
            {bugs.map(bug => (
                <div key={bug.id}>
                    {bug.data().name}
                </div>    
            ))}            
        </div>
    )
}

export default BugsList;