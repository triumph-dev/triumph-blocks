export default class InfoCarousel {
	constructor(carousel) {
		this.triggers = carousel.querySelectorAll('[data-content-id]');
		this.images = carousel.querySelectorAll('.info-carousel-slide-image');
		this.copies = carousel.querySelectorAll('.info-carousel-slide-copy');
		this.init();
	}
	init() {
		this.triggers.forEach((trigger) => {
			trigger.addEventListener('click', (e) => {
				e.preventDefault();

				this.setActive(trigger, this.images);
				this.setActive(trigger, this.copies);
				if (e.target.href) {
					//if (e.target.target == '_blank') {
					//	window.open(e.target.href, e.target.target);
					//} else {
					window.location.href = e.target.href;
					//}
				}
			});
		});
	}
	setActive(element, triggers) {
		var i = 2;
		triggers.forEach((trigger) => {
			if (element.dataset.contentId == trigger.dataset.contentId) {
				trigger.setAttribute('data-active', 'true');
				trigger.setAttribute('data-position', 1);
			} else {
				trigger.setAttribute('data-active', 'false');
				trigger.setAttribute('data-position', i);
				i++;
			}
		});
	}
}
