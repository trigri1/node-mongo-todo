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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c1af85159c11837e50fff11')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     if (err) {
    //         console.log('Unable to fecth docs MongoBB');
    //     }
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(' Todos count = ' + count);
    //     // console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     if (err) {
    //         console.log('Unable to fecth docs MongoBB');
    //     }
    // });

    db.collection('Users').find({
        name: 'Ali'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if (err) {
            console.log('Unable to fecth docs MongoBB');
        }
    })

    console.log(' connected to MongoBB');
    database.close();
});