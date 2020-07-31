import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

class ChatMessage extends React.Component {
  render() {
    const { text, time, user_id, isSeen } = this.props.message;
    const { user, handleMessageSeen, index } = this.props;
    const isSameUser = user.id === user_id;
    const whichSide = isSameUser ? 'right' : 'left';

    return (
      <VisibilitySensor
        onChange={(isVisible) => {
          if (isVisible && !isSeen) {
            handleMessageSeen(index);
          }
        }}
      >
        <div className={`message-${whichSide}`}>
          {text}
          <div className={`message-time-${whichSide}`}>{time}</div>
        </div>
      </VisibilitySensor>
    );
  }
}

export default ChatMessage;
