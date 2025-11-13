const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const todosRouter = require('../routes/todos');
const Todo = require('../models/Todo');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  app = express();
  app.use(express.json());
  app.use('/api/todos', todosRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Todo.deleteMany({});
});

describe('GET /api/todos', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /api/todos', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Buy milk' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Buy milk');
    expect(res.body.completed).toBe(false);
  });

  it('should reject todo without text', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Text required');
  });
});

describe('PUT /api/todos/:id', () => {
  it('should toggle completed status', async () => {
    const todo = await Todo.create({ text: 'Test todo' });
    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });
});

describe('DELETE /api/todos/:id', () => {
  it('should delete a todo', async () => {
    const todo = await Todo.create({ text: 'To delete' });
    const res = await request(app).delete(`/api/todos/${todo._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const found = await Todo.findById(todo._id);
    expect(found).toBeNull();
  });
});
