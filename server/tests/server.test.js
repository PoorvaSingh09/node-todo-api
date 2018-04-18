const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo',
  completed: false,
  completedAt: null
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
     Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((doc) => {
        expect(doc.length).toBe(2);
        done();
      }).catch((err) => done(err));
    })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('First test todo');
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectId().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non objectIds', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var id = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById(res.body.todo._id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectId().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update todo', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'New todo from test';
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completedAt).toNotExist();
      }).end(done);
  });
});
