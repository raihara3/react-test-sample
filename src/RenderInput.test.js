import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RenderInput from "./RenderInput"

// コンポーネントをアンマウントする
afterEach(() => cleanup())

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />)
    expect(screen.getByRole("button")).toBeTruthy()
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy()
  })
})

describe("Input frrom onChange event", () => {
  it("Should update input value correctry", () => {
    render(<RenderInput />)
    const input = screen.getByPlaceholderText("Enter")
    // inputにtestと入力したとする
    userEvent.type(input, "test")
    expect(input.value).toBe("test")
  })
})

describe("Console button conditionally triggeered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn() // 空のモック関数
    render(<RenderInput outputConsole={outputConsole} />)
    userEvent.click(screen.getByRole("button"))
    expect(outputConsole).not.toHaveBeenCalled()
  })

  it("Should trigger output function", () => {
    const outputConsole = jest.fn() // 空のモック関数
    render(<RenderInput outputConsole={outputConsole} />)
    // inputに入力
    const input = screen.getByPlaceholderText("Enter")
    userEvent.type(input, "test")
    // ボタンをクリック
    userEvent.click(screen.getByRole("button"))
    expect(outputConsole).toHaveBeenCalled()
  })
})
