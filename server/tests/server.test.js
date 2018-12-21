//starts using command "npm run test-watch" 
const expect = require('expect');
const request = require('supertest');

var {
    app
} = require('./../server');

var {
    Todo
} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done())
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

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e)});
            })
    });

});