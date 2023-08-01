import "@root/styles/reset.css"
import "@root/styles/input.css"

import { io, Socket } from "socket.io-client"

import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { Guitar } from "./instruments/Guitar"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const guitar = new Guitar()

guitar.initialize()
guitar.onUpdate = state => socket.emit("guitar:update", state)

socket.on("disconnect", () => guitar.clear())