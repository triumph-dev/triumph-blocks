export default class InfoCarousel {
    constructor(element) {

        // Function bindings
        this.init                           = this.init.bind(this);
        this.setSlidePositions              = this.setSlidePositions.bind(this);
        this.setClickEvents                 = this.setClickEvents.bind(this);
        this.setImageWrapperHeightAndWidth  = this.setImageWrapperHeightAndWidth.bind(this);

        // Variables
        this.element        = document.querySelector(element);
        this.images         = this.element.querySelectorAll('.image');
        this.imageWrapper   = this.element.querySelector(".images");
        this.slides         = this.element.querySelectorAll(".copy .slide");

        // Sizing variables
        this.imageWidth = 250;
        this.decreaseWidthBy = 50;
        this.increaseLeftBy = 150;
        this.increaseTopBy = 50;

        this.init();
    }
    
    setSlidePositions() {
        var left = 0;
        var width = this.imageWidth;
        var zIndex = this.images.length;
        var top = 0;

        [].forEach.call(this.images, (image) => {
            // Set styles
            image.style.left = left + "px";
            image.style.width = width + "px";
            image.style.zIndex = zIndex;
            image.style.top = top + "px";
            // Set active on the first image
            if(left == 0) {
                image.classList.add("active");
            }

            // Incrememnt styles
            left = left + this.increaseLeftBy;
            width = width - this.decreaseWidthBy;
            top = top + this.increaseTopBy;
            zIndex--;
        });
    }

    setImageWrapperHeightAndWidth() {
        // Height
        var firstImage = document.querySelector(".info-carousel .image.active");
        this.imageWrapper.style.height = firstImage.offsetHeight + "px";
        // Width

        var width = this.imageWidth; // Our first image
        [].forEach.call(this.images, (image) => {

            var left = parseInt(image.style.left.split("px")[0]);
            var ourWidth = parseInt(image.style.width.split("px")[0]);

            var addToPot = (ourWidth + left) - width;

            width=width+addToPot;
        });
        this.imageWrapper.style.width = width + "px";
    }

    setClickEvents(){
        [].forEach.call(this.slides, (slide) => {
            slide.addEventListener("click", ()=>{
                this.handleSlideSwap(slide);
            });
        });
        [].forEach.call(this.images, (image) => {
            image.addEventListener("click", ()=>{
                this.handleSlideSwap(image);
            });
        });
    }

    handleSlideSwap(element){
        if(document.querySelector(element.dataset.slide)) { // If we clicked on a slide
            var image = document.querySelector(element.dataset.slide);
            var slide = element;
        } else { // if we clicked on an image
            var image = element;
            var slide = document.querySelector('.slide[data-slide="#'+ image.getAttribute("id") +'"]');
        }
        
        var imageZIndex = parseInt(image.style.zIndex);
        var largestZIndex = parseInt(this.images.length);

        /* Let's say we've clicked on the slide with a z-index of 1...
        We'll first loop through all the items, and whenever we find one higher than our slide's z-index, we'll do 3 things:
        #1: We'll set its z-index to be what it currently is, minus 1.
        #2: We'll set its width to be what it currently is, minus 200.
        #3: We'll add 100px to its left angle. */

        [].forEach.call(this.images, (single_image) => {
            var single_image_zIndex = parseInt(single_image.style.zIndex);
            var width = parseInt(single_image.style.width.split("px")[0]);
            var left = parseInt(single_image.style.left.split("px")[0]);
            var top = parseInt(single_image.style.top.split("px")[0]);
            single_image.classList.remove("active");
            if(single_image_zIndex !== imageZIndex) {
                if(single_image_zIndex > imageZIndex) {
                    single_image.style.zIndex = single_image_zIndex - 1;
                    single_image.style.width = (width - this.decreaseWidthBy) + 'px';
                    single_image.style.left = (left + this.increaseLeftBy) + 'px';
                    single_image.style.top = (top + this.increaseTopBy) + 'px';
                }
            }
        });

        // Finally, we can promote the image belonging to the slide we just clicked on..
        image.style.zIndex = largestZIndex;
        image.style.width = this.imageWidth + "px";
        image.style.left = '0';
        image.style.top = '0';
        image.classList.add("active");

        // The last step. We need to remove "active" from all slides, and set this one to have it.
        [].forEach.call(this.slides, (single_slide) => {
            single_slide.classList.remove("active");
        });
        slide.classList.add("active");
    }

    init() {
        // Set the slide positions
        this.setSlidePositions();
        // Set the image wrapper's dimensions
        this.setImageWrapperHeightAndWidth();
        // Set click event handlers
        this.setClickEvents();
    }
}