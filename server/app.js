const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const morgan = require('morgan')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
//const { PORT, NODE_ENV, MONGODB_URI } = require('./config')
const { property } = require('lodash')

const app = express()

const dbURI = process.env.MONGODB_URI

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(process.env.PORT || 5000, () => {
			console.log(`listening for request on port ${process.env.PORT || 5000}`)
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

app.use(morgan('dev'))
