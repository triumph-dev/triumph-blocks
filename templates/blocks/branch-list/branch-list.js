export default class BranchList {
	constructor(list, listFilter) {
		this.list = list;
		this.listFilter = listFilter;
		this.init();
	}
	init() {
		document.forms['branch-list-controls'].addEventListener('submit', (e) => {
			e.preventDefault();
			let zip = document.querySelector('[name="branch-zip-search"]').value;
			this.reorderByZip(zip);
			console.log(e);
		});
	}

	reorderByZip(zip) {
		this.list.show(1, 10000);
		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=' + googleMapsApiKey)
			.then((response) => response.json())
			.then((data) => {
				var zipLat = data.results[0].geometry.location.lat;
				var zipLng = data.results[0].geometry.location.lng;

				var branchCards = document.querySelectorAll('.branch-card');

				branchCards.forEach((branchCard) => {
					var distance = this.getDistance(zipLat, zipLng, branchCard.dataset.lat, branchCard.dataset.lng, 'M');
					branchCard.querySelector('.distance').textContent = distance;
				});

				console.log(this.list);
				this.list.reIndex();

				this.list.sort('distance', {
					order: 'asc',
				});
				console.log(this.list);
				this.list.show(1, this.listFilter.listLength);
			});
		this.list.update();
	}

	getDistance(lat1, lng1, lat2, lng2, unit) {
		if (lat1 == lat2 && lng1 == lng2) {
			return 0;
		} else {
			var radlat1 = (Math.PI * lat1) / 180;
			var radlat2 = (Math.PI * lat2) / 180;
			var theta = lng1 - lng2;
			var radtheta = (Math.PI * theta) / 180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = (dist * 180) / Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit == 'K') {
				dist = dist * 1.609344;
			}
			if (unit == 'N') {
				dist = dist * 0.8684;
			}
			return dist.toFixed(1);
		}
	}
}
