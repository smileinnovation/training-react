import React  from 'react';
import { Tab } from "semantic-ui-react";
import Layout from '../components/layout';
import {TodoProvider} from "../context/todoContext";
import TodoList from '../components/todos/todoList';
import SomethingElseList from '../components/somethingElse/somethingElseList';

const panes = [
    { menuItem: 'Todos', render: () => <TodoProvider><TodoList /></TodoProvider> },
    { menuItem: 'Something Else', render: () => <SomethingElseList /> }
];

const Home = () => {
    return (
        <Layout>
            <Tab panes={panes}/>
        </Layout>
    )
}

export default Home;