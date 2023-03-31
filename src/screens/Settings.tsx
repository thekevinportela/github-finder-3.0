import {Box, Button, Center} from 'native-base';
import React from 'react';
import useAuthStore from '../stores/auth';
export type ISettingsProps = {};

const Settings: React.FC<ISettingsProps> = ({}) => {
  const logout = useAuthStore(state => state.logout);
  return (
    <Center bg={'black'} flex={1}>
      <Button onPress={() => logout()}>LOGOUT</Button>
    </Center>
  );
};

export {Settings};
