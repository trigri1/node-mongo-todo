const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('../server/db/mongoose');
const {
    Todo
} = require('../server/models/todo');

const {
    User
} = require('../server/models/user');

var id = '5c1e67530ef7fb22a8fdb439';
var userId = '5c1bbac1296a0209c6af3fdc'


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove(id).then((doc) => {
    console.log(doc + 'removed');
});