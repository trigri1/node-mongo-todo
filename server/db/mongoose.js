//https://stackoverflow.com/questions/36321385/deploy-nodejs-mongodb-on-heroku-but-need-verify-credit-card-when-install-add-o
// var url = 'mongodb://todo-user:1todouser@ds141654.mlab.com:41654/todo-test-db'

const mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI;

mongoose.Promise = global.Promise
mongoose.connect(url, {
    useNewUrlParser: true
})

module.exports = {
    mongoose
};