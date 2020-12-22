export default class FaqFilter {
	constructor(list, filterSelector) {
		this.list = list;
		this.filterSelector = filterSelector;
		this.filters = document.querySelectorAll(this.filterSelector);
		this.titles = [];
		this.categories = [];

		this.init();
	}
	init() {
		this.filterList();

		this.filters.forEach((filter) => {
			// listen for check/uncheck
			filter.addEventListener('change', (e) => {
				// re-set the filters
				this.filterNow();
			});
		});
	}

	filterNow() {
		this.filters = document.querySelectorAll(this.filterSelector);

		// find which inputs are checked, and add them to the
		// appropriate array of selected filters
		this.getCheckedInputs();

		// filter the list based on the arrays of selected filters
		this.filterList();
	}

	getCheckedInputs() {
		// Empty the arrays of checked inputs.
		this.categories = [];
		this.titles = [];

		// Traverse the list of inputs,
		// If the input is checked, add it to the appropriate array of selected filters
		this.filters.forEach((filter) => {
			if (filter.checked) {
				this.titles.push(filter.dataset.title);
				switch (filter.dataset.filter) {
					case 'categories':
						this.categories.push(filter.value);
						break;
				}
			}
		});
	}

	showItem(filterArray, listFilterArray) {
		var show = false;
		if (listFilterArray.length < 1) {
			// If the array of the selected filter is empty
			// do not filter out this item based on this specific filter.
			show = true;
		} else {
			// If this item's value is in the array of selected filters
			// do not filter out this item.

			var intersection = filterArray.filter((el) => listFilterArray.includes(el));
			show = intersection.length > 0 ? true : false;
		}
		return show;
	}

	filterList() {
		// Traverse the items in the list.
		this.list.filter((item) => {
			// CATEGORY
			var itemCategories = item.values().categories;
			if (itemCategories) {
				var itemCategories = itemCategories.split('+');
				itemCategories = itemCategories.map(function(el) {
					return el.trim();
				});
			}
			var categoryShow = this.showItem(itemCategories, this.categories);

			return categoryShow;
		});
	}
}
