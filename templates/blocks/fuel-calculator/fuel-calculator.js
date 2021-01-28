export default class FuelCalculator {
	constructor(form) {
		this.form = form;
		this.multiplier = this.form.dataset.multiplier
			? parseFloat(this.form.dataset.multiplier)
			: 38.875;
		this.listening = false;
		this.init();
	}
	init() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.calculate();
		});
	}
	calculate() {
		if (document.getElementById("fuel-calculator-outro")) {
			document
				.getElementById("fuel-calculator-outro")
				.classList.remove("hidden");
		}
		let trucks = parseFloat(document.getElementById("trucks").value);
		let truckMiles = parseFloat(
			document.getElementById("truck-miles").value
		);
		let mpg = parseFloat(document.getElementById("mpg").value);
		let fuelCost = parseFloat(document.getElementById("fuel-cost").value);
		let totalCost = ((trucks * truckMiles) / mpg) * fuelCost;
		let weeklySavings = trucks * this.multiplier;

		document.getElementById(
			"total-spent"
		).textContent = totalCost.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
		document.getElementById(
			"savings-per-week"
		).textContent = weeklySavings.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
		document.getElementById("savings-per-month").textContent = (
			weeklySavings * 4
		).toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
		document.getElementById("savings-per-year").textContent = (
			weeklySavings * 48
		).toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
		if (this.listening == false) {
			this.inputListen();
		}
	}
	inputListen() {
		let inputs = this.form.querySelectorAll('[type="number"]');
		inputs.forEach((input) => {
			input.addEventListener("input", (e) => {
				this.calculate();
			});
		});
		this.listening = true;
	}
}
