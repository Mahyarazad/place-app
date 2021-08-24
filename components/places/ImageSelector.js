import React from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import CustomButton from "../UI/CustomButton";
import * as ImagePicker from "expo-image-picker";

const ImgPicker = (props) => {
	const [image, setImage] = React.useState(null);

	const takeImageHandler = async () => {
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		if (result) {
			setImage(result.uri);
			props.onImageTaken(result.uri);
		}
	};

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				{image ? (
					<></>
				) : (
					<View style={{ justifyContent: "center" }}>
						<Text>No Image Selected.</Text>
					</View>
				)}
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: "100%", height: 180 }}
					/>
				)}
			</View>

			<CustomButton
				buttonText="Take Image"
				onPress={takeImageHandler}
				buttonStyle={{ backgroundColor: "orange", marginVertical: 5 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		marginHorizontal: 20,
	},
	container: {
		flexDirection: "row",
		height: 180,
		width: "100%",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		backgroundColor: 'white',
        overflow: 'hidden'
	},
});

export default ImgPicker;
