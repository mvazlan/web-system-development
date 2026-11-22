// Temporary in-memory storage: data resets when Node.js restarts.
// These starter entries allow us to test GET /books/:id before POST exists.
let books = [
  { id: '1', title: 'The Hobbit', author: 'J. R. R. Tolkien' },
  { id: '2', title: 'Don Quixote', author: 'Miguel de Cervantes' },
]

function getBooks() {
  return books
}

function getBookById(id) {
  return books.find(book => book.id === id)
}

// TODO (Marcos): add createBook and deleteBook here.
// The server must generate IDs. Never trust an ID supplied by the client.
// Do not reuse IDs already generated during the running process.

export default { getBooks, getBookById }
