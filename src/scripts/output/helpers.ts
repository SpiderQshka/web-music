import { GuitarState } from "@root/scripts/types"

export const logGuitarState = (state: GuitarState) => {
  if (!state) return

  console.clear()

  state.strings.forEach((string, i) =>
    console.log(`${i}| ${string.heldOnFrets.length === 0 ? 0 : string.heldOnFrets.join("-")}`),
  )

  console.log("-------------------")
  console.log("Base fret:", state.baseFret)
}
