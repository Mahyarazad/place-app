import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import ENV from "../../env";
import MapboxGL from "@react-native-mapbox-gl/maps";

const MapPreview = (props) => {
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);
	const {location} = props;

	return (
		<View>
			<View style={styles.page}>
				<View style={styles.container}>
					<MapboxGL.MapView
						{...props}
						style={styles.map}
						styleURL={MapboxGL.StyleURL.Street}
						scrollEnabled={true}
						pitchEnabled={true}
						zoomEnabled={true}
						logoEnabled={true}
					>
						<MapboxGL.Camera
							zoomLevel={10}
							centerCoordinate={[location.lat,location.long]}
							animationMode="flyTo"
							animationDuration={1200}
						/>
						<MapboxGL.MarkerView
							coordinate={[location.lat,location.long]}
							anchor={{ x: 0.5, y: 0.5 }}
						>
							<Image
								style={styles.marker}
								source={require('../../content/vippng.com-red-pin-png-1010455.png')}
							/>
						</MapboxGL.MarkerView>
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
	marker: {
		width:315,
		height: 801,
		backgroundColor: "transparent",
		transform:([{scaleX:0.06}, {scaleY: 0.06}])
	},
});

export default MapPreview;
