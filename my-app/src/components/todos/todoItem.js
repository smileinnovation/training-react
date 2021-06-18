import React, { useState } from 'react';
import { Table, Icon, Popup, Button } from "semantic-ui-react";
import { useTodoActions } from "../../context/listStore";

const TodoItem = ({todo}) => {
    const [itemUpdating, setItemUpdating ] = useState(false);
    const [, { setTodoDone, unsetTodoDone, removeTodoById }] = useTodoActions();

    const toggleStatus = async () => {
        if(itemUpdating) return;
        setItemUpdating(true);
        await (todo.done ? unsetTodoDone(todo.id) : setTodoDone(todo.id)).then(_ => setItemUpdating(false));
    }

    const removeTask = async () => {
        await removeTodoById(todo.id);
    }

    return (
        <Table.Row disabled={itemUpdating}>
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
                <Button title="remove" icon onClick={removeTask} disabled={itemUpdating}>
                    <Icon name='trash' />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default TodoItem;