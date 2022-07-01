import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
       <h3>
          <Link to="/">FireChat</Link>
       </h3>
       <div>
          <Link to="/Register">Register</Link>
          <Link to="/Login">Login</Link>
       </div>
    </nav>
  )
}
