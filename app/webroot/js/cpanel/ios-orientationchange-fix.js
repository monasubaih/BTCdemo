/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.*/(function(a) {
    function l() {
        c.setAttribute("content", f), g = !0
    }
    function m() {
        c.setAttribute("content", e), g = !1
    }
    function n(b) {
        k = b.accelerationIncludingGravity, h = Math.abs(k.x), i = Math.abs(k.y), j = Math.abs(k.z), (!a.orientation || a.orientation === 180) && (h > 7 || (j > 6 && i < 8 || j < 8 && i > 6) && h > 5) ? g && m() : g || l()
    }
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1))
        return;
    var b = a.document;
    if (!b.querySelector)
        return;
    var c = b.querySelector("meta[name=viewport]"), d = c && c.getAttribute("content"), e = d + ",maximum-scale=1", f = d + ",maximum-scale=10", g = !0, h, i, j, k;
    if (!c)
        return;
    a.addEventListener("orientationchange", l, !1), a.addEventListener("devicemotion", n, !1)
})(this);