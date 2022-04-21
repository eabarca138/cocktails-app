import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Categories from "../../screens/Categories";
import CocktailList from "../../screens/CocktailList";
import CocktailDetail from "../../screens/CocktailDetail";

const Stack = createNativeStackNavigator();

const CocktailsNav = () => {
  return (
      <Stack.Navigator initialRouteName="CocktailList">
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CocktailList" component={CocktailList} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetail} />
      </Stack.Navigator>
  );
};

export default CocktailsNav;
