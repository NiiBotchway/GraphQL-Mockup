import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
	{
		authors {
			id
			name
		}
	}
`

function AddBook(props) {
	const DisplayAuthors = () => {
		let data = props.data
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

	return (
		<div>
			<form id='add-book'>
				<div className='field'>
					<label htmlFor='book'>Book Name:</label>
					<input type='text' name='book' id='book' />
				</div>
				<div className='field'>
					<label htmlFor='genre'>Genre:</label>
					<input type='text' name='genre' id='genre' />
				</div>
				<div className='field'>
					<label htmlFor='book'>Author:</label>
					<select>
						<option>Select Author</option>
						{DisplayAuthors()}
					</select>
				</div>

				<button>+</button>
			</form>
		</div>
	)
}

export default graphql(getAuthorsQuery)(AddBook)
