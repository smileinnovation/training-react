import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";

class Layout extends Component {
    render() {
        return <Container>
            <Segment raised>
                {this.props.children}
            </Segment>
        </Container>
    }
}

export default Layout