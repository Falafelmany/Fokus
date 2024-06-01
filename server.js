const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api/api');
const auth = require('./api/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the 'pages' directory
app.use(express.static(path.join(__dirname, 'pages')));

// Serve other static files (css, js, img) as before
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', auth.login);
app.post('/register', auth.register);

app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
