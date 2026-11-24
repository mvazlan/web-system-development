// Any request that did not match a route ends here -> 404 JSON.
export function unknownEndpoint(request, response) {
  return response.status(404).json({ error: 'unknown endpoint' })
}

// Error-handling middleware: Express recognises it by its four parameters.
export function errorHandler(error, request, response, next) {
  // If a response was already started, let Express's default handler close it.
  if (response.headersSent) {
    return next(error)
  }

  // express.json() raises this error when the body is not valid JSON.
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ error: 'invalid JSON' })
  }

  console.error(error)
  return response.status(500).json({ error: 'internal server error' })
}
