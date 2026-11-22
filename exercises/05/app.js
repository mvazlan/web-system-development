import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bookRouter from './routes/bookRoutes.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Parse JSON request bodies (necessary for Marcos's future POST route).
app.use(express.json())

// GET / serves the static file public/index.html.
app.use(express.static(path.join(__dirname, 'public')))

// Books endpoints. Currently this router implements GET requests.
app.use('/books', bookRouter)

// TODO (Marcos): mount your own unknown-endpoint middleware AFTER the routes.
// TODO (Marcos): add JSON error-handling middleware for malformed JSON.

export default app
