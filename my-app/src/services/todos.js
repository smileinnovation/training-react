import { v4 as uuid } from 'uuid';

const defaultTodos = [
    {
        id:uuid(),
        title:"A very important task",
        priority:1,
        description:"A task that must be done right now",
        done:false
    },
    {
        id:uuid(),
        title:"A less important task",
        priority:10,
        description:"A task that can be done tomorrow or next week",
        done:false
    }
]

class Todos {
    constructor() {
        this._todos = defaultTodos;
    }

    _setTodoField(id, field, value) {
        const t = this._todos.find(t => t.id === id);
        t[field] = value;
        return t;
    }

    add(title, priority, description) {
        const t = {
            id:uuid(),
            title,
            priority,
            description,
            done:false
        };
        this._todos.push(t);
        return Promise.resolve(t);
    }

    removeById(id) {
        const idx = this._todos.findIndex(t => t.id === id);
        if(idx > -1) {
            this._todos.splice(idx, 1);
        }
        return Promise.resolve(true);
    }

    getAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._todos);
            }, 500);
        });
    }
    getById(id) { return Promise.resolve(this._todos.find(t => t.id === id)) }
    setTaskDone(id) {
        this._setTodoField(id, 'done', true);
        return Promise.resolve();
    }
    unsetTaskDone(id) {
        this._setTodoField(id, 'done', false);
        return Promise.resolve();
    }

    setTaskPriority(id, priority) { return Promise.resolve(this._setTodoField(id, 'priority', priority)); }
    setTaskDescription(id, description) { return Promise.resolve(this._setTodoField(id, 'description', description)); }
}

const todoSvc = new Todos();
export default todoSvc;