export default class BrandToggle {
	constructor(element) {
		// Bindings
		this.init = this.init.bind(this);
		this.refreshBrands = this.refreshBrands.bind(this);
		this.filterComponents = this.filterComponents.bind(this);

		// Definitions
		this.element = document.querySelector(element);
		this.blocks = Array.prototype.slice.call(document.querySelectorAll('#content section[data-background-color]'));

		// Calls
		this.init();
	}

	refreshBrands(e) {
		var brand = e.target.value;
		var destination = window.location.href.split('/?')[0] + '?brand=' + brand;
		window.location.href = destination;
	}

	filterComponents(e) {
		var component = e.target.value;
		this.blocks.forEach((block, i) => {
			// Show all components if select is reset
			if (component == 'reset') {
				block.classList.remove('hide');
				// Hide all components, unless the class matches what was selected
			} else {
				block.classList.add('hide');
				if ((block.classList.contains(component) || block.classList.contains('brand-toggle')) && !block.classList.contains('header')) {
					block.classList.remove('hide');
					if (this.blocks[i - 1]) {
						this.blocks[i - 1].classList.remove('hide'); // show this component's header
					}
				}
			}
		});
	}

	init() {
		this.element.onchange = (e) => {
			if (this.element.getAttribute('name') == 'brands') {
				this.refreshBrands(e);
			} else {
				this.filterComponents(e);
			}
		};
	}
}
