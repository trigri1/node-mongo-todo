//starts using command "npm run test-watch" 
const expect = require('expect');
const request = require('supertest');
const {
    ObjectID
} = require('mongodb');

var {
    app
} = require('./../server');

var {
    Todo
} = require('./../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: '2nd test todo'
}];

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
});

describe('POST/todo', () => {

    it('it should create a new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text)
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create new todo upon sending invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e)
                });
            })
    });
});

describe('GET/todos', () => {
    it('should get all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET/todos/:id', () => {
    it('should retrun one doc with specified id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 404 if todo not found', (done) => {

        request(app).get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {

        request(app).get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {

    it('should delete a todo', (done) => {
        var id = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(todos[1].id);
            })
            .end((err, res) => {

                if (err) {
                    done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should return 404 if id not found', (done) => {
        request(app).delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id is invalid', (done) => {
        request(app).delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});