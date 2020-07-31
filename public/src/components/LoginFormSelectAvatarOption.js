import React from 'react';

const LoginFormSelectAvatarOption = ({ avatarImg }) => (
  <option
    value={avatarImg}
    data-content={`<img src="${avatarImg}" class="small-avatar-img"/>`}
  />
);

export default LoginFormSelectAvatarOption;
