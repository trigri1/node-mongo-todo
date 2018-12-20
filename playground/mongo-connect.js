// const MongoClient = require('mongodb').MongoClient;

const {
    MongoClient,
    ObjectID
} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, database) => {
    if (err) {
        return console.log('Unable to connect to MongoBB');
    }
    const db = database.db();

    // db.collection('Todos').insertOne({
    //     text: 'do something',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert in collection', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    // db.collection('Users').insertOne({
    //     name: 'Ali',
    //     age: 22,
    //     locatio:'Lahore'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert in collection', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    console.log(' connected to MongoBB');
    database.close()
});