// require necessary NPM packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
let Product = require('./app/models/product');
let Admin = require('./app/models/admin');
// require route files
const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')

// require error handling middleware
const errorHandler = require('./lib/error_handler')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// required middleware to log requests
const requestLogger = require('./lib/request_logger')

// require middleware for accepting token or bearer
const tokenOrBearer = require('./lib/token_or_bearer')
let Cart = require('./app/models/cart'); 

// Define Ports
const reactPort = 7165
const expressPort = 3010

// establish database connection
mongoose.Promise = global.Promise
mongoose.connect(db, {
  useMongoClient: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

// define port for API to run on
const port = process.env.PORT || expressPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token <token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(tokenOrBearer)

// register passport authentication middleware
app.use(auth)

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(bodyParser.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }))

// add request logger to create server log
app.use(requestLogger)

// register route files
app.use(exampleRoutes)
app.use(userRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// INDEX
app.get('/products', (req, res) => {
    Product.find({}, (err, allProducts) => {
    if (err) { console.log(err) }
    res.json(allProducts);
  });
});

app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
  if (err) { console.log(err) }
  res.json(foundProduct);
});
});

// Products SEED ROUTE
// Products SEED ROUTE
app.get('/product/seed', (req, res) => {
  Product.insertMany([
  {  
              "name": "Stickers ",
              "color": " ",
              "image": "https://3.top4top.net/p_1348uki071.jpeg",
              "price": "30",
              "description": "All the Stickers are 100% Brand New and made with high quality PVC with Sun Protection and Waterproof Function!,Perfect to personalize Laptops, Macbook, Skateboards, Luggage, Cars, Bumpers, Bikes, Bicycles, Bedroom, Travel Case, Bicycle, Motorcycle, Snowboard, PS4, XBOX ONE  ",
            },
      {  
                "name": "NoteBook ",
                "color": "Black",
                "image": "https://4.top4top.net/p_1348r5es91.jpeg",
                "price": "30",
                "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
              },
        {  
                  "name": "NoteBook ",
                  "color": "Purple",
                  "image": "https://4.top4top.net/p_1348s8p5b1.jpeg",
                  "price": "30",
                  "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
                },
                        {  
                "name": "NoteBook ",
                "color": "White",
                "image": "https://4.top4top.net/p_1348csviw1.jpeg",
                "price": "30",
                "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
              },
                      {  
                "name": "NoteBook ",
                "color": "Green",
                "image": "https://2.top4top.net/p_13482f4dq1.jpeg",
                "price": "30",
                "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
              },
                      {  
                "name": "NoteBook ",
                "color": "Pink",
                "image": "https://6.top4top.net/p_1348s3phd1.jpeg",
                "price": "30",
                "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
              },
                      {  
                "name": "NoteBook ",
                "color": "Gray",
                "image": "https://5.top4top.net/p_1348g44zi1.jpeg",
                "price": "30",
                "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
              },
        {  
                  "name": "NoteBook ",
                  "color": "Gray",
                  "image": "https://5.top4top.net/p_1348g44zi1.jpeg",
                  "price": "30",
                  "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
                },
          {  
                    "name": "NoteBook ",
                    "color": "blue",
                    "image": "https://1.top4top.net/p_1348qxlp31.jpeg",
                    "price": "30",
                    "description": "perfect size for your purse, tote bag, desk, backpack, school, home or work,Can be used as a notebook, journal, diary or composition book for school and work,Perfectly suited for taking notes, writing, organizing, lists, journaling and brainstorming",
                  }
], (err, Products) => {
  res.json(Products);
})
});







            /////


app.post('/admin', (req, res) => {

    console.log('welcome')
 
})

 // CREATE NEW USER
app.post('/admin/products/', (req, res) => {
  User.create(req.body, (error, newUser) => {
    res.json(newUser)
  })
})


app.post('/products/', (req, res) => {
  Product.create(req.body, (error, newUser) => {
    res.json(newUser)
  })
})

// DELETE
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, data) => {
  if (err) { console.log('done',err) }
  res.json(data);
});
});

 
// UPDATE
app.put('/products/:id', (req, res) => {

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
  res.json(updatedModel);
});
});

// run API on designated port (3000 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
