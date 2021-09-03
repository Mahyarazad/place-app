import * as FileSystem from "expo-file-system";
import * as dbActions from "../../helper/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACE = "FETCH_PLACE";
export const SET_PLACE_BYUSER = "SET_PLACE_BYUSER";
export const REMOVE_PLACE = "REMOVE_PLACE";
export const APPLY_FILTER = "APPLY_FILTER";
export const EMPTY_FILTER = "EMPTY_FILTER";

export const addPlace = (title, image, coords) => {
	return async (dispatch) => {
		const timeStamp = new Date().toLocaleDateString();
		if (image === null) {
			const response = await fetch(
				`https://eu1.locationiq.com/v1/reverse.php?key=${ENV.locationIQToken}&lat=${coords.lat}&lon=${coords.long}&format=json`
			);
			const reverseGeo = await response.json();
			try {
				const dbResult = await dbActions.insertPlace(
					timeStamp,
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
						timeStamp: timeStamp,
						title: title,
						image: "NA",
						address: reverseGeo.display_name,
						lat: coords.lat,
						long: coords.long,
					},
				});
			} catch (err) {
				console.log(err);
			}
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
					timeStamp,
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
						timeStamp: timeStamp,
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

export const removePlace = (id) => {
	return async (dispatch) => {
		try {
			const dbResult = await dbActions.removePlace(id);
		} catch (err) {
			console.warn(err.message);
		}
		dispatch({ type: REMOVE_PLACE });
	};
};

export const applyFilter = (timeStamp) => {
	return async (dispatch) => {
		try {
			const dbResult = await dbActions.filterPlace(timeStamp);
			const { rows } = await dbResult;
			if (rows.length !== 0) {
				dispatch({ type: APPLY_FILTER, placeData: dbResult.rows._array });
				
			} else {
				dispatch({ type: EMPTY_FILTER });
			}
		} catch (err) {
			console.warn(err.message);
		}
	};
};
