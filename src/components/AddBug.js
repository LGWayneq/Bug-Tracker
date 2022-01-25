import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {addBug} from "../firebaseDao";
import "./AddBug.css";

function AddBug() {
    const [bugName, setBugName] = useState("");
    const [bugDescription, setBugDescription] = useState("");
    const navigate = useNavigate();

    const confirmAddBug = () => {
        addBug(bugName, bugDescription);
        navigate("/dashboard");
    }

    return (
        <div className="addbug">
            <div className="addbug__container">
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
                <button className="addbug__btn"
                onClick={confirmAddBug}>
                    Add Bug
                </button>
            </div>
        </div>
    )
};

export default AddBug;