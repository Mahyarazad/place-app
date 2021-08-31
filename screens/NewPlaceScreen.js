import React from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
	Alert,
} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";
import ImgPicker from "../components/places/ImageSelector";
import LocationPicker from "../components/places/LocationPicker";

const NewPlaceScreen = (props) => {
	const [textValue, setTextValue] = React.useState("");
	const [coords, setCoords] = React.useState(null);
	const [image, setImage] = React.useState(null);
	const dispatch = useDispatch();

	const textChangeHandler = (text) => {
		setTextValue(text);
	};

	const ImageHandler = (image) => {
		setImage(image);
	};

	const locationHandler = React.useCallback((location) => {
		if(location){
			setCoords(location);
		}
	}, [coords]);

	const submitHandler = () => {
		if (textValue && coords) {
			dispatch(addPlace(textValue, image, coords)),
				setTextValue(""),
				setCoords(null),
				props.navigation.navigate("PlaceList");
		} else {
			Alert.alert(
				"Please add the missing information",
				"You must add an image, location name, and the related picture.",
				[{ text: "OK" }]
			);
		}
	};

	React.useEffect(() => {
		locationHandler();
	}, [locationHandler]);

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.screen}>
				<ImageBackground
					style={{ height: "100%", justifyContent: "center" }}
					resizeMode="cover"
					source={{
						uri: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3900&q=80",
					}}
				>
					<View style={{ marginHorizontal: 20 }}>
						<TextInput
							placeholder="Location Name"
							placeholderTextColor="black"
							value={textValue}
							onChangeText={textChangeHandler}
							style={styles.textInput}
						/>
					</View>

					<ImgPicker onImageTaken={ImageHandler} />
					<LocationPicker {...props} onLocationPicked={locationHandler} />
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
		color: "black",
	},
});

export default NewPlaceScreen;
