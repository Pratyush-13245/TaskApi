const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['CREATED', 'STARTED', 'COMPLETED', 'TERMINATED'], default: 'CREATED' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


