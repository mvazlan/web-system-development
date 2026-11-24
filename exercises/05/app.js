import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bookRouter from './routes/bookRoutes.js'
import { unknownEndpoint, errorHandler } from './middlewares/errorMiddleware.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Parse JSON request bodies (necessary for Marcos's future POST route).
app.use(express.json())

// GET / serves the static file public/index.html.
app.use(express.static(path.join(__dirname, 'public')))

// Books endpoints. Currently this router implements GET requests.
app.use('/books', bookRouter)

// Marcos: unknown routes (must go AFTER all routes) and JSON error handler (last).
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
