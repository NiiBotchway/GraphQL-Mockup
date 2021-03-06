const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql

// var books = [
// 	{ name: 'First Book', genre: 'Sci-Fi', id: '1', authorId: '1' },
// 	{ name: 'Second Book', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'Third Book', genre: 'Romance', id: '3', authorId: '3' },
// 	{ name: 'Fourth Book', genre: 'Romancec', id: '4', authorId: '4' },
// 	{ name: 'Fifth Book', genre: 'Fantasy', id: '5', authorId: '2' },
// 	{ name: 'Sixth Book', genre: 'Romance', id: '6', authorId: '3' },
// ]

// var authors = [
// 	{ name: 'Ishmael Botchway', age: 26, id: '1' },
// 	{ name: 'Isaac Botchway', age: 23, id: '2' },
// 	{ name: 'Nicholas Morkry', age: 32, id: '3' },
// 	{ name: 'Eunice Osei-Asante', age: 22, id: '4' },
// ]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//return _.find(authors, { id: parent.authorId })
				return Author.findById(parent.authorId)
			},
		},
	}),
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return _.filter(books, { authorId: parent.id })
				return Book.find({ authorId: parent.id })
			},
		},
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//return _.find(books, { id: args.id })
				return Book.findById(args.id)
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//return _.find(authors, { id: args.id })
				return Author.find(args.id)
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books
				return Book.find({})
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors
				return Author.find({})
			},
		},
	},
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				})
				return author.save()
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				})
				return book.save()
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
