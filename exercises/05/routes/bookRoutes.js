import { Router } from 'express'
import { getBooks, getBookById, createBook, deleteBook } from '../controllers/bookController.js'

const bookRouter = Router()

// Manuel: read operations.
bookRouter.get('/', getBooks)
bookRouter.get('/:id', getBookById)

// Marcos: write operations.
bookRouter.post('/', createBook)
bookRouter.delete('/:id', deleteBook)

export default bookRouter
