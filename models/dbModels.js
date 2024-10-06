const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  maxParticipants: Number,
  confirmedParticipants: [{ type: String }],
  waitlistParticipants: [{ type: String }],
});

const AdminSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true,
    minLength: 6
  }
})

const Event =  mongoose.model('Event', EventSchema);
const Admin =  mongoose.model('Admin',AdminSchema);
module.exports = {Event,Admin}