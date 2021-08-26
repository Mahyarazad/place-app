import { ADD_PLACE, FETCH_PLACE } from "./places-actions";
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
				action.placeData.image
			);
			state.places.push(newPlace);
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
		default:
			return state;
	}
};
