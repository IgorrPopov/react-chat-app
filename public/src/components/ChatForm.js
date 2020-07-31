import React from 'react';

const MESSAGE_LENGTH = 500;

class ChatForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      error: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    const input = e.target.value;

    if (!input || typeof input === 'string') {
      if (input.length < MESSAGE_LENGTH) {
        return this.setState({ input, error: '' });
      }

      this.setState({
        error: `The message must be less than ${MESSAGE_LENGTH} characters`,
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    let input = this.state.input;
    input = typeof input === 'string' ? input.trim() : '';

    if (input === '') {
      return this.setState({ error: 'Type something' });
    }

    if (input.length < MESSAGE_LENGTH) {
      this.props.handleMessageSend(input);
      this.setState({ input: '', error: '' });
    }
  }

  render() {
    return (
      <form
        className="input-group position-absolute chat-form"
        onSubmit={this.handleFormSubmit}
      >
        <input
          type="text"
          className="form-control"
          value={this.state.input}
          onChange={this.handleInputChange}
        />
        <div className="input-group-append">
          <button className="btn btn-info char-form-button">SEND</button>
        </div>
        {this.state.error ? (
          <div className="error-message error-message--chat-form">
            {this.state.error}
          </div>
        ) : null}
      </form>
    );
  }
}

export default ChatForm;
