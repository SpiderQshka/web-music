import "@root/styles/reset.css"
import "@root/styles/output.css"

import { io, Socket } from "socket.io-client"

import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { logGuitarState } from "./helpers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

socket.on("guitar:updated", logGuitarState)
