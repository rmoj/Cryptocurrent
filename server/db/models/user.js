const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

const userSchema = new Schema({
	firstName: String,
	googleId: String,
	watchlist: String
})

const User = mongoose.model('User', userSchema)
module.exports = User
