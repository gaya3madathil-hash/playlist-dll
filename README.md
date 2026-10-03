# Playlist Chain: DSA project (Linked List)

A full stack music playlist manager. The playlist is stored in a **hand-written doubly linked list** (`linkedlist.js`), with no arrays holding the data.

## DSA concept
Each song is a node with `prev` and `next` pointers. The list keeps `head`, `tail` and `current` pointers.

| Operation | Time |
|---|---|
| Add first / last | O(1) |
| Next / Previous | O(1) |
| Insert / remove / play at position | O(n) |
| Reverse | O(n) |

## Stack
- Backend: Node.js + Express (REST API)
- Frontend: HTML, CSS, vanilla JS (nodes and pointers drawn live)

## Run locally
```bash
npm install
npm test
npm start      # http://localhost:3000
```

## API
| Method | Route | Purpose |
|---|---|---|
| GET | /api/playlist | Current list |
| POST | /api/songs | Add `{title, artist, position}` |
| DELETE | /api/songs/:index | Remove |
| POST | /api/move | `{from, to}` |
| POST | /api/next, /api/prev, /api/reverse | Navigate / reverse |
| POST | /api/play/:index | Jump to a song |

## Deploy (Render)
New Web Service, connect this repo, Build `npm install`, Start `npm start`.

Live link: https://playlists-wmju.onrender.com
