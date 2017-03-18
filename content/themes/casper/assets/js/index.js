/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        var $socialContainer = $(".social-container");
        var $contentPos = $("#content").last().position();
        var $containerTags = $(".tag-container-list");

        $postContent.fitVids();
        $socialContainer.css('top', $contentPos.top + "px");

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();

        // Navigation open/close

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        // Lettering

        $('.page-title').lettering();

        // Scroll to top

        $(window).scroll(function(){
            if ($(this).scrollTop() > 150) {

                $('.scrollup').fadeIn();

            } else if($(this).scrollTop() == 0){

                $('#rocket').removeClass('move_rocket')
                $('.clouds').addClass('hide')

            }  else {

                $('.scrollup').fadeOut();
            }
        });

        $('.scrollup').click(function(){

            $('.clouds').removeClass('hide');

            $('.cloud_1').addClass('cloud_color');

            $('#rocket').addClass('move_rocket');

            $("html, body").animate({ scrollTop: 0 }, 2000);

            return false;
        });

        // dummy example for scrolling tags container
        $containerTags.scroll(function(event) {
          var $leftArrow = $('.arrow-left');
          var $rightArrow = $('.arrow-right');
          var $width = $(this).width();
          var $maxScroll = $(this).scrollLeft();
          var $lastItemPos = $(this).find('.tag-item').last().position().left;
          var hasReachEnd = ($width + $maxScroll) >= $lastItemPos;
          if ($maxScroll === 0) {
            $leftArrow.hide();
          }
          if (hasReachEnd) {
            $rightArrow.hide();
            $leftArrow.show();
          } else {
            $rightArrow.show();
          }
        });

        // top position for socialContainer when the
        // window is resized
        $(window).bind("resize", function(event) {
          var $contentPosResize = $("#content").last().position();
          if ($socialContainer.css('display') !== "none") {
            $socialContainer.css('top', $contentPosResize.top + "px");
          }
        });
    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');
