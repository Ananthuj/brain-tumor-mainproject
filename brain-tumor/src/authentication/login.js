import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import brain from '../assets/brain.png';
import gridbox from '../assets/gridbox.png';
import molecule from '../assets/molecule.png';
import pinkball from '../assets/pinkball.png';

function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const naviage = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user });
                console.log(user)
                notify();
                naviage("/");

            })
            .catch((errorMsg) => {
                const errorMsgCode = errorMsg.code;
                const errorMsgMessage = errorMsg.message;
                // ..
                const notifyError = () => toast.error(errorMsgMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                notifyError();

            });
    };

    const notify = () => toast.success('👍 Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
                        <Link to={"/signup"}>
                            <button class="upload">
                                Create an account here 📝
                            </button>
                        </Link>


                    </div>
                    <div class="right">
                        <form onSubmit={handleLogin}>
                            <input type="text" class="upload" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" class="upload" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                            <button class="upload" type="submit">
                                Login 🔓
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
    );
}

export default Login;
