# Exercise 05 - Books REST API (Manuel's base)

This is **the first contribution**, ready for Marcos to complete. The **final assignment is not finished yet**.

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

## Remaining work: Marcos

Complete these requirements without rebuilding the project:

1. `POST /books`: require nonblank string `title` and `author`, status 400 with JSON error if invalid; otherwise create a book with a **server-generated ID**, status 201 with its JSON.
2. `DELETE /books/:id`: remove the book, status 204 with **no response body**; for a missing ID, status 404 and JSON error.
3. Add a custom middleware for **unknown routes**: 404 with `{ "error": "unknown endpoint" }`; register it after the book router.
4. Return JSON errors for malformed JSON bodies, preferably with a dedicated error-handler middleware.
5. Provide HTTP request examples and automatic tests that cover all four endpoints, status codes, empty/invalid fields, unknown routes, and static HTML.
6. Update this README to document the **completed** assignment and how to run/test it.

Note: the exercise asks for **in-memory** data, not a database; all changes are lost on restart. This base starts with two books to demonstrate GET /books/:id; new IDs must not collide with them. The book shape must remain exactly `{ id, title, author }`.

### Suggested Git workflow

- Manuel commits this base on his branch and opens/merges the PR.
- Marcos updates his own branch from the newly merged code; only then implements the remaining changes.
- Marcos opens a separate PR showing his own code contribution.
- Both partners test and understand the integrated project.
