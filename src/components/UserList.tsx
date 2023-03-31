import React from 'react';
import {FlatList, View} from 'react-native';
import {UserItem} from './UserItem';

export type IUserListProps = {
  users: any[];
};

const UserList: React.FC<IUserListProps> = ({users}) => {
  return (
    <FlatList
      pointerEvents="auto"
      scrollEnabled
      data={users}
      renderItem={({item}) => <UserItem user={item} />}
      keyExtractor={item => item.id}
      keyboardDismissMode="interactive"
    />
  );
};

export {UserList};
