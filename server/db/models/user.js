const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

const defWatchList = JSON.stringify({ coins: [{ symbol: 'BTC' }, { symbol: 'ETH' }, { symbol: 'XRP' }] })

const userSchema = new Schema({
	firstName: String,
	googleId: String,
	watchlist: { type: String, default: defWatchList }
})

const User = mongoose.model('User', userSchema)
module.exports = User
