import React from 'react';

const ChatWelcomeMessage = ({ user } = {}) => {
  let { name, avatar, age, gender, country } = user;

  if (country) {
    country = country.replace(/_/g, ' ');
  }

  const handleClick = () => {
    document.getElementById('nav-users-tab').click();
  };

  return (
    <div className="message-welcome d-flex flex-column  align-content-center text-center">
      <h3>Hello!!!</h3>
      <div>
        <img src={avatar} alt="avatar"></img>
      </div>
      <h4 className="font-weight-bold">{`${name}`}</h4>
      <h5>{`You're a ${age} years old ${gender} from ${country}`}</h5>
      <p>Now just find someone to talk!</p>
      <button
        className="btn btn-info btn-lg w-75 mx-auto font-weight-bold"
        onClick={handleClick}
      >
        FIND
      </button>
    </div>
  );
};

export default ChatWelcomeMessage;
