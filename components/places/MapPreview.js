import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import ENV from "../../env";
import MapboxGL from "@react-native-mapbox-gl/maps";

const MapPreview = (props) => {
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);
	if (props.location) {
		console.log(props.location);
	}
	return (
		<View>
			<View style={styles.page}>
				<View style={styles.container}>
					<MapboxGL.MapView
						style={styles.map}
						styleURL={MapboxGL.StyleURL.Street}
						zoomLevel={10}
						showUserLocation={true}
						userTrackingMode={1}
						centerCoordinate={[props.location.long, props.location.lat]}
						logoEnabled={true}
					>
						<MapboxGL.Camera
							zoomLevel={10}
							centerCoordinate={[props.location.long, props.location.lat]}
							animationMode="flyTo"
							animationDuration={1200}
						/>
					</MapboxGL.MapView>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	container: {
		height: 300,
		width: 400,
		backgroundColor: "tomato",
	},
	map: {
		flex: 1,
	},
});

export default MapPreview;
