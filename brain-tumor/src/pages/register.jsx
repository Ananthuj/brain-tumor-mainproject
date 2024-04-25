import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import '../home.css'
import { db, storage } from "../firebase/firebase";
import brain from '../assets/brain.png'
import gridbox from '../assets/gridbox.png'
import { setDoc, doc, serverTimestamp, arrayUnion, Timestamp, getDoc } from 'firebase/firestore';

import molecule from '../assets/molecule.png'
import pinkball from '../assets/pinkball.png'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [role, setrole] = useState('')
    const [phonenumber, setPhone] = useState('')
    const [hospital, sethospital] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (password == confirmPassword) {
            if (phonenumber.length == 10) {
                try {
                    await doCreateUserWithEmailAndPassword(email, password)
                    const userDocRef = doc(db, "users", email);
                    await setDoc(userDocRef, {
                        hospital: hospital,
                        role: role,
                        name: name,
                        phonenumber: phonenumber,
                    },);
                    alert("successfully created account")
                } catch (r) {
                    alert(r)
                }
            } else {
                alert("Phone number should contain 10 digits")
            }

        } else {
            alert("password donot match")
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
                            Already have an account?
                        </button>
                        </Link>

                    </div>
                    <div class="right">
                        <form onSubmit={onSubmit}>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} class="upload" placeholder="Email" required />
                            <input type="text" class="upload" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name" required />
                            <input type="text" class="upload" value={hospital} onChange={(e) => { sethospital(e.target.value) }} placeholder="Hospital" required />
                            <input type="text" class="upload" value={role} onChange={(e) => { setrole(e.target.value) }} placeholder="Role" required />

                            <input type="text" class="upload" value={phonenumber} onChange={(e) => { setPhone(e.target.value) }} placeholder="Phone Number" required />
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