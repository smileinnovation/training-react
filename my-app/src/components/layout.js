import React from "react";
import { Container, Segment } from "semantic-ui-react";

const Layout = ({children}) => {
    return <Container className="app-content">
        <Segment raised>
            {children}
        </Segment>
    </Container>
}

export default Layout