
import React from "react";
import { StyleSheet } from "react-native";
import PlaceNavigation from "./navigation/PlaceNavigation";

export default function App() {
	return <PlaceNavigation />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
