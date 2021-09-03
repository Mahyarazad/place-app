import React from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
	Alert,
	Text,
	Dimensions
} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/place-reducer/places-actions";
import ImgPicker from "../components/places/ImageSelector";
import LocationPicker from "../components/places/LocationPicker";

const NewPlaceScreen = (props) => {
	const [textValue, setTextValue] = React.useState("");
	const [coords, setCoords] = React.useState(null);
	const [blur, setBlur] = React.useState(false);
	const [image, setImage] = React.useState(null);
	const dispatch = useDispatch();

	const textChangeHandler = (text) => {
		setTextValue(text);
	};

	const ImageHandler = (image) => {
		setImage(image);
	};

	const locationHandler = React.useCallback(
		(location) => {
			if (location) {
				setCoords(location);
			}
		},
		[coords]
	);

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
					style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}
					resizeMode="stretch"
					source={require('../assets/1a1a7976bf5249ef1816a61505cba956.jpg')}
				>
					<View style={styles.inputContainer}>
						<TextInput
							onBlur={() => setBlur(true)}
							placeholder="Location Name"
							placeholderTextColor="black"
							value={textValue}
							onChangeText={textChangeHandler}
							style={styles.textInput}
						/>
						{blur && textValue.length === 0 && (
							<Text style={styles.onBlurText}>
								Location Name field cannot be empty
							</Text>
						)}
					</View>

					<ImgPicker onImageTaken={ImageHandler} />
					<LocationPicker {...props} onLocationPicked={locationHandler} />
					<View style={styles.centerSaveButton}>
						<CustomButton
							buttonStyle={{ backgroundColor: "transparent", marginVertical: 5 }}
							textStyle={{color:'white'}}
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
		width: "100%",
		textAlign: "center",
		color: "black",
	},
	inputContainer: {
		marginHorizontal: 20,
		height: 60,
		marginVertical: 10,
	},
	onBlurText: {
		color: "red",
		textAlign: "center",
		paddingTop: 5,
	},
});

export default NewPlaceScreen;
