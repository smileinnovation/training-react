import React, { Component } from 'react';
import { Table } from "semantic-ui-react";
import TodoItem from "./todoItem";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:[],
            loading:false
        }
    }

    componentDidMount() {
        this.setState((prevState) => ({...prevState, loading:true}));
        this.props.todoSvc.getAll().then(todos => {
            this.setState({todos, loading:false});
        });
    }

    render() {
        if(this.state.loading) return <p>Loading...</p>

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Task</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.todos.map( t => <TodoItem key={t.id} todo={t} /> )}
                </Table.Body>
            </Table>
        );
    }
}

export default TodoList;