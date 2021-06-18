import { createStore, createHook, createContainer } from 'react-sweet-state';
import todoActions from './todoActions';

// List store Initial state
const initialState = {
    todo: { fetching:false, data:null },
};

// List Store
const listStore = createStore({
    initialState,
    actions:{...todoActions },
    name:"listStore"
});

// Selector to sub-select todo state from the store
const todoSelector = state => state.todo;

export const useTodo = createHook(listStore, { selector: todoSelector });
export const useTodoActions = createHook(listStore, { selector: null });

export const ListContainer = createContainer(listStore, {
    onInit:() => ({ getState, dispatch, setState }) => {
        dispatch(todoActions.fetchTodo());
    }
});
