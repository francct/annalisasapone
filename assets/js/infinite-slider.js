class InfiniteSlider {
    constructor(animTime = '30000', selector = '.slider', container = '#slider-container') {
        this.slider = document.querySelector(selector)
        this.container = document.querySelector(container)
        this.width = 0
        this.oldWidth = 0
        this.duration = parseInt(animTime)
        this.start = 0
        this.refresh = 0 // 0 or 1 As in steps of the animation
        this._oldTimestamp = 0
    }

    animate() {
        /* Fix for browsers who like to run JS before images are loaded */
        const imgs = Array.prototype.slice.call(this.slider.querySelectorAll('img'))
            .filter(img => {
                return img.naturalWidth === 0
            })
        if (imgs.length > 0) {
            window.requestAnimationFrame(this.animate.bind(this));
            return
        }

        /* Add another copy of the slideshow to the end, keep track of original width */
        this.oldWidth = this.slider.offsetWidth
        const sliderText = '<span class="slider-extra">' + this.slider.innerHTML + '</span>'
        this.slider.innerHTML += sliderText

        /* Can have content still when we move past original slider */
        this.width = this.slider.offsetWidth
        const minWidth = 2 * screen.width

        /* Add more slideshows if needed to keep a continuous stream of content */
        while (this.width < minWidth) {
            this.slider.innerHTML += sliderText
            this.width = this.slider.width
        }
        this.slider.querySelector('.slider-extra:last-child').classList.add('slider-last')

        /* Loop animation endlesssly (this is pretty cool) */
        window.requestAnimationFrame(this.controlAnimation.bind(this))
    }

    controlAnimation(timestamp) {
        /* Reset animation */
        if (this.refresh >= 1) {
            this.start = timestamp
            this.slider.style.marginLeft = 0
            this.refresh = 0
            window.requestAnimationFrame(this.controlAnimation.bind(this))
            return
        }
        if (timestamp - this.start >= this.duration) {
            this.refresh = 1
        }

        const perc = ((timestamp - (this.start)) / this.duration) * this.oldWidth
        this.slider.style.marginLeft = (-perc) + 'px'

        window.requestAnimationFrame(this.controlAnimation.bind(this))
        return
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = new InfiniteSlider(100000)
    slider.animate()
});
