const request = require('supertest');
const app = require('./app');

const todos = [
  {
    id: 1,
    name: 'do something',
    completed: false
  }
]

describe('Todos API', () => {
  it('GET /todos ==> array todos', () => {
    return request(app).get('/todos')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          completed: expect.any(Boolean)
        })
      ]))
    })
  });

  it('GET /todos/id ==> specific todo by id', () => {
    return request(app).get('/todos/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      expect.objectContaining({
        name: expect.any(String),
        completed: expect.any(Boolean)
      })
    })
  });

  it('GET /todos/id ==> 404 if not found', () => {
    return request(app).get('/todos/9999999').expect(404);
  });

  it('POST /todos --> array todos', () => {
    return request(app).post('/todos').send({
      name: 'do dishes',
    }).expect('Content-Type', /json/)
    .expect(201)
    .then(response => {
      expect.objectContaining({
        name: 'do dishes',
        completed: false
      })
    })
  });

  it('POST /todos ==> validate request body', () => {
    return request(app).post('/todos').send({ name: 123 })
    .expect(422)
  });
  // rest of the CRUD, update + delete

  it('DELETE /todos/id ==> delete TODO by ID', () => {
    return request(app).delete('/todos/2')
    .expect('Content-Type', /json/)
    .expect(200)
  })
})
