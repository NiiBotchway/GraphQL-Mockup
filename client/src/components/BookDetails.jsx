import React from 'react'
import { graphql } from 'react-apollo'
//import { flowRight as compose } from 'lodash'
import { getBookQuery } from '../queries/queries'

function BookDetails(props) {
	const displayBookInfo = () => {
		const { book } = props.data

		return book ? (
			<div>
				<h2>{book.name}</h2>
				<p>{book.genre}</p>
				<p>{book.author.name}</p>
				<p>Other books by the Author</p>
				<ul className='other-books'>
					{book.author.books.map((book) => {
						return <li key={book.id}>{book.name}</li>
					})}
				</ul>
			</div>
		) : (
			<h3>No book Selected.. </h3>
		)
	}
	return <div id='book-details'>{displayBookInfo()}</div>
}

export default graphql(getBookQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId,
			},
		}
	},
})(BookDetails)
