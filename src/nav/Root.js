import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovementScreen from "../screens/MovementScreen";

const Stack = createNativeStackNavigator();


function MainScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MovementScreen" component={MovementScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
}

export default Root;