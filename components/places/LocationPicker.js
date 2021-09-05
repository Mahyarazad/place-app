import React from "react";
import {
	View,
	Text,
	ActivityIndicator,
	Alert,
	StyleSheet,
	PermissionsAndroid,
} from "react-native";
import CustomButton from "../UI/CustomButton";
import MapPreview from "./MapPreview";
import { useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";

const LocationPicker = (props) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [locationData, setLocationData] = React.useState(null);
	const pickedLocation = useSelector((state) => state.places);

	const locationHandler = React.useCallback(async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Please authrozie the location access",
					message: "The app needs your device's location to procced",
					buttonPositive: "OK",
				}
			);

			if (granted === "denied") {
				Alert.alert(
					"Insufficient Permissions!",
					"Please authorize the location access",
					[{ text: "OK" }]
				);
			}

			if (granted) {
				Geolocation.getCurrentPosition((info) => {
					setIsLoading(true);
					const { coords } = info;
					setLocationData({ lat: coords.longitude, long: coords.latitude });
					props.onLocationPicked({
						lat: coords.latitude,
						long: coords.longitude,
					});
					setIsLoading(false);
				});
			}
		} catch (err) {
			console.warn(err.message);
		}
	}, [locationData, isLoading, Geolocation]);
	
	React.useEffect(() => {
		if (typeof pickedLocation.action !== "undefined") {
			const { action } = pickedLocation;
			setLocationData({ lat: +action.coords.long, long: +action.coords.lat });
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
					textStyle={{color:'white'}}
					buttonStyle={styles.button}
					onPress={locationHandler}
				/>
				<CustomButton
					buttonText="Pick on the map"
					textStyle={{color:'white'}}
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
	button: { backgroundColor: "transparent", marginVertical: 5, width: 150 },
	buttonConatiner: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
	},
});

export default LocationPicker;
