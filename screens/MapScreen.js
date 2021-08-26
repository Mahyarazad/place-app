import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ENV from "../env";

const MapScreen = (props) => {
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);

	const [marker, setMarker] = React.useState(true);
	const [coords, setCoords] = React.useState({ lat: null, long: null });
	const handleMarker = React.useCallback(
		(location) => {
			if (location) {
				setMarker((prevState) => !prevState);
				const { geometry } = location;
				setCoords({
					lat: geometry.coordinates[0],
					long: geometry.coordinates[1],
				});
				props.navigation.setParams(coords);
			}
		},
		[coords, setMarker]
	);

	React.useEffect(() => {
		handleMarker();
	}, [handleMarker]);

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
				{marker && (
					<MapboxGL.MarkerView
						coordinate={[+coords.lat, +coords.long]}
						anchor={{ x: 0.5, y: 0.5 }}
					>
						<Image
							style={styles.marker}
							source={{
								uri: "https://freepikpsd.com/media/2019/10/drop-pin-png-5-Transparent-Images.png",
							}}
						/>
					</MapboxGL.MarkerView>
				)}
			</MapboxGL.MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	marker: {
		width: Dimensions.get("window").width / 10,
		height: Dimensions.get("window").height / 20,
		backgroundColor: "transparent",
	},
});

export default MapScreen;
