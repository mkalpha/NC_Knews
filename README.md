# Nc-News Backend

Presented here is Northcoders News backend, a RESTful API which provides the backend logic for Northcoders News, a reddit style news aggregation and discussion website, which allows users to Post articles, filter articles by topic, post comments and vote on both articles and comments

## Getting Started

1. Fork the repository
2. Clone the Fork of this repository to you local machine
3. Initialise the repository using the node package manager

```
npm init -y
```

## Prerequisits

You will need to install the following dependancies

```
    "body-parser": "^1.18.3"
    "cors": "^2.8.5"
    "express": "^4.16.4"
    "knex": "^0.15.2"
    "pg": "^7.8.2"
```

These can be installed using the Node Package Manager, for example:

```
npm i body-parser
```

The Following Development Dependencies are also required

```
    "chai": "^4.2.0",
    "eslint": "^5.9.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.14.0",
    "husky": "^1.1.4",
    "mocha": "^6.0.2",
    "supertest": "^3.4.2"
```

These should be installed as Development Dependencies using the -D command, for Example

```
npm i chai -D
```

Northcoders News Backend uses PostgreSQL as it's relational database, you should ensure that PostgreSQL is installed on your local machine. Instructions can be found at the following url https://www.postgresql.org/docs/9.3/tutorial-install.html

## Initialising and Seeding the NC_News Database

The following commands should be run in your termainal

```
npm run setup-dbs

npm run seed
```

To create the tables and seed the data for a remote DB make sure the connection information for production is in the knexfile.js and run the following

```
knex migrate:latest --env production

knex seed:run --env production
```

## End Points

The Following end Points are available:

```
GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELETE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users

GET /api/users/:username

GET /api

```

More detailed information about the methods availble on each end point can be found as a JSON Object at https://nc-knews-andrew-workman.herokuapp.com/api

## Unit Testing

Northcoders News was created using Test Driven Development

Unit tests can be found in the spec folder as two separate files

utils.spec.js tests all functions required for seeding the Database

app.spec.js tests endpoints functionality as well as error handeling

In your terminal:

```
npm test
```
