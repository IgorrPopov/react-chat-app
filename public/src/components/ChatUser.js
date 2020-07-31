import React from 'react';

const ChatUser = (props) => {
  const { name, age, gender, avatar, country } = props.user;
  const { handleCompanionChange, userMessages = [] } = props;

  const handleClick = () => {
    handleCompanionChange(props.user);
    document.getElementById('nav-chat-tab').click();
  };

  return (
    <div className="row p-1 chat-user-wrapper" onClick={handleClick}>
      <div className="col-12 px-0 d-flex flex-row justify-content-sm-start font-weight-bold">
        <img src={avatar} alt={avatar} className="avatar-img ml-2" />
        <span className="ml-2 user-name-title align-self-center">
          {name}
          <img
            src={`/images/gender_icons/${gender}.png`}
            alt={gender}
            className="small-gender-img ml-1"
          />
        </span>
        {userMessages.find((msg) => !msg.isSeen) ? (
          <div className="unseen-messages-indicator">
            {userMessages.reduce(
              (count, msg) => (!msg.isSeen ? ++count : count),
              0
            )}
          </div>
        ) : null}
        <span className="ml-2 text-muted user-age-and-flag-title align-self-center">
          <span className="user-age-title">{age} years old </span>
          <img
            src={`/images/flags/${country}.svg`}
            alt={country}
            className="small-flag-img ml-1"
          />
        </span>
      </div>
    </div>
  );
};

export default ChatUser;
