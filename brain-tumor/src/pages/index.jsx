import React, { useEffect, useState } from 'react'
import '../home.css';
import brain from '../assets/brain.png'
import gridbox from '../assets/gridbox.png'
import molecule from '../assets/molecule.png'
import pinkball from '../assets/pinkball.png'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context';
const Home = () => {
    const { userLoggedIn } = useAuth()

    return (
        <div class="parent">
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
            <div class="child">
                <div class="left">
                    <h3>BRAIN TUMOR DETECTION</h3>
                    <br />
                    <h4>I am a Deep learning model. I can classify brain tumors upto 4 types. Try me out!</h4>
                    <br />
                    <br />
                    <button class="upload">
                        Create an account here 📝
                    </button>


                </div>
                <div class="right">
                    {/* <form onSubmit={handleLogin}>
                        <input type="text" class="upload" placeholder="Email" />
                        <input type="password" class="upload" placeholder="password" />
                        <button class="upload" type="submit">
                            Login 🔓
                        </button>
                    </form> */}
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
    )
}

export default Home