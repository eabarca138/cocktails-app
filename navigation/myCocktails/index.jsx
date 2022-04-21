import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyCocktails from '../../screens/MyCocktails';

const Stack = createNativeStackNavigator();

const MyCocktailsNav =  () => {
    return  (
        <Stack.Navigator initialRouteName='MyCocktails'>
            <Stack.Screen name='MyCocktails' component={MyCocktails} />
        </Stack.Navigator>
    )
}

export default MyCocktailsNav