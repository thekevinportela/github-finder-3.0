import {Center, HStack, Icon, Text} from 'native-base';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

export type IRepoBadgeProps = {
  iconName: string;
  data: string;
  color: string;
};

const RepoBadge: React.FC<IRepoBadgeProps> = ({iconName, data, color}) => {
  return (
    <HStack
      mr={2}
      justifyContent={'center'}
      alignItems={'center'}
      w={16}
      bg={color}
      borderRadius={'full'}>
      <Icon m={1} color={'gray.800'} name={iconName} as={FontAwesome5Icons} />
      <Text m={1}>{data.toString()}</Text>
    </HStack>
  );
};

export {RepoBadge};
