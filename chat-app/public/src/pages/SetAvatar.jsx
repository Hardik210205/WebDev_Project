import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import './RegCss.css';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { SetAvatarRoute } from "../utils/APIRoutes";
import styled from 'styled-components';
import { Buffer } from 'buffer'; // Corrected Buffer import

 function SetAvatar() {
    const api = "https://avatar.iran.liara.run/public";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]); // Corrected state function name
    const [isLoading, setIsLoading] = useState(true); // Corrected state function name
    const [selected, setSelected] = useState(undefined); // Corrected state function name

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    useEffect(() => {
        const checkAuth = async () => {
          const userData = localStorage.getItem('chat_app_pro');
          if (!userData) {
            navigate("/login");
          }
        };
        checkAuth();
      }, [navigate]);



    useEffect(() => {
        const fetchAvatars = async () => {
         
            const data = [];
            for (let i = 0; i < 4; i++) {
                // try {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 100)}`,
                    { responseType: 'arraybuffer' }
                );
                const buffer = Buffer.from(image.data, 'binary').toString('base64'); // Corrected Buffer usage
                data.push(buffer);
                // } catch (error) {
                //     console.error("Error fetching avatar:", error);
                // }
            }
            setAvatars(data); // Corrected state function name
            setIsLoading(false); // Corrected state function name
        };

        fetchAvatars();
    }, []);

    const handleSubmit = async () => {
        if (selected === undefined) {
            toast.error("Please select an avatar", toastOptions);
            return;
        }
        else{
            const user  = await JSON.parse(localStorage.getItem("chat_app_pro"))
            console.log(`${SetAvatarRoute}/${user._id}`);
            if (!user || !user._id) {
                toast.error("User data is invalid or missing", toastOptions);
                return;
            }
            // console.log(avatars[selected]);
            const data = await axios.post(`${SetAvatarRoute}/${user._id}`,{
                image: avatars[selected],
            });

            if (data.data.isSet) {
                user.isAvtarImageSet = true;
                user.AvtarImage = data.data.image;
                localStorage.setItem("chat_app_pro",JSON.stringify(user));
                navigate("/")
            }
           else{
                    toast.error("Failed to set Avatar, Please try agian", toastOptions);
           }
        }
    
    }

    return (
        <>
                   { isLoading ? (<Container>

                        <img src={loader} alt="loader" className="loader" />
                    </Container>
                    ) :(
                        <Container>
                <div className="title-container">
                    <h1>Choose Your Avatar as Profile Picture</h1>
                </div>
                <div className="avatars">
                    {
                        (
                            avatars.map((avatar, index) => (
                                <div
                                key={index}
                                className={`avatar ${selected === index ? "selected" : ""}`}
                                >
                                    <img
                                        src={`data:image/png;base64,${avatar}`} // Corrected image type
                                        alt="avatar"
                                        onClick={() => setSelected(index)} // Corrected state function name
                                    />
                                </div>
                            ))
                        )}
                </div>
                <button className='submit-btn' onClick={handleSubmit}>Set as Profile Pic</button>
            </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
gap : 3rem;
background-color : #131314;
height : 100vh;
// width: 100vh;

.loader{
max-inline-size: 100%;

}
.title-container {
    h1{
    color : white;
    }
}
    .avatars{
    display: flex;
    }
    
    .avatar{
        border: 0.4rem solid transparent;
        padding : 0.4rem;
        border-radius: 5rem;
        display:flex;   
        justify-content: center;
        align-items : center;
        transition : 0.5s, ease-in-out;
    img{
        height: 4rem;
      }
      }
      .submit-btn{

    background-color: rgb(187, 14, 255);
    color:white;
    padding : 1rem 2rem;
    border : none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition: 0.5sec ease-in-out;

    }
    .selected{
       border : 0.35rem solid #8634c9;
    }
`;


export default SetAvatar