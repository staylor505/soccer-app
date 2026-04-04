# Soccer Management App

![Kicking Soccer Ball](frontend/public/soccer.jpeg)

A full-stack soccer player management app built with Node.js, Express, React, MongoDB, and Vite.

## Features

- View, add, edit, and delete players
- Select a current player and view detailed stats
- Upload player photos
- Replace or remove an existing player photo while editing
- Form validation and save feedback
- Delete confirmation modal

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
- MongoDB connection string (local or Atlas)

## Environment Variables

Create this file:

### backend/.env

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/soccerDB
```

Optional frontend environment override:

### frontend/.env

```env
REACT_APP_API_URL=http://localhost:4000
```

If `REACT_APP_API_URL` is not set, frontend defaults to `http://localhost:4000`.

## Local Setup

1. Install backend dependencies:

```sh
cd backend
npm install
```

2. Install frontend dependencies:

```sh
cd ../frontend
npm install
```

## Run Locally

Open two terminals from the project root.

1. Start backend:

```sh
cd backend
npm start
```

2. Start frontend:

```sh
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Scripts

### Backend

- `npm start`: runs backend with nodemon + babel-node

### Frontend

- `npm run dev` (or `npm start`): starts Vite dev server
- `npm run build`: creates production build in `frontend/build`
- `npm run preview`: previews the production build locally

Note: `npm run preview` expects an existing build. Run `npm run build` first.

## API Endpoints

- `GET /players`: list all players
- `POST /players`: create player (multipart file upload via `image`)
- `GET /players/:playerid`: get one player
- `PUT /players/:playerid`: update player (supports image replace/remove)
- `DELETE /players/:playerid`: delete player
- `GET /health`: health check

## Image Upload Notes

- Accepted file types: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Max file size: 5 MB
- Uploaded files are served from `/uploads`

## Deployment (Recommended)

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

Set production frontend environment variable:

```env
REACT_APP_API_URL=https://your-backend-url
```

Important: this app currently stores uploads on local disk (`backend/uploads`). On many cloud hosts, disk is ephemeral. For long-term production reliability, move image storage to a service like Cloudinary or S3.

## License

MIT
