export default class Gallery {
	constructor(element) {
		this.element = document.querySelector(element);
		this.block = this.element.parentNode;
		this.slides = this.element.querySelectorAll('.slide');
		this.navigation = this.block.querySelector('.navigation .dots-container');
		this.childrenCount = this.element.childElementCount;
		this.dots = [];
		this.init();
	}

	listeners() {
		this.dots = this.navigation.querySelectorAll('.dot');
		this.dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				var slide = document.querySelector('.slide[data-slide="' + dot.dataset.slide + '"]');
				document.querySelector('.slide.active').classList.remove('active');
				document.querySelector('.dot.active').classList.remove('active');
				slide.classList.add('active');
				dot.classList.add('active');
			});
		});
	}

	addDots() {
		var i = 0;
		this.slides.forEach((slide) => {
			var active = i == 0 ? 'active' : '';
			var dot = `<button class="dot ${active}" data-slide="${slide.dataset.slide}" ></button>`;
			this.navigation.insertAdjacentHTML('beforeend', dot);
			i++;
		});
	}

	init() {
		// Add the dot navigation
		this.addDots();
		// Handle transitions between slides
		this.listeners();
	}
}
