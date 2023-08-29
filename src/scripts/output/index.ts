import { io, Socket } from "socket.io-client"

import { ClientToServerEvents, FretHandGuitarState, ServerToClientEvents, GuitarState } from "@root/scripts/types"
import { logGuitarState, soundGuitarState } from "./helpers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

let fretHandGuitarState: FretHandGuitarState = null

socket.on("fret-hand-guitar:updated", state => {
  fretHandGuitarState = state
})

socket.on("picking-hand-guitar:updated", state => {
  if (!state || !fretHandGuitarState) return

  const guitarState = {
    ...fretHandGuitarState,
    strings: fretHandGuitarState.strings.map((string, i) => ({ ...string, ...state.strings[i] })),
  } as GuitarState

  soundGuitarState(guitarState)
})
