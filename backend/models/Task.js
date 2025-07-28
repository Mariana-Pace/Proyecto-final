const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
  dueDate: Date,
  status: { type: String, enum: ['pendiente', 'en curso', 'hecho'], default: 'pendiente' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
