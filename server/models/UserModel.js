const mongoose = require('mongoose');

//------------------------------------------------


const userSchema = new mongoose.Schema({
    id: String,
    email: {
      type: String,
    unique: true
  },
    name: String,
    pwd: String,
    diaries: String
  })

  const User = mongoose.model('User', userSchema)

  module.exports = User;