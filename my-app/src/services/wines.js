import { v4 as uuid } from 'uuid';

const defaultWines = [
    {
        id:uuid(),
        name:"Gewürztraminer Luxembourg",
        vintage:2016,
        description:"Gewürztraminer from the Moselle in Luxembourg",
        tasted:false
    },
    {
        id:uuid(),
        name:"Collioure",
        vintage:2013,
        description:"Collioure is a tiny appellation within the Roussillon region",
        tasted:false
    }
]

class Wines {
    constructor() {
        this._wines = defaultWines;
    }

    add(name, vintage, description) {
        const w = {
            id:uuid(),
            name,
            vintage,
            description
        };
        this._wines.push(w);
        return Promise.resolve(w);
    }

    removeById(id) {
        const idx = this._wines.findIndex(w => w.id === id);
        if(idx > -1) {
            this._wines.splice(idx, 1);
        }
        return Promise.resolve(true);
    }

    toggleTasted(id) {
        const w = this._wines.find(_w => _w.id === id);
        w.tasted = !w.tasted;
        return Promise.resolve(w);
    }

    getAll() { return Promise.resolve(this._wines); }
    getById(id) { return Promise.resolve(this._wines.find(w => w.id === id)) }
}

const wineSvc = new Wines();
export default wineSvc;