import {Box, Modal, Pressable, Text} from 'native-base';
import React from 'react';
// import {Text} from 'react-native-svg';
import {WebView} from 'react-native-webview';
import {WVHeader} from '../components/WVHeader';

export type IRepoProps = {
  route: {params: {html_url: string}};
};

const Repo: React.FC<IRepoProps> = ({route}) => {
  const {html_url} = route.params;

  return (
    <>
      <WVHeader url={html_url} />
      <WebView source={{uri: html_url}} />
    </>
  );
};

export {Repo};
