Task Management Boards


## Tech Stack

- Node.js (v20)
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Joi for validation
- Docker & Docker Compose

## Prerequisites

Before running the project, make sure you have:

- Docker
- Docker Compose


### Types of BD
- A database dump in zip format is attached to GitHub, unzip it and use Docker according to the instructions below.
- There is a cloud database:
```
MONGO_URI=mongodb+srv://user:user@todo-board-db.flraa18.mongodb.net/
```
for it you need to remove env.db and in the file docker.compose delete db, and replace mongo_uri in env

## Installation and Running with Docker

1. Clone the repository

2. Configure environment variables:

Create `.env` file in the project root:
```
PORT=
MONGO_URI=mongodb+srv://user:user@todo-board-db.flraa18.mongodb.net/
its a cloud db


```
Create `.env.db` file for MongoDB if you are using db with Docker:
```
env
MONGO_INITDB_DATABASE=boardstask
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=user
```
3. Install all dependencies
```
cd backend/
npm install
```

4. Run with Docker Compose:
```
bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```
5. build the frontend app
```
cd frontend/
npm i
npm run watch
```


The API will be available at `http://localhost:YOUR_PORT`
MongoDB will be available at `localhost:YOUR_PORT`
The frontend can be accessed in the browser at`http://localhost`


