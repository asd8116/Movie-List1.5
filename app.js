// variables
const express = require('express')
const exphbs = require('express-handlebars')
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

// static files
app.use(express.static("public"))

// routes
app.get("/", (req, res) => {
  res.render("index", {
    restaurants: restaurantList.results
  });
});

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