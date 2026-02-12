#!/usr/bin/env bun
import { BoxRenderable, TextRenderable, createCliRenderer, t, fg, bold, type CliRenderer } from "../index"

export function run(renderer: CliRenderer): void {
  renderer.setBackgroundColor("#1a1b26")

  const mainContainer = new BoxRenderable(renderer, {
    id: "main-container",
    flexGrow: 1,
    maxHeight: "100%",
    maxWidth: "100%",
    flexDirection: "column",
    backgroundColor: "#1a1b26",
    padding: 2,
  })

  const title = new TextRenderable(renderer, {
    content: t`${bold(fg("#7aa2f7")("Hover Cursor Style Demo"))} - Move mouse over elements below`,
  })
  mainContainer.add(title)

  const spacer = new BoxRenderable(renderer, { height: 2 })
  mainContainer.add(spacer)

  const row1 = new BoxRenderable(renderer, {
    flexDirection: "row",
    gap: 2,
  })
  mainContainer.add(row1)

  // Button with pointer cursor
  const button = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "rounded",
    hoverCursorStyle: "pointer",
    onMouseOver() {
      this.borderColor = "#7aa2f7"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const buttonText = new TextRenderable(renderer, {
    content: t`${fg("#c0caf5")("pointer")}`,
  })
  button.add(buttonText)
  row1.add(button)

  // Text input with text cursor
  const inputBox = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "single",
    hoverCursorStyle: "text",
    onMouseOver() {
      this.borderColor = "#bb9af7"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const inputText = new TextRenderable(renderer, {
    content: t`${fg("#565f89")("text")}`,
  })
  inputBox.add(inputText)
  row1.add(inputBox)

  // Crosshair element
  const crosshairBox = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "double",
    hoverCursorStyle: "crosshair",
    onMouseOver() {
      this.borderColor = "#f7768e"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const crosshairText = new TextRenderable(renderer, {
    content: t`${fg("#c0caf5")("crosshair")}`,
  })
  crosshairBox.add(crosshairText)
  row1.add(crosshairBox)

  const spacer2 = new BoxRenderable(renderer, { height: 1 })
  mainContainer.add(spacer2)

  const row2 = new BoxRenderable(renderer, {
    flexDirection: "row",
    gap: 2,
  })
  mainContainer.add(row2)

  // Move element
  const moveBox = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "rounded",
    hoverCursorStyle: "move",
    onMouseOver() {
      this.borderColor = "#e0af68"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const moveText = new TextRenderable(renderer, {
    content: t`${fg("#c0caf5")("move")}`,
  })
  moveBox.add(moveText)
  row2.add(moveBox)

  // Not-allowed element
  const disabledBox = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "single",
    hoverCursorStyle: "not-allowed",
    onMouseOver() {
      this.borderColor = "#414868"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const disabledText = new TextRenderable(renderer, {
    content: t`${fg("#565f89")("not-allowed")}`,
  })
  disabledBox.add(disabledText)
  row2.add(disabledBox)

  // Default cursor element (no hoverCursorStyle)
  const defaultBox = new BoxRenderable(renderer, {
    width: 20,
    height: 3,
    border: true,
    borderStyle: "single",
    onMouseOver() {
      this.borderColor = "#73daca"
      renderer.requestRender()
    },
    onMouseOut() {
      this.borderColor = "#1a1b26"
      renderer.requestRender()
    },
  })
  const defaultText = new TextRenderable(renderer, {
    content: t`${fg("#c0caf5")("default")}`,
  })
  defaultBox.add(defaultText)
  row2.add(defaultBox)

  const spacer3 = new BoxRenderable(renderer, { height: 2 })
  mainContainer.add(spacer3)

  // Instructions
  const note = new TextRenderable(renderer, {
    content: t`${fg("#565f89")("Note: Pointer cursors only work in Kitty, WezTerm, and other modern terminals.")}`,
  })
  mainContainer.add(note)

  const exit = new TextRenderable(renderer, {
    content: t`${fg("#565f89")("Press Ctrl+C to exit.")}`,
  })
  mainContainer.add(exit)

  renderer.root.add(mainContainer)
  renderer.requestRender()
}

async function main() {
  const renderer = await createCliRenderer()
  run(renderer)
}

main().catch(console.error)
