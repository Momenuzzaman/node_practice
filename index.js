const express = require('express');
const app = express();
var cors = require('cors');



app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("Hello Emon");
});


const users = [
    { id: 1, name: 'Emon', age: 23 },
    { id: 2, name: 'Liton', age: 24 },
    { id: 3, name: 'Rabaya', age: 34 },
    { id: 4, name: 'Ruhi', age: 11 },
];
app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(matched);
    }
    else {
        res.send(users);
    }

});

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    res.send(user);
});

app.post('/user', (req, res) => {
    console.log('req', req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});