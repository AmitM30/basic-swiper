
/**
 * handle pagination buttons for slider
 *
 * @param  {element} slider     slider element
 */
export default function initPagination (slider, slideTo, options) {
    let dot_count         = slider.querySelectorAll('.' + options.classNameSlide).length;
    let dot_container     = slider.querySelector('.' + options.classNameDotsContainer);
    let dot_list_item     = document.createElement('li');

    function handleDotEvent (e) {
        if (e.type === 'before.swiper.init') { }
        if (e.type === 'after.swiper.init') {
            for (let i = 0, len = dot_count; i < len; i++) {
                let clone = dot_list_item.cloneNode();
                dot_container.appendChild(clone);

                dot_container.childNodes[i].addEventListener('click', function(e) {
                    slideTo(Array.prototype.indexOf.call(dot_container.childNodes, e.target));
                });
            }
            dot_container.childNodes[0].classList.add('active');
        }
        if (e.type === 'after.swiper.slide') {
            for (let i = 0, len = dot_container.childNodes.length; i < len; i++) {
                dot_container.childNodes[i].classList.remove('active');
            }
            dot_container.childNodes[e.detail.currentSlide].classList.add('active');
        }
        if (e.type === 'on.swiper.resize') {
            for (let i = 0, len = dot_container.childNodes.length; i < len; i++) {
                dot_container.childNodes[i].classList.remove('active');
            }
            dot_container.childNodes[0].classList.add('active');
        }
    };

    slider.addEventListener('before.swiper.init', handleDotEvent);
    slider.addEventListener('after.swiper.init', handleDotEvent);
    slider.addEventListener('after.swiper.slide', handleDotEvent);
    slider.addEventListener('on.swiper.resize', handleDotEvent);
}
