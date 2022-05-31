import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import FavoritesNav from '../favorites';
import MyCocktailsNav from '../myCocktails';
import HomeNav from '../home';

const BottomTabs = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <BottomTabs.Navigator initialRouteName='HomeTab' 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, 
                tabBarStyle: styles.tabBar,
            }}
            >
            <BottomTabs.Screen name='HomeTab' component={HomeNav}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.item}>
                            <Ionicons name="md-home" size={24} color="black" />
                            <Text>Home</Text>
                        </View>
                    )
                }}
            />
            <BottomTabs.Screen name='FavoritesTab' component={FavoritesNav}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.item}>
                            <Ionicons name="md-star" size={24} color="black" />
                            <Text>Favorites</Text>
                        </View>
                    )
                }}
                />
            <BottomTabs.Screen name='MyCocktailsTab' component={MyCocktailsNav}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.item}>
                            <Fontisto name="cocktail" size={24} color="black" />
                            <Text>My Cocktails</Text>
                        </View>
                    )
                }}
                />
        </BottomTabs.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        shadowColor: '#7f5df0',
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: 0.25,
        elevation: 5,
        position: 'absolute',
        height: 50,
        backgroundColor: '#ccc'
    },
    item: {
        flex: 1,
        width:'100%',
        borderRightWidth: 1,
        borderColor: '#9da3a1',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TabNavigator;