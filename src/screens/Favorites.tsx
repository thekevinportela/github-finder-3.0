import {Box, Center, FlatList, Text} from 'native-base';
import React from 'react';
import {UserItem} from '../components/UserItem';
import {UserList} from '../components/UserList';
import {UserResults} from '../components/UserResults';
import useFavoritesStore from '../stores/favoritesStore';

export type IFavoritesProps = {};

const Favorites: React.FC<IFavoritesProps> = ({}) => {
  const favorites = useFavoritesStore(state => state.favorites);
  console.log(favorites);
  return favorites ? (
    <Box bg={'black'} flex={1} pt="4">
      <UserList users={favorites} />
    </Box>
  ) : (
    <Center flex={1} bg={'black'}>
      <Text color={'white'}>Favorites Go Here</Text>
    </Center>
  );
};

export {Favorites};
