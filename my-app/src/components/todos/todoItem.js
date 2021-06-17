import React, { useContext } from 'react';
import { Table, Icon, Popup, Button } from "semantic-ui-react";
import {TodoContext} from "../../context/todoContext";

const TodoItem = ({todo}) => {

    const { refreshTodos, setTaskDone, unsetTaskDone, removeById } = useContext(TodoContext)

    const toggleStatus = async () => {
        await (todo.done ? unsetTaskDone(todo.id) : setTaskDone(todo.id));
        await refreshTodos();
    }

    const removeTask = async () => {
        await removeById(todo.id);
        await refreshTodos();
    }

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