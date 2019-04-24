const mongoose = require('mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

const password1 = bcrypt.hashSync('123123', 10)
const password2 = bcrypt.hashSync('456456', 10)

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  User.create({
    name: 'Wanaka01',
    email: 'Wanaka01@gmail.com',
    password: password1
  })

  User.create({
    name: 'Wanaka02',
    email: 'Wanaka02@gmail.com',
    password: password2
  })

  console.log('done')
})
