import React, { useState, useEffect, useCallback } from 'react';
import { Table } from "semantic-ui-react";
import TodoItem from "./todoItem";
import NewTodo from "./newTodo";

const orderByTaskPriority = (t1, t2) => {
    if(t1.priority < t2.priority) return -1;
    if(t1.priority > t2.priority) return 1;
    return 0;
};

const TodoList = ({todoSvc}) => {
    const [ loading, setLoading] = useState(false);
    const [ todos, setTodos ] = useState([]);

    const retrieveTodo = useCallback(async () => {
        setLoading(true);
        const todos = await todoSvc.getAll();
        setTodos(todos);
        setLoading(false);
    }, [todoSvc]);

    useEffect(() => {
        retrieveTodo();
    }, [retrieveTodo])

    const onCreateNewTodo = async (todo) => {
        setLoading(true);
        await todoSvc.add(todo.title, todo.priority, todo.description);
        await retrieveTodo();
    }

    const toggleTaskStatus = async (todo) => {
        setLoading(true);
        await (todo.done ? todoSvc.unsetTaskDone(todo.id) : todoSvc.setTaskDone(todo.id));
        await retrieveTodo();
    }

    const removeTask = async (id) => {
        setLoading(true);
        await todoSvc.removeById(id);
        await retrieveTodo();
    }

    if(loading) return <p>Loading...</p>
    return (
        <div id="todos">
            <NewTodo onCreateNewTodo={(todo) => onCreateNewTodo(todo)} />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Task</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Is done?</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {todos
                        .sort(orderByTaskPriority)
                        .map(t => <TodoItem key={t.id} todo={t} removeTask={() => removeTask(t.id)} toggleStatus={() => toggleTaskStatus(t)}/>)
                    }
                </Table.Body>
            </Table>
        </div>
    );

}

export default TodoList;