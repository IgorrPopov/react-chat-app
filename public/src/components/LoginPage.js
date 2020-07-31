import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  componentDidMount() {
    const isStateSent = this.props.location.state !== undefined;
    const user = isStateSent ? this.props.location.state.user : false;

    if (!user) {
      this.props.history.push('/', { user: false });
    }
  }

  render() {
    return (
      <div id="loginPageWrapper">
        <div className="dark-overlay">
          <div className="container">
            <section id="loginPageSection" className="row align-content-center">
              <div className="col-lg-8 col-md-6 text-center font-weight-bold mh-25">
                <img
                  src="/images/chat/chat.svg"
                  alt="chat_bubble_image"
                  className="chat-image"
                />
                <h1 className="display-5 d-none d-sm-block">
                  Free International Chat
                </h1>
                <p className="lead d-none d-lg-block">
                  Try our free chat to talk to millions of people around the
                  world!
                </p>
              </div>
              <div className="login-form-wrapper col-lg-4 col-md-6 mx-auto pt-2">
                <LoginForm history={this.props.history} />
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
