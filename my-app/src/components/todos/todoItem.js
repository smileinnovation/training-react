import React, { Component } from 'react';
import { Table, Icon } from "semantic-ui-react";

class TodoItem extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    {this.props.todo.title}
                </Table.Cell>
                <Table.Cell>
                    {this.props.todo.priority}
                </Table.Cell>
                <Table.Cell>
                    {this.props.todo.done ? <Icon name="check"/> : <Icon name="x"/>}
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default TodoItem;