import { ADD_PLACE, FETCH_PLACE, SET_PLACE_BYUSER } from "./places-actions";
import Place from "../models/place";
const initialState = {
	places: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
			const newPlace = new Place(
				action.placeData.id.toString(),
				action.placeData.title,
				action.placeData.image,
				action.placeData.address,
				+action.placeData.lat,
				+action.placeData.long
			);
			state.placeData.push(newPlace);
			return { ...state };
		case FETCH_PLACE:
			let transformedData = [];

			action.placeData.map((el) => {
				let temp;
				temp = new Place(
					el.id.toString(),
					el.title,
					el.imageUri,
					el.address,
					el.lat,
					el.long
				);
				transformedData.push(temp);
			});
			return { placeData: transformedData };
		case SET_PLACE_BYUSER:
			return { ...state, action };

		default:
			return state;
	}
};
