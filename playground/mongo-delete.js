// const MongoClient = require('mongodb').MongoClient;

const {
    MongoClient,
    ObjectID
} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, database) => {
    if (err) {
        return console.log('Unable to connect to MongoBB');
    }
    const db = database.db();


    // db.collection('Todos').deleteMany({
    //     text: 'have lunch'
    // }).then((result) => {
    //     console.log(result);
    // });


    // db.collection('Todos').deleteOne({
    //     text: 'have lunch'
    // }).then((result) => {
    //     console.log(result);
    // })

    // db.collection('Todos').findOneAndDelete({
    //     text: 'have lunch'
    // }).then((result) => {
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({
    //     name: 'Ali'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     if (err) {
    //         return console.log('Unable to delet from collection', err);

    //     }
    // })

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5c1b048059c11837e5100149")
    }).then((result) => {
        console.log(result);
    })

    console.log(' connected to MongoBB');
    // database.close();
});