import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  updateBooks = (books) => {
    books.sort(sortBy('title'))
    this.setState({books})
  }

  changeShelf = (event, book) => {
    const shelf = event.target.value
    this.setState((state) => {
      const shelfBook = state.books.find((b) => b.id === book.id)
      if (shelfBook) {
        shelfBook.shelf = shelf
      } else {
        book.shelf = shelf
        state.books.push(book)
      }
      state.books.sort(sortBy('title'))
      return {books: state.books}
    })

    BooksAPI.update(book, shelf)
  }

  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={books}
            updateBooks={this.updateBooks}
            onChangeShelf={this.changeShelf} />
        )} />
        <Route exact path='/' render={() => {
          return (
            <BookShelf
              books={books}
              updateBooks={this.updateBooks}
              onChangeShelf={this.changeShelf} />
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
