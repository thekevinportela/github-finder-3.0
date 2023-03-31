import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  CloseIcon,
  HStack,
  Icon,
  Pressable,
  Text,
  ThreeDotsIcon,
} from 'native-base';
import {Linking} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export type IWVHeaderProps = {
  url: string;
};

const WVHeader: React.FC<IWVHeaderProps> = ({url}) => {
  const navigation = useNavigation();

  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'black'}
      w={'100%'}
      h={'7%'}>
      <Pressable onPress={() => navigation.goBack()} zIndex={100}>
        <CloseIcon
          onPress={() => navigation.goBack()}
          color="white"
          ml="4"
          size="6"
        />
      </Pressable>
      <Box alignItems={'center'}>
        <Text fontWeight={'semibold'} color={'white'}>
          GH Finder
        </Text>
        <Text color={'#bbb'}>
          {url.length > 40 ? `${url.slice(8, 38)}...` : url.slice(8)}
        </Text>
      </Box>
      <Pressable onPress={() => Linking.openURL(url)}>
        <Icon
          color={'white'}
          size="6"
          mr="4"
          name="safari"
          as={FontAwesomeIcons}
        />
      </Pressable>
    </HStack>
  );
};

export {WVHeader};
