import React from "react";
import {
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	StyleSheet,
	View,
	Platform,
} from "react-native";

const CustomButton = (props) => {
	if (Platform.OS === "android" && Platform.Version>= 27) {
		return (
			<TouchableNativeFeedback onPress={props.onPress}>
				<View style={{ ...styles.button, ...props.buttonStyle }}>
					<Text style={{ ...styles.text, ...props.textStyle }}>
						{props.buttonText}
					</Text>
				</View>
			</TouchableNativeFeedback>
		);
	} else {
		return (
			<TouchableOpacity onPress={props.onPress}>
				<View style={{ ...styles.button, ...props.buttonStyle }}>
					<Text style={{ ...styles.text, ...props.textStyle }}>
						{props.buttonText}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		width: 100,
		height: 30,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "black",
		fontSize: 18,
	},
});

export default CustomButton;
