jQuery-Parallax
===============

An easy and efficient parallax using translate3d

### Markup

Markup can consist of as many elements as you want. Here we have a background and heading with different speed via data-parallax-speed attribute.

```html
<div class="container">
	<div class="background js-parallax" data-parallax-speed="2"></div>
	<h1 class="js-parallax" data-parallax-speed="5.5">
		Content with different speed than the background
	</h1>
</div>
```

### Initialization

To initialize the plugin, call the parallax method on your selected elements.
```javascript
$('.js-parallax').parallax();
```

### Options

You can configure the default options, by passing an option object to the plugin.
```javascript
$('.js-parallax').parallax({
    scroller: $('body'), // Element which scrolling is relative to. Body is the obvious default.
    speed: 2 // Speed be either set here or with the data-parallax-speed attribute on the html element itself.
});
```
