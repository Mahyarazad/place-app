import React from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlaceCard from "../components/places/PlaceCard";
import { loadPlaces } from "../store/places-actions";

const PlaceListScreen = (props) => {
	const dispatch = useDispatch();
	const placeData = useSelector((state) => state.places);

	React.useEffect(() => {
		dispatch(loadPlaces());
	}, [dispatch]);

	return (
		<View styles={styles.screen}>
			<FlatList
				data={placeData.placeData}
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
