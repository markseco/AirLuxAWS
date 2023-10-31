const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
const User = require('./models/User');
const Plane = require('./models/Planes');
const Booking = require('./models/Booking');
const path = require('path');
require('dotenv').config();


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://52.17.153.59'
}));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, '../client/dist');

app.use(express.static(buildPath));

app.get('/', (req, res) => {

    res.sendFile(
        path.join(_dirname, '../client/dist/index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    User.create({
         name,
         email, 
         password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(422).json(err);
        })
    
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email})
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({message: 'Incorrect password'});
    }

    const cookieOptions = {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    };

    jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.cookie('token', token, cookieOptions).json(user);
    });
    

});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err){
                return res.status(401).json(err);
            }
            
            const {name,email,_id } = await User.findById(decoded.id);
            res.json(name,email,_id);
            
        });
    }else{
        res.json(null);
    }
    

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const destUrl = __dirname + '/uploads/' + newName;
    await imageDownloader.image({
        url: link,
        dest: destUrl
    }).catch(err => {
        console.error(err);
    });
    res.json(newName);
});


const photosMiddleware = multer({
    dest: 'uploads/'
});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    try{
        const uploadedFiles = [];
        for(let i = 0; i < req.files.length; i++){
            const {path, originalname} = req.files[i];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            const newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads/', ''));
        }
        res.json(uploadedFiles);
    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
    
    
});

app.post('/planes', async (req, res) => {
    try{
        const { name, description, capacity, speed, range, photos, information, price, airportLocation } = req.body;
        const { user } = req.body;

        const userDoc = await User.findOne({user})


        const cookieOptions = {
       	 sameSite: 'none',
       	 httpOnly: true,
       	 secure: true,
   	 };

        jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, async (err, token) => {
       	     if(err){
           	 return res.status(401).json(err);
       	     }
            const plane = await Plane.create({
                name,
                description,
                capacity,
                speed,
                range,
                airport: airportLocation,
                images: photos,
                extraInfo: information,
                price,
                owner: userDoc._id
            });
            res.json(plane);
        });
    }catch(err){
        console.error(err)
        res.status(500).json(err);
    }
});

app.get('/user-planes', async (req, res) => {
    const { user } = req.body;

    const userDoc = await User.findOne({user})


    const cookieOptions = {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    };

    jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, async (err, token) => {
        if(err){
            return res.status(401).json(err);
        }
        const planes = await Plane.find({owner: userDoc._id});
        res.json(planes);
    });
});

app.get('/planes/:id', async (req, res) => {
    const { id } = req.params;
    const plane = await Plane.findById(id);
    res.json(plane);
});

app.put('/planes/:id', async (req, res) => {
    const { user } = req.body;
    const { id, name, description, capacity, speed, range, photos, information, price, airportLocation } = req.body;
   
    console.log(user)
    const cookieOptions = {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    };

    jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET, {}, async (err, token) => {
        if(err){
            return res.status(401).json(err);
        }
        const planeDoc = await Plane.findById(id);

        if(user._id === planeDoc.owner.toString()){
            planeDoc.set({
                name,
                description,
                capacity,
                speed,
                range,
                airport: airportLocation,
                images: photos,
                extraInfo: information,
                price
            });
            await planeDoc.save();
            res.json(planeDoc);
        }

    });
});

app.get('/planes', async (req, res) => {
    const planes = await Plane.find();
    res.json(planes);
});

app.post('/planes/:id/book', async (req, res) => {
    const { user, startDate, endDate, price, id } = req.body;

    const cookieOptions = {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    };

    jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET, {}, async (err, token) => {
        if(err){
            return res.status(401).json(err);
        }
        const plane = await Plane.findById(id);
        const booking = await Booking.create({
            plane: plane._id,
            bookingUser: user._id,
            lenderUser: plane.owner,
            startDate,
            endDate,
            price: price
        });
        console.log(booking);
        res.json(booking);
    });
});

app.get('/bookings', async (req, res) => {
    
    const { user } = req.body;
    
    const userDoc = await User.findOne({user})


    const cookieOptions = {
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    };

    jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, async (err, token) => {
        if(err){
            return res.status(401).json(err);
        }
        const bookings = await Booking.find({bookingUser: userDoc._id}).populate('plane');
        res.json(bookings);
    });
});

app.get('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('plane');
    res.json(booking);
});

app.get('/planes-filtering', (req, res) => {
    const { price, capacity, speed, range } = req.query;
    const filter = {};
    if(price && price > 0){
        filter.price = {$lte: parseInt(price)};
    }
    if(capacity && capacity > 0){
        filter.capacity = {$gte: parseInt(capacity)};
    }
    if(speed && speed > 0){
        filter.speed = {$gte: parseInt(speed)};
    }
    if(range && range > 0){
        filter.range = {$gte: parseInt(range)};
    }
    Plane.find(filter)
        .then(planes => {
            res.json(planes);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000');
});
