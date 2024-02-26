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
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [classtype, setClasstype] = useState();


    const handleUpload = async () => {
        if (file) {
            console.log('calling')
            const imageData = new FormData();
            imageData.append('image', file);
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: imageData,
            });
            const data = await response.json();
            setClasstype(data.data['class']);
            console.log('data.result:', data);
        }
    };

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }, [file]);



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
                    {!preview && <button class="upload">
                        pick an image 👉
                    </button>
                    }
                    {preview && <button class="upload" onClick={handleUpload}>
                        Predict 👉
                    </button>}


                </div>
                <div class="right">
                    <form action="/submit" method="POST" enctype="multipart/form-data">
                        <div class="container">


                            {preview && <img src={preview} alt="Preview" />}

                            {!preview && <label for="fileInput" id="dropArea">
                                <input type="file" id="fileInput" accept="image/*" hidden name="image" onChange={(e) => {
                                    setFile(e.target.files[0])
                                }} />
                                <div id="img-view">
                                    <p>pick an image</p>
                                </div>


                            </label>
                            }



                        </div>
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
    )
}

export default Home