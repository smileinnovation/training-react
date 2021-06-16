import React from 'react';
import { Table, Icon, Popup, Button } from "semantic-ui-react";

const TodoItem = ({todo, toggleStatus, removeTask}) => {
    return (
        <Table.Row>
            <Table.Cell>
                <Popup content={todo.description} trigger={<span>{todo.title}</span>} />
            </Table.Cell>
            <Table.Cell>
                {todo.priority}
            </Table.Cell>
            <Table.Cell onClick={toggleStatus}>
                {todo.done ? <Icon link color="blue" name="check"/> : <Icon link color="red" name="x"/>}
            </Table.Cell>
            <Table.Cell>
                <Button title="remove" icon onClick={removeTask}>
                    <Icon name='trash' />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default TodoItem;