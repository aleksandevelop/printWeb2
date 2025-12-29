/*
 * jQuery Nivo Slider v2.7.1 (Modified)
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * March 2010, Modified June 2025
 */
(function ($) {
  // Preload images with dimension checks
  function preloadImages(array, callback) {
      var loadedImages = 0;
      var totalImages = array.length;
      if (!preloadImages.list) {
          preloadImages.list = [];
      }
      for (var i = 0; i < totalImages; i++) {
          var img = new Image();
          img.onload = function () {
              loadedImages++;
              if (loadedImages === totalImages && callback) {
                  callback();
              }
          };
          img.onerror = function () {
              console.error('Failed to load image: ' + img.src);
              loadedImages++;
              if (loadedImages === totalImages && callback) {
                  callback();
              }
          };
          img.src = array[i];
          preloadImages.list.push(img);
      }
  }

  var NivoSlider = function (element, options) {
      // Defaults
      var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

      // Variables
      var vars = {
          currentSlide: 0,
          currentImage: '',
          totalSlides: 0,
          running: false,
          paused: false,
          stop: false
      };

      // Get slider
      var slider = $(element);
      slider.data('nivo:vars', vars);
      slider.css({
          'position': 'relative',
          'width': '100%',
          'height': settings.sliderHeight || '400px',
          'overflow': 'hidden',
          'max-width': '1200px',
          'margin': '0 auto'
      });
      slider.addClass('nivoSlider');

      // Find slider children
      var kids = slider.children();
      kids.each(function () {
          var child = $(this);
          var link = '';
          if (!child.is('img')) {
              if (child.is('a')) {
                  child.addClass('nivo-imageLink');
                  link = child;
              }
              child = child.find('img:first');
          }
          // Set image styles
          child.css({
              'width': '100%',
              'height': '100%',
              'object-fit': 'cover', // Use cover to fill width
              'position': 'absolute',
              'top': '0',
              'left': '0',
              'display': 'none'
          });
          if (link != '') {
              link.css('display', 'none');
          }
          vars.totalSlides++;
      });

      // If randomStart
      if (settings.randomStart) {
          settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
      }

      // Set startSlide
      if (settings.startSlide > 0) {
          if (settings.startSlide >= vars.totalSlides) settings.startSlide = vars.totalSlides - 1;
          vars.currentSlide = settings.startSlide;
      }

      // Get initial image
      if ($(kids[vars.currentSlide]).is('img')) {
          vars.currentImage = $(kids[vars.currentSlide]);
      } else {
          vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
      }

      // Show initial link
      if ($(kids[vars.currentSlide]).is('a')) {
          $(kids[vars.currentSlide]).css('display', 'block');
      }

      // Set first background
      slider.css({
          'background': 'url("' + vars.currentImage.attr('src') + '") no-repeat center center',
          'background-size': 'cover'
      });

      // Create caption
      slider.append(
          $('<div class="nivo-caption"><p></p></div>').css({ display: 'none', opacity: settings.captionOpacity })
      );

      // Caption opacity
      $('.nivo-caption', slider).css('opacity', 0);

      // Process caption
      var processCaption = function (settings) {
          var nivoCaption = $('.nivo-caption', slider);
          if (vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined) {
              var title = vars.currentImage.attr('title');
              if (title.substr(0, 1) == '#') title = $(title).html();
              if (nivoCaption.css('opacity') != 0) {
                  nivoCaption.find('p').stop().fadeTo(settings.animSpeed, 0, function () {
                      $(this).html(title);
                      $(this).stop().fadeTo(settings.animSpeed, 1);
                  });
              } else {
                  nivoCaption.find('p').html(title);
              }
              nivoCaption.stop().fadeTo(settings.animSpeed, settings.captionOpacity);
          } else {
              nivoCaption.stop().fadeTo(settings.animSpeed, 0);
          }
      }

      // Process initial caption
      processCaption(settings);

      // Start slider
      var timer = 0;
      if (!settings.manualAdvance && kids.length > 1) {
          timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
      }

      // Add direction nav
      if (settings.directionNav) {
          slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + settings.prevText + '</a><a class="nivo-nextNav">' + settings.nextText + '</a></div>');

          if (settings.directionNavHide) {
              $('.nivo-directionNav', slider).hide();
              slider.on('mouseenter', function () {
                  $('.nivo-directionNav', slider).show();
              }).on('mouseleave', function () {
                  $('.nivo-directionNav', slider).hide();
              });
          }

          $('a.nivo-prevNav', slider).on('click', function () {
              if (vars.running) return false;
              clearInterval(timer);
              timer = '';
              vars.currentSlide -= 2;
              nivoRun(slider, kids, settings, 'prev');
          });

          $('a.nivo-nextNav', slider).on('click', function () {
              if (vars.running) return false;
              clearInterval(timer);
              timer = '';
              nivoRun(slider, kids, settings, 'next');
          });
      }

      // Add control nav
      if (settings.controlNav) {
          var nivoControl = $('<div class="nivo-controlNav"></div>');
          slider.append(nivoControl);
          for (var i = 0; i < kids.length; i++) {
              if (settings.controlNavThumbs) {
                  var child = kids.eq(i);
                  if (!child.is('img')) {
                      child = child.find('img:first');
                  }
                  if (settings.controlNavThumbsFromRel) {
                      nivoControl.append('<a class="nivo-control" rel="' + i + '"><img src="' + child.attr('rel') + '" alt="" /></a>');
                  } else {
                      nivoControl.append('<a class="nivo-control" rel="' + i + '"><img src="' + child.attr('src').replace(settings.controlNavThumbsSearch, settings.controlNavThumbsReplace) + '" alt="" /></a>');
                  }
              } else {
                  nivoControl.append('<a class="nivo-control" rel="' + i + '">' + (i + 1) + '</a>');
              }
          }
          $('.nivo-controlNav a:eq(' + vars.currentSlide + ')', slider).addClass('active');

          $('a.nivo-control', slider).on('click', function () {
              if (vars.running) return false;
              if ($(this).hasClass('active')) return false;
              clearInterval(timer);
              timer = '';
              vars.currentSlide = parseInt($(this).attr('rel'), 10);
              nivoRun(slider, kids, settings, 'control');
          });
      }

      // Keyboard navigation
      if (settings.keyboardNav) {
          $(window).on('keypress', function (event) {
              if (event.keyCode == '37') {
                  if (vars.running) return false;
                  clearInterval(timer);
                  timer = '';
                  vars.currentSlide -= 2;
                  nivoRun(slider, kids, settings, 'prev');
              }
              if (event.keyCode == '39') {
                  if (vars.running) return false;
                  clearInterval(timer);
                  timer = '';
                  nivoRun(slider, kids, settings, 'next');
              }
          });
      }

      // Pause on hover
      if (settings.pauseOnHover) {
          slider.on('mouseenter', function () {
              vars.paused = true;
              clearInterval(timer);
              timer = '';
          }).on('mouseleave', function () {
              vars.paused = false;
              if (timer == '' && !settings.manualAdvance) {
                  timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
              }
          });
      }

      // Animation finished event
      slider.on('nivo:animFinished', function () {
          vars.running = false;
          $(kids).each(function () {
              if ($(this).is('a')) {
                  $(this).css('display', 'none');
              }
          });
          if ($(kids[vars.currentSlide]).is('a')) {
              $(kids[vars.currentSlide]).css('display', 'block');
          }
          if (timer == '' && !vars.paused && !settings.manualAdvance) {
              timer = setInterval(function () { nivoRun(slider, kids, settings, false); }, settings.pauseTime);
          }
          settings.afterChange.call(this);
      });

      // Create slices for animations
      var createSlices = function (slider, settings, vars) {
          var sliceWidth = Math.round(slider.width() / settings.slices);
          for (var i = 0; i < settings.slices; i++) {
              var leftPos = sliceWidth * i;
              var width = (i === settings.slices - 1) ? (slider.width() - leftPos) : sliceWidth;
              slider.append(
                  $('<div class="nivo-slice"></div>').css({
                      left: leftPos + 'px',
                      width: width + 'px',
                      height: slider.height() + 'px',
                      opacity: '0',
                      background: 'url("' + vars.currentImage.attr('src') + '") no-repeat ' + (-leftPos) + 'px center',
                      'background-size': 'cover',
                      'background-position': 'center center'
                  })
              );
          }
      };

      // Private run method
      var nivoRun = function (slider, kids, settings, nudge) {
          var vars = slider.data('nivo:vars');

          if (vars && (vars.currentSlide == vars.totalSlides - 1)) {
              settings.lastSlide.call(this);
          }

          if ((!vars || vars.stop) && !nudge) return false;

          settings.beforeChange.call(this);

          if (!nudge) {
              slider.css({
                  'background': 'url("' + vars.currentImage.attr('src') + '") no-repeat center center',
                  'background-size': 'cover',
                  'background-position': 'center center'
              });
          } else {
              if (nudge == 'prev' || nudge == 'next') {
                  slider.css({
                      'background': 'url("' + vars.currentImage.attr('src') + '") no-repeat center center',
                      'background-size': 'cover',
                      'background-position': 'center center'
                  });
              }
          }
          vars.currentSlide++;
          if (vars.currentSlide == vars.totalSlides) {
              vars.currentSlide = 0;
              settings.slideshowEnd.call(this);
          }
          if (vars.currentSlide < 0) vars.currentSlide = (vars.totalSlides - 1);
          if ($(kids[vars.currentSlide]).is('img')) {
              vars.currentImage = $(kids[vars.currentSlide]);
          } else {
              vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
          }

          if (settings.controlNav) {
              $('.nivo-controlNav a', slider).removeClass('active');
              $('.nivo-controlNav a:eq(' + vars.currentSlide + ')', slider).addClass('active');
          }

          processCaption(settings);

          $('.nivo-slice', slider).remove();
          $('.nivo-box', slider).remove();

          var currentEffect = settings.effect;
          if (settings.effect == 'random') {
              currentEffect = 'fade';
          }

          if (vars.currentImage.attr('data-transition')) {
              currentEffect = vars.currentImage.attr('data-transition');
          }

          vars.running = true;
          if (currentEffect == 'fade') {
              createSlices(slider, settings, vars);
              var firstSlice = $('.nivo-slice:first', slider);
              firstSlice.css({
                  'height': slider.height() + 'px',
                  'width': slider.width() + 'px',
                  'background-size': 'cover',
                  'background-position': 'center center'
              });
              firstSlice.animate({ opacity: '1.0' }, (settings.animSpeed * 2), '', function () {
                  slider.trigger('nivo:animFinished');
              });
          } else {
              // Fallback to fade
              createSlices(slider, settings, vars);
              var firstSlice = $('.nivo-slice:first', slider);
              firstSlice.css({
                  'height': slider.height() + 'px',
                  'width': slider.width() + 'px',
                  'background-size': 'cover',
                  'background-position': 'center center'
              });
              firstSlice.animate({ opacity: '1.0' }, (settings.animSpeed * 2), '', function () {
                  slider.trigger('nivo:animFinished');
              });
          }
      }

      // For debugging
      var trace = function (msg) {
          if (this.console && typeof console.log != "undefined")
              console.log(msg);
      }

      // Start / Stop
      this.stop = function () {
          if (!$(element).data('nivo:vars').stop) {
              $(element).data('nivo:vars').stop = true;
              trace('Stop Slider');
          }
      }

      this.start = function () {
          if ($(element).data('nivo:vars').stop) {
              $(element).data('nivo:vars').stop = false;
              trace('Start Slider');
          }
      }

      // Trigger afterLoad
      settings.afterLoad.call(this);

      return this;
  };

  $.fn.nivoSlider = function (options) {
      return this.each(function (key, value) {
          var element = $(this);
          if (element.data('nivoslider')) return element.data('nivoslider');
          var nivoslider = new NivoSlider(this, options);
          element.data('nivoslider', nivoslider);
      });
  };

  // Default settings
  $.fn.nivoSlider.defaults = {
      effect: 'fade',
      slices: 15,
      boxCols: 8,
      boxRows: 4,
      animSpeed: 500,
      pauseTime: 3000,
      startSlide: 0,
      directionNav: true,
      directionNavHide: true,
      controlNav: true,
      controlNavThumbs: false,
      controlNavThumbsFromRel: false,
      controlNavThumbsSearch: '.jpg',
      controlNavThumbsReplace: '_thumb.jpg',
      keyboardNav: true,
      pauseOnHover: true,
      manualAdvance: false,
      captionOpacity: 0.8,
      prevText: 'Prev',
      nextText: 'Next',
      randomStart: false,
      sliderHeight: '400px',
      beforeChange: function () {},
      afterChange: function () {},
      slideshowEnd: function () {},
      lastSlide: function () {},
      afterLoad: function () {}
  };

  $.fn._reverse = [].reverse;

})(jQuery);