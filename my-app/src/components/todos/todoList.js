import React from 'react';
import { Table, Loader } from "semantic-ui-react";
import { useTodo } from "../../context/listStore";
import TodoItem from "./todoItem";
import NewTodo from "./newTodo";
import WithLoading from "../withLoading";

const orderByTaskPriority = (t1, t2) => {
    if(t1.priority < t2.priority) return -1;
    if(t1.priority > t2.priority) return 1;
    return 0;
};

const TodoList = () => {
    const [todo] = useTodo();

    return (
        <div id="todos">
            <NewTodo />
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
                    {todo.data
                        .sort(orderByTaskPriority)
                        .map(t => <TodoItem key={t.id} todo={t} />)
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

const TodoListLoader = () => <div id="todos"><Loader active inline='centered' >Retrieving Todos...</Loader></div>
const TodoListWithLoading = WithLoading(TodoList, TodoListLoader);

const TodoListWrapper = () => {
    const [todo] = useTodo();
    return <TodoListWithLoading isLoading={todo.fetching} />
}

export default TodoListWrapper;
