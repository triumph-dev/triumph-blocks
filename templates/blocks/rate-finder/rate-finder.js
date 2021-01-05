export default class RateFinder {
	constructor(rateFinder) {
		this.rateFinder = document.querySelector(rateFinder);
		this.form = this.rateFinder.querySelector('form');
		this.rateWrapper = this.rateFinder.querySelector('.rate-wrapper');
		this.init();
	}
	init() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			let queryString = document.getElementById('zip').value;
			if (document.getElementById('account')) {
				queryString += '&account=' + document.getElementById('account').value;
			}

			let url = '/wp-json/tbkbank/rates?zip=' + queryString;
			this.rateWrapper.innerHTML = '';
			this.getAccountRates(url);
		});
	}

	getAccountRates(url) {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((accounts) => {
				console.log(accounts);
				accounts.forEach((account) => {
					let headerRow = '';
					let contentRows = '';
					let i = 0;
					account.rates.forEach((rate) => {
						i++;
						let contentString = '';

						if (rate.account_tier !== '') {
							if (i === 1) {
								headerRow += '<th>Account Tier</th>';
							}
							contentString += '<td>' + rate.account_tier + '</td>';
						}

						if (rate.interest_rate !== '') {
							if (i === 1) {
								headerRow += '<th>Interest Rate</th>';
							}

							contentString += '<td>' + rate.interest_rate + '%</td>';
						}

						if (rate.apy !== '') {
							if (i === 1) {
								headerRow += '<th>APY</th>';
							}
							contentString += '<td>' + rate.apy + '%</td>';
						}
						contentRows += '<tr>' + contentString + '</tr>';
					});
					let rateTable = `
						<div class="account-rate" data-account-type="${account.type}">
							<div class="account-title-content">
								<h3>${account.title}</h3>
								<h4>${account.type}</h4>
								<a class="simple-link" href="${account.link}">View Account</a>
							</div>
							<div class="rate-table-wrapper">
								<table>
									<tr>${headerRow}</tr>
									${contentRows}
								</table>
							</div>
							
						</div>
						`;
					this.rateWrapper.insertAdjacentHTML('beforeend', rateTable);
				});
			});
	}
}
