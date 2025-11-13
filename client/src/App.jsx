import React, { useEffect, useState } from 'react';
import api from './api';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await api.post('/todos', { text });
      setTodos((s) => [res.data, ...s]);
      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  const toggle = async (id, completed) => {
    try {
      const res = await api.put(`/todos/${id}`, { completed: !completed });
      setTodos((s) => s.map((t) => (t._id === id ? res.data : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((s) => s.filter((t) => t._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app">
      <h1>MERN Todo</h1>
      <form onSubmit={addTodo} className="form">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add todo..." />
        <button type="submit">Add</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="todos">
          {todos.map((t) => (
            <li key={t._id} className={t.completed ? 'done' : ''}>
              <label>
                <input type="checkbox" checked={t.completed} onChange={() => toggle(t._id, t.completed)} />
                {t.text}
              </label>
              <button className="del" onClick={() => remove(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
