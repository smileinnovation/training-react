import React  from 'react';
import { Tab } from "semantic-ui-react";
import { ListContainer } from "../context/listStore";
import Layout from '../components/layout';
import TodoList from '../components/todos/todoList';
import SomethingElseList from '../components/somethingElse/somethingElseList';

const panes = [
    { menuItem: 'Todos', render: () => <TodoList /> },
    { menuItem: 'Something Else', render: () => <SomethingElseList /> }
];

const Home = () => {
    return (
        <ListContainer>
            <Layout>
                <Tab panes={panes}/>
            </Layout>
        </ListContainer>
    )
}

export default Home;