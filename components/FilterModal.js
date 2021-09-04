import Modal from "react-native-modal";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CustomButton from "./UI/CustomButton";
import { useDispatch } from "react-redux";
import { closeModalFilter } from "../store/filter-reducer/filter-actions";
import { disableFilter } from "../store/filter-reducer/filter-actions";
import CalendarPicker from "react-native-calendar-picker";

const FilterModal = (props) => {
	const dispatch = useDispatch();
	const [date, setDate] = React.useState(null);

	const handleDateChange = (date) => {
		props.onDatePicked(date);
		setDate(date);
	};

	return (
		<View>
			<Modal isVisible={props.isVisible}>
				<View style={styles.canlenderPicker}>
					<CalendarPicker
						selectedDayColor="orange"
						onDateChange={handleDateChange}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<CustomButton
						buttonStyle={{ backgroundColor: "transparent", width: Dimensions.get('window').width/2 }}
						onPress={() => {
							dispatch(closeModalFilter())
							dispatch(disableFilter())
						}}
						buttonText="Cancel / Clear Filter"
						textStyle={{ color: "white", fontSize: 17 }}
					/>
					<CustomButton
						buttonStyle={{ backgroundColor: "transparent", width: Dimensions.get('window').width/2 }}
						onPress={() => {
							dispatch(closeModalFilter())
						}}
						buttonText="Apply Filter"
						textStyle={{ color: "white" }}
					/>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		paddingVertical: 20,
	},
	canlenderPicker: {
		backgroundColor: "#f5f0f0",
		marginVertical: -10,
		marginHorizontal: -10,
		borderRadius: 5,
	},
});

export default FilterModal;
