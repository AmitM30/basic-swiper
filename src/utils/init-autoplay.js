
/**
 * handle autoplay
 *
 * @param  {element} slideTo     slide to frame function
 * @param  {element} options     slider options
 */
export default function initAutoplay (slide, options) {
    // let dot_list_item     = document.createElement('li');
    let autoplayTime = (typeof options.autoplay === 'number') ? options.autoplay : 2500;
    let onAutoplayStart = window.setInterval(() => {
        slide(false, true);
    }, autoplayTime);

    return onAutoplayStart;
}
