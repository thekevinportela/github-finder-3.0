import {useNavigation} from '@react-navigation/native';
import {Box, HStack, Icon, Pressable, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import {RepoBadge} from './RepoBadge';

export type IRepoItemProps = {
  repo: {
    name: string;
    description: string;
    html_url: string;
    forks: string;
    open_issues: string;
    watchers_count: string;
    stargazers_count: string;
  };
};

const RepoItem: React.FC<IRepoItemProps> = ({repo}) => {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo;

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Repo', {html_url})}
      borderRadius={'xl'}
      w={'90%'}
      bg={'gray.800'}
      padding={4}
      mb={2}>
      <Text fontSize={16} color={'white'}>
        {name}
      </Text>
      <Text mb={2} color={'white'}>
        {description}
      </Text>
      <HStack>
        <RepoBadge iconName="eye" color="#3ABEF8" data={watchers_count} />
        <RepoBadge
          iconName="star-half-alt"
          color="#FBBC23"
          data={stargazers_count}
        />
        <RepoBadge iconName="exclamation" color="#F77272" data={open_issues} />
        <RepoBadge iconName="code-branch" color="#37D399" data={forks} />
      </HStack>
    </Pressable>
  );
};

export {RepoItem};
