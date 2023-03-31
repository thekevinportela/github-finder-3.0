import {Box, Center, Text} from 'native-base';
import React from 'react';
import {RepoItem} from './RepoItem';

export type IRepoListProps = {
  repos: [];
};

const RepoList: React.FC<IRepoListProps> = ({repos}) => {
  return (
    <Box w={'100%'}>
      <Text fontSize={16} pl={6} py={4} color={'white'}>
        Latest Repos
      </Text>
      <Center>
        {repos.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </Center>
    </Box>
  );
};

export {RepoList};
