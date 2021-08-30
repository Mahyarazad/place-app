import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import PlaceNavigation from "./navigation/PlaceNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlaceReducer from "./store/places-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./helper/db";

init()
	.then(() => {
		console.log("database initialized");
	})
	.catch((err) => {
		console.log("database initialization failed");
		console.log(err);
	});

const rootReducer = combineReducers({
	places: PlaceReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
	React.useEffect(()=>{
		StatusBar.setHidden(true)
	},[])
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
