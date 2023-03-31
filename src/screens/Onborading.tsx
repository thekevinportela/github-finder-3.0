import {
  Button,
  Center,
  ChevronRightIcon,
  Image,
  Switch,
  Text,
} from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import messaging from '@react-native-firebase/messaging';
import useAuthStore from '../stores/auth';

export type IOnboradingProps = {};

const Onborading: React.FC<IOnboradingProps> = ({}) => {
  const {setOnboarding} = useAuthStore();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      setOnboarding(false);
    }
  }

  return (
    <Onboarding
      showDone={false}
      nextLabel={
        <Center p={2}>
          <ChevronRightIcon color="white" size="6" />
        </Center>
      }
      showSkip={false}
      pages={[
        {
          backgroundColor: 'black',
          image: (
            <Image
              h={96}
              resizeMode="cover"
              source={require('../assets/imgs/Github-Finder-logos_white.png')}
              alt={'Github Finder Logo'}
            />
          ),
          title: 'Connect in a Different Way',
          subtitle:
            'Search for your favorite GitHub users and view their repositories like never before',
        },
        {
          backgroundColor: 'black',
          image: (
            <>
              <Image
                h={96}
                resizeMode="cover"
                source={require('../assets/imgs/Notification.png')}
                alt={'Github Finder Logo'}
              />
              <Button
                onPress={() => {
                  requestUserPermission();
                }}
                w={'80%'}
                mb={4}
                borderRadius={'lg'}
                _text={{color: 'black'}}
                color={'black'}
                bg={'#9DD5C0'}>
                Allow
              </Button>
              <Button
                onPress={() => setOnboarding(false)}
                variant={'ghost'}
                borderRadius={'lg'}
                _text={{color: '#9DD5C0'}}
                color={'black'}
                // bg={'#9DD5C0'}
              >
                Not Now
              </Button>
            </>
          ),
          title: 'Please Enable Notifications',
          subtitle:
            'Search for your favorite GitHub users and view their repositories like never before',
        },
      ]}
    />
  );
};

export {Onborading};
