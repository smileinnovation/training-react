import React, { useState } from "react"
import { Menu, Container, Icon } from "semantic-ui-react";
import authSvc from "../services/authService";
import {NavLink, useHistory} from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const [ activeItem, setActiveItem ] = useState("");
    const logout = () => {
        authSvc.logout();
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
                    {authSvc.isLoggedIn() ?
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
