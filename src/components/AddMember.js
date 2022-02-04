import React, {useState, useEffect} from "react";
import {getAllUsers, getUserById} from "../firebaseDao";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Button} from "reactstrap";
import "./AddMembers.css";

function AddMember(props) {
    const [activeDropdown, setActiveDropdown] = useState(false);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

    const removeUserIfMember = (members, user) => {
        var remove = false;
        for (let i = 0; i < members.length; i++) {
            if (members[i].uid === user.uid) {
                remove = true;
                break;
            }
        }
        return remove;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const docs = await getAllUsers();
                if (props.currentTeamMembers.length === 0) setUsers(docs.map((doc) => JSON.parse('{"name":"' + doc.data().name + '", "uid":"'+ doc.data().uid+'"}')));
                else {
                    setMembers(props.currentTeamMembers);
                    setUsers(docs.map((doc) => JSON.parse('{"name":"' + doc.data().name + '", "uid":"'+ doc.data().uid+'"}')).filter((user) =>
                        !removeUserIfMember(props.currentTeamMembers, user)
                    ));
                }
            } catch(error) {
                console.error(error);
                alert(error);
            }
        }
        const sortUsers = () => {
            //To do: implement sortUsers
        }
        fetchData();
        sortUsers();
    }, [])

    const addTeamMember = (name) => {
        var index;
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === name) {
                index = i;
                break;
            }
        }
        setMembers([...members, users[index]]);
        setUsers(users.filter((user) =>
            user.name !== name
        ))
    }

    useEffect(async() => {
        props.getTeamMembers(members);
    })

    const removeTeamMember = async(e) => {
        try {
            const docs = await getUserById(e.target.value);
            const newUser = JSON.parse('{"name":"' + docs[0].data().name + '", "uid":"'+ docs[0].data().uid+'"}')
            setUsers([...users, newUser]);
            setMembers(members.filter((member) => 
                member.uid !== e.target.value
            ))

        } catch(error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div>
            <ButtonDropdown toggle={() => setActiveDropdown(!activeDropdown && users.length !== 0)} isOpen={activeDropdown}>
                <DropdownToggle caret>
                    Select Team Member
                </DropdownToggle>
                <DropdownMenu>
                    {users.map(user => 
                        <DropdownItem key={user.uid} value={user.name} onClick={(e) => addTeamMember(e.target.value)}>
                            {user.name}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </ButtonDropdown>
            <Card className="addmembers__card">
                <div>
                {members.map(member => (
                    <Button className="addmembers__btn" onClick={(e) => removeTeamMember(e)} key={member.uid} value={member.uid}>
                        {member.name}
                    </Button>
                ))}
                <div className="addmembers__initial"></div>
                </div>
            </Card>
        </div>
    )
};

export default AddMember;