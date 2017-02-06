
/**
 * handle autoplay
 *
 * @param  {element} slideTo     slide to frame function
 * @param  {element} options     slider options
 */
export default function initAutoplay (slide, options) {
    let autoplayTime = (typeof options.autoplay === 'number') ? options.autoplay : 3000;
    let onAutoplayStart = window.setInterval(() => {
        slide(false, options.direction === 'ltr' ? true : false);
    }, autoplayTime);

    return onAutoplayStart;
}
