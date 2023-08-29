import { io, Socket } from "socket.io-client"

import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { PickingHandGuitar } from "./PickingHandGuitar"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const pickingHandGuitar = new PickingHandGuitar()

pickingHandGuitar.initialize()

pickingHandGuitar.onUpdate = state => socket.emit("picking-hand-guitar:update", state)

socket.on("disconnect", () => pickingHandGuitar.clear())
