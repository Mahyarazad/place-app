import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlaceCard from "../components/places/PlaceCard";
import {
	applyFilter,
	loadPlaces,
	removePlace,
} from "../store/place-reducer/places-actions";
import Modal from "react-native-modal";
import CustomButton from "../components/UI/CustomButton";
import FilterModal from "../components/FilterModal";

const PlaceListScreen = (props) => {
	const dispatch = useDispatch();
	const [modalActive, setModalActive] = React.useState(true);
	const [promptUser, setPromptUser] = React.useState(false);
	const [forwardId, setfForwardId] = React.useState(null);
	const { placeData } = useSelector((state) => state.places);
	const { modalStat } = useSelector((state) => state.filter);
	const { filterEnabled } = useSelector((state) => state.filter);

	const loadPlace = React.useCallback(
		(selectedDate) => {
			if (!filterEnabled) {
				dispatch(loadPlaces());
			} else {
				dispatch(applyFilter(selectedDate));
			}
		},
		[dispatch]
	);

	React.useEffect(() => {
		loadPlace();
		if (modalActive) {
			const timer = setTimeout(() => {
				setModalActive(false);
			}, 2000);
	

			return () => {
				clearTimeout(timer);
			};
		}
	}, [loadPlace, modalActive, promptUser,filterEnabled]);

	const handleDelete = (_id) => {
		dispatch(removePlace(_id));
	};

	console.log(placeData)
	return (
		<View styles={styles.screen}>
			<Modal isVisible={promptUser}>
				<View style={styles.deleteContainer}>
					<Text style={styles.modalText}>Want to delete?</Text>
					<View style={styles.buttonContainer}>
						<CustomButton
							buttonStyle={{ backgroundColor: "transparent" }}
							onPress={() => setPromptUser(false)}
							buttonText="No"
						/>
						<CustomButton
							buttonStyle={{ backgroundColor: "transparent" }}
							onPress={() => {
								handleDelete(forwardId), setPromptUser(false);
							}}
							buttonText="Yes"
						/>
					</View>
				</View>
			</Modal>
			<FilterModal isVisible={modalStat} onDatePicked={loadPlace} />
			<Modal isVisible={modalActive} statusBarTranslucent={true}>
				<View style={styles.modal}>
					<Text style={styles.modalText}>Longpress for deletion</Text>
				</View>
			</Modal>
			{typeof placeData === "undefined" ||
			Object.values(placeData).length === 0 ? (
				<View style={styles.emptyScreen}>
					<Text style={{ fontSize: 22, textAlign: "center" }}>
						Press the plus icon on the top right corner to pick a location.
					</Text>
				</View>
			) : (
				<FlatList
					data={placeData}
					keyExtractor={(item) => item._id}
					renderItem={(itemData) => (
						<PlaceCard
							image={itemData.item.imageUri}
							title={itemData.item.title}
							address={itemData.item.address}
							onPress={() => {
								props.navigation.navigate("PlaceDetail", {
									place: itemData.item,
								});
							}}
							onLongPress={() => {
								setPromptUser(true);
								setfForwardId(itemData.item._id);
							}}
						/>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 200,
	},
	modalText: {
		fontSize: 20,
		color: "orange",
	},
	deleteContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 200,
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		paddingVertical: 20,
	},
	button: {
		width: Dimensions.get("screen").width / 5,
		justifyContent: "center",
	},
	emptyScreen: {
		marginTop: Dimensions.get("screen").height / 3,
		marginHorizontal: 20,
	},
});

export default PlaceListScreen;
