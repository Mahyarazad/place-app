import * as Location from "expo-location";
import React from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import MapPreview from "./MapPreview";
import { useSelector } from "react-redux";

const LocationPicker = (props) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [locationData, setLocationData] = React.useState(null);
	const pickedLocation = useSelector((state) => state.places);

	const locationHandler = React.useCallback(async () => {
		const { status } = await Location.requestForegroundPermissionsAsync({enableHighAccuracy:true, timeout: 500});
		if (status !== "granted") {
			Alert.alert(
				"Permission Denied",
				"Please authorize the location access to continue.",
				[{ text: "OK" }]
			);
			return;
		} else {
			setIsLoading(true);

			const { coords } = await Location.getCurrentPositionAsync({
				timeout: 5000,
			});
			setLocationData({ lat: coords.latitude, long: coords.longitude });
			props.onLocationPicked({
				lat: coords.latitude,
				long: coords.longitude,
			});
			setIsLoading(false);
			return;
		}
	}, [locationData, isLoading]);

	React.useEffect(() => {
		if (typeof pickedLocation.action !== "undefined") {
			const { action } = pickedLocation;
			setLocationData({ lat: +action.coords.lat, long: +action.coords.long });
			props.onLocationPicked(pickedLocation.action.coords);
		}
	}, [pickedLocation]);

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<View style={styles.mapPreview}>
					{isLoading ? (
						<ActivityIndicator size="large" color="orange" />
					) : (
						<View>
							{locationData ? (
								<MapPreview location={locationData} />
							) : (
								<Text> No Location chosen yet! </Text>
							)}
						</View>
					)}
				</View>
			</View>
			<View style={styles.buttonConatiner}>
				<CustomButton
					buttonText="Get Location"
					buttonStyle={styles.button}
					onPress={locationHandler}
				/>
				<CustomButton
					buttonText="Pick on the map"
					buttonStyle={styles.button}
					onPress={() => {
						props.navigation.navigate("MapScreen");
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		marginHorizontal: 20,
	},
	container: {
		flexDirection: "row",
		width: "100%",
		height: 180,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		backgroundColor: "white",
		overflow: "hidden",
	},
	mapPreview: { justifyContent: "center" },
	button: { backgroundColor: "orange", marginVertical: 5, width: 150 },
	buttonConatiner: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
	},
});

export default LocationPicker;
