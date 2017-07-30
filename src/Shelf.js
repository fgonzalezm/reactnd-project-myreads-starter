import React, {Component} from 'react'
import Book from './Book'

const Shelf = (props) => (
  <div className='bookshelf' >
    <h2 className='bookshelf-title'>{props.title}</h2>
    <div className='bookshelf-books'>
      <ol className='books-grid' >
        {props.books.map((book) => (
          <li key={book.title}>
            <Book info={book} />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

export default Shelf