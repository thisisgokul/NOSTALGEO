const express = require('express');
const router = express.Router();
const { getAll, signup, login,profile,logout } = require('../controllers/users');
const{uploadbylink,upload,place,
userplaces,placeDataid,placesupdate,placesdata,deletePlace}=require('../controllers/posts')
const {booking,bookings,createpayment}=require('../controllers/bookings');
const multer=require('multer');
const photomiddleware=multer({dest:'controllers/uploads/'})

router.get('/', getAll);
router.get('/profile', profile);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/uploadbylink',uploadbylink);
router.post('/upload',photomiddleware.array('photos',100),upload);
router.post('/place',place);
router.get('/userplaces',userplaces);
router.get('/placeDataid/:id',placeDataid);
router.put('/placesupdate',placesupdate);
router.get('/placesdata',placesdata);
router.delete('/deletePlace',deletePlace)

router.post('/booking',booking);
router.get('/bookings',bookings);
router.post('/createpayment',createpayment);


module.exports = router;
