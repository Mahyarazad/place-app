import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Colors from '../../constants/colors';

const PlaceCard = (props) => {
	return (
		<TouchableOpacity style={styles.card} onPress={props.onPress}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: props.image }} />
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.location}>{props.address}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: 2,
		borderBottomColor: Colors.AliceBlue,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		marginHorizontal: 20,
		marginVertical: 20,
		justifyContent: "flex-start",
		width: 80,
		height: 80,
		borderRadius: 50,
		backgroundColor: "gray",
		borderColor: "orange",
		borderWidth: 1,
		overflow: 'hidden'

	},
    title:{
        fontSize: 20
    }
});

export default PlaceCard;
