
## Swiper
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/meandmax/lory/master/LICENSE)
Touch enabled minimalistic slider written in vanilla JavaScript.

Forked from: [http://meandmax.github.io/lory/](http://meandmax.github.io/lory/ "lory")

Updated for [Wadi](https://en-sa.wadi.com) with:
- Autoplay
- RTL support

### Installation

```
bower install basic-swiper --save
```

### Consume it as an ES2015 module:

```js
    import { swiper } from 'basic-swiper.js';

    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.querySelector('.js_slider');
        swiper(slider, {
            // options going here
        });
    });
```

### Local development

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
<div class="slider js_slider">
    <div class="frame js_frame">
        <ul class="slides js_slides">
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
    // Pagination buttons
    <ul class="js_dots dots"></ul>
</div>
```

### CSS

```css
/**
 * (optional) define here the style definitions which should be applied on the slider container
 * e.g. width including further controls like arrows etc.
 */
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
    vertical-align: middle;
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

### Integration

```javascript
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var slider = document.querySelector('.js_slider');
        swiper(slider, {
            // options going here
        });
    });
</script>
```

### API

<table>
    <tr>
        <td>prev</td>
        <td>slides to the previous slide</td>
    </tr>
    <tr>
        <td>next</td>
        <td>slides to the next slide</td>
    </tr>
    <tr>
        <td>slideTo</td>
        <td>slides to the index given as an argument: (arguments: index {number})</td>
    </tr>
    <tr>
        <td>returnIndex</td>
        <td>returns the index of the current slide element</td>
    </tr>
    <tr>
        <td>setup</td>
        <td>Binds eventlisteners, merging default and user options, setup the slides based on DOM (called once during initialisation). Call setup if DOM or user options have changed or eventlisteners needs to be rebinded.</td>
    </tr>
    <tr>
        <td>reset</td>
        <td>sets the slider back to the starting position and resets the current index (called on Resize event)</td>
    </tr>
    <tr>
        <td>destroy</td>
        <td>destroys the swiper instance by removing all swiper specific event listeners</td>
    </tr>
</table>

## Options

<table>
    <tr>
        <td>slidesToScroll</td>
        <td>slides scrolled at once</td>
        <td>default: 1</td>
    </tr>
    <tr>
        <td>infinite</td>
        <td>like carousel, works with multiple slides. (do not combine with rewind)</td>
        <td>default: false (number of visible slides)</td>
    </tr>
    <tr>
        <td>enableMouseEvents</td>
        <td>enabled mouse events</td>
        <td>default: false</td>
    </tr>
    <tr>
        <td>rewind</td>
        <td>if slider reached the last slide, with next click the slider goes back to the startindex. (do not combine with infinite)</td>
        <td>default: false</td>
    </tr>
    <tr>
        <td>slideSpeed</td>
        <td>time in milliseconds for the animation of a valid slide attempt</td>
        <td>default: 300</td>
    </tr>
    <tr>
        <td>rewindSpeed</td>
        <td>time in milliseconds for the animation of the rewind after the last slide</td>
        <td>default: 600</td>
    </tr>
    <tr>
        <td>snapBackSpeed</td>
        <td>time for the snapBack of the slider if the slide attempt was not valid</td>
        <td>default: 200</td>
    </tr>
    <tr>
        <td>ease</td>
        <td>cubic bezier easing functions: http://easings.net/de</td>
        <td>default: 'ease'</td>
    </tr>
    <tr>
        <td>classNameFrame</td>
        <td>class name for slider frame</td>
        <td>default: 'js_frame'</td>
    </tr>
    <tr>
        <td>classNameSlideContainer</td>
        <td>class name for slides container</td>
        <td>default: 'js_slides'</td>
    </tr>
    <tr>
        <td>classNamePrevCtrl</td>
        <td>class name for slider previous control</td>
        <td>default: 'js_prev'</td>
    </tr>
    <tr>
        <td>classNameNextCtrl</td>
        <td>class name for slider next control</td>
        <td>default: 'js_next'</td>
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

* Internet Explorer 9 (graceful, without transitions + classlistp)
    - graceful, without transitions
    - you need to polyfill classlist (https://github.com/eligrey/classList.js/)
