import React, { useEffect, useState ,useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

import { io } from 'socket.io-client';
function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  const socket = useRef();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = localStorage.getItem('chat_app_pro');
        if (!userData) {
          navigate("/login");
        } else {
          const parsedUser = JSON.parse(userData); 
          setcurrentUser(parsedUser); // Set the current user
          setisLoaded(true); 
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login"); // Redirect to login if there's an error
      }
    };

    checkUser(); // Call the function to execute the logic
  }, [navigate]); // Add `navigate` to the dependency array if it's not stable
  
    useEffect( ()=>{
      if(currentUser ){
        socket.current = io(host);
        socket.current.emit("add-user",currentUser._id);
      }
    },[currentUser]); 
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser 
           && currentUser.isAvtarImageSet
        ) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);


        } else {
          navigate("/SetAvatar");
        }

      } catch (error) {
        console.error("Error fetching contacts:", error.message);
      }

    };
    if (currentUser) {
      fetchContacts();
    }

  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  }
  return (
    <Container>Chat
      <div className="container">
        <Contacts contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange} />

        {
          isLoaded && currentChat === undefined ?
            <Welcome
            currentUser={currentUser}
            />
            :(

              <ChatContainer 
              currentChat={currentChat} 
              currentUser = {currentUser}
              socket={socket}

              
              />
            )
    }
      </div>
    </Container>
  );

}
const Container = styled.div`

height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;

align-items: center;
background-color:#131324;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  
  @media screen and (min-width:720px) and (max-width:1080px)
  {
    grid-template-columns:35% 65%;
    
    
    }
    
    }
    `;



export default Chat