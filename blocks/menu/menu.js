export default class Menu {
	constructor(menu, toggleButton) {
		this.toggleButton = document.querySelector(toggleButton);
		this.menu = document.querySelector(menu);
		this.doc = document.documentElement;
		this.init();
	}

	open() {
		this.menu.dataset.menuState = 'open';
		this.doc.dataset.menuState = 'open';
	}

	close() {
		this.menu.dataset.menuState = 'closed';
		this.doc.dataset.menuState = 'closed';
	}

	toggle() {
		this.menu.dataset.menuState == 'closed'
			? this.menu.setAttribute('data-menu-state', 'open')
			: this.menu.setAttribute('data-menu-state', 'closed');
		this.doc.dataset.menuState == 'closed'
			? this.doc.setAttribute('data-menu-state', 'open')
			: this.doc.setAttribute('data-menu-state', 'closed');
	}

	init() {
		this.toggleButton.addEventListener('click', () => {
			this.toggle();
		});
	}
}
