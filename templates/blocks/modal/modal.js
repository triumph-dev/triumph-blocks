export default class Modal {
	constructor(element, externalLink) {
		this.id = element.id;
		this.modalWrapper = element;
		this.triggers = document.querySelectorAll('.trigger-modal-' + this.id);
		this.modal = this.modalWrapper.querySelector('.modal');
		this.closeButtons = this.modalWrapper.querySelectorAll('.modal-close');
		this.externalLink = externalLink ? externalLink : false;
		this.init();
	}
	init() {
		this.triggers.forEach((trigger) => {
			trigger.addEventListener('click', (e) => {
				e.preventDefault();

				if (this.externalLink) {
					this.modal.querySelector('.external-link').href = e.target.href;
				}

				var modalWrapper = document.querySelector(this.id);
				if (modalWrapper.dataset.open != 'true') {
					this.open();
				}
			});
		});

		this.closeButtons.forEach((closeButton) => {
			closeButton.addEventListener('click', (e) => {
				this.close();
			});
		});

		this.modalWrapper.addEventListener('click', (e) => {
			if (e.srcElement.id === this.modalWrapper.id) {
				this.close();
			}
		});
	}
	open() {
		this.modalWrapper.setAttribute('data-open', 'true');
	}

	close() {
		console.log('close');
		this.modalWrapper.setAttribute('data-open', 'false');
	}
}
