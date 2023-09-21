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
//Index Route
app.get('/products', (req, res) => {
    Products.find({})
    .then((allProducts) => {
        res.render('index.ejs', {
            products : allProducts
        })
    })
    .catch((error) => {
        console.log("Error in getting the data".red);
    })
})

// //Seed Route
// app.get('/products/seed', (req, res) => {
//     Products.create(Items)
//     .then((createdItems) => {
//         res.redirect('/')
//     }).catch((error) => {
//         console.log(`Error in seeding the database ${error}`.red);
//     })
// })


//Show Route
app.get('/products/:id', (req, res) => {
    Products.findById(req.params.id)
    .then((foundItem) => {
        res.render('show.ejs',{
            product : foundItem
        })
    })
    .catch((error) => {
        console.log(`${error} error while finding a particular item`.red);
    })
})


//Database SUCCESS/ERROR messages..
db.on('connected', () => console.log('Database connected..'))
db.on('disconnected', () => console.log('Database disconnected..'))
db.on('error', (err) => console.log(err.message + ' is DB connected?'))


//Listeners
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}..`.inverse.blue.bold)
})
