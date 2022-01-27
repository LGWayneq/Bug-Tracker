import React from "react";
import {Button, Navbar, NavbarText, NavItem, NavLink, NavbarBrand, Spinner} from 'reactstrap';
import { logout } from "../firebase";
import "./AppNavbar.css";


function AppNavbar(props) {
    return (
        <Navbar className="navbar">
            <NavbarBrand className="navbar__brand">BuGone</NavbarBrand>
            <NavItem>
                <NavLink className="navbar__link" href="/projects">Projects</NavLink>
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