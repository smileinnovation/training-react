import React, { useState } from 'react';
import { Form, Message } from "semantic-ui-react";
import Layout from "../components/layout";
import { useHistory } from "react-router-dom";

const Login = ({authService, location}) => {
    const [id, setId ] = useState('');
    const [password, setPassword ] = useState('');
    const [errors, setErrors] = useState({});
    const [dirty, setDirty ] = useState(false);
    const history = useHistory();

    const checkFields = (values, newErrors) => {
        Object.entries(values).forEach(([k, v]) => {
            if(v.length === 0) {
                newErrors[k] = 'This field is mandatory';
            } else {
                delete newErrors[k];
            }
        })
        delete newErrors['authError'];
        return newErrors;
    }

    const handleChange = (e, f) => {
        const v = e.target.value;
        const setter = f === 'id' ? setId : setPassword;
        const values = f === 'id' ? {id: v, password } : {id, password: v}
        const newErrors = checkFields(values, errors);
        setDirty(true);
        setter(v);
        setErrors(newErrors);
    }

    const login = (e) => {
        e.preventDefault();
        authService.login(id, password).then(r => {
            if(!!r) {
                history.replace(location);
            } else {
                const newError = {...errors, authError:'invalid login or password'};
                setErrors(newError);
                setPassword('');
            }
        });
    }

    return (
        <Layout>
            <Form error={!!errors.authError}>
                <Form.Group widths='equal'>
                    <Form.Input label="User Id" name="id" value={id} onChange={(e) => { handleChange(e, 'id')}} error={errors.id} />
                    <Form.Input type="password" label="Password" name="password" value={password} onChange={(e) => { handleChange(e, 'password')}} error={errors.password} />
                </Form.Group>
                <Form.Button disabled={!dirty || Object.keys(errors).length > 0} color="blue" onClick={login}>Login</Form.Button>
                {!!errors.authError ?
                    <Message error content={errors.authError}/> : null
                }
            </Form>
        </Layout>
    )
}

export default Login;