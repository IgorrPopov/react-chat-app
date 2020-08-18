import React from 'react';
import io from 'socket.io-client';
import ChatUsersList from './ChatUsersList';
import ChatBox from './ChatBox';
import ChatWelcomeMessage from './ChatWelcomeMessage';

class ChatPage extends React.Component {
  constructor(props) {
    super(props);

    // let messages = {};

    // console.log(
    //   'localStorage.getItem("messages"): ',
    //   localStorage.getItem('messages')
    // );
    // console.log(
    //   'typeof localStorage.getItem("messages")',
    //   typeof localStorage.getItem('messages')
    // );

    // if (
    //   localStorage.getItem('messages') !== null &&
    //   localStorage.getItem('messages') !== 'null'
    // ) {
    //   console.log('if');
    //   messages = JSON.parse(localStorage.getItem('messages'));
    // }

    this.state = {
      user: false,
      companion: false,
      socket: false,
      users: [],
      // messages,
      messages: {},
    };

    this.handleCompanionChange = this.handleCompanionChange.bind(this);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageSeen = this.handleMessageSeen.bind(this);
  }

  // async checkIfUserWasDisconnect(user) {
  //   try {
  //     const response = await fetch('/check-user', {
  //       method: 'post',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(user),
  //     });

  //     if (response.status !== 200) {
  //       this.props.history.push('/', { user: false });
  //     }
  //   } catch (error) {
  //     console.log('Server error occured');
  //   }
  // }

  componentDidMount() {
    // console.log('process.env.CHAT_APP_URL: ', process.env.NODE_ENV);

    // const isStateSent = this.props.location.state !== undefined;
    // const user = isStateSent ? this.props.location.state.user : false;

    // const user = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
      this.props.history.push('/', { user: false });
    } else {
      // this.checkIfUserWasDisconnect(user);

      // window.onpopstate = () => {
      //   // disconnect if the back button was pressed
      //   if (this.state.socket) {
      //     this.state.socket.disconnect();
      //   }
      //   this.props.history.push('/', { user: false });
      // };

      this.setState(
        {
          user,
          // socket: io(
          //   process.env.NODE_ENV === 'development'
          //     ? 'http://localhost:5000'
          //     : ''
          // ),
          socket: io(),
        },
        () => {
          const socket = this.state.socket;

          socket.emit('join', this.state.user);
          socket.emit('load_connected_users', this.state.user.id);

          socket.on('reconnect', () => {
            console.log('socket.on("reconnect"');
            socket.emit('join', this.state.user);
            socket.emit('load_connected_users', this.state.user.id);
          });

          socket.on('logout', () => {
            sessionStorage.removeItem('user');
            this.props.history.push('/');
          });

          socket.on('load_connected_users', (connectedUsers) => {
            this.setState({
              users: [...this.state.users, ...connectedUsers],
            });
          });

          socket.on('new_user_connected', (newUser) => {
            const users = this.state.users;
            const index = users.findIndex((user) => user.id === newUser.id);

            if (index !== -1) {
              const replacer = (key, value) =>
                key === 'socket_id' ? undefined : value;

              const ifSameUser =
                JSON.stringify(newUser, replacer) ===
                JSON.stringify(users[index], replacer);

              // console.log('ifSameUser: ', ifSameUser);
              // console.log(
              //   ' JSON.stringify(newUser): ',
              //   JSON.stringify(newUser)
              // );
              // console.log(
              //   'JSON.stringify(users[index]): ',
              //   JSON.stringify(users[index])
              // );

              const companion = this.state.companion || {};

              if (!ifSameUser) {
                const messages = this.state.messages;
                delete messages[newUser.id];
                companion.hasLeft = true;
                this.setState({ messages, companion });
              } else {
                companion.hasLeft = false;
                this.setState({ companion });
              }

              users[index] = newUser;
            }

            if (index === -1) {
              users.push(newUser);
            }

            // console.log('users: ', users);

            this.setState({ users });
          });

          socket.on('user_disconnected', (user_id) => {
            console.log('user_id: ', user_id);
            console.log('this.state.user.id: ', this.state.user.id);

            if (user_id === this.state.user.id) {
              console.log('return;');
              return;
            }

            const users = this.state.users.filter(
              (user) => user.id !== user_id
            );

            const messages = this.state.messages;
            delete messages[user_id];

            const companion = this.state.companion;

            if (
              companion &&
              companion.id !== this.state.user &&
              companion.id === user_id
            ) {
              companion.hasLeft = true;
            }

            this.setState({ users, messages, companion });
          });

          socket.on('message', ({ companion_id, text } = {}) => {
            const message = {
              user_id: companion_id,
              text,
              time: new Date().toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
              }),
              isSeen: false,
            };

            const companionMessagesArray =
              this.state.messages[companion_id] || [];
            companionMessagesArray.push(message);

            this.setState({
              messages: {
                ...this.state.messages,
                [companion_id]: companionMessagesArray,
              },
            });
          });
        }
      );
    }
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  //   localStorage.setItem('messages', JSON.stringify(this.state.messages));
  // }

  handleCompanionChange(newCompanion) {
    if (this.state.companion.id !== newCompanion.id) {
      this.setState({
        companion: newCompanion,
      });
    }
  }

  handleMessageSend(text) {
    const message = {
      user_id: this.state.user.id,
      companion_id: this.state.companion.id,
      text,
    };

    this.state.socket.emit('message', message);

    this.addMessage(text);
  }

  addMessage(text) {
    const message = {
      isSeen: false,
      user_id: this.state.user.id,
      text,
      time: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }),
    };

    const companionMessages =
      this.state.messages[this.state.companion.id] || [];
    companionMessages.push(message);

    this.setState({
      messages: {
        ...this.state.messages,
        [this.state.companion.id]: companionMessages,
      },
    });
  }

  handleMessageSeen(message_index) {
    const companionMessages =
      this.state.messages[this.state.companion.id] || [];
    const arrLength = companionMessages.length;

    if (arrLength > 0 && message_index >= 0 && message_index + 1 <= arrLength) {
      companionMessages[message_index].isSeen = true;

      this.setState({
        messages: {
          ...this.state.messages,
          [this.state.companion.id]: companionMessages,
        },
      });
    }
  }

  render() {
    return (
      <div id="chatPageWrapper">
        <div className="dark-overlay">
          <div className="container mt-3 w-100">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  className="nav-item nav-link"
                  id="nav-history-tab"
                  data-toggle="tab"
                  href="#nav-history"
                  role="tab"
                  aria-controls="nav-history"
                  aria-selected="true"
                >
                  History
                </a>
                <a
                  className="nav-item nav-link active"
                  id="nav-chat-tab"
                  data-toggle="tab"
                  href="#nav-chat"
                  role="tab"
                  aria-controls="nav-chat"
                  aria-selected="false"
                >
                  Chat
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-users-tab"
                  data-toggle="tab"
                  href="#nav-users"
                  role="tab"
                  aria-controls="nav-users"
                  aria-selected="false"
                >
                  Users
                </a>
              </div>
            </nav>

            <div className="tab-content w-100" id="nav-tabContent">
              <div
                className="tab-pane fade  w-100"
                id="nav-history"
                role="tabpanel"
                aria-labelledby="nav-history-tab"
              >
                <ChatUsersList
                  users={this.state.users.filter(
                    (user) => this.state.messages[user.id] !== undefined
                  )}
                  handleCompanionChange={this.handleCompanionChange}
                  messages={this.state.messages}
                />
              </div>
              <div
                className="tab-pane fade show active"
                id="nav-chat"
                role="tabpanel"
                aria-labelledby="nav-chat-tab"
              >
                {this.state.companion ? (
                  <ChatBox
                    companion={this.state.companion}
                    user={this.state.user}
                    handleMessageSend={this.handleMessageSend}
                    handleMessageSeen={this.handleMessageSeen}
                    messages={this.state.messages[this.state.companion.id]}
                  />
                ) : (
                  <ChatWelcomeMessage user={this.state.user} />
                )}
              </div>
              <div
                className="tab-pane fade"
                id="nav-users"
                role="tabpanel"
                aria-labelledby="nav-users-tab"
              >
                <ChatUsersList
                  users={this.state.users}
                  handleCompanionChange={this.handleCompanionChange}
                  messages={this.state.messages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;
