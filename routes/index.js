var express = require('express')
var router = express.Router()

const variables = {
  inbound: 0,
  outbound: 0
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/all', function (req, res, next) {
  res.send(variables)
  //res.render('index', { title: 'Express' });
})

router.put('/add', function (req, res, next) {
  variables.inbound++
  res.send(variables)
  //res.render('index', { title: 'Express' });
})

module.exports = {
  router, variables
}
