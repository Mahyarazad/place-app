import React from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";
import ImgPicker from "../components/places/ImageSelector";
import LocationPicker from "../components/places/LocationPicker";

const NewPlaceScreen = (props) => {
	const [textValue, setTextValue] = React.useState("");
	const [image, setImage] = React.useState(null);
	const dispatch = useDispatch();

	const textChangeHandler = (text) => {
		setTextValue(text);
	};

	const ImageHandler = (image) => {
		setImage(image);
	};
	const submitHandler = () => {
		dispatch(addPlace(textValue, image)),
			setTextValue(""),
			props.navigation.navigate("PlaceList");
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.screen}>
				<ImageBackground
					style={{ height: "100%", justifyContent: "center" }}
					resizeMode="cover"
					source={{
						uri: "https://previews.123rf.com/images/kundra/kundra1106/kundra110600021/9923374-funky-seamless-pattern.jpg",
					}}
				>
					<View style={{ marginHorizontal: 20 }}>
						<TextInput
							placeholder="Location Name"
							placeholderTextColor="#FFF" 
							value={textValue}
							onChangeText={textChangeHandler}
							style={styles.textInput}
						/>
					</View>

					<ImgPicker onImageTaken={ImageHandler} />
					<LocationPicker />
					<View style={styles.centerSaveButton}>
						<CustomButton
							buttonStyle={{ backgroundColor: "orange", marginVertical: 5 }}
							buttonText="Save Place"
							onPress={submitHandler}
						/>
					</View>
				</ImageBackground>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	centerSaveButton: {
		alignItems: "center",
	},
	textInput: {
		fontSize: 19,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
		marginVertical: 20,
		width: "100%",
		textAlign: "center",
		color: 'white'
	},
});

export default NewPlaceScreen;
