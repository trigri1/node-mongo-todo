var express = require('express');
var bodyParser = require('body-parser')

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
        console.log('Error saving todo' + error);
    })
})

app.listen(3000, () => {
    console.log('listening at port 3000');
});



// var newTodo = new Todo({
//     text: 'Cook dinner',
// });

// var newTodo = new Todo({
// text: 'Cook dinner',
// completed: false,
// completedAt: 12345
// });

// var newTodo = new Todo({
//     text: 'Edit Video',
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo ' + doc);
// }, (err) => {
//     console.log('Unable to save ' + err);
// })




// var newUser = User({
//     email: 'abc@xyz.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved todo ' + doc);
// }, (err) => {
//     console.log('Unable to save ' + err);
// });