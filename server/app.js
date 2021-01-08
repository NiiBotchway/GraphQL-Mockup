const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const morgan = require('morgan')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

const dbURI =
	'mongodb+srv://nabot:ishi4u@GQL@gql.qzcay.mongodb.net/gql?retryWrites=true&w=majority'
//mongoose.connect(dbURI)
// mongoose.connection.once('open', () => {
// 	console.log('connected to database')
// })

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(3000, () => {
			console.log('listening for request on port 3000')
		})
	})
	.catch((err) => console.log(err))

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
)

// app.listen(3000, () => {
// 	console.log('listening for request on port 3000')
// })

app.use(morgan('dev'))
