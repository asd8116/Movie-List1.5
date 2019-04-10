// variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

// 新增一筆 餐廳 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 新增一筆 餐廳
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

// 顯示一筆 餐廳 的詳細內容
app.get("/restaurants/:id", (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', {
      restaurant: restaurant
    })
  })
})

// 修改 餐廳 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', {
      restaurant: restaurant
    })
  })
})

// 修改 餐廳
app.post('/restaurants/:id', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// Search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  Restaurants.find({
    name: {
      $regex: keyword,
      $options: 'i'
    }
  }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurant
    })
  })
})

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
})