const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); //sirve para mandar info al rect

// Database setup
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log('BD is conected') })
    .catch(err => console.error(err));

// Routes Setup
app.use('/api/category', require('./routes/category'))
app.use('/api/videogame', require('./routes/videogames'))
app.use('/api/auth', require('./routes/auth')) 

// Listen port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server de videojuegos MERN esta en el puerto ${port}`);
})