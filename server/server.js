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

const port = process.env.PORT || 3000;

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
    app.listen(port, () => {
        console.log(`listening at port ${port}`);
    });
}

module.exports = {
    app
};