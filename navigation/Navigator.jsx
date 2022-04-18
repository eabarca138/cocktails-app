import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Categories from "../screens/Categories/Categories";
import CocktailList from "../screens/CocktailList/CocktailList";
import CocktailDetail from "../screens/CocktailDetail/CocktailDetail";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CocktailList">
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CocktailList" component={CocktailList} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
