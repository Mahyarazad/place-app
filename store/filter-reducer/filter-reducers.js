import {
	OPEN_MODAL_FILTER,
	CLOSE_MODAL_FILTER,
	ENABLE_FILTER,
	DISABLE_FILTER,
} from "./filter-actions";

const initialState = {
	modalStat: false,
	filterEnabled: false,
};

export default (state = initialState, action) => {
	console.log(state)
	switch (action.type) {
		case OPEN_MODAL_FILTER:
			return { ...state, modalStat: true };
		case CLOSE_MODAL_FILTER:
			return { ...state, modalStat: false };
		case ENABLE_FILTER:
			return {...state, filterEnabled: true};
		case DISABLE_FILTER:
			return {...state, filterEnabled: false};
		default:
			return state;
	}
};
