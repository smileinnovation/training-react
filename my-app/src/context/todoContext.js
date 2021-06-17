import React, { useState, useEffect, useCallback } from 'react';
import todoSvc from "../services/todos";

export const TodoContext = React.createContext({
    todos:[],
    isLoading:false,
    refreshTodos:() => {},
    add:() => {},
    getById:() => {},
    removeById:() => {},
    setTaskDone:() => {},
    unsetTaskDone:() => {}
});

TodoContext.displayName = "TodoContext";

export const TodoProvider = ({children}) => {
    const [ isLoading, setIsLoading] = useState(false);
    const [ todos, setTodos ] = useState([]);

    const refreshTodos = useCallback(async () => {
        setIsLoading(true);
        const todos = await todoSvc.getAll();
        setTodos(todos);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refreshTodos();
    }, [refreshTodos]);

    const svc = {
        todos,
        isLoading,
        refreshTodos:() => refreshTodos(),
        add:(title, priority, description) => todoSvc.add(title, priority, description),
        getById:(id) => todoSvc.getById(id),
        removeById:(id) => todoSvc.removeById(id),
        setTaskDone:(id) => todoSvc.setTaskDone(id),
        unsetTaskDone:(id) => todoSvc.unsetTaskDone(id)
    };

    return (
        <TodoContext.Provider value={svc}>
            {children}
        </TodoContext.Provider>
    );
}