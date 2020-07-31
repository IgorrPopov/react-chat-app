import React from 'react';
import ChatUser from './ChatUser';
import ChatUsersSortingForm from './ChatUsersSortingForm';

class ChatUsersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isMale: true,
      isFemale: true,
      minAge: 1,
      maxAge: 99,
    };

    this.handleUsersFilter = this.handleUsersFilter.bind(this);
  }

  filterUser(user) {
    const { name, isFemale, isMale, minAge, maxAge } = this.state;

    if (
      name !== '' &&
      user.name.toLowerCase().match(name.toLowerCase()) === null
    ) {
      return false;
    }

    if (user.gender === 'male' && !isMale) {
      return false;
    }

    if (user.gender === 'female' && !isFemale) {
      return false;
    }

    if (user.age > maxAge || user.age < minAge) {
      return false;
    }

    return true;
  }

  handleUsersFilter(state) {
    this.setState({ ...state });
  }

  render() {
    return (
      <div className="chat-users-sorting">
        <div className="chat-users-list-wrapper">
          {this.props.users.filter(this.filterUser, this).map((user, index) => {
            return (
              <ChatUser
                key={index}
                user={user}
                handleCompanionChange={this.props.handleCompanionChange}
                userMessages={this.props.messages[user.id] ?? []}
              />
            );
          })}
        </div>
        <ChatUsersSortingForm handleUsersFilter={this.handleUsersFilter} />
      </div>
    );
  }
}

export default ChatUsersList;
