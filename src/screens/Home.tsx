import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {UserResults} from '../components/UserResults';

export type IHomeProps = {};

const Home: React.FC<IHomeProps> = ({}) => {
  const [search, setSearch] = useState('');

  return (
    <Box safeAreaTop flex={1} bg="black">
      <SearchBar setSearch={setSearch} />
      <UserResults search={search} />
    </Box>
  );
};

export {Home};
