import { FretHandGuitarState } from "@root/scripts/types"

const DEFAULT_STATE: FretHandGuitarState = {
  strings: [
    { heldOnFrets: [], isMuted: false },
    { heldOnFrets: [], isMuted: false },
    { heldOnFrets: [], isMuted: false },
    { heldOnFrets: [], isMuted: false },
    { heldOnFrets: [], isMuted: false },
    { heldOnFrets: [], isMuted: false },
  ],
  baseFret: 0,
}

const FRET_LIMIT_IN_DEGREES = 20

export class FretHandGuitar {
  state: FretHandGuitarState
  initialDeviceOrientation: { alpha: number; beta: number; gamma: number }
  guitarNode: HTMLDivElement

  constructor() {
    this.state = DEFAULT_STATE
    this.initialDeviceOrientation = null
    this.guitarNode = document.querySelector("[data-hook='guitar']")
  }

  initialize() {
    window.addEventListener("deviceorientation", this.handleDeviceOrientationChange)

    this.guitarNode.addEventListener("touchstart", this.goFullScreen)
    this.guitarNode.addEventListener("touchstart", this.handleGuitarTouchStart)
    this.guitarNode.addEventListener("touchend", this.handleGuitarTouchEnd)
  }

  clear() {
    window.removeEventListener("deviceorientation", this.handleDeviceOrientationChange)

    this.guitarNode.removeEventListener("touchstart", this.goFullScreen)
    this.guitarNode.removeEventListener("touchstart", this.handleGuitarTouchStart)
    this.guitarNode.removeEventListener("touchend", this.handleGuitarTouchEnd)
  }

  handleDeviceOrientationChange = (event: DeviceOrientationEvent) => {
    if (!this.initialDeviceOrientation) this.initialDeviceOrientation = event

    const deltaAlpha = Math.abs(((Math.abs(this.initialDeviceOrientation.alpha - event.alpha) + 180) % 360) - 180)

    const baseFret = Math.floor(deltaAlpha / FRET_LIMIT_IN_DEGREES)

    if (this.state.baseFret === baseFret) return

    this.state.baseFret = baseFret

    this.onUpdate(this.state)
  }

  handleGuitarTouchStart = (e: TouchEvent) => {
    const target = e.target as HTMLDivElement

    if (!(target.dataset.hook === "string")) return

    const stringNumber = +target.dataset.stringNumber
    const fretNumber = +target.dataset.fretNumber

    if (this.state.strings[stringNumber - 1].heldOnFrets.includes(fretNumber)) return

    const heldOnFrets = [...this.state.strings[stringNumber - 1].heldOnFrets, fretNumber].sort()

    this.state.strings[stringNumber - 1].heldOnFrets = heldOnFrets

    this.onUpdate(this.state)
  }

  handleGuitarTouchEnd = (e: TouchEvent) => {
    const target = e.target as HTMLDivElement

    if (!(target.dataset.hook === "string")) return

    const stringNumber = +target.dataset.stringNumber
    const fretNumber = +target.dataset.fretNumber

    const heldOnFrets = this.state.strings[stringNumber - 1].heldOnFrets.filter(fret => fret !== fretNumber)

    this.state.strings[stringNumber - 1].heldOnFrets = heldOnFrets

    this.onUpdate(this.state)
  }

  goFullScreen = () => {
    if (document.fullscreenElement) return
    document.documentElement.requestFullscreen().then(() => screen.orientation.lock("landscape"))
  }

  onUpdate: (state: FretHandGuitarState) => void
}
