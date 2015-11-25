/*! fancyBox v2.0.1 fancyapps.com | fancyapps.com/fancybox/#license */
(function(p, m, e) {
    var h = e(p), i = e(m), a = e.fancybox = function() {
        a.open.apply(this, arguments)
    }, n = !1, o = null;
    e.extend(a, {version: "2.0.1", defaults: {padding: 15, margin: 20, width: 800, height: 600, minWidth: 200, minHeight: 200, maxWidth: 9999, maxHeight: 9999, autoSize: !0, fitToView: !0, aspectRatio: !1, topRatio: 0.5, fixed: !e.browser.msie || 6 < e.browser.version, scrolling: "auto", wrapCSS: "fancybox-default", arrows: !0, closeBtn: !0, closeClick: !0, mouseWheel: !0, autoPlay: !1, playSpeed: 3E3, loop: !0, ajax: {}, keys: {next: [13, 32, 34, 39, 40], prev: [8,
                    33, 37, 38], close: [27]}, index: 0, type: null, href: null, content: null, title: null, tpl: {wrap: '<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>', image: '<img class="fancybox-image" src="{href}" alt="" />', iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" ' + (e.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="{scrolling}" src="{href}"></iframe>', swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>', closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>', next: '<a title="Next" class="fancybox-item fancybox-next"><span></span></a>', prev: '<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'}, openEffect: "fade", openSpeed: 500, openEasing: "swing", openOpacity: !0, openMethod: "zoomIn", closeEffect: "fade", closeSpeed: 500, closeEasing: "swing", closeOpacity: !0, closeMethod: "zoomOut",
            nextEffect: "elastic", nextSpeed: 300, nextEasing: "swing", nextMethod: "changeIn", prevEffect: "elastic", prevSpeed: 300, prevEasing: "swing", prevMethod: "changeOut", helpers: {overlay: {speedIn: 0, speedOut: 0, opacity: 0.85, css: {cursor: "pointer", "background-color": "rgba(0, 0, 0, 0.85)"}, closeClick: !0}, title: {type: "float"}}}, group: {}, opts: {}, coming: null, current: null, isOpen: !1, isOpened: !1, wrap: null, outer: null, inner: null, player: {timer: null, isActive: !1}, ajaxLoad: null, imgPreload: null, transitions: {}, helpers: {}, open: function(b,
                c) {
            e.isArray(b) || (b = [b]);
            if (b.length)
                a.close(!0), a.opts = e.extend(!0, {}, a.defaults, c), a.group = b, a._start(a.opts.index || 0)
        }, cancel: function() {
            if (!(a.coming && !1 === a.trigger("onCancel")) && (a.coming = null, a.hideLoading(), a.ajaxLoad && a.ajaxLoad.abort(), a.ajaxLoad = null, a.imgPreload))
                a.imgPreload.onload = a.imgPreload.onabort = a.imgPreload.onerror = null
        }, close: function(b) {
            a.cancel();
            if (a.current && !1 !== a.trigger("beforeClose"))
                !a.isOpen || b && !0 === b[0] ? (e(".fancybox-wrap").stop().trigger("onReset").remove(), a._afterZoomOut()) :
                        (a.isOpen = a.isOpened = !1, e(".fancybox-item").remove(), a.wrap.stop(!0).removeClass("fancybox-opened"), a.inner.css("overflow", "hidden"), a.transitions[a.current.closeMethod]())
        }, play: function(b) {
            var c = function() {
                clearTimeout(a.player.timer)
            }, d = function() {
                c();
                if (a.current && a.player.isActive)
                    a.player.timer = setTimeout(a.next, a.current.playSpeed)
            }, f = function() {
                c();
                i.unbind(".player");
                a.player.isActive = !1;
                a.trigger("onPlayEnd")
            };
            if (a.player.isActive || b && !1 === b[0])
                f();
            else if (a.current && (a.current.loop || a.current.index <
                    a.group.length - 1))
                a.player.isActive = !0, d(), i.bind({"onCancel.player onComplete.player onUpdate.player": d, "onClose.player": f, "onStart.player": c}), a.trigger("onPlayStart")
        }, next: function() {
            a.current && a.jumpto(a.current.index + 1)
        }, prev: function() {
            a.current && a.jumpto(a.current.index - 1)
        }, jumpto: function(b) {
            a.current && (b = parseInt(b, 10), 1 < a.group.length && a.current.loop && (b >= a.group.length ? b = 0 : 0 > b && (b = a.group.length - 1)), "undefined" !== typeof a.group[b] && (a.cancel(), a._start(b)))
        }, reposition: function(b) {
            a.isOpen &&
                    a.wrap.css(a._getPosition(b))
        }, update: function() {
            a.isOpen && (n || (o = setInterval(function() {
                if (n && (n = !1, clearTimeout(o), a.current)) {
                    if (a.current.autoSize)
                        a.inner.height("auto"), a.current.height = a.inner.height();
                    a._setDimension();
                    a.current.canGrow && a.inner.height("auto");
                    a.reposition();
                    a.trigger("onUpdate")
                }
            }, 100)), n = !0)
        }, toggle: function() {
            if (a.isOpen)
                a.current.fitToView = !a.current.fitToView, a.update()
        }, hideLoading: function() {
            e("#fancybox-loading").remove()
        }, showLoading: function() {
            a.hideLoading();
            e('<div id="fancybox-loading"></div>').click(a.cancel).appendTo("body")
        },
        getViewport: function() {
            return{x: h.scrollLeft(), y: h.scrollTop(), w: h.width(), h: h.height()}
        }, unbindEvents: function() {
            i.unbind(".fb");
            h.unbind(".fb")
        }, bindEvents: function() {
            var b = a.current, c = b.keys;
            b && (h.bind("resize.fb, orientationchange.fb", a.update), c && i.bind("keydown.fb", function(b) {
                -1 < e.inArray(b.target.tagName.toLowerCase(), ["input", "textarea", "select", "button"]) || (-1 < e.inArray(b.keyCode, c.close) ? (a.close(), b.preventDefault()) : -1 < e.inArray(b.keyCode, c.next) ? (a.next(), b.preventDefault()) : -1 < e.inArray(b.keyCode,
                        c.prev) && (a.prev(), b.preventDefault()))
            }), e.fn.mousewheel && b.mouseWheel && 1 < a.group.length && a.wrap.bind("mousewheel.fb", function(b, c) {
                if (0 === e(b.target).get(0).clientHeight || e(b.target).get(0).scrollHeight === e(b.target).get(0).clientHeight)
                    b.preventDefault(), a[0 < c ? "prev" : "next"]()
            }))
        }, trigger: function(b) {
            var c, d = -1 < e.inArray(b, ["onCancel", "beforeLoad", "afterLoad"]) ? "coming" : "current";
            if (a[d]) {
                e.isFunction(a[d][b]) && (c = a[d][b].apply(a[d], Array.prototype.slice.call(arguments, 1)));
                if (!1 === c)
                    return!1;
                a[d].helpers && e.each(a[d].helpers, function(c, d) {
                    if (d && "undefined" !== typeof a.helpers[c] && e.isFunction(a.helpers[c][b]))
                        a.helpers[c][b](d)
                });
                e.event.trigger(b + ".fb")
            }
        }, isImage: function(a) {
            return a && a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)
        }, isSWF: function(a) {
            return a && a.match(/\.(swf)(.*)?$/i)
        }, _start: function(b) {
            var c = a.group[b] || null, d, f, g;
            coming = e.extend(!0, {}, a.opts, e.isPlainObject(c) ? c : {}, {index: b, element: c});
            if ("number" === typeof coming.margin)
                coming.margin = [coming.margin, coming.margin, coming.margin,
                    coming.margin];
            a.coming = coming;
            if (!1 === a.trigger("beforeLoad"))
                a.coming = null;
            else {
                if (coming.content)
                    c = coming.content;
                if ("object" == typeof c && (c.nodeType || c instanceof e))
                    d = !0, coming.href = e(c).attr("href") || coming.href, coming.title = e(c).attr("title") || coming.title;
                f = coming.type;
                b = coming.href;
                c = coming.element;
                if (!f) {
                    if (b)
                        d && (g = e(c).data("fancybox-type"), !g && c.className && (g = (g = c.className.match(/fancybox\.(\w+)/)) ? g[1] : !1)), g ? f = g : a.isImage(b) ? f = "image" : a.isSWF(b) ? f = "swf" : b.match(/^#/) ? f = "inline" : coming.content =
                                b;
                    f || (f = d ? "inline" : "html");
                    coming.type = f
                }
                if (!coming.content)
                    coming.content = "inline" === f && b ? e(b) : c;
                a.coming = coming;
                "image" === f ? a._loadImage() : "ajax" === f ? a._loadAjax() : !f || "inline" === f && !coming.content.length ? a._error() : a._afterLoad()
            }
        }, _error: function() {
            a.coming.type = "html";
            a.coming.minHeight = 0;
            a.coming.autoSize = !0;
            a.coming.content = a.coming.tpl.error;
            a._afterLoad()
        }, _loadImage: function() {
            a.imgPreload = new Image;
            a.imgPreload.onload = function() {
                this.onload = this.onerror = null;
                a.coming.width = this.width;
                a.coming.height =
                        this.height;
                a._afterLoad()
            };
            a.imgPreload.onerror = function() {
                this.onload = this.onerror = null;
                a._error()
            };
            a.imgPreload.src = a.coming.href;
            a.imgPreload.complete || a.showLoading()
        }, _loadAjax: function() {
            a.showLoading();
            a.ajaxLoad = e.ajax(e.extend({}, a.coming.ajax, {url: a.coming.href, error: function(b, c, d) {
                    "abort" !== c && 0 < b.status ? (a.coming.content = d, a._error()) : a.hideLoading()
                }, success: function(b, c) {
                    if ("success" === c)
                        a.coming.content = b, a._afterLoad()
                }}))
        }, _afterLoad: function() {
            a.hideLoading();
            if (!a.coming || !1 ===
                    a.trigger("afterLoad", a.current))
                a.coming = !1;
            else if (a.isOpened ? (e(".fancybox-item").remove(), a.wrap.stop(!0).removeClass("fancybox-opened"), a.transitions[a.current.prevMethod]()) : e(".fancybox-wrap").stop().trigger("onReset").remove(), a.isOpen = !1, a.current = a.coming, a.coming = !1, a.wrap = e(a.current.tpl.wrap).addClass(a.current.wrapCSS).appendTo("body"), a.outer = e(".fancybox-outer", a.wrap).css("padding", a.current.padding + "px"), a.inner = e(".fancybox-inner", a.wrap), a._setContent(), a.unbindEvents(), a.bindEvents(),
                    a.trigger("beforeShow"), a._setDimension(), a.isOpened)
                a.transitions[a.current.nextMethod]();
            else
                a.transitions[a.current.openMethod]()
        }, _setContent: function() {
            var b, c, d = a.current, f = d.type;
            switch (f) {
                case "inline":
                case "ajax":
                case "html":
                    "inline" === f ? (b = d.content.show().detach(), b.parent().hasClass("fancybox-inner") && b.parents(".fancybox-wrap").trigger("onReset").remove(), e(a.wrap).bind("onReset", function() {
                        b.appendTo("body").hide()
                    })) : b = d.content;
                    if (d.autoSize)
                        c = e('<div class="fancybox-tmp"></div>').appendTo(e("body")).append(b),
                                d.width = c.outerWidth(), d.height = c.outerHeight(!0), b = c.children().detach(), c.remove();
                    break;
                case "image":
                    b = d.tpl.image.replace("{href}", d.href);
                    d.aspectRatio = !0;
                    break;
                case "swf":
                    b = d.tpl.swf.replace(/\{width\}/g, d.width).replace(/\{height\}/g, d.height).replace(/\{href\}/g, d.href);
                    break;
                case "iframe":
                    b = d.tpl.iframe.replace("{href}", d.href).replace("{scrolling}", d.scrolling).replace("{rnd}", (new Date).getTime())
            }
            if (-1 < e.inArray(f, ["image", "swf", "iframe"]))
                d.autoSize = !1, d.scrolling = !1;
            a.current = d;
            a.inner.append(b)
        },
        _setDimension: function() {
            var b = a.getViewport(), c = a.current.margin, d = 2 * a.current.padding, f = a.current.width + d, g = a.current.height + d, j = a.current.width / a.current.height, l = a.current.maxWidth, k = a.current.maxHeight, h = a.current.minWidth, i = a.current.minHeight;
            b.w -= c[1] + c[3];
            b.h -= c[0] + c[2];
            -1 < f.toString().indexOf("%") && (f = b.w * parseFloat(f) / 100);
            -1 < g.toString().indexOf("%") && (g = b.h * parseFloat(g) / 100);
            a.current.fitToView && (l = Math.min(b.w, l), k = Math.min(b.h, k));
            l = Math.max(h, l);
            k = Math.max(i, k);
            a.current.aspectRatio ?
                    (f > l && (f = l, g = (f - d) / j + d), g > k && (g = k, f = (g - d) * j + d), f < h && (f = h, g = (f - d) / j + d), g < i && (g = i, f = (g - d) * j + d)) : (f = Math.max(h, Math.min(f, l)), g = Math.max(i, Math.min(g, k)));
            f = Math.round(f);
            g = Math.round(g);
            e(a.wrap.add(a.outer).add(a.inner)).width("auto").height("auto");
            a.inner.width(f - d).height(g - d);
            a.wrap.width(f);
            c = a.wrap.height();
            if (f > l || c > k)
                for (; (f > l || c > k) && f > h && c > i; )
                    g -= 10, a.current.aspectRatio ? (f = Math.round((g - d) * j + d), f < h && (f = h, g = (f - d) / j + d)) : f -= 10, a.inner.width(f - d).height(g - d), a.wrap.width(f), c = a.wrap.height();
            a.current.dim = {width: f, height: c};
            a.current.canGrow = a.current.autoSize && g > i && g < k;
            a.current.canShrink = !1;
            a.current.canExpand = !1;
            if (f - d < a.current.width || g - d < a.current.height)
                a.current.canExpand = !0;
            else if ((f > b.w || c > b.h) && f > h && g > i)
                a.current.canShrink = !0
        }, _getPosition: function(b) {
            var c = a.getViewport(), d = a.current.margin, f = a.wrap.width() + d[1] + d[3], e = a.wrap.height() + d[0] + d[2], j = {position: "absolute", top: d[0] + c.y, left: d[3] + c.x};
            if (a.current.fixed && (!b || !1 === b[0]) && e <= c.h && f <= c.w)
                j = {position: "fixed", top: d[0],
                    left: d[3]};
            j.top = Math.ceil(Math.max(j.top, j.top + (c.h - e) * a.current.topRatio)) + "px";
            j.left = Math.ceil(Math.max(j.left, j.left + 0.5 * (c.w - f))) + "px";
            return j
        }, _afterZoomIn: function() {
            var b = a.current;
            a.isOpen = a.isOpened = !0;
            a.wrap.addClass("fancybox-opened").css("overflow", "visible");
            a.update();
            a.inner.css("overflow", "auto" === b.scrolling ? "auto" : "yes" === b.scrolling ? "scroll" : "hidden");
            b.closeClick && a.inner.bind("click.fb", a.close);
            b.closeBtn && e(a.current.tpl.closeBtn).appendTo(a.wrap).bind("click.fb", a.close);
            b.arrows && 1 < a.group.length && ((b.loop || 0 < b.index) && e(b.tpl.prev).appendTo(a.wrap).bind("click.fb", a.prev), (b.loop || b.index < a.group.length - 1) && e(b.tpl.next).appendTo(a.wrap).bind("click.fb", a.next));
            a.trigger("afterShow");
            if (a.opts.autoPlay && !a.player.isActive)
                a.opts.autoPlay = !1, a.play()
        }, _afterZoomOut: function() {
            a.unbindEvents();
            a.trigger("afterClose");
            a.wrap.trigger("onReset").remove();
            e.extend(a, {group: {}, opts: {}, current: null, isOpened: !1, isOpen: !1, wrap: null, outer: null, inner: null})
        }});
    a.transitions =
            {getOrigPosition: function() {
                    var b = a.current.element, c = {}, d = 50, f = 50, g;
                    b && b.nodeName && e(b).is(":visible") ? (g = e(b).find("img:first"), g.length ? (c = g.offset(), d = g.outerWidth(), f = g.outerHeight()) : c = e(b).offset()) : (b = a.getViewport(), c.top = b.y + 0.5 * (b.h - f), c.left = b.x + 0.5 * (b.w - d));
                    return c = {top: Math.ceil(c.top) + "px", left: Math.ceil(c.left) + "px", width: Math.ceil(d) + "px", height: Math.ceil(f) + "px"}
                }, step: function(b, c) {
                    var d, f, e;
                    if ("width" === c.prop || "height" === c.prop)
                        f = e = Math.ceil(b - 2 * a.current.padding), "height" ===
                                c.prop && (d = (b - c.start) / (c.end - c.start), c.start > c.end && (d = 1 - d), f -= a.innerSpace * d, e -= a.outerSpace * d), a.inner[c.prop](f), a.outer[c.prop](e)
                }, zoomIn: function() {
                    var b, c;
                    b = a.current.dim;
                    c = b.height - 2 * a.current.padding;
                    a.innerSpace = c - a.inner.height();
                    a.outerSpace = c - a.outer.height();
                    if ("elastic" === a.current.openEffect) {
                        c = e.extend({}, b, a._getPosition(!0));
                        delete c.position;
                        b = this.getOrigPosition();
                        if (a.current.openOpacity)
                            b.opacity = 0, c.opacity = 1;
                        a.wrap.css(b).animate(c, {duration: a.current.openSpeed, easing: a.current.openEasing,
                            step: this.step, complete: a._afterZoomIn})
                    } else
                        a.wrap.css(e.extend({}, a.current.dim, a._getPosition())), "fade" === a.current.openEffect ? a.wrap.hide().fadeIn(a.current.openSpeed, a._afterZoomIn) : a._afterZoomIn()
                }, zoomOut: function() {
                    var b;
                    b = a.wrap.height() - 2 * a.current.padding;
                    if ("elastic" === a.current.closeEffect) {
                        "fixed" === a.wrap.css("position") && a.wrap.css(a._getPosition(!0));
                        a.innerSpace = b - a.inner.height();
                        a.outerSpace = b - a.outer.height();
                        b = this.getOrigPosition();
                        if (a.current.closeOpacity)
                            b.opacity = 0;
                        a.wrap.animate(b,
                                {duration: a.current.closeSpeed, easing: a.current.closeEasing, step: this.step, complete: a._afterZoomOut})
                    } else
                        a.wrap.fadeOut("fade" === a.current.closeEffect ? a.current.Speed : 0, a._afterZoomOut)
                }, changeIn: function() {
                    var b;
                    "elastic" === a.current.nextEffect ? (b = a._getPosition(!0), b.opacity = 0, b.top = parseInt(b.top, 10) - 200 + "px", a.wrap.css(b).animate({opacity: 1, top: "+=200px"}, {duration: a.current.nextSpeed, complete: a._afterZoomIn})) : (a.wrap.css(a._getPosition()), "fade" === a.current.nextEffect ? a.wrap.hide().fadeIn(a.current.nextSpeed,
                            a._afterZoomIn) : a._afterZoomIn())
                }, changeOut: function() {
                    function b() {
                        e(this).trigger("onReset").remove()
                    }
                    a.wrap.removeClass("fancybox-opened");
                    "elastic" === a.current.prevEffect ? a.wrap.animate({opacity: 0, top: "+=200px"}, {duration: a.current.prevSpeed, complete: b}) : a.wrap.fadeOut("fade" === a.current.prevEffect ? a.current.prevSpeed : 0, b)
                }};
    a.helpers.overlay = {overlay: null, update: function() {
            var a, c;
            this.overlay.width(0).height(0);
            e.browser.msie ? (a = Math.max(m.documentElement.scrollWidth, m.body.scrollWidth), c =
                    Math.max(m.documentElement.offsetWidth, m.body.offsetWidth), a = a < c ? h.width() : a) : a = i.width();
            this.overlay.width(a).height(i.height())
        }, beforeShow: function(b) {
            if (!this.overlay)
                this.overlay = e('<div id="fancybox-overlay"></div>').css(b.css || {background: "black"}).appendTo("body"), b.closeClick && this.overlay.bind("click.fb", a.close), h.bind("resize.fb", e.proxy(this.update, this)), this.update(), this.overlay.fadeTo(b.speedIn || "fast", b.opacity || 1)
        }, onUpdate: function() {
            this.update()
        }, afterClose: function(a) {
            this.overlay &&
                    this.overlay.fadeOut(a.speedOut || "fast", function() {
                        e(this).remove()
                    });
            this.overlay = null
        }};
    a.helpers.title = {beforeShow: function(b) {
            var c;
            if (c = a.current.title || a.current.element.title || "")
                c = e('<div class="fancybox-title fancybox-title-' + b.type + '-wrap">' + c + "</div>").appendTo("body"), "float" === b.type && (c.width(c.width()), c.wrapInner('<span class="child"></span>'), a.current.margin[2] += Math.abs(parseInt(c.css("margin-bottom"), 10))), c.appendTo("over" === b.type ? a.inner : "outside" === b.type ? a.wrap : a.outer)
        }};
    e.fn.fancybox = function(b) {
        function c(b) {
            var c = [];
            b.preventDefault();
            this.rel && "" !== this.rel && "nofollow" !== this.rel && (c = f.length ? e(f).filter('[rel="' + this.rel + '"]') : e('[rel="' + this.rel + '"]'));
            c.length ? (d.index = c.index(this), a(c.get(), d)) : a(this, d);
            return!1
        }
        var d = b || {}, f = this.selector || "";
        f ? i.undelegate(f, "click.fb-start").delegate(f, "click.fb-start", c) : e(this).unbind("click.fb-start").bind("click.fb-start", c)
    }
})(window, document, jQuery);