# Soccer Management App

![Kicking Soccer Ball](frontend/public/soccer.jpeg)

A full-stack soccer player management app built with Node, Express, React, MongoDB, and Vite.

## Features

- View, add, edit, and delete players
- Select a current player from the list and view detailed stats
- Upload player photos from the form
- Replace or remove an existing player photo while editing
- Custom delete confirmation modal

## Tech Stack

- Backend: Node.js, Express, Mongoose, Multer
- Frontend: React 18, Vite, Axios, Materialize CSS
- Database: MongoDB

## Project Structure

```text
backend/
frontend/
README.md
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Setup

1. Install backend dependencies:

```sh
cd backend
npm install
```

1. Create `backend/.env` with your values:

```env
PORT=4000
MONGODB_URI=<your-mongodb-connection-string>
```

1. Install frontend dependencies:

```sh
cd ../frontend
npm install
```

1. Optional: create `frontend/.env` to override API URL:

```env
REACT_APP_API_URL=http://localhost:4000
```

## Run the App

From two separate terminals:

1. Start backend:

```sh
cd backend
npm start
```

1. Start frontend:

```sh
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`.
Backend runs on `http://localhost:4000`.

## Available Scripts

### Backend

- `npm start` - runs backend with nodemon + babel-node

### Frontend

- `npm start` or `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build

## API Endpoints

- `GET /players` - retrieve all players
- `POST /players` - create player (supports multipart file upload via `image` field)
- `GET /players/:playerid` - retrieve one player
- `PUT /players/:playerid` - update player (supports image replace/remove)
- `DELETE /players/:playerid` - delete player
- `GET /health` - health check

## Image Upload Notes

- Accepted file types: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Max file size: 5 MB
- Uploaded files are served from `/uploads`

## License

MIT
