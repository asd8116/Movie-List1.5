// variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json')
const Restaurants = require('./models/restaurants')
const app = express()
const port = 3000

// setting mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine("handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({
  extended: true
}))

// routes
app.get("/", (req, res) => {
  Restaurants.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurants
    })
  })
})

// 新增一筆餐廳 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 新增一筆餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = Restaurants({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

app.get("/restaurants/:rest_id", (req, res) => {
  const resChoose = restaurantList.results.filter(
    rest => rest.id == req.params.rest_id
  );

  res.render("show", {
    restaurant: resChoose[0]
  });
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const resInput = restaurantList.results.filter(rest => {
    return rest.name.toLowerCase().includes(keyword.toLowerCase());
  })

  res.render("index", {
    restaurants: resInput,
    keyword: keyword
  });
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
})