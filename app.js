require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/events');
const adminRoute = require('./routes/admin');
const PORT = process.env.PORT;

//creating server...
const app = express();

// connecting to db...
connectDB();
app.use(express.json());

//health check route.... 
app.get('/',(req,res)=>{
  res.json({
    Msg: "Hi from Unolo!!!"
  })
})

app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/admin',adminRoute);


app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});