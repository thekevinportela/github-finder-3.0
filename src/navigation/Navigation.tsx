import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Loader} from '../components/Loader';
import {useGetOnboarding} from '../hooks/reactQueryHooks';
import useAuthStore from '../stores/auth';
import Auth from './Auth';
import Main from './Main';
import Onboarding from './Onboarding';

const Navigation = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const {isLoggedIn, initializing, isOnboarding} = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    initializing: state.initializing,
    isOnboarding: state.isOnboarding,
  }));

  useEffect(() => {
    useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
  }, []);

  if (!isHydrated) {
    return <Loader />;
  }

  if (initializing) {
    return <Loader />;
  }

  // console.log(isOnboarding);

  return (
    <NavigationContainer>
      {isLoggedIn ? isOnboarding ? <Onboarding /> : <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;
