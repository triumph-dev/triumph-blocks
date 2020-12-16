export default class Menu {
	constructor(menu, toggleButton) {
		this.toggleButton = document.querySelector(toggleButton);
		this.menu = document.querySelector(menu);
		this.subnavs = this.menu.querySelectorAll('[data-subnav-toggle]');
		this.doc = document.documentElement;
		this.init();
	}

	open() {
		this.menu.setAttribute('data-menu-state', 'open');
		this.doc.setAttribute('data-menu-state', 'open');
	}

	close() {
		this.menu.dataset.menuState = 'closed';
		this.doc.dataset.menuState = 'closed';
	}

	toggleSubnav(toggle) {
		let parent = toggle.closest('[data-subnav-toggle]');

		this.subnavs.forEach((subnav) => {
			if (subnav !== parent) {
				let parent = subnav.closest('[data-subnav-toggle]');
				parent.setAttribute('data-subnav-toggle', 'closed');
			}
		});

		parent.dataset.subnavToggle == 'closed'
			? parent.setAttribute('data-subnav-toggle', 'open')
			: parent.setAttribute('data-subnav-toggle', 'closed');
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

		this.subnavs.forEach((subnav) => {
			let subnavToggle = subnav.querySelector('.subnav-toggle');
			subnavToggle.addEventListener('click', (e) => {
				this.toggleSubnav(e.target);
			});
		});
	}
}
