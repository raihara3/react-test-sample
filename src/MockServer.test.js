import React from "react"
import { render, screen ,cleanup, getByRole } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { rest } from "msw"
import { setupServer } from "msw/node"
import MockServer from "./MockServer"

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }))
  })
)

// 最初に1回だけ実行される
beforeAll(() => server.listen())

// 1つのテストケースが終わるたびに実行
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// 最後に一度だけ
afterAll(() => server.close())

describe("Mocking API", () => {
  it("[Fetch success] Should display fetched data correctry and button disable", async() => {
    render(<MockServer/>)
    userEvent.click(screen.getByRole("button"))
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("disabled")
  })

  it("[Fetch failure] Should display error msg, no render hedding and button abled", async() => {
    // useの中だけで一時的に書き換えられる
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
        return res(ctx.status(404))
      })
    )
    render(<MockServer />)
    userEvent.click(screen.getByRole("button"))
    expect(await screen.findByTestId("error")).toHaveTextContent("Fetching Failed !")

    expect(screen.queryByRole("heading")).toBeNull()
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled")
  })
})
