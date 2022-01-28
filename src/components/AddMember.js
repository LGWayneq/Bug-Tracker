import React, {useState, useEffect} from "react";
import {getAllUsers} from "../firebaseDao";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

function AddMember(props) {
    const [activeDropdown, setActiveDropdown] = useState(false);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const docs = await getAllUsers();
                setUsers(docs)
            } catch(error) {
                console.error(error);
                alert(error);
            }
        }
        fetchData();
    }, [])

    const addTeamMember = (name) => {
        var index;
        for (let i = 0; i < users.length; i++) {
            if (users[i].data().name === name) {
                index = i;
                break;
            }
        }
        setMembers([...members, users[index]]);
        setUsers(users.filter((user) =>
            user.data().name !== name
        ))
    }

    useEffect(async() => {
        props.getTeamMembers(members);
    })

    return (
        <div>
            <ButtonDropdown toggle={() => setActiveDropdown(!activeDropdown)} isOpen={activeDropdown}>
                <DropdownToggle caret>
                    Select Team Member
                </DropdownToggle>
                <DropdownMenu>
                    {users.map(user => 
                        <DropdownItem key={user.id} value={user.data().name} onClick={(e) => addTeamMember(e.target.value)}>
                            {user.data().name}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    )
};

export default AddMember;