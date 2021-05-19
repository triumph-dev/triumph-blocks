export default class ListFilter {
	constructor(list, filterSelector, loadMore = null, listLength = 10000) {
		this.list = list;
		this.listLength = listLength;
		this.filterSelector = filterSelector;
		this.filterElements = document.querySelectorAll(this.filterSelector);
		this.loadMore = document.querySelector(loadMore);
		this.activeFilters = {};
		this.init();
	}
	init() {
		this.list.valueNames.forEach((filter) => {
			this.activeFilters[filter] = [];
			Object.defineProperty(this.activeFilters, filter, []);
		});

		this.list.show(1, this.listLength);
		if (this.loadMore) {
			this.list.on('updated', () => {
				if (this.list.matchingItems.length < this.listLength || this.list.page > this.list.items.length) {
					this.loadMore.style.display = 'none';
				} else {
					this.loadMore.style.display = 'block';
				}
			});
		}

		this.filterElements.forEach((filter) => {
			// listen for check/uncheck
			filter.addEventListener('change', (e) => {
				// re-set the filters
				this.filterList();
			});
		});
		if (this.loadMore) {
			this.loadMore.addEventListener('click', (e) => {
				var n = this.list.page + this.listLength;
				this.list.show(1, n);
				this.list.update();
			});
		}
	}

	getCheckedInputs() {
		let filterElements = document.querySelectorAll(this.filterSelector);
		// Empty the arrays of checked inputs.
		this.list.valueNames.forEach((filter) => {
			this.activeFilters[filter] = [];
		});

		// Traverse the list of inputs,
		// If the input is checked, add it to the appropriate array of selected filters
		filterElements.forEach((filter) => {
			if (filter.checked) {
				this.activeFilters[filter.dataset.filter].push(filter.value);
			}
		});
	}

	filterList() {
		this.getCheckedInputs();

		// Traverse the items in the list.
		this.list.filter((item) => {
			var show = true;
			// Loop over the active filters
			for (const filter in this.activeFilters) {
				if (this.activeFilters[filter].length && item.values()[filter] && show) {
					var itemValues = item.values()[filter].split(', ');
					//var show = this.showItem(itemValues, this.activeFilters[filter]);

					var intersection = itemValues.filter((el) => this.activeFilters[filter].includes(el));
					show = intersection.length > 0 ? true : false;
				}
			}
			return show;
		});
	}
}
