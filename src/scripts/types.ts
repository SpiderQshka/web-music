export interface StringState {
  heldOnFrets: number[]
  isPulled: boolean
  isMuted: boolean
}

export interface GuitarState {
  baseFret: number
  strings: [StringState, StringState, StringState, StringState, StringState, StringState]
}

export interface ServerToClientEvents {
  "guitar:updated": (state: GuitarState) => void
}

export interface ClientToServerEvents {
  "guitar:update": (state: GuitarState) => void
}
