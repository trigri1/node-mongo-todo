const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');

const {
    User
} = require('./../server/models/user');

var id = '5c1d0cc348c0ab0b1fa2b0c0';
var userId = '5c1bbac1296a0209c6af3fdc'

// if (!ObjectID.isValid(id)) {
//     return console.log('Id is invalid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// }).catch((e) => {
//     console.log(e);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }

//     console.log(todo);
// }).catch((e) => {
//     console.log(e);
// });

if (!ObjectID.isValid(userId)) {
    return console.log('UserId is invalid');
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(user);
}).catch((e) => console.log(e));