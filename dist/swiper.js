(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _detectPrefixes = __webpack_require__(2);
	
	var _detectPrefixes2 = _interopRequireDefault(_detectPrefixes);
	
	var _dispatchEvent = __webpack_require__(3);
	
	var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);
	
	var _initPagination = __webpack_require__(5);
	
	var _initPagination2 = _interopRequireDefault(_initPagination);
	
	var _initAutoplay = __webpack_require__(6);
	
	var _initAutoplay2 = _interopRequireDefault(_initAutoplay);
	
	var _defaults = __webpack_require__(7);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var slice = Array.prototype.slice;
	
	// 'use strict';
	(function (window) {
	    var swiper = function swiper(slider, opts) {
	        var self = this;
	
	        var position = void 0;
	        var slidesWidth = void 0;
	        var frameWidth = void 0;
	        var slides = void 0;
	
	        /**
	         * slider DOM elements
	         */
	        var frame = void 0;
	        var slideContainer = void 0;
	        var prevCtrl = void 0;
	        var nextCtrl = void 0;
	        var prefixes = void 0;
	        var transitionEndCallback = void 0;
	        var dotsContainer = void 0;
	
	        var index = 0;
	        var options = {};
	
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
	        function setActiveElement(slides, currentIndex) {
	            var _options = options,
	                classNameActiveSlide = _options.classNameActiveSlide;
	
	
	            slides.forEach(function (element, index) {
	                if (element.classList.contains(classNameActiveSlide)) {
	                    element.classList.remove(classNameActiveSlide);
	                }
	            });
	
	            if (slides[currentIndex]) {
	                slides[currentIndex].classList.add(classNameActiveSlide);
	            }
	
	            if (prevCtrl) {
	                currentIndex === 0 ? prevCtrl.classList.add(options.classNameDisabled) : prevCtrl.classList.remove(options.classNameDisabled);
	            }
	
	            if (nextCtrl && !options.rewind) {
	                currentIndex + 1 === slides.length ? nextCtrl.classList.add(options.classNameDisabled) : nextCtrl.classList.remove(options.classNameDisabled);
	            }
	        }
	
	        /**
	         * private
	         * setupSlidesPerView: function to setup no. of slides per view
	         *
	         * @param  {array} slideArray
	         * @return {array} array of updated slideContainer elements
	         */
	        function setupSlidesPerView(slideArray) {
	            var _options2 = options,
	                slidesPerView = _options2.slidesPerView,
	                classNameSlide = _options2.classNameSlide;
	
	
	            slideArray.forEach(function (element) {
	                element.style.width = 100 / slidesPerView + '%';
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
	        function dispatchSliderEvent(phase, type, detail) {
	            (0, _dispatchEvent2.default)(slider, phase + '.swiper.' + type, detail);
	        }
	
	        /**
	         * translates to a given position in a given time in milliseconds
	         *
	         * @to        {number} number in pixels where to translate to
	         * @duration  {number} time in milliseconds for the transistion
	         * @ease      {string} easing css property
	         */
	        function translate(to, duration, ease) {
	            var style = slideContainer && slideContainer.style;
	
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
	            var count = 5;
	            var eventInterval = window.setInterval(function () {
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
	        function slide(nextIndex, direction) {
	            var _options3 = options,
	                slideSpeed = _options3.slideSpeed,
	                slidesToScroll = _options3.slidesToScroll,
	                infinite = _options3.infinite,
	                rewind = _options3.rewind,
	                rewindSpeed = _options3.rewindSpeed,
	                ease = _options3.ease,
	                classNameActiveSlide = _options3.classNameActiveSlide;
	
	
	            var duration = slideSpeed;
	
	            slider.style.direction = slider.style.direction || options.direction;
	
	            var nextSlide = direction ? index + 1 : index - 1;
	            var maxOffset = Math.round(slidesWidth - frameWidth);
	
	            dispatchSliderEvent('before', 'slide', {
	                index: index,
	                nextSlide: nextSlide
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
	            var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * (options.direction === 'ltr' ? -1 : 1), maxOffset * -1), 0);
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
	                    index = slides.length - infinite * 2;
	                }
	
	                position.x = slides[index].offsetLeft * -1;
	
	                transitionEndCallback = function transitionEndCallback() {
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
	        function setup() {
	            dispatchSliderEvent('before', 'init');
	
	            prefixes = (0, _detectPrefixes2.default)();
	            options = _extends({}, _defaults2.default, opts);
	
	            var _options4 = options,
	                classNameFrame = _options4.classNameFrame,
	                classNameSlideContainer = _options4.classNameSlideContainer,
	                classNameDotsContainer = _options4.classNameDotsContainer,
	                classNamePrevCtrl = _options4.classNamePrevCtrl,
	                classNameNextCtrl = _options4.classNameNextCtrl,
	                enableMouseEvents = _options4.enableMouseEvents,
	                classNameActiveSlide = _options4.classNameActiveSlide;
	
	
	            frame = slider.getElementsByClassName(classNameFrame)[0];
	            slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
	            prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
	            nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];
	            dotsContainer = slider.getElementsByClassName(classNameDotsContainer)[0];
	
	            // set swiper direction
	            options.direction = document.body.style.direction || options.direction;
	
	            // set pagination
	            if (dotsContainer) {
	                (0, _initPagination2.default)(slider, slideTo, options);
	            }
	
	            position = {
	                x: slideContainer.offsetLeft,
	                y: slideContainer.offsetTop
	            };
	
	            if (options.slidesPerView) {
	                slides = setupSlidesPerView(slice.call(slideContainer.getElementsByClassName(_defaults2.default.classNameSlide)));
	            } else {
	                slides = slice.call(slideContainer.getElementsByClassName(_defaults2.default.classNameSlide));
	            }
	
	            slides.forEach(function (slide) {
	                slide.addEventListener('mouseenter', function () {
	                    stopAutoplay();
	                });
	                slide.addEventListener('mouseleave', function () {
	                    startAutoplay();
	                });
	            });
	
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
	
	            // check if swiper instance is not present, destroy
	            slider.addEventListener('before.swiper.slide', function () {
	                if (!document.body.contains(slider)) {
	                    destroy();
	                }
	            });
	
	            dispatchSliderEvent('after', 'init');
	        }
	
	        /**
	         * public
	         * reset function: called on resize
	         */
	        function reset() {
	            var _options5 = options,
	                infinite = _options5.infinite,
	                ease = _options5.ease,
	                rewindSpeed = _options5.rewindSpeed,
	                rewindOnResize = _options5.rewindOnResize,
	                classNameActiveSlide = _options5.classNameActiveSlide;
	
	
	            slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
	            frameWidth = frame.getBoundingClientRect().width || frame.offsetWidth;
	
	            if (frameWidth === slidesWidth) {
	                slidesWidth = slides.reduce(function (previousValue, slide) {
	                    return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
	                }, 0);
	            }
	
	            if (slidesWidth === 0) {
	                slidesWidth = slides.length / (typeof infinite === 'number' ? infinite : 1) * frameWidth;
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
	        function slideTo(index) {
	            slide(index);
	        }
	
	        /**
	         * public
	         * returnIndex function: called on clickhandler
	         */
	        function returnIndex() {
	            return index - options.infinite || 0;
	        }
	
	        /**
	         * public
	         * prev function: called on clickhandler
	         */
	        function prev() {
	            slide(false, !(options.direction === 'ltr'));
	        }
	
	        /**
	         * public
	         * next function: called on clickhandler
	         */
	        function next() {
	            slide(false, options.direction === 'ltr');
	        }
	
	        /**
	         * public
	         * destroy function: called to gracefully destroy the swiper instance
	         */
	        function destroy() {
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
	
	        var touchOffset = void 0;
	        var delta = void 0;
	        var isScrolling = void 0;
	
	        function onTransitionEnd() {
	            if (transitionEndCallback) {
	                transitionEndCallback();
	
	                transitionEndCallback = undefined;
	            }
	        }
	
	        function onTouchstart(event) {
	            var _options6 = options,
	                enableMouseEvents = _options6.enableMouseEvents;
	
	            var touches = event.touches ? event.touches[0] : event;
	
	            if (enableMouseEvents) {
	                frame.addEventListener('mousemove', onTouchmove);
	                frame.addEventListener('mouseup', onTouchend);
	                frame.addEventListener('mouseleave', onTouchend);
	            }
	
	            frame.addEventListener('touchmove', onTouchmove);
	            frame.addEventListener('touchend', onTouchend);
	
	            var pageX = touches.pageX,
	                pageY = touches.pageY;
	
	
	            touchOffset = {
	                x: pageX,
	                y: pageY,
	                time: Date.now()
	            };
	
	            isScrolling = undefined;
	
	            delta = {};
	
	            dispatchSliderEvent('on', 'touchstart', {
	                event: event
	            });
	        }
	
	        function onTouchmove(event) {
	            stopAutoplay();
	
	            var touches = event.touches ? event.touches[0] : event;
	            var pageX = touches.pageX,
	                pageY = touches.pageY;
	
	
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
	                event: event
	            });
	        }
	
	        function onTouchend(event) {
	            /**
	             * time between touchstart and touchend in milliseconds
	             * @duration {number}
	             */
	            var duration = touchOffset ? Date.now() - touchOffset.time : undefined;
	
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
	            var isValid = Number(duration) < 300 && (Math.abs(delta.x) > 25 || Math.abs(delta.x) > frameWidth / 3);
	
	            /**
	             * is out of bounds if:
	             *
	             * -> index is 0 and delta x is greater than 0
	             * or
	             * -> index is the last slide and delta is smaller than 0
	             *
	             * @isOutOfBounds {Boolean}
	             */
	            var isOutOfBounds = !index && (options.direction === 'ltr' ? delta.x > 0 : delta.x <= 0) || index === slides.length - 1 && (options.direction === 'ltr' ? delta.x < 0 : delta.x >= 0);
	
	            var direction = options.direction === 'ltr' ? delta.x < 0 : delta.x >= 0;
	
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
	                event: event
	            });
	        }
	
	        function onClick(event) {
	            if (delta.x) {
	                event.preventDefault();
	            }
	        }
	
	        function onResize(event) {
	            reset();
	
	            dispatchSliderEvent('on', 'resize', {
	                event: event
	            });
	        }
	
	        function startAutoplay() {
	            // set autoplay
	            if (options.autoplay) {
	                stopAutoplay();
	                self.onAutoplayStart = (0, _initAutoplay2.default)(slide, options);
	            }
	        }
	
	        function stopAutoplay() {
	            if (self.onAutoplayStart) {
	                window.clearInterval(self.onAutoplayStart);
	                self.onAutoplayStart = null;
	            }
	        }
	
	        // trigger initial setup
	        setup();
	
	        // expose public api
	        return {
	            setup: setup,
	            reset: reset,
	            slideTo: slideTo,
	            returnIndex: returnIndex,
	            prev: prev,
	            next: next,
	            destroy: destroy
	        };
	    };
	
	    window.swiper = swiper;
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = detectPrefixes;
	
	/**
	 * Detecting prefixes for saving time and bytes
	 */
	function detectPrefixes() {
	    var transform = void 0;
	    var transition = void 0;
	    var transitionEnd = void 0;
	    var hasTranslate3d = void 0;
	
	    (function () {
	        var el = document.createElement('_');
	        var style = el.style;
	
	        var prop = void 0;
	
	        if (style[prop = 'webkitTransition'] === '') {
	            transitionEnd = 'webkitTransitionEnd';
	            transition = prop;
	        }
	
	        if (style[prop = 'transition'] === '') {
	            transitionEnd = 'transitionend';
	            transition = prop;
	        }
	
	        if (style[prop = 'webkitTransform'] === '') {
	            transform = prop;
	        }
	
	        if (style[prop = 'msTransform'] === '') {
	            transform = prop;
	        }
	
	        if (style[prop = 'transform'] === '') {
	            transform = prop;
	        }
	
	        document.body.insertBefore(el, null);
	        style[transform] = 'translate3d(0, 0, 0)';
	        hasTranslate3d = !!global.getComputedStyle(el).getPropertyValue(transform);
	        document.body.removeChild(el);
	    })();
	
	    return {
	        transform: transform,
	        transition: transition,
	        transitionEnd: transitionEnd,
	        hasTranslate3d: hasTranslate3d
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = dispatchEvent;
	
	var _customEvents = __webpack_require__(4);
	
	var _customEvents2 = _interopRequireDefault(_customEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * dispatch custom events
	 *
	 * @param  {element} el         slideshow element
	 * @param  {string}  type       custom event name
	 * @param  {object}  detail     custom detail information
	 */
	function dispatchEvent(target, type, detail) {
	    var event = new _customEvents2.default(type, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	    });
	
	    target.dispatchEvent(event);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// var NativeCustomEvent = global.CustomEvent;
	
	function useNative() {
	    try {
	        var p = new global.CustomEvent('cat', { detail: { foo: 'bar' } });
	        return 'cat' === p.type && 'bar' === p.detail.foo;
	    } catch (e) {}
	    return false;
	}
	
	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */
	
	module.exports = useNative() ? global.CustomEvent : // IE >= 9
	'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent(type, params) {
	    var e = document.createEvent('CustomEvent');
	    if (params) {
	        e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	    } else {
	        e.initCustomEvent(type, false, false, void 0);
	    }
	    return e;
	} : // IE <= 8
	function CustomEvent(type, params) {
	    var e = document.createEventObject();
	    e.type = type;
	    if (params) {
	        e.bubbles = Boolean(params.bubbles);
	        e.cancelable = Boolean(params.cancelable);
	        e.detail = params.detail;
	    } else {
	        e.bubbles = false;
	        e.cancelable = false;
	        e.detail = void 0;
	    }
	    return e;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = initPagination;
	
	/**
	 * handle pagination buttons for slider
	 *
	 * @param  {element} slider      slider element
	 * @param  {element} slideTo     slide to frame function
	 * @param  {element} options     slider options
	 */
	function initPagination(slider, slideTo, options) {
	    var dotCount = slider.querySelectorAll('.' + options.classNameSlide).length;
	    var dotContainer = slider.querySelector('.' + options.classNameDotsContainer);
	    var dotListItem = document.createElement('li');
	    dotListItem.className = 'swiper-pagination-bullet';
	
	    function handleDotEvent(e) {
	        if (e.type === 'before.swiper.init') {}
	        if (e.type === 'after.swiper.init') {
	            for (var i = 0, len = dotCount; i < len; i++) {
	                var clone = dotListItem.cloneNode();
	                dotContainer.appendChild(clone);
	
	                dotContainer.childNodes[i].addEventListener('click', function (e) {
	                    slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, e.target));
	                });
	            }
	            dotContainer.childNodes[0].classList.add('active');
	        }
	        if (e.type === 'after.swiper.slide') {
	            for (var _i = 0, _len = dotContainer.childNodes.length; _i < _len; _i++) {
	                dotContainer.childNodes[_i].classList.remove('active');
	            }
	            dotContainer.childNodes[e.detail.currentSlide].classList.add('active');
	        }
	        if (e.type === 'on.swiper.resize') {
	            for (var _i2 = 0, _len2 = dotContainer.childNodes.length; _i2 < _len2; _i2++) {
	                dotContainer.childNodes[_i2].classList.remove('active');
	            }
	            dotContainer.childNodes[0].classList.add('active');
	        }
	    };
	
	    slider.addEventListener('before.swiper.init', handleDotEvent);
	    slider.addEventListener('after.swiper.init', handleDotEvent);
	    slider.addEventListener('after.swiper.slide', handleDotEvent);
	    slider.addEventListener('on.swiper.resize', handleDotEvent);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = initAutoplay;
	
	/**
	 * handle autoplay
	 *
	 * @param  {element} slideTo     slide to frame function
	 * @param  {element} options     slider options
	 */
	function initAutoplay(slide, options) {
	    var autoplayTime = typeof options.autoplay === 'number' ? options.autoplay : 3000;
	    var onAutoplayStart = window.setInterval(function () {
	        slide(false, true);
	    }, autoplayTime);
	
	    return onAutoplayStart;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  /**
	   * slides scrolled at once
	   * @slidesToScroll {Number}
	   */
	  slidesToScroll: 1,
	
	  /**
	   * no. of slides per view
	   * @slidesPerView {Number}
	   */
	  slidesPerView: 1,
	
	  /**
	   * time in milliseconds for the animation of a valid slide attempt
	   * @slideSpeed {Number}
	   */
	  slideSpeed: 300,
	
	  /**
	   * time in milliseconds for the animation of the rewind after the last slide
	   * @rewindSpeed {Number}
	   */
	  rewindSpeed: 600,
	
	  /**
	   * time for the snapBack of the slider if the slide attempt was not valid
	   * @snapBackSpeed {Number}
	   */
	  snapBackSpeed: 200,
	
	  /**
	   * Basic easing functions: https://developer.mozilla.org/de/docs/Web/CSS/transition-timing-function
	   * cubic bezier easing functions: http://easings.net/de
	   * @ease {String}
	   */
	  ease: 'ease',
	
	  /**
	   * if slider reached the last slide, with next click the slider goes back to the startindex.
	   * use infinite or rewind, not both
	   * @rewind {Boolean}
	   */
	  rewind: false,
	
	  /**
	   * number of visible slides or false
	   * use infinite or rewind, not both
	   * @infinite {number}
	   */
	  infinite: false,
	
	  /**
	   * class name for slider frame
	   * @classNameFrame {string}
	   */
	  classNameFrame: 'js_frame',
	
	  /**
	   * class name for slides container
	   * @classNameSlideContainer {string}
	   */
	  classNameSlideContainer: 'js_slides',
	
	  /**
	   * class name for slide
	   * @classNameSlide {string}
	   */
	  classNameSlide: 'js_slide',
	
	  /**
	   * class name for dots container
	   * @classNameDotsContainer {string}
	   */
	  classNameDotsContainer: 'js_dots',
	
	  /**
	   * class name for slider prev control
	   * @classNamePrevCtrl {string}
	   */
	  classNamePrevCtrl: 'js_prev',
	
	  /**
	   * class name for slider next control
	   * @classNameNextCtrl {string}
	   */
	  classNameNextCtrl: 'js_next',
	
	  /**
	   * class name for current active slide
	   * if emptyString then no class is set
	   * @classNameActiveSlide {string}
	   */
	  classNameActiveSlide: 'active',
	
	  /**
	   * class name for disabled prev / next control
	   * @classNameDisabled {string}
	   */
	  classNameDisabled: 'disabled',
	
	  /**
	   * enables mouse events for swiping on desktop devices
	   * @enableMouseEvents {boolean}
	   */
	  enableMouseEvents: true,
	
	  /**
	   * window instance
	   * @window {object}
	   */
	  window: window,
	
	  /**
	   * If false, slides swiper to the first slide on window resize.
	   * @rewindOnResize {boolean}
	   */
	  rewindOnResize: true,
	
	  /**
	   * autoplay slides
	   * time in ms
	   * @autoplay {number}
	   */
	  autoplay: false,
	
	  /**
	   * document direction
	   * @autoplay {string}
	   */
	  direction: 'ltr'
	};

/***/ }
/******/ ])
});
;