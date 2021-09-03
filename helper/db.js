import * as SQLite from "expo-sqlite";
import moment from "moment";
const db = SQLite.openDatabase("places.db");

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY NOT NULL ,timeStamp TEXT NOT NULL ,title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, long REAL NOT NULL);",
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const insertPlace = (timeStamp, title, imageUri, address, lat, long) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO places(timeStamp, title,imageUri, address, lat, long) VALUES(?,?,?,?,?,?);",

				[timeStamp, title, imageUri, address, lat, long],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const fetchPlace = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM places;",
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const removePlace = (id) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`DELETE FROM places WHERE id=${id};`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const filterPlace = (timeStamp) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places WHERE timeStamp="${moment(timeStamp).format(
					"MM/DD/YY"
				)}";`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
