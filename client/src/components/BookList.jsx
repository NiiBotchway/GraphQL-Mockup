import React from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

function BookList(props) {
	const DisplayBooks = () => {
		if (props.data.loading) {
			return <div>Loading books...</div>
		} else {
			return props.data.books.map((book) => {
				return (
					<li key={book.id}>
						{book.name} by {book.author.name}
					</li>
				)
			})
		}
	}

	return (
		<div>
			<ul id='book-list'>{DisplayBooks()}</ul>
		</div>
	)
}

export default graphql(getBooksQuery)(BookList)
