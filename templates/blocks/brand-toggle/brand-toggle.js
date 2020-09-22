export default class BrandToggle {
    constructor(element){
        // Bindings
        this.init = this.init.bind(this);

        // Definitions
        this.element = document.querySelector(element);

        // Calls
        this.init();
    }

    init(){
        this.element.onchange = (e) => {
            var brand = e.target.value;
            var destination = window.location.origin + "?brand=" + brand;
            window.location.href = destination;
        }
    }
}