import { ADD_PLACE, FETCH_PLACE } from "./places-actions";
import Place from "../models/place";
const initialState = {
	places: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
			const newPlace = new Place(
				action.placeData.id,
				action.placeData.title,
				action.placeData.image
			);
			state.places.push(newPlace);
			return { ...state };
		case FETCH_PLACE:
			const transofrmedData = action.placeData.map((el) => {
				new Place(el.id.toString, el.title, el.address, el.lat, el.long);
			});
			return { ...action };
		default:
			return state;
	}
};
