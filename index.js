const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// mongodb connection

const mongoose = require('mongoose');
const Task = require('./models'); 

mongoose.connect('mongodb+srv://pratyushtri123:LbHuYPsuQM3b2hzy@userapi.oppu5np.mongodb.net/TaskApiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/tasks', (req, res) => {
  const { title, description, completed, priority, status } = req.body;

  // Validate input
  if (!title || !description || typeof completed !== 'boolean' || !['low', 'medium', 'high'].includes(priority) || !['CREATED', 'STARTED', 'COMPLETED', 'TERMINATED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  // Create a new task
  const newTask = new Task({
    title,
    description,
    completed,
    priority,
    status
  });

  // Save the task to the database
  newTask.save()
    .then(task => res.status(201).json(task))
    .catch(err => res.status(500).json({ message: 'Error creating task', error: err }));
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const { title, description, completed, priority, status } = req.body;

  // Validate input
  if (!title && !description && typeof completed !== 'boolean' && !['low', 'medium', 'high'].includes(priority) && !['CREATED', 'STARTED', 'COMPLETED', 'TERMINATED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (completed !== undefined) updateFields.completed = completed;
  if (priority) updateFields.priority = priority;
  if (status) updateFields.status = status;

  Task.findByIdAndUpdate(req.params.id, updateFields, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    })
    .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
});

// GET all tasks
app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ message: 'Error retrieving tasks', error: err }));
});

// GET tasks by priority level
app.get('/tasks/priority/:level', (req, res) => {
  const { level } = req.params;

  // Validate priority level
  if (!['low', 'medium', 'high'].includes(level)) {
    return res.status(400).json({ message: 'Invalid priority level' });
  }

  Task.find({ priority: level })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ message: 'Error retrieving tasks by priority', error: err }));
});

// GET tasks by status
app.get('/tasks/status/:status', (req, res) => {
  const { status } = req.params;

  // Validate status
  if (!['CREATED', 'STARTED', 'COMPLETED', 'TERMINATED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  Task.find({ status })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ message: 'Error retrieving tasks by status', error: err }));
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));