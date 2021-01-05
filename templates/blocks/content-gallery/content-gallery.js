export default class ContentGallery {
	constructor(element) {
		this.element = document.querySelector(element);
		this.block = this.element.parentNode;
		this.arrows = this.element.querySelector('.tns-controls');
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
		this.arrows.querySelectorAll('button').forEach((arrow) => {
			arrow.addEventListener('click', () => {
				this.arrows.querySelector('button[data-controls="next"]').classList.remove('inactive');
				this.arrows.querySelector('button[data-controls="prev"]').classList.remove('inactive');

				var currentSlideNumber = parseInt(document.querySelector('.dot.active').dataset.slide.split('-')[1]);
				var nextSlide = document.querySelector('.slide[data-slide="slide-' + (currentSlideNumber + 1) + '"]');
				var prevSlide = document.querySelector('.slide[data-slide="slide-' + (currentSlideNumber - 1) + '"]');

				if (arrow.dataset.controls == 'next') {
					if (nextSlide) {
						document.querySelector('.slide.active').classList.remove('active');
						document.querySelector('.dot.active').classList.remove('active');
						nextSlide.classList.add('active');
						document
							.querySelector('.dot[data-slide="slide-' + (currentSlideNumber + 1) + '"]')
							.classList.add('active');
					}
					if (!document.querySelector('.slide[data-slide="slide-' + (currentSlideNumber + 2) + '"]')) {
						this.arrows.querySelector('button[data-controls="next"]').classList.add('inactive');
					}
				} else {
					if (prevSlide) {
						document.querySelector('.slide.active').classList.remove('active');
						document.querySelector('.dot.active').classList.remove('active');
						prevSlide.classList.add('active');
						document
							.querySelector('.dot[data-slide="slide-' + (currentSlideNumber - 1) + '"]')
							.classList.add('active');
					}
					if (!document.querySelector('.slide[data-slide="slide-' + (currentSlideNumber - 2) + '"]')) {
						this.arrows.querySelector('button[data-controls="prev"]').classList.add('inactive');
					}
				}
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
