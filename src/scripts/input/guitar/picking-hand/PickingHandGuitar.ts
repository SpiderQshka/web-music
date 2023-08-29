import { PickingHandGuitarState } from "@root/scripts/types"

const DEFAULT_STATE: PickingHandGuitarState = {
  strings: [
    { isPulled: false },
    { isPulled: false },
    { isPulled: false },
    { isPulled: false },
    { isPulled: false },
    { isPulled: false },
  ],
}

export class PickingHandGuitar {
  state: PickingHandGuitarState
  initialDeviceOrientation: { alpha: number; beta: number; gamma: number }
  sensor: LinearAccelerationSensor
  isPulled: boolean

  constructor() {
    this.state = DEFAULT_STATE
    this.sensor = new LinearAccelerationSensor({ frequency: 60 })
    this.isPulled = false

    this.sensor.addEventListener("reading", this.handleSensorReading)
  }

  initialize() {
    this.sensor.addEventListener("reading", this.handleSensorReading)
    this.sensor.start()
  }

  clear() {
    this.sensor.removeEventListener("reading", this.handleSensorReading)
    this.sensor.stop()
  }

  handleSensorReading = () => {
    if (this.sensor.z < 10 || this.isPulled) return

    this.isPulled = true
    this.state.strings = this.state.strings.map(() => ({ isPulled: true })) as PickingHandGuitarState["strings"]
    this.onUpdate(this.state)

    setTimeout(() => {
      this.isPulled = false
      // this.state.strings = this.state.strings.map(() => ({ isPulled: false })) as PickingHandGuitarState["strings"]
      // this.onUpdate(this.state)
    }, 500)
  }

  onUpdate: (state: PickingHandGuitarState) => void
}
