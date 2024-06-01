const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');
const postsFile = path.join(__dirname, '../data/posts.json');
const commentsFile = path.join(__dirname, '../data/comments.json');

const getUsers = () => {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
};

const getPosts = () => {
    const data = fs.readFileSync(postsFile);
    return JSON.parse(data);
};

const getComments = () => {
    const data = fs.readFileSync(commentsFile);
    return JSON.parse(data);
};

module.exports = { getUsers, getPosts, getComments };
