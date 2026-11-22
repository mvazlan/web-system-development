import { Router } from 'express'
import { getBooks, getBookById } from '../controllers/bookController.js'

const bookRouter = Router()

// Manuel: read operations.
bookRouter.get('/', getBooks)
bookRouter.get('/:id', getBookById)

// TODO (Marcos): add POST / and DELETE /:id with your controller functions.

export default bookRouter
