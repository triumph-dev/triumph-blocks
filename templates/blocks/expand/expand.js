export default class Expand {
	constructor(wrapper) {
		this.wrapper = wrapper;
		this.toggle = wrapper.querySelector('.expand-trigger');
		this.target = wrapper.querySelector('.expand-content');
		this.targetHeight = this.target.offsetHeight;
		this.init();
	}
	open() {
		this.wrapper.setAttribute('data-expand-toggle', 'open');
		this.target.style.maxHeight = this.targetHeight + 'px';
	}
	close() {
		this.wrapper.setAttribute('data-expand-toggle', 'closed');
		this.target.style.maxHeight = null;
	}
	heightCalc() {
		this.wrapper.style.transition = '';
		this.toggle.querySelector('.indicator').style.transition = '';
		this.target.style.transition = '';

		this.open();

		this.targetHeight = this.target.offsetHeight;
		this.target.setAttribute('data-height', this.targetHeight);

		this.close();

		setTimeout(() => {
			this.wrapper.style.transition = 'border-color 150ms ease';
			this.toggle.querySelector('.indicator').style.transition = 'transform 150ms ease';
			this.target.style.transition = 'max-height 150ms ease-out, padding-bottom 250ms ease';
		}, 1);
	}

	init() {
		this.heightCalc();

		this.toggle.addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				if (this.wrapper.dataset.expandToggle === 'open') {
					this.close();
				} else {
					this.open();
				}
			},
			false
		);
	}
}
