import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import ENV from "../env";

Logger.setLogCallback((log) => {
	const { message } = log;

	// expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
	if (
		message.match("Request failed due to a permanent error: Canceled") ||
		message.match("Request failed due to a permanent error: Socket Closed")
	) {
		return true;
	}
	return false;
});

const MapScreen = (props) => {
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);
	const [coords, setCoords] = React.useState({ lat: null, long: null });

	const handleMarker = (location) => {
		if (location) {
			const { geometry } = location;
			setCoords({
				lat: geometry.coordinates[0],
				long: geometry.coordinates[1],
			});
			props.navigation.setParams({
				lat: geometry.coordinates[0],
				long: geometry.coordinates[1],
			});
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<MapboxGL.MapView
				style={styles.map}
				styleURL={MapboxGL.StyleURL.Outdoors}
				scrollEnabled={true}
				pitchEnabled={true}
				zoomEnabled={true}
				centerCoordinate={[30, 12]}
				logoEnabled={true}
				onPress={(el) => {
					handleMarker(el);
				}}
			>
				<MapboxGL.Camera
					zoomLevel={8}
					centerCoordinate={[50, 40]}
					animationMode="flyTo"
					animationDuration={1200}
				/>
				<MapboxGL.MarkerView
					coordinate={[+coords.lat, +coords.long]}
					anchor={{ x: 0.5, y: 0.55 }}
				>
					<Image
						style={styles.marker}
						source={require("../content/vippng.com-red-pin-png-1010455.png")}
					/>
				</MapboxGL.MarkerView>
			</MapboxGL.MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	marker: {
		width: 315,
		height: 801,
		backgroundColor: "transparent",
		transform: [{ scaleX: 0.1 }, { scaleY: 0.1 }],
	},
});

export default MapScreen;
