import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const DetailPlaceScreen = (props) => {
	console.log(props)
	const {route} = props;

	return (
		<View style={styles.screen}>
			<Text> {route.params.place.address}</Text>
			<Image style={styles.image} source={{uri: route.params.place.imageUri}}/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image:{
		width: '100%',
		height: 300
	}
});

export default DetailPlaceScreen;
