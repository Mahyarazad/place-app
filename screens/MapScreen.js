import React from "react";
import { View, StyleSheet, Text } from "react-native";

const MapScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text> MapScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MapScreen;
