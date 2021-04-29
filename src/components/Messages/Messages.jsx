import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Messages.css';
import MessagesHeader from '../MessagesHeader/MessagesHeader';
import MessagesInput from '../MessagesInput/MessagesInput';

const Messages = () => {
  
  const [chat, setChat] = useState('');
  const dispatch = useDispatch();
  
  const currentChat = useSelector((store) => store.currentChat);
  const user = useSelector((store) => store.user);
  const allMessages = useSelector((store) => store.messages);
  

  useEffect(() => {
    // dispatch({ type: 'FETCH_USER' });
    // dispatch({type: 'FETCH_LIKES'});
    dispatch({ type: "FETCH_MESSAGES" });
    dispatch({ type: 'FETCH_CURRENT_CHAT'});
    

  }, [dispatch] );
  
  

  const filterMessages = () => {
    console.log('Original messages:', allMessages);

    let filteredArray = allMessages.filter(data => data.user_id === user.id && data.liked_user_id == currentChat[0].liked_user_id || data.user_id === currentChat[0].liked_user_id && data.liked_user_id == user.id);
    
    

    console.log('This is the filtered array:', filteredArray);
    return filteredArray;
  }
  let filteredArray = filterMessages();


  // (person.match === false)
  // ? <div className="buttonWrapper" >
  //     <button onClick={() => updateMatch(person)}>Accept</button>
  //     <button onClick={() => deleteConnection(person.user_id)}>Decline</button>
  //   </div>
  
  // : <div> 
  //     <IconButton onClick={() => handleChat(person)}>
  //       <ChatBubbleIcon className="chatBubble" fontSize="large"></ChatBubbleIcon>
  //     </IconButton>

  return (
    <div>
      <MessagesHeader />
      <div className="messageContainer">
      {filteredArray.map(chat =>  (
        <div className="chatContainer">

          <div className="messageOne">
          

         { (user.id == currentChat[0].user_id) ?
          
                <div className="messageTwo">
                  
                  
                </div>

                    : <div className="message1Image" style={{backgroundImage: `url(https://images.unsplash.com/photo-1600603405959-6d623e92445c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)`}}
                  
                   >
                  </div>}

                <p>{chat.message}</p>
              
          </div>

          
        </div>
        
        ))}
        </div>
    
      <MessagesInput chat={chat} setChat={setChat}/>
    </div>
  )
}

export default Messages
