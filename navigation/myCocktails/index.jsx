import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyCocktails from '../../screens/MyCocktails';
import MyCocktailDetail from "../../screens/MyCocktailDetail";

const Stack = createNativeStackNavigator();

const MyCocktailsNav =  () => {
    return  (
        <Stack.Navigator initialRouteName='MyCocktails'>
            <Stack.Screen name='MyCocktails' component={MyCocktails} />
            <Stack.Screen name="MyCocktailDetail" component={MyCocktailDetail} />
        </Stack.Navigator>
    )
}

export default MyCocktailsNav