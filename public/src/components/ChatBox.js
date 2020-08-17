import React from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatForm from './ChatForm';
import ChatBoxHeader from './ChatBoxHeader';

const ChatBox = ({
  user,
  companion,
  messages,
  handleMessageSeen,
  handleMessageSend,
} = {}) => (
  <div className="d-flex flex-column position-relative chat-box-wrapper">
    <ChatBoxHeader companion={companion} />
    {companion.hasLeft ? (
      <div className="user-left-message">
        {`${companion.name} has left the chat`}
      </div>
    ) : (
      <>
        <ChatMessagesList
          user={user}
          messages={messages}
          handleMessageSeen={handleMessageSeen}
        />
        <ChatForm handleMessageSend={handleMessageSend} />
      </>
    )}
  </div>
);

export default ChatBox;

// <div className="d-flex flex-column position-relative chat-box-wrapper">
//   <ChatBoxHeader companion={companion} />
//   {!companion.hasLeft || (
//     <div className="user-left-message">
//       {`${companion.name} has left the chat`}
//     </div>
//   )}
//   {!companion.hasLeft === undefined || (
//     <>
//       <ChatMessagesList
//         user={user}
//         messages={messages}
//         handleMessageSeen={handleMessageSeen}
//       />
//       <ChatForm handleMessageSend={handleMessageSend} />
//     </>
//   )}
// </div>
