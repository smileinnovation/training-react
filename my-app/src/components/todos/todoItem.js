import React, { Component } from 'react';
import { Table, Icon, Popup, Button } from "semantic-ui-react";

class TodoItem extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Popup content={this.props.todo.description} trigger={<span>{this.props.todo.title}</span>} />
                </Table.Cell>
                <Table.Cell>
                    {this.props.todo.priority}
                </Table.Cell>
                <Table.Cell onClick={this.props.toggleStatus}>
                    {this.props.todo.done ? <Icon link color="blue" name="check"/> : <Icon link color="red" name="x"/>}
                </Table.Cell>
                <Table.Cell>
                    <Button title="remove" icon onClick={this.props.removeTask}>
                        <Icon name='trash' />
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default TodoItem;