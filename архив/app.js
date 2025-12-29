(function (jQuery) {
    jQuery(document).ready(function () {
        // Debug logs
        console.log('jQuery version:', jQuery.fn.jquery);
        console.log('jQuery and $ are the same:', window.jQuery === window.$);
        console.log('Nivo Slider plugin available:', typeof jQuery.fn.nivoSlider === 'function');

        // Remove no-js class
        jQuery('html').removeClass('no-js');

        // Module connectors configuration
        jQuery('.mod').each(function () {
            jQuery(this).attr('data-connectors', '1');
        });

        // Delivery type input focus handlers
        jQuery('.delivery_type').on('focus', function () {
            jQuery(this).next('div').css({ 'opacity': 1, 'z-index': 1 });
        });

        jQuery('.delivery_type').on('focusout', function () {
            jQuery(this).next('div').css({ 'opacity': 0, 'z-index': -1 });
        });

        // Preload images and initialize Nivo Slider
        var images = [
            'images/nivo-slider/slider_1.jpg',
            'images/nivo-slider/slider_2.jpg',
            'images/nivo-slider/slider_3.jpg'
        ];

        function preloadImages(array, callback) {
            var loadedImages = 0;
            var totalImages = array.length;
            console.log('Preloading images:', array);
            for (var i = 0; i < totalImages; i++) {
                var img = new Image();
                img.onload = function () {
                    console.log('Image loaded:', img.src);
                    loadedImages++;
                    if (loadedImages === totalImages && callback) {
                        callback();
                    }
                };
                img.onerror = function () {
                    console.error('Error loading image:', img.src);
                    loadedImages++;
                    if (loadedImages === totalImages && callback) {
                        callback();
                    }
                };
                img.src = array[i];
            }
        }

        preloadImages(images, function () {
            var $slider = jQuery('.nivoSlider');
            if ($slider.length) {
                if (typeof jQuery.fn.nivoSlider === 'function') {
                    console.log('Initializing Nivo Slider');
                    try {
                        $slider.nivoSlider({
                            effect: 'fade',
                            animSpeed: 500,
                            pauseTime: 3000,
                            startSlide: 0,
                            directionNav: true,
                            controlNav: true,
                            pauseOnHover: true,
                            manualAdvance: false,
                            sliderHeight: '400px',
                            afterLoad: function () {
                                // console.log('Nivo Slider loaded');
                            },
                            beforeChange: function () {
                                // console.log('Slide changing');
                            },
                            afterChange: function () {
                                // console.log('Slide changed');
                            }
                        });
                        console.log('Nivo Slider initialized successfully');
                    } catch (e) {
                        console.error('Error initializing Nivo Slider:', e);
                    }
                } else {
                    console.error('Nivo Slider plugin not loaded. Displaying static image as fallback.');
                    $slider.addClass('nivo-failed');
                }
            } else {
                console.error('Slider element (.nivoSlider) not found in DOM');
            }
        });

        // Reinitialize slider on window load
        jQuery(window).on('load', function () {
            console.log('Window loaded');
            var slider = jQuery('.nivoSlider').data('nivoslider');
            if (slider) {
                slider.stop();
                slider.start();
                console.log('Nivo Slider reinitialized on window load');
            } else {
                console.warn('Slider not initialized on window load');
            }
        });

        // Terrific.js initialization (moved to end)
        var $page = jQuery('body');
        var config = {
            dependencyPath: {
                plugin: 'javascripts/'
            }
        };
        var application = new Tc.Application($page, config);
        application.registerModules();
        application.start();
        console.log('Terrific.js initialized');
    });

    // Extend Tc.Module Class
    Tc.Module = Tc.Module.extend({
        onInitStyle: function (data) {
            var $ctx = this.$ctx;
            if (data['color_scheme']) {
                $ctx.removeClass(/colorScheme.+/);
                $ctx.addClass("colorScheme" + Tc.Utils.String.capitalize(data['color_scheme']));
            }
        }
    });

    // Random color utility
    jQuery.extend({
        randomColor: function () {
            return '#' + Math.floor(Math.random() * 256 * 256 * 256).toString(16);
        }
    });

    // Custom removeClass
    (function (removeClass) {
        jQuery.fn.removeClass = function (value) {
            if (value && typeof value.test === 'function') {
                for (var i = 0; i < this.length; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        var classNames = elem.className.split(/\s+/);
                        for (var n = 0; n < classNames.length; n++) {
                            if (value.test(classNames[n])) {
                                classNames.splice(n, 1);
                            }
                        }
                        elem.className = jQuery.trim(classNames.join(" "));
                    }
                }
            } else {
                removeClass.call(this, value);
            }
            return this;
        };
    })(jQuery.fn.removeClass);

    // Terrific.js Modules
    Tc.Module.BlogNav = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.BlogNews = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.BlogPost = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.CaseStudy = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.CommentForm = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.ContactInfo = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.ContactUs = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {
            this.require('jquery.validate.js', 'plugin', 'onBinding');
        },
        onBinding: function () {
            var $ctx = this.$ctx;
            jQuery('form', $ctx).validate({
                messages: { name: null, email: null, message: null },
                submitHandler: function (form) {
                    jQuery.ajax({
                        type: 'POST',
                        url: 'send.php',
                        data: jQuery(form).serialize(),
                        success: function (data) {
                            if (data.match(/success/)) {
                                jQuery(form).trigger('reset');
                                jQuery('.thanks', $ctx).show().fadeOut(10000);
                            }
                        }
                    });
                    return false;
                }
            });
        }
    });

    Tc.Module.Gallery = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
            jQuery('ul.works li', $ctx).each(function () {
                if (jQuery.browser.msie && jQuery.browser.version == '7.0') {
                    var width = jQuery('.image-wrapper', this).outerWidth();
                    jQuery('>p', this).width(width);
                }
            });
            jQuery('ul.filter > li > a', $ctx).click(function () {
                jQuery('ul.filter .current', $ctx).removeClass('current');
                jQuery(this).addClass('current');
                var filter = jQuery(this).text();
                if (filter == 'All') {
                    jQuery('ul.works > li *.hidden', $ctx).stop().animate({ "opacity": 1 }, 1000).removeClass('hidden');
                } else {
                    jQuery('ul.works > li', $ctx).each(function () {
                        if (jQuery(this).hasClass(filter)) {
                            jQuery('*', this).stop().animate({ "opacity": 1 }, 1000).removeClass('hidden');
                        } else {
                            jQuery('*', this).stop().animate({ "opacity": 0.1 }, 1000).addClass('hidden');
                        }
                    });
                }
                return false;
            });
        }
    });

    Tc.Module.GetInTouch = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {
            this.require('jquery.validate.js', 'plugin', 'onBinding');
            this.require('jquery.placeholder.min.js', 'plugin', 'onBinding');
        },
        onBinding: function () {
            var $ctx = this.$ctx;
            jQuery('input, textarea', $ctx).placeholder();
            jQuery('form', $ctx).validate({
                messages: { name: null, email: null, message: null },
                submitHandler: function (form) {
                    jQuery.ajax({
                        type: 'POST',
                        url: 'send.php',
                        data: jQuery(form).serialize(),
                        success: function (data) {
                            if (data.match(/success/)) {
                                jQuery(form).hide().trigger('reset');
                                jQuery('.thanks', $ctx).fadeIn(3000);
                            }
                        }
                    });
                    return false;
                }
            });
        }
    });

    Tc.Module.Links = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.Logo = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.Nav = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onInitStyle: function (data) {
            var $ctx = this.$ctx;
            this._super(data);
            var $current = jQuery('.current', $ctx);
        },
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.SectionHeader = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onInitStyle: function (data) {
            var $ctx = this.$ctx;
            jQuery('h3', $ctx).css('backgroundImage', jQuery('body').css('backgroundImage'));
            this._super(data);
        },
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.Services = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.SidebarWidget = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.Social = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.StylePanel = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {
            this.require('jquery.cookie.js', 'plugin', 'onBinding');
            this.require('json2.js', 'plugin', 'onBinding');
            this.require('jquery.url.js', 'plugin', 'onBinding');
        },
        setCookie: function (key, value) {
            var cookie = JSON.parse(jQuery.cookie('vagenta_html')) || {};
            cookie[key] = value;
            jQuery.cookie('vagenta_html', JSON.stringify(cookie));
        },
        readCookie: function (key) {
            var cookie = JSON.parse(jQuery.cookie('vagenta_html')) || {};
            if (key) {
                return cookie[key];
            } else {
                return cookie;
            }
        },
        reloadMod: function () {
            jQuery('.ie8 .mod *').each(function () {
                var klass = jQuery(this).attr('class');
                jQuery(this).attr('class', klass);
            });
        },
        afterBinding: function () {
            var $ctx = this.$ctx;
            if (this.readCookie('bg_pattern')) {
                jQuery('body').removeClass(/pattern\-\d+/);
                jQuery('body').addClass(this.readCookie('bg_pattern'));
            }
            if (this.readCookie('color_scheme')) {
                jQuery('body').removeClass(/colorScheme.+/);
                jQuery('body').addClass("colorScheme" + Tc.Utils.String.capitalize(this.readCookie('color_scheme')));
            }
            this.fire('initStyle', this.readCookie());
            this.reloadMod();
            if (jQuery.url().param('screenshot')) {
                $ctx.hide();
            }
        },
        onBinding: function () {
            var $ctx = this.$ctx;
            var that = this;
            jQuery('.panel-container').find('.bg_pattern').click(function () {
                that.setCookie('bg_pattern', jQuery(this).attr('id'));
                that.afterBinding();
                return false;
            });
            jQuery('.panel-container').find('.color_scheme').click(function () {
                that.setCookie('color_scheme', jQuery(this).attr('id'));
                that.afterBinding();
                return false;
            });
            jQuery('.switch', $ctx).toggle(
                function () {
                    jQuery(this).removeClass('to-open');
                    jQuery(this).addClass('to-close');
                    $ctx.stop().animate({ "left": jQuery('.panel-container', $ctx).outerWidth() }, { duration: 800 });
                },
                function () {
                    jQuery(this).removeClass('to-close');
                    jQuery(this).addClass('to-open');
                    $ctx.stop().animate({ "left": "0px" }, { duration: 800 });
                }
            );
        }
    });

    Tc.Module.Tagline = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {},
        onBinding: function () {
            var $ctx = this.$ctx;
        }
    });

    Tc.Module.Testimonials = Tc.Module.extend({
        init: function ($ctx, sandbox, modId) {
            this._super($ctx, sandbox, modId);
        },
        dependencies: function () {
            this.require('slides.jquery.js', 'plugin', 'onBinding');
        },
        onBinding: function () {
            var $ctx = this.$ctx;
            jQuery($ctx).slides({
                container: 'testimonials',
                effect: jQuery.browser.msie ? 'slide' : 'fade',
                fadeSpeed: 1000,
                play: 5000,
                autoHeight: true
            });
        }
    });
})(window.jQuery171 || jQuery);