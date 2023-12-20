const places = require('../models/places');
const imageDownloader = require('image-downloader');
const dotenv = require('dotenv');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
dotenv.config();


const uploadbylink = async (req, res) => {
  try {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName
    });


    res.json(newName);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};


const upload = async (req, res) => {
  const uploadedfiles = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedfiles.push(newPath.replace('controllers/uploads/', ''));

    }
    res.json(uploadedfiles)
  } 
  
  catch (error) {
    res.json({ error })
  }

}

const place = async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      photos,
      uploadphotos,
      description,
      features,
      extrainfo,
      checkin,
      checkout,
      maxguest,
      price
    } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const placeDoc = await places.create({
      owner: user,
      title,
      address,
      photos,
      uploadphotos,
      description,
      features,
      extrainfo,
      checkin,
      checkout,
      maxguest,
      price
    });

    res.json('testingDOc:' + placeDoc);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
};

const userplaces = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'JWT verification failed' });
    }

    const { id } = userData;
    try {
      const placeData = await places.find({ owner: id });
      res.json(placeData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch place data' });
    }
  });
};

const placeDataid = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await places.findById(id)
    res.json(data);
  } catch (error) {
    res.status(404).json(error);
  }
}

const placesupdate = (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    uploadphotos,
    description,
    features,
    extrainfo,
    checkin,
    checkout,
    maxguest,
    price
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
    if (err) throw err;

    try {
      const placeDoc = await places.findById(id);

      if (userdata.id === placeDoc.owner.toString()) {
        placeDoc.title = title;
        placeDoc.address = address;
        placeDoc.photos = photos;
        placeDoc.uploadphotos = uploadphotos;
        placeDoc.description = description;
        placeDoc.features = features;
        placeDoc.extrainfo = extrainfo;
        placeDoc.checkin = checkin;
        placeDoc.checkout = checkout;
        placeDoc.maxguest = maxguest;
        placeDoc.price=price;
      }

      await placeDoc.save();
      res.json('ok');
    } catch (error) {
      console.error(error);
      res.status(500).json('Error occurred');
    }
  });
};

const deletePlace = async (req, res) => {
  const { id } = req.body;
  try {
    await places.findByIdAndRemove(id);
    res.status(200).send('Place deleted');
  } catch (error) {
    console.error('An error occurred while deleting the place:', error);
    res.status(500).send('Error deleting place');
  }
};


const placesdata = async (req, res) => {
  try {
    const data = await places.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch place data' });
  }
};

module.exports = {
  uploadbylink, upload,
  place, userplaces, placeDataid,
   placesupdate,placesdata,deletePlace
};