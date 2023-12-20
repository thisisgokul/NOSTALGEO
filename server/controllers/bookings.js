const Booking = require('../models/Booking');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
dotenv.config();



const razorpay = new Razorpay({
  key_id: '',
  key_secret: '',
});


function getUserDatafromToken(req) {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, (err, userData) => {
          if (err) {
            reject(err);
          } else {
            resolve(userData);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  

const booking = async (req, res) => {
    const userData= await getUserDatafromToken(req);
  try {
    const {
      place,
      checkin,
      checkout,
      mobilenumber,
      fullname,
      email,
      price,
      numberofguest
    } = req.body;

    const newBooking = await Booking.create({
      place,
      checkin,
      checkout,
      mobilenumber,
      fullname,
      email,
      price,
      numberofguest,
      user:userData.id,
    });

    res.json({ newBooking});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};



const bookings = async (req, res) => {
    try {
      const userData = await getUserDatafromToken(req);
      const populatedBookings = await Booking.find({ user: userData.id }).populate('place');
      res.json(populatedBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  };
  
  const createpayment = async (req, res) => {
    try {
      const {amount} = req.body;
  
      const options = {
        amount: amount * 100, 
        currency: "INR",
      };
      
      const order = await razorpay.orders.create(options)
  
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create order" });
    }
  };
  

module.exports = {
  booking,bookings,createpayment
};
