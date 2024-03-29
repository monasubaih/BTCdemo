// Knockout JavaScript library v3.0.0beta
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {
    function F(p) {
        return function() {
            return p
        }
    }
    ;
    (function(p) {
        var w = this || (0, eval)("this"), u = w.document, G = w.navigator, t = w.jQuery, B = w.JSON;
        (function(p) {
            "function" === typeof require && "object" === typeof exports && "object" === typeof module ? p(module.exports || exports) : "function" === typeof define && define.amd ? define(["exports"], p) : p(w.ko = {})
        })(function(C) {
            function E(b, c, d, e) {
                a.d[b] = {init: function(b) {
                        a.a.f.set(b, H, {});
                        return{controlsDescendantBindings: !0}
                    }, update: function(b, f, l, k, h) {
                        l = a.a.f.get(b, H);
                        f = a.a.c(f());
                        k = !d !== !f;
                        var n = !l.jb;
                        if (n || c || k !== l.Bb)
                            n && (l.jb =
                                    a.a.Ta(a.e.childNodes(b), !0)), k ? (n || a.e.R(b, a.a.Ta(l.jb)), a.Qa(e ? e(h, f) : h, b)) : a.e.ga(b), l.Bb = k
                    }};
                a.g.W[b] = !1;
                a.e.N[b] = !0
            }
            var a = "undefined" !== typeof C ? C : {};
            a.b = function(b, c) {
                for (var d = b.split("."), e = a, g = 0; g < d.length - 1; g++)
                    e = e[d[g]];
                e[d[d.length - 1]] = c
            };
            a.s = function(a, c, d) {
                a[c] = d
            };
            a.version = "3.0.0beta";
            a.b("version", a.version);
            a.a = function() {
                function b(a, b) {
                    for (var h in a)
                        a.hasOwnProperty(h) && b(h, a[h])
                }
                function c(b, k) {
                    if ("input" !== a.a.v(b) || !b.type || "click" != k.toLowerCase())
                        return!1;
                    var h = b.type;
                    return"checkbox" ==
                            h || "radio" == h
                }
                var d = {}, e = {};
                d[G && /Firefox\/2/i.test(G.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"];
                d.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
                b(d, function(a, b) {
                    if (b.length)
                        for (var h = 0, c = b.length; h < c; h++)
                            e[b[h]] = a
                });
                var g = {propertychange: !0}, f = u && function() {
                    for (var a = 3, b = u.createElement("div"), h = b.getElementsByTagName("i"); b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e", h[0]; )
                        ;
                    return 4 < a ? a :
                            p
                }();
                return{Xa: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/], m: function(a, b) {
                        for (var h = 0, c = a.length; h < c; h++)
                            b(a[h])
                    }, k: function(a, b) {
                        if ("function" == typeof Array.prototype.indexOf)
                            return Array.prototype.indexOf.call(a, b);
                        for (var h = 0, c = a.length; h < c; h++)
                            if (a[h] === b)
                                return h;
                        return-1
                    }, Ra: function(a, b, h) {
                        for (var c = 0, d = a.length; c < d; c++)
                            if (b.call(h, a[c]))
                                return a[c];
                        return null
                    }, fa: function(b, c) {
                        var h = a.a.k(b, c);
                        0 <= h && b.splice(h, 1)
                    }, Sa: function(b) {
                        b = b || [];
                        for (var c = [], h = 0, d = b.length; h < d; h++)
                            0 >
                                    a.a.k(c, b[h]) && c.push(b[h]);
                        return c
                    }, ea: function(a, b) {
                        a = a || [];
                        for (var c = [], d = 0, f = a.length; d < f; d++)
                            c.push(b(a[d]));
                        return c
                    }, da: function(a, b) {
                        a = a || [];
                        for (var c = [], d = 0, f = a.length; d < f; d++)
                            b(a[d]) && c.push(a[d]);
                        return c
                    }, V: function(a, b) {
                        if (b instanceof Array)
                            a.push.apply(a, b);
                        else
                            for (var c = 0, d = b.length; c < d; c++)
                                a.push(b[c]);
                        return a
                    }, T: function(b, c, h) {
                        var d = a.a.k(a.a.Fa(b), c);
                        0 > d ? h && b.push(c) : h || b.splice(d, 1)
                    }, extend: function(a, b) {
                        if (b)
                            for (var c in b)
                                b.hasOwnProperty(c) && (a[c] = b[c]);
                        return a
                    }, H: b, Ba: function(a,
                            b) {
                        if (!a)
                            return a;
                        var c = {}, d;
                        for (d in a)
                            a.hasOwnProperty(d) && (c[d] = b(a[d], d, a));
                        return c
                    }, ua: function(b) {
                        for (; b.firstChild; )
                            a.removeNode(b.firstChild)
                    }, Tb: function(b) {
                        b = a.a.P(b);
                        for (var c = u.createElement("div"), h = 0, d = b.length; h < d; h++)
                            c.appendChild(a.J(b[h]));
                        return c
                    }, Ta: function(b, c) {
                        for (var d = 0, f = b.length, e = []; d < f; d++) {
                            var m = b[d].cloneNode(!0);
                            e.push(c ? a.J(m) : m)
                        }
                        return e
                    }, R: function(b, c) {
                        a.a.ua(b);
                        if (c)
                            for (var d = 0, f = c.length; d < f; d++)
                                b.appendChild(c[d])
                    }, ib: function(b, c) {
                        var d = b.nodeType ? [b] : b;
                        if (0 <
                                d.length) {
                            for (var f = d[0], e = f.parentNode, m = 0, g = c.length; m < g; m++)
                                e.insertBefore(c[m], f);
                            m = 0;
                            for (g = d.length; m < g; m++)
                                a.removeNode(d[m])
                        }
                    }, X: function(a, b) {
                        if (a.length) {
                            for (b = 8 === b.nodeType && b.parentNode || b; a.length && a[0].parentNode !== b; )
                                a.splice(0, 1);
                            if (1 < a.length) {
                                var c = a[0], d = a[a.length - 1];
                                for (a.length = 0; c !== d; )
                                    if (a.push(c), c = c.nextSibling, !c)
                                        return;
                                a.push(d)
                            }
                        }
                        return a
                    }, lb: function(a, b) {
                        7 > f ? a.setAttribute("selected", b) : a.selected = b
                    }, ka: function(a) {
                        return null === a || a === p ? "" : a.trim ? a.trim() : a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,
                                "")
                    }, cc: function(b, c) {
                        for (var d = [], f = (b || "").split(c), e = 0, m = f.length; e < m; e++) {
                            var g = a.a.ka(f[e]);
                            "" !== g && d.push(g)
                        }
                        return d
                    }, Zb: function(a, b) {
                        a = a || "";
                        return b.length > a.length ? !1 : a.substring(0, b.length) === b
                    }, Eb: function(a, b) {
                        if (b.compareDocumentPosition)
                            return 16 == (b.compareDocumentPosition(a) & 16);
                        for (; null != a; ) {
                            if (a == b)
                                return!0;
                            a = a.parentNode
                        }
                        return!1
                    }, ta: function(b) {
                        return a.a.Eb(b, b.ownerDocument)
                    }, Oa: function(b) {
                        return!!a.a.Ra(b, a.a.ta)
                    }, v: function(a) {
                        return a && a.tagName && a.tagName.toLowerCase()
                    },
                    r: function(b, d, h) {
                        var e = f && g[d];
                        if (e || "undefined" == typeof t)
                            if (e || "function" != typeof b.addEventListener)
                                if ("undefined" != typeof b.attachEvent) {
                                    var q = function(a) {
                                        h.call(b, a)
                                    }, m = "on" + d;
                                    b.attachEvent(m, q);
                                    a.a.B.ba(b, function() {
                                        b.detachEvent(m, q)
                                    })
                                } else
                                    throw Error("Browser doesn't support addEventListener or attachEvent");
                            else
                                b.addEventListener(d, h, !1);
                        else {
                            if (c(b, d)) {
                                var x = h;
                                h = function(a, b) {
                                    var c = this.checked;
                                    b && (this.checked = !0 !== b.yb);
                                    x.call(this, a);
                                    this.checked = c
                                }
                            }
                            t(b).bind(d, h)
                        }
                    }, aa: function(a,
                            b) {
                        if (!a || !a.nodeType)
                            throw Error("element must be a DOM node when calling triggerEvent");
                        if ("undefined" != typeof t) {
                            var d = [];
                            c(a, b) && d.push({yb: a.checked});
                            t(a).trigger(b, d)
                        } else if ("function" == typeof u.createEvent)
                            if ("function" == typeof a.dispatchEvent)
                                d = u.createEvent(e[b] || "HTMLEvents"), d.initEvent(b, !0, !0, w, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, a), a.dispatchEvent(d);
                            else
                                throw Error("The supplied element doesn't support dispatchEvent");
                        else if ("undefined" != typeof a.fireEvent)
                            c(a, b) && (a.checked = !0 !== a.checked),
                                    a.fireEvent("on" + b);
                        else
                            throw Error("Browser doesn't support triggering events");
                    }, c: function(b) {
                        return a.O(b) ? b() : b
                    }, Fa: function(b) {
                        return a.O(b) ? b.u() : b
                    }, la: function(b, c, d) {
                        if (c) {
                            var f = /\S+/g, e = b.className.match(f) || [];
                            a.a.m(c.match(f), function(b) {
                                a.a.T(e, b, d)
                            });
                            b.className = e.join(" ")
                        }
                    }, mb: function(b, c) {
                        var d = a.a.c(c);
                        if (null === d || d === p)
                            d = "";
                        var f = a.e.firstChild(b);
                        !f || 3 != f.nodeType || a.e.nextSibling(f) ? a.e.R(b, [u.createTextNode(d)]) : f.data = d;
                        a.a.Hb(b)
                    }, kb: function(a, b) {
                        a.name = b;
                        if (7 >= f)
                            try {
                                a.mergeAttributes(u.createElement("<input name='" +
                                        a.name + "'/>"), !1)
                            } catch (c) {
                            }
                    }, Hb: function(a) {
                        9 <= f && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom))
                    }, Fb: function(a) {
                        if (f) {
                            var b = a.style.width;
                            a.style.width = 0;
                            a.style.width = b
                        }
                    }, Xb: function(b, c) {
                        b = a.a.c(b);
                        c = a.a.c(c);
                        for (var d = [], f = b; f <= c; f++)
                            d.push(f);
                        return d
                    }, P: function(a) {
                        for (var b = [], c = 0, d = a.length; c < d; c++)
                            b.push(a[c]);
                        return b
                    }, ac: 6 === f, bc: 7 === f, ha: f, Ya: function(b, c) {
                        for (var d = a.a.P(b.getElementsByTagName("input")).concat(a.a.P(b.getElementsByTagName("textarea"))), f = "string" ==
                                typeof c ? function(a) {
                                    return a.name === c
                                } : function(a) {
                            return c.test(a.name)
                        }, e = [], m = d.length - 1; 0 <= m; m--)
                            f(d[m]) && e.push(d[m]);
                        return e
                    }, Ub: function(b) {
                        return"string" == typeof b && (b = a.a.ka(b)) ? B && B.parse ? B.parse(b) : (new Function("return " + b))() : null
                    }, Ja: function(b, c, d) {
                        if (!B || !B.stringify)
                            throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                        return B.stringify(a.a.c(b), c, d)
                    }, Vb: function(c, d, f) {
                        f = f || {};
                        var e = f.params || {}, g = f.includeFields || this.Xa, m = c;
                        if ("object" == typeof c && "form" === a.a.v(c))
                            for (var m = c.action, x = g.length - 1; 0 <= x; x--)
                                for (var v = a.a.Ya(c, g[x]), y = v.length - 1; 0 <= y; y--)
                                    e[v[y].name] = v[y].value;
                        d = a.a.c(d);
                        var r = u.createElement("form");
                        r.style.display = "none";
                        r.action = m;
                        r.method = "post";
                        for (var p in d)
                            c = u.createElement("input"), c.name = p, c.value = a.a.Ja(a.a.c(d[p])), r.appendChild(c);
                        b(e, function(a, b) {
                            var c = u.createElement("input");
                            c.name =
                                    a;
                            c.value = b;
                            r.appendChild(c)
                        });
                        u.body.appendChild(r);
                        f.submitter ? f.submitter(r) : r.submit();
                        setTimeout(function() {
                            r.parentNode.removeChild(r)
                        }, 0)
                    }}
            }();
            a.b("utils", a.a);
            a.b("utils.arrayForEach", a.a.m);
            a.b("utils.arrayFirst", a.a.Ra);
            a.b("utils.arrayFilter", a.a.da);
            a.b("utils.arrayGetDistinctValues", a.a.Sa);
            a.b("utils.arrayIndexOf", a.a.k);
            a.b("utils.arrayMap", a.a.ea);
            a.b("utils.arrayPushAll", a.a.V);
            a.b("utils.arrayRemoveItem", a.a.fa);
            a.b("utils.extend", a.a.extend);
            a.b("utils.fieldsIncludedWithJsonPost",
                    a.a.Xa);
            a.b("utils.getFormFields", a.a.Ya);
            a.b("utils.peekObservable", a.a.Fa);
            a.b("utils.postJson", a.a.Vb);
            a.b("utils.parseJson", a.a.Ub);
            a.b("utils.registerEventHandler", a.a.r);
            a.b("utils.stringifyJson", a.a.Ja);
            a.b("utils.range", a.a.Xb);
            a.b("utils.toggleDomNodeCssClass", a.a.la);
            a.b("utils.triggerEvent", a.a.aa);
            a.b("utils.unwrapObservable", a.a.c);
            a.b("utils.objectForEach", a.a.H);
            a.b("utils.addOrRemoveItem", a.a.T);
            a.b("unwrap", a.a.c);
            Function.prototype.bind || (Function.prototype.bind = function(a) {
                var c =
                        this, d = Array.prototype.slice.call(arguments);
                a = d.shift();
                return function() {
                    return c.apply(a, d.concat(Array.prototype.slice.call(arguments)))
                }
            });
            a.a.f = new function() {
                var b = 0, c = "__ko__" + (new Date).getTime(), d = {};
                return{get: function(b, c) {
                        var d = a.a.f.va(b, !1);
                        return d === p ? p : d[c]
                    }, set: function(b, c, d) {
                        if (d !== p || a.a.f.va(b, !1) !== p)
                            a.a.f.va(b, !0)[c] = d
                    }, va: function(a, g) {
                        var f = a[c];
                        if (!f || "null" === f || !d[f]) {
                            if (!g)
                                return p;
                            f = a[c] = "ko" + b++;
                            d[f] = {}
                        }
                        return d[f]
                    }, clear: function(a) {
                        var b = a[c];
                        return b ? (delete d[b],
                                a[c] = null, !0) : !1
                    }}
            };
            a.b("utils.domData", a.a.f);
            a.b("utils.domData.clear", a.a.f.clear);
            a.a.B = new function() {
                function b(b, c) {
                    var e = a.a.f.get(b, d);
                    e === p && c && (e = [], a.a.f.set(b, d, e));
                    return e
                }
                function c(d) {
                    var e = b(d, !1);
                    if (e)
                        for (var e = e.slice(0), k = 0; k < e.length; k++)
                            e[k](d);
                    a.a.f.clear(d);
                    "function" == typeof t && "function" == typeof t.cleanData && t.cleanData([d]);
                    if (g[d.nodeType])
                        for (e = d.firstChild; d = e; )
                            e = d.nextSibling, 8 === d.nodeType && c(d)
                }
                var d = "__ko_domNodeDisposal__" + (new Date).getTime(), e = {1: !0, 8: !0, 9: !0},
                g = {1: !0, 9: !0};
                return{ba: function(a, c) {
                        if ("function" != typeof c)
                            throw Error("Callback must be a function");
                        b(a, !0).push(c)
                    }, hb: function(c, e) {
                        var k = b(c, !1);
                        k && (a.a.fa(k, e), 0 == k.length && a.a.f.set(c, d, p))
                    }, J: function(b) {
                        if (e[b.nodeType] && (c(b), g[b.nodeType])) {
                            var d = [];
                            a.a.V(d, b.getElementsByTagName("*"));
                            for (var k = 0, h = d.length; k < h; k++)
                                c(d[k])
                        }
                        return b
                    }, removeNode: function(b) {
                        a.J(b);
                        b.parentNode && b.parentNode.removeChild(b)
                    }}
            };
            a.J = a.a.B.J;
            a.removeNode = a.a.B.removeNode;
            a.b("cleanNode", a.J);
            a.b("removeNode",
                    a.removeNode);
            a.b("utils.domNodeDisposal", a.a.B);
            a.b("utils.domNodeDisposal.addDisposeCallback", a.a.B.ba);
            a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.B.hb);
            (function() {
                a.a.Da = function(b) {
                    var c;
                    if ("undefined" != typeof t)
                        if (t.parseHTML)
                            c = t.parseHTML(b) || [];
                        else {
                            if ((c = t.clean([b])) && c[0]) {
                                for (b = c[0]; b.parentNode && 11 !== b.parentNode.nodeType; )
                                    b = b.parentNode;
                                b.parentNode && b.parentNode.removeChild(b)
                            }
                        }
                    else {
                        var d = a.a.ka(b).toLowerCase();
                        c = u.createElement("div");
                        d = d.match(/^<(thead|tbody|tfoot)/) &&
                                [1, "<table>", "</table>"] || !d.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!d.indexOf("<td") || !d.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""];
                        b = "ignored<div>" + d[1] + b + d[2] + "</div>";
                        for ("function" == typeof w.innerShiv?c.appendChild(w.innerShiv(b)):c.innerHTML = b; d[0]--; )
                            c = c.lastChild;
                        c = a.a.P(c.lastChild.childNodes)
                    }
                    return c
                };
                a.a.ja = function(b, c) {
                    a.a.ua(b);
                    c = a.a.c(c);
                    if (null !== c && c !== p)
                        if ("string" != typeof c && (c = c.toString()), "undefined" != typeof t)
                            t(b).html(c);
                        else
                            for (var d = a.a.Da(c), e = 0; e < d.length; e++)
                                b.appendChild(d[e])
                }
            })();
            a.b("utils.parseHtmlFragment", a.a.Da);
            a.b("utils.setHtml", a.a.ja);
            a.t = function() {
                function b(c, e) {
                    if (c)
                        if (8 == c.nodeType) {
                            var g = a.t.eb(c.nodeValue);
                            null != g && e.push({Db: c, Rb: g})
                        } else if (1 == c.nodeType)
                            for (var g = 0, f = c.childNodes, l = f.length; g < l; g++)
                                b(f[g], e)
                }
                var c = {};
                return{Aa: function(a) {
                        if ("function" != typeof a)
                            throw Error("You can only pass a function to ko.memoization.memoize()");
                        var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) +
                                (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
                        c[b] = a;
                        return"\x3c!--[ko_memo:" + b + "]--\x3e"
                    }, qb: function(a, b) {
                        var g = c[a];
                        if (g === p)
                            throw Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.");
                        try {
                            return g.apply(null, b || []), !0
                        } finally {
                            delete c[a]
                        }
                    }, rb: function(c, e) {
                        var g = [];
                        b(c, g);
                        for (var f = 0, l = g.length; f < l; f++) {
                            var k = g[f].Db, h = [k];
                            e && a.a.V(h, e);
                            a.t.qb(g[f].Rb, h);
                            k.nodeValue = "";
                            k.parentNode && k.parentNode.removeChild(k)
                        }
                    }, eb: function(a) {
                        return(a = a.match(/^\[ko_memo\:(.*?)\]$/)) ?
                                a[1] : null
                    }}
            }();
            a.b("memoization", a.t);
            a.b("memoization.memoize", a.t.Aa);
            a.b("memoization.unmemoize", a.t.qb);
            a.b("memoization.parseMemoText", a.t.eb);
            a.b("memoization.unmemoizeDomNodeAndDescendants", a.t.rb);
            a.Wa = {throttle: function(b, c) {
                    b.throttleEvaluation = c;
                    var d = null;
                    return a.h({read: b, write: function(a) {
                            clearTimeout(d);
                            d = setTimeout(function() {
                                b(a)
                            }, c)
                        }})
                }, notify: function(b, c) {
                    b.equalityComparer = "always" == c ? F(!1) : a.o.fn.equalityComparer;
                    return b
                }};
            a.b("extenders", a.Wa);
            a.ob = function(b, c, d) {
                this.target =
                        b;
                this.pa = c;
                this.Cb = d;
                a.s(this, "dispose", this.A)
            };
            a.ob.prototype.A = function() {
                this.Ob = !0;
                this.Cb()
            };
            a.$ = function() {
                this.I = {};
                a.a.extend(this, a.$.fn);
                a.s(this, "subscribe", this.Ka);
                a.s(this, "extend", this.extend);
                a.s(this, "getSubscriptionsCount", this.Jb)
            };
            a.$.fn = {Ka: function(b, c, d) {
                    d = d || "change";
                    var e = new a.ob(this, c ? b.bind(c) : b, function() {
                        a.a.fa(this.I[d], e)
                    }.bind(this));
                    this.I[d] || (this.I[d] = []);
                    this.I[d].push(e);
                    return e
                }, notifySubscribers: function(b, c) {
                    c = c || "change";
                    this.I[c] && a.l.q(function() {
                        a.a.m(this.I[c].slice(0),
                                function(a) {
                                    a && !0 !== a.Ob && a.pa(b)
                                })
                    }, this)
                }, Jb: function() {
                    var b = 0;
                    a.a.H(this.I, function(a, d) {
                        b += d.length
                    });
                    return b
                }, extend: function(b) {
                    var c = this;
                    b && a.a.H(b, function(b, e) {
                        var g = a.Wa[b];
                        "function" == typeof g && (c = g(c, e))
                    });
                    return c
                }};
            a.$a = function(a) {
                return null != a && "function" == typeof a.Ka && "function" == typeof a.notifySubscribers
            };
            a.b("subscribable", a.$);
            a.b("isSubscribable", a.$a);
            a.l = function() {
                var b = [];
                return{wb: function(a) {
                        b.push({pa: a, Va: []})
                    }, end: function() {
                        b.pop()
                    }, gb: function(c) {
                        if (!a.$a(c))
                            throw Error("Only subscribable things can act as dependencies");
                        if (0 < b.length) {
                            var d = b[b.length - 1];
                            !d || 0 <= a.a.k(d.Va, c) || (d.Va.push(c), d.pa(c))
                        }
                    }, q: function(a, d, e) {
                        try {
                            return b.push(null), a.apply(d, e || [])
                        } finally {
                            b.pop()
                        }
                    }}
            }();
            var K = {undefined: !0, "boolean": !0, number: !0, string: !0};
            a.o = function(b) {
                function c() {
                    if (0 < arguments.length)
                        return c.equalityComparer && c.equalityComparer(d, arguments[0]) || (c.M(), d = arguments[0], c.L()), this;
                    a.l.gb(c);
                    return d
                }
                var d = b;
                a.$.call(c);
                c.u = function() {
                    return d
                };
                c.L = function() {
                    c.notifySubscribers(d)
                };
                c.M = function() {
                    c.notifySubscribers(d,
                            "beforeChange")
                };
                a.a.extend(c, a.o.fn);
                a.s(c, "peek", c.u);
                a.s(c, "valueHasMutated", c.L);
                a.s(c, "valueWillMutate", c.M);
                return c
            };
            a.o.fn = {equalityComparer: function(a, c) {
                    return null === a || typeof a in K ? a === c : !1
                }};
            var A = a.o.Wb = "__ko_proto__";
            a.o.fn[A] = a.o;
            a.wa = function(b, c) {
                return null === b || b === p || b[A] === p ? !1 : b[A] === c ? !0 : a.wa(b[A], c)
            };
            a.O = function(b) {
                return a.wa(b, a.o)
            };
            a.ab = function(b) {
                return"function" == typeof b && b[A] === a.o || "function" == typeof b && b[A] === a.h && b.Lb ? !0 : !1
            };
            a.b("observable", a.o);
            a.b("isObservable",
                    a.O);
            a.b("isWriteableObservable", a.ab);
            a.Z = function(b) {
                b = b || [];
                if ("object" != typeof b || !("length"in b))
                    throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
                b = a.o(b);
                a.a.extend(b, a.Z.fn);
                return b
            };
            a.Z.fn = {remove: function(a) {
                    for (var c = this.u(), d = [], e = "function" == typeof a ? a : function(c) {
                        return c === a
                    }, g = 0; g < c.length; g++) {
                        var f = c[g];
                        e(f) && (0 === d.length && this.M(), d.push(f), c.splice(g, 1), g--)
                    }
                    d.length && this.L();
                    return d
                }, removeAll: function(b) {
                    if (b ===
                            p) {
                        var c = this.u(), d = c.slice(0);
                        this.M();
                        c.splice(0, c.length);
                        this.L();
                        return d
                    }
                    return b ? this.remove(function(c) {
                        return 0 <= a.a.k(b, c)
                    }) : []
                }, destroy: function(a) {
                    var c = this.u(), d = "function" == typeof a ? a : function(c) {
                        return c === a
                    };
                    this.M();
                    for (var e = c.length - 1; 0 <= e; e--)
                        d(c[e]) && (c[e]._destroy = !0);
                    this.L()
                }, destroyAll: function(b) {
                    return b === p ? this.destroy(F(!0)) : b ? this.destroy(function(c) {
                        return 0 <= a.a.k(b, c)
                    }) : []
                }, indexOf: function(b) {
                    var c = this();
                    return a.a.k(c, b)
                }, replace: function(a, c) {
                    var d = this.indexOf(a);
                    0 <= d && (this.M(), this.u()[d] = c, this.L())
                }};
            a.a.m("pop push reverse shift sort splice unshift".split(" "), function(b) {
                a.Z.fn[b] = function() {
                    var a = this.u();
                    this.M();
                    a = a[b].apply(a, arguments);
                    this.L();
                    return a
                }
            });
            a.a.m(["slice"], function(b) {
                a.Z.fn[b] = function() {
                    var a = this();
                    return a[b].apply(a, arguments)
                }
            });
            a.b("observableArray", a.Z);
            a.h = function(b, c, d) {
                function e() {
                    a.a.m(D, function(a) {
                        a.A()
                    });
                    D = []
                }
                function g() {
                    var a = l.throttleEvaluation;
                    a && 0 <= a ? (clearTimeout(I), I = setTimeout(f, a)) : f()
                }
                function f() {
                    if (!q)
                        if (n &&
                                y())
                            r();
                        else {
                            q = !0;
                            try {
                                var b = a.a.ea(D, function(a) {
                                    return a.target
                                });
                                a.l.wb(function(c) {
                                    var d;
                                    0 <= (d = a.a.k(b, c)) ? b[d] = p : D.push(c.Ka(g))
                                });
                                for (var d = m.call(c), f = b.length - 1; 0 <= f; f--)
                                    b[f] && D.splice(f, 1)[0].A();
                                n = !0;
                                l.notifySubscribers(h, "beforeChange");
                                h = d;
                                l.notifySubscribers(h)
                            } finally {
                                a.l.end(), q = !1
                            }
                            D.length || r()
                        }
                }
                function l() {
                    if (0 < arguments.length) {
                        if ("function" === typeof x)
                            x.apply(c, arguments);
                        else
                            throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                        return this
                    }
                    n || f();
                    a.l.gb(l);
                    return h
                }
                function k() {
                    return!n || 0 < D.length
                }
                var h, n = !1, q = !1, m = b;
                m && "object" == typeof m ? (d = m, m = d.read) : (d = d || {}, m || (m = d.read));
                if ("function" != typeof m)
                    throw Error("Pass a function that returns the value of the ko.computed");
                var x = d.write, v = d.disposeWhenNodeIsRemoved || d.K || null, y = d.disposeWhen || d.sa || F(!1), r = e, D = [], I = null;
                c || (c = d.owner);
                l.u = function() {
                    n || f();
                    return h
                };
                l.Ib = function() {
                    return D.length
                };
                l.Lb = "function" === typeof d.write;
                l.A = function() {
                    r()
                };
                l.Y = k;
                a.$.call(l);
                a.a.extend(l,
                        a.h.fn);
                a.s(l, "peek", l.u);
                a.s(l, "dispose", l.A);
                a.s(l, "isActive", l.Y);
                a.s(l, "getDependenciesCount", l.Ib);
                !0 !== d.deferEvaluation && f();
                if (v && k()) {
                    r = function() {
                        a.a.B.hb(v, r);
                        e()
                    };
                    a.a.B.ba(v, r);
                    var s = y, y = function() {
                        return!a.a.ta(v) || s()
                    }
                }
                return l
            };
            a.Nb = function(b) {
                return a.wa(b, a.h)
            };
            C = a.o.Wb;
            a.h[C] = a.o;
            a.h.fn = {};
            a.h.fn[C] = a.h;
            a.b("dependentObservable", a.h);
            a.b("computed", a.h);
            a.b("isComputed", a.Nb);
            (function() {
                function b(a, g, f) {
                    f = f || new d;
                    a = g(a);
                    if ("object" != typeof a || null === a || a === p || a instanceof Date ||
                            a instanceof String || a instanceof Number || a instanceof Boolean)
                        return a;
                    var l = a instanceof Array ? [] : {};
                    f.save(a, l);
                    c(a, function(c) {
                        var d = g(a[c]);
                        switch (typeof d) {
                            case "boolean":
                            case "number":
                            case "string":
                            case "function":
                                l[c] = d;
                                break;
                            case "object":
                            case "undefined":
                                var n = f.get(d);
                                l[c] = n !== p ? n : b(d, g, f)
                        }
                    });
                    return l
                }
                function c(b, c) {
                    if (b instanceof Array) {
                        for (var d = 0; d < b.length; d++)
                            c(d);
                        "function" == typeof b.toJSON && c("toJSON")
                    } else
                        for (d in b)
                            ("function" !== typeof b[d] || a.O(b[d])) && c(d)
                }
                function d() {
                    this.keys =
                            [];
                    this.Na = []
                }
                a.pb = function(c) {
                    if (0 == arguments.length)
                        throw Error("When calling ko.toJS, pass the object you want to convert.");
                    return b(c, function(b) {
                        for (var c = 0; a.O(b) && 10 > c; c++)
                            b = b();
                        return b
                    })
                };
                a.toJSON = function(b, c, d) {
                    b = a.pb(b);
                    return a.a.Ja(b, c, d)
                };
                d.prototype = {save: function(b, c) {
                        var d = a.a.k(this.keys, b);
                        0 <= d ? this.Na[d] = c : (this.keys.push(b), this.Na.push(c))
                    }, get: function(b) {
                        b = a.a.k(this.keys, b);
                        return 0 <= b ? this.Na[b] : p
                    }}
            })();
            a.b("toJS", a.pb);
            a.b("toJSON", a.toJSON);
            (function() {
                a.j = {p: function(b) {
                        switch (a.a.v(b)) {
                            case "option":
                                return!0 ===
                                        b.__ko__hasDomDataOptionValue__ ? a.a.f.get(b, a.d.options.Ca) : 7 >= a.a.ha ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value;
                            case "select":
                                return 0 <= b.selectedIndex ? a.j.p(b.options[b.selectedIndex]) : p;
                            default:
                                return b.value
                        }
                    }, ma: function(b, c) {
                        switch (a.a.v(b)) {
                            case "option":
                                switch (typeof c) {
                                    case "string":
                                        a.a.f.set(b, a.d.options.Ca, p);
                                        "__ko__hasDomDataOptionValue__"in b && delete b.__ko__hasDomDataOptionValue__;
                                        b.value = c;
                                        break;
                                    default:
                                        a.a.f.set(b, a.d.options.Ca, c), b.__ko__hasDomDataOptionValue__ =
                                                !0, b.value = "number" === typeof c ? c : ""
                                }
                                break;
                            case "select":
                                "" === c && (c = p);
                                if (null === c || c === p)
                                    b.selectedIndex = -1;
                                for (var d = b.options.length - 1; 0 <= d; d--)
                                    if (a.j.p(b.options[d]) == c) {
                                        b.selectedIndex = d;
                                        break
                                    }
                                1 < b.size || -1 !== b.selectedIndex || (b.selectedIndex = 0);
                                break;
                            default:
                                if (null === c || c === p)
                                    c = "";
                                b.value = c
                        }
                    }}
            })();
            a.b("selectExtensions", a.j);
            a.b("selectExtensions.readValue", a.j.p);
            a.b("selectExtensions.writeValue", a.j.ma);
            a.g = function() {
                function b(b) {
                    b = a.a.ka(b);
                    123 === b.charCodeAt(0) && (b = b.slice(1, -1));
                    var c =
                            [], d = b.match(e), l, m, x = 0;
                    if (d) {
                        d.push(",");
                        for (var v = 0, y; y = d[v]; ++v) {
                            var r = y.charCodeAt(0);
                            if (44 === r) {
                                if (0 >= x) {
                                    l && c.push(m ? {key: l, value: m.join("")} : {unknown: l});
                                    l = m = x = 0;
                                    continue
                                }
                            } else if (58 === r) {
                                if (!m)
                                    continue
                            } else if (47 === r && v && 1 < y.length)
                                (r = d[v - 1].match(g)) && !f[r[0]] && (b = b.substr(b.indexOf(y) + 1), d = b.match(e), d.push(","), v = -1, y = "/");
                            else if (40 === r || 123 === r || 91 === r)
                                ++x;
                            else if (41 === r || 125 === r || 93 === r)
                                --x;
                            else if (!l && !m) {
                                l = 34 === r || 39 === r ? y.slice(1, -1) : y;
                                continue
                            }
                            m ? m.push(y) : m = [y]
                        }
                    }
                    return c
                }
                var c = ["true",
                    "false", "null", "undefined"], d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, e = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"), g = /[\])"'A-Za-z0-9_$]+$/, f = {"in": 1, "return": 1, "typeof": 1}, l = {};
                return{W: [], S: l, Ea: b, ia: function(f, h) {
                        function e(b, h) {
                            var f, k = a.getBindingHandler(b);
                            if (k && k.preprocess ? h = k.preprocess(h, b, e) : 1) {
                                if (k = l[b])
                                    f = h, 0 <= a.a.k(c, f) ? f = !1 : (k = f.match(d), f = null === k ? !1 : k[1] ? "Object(" + k[1] + ")" +
                                            k[2] : f), k = f;
                                k && m.push("'" + b + "':function(_z){" + f + "=_z}");
                                x && (h = "function(){return " + h + " }");
                                g.push("'" + b + "':" + h)
                            }
                        }
                        h = h || {};
                        var g = [], m = [], x = h.valueAccessors, v = "string" === typeof f ? b(f) : f;
                        a.a.m(v, function(a) {
                            e(a.key || a.unknown, a.value)
                        });
                        m.length && e("_ko_property_writers", "{" + m.join(",") + "}");
                        return g.join(",")
                    }, Qb: function(a, b) {
                        for (var c = 0; c < a.length; c++)
                            if (a[c].key == b)
                                return!0;
                        return!1
                    }, na: function(b, c, d, f, m) {
                        if (b && a.O(b))
                            !a.ab(b) || m && b.u() === f || b(f);
                        else if ((b = c.get("_ko_property_writers")) && b[d])
                            b[d](f)
                    }}
            }();
            a.b("expressionRewriting", a.g);
            a.b("expressionRewriting.bindingRewriteValidators", a.g.W);
            a.b("expressionRewriting.parseObjectLiteral", a.g.Ea);
            a.b("expressionRewriting.preProcessBindings", a.g.ia);
            a.b("expressionRewriting._twoWayBindings", a.g.S);
            a.b("jsonExpressionRewriting", a.g);
            a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.g.ia);
            (function() {
                function b(a) {
                    return 8 == a.nodeType && (g ? a.text : a.nodeValue).match(f)
                }
                function c(a) {
                    return 8 == a.nodeType && (g ? a.text : a.nodeValue).match(l)
                }
                function d(a,
                        d) {
                    for (var f = a, m = 1, e = []; f = f.nextSibling; ) {
                        if (c(f) && (m--, 0 === m))
                            return e;
                        e.push(f);
                        b(f) && m++
                    }
                    if (!d)
                        throw Error("Cannot find closing comment tag to match: " + a.nodeValue);
                    return null
                }
                function e(a, b) {
                    var c = d(a, b);
                    return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : null
                }
                var g = u && "\x3c!--test--\x3e" === u.createComment("test").text, f = g ? /^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/ : /^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/, l = g ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, k = {ul: !0, ol: !0};
                a.e = {N: {}, childNodes: function(a) {
                        return b(a) ?
                                d(a) : a.childNodes
                    }, ga: function(c) {
                        if (b(c)) {
                            c = a.e.childNodes(c);
                            for (var d = 0, f = c.length; d < f; d++)
                                a.removeNode(c[d])
                        } else
                            a.a.ua(c)
                    }, R: function(c, d) {
                        if (b(c)) {
                            a.e.ga(c);
                            for (var f = c.nextSibling, e = 0, k = d.length; e < k; e++)
                                f.parentNode.insertBefore(d[e], f)
                        } else
                            a.a.R(c, d)
                    }, fb: function(a, c) {
                        b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c)
                    }, Za: function(c, d, f) {
                        f ? b(c) ? c.parentNode.insertBefore(d, f.nextSibling) : f.nextSibling ? c.insertBefore(d, f.nextSibling) :
                                c.appendChild(d) : a.e.fb(c, d)
                    }, firstChild: function(a) {
                        return b(a) ? !a.nextSibling || c(a.nextSibling) ? null : a.nextSibling : a.firstChild
                    }, nextSibling: function(a) {
                        b(a) && (a = e(a));
                        return a.nextSibling && c(a.nextSibling) ? null : a.nextSibling
                    }, sb: function(a) {
                        return(a = b(a)) ? a[1] : null
                    }, cb: function(d) {
                        if (k[a.a.v(d)]) {
                            var f = d.firstChild;
                            if (f) {
                                do
                                    if (1 === f.nodeType) {
                                        var g;
                                        g = f.firstChild;
                                        var m = null;
                                        if (g) {
                                            do
                                                if (m)
                                                    m.push(g);
                                                else if (b(g)) {
                                                    var l = e(g, !0);
                                                    l ? g = l : m = [g]
                                                } else
                                                    c(g) && (m = [g]);
                                            while (g = g.nextSibling)
                                        }
                                        if (g = m)
                                            for (m = f.nextSibling,
                                                    l = 0; l < g.length; l++)
                                                m ? d.insertBefore(g[l], m) : d.appendChild(g[l])
                                    }
                                while (f = f.nextSibling)
                            }
                        }
                    }}
            })();
            a.b("virtualElements", a.e);
            a.b("virtualElements.allowedBindings", a.e.N);
            a.b("virtualElements.emptyNode", a.e.ga);
            a.b("virtualElements.insertAfter", a.e.Za);
            a.b("virtualElements.prepend", a.e.fb);
            a.b("virtualElements.setDomNodeChildren", a.e.R);
            (function() {
                a.F = function() {
                    this.xb = {}
                };
                a.a.extend(a.F.prototype, {nodeHasBindings: function(b) {
                        switch (b.nodeType) {
                            case 1:
                                return null != b.getAttribute("data-bind");
                            case 8:
                                return null !=
                                        a.e.sb(b);
                            default:
                                return!1
                        }
                    }, getBindings: function(a, c) {
                        var d = this.getBindingsString(a, c);
                        return d ? this.parseBindingsString(d, c, a) : null
                    }, getBindingAccessors: function(a, c) {
                        var d = this.getBindingsString(a, c);
                        return d ? this.parseBindingsString(d, c, a, {valueAccessors: !0}) : null
                    }, getBindingsString: function(b) {
                        switch (b.nodeType) {
                            case 1:
                                return b.getAttribute("data-bind");
                            case 8:
                                return a.e.sb(b);
                            default:
                                return null
                        }
                    }, parseBindingsString: function(b, c, d, e) {
                        try {
                            var g = this.xb, f = b + (e && e.valueAccessors || ""), l;
                            if (!(l =
                                    g[f])) {
                                var k, h = "with($context){with($data||{}){return{" + a.g.ia(b, e) + "}}}";
                                k = new Function("$context", "$element", h);
                                l = g[f] = k
                            }
                            return l(c, d)
                        } catch (n) {
                            throw n.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + n.message, n;
                        }
                    }});
                a.F.instance = new a.F
            })();
            a.b("bindingProvider", a.F);
            (function() {
                function b(a) {
                    return function() {
                        return a
                    }
                }
                function c(a) {
                    return a()
                }
                function d(b) {
                    return a.a.Ba(a.l.q(b), function(a, c) {
                        return function() {
                            return b()[c]
                        }
                    })
                }
                function e(a, b) {
                    return d(this.getBindings.bind(this,
                            a, b))
                }
                function g(b, c, d) {
                    var e, g = a.e.firstChild(c), k = a.F.instance, h = k.preprocessNode;
                    if (h) {
                        for (; e = g; )
                            g = a.e.nextSibling(e), h.call(k, e);
                        g = a.e.firstChild(c)
                    }
                    for (; e = g; )
                        g = a.e.nextSibling(e), f(b, e, d)
                }
                function f(b, c, d) {
                    var f = !0, e = 1 === c.nodeType;
                    e && a.e.cb(c);
                    if (e && d || a.F.instance.nodeHasBindings(c))
                        f = k(c, null, b, d).shouldBindDescendants;
                    f && !n[a.a.v(c)] && g(b, c, !e)
                }
                function l(b) {
                    var c = [], d = {}, f = [];
                    a.a.H(b, function D(e) {
                        if (!d[e]) {
                            var g = a.getBindingHandler(e);
                            g && (g.after && (f.push(e), a.a.m(g.after, function(c) {
                                if (b[c]) {
                                    if (-1 !==
                                            a.a.k(f, c))
                                        throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + f.join(", "));
                                    D(c)
                                }
                            }), f.pop()), c.push({key: e, Kb: g}));
                            d[e] = !0
                        }
                    });
                    return c
                }
                function k(b, d, f, g) {
                    var k = a.a.f.get(b, q);
                    if (!d) {
                        if (k)
                            throw Error("You cannot apply bindings multiple times to the same element.");
                        a.a.f.set(b, q, !0)
                    }
                    !k && g && a.nb(b, f);
                    var h;
                    if (d && "function" !== typeof d)
                        h = d;
                    else {
                        var n = a.F.instance, s = n.getBindingAccessors || e, z = a.h(function() {
                            (h = d ? d(f, b) : s.call(n, b, f)) && f.C && f.C();
                            return h
                        }, null,
                                {K: b});
                        h && z.Y() || (z = null)
                    }
                    var t;
                    if (h) {
                        var u = z ? function(a) {
                            return function() {
                                return c(z()[a])
                            }
                        } : function(a) {
                            return h[a]
                        }, w = function() {
                            return a.a.Ba(z ? z() : h, c)
                        };
                        w.get = function(a) {
                            return h[a] && c(u(a))
                        };
                        w.has = function(a) {
                            return a in h
                        };
                        g = l(h);
                        a.a.m(g, function(c) {
                            var d = c.key, e = c.Kb;
                            if (8 === b.nodeType && !a.e.N[d])
                                throw Error("The binding '" + d + "' cannot be used with virtual elements");
                            a.l.q(function() {
                                var a = e.init;
                                if ("function" == typeof a && (a = a(b, u(d), w, f.$data, f)) && a.controlsDescendantBindings) {
                                    if (t !== p)
                                        throw Error("Multiple bindings (" +
                                                t + " and " + d + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                                    t = d
                                }
                            });
                            a.h(function() {
                                var a = e.update;
                                "function" == typeof a && a(b, u(d), w, f.$data, f)
                            }, null, {K: b})
                        })
                    }
                    return{shouldBindDescendants: t === p}
                }
                function h(b) {
                    return b && b instanceof a.D ? b : new a.D(b)
                }
                a.d = {};
                var n = {script: !0};
                a.getBindingHandler = function(b) {
                    return a.d[b]
                };
                a.D = function(b, c, d, f) {
                    var e = this, g = "function" == typeof b, k = [], h = a.h(function() {
                        var k = g ? b() : b;
                        c ? (c.C && c.C(),
                                a.a.extend(e, c), h && (e.$dataFn = e.C = h)) : (e.$parents = [], e.$root = k, e.ko = a);
                        e.$data = k;
                        d && (e[d] = k);
                        f && f(e, c, k);
                        return e.$data
                    }, null, {sa: function() {
                            return!a.a.Oa(k)
                        }});
                    h.Y() ? (e.$dataFn = e.C = h, h.$b = k, h.tb = function(b) {
                        k.push(b);
                        a.a.B.ba(b, function(b) {
                            a.a.fa(k, b);
                            k.length || (h.A(), e.C = h = p)
                        })
                    }) : e.$dataFn = function() {
                        return e.$data
                    }
                };
                a.D.prototype.createChildContext = function(b, c, d) {
                    return new a.D(b, this, c, function(a, b) {
                        a.$parentContext = b;
                        a.$parent = b.$data;
                        a.$parents = (b.$parents || []).slice(0);
                        a.$parents.unshift(a.$parent);
                        d && d(a)
                    })
                };
                a.D.prototype.extend = function(b) {
                    return new a.D(this.$dataFn, this, null, function(c) {
                        a.a.extend(c, "function" == typeof b ? b() : b)
                    })
                };
                var q = "__ko_boundElement";
                a.nb = function(b, c) {
                    if (2 == arguments.length)
                        a.a.f.set(b, "__ko_bindingContext__", c), c.C && c.C.tb(b);
                    else
                        return a.a.f.get(b, "__ko_bindingContext__")
                };
                a.oa = function(b, c, d) {
                    1 === b.nodeType && a.e.cb(b);
                    return k(b, c, h(d), !0)
                };
                a.ub = function(c, f, e) {
                    e = h(e);
                    return a.oa(c, "function" === typeof f ? d(f.bind(null, e, c)) : a.a.Ba(f, b), e)
                };
                a.Qa = function(a, b) {
                    1 !==
                            b.nodeType && 8 !== b.nodeType || g(h(a), b, !0)
                };
                a.Pa = function(a, b) {
                    if (b && 1 !== b.nodeType && 8 !== b.nodeType)
                        throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
                    b = b || w.document.body;
                    f(h(a), b, !0)
                };
                a.ra = function(b) {
                    switch (b.nodeType) {
                        case 1:
                        case 8:
                            var c = a.nb(b);
                            if (c)
                                return c;
                            if (b.parentNode)
                                return a.ra(b.parentNode)
                    }
                    return p
                };
                a.Ab = function(b) {
                    return(b = a.ra(b)) ? b.$data : p
                };
                a.b("bindingHandlers", a.d);
                a.b("applyBindings", a.Pa);
                a.b("applyBindingsToDescendants",
                        a.Qa);
                a.b("applyBindingAccessorsToNode", a.oa);
                a.b("applyBindingsToNode", a.ub);
                a.b("contextFor", a.ra);
                a.b("dataFor", a.Ab)
            })();
            var J = {"class": "className", "for": "htmlFor"};
            a.d.attr = {update: function(b, c) {
                    var d = a.a.c(c()) || {};
                    a.a.H(d, function(c, d) {
                        d = a.a.c(d);
                        var f = !1 === d || null === d || d === p;
                        f && b.removeAttribute(c);
                        8 >= a.a.ha && c in J ? (c = J[c], f ? b.removeAttribute(c) : b[c] = d) : f || b.setAttribute(c, d.toString());
                        "name" === c && a.a.kb(b, f ? "" : d.toString())
                    })
                }};
            (function() {
                a.d.checked = {after: ["value", "attr"], init: function(b,
                            c, d) {
                        function e() {
                            return d.has("checkedValue") ? a.a.c(d.get("checkedValue")) : b.value
                        }
                        function g() {
                            var f = b.checked, g = q ? e() : f;
                            if (m && (!k || f)) {
                                var l = a.l.q(c);
                                h ? n !== g ? (f && (a.a.T(l, g, !0), a.a.T(l, n, !1)), n = g) : a.a.T(l, g, f) : a.g.na(l, d, "checked", g, !0)
                            }
                        }
                        function f() {
                            var d = a.a.c(c());
                            b.checked = h ? 0 <= a.a.k(d, e()) : l ? d : e() === d
                        }
                        var l = "checkbox" == b.type, k = "radio" == b.type;
                        if (l || k) {
                            var h = l && a.a.c(c())instanceof Array, n = h ? e() : p, q = k || h, m = !1;
                            k && !b.name && a.d.uniqueName.init(b, F(!0));
                            a.h(g, null, {K: b});
                            a.a.r(b, "click", g);
                            a.h(f,
                                    null, {K: b});
                            m = !0
                        }
                    }};
                a.g.S.checked = !0;
                a.d.checkedValue = {update: function(b, c) {
                        b.value = a.a.c(c())
                    }}
            })();
            a.d.css = {update: function(b, c) {
                    var d = a.a.c(c());
                    "object" == typeof d ? a.a.H(d, function(c, d) {
                        d = a.a.c(d);
                        a.a.la(b, c, d)
                    }) : (d = String(d || ""), a.a.la(b, b.__ko__cssValue, !1), b.__ko__cssValue = d, a.a.la(b, d, !0))
                }};
            a.d.enable = {update: function(b, c) {
                    var d = a.a.c(c());
                    d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = !0)
                }};
            a.d.disable = {update: function(b, c) {
                    a.d.enable.update(b, function() {
                        return!a.a.c(c())
                    })
                }};
            a.d.event = {init: function(b, c, d, e, g) {
                    var f = c() || {};
                    a.a.H(f, function(f) {
                        "string" == typeof f && a.a.r(b, f, function(b) {
                            var h, n = c()[f];
                            if (n) {
                                try {
                                    var q = a.a.P(arguments);
                                    e = g.$data;
                                    q.unshift(e);
                                    h = n.apply(e, q)
                                } finally {
                                    !0 !== h && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
                                }
                                !1 === d.get(f + "Bubble") && (b.cancelBubble = !0, b.stopPropagation && b.stopPropagation())
                            }
                        })
                    })
                }};
            a.d.foreach = {bb: function(b) {
                    return function() {
                        var c = b(), d = a.a.Fa(c);
                        if (!d || "number" == typeof d.length)
                            return{foreach: c, templateEngine: a.G.ya};
                        a.a.c(c);
                        return{foreach: d.data, as: d.as, includeDestroyed: d.includeDestroyed, afterAdd: d.afterAdd, beforeRemove: d.beforeRemove, afterRender: d.afterRender, beforeMove: d.beforeMove, afterMove: d.afterMove, templateEngine: a.G.ya}
                    }
                }, init: function(b, c) {
                    return a.d.template.init(b, a.d.foreach.bb(c))
                }, update: function(b, c, d, e, g) {
                    return a.d.template.update(b, a.d.foreach.bb(c), d, e, g)
                }};
            a.g.W.foreach = !1;
            a.e.N.foreach = !0;
            a.d.hasfocus = {init: function(b, c, d) {
                    function e(f) {
                        b.__ko_hasfocusUpdating = !0;
                        var e = b.ownerDocument;
                        if ("activeElement"in
                                e) {
                            var g;
                            try {
                                g = e.activeElement
                            } catch (n) {
                                g = e.body
                            }
                            f = g === b
                        }
                        e = c();
                        a.g.na(e, d, "hasfocus", f, !0);
                        b.__ko_hasfocusLastValue = f;
                        b.__ko_hasfocusUpdating = !1
                    }
                    var g = e.bind(null, !0), f = e.bind(null, !1);
                    a.a.r(b, "focus", g);
                    a.a.r(b, "focusin", g);
                    a.a.r(b, "blur", f);
                    a.a.r(b, "focusout", f)
                }, update: function(b, c) {
                    var d = !!a.a.c(c());
                    b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue === d || (d ? b.focus() : b.blur(), a.l.q(a.a.aa, null, [b, d ? "focusin" : "focusout"]))
                }};
            a.g.S.hasfocus = !0;
            a.d.hasFocus = a.d.hasfocus;
            a.g.S.hasFocus = !0;
            a.d.html =
                    {init: function() {
                            return{controlsDescendantBindings: !0}
                        }, update: function(b, c) {
                            a.a.ja(b, c())
                        }};
            var H = "__ko_withIfBindingData";
            E("if");
            E("ifnot", !1, !0);
            E("with", !0, !1, function(a, c) {
                return a.createChildContext(c)
            });
            a.d.options = {init: function(b) {
                    if ("select" !== a.a.v(b))
                        throw Error("options binding applies only to SELECT elements");
                    for (; 0 < b.length; )
                        b.remove(0);
                    return{controlsDescendantBindings: !0}
                }, update: function(b, c, d) {
                    function e() {
                        return b.selectedOptions || a.a.da(b.options, function(a) {
                            return a.selected
                        })
                    }
                    function g(a, b, c) {
                        var d = typeof b;
                        return"function" == d ? b(a) : "string" == d ? a[b] : c
                    }
                    function f(c, d) {
                        if (n.length) {
                            var f = 0 <= a.a.k(n, a.j.p(d[0]));
                            a.a.lb(d[0], f);
                            m && !f && a.l.q(a.a.aa, null, [b, "change"])
                        }
                    }
                    var l = 0 != b.length && b.multiple ? b.scrollTop : null;
                    c = a.a.c(c());
                    var k = d.get("optionsIncludeDestroyed"), h = {}, n;
                    n = b.multiple ? a.a.ea(e(), a.j.p) : 0 <= b.selectedIndex ? [a.j.p(b.options[b.selectedIndex])] : [];
                    if (c) {
                        "undefined" == typeof c.length && (c = [c]);
                        var q = a.a.da(c, function(b) {
                            return k || b === p || null === b || !a.a.c(b._destroy)
                        });
                        d.has("optionsCaption") && (c = a.a.c(d.get("optionsCaption")), null !== c && c !== p && q.unshift(h))
                    } else
                        c = [];
                    var m = !1;
                    c = f;
                    d.has("optionsAfterRender") && (c = function(b, c) {
                        f(0, c);
                        a.l.q(d.get("optionsAfterRender"), null, [c[0], b !== h ? b : p])
                    });
                    a.a.Ha(b, q, function(b, c, f) {
                        f.length && (n = f[0].selected ? [a.j.p(f[0])] : [], m = !0);
                        c = u.createElement("option");
                        b === h ? (a.a.ja(c, d.get("optionsCaption")), a.j.ma(c, p)) : (f = g(b, d.get("optionsValue"), b), a.j.ma(c, a.a.c(f)), b = g(b, d.get("optionsText"), f), a.a.mb(c, b));
                        return[c]
                    }, null, c);
                    (b.multiple ?
                            n.length && e().length < n.length : n.length && 0 <= b.selectedIndex ? a.j.p(b.options[b.selectedIndex]) !== n[0] : n.length || 0 <= b.selectedIndex) && a.l.q(a.a.aa, null, [b, "change"]);
                    a.a.Fb(b);
                    l && 20 < Math.abs(l - b.scrollTop) && (b.scrollTop = l)
                }};
            a.d.options.Ca = "__ko.optionValueDomData__";
            a.d.selectedOptions = {after: ["options", "foreach"], init: function(b, c, d) {
                    a.a.r(b, "change", function() {
                        var e = c(), g = [];
                        a.a.m(b.getElementsByTagName("option"), function(b) {
                            b.selected && g.push(a.j.p(b))
                        });
                        a.g.na(e, d, "selectedOptions", g)
                    })
                }, update: function(b,
                        c) {
                    if ("select" != a.a.v(b))
                        throw Error("values binding applies only to SELECT elements");
                    var d = a.a.c(c());
                    d && "number" == typeof d.length && a.a.m(b.getElementsByTagName("option"), function(b) {
                        var c = 0 <= a.a.k(d, a.j.p(b));
                        a.a.lb(b, c)
                    })
                }};
            a.g.S.selectedOptions = !0;
            a.d.style = {update: function(b, c) {
                    var d = a.a.c(c() || {});
                    a.a.H(d, function(c, d) {
                        d = a.a.c(d);
                        b.style[c] = d || ""
                    })
                }};
            a.d.submit = {init: function(b, c, d, e, g) {
                    if ("function" != typeof c())
                        throw Error("The value for a submit binding must be a function");
                    a.a.r(b, "submit",
                            function(a) {
                                var d, e = c();
                                try {
                                    d = e.call(g.$data, b)
                                } finally {
                                    !0 !== d && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                                }
                            })
                }};
            a.d.text = {init: function() {
                    return{controlsDescendantBindings: !0}
                }, update: function(b, c) {
                    a.a.mb(b, c())
                }};
            a.e.N.text = !0;
            a.d.uniqueName = {init: function(b, c) {
                    if (c()) {
                        var d = "ko_unique_" + ++a.d.uniqueName.zb;
                        a.a.kb(b, d)
                    }
                }};
            a.d.uniqueName.zb = 0;
            a.d.value = {after: ["options", "foreach"], init: function(b, c, d) {
                    function e() {
                        l = !1;
                        var f = c(), e = a.j.p(b);
                        a.g.na(f, d, "value", e)
                    }
                    var g = ["change"], f = d.get("valueUpdate"),
                            l = !1;
                    f && ("string" == typeof f && (f = [f]), a.a.V(g, f), g = a.a.Sa(g));
                    !a.a.ha || ("input" != b.tagName.toLowerCase() || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete) || -1 != a.a.k(g, "propertychange") || (a.a.r(b, "propertychange", function() {
                        l = !0
                    }), a.a.r(b, "blur", function() {
                        l && e()
                    }));
                    a.a.m(g, function(c) {
                        var d = e;
                        a.a.Zb(c, "after") && (d = function() {
                            setTimeout(e, 0)
                        }, c = c.substring(5));
                        a.a.r(b, c, d)
                    })
                }, update: function(b, c) {
                    var d = "select" === a.a.v(b), e = a.a.c(c()), g = a.j.p(b);
                    e !== g && (g = function() {
                        a.j.ma(b,
                                e)
                    }, g(), d && (e !== a.j.p(b) ? a.l.q(a.a.aa, null, [b, "change"]) : setTimeout(g, 0)))
                }};
            a.g.S.value = !0;
            a.d.visible = {update: function(b, c) {
                    var d = a.a.c(c()), e = "none" != b.style.display;
                    d && !e ? b.style.display = "" : !d && e && (b.style.display = "none")
                }};
            (function(b) {
                a.d[b] = {init: function(c, d, e, g, f) {
                        return a.d.event.init.call(this, c, function() {
                            var a = {};
                            a[b] = d();
                            return a
                        }, e, g, f)
                    }}
            })("click");
            a.w = function() {
            };
            a.w.prototype.renderTemplateSource = function() {
                throw Error("Override renderTemplateSource");
            };
            a.w.prototype.createJavaScriptEvaluatorBlock =
                    function() {
                        throw Error("Override createJavaScriptEvaluatorBlock");
                    };
            a.w.prototype.makeTemplateSource = function(b, c) {
                if ("string" == typeof b) {
                    c = c || u;
                    var d = c.getElementById(b);
                    if (!d)
                        throw Error("Cannot find template with ID " + b);
                    return new a.n.i(d)
                }
                if (1 == b.nodeType || 8 == b.nodeType)
                    return new a.n.U(b);
                throw Error("Unknown template type: " + b);
            };
            a.w.prototype.renderTemplate = function(a, c, d, e) {
                a = this.makeTemplateSource(a, e);
                return this.renderTemplateSource(a, c, d)
            };
            a.w.prototype.isTemplateRewritten = function(a,
                    c) {
                return!1 === this.allowTemplateRewriting ? !0 : this.makeTemplateSource(a, c).data("isRewritten")
            };
            a.w.prototype.rewriteTemplate = function(a, c, d) {
                a = this.makeTemplateSource(a, d);
                c = c(a.text());
                a.text(c);
                a.data("isRewritten", !0)
            };
            a.b("templateEngine", a.w);
            a.La = function() {
                function b(b, c, d, l) {
                    b = a.g.Ea(b);
                    for (var k = a.g.W, h = 0; h < b.length; h++) {
                        var n = b[h].key;
                        if (k.hasOwnProperty(n)) {
                            var q = k[n];
                            if ("function" === typeof q) {
                                if (n = q(b[h].value))
                                    throw Error(n);
                            } else if (!q)
                                throw Error("This template engine does not support the '" +
                                        n + "' binding within its templates");
                        }
                    }
                    d = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.g.ia(b, {valueAccessors: !0}) + " } })()},'" + d.toLowerCase() + "')";
                    return l.createJavaScriptEvaluatorBlock(d) + c
                }
                var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
                return{Gb: function(b, c, d) {
                        c.isTemplateRewritten(b, d) || c.rewriteTemplate(b, function(b) {
                            return a.La.Sb(b, c)
                        },
                                d)
                    }, Sb: function(a, g) {
                        return a.replace(c, function(a, c, d, e, n) {
                            return b(n, c, d, g)
                        }).replace(d, function(a, c) {
                            return b(c, "\x3c!-- ko --\x3e", "#comment", g)
                        })
                    }, vb: function(b, c) {
                        return a.t.Aa(function(d, l) {
                            var k = d.nextSibling;
                            k && k.nodeName.toLowerCase() === c && a.oa(k, b, l)
                        })
                    }}
            }();
            a.b("__tr_ambtns", a.La.vb);
            (function() {
                a.n = {};
                a.n.i = function(a) {
                    this.i = a
                };
                a.n.i.prototype.text = function() {
                    var b = a.a.v(this.i), b = "script" === b ? "text" : "textarea" === b ? "value" : "innerHTML";
                    if (0 == arguments.length)
                        return this.i[b];
                    var c = arguments[0];
                    "innerHTML" === b ? a.a.ja(this.i, c) : this.i[b] = c
                };
                a.n.i.prototype.data = function(b) {
                    if (1 === arguments.length)
                        return a.a.f.get(this.i, "templateSourceData_" + b);
                    a.a.f.set(this.i, "templateSourceData_" + b, arguments[1])
                };
                a.n.U = function(a) {
                    this.i = a
                };
                a.n.U.prototype = new a.n.i;
                a.n.U.prototype.text = function() {
                    if (0 == arguments.length) {
                        var b = a.a.f.get(this.i, "__ko_anon_template__") || {};
                        b.Ma === p && b.qa && (b.Ma = b.qa.innerHTML);
                        return b.Ma
                    }
                    a.a.f.set(this.i, "__ko_anon_template__", {Ma: arguments[0]})
                };
                a.n.i.prototype.nodes =
                        function() {
                            if (0 == arguments.length)
                                return(a.a.f.get(this.i, "__ko_anon_template__") || {}).qa;
                            a.a.f.set(this.i, "__ko_anon_template__", {qa: arguments[0]})
                        };
                a.b("templateSources", a.n);
                a.b("templateSources.domElement", a.n.i);
                a.b("templateSources.anonymousTemplate", a.n.U)
            })();
            (function() {
                function b(b, c, d) {
                    var e;
                    for (c = a.e.nextSibling(c); b && (e = b) !== c; )
                        b = a.e.nextSibling(e), d(e, b)
                }
                function c(c, d) {
                    if (c.length) {
                        var e = c[0], g = c[c.length - 1], n = e.parentNode, q = a.F.instance, m = q.preprocessNode;
                        if (m) {
                            b(e, g, function(a, b) {
                                var c =
                                        a.previousSibling, d = m.call(q, a);
                                d && (a === e && (e = d[0] || b), a === g && (g = d[d.length - 1] || c))
                            });
                            c.length = 0;
                            if (!e)
                                return;
                            e === g ? c.push(e) : (c.push(e, g), a.a.X(c, n))
                        }
                        b(e, g, function(b) {
                            1 !== b.nodeType && 8 !== b.nodeType || a.Pa(d, b)
                        });
                        b(e, g, function(b) {
                            1 !== b.nodeType && 8 !== b.nodeType || a.t.rb(b, [d])
                        });
                        a.a.X(c, n)
                    }
                }
                function d(a) {
                    return a.nodeType ? a : 0 < a.length ? a[0] : null
                }
                function e(b, e, k, h, n) {
                    n = n || {};
                    var q = b && d(b), q = q && q.ownerDocument, m = n.templateEngine || g;
                    a.La.Gb(k, m, q);
                    k = m.renderTemplate(k, h, n, q);
                    if ("number" != typeof k.length ||
                            0 < k.length && "number" != typeof k[0].nodeType)
                        throw Error("Template engine must return an array of DOM nodes");
                    q = !1;
                    switch (e) {
                        case "replaceChildren":
                            a.e.R(b, k);
                            q = !0;
                            break;
                        case "replaceNode":
                            a.a.ib(b, k);
                            q = !0;
                            break;
                        case "ignoreTargetNode":
                            break;
                        default:
                            throw Error("Unknown renderMode: " + e);
                    }
                    q && (c(k, h), n.afterRender && a.l.q(n.afterRender, null, [k, h.$data]));
                    return k
                }
                var g;
                a.Ia = function(b) {
                    if (b != p && !(b instanceof a.w))
                        throw Error("templateEngine must inherit from ko.templateEngine");
                    g = b
                };
                a.Ga = function(b, c,
                        k, h, n) {
                    k = k || {};
                    if ((k.templateEngine || g) == p)
                        throw Error("Set a template engine before calling renderTemplate");
                    n = n || "replaceChildren";
                    if (h) {
                        var q = d(h);
                        return a.h(function() {
                            var g = c && c instanceof a.D ? c : new a.D(a.a.c(c)), p = "function" == typeof b ? b(g.$data, g) : b, g = e(h, n, p, g, k);
                            "replaceNode" == n && (h = g, q = d(h))
                        }, null, {sa: function() {
                                return!q || !a.a.ta(q)
                            }, K: q && "replaceNode" == n ? q.parentNode : q})
                    }
                    return a.t.Aa(function(d) {
                        a.Ga(b, c, k, d, "replaceNode")
                    })
                };
                a.Yb = function(b, d, g, h, n) {
                    function q(a, b) {
                        c(b, x);
                        g.afterRender &&
                                g.afterRender(b, a)
                    }
                    function m(c, d) {
                        x = n.createChildContext(a.a.c(c), g.as, function(a) {
                            a.$index = d
                        });
                        var h = "function" == typeof b ? b(c, x) : b;
                        return e(null, "ignoreTargetNode", h, x, g)
                    }
                    var x;
                    return a.h(function() {
                        var b = a.a.c(d) || [];
                        "undefined" == typeof b.length && (b = [b]);
                        b = a.a.da(b, function(b) {
                            return g.includeDestroyed || b === p || null === b || !a.a.c(b._destroy)
                        });
                        a.l.q(a.a.Ha, null, [h, b, m, g, q])
                    }, null, {K: h})
                };
                a.d.template = {init: function(b, c) {
                        var d = a.a.c(c());
                        "string" == typeof d || (d.name || 1 != b.nodeType && 8 != b.nodeType) ||
                                (d = 1 == b.nodeType ? b.childNodes : a.e.childNodes(b), d = a.a.Tb(d), (new a.n.U(b)).nodes(d));
                        return{controlsDescendantBindings: !0}
                    }, update: function(b, c, d, e, g) {
                        c = a.a.c(c());
                        d = {};
                        e = !0;
                        var q, m = null;
                        "string" != typeof c && (d = c, c = a.a.c(d.name), "if"in d && (e = a.a.c(d["if"])), e && "ifnot"in d && (e = !a.a.c(d.ifnot)), q = a.a.c(d.data));
                        "foreach"in d ? m = a.Yb(c || b, e && d.foreach || [], d, b, g) : e ? (g = "data"in d ? g.createChildContext(q, d.as) : g, m = a.Ga(c || b, g, d, b)) : a.e.ga(b);
                        g = m;
                        (q = a.a.f.get(b, "__ko__templateComputedDomDataKey__")) && "function" ==
                                typeof q.A && q.A();
                        a.a.f.set(b, "__ko__templateComputedDomDataKey__", g && g.Y() ? g : p)
                    }};
                a.g.W.template = function(b) {
                    b = a.g.Ea(b);
                    return 1 == b.length && b[0].unknown || a.g.Qb(b, "name") ? null : "This template engine does not support anonymous templates nested within its templates"
                };
                a.e.N.template = !0
            })();
            a.b("setTemplateEngine", a.Ia);
            a.b("renderTemplate", a.Ga);
            a.a.Ua = function() {
                function a(b, d, e, g, f) {
                    var l = Math.min, k = Math.max, h = [], n, q = b.length, m, p = d.length, v = p - q || 1, t = q + p + 1, r, u, w;
                    for (n = 0; n <= q; n++)
                        for (u = r, h.push(r = []),
                                w = l(p, n + v), m = k(0, n - 1); m <= w; m++)
                            r[m] = m ? n ? b[n - 1] === d[m - 1] ? u[m - 1] : l(u[m] || t, r[m - 1] || t) + 1 : m + 1 : n + 1;
                    l = [];
                    k = [];
                    v = [];
                    n = q;
                    for (m = p; n || m; )
                        p = h[n][m] - 1, m && p === h[n][m - 1] ? k.push(l[l.length] = {status: e, value: d[--m], index: m}) : n && p === h[n - 1][m] ? v.push(l[l.length] = {status: g, value: b[--n], index: n}) : (l.push({status: "retained", value: d[--m]}), --n);
                    if (k.length && v.length) {
                        b = 10 * q;
                        var s;
                        for (d = e = 0; (f || d < b) && (s = k[e]); e++) {
                            for (g = 0; h = v[g]; g++)
                                if (s.value === h.value) {
                                    s.moved = h.index;
                                    h.moved = s.index;
                                    v.splice(g, 1);
                                    d = g = 0;
                                    break
                                }
                            d += g
                        }
                    }
                    return l.reverse()
                }
                return function(c, d, e) {
                    c = c || [];
                    d = d || [];
                    return c.length <= d.length ? a(c, d, "added", "deleted", e) : a(d, c, "deleted", "added", e)
                }
            }();
            a.b("utils.compareArrays", a.a.Ua);
            (function() {
                function b(b, d, e, g, f) {
                    var l = [], k = a.h(function() {
                        var h = d(e, f, a.a.X(l, b)) || [];
                        0 < l.length && (a.a.ib(l, h), g && a.l.q(g, null, [e, h, f]));
                        l.splice(0, l.length);
                        a.a.V(l, h)
                    }, null, {K: b, sa: function() {
                            return!a.a.Oa(l)
                        }});
                    return{Q: l, h: k.Y() ? k : p}
                }
                a.a.Ha = function(c, d, e, g, f) {
                    function l(b, d) {
                        s = n[d];
                        u !== d && (B[b] = s);
                        s.xa(u++);
                        a.a.X(s.Q, c);
                        t.push(s);
                        w.push(s)
                    }
                    function k(b, c) {
                        if (b)
                            for (var d = 0, e = c.length; d < e; d++)
                                c[d] && a.a.m(c[d].Q, function(a) {
                                    b(a, d, c[d].ca)
                                })
                    }
                    d = d || [];
                    g = g || {};
                    var h = a.a.f.get(c, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === p, n = a.a.f.get(c, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], q = a.a.ea(n, function(a) {
                        return a.ca
                    }), m = a.a.Ua(q, d, g.dontLimitMoves), t = [], v = 0, u = 0, r = [], w = [];
                    d = [];
                    for (var B = [], q = [], s, z = 0, A, C; A = m[z]; z++)
                        switch (C = A.moved, A.status) {
                            case "deleted":
                                C === p && (s = n[v], s.h && s.h.A(), r.push.apply(r, a.a.X(s.Q, c)),
                                        g.beforeRemove && (d[z] = s, w.push(s)));
                                v++;
                                break;
                            case "retained":
                                l(z, v++);
                                break;
                            case "added":
                                C !== p ? l(z, C) : (s = {ca: A.value, xa: a.o(u++)}, t.push(s), w.push(s), h || (q[z] = s))
                        }
                    k(g.beforeMove, B);
                    a.a.m(r, g.beforeRemove ? a.J : a.removeNode);
                    for (var z = 0, h = a.e.firstChild(c), E; s = w[z]; z++) {
                        s.Q || a.a.extend(s, b(c, e, s.ca, f, s.xa));
                        for (v = 0; m = s.Q[v]; h = m.nextSibling, E = m, v++)
                            m !== h && a.e.Za(c, m, E);
                        !s.Mb && f && (f(s.ca, s.Q, s.xa), s.Mb = !0)
                    }
                    k(g.beforeRemove, d);
                    k(g.afterMove, B);
                    k(g.afterAdd, q);
                    a.a.f.set(c, "setDomNodeChildrenFromArrayMapping_lastMappingResult",
                            t)
                }
            })();
            a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.Ha);
            a.G = function() {
                this.allowTemplateRewriting = !1
            };
            a.G.prototype = new a.w;
            a.G.prototype.renderTemplateSource = function(b) {
                var c = (9 > a.a.ha ? 0 : b.nodes) ? b.nodes() : null;
                if (c)
                    return a.a.P(c.cloneNode(!0).childNodes);
                b = b.text();
                return a.a.Da(b)
            };
            a.G.ya = new a.G;
            a.Ia(a.G.ya);
            a.b("nativeTemplateEngine", a.G);
            (function() {
                a.za = function() {
                    var a = this.Pb = function() {
                        if ("undefined" == typeof t || !t.tmpl)
                            return 0;
                        try {
                            if (0 <= t.tmpl.tag.tmpl.open.toString().indexOf("__"))
                                return 2
                        } catch (a) {
                        }
                        return 1
                    }();
                    this.renderTemplateSource = function(b, e, g) {
                        g = g || {};
                        if (2 > a)
                            throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
                        var f = b.data("precompiled");
                        f || (f = b.text() || "", f = t.template(null, "{{ko_with $item.koBindingContext}}" + f + "{{/ko_with}}"), b.data("precompiled", f));
                        b = [e.$data];
                        e = t.extend({koBindingContext: e}, g.templateOptions);
                        e = t.tmpl(f, b, e);
                        e.appendTo(u.createElement("div"));
                        t.fragments = {};
                        return e
                    };
                    this.createJavaScriptEvaluatorBlock = function(a) {
                        return"{{ko_code ((function() { return " +
                                a + " })()) }}"
                    };
                    this.addTemplate = function(a, b) {
                        u.write("<script type='text/html' id='" + a + "'>" + b + "\x3c/script>")
                    };
                    0 < a && (t.tmpl.tag.ko_code = {open: "__.push($1 || '');"}, t.tmpl.tag.ko_with = {open: "with($1) {", close: "} "})
                };
                a.za.prototype = new a.w;
                var b = new a.za;
                0 < b.Pb && a.Ia(b);
                a.b("jqueryTmplTemplateEngine", a.za)
            })()
        })
    })();
})();
