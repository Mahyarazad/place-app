import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailPlaceScreen from "../screens/DetailPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setPlaceByuser } from "../store/places-actions";
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const PlaceNavigation = () => {
	const dispatch = useDispatch();
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="PlaceList">
				<Stack.Screen
					name="PlaceList"
					component={PlaceListScreen}
					options={({ navigation, route }) => ({
						title: "Home",
						headerStyle: {
							backgroundColor: "orange",
						},
						headerRight: () => (
							<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
								<Item
									iconName="pluscircle"
									size={24}
									color="white"
									onPress={() => {
										navigation.navigate("NewPlace");
									}}
								/>
							</HeaderButtons>
						),
					})}
				/>
				<Stack.Screen name="MapScreen" component={MapScreen} options={({navigation, route}) => ({
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
						<Item
							iconName="save"
							size={24}
							color="orange"
							onPress={() => {
								navigation.navigate('NewPlace');
								dispatch(setPlaceByuser(route.params))
							}}
						/>
					</HeaderButtons>
					)
				})}/>
				<Stack.Screen name="NewPlace" component={NewPlaceScreen} />
				<Stack.Screen
					name="PlaceDetail"
					component={DetailPlaceScreen}
					options={({ navigation, route }) => (
						{
						title: route.params.place.title
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default PlaceNavigation;
