import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  Icon,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';
import useAuthStore from '../stores/auth';

export type IRegisterProps = {};

const Register: React.FC<IRegisterProps> = ({}) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password2: '',
    },
  });
  const pwd = watch('password');

  const [togglePassword, setTogglePassword] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const toast = useToast();

  const signup = useAuthStore(state => state.signup);
  const onSubmit = (data: {email: string; password: string}) => {
    signup(data.email, data.password);
  };

  return (
    <Center flex={1} w="100%" bg={'black'}>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="white" fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="white" fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Please Enter Your Email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please Enter a Valid Email Address',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <FormControl isInvalid={error ? true : false}>
                <FormControl.Label _text={{color: 'white'}}>
                  Email
                </FormControl.Label>
                <Input
                  onBlur={onBlur}
                  color={'white'}
                  value={value}
                  onChangeText={onChange}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Please Enter Your Password',
              minLength: {
                value: 8,
                message: 'Password must be atleast 8 characters long',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <FormControl isInvalid={error ? true : false}>
                <FormControl.Label _text={{color: 'white'}}>
                  Password
                </FormControl.Label>
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  type={togglePassword ? 'text' : 'password'}
                  color={'white'}
                  InputRightElement={
                    <Icon
                      onPress={() => setTogglePassword(!togglePassword)}
                      as={FontAwesome5Icons}
                      name={togglePassword ? 'eye-slash' : 'eye'}
                      mr={3}
                    />
                  }
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            name="password2"
            control={control}
            rules={{
              required: 'Passwords Must Match',
              validate: value => value === pwd || 'Passwords Must Match',
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <FormControl isInvalid={error ? true : false}>
                <FormControl.Label _text={{color: 'white'}}>
                  Confirm Password
                </FormControl.Label>
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  type={togglePassword ? 'text' : 'password'}
                  color={'white'}
                  InputRightElement={
                    <Icon
                      onPress={() => setTogglePassword(!togglePassword)}
                      as={FontAwesome5Icons}
                      name={togglePassword ? 'eye-slash' : 'eye'}
                      mr={3}
                    />
                  }
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
          />

          <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
            Sign up
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="white">
              Already have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.replace('Login')}>
              Sign In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export {Register};
