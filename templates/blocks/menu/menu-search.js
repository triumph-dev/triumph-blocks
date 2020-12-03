export default class MenuSearch {
	constructor(menu, toggle) {
		this.menu = document.querySelector(menu);
		this.toggleButton = document.querySelector(toggle);
		this.closeButton = this.menu.querySelector('.close');
		this.init();
	}
	init() {
		this.toggleButton.addEventListener('click', () => {
			this.toggle();
		});
		this.closeButton.addEventListener('click', () => {
			this.close();
		});
	}
	open() {
		this.menu.setAttribute('data-search-menu-state', 'open');
	}
	close() {
		this.menu.setAttribute('data-search-menu-state', 'closed');
	}
	toggle() {
		this.menu.dataset.searchMenuState == 'closed'
			? this.menu.setAttribute('data-search-menu-state', 'open')
			: this.menu.setAttribute('data-search-menu-state', 'closed');
	}
}
