export default class BlogFilter {
	constructor(list, listFilter) {
		this.list = list;
		this.listFilter = listFilter;
		this.init();
	}
	init() {
		this.updateText();
		this.list.on('updated', () => {
			this.updateText();
		});
	}
	updateText() {
		let article = this.list.matchingItems.length == 1 ? 'article' : 'articles';
		let filterList = [];
		let listTotal = '';

		for (const filter in this.listFilter.activeFilters) {
			filterList.push(...this.listFilter.activeFilters[filter]);
		}

		if (filterList.length > 0) {
			var titleString = filterList.join(', ');
			listTotal = `<p><em>Showing ${this.list.matchingItems.length} ${article} from (${titleString}) </em></p>`;
		} else {
			listTotal = `<p><em>Showing ${this.list.matchingItems.length} of ${this.list.items.length} ${article}.</em></p>`;
		}
		document.getElementById('list-total').innerHTML = listTotal;
	}
}
