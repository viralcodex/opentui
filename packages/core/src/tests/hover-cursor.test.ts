import { test, expect, beforeEach, afterEach, describe } from "bun:test"
import { BoxRenderable } from "../index"
import { createTestRenderer, type TestRenderer } from "../testing"

describe("hover cursor style", () => {
  let renderer: TestRenderer

  beforeEach(async () => {
    const setup = await createTestRenderer({ width: 80, height: 24 })
    renderer = setup.renderer
  })

  afterEach(() => {
    renderer.destroy()
  })

  test("getCurrentHoverCursorStyle returns own style", () => {
    const box = new BoxRenderable(renderer, { hoverCursorStyle: "pointer" })
    expect(box.getCurrentHoverCursorStyle()).toBe("pointer")
  })

  test("getCurrentHoverCursorStyle inherits from parent", () => {
    const parent = new BoxRenderable(renderer, { hoverCursorStyle: "pointer" })
    const child = new BoxRenderable(renderer, {})
    parent.add(child)
    expect(child.getCurrentHoverCursorStyle()).toBe("pointer")
  })

  test("child style overrides parent style", () => {
    const parent = new BoxRenderable(renderer, { hoverCursorStyle: "pointer" })
    const child = new BoxRenderable(renderer, { hoverCursorStyle: "text" })
    parent.add(child)
    expect(child.getCurrentHoverCursorStyle()).toBe("text")
  })

  test("returns undefined when no style set", () => {
    const box = new BoxRenderable(renderer, {})
    expect(box.getCurrentHoverCursorStyle()).toBeUndefined()
  })

  test("deep nesting inherits from ancestor", () => {
    const grandparent = new BoxRenderable(renderer, { hoverCursorStyle: "crosshair" })
    const parent = new BoxRenderable(renderer, {})
    const child = new BoxRenderable(renderer, {})
    grandparent.add(parent)
    parent.add(child)
    expect(child.getCurrentHoverCursorStyle()).toBe("crosshair")
  })
})