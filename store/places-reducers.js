import { ADD_PLACE } from "./places-actions";
import Place from '../models/place';
const initialState = {
	places: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
            const newPlace = new Place( new Date().toString (), action.placeData.title)
			state.places.push(newPlace);
			return { ...state };

		default:
			return state;
	}
};
