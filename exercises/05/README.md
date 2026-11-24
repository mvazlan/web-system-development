# Exercise 05 - Books REST API

Simple REST API with Express to manage a list of books `{ id, title, author }`. The assignment is **complete**: Manuel built the base and the read operations, and Marcos added the write operations, middlewares and tests.

| Endpoint | Success | Error |
|---|---|---|
| `GET /books` | 200 + JSON array | — |
| `POST /books` | 201 + created book | 400 if `title` or `author` is missing/blank |
| `GET /books/:id` | 200 + book | 404 if it does not exist |
| `DELETE /books/:id` | 204, empty body | 404 if it does not exist |

Any other route returns 404 `{ "error": "unknown endpoint" }`. Errors are always JSON `{ "error": "..." }`.

## Manuel's contribution

- Node.js + Express project with ES modules.
- `npm run dev` starts the server on port **3000**.
- `express.json()` is registered in `app.js`.
- A static welcome page is served at `GET /` from `public/index.html`.
- An in-memory array with two starter books exists in `db.js`.
- `GET /books` responds with status 200 and a JSON array.
- `GET /books/:id` responds with the book (200) or a JSON error (404).
- A small REST Client file (`requests/books-read.http`) helps manually test the GETs.

## Start locally

In the repository, inside `exercises/05`:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/books`.

`npm install` will also generate `package-lock.json` if it is missing; commit that file.

## Marcos's contribution

- `db.js`: `createBook({ title, author })` generates the ID on the server with a counter that starts at the highest starter ID, so IDs never collide and are never reused; `deleteBook(id)` removes only that book with `filter` and returns `true`/`false`.
- `controllers/bookController.js`: `createBook` requires `title` and `author` as non-blank strings (400 otherwise), ignores any `id` or extra fields from the client and answers 201; `deleteBook` answers 204 with `.end()` or 404 JSON.
- `routes/bookRoutes.js`: `POST /` and `DELETE /:id`.
- `middlewares/errorMiddleware.js`: `unknownEndpoint` (404 `unknown endpoint`) and `errorHandler` (400 `invalid JSON` for malformed bodies, 500 `internal server error` otherwise).
- `app.js`: both middlewares registered after the book router, in this order: `express.json()` → `express.static()` → `/books` → `unknownEndpoint` → `errorHandler`.
- `requests/books.http`: REST Client requests for every endpoint and error case.
- `tests/books.test.js`: automatic tests with `node:test` and `fetch`.

Data is stored **in memory** (no database): every change is lost when Node.js restarts.

## Test

Manual: with `npm run dev` running, open `requests/books.http` in VS Code (REST Client extension) and click **Send Request** on each block.

Automatic (the server does not need to be running; the tests open a random port):

```bash
npm test
```

### Suggested Git workflow

- Manuel commits this base on his branch and opens/merges the PR.
- Marcos updates his own branch from the newly merged code; only then implements the remaining changes.
- Marcos opens a separate PR showing his own code contribution.
- Both partners test and understand the integrated project.
