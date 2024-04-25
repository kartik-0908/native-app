import ChatPage from "./screen/ChatPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import { Provider } from "react-native-paper";
import LoginPage from "./screen/LoginPage";
import Register from "./screen/Register";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import ResetPassword from "./screen/ResetPassword";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
