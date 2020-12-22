import React from 'react'
import Wallet from './Wallet'
import { Button, Input, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Header.css'
import '../global.css'

export default function Header() {
  return (
    <>
      <header className='headerContainer'>
        <Link to='/'>
          <h2 className='brand'>AudioBox</h2>
        </Link>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search Music...'
        />
        <div className='navbarContainer'>
          <Wallet />
          <Link to='/register'>
            <Button primary>Register Music</Button>
          </Link>
          <Link to='/register'>
            <Button primary>My Music</Button>
          </Link>
        </div>
      </header>
    </>
  )
}
