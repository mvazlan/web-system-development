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

function isNonBlankString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

// POST /books -> 201 and the new book, or JSON error 400.
export function createBook(request, response) {
  const { title, author } = request.body ?? {}

  if (!isNonBlankString(title)) {
    return response.status(400).json({ error: 'title is required' })
  }
  if (!isNonBlankString(author)) {
    return response.status(400).json({ error: 'author is required' })
  }

  // Only title and author are used: any id or extra field sent by the client is ignored.
  const book = db.createBook({ title, author })
  return response.status(201).json(book)
}

// DELETE /books/:id -> 204 with empty body, or JSON error 404.
export function deleteBook(request, response) {
  const deleted = db.deleteBook(request.params.id)

  if (!deleted) {
    return response.status(404).json({ error: 'book not found' })
  }

  return response.status(204).end()
}
