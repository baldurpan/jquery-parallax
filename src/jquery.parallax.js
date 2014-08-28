/*global window, document, $, jQuery*/
(function ( $ ) {
	"use strict";

	var animating,
		lastTime = 0,
		vendors = ['webkit', 'moz'],
		requestAnimationFrame = window.requestAnimationFrame,
		cancelAnimationFrame = window.cancelAnimationFrame;

	for(lastTime = 0; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
		requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
		cancelAnimationFrame = cancelAnimationFrame ||
			window[ vendors[lastTime] + "CancelAnimationFrame" ] ||
			window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
	}

	function raf() {
		if ( animating ) {
			requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}

	if ( requestAnimationFrame ) {
		// use rAF
		window.requestAnimationFrame = requestAnimationFrame;
		window.cancelAnimationFrame = cancelAnimationFrame;
		jQuery.fx.timer = function( timer ) {
			if ( timer() && jQuery.timers.push( timer ) && !animating ) {
				animating = true;
				raf();
			}
		};

		jQuery.fx.stop = function() {
			animating = false;
		};
	} else {
		// polyfill
		window.requestAnimationFrame = function( callback ) {
			var currTime = new Date().getTime(),
				timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
				id = window.setTimeout( function() {
					callback( currTime + timeToCall );
				}, timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};

		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};

	}

	// Main method
	$.fn.parallax = function(options) {

		var opt = $.extend({
			scroller: $('body'),
			speed: 2
		}, options);

		return this.each(function(){

			var $this = $(this),
				lastScrollY = 0,
				ticking = false,
				loaded = $this.data('parallax-loaded');

			if (!loaded) {

				$(document).on('scroll', opt.scroller, function() {
					lastScrollY = $(this).scrollTop();

					if (!ticking) {
						window.requestAnimationFrame(function() {

							var value = lastScrollY / opt.speed;

							// We don't want parallax to happen if scrollpos is below 0
							if (value < 0) {
								value = 0;
							}

							$this.css('transform', 'translate3d(0px,' + value + 'px, 0px)');

							// Stop ticking
							ticking = false;
						});

						ticking = true;
					}
				});

				$this.data('parallax-loaded', true);
			}
		});
	};

}( jQuery ));
