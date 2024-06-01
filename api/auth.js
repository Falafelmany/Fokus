const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const login = (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/pages/profile.html');
    } else {
        res.status(401).send('Invalid credentials');
    }
};

const register = (req, res) => {
    const { username, email, password } = req.body;
    const users = getUsers();
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        res.status(400).send('User already exists');
    } else {
        const newUser = { id: users.length + 1, username, email, password };
        users.push(newUser);
        saveUsers(users);
        req.session.user = newUser;
        res.redirect('/pages/profile.html');
    }
};

module.exports = { login, register };
