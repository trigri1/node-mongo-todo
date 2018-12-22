var express = require('express');
var bodyParser = require('body-parser')
var {
    ObjectID
} = require('mongodb');

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
    }, (err) => {
        res.status(400).send(err);
        // console.log('Error saving todo' + error);
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (err) => res.status(400).send(err));

});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            status: 0,
            message: 'Invalid Id'
        });
    }

    Todo.findById(id).then((todo) => {

        if (!todo) {
            return res.status(404).send({
                status: 1,
                message: 'Id not found'
            })
        }

        res.send({
            status: 1,
            message: 'OK',
            todo
        })
    }).catch((e) => res.status(400).send({
        status: 0
    }));
})


if (!module.parent) {
    app.listen(3000, () => {
        console.log('listening at port 3000');
    });
}

module.exports = {
    app
};



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