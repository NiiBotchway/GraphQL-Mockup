import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from '../queries/queries'

function AddBook(props) {
	const [name, setName] = React.useState('')
	const [genre, setGenre] = React.useState('')
	const [authorId, setAuthorId] = React.useState(null)

	const DisplayAuthors = () => {
		let data = props.getAuthorsQuery
		return data.loading ? (
			<option disabled>Loading Authors...</option>
		) : (
			data.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				)
			})
		)
	}

	const submitForm = (e) => {
		e.preventDefault()
		// console.log('state', { name, genre, authorId })
		props.addBookMutation({
			variables: {
				name,
				genre,
				authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		})
		setName('')
		setGenre('')
		setAuthorId(null)
	}

	return (
		<div>
			<form id='add-book' onSubmit={submitForm}>
				<div className='field'>
					<label htmlFor='book'>Book Name:</label>
					<input
						type='text'
						name='book'
						id='book'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</div>
				<div className='field'>
					<label htmlFor='genre'>Genre:</label>
					<input
						type='text'
						name='genre'
						id='genre'
						onChange={(e) => setGenre(e.target.value)}
						value={genre}
					/>
				</div>
				<div className='field'>
					<label htmlFor='book'>Author:</label>
					<select
						onChange={(e) => {
							setAuthorId(e.target.value)
						}}
					>
						<option value={null}>Select Author</option>
						{DisplayAuthors()}
					</select>
				</div>

				<button>+</button>
			</form>
		</div>
	)
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
