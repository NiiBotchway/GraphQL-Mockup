import React from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList(props) {
	const [id, setId] = React.useState(null)

	const DisplayBooks = () => {
		if (props.data.loading) {
			return <div>Loading books...</div>
		} else {
			return props.data.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => {
							setId(book.id)
						}}
					>
						{book.name}
					</li>
				)
			})
		}
	}

	return (
		<div className='container'>
			<ul id='book-list'>{DisplayBooks()}</ul>
			<BookDetails bookId={id} />
		</div>
	)
}

export default graphql(getBooksQuery)(BookList)
