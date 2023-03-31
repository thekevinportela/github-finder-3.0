import {useQuery} from 'react-query';
import {
  getOnboarding,
  getUserAndRepos,
  searchUser,
  setOnboarding,
} from '../lib/api';

// GITHUB

export const useUsers = (search: string) => {
  return useQuery({
    queryKey: `users-${search}`,
    queryFn: () => searchUser(search),
    enabled: false,
  });
};

export const useUserAndRepos = (login: string) => {
  return useQuery({
    queryKey: login,
    queryFn: () => getUserAndRepos(login),
    // enabled: false,
  });
};

// ASYNC STORAGE

export const useSetOnboarding = () =>
  useQuery({
    queryKey: 'setOnBoarding',
    queryFn: setOnboarding,
    enabled: false,
  });

export const useGetOnboarding = () =>
  useQuery({
    queryKey: 'getOnBoarding',
    queryFn: getOnboarding,
    // enabled: false,
  });
