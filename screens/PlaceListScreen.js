import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import PlaceCard from "../components/places/PlaceCard";

const PlaceListScreen = (props) => {
	const placeData = useSelector((state) => state.places);
	return (
		<View styles={styles.screen}>
			<FlatList
				data={placeData.places}
				renderItem={(itemData) => (				
					<PlaceCard
						image={itemData.item.imageUri}
						title={itemData.item.title}
						address={null}
						onPress={() => {
							props.navigation.navigate("PlaceDetail", {
								place: itemData.item,
							});
						}}
					/>
				)}
			/>
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

export default PlaceListScreen;
