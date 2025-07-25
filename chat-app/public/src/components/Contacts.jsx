import React,{useState, useEffect} from 'react'
import styled from 'styled-components';
import Logo from "../assets/logo5.svg";
export default function Contacts({contacts,currentUser,changeChat}) {
  
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
 const [selectedcurrentUser, setSelectedCurrentUser] = useState(undefined);
 
  useEffect(() => {

    if(currentUser)
    {
      setCurrentUserImage(currentUser.AvtarImage);
      setCurrentUsername(currentUser.username);
    } 
    
  },[currentUser])   
  
  const changeCurrentChat = (index, contacts) =>{
    setSelectedCurrentUser(index);
    changeChat(contacts);
    }
  // console.log(contacts);
  return (
    <>
  {
    currentUsername && currentUserImage &&(
      <Container>
        
        <div className="brand">
          <img src={Logo} alt="logo"  />
          <h3>FlutterFly</h3>

        
        </div>

        <div className="contacts">
          {contacts.map((contact, index) => {
            return(
   
              
              
              <div className={`contact
                ${index === selectedcurrentUser ?"selected": ""}`} key={index}
                onClick={()=>changeCurrentChat(index, contact)}
                >

                <div className="avatar">
                  <img src={`data:image/png;base64,${contact.AvtarImage}`} // Corrected image type
                                        alt="avatar" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
                </div>
                )
            
          })
          }



        </div>


        <div className="current-user">
        <div className="avatar">

                  <img src={`data:image/png;base64,${currentUserImage}`} // Corrected image type
                                        alt="avatar" />
                </div>
                <div className="username">
                  <h2>{currentUsername}</h2>
                </div>

        </div>
      </Container>
    )
  }
  
  </>
  )
}

const Container =  styled.div `
display: grid;
grid-template-rows : 10% 75% 15%;
overflow-hidden;
background-color: 080420;

.brand{
 display: flex;
 align-items: center;
 justify-content : center;
 gap: 1rem;
  img{
    height: 3.5rem;
  }
 h3{
  color: white;
  text-transform: uppercase;
  }
}
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap : 0.8rem;
    &::-webkit-scrollbar{
    width: 0.2rem;
    &-thumb{
    background-color: #ffffff39;
    width:0.1rem;
    border-radius: 1rem;
    }
    }
    }
    .contact{
      display:flex;
      background-color:#ffffff39;
      align-items:center;
      min-height : 5rem;
      width : 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      transition: 0.5s ease-in-out;
      }
      .selected{
        background-color: rebeccapurple;
      }   
      .avatar{ 
        img{
          height: 3rem;
          }
          }    
          .username{
            h3{
              color:white;
              }
              }
          .current-user{
            backgronud-color: #0d0d30 ;
            display : flex;
            justify-content:center;
            gap: 2rem;
            
            .avatar {
              img{
              height: 3rem;
              max-inline-size: 100%;
              }
          }    
            .username{
            h2{
            color:white;
            }
            }     
      }

      
  @media screen and (min-width:720px) and (max-width:1080px)
{
  gap:0.5rem;
  .username{
    h3{
      font-size: 1rem;

    }
  }

}

}
            `;