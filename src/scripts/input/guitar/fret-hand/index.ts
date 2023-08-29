import "@root/styles/fret-hand-guitar.css"

import { io, Socket } from "socket.io-client"

import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { FretHandGuitar } from "./FretHandGuitar"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const fretHandGuitar = new FretHandGuitar()

fretHandGuitar.initialize()

fretHandGuitar.onUpdate = state => socket.emit("fret-hand-guitar:update", state)

socket.on("disconnect", () => fretHandGuitar.clear())
