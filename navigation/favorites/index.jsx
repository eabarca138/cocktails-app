import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Favorites from '../../screens/Favorites';

const Stack = createNativeStackNavigator();

const FavoritesNav =  () => {
    return  (
        <Stack.Navigator initialRouteName='Favorites'>
            <Stack.Screen name='Favorites' component={Favorites} />
        </Stack.Navigator>
    )
}

export default FavoritesNav