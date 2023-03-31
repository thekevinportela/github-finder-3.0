import {Box, Image, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export type IUserItemProps = {
  user: {login: string; avatar_url: string};
};

const UserItem: React.FC<IUserItemProps> = ({user: {login, avatar_url}}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('User', login)}
      zIndex={100}
      bg={'gray.800'}
      borderRadius={'xl'}
      alignItems={'center'}
      flexDir={'row'}
      w={'90%'}
      py={4}
      alignSelf={'center'}
      mb={5}>
      <Image
        mx={4}
        borderRadius={'full'}
        h={16}
        w={16}
        src={avatar_url}
        alt={`${login}'s avatar`}
      />
      <Text fontSize={20} color={'#f1faee'}>
        {login}
      </Text>
    </Pressable>
  );
};

export {UserItem};
