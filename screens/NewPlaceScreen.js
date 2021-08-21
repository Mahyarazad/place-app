import React from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";

const NewPlaceScreen = (props) => {
	const [textValue, setTextValue] = React.useState("");
	const dispatch = useDispatch();

	const textChangeHandler = (text) => {
		setTextValue(text);
	};

	const submitHandler = () => {
		dispatch(addPlace(textValue)),
		setTextValue(''),
		props.navigation.navigate('PlaceList')
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.input}>
				<Text style={styles.title}> New Place </Text>
				<TextInput
					value={textValue}
					onChangeText={textChangeHandler}
					style={styles.textInput}
				/>
				<CustomButton buttonStyle={{backgroundColor: 'orange'}} buttonText="Save Place" onPress={submitHandler} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.AliceBlue,
		paddingTop: 10
	},
	input: {
		marginHorizontal: 30,
	},
	textInput: {
		fontSize: 19,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
		marginVertical: 20,
		width: "100%",
	},
	title: {
		fontSize: 20,
		textAlign: "left",
	},
});

export default NewPlaceScreen;
