import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailPlaceScreen from "../screens/DetailPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";


const Stack = createNativeStackNavigator();

const PlaceNavigation = () => {
	return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name='place-list'
                component={PlaceListScreen}
            />
                        <Stack.Screen 
                name='map-screen'
                component={MapScreen}
            />
                        <Stack.Screen 
                name='new-place'
                component={NewPlaceScreen}
            />
                        <Stack.Screen 
                name='place-detail'
                component={DetailPlaceScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>;
};

export default PlaceNavigation;
