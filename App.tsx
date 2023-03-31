// import {SafeAreaView} from 'react-native';
import { NativeBaseProvider, Box, extendTheme } from "native-base";
import { Home } from "./src/screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./src/navigation/Navigation";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <StatusBar barStyle={"light-content"} />
        <Navigation />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
