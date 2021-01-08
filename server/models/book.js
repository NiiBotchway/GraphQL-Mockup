const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		genre: String,
		authorId: String,
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)
