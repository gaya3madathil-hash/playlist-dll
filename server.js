const express = require("express");
const path = require("path");
const { DoublyLinkedList } = require("./linkedlist");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const playlist = new DoublyLinkedList();
let nextId = 1;
[["Blinding Lights", "The Weeknd"], ["Kun Faya Kun", "A. R. Rahman"], ["Levitating", "Dua Lipa"]]
  .forEach(([title, artist]) => playlist.addLast({ id: nextId++, title, artist }));

const clean = (s) => String(s || "").trim().slice(0, 80);
const wrap = (fn) => (req, res) => {
  try { fn(req, res); res.json(playlist.toJSON()); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

app.get("/api/playlist", (req, res) => res.json(playlist.toJSON()));

app.post("/api/songs", wrap((req) => {
  const { title, artist, position } = req.body;
  if (!clean(title)) throw new Error("Song title is required");
  const song = { id: nextId++, title: clean(title), artist: clean(artist) || "Unknown artist" };
  if (position === "first") playlist.addFirst(song);
  else if (Number.isInteger(position)) playlist.insertAt(position, song);
  else playlist.addLast(song);
}));

app.delete("/api/songs/:index", wrap((req) => playlist.removeAt(Number(req.params.index))));
app.post("/api/move", wrap((req) => playlist.move(Number(req.body.from), Number(req.body.to))));
app.post("/api/next", wrap(() => playlist.next()));
app.post("/api/prev", wrap(() => playlist.prev()));
app.post("/api/play/:index", wrap((req) => playlist.playAt(Number(req.params.index))));
app.post("/api/reverse", wrap(() => playlist.reverse()));

const PORT = process.env.PORT || 3000;
if (require.main === module) app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
module.exports = app;
