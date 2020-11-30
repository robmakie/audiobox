import React from 'react'
import Wallet from './Wallet'
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import './Header.css'
import '../global.css'

export default function Header() {
    return (
        <header className="headerContainer">
            <Link to="/"><h2 className="tertiary">AudioBox</h2></Link>
            <div className="navbarContainer">
                <Wallet />
                <Link to="/publish"><Button primary>Register Music</Button></Link>
            </div>

        </header>
    )
}