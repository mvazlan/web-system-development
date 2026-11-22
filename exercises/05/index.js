import app from './app.js'

// The assignment requires the server to listen on port 3000.
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
