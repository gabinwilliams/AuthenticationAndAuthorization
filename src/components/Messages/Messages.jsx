import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Messages.css";
import MessagesHeader from "../MessagesHeader/MessagesHeader";
import MessagesInput from "../MessagesInput/MessagesInput";
import MessagesAppBar from "../MessagesAppBar/MessagesAppBar";
import { data } from "autoprefixer";

const Messages = () => {
  const [chat, setChat] = useState("");
  const dispatch = useDispatch();

  const currentChat = useSelector((store) => store.currentChat);
  const user = useSelector((store) => store.user);
  const allMessages = useSelector((store) => store.messages);

  useEffect(() => {
    dispatch({ type: "FETCH_MESSAGES" });
    dispatch({ type: "FETCH_CURRENT_CHAT" });
  }, [dispatch]);

  const filterMessages = () => {
    let filteredArray = allMessages.filter(
      (data) =>
        (data.user_id === user.id &&
          data.liked_user_id == currentChat[0].liked_user_id) ||
        (data.user_id === currentChat[0].liked_user_id &&
          data.liked_user_id == user.id)
    );

    return filteredArray;
  };
  let filteredArray = filterMessages();

  return (
    <div>
      <div className="headerz">
        <MessagesAppBar />
      </div>
      <div className="messageContainer">
        {filteredArray.map((chat) => (
          <div>
            {user.id == chat.user_id ? (
              <div className="messageTwo">
                <p>{chat.message}</p>
              </div>
            ) : (
              <div className="messageOne">
                <div
                  className="message1Image"
                  style={{
                    backgroundImage: `url(${currentChat[0].profile_image})`,
                  }}
                ></div>
                <p>{chat.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input">
        <MessagesInput chat={chat} setChat={setChat} />
      </div>
    </div>
  );
};

export default Messages;
