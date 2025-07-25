import React,{useState} from 'react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';


export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [msg,setmsg] = useState("");
 const handleEmojiPickerHideShow = () => {
    setshowEmojiPicker(!showEmojiPicker);
  }

  const sendChat = (event)=> {
   event.preventDefault();
   if(msg.length > 0) {
    handleSendMsg(msg);
    setmsg('');
  }
}
  return (
    

    <Container>

    <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill   onClick={handleEmojiPickerHideShow}/>
            {
              showEmojiPicker && (
              
 
                <Picker
                 theme='dark' 
                 className="custom-emoji-picker" onEmojiClick={(emoji)=>
       setmsg((prevMsg)=> prevMsg + emoji.emoji)}

  style={{
    position: 'absolute',
    top: '-470px',

  }}
 
/>         )}
            
            </div></div>        
            <form className='input-container' onSubmit={(e)=>
              sendChat(e)
            } >
                <input type="text" placeholder='Message' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
                <button type="button" className='submit'
                onClick={sendChat} >
                <IoMdSend/>
                </button>
            </form>
    </Container>
  )
}


const styledPicker = styled(Picker);
const Container = styled.div`

display: grid;
grid-template-columns: 7% 93%;
@media screen and (min-width:720px) and (max-width:1080px)
{
  padding:0 1rem;
  gap:1rem;              
}

align-items : center;
background-color:#080420;
padding : 0 2rem;
padding-bottom: 0.6rem;

.button-container{
    display: flex;
    align-items : center;
    color: white;
    gap : 1rem;
    }
  .emoji {
  position: relative; 
  svg {
    font-size: 1.5rem;
    color: #ffff00c8;
    cursor: pointer;
  }

}
    .input-container{
    width: 100%;
    display: flex;
    border-radius: 2rem;
    align-items : center;
    padding-bottom: 0.3rem;
    gap:2rem;
    background-color: #ffffff34;

    input{
    width: 90%;
    // height: 60%;
    border:none;
    background-color: transparent;
    color:white;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection{
    background-color: #9186f3;}
    }
      &:focus{
      outline: none;}
    }
     .input-container button{
      padding:0.3rem 2rem;
      border-radius:2rem;
      display:flex;
      justify-content:center;
      align-items:center;
      background-color : #9186f3;
      border:none;
              @media screen and (min-width:720px) and (max-width:1080px)
  {
    padding : 0.3rem 1rem;
     svg{
     font-size:1rem;}
    
    }
      svg{
        font-size: 2rem;
        color:white;

      }
    }css

:global(.custom-emoji-picker .epr-body)::-webkit-scrollbar {
  width: 0.2rem;
}

    `;