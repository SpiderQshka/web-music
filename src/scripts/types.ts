export interface StringState {
  heldOnFrets: number[]
  isPulled: boolean
  isMuted: boolean
}

export type PickingHandStringState = Pick<StringState, "isPulled">
export type FretHandStringState = Pick<StringState, "heldOnFrets" | "isMuted">

export interface GuitarState {
  baseFret: number
  strings: [StringState, StringState, StringState, StringState, StringState, StringState]
}

export interface PickingHandGuitarState {
  strings: [
    PickingHandStringState,
    PickingHandStringState,
    PickingHandStringState,
    PickingHandStringState,
    PickingHandStringState,
    PickingHandStringState,
  ]
}

export interface FretHandGuitarState extends Pick<GuitarState, "baseFret"> {
  strings: [
    FretHandStringState,
    FretHandStringState,
    FretHandStringState,
    FretHandStringState,
    FretHandStringState,
    FretHandStringState,
  ]
}

export interface ServerToClientEvents {
  "fret-hand-guitar:updated": (state: FretHandGuitarState) => void
  "picking-hand-guitar:updated": (state: PickingHandGuitarState) => void
}

export interface ClientToServerEvents {
  "fret-hand-guitar:update": (state: FretHandGuitarState) => void
  "picking-hand-guitar:update": (state: PickingHandGuitarState) => void
}
