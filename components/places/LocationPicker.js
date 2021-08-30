import Geolocation from "react-native-geolocation-service";
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
		try {
			await Geolocation.getCurrentPosition(
				(position) => {
					const { coords } = position;
					setIsLoading(true);

					setLocationData({ lat: coords.longitude, long: coords.latitude });
					props.onLocationPicked({
						lat: coords.latitude,
						long: coords.longitude,
					});
					setIsLoading(false);
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
					Alert.alert(error.code, error.message, [{ text: "OK" }]);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		} catch (err) {
			throw new Error("Sag to rohet Madarjende");
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
