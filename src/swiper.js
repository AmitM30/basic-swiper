
import detectPrefixes       from './utils/detect-prefixes.js';
import dispatchEvent        from './utils/dispatch-event.js';
import initPagination       from './utils/init-pagination.js';
import initAutoplay         from './utils/init-autoplay.js';
import defaults             from './defaults.js';

const slice = Array.prototype.slice;

// 'use strict';
(function (window) {
  let swiper = function (slider, opts) {
    let self = this;

    let position;
    let slidesWidth;
    let frameWidth;
    let slides;

    /**
     * slider DOM elements
     */
    let frame;
    let slideContainer;
    let prevCtrl;
    let nextCtrl;
    let prefixes;
    let transitionEndCallback;
    let dotsContainer;

    let index   = 0;
    let options = {};

    self.onAutoplayStart;

    /**
     * if object is jQuery convert to native DOM element
     */
    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
        slider = slider[0];
    }

    /**
     * private
     * set active class to element which is the current slide
     */
    function setActiveElement (slides, currentIndex) {
        const {classNameActiveSlide} = options;

        slides.forEach((element, index) => {
            if (element.classList.contains(classNameActiveSlide)) {
                element.classList.remove(classNameActiveSlide);
            }
        });

        if (slides[currentIndex]) {
            slides[currentIndex].classList.add(classNameActiveSlide);
        }

        if (prevCtrl) {
            (currentIndex === 0) ? prevCtrl.classList.add(options.classNameDisabled) : prevCtrl.classList.remove(options.classNameDisabled);
        }

        if (nextCtrl && !options.rewind) {
            ((currentIndex + 1) === slides.length) ? nextCtrl.classList.add(options.classNameDisabled) : nextCtrl.classList.remove(options.classNameDisabled);
        }
    }

    /**
     * private
     * setupSlidesPerView: function to setup no. of slides per view
     *
     * @param  {array} slideArray
     * @return {array} array of updated slideContainer elements
     */
    function setupSlidesPerView (slideArray) {
        const {
            slidesPerView,
            classNameSlide
        } = options;

        slideArray.forEach(function (element) {
            element.style.width = (100 / slidesPerView) + '%';
        });

        slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

        return slice.call(slideContainer.children);
    }

    // /**
    //  * private
    //  * setupInfinite: function to setup if infinite is set
    //  *
    //  * @param  {array} slideArray
    //  * @return {array} array of updated slideContainer elements
    //  */
    // function setupInfinite (slideArray) {
    //     const { infinite } = options;
    //     console.log('setupInfinite: ', slideArray);
    //     console.log('infinite: ', infinite);

    //     const front = slideArray.slice(0, infinite);
    //     const back  = slideArray.slice(slideArray.length - infinite, slideArray.length);

    //     front.forEach(function (element) {
    //         const cloned = element.cloneNode(true);

    //         slideContainer.appendChild(cloned);
    //     });

    //     back.reverse()
    //         .forEach(function (element) {
    //             const cloned = element.cloneNode(true);

    //             slideContainer.insertBefore(cloned, slideContainer.firstChild);
    //         });

    //     slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

    //     return slice.call(slideContainer.children);
    // }

    /**
     * [dispatchSliderEvent description]
     * @return {[type]} [description]
     */
    function dispatchSliderEvent (phase, type, detail) {
        dispatchEvent(slider, `${phase}.swiper.${type}`, detail);
    }

    /**
     * translates to a given position in a given time in milliseconds
     *
     * @to        {number} number in pixels where to translate to
     * @duration  {number} time in milliseconds for the transistion
     * @ease      {string} easing css property
     */
    function translate (to, duration, ease) {
        const style = slideContainer && slideContainer.style;

        if (style) {
            style[prefixes.transition + 'TimingFunction'] = ease;
            style[prefixes.transition + 'Duration'] = duration + 'ms';

            if (prefixes.hasTranslate3d) {
                style[prefixes.transform] = 'translate3d(' + to + 'px, 0, 0)';
            } else {
                style[prefixes.transform] = 'translate(' + to + 'px, 0)';
            }
        }

        // Fire events while sliding
        let count = 5;
        let eventInterval = window.setInterval(() => {
            dispatchSliderEvent('while', 'sliding');
            count--;
            if (count === 0) {
                window.clearInterval(eventInterval);
            }
        }, duration / 5);
    }

    /**
     * slidefunction called by prev, next & touchend
     *
     * determine nextIndex and slide to next postion
     * under restrictions of the defined options
     *
     * @direction  {boolean}
     */
    function slide (nextIndex, direction) {
        const {
            slideSpeed,
            slidesToScroll,
            infinite,
            rewind,
            rewindSpeed,
            ease,
            classNameActiveSlide
        } = options;

        let duration = slideSpeed;

        slider.style.direction = slider.style.direction || options.direction;

        const nextSlide = direction ? index + 1 : index - 1;
        const maxOffset = Math.round(slidesWidth - frameWidth);

        dispatchSliderEvent('before', 'slide', {
            index,
            nextSlide
        });

        if (typeof nextIndex !== 'number') {
            if (direction) {
                nextIndex = index + slidesToScroll;
            } else {
                nextIndex = index - slidesToScroll;
            }
        }

        nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

        if (infinite && direction === undefined) {
            nextIndex += infinite;
        }

        // let nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);
        let nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * (options.direction === 'ltr' ? -1 : 1), maxOffset * -1), 0);
        nextOffset = nextOffset * (options.direction === 'ltr' ? 1 : -1);

        if (rewind && Math.abs(position.x) === maxOffset && direction) {
            nextOffset = 0;
            nextIndex = 0;
            duration = rewindSpeed;
        }

        /**
         * translate to the nextOffset by a defined duration and ease function
         */
        translate(nextOffset, duration, ease);

        /**
         * update the position with the next position
         */
        position.x = nextOffset;

        /**
         * update the index with the nextIndex only if
         * the offset of the nextIndex is in the range of the maxOffset
         */
        if (slides[nextIndex].offsetLeft <= maxOffset) {
            index = nextIndex;
        }

        if (infinite && (nextIndex === slides.length - infinite || nextIndex === 0)) {
            if (direction) {
                index = infinite;
            }

            if (!direction) {
                index = slides.length - (infinite * 2);
            }

            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, undefined);
            };
        }

        if (classNameActiveSlide) {
            setActiveElement(slice.call(slides), index);
        }

        dispatchSliderEvent('after', 'slide', {
            currentSlide: index
        });
    }

    /**
     * public
     * setup function
     */
    function setup () {
        dispatchSliderEvent('before', 'init');

        prefixes = detectPrefixes();
        options = {...defaults, ...opts};

        const {
            classNameFrame,
            classNameSlideContainer,
            classNameDotsContainer,
            classNamePrevCtrl,
            classNameNextCtrl,
            enableMouseEvents,
            classNameActiveSlide
        } = options;

        frame = slider.getElementsByClassName(classNameFrame)[0];
        slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
        prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
        nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];
        dotsContainer = slider.getElementsByClassName(classNameDotsContainer)[0];

        // set swiper direction
        options.direction = document.body.style.direction || options.direction;

        // set pagination
        if (dotsContainer) {
            initPagination(slider, slideTo, options);
        }

        position = {
            x: slideContainer.offsetLeft,
            y: slideContainer.offsetTop
        };

        if (options.slidesPerView) {
            slides = setupSlidesPerView(slice.call(slideContainer.getElementsByClassName(defaults.classNameSlide)));
        } else {
            slides = slice.call(slideContainer.getElementsByClassName(defaults.classNameSlide));
        }

        // if (options.infinite) {
        //     slides = setupInfinite(slice.call(slideContainer.getElementsByClassName(defaults.classNameSlide)));
        // } else {
        //     slides = slice.call(slideContainer.getElementsByClassName(defaults.classNameSlide));
        // }

        reset();

        if (classNameActiveSlide) {
            setActiveElement(slides, index);
        }

        // start autoplay
        startAutoplay();

        // set prev and next controls
        if (prevCtrl && nextCtrl) {
            prevCtrl.addEventListener('click', prev);
            nextCtrl.addEventListener('click', next);
        }

        frame.addEventListener('touchstart', onTouchstart);

        if (enableMouseEvents) {
            frame.addEventListener('mousedown', onTouchstart);
            frame.addEventListener('click', onClick);
        }

        options.window.addEventListener('resize', onResize);

        dispatchSliderEvent('after', 'init');
    }

    /**
     * public
     * reset function: called on resize
     */
    function reset () {
        var { infinite, ease, rewindSpeed, rewindOnResize, classNameActiveSlide } = options;

        slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
        frameWidth = frame.getBoundingClientRect().width || frame.offsetWidth;

        if (frameWidth === slidesWidth) {
            slidesWidth = slides.reduce(function (previousValue, slide) {
                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
            }, 0);
        }

        if (slidesWidth === 0) {
            slidesWidth = (slides.length / (typeof infinite === 'number' ? infinite : 1)) * frameWidth;
        }

        if (rewindOnResize) {
            index = 0;
        } else {
            ease = null;
            rewindSpeed = 0;
        }

        if (infinite) {
            translate(slides[index + infinite].offsetLeft * (options.direction === 'ltr' ? -1 : 1), 0, null);

            index = index + infinite;
            position.x = slides[index].offsetLeft * (options.direction === 'ltr' ? -1 : 1);
        } else {
            // position.x = slides[index].offsetLeft * (options.direction === 'ltr' ? -1 : 1);
            position.x = 0;
        }

        if (classNameActiveSlide) {
            setActiveElement(slice.call(slides), index);
        }
    }

    /**
     * public
     * slideTo: called on clickhandler
     */
    function slideTo (index) {
        slide(index);
    }

    /**
     * public
     * returnIndex function: called on clickhandler
     */
    function returnIndex () {
        return index - options.infinite || 0;
    }

    /**
     * public
     * prev function: called on clickhandler
     */
    function prev () {
        slide(false, !(options.direction === 'ltr'));
    }

    /**
     * public
     * next function: called on clickhandler
     */
    function next () {
        slide(false, options.direction === 'ltr');
    }

    /**
     * public
     * destroy function: called to gracefully destroy the swiper instance
     */
    function destroy () {
        dispatchSliderEvent('before', 'destroy');

        // remove event listeners
        frame.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
        frame.removeEventListener('touchstart', onTouchstart);
        frame.removeEventListener('touchmove', onTouchmove);
        frame.removeEventListener('touchend', onTouchend);
        frame.removeEventListener('mousemove', onTouchmove);
        frame.removeEventListener('mousedown', onTouchstart);
        frame.removeEventListener('mouseup', onTouchend);
        frame.removeEventListener('mouseleave', onTouchend);
        frame.removeEventListener('click', onClick);

        options.window.removeEventListener('resize', onResize);

        if (prevCtrl) {
            prevCtrl.removeEventListener('click', prev);
        }

        if (nextCtrl) {
            nextCtrl.removeEventListener('click', next);
        }

        if (self.onAutoplayStart) {
            window.clearInterval(self.onAutoplayStart);
        }

        // remove cloned slides if infinite is set
        if (options.infinite) {
            Array.apply(null, Array(options.infinite)).forEach(function () {
                slideContainer.removeChild(slideContainer.firstChild);
                slideContainer.removeChild(slideContainer.lastChild);
            });
        }

        dispatchSliderEvent('after', 'destroy');
    }

    // event handling

    let touchOffset;
    let delta;
    let isScrolling;

    function onTransitionEnd () {
        if (transitionEndCallback) {
            transitionEndCallback();

            transitionEndCallback = undefined;
        }
    }

    function onTouchstart (event) {
        const {enableMouseEvents} = options;
        const touches = event.touches ? event.touches[0] : event;

        if (enableMouseEvents) {
            frame.addEventListener('mousemove', onTouchmove);
            frame.addEventListener('mouseup', onTouchend);
            frame.addEventListener('mouseleave', onTouchend);
        }

        frame.addEventListener('touchmove', onTouchmove);
        frame.addEventListener('touchend', onTouchend);

        const {pageX, pageY} = touches;

        touchOffset = {
            x: pageX,
            y: pageY,
            time: Date.now()
        };

        isScrolling = undefined;

        delta = {};

        dispatchSliderEvent('on', 'touchstart', {
            event
        });
    }

    function onTouchmove (event) {
        stopAutoplay();

        const touches = event.touches ? event.touches[0] : event;
        const {pageX, pageY} = touches;

        delta = {
            x: pageX - touchOffset.x,
            y: pageY - touchOffset.y
        };

        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
        }

        if (!isScrolling && touchOffset) {
            event.preventDefault();
            translate(position.x + delta.x, 0, null);
        }

        // may be
        dispatchSliderEvent('on', 'touchmove', {
            event
        });
    }

    function onTouchend (event) {
        /**
         * time between touchstart and touchend in milliseconds
         * @duration {number}
         */
        const duration = touchOffset ? Date.now() - touchOffset.time : undefined;

        /**
         * is valid if:
         *
         * -> swipe attempt time is over 300 ms
         * and
         * -> swipe distance is greater than 25px
         * or
         * -> swipe distance is more then a third of the swipe area
         *
         * @isValidSlide {Boolean}
         */
        const isValid = Number(duration) < 300 &&
            (Math.abs(delta.x) > 25 ||
            Math.abs(delta.x) > frameWidth / 3);

        /**
         * is out of bounds if:
         *
         * -> index is 0 and delta x is greater than 0
         * or
         * -> index is the last slide and delta is smaller than 0
         *
         * @isOutOfBounds {Boolean}
         */
        const isOutOfBounds = !index && ((options.direction === 'ltr') ? delta.x > 0 : delta.x <= 0) ||
            index === slides.length - 1 && ((options.direction === 'ltr') ? delta.x < 0 : delta.x >= 0);

        const direction = (options.direction === 'ltr') ? delta.x < 0 : delta.x >= 0;

        if (!isScrolling) {
            if (isValid && !isOutOfBounds) {
                slide(false, direction);
            } else {
                translate(position.x, options.snapBackSpeed);
            }
        }

        touchOffset = undefined;

        /**
         * remove eventlisteners after swipe attempt
         */
        frame.removeEventListener('touchmove', onTouchmove);
        frame.removeEventListener('touchend', onTouchend);
        frame.removeEventListener('mousemove', onTouchmove);
        frame.removeEventListener('mouseup', onTouchend);
        frame.removeEventListener('mouseleave', onTouchend);

        startAutoplay();

        dispatchSliderEvent('on', 'touchend', {
            event
        });
    }

    function onClick (event) {
        if (delta.x) {
            event.preventDefault();
        }
    }

    function onResize (event) {
        reset();

        dispatchSliderEvent('on', 'resize', {
            event
        });
    }

    function startAutoplay () {
        // set autoplay
        if (options.autoplay) {
            stopAutoplay();
            self.onAutoplayStart = initAutoplay(slide, options);
        }
    }

    function stopAutoplay () {
        if (self.onAutoplayStart) {
            window.clearInterval(self.onAutoplayStart);
            self.onAutoplayStart = null;
        }
    }

    // trigger initial setup
    setup();

    // expose public api
    return {
        setup,
        reset,
        slideTo,
        returnIndex,
        prev,
        next,
        destroy
    };
  };

  window.swiper = swiper;

})(window);