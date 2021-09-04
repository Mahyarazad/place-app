import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailPlaceScreen from "../screens/DetailPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { setPlaceByuser } from "../store/place-reducer/places-actions";
import { openModalFilter } from "../store/filter-reducer/filter-actions";
import { enableFilter } from "../store/filter-reducer/filter-actions";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";

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
									iconName="filter"
									size={24}
									color="white"
									onPress={() => {
										dispatch(enableFilter());
										dispatch(openModalFilter());
									}}
								/>
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
				<Stack.Screen
					name="MapScreen"
					component={MapScreen}
					options={({ navigation, route }) => ({
						headerStyle: { backgroundColor: "orange" },
						headerRight: () => (
							<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
								<Item
									iconName="save"
									size={24}
									color="orange"
									onPress={() => {
										if (route.params) {
											const coords = route.params;
											navigation.navigate("NewPlace");
											dispatch(
												setPlaceByuser({ lat: coords.long, long: coords.lat })
											);
										} else {
											Alert.alert(
												"Pick a location",
												"You must pick a location",
												[{ text: "OK" }]
											);
										}
									}}
								/>
							</HeaderButtons>
						),
					})}
				/>
				<Stack.Screen
					name="NewPlace"
					component={NewPlaceScreen}
					options={{
						title: "New Place",
						headerStyle: {
							backgroundColor: "#ff7d59",
						},
					}}
				/>
				<Stack.Screen
					name="PlaceDetail"
					component={DetailPlaceScreen}
					options={({ navigation, route }) => ({
						title: route.params.place.title,
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default PlaceNavigation;
