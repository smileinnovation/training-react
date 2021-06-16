const users = [
    { id:'user1', password: 'password', name:'foo' },
    { id:'user2', password: 'password', name:'bar' }
];

class AuthService {
    constructor() {
        this._isLoggedIn = false;
        this._user = null;
    }

    isLoggedIn() { return this._isLoggedIn }

    logout() {
        this._isLoggedIn = false;
    }

    getUser() {
        return this._user;
    }

    login(id, password) {
        return new Promise((resolve => {
            const u = users.find(u => u.id === id && u.password === password);
            if(!!u) {
                this._isLoggedIn = true;
                this._user = {name:u.name, id:u.id};
                resolve(u);
            } else resolve(null);
        }));
    }
}

const authSvc = new AuthService();

export default authSvc;