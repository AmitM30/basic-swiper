
/**
 * handle pagination buttons for slider
 *
 * @param  {element} slider      slider element
 * @param  {element} slideTo     slide to frame function
 * @param  {element} options     slider options
 */
export default function initPagination (slider, slideTo, options) {
    let dotCount         = slider.querySelectorAll('.' + options.classNameSlide).length;
    let dotContainer     = slider.querySelector('.' + options.classNameDotsContainer);
    let dotListItem      = document.createElement('li');
    dotListItem.className = 'swiper-pagination-bullet';

    function handleDotEvent (e) {
        if (e.type === 'before.swiper.init') { }
        if (e.type === 'after.swiper.init') {
            for (let i = 0, len = dotCount; i < len; i++) {
                let clone = dotListItem.cloneNode();
                dotContainer.appendChild(clone);

                dotContainer.childNodes[i].addEventListener('click', function(e) {
                    slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, e.target));
                });
            }
            dotContainer.childNodes[0].classList.add('active');
        }
        if (e.type === 'after.swiper.slide') {
            for (let i = 0, len = dotContainer.childNodes.length; i < len; i++) {
                dotContainer.childNodes[i].classList.remove('active');
            }
            dotContainer.childNodes[e.detail.currentSlide].classList.add('active');
        }
        if (e.type === 'on.swiper.resize') {
            for (let i = 0, len = dotContainer.childNodes.length; i < len; i++) {
                dotContainer.childNodes[i].classList.remove('active');
            }
            dotContainer.childNodes[0].classList.add('active');
        }
    };

    slider.addEventListener('before.swiper.init', handleDotEvent);
    slider.addEventListener('after.swiper.init', handleDotEvent);
    slider.addEventListener('after.swiper.slide', handleDotEvent);
    slider.addEventListener('on.swiper.resize', handleDotEvent);
}
