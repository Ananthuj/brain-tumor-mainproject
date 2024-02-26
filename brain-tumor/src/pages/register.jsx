import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import '../home.css'
import brain from '../assets/brain.png'
import gridbox from '../assets/gridbox.png'
import molecule from '../assets/molecule.png'
import pinkball from '../assets/pinkball.png'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div class="parent">

                <div class="child">
                    <div class="left">
                        <h3>BRAIN TUMOR DETECTION</h3>
                        <br />
                        <h4>I am a Deep learning model. I can classify brain tumors upto 4 types. Try me out!</h4>
                        <br />
                        <br />
                        <Link to={'/login'}> <button class="upload">
                            Create an account here 📝
                        </button>
                        </Link>

                    </div>
                    <div class="right">
                        <form onSubmit={onSubmit}>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} class="upload" placeholder="Email" required />
                            <input type="text" class="upload" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Username" required />
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} class="upload" placeholder="password" required />
                            <input type="password" value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} class="upload" placeholder="confirm password" required />
                            <button class="upload" type="submit" id="myButton">
                                Signup 🔓
                            </button>
                        </form>

                    </div>
                    <div class="pinkball">
                        <img src={pinkball} alt="" srcset="" />
                    </div>

                    <div class="molecule">
                        <img src={molecule} alt="" srcset="" />
                    </div>

                    <div class="gridbox">
                        <img src={gridbox} alt="" srcset="" />
                    </div>

                    <div class="brain">
                        <img src={brain} alt="" srcset="" />
                    </div>


                </div>
            </div>
        </>
    )
}

export default Register