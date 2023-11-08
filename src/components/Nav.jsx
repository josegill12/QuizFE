import React from 'react'
import { Link } from 'react-router-dom'


const Nav = (props) => {
    return (
        <div className='nav-bar'>
            <Link to='/'>
                <div>HomePage</div>
            </Link>
            <Link to='/login'>
                <div>Login</div>
            </Link>
            <Link to='/signup'>
                <div>Signup</div>
            </Link>
        </div>
    )
}

export default Nav