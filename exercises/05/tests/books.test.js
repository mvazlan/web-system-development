import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import app from '../app.js'

// Tests run in order (node:test runs top-level tests sequentially)
// and share the same in-memory array, so each one accounts for earlier changes.

let server
let baseUrl

before(async () => {
  await new Promise(resolve => {
    server = app.listen(0, resolve)
  })
  baseUrl = `http://localhost:${server.address().port}`
})

after(async () => {
  await new Promise(resolve => server.close(resolve))
})

function postBook(body) {
  return fetch(`${baseUrl}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

function assertJson(response) {
  assert.match(response.headers.get('content-type'), /application\/json/)
}

test('GET / serves the static HTML page', async () => {
  const response = await fetch(`${baseUrl}/`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /text\/html/)
  assert.match(await response.text(), /<h1>Books API<\/h1>/)
})

test('GET /books returns 200 and an array of books', async () => {
  const response = await fetch(`${baseUrl}/books`)
  assert.equal(response.status, 200)
  assertJson(response)

  const books = await response.json()
  assert.ok(Array.isArray(books))
  assert.ok(books.length >= 2)
  for (const book of books) {
    assert.deepEqual(Object.keys(book).sort(), ['author', 'id', 'title'])
  }
})

test('GET /books/1 returns the starter book', async () => {
  const response = await fetch(`${baseUrl}/books/1`)
  assert.equal(response.status, 200)
  assertJson(response)
  assert.deepEqual(await response.json(), {
    id: '1',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
  })
})

test('GET /books/:id returns 404 JSON for a missing book', async () => {
  const response = await fetch(`${baseUrl}/books/999999`)
  assert.equal(response.status, 404)
  assertJson(response)
  assert.deepEqual(await response.json(), { error: 'book not found' })
})

test('POST /books creates a book with a server-generated id and keeps it', async () => {
  const response = await postBook({ title: 'Test Book', author: 'Test Author' })
  assert.equal(response.status, 201)
  assertJson(response)

  const created = await response.json()
  assert.deepEqual(Object.keys(created).sort(), ['author', 'id', 'title'])
  assert.equal(typeof created.id, 'string')
  assert.notEqual(created.id, '1')
  assert.notEqual(created.id, '2')
  assert.equal(created.title, 'Test Book')
  assert.equal(created.author, 'Test Author')

  // Persists while the process is running.
  const found = await fetch(`${baseUrl}/books/${created.id}`)
  assert.equal(found.status, 200)
  assert.deepEqual(await found.json(), created)

  const list = await (await fetch(`${baseUrl}/books`)).json()
  assert.ok(list.some(book => book.id === created.id))
})

test('POST /books generates a different id for each new book', async () => {
  const first = await (await postBook({ title: 'A', author: 'B' })).json()
  const second = await (await postBook({ title: 'C', author: 'D' })).json()
  assert.notEqual(first.id, second.id)
})

test('POST /books ignores an id and extra fields sent by the client', async () => {
  const response = await postBook({ id: '1', title: 'Client Id', author: 'Someone', extra: 'x' })
  assert.equal(response.status, 201)

  const created = await response.json()
  assert.notEqual(created.id, '1')
  assert.deepEqual(Object.keys(created).sort(), ['author', 'id', 'title'])

  // The starter book with id 1 is unchanged.
  const original = await (await fetch(`${baseUrl}/books/1`)).json()
  assert.equal(original.title, 'The Hobbit')
})

test('POST /books returns 400 for missing or blank fields and creates nothing', async () => {
  const before = (await (await fetch(`${baseUrl}/books`)).json()).length

  const invalidBodies = [
    { author: 'Test Author' },
    { title: 'Test Book' },
    { title: '   ', author: 'Test Author' },
    { title: 'Test Book', author: '   ' },
    { title: 123, author: 'Test Author' },
    {},
  ]

  for (const body of invalidBodies) {
    const response = await postBook(body)
    assert.equal(response.status, 400, JSON.stringify(body))
    assertJson(response)
    const data = await response.json()
    assert.equal(typeof data.error, 'string')
  }

  const after = (await (await fetch(`${baseUrl}/books`)).json()).length
  assert.equal(after, before)
})

test('POST /books without a body returns 400', async () => {
  const response = await fetch(`${baseUrl}/books`, { method: 'POST' })
  assert.equal(response.status, 400)
  assertJson(response)
})

test('POST /books with malformed JSON returns 400 JSON', async () => {
  const response = await postBook('{ "title": "Broken", }')
  assert.equal(response.status, 400)
  assertJson(response)
  assert.deepEqual(await response.json(), { error: 'invalid JSON' })
})

test('DELETE /books/:id returns 204 with empty body and removes only that book', async () => {
  const response = await fetch(`${baseUrl}/books/1`, { method: 'DELETE' })
  assert.equal(response.status, 204)
  assert.equal(await response.text(), '')

  const missing = await fetch(`${baseUrl}/books/1`)
  assert.equal(missing.status, 404)

  const other = await fetch(`${baseUrl}/books/2`)
  assert.equal(other.status, 200)
})

test('DELETE /books/:id returns 404 JSON for a missing book', async () => {
  const response = await fetch(`${baseUrl}/books/999999`, { method: 'DELETE' })
  assert.equal(response.status, 404)
  assertJson(response)
  assert.deepEqual(await response.json(), { error: 'book not found' })
})

test('a deleted id is not reused by new books', async () => {
  const created = await (await postBook({ title: 'After delete', author: 'X' })).json()
  assert.notEqual(created.id, '1')
})

test('unknown routes return 404 JSON unknown endpoint', async () => {
  const response = await fetch(`${baseUrl}/ruta-no-existente`)
  assert.equal(response.status, 404)
  assertJson(response)
  assert.deepEqual(await response.json(), { error: 'unknown endpoint' })
})
