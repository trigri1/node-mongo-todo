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


    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID("5c1a785b59364c24772b4f36")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });


    db.collection('Users').findOneAndUpdate({
        _id: ObjectID("5c1b074f59c11837e51001f7")
    }, {
        $set: {
            name: 'Dani'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    console.log(' connected to MongoBB');
    // database.close();
});