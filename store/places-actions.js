import * as FileSystem from "expo-file-system";
import * as dbActions from "../helper/db";
import Place from "../models/place";

export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACE = "FETCH_PLACE";

export const addPlace = (title, image) => {
	return async (dispatch) => {
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
				"dummy address",
				15.1,
				19,
			);
			console.log(dbResult)
			dispatch({
				type: ADD_PLACE,
				placeData: { id: dbResult.insertId.toString(), title: title, image: pathname },
			});
		} catch (err) {
			console.log(err);
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
