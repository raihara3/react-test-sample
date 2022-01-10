import React, { useState } from 'react'
import axios from "axios"

const MockServer = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const fetchUser = async() => {
    axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(res => {
      const { username } = res.data
      setUsername(username)
      setIsClicked(true)
    })
    .catch((e) => {
      setError("Fetching Failed !")
    })
  }

  return (
    <div>
      <button
        onClick={fetchUser}
        disabled={isClicked}
      >
        {isClicked ? "Loaded" : "Start Fetch"}
      </button>
      {username && (
        <h3>{username}</h3>
      )}
      {error && (
        <p data-testid="error">{error}</p>
      )}
    </div>
  )
}

export default MockServer
