import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import PlaceNavigation from "./navigation/PlaceNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlaceReducer from "./store/place-reducer/places-reducers";
import FilterReducer from "./store/filter-reducer/filter-reducers";
import AppIntroSlider from "react-native-app-intro-slider";
import IntroScreen from "./screens/IntroScreen";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./helper/db";
import RNBootSplash from "react-native-bootsplash";
import * as FileSystem from "expo-file-system";

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
	filter: FilterReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const checkCachedIntro = async () => {
	let check;
	if (typeof check === "undefined") {
		try {
			check = await FileSystem.readAsStringAsync(
				FileSystem.cacheDirectory + "IntroActive.txt",
				{ encoding: FileSystem.EncodingType.UTF8 }
			);
		} catch (err) {
			try {
				await FileSystem.writeAsStringAsync(
					FileSystem.cacheDirectory + "IntroActive.txt",
					"IntroActive:false",
					{ encoding: FileSystem.EncodingType.UTF8 }
				);
			} catch (err) {
				throw new Error(err.message);
			}
		}
	}
	return check;
};

export default function App() {
	const [IntroScreenState, setIntroScreenState] = React.useState(true);

	const handleBootSplash = React.useCallback(async () => {
		try {
			await RNBootSplash.hide();
		} catch (err) {
			console.log(err.message);
		}
	}, [RNBootSplash]);

	const checkCache = React.useCallback(async () => {
		if (await checkCachedIntro()) {
			setIntroScreenState(false);
		}
	}, [IntroScreenState]);

	const slides = [
		{ key: "one", image: require("./assets/landing-page1.png") },
		{ key: "two", image: require("./assets/landing-page2.png") },
		{ key: "three", image: require("./assets/landing-page3.png") },
	];

	React.useEffect(() => {
		handleBootSplash();
		checkCache();
		StatusBar.setHidden(true);
	}, [handleBootSplash, checkCache]);

	if (IntroScreenState) {
		return (
			<AppIntroSlider
				renderItem={IntroScreen}
				data={slides}
				onDone={() => setIntroScreenState(false)}
			/>
		);
	}
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
