const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "build"), {}))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"))
})

app.get("/output", (req, res) => {
  res.sendFile(path.join(__dirname, "build/output.html"))
})

app.get("/input", (req, res) => {
  res.sendFile(path.join(__dirname, "build/input.html"))
})

app.get("/input/guitar", (req, res) => {
  res.sendFile(path.join(__dirname, "build/guitar.html"))
})

app.get("/input/guitar/picking-hand", (req, res) => {
  res.sendFile(path.join(__dirname, "build/picking-hand-guitar.html"))
})

app.get("/input/guitar/fret-hand", (req, res) => {
  res.sendFile(path.join(__dirname, "build/fret-hand-guitar.html"))
})

const httpServer = createServer(app)

const io = new Server(httpServer)

io.on("connection", socket => {
  socket.on("fret-hand-guitar:update", state => socket.broadcast.emit("fret-hand-guitar:updated", state))
  socket.on("picking-hand-guitar:update", state => socket.broadcast.emit("picking-hand-guitar:updated", state))

  socket.on("disconnecting", () => {
    socket.broadcast.emit("fret-hand-guitar:updated", null)
    socket.broadcast.emit("picking-hand-guitar:updated", null)
  })
})

httpServer.listen(3000)
