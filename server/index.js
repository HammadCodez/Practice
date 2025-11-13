require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_todo';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
