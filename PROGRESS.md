# ForkyMarket — Progress Tracker

## ✅ Done

### Backend — Server & Database
- Express 5 server with CORS, JSON body parser
- PostgreSQL connection via `pg` Pool (env-configured: `DB_NAME`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`)
- Auto schema bootstrap on startup — `users`, `favs`, `messages` tables created via raw SQL + `pgcrypto` UUIDs
- HTTP server created from Express app, passed to WebSocket server

### Backend — Authentication
- `POST /api/auth/signup` — validates input, checks for duplicate username, bcrypt hashes password (salt rounds 10), inserts user, returns JWT
- `POST /api/auth/login` — validates credentials, compares bcrypt hash, returns JWT
- `GET /api/auth/user` — returns user by username from body (basic lookup)
- `protectedRoute` middleware — extracts/verifies `Authorization: Bearer <token>`, attaches decoded payload to `req.user`
- `generateToken(id)` — signs JWT with `{id}`, 12h expiry, secret from `JWT_SECRET` env var
- Express type augmentation (`types/express.d.ts`) for `req.user`

### Backend — WebSocket Architecture
- **Binance WS client** (`ws/api.ts`):
  - Connects to Binance combined stream for 10 coins: `btcusdt`, `ethusdt`, `bnbusdt`, `solusdt`, `xrpusdt`, `dogeusdt`, `adausdt`, `avaxusdt`, `linkusdt`, `dotusdt` (all `@trade` streams)
  - Maintains in-memory `Record<string, string>` prices map keyed by symbol
  - Broadcasts full prices map every 2 seconds to all connected clients
  - Handles WS errors and close/reconnect logging
- **WS broadcast server** (`ws/wsServer.ts`):
  - Creates `WebSocketServer` on HTTP server (maxPayload 1MB)
  - Returns the `wss` instance for wiring in `index.ts`
  - Receives text messages from clients, broadcasts to all as `{type:"broadcast", message:"Server Broadcast: ..."}`
  - Standardized typed message format: `{type:"prices", data:{...}}` / `{type:"broadcast", message:"..."}`
- **Wiring**: `index.ts` correctly captures `wss` from `wsServer(server)` and passes it into `apiServer(wss)`

### Backend — Routes
- Auth routes mounted at `/api/auth`
- Favs routes mounted at `/api/app` under `protectedRoute` (stubs — see Undone)

### Frontend — Scaffolding & Routing
- React 19 + Vite + Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- React Router `BrowserRouter` with route guards:
  - `<Protected>` — redirects unauthenticated users to `/login`
  - `<ProtectedAuth>` — redirects authenticated users away from login/signup
- Axios client (`api.ts`) with `baseURL: http://localhost:8080/`, Bearer token interceptor, 401 redirect to `/login`

### Frontend — Auth Pages
- `Login.tsx` — form with username (min 4) + password (min 6), client validation, POST to `/api/auth/login`, stores `userId` + `token` in localStorage, toast errors
- `Signup.tsx` — same pattern, POST to `/api/auth/signup`

### Frontend — WebSocket Client
- `Starter.tsx`:
  - Connects to `ws://localhost:8080` on mount
  - Displays connection status (connected/disconnected)
  - Parses typed WS messages, separates `prices` state from `msgs` (chat) state
  - Renders current prices (`symbol: $price`) and chat messages
  - Form to send broadcast text messages

---

## ❌ Undone / Gaps

### Backend — Favorites (Stubbed)
- **`favsController.ts`** — all 3 handlers (`getFavs`, `addFav`, `removeFav`) are empty async functions that never call `res.send()` — requests hang indefinitely
- No integration between favs and live prices (e.g., show prices only for favourited coins)

### Frontend — Live Prices Not Visible
- `Starter.tsx` is **never rendered** — `App.tsx` only renders `Header + OpeningCard`
- Price feed works on the backend but the main app UI doesn't display it
- `OpeningCard.tsx` is a static placeholder ("yo" / "top" / "bottom")
- `DisplayTop7.tsx` is a stub (`<div>DisplayTop7</div>`) — unused

### Frontend — Navigation
- Header links ("markets", "favs", "analysis") are plain `<li>` elements with no routes, handlers, or corresponding pages
- No page components exist for `/markets`, `/favs`, `/analysis`

### WebSocket — Missing Features
- **No WS authentication** — any client can connect and receive all broadcasts
- **No reconnection logic** — frontend WS silently dies on disconnect
- **No heartbeat/ping-pong** — dead connections accumulate server-side
- **No coin-level subscription filtering** — every client receives all 10 coins
- **No private messaging** — `messages` table exists but is unused; WS just broadcasts all text to all clients

### Configuration & Environment
- **No `.env` or `.env.example`** — database connection and JWT secret are undocumented
- **Frontend hardcodes `ws://localhost:8080`** in `Starter.tsx` (no env var)
- **Frontend hardcodes `http://localhost:8080/`** in `api.ts` (no `VITE_API_URL`)
- **Port mismatch** — backend defaults to `3030`, frontend uses `8080`
- **CORS allows all origins** (`app.use(cors())` — no restriction)

### Code Quality
- **Typo in `authController.ts:14`** — "Plwase enter valid credentials"
- **Typo in `authMiddleware.ts:15`** — says "Not Authorized" (s/b "Unauthorized")
- **`getuser` uses `req.body` on a GET route** — should use query params or URL params
- **No request validation library** (no zod/joi) — only basic existence checks
- **`mongoose` unused dependency** in `backend/package.json`

### Frontend Polish
- **No error boundary** component
- **No loading states** on Login/Signup (spinner, disabled button during request)
- **No dropdown/profile menu** — profile image in header has no click handler
- **No auth state management** — relies solely on localStorage tokens, no React Context

### Testing & Deployment
- **No tests** — `"test"` script in `backend/package.json` just echoes an error
- **No Dockerfile, docker-compose, or deployment config**
