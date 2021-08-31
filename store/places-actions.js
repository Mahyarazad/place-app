import * as FileSystem from "expo-file-system";
import * as dbActions from "../helper/db";

import ENV from "../env";
export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACE = "FETCH_PLACE";
export const SET_PLACE_BYUSER = "SET_PLACE_BYUSER";

export const addPlace = (title, image, coords) => {
	return async (dispatch) => {
		if (image === null) {
			const response = await fetch(
				`https://eu1.locationiq.com/v1/reverse.php?key=${ENV.locationIQToken}&lat=${coords.lat}&lon=${coords.long}&format=json`
			);
			const reverseGeo = await response.json();
			const dbResult = await dbActions.insertPlace(
				title,
				"NA",
				reverseGeo.display_name,
				coords.lat,
				coords.long
			);
			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId.toString(),
					title: title,
					image: "NA",
					address: reverseGeo.display_name,
					lat: coords.lat,
					long: coords.long,
				},
			});
		} else {
			const response = await fetch(
				`https://eu1.locationiq.com/v1/reverse.php?key=${ENV.locationIQToken}&lat=${coords.lat}&lon=${coords.long}&format=json`
			);
			const reverseGeo = await response.json();
			const filename = image.split("/").pop();
			const pathname = FileSystem.documentDirectory + filename;
			try {
				await FileSystem.moveAsync({
					from: image,
					to: pathname,
				});
				const dbResult = await dbActions.insertPlace(
					title,
					pathname,
					reverseGeo.display_name,
					coords.lat,
					coords.long
				);
				dispatch({
					type: ADD_PLACE,
					placeData: {
						id: dbResult.insertId.toString(),
						title: title,
						image: pathname,
						address: reverseGeo.display_name,
						lat: coords.lat,
						long: coords.long,
					},
				});
			} catch (err) {
				console.log(err);
			}
		}
	};
};

export const loadPlaces = () => {
	return async (dispatch) => {
		try {
			const dbResult = await dbActions.fetchPlace();
			dispatch({ type: FETCH_PLACE, placeData: dbResult.rows._array });
		} catch (err) {
			console.log(err);
		}
	};
};

export const setPlaceByuser = (coords) => {
	return { type: SET_PLACE_BYUSER, coords: coords };
};
