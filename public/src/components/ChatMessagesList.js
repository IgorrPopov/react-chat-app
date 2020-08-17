import React from 'react';
import $ from 'jquery';
import ChatMessage from './ChatMessage';

class ChatMessagesList extends React.Component {
  componentDidUpdate() {
    const $chatMessagesWrapper = $('.chat-messages-wrapper');

    if ($chatMessagesWrapper !== undefined && $chatMessagesWrapper.length > 0) {
      $chatMessagesWrapper.scrollTop($chatMessagesWrapper[0].scrollHeight);
    }
  }

  render() {
    return (
      <div className="p-3 chat-messages-wrapper">
        {(this.props.messages || []).map((message, index) => (
          <ChatMessage
            user={this.props.user}
            handleMessageSeen={this.props.handleMessageSeen}
            key={index}
            index={index}
            message={message}
          />
        )) || null}
      </div>
    );
  }
}

export default ChatMessagesList;
