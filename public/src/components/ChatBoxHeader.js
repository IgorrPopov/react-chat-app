import React from 'react';

const ChatBoxHeader = ({ companion } = {}) => {
  const { name, age, gender, avatar, country } = companion;
  return (
    <div className="row p-1 chat-user-wrapper__header chat-user-wrapper__header">
      <div className="col-12 d-flex flex-row justify-content-sm-start font-weight-bold">
        <img src={avatar} alt={avatar} className="avatar-img ml-2" />
        <span className="ml-2 user-name-title align-self-center">
          {name}
          <img
            src={`/images/gender_icons/${gender}.png`}
            alt={gender}
            className="small-gender-img ml-1"
          />
        </span>
        <span className="ml-2 text-muted user-age-and-flag-title align-self-center">
          <span className="user-age-title">{age} years old</span>
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

export default ChatBoxHeader;
