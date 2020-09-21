export default class AlertBanner {
	constructor(alert, cookies) {
		this.alert = document.querySelector(alert);
		this.closeButton = this.alert.querySelector('.alert-close');
		this.type = this.alert.dataset.type;
		this.cookieID = this.alert.id;
		this.cookies = cookies;
		this.init();
	}

	open() {
		this.alert.dataset.open = true;
	}

	close() {
		this.alert.dataset.open = false;
		this.cookies.set('tpay-' + this.cookieID, 'hide', 0);
	}

	init() {
		this.closeButton.addEventListener('click', () => {
			this.close();
		});

		if (!this.cookies.get('tpay-' + this.cookieID)) {
			this.cookies.set('tpay-' + this.cookieID, 'show', 0);
		}

		if (this.cookies.get('tpay-' + this.cookieID) == 'show') {
			this.open();
		} else {
			this.close();
		}
	}
}
