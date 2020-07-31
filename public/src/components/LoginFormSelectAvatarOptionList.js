import React from 'react';
import LoginFormSelectAvatarOption from './LoginFormSelectAvatarOption';

const LoginFormSelectAvatarOptionList = ({ avatarsList, avatar, onChange }) => {
  return (
    <select
      className="avatar-selectpicker selectpicker form-control"
      value={avatar}
      onChange={onChange}
      data-size="5"
      data-width="30%"
    >
      {avatarsList.map((avatarImg, index) => {
        return (
          <LoginFormSelectAvatarOption key={index} avatarImg={avatarImg} />
        );
      })}
    </select>
  );
};

export default LoginFormSelectAvatarOptionList;
