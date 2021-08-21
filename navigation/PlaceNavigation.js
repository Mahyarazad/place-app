import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailPlaceScreen from "../screens/DetailPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";

import CustomHeaderButton from "../components/UI/CustonHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
const Stack = createNativeStackNavigator();

const PlaceNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="PlaceList">
				<Stack.Screen
					name="PlaceList"
					component={PlaceListScreen}
					options={({ navigation, route }) => ({
						title: "Home",
						headerRight: () => (
							<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
								<Item
									iconName="pluscircle"
									size={24}
									color="orange"
									onPress={() => {navigation.navigate('NewPlace')}}
								/>
							</HeaderButtons>
						),
					})}
				/>
				<Stack.Screen name="MapScreen" component={MapScreen} />
				<Stack.Screen name="NewPlace" component={NewPlaceScreen} />
				<Stack.Screen name="PlaceDetail" component={DetailPlaceScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default PlaceNavigation;
