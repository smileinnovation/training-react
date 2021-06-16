import React, { Component } from 'react';
import { Table } from "semantic-ui-react";
import TodoItem from "./todoItem";
import NewTodo from "./newTodo";

const orderByTaskPriority = (t1, t2) => {
    if(t1.priority < t2.priority) return -1;
    if(t1.priority > t2.priority) return 1;
    return 0;
};

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:[],
            loading:false
        }
    }

    onCreateNewTodo(todo) {
        this.setState((prevState) => ({...prevState, loading:true}));
        this.props.todoSvc.add(todo.title, todo.priority, todo.description).then(_ => {
            this.props.todoSvc.getAll().then(todos =>
                this.setState({todos, loading:false})
            )
        });
    }

    toggleTaskStatus(todo) {
        this.setState((prevState) => ({...prevState, loading:true}));
        const fct = todo.done ? this.props.todoSvc.unsetTaskDone(todo.id) : this.props.todoSvc.setTaskDone(todo.id);
        fct.then(_ => {
            this.props.todoSvc.getAll().then(todos =>
                this.setState({todos, loading:false})
            )
        });
    }

    removeTask(id) {
        this.setState((prevState) => ({...prevState, loading:true}));
        this.props.todoSvc.removeById(id).then(_ => {
            this.props.todoSvc.getAll().then(todos =>
                this.setState({todos, loading:false})
            )
        });
    }

    componentDidMount() {
        this.setState((prevState) => ({...prevState, loading:true}));
        this.props.todoSvc.getAll().then(todos =>
            this.setState({todos, loading:false})
        );
    }

    render() {
        if(this.state.loading) return <p>Loading...</p>
        return (
            <div id="todos">
                <NewTodo onCreateNewTodo={(todo) => this.onCreateNewTodo(todo)} />
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
                        {this.state.todos
                            .sort(orderByTaskPriority)
                            .map(t => <TodoItem key={t.id} todo={t} removeTask={() => this.removeTask(t.id)} toggleStatus={() => this.toggleTaskStatus(t)}/>)
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default TodoList;