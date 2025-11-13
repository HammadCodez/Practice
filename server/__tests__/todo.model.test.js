const Todo = require('../models/Todo');

describe('Todo Model', () => {
  it('should create a Todo schema', () => {
    expect(Todo).toBeDefined();
  });

  it('Todo schema should have required fields', () => {
    const schema = Todo.schema;
    expect(schema.paths.text).toBeDefined();
    expect(schema.paths.completed).toBeDefined();
    expect(schema.paths.createdAt).toBeDefined();
  });
});
