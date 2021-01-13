import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
	{
		books {
			name
			genre
			author {
				name
			}
		}
	}
`

// function DisplayBooks({ data }) {
// 	const books = data.loading ? (
// 		<div>Loading Books...</div>
// 	) : (
// 		data.books.map((book) => {
// 			return <li>{book.name}</li>
// 		})
// 	)
// 	return books
// }

function DisplayBooks({ data }) {
	if (data.loading) {
		return <div>Loading books...</div>
	} else {
		return data.books.map((book) => {
			return (
				<li key={book.id}>
					{book.name} by {book.author.name}
				</li>
			)
		})
	}
}

function BookList(props) {
	return (
		<div>
			<ul id='book-list'>
				<DisplayBooks data={props.data} />
			</ul>
		</div>
	)
}

export default graphql(getBooksQuery)(BookList)
