export default class RateFinder {
	constructor(rateFinder) {
		this.rateFinder = document.querySelector(rateFinder);
		this.form = this.rateFinder.querySelector('form');
		this.method = this.form.dataset.method;
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

			let url = '/wp-json/tbkbank/' + this.method + '?zip=' + queryString;
			this.rateWrapper.innerHTML = '';
			this.getAccountRates(url);
		});
	}
	buildRegionCard(data) {
		let region = data.region;
		let location = data.closest_location;
		console.log(data);
		let regionCard = `
		<div class="region-card">
			<p><a href="${region.pdf.url}">Download the PDF</a> of all the rates for your region.</p>
			<ul>
				<li><span class="label">Region:</span> ${region.name}</li>
				<li><span class="label">Nearest Location:</span> <strong>${location.post_title}</strong><br>
					<p>${location.meta.address}<br>
					${location.meta.city}, ${location.meta.state} ${location.meta.zip}<br>
					${location.meta.phone} 
					</p>
				</li>
				<li><span class="label">Distance:</span> ${Number(location.distance.toFixed(1))} mi</li>
			</ul>
		</div>
		`;
		return regionCard;
	}

	buildAccountCards(accounts) {
		let accountCards = '';

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
			accountCards += rateTable;
		});

		return accountCards;
	}

	getAccountRates(url) {
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let regionCard = this.buildRegionCard(data);
				this.rateWrapper.insertAdjacentHTML('beforeend', regionCard);
				if (this.method == 'rates-geo') {
					//let accountCards = this.buildAccountCards(data.accounts);
					//this.rateWrapper.insertAdjacentHTML('beforeend', accountCards);
				}
			});
	}
}
