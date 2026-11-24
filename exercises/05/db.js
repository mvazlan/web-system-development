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

// Marcos: write operations.
// The counter starts at the highest starter ID and only ever grows,
// so new IDs never collide with existing ones and are never reused.
let lastId = Math.max(0, ...books.map(book => Number(book.id)))

function createBook({ title, author }) {
  lastId += 1
  const book = { id: String(lastId), title, author }
  books = books.concat(book)
  return book
}

function deleteBook(id) {
  const exists = books.some(book => book.id === id)
  if (!exists) {
    return false
  }
  books = books.filter(book => book.id !== id)
  return true
}

export default { getBooks, getBookById, createBook, deleteBook }
