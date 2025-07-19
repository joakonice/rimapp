const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  organizer: { type: String, required: true }
});

eventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Event', eventSchema); 