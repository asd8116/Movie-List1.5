const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

router.get('/', authenticated, (req, res) => {
  Restaurants.find({ userId: req.user._id }).exec((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurants
    })
  })
})

module.exports = router
