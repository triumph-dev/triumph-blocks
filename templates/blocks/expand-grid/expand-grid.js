export default class ExpandGrid {
	constructor(grid) {
		this.grid = grid.querySelector("ul");
		this.toggles = grid.querySelectorAll("[data-expand-grid-toggle-id]");
		this.init();
	}
	open(toggle, target) {
		target.closest(".expand-grid-item").setAttribute("data-toggle", "open");
		target.setAttribute("data-toggle", "open");
		toggle.setAttribute("data-target-toggle", "open");
		target.style.maxHeight = target.dataset.height + "px";
	}
	close(toggle, target) {
		target
			.closest(".expand-grid-item")
			.setAttribute("data-toggle", "closed");
		target.setAttribute("data-toggle", "close");
		toggle.setAttribute("data-target-toggle", "close");
		target.style.maxHeight = null;
		//this.target.style.height = 0;
	}

	init() {
		//this.target.style.overflow = 'hidden';
		//this.target.style.transition = 'height 250ms ease';
		this.toggles.forEach((toggle) => {
			let target = document.getElementById(
				toggle.dataset.expandGridToggleId
			);
			let targetHeight = target.offsetHeight;

			target.dataset.height = targetHeight;
			this.close(toggle, target);

			toggle.addEventListener(
				"click",
				(e) => {
					//
					e.preventDefault();
					if (target.dataset.toggle === "open") {
						this.close(toggle, target);
					} else {
						this.open(toggle, target);
					}
				},
				false
			);
		});
	}
}
