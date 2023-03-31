import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onborading} from '../screens/Onborading';

const Stack = createNativeStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Onboarding"
        component={Onborading}
      />
    </Stack.Navigator>
  );
};

export default Onboarding;
