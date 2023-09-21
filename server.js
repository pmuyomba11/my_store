const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Products = require('./models/products')
const Items = require('./models/items')
const colors = require('colors');
const morgan = require('morgan');
//Initializing...
const app = express();
//Database connection...
const db = mongoose.connection;

//Database config...
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true  //to avoid deprecation warning
})

//Middleware..
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

//Routes..

//Database SUCCESS/ERROR messages..
db.on('connected', () => console.log('Database connected..'))
db.on('disconnected', () => console.log('Database disconnected..'))
db.on('error', (err) => console.log(err.message + ' is DB connected?'))


//Listeners
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}..`.inverse.blue.bold)
})
