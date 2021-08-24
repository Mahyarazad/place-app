import React from "react";
import { View, Image, StyleSheet } from "react-native";
import ENV from "../../env";
import MapboxGL from "@react-native-mapbox-gl/maps";

const MapPreview = (props) => {
    
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);
	if (props.location) {
		console.log(props.location);
	}
	return (
		<View>
			<MapboxGL.MapView style={styles.map} />
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});

export default MapPreview;
