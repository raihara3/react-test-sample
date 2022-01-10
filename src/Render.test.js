import React from "react"
import { render, screen} from "@testing-library/react"

import Render from "./Render"

describe("Rendering", () => {
  it("Should render all the elements correctry", () => {
    render(<Render />)
    // screen.debug()
    // screen.debug(screen.getByRole("heading"))

    // headerがあること
    expect(screen.getByRole("heading")).toBeTruthy()
    // inputがあること
    expect(screen.getByRole("textbox")).toBeTruthy()
    // ボタンがあるか
    expect(screen.getAllByRole("button")[0]).toBeTruthy()
    expect(screen.getAllByRole("button")[1]).toBeTruthy()

    // @ReactというテキストのはいったDOMがあるか
    // screen.debug(screen.getByText("@React"))
    expect(screen.getByText("@React")).toBeTruthy()

    // @VueというテキストのはいったDOMがないこと
    expect(screen.queryByText("@Vue")).toBeNull()

    // sampleというIDを持つDOMがあること
    expect(screen.getByTestId("sample")).toBeTruthy()
  })
})
