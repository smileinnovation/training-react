import React, { Component } from 'react';
import { Modal, Container, Button, Icon, Form } from "semantic-ui-react";

const defaultTodo = {
    title:'',
    priority:10,
    description:'',
}

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewTaskModal:false,
            newTodo:{...defaultTodo},
            dirty:false,
            errors:{}
        }
    }

    onShowNewTaskForm() {
        this.setState((prevState) => ({...prevState, showNewTaskModal:true, newTodo:{...defaultTodo}}));
    }

    onCloseNewTaskForm() {
        this.setState((prevState) => ({...prevState, showNewTaskModal:false}));
    }

    onCreateNewTask() {
        this.setState((prevState) => ({...prevState, showNewTaskModal:false}));
        this.props.onCreateNewTodo(this.state.newTodo);
    }

    checkFields(todo, errors) {
        // empty fields
        ['title', 'description', 'priority'].forEach(f => {
            if(!!!todo[f] || todo[f].length === 0) {
                errors[f] = "This field cannot be empty";
            } else {
                delete errors[f];
            }
        });

        // 'priority' field specific rule
        if(1 > todo.priority || todo.priority > 10) {
            errors['priority'] = "Priority must be a number between 1 and 10";
        }
        return errors;
    }

    handleChange(e, f) {
        const { newTodo, errors } = this.state;
        newTodo[f] = e.target.value;
        const newErrors = this.checkFields(newTodo, errors);
        this.setState((prevState) => ({...prevState, newTodo, errors:newErrors, dirty:true}));
    }

    render() {
        return (
            <Container textAlign="right">
                <Button icon labelPosition="left" onClick={() => this.onShowNewTaskForm()}>
                    <Icon name="plus"/> Add a new task
                </Button>
                <Modal size="large" onClose={() => this.onCloseNewTaskForm()} open={this.state.showNewTaskModal}>
                    <Modal.Header>New Task</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input label="Task title" name="title" value={this.state.newTodo.title} onChange={(e) => { this.handleChange(e, 'title')}} error={this.state.errors.title} />
                                <Form.Input label="Task description" name="description" value={this.state.newTodo.description} onChange={(e) => { this.handleChange(e, 'description')}} error={this.state.errors.description} />
                            </Form.Group>
                            <Form.Input type="number" label="Task priority" name="priority" value={this.state.newTodo.priority} onChange={(e) => { this.handleChange(e, 'priority')}} error={this.state.errors.priority}/>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="grey" onClick={() => this.onCloseNewTaskForm()}>Cancel</Button>
                        <Button type="submit" disabled={Object.keys(this.state.errors).length > 0 || !this.state.dirty} color="blue" onClick={() => this.onCreateNewTask()}>Create</Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        )
    }
}

export default NewTodo;