import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'

class Search extends Component {
  state = {
    query: '',
    loading: false,
    results: []
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState({query: query})
      this.props.updateBooks([])
      this.search.cancel()
      return
    }
    this.setState({loading: true, query: query})

    this.search(query)
  }

  search = _.debounce( (query) => {
    BooksAPI.search(query.trim(), 20).then((response) => {
      // console.log('search resulst', response)
      if (!response.error && this.state.query !== '') {
        this.props.updateBooks(response)
      } else {
        this.props.updateBooks([])
      }
      this.setState({loading: false})
    })
  }, 250 )

  render () {
    const {books} = this.props
    const {query, loading} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          {books.length === 0 && query && !loading && <p>No results found</p>}
          <ol className="books-grid">
            {books.length > 0 && books.map((book) => (
              <li key={book.id} >
                <Book info={book} onChangeShelf={this.props.onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search