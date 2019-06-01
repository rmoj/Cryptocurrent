const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const axios = require('axios')
const top100 = require('../api/top100')
const moment = require('moment')

//TODO shape data from api
//get history data
function getHistoryData(frequency, coin, currency, limit, res) {

  let url = 'https://min-api.cryptocompare.com/data/histo' + frequency + '?fsym=' + coin + '&tsym=' + currency + '&limit=' + limit + '&aggregate=3&e=CCCAGG&api_key='
  // + process.env.apiKey

  return axios.get(url).then(function (response) {
    res.json(response.data);
  }).catch(err => {
    console.log(err)
  });

}

router.get('/getTop100', (req, res) => {
  res.json(top100)
})


//TODO use moment to format data

router.get("/get1MonthData/:altcoin", function (req, res) {

  getHistoryData("day", req.params.altcoin, "USD", 10, res)

});

router.get("/get1DayData/:altcoin", function (req, res) {

  getHistoryData("hour", req.params.altcoin, "USD", 8, res)

});

router.get("/get1HourData/:altcoin", function (req, res) {

  getHistoryData("minute", req.params.altcoin, "USD", 20, res)

});

router.post('/updatewatchlist', (req, res) => {

  User.findOneAndUpdate({ _id: req.body.id }, { watchlist: req.body.watchlist }).then(user => { res.json(user) }).catch(err => { res.json(err) })

})

router.get('/getwatchlist/:id', (req, res) => {

  User.findOne({ _id: req.params.id }).then(user => { res.json(JSON.parse(user.watchlist)) }).catch(err => { res.json(err) })

})


module.exports = router
