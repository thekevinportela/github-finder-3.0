import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Repo } from "../screens/Repo";
import { User } from "../screens/User";
import { Settings } from "../screens/Settings";
import { FavouriteIcon, Icon, SearchIcon, Text, useTheme } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Favorites } from "../screens/Favorites";
import { useFavoritesListener } from "../stores/favoritesStore";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  useFavoritesListener();

  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeTabs"
        component={HomeTabs}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "black" },
        })}
        name="User"
        component={User}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="Repo"
        component={Repo}
      />
    </Stack.Navigator>
  );
};

export default Main;

const HomeTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor:
            Platform.OS === "android" ? "black" : colors.gray[900],
        },
        // tabBarLabelStyle: {paddingTop: },
      }}
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <FavouriteIcon
              size={focused ? "7" : "6"}
              color={focused ? "white" : colors.gray[600]}
            />
          ),
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerShown: true,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray[600],
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              size={focused ? "7" : "6"}
              color={focused ? "white" : colors.gray[600]}
            />
          ),
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray[600],
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name={"ios-settings"}
              size={focused ? "7" : "6"}
              color={focused ? "white" : colors.gray[600]}
            />
          ),
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray[600],
        }}
      />
    </Tab.Navigator>
  );
};
