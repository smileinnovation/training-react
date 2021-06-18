import todoSvc from "../services/todos";

const refreshTodo = async (setState) => {
    return todoSvc.getAll()
        // [...todos] is IMPORTANT HERE, as state mutation is based on object reference equality,
        // doing so we make sure a refresh call force state mutation
        .then(todos => setState({todo:{data:[...todos], fetching:false, error:null}}))
        .catch(e => setState({todo:{data:[], fetching:false, error:e}}));
};

const fetchTodo = () => async ({getState, setState}) => {
    const { todo } = getState();
    if(todo.fetching) return;
    setState({todo:{...todo, fetching:true}});
    await refreshTodo(setState);
};

const addTodo = (title, priority, description) => async ({setState}) => {
    await todoSvc.add(title, priority, description);
    await refreshTodo(setState);
};

const removeTodoById = (id) => async ({setState}) => {
    await todoSvc.removeById(id);
    await refreshTodo(setState);
};

const setTodoDone = (id) => async ({setState}) => {
    await todoSvc.setTaskDone(id);
    await refreshTodo(setState);
};

const unsetTodoDone = (id) => async ({setState}) => {
    await todoSvc.unsetTaskDone(id);
    await refreshTodo(setState);
};

const todoActions = {
    fetchTodo,
    addTodo,
    removeTodoById,
    setTodoDone,
    unsetTodoDone
};

export default todoActions;