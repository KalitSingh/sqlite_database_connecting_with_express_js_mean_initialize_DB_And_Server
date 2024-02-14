const express = require('express')
const app = express()

const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const path = require('path')
const dbPath = path.join(__dirname, './goodreads.db')
let db = null
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () =>
      console.log('Server is Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`Db Error ${error.message}`)
  }
}

initializeDBAndServer()

// Writting an API to get details of all rows of the books
app.get('/books/', async (request, response) => {
  const getBookQuery = `
    SELECT * FROM book;
  `
  const bookArray = await db.all(getBookQuery)
  response.send(bookArray)
})

// Writting API for a single book using get() instead of all()
app.get('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params
  const bookQueryById = ` 
  SELECT * FROM book 
  WHERE book_id = ${bookId};
  `
  const singleBookDetail = await db.get(bookQueryById)
  response.send(singleBookDetail)
})
