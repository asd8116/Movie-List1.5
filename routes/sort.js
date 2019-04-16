const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// 餐廳分數排序
router.get('/rating', (req, res) => {
  Restaurants.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants: restaurants
      })
    })
})

// 餐廳類別排序
router.get('/category', (req, res) => {
  Restaurants.find({})
    .sort({
      category: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants: restaurants
      })
    })
})

// 餐廳地區排序
router.get('/location', (req, res) => {
  Restaurants.find({})
    .sort({
      location: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants: restaurants
      })
    })
})

// 餐廳升冪排序
router.get('/asc', (req, res) => {
  Restaurants.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants: restaurants
      })
    })
})

// 餐廳降冪排序
router.get('/desc', (req, res) => {
  Restaurants.find({})
    .sort({
      name: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants: restaurants
      })
    })
})

module.exports = router