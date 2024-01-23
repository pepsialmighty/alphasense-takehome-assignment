# AlphaSense Home Test

- [AlphaSense Home Test](#alphasense-home-test)
  - [Tasks status](#tasks-status)
    - [React Client](#react-client)
      - [\> Client visuals](#-client-visuals)
      - [\> Interactions](#-interactions)
      - [\> State](#-state)
      - [\> Messages](#-messages)
      - [\> No error handling required](#-no-error-handling-required)
    - [NodeJS backend](#nodejs-backend)
  - [Instructions](#instructions)
    - [backend](#backend)
    - [Frontend](#frontend)
  - [Run with docker](#run-with-docker)
    - [Prerequisites](#prerequisites)
    - [Run in the local with docker-compose](#run-in-the-local-with-docker-compose)

## Tasks status

> Completed all tasks
>
> Extra features
>
> - Optimistic loading
> - Virtual scroll to latest message
> - Data caching on client using IndexedDb

### React Client

#### > Client visuals

- [x] Render a full page application with three panels
- [x] Navigation panel shows a list of channels
- [x] Message list panel shows a list of message bodies for one channel
- [x] Editor panel shows a text area input
  - [x] Editor panel is hidden if there is no channel selected
  - [x] Editor has a submit button
  - [x] Submit button is disabled if there is no text in message body

#### > Interactions

- [x] Clicking a channel in navigation panel selects that channel
- [x] Entering text in editor and clicking submit adds message to the currently selected
      channel
- [x] Submitting editor clears input
- [x] Switching channels clears input

#### > State

- [x] Channel list
  - [x] Channel list is loaded once on loading the application
- [x] Channel selection
  - [x] Initially no channel is selected
- [x] Selected channel and messages
  - [x] There is no upfront loading of messages
  - [x] Messages already in local state are showed immediately
  - [x] Messages are loaded from remote on channel selection and updated to
        screen
  - [x] Messages are also stored to local state after loading the from remote

#### > Messages

- [x] Editing is not required, only creation
- [x] Upon submitting a message to a channel that message is available for other
      users
- [x] Submitting user sees message in message list after submitting
  - [x] Render created message in the list immediately before refreshing from backend

#### > No error handling required

### NodeJS backend

- [x] Channel and message storage can be an in-memory database (global variable etc).
- [x] On server start, storage is populated with a fixed set of empty channels
- [x] GET endpoint for querying channels
  - GET `http://<backend>/channels`
- [x] GET endpoint for querying channel’s messages
  - GET `http://<backend>/messages/<channel>`
- [x] POST endpoint for submitting new messages to a channel
  - POST `http://<backend>/<channel>`
  - Body
    - Message text

## Instructions

### backend

> ENVIRONMENT VARIABLES:
>
> - PORT=5000 (default)
> - Should create the `.env` file and place the `PORT=5000` into it

- Change directory to the backend directory

```bash
cd backend
```

- Install dependencies

```bash
npm install
```

- Run in development mode

```bash
npm run dev
```

- build

```bash
npm run build
```

- Start in production mode

```bash
node dist/index.js

# or: npm start
```

### Frontend

> ENVIRONMENT VARIABLES:
>
> - `REACT_APP_API_SERVER=http://localhost:5000` (default)
> - Should create the `.env.local` file and place the `REACT_APP_API_SERVER=http://localhost:5000` into it

- Change directory to the frontend directory

```bash
cd frontend
```

- Install dependencies

```bash
npm install
```

- Run in development mode

```bash
npm start
```

- build

```bash
npm build
```

## Run with docker

To quickly start the application with docker, please use `docker-compose`

### Prerequisites

- Docker 19+
- docker-compose

### Run in the local with docker-compose

- run

```bash
docker-compose up -d
```

- open the application at `http://localhost:3000`
