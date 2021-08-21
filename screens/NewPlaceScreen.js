import React from "react";
import { View, StyleSheet, Text } from "react-native";

const NewPlaceScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text> NewPlaceScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
});

export default NewPlaceScreen;
