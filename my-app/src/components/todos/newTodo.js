import React, { useState } from 'react';
import { Modal, Container, Button, Icon, Form } from "semantic-ui-react";

const defaultTodo = {
    title:'',
    priority:10,
    description:'',
}

const NewTodo = ({onCreateNewTodo}) => {
    const [ showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTodo, setNewTodo] = useState({...defaultTodo});
    const [dirty, setDirty ] = useState(false);
    const [errors, setErrors] = useState({});

    const checkFields = (todo, errors) => {
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

    const handleChange = (e, f) => {
        const updatedTodo = {...newTodo, [f]:e.target.value };
        const newErrors = checkFields(updatedTodo, errors);
        setDirty(true);
        setNewTodo(updatedTodo);
        setErrors(newErrors);
    }

    const onShowNewTaskForm = () => {
        setNewTodo({...defaultTodo});
        setShowNewTaskModal(true);
    }

    const onCloseNewTaskForm = () => {
        setShowNewTaskModal(false);

    }

    const onCreateNewTask = () => {
        setShowNewTaskModal(false);
        onCreateNewTodo(newTodo);
    }

    return (
        <Container textAlign="right">
            <Button icon labelPosition="left" onClick={() => onShowNewTaskForm()}>
                <Icon name="plus"/> Add a new task
            </Button>
            <Modal size="large" onClose={() => onCloseNewTaskForm()} open={showNewTaskModal}>
                <Modal.Header>New Task</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input label="Task title" name="title" value={newTodo.title} onChange={(e) => { handleChange(e, 'title')}} error={errors.title} />
                            <Form.Input label="Task description" name="description" value={newTodo.description} onChange={(e) => { handleChange(e, 'description')}} error={errors.description} />
                        </Form.Group>
                        <Form.Input type="number" label="Task priority" name="priority" value={newTodo.priority} onChange={(e) => { handleChange(e, 'priority')}} error={errors.priority}/>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="grey" onClick={() => onCloseNewTaskForm()}>Cancel</Button>
                    <Button type="submit" disabled={Object.keys(errors).length > 0 || !dirty} color="blue" onClick={() => onCreateNewTask()}>Create</Button>
                </Modal.Actions>
            </Modal>
        </Container>
    )
}

export default NewTodo;