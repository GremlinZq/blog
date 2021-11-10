import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { ProfileSettingsForm } from './ProfileSettings';
import { getAuthUser } from '../../../redux/selectors/selectors';

export const ProfileSettingsContainer = () => {
  const {username, email, image} = useSelector(getAuthUser);
  return !username ? <Spin /> : <ProfileSettingsForm username={username} image={image} email={email}  />
}