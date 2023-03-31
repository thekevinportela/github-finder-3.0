import {useQuery} from 'react-query';
import axios from 'axios';
import {GITHUB_TOKEN, GITHUB_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// GITHUB

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `${GITHUB_TOKEN}`,
  },
});

// Get search results
export const searchUser = async (search: string) => {
  const params = new URLSearchParams({
    q: search,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get user and repos
export const getUserAndRepos = async (login: string) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '10',
  });

  const [{data: user}, {data: repos}] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  return {user, repos};
};
