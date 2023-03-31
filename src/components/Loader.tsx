import {Center, Spinner} from 'native-base';
import {useWindowDimensions} from 'react-native';

export type ILoaderProps = {};

const Loader: React.FC<ILoaderProps> = ({}) => {
  const {height} = useWindowDimensions();

  return (
    <Center bg="black" flex={1}>
      <Spinner
        // top={height * 0.5}
        // position={'absolute'}
        // alignSelf={'center'}
        color={'white'}
        size={'lg'}
      />
    </Center>
  );
};

export {Loader};
