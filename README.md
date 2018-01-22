
## Swiper
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/AmitM30/basic-swiper/master/LICENSE) [![Code Climate](https://codeclimate.com/github/AmitM30/basic-swiper/badges/gpa.svg)](https://codeclimate.com/github/AmitM30/basic-swiper)

Touch enabled minimalistic slider written in vanilla JavaScript.

Forked from: [http://meandmax.github.io/lory/](http://meandmax.github.io/lory/ "lory"), Updated for [Wadi](https://en-sa.wadi.com) with:
- Autoplay
- RTL
- Lazyload images support
- Stop sliding on hover

### Installation

```
bower install basic-swiper --save
```

### Using:

```js
    import { swiper } from 'basic-swiper.js';

    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.querySelector('.js_slider');
        swiper(slider, {
            // options
        });
    });
```

### Development

To install dev dependencies run:
```
npm install
```
To make a full new build run:
```
npm run build
```

### Markup
The default classes can be overridden when instantiating swiper.
```html
<div class="js_slider">
    <div class="js_frame">
        <ul class="js_slides">
            <li class="js_slide">1</li>
            <li class="js_slide">2</li>
            <li class="js_slide">3</li>
            <li class="js_slide">4</li>
            <li class="js_slide">5</li>
            <li class="js_slide">6</li>
        </ul>
        // Prev / Next buttons
        <span class="js_prev prev"></span>
        <span class="js_next next"></span>
    </div>
    // Pagination
    <ul class="js_dots"></ul>
</div>
```

### CSS

```css
.slider {}

.frame {
    position: relative;
    font-size: 0;
    line-height: 0;
    white-space: nowrap;
}

.slides {
    display: inline-block;
}

li {
    position: relative;
    display: inline-block;
}
li img {
    max-width: 100%;
}

.prev, .next {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    display: block;
    cursor: pointer;
}

.next {
    right: 0;
}

.prev {
    left: 0;
}

.next svg, .prev svg {
    width: 25px;
}

.dots {
    margin: 0;
    padding: 0;
    text-align: center;
    position: absolute;
    width: 100%;
}

.dots > li {
    width: 7px;
    height: 7px;
    border: 1px solid #fff;
    opacity: 0.5;
    margin: 0 5px;
    display: inline-block;
    border-radius: 100%;
    background-color: #000;
    cursor: pointer;
}

.dots > li.active {
    background-color: #fff;
    border: 1px solid #999;
    box-sizing: border-box;
    width: 12px;
    border-radius: 4px;
    opacity: 1;
}
```

## Options

<table>
    <tr>
        <td>slidesToScroll</td>
        <td>default: 1</td>
    </tr>
    <tr>
        <td>slidesPerView</td>
        <td>default: 1 (number of visible slides)</td>
    </tr>
    <tr>
        <td>enableMouseEvents</td>
        <td>default: true</td>
    </tr>
    <tr>
        <td>rewind</td>
        <td>default: false</td>
    </tr>
    <tr>
        <td>slideSpeed (ms)</td>
        <td>default: 300</td>
    </tr>
    <tr>
        <td>rewindSpeed (ms)</td>
        <td>default: 600</td>
    </tr>
    <tr>
        <td>snapBackSpeed (ms)</td>
        <td>default: 200</td>
    </tr>
    <tr>
        <td>ease (cubic bezier easing functions: http://easings.net/de)</td>
        <td>default: 'ease'</td>
    </tr>
    <tr>
        <td>classNameFrame</td>
        <td>default: 'js_frame'</td>
    </tr>
    <tr>
        <td>classNameSlideContainer</td>
        <td>default: 'js_slides'</td>
    </tr>
    <tr>
        <td>classNameDotsContainer</td>
        <td>default: 'js_dots'</td>
    </tr>
    <tr>
        <td>classNamePrevCtrl</td>
        <td>default: 'js_prev'</td>
    </tr>
    <tr>
        <td>classNameNextCtrl</td>
        <td>default: 'js_next'</td>
    </tr>
    <tr>
        <td>classNameActiveSlide</td>
        <td>default: 'active'</td>
    </tr>
    <tr>
        <td>classNameDisabled</td>
        <td>default: 'disabled'</td>
    </tr>
    <tr>
        <td>autoplay</td>
        <td>default: false</td>
    </tr>
    <tr>
        <td>direction</td>
        <td>default: 'ltr'</td>
    </tr>
    <tr>
        <td>loadPrevNextImage</td>
        <td>default: true</td>
    </tr>
</table>

## Events

<table>
    <tr>
        <td>before.swiper.init</td>
        <td>fires before initialisation (first in setup function)</td>
    </tr>
    <tr>
        <td>after.swiper.init</td>
        <td>fires after initialisation (end of setup function)</td>
    </tr>
    <tr>
        <td>before.swiper.slide</td>
        <td>fires before slide change | <strong>arguments:</strong> currentSlide, nextSlide</td>
    </tr>
    <tr>
        <td>while.swiper.sliding</td>
        <td>fires while swiper is transiting between slides</td>
    </tr>
    <tr>
        <td>after.swiper.slide</td>
        <td>fires after slide change | <strong>arguments:</strong> currentSlide</td>
    </tr>
    <tr>
        <td>before.swiper.destroy</td>
        <td>fires before the slider instance gets destroyed</td>
    </tr>
    <tr>
        <td>after.swiper.destroy</td>
        <td>fires after the slider instance gets destroyed</td>
    </tr>
    <tr>
        <td>on.swiper.resize</td>
        <td>fires on every resize event</td>
    </tr>
    <tr>
        <td>on.swiper.touchstart</td>
        <td>fires on every slider touchstart event</td>
    </tr>
    <tr>
        <td>on.swiper.touchmove</td>
        <td>fires on every slider touchmove event</td>
    </tr>
    <tr>
        <td>on.swiper.touchend</td>
        <td>fires on every slider touchend event</td>
    </tr>
</table>

### Browser Support

* Chrome
* Safari
* FireFox
* Opera
* Internet Explorer 10+
* Internet Explorer 9
    - graceful, no transitions
    - need to polyfill classlist (https://github.com/eligrey/classList.js/)
