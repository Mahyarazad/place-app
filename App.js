import React from "react";
import { StyleSheet } from "react-native";
import PlaceNavigation from "./navigation/PlaceNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlaceReducer from "./store/places-reducers";
import { composeWithDevTools } from "redux-devtools-extension";


const rootReducer = combineReducers({
	places: PlaceReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
	return (
		<Provider store={store}>
			<PlaceNavigation />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
