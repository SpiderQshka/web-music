import { FretHandGuitarState, GuitarState } from "@root/scripts/types"

export const logGuitarState = (state: FretHandGuitarState) => {
  if (!state) return

  console.clear()

  state.strings.forEach((string, i) =>
    console.log(`${i}| ${string.heldOnFrets.length === 0 ? 0 : string.heldOnFrets.join("-")}`),
  )

  console.log("-------------------")
  console.log("Base fret:", state.baseFret)
}

const NOTES_MAP = [
  ["Ab3", "G3", "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3", "B2", "Bb2", "A2", "Ab2", "G2", "Gb2", "F2", "E2"],
  ["Db4", "C4", "B3", "Bb3", "A3", "Ab3", "G3", "Gb3", "F3", "E3", "Eb3", "D3", "Db3", "C3", "B2", "Bb2", "A2"],
  ["Gb4", "F4", "E4", "Eb4", "D4", "Db4", "C4", "B3", "Bb3", "A3", "Ab3", "G3", "Gb3", "F3", "E3", "Eb3", "D3"],
  ["B4", "Bb4", "A4", "Ab4", "G4", "Gb4", "F4", "E4", "Eb4", "D4", "Db4", "C4", "B3", "Bb3", "A3", "Ab3", "G3"],
  ["Eb5", "D5", "Db5", "C5", "B4", "Bb4", "A4", "Ab4", "G4", "Gb3", "F4", "E4", "Eb4", "D4", "Db4", "C4", "B3"],
  ["Ab5", "G5", "Gb5", "F5", "E5", "Eb5", "D5", "Db5", "C5", "B4", "Bb4", "A4", "Ab4", "G4", "Gb4", "F4", "E4"],
]

export const soundGuitarState = (state: GuitarState) => {
  const audios = [
    new Audio("./assets/Ab3.mp3"),
    new Audio("./assets/Eb5.mp3"),
    new Audio("./assets/B4.mp3"),
    new Audio("./assets/Gb4.mp3"),
  ]

  audios.forEach(audio => audio.play())
}
