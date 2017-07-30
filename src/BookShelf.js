import React, {Component} from 'react'
import Shelf from './Shelf'

// const shelves = [
//   'Currently Reading',
//   'Want to Read',
//   'Read'
// ]

const shelves = {
  currentlyReading: {title: 'Currently Reading', books: []},
  wantToRead: {title: 'Want to Read', books: []},
  read: {title: 'Read', books: []},
}

class BookShelf extends Component {
  render () {
    const {books} = this.props
    // const sortedBooks = books.reduce((accumulator, value, index) => {
    //   if (!accumulator[value.shelf]) {
    //     accumulator[value.shelf] = []
    //   }
    //   accumulator[value.shelf].push(value)
    //   return accumulator
    // }, {})

    books.forEach((book) => book && shelves[book.shelf].books.push(book))

    return (
      <div className='list-books' >
        <div className='list-books-title' >
          <h1>My Reads</h1>
        </div>
        <div className='list-books-content' >
          <div>
            {Object.keys(shelves).map((shelf) => (
              <Shelf title={shelves[shelf].title} key={shelf} books={shelves[shelf].books} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookShelf