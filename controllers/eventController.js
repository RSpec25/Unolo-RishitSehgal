const {Event,Admin} = require('../models/dbModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Admin controller.....
exports.createAdmin = async (req,res) => {
  try {
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,10);

    await Admin.create({
      username,
      password: hash
    })

    res.status(201).json({
      Msg: "Admin created successfully!"
    })
  } catch (e) {
    console.log("Error while creating error:",e);
    res.status(400).json({
      Error: "Registration Failed!"
    })
  }
}

exports.adminLogin = async (req,res) => {
  try {
    const {username,password} = req.body;
    const admin = await Admin.findOne({
      username:username
    });

    const success = bcrypt.compare(password,admin.password);

    if(!admin || !success){
      res.status(400).json({
        Error: "Invalid Creds"
      })
    }
    
    const token =  jwt.sign(username,secret);
    res.status(200).json({
      Msg: `Token ${token}`
    })
  } catch (e) {
    console.log("Error while login:",e);
    res.status(400).json({
      Error: "Login failed!"
    })
  }
}


// Event controller......
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ Msg: 'Event created successfully', event });
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}, 'title _id date');
    res.status(200).json(events);
  } catch (e) {
    res.status(500).json({ Error:  `error fetching events ${e}`})
  }
}

exports.joinEvent = async (req, res) => {
  const { eventId } = req.params;
  const { user } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ Error: 'Event not found' });

    if (event.confirmedParticipants.includes(user) || event.waitlistParticipants.includes(user)) {
      return res.status(400).json({ 
        Error: 'User already joined the event' 
      });
    }

    if (event.confirmedParticipants.length < event.maxParticipants) {
      event.confirmedParticipants.push(user);
      await event.save();
      return res.status(200).json({ Msg: 'Added to confirmed participants' });
    } else {
      event.waitlistParticipants.push(user);
      await event.save();
      return res.status(200).json({ Msg: 'Added to waitlist' });
    }
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

exports.viewParticipants = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ Error: 'Event not found' });

    res.status(200).json({
      confirmedParticipants: event.confirmedParticipants,
      waitlistParticipants: event.waitlistParticipants,
    });
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};

exports.cancelParticipation = async (req, res) => {
  const { eventId } = req.params;
  const { user } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ Error: 'Event not found' });

    const confirmedIndex = event.confirmedParticipants.indexOf(user);
    const waitlistIndex = event.waitlistParticipants.indexOf(user);

    if (confirmedIndex !== -1) {
      event.confirmedParticipants.splice(confirmedIndex, 1);

      if (event.waitlistParticipants.length > 0) {
        const nextUser = event.waitlistParticipants.shift();
        event.confirmedParticipants.push(nextUser);
      }

      await event.save();
      return res.status(200).json({
         Msg: 'Participation cancelled' 
      });
    } else if (waitlistIndex !== -1) {
      event.waitlistParticipants.splice(waitlistIndex, 1);
      await event.save();
      return res.status(200).json({ 
        Msg: 'Removed from waitlist' 
      });
    } else {
      return res.status(400).json({ 
        Error: 'User not found in participants list' 
      });
    }
  } catch (e) {
    res.status(500).json({ Error: e.message });
  }
};