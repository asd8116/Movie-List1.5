const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

router.get("/", (req, res) => {
  Restaurants.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurants
    })
  })
})

module.exports = router