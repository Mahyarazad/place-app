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
		<View>
			<View style={styles.container}>
				{image ? <></> : <Text style={styles.text}>No Image Selected.</Text>}
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: "100%", height: 200 }}
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
	container: {
		flexDirection: "row",
		flex: 1,
		height: 200,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
	},
	text: {
		textAlign: "center",
		alignItems: "center",
	},
});

export default ImgPicker;
