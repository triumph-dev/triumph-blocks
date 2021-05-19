/*
 * COOKIE HELPER
 * Gives you methods to manipulate cookies easily via js.
 */
class CookieHelper {
	constructor() {}
	set(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}
	get(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	erase(name) {
		document.cookie = name + '=; Max-Age=-99999999';
	}
}

class AnchorScroll {
	constructor(e) {
		(this.link = e), (this.linkHref = e.getAttribute('href')), this.init();
	}
	init() {
		this.link.addEventListener('click', (e) => {
			(e.preventDefault(), '#' !== this.linkHref) &&
				(document.querySelector(this.linkHref).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				}),
				history.pushState(null, null, this.linkHref));
		});
	}
}
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((e) => {
	new AnchorScroll(e);
});

/*
 * ALERT BANNER
 * Alert banner for critical messaging.
 */
const cookies = new CookieHelper();
import AlertBanner from '../templates/blocks/alert/alert';

if (document.querySelectorAll('.alert-banner')) {
	const alerts = document.querySelectorAll('.alert-banner');

	alerts.forEach((alert) => {
		new AlertBanner('#' + alert.getAttribute('id'), cookies);
	});
}

/*
 * CAROUSELS
 * These all use TinySlider to drive slide transitions, nav, etc
 */

import { tns } from 'tiny-slider/src/tiny-slider';

const tnsControls = ['<i class="far fa-lg fa-angle-left"></i><span class="hidden">Previous Slide</span>', '<i class="far fa-lg fa-angle-right"></i><span class="hidden">Next Slide</span>'];

const logoCarousels = document.querySelectorAll('.logo-carousel .carousel');
logoCarousels.forEach((slider) => {
	let logoCarouselOptions = {
		container: slider,
		items: 1,
		slideBy: 'page',
		controls: true,
		controlsText: tnsControls,
		controlsPosition: 'bottom',
		navPosition: 'bottom',
		swipeAngle: 15,
		autoplay: false,
		responsive: {
			640: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1024: {
				items: 4,
			},
		},
	};
	let logoCarousel = tns(logoCarouselOptions);
});

const heroCarousels = document.querySelectorAll('.hero-panes.carousel');
heroCarousels.forEach((slider) => {
	let heroCarousel = tns({
		container: slider,
		items: 1,
		controls: true,
		controlsText: tnsControls,
		controlsPosition: 'bottom',
		navPosition: 'bottom',
		speed: 500,
		swipeAngle: 15,
		loop: true,
	});
});

const testimonialCarousels = document.querySelectorAll('.testimonials');
testimonialCarousels.forEach((slider) => {
	let testimonialCarousel = tns({
		container: slider,
		controlsPosition: 'bottom',
		navPosition: 'bottom',
		autoplay: false,
		items: 1,
		controls: true,
		controlsText: tnsControls,
		swipeAngle: 15,
	});
});

const timelines = document.querySelectorAll('.timeline');

timelines.forEach((timeline) => {
	let timelineContent = timeline.querySelector('.timeline-events');

	let timelineContentOptions = {
		container: timelineContent,
		items: 1,
		slideBy: 1,
		speed: 800,
		loop: false,
		controls: true,
		controlsText: tnsControls,
		controlsPosition: 'bottom',
		navPosition: 'bottom',
		swipeAngle: 15,
		autoplay: false,
		responsive: {
			640: {
				items: 2,
				slideBy: 2,
			},
			1024: {
				items: 3,
				slideBy: 3,
			},
		},
	};
	let timelineContentCarousel = tns(timelineContentOptions);

	var keepSlideInFocus = (info) => {
		document.querySelector('#' + info.container.id + ' .tns-slide-active').click();
	};

	// bind function to event
	timelineContentCarousel.events.on('indexChanged', keepSlideInFocus);

	if (timeline.querySelector('.timeline-images')) {
		let timelineImages = timeline.querySelector('.timeline-images');
		let timelineImagesOptions = {
			container: timelineImages,
			mode: 'gallery',
			items: 1,
			lazyload: true,
			navContainer: timelineContent,
			controls: false,
			navAsThumbnails: true,
		};
		let timelineImageCarousel = tns(timelineImagesOptions);
	}
});

// Add labels to the TinySlider controls for WCAG
const prevButtons = document.querySelectorAll('[data-controls="prev"]');
const nextButtons = document.querySelectorAll('[data-controls="next"]');
prevButtons.forEach((prevButton) => {
	prevButton.setAttribute('aria-label', 'Previous Slide');
});

nextButtons.forEach((nextButton) => {
	nextButton.setAttribute('aria-label', 'Next Slide');
});

/*
 * CONTENT GALLERY
 */
import ContentGallery from '../templates/blocks/content-gallery/content-gallery';

if (document.querySelector('.slides.carousel')) {
	new ContentGallery('.slides.carousel');
}

/*
 * EXPAND
 * Summary/details type component
 */
import Expand from '../templates/blocks/expand/expand';
const expands = document.querySelectorAll('[data-expand-toggle]');
const builtExpands = [];

expands.forEach((expand) => {
	let builtExpand = new Expand(expand);
	builtExpands.push(builtExpand);
});

/*
 * EXPAND GRID
 * Grid of content items that expand to reveal more content
 * on click.
 */
import ExpandGrid from '../templates/blocks/expand-grid/expand-grid';
const expandGrids = document.querySelectorAll('.expand-grid');
expandGrids.forEach((expandGrid) => {
	new ExpandGrid(expandGrid);
});

/*
 * FUEL CALCULATOR
 * Calculate savings on fuel
 */
import FuelCalculator from '../templates/blocks/fuel-calculator/fuel-calculator';
if (document.forms.fuelCalculator) {
	new FuelCalculator(document.forms.fuelCalculator);
}

/*
 * INFO CAROUSEL
 * A merry-go-round carousel with info content blocks as toggles.
 */

import InfoCarousel from '../templates/blocks/info-carousel/info-carousel';

const infoCarousels = document.querySelectorAll('.info-carousel');
infoCarousels.forEach((carousel) => {
	new InfoCarousel(carousel);
});

/*
 * LIST FILTERS
 * Instantiate list search/filter for Blogs and FAQs
 * List.js must be enqueued.  you can do this manually, or use the
 * add_list_js() function in your template.
 */

// Instianiations that depend on List.js
import ListFilter from '../global/js/ListFilter';
import BlogFilter from '../templates/blocks/blog-filter/blog-filter';
import BranchList from '../templates/blocks/branch-list/branch-list';

if (typeof List !== 'undefined') {
	if (document.querySelector('#blog .list')) {
		const blogListOptions = {
			valueNames: ['title', 'post-preview', 'categories', 'tags', 'year'],
		};

		const blogPosts = new List('blog', blogListOptions);
		if (window.location.href.indexOf('category') > -1) {
			var category = window.location.href.split('/category/')[1].replace('/', '');
			document.querySelector('input[data-slug="' + category + '"]').checked = true;
		}
		const blogFilter = new ListFilter(blogPosts, '.blog-filter-input', '#blog-load-more', 12);
		new BlogFilter(blogPosts, blogFilter);
	}

	if (document.querySelector('#faqs-list .list') && document.querySelector('#faqs-list .search')) {
		const faqListOptions = {
			valueNames: ['question', 'answer', 'categories'],
		};

		var faqs = new List('faqs-list', faqListOptions);
		if (document.querySelector('.faq-filter')) {
			new ListFilter(faqs, '.faq-filter-input');
		}
	}

	if (document.querySelector('#branch-list .list')) {
		const branchListOptions = {
			valueNames: ['id', 'post_title', 'latitude', 'longitude', 'distance', 'phone', 'address', 'city', 'state', 'zip', 'image'],
			//indexAsync: true,
		};
		const branchList = new List('branch-list', branchListOptions);
		if (document.querySelector('.branch-list-filter')) {
			const branchFilter = new ListFilter(branchList, '.branch-list-filter-input', '#branch-list-load-more', 6);
			new BranchList(branchList, branchFilter);
		}
	}
}

/*
 * MENU
 * Init by passing the menu wrapper element, and the hamburger element.
 * On init, the menu is set to toggle when the hamburger is clicked.
 */
import Menu from '../templates/blocks/menu/menu';

if (document.getElementById('menu-toggle-button') && document.getElementById('menu-toggle-target')) {
	const menu = new Menu('#menu-toggle-target', '#menu-toggle-button');
}

/*
 * MODAL
 * Modals can be added via custom post type. and triggered via
 * a click on any element with class .trigger-modal-{{ post slug }}
 */
import Modal from '../templates/blocks/modal/modal';
const modals = document.querySelectorAll('.modal-wrapper');
modals.forEach((modal) => {
	new Modal(modal);
});

/*
 * RATE FINDER
 * Hit the TBK API to get the Account Rates for a given user Zip
 */
import RateFinder from '../templates/blocks/rate-finder/rate-finder';

if (document.querySelector('.rate-finder')) {
	const rateFinder = new RateFinder('.rate-finder');
}

// WINDOW EVENTS
// Add a single event listener for resize, and debouce it
// So that it only gets called after resize is complete.

// RESIZE
function workAfterResizeIsDone() {
	builtExpands.forEach((builtExpand) => {
		builtExpand.heightCalc();
	});
}
var timeOutFunctionId;
window.addEventListener('resize', function () {
	clearTimeout(timeOutFunctionId);
	timeOutFunctionId = setTimeout(workAfterResizeIsDone, 500);
});
