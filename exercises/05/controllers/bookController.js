import db from '../db.js'

// GET /books -> 200 and an array of books.
export function getBooks(request, response) {
  return response.status(200).json(db.getBooks())
}

// GET /books/:id -> 200 and one book, or JSON error 404.
export function getBookById(request, response) {
  const book = db.getBookById(request.params.id)

  if (!book) {
    return response.status(404).json({ error: 'book not found' })
  }

  return response.status(200).json(book)
}

// TODO (Marcos): implement createBook and deleteBook in this file.
