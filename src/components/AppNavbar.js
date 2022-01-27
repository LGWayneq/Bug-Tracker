import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Navbar, NavbarText, NavItem, NavLink, NavbarBrand, Spinner} from 'reactstrap';
import { logout } from "../firebase";
import "./AppNavbar.css";


function AppNavbar(props) {
    const navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate("/dashboard");
    };
    return (
        <Navbar className="navbar">
            <NavbarBrand className="navbar__brand" onClick={navigateToDashboard}><strong>BuGone</strong></NavbarBrand>
            <NavItem>
                <NavLink className="navbar__link" href="/projects">Projects</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="navbar__link" href="/bugs">Bugs</NavLink>
            </NavItem>
            <NavbarText className="navbar__details">
                Logged in as{" "} {props.name === "" && <Spinner></Spinner>}{<strong>{props.name}</strong>}
            </NavbarText>
            <Button className="navbar__btn" onClick={logout}>
                Logout
            </Button>
        </Navbar>
    )
}

export default AppNavbar;