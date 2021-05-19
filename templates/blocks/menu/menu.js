export default class Menu {
	constructor(menu, toggleButton) {
		this.toggleButton = document.querySelector(toggleButton);
		this.menu = document.querySelector(menu);
		this.subnavs = document.querySelectorAll('[data-subnav-toggle]');
		this.subnavCloseButtons = document.querySelectorAll('.subnav-close');
		this.subnavActive = null;
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

	toggle() {
		this.menu.dataset.menuState == 'closed' ? this.menu.setAttribute('data-menu-state', 'open') : this.menu.setAttribute('data-menu-state', 'closed');
		this.doc.dataset.menuState == 'closed' ? this.doc.setAttribute('data-menu-state', 'open') : this.doc.setAttribute('data-menu-state', 'closed');
	}

	subnavCloseAll() {
		this.subnavActive = null;
		this.subnavs.forEach((subnav) => {
			subnav.setAttribute('data-subnav-toggle', 'closed');
		});
	}
	toggleSubnav(toggle) {
		let parent = toggle.closest('[data-subnav-toggle]');
		this.subnavActive = document.getElementById(parent.id);

		this.subnavs.forEach((subnav) => {
			if (subnav !== parent) {
				subnav.setAttribute('data-subnav-toggle', 'closed');
			}
		});

		parent.dataset.subnavToggle == 'closed' ? parent.setAttribute('data-subnav-toggle', 'open') : parent.setAttribute('data-subnav-toggle', 'closed');
	}

	init() {
		document.addEventListener('click', (e) => {
			let targetElement = e.target; // clicked element
			var inside = false;

			if (targetElement.classList.contains('subnav-toggle')) {
				this.toggleSubnav(targetElement);
			}

			do {
				if (targetElement == this.subnavActive) {
					// This is a click inside. Do nothing, just return.
					var inside = true;
					return;
				}
				// Go up the DOM
				targetElement = targetElement.parentNode;
			} while (targetElement);

			// this is outside
			return this.subnavCloseAll();
		});

		this.toggleButton.addEventListener('click', () => {
			this.toggle();
		});

		this.subnavCloseButtons.forEach((subnavCloseButton) => {
			subnavCloseButton.addEventListener('click', (e) => {
				this.subnavCloseAll();
			});
		});
	}
}
