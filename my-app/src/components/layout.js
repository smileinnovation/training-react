import React from "react";
import { Container, Segment } from "semantic-ui-react";
import NavBar from "./NavBar";

const Layout = ({children}) => {
    return <>
        <NavBar/>
        <Container className="app-content">
            <Segment raised>
                {children}
            </Segment>
        </Container>
    </>
}

export default Layout