import React, { useState, useEffect } from "react"
import Wallet from "./Wallet"
import { Button, Input, Icon } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"
import "./Header.css"
import "../global.css"

export default function Header({ config, setSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {}, [config])
  return (
    <>
      <header className="headerContainer">
        <Link to="/">
          <h2 className="brand applogo">PODBOX</h2>
        </Link>

        <div className="navbarContainer">
          <Wallet config={config} />
          <Link to="/register">
            <Button primary>Publish Podcast</Button>
          </Link>
          <Link to="/account">
            <Button color="yellow">My Podcasts</Button>
          </Link>
        </div>
      </header>
    </>
  )
}
