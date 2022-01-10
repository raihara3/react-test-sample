import React from "react"
import { render, screen } from "@testing-library/react"
import UseEffectRender from "./UseEffectRender"

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async() => {
    render(<UseEffectRender />)
    // 非同期なので最初は表示されていないことを確認
    expect(screen.queryByText(/I am/)).toBeNull()
    expect(await screen.findByText(/I am/)).toBeInTheDocument()
  })
})
