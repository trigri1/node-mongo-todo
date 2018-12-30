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

var {
    User
} = require('./../models/user');

var {
    todos,
    populateTodos,
    users,
    populateUsers
} = require('./seed/seed')


beforeEach(populateUsers);
beforeEach(populateTodos);


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

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var completed = true;
        var text = 'updated text';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed
            })
            .expect(200)
            .expect((res) => {
                expect(res.todo.text).toBe(text);
                expect(res.todo.completed).toBeTruthy();
                expect(res.todo.completedAt).toBeA(Number);
            }).end(() => done());
    });

    it('should clear completedAt when completed is not true', (done) => {
        var id = todos[1]._id.toHexString();
        var completed = false;
        var text = 'updated text';
        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.todo.text).toBe(text);
                expect(res.todo.completed).toBeFalsy();
                expect(res.todo.completedAt).toBeFalsy();
            }).end(() => done());
    });
})


describe('GET /users/me', () => {

    it('should return a user', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            }).end(done);
    });

    it('should return 401 if user not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
                // expect(res.body._id).toBeFalsy();
                // expect(res.body.email).toBeFalsy();
            }).end(done);
    });
});


describe('POST /users', () => {

    it('should create a user', (done) => {

        var email = 'email@email.com';
        var password = 'pass123';
        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            }).end((err) => {
                if (err) {
                    done(err);
                }

                User.findOne({
                    email
                }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return invalidation error if request is invalid', (done) => {
        var email = 'email';
        var password = 'pass';
        request(app)
            .post('/users')
            .send({
                email,
                password
            }).expect(400)
            .end(done)
    });

    it('should not create a user if email is already in use', (done) => {
        var email = users[0].email;
        var password = 'pass123';
        request(app)
            .post('/users')
            .send({
                email,
                password
            }).expect(400)
            .end(done)
    });
});

describe('POST users/login', () => {
    it('should loging user and return token ', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            }).expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeTruthy();
            }).end((err, res) => {
                if (err) {
                    done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.tokens[0]).toMatchObject({
                        access: 'auth',
                        token: res.header['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should reject invalid login', () => {

        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + "123"
            }).expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeFalsy();
            }).end((err, res) => {
                if (err) {
                    done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });

});