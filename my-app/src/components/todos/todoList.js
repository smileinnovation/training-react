import React, { useState, useEffect, useCallback } from 'react';
import { Table, Loader } from "semantic-ui-react";
import TodoItem from "./todoItem";
import NewTodo from "./newTodo";
import WithLoading from "../withLoading";

const orderByTaskPriority = (t1, t2) => {
    if(t1.priority < t2.priority) return -1;
    if(t1.priority > t2.priority) return 1;
    return 0;
};

const TodoList = ({todos, todoSvc, refreshTodos}) => {
    const onCreateNewTodo = async (todo) => {
        await todoSvc.add(todo.title, todo.priority, todo.description);
        await refreshTodos();
    }

    const toggleTaskStatus = async (todo) => {
        await (todo.done ? todoSvc.unsetTaskDone(todo.id) : todoSvc.setTaskDone(todo.id));
        await refreshTodos();
    }

    const removeTask = async (id) => {
        await todoSvc.removeById(id);
        await refreshTodos();
    }

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

const TodoListLoader = () => <div id="todos"><Loader active inline='centered' >Retrieving Todos...</Loader></div>

const TodoListWithLoading = WithLoading(TodoList, TodoListLoader);

const TodoListWrapper = ({todoSvc}) => {
    const [ isLoading, setIsLoading] = useState(false);
    const [ todos, setTodos ] = useState([]);

    const refreshTodos = useCallback(async () => {
        setIsLoading(true);
        const todos = await todoSvc.getAll();
        setTodos(todos);
        setIsLoading(false);
    }, [todoSvc]);

    useEffect(() => {
        refreshTodos();
    }, [refreshTodos]);

    return <TodoListWithLoading
        isLoading={isLoading}
        todos={todos}
        todoSvc={todoSvc}
        refreshTodos={refreshTodos}
    />
}

export default TodoListWrapper;