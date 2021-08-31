import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ENV from "../env";
const DetailPlaceScreen = (props) => {
	MapboxGL.setAccessToken(ENV.mapBoxApiKey);
	const { route } = props;
	let locationData = useSelector((state) =>
		state.places.placeData.find((el) => el._id === route.params.place._id)
	);

	return (
		<View style={styles.screen}>
			<Image
				style={styles.image}
				source={{ uri: route.params.place.imageUri }}
			/>

			<View style={styles.mapContainer}>
				<Text selectable style={styles.text}> {route.params.place.address}</Text>
				<MapboxGL.MapView
					style={styles.map}
					styleURL={MapboxGL.StyleURL.Outdoors}
					scrollEnabled={true}
					pitchEnabled={true}
					zoomEnabled={true}
					centerCoordinate={[+locationData.long, +locationData.lat]}
					logoEnabled={true}
				>
					<MapboxGL.Camera
						zoomLevel={8}
						centerCoordinate={[+locationData.long, +locationData.lat]}
						animationMode="flyTo"
						animationDuration={1200}
					/>
					<MapboxGL.MarkerView
						coordinate={[+locationData.long, +locationData.lat]}
						anchor={{ x: 0.5, y: 0.55 }}
					>
						<Image
							style={styles.marker}
							source={require("../content/vippng.com-red-pin-png-1010455.png")}
						/>
					</MapboxGL.MarkerView>
				</MapboxGL.MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		marginVertical: 5,
		marginHorizontal: 10,
		borderRadius: 2,
		borderWidth: 1,
		borderColor: "gray",
		width: "90%",
		height: "46%",
	},
	map: {
		flex: 1,
	},
	text: {
		backgroundColor: "orange",
		textAlign: "center",
		zIndex: 2,
	},
	mapContainer: {
		marginVertical: 5,
		marginHorizontal: 10,
		borderRadius: 2,
		borderColor: "gray",
		width: "90%",
		height: "50%",
		borderWidth: 1,
		overflow: "hidden",
	},
	marker: {
		width: 315,
		height: 801,
		backgroundColor: "transparent",
		transform: [{ scaleX: 0.07 }, { scaleY: 0.07 }],
	},
});

export default DetailPlaceScreen;
