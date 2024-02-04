import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from "../firebase";
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from '../firebase';
import { AuthContext } from '../context/auth_context';
import { useNavigate } from "react-router-dom";
import './login.css'
import { Link } from 'react-router-dom';
import brain from '../assets/brain.png';
import gridbox from '../assets/gridbox.png';
import molecule from '../assets/molecule.png';
import pinkball from '../assets/pinkball.png';

const Signup = ({ inputs }) => {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setuid] = useState();
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()





    const handleSignup = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    email: email,
                    name: name,
                    timestamp: serverTimestamp(),
                });
                toast('🦄 Successfully created account!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    return (
        <>
            <div class="parent">
                <nav>

                    <div class="navleft">BRAIN TUMOR DETECTION  </div>
                    <div class="navright">
                        <ul>
                            <li>Home</li>
                            <li>History</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </nav>
                <div class="child">
                    <div class="left">
                        <h3>BRAIN TUMOR DETECTION</h3>
                        <br />
                        <h4>I am a Deep learning model. I can classify brain tumors upto 4 types. Try me out!</h4>
                        <br />
                        <br />
                        <Link to={'/login'}>
                            <button class="upload">
                                Login Here 🔓
                            </button>
                        </Link>


                    </div>
                    <div class="right">
                        <form onSubmit={handleSignup}>
                            <input type="text" class="upload" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" class="upload" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            <input type="password" class="upload" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                            <button class="upload" type="submit">
                                Create Account 📝
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    )
}


export default Signup