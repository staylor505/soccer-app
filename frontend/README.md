# Soccer App Frontend

This is the React + Vite frontend for the Soccer Management App.

## Tech

- React 18
- Vite
- Axios

## Prerequisites

- Node.js 18+
- npm
- Running backend API (default: http://localhost:4000)

## Setup

1. Install dependencies:

```sh
npm install
```

1. Optional: create `.env` to override the backend API base URL:

```env
REACT_APP_API_URL=http://localhost:4000
```

If `.env` is not present, the app defaults to `http://localhost:4000`.

## Run

Start the development server:

```sh
npm start
```

or:

```sh
npm run dev
```

The app runs at http://localhost:3000.

## Scripts

- `npm start`: Start Vite dev server
- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build in `build/`
- `npm run preview`: Preview production build locally

## Key Files

- `src/api.jsx`: Axios instance and API base URL configuration
- `src/Components/Player/`: Player form, list, and detail components
- `vite.config.js`: Dev server (`3000`), build output (`build`), and env prefix (`REACT_APP_`)

## Notes

- This frontend expects the backend to expose routes like `/players` and `/health`.
- For image uploads to work, backend static uploads must be available at `/uploads`.
