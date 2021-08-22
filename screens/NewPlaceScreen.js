import React from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";
import ImgPicker from "../components/places/ImageSelector";

const NewPlaceScreen = (props) => {
	const [textValue, setTextValue] = React.useState("");
	const [image, setImage] = React.useState(null)
	const dispatch = useDispatch();

	const textChangeHandler = (text) => {
		setTextValue(text);
	};

	const ImageHandler = (image) => {
		setImage(image);
	}
	const submitHandler = () => {
		dispatch(addPlace(textValue, image)),
			setTextValue(""),
			props.navigation.navigate("PlaceList");
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
				<ImgPicker onImageTaken={ImageHandler}/>
				<CustomButton
					buttonStyle={{ backgroundColor: "orange", marginVertical: 5 }}
					buttonText="Save Place"
					onPress={submitHandler}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.AliceBlue,
		paddingTop: 10,
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
