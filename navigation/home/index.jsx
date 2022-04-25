import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../screens/Home";
import CocktailList from "../../screens/CocktailList";
import CocktailDetail from "../../screens/CocktailDetail";

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CocktailList" component={CocktailList} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetail} />
      </Stack.Navigator>
  );
};

export default HomeNav;
