const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

router.get("/", (req, res) => {
  const keyword = req.query.keyword

  Restaurants.find({
    name: {
      $regex: keyword,
      $options: 'i'
    },
  }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurant,
      keyword: keyword
    })
  })
})

module.exports = router