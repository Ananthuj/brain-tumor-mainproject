import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../home.css'
import { doSignOut } from '../firebase/auth'
const Header = () => {

    const navigate = useNavigate()

    const onLogout = async (e) => {
        e.preventDefault()
        await doSignOut();
    }
    return (
        <nav>

            <div class="navleft">BRAIN TUMOR DETECTION </div>
            <div class="navright">
                <ul>
                    <li>Home</li>
                    <li>History</li>
                    <li onClick={onLogout}>Logout</li>
                </ul>
            </div>
        </nav>
    )
}

export default Header