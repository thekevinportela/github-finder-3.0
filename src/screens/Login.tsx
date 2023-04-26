import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  WarningOutlineIcon,
} from "native-base";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAuthStore from "../stores/auth";

export type ILoginProps = {};

const Login: React.FC<ILoginProps> = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [togglePassword, setTogglePassword] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const login = useAuthStore((state) => state.login);
  const onSubmit = (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  return (
    <Center flex={1} w="100%" bg={"black"}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="white">
          Welcome
        </Heading>
        <Heading mt="1" color="white" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please Enter Your Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter a Valid Email Address",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <FormControl isInvalid={error ? true : false}>
                <FormControl.Label _text={{ color: "white" }}>
                  Email
                </FormControl.Label>
                <Input
                  onBlur={onBlur}
                  color={"white"}
                  value={value}
                  onChangeText={onChange}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters long",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <FormControl isInvalid={error ? true : false}>
                <FormControl.Label _text={{ color: "white" }}>
                  Password
                </FormControl.Label>
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  type={togglePassword ? "text" : "password"}
                  color={"white"}
                  InputRightElement={
                    <Icon
                      onPress={() => setTogglePassword(!togglePassword)}
                      as={FontAwesome5Icons}
                      name={togglePassword ? "eye-slash" : "eye"}
                      mr={3}
                    />
                  }
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {error?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} mt="2" colorScheme="indigo">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="white">
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.replace("Register")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export { Login };
