const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword

  Restaurants.find({
    userId: req.user._id,
    name: {
      $regex: keyword,
      $options: 'i'
    }
  }).exec((err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurant,
      keyword: keyword
    })
  })
})

module.exports = router
