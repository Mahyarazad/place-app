class Place {
	constructor(id, timeStamp,title, imageUri, address, lat, long) {
		(this._id = id),
		(this.timeStamp = timeStamp),
			(this.title = title),
			(this.imageUri = imageUri),
			(this.address = address),
			(this.lat = lat),
			(this.long = long);
	}
}

export default Place;
