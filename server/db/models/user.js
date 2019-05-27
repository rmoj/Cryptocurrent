const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

const userSchema = new Schema({
	firstName: { type: String, unique: false },
	googleId: { type: String, required: false }
})

const User = mongoose.model('User', userSchema)
module.exports = User
