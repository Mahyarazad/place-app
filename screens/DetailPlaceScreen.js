import React from "react";
import { View, StyleSheet, Text } from "react-native";

const DetailPlaceScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text> Detail Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
});

export default DetailPlaceScreen;
