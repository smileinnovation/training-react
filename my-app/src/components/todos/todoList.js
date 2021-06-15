import React, { Component } from 'react';
import { Table } from "semantic-ui-react";

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
            <div>
                <ul>
                    {this.state.todos.map( t => <li key={t.id}>{t.title}</li> )}
                </ul>
            </div>
        );
    }
}

export default TodoList;