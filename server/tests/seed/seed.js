const jwt = require('jsonwebtoken');

var {
    ObjectID
} = require('mongodb');

var {
    Todo
} = require('./../../models/todo');

var {
    User
} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'abc@xyz.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            access: 'auth'
        }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'aaa@bbb.com',
    password: 'userTwoPass'
}];

var todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: '2nd test todo',
    completed: true,
    completedAt: 123
}];

var populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
};

var populateUsers = (done) => {
    User.remove({}).then(() => {

        var userOne = new User(users[0]).save(); //returns a promise
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};