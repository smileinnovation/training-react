import React, { useState, useContext } from "react"
import { Menu, Container, Icon } from "semantic-ui-react";
import {NavLink, useHistory} from "react-router-dom";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
    const history = useHistory();
    const authService = useContext(AuthContext);
    const [ activeItem, setActiveItem ] = useState("");
    const logout = () => {
        authService.logout();
        history.replace('/');
    }

    return <>
            <Menu>
                <Container>
                    <Menu.Item name="Home" as={NavLink} exact to="/" active={activeItem === "home"} onClick={() => setActiveItem("home")} >
                        <Icon name="clipboard outline" />
                        Home
                    </Menu.Item>
                    <Menu.Item name="Private" as={NavLink} exact to="/private-page" active={activeItem === "home"} onClick={() => setActiveItem("home")} >
                        <Icon name="lock" />
                        Private
                    </Menu.Item>
                    {authService.isLoggedIn() ?
                    <Menu.Item position='right' name="Logout" onClick={e => {
                        e.preventDefault()
                        logout();
                    }} >
                        <Icon name="sign-out" />
                        Logout
                    </Menu.Item>
                        : null }
                </Container>
            </Menu>
        </>
}

export default NavBar;
