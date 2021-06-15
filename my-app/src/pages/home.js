import React, { Component } from 'react';
import Layout from '../components/layout';
import Todos from '../services/todos';
import TodoList from '../components/todos/todoList';

const todosSvc = new Todos();

class Home extends Component {
    render() {
        return (
            <Layout>
                <TodoList todoSvc={todosSvc} />
            </Layout>
        )
    }
}

export default Home;