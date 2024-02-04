import React, { useContext, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from './context/auth_context';
import { db } from './firebase';
import './home.css'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import brain from './assets/brain.png';
import gridbox from './assets/gridbox.png';
import molecule from './assets/molecule.png';
import pinkball from './assets/pinkball.png';

export default function Home() {

    const { currentUser } = useContext(AuthContext);
    const docRef = doc(db, "users", currentUser.uid);
    useEffect(() => {
        console.log(currentUser.uid)
        const handleLogin = async (e) => {
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
        };
        handleLogin();
    }, []);
    function signout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                window.location.reload();
                // naviagte("/login");
            })
            .catch((error) => { });
    }


    return (
        <>
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

        </>

    )
}
