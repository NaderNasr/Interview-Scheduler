# Preview



---
# Technologies Used

Front end | Back end | Testing Frameworks | UI Test Bed
  ---     |   ---    |       ---          |     ---
React Js / ES6 | Express | Cypress        | Story book
Axios     | PostgreSQL   | Jest           |
SASS      | Node Js      | React Test Renderer|
Webpack   |              |                |



----
# Setup
# Interview Scheduler Client


Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Test Frameworks
### Jest

```sh
npm test
```
### Cypress

```sh
npm run storybook
```
## Running Visual Testbed
### Storybook 

```sh
npm run storybook
```
----
# Running the Scheduler Server API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Make sure you have PostgreSQL
- [Getting Started with PSQL](https://www.postgresqltutorial.com/postgresql-getting-started/)
- [Download psql](https://www.postgresql.org/download/)

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.

Create a database with the command `CREATE DATABASE scheduler_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run the development server with `npm start` in the Host environment.

Both of these achieve the same result.

- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

The `development` data is random. Each time we seed we expect to see different appointments.

## Run The Server

Running the server normally
```sh
npm start
```

Running this to test error
```sh
npm run error
```
