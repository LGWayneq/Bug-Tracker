import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Navbar, NavbarText, NavItem, NavLink, NavbarBrand, Spinner} from 'reactstrap';
import { logout } from "../firebase";
import "./AppNavbar.css";


function AppNavbar(props) {
    const navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate("/projects");
    };
    const navigateToBugs = () => {
        navigate("/bugs", { state : {projectId: null}})
    };

    const navbarLinks = <div className="navbar__item__container">
                <NavItem className="navbar__item">
                    <NavLink className="navbar__link" href="/projects">Projects</NavLink>
                </NavItem>
                <NavItem className="navbar__item">
                    <NavLink className="navbar__link" href="" onClick={navigateToBugs}>Bugs</NavLink>
                </NavItem>
            </div>;

    return (
        <Navbar className="navbar" fixed="top">
            <NavbarBrand className="navbar__brand" onClick={navigateToDashboard}><strong>BuGone</strong></NavbarBrand>
            {navbarLinks}
            <div>
                <NavbarText className="navbar__details">
                    Logged in as{" "} {props.name === "" && <Spinner></Spinner>}{<strong>{props.name}</strong>}
                </NavbarText>
                <Button className="navbar__btn" onClick={logout} color="dark">
                    Logout
                </Button>
            </div>
        </Navbar>
    )
}

export default AppNavbar;