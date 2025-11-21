# Problem 5: A Crude Server

## Task

Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. ✅ **Interface functionalities:**
   1. ✅ Create a resource ()
      - `POST /users` -> `createUser(UsersTableInsert)`
   2. ✅ List resources with basic filters
      - `GET /users` -> `getUsers(UserQueryParams)`
      - `Params:` `name`, `minAge`, `maxAge`, `orderBy`, `asc`, `desc`, `limit`, `offset`
   3. ✅ Get details of a resource
      - `GET /users/:id` -> `getUserById(id)`
   4. ✅ Update resource details
      - `PUT /users/:id` -> `updateUser(UsersTableUpdate)`
   5. ✅ Delete a resource
      - `DELETE /users/:id'` -> `deleteUser(id)`
2. ✅ You should connect your backend service with a simple database for data persistence (`drizzle-orm` and `local.db`)
3. ✅ Provide README.md for the configuration and the way to run application

---

## Users CRUD API

This backend server allows you to manage users with basic CRUD operations.

### Setup

Install dependencies

```bash
pnpm install
```

Run database migrations

```bash
pnpm db:migrate
```

Start the server

```bash
pnpm start
```

The backend server will be available at `http://localhost:3000/users`.

---

## Endpoints

### Get All Users

Request

```ts
fetch('/users')
  .then(res => res.json())
  .then(data => console.log(data));
```

Response: returns a list of all users:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 31,
    "email": "john.doe1@email.com"
  },
  ...
]
```

### Get User by ID

Request

```ts
fetch('/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

Response: returns the user object with the specified ID:

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 31,
  "email": "john.doe1@email.com"
}
```

---

### 3. Create a New User

Request

```ts
fetch('/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    age: 31,
    email: 'john.doe1@email.com'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

Response: returns the newly created user:

```json
{
  "id": 2,
  "name": "John Doe",
  "age": 31,
  "email": "john.doe1@email.com"
}
```

---

### 4. Update a User

Request

```ts
fetch('/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    age: 21,
    email: 'john.doe1@email.com'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

Response: returns the updated user:

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 21,
  "email": "john.doe1@email.com"
}
```

---

### 5. Delete a User by ID

Request

```ts
fetch('/users/1', { method: 'DELETE' })
  .then(res => res.json())
  .then(data => console.log(data));
```

Response: returns a confirmation of deletion:

```json
{
  "message": "User deleted successfully"
}
```

---

## Notes

* Ensure `Content-Type: application/json` is set for `POST` and `PUT` requests.
* Use browser DevTools or any HTTP client like Postman to test the endpoints.
