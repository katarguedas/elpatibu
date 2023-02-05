const mongoose = require('mongoose');

//------------------------------------------------

const eventsSchema = new mongoose.Schema({
  id: String,
  title: String,
  start: {},
  end: {},
  allDay: Boolean,
  resourceId: String,
  category: String
})

const userSchema = new mongoose.Schema({
  id: String,
  email: {
    type: String,
    unique: true
  },
  name: String,
  pwd: String,
  diaries: String,
  events: [eventsSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User;