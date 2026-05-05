# Soccer Management App

![Kicking Soccer Ball](frontend/public/soccer.jpeg)

Soccer Management App is a full-stack CRUD project for managing player profiles, stats, and photos.

## Stack

- Backend: Node.js, Express, Mongoose, Multer
- Frontend: React 19, Vite (latest), Axios
- Database: MongoDB

## Features

- Create, read, update, and delete soccer players
- View a selected player's details
- Upload a player image when creating/editing
- Replace or remove an existing player image
- Health endpoint for backend status checks

## Project Structure

```text
soccer-app/
  backend/
  frontend/
  README.md
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

## Environment Variables

Backend (`backend/.env`):

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/soccerDB
```

Notes:

- If `PORT` is not set, backend defaults to `4000`.
- If `MONGODB_URI` is not set, backend defaults to `mongodb://127.0.0.1:27017/soccerDB`.

Frontend (`frontend/.env`, optional):

```env
REACT_APP_API_URL=http://localhost:4000
```

If not set, the frontend also defaults to `http://localhost:4000`.

## Installation

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

## Running Locally

Open two terminals from the project root.

1. Start backend:

```sh
cd backend
npm run dev
```


2. Start frontend:

```sh
cd frontend
npm run dev
# or
npm start
```

App URLs:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Backend health check: http://localhost:4000/health

## Scripts

Backend:

- `npm start`: Runs server with nodemon (native Node ESM)

Frontend:

- `npm start`: Starts Vite dev server
- `npm run dev`: Starts Vite dev server (recommended)
- `npm run build`: Builds production bundle into `frontend/build`
- `npm run preview`: Previews production build

## API

Base URL: `http://localhost:4000`

- `GET /`: Basic server message
- `GET /health`: Returns `{ "status": "ok" }`
- `GET /players`: Get all players
- `GET /players/:playerid`: Get one player by id
- `POST /players`: Create player (supports image upload via `image` field)
- `PUT /players/:playerid`: Update player (supports image replace/remove)
- `DELETE /players/:playerid`: Delete player

## Uploads

- Supported image types: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Max upload size: 5 MB
- Uploaded files are served from `http://localhost:4000/uploads/...`

## Deployment (Recommended)

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

Set production frontend environment variable:

```env
REACT_APP_API_URL=https://your-backend-url
```

### Netlify

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `build`
- Environment variable: `REACT_APP_API_URL=https://your-render-service.onrender.com`

### Render

- Root directory: `backend`
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/soccerDB?retryWrites=true&w=majority
```

Render usually injects `PORT` automatically, so you do not need to set it unless you have a specific reason.

### MongoDB Atlas

- Create a free cluster.
- Create a database user and use that username/password in `MONGODB_URI`.
- In Network Access, allow Render to connect. For a quick start use `0.0.0.0/0`, then tighten it later if needed.

Important: this app currently stores uploads on local disk (`backend/uploads`). Render disks are ephemeral unless you attach persistent storage, so uploaded images can disappear after a restart or redeploy. For reliable production image storage, move uploads to Cloudinary, S3, or another object store.

## License

MIT
