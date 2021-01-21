export default class BlogFilter {
	constructor(list, filterSelector) {
		this.list = list;
		this.listLength = 6;
		this.loadMore = document.getElementById("blog-load-more");
		this.filterSelector = filterSelector;
		this.filters = document.querySelectorAll(this.filterSelector);
		this.titles = [];
		this.categories = [];
		this.tags = [];
		this.years = [];
		this.init();
	}
	init() {
		this.updateText();
		this.isArchive();
		this.filterList();
		this.list.show(1, this.listLength);
		this.list.on("updated", () => {
			this.updateText();
			if (
				this.list.matchingItems.length < this.listLength ||
				this.list.page > this.list.items.length
			) {
				this.loadMore.style.display = "none";
			} else {
				this.loadMore.style.display = "block";
			}
		});
		this.filters.forEach((filter) => {
			// listen for check/uncheck
			filter.addEventListener("change", (e) => {
				// re-set the filters
				this.filterNow();
			});
		});
		this.loadMore.addEventListener("click", (e) => {
			var n = this.list.page + this.listLength;
			this.list.show(1, n);
			this.list.update();
		});
	}

	filterNow() {
		this.filters = document.querySelectorAll(this.filterSelector);

		// find which inputs are checked, and add them to the
		// appropriate array of selected filters
		this.getCheckedInputs();

		// filter the list based on the arrays of selected filters
		this.filterList();

		this.updateText();
	}

	getCheckedInputs() {
		// Empty the arrays of checked inputs.
		this.categories = [];
		this.tags = [];
		this.years = [];
		this.titles = [];

		// Traverse the list of inputs,
		// If the input is checked, add it to the appropriate array of selected filters
		this.filters.forEach((filter) => {
			if (filter.checked) {
				this.titles.push(filter.dataset.title);
				switch (filter.dataset.filter) {
					case "categories":
						this.categories.push(filter.value);
						break;
					case "tags":
						this.tags.push(filter.value);
						break;
					case "year":
						this.years.push(filter.value);
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
			var intersection = filterArray.filter((el) =>
				listFilterArray.includes(el)
			);
			show = intersection.length > 0 ? true : false;
		}
		return show;
	}

	updateText() {
		var listTotal = "";
		var article =
			this.list.matchingItems.length == 1 ? "article" : "articles";

		if (this.titles.length > 0) {
			var titleString = this.titles.join(", ");
			listTotal = `<p><em>Showing ${this.list.matchingItems.length} ${article} from (${titleString}) </em></p>`;
		} else {
			listTotal = `<p><em>Showing ${this.list.matchingItems.length} of ${this.list.items.length} ${article}.</em></p>`;
		}

		document.getElementById("list-total").innerHTML = listTotal;
	}

	isArchive() {
		// Checks if we're on an archive page. If so, it auto-filters by the category in question.
		if (window.location.href.indexOf("category") > -1) {
			var category = window.location.href
				.split("/category/")[1]
				.replace("/", "");
			document.querySelector(
				'input[value="' + category + '"]'
			).checked = true;
			this.filterNow();
		}
	}

	filterList() {
		// Traverse the items in the list.
		this.list.filter((item) => {
			// CATEGORY
			var itemCategories = item.values().categories.split("+");
			var categoryShow = this.showItem(itemCategories, this.categories);

			// TAG
			var itemTags = item.values().tags;
			if (itemTags) {
				var itemTags = itemTags.split("+");
			}
			var tagShow = this.showItem(itemTags, this.tags);

			// YEAR
			var itemYear = item.values().year.split("+");
			var yearShow = this.showItem(itemYear, this.years);

			// Combine all of the filter conditions.
			// If they all == true, show this item in the list
			var show = categoryShow && tagShow && yearShow ? true : false;
			return show;
		});
	}
}
