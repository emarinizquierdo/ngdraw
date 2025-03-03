/* build: `node build.js modules=ALL` */ /*! Fabric.js Copyright 2008-2012, Printio (Juriy Zaytsev, Maxim Chernyak) */
var fabric = fabric || {
    version: "0.9.15"
};
typeof exports != "undefined" && (exports.fabric = fabric), typeof document != "undefined" && typeof window != "undefined" ? (fabric.document = document, fabric.window = window) : (fabric.document = require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"), fabric.window = fabric.document.createWindow()), fabric.isTouchSupported = "ontouchstart" in fabric.document.documentElement, fabric.isLikelyNode = typeof Buffer != "undefined" && typeof window == "undefined";
var Cufon = function () {
    function r(e) {
        var t = this.face = e.face;
        this.glyphs = e.glyphs, this.w = e.w, this.baseSize = parseInt(t["units-per-em"], 10), this.family = t["font-family"].toLowerCase(), this.weight = t["font-weight"], this.style = t["font-style"] || "normal", this.viewBox = function () {
            var e = t.bbox.split(/\s+/),
                n = {
                    minX: parseInt(e[0], 10),
                    minY: parseInt(e[1], 10),
                    maxX: parseInt(e[2], 10),
                    maxY: parseInt(e[3], 10)
                };
            return n.width = n.maxX - n.minX, n.height = n.maxY - n.minY, n.toString = function () {
                return [this.minX, this.minY, this.width, this.height].join(" ")
            }, n
        }(), this.ascent = -parseInt(t.ascent, 10), this.descent = -parseInt(t.descent, 10), this.height = -this.ascent + this.descent
    }

    function i() {
        var e = {},
            t = {
                oblique: "italic",
                italic: "oblique"
            };
        this.add = function (t) {
            (e[t.style] || (e[t.style] = {}))[t.weight] = t
        }, this.get = function (n, r) {
            var i = e[n] || e[t[n]] || e.normal || e.italic || e.oblique;
            if (!i) return null;
            r = {
                normal: 400,
                bold: 700
            }[r] || parseInt(r, 10);
            if (i[r]) return i[r];
            var s = {
                    1: 1,
                    99: 0
                }[r % 100],
                o = [],
                u, a;
            s === undefined && (s = r > 400), r == 500 && (r = 400);
            for (var f in i) {
                f = parseInt(f, 10);
                if (!u || f < u) u = f;
                if (!a || f > a) a = f;
                o.push(f)
            }
            return r < u && (r = u), r > a && (r = a), o.sort(function (e, t) {
                return (s ? e > r && t > r ? e < t : e > t : e < r && t < r ? e > t : e < t) ? -1 : 1
            }), i[o[0]]
        }
    }

    function s() {
        function t(e, t) {
            return e.contains ? e.contains(t) : e.compareDocumentPosition(t) & 16
        }

        function n(e) {
            var n = e.relatedTarget;
            if (!n || t(this, n)) return;
            i(this)
        }

        function r(e) {
            i(this)
        }

        function i(t) {
            setTimeout(function () {
                e.replace(t, g.get(t).options, !0)
            }, 10)
        }
        this.attach = function (e) {
            e.onmouseenter === undefined ? (a(e, "mouseover", n), a(e, "mouseout", n)) : (a(e, "mouseenter", r), a(e, "mouseleave", r))
        }
    }

    function o() {
        function n(e) {
            return e.cufid || (e.cufid = ++t)
        }
        var e = {},
            t = 0;
        this.get = function (t) {
            var r = n(t);
            return e[r] || (e[r] = {})
        }
    }

    function u(e) {
        var t = {},
            r = {};
        this.get = function (n) {
            return t[n] != undefined ? t[n] : e[n]
        }, this.getSize = function (e, t) {
            return r[e] || (r[e] = new n.Size(this.get(e), t))
        }, this.extend = function (e) {
            for (var n in e) t[n] = e[n];
            return this
        }
    }

    function a(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, function () {
            return n.call(e, fabric.window.event)
        })
    }

    function f(e, t) {
        var n = g.get(e);
        return n.options ? e : (t.hover && t.hoverables[e.nodeName.toLowerCase()] && y.attach(e), n.options = t, e)
    }

    function l(e) {
        var t = {};
        return function (n) {
            return t.hasOwnProperty(n) || (t[n] = e.apply(null, arguments)), t[n]
        }
    }

    function c(e, t) {
        t || (t = n.getStyle(e));
        var r = n.quotedList(t.get("fontFamily").toLowerCase()),
            i;
        for (var s = 0, o = r.length; s < o; ++s) {
            i = r[s];
            if (E[i]) return E[i].get(t.get("fontStyle"), t.get("fontWeight"))
        }
        return null
    }

    function h(e) {
        return fabric.document.getElementsByTagName(e)
    }

    function p() {
        var e = {},
            t;
        for (var n = 0, r = arguments.length; n < r; ++n)
            for (t in arguments[n]) e[t] = arguments[n][t];
        return e
    }

    function d(e, t, r, i, s, o) {
        var u = i.separate;
        if (u == "none") return w[i.engine].apply(null, arguments);
        var a = fabric.document.createDocumentFragment(),
            f, l = t.split(x[u]),
            c = u == "words";
        c && m && (/^\s/.test(t) && l.unshift(""), /\s$/.test(t) && l.push(""));
        for (var h = 0, p = l.length; h < p; ++h) f = w[i.engine](e, c ? n.textAlign(l[h], r, h, p) : l[h], r, i, s, o, h < p - 1), f && a.appendChild(f);
        return a
    }

    function v(e, t) {
        var r, i, s, o;
        for (var u = f(e, t).firstChild; u; u = s) {
            s = u.nextSibling, o = !1;
            if (u.nodeType == 1) {
                if (!u.firstChild) continue;
                if (!/cufon/.test(u.className)) {
                    arguments.callee(u, t);
                    continue
                }
                o = !0
            }
            i || (i = n.getStyle(e).extend(t)), r || (r = c(e, i));
            if (!r) continue;
            if (o) {
                w[t.engine](r, null, i, t, u, e);
                continue
            }
            var a = u.data;
            typeof G_vmlCanvasManager != "undefined" && (a = a.replace(/\r/g, "\n"));
            if (a === "") continue;
            var l = d(r, a, i, t, u, e);
            l ? u.parentNode.replaceChild(l, u) : u.parentNode.removeChild(u)
        }
    }
    var e = function () {
            return e.replace.apply(null, arguments)
        },
        t = e.DOM = {
            ready: function () {
                var e = !1,
                    t = {
                        loaded: 1,
                        complete: 1
                    },
                    n = [],
                    r = function () {
                        if (e) return;
                        e = !0;
                        for (var t; t = n.shift(); t());
                    };
                return fabric.document.addEventListener && (fabric.document.addEventListener("DOMContentLoaded", r, !1), fabric.window.addEventListener("pageshow", r, !1)), !fabric.window.opera && fabric.document.readyState && function () {
                        t[fabric.document.readyState] ? r() : setTimeout(arguments.callee, 10)
                    }(), fabric.document.readyState && fabric.document.createStyleSheet && function () {
                        try {
                            fabric.document.body.doScroll("left"), r()
                        } catch (e) {
                            setTimeout(arguments.callee, 1)
                        }
                    }(), a(fabric.window, "load", r),
                    function (t) {
                        arguments.length ? e ? t() : n.push(t) : r()
                    }
            }()
        },
        n = e.CSS = {
            Size: function (e, t) {
                this.value = parseFloat(e), this.unit = String(e).match(/[a-z%]*$/)[0] || "px", this.convert = function (e) {
                    return e / t * this.value
                }, this.convertFrom = function (e) {
                    return e / this.value * t
                }, this.toString = function () {
                    return this.value + this.unit
                }
            },
            getStyle: function (e) {
                return new u(e.style)
            },
            quotedList: l(function (e) {
                var t = [],
                    n = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,
                    r;
                while (r = n.exec(e)) t.push(r[3] || r[1]);
                return t
            }),
            ready: function () {
                var e = !1,
                    n = [],
                    r = function () {
                        e = !0;
                        for (var t; t = n.shift(); t());
                    },
                    i = Object.prototype.propertyIsEnumerable ? h("style") : {
                        length: 0
                    },
                    s = h("link");
                return t.ready(function () {
                        var e = 0,
                            t;
                        for (var n = 0, o = s.length; t = s[n], n < o; ++n) !t.disabled && t.rel.toLowerCase() == "stylesheet" && ++e;
                        fabric.document.styleSheets.length >= i.length + e ? r() : setTimeout(arguments.callee, 10)
                    }),
                    function (t) {
                        e ? t() : n.push(t)
                    }
            }(),
            supports: function (e, t) {
                var n = fabric.document.createElement("span").style;
                return n[e] === undefined ? !1 : (n[e] = t, n[e] === t)
            },
            textAlign: function (e, t, n, r) {
                return t.get("textAlign") == "right" ? n > 0 && (e = " " + e) : n < r - 1 && (e += " "), e
            },
            textDecoration: function (e, t) {
                t || (t = this.getStyle(e));
                var n = {
                    underline: null,
                    overline: null,
                    "line-through": null
                };
                for (var r = e; r.parentNode && r.parentNode.nodeType == 1;) {
                    var i = !0;
                    for (var s in n) {
                        if (n[s]) continue;
                        t.get("textDecoration").indexOf(s) != -1 && (n[s] = t.get("color")), i = !1
                    }
                    if (i) break;
                    t = this.getStyle(r = r.parentNode)
                }
                return n
            },
            textShadow: l(function (e) {
                if (e == "none") return null;
                var t = [],
                    n = {},
                    r, i = 0,
                    s = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
                while (r = s.exec(e)) r[0] == "," ? (t.push(n), n = {}, i = 0) : r[1] ? n.color = r[1] : n[["offX", "offY", "blur"][i++]] = r[2];
                return t.push(n), t
            }),
            color: l(function (e) {
                var t = {};
                return t.color = e.replace(/^rgba\((.*?),\s*([\d.]+)\)/, function (e, n, r) {
                    return t.opacity = parseFloat(r), "rgb(" + n + ")"
                }), t
            }),
            textTransform: function (e, t) {
                return e[{
                    uppercase: "toUpperCase",
                    lowercase: "toLowerCase"
                }[t.get("textTransform")] || "toString"]()
            }
        },
        m = " ".split(/\s+/).length == 0,
        g = new o,
        y = new s,
        b = [],
        w = {},
        E = {},
        S = {
            engine: null,
            hover: !1,
            hoverables: {
                a: !0
            },
            printable: !0,
            selector: fabric.window.Sizzle || fabric.window.jQuery && function (e) {
                return jQuery(e)
            } || fabric.window.dojo && dojo.query || fabric.window.$$ && function (e) {
                return $$(e)
            } || fabric.window.$ && function (e) {
                return $(e)
            } || fabric.document.querySelectorAll && function (e) {
                return fabric.document.querySelectorAll(e)
            } || h,
            separate: "words",
            textShadow: "none"
        },
        x = {
            words: /\s+/,
            characters: ""
        };
    return e.now = function () {
        return t.ready(), e
    }, e.refresh = function () {
        var t = b.splice(0, b.length);
        for (var n = 0, r = t.length; n < r; ++n) e.replace.apply(null, t[n]);
        return e
    }, e.registerEngine = function (t, n) {
        return n ? (w[t] = n, e.set("engine", t)) : e
    }, e.registerFont = function (t) {
        var n = new r(t),
            s = n.family;
        return E[s] || (E[s] = new i), E[s].add(n), e.set("fontFamily", '"' + s + '"')
    }, e.replace = function (t, r, i) {
        r = p(S, r);
        if (!r.engine) return e;
        typeof r.textShadow == "string" && r.textShadow && (r.textShadow = n.textShadow(r.textShadow)), i || b.push(arguments);
        if (t.nodeType || typeof t == "string") t = [t];
        return n.ready(function () {
            for (var n = 0, i = t.length; n < i; ++n) {
                var s = t[n];
                typeof s == "string" ? e.replace(r.selector(s), r, !0) : v(s, r)
            }
        }), e
    }, e.replaceElement = function (e, t) {
        return t = p(S, t), typeof t.textShadow == "string" && t.textShadow && (t.textShadow = n.textShadow(t.textShadow)), v(e, t)
    }, e.engines = w, e.fonts = E, e.getOptions = function () {
        return p(S)
    }, e.set = function (t, n) {
        return S[t] = n, e
    }, e
}();
Cufon.registerEngine("canvas", function () {
    function s(e, t) {
        var n = 0,
            r = 0,
            i = [],
            s = /([mrvxe])([^a-z]*)/g,
            o;
        e: for (var u = 0; o = s.exec(e); ++u) {
            var a = o[2].split(",");
            switch (o[1]) {
            case "v":
                i[u] = {
                    m: "bezierCurveTo",
                    a: [n + ~~a[0], r + ~~a[1], n + ~~a[2], r + ~~a[3], n += ~~a[4], r += ~~a[5]]
                };
                break;
            case "r":
                i[u] = {
                    m: "lineTo",
                    a: [n += ~~a[0], r += ~~a[1]]
                };
                break;
            case "m":
                i[u] = {
                    m: "moveTo",
                    a: [n = ~~a[0], r = ~~a[1]]
                };
                break;
            case "x":
                i[u] = {
                    m: "closePath",
                    a: []
                };
                break;
            case "e":
                break e
            }
            t[i[u].m].apply(t, i[u].a)
        }
        return i
    }

    function o(e, t) {
        for (var n = 0, r = e.length; n < r; ++n) {
            var i = e[n];
            t[i.m].apply(t, i.a)
        }
    }
    var e = Cufon.CSS.supports("display", "inline-block"),
        t = !e && (fabric.document.compatMode == "BackCompat" || /frameset|transitional/i.test(fabric.document.doctype.publicId)),
        n = fabric.document.createElement("style");
    n.type = "text/css";
    var r = fabric.document.createTextNode(".cufon-canvas{text-indent:0}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle" + (t ? "" : ";font-size:1px;line-height:1px") + "}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden}" + (e ? ".cufon-canvas canvas{position:relative}" : ".cufon-canvas canvas{position:absolute}") + "}" + "@media print{" + ".cufon-canvas{padding:0 !important}" + ".cufon-canvas canvas{display:none}" + ".cufon-canvas .cufon-alt{display:inline}" + "}");
    try {
        n.appendChild(r)
    } catch (i) {
        n.setAttribute("type", "text/css"), n.styleSheet.cssText = r.data
    }
    return fabric.document.getElementsByTagName("head")[0].appendChild(n),
        function (t, n, r, i, u, a) {
            function $(e, t) {
                W.strokeStyle = t, W.beginPath(), W.moveTo(0, e), W.lineTo(N, e), W.stroke()
            }

            function Q() {
                W.save(), W.fillStyle = i.backgroundColor;
                var e = 0,
                    n = 0,
                    r = [{
                        left: 0
                    }];
                i.textAlign === "right" ? (W.translate(M[n], 0), r[0].left = M[n] * X) : i.textAlign === "center" && (W.translate(M[n] / 2, 0), r[0].left = M[n] / 2 * X);
                for (var s = 0, o = T.length; s < o; ++s) {
                    if (T[s] === "\n") {
                        n++;
                        var u = -t.ascent - t.ascent / 5 * i.lineHeight,
                            a = r[r.length - 1],
                            f = {
                                left: 0
                            };
                        a.width = e * X, a.height = (-t.ascent + t.descent) * X, i.textAlign === "right" ? (W.translate(-N, u), W.translate(M[n], 0), f.left = M[n] * X) : i.textAlign === "center" ? (W.translate(-e - M[n - 1] / 2, u), W.translate(M[n] / 2, 0), f.left = M[n] / 2 * X) : W.translate(-e, u), r.push(f), e = 0;
                        continue
                    }
                    var l = t.glyphs[T[s]] || t.missingGlyph;
                    if (!l) continue;
                    var c = Number(l.w || t.w) + h;
                    i.backgroundColor && (W.save(), W.translate(0, t.ascent), W.fillRect(0, 0, c + 10, -t.ascent + t.descent), W.restore()), W.translate(c, 0), e += c, s == o - 1 && (r[r.length - 1].width = e * X, r[r.length - 1].height = (-t.ascent + t.descent) * X)
                }
                W.restore(), Cufon.textOptions.boundaries = r
            }

            function G(e) {
                W.fillStyle = e || Cufon.textOptions.color || r.get("color");
                var n = 0,
                    u = 0;
                i.textAlign === "right" ? W.translate(M[u], 0) : i.textAlign === "center" && W.translate(M[u] / 2, 0);
                for (var a = 0, f = T.length; a < f; ++a) {
                    if (T[a] === "\n") {
                        u++;
                        var l = -t.ascent - t.ascent / 5 * i.lineHeight;
                        i.textAlign === "right" ? (W.translate(-N, l), W.translate(M[u], 0)) : i.textAlign === "center" ? (W.translate(-n - M[u - 1] / 2, l), W.translate(M[u] / 2, 0)) : W.translate(-n, l), n = 0;
                        continue
                    }
                    var c = t.glyphs[T[a]] || t.missingGlyph;
                    if (!c) continue;
                    var p = Number(c.w || t.w) + h;
                    J && (W.save(), W.strokeStyle = W.fillStyle, W.lineWidth += W.lineWidth, W.beginPath(), J.underline && (W.moveTo(0, -t.face["underline-position"] + .5), W.lineTo(p, -t.face["underline-position"] + .5)), J.overline && (W.moveTo(0, t.ascent + .5), W.lineTo(p, t.ascent + .5)), J["line-through"] && (W.moveTo(0, -t.descent + .5), W.lineTo(p, -t.descent + .5)), W.stroke(), W.restore()), K && (W.save(), W.transform(1, 0, -0.25, 1, 0, 0)), W.beginPath(), c.d && (c.code ? o(c.code, W) : c.code = s("m" + c.d, W)), W.fill(), i.strokeStyle && (W.closePath(), W.save(), W.lineWidth = i.strokeWidth, W.strokeStyle = i.strokeStyle, W.stroke(), W.restore()), K && W.restore(), W.translate(p, 0), n += p
                }
            }
            var f = n === null,
                l = t.viewBox,
                c = r.getSize("fontSize", t.baseSize),
                h = r.get("letterSpacing");
            h = h == "normal" ? 0 : c.convertFrom(parseInt(h, 10));
            var p = 0,
                d = 0,
                v = 0,
                m = 0,
                g = i.textShadow,
                y = [];
            Cufon.textOptions.shadowOffsets = [], Cufon.textOptions.shadows = null;
            if (g) {
                Cufon.textOptions.shadows = g;
                for (var b = 0, w = g.length; b < w; ++b) {
                    var E = g[b],
                        S = c.convertFrom(parseFloat(E.offX)),
                        x = c.convertFrom(parseFloat(E.offY));
                    y[b] = [S, x]
                }
            }
            var T = Cufon.CSS.textTransform(f ? u.alt : n, r).split(""),
                N = 0,
                C = null,
                k = 0,
                L = 1,
                A = [];
            for (var b = 0, w = T.length; b < w; ++b) {
                if (T[b] === "\n") {
                    L++, N > k && (k = N), A.push(N), N = 0;
                    continue
                }
                var O = t.glyphs[T[b]] || t.missingGlyph;
                if (!O) continue;
                N += C = Number(O.w || t.w) + h
            }
            A.push(N), N = Math.max(k, N);
            var M = [];
            for (var b = A.length; b--;) M[b] = N - A[b];
            if (C === null) return null;
            d += l.width - C, m += l.minX;
            var _, D;
            if (f) _ = u, D = u.firstChild;
            else {
                _ = fabric.document.createElement("span"), _.className = "cufon cufon-canvas", _.alt = n, D = fabric.document.createElement("canvas"), _.appendChild(D);
                if (i.printable) {
                    var P = fabric.document.createElement("span");
                    P.className = "cufon-alt", P.appendChild(fabric.document.createTextNode(n)), _.appendChild(P)
                }
            }
            var H = _.style,
                B = D.style || {},
                j = c.convert(l.height - p + v),
                F = Math.ceil(j),
                I = F / j;
            D.width = Math.ceil(c.convert(N + d - m) * I), D.height = F, p += l.minY, B.top = Math.round(c.convert(p - t.ascent)) + "px", B.left = Math.round(c.convert(m)) + "px";
            var q = Math.ceil(c.convert(N * I)),
                R = q + "px",
                U = c.convert(t.height),
                z = (i.lineHeight - 1) * c.convert(-t.ascent / 5) * (L - 1);
            Cufon.textOptions.width = q, Cufon.textOptions.height = U * L + z, Cufon.textOptions.lines = L, Cufon.textOptions.totalLineHeight = z, e ? (H.width = R, H.height = U + "px") : (H.paddingLeft = R, H.paddingBottom = U - 1 + "px");
            var W = Cufon.textOptions.context || D.getContext("2d"),
                X = F / l.height;
            Cufon.textOptions.fontAscent = t.ascent * X, Cufon.textOptions.boundaries = null;
            for (var V = Cufon.textOptions.shadowOffsets, b = y.length; b--;) V[b] = [y[b][0] * X, y[b][1] * X];
            W.save(), W.scale(X, X), W.translate(-m - 1 / X * D.width / 2 + (Cufon.fonts[t.family].offsetLeft || 0), -p - Cufon.textOptions.height / X / 2 + (Cufon.fonts[t.family].offsetTop || 0)), W.lineWidth = t.face["underline-thickness"], W.save();
            var J = Cufon.getTextDecoration(i),
                K = i.fontStyle === "italic";
            W.save(), Q();
            if (g)
                for (var b = 0, w = g.length; b < w; ++b) {
                    var E = g[b];
                    W.save(), W.translate.apply(W, y[b]), G(E.color), W.restore()
                }
            return G(), W.restore(), W.restore(), W.restore(), _
        }
}()), Cufon.registerEngine("vml", function () {
    function n(e, t) {
        return r(e, /(?:em|ex|%)$/i.test(t) ? "1em" : t)
    }

    function r(e, t) {
        if (/px$/i.test(t)) return parseFloat(t);
        var n = e.style.left,
            r = e.runtimeStyle.left;
        e.runtimeStyle.left = e.currentStyle.left, e.style.left = t;
        var i = e.style.pixelLeft;
        return e.style.left = n, e.runtimeStyle.left = r, i
    }
    if (!fabric.document.namespaces) return;
    var e = fabric.document.createElement("canvas");
    if (e && e.getContext && e.getContext.apply) return;
    fabric.document.namespaces.cvml == null && fabric.document.namespaces.add("cvml", "urn:schemas-microsoft-com:vml");
    var t = fabric.document.createElement("cvml:shape");
    t.style.behavior = "url(#default#VML)";
    if (!t.coordsize) return;
    return t = null, fabric.document.write('<style type="text/css">.cufon-vml-canvas{text-indent:0}@media screen{cvml\\:shape,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}.cufon-vml-canvas{position:absolute;text-align:left}.cufon-vml{display:inline-block;position:relative;vertical-align:middle}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none}.cufon-vml .cufon-alt{display:inline}}</style>'),
        function (e, t, i, s, o, u, a) {
            var f = t === null;
            f && (t = o.alt);
            var l = e.viewBox,
                c = i.computedFontSize || (i.computedFontSize = new Cufon.CSS.Size(n(u, i.get("fontSize")) + "px", e.baseSize)),
                h = i.computedLSpacing;
            h == undefined && (h = i.get("letterSpacing"), i.computedLSpacing = h = h == "normal" ? 0 : ~~c.convertFrom(r(u, h)));
            var p, d;
            if (f) p = o, d = o.firstChild;
            else {
                p = fabric.document.createElement("span"), p.className = "cufon cufon-vml", p.alt = t, d = fabric.document.createElement("span"), d.className = "cufon-vml-canvas", p.appendChild(d);
                if (s.printable) {
                    var v = fabric.document.createElement("span");
                    v.className = "cufon-alt", v.appendChild(fabric.document.createTextNode(t)), p.appendChild(v)
                }
                a || p.appendChild(fabric.document.createElement("cvml:shape"))
            }
            var m = p.style,
                g = d.style,
                y = c.convert(l.height),
                b = Math.ceil(y),
                w = b / y,
                E = l.minX,
                S = l.minY;
            g.height = b, g.top = Math.round(c.convert(S - e.ascent)), g.left = Math.round(c.convert(E)), m.height = c.convert(e.height) + "px";
            var x = Cufon.getTextDecoration(s),
                T = i.get("color"),
                N = Cufon.CSS.textTransform(t, i).split(""),
                C = 0,
                k = 0,
                L = null,
                A, O, M = s.textShadow;
            for (var _ = 0, D = 0, P = N.length; _ < P; ++_) A = e.glyphs[N[_]] || e.missingGlyph, A && (C += L = ~~(A.w || e.w) + h);
            if (L === null) return null;
            var H = -E + C + (l.width - L),
                B = c.convert(H * w),
                j = Math.round(B),
                F = H + "," + l.height,
                I, q = "r" + F + "nsnf";
            for (_ = 0; _ < P; ++_) {
                A = e.glyphs[N[_]] || e.missingGlyph;
                if (!A) continue;
                f ? (O = d.childNodes[D], O.firstChild && O.removeChild(O.firstChild)) : (O = fabric.document.createElement("cvml:shape"), d.appendChild(O)), O.stroked = "f", O.coordsize = F, O.coordorigin = I = E - k + "," + S, O.path = (A.d ? "m" + A.d + "xe" : "") + "m" + I + q, O.fillcolor = T;
                var R = O.style;
                R.width = j, R.height = b;
                if (M) {
                    var U = M[0],
                        z = M[1],
                        W = Cufon.CSS.color(U.color),
                        X, V = fabric.document.createElement("cvml:shadow");
                    V.on = "t", V.color = W.color, V.offset = U.offX + "," + U.offY, z && (X = Cufon.CSS.color(z.color), V.type = "double", V.color2 = X.color, V.offset2 = z.offX + "," + z.offY), V.opacity = W.opacity || X && X.opacity || 1, O.appendChild(V)
                }
                k += ~~(A.w || e.w) + h, ++D
            }
            return m.width = Math.max(Math.ceil(c.convert(C * w)), 0), p
        }
}()), Cufon.getTextDecoration = function (e) {
    return {
        underline: e.textDecoration === "underline",
        overline: e.textDecoration === "overline",
        "line-through": e.textDecoration === "line-through"
    }
}, typeof exports != "undefined" && (exports.Cufon = Cufon);
var JSON;
JSON || (JSON = {}),
    function () {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a) return "null";
                gap += indent, u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                    return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                }
                if (rep && typeof rep == "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                } else
                    for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1) indent += " ";
            else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), fabric.log = function () {}, fabric.warn = function () {}, typeof console != "undefined" && (typeof console.log != "undefined" && console.log.apply && (fabric.log = function () {
        return console.log.apply(console, arguments)
    }), typeof console.warn != "undefined" && console.warn.apply && (fabric.warn = function () {
        return console.warn.apply(console, arguments)
    })), fabric.Observable = {
        observe: function (e, t) {
            this.__eventListeners || (this.__eventListeners = {});
            if (arguments.length === 1)
                for (var n in e) this.on(n, e[n]);
            else this.__eventListeners[e] || (this.__eventListeners[e] = []), this.__eventListeners[e].push(t)
        },
        stopObserving: function (e, t) {
            this.__eventListeners || (this.__eventListeners = {}), this.__eventListeners[e] && fabric.util.removeFromArray(this.__eventListeners[e], t)
        },
        fire: function (e, t) {
            this.__eventListeners || (this.__eventListeners = {});
            var n = this.__eventListeners[e];
            if (!n) return;
            for (var r = 0, i = n.length; r < i; r++) n[r](t || {})
        }
    }, fabric.Observable.on = fabric.Observable.observe, fabric.Observable.off = fabric.Observable.stopObserving,
    function () {
        function e(e, t) {
            var n = e.indexOf(t);
            return n !== -1 && e.splice(n, 1), e
        }

        function t(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        }

        function r(e) {
            return e * n
        }

        function i(e, t) {
            return parseFloat(Number(e).toFixed(t))
        }

        function s() {
            return !1
        }

        function o(e) {
            e || (e = {});
            var t = +(new Date),
                n = e.duration || 500,
                r = t + n,
                i, s = e.onChange || function () {},
                o = e.abort || function () {
                    return !1
                },
                u = e.easing || function (e, t, n, r) {
                    return -n * Math.cos(e / r * (Math.PI / 2)) + n + t
                },
                f = "startValue" in e ? e.startValue : 0,
                l = "endValue" in e ? e.endValue : 100,
                c = e.byValue || l - f;
            e.onStart && e.onStart(),
                function h() {
                    i = +(new Date);
                    var l = i > r ? n : i - t;
                    s(u(l, f, c, n));
                    if (i > r || o()) {
                        e.onComplete && e.onComplete();
                        return
                    }
                    a(h)
                }()
        }

        function f(e, t, n) {
            if (e) {
                var r = new Image;
                r.onload = function () {
                    t && t.call(n, r), r = r.onload = null
                }, r.src = e
            } else t && t.call(n, e)
        }

        function l(e, t) {
            function n(e) {
                return fabric[fabric.util.string.camelize(fabric.util.string.capitalize(e))]
            }

            function r() {
                ++s === o && t && t(i)
            }
            var i = [],
                s = 0,
                o = e.length;
            e.forEach(function (e, t) {
                if (!e.type) return;
                var s = n(e.type);
                s.async ? s.fromObject(e, function (e) {
                    i[t] = e, r()
                }) : (i[t] = s.fromObject(e), r())
            })
        }

        function c(e, t, n) {
            var r = e.length > 1 ? new fabric.PathGroup(e, t) : e[0];
            return typeof n != "undefined" && r.setSourcePath(n), r
        }
        fabric.util = {};
        var n = Math.PI / 180,
            u = fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function (e) {
                fabric.window.setTimeout(e, 1e3 / 60)
            },
            a = function () {
                return u.apply(fabric.window, arguments)
            };
        fabric.util.removeFromArray = e, fabric.util.degreesToRadians = r, fabric.util.toFixed = i, fabric.util.getRandomInt = t, fabric.util.falseFunction = s, fabric.util.animate = o, fabric.util.requestAnimFrame = a, fabric.util.loadImage = f, fabric.util.enlivenObjects = l, fabric.util.groupSVGElements = c
    }(),
    function () {
        function t(t, n) {
            var r = e.call(arguments, 2),
                i = [];
            for (var s = 0, o = t.length; s < o; s++) i[s] = r.length ? t[s][n].apply(t[s], r) : t[s][n].call(t[s]);
            return i
        }

        function n(e, t) {
            if (!e || e.length === 0) return undefined;
            var n = e.length - 1,
                r = t ? e[n][t] : e[n];
            if (t)
                while (n--) e[n][t] >= r && (r = e[n][t]);
            else
                while (n--) e[n] >= r && (r = e[n]);
            return r
        }

        function r(e, t) {
            if (!e || e.length === 0) return undefined;
            var n = e.length - 1,
                r = t ? e[n][t] : e[n];
            if (t)
                while (n--) e[n][t] < r && (r = e[n][t]);
            else
                while (n--) e[n] < r && (r = e[n]);
            return r
        }
        var e = Array.prototype.slice;
        Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
            if (this === void 0 || this === null) throw new TypeError;
            var t = Object(this),
                n = t.length >>> 0;
            if (n === 0) return -1;
            var r = 0;
            arguments.length > 0 && (r = Number(arguments[1]), r !== r ? r = 0 : r !== 0 && r !== 1 / 0 && r !== -1 / 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
            if (r >= n) return -1;
            var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0);
            for (; i < n; i++)
                if (i in t && t[i] === e) return i;
            return -1
        }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
            for (var n = 0, r = this.length >>> 0; n < r; n++) n in this && e.call(t, this[n], n, this)
        }), Array.prototype.map || (Array.prototype.map = function (e, t) {
            var n = [];
            for (var r = 0, i = this.length >>> 0; r < i; r++) r in this && (n[r] = e.call(t, this[r], r, this));
            return n
        }), Array.prototype.every || (Array.prototype.every = function (e, t) {
            for (var n = 0, r = this.length >>> 0; n < r; n++)
                if (n in this && !e.call(t, this[n], n, this)) return !1;
            return !0
        }), Array.prototype.some || (Array.prototype.some = function (e, t) {
            for (var n = 0, r = this.length >>> 0; n < r; n++)
                if (n in this && e.call(t, this[n], n, this)) return !0;
            return !1
        }), Array.prototype.filter || (Array.prototype.filter = function (e, t) {
            var n = [],
                r;
            for (var i = 0, s = this.length >>> 0; i < s; i++) i in this && (r = this[i], e.call(t, r, i, this) && n.push(r));
            return n
        }), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
            var t = this.length >>> 0,
                n = 0,
                r;
            if (arguments.length > 1) r = arguments[1];
            else
                do {
                    if (n in this) {
                        r = this[n++];
                        break
                    }
                    if (++n >= t) throw new TypeError
                } while (!0);
            for (; n < t; n++) n in this && (r = e.call(null, r, this[n], n, this));
            return r
        }), fabric.util.array = {
            invoke: t,
            min: r,
            max: n
        }
    }(),
    function () {
        function e(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function t(t) {
            return e({}, t)
        }
        fabric.util.object = {
            extend: e,
            clone: t
        }
    }(),
    function () {
        function e(e) {
            return e.replace(/-+(.)?/g, function (e, t) {
                return t ? t.toUpperCase() : ""
            })
        }

        function t(e) {
            return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
        }

        function n(e) {
            return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        String.prototype.trim || (String.prototype.trim = function () {
            return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
        }), fabric.util.string = {
            camelize: e,
            capitalize: t,
            escapeXml: n
        }
    }(),
    function () {
        var e = Array.prototype.slice,
            t = Function.prototype.apply,
            n = function () {};
        Function.prototype.bind || (Function.prototype.bind = function (r) {
            var i = this,
                s = e.call(arguments, 1),
                o;
            return s.length ? o = function () {
                return t.call(i, this instanceof n ? this : r, s.concat(e.call(arguments)))
            } : o = function () {
                return t.call(i, this instanceof n ? this : r, arguments)
            }, n.prototype = this.prototype, o.prototype = new n, o
        })
    }(),
    function () {
        function i() {}

        function s() {
            function o() {
                this.initialize.apply(this, arguments)
            }
            var n = null,
                s = e.call(arguments, 0);
            typeof s[0] == "function" && (n = s.shift()), o.superclass = n, o.subclasses = [], n && (i.prototype = n.prototype, o.prototype = new i, n.subclasses.push(o));
            for (var u = 0, a = s.length; u < a; u++) r(o, s[u], n);
            return o.prototype.initialize || (o.prototype.initialize = t), o.prototype.constructor = o, o
        }
        var e = Array.prototype.slice,
            t = function () {},
            n = function () {
                for (var e in {
                        toString: 1
                    })
                    if (e === "toString") return !1;
                return !0
            }(),
            r = function (e, t, r) {
                for (var i in t) i in e.prototype && typeof e.prototype[i] == "function" ? e.prototype[i] = function (e) {
                    return function () {
                        var n = this.constructor.superclass;
                        this.constructor.superclass = r;
                        var i = t[e].apply(this, arguments);
                        this.constructor.superclass = n;
                        if (e !== "initialize") return i
                    }
                }(i) : e.prototype[i] = t[i], n && (t.toString !== Object.prototype.toString && (e.prototype.toString = t.toString), t.valueOf !== Object.prototype.valueOf && (e.prototype.valueOf = t.valueOf))
            };
        fabric.util.createClass = s
    }(),
    function () {
        function e(e) {
            var t = Array.prototype.slice.call(arguments, 1),
                n, r, i = t.length;
            for (r = 0; r < i; r++) {
                n = typeof e[t[r]];
                if (!/^(?:function|object|unknown)$/.test(n)) return !1
            }
            return !0
        }

        function i(e, t) {
            return {
                handler: t,
                wrappedHandler: s(e, t)
            }
        }

        function s(e, t) {
            return function (r) {
                t.call(n(e), r || fabric.window.event)
            }
        }

        function o(e, t) {
            return function (n) {
                if (l[e] && l[e][t]) {
                    var r = l[e][t];
                    for (var i = 0, s = r.length; i < s; i++) r[i].call(this, n || fabric.window.event)
                }
            }
        }

        function p(e) {
            return {
                x: d(e),
                y: v(e)
            }
        }
        var t = function () {
                if (typeof fabric.document.documentElement.uniqueID != "undefined") return function (e) {
                    return e.uniqueID
                };
                var e = 0;
                return function (t) {
                    return t.__uniqueID || (t.__uniqueID = "uniqueID__" + e++)
                }
            }(),
            n, r;
        (function () {
            var e = {};
            n = function (t) {
                return e[t]
            }, r = function (t, n) {
                e[t] = n
            }
        })();
        var u = e(fabric.document.documentElement, "addEventListener", "removeEventListener") && e(fabric.window, "addEventListener", "removeEventListener"),
            a = e(fabric.document.documentElement, "attachEvent", "detachEvent") && e(fabric.window, "attachEvent", "detachEvent"),
            f = {},
            l = {},
            c, h;
        u ? (c = function (e, t, n) {
            e.addEventListener(t, n, !1)
        }, h = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        }) : a ? (c = function (e, n, s) {
            var o = t(e);
            r(o, e), f[o] || (f[o] = {}), f[o][n] || (f[o][n] = []);
            var u = i(o, s);
            f[o][n].push(u), e.attachEvent("on" + n, u.wrappedHandler)
        }, h = function (e, n, r) {
            var i = t(e),
                s;
            if (f[i] && f[i][n])
                for (var o = 0, u = f[i][n].length; o < u; o++) s = f[i][n][o], s && s.handler === r && (e.detachEvent("on" + n, s.wrappedHandler), f[i][n][o] = null)
        }) : (c = function (e, n, r) {
            var i = t(e);
            l[i] || (l[i] = {});
            if (!l[i][n]) {
                l[i][n] = [];
                var s = e["on" + n];
                s && l[i][n].push(s), e["on" + n] = o(i, n)
            }
            l[i][n].push(r)
        }, h = function (e, n, r) {
            var i = t(e);
            if (l[i] && l[i][n]) {
                var s = l[i][n];
                for (var o = 0, u = s.length; o < u; o++) s[o] === r && s.splice(o, 1)
            }
        }), fabric.util.addListener = c, fabric.util.removeListener = h;
        var d = function (e) {
                var t = fabric.document.documentElement,
                    n = fabric.document.body || {
                        scrollLeft: 0
                    };
                return e.pageX || (typeof e.clientX != "unknown" ? e.clientX : 0) + (t.scrollLeft || n.scrollLeft) - (t.clientLeft || 0)
            },
            v = function (e) {
                var t = fabric.document.documentElement,
                    n = fabric.document.body || {
                        scrollTop: 0
                    };
                return e.pageY || (typeof e.clientY != "unknown" ? e.clientY : 0) + (t.scrollTop || n.scrollTop) - (t.clientTop || 0)
            };
        fabric.isTouchSupported && (d = function (e) {
            return e.touches && e.touches[0] && e.touches[0].pageX || e.clientX
        }, v = function (e) {
            return e.touches && e.touches[0] && e.touches[0].pageY || e.clientY
        }), fabric.util.getPointer = p, fabric.util.object.extend(fabric.util, fabric.Observable)
    }(),
    function () {
        function e(e, t) {
            var n = e.style;
            if (!n) return e;
            if (typeof t == "string") return e.style.cssText += ";" + t, t.indexOf("opacity") > -1 ? s(e, t.match(/opacity:\s*(\d?\.?\d*)/)[1]) : e;
            for (var r in t)
                if (r === "opacity") s(e, t[r]);
                else {
                    var i = r === "float" || r === "cssFloat" ? typeof n.styleFloat == "undefined" ? "cssFloat" : "styleFloat" : r;
                    n[i] = t[r]
                }
            return e
        }
        var t = fabric.document.createElement("div"),
            n = typeof t.style.opacity == "string",
            r = typeof t.style.filter == "string",
            i = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
            s = function (e) {
                return e
            };
        n ? s = function (e, t) {
            return e.style.opacity = t, e
        } : r && (s = function (e, t) {
            var n = e.style;
            return e.currentStyle && !e.currentStyle.hasLayout && (n.zoom = 1), i.test(n.filter) ? (t = t >= .9999 ? "" : "alpha(opacity=" + t * 100 + ")", n.filter = n.filter.replace(i, t)) : n.filter += " alpha(opacity=" + t * 100 + ")", e
        }), fabric.util.setStyle = e
    }(),
    function () {
        function t(e) {
            return typeof e == "string" ? fabric.document.getElementById(e) : e
        }

        function s(e, t) {
            var n = fabric.document.createElement(e);
            for (var r in t) r === "class" ? n.className = t[r] : r === "for" ? n.htmlFor = t[r] : n.setAttribute(r, t[r]);
            return n
        }

        function o(e, t) {
            (" " + e.className + " ").indexOf(" " + t + " ") === -1 && (e.className += (e.className ? " " : "") + t)
        }

        function u(e, t, n) {
            return typeof t == "string" && (t = s(t, n)), e.parentNode && e.parentNode.replaceChild(t, e), t.appendChild(e), t
        }

        function a(e) {
            var t = 0,
                n = 0;
            do t += e.offsetTop || 0, n += e.offsetLeft || 0, e = e.offsetParent; while (e);
            return {
                left: n,
                top: t
            }
        }
        var e = Array.prototype.slice,
            n = function (t) {
                return e.call(t, 0)
            },
            r;
        try {
            r = n(fabric.document.childNodes) instanceof Array
        } catch (i) {}
        r || (n = function (e) {
                var t = new Array(e.length),
                    n = e.length;
                while (n--) t[n] = e[n];
                return t
            }),
            function () {
                function n(e) {
                    return typeof e.onselectstart != "undefined" && (e.onselectstart = fabric.util.falseFunction), t ? e.style[t] = "none" : typeof e.unselectable == "string" && (e.unselectable = "on"), e
                }

                function r(e) {
                    return typeof e.onselectstart != "undefined" && (e.onselectstart = null), t ? e.style[t] = "" : typeof e.unselectable == "string" && (e.unselectable = ""), e
                }
                var e = fabric.document.documentElement.style,
                    t = "userSelect" in e ? "userSelect" : "MozUserSelect" in e ? "MozUserSelect" : "WebkitUserSelect" in e ? "WebkitUserSelect" : "KhtmlUserSelect" in e ? "KhtmlUserSelect" : "";
                fabric.util.makeElementUnselectable = n, fabric.util.makeElementSelectable = r
            }(),
            function () {
                function e(e, t) {
                    var n = fabric.document.getElementsByTagName("head")[0],
                        r = fabric.document.createElement("script"),
                        i = !0;
                    r.type = "text/javascript", r.setAttribute("runat", "server"), r.onload = r.onreadystatechange = function (e) {
                        if (i) {
                            if (typeof this.readyState == "string" && this.readyState !== "loaded" && this.readyState !== "complete") return;
                            i = !1, t(e || fabric.window.event), r = r.onload = r.onreadystatechange = null
                        }
                    }, r.src = e, n.appendChild(r)
                }
                fabric.util.getScript = e
            }(), fabric.util.getById = t, fabric.util.toArray = n, fabric.util.makeElement = s, fabric.util.addClass = o, fabric.util.wrapElement = u, fabric.util.getElementOffset = a
    }(),
    function () {
        function e(e, t) {
            return e + (/\?/.test(e) ? "&" : "?") + t
        }

        function n() {}

        function r(r, i) {
            i || (i = {});
            var s = i.method ? i.method.toUpperCase() : "GET",
                o = i.onComplete || function () {},
                u = t(),
                a;
            return u.onreadystatechange = function () {
                u.readyState === 4 && (o(u), u.onreadystatechange = n)
            }, s === "GET" && (a = null, typeof i.parameters == "string" && (r = e(r, i.parameters))), u.open(s, r, !0), (s === "POST" ||
                s === "PUT") && u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), u.send(a), u
        }
        var t = function () {
            var e = [function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            }, function () {
                return new XMLHttpRequest
            }];
            for (var t = e.length; t--;) try {
                var n = e[t]();
                if (n) return e[t]
            } catch (r) {}
        }();
        fabric.util.request = r
    }(),
    function () {
        function e(e, t, n, r) {
            return n * (e /= r) * e + t
        }

        function t(e, t, n, r) {
            return -n * (e /= r) * (e - 2) + t
        }

        function n(e, t, n, r) {
            return e /= r / 2, e < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
        }

        function r(e, t, n, r) {
            return n * (e /= r) * e * e + t
        }

        function i(e, t, n, r) {
            return n * ((e = e / r - 1) * e * e + 1) + t
        }

        function s(e, t, n, r) {
            return e /= r / 2, e < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
        }

        function o(e, t, n, r) {
            return n * (e /= r) * e * e * e + t
        }

        function u(e, t, n, r) {
            return -n * ((e = e / r - 1) * e * e * e - 1) + t
        }

        function a(e, t, n, r) {
            return e /= r / 2, e < 1 ? n / 2 * e * e * e * e + t : -n / 2 * ((e -= 2) * e * e * e - 2) + t
        }

        function f(e, t, n, r) {
            return n * (e /= r) * e * e * e * e + t
        }

        function l(e, t, n, r) {
            return n * ((e = e / r - 1) * e * e * e * e + 1) + t
        }

        function c(e, t, n, r) {
            return e /= r / 2, e < 1 ? n / 2 * e * e * e * e * e + t : n / 2 * ((e -= 2) * e * e * e * e + 2) + t
        }

        function h(e, t, n, r) {
            return -n * Math.cos(e / r * (Math.PI / 2)) + n + t
        }

        function p(e, t, n, r) {
            return n * Math.sin(e / r * (Math.PI / 2)) + t
        }

        function d(e, t, n, r) {
            return -n / 2 * (Math.cos(Math.PI * e / r) - 1) + t
        }

        function v(e, t, n, r) {
            return e === 0 ? t : n * Math.pow(2, 10 * (e / r - 1)) + t
        }

        function m(e, t, n, r) {
            return e === r ? t + n : n * (-Math.pow(2, -10 * e / r) + 1) + t
        }

        function g(e, t, n, r) {
            return e === 0 ? t : e === r ? t + n : (e /= r / 2, e < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + t : n / 2 * (-Math.pow(2, -10 * --e) + 2) + t)
        }

        function y(e, t, n, r) {
            return -n * (Math.sqrt(1 - (e /= r) * e) - 1) + t
        }

        function b(e, t, n, r) {
            return n * Math.sqrt(1 - (e = e / r - 1) * e) + t
        }

        function w(e, t, n, r) {
            return e /= r / 2, e < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + t : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
        }

        function E(e, t, n, r) {
            var i = 1.70158,
                s = 0,
                o = n;
            return e === 0 ? t : (e /= r, e === 1 ? t + n : (s || (s = r * .3), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), -(o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s)) + t))
        }

        function S(e, t, n, r) {
            var i = 1.70158,
                s = 0,
                o = n;
            return e === 0 ? t : (e /= r, e === 1 ? t + n : (s || (s = r * .3), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), o * Math.pow(2, -10 * e) * Math.sin((e * r - i) * 2 * Math.PI / s) + n + t))
        }

        function x(e, t, n, r) {
            var i = 1.70158,
                s = 0,
                o = n;
            return e === 0 ? t : (e /= r / 2, e === 2 ? t + n : (s || (s = r * .3 * 1.5), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), e < 1 ? -0.5 * o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s) + t : o * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s) * .5 + n + t))
        }

        function T(e, t, n, r, i) {
            return i === undefined && (i = 1.70158), n * (e /= r) * e * ((i + 1) * e - i) + t
        }

        function N(e, t, n, r, i) {
            return i === undefined && (i = 1.70158), n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
        }

        function C(e, t, n, r, i) {
            return i === undefined && (i = 1.70158), e /= r / 2, e < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
        }

        function k(e, t, n, r) {
            return n - L(r - e, 0, n, r) + t
        }

        function L(e, t, n, r) {
            return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
        }

        function A(e, t, n, r) {
            return e < r / 2 ? k(e * 2, 0, n, r) * .5 + t : L(e * 2 - r, 0, n, r) * .5 + n * .5 + t
        }
        fabric.util.ease = {
            easeInQuad: e,
            easeOutQuad: t,
            easeInOutQuad: n,
            easeInCubic: r,
            easeOutCubic: i,
            easeInOutCubic: s,
            easeInQuart: o,
            easeOutQuart: u,
            easeInOutQuart: a,
            easeInQuint: f,
            easeOutQuint: l,
            easeInOutQuint: c,
            easeInSine: h,
            easeOutSine: p,
            easeInOutSine: d,
            easeInExpo: v,
            easeOutExpo: m,
            easeInOutExpo: g,
            easeInCirc: y,
            easeOutCirc: b,
            easeInOutCirc: w,
            easeInElastic: E,
            easeOutElastic: S,
            easeInOutElastic: x,
            easeInBack: T,
            easeOutBack: N,
            easeInOutBack: C,
            easeInBounce: k,
            easeOutBounce: L,
            easeInOutBounce: A
        }
    }(),
    function (e) {
        "use strict";

        function o(e) {
            return e in s ? s[e] : e
        }

        function u(e, r) {
            if (!e) return;
            var i, s, u = {};
            e.parentNode && /^g$/i.test(e.parentNode.nodeName) && (u = t.parseAttributes(e.parentNode, r));
            var a = r.reduce(function (n, r) {
                return i = e.getAttribute(r), s = parseFloat(i), i && ((r === "fill" || r === "stroke") && i === "none" && (i = ""), r === "fill-rule" && (i = i === "evenodd" ? "destination-over" : i), r === "transform" && (i = t.parseTransformAttribute(i)), r = o(r), n[r] = isNaN(s) ? i : s), n
            }, {});
            return a = n(a, n(p(e), t.parseStyleAttribute(e))), n(u, a)
        }

        function a(e) {
            if (!e) return null;
            e = e.trim();
            var t = e.indexOf(",") > -1;
            e = e.split(/\s+/);
            var n = [],
                r, i;
            if (t) {
                r = 0, i = e.length;
                for (; r < i; r++) {
                    var s = e[r].split(",");
                    n.push({
                        x: parseFloat(s[0]),
                        y: parseFloat(s[1])
                    })
                }
            } else {
                r = 0, i = e.length;
                for (; r < i; r += 2) n.push({
                    x: parseFloat(e[r]),
                    y: parseFloat(e[r + 1])
                })
            }
            return n.length % 2 !== 0, n
        }

        function f(e) {
            var t = {},
                n = e.getAttribute("style");
            if (!n) return t;
            if (typeof n == "string") n = n.replace(/;$/, "").split(";").forEach(function (e) {
                var n = e.split(":");
                t[o(n[0].trim().toLowerCase())] = n[1].trim()
            });
            else
                for (var r in n) {
                    if (typeof n[r] == "undefined") continue;
                    t[o(r.toLowerCase())] = n[r]
                }
            return t
        }

        function l(e) {
            for (var n = e.length; n--;) {
                var r = e[n].get("fill");
                if (/^url\(/.test(r)) {
                    var i = r.slice(5, r.length - 1);
                    t.gradientDefs[i] && e[n].set("fill", t.Gradient.fromElement(t.gradientDefs[i], e[n]))
                }
            }
        }

        function c(e, n, i, s) {
            function a() {
                --u === 0 && (o = o.filter(function (e) {
                    return e != null
                }), l(o), n(o))
            }
            var o = new Array(e.length),
                u = e.length;
            for (var f = 0, c, h = e.length; f < h; f++) {
                c = e[f];
                var p = t[r(c.tagName)];
                if (p && p.fromElement) try {
                    if (p.async) p.fromElement(c, function (e, t) {
                        return function (n) {
                            s && s(t, n), o.splice(e, 0, n), a()
                        }
                    }(f), i);
                    else {
                        var d = p.fromElement(c, i);
                        s && s(c, d), o.splice(f, 0, d), a()
                    }
                } catch (v) {
                    t.log(v.message || v)
                } else a()
            }
        }

        function h(e) {
            var t = e.getElementsByTagName("style"),
                n = {},
                r;
            for (var i = 0, s = t.length; i < s; i++) {
                var o = t[0].textContent;
                o = o.replace(/\/\*[\s\S]*?\*\//g, ""), r = o.match(/[^{]*\{[\s\S]*?\}/g), r = r.map(function (e) {
                    return e.trim()
                }), r.forEach(function (e) {
                    var t = e.match(/([\s\S]*?)\s*\{([^}]*)\}/);
                    e = t[1];
                    var r = t[2].trim(),
                        i = r.replace(/;$/, "").split(/\s*;\s*/);
                    n[e] || (n[e] = {});
                    for (var s = 0, o = i.length; s < o; s++) {
                        var u = i[s].split(/\s*:\s*/),
                            a = u[0],
                            f = u[1];
                        n[e][a] = f
                    }
                })
            }
            return n
        }

        function p(e) {
            var n = e.nodeName,
                r = e.getAttribute("class"),
                i = e.getAttribute("id"),
                s = {};
            for (var o in t.cssRules) {
                var u = r && (new RegExp("^\\." + r)).test(o) || i && (new RegExp("^#" + i)).test(o) || (new RegExp("^" + n)).test(o);
                if (u)
                    for (var a in t.cssRules[o]) s[a] = t.cssRules[o][a]
            }
            return s
        }

        function v(e, n, r) {
            function i(i) {
                var s = i.responseXML;
                !s.documentElement && t.window.ActiveXObject && i.responseText && (s = new ActiveXObject("Microsoft.XMLDOM"), s.async = "false", s.loadXML(i.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
                if (!s.documentElement) return;
                t.parseSVGDocument(s.documentElement, function (r, i) {
                    d.set(e, {
                        objects: t.util.array.invoke(r, "toObject"),
                        options: i
                    }), n(r, i)
                }, r)
            }
            e = e.replace(/^\n\s*/, "").trim(), d.has(e, function (r) {
                r ? d.get(e, function (e) {
                    var t = m(e);
                    n(t.objects, t.options)
                }) : new t.util.request(e, {
                    method: "get",
                    onComplete: i
                })
            })
        }

        function m(e) {
            var n = e.objects,
                i = e.options;
            return n = n.map(function (e) {
                return t[r(e.type)].fromObject(e)
            }), {
                objects: n,
                options: i
            }
        }

        function g(e, n, r) {
            e = e.trim();
            var i;
            if (typeof DOMParser != "undefined") {
                var s = new DOMParser;
                s && s.parseFromString && (i = s.parseFromString(e, "text/xml"))
            } else t.window.ActiveXObject && (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
            t.parseSVGDocument(i.documentElement, function (e, t) {
                n(e, t)
            }, r)
        }

        function y(e) {
            var t = "";
            for (var n = 0, r = e.length; n < r; n++) {
                if (e[n].type !== "text" || !e[n].path) continue;
                t += ["@font-face {", "font-family: ", e[n].fontFamily, "; ", "src: url('", e[n].path, "')", "}"].join("")
            }
            return t && (t = ["<defs>", '<style type="text/css">', "<![CDATA[", t, "]]>", "</style>", "</defs>"].join("")), t
        }
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.string.capitalize,
            i = t.util.object.clone,
            s = {
                cx: "left",
                x: "left",
                cy: "top",
                y: "top",
                r: "radius",
                "fill-opacity": "opacity",
                "fill-rule": "fillRule",
                "stroke-width": "strokeWidth",
                transform: "transformMatrix",
                "text-decoration": "textDecoration",
                "font-size": "fontSize",
                "font-weight": "fontWeight",
                "font-style": "fontStyle",
                "font-family": "fontFamily"
            };
        t.parseTransformAttribute = function () {
            function e(e, t) {
                var n = t[0];
                e[0] = Math.cos(n), e[1] = Math.sin(n), e[2] = -Math.sin(n), e[3] = Math.cos(n)
            }

            function t(e, t) {
                var n = t[0],
                    r = t.length === 2 ? t[1] : t[0];
                e[0] = n, e[3] = r
            }

            function n(e, t) {
                e[2] = t[0]
            }

            function r(e, t) {
                e[1] = t[0]
            }

            function i(e, t) {
                e[4] = t[0], t.length === 2 && (e[5] = t[1])
            }
            var s = [1, 0, 0, 1, 0, 0],
                o = "(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)",
                u = "(?:\\s+,?\\s*|,\\s*)",
                a = "(?:(skewX)\\s*\\(\\s*(" + o + ")\\s*\\))",
                f = "(?:(skewY)\\s*\\(\\s*(" + o + ")\\s*\\))",
                l = "(?:(rotate)\\s*\\(\\s*(" + o + ")(?:" + u + "(" + o + ")" + u + "(" + o + "))?\\s*\\))",
                c = "(?:(scale)\\s*\\(\\s*(" + o + ")(?:" + u + "(" + o + "))?\\s*\\))",
                h = "(?:(translate)\\s*\\(\\s*(" + o + ")(?:" + u + "(" + o + "))?\\s*\\))",
                p = "(?:(matrix)\\s*\\(\\s*(" + o + ")" + u + "(" + o + ")" + u + "(" + o + ")" + u + "(" + o + ")" + u + "(" + o + ")" + u + "(" + o + ")" + "\\s*\\))",
                d = "(?:" + p + "|" + h + "|" + c + "|" + l + "|" + a + "|" + f + ")",
                v = "(?:" + d + "(?:" + u + d + ")*" + ")",
                m = "^\\s*(?:" + v + "?)\\s*$",
                g = new RegExp(m),
                y = new RegExp(d);
            return function (o) {
                var u = s.concat();
                return !o || o && !g.test(o) ? u : (o.replace(y, function (s) {
                    var o = (new RegExp(d)).exec(s).filter(function (e) {
                            return e !== "" && e != null
                        }),
                        a = o[1],
                        f = o.slice(2).map(parseFloat);
                    switch (a) {
                    case "translate":
                        i(u, f);
                        break;
                    case "rotate":
                        e(u, f);
                        break;
                    case "scale":
                        t(u, f);
                        break;
                    case "skewX":
                        n(u, f);
                        break;
                    case "skewY":
                        r(u, f);
                        break;
                    case "matrix":
                        u = f
                    }
                }), u)
            }
        }(), t.parseSVGDocument = function () {
            function s(e, t) {
                while (e && (e = e.parentNode))
                    if (t.test(e.nodeName)) return !0;
                return !1
            }
            var e = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,
                n = "(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)",
                r = new RegExp("^\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*" + "$");
            return function (n, o, u) {
                if (!n) return;
                var a = new Date,
                    f = t.util.toArray(n.getElementsByTagName("*"));
                if (f.length === 0) {
                    f = n.selectNodes("//*[name(.)!='svg']");
                    var l = [];
                    for (var c = 0, p = f.length; c < p; c++) l[c] = f[c];
                    f = l
                }
                var d = f.filter(function (t) {
                    return e.test(t.tagName) && !s(t, /^(?:pattern|defs)$/)
                });
                if (!d || d && !d.length) return;
                var v = n.getAttribute("viewBox"),
                    m = n.getAttribute("width"),
                    g = n.getAttribute("height"),
                    y = null,
                    b = null,
                    w, E;
                v && (v = v.match(r)) && (w = parseInt(v[1], 10), E = parseInt(v[2], 10), y = parseInt(v[3], 10), b = parseInt(v[4], 10)), y = m ? parseFloat(m) : y, b = g ? parseFloat(g) : b;
                var S = {
                    width: y,
                    height: b
                };
                t.gradientDefs = t.getGradientDefs(n), t.cssRules = h(n), t.parseElements(d, function (e) {
                    t.documentParsingTime = new Date - a, o && o(e, S)
                }, i(S), u)
            }
        }();
        var d = {
            has: function (e, t) {
                t(!1)
            },
            get: function () {},
            set: function () {}
        };
        n(t, {
            parseAttributes: u,
            parseElements: c,
            parseStyleAttribute: f,
            parsePointsAttribute: a,
            getCSSRules: h,
            loadSVGFromURL: v,
            loadSVGFromString: g,
            createSVGFontFacesMarkup: y
        })
    }(typeof exports != "undefined" ? exports : this),
    function () {
        function e(e) {
            var t = e.getAttribute("style");
            if (t) {
                var n = t.split(/\s*;\s*/);
                n[n.length - 1] === "" && n.pop();
                for (var r = n.length; r--;) {
                    var i = n[r].split(/\s*:\s*/),
                        s = i[0].trim(),
                        o = i[1].trim();
                    if (s === "stop-color") return o
                }
            }
        }

        function t(e, t) {
            for (var n in t) {
                if (typeof t[n] == "string" && /^\d+%$/.test(t[n])) {
                    var r = parseFloat(t[n], 10);
                    if (n === "x1" || n === "x2") t[n] = e.width * r / 100;
                    else if (n === "y1" || n === "y2") t[n] = e.height * r / 100
                }
                if (n === "x1" || n === "x2") t[n] -= e.width / 2;
                else if (n === "y1" || n === "y2") t[n] -= e.height / 2
            }
        }

        function n(e) {
            var t = e.getElementsByTagName("linearGradient"),
                n = e.getElementsByTagName("radialGradient"),
                r, i, s = {};
            i = t.length;
            for (; i--;) r = t[i], s[r.getAttribute("id")] = r;
            i = n.length;
            for (; i--;) r = n[i], s[r.getAttribute("id")] = r;
            return s
        }
        fabric.Gradient = fabric.util.createClass({
            initialize: function (e) {
                e || (e = {}), this.x1 = e.x1 || 0, this.y1 = e.y1 || 0, this.x2 = e.x2 || 0, this.y2 = e.y2 || 0, this.colorStops = e.colorStops
            },
            toObject: function () {
                return {
                    x1: this.x1,
                    x2: this.x2,
                    y1: this.y1,
                    y2: this.y2,
                    colorStops: this.colorStops
                }
            },
            toLiveGradient: function (e) {
                var t = e.createLinearGradient(this.x1, this.y1, this.x2 || e.canvas.width, this.y2);
                for (var n in this.colorStops) {
                    var r = this.colorStops[n];
                    t.addColorStop(parseFloat(n), r)
                }
                return t
            }
        }), fabric.util.object.extend(fabric.Gradient, {
            fromElement: function (n, r) {
                var i = n.getElementsByTagName("stop"),
                    s, o = {},
                    u = {
                        x1: n.getAttribute("x1") || 0,
                        y1: n.getAttribute("y1") || 0,
                        x2: n.getAttribute("x2") || "100%",
                        y2: n.getAttribute("y2") || 0
                    };
                for (var a = i.length; a--;) n = i[a], s = n.getAttribute("offset"), s = parseFloat(s) / (/%$/.test(s) ? 100 : 1), o[s] = e(n) || n.getAttribute("stop-color");
                return t(r, u), new fabric.Gradient({
                    x1: u.x1,
                    y1: u.y1,
                    x2: u.x2,
                    y2: u.y2,
                    colorStops: o
                })
            },
            forObject: function (e, n) {
                return n || (n = {}), t(e, n), new fabric.Gradient(n)
            }
        }), fabric.getGradientDefs = n
    }(),
    function (e) {
        "use strict";

        function n(e, t) {
            arguments.length > 0 && this.init(e, t)
        }
        var t = e.fabric || (e.fabric = {});
        if (t.Point) {
            t.warn("fabric.Point is already defined");
            return
        }
        t.Point = n, n.prototype = {
            constructor: n,
            init: function (e, t) {
                this.x = e, this.y = t
            },
            add: function (e) {
                return new n(this.x + e.x, this.y + e.y)
            },
            addEquals: function (e) {
                return this.x += e.x, this.y += e.y, this
            },
            scalarAdd: function (e) {
                return new n(this.x + e, this.y + e)
            },
            scalarAddEquals: function (e) {
                return this.x += e, this.y += e, this
            },
            subtract: function (e) {
                return new n(this.x - e.x, this.y - e.y)
            },
            subtractEquals: function (e) {
                return this.x -= e.x, this.y -= e.y, this
            },
            scalarSubtract: function (e) {
                return new n(this.x - e, this.y - e)
            },
            scalarSubtractEquals: function (e) {
                return this.x -= e, this.y -= e, this
            },
            multiply: function (e) {
                return new n(this.x * e, this.y * e)
            },
            multiplyEquals: function (e) {
                return this.x *= e, this.y *= e, this
            },
            divide: function (e) {
                return new n(this.x / e, this.y / e)
            },
            divideEquals: function (e) {
                return this.x /= e, this.y /= e, this
            },
            eq: function (e) {
                return this.x === e.x && this.y === e.y
            },
            lt: function (e) {
                return this.x < e.x && this.y < e.y
            },
            lte: function (e) {
                return this.x <= e.x && this.y <= e.y
            },
            gt: function (e) {
                return this.x > e.x && this.y > e.y
            },
            gte: function (e) {
                return this.x >= e.x && this.y >= e.y
            },
            lerp: function (e, t) {
                return new n(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t)
            },
            distanceFrom: function (e) {
                var t = this.x - e.x,
                    n = this.y - e.y;
                return Math.sqrt(t * t + n * n)
            },
            min: function (e) {
                return new n(Math.min(this.x, e.x), Math.min(this.y, e.y))
            },
            max: function (e) {
                return new n(Math.max(this.x, e.x), Math.max(this.y, e.y))
            },
            toString: function () {
                return this.x + "," + this.y
            },
            setXY: function (e, t) {
                this.x = e, this.y = t
            },
            setFromPoint: function (e) {
                this.x = e.x, this.y = e.y
            },
            swap: function (e) {
                var t = this.x,
                    n = this.y;
                this.x = e.x, this.y = e.y, e.x = t, e.y = n
            }
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";

        function n(e) {
            arguments.length > 0 && this.init(e)
        }
        var t = e.fabric || (e.fabric = {});
        if (t.Intersection) {
            t.warn("fabric.Intersection is already defined");
            return
        }
        t.Intersection = n, t.Intersection.prototype = {
            init: function (e) {
                this.status = e, this.points = []
            },
            appendPoint: function (e) {
                this.points.push(e)
            },
            appendPoints: function (e) {
                this.points = this.points.concat(e)
            }
        }, t.Intersection.intersectLineLine = function (e, r, i, s) {
            var o, u = (s.x - i.x) * (e.y - i.y) - (s.y - i.y) * (e.x - i.x),
                a = (r.x - e.x) * (e.y - i.y) - (r.y - e.y) * (e.x - i.x),
                f = (s.y - i.y) * (r.x - e.x) - (s.x - i.x) * (r.y - e.y);
            if (f !== 0) {
                var l = u / f,
                    c = a / f;
                0 <= l && l <= 1 && 0 <= c && c <= 1 ? (o = new n("Intersection"), o.points.push(new t.Point(e.x + l * (r.x - e.x), e.y + l * (r.y - e.y)))) : o = new n("No Intersection")
            } else u === 0 || a === 0 ? o = new n("Coincident") : o = new n("Parallel");
            return o
        }, t.Intersection.intersectLinePolygon = function (e, t, r) {
            var i = new n("No Intersection"),
                s = r.length;
            for (var o = 0; o < s; o++) {
                var u = r[o],
                    a = r[(o + 1) % s],
                    f = n.intersectLineLine(e, t, u, a);
                i.appendPoints(f.points)
            }
            return i.points.length > 0 && (i.status = "Intersection"), i
        }, t.Intersection.intersectPolygonPolygon = function (e, t) {
            var r = new n("No Intersection"),
                i = e.length;
            for (var s = 0; s < i; s++) {
                var o = e[s],
                    u = e[(s + 1) % i],
                    a = n.intersectLinePolygon(o, u, t);
                r.appendPoints(a.points)
            }
            return r.points.length > 0 && (r.status = "Intersection"), r
        }, t.Intersection.intersectPolygonRectangle = function (e, r, i) {
            var s = r.min(i),
                o = r.max(i),
                u = new t.Point(o.x, s.y),
                a = new t.Point(s.x, o.y),
                f = n.intersectLinePolygon(s, u, e),
                l = n.intersectLinePolygon(u, o, e),
                c = n.intersectLinePolygon(o, a, e),
                h = n.intersectLinePolygon(a, s, e),
                p = new n("No Intersection");
            return p.appendPoints(f.points), p.appendPoints(l.points), p.appendPoints(c.points), p.appendPoints(h.points), p.points.length > 0 && (p.status = "Intersection"), p
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";

        function n(e) {
            e ? this._tryParsingColor(e) : this.setSource([0, 0, 0, 1])
        }
        var t = e.fabric || (e.fabric = {});
        if (t.Color) {
            t.warn("fabric.Color is already defined.");
            return
        }
        t.Color = n, t.Color.prototype = {
            _tryParsingColor: function (e) {
                var t = n.sourceFromHex(e);
                t || (t = n.sourceFromRgb(e)), t && this.setSource(t)
            },
            getSource: function () {
                return this._source
            },
            setSource: function (e) {
                this._source = e
            },
            toRgb: function () {
                var e = this.getSource();
                return "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"
            },
            toRgba: function () {
                var e = this.getSource();
                return "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] + ")"
            },
            toHex: function () {
                var e = this.getSource(),
                    t = e[0].toString(16);
                t = t.length === 1 ? "0" + t : t;
                var n = e[1].toString(16);
                n = n.length === 1 ? "0" + n : n;
                var r = e[2].toString(16);
                return r = r.length === 1 ? "0" + r : r, t.toUpperCase() + n.toUpperCase() + r.toUpperCase()
            },
            getAlpha: function () {
                return this.getSource()[3]
            },
            setAlpha: function (e) {
                var t = this.getSource();
                return t[3] = e, this.setSource(t), this
            },
            toGrayscale: function () {
                var e = this.getSource(),
                    t = parseInt((e[0] * .3 + e[1] * .59 + e[2] * .11).toFixed(0), 10),
                    n = e[3];
                return this.setSource([t, t, t, n]), this
            },
            toBlackWhite: function (e) {
                var t = this.getSource(),
                    n = (t[0] * .3 + t[1] * .59 + t[2] * .11).toFixed(0),
                    r = t[3];
                return e = e || 127, n = Number(n) < Number(e) ? 0 : 255, this.setSource([n, n, n, r]), this
            },
            overlayWith: function (e) {
                e instanceof n || (e = new n(e));
                var t = [],
                    r = this.getAlpha(),
                    i = .5,
                    s = this.getSource(),
                    o = e.getSource();
                for (var u = 0; u < 3; u++) t.push(Math.round(s[u] * (1 - i) + o[u] * i));
                return t[3] = r, this.setSource(t), this
            }
        }, t.Color.reRGBa = /^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d+(?:\.\d+)?))?\)$/, t.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, t.Color.fromRgb = function (e) {
            return n.fromSource(n.sourceFromRgb(e))
        }, t.Color.sourceFromRgb = function (e) {
            var t = e.match(n.reRGBa);
            if (t) return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10), t[4] ? parseFloat(t[4]) : 1]
        }, t.Color.fromRgba = n.fromRgb, t.Color.fromHex = function (e) {
            return n.fromSource(n.sourceFromHex(e))
        }, t.Color.sourceFromHex = function (e) {
            if (e.match(n.reHex)) {
                var t = e.slice(e.indexOf("#") + 1),
                    r = t.length === 3,
                    i = r ? t.charAt(0) + t.charAt(0) : t.substring(0, 2),
                    s = r ? t.charAt(1) + t.charAt(1) : t.substring(2, 4),
                    o = r ? t.charAt(2) + t.charAt(2) : t.substring(4, 6);
                return [parseInt(i, 16), parseInt(s, 16), parseInt(o, 16), 1]
            }
        }, t.Color.fromSource = function (e) {
            var t = new n;
            return t.setSource(e), t
        }
    }(typeof exports != "undefined" ? exports : this),
    function () {
        "use strict";
        if (fabric.StaticCanvas) {
            fabric.warn("fabric.StaticCanvas is already defined.");
            return
        }
        var e = fabric.util.object.extend,
            t = fabric.util.getElementOffset,
            n = fabric.util.removeFromArray,
            r = fabric.util.removeListener,
            i = new Error("Could not initialize `canvas` element");
        fabric.StaticCanvas = function (e, t) {
            t || (t = {}), this._initStatic(e, t), fabric.StaticCanvas.activeInstance = this
        }, e(fabric.StaticCanvas.prototype, fabric.Observable), e(fabric.StaticCanvas.prototype, {
            backgroundColor: "rgba(0, 0, 0, 0)",
            backgroundImage: "",
            backgroundImageOpacity: 1,
            backgroundImageStretch: !0,
            includeDefaultValues: !0,
            stateful: !0,
            renderOnAddition: !0,
            clipTo: null,
            controlsAboveOverlay: !1,
            onBeforeScaleRotate: function () {},
            onFpsUpdate: null,
            _initStatic: function (e, t) {
                this._objects = [], this._createLowerCanvas(e), this._initOptions(t), t.overlayImage && this.setOverlayImage(t.overlayImage, this.renderAll.bind(this)), t.backgroundImage && this.setBackgroundImage(t.backgroundImage, this.renderAll.bind(this)), this.calcOffset()
            },
            calcOffset: function () {
                return this._offset = t(this.lowerCanvasEl), this
            },
            setOverlayImage: function (e, t) {
                return fabric.util.loadImage(e, function (e) {
                    this.overlayImage = e, t && t()
                }, this), this
            },
            setBackgroundImage: function (e, t, n) {
                return fabric.util.loadImage(e, function (e) {
                    this.backgroundImage = e, n && "backgroundImageOpacity" in n && (this.backgroundImageOpacity = n.backgroundImageOpacity), n && "backgroundImageStretch" in n && (this.backgroundImageStretch = n.backgroundImageStretch), t && t()
                }, this)
            },
            _createCanvasElement: function () {
                var e = fabric.document.createElement("canvas");
                e.style || (e.style = {});
                if (!e) throw i;
                return this._initCanvasElement(e), e
            },
            _initCanvasElement: function (e) {
                typeof e.getContext == "undefined" && typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement && G_vmlCanvasManager.initElement(e);
                if (typeof e.getContext == "undefined") throw i
            },
            _initOptions: function (e) {
                for (var t in e) this[t] = e[t];
                this.width = parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = parseInt(this.lowerCanvasEl.height, 10) || 0;
                if (!this.lowerCanvasEl.style) return;
                this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px"
            },
            _createLowerCanvas: function (e) {
                this.lowerCanvasEl = fabric.util.getById(e) || this._createCanvasElement(), this._initCanvasElement(this.lowerCanvasEl), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
            },
            getWidth: function () {
                return this.width
            },
            getHeight: function () {
                return this.height
            },
            setWidth: function (e) {
                return this._setDimension("width", e)
            },
            setHeight: function (e) {
                return this._setDimension("height", e)
            },
            setDimensions: function (e) {
                for (var t in e) this._setDimension(t, e[t]);
                return this
            },
            _setDimension: function (e, t) {
                return this.lowerCanvasEl[e] = t, this.lowerCanvasEl.style[e] = t + "px", this.upperCanvasEl && (this.upperCanvasEl[e] = t, this.upperCanvasEl.style[e] = t + "px"), this.wrapperEl && (this.wrapperEl.style[e] = t + "px"), this[e] = t, this.calcOffset(), this.renderAll(), this
            },
            getElement: function () {
                return this.lowerCanvasEl
            },
            getActiveObject: function () {
                return null
            },
            getActiveGroup: function () {
                return null
            },
            _draw: function (e, t) {
                if (!t) return;
                if (this.controlsAboveOverlay) {
                    var n = t.hasBorders,
                        r = t.hasCorners;
                    t.hasBorders = t.hasCorners = !1, t.render(e), t.hasBorders = n, t.hasCorners = r
                } else t.render(e)
            },
            add: function () {
                this._objects.push.apply(this._objects, arguments);
                for (var e = arguments.length; e--;) this._initObject(arguments[e]);
                return this.renderOnAddition && this.renderAll(), this
            },
            _initObject: function (e) {
                this.stateful && e.setupState(), e.setCoords(), e.canvas = this, this.fire("object:added", {
                    target: e
                }), e.fire("added")
            },
            insertAt: function (e, t, n) {
                return n ? this._objects[t] = e : this._objects.splice(t, 0, e), this._initObject(e), this.renderOnAddition && this.renderAll(), this
            },
            getObjects: function () {
                return this._objects
            },
            clearContext: function (e) {
                return e.clearRect(0, 0, this.width, this.height), this
            },
            getContext: function () {
                return this.contextContainer
            },
            clear: function () {
                return this._objects.length = 0, this.clearContext(this.contextContainer), this.contextTop && this.clearContext(this.contextTop), this.renderAll(), this
            },
            renderAll: function (e) {
                var t = this[e === !0 && this.interactive ? "contextTop" : "contextContainer"];
                this.contextTop && this.clearContext(this.contextTop), (e === !1 || typeof e == "undefined") && this.clearContext(t);
                var n = this.getActiveGroup(),
                    r = new Date;
                this.clipTo && this._clipCanvas(t), t.fillStyle = this.backgroundColor, t.fillRect(0, 0, this.width, this.height), typeof this.backgroundImage == "object" && this._drawBackroundImage(t);
                for (var i = 0, s = this._objects.length; i < s; ++i)(!n || n && this._objects[i] && !n.contains(this._objects[i])) && this._draw(t, this._objects[i]);
                this.clipTo && t.restore(), n && this._draw(this.contextTop, n), this.overlayImage && this.contextContainer.drawImage(this.overlayImage, 0, 0), this.controlsAboveOverlay && this.drawControls(this.contextContainer);
                if (this.onFpsUpdate) {
                    var o = new Date - r;
                    this.onFpsUpdate(~~(1e3 / o))
                }
                return this.fire("after:render"), this
            },
            _clipCanvas: function (e) {
                e.save(), e.beginPath(), this.clipTo(e), e.clip()
            },
            _drawBackroundImage: function (e) {
                e.save(), e.globalAlpha = this.backgroundImageOpacity, this.backgroundImageStretch ? e.drawImage(this.backgroundImage, 0, 0, this.width, this.height) : e.drawImage(this.backgroundImage, 0, 0), e.restore()
            },
            renderTop: function () {
                this.clearContext(this.contextTop || this.contextContainer), this.overlayImage && this.contextContainer.drawImage(this.overlayImage, 0, 0), this.selection && this._groupSelector && this._drawSelection();
                var e = this.getActiveGroup();
                return e && e.render(this.contextTop), this.fire("after:render"), this
            },
            drawControls: function (e) {
                var t = this.getActiveGroup();
                if (t) e.save(), fabric.Group.prototype.transform.call(t, e), t.drawBorders(e).drawCorners(e), e.restore();
                else
                    for (var n = 0, r = this._objects.length; n < r; ++n) {
                        if (!this._objects[n].active) continue;
                        e.save(), fabric.Object.prototype.transform.call(this._objects[n], e), this._objects[n].drawBorders(e).drawCorners(e), e.restore()
                    }
            },
            toDataURL: function (e, t) {
                var n = this.upperCanvasEl || this.lowerCanvasEl;
                this.renderAll(!0);
                var r = fabric.StaticCanvas.supports("toDataURLWithQuality") ? n.toDataURL("image/" + e, t) : n.toDataURL("image/" + e);
                return this.renderAll(), r
            },
            toDataURLWithMultiplier: function (e, t, n) {
                var r = this.getWidth(),
                    i = this.getHeight(),
                    s = r * t,
                    o = i * t,
                    u = this.getActiveObject(),
                    a = this.getActiveGroup();
                this.setWidth(s).setHeight(o), this.contextTop.scale(t, t), a ? this._tempRemoveBordersCornersFromGroup(a) : u && this.deactivateAll(), this.width = r, this.height = i, this.renderAll(!0);
                var f = this.toDataURL(e, n);
                return this.contextTop.scale(1 / t, 1 / t), this.setWidth(r).setHeight(i), a ? this._restoreBordersCornersOnGroup(a) : u && this.setActiveObject(u), this.renderAll(), f
            },
            _tempRemoveBordersCornersFromGroup: function (e) {
                e.origHideCorners = e.hideCorners, e.origBorderColor = e.borderColor, e.hideCorners = !0, e.borderColor = "rgba(0,0,0,0)", e.forEachObject(function (e) {
                    e.origBorderColor = e.borderColor, e.borderColor = "rgba(0,0,0,0)"
                })
            },
            _restoreBordersCornersOnGroup: function (e) {
                e.hideCorners = e.origHideCorners, e.borderColor = e.origBorderColor, e.forEachObject(function (e) {
                    e.borderColor = e.origBorderColor, delete e.origBorderColor
                })
            },
            getCenter: function () {
                return {
                    top: this.getHeight() / 2,
                    left: this.getWidth() / 2
                }
            },
            centerObjectH: function (e) {
                return e.set("left", this.getCenter().left), this.renderAll(), this
            },
            centerObjectV: function (e) {
                return e.set("top", this.getCenter().top), this.renderAll(), this
            },
            centerObject: function (e) {
                return this.centerObjectH(e).centerObjectV(e)
            },
            toDatalessJSON: function () {
                return this.toDatalessObject()
            },
            toObject: function () {
                return this._toObjectMethod("toObject")
            },
            toDatalessObject: function () {
                return this._toObjectMethod("toDatalessObject")
            },
            _toObjectMethod: function (e) {
                var t = {
                    objects: this._objects.map(function (t) {
                        var n;
                        this.includeDefaultValues || (n = t.includeDefaultValues, t.includeDefaultValues = !1);
                        var r = t[e]();
                        return this.includeDefaultValues || (t.includeDefaultValues = n), r
                    }, this),
                    background: this.backgroundColor
                };
                return this.backgroundImage && (t.backgroundImage = this.backgroundImage.src, t.backgroundImageOpacity = this.backgroundImageOpacity, t.backgroundImageStretch = this.backgroundImageStretch), t
            },
            toSVG: function () {
                var e = ['<?xml version="1.0" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" ', '"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">', "<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', this.width, '" ', 'height="', this.height, '" ', 'xml:space="preserve">', "<desc>Created with Fabric.js ", fabric.version, "</desc>", fabric.createSVGFontFacesMarkup(this.getObjects())];
                this.backgroundImage && e.push('<image x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" preserveAspectRatio="', this.backgroundImageStretch ? "none" : "defer", '" xlink:href="', this.backgroundImage.src, '" style="opacity:', this.backgroundImageOpacity, '"></image>');
                for (var t = 0, n = this.getObjects(), r = n.length; t < r; t++) e.push(n[t].toSVG());
                return e.push("</svg>"), e.join("")
            },
            isEmpty: function () {
                return this._objects.length === 0
            },
            remove: function (e) {
                return n(this._objects, e), this.getActiveObject() === e && (this.fire("before:selection:cleared", {
                    target: e
                }), this.discardActiveObject(), this.fire("selection:cleared")), this.renderAll(), e
            },
            sendToBack: function (e) {
                return n(this._objects, e), this._objects.unshift(e), this.renderAll()
            },
            bringToFront: function (e) {
                return n(this._objects, e), this._objects.push(e), this.renderAll()
            },
            sendBackwards: function (e) {
                var t = this._objects.indexOf(e),
                    r = t;
                if (t !== 0) {
                    for (var i = t - 1; i >= 0; --i)
                        if (e.intersectsWithObject(this._objects[i]) || e.isContainedWithinObject(this._objects[i])) {
                            r = i;
                            break
                        }
                    n(this._objects, e), this._objects.splice(r, 0, e)
                }
                return this.renderAll()
            },
            bringForward: function (e) {
                var t = this.getObjects(),
                    r = t.indexOf(e),
                    i = r;
                if (r !== t.length - 1) {
                    for (var s = r + 1, o = this._objects.length; s < o; ++s)
                        if (e.intersectsWithObject(t[s]) || e.isContainedWithinObject(this._objects[s])) {
                            i = s;
                            break
                        }
                    n(t, e), t.splice(i, 0, e)
                }
                this.renderAll()
            },
            item: function (e) {
                return this.getObjects()[e]
            },
            complexity: function () {
                return this.getObjects().reduce(function (e, t) {
                    return e += t.complexity ? t.complexity() : 0, e
                }, 0)
            },
            forEachObject: function (e, t) {
                var n = this.getObjects(),
                    r = n.length;
                while (r--) e.call(t, n[r], r, n);
                return this
            },
            dispose: function () {
                return this.clear(), this.interactive && (r(this.upperCanvasEl, "mousedown", this._onMouseDown), r(this.upperCanvasEl, "mousemove", this._onMouseMove), r(fabric.window, "resize", this._onResize)), this
            },
            _resizeImageToFit: function (e) {
                var t = e.width || e.offsetWidth,
                    n = this.getWidth() / t;
                t && (e.width = t * n)
            }
        }), fabric.StaticCanvas.prototype.toString = function () {
            return "#<fabric.Canvas (" + this.complexity() + "): " + "{ objects: " + this.getObjects().length + " }>"
        }, e(fabric.StaticCanvas, {
            EMPTY_JSON: '{"objects": [], "background": "white"}',
            toGrayscale: function (e) {
                var t = e.getContext("2d"),
                    n = t.getImageData(0, 0, e.width, e.height),
                    r = n.data,
                    i = n.width,
                    s = n.height,
                    o, u, a, f;
                for (a = 0; a < i; a++)
                    for (f = 0; f < s; f++) o = a * 4 * s + f * 4, u = (r[o] + r[o + 1] + r[o + 2]) / 3, r[o] = u, r[o + 1] = u, r[o + 2] = u;
                t.putImageData(n, 0, 0)
            },
            supports: function (e) {
                var t = fabric.document.createElement("canvas");
                typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(t);
                if (!t || !t.getContext) return null;
                var n = t.getContext("2d");
                if (!n) return null;
                switch (e) {
                case "getImageData":
                    return typeof n.getImageData != "undefined";
                case "toDataURL":
                    return typeof t.toDataURL != "undefined";
                case "toDataURLWithQuality":
                    try {
                        return t.toDataURL("image/jpeg", 0), !0
                    } catch (r) {}
                    return !1;
                default:
                    return null
                }
            }
        }), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
    }(),
    function () {
        function d() {}
        var e = fabric.util.object.extend,
            t = fabric.util.getPointer,
            n = fabric.util.addListener,
            r = fabric.util.removeListener,
            i = {
                tr: "ne-resize",
                br: "se-resize",
                bl: "sw-resize",
                tl: "nw-resize",
                ml: "w-resize",
                mt: "n-resize",
                mr: "e-resize",
                mb: "s-resize"
            },
            s = fabric.util.array.min,
            o = fabric.util.array.max,
            u = Math.sqrt,
            a = Math.pow,
            f = Math.atan2,
            l = Math.abs,
            c = Math.min,
            h = Math.max,
            p = .5;
        fabric.Canvas = function (e, t) {
            t || (t = {}), this._initStatic(e, t), this._initInteractive(), this._createCacheCanvas(), fabric.Canvas.activeInstance = this
        }, d.prototype = fabric.StaticCanvas.prototype, fabric.Canvas.prototype = new d;
        var v = {
            interactive: !0,
            selection: !0,
            selectionColor: "rgba(100, 100, 255, 0.3)",
            selectionBorderColor: "rgba(255, 255, 255, 0.3)",
            selectionLineWidth: 1,
            freeDrawingColor: "rgb(0, 0, 0)",
            freeDrawingLineWidth: 1,
            hoverCursor: "move",
            moveCursor: "move",
            defaultCursor: "default",
            rotationCursor: "crosshair",
            containerClass: "canvas-container",
            perPixelTargetFind: !1,
            targetFindTolerance: 0,
            _initInteractive: function () {
                this._currentTransform = null, this._groupSelector = null, this._freeDrawingXPoints = [], this._freeDrawingYPoints = [], this._initWrapperElement(), this._createUpperCanvas(), this._initEvents(), this.calcOffset()
            },
            _initEvents: function () {
                var e = this;
                this._onMouseDown = function (t) {
                    e.__onMouseDown(t), n(fabric.document, "mouseup", e._onMouseUp), fabric.isTouchSupported && n(fabric.document, "touchend", e._onMouseUp), n(fabric.document, "mousemove", e._onMouseMove), fabric.isTouchSupported && n(fabric.document, "touchmove", e._onMouseMove), r(e.upperCanvasEl, "mousemove", e._onMouseMove), fabric.isTouchSupported && r(e.upperCanvasEl, "touchmove", e._onMouseMove)
                }, this._onMouseUp = function (t) {
                    e.__onMouseUp(t), r(fabric.document, "mouseup", e._onMouseUp), fabric.isTouchSupported && r(fabric.document, "touchend", e._onMouseUp), r(fabric.document, "mousemove", e._onMouseMove), fabric.isTouchSupported && r(fabric.document, "touchmove", e._onMouseMove), n(e.upperCanvasEl, "mousemove", e._onMouseMove), fabric.isTouchSupported && n(e.upperCanvasEl, "touchmove", e._onMouseMove)
                }, this._onMouseMove = function (t) {
                    t.preventDefault && t.preventDefault(), e.__onMouseMove(t)
                }, this._onResize = function () {
                    e.calcOffset()
                }, n(fabric.window, "resize", this._onResize), fabric.isTouchSupported ? (n(this.upperCanvasEl, "touchstart", this._onMouseDown), n(this.upperCanvasEl, "touchmove", this._onMouseMove)) : (n(this.upperCanvasEl, "mousedown", this._onMouseDown), n(this.upperCanvasEl, "mousemove", this._onMouseMove))
            },
            __onMouseUp: function (e) {
                var t;
                if (this.isDrawingMode && this._isCurrentlyDrawing) {
                    this._finalizeDrawingPath(), this.fire("mouse:up", {
                        e: e
                    });
                    return
                }
                if (this._currentTransform) {
                    var n = this._currentTransform;
                    t = n.target, t._scaling && (t._scaling = !1);
                    var r = this._objects.length;
                    while (r--) this._objects[r].setCoords();
                    this.stateful && t.hasStateChanged() && (t.isMoving = !1, this.fire("object:modified", {
                        target: t
                    }), t.fire("modified"))
                }
                this._currentTransform = null, this._groupSelector && this._findSelectedObjects(e);
                var i = this.getActiveGroup();
                i && (i.setObjectsCoords(), i.set("isMoving", !1), this._setCursor(this.defaultCursor)), this._groupSelector = null, this.renderAll(), this._setCursorFromEvent(e, t), this._setCursor("");
                var s = this;
                setTimeout(function () {
                    s._setCursorFromEvent(e, t)
                }, 50), this.fire("mouse:up", {
                    target: t,
                    e: e
                }), t && t.fire("mouseup", {
                    e: e
                })
            },
            __onMouseDown: function (e) {
                var t = "which" in e ? e.which === 1 : e.button === 1;
                if (!t && !fabric.isTouchSupported) return;
                if (this.isDrawingMode) {
                    this._prepareForDrawing(e),
                        this._captureDrawingPath(e), this.fire("mouse:down", {
                            e: e
                        });
                    return
                }
                if (this._currentTransform) return;
                var n = this.findTarget(e),
                    r = this.getPointer(e),
                    i = this.getActiveGroup(),
                    s;
                if (this._shouldClearSelection(e)) this._groupSelector = {
                    ex: r.x,
                    ey: r.y,
                    top: 0,
                    left: 0
                }, this.deactivateAllWithDispatch();
                else {
                    this.stateful && n.saveState(), (s = n._findTargetCorner(e, this._offset)) && this.onBeforeScaleRotate(n), this._setupCurrentTransform(e, n);
                    var o = e.shiftKey && (i || this.getActiveObject()) && this.selection;
                    o ? this._handleGroupLogic(e, n) : (n !== this.getActiveGroup() && this.deactivateAll(), this.setActiveObject(n, e))
                }
                this.renderAll(), this.fire("mouse:down", {
                    target: n,
                    e: e
                }), n && n.fire("mousedown", {
                    e: e
                })
            },
            __onMouseMove: function (e) {
                var n;
                if (this.isDrawingMode) {
                    this._isCurrentlyDrawing && this._captureDrawingPath(e), this.fire("mouse:move", {
                        e: e
                    });
                    return
                }
                var r = this._groupSelector,
                    i;
                if (r !== null) i = t(e), r.left = i.x - this._offset.left - r.ex, r.top = i.y - this._offset.top - r.ey, this.renderTop();
                else if (!this._currentTransform) {
                    var s = this.upperCanvasEl.style;
                    n = this.findTarget(e);
                    if (!n) {
                        for (var o = this._objects.length; o--;) this._objects[o] && !this._objects[o].active && this._objects[o].setActive(!1);
                        s.cursor = this.defaultCursor
                    } else this._setCursorFromEvent(e, n), n.isActive() && n.setCornersVisibility && n.setCornersVisibility(!0)
                } else {
                    i = t(e);
                    var u = i.x,
                        a = i.y;
                    this._currentTransform.target.isMoving = !0, this._currentTransform.action === "rotate" ? (e.shiftKey || (this._rotateObject(u, a), this.fire("object:rotating", {
                        target: this._currentTransform.target
                    }), this._currentTransform.target.fire("rotating")), this._currentTransform.target.hasRotatingPoint || (this._scaleObject(u, a), this.fire("object:scaling", {
                        target: this._currentTransform.target
                    }), this._currentTransform.target.fire("scaling"))) : this._currentTransform.action === "scale" ? (this._scaleObject(u, a), this.fire("object:scaling", {
                        target: this._currentTransform.target
                    }), this._currentTransform.target.fire("scaling")) : this._currentTransform.action === "scaleX" ? (this._scaleObject(u, a, "x"), this.fire("object:scaling", {
                        target: this._currentTransform.target
                    }), this._currentTransform.target.fire("scaling")) : this._currentTransform.action === "scaleY" ? (this._scaleObject(u, a, "y"), this.fire("object:scaling", {
                        target: this._currentTransform.target
                    }), this._currentTransform.target.fire("scaling")) : (this._translateObject(u, a), this.fire("object:moving", {
                        target: this._currentTransform.target
                    }), this._setCursor(this.moveCursor), this._currentTransform.target.fire("moving")), this.renderAll()
                }
                this.fire("mouse:move", {
                    target: n,
                    e: e
                }), n && n.fire("mousemove", {
                    e: e
                })
            },
            containsPoint: function (e, t) {
                var n = this.getPointer(e),
                    r = this._normalizePointer(t, n),
                    i = r.x,
                    s = r.y,
                    o = t._getImageLines(t.oCoords),
                    u = t._findCrossPoints(i, s, o);
                return u && u % 2 === 1 || t._findTargetCorner(e, this._offset) ? !0 : !1
            },
            _normalizePointer: function (e, t) {
                var n = this.getActiveGroup(),
                    r = t.x,
                    i = t.y,
                    s = n && e.type !== "group" && n.contains(e);
                return s && (r -= n.left, i -= n.top), {
                    x: r,
                    y: i
                }
            },
            _isTargetTransparent: function (e, t, n) {
                var r = this.contextCache,
                    i = e.hasBorders,
                    s = e.transparentCorners;
                e.hasBorders = e.transparentCorners = !1, this._draw(r, e), e.hasBorders = i, e.transparentCorners = s, this.targetFindTolerance > 0 && (t > this.targetFindTolerance ? t -= this.targetFindTolerance : t = 0, n > this.targetFindTolerance ? n -= this.targetFindTolerance : n = 0);
                var o = !0,
                    u = r.getImageData(t, n, this.targetFindTolerance * 2 || 1, this.targetFindTolerance * 2 || 1);
                for (var a = 3; a < u.data.length; a += 4) {
                    var f = u.data[a];
                    o = f <= 0;
                    if (o === !1) break
                }
                return u = null, this.clearContext(r), o
            },
            _shouldClearSelection: function (e) {
                var t = this.findTarget(e),
                    n = this.getActiveGroup();
                return !t || t && n && !n.contains(t) && n !== t && !e.shiftKey
            },
            _setupCurrentTransform: function (e, n) {
                var r = "drag",
                    i, s = t(e);
                if (i = n._findTargetCorner(e, this._offset)) r = i === "ml" || i === "mr" ? "scaleX" : i === "mt" || i === "mb" ? "scaleY" : i === "mtr" ? "rotate" : n.hasRotatingPoint ? "scale" : "rotate";
                this._currentTransform = {
                    target: n,
                    action: r,
                    scaleX: n.scaleX,
                    scaleY: n.scaleY,
                    offsetX: s.x - n.left,
                    offsetY: s.y - n.top,
                    ex: s.x,
                    ey: s.y,
                    left: n.left,
                    top: n.top,
                    theta: n._theta,
                    width: n.width * n.scaleX
                }, this._currentTransform.original = {
                    left: n.left,
                    top: n.top
                }
            },
            _handleGroupLogic: function (e, t) {
                if (t === this.getActiveGroup()) {
                    t = this.findTarget(e, !0);
                    if (!t || t.isType("group")) return
                }
                var n = this.getActiveGroup();
                if (n) n.contains(t) ? (n.removeWithUpdate(t), t.setActive(!1), n.size() === 1 && this.discardActiveGroup()) : n.addWithUpdate(t), this.fire("selection:created", {
                    target: n,
                    e: e
                }), n.setActive(!0);
                else {
                    if (this._activeObject && t !== this._activeObject) {
                        var r = new fabric.Group([this._activeObject, t]);
                        this.setActiveGroup(r), n = this.getActiveGroup()
                    }
                    t.setActive(!0)
                }
                n && n.saveCoords()
            },
            _prepareForDrawing: function (e) {
                this._isCurrentlyDrawing = !0, this.discardActiveObject().renderAll();
                var t = this.getPointer(e);
                this._freeDrawingXPoints.length = this._freeDrawingYPoints.length = 0, this._freeDrawingXPoints.push(t.x), this._freeDrawingYPoints.push(t.y), this.contextTop.beginPath(), this.contextTop.moveTo(t.x, t.y), this.contextTop.strokeStyle = this.freeDrawingColor, this.contextTop.lineWidth = this.freeDrawingLineWidth, this.contextTop.lineCap = this.contextTop.lineJoin = "round"
            },
            _captureDrawingPath: function (e) {
                var t = this.getPointer(e);
                this._freeDrawingXPoints.push(t.x), this._freeDrawingYPoints.push(t.y), this.contextTop.lineTo(t.x, t.y), this.contextTop.stroke()
            },
            _finalizeDrawingPath: function () {
                this.contextTop.closePath(), this._isCurrentlyDrawing = !1;
                var e = s(this._freeDrawingXPoints),
                    t = s(this._freeDrawingYPoints),
                    n = o(this._freeDrawingXPoints),
                    r = o(this._freeDrawingYPoints),
                    i = [],
                    u = this._freeDrawingXPoints,
                    a = this._freeDrawingYPoints;
                i.push("M ", u[0] - e, " ", a[0] - t, " ");
                for (var f = 1, l = u.length; f < l; f++) i.push("L ", u[f] - e, " ", a[f] - t, " ");
                i = i.join("");
                if (i === "M 0 0 L 0 0 ") {
                    this.renderAll();
                    return
                }
                var c = new fabric.Path(i);
                c.fill = null, c.stroke = this.freeDrawingColor, c.strokeWidth = this.freeDrawingLineWidth, this.add(c), c.set("left", e + (n - e) / 2).set("top", t + (r - t) / 2).setCoords(), this.renderAll(), this.fire("path:created", {
                    path: c
                })
            },
            _translateObject: function (e, t) {
                var n = this._currentTransform.target;
                n.lockMovementX || n.set("left", e - this._currentTransform.offsetX), n.lockMovementY || n.set("top", t - this._currentTransform.offsetY)
            },
            _scaleObject: function (e, t, n) {
                var r = this._currentTransform,
                    i = this._offset,
                    s = r.target;
                if (s.lockScalingX && s.lockScalingY) return;
                var o = u(a(r.ey - r.top - i.top, 2) + a(r.ex - r.left - i.left, 2)),
                    f = u(a(t - r.top - i.top, 2) + a(e - r.left - i.left, 2));
                s._scaling = !0, n ? n === "x" && !s.lockUniScaling ? s.lockScalingX || s.set("scaleX", r.scaleX * f / o) : n === "y" && !s.lockUniScaling && (s.lockScalingY || s.set("scaleY", r.scaleY * f / o)) : (s.lockScalingX || s.set("scaleX", r.scaleX * f / o), s.lockScalingY || s.set("scaleY", r.scaleY * f / o))
            },
            _rotateObject: function (e, t) {
                var n = this._currentTransform,
                    r = this._offset;
                if (n.target.lockRotation) return;
                var i = f(n.ey - n.top - r.top, n.ex - n.left - r.left),
                    s = f(t - n.top - r.top, e - n.left - r.left);
                n.target._theta = s - i + n.theta
            },
            _setCursor: function (e) {
                this.upperCanvasEl.style.cursor = e
            },
            _setCursorFromEvent: function (e, t) {
                var n = this.upperCanvasEl.style;
                if (!t) return n.cursor = this.defaultCursor, !1;
                var r = this.getActiveGroup(),
                    s = !!t._findTargetCorner && (!r || !r.contains(t)) && t._findTargetCorner(e, this._offset);
                if (!s) n.cursor = this.hoverCursor;
                else if (s in i) n.cursor = i[s];
                else {
                    if (s !== "mtr" || !t.hasRotatingPoint) return n.cursor = this.defaultCursor, !1;
                    n.cursor = this.rotationCursor
                }
                return !0
            },
            _drawSelection: function () {
                var e = this._groupSelector,
                    t = e.left,
                    n = e.top,
                    r = l(t),
                    i = l(n);
                this.contextTop.fillStyle = this.selectionColor, this.contextTop.fillRect(e.ex - (t > 0 ? 0 : -t), e.ey - (n > 0 ? 0 : -n), r, i), this.contextTop.lineWidth = this.selectionLineWidth, this.contextTop.strokeStyle = this.selectionBorderColor, this.contextTop.strokeRect(e.ex + p - (t > 0 ? 0 : r), e.ey + p - (n > 0 ? 0 : i), r, i)
            },
            _findSelectedObjects: function (e) {
                var t = [],
                    n = this._groupSelector.ex,
                    r = this._groupSelector.ey,
                    i = n + this._groupSelector.left,
                    s = r + this._groupSelector.top,
                    o, u = new fabric.Point(c(n, i), c(r, s)),
                    a = new fabric.Point(h(n, i), h(r, s));
                for (var f = 0, l = this._objects.length; f < l; ++f) {
                    o = this._objects[f];
                    if (!o) continue;
                    (o.intersectsWithRect(u, a) || o.isContainedWithinRect(u, a)) && this.selection && o.selectable && (o.setActive(!0), t.push(o))
                }
                t.length === 1 ? this.setActiveObject(t[0], e) : t.length > 1 && (t = new fabric.Group(t), this.setActiveGroup(t), t.saveCoords(), this.fire("selection:created", {
                    target: t
                })), this.renderAll()
            },
            findTarget: function (e, t) {
                var n, r = this.getPointer(e),
                    i = this.getActiveGroup();
                if (i && !t && this.containsPoint(e, i)) return n = i, n;
                var s = [];
                for (var o = this._objects.length; o--;)
                    if (this._objects[o] && this.containsPoint(e, this._objects[o])) {
                        if (!this.perPixelTargetFind && !this._objects[o].perPixelTargetFind) {
                            n = this._objects[o], this.relatedTarget = n;
                            break
                        }
                        s[s.length] = this._objects[o]
                    }
                for (var u = 0, a = s.length; u < a; u++) {
                    r = this.getPointer(e);
                    var f = this._isTargetTransparent(s[u], r.x, r.y);
                    if (!f) {
                        n = s[u], this.relatedTarget = n;
                        break
                    }
                }
                if (n && n.selectable) return n
            },
            getPointer: function (e) {
                var n = t(e);
                return {
                    x: n.x - this._offset.left,
                    y: n.y - this._offset.top
                }
            },
            _createUpperCanvas: function () {
                this.upperCanvasEl = this._createCanvasElement(), this.upperCanvasEl.className = "upper-canvas", this.wrapperEl.appendChild(this.upperCanvasEl), this._applyCanvasStyle(this.upperCanvasEl), this.contextTop = this.upperCanvasEl.getContext("2d")
            },
            _createCacheCanvas: function () {
                this.cacheCanvasEl = this._createCanvasElement(), this.cacheCanvasEl.setAttribute("width", this.width), this.cacheCanvasEl.setAttribute("height", this.height), this.contextCache = this.cacheCanvasEl.getContext("2d")
            },
            _initWrapperElement: function () {
                this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, "div", {
                    "class": this.containerClass
                }), fabric.util.setStyle(this.wrapperEl, {
                    width: this.getWidth() + "px",
                    height: this.getHeight() + "px",
                    position: "relative"
                }), fabric.util.makeElementUnselectable(this.wrapperEl)
            },
            _applyCanvasStyle: function (e) {
                var t = this.getWidth() || e.width,
                    n = this.getHeight() || e.height;
                fabric.util.setStyle(e, {
                    position: "absolute",
                    width: t + "px",
                    height: n + "px",
                    left: 0,
                    top: 0
                }), e.width = t, e.height = n, fabric.util.makeElementUnselectable(e)
            },
            getSelectionContext: function () {
                return this.contextTop
            },
            getSelectionElement: function () {
                return this.upperCanvasEl
            },
            setActiveObject: function (e, t) {
                return this._activeObject && this._activeObject.setActive(!1), this._activeObject = e, e.setActive(!0), this.renderAll(), this.fire("object:selected", {
                    target: e,
                    e: t
                }), e.fire("selected", {
                    e: t
                }), this
            },
            getActiveObject: function () {
                return this._activeObject
            },
            discardActiveObject: function () {
                return this._activeObject && this._activeObject.setActive(!1), this._activeObject = null, this
            },
            setActiveGroup: function (e) {
                return this._activeGroup = e, e && e.setActive(!0), this
            },
            getActiveGroup: function () {
                return this._activeGroup
            },
            discardActiveGroup: function () {
                var e = this.getActiveGroup();
                return e && e.destroy(), this.setActiveGroup(null)
            },
            deactivateAll: function () {
                var e = this.getObjects(),
                    t = 0,
                    n = e.length;
                for (; t < n; t++) e[t].setActive(!1);
                return this.discardActiveGroup(), this.discardActiveObject(), this
            },
            deactivateAllWithDispatch: function () {
                var e = this.getActiveGroup() || this.getActiveObject();
                return e && this.fire("before:selection:cleared", {
                    target: e
                }), this.deactivateAll(), e && this.fire("selection:cleared"), this
            }
        };
        fabric.Canvas.prototype.toString = fabric.StaticCanvas.prototype.toString, e(fabric.Canvas.prototype, v);
        for (var m in fabric.StaticCanvas) m !== "prototype" && (fabric.Canvas[m] = fabric.StaticCanvas[m]);
        fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function () {}), fabric.Element = fabric.Canvas
    }(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        FX_DURATION: 500,
        fxCenterObjectH: function (e, t) {
            t = t || {};
            var n = function () {},
                r = t.onComplete || n,
                i = t.onChange || n,
                s = this;
            return fabric.util.animate({
                startValue: e.get("left"),
                endValue: this.getCenter().left,
                duration: this.FX_DURATION,
                onChange: function (t) {
                    e.set("left", t), s.renderAll(), i()
                },
                onComplete: function () {
                    e.setCoords(), r()
                }
            }), this
        },
        fxCenterObjectV: function (e, t) {
            t = t || {};
            var n = function () {},
                r = t.onComplete || n,
                i = t.onChange || n,
                s = this;
            return fabric.util.animate({
                startValue: e.get("top"),
                endValue: this.getCenter().top,
                duration: this.FX_DURATION,
                onChange: function (t) {
                    e.set("top", t), s.renderAll(), i()
                },
                onComplete: function () {
                    e.setCoords(), r()
                }
            }), this
        },
        fxRemove: function (e, t) {
            t = t || {};
            var n = function () {},
                r = t.onComplete || n,
                i = t.onChange || n,
                s = this;
            return fabric.util.animate({
                startValue: e.get("opacity"),
                endValue: 0,
                duration: this.FX_DURATION,
                onStart: function () {
                    e.setActive(!1)
                },
                onChange: function (t) {
                    e.set("opacity", t), s.renderAll(), i()
                },
                onComplete: function () {
                    s.remove(e), r()
                }
            }), this
        }
    }), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        loadFromDatalessJSON: function (e, t) {
            if (!e) return;
            var n = typeof e == "string" ? JSON.parse(e) : e;
            if (!n || n && !n.objects) return;
            this.clear(), this.backgroundColor = n.background, this._enlivenDatalessObjects(n.objects, t)
        },
        _enlivenDatalessObjects: function (e, t) {
            function n(e, n) {
                i.insertAt(e, n, !0), e.setCoords(), ++s === o && t && t()
            }

            function r(e, t) {
                var r = e.paths ? "paths" : "path",
                    i = e[r];
                delete e[r];
                if (typeof i != "string")
                    if (e.type === "image") fabric[fabric.util.string.capitalize(e.type)].fromObject(e, function (e) {
                        n(e, t)
                    });
                    else {
                        var s = fabric[fabric.util.string.camelize(fabric.util.string.capitalize(e.type))];
                        if (!s || !s.fromObject) return;
                        i && (e[r] = i), n(s.fromObject(e), t)
                    } else if (e.type === "image") fabric.util.loadImage(i, function (r) {
                    var s = new fabric.Image(r);
                    s.setSourcePath(i), fabric.util.object.extend(s, e), s.setAngle(e.angle), n(s, t)
                });
                else if (e.type === "text")
                    if (e.useNative) n(fabric.Text.fromObject(e), t);
                    else {
                        e.path = i;
                        var o = fabric.Text.fromObject(e),
                            u = function () {
                                Object.prototype.toString.call(fabric.window.opera) === "[object Opera]" ? setTimeout(function () {
                                    n(o, t)
                                }, 500) : n(o, t)
                            };
                        fabric.util.getScript(i, u)
                    } else fabric.loadSVGFromURL(i, function (r) {
                    var s = fabric.util.groupSVGElements(r, e, i);
                    s instanceof fabric.PathGroup || (fabric.util.object.extend(s, e), typeof e.angle != "undefined" && s.setAngle(e.angle)), n(s, t)
                })
            }
            var i = this,
                s = 0,
                o = e.length;
            o === 0 && t && t();
            try {
                e.forEach(r, this)
            } catch (u) {
                fabric.log(u.message)
            }
        },
        loadFromJSON: function (e, t) {
            if (!e) return;
            var n = JSON.parse(e);
            if (!n || n && !n.objects) return;
            this.clear();
            var r = this;
            return this._enlivenObjects(n.objects, function () {
                r.backgroundColor = n.background, n.backgroundImage ? r.setBackgroundImage(n.backgroundImage, function () {
                    r.backgroundImageOpacity = n.backgroundImageOpacity, r.backgroundImageStretch = n.backgroundImageStretch, r.renderAll(), t && t()
                }) : t && t()
            }), this
        },
        _enlivenObjects: function (e, t) {
            var n = this;
            fabric.util.enlivenObjects(e, function (e) {
                e.forEach(function (e, t) {
                    n.insertAt(e, t, !0)
                }), t && t()
            })
        },
        _toDataURL: function (e, t) {
            this.clone(function (n) {
                t(n.toDataURL(e))
            })
        },
        _toDataURLWithMultiplier: function (e, t, n) {
            this.clone(function (r) {
                n(r.toDataURLWithMultiplier(e, t))
            })
        },
        clone: function (e) {
            var t = JSON.stringify(this);
            this.cloneWithoutData(function (n) {
                n.loadFromJSON(t, function () {
                    e && e(n)
                })
            })
        },
        cloneWithoutData: function (e) {
            var t = fabric.document.createElement("canvas");
            t.width = this.getWidth(), t.height = this.getHeight();
            var n = new fabric.Canvas(t);
            n.clipTo = this.clipTo, this.backgroundImage ? (n.setBackgroundImage(this.backgroundImage.src, function () {
                n.renderAll(), e && e(n)
            }), n.backgroundImageOpacity = this.backgroundImageOpacity, n.backgroundImageStretch = this.backgroundImageStretch) : e && e(n)
        }
    }),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.toFixed,
            i = t.util.string.capitalize,
            s = t.util.getPointer,
            o = t.util.degreesToRadians,
            u = Array.prototype.slice;
        if (t.Object) return;
        t.Object = t.util.createClass({
            type: "object",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            flipX: !1,
            flipY: !1,
            opacity: 1,
            angle: 0,
            cornersize: 12,
            transparentCorners: !0,
            padding: 0,
            borderColor: "rgba(102,153,255,0.75)",
            cornerColor: "rgba(102,153,255,0.5)",
            fill: "rgb(0,0,0)",
            fillRule: "source-over",
            overlayFill: null,
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            borderOpacityWhenMoving: .4,
            borderScaleFactor: 1,
            transformMatrix: null,
            selectable: !0,
            hasControls: !0,
            hasBorders: !0,
            hasRotatingPoint: !1,
            rotatingPointOffset: 40,
            _theta: 0,
            perPixelTargetFind: !1,
            includeDefaultValues: !0,
            stateProperties: "top left width height scaleX scaleY flipX flipY theta angle opacity cornersize fill overlayFill stroke strokeWidth strokeDashArray fillRule borderScaleFactor transformMatrix selectable".split(" "),
            callSuper: function (e) {
                var t = this.constructor.superclass.prototype[e];
                return arguments.length > 1 ? t.apply(this, u.call(arguments, 1)) : t.call(this)
            },
            initialize: function (e) {
                e && this.setOptions(e)
            },
            _initGradient: function (e) {
                e.fill && typeof e.fill == "object" && !(e.fill instanceof t.Gradient) && this.set("fill", new t.Gradient(e.fill))
            },
            setOptions: function (e) {
                var t = this.stateProperties.length,
                    n;
                while (t--) n = this.stateProperties[t], n in e && this.set(n, e[n]);
                this._initGradient(e)
            },
            transform: function (e) {
                e.globalAlpha = this.opacity, e.translate(this.left, this.top), e.rotate(this._theta), e.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
            },
            toObject: function () {
                var e = t.Object.NUM_FRACTION_DIGITS,
                    n = {
                        type: this.type,
                        left: r(this.left, e),
                        top: r(this.top, e),
                        width: r(this.width, e),
                        height: r(this.height, e),
                        fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                        overlayFill: this.overlayFill,
                        stroke: this.stroke,
                        strokeWidth: this.strokeWidth,
                        strokeDashArray: this.strokeDashArray,
                        scaleX: r(this.scaleX, e),
                        scaleY: r(this.scaleY, e),
                        angle: r(this.getAngle(), e),
                        flipX: this.flipX,
                        flipY: this.flipY,
                        opacity: r(this.opacity, e),
                        selectable: this.selectable,
                        hasControls: this.hasControls,
                        hasBorders: this.hasBorders,
                        hasRotatingPoint: this.hasRotatingPoint,
                        transparentCorners: this.transparentCorners,
                        perPixelTargetFind: this.perPixelTargetFind
                    };
                return this.includeDefaultValues || (n = this._removeDefaultValues(n)), n
            },
            toDatalessObject: function () {
                return this.toObject()
            },
            getSvgStyles: function () {
                return ["stroke: ", this.stroke ? this.stroke : "none", "; ", "stroke-width: ", this.strokeWidth ? this.strokeWidth : "0", "; ", "stroke-dasharray: ", this.strokeDashArray ? this.strokeDashArray.join(" ") : "; ", "fill: ", this.fill ? this.fill : "none", "; ", "opacity: ", this.opacity ? this.opacity : "1", ";"].join("")
            },
            getSvgTransform: function () {
                var e = this.getAngle();
                return ["translate(", r(this.left, 2), " ", r(this.top, 2), ")", e !== 0 ? " rotate(" + r(e, 2) + ")" : "", this.scaleX === 1 && this.scaleY === 1 ? "" : " scale(" + r(this.scaleX, 2) + " " + r(this.scaleY, 2) + ")"].join("")
            },
            _removeDefaultValues: function (e) {
                var n = t.Object.prototype.options;
                return n && this.stateProperties.forEach(function (t) {
                    e[t] === n[t] && delete e[t]
                }), e
            },
            isActive: function () {
                return !!this.active
            },
            setActive: function (e) {
                return this.active = !!e, this
            },
            toString: function () {
                return "#<fabric." + i(this.type) + ">"
            },
            set: function (e, t) {
                if (typeof e == "object")
                    for (var n in e) this._set(n, e[n]);
                else typeof t == "function" ? this._set(e, t(this.get(e))) : this._set(e, t);
                return this
            },
            _set: function (e, n) {
                var r = (e === "scaleX" || e === "scaleY") && n < t.Object.MIN_SCALE_LIMIT;
                r && (n = t.Object.MIN_SCALE_LIMIT), e === "angle" ? this.setAngle(n) : this[e] = n
            },
            toggle: function (e) {
                var t = this.get(e);
                return typeof t == "boolean" && this.set(e, !t), this
            },
            setSourcePath: function (e) {
                return this.sourcePath = e, this
            },
            get: function (e) {
                return e === "angle" ? this.getAngle() : this[e]
            },
            render: function (e, t) {
                if (this.width === 0 || this.height === 0) return;
                e.save();
                var n = this.transformMatrix;
                n && !this.group && e.setTransform(n[0], n[1], n[2], n[3], n[4], n[5]), t || this.transform(e);
                if (this.stroke || this.strokeDashArray) e.lineWidth = this.strokeWidth, e.strokeStyle = this.stroke;
                this.overlayFill ? e.fillStyle = this.overlayFill : this.fill && (e.fillStyle = this.fill.toLiveGradient ? this.fill.toLiveGradient(e) : this.fill), n && this.group && (e.translate(-this.group.width / 2, -this.group.height / 2), e.transform(n[0], n[1], n[2], n[3], n[4], n[5])), this._render(e, t), this.active && !t && (this.drawBorders(e), this.drawCorners(e)), e.restore()
            },
            getWidth: function () {
                return this.width * this.scaleX
            },
            getHeight: function () {
                return this.height * this.scaleY
            },
            scale: function (e) {
                return this.scaleX = e, this.scaleY = e, this.setCoords(), this
            },
            scaleToWidth: function (e) {
                var t = this.getBoundingRectWidth() / this.getWidth();
                return this.scale(e / this.width / t)
            },
            scaleToHeight: function (e) {
                var t = this.getBoundingRectHeight() / this.getHeight();
                return this.scale(e / this.height / t)
            },
            setOpacity: function (e) {
                return this.set("opacity", e), this
            },
            getAngle: function () {
                return this._theta * 180 / Math.PI
            },
            setAngle: function (e) {
                return this._theta = e / 180 * Math.PI, this.angle = e, this
            },
            setCoords: function () {
                var e = this.strokeWidth > 1 ? this.strokeWidth : 0,
                    t = this.padding;
                this.currentWidth = (this.width + e) * this.scaleX + t * 2, this.currentHeight = (this.height + e) * this.scaleY + t * 2, this.currentWidth < 0 && (this.currentWidth = Math.abs(this.currentWidth)), this._hypotenuse = Math.sqrt(Math.pow(this.currentWidth / 2, 2) + Math.pow(this.currentHeight / 2, 2)), this._angle = Math.atan(this.currentHeight / this.currentWidth);
                var n = Math.cos(this._angle + this._theta) * this._hypotenuse,
                    r = Math.sin(this._angle + this._theta) * this._hypotenuse,
                    i = this._theta,
                    s = Math.sin(i),
                    o = Math.cos(i),
                    u = {
                        x: this.left - n,
                        y: this.top - r
                    },
                    a = {
                        x: u.x + this.currentWidth * o,
                        y: u.y + this.currentWidth * s
                    },
                    f = {
                        x: a.x - this.currentHeight * s,
                        y: a.y + this.currentHeight * o
                    },
                    l = {
                        x: u.x - this.currentHeight * s,
                        y: u.y + this.currentHeight * o
                    },
                    c = {
                        x: u.x - this.currentHeight / 2 * s,
                        y: u.y + this.currentHeight / 2 * o
                    },
                    h = {
                        x: u.x + this.currentWidth / 2 * o,
                        y: u.y + this.currentWidth / 2 * s
                    },
                    p = {
                        x: a.x - this.currentHeight / 2 * s,
                        y: a.y + this.currentHeight / 2 * o
                    },
                    d = {
                        x: l.x + this.currentWidth / 2 * o,
                        y: l.y + this.currentWidth / 2 * s
                    },
                    v = {
                        x: u.x + this.currentWidth / 2 * o,
                        y: u.y + this.currentWidth / 2 * s
                    };
                return this.oCoords = {
                    tl: u,
                    tr: a,
                    br: f,
                    bl: l,
                    ml: c,
                    mt: h,
                    mr: p,
                    mb: d,
                    mtr: v
                }, this._setCornerCoords(), this
            },
            getBoundingRectWidth: function () {
                this.oCoords || this.setCoords();
                var e = [this.oCoords.tl.x, this.oCoords.tr.x, this.oCoords.br.x, this.oCoords.bl.x],
                    n = t.util.array.min(e),
                    r = t.util.array.max(e);
                return Math.abs(n - r)
            },
            getBoundingRectHeight: function () {
                this.oCoords || this.setCoords();
                var e = [this.oCoords.tl.y, this.oCoords.tr.y, this.oCoords.br.y, this.oCoords.bl.y],
                    n = t.util.array.min(e),
                    r = t.util.array.max(e);
                return Math.abs(n - r)
            },
            drawBorders: function (e) {
                if (!this.hasBorders) return;
                var n = t.Object.MIN_SCALE_LIMIT,
                    r = this.padding,
                    i = r * 2,
                    s = this.strokeWidth > 1 ? this.strokeWidth : 0;
                e.save(), e.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, e.strokeStyle = this.borderColor;
                var o = 1 / (this.scaleX < n ? n : this.scaleX),
                    u = 1 / (this.scaleY < n ? n : this.scaleY);
                e.lineWidth = 1 / this.borderScaleFactor, e.scale(o, u);
                var a = this.getWidth(),
                    f = this.getHeight();
                e.strokeRect(~~(-(a / 2) - r - s / 2 * this.scaleX) + .5, ~~(-(f / 2) - r - s / 2 * this.scaleY) + .5, ~~(a + i + s * this.scaleX), ~~(f + i + s * this.scaleY));
                if (this.hasRotatingPoint && !this.lockRotation && this.hasControls) {
                    var l = (this.flipY ? f + s * this.scaleY + r * 2 : -f - s * this.scaleY - r * 2) / 2;
                    e.beginPath(), e.moveTo(0, l), e.lineTo(0, l + (this.flipY ? this.rotatingPointOffset : -this.rotatingPointOffset)), e.closePath(), e.stroke()
                }
                return e.restore(), this
            },
            _renderDashedStroke: function (e) {
                function u(u, a) {
                    var f = 0,
                        l = 0,
                        c = (a ? i.height : i.width) + s * 2;
                    while (f < c) {
                        var h = i.strokeDashArray[t++];
                        f += h, f > c && (l = f - c), u ? n += h * u - (l * u || 0) : r += h * a - (l * a || 0), e[1 & t ? "moveTo" : "lineTo"](n, r), t >= o && (t = 0)
                    }
                }
                1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray);
                var t = 0,
                    n = -this.width / 2,
                    r = -this.height / 2,
                    i = this,
                    s = this.padding,
                    o = this.strokeDashArray.length;
                e.save(), e.beginPath(), u(1, 0), u(0, 1), u(-1, 0), u(0, -1), e.stroke(), e.closePath(), e.restore()
            },
            drawCorners: function (e) {
                if (!this.hasControls) return;
                var t = this.cornersize,
                    n = t / 2,
                    r = this.strokeWidth / 2,
                    i = -(this.width / 2),
                    s = -(this.height / 2),
                    o, u, a = t / this.scaleX,
                    f = t / this.scaleY,
                    l = this.padding / this.scaleX,
                    c = this.padding / this.scaleY,
                    h = n / this.scaleY,
                    p = n / this.scaleX,
                    d = (n - t) / this.scaleX,
                    v = (n - t) / this.scaleY,
                    m = this.height,
                    g = this.width,
                    y = this.transparentCorners ? "strokeRect" : "fillRect";
                return e.save(), e.lineWidth = 1 / Math.max(this.scaleX, this.scaleY), e.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, e.strokeStyle = e.fillStyle = this.cornerColor, o = i - p - r - l, u = s - h - r - c, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g - p + r + l, u = s - h - r - c, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i - p - r - l, u = s + m + v + r + c, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g + d + r + l, u = s + m + v + r + c, e.clearRect(o, u, a, f), e[y](o, u, a, f), this.lockUniScaling || (o = i + g / 2 - p, u = s - h - r - c, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g / 2 - p, u = s + m + v + r + c, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g + d + r + l, u = s + m / 2 - h, e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i - p - r - l, u = s + m / 2 - h, e.clearRect(o, u, a, f), e[y](o, u, a, f)), this.hasRotatingPoint && (o = i + g / 2 - p, u = this.flipY ? s + m + this.rotatingPointOffset / this.scaleY - f / 2 + r + c : s - this.rotatingPointOffset / this.scaleY - f / 2 - r - c, e.clearRect(o, u, a, f), e[y](o, u, a, f)), e.restore(), this
            },
            clone: function (e) {
                return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(), e) : new t.Object(this.toObject())
            },
            cloneAsImage: function (e) {
                if (t.Image) {
                    var n = new Image;
                    n.onload = function () {
                        e && e(new t.Image(n), r), n = n.onload = null
                    };
                    var r = {
                        angle: this.get("angle"),
                        flipX: this.get("flipX"),
                        flipY: this.get("flipY")
                    };
                    this.set("angle", 0).set("flipX", !1).set("flipY", !1), this.toDataURL(function (e) {
                        n.src = e
                    })
                }
                return this
            },
            toDataURL: function (e) {
                function i(t) {
                    t.left = n.width / 2, t.top = n.height / 2, t.setActive(!1), r.add(t);
                    var i = r.toDataURL("png");
                    r.dispose(), r = t = null, e && e(i)
                }
                var n = t.document.createElement("canvas");
                !n.getContext && typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(n), n.width = this.getBoundingRectWidth(), n.height = this.getBoundingRectHeight(), t.util.wrapElement(n, "div");
                var r = new t.Canvas(n);
                r.backgroundColor = "transparent", r.renderAll(), this.constructor.async ? this.clone(i) : i(this.clone())
            },
            hasStateChanged: function () {
                return this.stateProperties.some(function (e) {
                    return this[e] !== this.originalState[e]
                }, this)
            },
            saveState: function () {
                return this.stateProperties.forEach(function (e) {
                    this.originalState[e] = this.get(e)
                }, this), this
            },
            setupState: function () {
                this.originalState = {}, this.saveState()
            },
            intersectsWithRect: function (e, n) {
                var r = this.oCoords,
                    i = new t.Point(r.tl.x, r.tl.y),
                    s = new t.Point(r.tr.x, r.tr.y),
                    o = new t.Point(r.bl.x, r.bl.y),
                    u = new t.Point(r.br.x, r.br.y),
                    a = t.Intersection.intersectPolygonRectangle([i, s, u, o], e, n);
                return a.status === "Intersection"
            },
            intersectsWithObject: function (e) {
                function n(e) {
                    return {
                        tl: new t.Point(e.tl.x, e.tl.y),
                        tr: new t.Point(e.tr.x, e.tr.y),
                        bl: new t.Point(e.bl.x, e.bl.y),
                        br: new t.Point(e.br.x, e.br.y)
                    }
                }
                var r = n(this.oCoords),
                    i = n(e.oCoords),
                    s = t.Intersection.intersectPolygonPolygon([r.tl, r.tr, r.br, r.bl], [i.tl, i.tr, i.br, i.bl]);
                return s.status === "Intersection"
            },
            isContainedWithinObject: function (e) {
                return this.isContainedWithinRect(e.oCoords.tl, e.oCoords.br)
            },
            isContainedWithinRect: function (e, n) {
                var r = this.oCoords,
                    i = new t.Point(r.tl.x, r.tl.y),
                    s = new t.Point(r.tr.x, r.tr.y),
                    o = new t.Point(r.bl.x, r.bl.y);
                return i.x > e.x && s.x < n.x && i.y > e.y && o.y < n.y
            },
            isType: function (e) {
                return this.type === e
            },
            _findTargetCorner: function (e, t) {
                if (!this.hasControls || !this.active) return !1;
                var n = s(e),
                    r = n.x - t.left,
                    i = n.y - t.top,
                    o, u;
                for (var a in this.oCoords) {
                    if (a === "mtr" && !this.hasRotatingPoint) continue;
                    if (!(!this.lockUniScaling || a !== "mt" && a !== "mr" && a !== "mb" && a !== "ml")) continue;
                    u = this._getImageLines(this.oCoords[a].corner, a), o = this._findCrossPoints(r, i, u);
                    if (o % 2 === 1 && o !== 0) return this.__corner = a, a
                }
                return !1
            },
            _findCrossPoints: function (e, t, n) {
                var r, i, s, o, u, a, f = 0,
                    l;
                for (var c in n) {
                    l = n[c];
                    if (l.o.y < t && l.d.y < t) continue;
                    if (l.o.y >= t && l.d.y >= t) continue;
                    l.o.x === l.d.x && l.o.x >= e ? (u = l.o.x, a = t) : (r = 0, i = (l.d.y - l.o.y) / (l.d.x - l.o.x), s = t - r * e, o = l.o.y - i * l.o.x, u = -(s - o) / (r - i), a = s + r * u), u >= e && (f += 1);
                    if (f === 2) break
                }
                return f
            },
            _getImageLines: function (e) {
                return {
                    topline: {
                        o: e.tl,
                        d: e.tr
                    },
                    rightline: {
                        o: e.tr,
                        d: e.br
                    },
                    bottomline: {
                        o: e.br,
                        d: e.bl
                    },
                    leftline: {
                        o: e.bl,
                        d: e.tl
                    }
                }
            },
            _setCornerCoords: function () {
                var e = this.oCoords,
                    t = o(45 - this.getAngle()),
                    n = Math.sqrt(2 * Math.pow(this.cornersize, 2)) / 2,
                    r = n * Math.cos(t),
                    i = n * Math.sin(t),
                    s = Math.sin(this._theta),
                    u = Math.cos(this._theta);
                e.tl.corner = {
                    tl: {
                        x: e.tl.x - i,
                        y: e.tl.y - r
                    },
                    tr: {
                        x: e.tl.x + r,
                        y: e.tl.y - i
                    },
                    bl: {
                        x: e.tl.x - r,
                        y: e.tl.y + i
                    },
                    br: {
                        x: e.tl.x + i,
                        y: e.tl.y + r
                    }
                }, e.tr.corner = {
                    tl: {
                        x: e.tr.x - i,
                        y: e.tr.y - r
                    },
                    tr: {
                        x: e.tr.x + r,
                        y: e.tr.y - i
                    },
                    br: {
                        x: e.tr.x + i,
                        y: e.tr.y + r
                    },
                    bl: {
                        x: e.tr.x - r,
                        y: e.tr.y + i
                    }
                }, e.bl.corner = {
                    tl: {
                        x: e.bl.x - i,
                        y: e.bl.y - r
                    },
                    bl: {
                        x: e.bl.x - r,
                        y: e.bl.y + i
                    },
                    br: {
                        x: e.bl.x + i,
                        y: e.bl.y + r
                    },
                    tr: {
                        x: e.bl.x + r,
                        y: e.bl.y - i
                    }
                }, e.br.corner = {
                    tr: {
                        x: e.br.x + r,
                        y: e.br.y - i
                    },
                    bl: {
                        x: e.br.x - r,
                        y: e.br.y + i
                    },
                    br: {
                        x: e.br.x + i,
                        y: e.br.y + r
                    },
                    tl: {
                        x: e.br.x - i,
                        y: e.br.y - r
                    }
                }, e.ml.corner = {
                    tl: {
                        x: e.ml.x - i,
                        y: e.ml.y - r
                    },
                    tr: {
                        x: e.ml.x + r,
                        y: e.ml.y - i
                    },
                    bl: {
                        x: e.ml.x - r,
                        y: e.ml.y + i
                    },
                    br: {
                        x: e.ml.x + i,
                        y: e.ml.y + r
                    }
                }, e.mt.corner = {
                    tl: {
                        x: e.mt.x - i,
                        y: e.mt.y - r
                    },
                    tr: {
                        x: e.mt.x + r,
                        y: e.mt.y - i
                    },
                    bl: {
                        x: e.mt.x - r,
                        y: e.mt.y + i
                    },
                    br: {
                        x: e.mt.x + i,
                        y: e.mt.y + r
                    }
                }, e.mr.corner = {
                    tl: {
                        x: e.mr.x - i,
                        y: e.mr.y - r
                    },
                    tr: {
                        x: e.mr.x + r,
                        y: e.mr.y - i
                    },
                    bl: {
                        x: e.mr.x - r,
                        y: e.mr.y + i
                    },
                    br: {
                        x: e.mr.x + i,
                        y: e.mr.y + r
                    }
                }, e.mb.corner = {
                    tl: {
                        x: e.mb.x - i,
                        y: e.mb.y - r
                    },
                    tr: {
                        x: e.mb.x + r,
                        y: e.mb.y - i
                    },
                    bl: {
                        x: e.mb.x - r,
                        y: e.mb.y + i
                    },
                    br: {
                        x: e.mb.x + i,
                        y: e.mb.y + r
                    }
                }, e.mtr.corner = {
                    tl: {
                        x: e.mtr.x - i + s * this.rotatingPointOffset,
                        y: e.mtr.y - r - u * this.rotatingPointOffset
                    },
                    tr: {
                        x: e.mtr.x + r + s * this.rotatingPointOffset,
                        y: e.mtr.y - i - u * this.rotatingPointOffset
                    },
                    bl: {
                        x: e.mtr.x - r + s * this.rotatingPointOffset,
                        y: e.mtr.y + i - u * this.rotatingPointOffset
                    },
                    br: {
                        x: e.mtr.x + i + s * this.rotatingPointOffset,
                        y: e.mtr.y + r - u * this.rotatingPointOffset
                    }
                }
            },
            toGrayscale: function () {
                var e = this.get("fill");
                return e && this.set("overlayFill", (new t.Color(e)).toGrayscale().toRgb()), this
            },
            complexity: function () {
                return 0
            },
            toJSON: function () {
                return this.toObject()
            },
            setGradientFill: function (e) {
                this.set("fill", t.Gradient.forObject(this, e))
            },
            animate: function () {
                if (arguments[0] && typeof arguments[0] == "object")
                    for (var e in arguments[0]) this._animate(e, arguments[0][e], arguments[1]);
                else this._animate.apply(this, arguments);
                return this
            },
            _animate: function (e, n, r) {
                var i = this;
                r || (r = {}), "from" in r || (r.from = this.get(e)), /[+\-]/.test((n + "").charAt(0)) && (n = this.get(e) + parseFloat(n)), t.util.animate({
                    startValue: r.from,
                    endValue: n,
                    byValue: r.by,
                    easing: r.easing,
                    duration: r.duration,
                    onChange: function (t) {
                        i.set(e, t), r.onChange && r.onChange()
                    },
                    onComplete: function () {
                        i.setCoords(), r.onComplete && r.onComplete()
                    }
                })
            },
            centerH: function () {
                return this.canvas.centerObjectH(this), this
            },
            centerV: function () {
                return this.canvas.centerObjectV(this), this
            },
            center: function () {
                return this.centerH().centerV()
            },
            remove: function () {
                return this.canvas.remove(this)
            },
            sendToBack: function () {
                return this.canvas.sendToBack(this), this
            },
            bringToFront: function () {
                return this.canvas.bringToFront(this), this
            },
            sendBackwards: function () {
                return this.canvas.sendBackwards(this), this
            },
            bringForward: function () {
                return this.canvas.bringForward(this), this
            }
        }), t.Object.prototype.rotate = t.Object.prototype.setAngle;
        var a = t.Object.prototype;
        for (var f = a.stateProperties.length; f--;) {
            var l = a.stateProperties[f],
                c = l.charAt(0).toUpperCase() + l.slice(1),
                h = "set" + c,
                p = "get" + c;
            a[p] || (a[p] = function (e) {
                return new Function('return this.get("' + e + '")')
            }(l)), a[h] || (a[h] = function (e) {
                return new Function("value", 'return this.set("' + e + '", value)')
            }(l))
        }
        n(t.Object.prototype, t.Observable), n(t.Object, {
            NUM_FRACTION_DIGITS: 2,
            MIN_SCALE_LIMIT: .1
        })
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = {
                x1: 1,
                x2: 1,
                y1: 1,
                y2: 1
            };
        if (t.Line) {
            t.warn("fabric.Line is already defined");
            return
        }
        t.Line = t.util.createClass(t.Object, {
            type: "line",
            initialize: function (e, t) {
                t = t || {}, e || (e = [0, 0, 0, 0]), this.callSuper("initialize", t), this.set("x1", e[0]), this.set("y1", e[1]), this.set("x2", e[2]), this.set("y2", e[3]), this._setWidthHeight(t)
            },
            _setWidthHeight: function (e) {
                e || (e = {}), this.set("width", this.x2 - this.x1 || 1), this.set("height", this.y2 - this.y1 || 1), this.set("left", "left" in e ? e.left : this.x1 + this.width / 2), this.set("top", "top" in e ? e.top : this.y1 + this.height / 2)
            },
            _set: function (e, t) {
                return this[e] = t, e in r && this._setWidthHeight(), this
            },
            _render: function (e) {
                e.beginPath(), this.group && e.translate(-this.group.width / 2 + this.left, -this.group.height / 2 + this.top), e.moveTo(this.width === 1 ? 0 : -this.width / 2, this.height === 1 ? 0 : -this.height / 2), e.lineTo(this.width === 1 ? 0 : this.width / 2, this.height === 1 ? 0 : this.height / 2), e.lineWidth = this.strokeWidth;
                var t = e.strokeStyle;
                e.strokeStyle = e.fillStyle, e.stroke(), e.strokeStyle = t
            },
            complexity: function () {
                return 1
            },
            toObject: function () {
                return n(this.callSuper("toObject"), {
                    x1: this.get("x1"),
                    y1: this.get("y1"),
                    x2: this.get("x2"),
                    y2: this.get("y2")
                })
            },
            toSVG: function () {
                return ["<line ", 'x1="', this.get("x1"), '" ', 'y1="', this.get("y1"), '" ', 'x2="', this.get("x2"), '" ', 'y2="', this.get("y2"), '" ', 'style="', this.getSvgStyles(), '" ', "/>"].join("")
            }
        }), t.Line.ATTRIBUTE_NAMES = "x1 y1 x2 y2 stroke stroke-width transform".split(" "), t.Line.fromElement = function (e, r) {
            var i = t.parseAttributes(e, t.Line.ATTRIBUTE_NAMES),
                s = [i.x1 || 0, i.y1 || 0, i.x2 || 0, i.y2 || 0];
            return new t.Line(s, n(i, r))
        }, t.Line.fromObject = function (e) {
            var n = [e.x1, e.y1, e.x2, e.y2];
            return new t.Line(n, e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";

        function i(e) {
            return "radius" in e && e.radius > 0
        }
        var t = e.fabric || (e.fabric = {}),
            n = Math.PI * 2,
            r = t.util.object.extend;
        if (t.Circle) {
            t.warn("fabric.Circle is already defined.");
            return
        }
        t.Circle = t.util.createClass(t.Object, {
            type: "circle",
            initialize: function (e) {
                e = e || {}, this.set("radius", e.radius || 0), this.callSuper("initialize", e);
                var t = this.get("radius") * 2;
                this.set("width", t).set("height", t)
            },
            toObject: function () {
                return r(this.callSuper("toObject"), {
                    radius: this.get("radius")
                })
            },
            toSVG: function () {
                return '<circle cx="0" cy="0" r="' + this.radius + '" ' + 'style="' + this.getSvgStyles() + '" ' + 'transform="' + this.getSvgTransform() + '" ' + "/>"
            },
            _render: function (e, t) {
                e.beginPath(), e.globalAlpha *= this.opacity, e.arc(t ? this.left : 0, t ? this.top : 0, this.radius, 0, n, !1), e.closePath(), this.fill && e.fill(), this.stroke && e.stroke()
            },
            getRadiusX: function () {
                return this.get("radius") * this.get("scaleX")
            },
            getRadiusY: function () {
                return this.get("radius") * this.get("scaleY")
            },
            setRadius: function (e) {
                this.radius = e, this.set("width", e * 2).set("height", e * 2)
            },
            complexity: function () {
                return 1
            }
        }), t.Circle.ATTRIBUTE_NAMES = "cx cy r fill fill-opacity opacity stroke stroke-width transform".split(" "), t.Circle.fromElement = function (e, n) {
            n || (n = {});
            var s = t.parseAttributes(e, t.Circle.ATTRIBUTE_NAMES);
            if (!i(s)) throw new Error("value of `r` attribute is required and can not be negative");
            return "left" in s && (s.left -= n.width / 2 || 0), "top" in s && (s.top -= n.height / 2 || 0), new t.Circle(r(s, n))
        }, t.Circle.fromObject = function (e) {
            return new t.Circle(e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {});
        if (t.Triangle) {
            t.warn("fabric.Triangle is already defined");
            return
        }
        t.Triangle = t.util.createClass(t.Object, {
            type: "triangle",
            initialize: function (e) {
                e = e || {}, this.callSuper("initialize", e), this.set("width", e.width || 100).set("height", e.height || 100)
            },
            _render: function (e) {
                var t = this.width / 2,
                    n = this.height / 2;
                e.beginPath(), e.moveTo(-t, n), e.lineTo(0, -n), e.lineTo(t, n), e.closePath(), this.fill && e.fill(), this.stroke && e.stroke()
            },
            complexity: function () {
                return 1
            },
            toSVG: function () {
                var e = this.width / 2,
                    t = this.height / 2,
                    n = [-e + " " + t, "0 " + -t, e + " " + t].join(",");
                return '<polygon points="' + n + '" ' + 'style="' + this.getSvgStyles() + '" ' + 'transform="' + this.getSvgTransform() + '" ' + "/>"
            }
        }), t.Triangle.fromObject = function (e) {
            return new t.Triangle(e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = Math.PI * 2,
            r = t.util.object.extend;
        if (t.Ellipse) {
            t.warn("fabric.Ellipse is already defined.");
            return
        }
        t.Ellipse = t.util.createClass(t.Object, {
            type: "ellipse",
            initialize: function (e) {
                e = e || {}, this.callSuper("initialize", e), this.set("rx", e.rx || 0), this.set("ry", e.ry || 0), this.set("width", this.get("rx") * 2), this.set("height", this.get("ry") * 2)
            },
            toObject: function () {
                return r(this.callSuper("toObject"), {
                    rx: this.get("rx"),
                    ry: this.get("ry")
                })
            },
            toSVG: function () {
                return ["<ellipse ", 'rx="', this.get("rx"), '" ', 'ry="', this.get("ry"), '" ', 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', "/>"].join("")
            },
            render: function (e, t) {
                if (this.rx === 0 || this.ry === 0) return;
                return this.callSuper("render", e, t)
            },
            _render: function (e, t) {
                e.beginPath(), e.save(), e.globalAlpha *= this.opacity, this.transformMatrix && this.group && e.translate(this.cx, this.cy), e.transform(1, 0, 0, this.ry / this.rx, 0, 0), e.arc(t ? this.left : 0, t ? this.top : 0, this.rx, 0, n, !1), this.stroke && e.stroke(), this.fill && e.fill(), e.restore()
            },
            complexity: function () {
                return 1
            }
        }), t.Ellipse.ATTRIBUTE_NAMES = "cx cy rx ry fill fill-opacity opacity stroke stroke-width transform".split(" "), t.Ellipse.fromElement = function (e, n) {
            n || (n = {});
            var i = t.parseAttributes(e, t.Ellipse.ATTRIBUTE_NAMES),
                s = i.left,
                o = i.top;
            "left" in i && (i.left -= n.width / 2 || 0), "top" in i && (i.top -= n.height / 2 || 0);
            var u = new t.Ellipse(r(i, n));
            return u.cx = s || 0, u.cy = o || 0, u
        }, t.Ellipse.fromObject = function (e) {
            return new t.Ellipse(e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";

        function n(e) {
            return e.left = e.left || 0, e.top = e.top || 0, e
        }
        var t = e.fabric || (e.fabric = {});
        if (t.Rect) {
            console.warn("fabric.Rect is already defined");
            return
        }
        t.Rect = t.util.createClass(t.Object, {
            type: "rect",
            rx: 0,
            ry: 0,
            initialize: function (e) {
                e = e || {}, this._initStateProperties(), this.callSuper("initialize", e), this._initRxRy()
            },
            _initStateProperties: function () {
                this.stateProperties = this.stateProperties.concat(["rx", "ry"])
            },
            _initRxRy: function () {
                this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
            },
            _render: function (e) {
                var t = this.rx || 0,
                    n = this.ry || 0,
                    r = -this.width / 2,
                    i = -this.height / 2,
                    s = this.width,
                    o = this.height;
                e.beginPath(), e.globalAlpha *= this.opacity, this.transformMatrix && this.group && e.translate(this.width / 2 + this.x, this.height / 2 + this.y), !this.transformMatrix && this.group && e.translate(-this.group.width / 2 + this.width / 2 + this.x, -this.group.height / 2 + this.height / 2 + this.y), e.moveTo(r + t, i), e.lineTo(r + s - t, i), e.quadraticCurveTo(r + s, i, r + s, i + n, r + s, i + n), e.lineTo(r + s, i + o - n), e.quadraticCurveTo(r + s, i + o, r + s - t, i + o, r + s - t, i + o), e.lineTo(r + t, i + o), e.quadraticCurveTo(r, i + o, r, i + o - n, r, i + o - n), e.lineTo(r, i + n), e.quadraticCurveTo(r, i, r + t, i, r + t, i), e.closePath(), this.fill && e.fill(), this.strokeDashArray ? this._renderDashedStroke(e) : this.stroke && e.stroke()
            },
            _normalizeLeftTopProperties: function (e) {
                return e.left && this.set("left", e.left + this.getWidth() / 2), this.set("x", e.left || 0), e.top && this.set("top", e.top + this.getHeight() / 2), this.set("y", e.top || 0), this
            },
            complexity: function () {
                return 1
            },
            toObject: function () {
                return t.util.object.extend(this.callSuper("toObject"), {
                    rx: this.get("rx") || 0,
                    ry: this.get("ry") || 0
                })
            },
            toSVG: function () {
                return '<rect x="' + -1 * this.width / 2 + '" y="' + -1 * this.height / 2 + '" ' + 'rx="' + this.get("rx") + '" ry="' + this.get("ry") + '" ' + 'width="' + this.width + '" height="' + this.height + '" ' + 'style="' + this.getSvgStyles() + '" ' + 'transform="' + this.getSvgTransform() + '" ' + "/>"
            }
        }), t.Rect.ATTRIBUTE_NAMES = "x y width height rx ry fill fill-opacity opacity stroke stroke-width transform".split(" "), t.Rect.fromElement = function (e, r) {
            if (!e) return null;
            var i = t.parseAttributes(e, t.Rect.ATTRIBUTE_NAMES);
            i = n(i);
            var s = new t.Rect(t.util.object.extend(r ? t.util.object.clone(r) : {}, i));
            return s._normalizeLeftTopProperties(i), s
        }, t.Rect.fromObject = function (e) {
            return new t.Rect(e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.toFixed;
        if (t.Polyline) {
            t.warn("fabric.Polyline is already defined");
            return
        }
        t.Polyline = t.util.createClass(t.Object, {
            type: "polyline",
            initialize: function (e, t) {
                t = t || {}, this.set("points", e), this.callSuper("initialize", t), this._calcDimensions()
            },
            _calcDimensions: function () {
                return t.Polygon.prototype._calcDimensions.call(this)
            },
            toObject: function () {
                return t.Polygon.prototype.toObject.call(this)
            },
            toSVG: function () {
                var e = [];
                for (var t = 0, r = this.points.length; t < r; t++) e.push(n(this.points[t].x, 2), ",", n(this.points[t].y, 2), " ");
                return ["<polyline ", 'points="', e.join(""), '" ', 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', "/>"].join("")
            },
            _render: function (e) {
                var t;
                e.beginPath(), e.moveTo(this.points[0].x, this.points[0].y);
                for (var n = 0, r = this.points.length; n < r; n++) t = this.points[n], e.lineTo(t.x, t.y);
                this.fill && e.fill(), this.stroke && e.stroke()
            },
            complexity: function () {
                return this.get("points").length
            }
        }), t.Polyline.ATTRIBUTE_NAMES = "fill fill-opacity opacity stroke stroke-width transform".split(" "), t.Polyline.fromElement = function (e, n) {
            if (!e) return null;
            n || (n = {});
            var r = t.parsePointsAttribute(e.getAttribute("points")),
                i = t.parseAttributes(e, t.Polyline.ATTRIBUTE_NAMES);
            for (var s = 0, o = r.length; s < o; s++) r[s].x -= n.width / 2 || 0, r[s].y -= n.height / 2 || 0;
            return new t.Polyline(r, t.util.object.extend(i, n))
        }, t.Polyline.fromObject = function (e) {
            var n = e.points;
            return new t.Polyline(n, e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.array.min,
            i = t.util.array.max,
            s = t.util.toFixed;
        if (t.Polygon) {
            t.warn("fabric.Polygon is already defined");
            return
        }
        t.Polygon = t.util.createClass(t.Object, {
            type: "polygon",
            initialize: function (e, t) {
                t = t || {}, this.points = e, this.callSuper("initialize", t), this._calcDimensions()
            },
            _calcDimensions: function () {
                var e = this.points,
                    t = r(e, "x"),
                    n = r(e, "y"),
                    s = i(e, "x"),
                    o = i(e, "y");
                this.width = s - t || 1, this.height = o - n || 1, this.minX = t, this.minY = n
            },
            toObject: function () {
                return n(this.callSuper("toObject"), {
                    points: this.points.concat()
                })
            },
            toSVG: function () {
                var e = [];
                for (var t = 0, n = this.points.length; t < n; t++) e.push(s(this.points[t].x, 2), ",", s(this.points[t].y, 2), " ");
                return ["<polygon ", 'points="', e.join(""), '" ', 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', "/>"].join("")
            },
            _render: function (e) {
                var t;
                e.beginPath(), e.moveTo(this.points[0].x, this.points[0].y);
                for (var n = 0, r = this.points.length; n < r; n++) t = this.points[n], e.lineTo(t.x, t.y);
                this.fill && e.fill(), this.stroke && (e.closePath(), e.stroke())
            },
            complexity: function () {
                return this.points.length
            }
        }), t.Polygon.ATTRIBUTE_NAMES = "fill fill-opacity opacity stroke stroke-width transform".split(" "), t.Polygon.fromElement = function (e, r) {
            if (!e) return null;
            r || (r = {});
            var i = t.parsePointsAttribute(e.getAttribute("points")),
                s = t.parseAttributes(e, t.Polygon.ATTRIBUTE_NAMES);
            for (var o = 0, u = i.length; o < u; o++) i[o].x -= r.width / 2 || 0, i[o].y -= r.height / 2 || 0;
            return new t.Polygon(i, n(s, r))
        }, t.Polygon.fromObject = function (e) {
            return new t.Polygon(e.points, e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        function n(e, t, n, r) {
            var i = r[0],
                s = r[1],
                o = r[2],
                f = r[3],
                l = r[4],
                c = r[5],
                h = r[6],
                p = u(c, h, i, s, f, l, o, t, n);
            for (var d = 0; d < p.length; d++) {
                var v = a.apply(this, p[d]);
                e.bezierCurveTo.apply(e, v)
            }
        }

        function u(e, t, n, i, u, a, f, l, c) {
            o = s.call(arguments);
            if (r[o]) return r[o];
            var h = f * (Math.PI / 180),
                p = Math.sin(h),
                d = Math.cos(h);
            n = Math.abs(n), i = Math.abs(i);
            var v = d * (l - e) * .5 + p * (c - t) * .5,
                m = d * (c - t) * .5 - p * (l - e) * .5,
                g = v * v / (n * n) + m * m / (i * i);
            g > 1 && (g = Math.sqrt(g), n *= g, i *= g);
            var y = d / n,
                b = p / n,
                w = -p / i,
                E = d / i,
                S = y * l + b * c,
                x = w * l + E * c,
                T = y * e + b * t,
                N = w * e + E * t,
                C = (T - S) * (T - S) + (N - x) * (N - x),
                k = 1 / C - .25;
            k < 0 && (k = 0);
            var L = Math.sqrt(k);
            a === u && (L = -L);
            var A = .5 * (S + T) - L * (N - x),
                O = .5 * (x + N) + L * (T - S),
                M = Math.atan2(x - O, S - A),
                _ = Math.atan2(N - O, T - A),
                D = _ - M;
            D < 0 && a === 1 ? D += 2 * Math.PI : D > 0 && a === 0 && (D -= 2 * Math.PI);
            var P = Math.ceil(Math.abs(D / (Math.PI * .5 + .001))),
                H = [];
            for (var B = 0; B < P; B++) {
                var j = M + B * D / P,
                    F = M + (B + 1) * D / P;
                H[B] = [A, O, j, F, n, i, p, d]
            }
            return r[o] = H
        }

        function a(e, t, n, r, u, a, f, l) {
            o = s.call(arguments);
            if (i[o]) return i[o];
            var c = l * u,
                h = -f * a,
                p = f * u,
                d = l * a,
                v = .5 * (r - n),
                m = 8 / 3 * Math.sin(v * .5) * Math.sin(v * .5) / Math.sin(v),
                g = e + Math.cos(n) - m * Math.sin(n),
                y = t + Math.sin(n) + m * Math.cos(n),
                b = e + Math.cos(r),
                w = t + Math.sin(r),
                E = b + m * Math.sin(r),
                S = w - m * Math.cos(r);
            return i[o] = [c * g + h * y, p * g + d * y, c * E + h * S, p * E + d * S, c * b + h * w, p * b + d * w]
        }

        function d(e) {
            return e[0] === "H" ? e[1] : e[e.length - 2]
        }

        function v(e) {
            return e[0] === "V" ? e[1] : e[e.length - 1]
        }
        var t = {
                m: 2,
                l: 2,
                h: 1,
                v: 1,
                c: 6,
                s: 4,
                q: 4,
                t: 2,
                a: 7
            },
            r = {},
            i = {},
            s = Array.prototype.join,
            o;
        "use strict";
        var f = e.fabric || (e.fabric = {}),
            l = f.util.array.min,
            c = f.util.array.max,
            h = f.util.object.extend,
            p = Object.prototype.toString;
        if (f.Path) {
            f.warn("fabric.Path is already defined");
            return
        }
        f.Path = f.util.createClass(f.Object, {
            type: "path",
            initialize: function (e, t) {
                t = t || {}, this.setOptions(t);
                if (!e) throw new Error("`path` argument is required");
                var n = p.call(e) === "[object Array]";
                this.path = n ? e : e.match && e.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
                if (!this.path) return;
                n || this._initializeFromString(t), t.sourcePath && this.setSourcePath(t.sourcePath)
            },
            _initializeFromString: function (e) {
                var t = "width" in e,
                    n = "height" in e;
                this.path = this._parsePath();
                if (!t || !n) h(this, this._parseDimensions()), t && (this.width = e.width), n && (this.height = e.height)
            },
            _render: function (e) {
                var t, r = null,
                    i = 0,
                    s = 0,
                    o = 0,
                    u = 0,
                    a, f, l, c, h = -(this.width / 2),
                    p = -(this.height / 2);
                for (var d = 0, v = this.path.length; d < v; ++d) {
                    t = this.path[d];
                    switch (t[0]) {
                    case "l":
                        i += t[1], s += t[2], e.lineTo(i + h, s + p);
                        break;
                    case "L":
                        i = t[1], s = t[2], e.lineTo(i + h, s + p);
                        break;
                    case "h":
                        i += t[1], e.lineTo(i + h, s + p);
                        break;
                    case "H":
                        i = t[1], e.lineTo(i + h, s + p);
                        break;
                    case "v":
                        s += t[1], e.lineTo(i + h, s + p);
                        break;
                    case "V":
                        s = t[1], e.lineTo(i + h, s + p);
                        break;
                    case "m":
                        i += t[1], s += t[2], e.moveTo(i + h, s + p);
                        break;
                    case "M":
                        i = t[1], s = t[2], e.moveTo(i + h, s + p);
                        break;
                    case "c":
                        a = i + t[5], f = s + t[6], o = i + t[3], u = s + t[4], e.bezierCurveTo(i + t[1] + h, s + t[2] + p, o + h, u + p, a + h, f + p), i = a, s = f;
                        break;
                    case "C":
                        i = t[5], s = t[6], o = t[3], u = t[4], e.bezierCurveTo(t[1] + h, t[2] + p, o + h, u + p, i + h, s + p);
                        break;
                    case "s":
                        a = i + t[3], f = s + t[4], o = 2 * i - o, u = 2 * s - u, e.bezierCurveTo(o + h, u + p, i + t[1] + h, s + t[2] + p, a + h, f + p), o = i + t[1], u = s + t[2], i = a, s = f;
                        break;
                    case "S":
                        a = t[3], f = t[4], o = 2 * i - o, u = 2 * s - u, e.bezierCurveTo(o + h, u + p, t[1] + h, t[2] + p, a + h, f + p), i = a, s = f, o = t[1], u = t[2];
                        break;
                    case "q":
                        a = i + t[3], f = s + t[4], o = i + t[1], u = s + t[2], e.quadraticCurveTo(o + h, u + p, a + h, f + p), i = a, s = f;
                        break;
                    case "Q":
                        a = t[3], f = t[4], e.quadraticCurveTo(t[1] + h, t[2] + p, a + h, f + p), i = a, s = f, o = t[1], u = t[2];
                        break;
                    case "t":
                        a = i + t[1], f = s + t[2], r[0].match(/[QqTt]/) === null ? (o = i, u = s) : r[0] === "t" ? (o = 2 * i - l, u = 2 * s - c) : r[0] === "q" && (o = 2 * i - o, u = 2 * s - u), l = o, c = u, e.quadraticCurveTo(o + h, u + p, a + h, f + p), i = a, s = f, o = i + t[1], u = s + t[2];
                        break;
                    case "T":
                        a = t[1], f = t[2], o = 2 * i - o, u = 2 * s - u, e.quadraticCurveTo(o + h, u + p, a + h, f + p), i = a, s = f;
                        break;
                    case "a":
                        n(e, i + h, s + p, [t[1], t[2], t[3], t[4], t[5], t[6] + i + h, t[7] + s + p]), i += t[6], s += t[7];
                        break;
                    case "A":
                        n(e, i + h, s + p, [t[1], t[2], t[3], t[4], t[5], t[6] + h, t[7] + p]), i = t[6], s = t[7];
                        break;
                    case "z":
                    case "Z":
                        e.closePath()
                    }
                    r = t
                }
            },
            render: function (e, t) {
                e.save();
                var n = this.transformMatrix;
                n && e.transform(n[0], n[1], n[2], n[3], n[4], n[5]), t || this.transform(e), this.overlayFill ? e.fillStyle = this.overlayFill : this.fill && (e.fillStyle = this.fill.toLiveGradient ? this.fill.toLiveGradient(e) : this.fill), this.stroke && (e.strokeStyle = this.stroke), e.beginPath(), this._render(e), this.fill && e.fill(), this.stroke && (e.strokeStyle = this.stroke, e.lineWidth = this.strokeWidth, e.lineCap = e.lineJoin = "round", e.stroke()), !t && this.active && (this.drawBorders(e), this.hideCorners || this.drawCorners(e)), e.restore()
            },
            toString: function () {
                return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
            },
            toObject: function () {
                var e = h(this.callSuper("toObject"), {
                    path: this.path
                });
                return this.sourcePath && (e.sourcePath = this.sourcePath), this.transformMatrix && (e.transformMatrix = this.transformMatrix), e
            },
            toDatalessObject: function () {
                var e = this.toObject();
                return this.sourcePath && (e.path = this.sourcePath), delete e.sourcePath, e
            },
            toSVG: function () {
                var e = [];
                for (var t = 0, n = this.path.length; t < n; t++) e.push(this.path[t].join(" "));
                var r = e.join(" ");
                return ['<g transform="', this.getSvgTransform(), '">', "<path ", 'width="', this.width, '" height="', this.height, '" ', 'd="', r, '" ', 'style="', this.getSvgStyles(), '" ', 'transform="translate(', -this.width / 2, " ", -this.height / 2, ')" />', "</g>"].join("")
            },
            complexity: function () {
                return this.path.length
            },
            _parsePath: function () {
                var e = [],
                    n, r, i;
                for (var s = 0, o, u = this.path.length; s < u; s++) {
                    n = this.path[s], r = n.slice(1).trim().replace(/(\d)-/g, "$1###-").split(/\s|,|###/), o = [n.charAt(0)];
                    for (var a = 0, f = r.length; a < f; a++) i = parseFloat(r[a]), isNaN(i) || o.push(i);
                    var l = o[0].toLowerCase(),
                        c = t[l];
                    if (o.length - 1 > c)
                        for (var h = 1, p = o.length; h < p; h += c) e.push([o[0]].concat(o.slice(h, h + c)));
                    else e.push(o)
                }
                return e
            },
            _parseDimensions: function () {
                var e = [],
                    t = [],
                    n, r, i = !1,
                    s, o;
                this.path.forEach(function (u, a) {
                    u[0] !== "H" && (n = a === 0 ? d(u) : d(this.path[a - 1])), u[0] !== "V" && (r = a === 0 ? v(u) : v(this.path[a - 1])), u[0] === u[0].toLowerCase() && (i = !0), s = i ? n + d(u) : u[0] === "V" ? n : d(u), o = i ? r + v(u) : u[0] === "H" ? r : v(u);
                    var f = parseInt(s, 10);
                    isNaN(f) || e.push(f), f = parseInt(o, 10), isNaN(f) || t.push(f)
                }, this);
                var u = l(e),
                    a = l(t),
                    f = 0,
                    h = 0,
                    p = {
                        top: a - h,
                        left: u - f,
                        bottom: c(t) - h,
                        right: c(e) - f
                    };
                return p.width = p.right - p.left, p.height = p.bottom - p.top, p
            }
        }), f.Path.fromObject = function (e) {
            return new f.Path(e.path, e)
        }, f.Path.ATTRIBUTE_NAMES = "d fill fill-opacity opacity fill-rule stroke stroke-width transform".split(" "), f.Path.fromElement = function (e, t) {
            var n = f.parseAttributes(e, f.Path.ATTRIBUTE_NAMES);
            return new f.Path(n.d, h(n, t))
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";

        function u(e) {
            for (var n = 0, r = e.length; n < r; n++)
                if (!(e[n] instanceof t.Object)) {
                    var i = s(o(e[n].type));
                    e[n] = t[i].fromObject(e[n])
                }
            return e
        }
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.array.invoke,
            i = t.Object.prototype.toObject,
            s = t.util.string.camelize,
            o = t.util.string.capitalize;
        if (t.PathGroup) {
            t.warn("fabric.PathGroup is already defined");
            return
        }
        t.PathGroup = t.util.createClass(t.Path, {
            type: "path-group",
            fill: "",
            forceFillOverwrite: !1,
            initialize: function (e, t) {
                t = t || {}, this.paths = e || [];
                for (var n = this.paths.length; n--;) this.paths[n].group = this;
                this.setOptions(t), this.setCoords(), t.sourcePath && this.setSourcePath(t.sourcePath)
            },
            render: function (e) {
                e.save();
                var t = this.transformMatrix;
                t && e.transform(t[0], t[1], t[2], t[3], t[4], t[5]), this.transform(e);
                for (var n = 0, r = this.paths.length; n < r; ++n) this.paths[n].render(e, !0);
                this.active && (this.drawBorders(e), this.hideCorners || this.drawCorners(e)), e.restore()
            },
            _set: function (e, t) {
                if ((e === "fill" || e === "overlayFill") && t && this.isSameColor()) {
                    var n = this.paths.length;
                    while (n--) this.paths[n]._set(e, t)
                }
                return this.callSuper("_set", e, t)
            },
            toObject: function () {
                return n(i.call(this), {
                    paths: r(this.getObjects(), "toObject"),
                    sourcePath: this.sourcePath
                })
            },
            toDatalessObject: function () {
                var e = this.toObject();
                return this.sourcePath && (e.paths = this.sourcePath), e
            },
            toSVG: function () {
                var e = this.getObjects(),
                    t = ["<g ", 'width="', this.width, '" ', 'height="', this.height, '" ', 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', ">"];
                for (var n = 0, r = e.length; n < r; n++) t.push(e[n].toSVG());
                return t.push("</g>"), t.join("")
            },
            toString: function () {
                return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
            },
            isSameColor: function () {
                var e = this.getObjects()[0].get("fill");
                return this.getObjects().every(function (t) {
                    return t.get("fill") === e
                })
            },
            complexity: function () {
                return this.paths.reduce(function (e, t) {
                    return e + (t && t.complexity ? t.complexity() : 0)
                }, 0)
            },
            toGrayscale: function () {
                var e = this.paths.length;
                while (e--) this.paths[e].toGrayscale();
                return this
            },
            getObjects: function () {
                return this.paths
            }
        }), t.PathGroup.fromObject = function (e) {
            var n = u(e.paths);
            return new t.PathGroup(n, e)
        }
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.array.min,
            i = t.util.array.max,
            s = t.util.array.invoke,
            o = t.util.removeFromArray;
        if (t.Group) return;
        t.Group = t.util.createClass(t.Object, {
            type: "group",
            initialize: function (e, t) {
                t = t || {}, this.objects = e || [], this.originalState = {}, this.callSuper("initialize"), this._calcBounds(), this._updateObjectsCoords(), t && n(this, t), this._setOpacityIfSame(), this.setCoords(!0), this.saveCoords()
            },
            _updateObjectsCoords: function () {
                var e = this.left,
                    t = this.top;
                this.forEachObject(function (n) {
                    var r = n.get("left"),
                        i = n.get("top");
                    n.set("originalLeft", r), n.set("originalTop", i), n.set("left", r - e), n.set("top", i - t), n.setCoords(), n.hideCorners = !0
                }, this)
            },
            toString: function () {
                return "#<fabric.Group: (" + this.complexity() + ")>"
            },
            getObjects: function () {
                return this.objects
            },
            addWithUpdate: function (e) {
                return this._restoreObjectsState(), this.objects.push(e), this._calcBounds(), this._updateObjectsCoords(), this
            },
            removeWithUpdate: function (e) {
                return this._restoreObjectsState(), o(this.objects, e), e.setActive(!1), this._calcBounds(), this._updateObjectsCoords(), this
            },
            add: function (e) {
                return this.objects.push(e), this
            },
            remove: function (e) {
                return o(this.objects, e), this
            },
            size: function () {
                return this.getObjects().length
            },
            _set: function (e, t) {
                if (e === "fill" || e === "opacity") {
                    var n = this.objects.length;
                    this[e] = t;
                    while (n--) this.objects[n].set(e, t)
                } else this[e] = t
            },
            contains: function (e) {
                return this.objects.indexOf(e) > -1
            },
            toObject: function () {
                return n(this.callSuper("toObject"), {
                    objects: s(this.objects, "toObject")
                })
            },
            render: function (e, t) {
                e.save(), this.transform(e);
                var n = Math.max(this.scaleX, this.scaleY);
                for (var r = 0, i = this.objects.length; r < i; r++) {
                    var s = this.objects[r],
                        o = s.borderScaleFactor;
                    s.borderScaleFactor = n, s.render(e), s.borderScaleFactor = o
                }!t && this.active && (this.drawBorders(e), this.hideCorners || this.drawCorners(e)), e.restore(), this.setCoords()
            },
            item: function (e) {
                return this.getObjects()[e]
            },
            complexity: function () {
                return this.getObjects().reduce(function (e, t) {
                    return e += typeof t.complexity == "function" ? t.complexity() : 0, e
                }, 0)
            },
            _restoreObjectsState: function () {
                return this.objects.forEach(this._restoreObjectState, this), this
            },
            _restoreObjectState: function (e) {
                var t = this.get("left"),
                    n = this.get("top"),
                    r = this.getAngle() * (Math.PI / 180),
                    i = Math.cos(r) * e.get("top") + Math.sin(r) * e.get("left"),
                    s = -Math.sin(r) * e.get("top") + Math.cos(r) * e.get("left");
                return e.setAngle(e.getAngle() + this.getAngle()), e.set("left", t + s * this.get("scaleX")), e.set("top", n + i * this.get("scaleY")), e.set("scaleX", e.get("scaleX") * this.get("scaleX")), e.set("scaleY", e.get("scaleY") * this.get("scaleY")), e.setCoords(), e.hideCorners = !1, e.setActive(!1), e.setCoords(), this
            },
            destroy: function () {
                return this._restoreObjectsState()
            },
            saveCoords: function () {
                return this._originalLeft = this.get("left"), this._originalTop = this.get("top"), this
            },
            hasMoved: function () {
                return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
            },
            setObjectsCoords: function () {
                return this.forEachObject(function (e) {
                    e.setCoords()
                }), this
            },
            activateAllObjects: function () {
                return this.forEachObject(function (e) {
                    e.setActive()
                }), this
            },
            forEachObject: t.StaticCanvas.prototype.forEachObject,
            _setOpacityIfSame: function () {
                var e = this.getObjects(),
                    t = e[0] ? e[0].get("opacity") : 1,
                    n = e.every(function (e) {
                        return e.get("opacity") === t
                    });
                n && (this.opacity = t)
            },
            _calcBounds: function () {
                var e = [],
                    t = [],
                    n, s, o, u, a, f, l, c = 0,
                    h = this.objects.length;
                for (; c < h; ++c) {
                    a = this.objects[c], a.setCoords();
                    for (var p in a.oCoords) e.push(a.oCoords[p].x), t.push(a.oCoords[p].y)
                }
                n = r(e), o = i(e), s = r(t), u = i(t), f = o - n || 0, l = u - s || 0, this.width = f, this.height = l, this.left = n + f / 2 || 0, this.top = s + l / 2 || 0
            },
            containsPoint: function (e) {
                var t = this.get("width") / 2,
                    n = this.get("height") / 2,
                    r = this.get("left"),
                    i = this.get("top");
                return r - t < e.x && r + t > e.x && i - n < e.y && i + n > e.y
            },
            toGrayscale: function () {
                var e = this.objects.length;
                while (e--) this.objects[e].toGrayscale()
            },
            toSVG: function () {
                var e = [];
                for (var t = 0, n = this.objects.length; t < n; t++) e.push(this.objects[t].toSVG());
                return '<g transform="' + this.getSvgTransform() + '">' + e.join("") + "</g>"
            }
        }), t.Group.fromObject = function (e, n) {
            t.util.enlivenObjects(e.objects, function (r) {
                delete e.objects, n && n(new t.Group(r, e))
            })
        }, t.Group.async = !0
    }(typeof exports != "undefined" ? exports : this),
    function (e) {
        "use strict";
        var t = fabric.util.object.extend;
        e.fabric || (e.fabric = {});
        if (e.fabric.Image) {
            fabric.warn("fabric.Image is already defined.");
            return
        }
        fabric.Image = fabric.util.createClass(fabric.Object, {
            active: !1,
            type: "image",
            initialize: function (e, t) {
                t || (t = {}), this.callSuper("initialize", t), this._initElement(e), this._originalImage = this.getElement(), this._initConfig(t), this.filters = [], t.filters && (this.filters = t.filters, this.applyFilters())
            },
            getElement: function () {
                return this._element
            },
            setElement: function (e) {
                return this._element = e, this._initConfig(), this
            },
            getOriginalSize: function () {
                var e = this.getElement();
                return {
                    width: e.width,
                    height: e.height
                }
            },
            render: function (e, t) {
                e.save();
                var n = this.transformMatrix;
                this._resetWidthHeight(), this.group && e.translate(-this.group.width / 2 + this.width / 2, -this.group.height / 2 + this.height / 2), n && e.transform(n[0], n[1], n[2], n[3], n[4], n[5]), t || this.transform(e), this._render(e), this.active && !t && (this.drawBorders(e), this.hideCorners || this.drawCorners(e)), e.restore()
            },
            toObject: function () {
                return t(this.callSuper("toObject"), {
                    src: this._originalImage.src || this._originalImage._src,
                    filters: this.filters.concat()
                })
            },
            toSVG: function () {
                return '<g transform="' + this.getSvgTransform() + '">' + '<image xlink:href="' + this.getSvgSrc() + '" ' + 'style="' + this.getSvgStyles() + '" ' + 'transform="translate(' + -this.width / 2 + " " + -this.height / 2 + ')" ' + 'width="' + this.width + '" ' + 'height="' + this.height + '"' + "/>" + "</g>"
            },
            getSrc: function () {
                return this.getElement().src || this.getElement()._src
            },
            toString: function () {
                return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
            },
            clone: function (e) {
                this.constructor.fromObject(this.toObject(), e)
            },
            applyFilters: function (e) {
                if (this.filters.length === 0) {
                    this.setElement(this._originalImage), e && e();
                    return
                }
                var t = typeof Buffer != "undefined" && typeof window == "undefined",
                    n = this._originalImage,
                    r = fabric.document.createElement("canvas"),
                    i = t ? new(require("canvas").Image) : fabric.document.createElement("img"),
                    s = this;
                !r.getContext && typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(r), r.width = n.width, r.height = n.height, r.getContext("2d").drawImage(n, 0, 0, n.width, n.height), this.filters.forEach(function (e) {
                    e && e.applyTo(r)
                }), i.onload = function () {
                    s._element = i, e && e(), i.onload = r = n = null
                }, i.width = n.width, i.height = n.height;
                if (t) {
                    var o = r.toDataURL("image/png").replace(/data:image\/png;base64,/, "");
                    i.src = new Buffer(o, "base64"), s._element = i, e && e()
                } else i.src = r.toDataURL("image/png");
                return this
            },
            _render: function (e) {
                e.drawImage(this.getElement(), -this.width / 2, -this.height / 2, this.width, this.height)
            },
            _resetWidthHeight: function () {
                var e = this.getElement();
                this.set("width", e.width), this.set("height", e.height)
            },
            _initElement: function (e) {
                this.setElement(fabric.util.getById(e)), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
            },
            _initConfig: function (e) {
                e || (e = {}), this.setOptions(e), this._setWidthHeight(e)
            },
            _initFilters: function (e) {
                e.filters && e.filters.length && (this.filters = e.filters.map(function (e) {
                    return e && fabric.Image.filters[e.type].fromObject(e)
                }))
            },
            _setWidthHeight: function (e) {
                this.width = "width" in e ? e.width : this.getElement().width || 0, this.height = "height" in e ? e.height : this.getElement().height || 0
            },
            complexity: function () {
                return 1
            }
        }), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function (e, t) {
            var n = fabric.document.createElement("img"),
                r = e.src;
            e.width && (n.width = e.width), e.height && (n.height = e.height), n.onload = function () {
                fabric.Image.prototype._initFilters.call(e, e);
                var r = new fabric.Image(n, e);
                t && t(r), n = n.onload = null
            }, n.src = r
        }, fabric.Image.fromURL = function (e, t, n) {
            var r = fabric.document.createElement("img");
            r.onload = function () {
                t && t(new fabric.Image(r, n)), r = r.onload = null
            }, r.src = e
        }, fabric.Image.ATTRIBUTE_NAMES = "x y width height fill fill-opacity opacity stroke stroke-width transform xlink:href".split(" "), fabric.Image.fromElement = function (e, n, r) {
            r || (r = {});
            var i = fabric.parseAttributes(e, fabric.Image.ATTRIBUTE_NAMES);
            fabric.Image.fromURL(i["xlink:href"], n, t(i, r))
        }, fabric.Image.async = !0
    }(typeof exports != "undefined" ? exports : this), fabric.util.object.extend(fabric.Object.prototype, {
        _getAngleValueForStraighten: function () {
            var e = this.get("angle");
            return e > -225 && e <= -135 ? -180 : e > -135 && e <= -45 ? -90 : e > -45 && e <= 45 ? 0 : e > 45 && e <= 135 ? 90 : e > 135 && e <= 225 ? 180 : e > 225 && e <= 315 ? 270 : e > 315 ? 360 : 0
        },
        straighten: function () {
            var e = this._getAngleValueForStraighten();
            return this.setAngle(e), this
        },
        fxStraighten: function (e) {
            e = e || {};
            var t = function () {},
                n = e.onComplete || t,
                r = e.onChange || t,
                i = this;
            return fabric.util.animate({
                startValue: this.get("angle"),
                endValue: this._getAngleValueForStraighten(),
                duration: this.FX_DURATION,
                onChange: function (e) {
                    i.setAngle(e), r()
                },
                onComplete: function () {
                    i.setCoords(), n()
                },
                onStart: function () {
                    i.setActive(!1)
                }
            }), this
        }
    }), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        straightenObject: function (e) {
            return e.straighten(), this.renderAll(), this
        },
        fxStraightenObject: function (e) {
            return e.fxStraighten({
                onChange: this.renderAll.bind(this)
            }), this
        }
    }), fabric.Image.filters = {}, fabric.Image.filters.Grayscale = fabric.util.createClass({
        type: "Grayscale",
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = n.width,
                s = n.height,
                o, u, a, f;
            for (a = 0; a < i; a++)
                for (f = 0; f < s; f++) o = a * 4 * s + f * 4, u = (r[o] + r[o + 1] + r[o + 2]) / 3, r[o] = u, r[o + 1] = u, r[o + 2] = u;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type
            }
        }
    }), fabric.Image.filters.Grayscale.fromObject = function () {
        return new fabric.Image.filters.Grayscale
    }, fabric.Image.filters.RemoveWhite = fabric.util.createClass({
        type: "RemoveWhite",
        initialize: function (e) {
            e || (e = {}), this.threshold = e.threshold || 30, this.distance = e.distance || 20
        },
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = this.threshold,
                s = this.distance,
                o = 255 - i,
                u = Math.abs,
                a, f, l;
            for (var c = 0, h = r.length; c < h; c += 4) a = r[c], f = r[c + 1], l = r[c + 2], a > o && f > o && l > o && u(a - f) < s && u(a - l) < s && u(f - l) < s && (r[c + 3] = 1);
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type,
                threshold: this.threshold,
                distance: this.distance
            }
        }
    }), fabric.Image.filters.RemoveWhite.fromObject = function (e) {
        return new fabric.Image.filters.RemoveWhite(e)
    }, fabric.Image.filters.Invert = fabric.util.createClass({
        type: "Invert",
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = r.length,
                s;
            for (s = 0; s < i; s += 4) r[s] = 255 - r[s], r[s + 1] = 255 - r[s + 1], r[s + 2] = 255 - r[s + 2];
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type
            }
        }
    }), fabric.Image.filters.Invert.fromObject = function () {
        return new fabric.Image.filters.Invert
    }, fabric.Image.filters.Sepia = fabric.util.createClass({
        type: "Sepia",
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = r.length,
                s, o;
            for (s = 0; s < i; s += 4) o = .3 * r[s] + .59 * r[s + 1] + .11 * r[s + 2], r[s] = o + 100, r[s + 1] = o + 50, r[s + 2] = o + 255;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type
            }
        }
    }), fabric.Image.filters.Sepia.fromObject = function () {
        return new fabric.Image.filters.Sepia
    }, fabric.Image.filters.Sepia2 = fabric.util.createClass({
        type: "Sepia2",
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = r.length,
                s, o, u, a;
            for (s = 0; s < i; s += 4) o = r[s], u = r[s + 1], a = r[s + 2], r[s] = (o * .393 + u * .769 + a * .189) / 1.351, r[s + 1] = (o * .349 + u * .686 + a * .168) / 1.203, r[s + 2] = (o * .272 + u * .534 + a * .131) / 2.14;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type
            }
        }
    }), fabric.Image.filters.Sepia2.fromObject = function () {
        return new fabric.Image.filters.Sepia2
    }, fabric.Image.filters.Brightness = fabric.util.createClass({
        type: "Brightness",
        initialize: function (e) {
            e || (e = {}), this.brightness = e.brightness || 100
        },
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = this.brightness;
            for (var s = 0, o = r.length; s < o; s += 4) r[s] += i, r[s + 1] += i, r[s + 2] += i;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type,
                brightness: this.brightness
            }
        }
    }), fabric.Image.filters.Brightness.fromObject = function (e) {
        return new fabric.Image.filters.Brightness(e)
    }, fabric.Image.filters.Noise = fabric.util.createClass({
        type: "Noise",
        initialize: function (e) {
            e || (e = {}), this.noise = e.noise || 100
        },
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = this.noise,
                s;
            for (var o = 0, u = r.length; o < u; o += 4) s = (.5 - Math.random()) * i, r[o] += s, r[o + 1] += s, r[o + 2] += s;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type,
                noise: this.noise
            }
        }
    }), fabric.Image.filters.Noise.fromObject = function (e) {
        return new fabric.Image.filters.Noise(e)
    }, fabric.Image.filters.GradientTransparency = fabric.util.createClass({
        type: "GradientTransparency",
        initialize: function (e) {
            e || (e = {}), this.threshold = e.threshold || 100
        },
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = this.threshold,
                s = r.length;
            for (var o = 0, u = r.length; o < u; o += 4) r[o + 3] = i + 255 * (s - o) / s;
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type,
                threshold: this.threshold
            }
        }
    }), fabric.Image.filters.GradientTransparency.fromObject = function (e) {
        return new fabric.Image.filters.GradientTransparency(e)
    }, fabric.Image.filters.Tint = fabric.util.createClass({
        type: "Tint",
        initialize: function (e) {
            e || (e = {}), this.color = e.color || 0
        },
        applyTo: function (e) {
            var t = e.getContext("2d"),
                n = t.getImageData(0, 0, e.width, e.height),
                r = n.data,
                i = r.length,
                s, o, u = parseInt(this.color, 10).toString(16),
                a = parseInt("0x" + u.substr(0, 2), 16),
                f = parseInt("0x" + u.substr(2, 2), 16),
                l = parseInt("0x" + u.substr(4, 2), 16);
            for (s = 0; s < i; s += 4) o = r[s + 3], o > 0 && (r[s] = a, r[s + 1] = f, r[s + 2] = l);
            t.putImageData(n, 0, 0)
        },
        toJSON: function () {
            return {
                type: this.type,
                color: this.color
            }
        }
    }), fabric.Image.filters.Tint.fromObject = function (e) {
        return new fabric.Image.filters.Tint(e)
    },
    function (e) {
        "use strict";
        var t = e.fabric || (e.fabric = {}),
            n = t.util.object.extend,
            r = t.util.object.clone,
            i = t.util.toFixed;
        if (t.Text) {
            t.warn("fabric.Text is already defined");
            return
        }
        t.Text = t.util.createClass(t.Object, {
            fontSize: 40,
            fontWeight: 100,
            fontFamily: "Times New Roman",
            textDecoration: "",
            textShadow: "",
            textAlign: "left",
            fontStyle: "",
            lineHeight: 1.3,
            strokeStyle: "",
            strokeWidth: 1,
            backgroundColor: "",
            path: null,
            type: "text",
            useNative: !0,
            initialize: function (e, t) {
                t = t || {}, this._initStateProperties(), this.text = e, this.setOptions(t), this._theta = this.angle * Math.PI / 180, this._initDimensions(), this.setCoords()
            },
            _initDimensions: function () {
                var e = t.document.createElement("canvas");
                !e.getContext && typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(e), this._render(e.getContext("2d"))
            },
            _initStateProperties: function () {
                this.stateProperties = this.stateProperties.concat(), this.stateProperties.push("fontFamily", "fontWeight", "fontSize", "path", "text", "textDecoration", "textShadow", "textAlign", "fontStyle", "lineHeight", "strokeStyle", "strokeWidth", "backgroundColor", "useNative"), t.util.removeFromArray(this.stateProperties, "width")
            },
            toString: function () {
                return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
            },
            _render: function (e) {
                typeof Cufon == "undefined" || this.useNative === !0 ? this._renderViaNative(e) : this._renderViaCufon(e)
            },
            _renderViaCufon: function (e) {
                var t = Cufon.textOptions || (Cufon.textOptions = {});
                t.left = this.left, t.top = this.top, t.context = e, t.color = this.fill;
                var n = this._initDummyElementForCufon();
                this.transform(e), Cufon.replaceElement(n, {
                    engine: "canvas",
                    separate: "none",
                    fontFamily: this.fontFamily,
                    fontWeight: this.fontWeight,
                    textDecoration: this.textDecoration,
                    textShadow: this.textShadow,
                    textAlign: this.textAlign,
                    fontStyle: this.fontStyle,
                    lineHeight: this.lineHeight,
                    strokeStyle: this.strokeStyle,
                    strokeWidth: this.strokeWidth,
                    backgroundColor: this.backgroundColor
                }), this.width = t.width, this.height = t.height, this._totalLineHeight = t.totalLineHeight, this._fontAscent = t.fontAscent, this._boundaries = t.boundaries, this._shadowOffsets = t.shadowOffsets, this._shadows = t.shadows || [], n = null, this.setCoords()
            },
            _renderViaNative: function (e) {
                this.transform(e), this._setTextStyles(e);
                var t = this.text.split(/\r?\n/);
                this.width = this._getTextWidth(e, t), this.height = this._getTextHeight(e, t), this._renderTextBackground(e, t), this.textAlign !== "left" && (e.save(), e.translate(this.textAlign === "center" ? this.width / 2 : this.width, 0)), this._setTextShadow(e), this._renderTextFill(e, t), this.textShadow && e.restore(), this._renderTextStroke(e, t), this.textAlign !== "left" && e.restore(), this._renderTextDecoration(e, t), this._setBoundaries(e, t), this._totalLineHeight = 0, this.setCoords()
            },
            _setBoundaries: function (e, t) {
                this._boundaries = [];
                for (var n = 0, r = t.length; n < r; n++) {
                    var i = e.measureText(t[n]).width,
                        s = this._getLineLeftOffset(i);
                    this._boundaries.push({
                        height: this.fontSize,
                        width: i,
                        left: s
                    })
                }
            },
            _setTextStyles: function (e) {
                e.fillStyle = this.fill, e.strokeStyle = this.strokeStyle, e.lineWidth = this.strokeWidth, e.textBaseline = "top", e.textAlign = this.textAlign, e.font = this._getFontDeclaration()
            },
            _getTextHeight: function (e, t) {
                return this.fontSize * t.length * this.lineHeight
            },
            _getTextWidth: function (e, t) {
                var n = e.measureText(t[0]).width;
                for (var r = 1, i = t.length; r < i; r++) {
                    var s = e.measureText(t[r]).width;
                    s > n && (n = s)
                }
                return n
            },
            _setTextShadow: function (e) {
                if (this.textShadow) {
                    var t = /\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(\d+)(?:px)?\s*/,
                        n = this.textShadow,
                        r = t.exec(this.textShadow),
                        i = n.replace(t, "");
                    e.save(), e.shadowColor = i, e.shadowOffsetX = parseInt(r[1], 10), e.shadowOffsetY = parseInt(r[2], 10), e.shadowBlur = parseInt(r[3], 10), this._shadows = [{
                        blur: e.shadowBlur,
                        color: e.shadowColor,
                        offX: e.shadowOffsetX,
                        offY: e.shadowOffsetY
                    }], this._shadowOffsets = [[parseInt(e.shadowOffsetX, 10), parseInt(e.shadowOffsetY, 10)]]
                }
            },
            _renderTextFill: function (e, t) {
                this._boundaries = [];
                for (var n = 0, r = t.length; n < r; n++) e.fillText(t[n], -this.width / 2, -this.height / 2 + n * this.fontSize * this.lineHeight)
            },
            _renderTextStroke: function (e, t) {
                if (this.strokeStyle)
                    for (var n = 0, r = t.length; n < r; n++) e.strokeText(t[n], -this.width / 2, -this.height / 2 + n * this.fontSize * this.lineHeight)
            },
            _renderTextBackground: function (e, t) {
                if (this.backgroundColor) {
                    e.save(), e.fillStyle = this.backgroundColor;
                    for (var n = 0, r = t.length; n < r; n++) {
                        var i = e.measureText(t[n]).width,
                            s = this._getLineLeftOffset(i);
                        e.fillRect(-this.width / 2 + s, -this.height / 2 + n * this.fontSize * this.lineHeight, i, this.fontSize)
                    }
                    e.restore()
                }
            },
            _getLineLeftOffset: function (e) {
                return this.textAlign === "center" ? (this.width - e) / 2 : this.textAlign === "right" ? this.width - e : 0
            },
            _renderTextDecoration: function (e, t) {
                function i(i) {
                    for (var s = 0, o = t.length; s < o; s++) {
                        var u = e.measureText(t[s]).width,
                            a = r._getLineLeftOffset(u);
                        e.fillRect(-r.width / 2 + a, i + s * r.fontSize * r.lineHeight - n, u, 1)
                    }
                }
                var n = this._getTextHeight(e, t) / 2,
                    r = this;
                this.textDecoration.indexOf("underline") > -1 && i(this.fontSize), this.textDecoration.indexOf("line-through") > -1 && i(this.fontSize / 2), this.textDecoration.indexOf("overline") > -1 && i(0)
            },
            _getFontDeclaration: function () {
                return [this.fontStyle, this.fontWeight, this.fontSize + "px", t.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
            },
            _initDummyElementForCufon: function () {
                var e = t.document.createElement("pre"),
                    n = t.document.createElement("div");
                return n.appendChild(e), typeof G_vmlCanvasManager == "undefined" ? e.innerHTML = this.text : e.innerText = this.text.replace(/\r?\n/gi, "\r"), e.style.fontSize = this.fontSize + "px", e.style.letterSpacing = "normal", e
            },
            render: function (e, t) {
                e.save(), this._render(e), !t && this.active && (this.drawBorders(e), this.hideCorners || this.drawCorners(e)), e.restore()
            },
            toObject: function () {
                return n(this.callSuper("toObject"), {
                    text: this.text,
                    fontSize: this.fontSize,
                    fontWeight: this.fontWeight,
                    fontFamily: this.fontFamily,
                    fontStyle: this.fontStyle,
                    lineHeight: this.lineHeight,
                    textDecoration: this.textDecoration,
                    textShadow: this.textShadow,
                    textAlign: this.textAlign,
                    path: this.path,
                    strokeStyle: this.strokeStyle,
                    strokeWidth: this.strokeWidth,
                    backgroundColor: this.backgroundColor,
                    useNative: this.useNative
                })
            },
            toSVG: function () {
                var e = this.text.split(/\r?\n/),
                    t = this.useNative ? this.fontSize * this.lineHeight : -this._fontAscent - this._fontAscent / 5 * this.lineHeight,
                    n = -(this.width / 2),
                    r = this.useNative ? this.fontSize - 1 : this.height / 2 - e.length * this.fontSize - this._totalLineHeight,
                    s = this._getSVGTextAndBg(t, n, e),
                    o = this._getSVGShadows(t, e);
                return r += this._fontAscent ? this._fontAscent / 5 * this.lineHeight : 0, ['<g transform="', this.getSvgTransform(), '">', s.textBgRects.join(""), "<text ", this.fontFamily ? "font-family=\"'" + this.fontFamily + "'\" " : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(), '" ', 'transform="translate(', i(n, 2), " ", i(r, 2), ')">', o.join(""), s.textSpans.join(""), "</text>", "</g>"].join("")
            },
            _getSVGShadows: function (e, n) {
                var r = [],
                    s, o, u, a, f = 1;
                if (!this._shadows || !this._boundaries) return r;
                for (s = 0, u = this._shadows.length; s < u; s++)
                    for (o = 0, a = n.length; o < a; o++)
                        if (n[o] !== "") {
                            var l = this._boundaries && this._boundaries[o] ? this._boundaries[o].left : 0;
                            r.push('<tspan x="', i(l + f + this._shadowOffsets[s][0], 2), o === 0 || this.useNative ? '" y' : '" dy', '="', i(this.useNative ? e * o - this.height / 2 + this._shadowOffsets[s][1] : e + (o === 0 ? this._shadowOffsets[s][1] : 0), 2), '" ', this._getFillAttributes(this._shadows[s].color), ">", t.util.string.escapeXml(n[o]), "</tspan>"), f = 1
                        } else f++;
                return r
            },
            _getSVGTextAndBg: function (e, n, r) {
                var s = [],
                    o = [],
                    u, a, f, l = 1;
                for (u = 0, f = r.length; u < f; u++) {
                    r[u] !== "" ? (a = this._boundaries && this._boundaries[u] ? i(this._boundaries[u].left, 2) : 0, s.push('<tspan x="', a, '" ', u === 0 || this.useNative ? "y" : "dy", '="', i(this.useNative ? e * u - this.height / 2 : e * l, 2), '" ', this._getFillAttributes(this.fill), ">", t.util.string.escapeXml(r[u]), "</tspan>"), l = 1) : l++;
                    if (!this.backgroundColor || !this._boundaries) continue;
                    o.push("<rect ", this._getFillAttributes(this.backgroundColor), ' x="', i(n + this._boundaries[u].left, 2), '" y="', i(e * u - this.height / 2, 2), '" width="', i(this._boundaries[u].width, 2), '" height="', i(this._boundaries[u].height, 2), '"></rect>')
                }
                return {
                    textSpans: s,
                    textBgRects: o
                }
            },
            _getFillAttributes: function (e) {
                var n = e ? new t.Color(e) : "";
                return !n || !n.getSource() || n.getAlpha() === 1 ? 'fill="' + e + '"' : 'opacity="' + n.getAlpha() + '" fill="' + n.setAlpha(1).toRgb() + '"'
            },
            setColor: function (e) {
                return this.set("fill", e), this
            },
            setFontsize: function (e) {
                return this.set("fontSize", e), this._initDimensions(), this.setCoords(), this
            },
            getText: function () {
                return this.text
            },
            setText: function (e) {
                return this.set("text", e), this._initDimensions(), this.setCoords(), this
            },
            _set: function (e, t) {
                e === "fontFamily" && this.path && (this.path = this.path.replace(/(.*?)([^\/]*)(\.font\.js)/, "$1" + t + "$3")), this.callSuper("_set", e, t)
            }
        }), t.Text.ATTRIBUTE_NAMES = "x y fill fill-opacity opacity stroke stroke-width transform font-family font-style font-weight font-size text-decoration".split(" "), t.Text.fromObject = function (e) {
            return new t.Text(e.text, r(e))
        }, t.Text.fromElement = function (e, n) {
            if (!e) return null;
            var r = t.parseAttributes(e, t.Text.ATTRIBUTE_NAMES);
            n = t.util.object.extend(n ? t.util.object.clone(n) : {}, r);
            var i = new t.Text(e.textContent, n);
            return i
        }
    }(typeof exports != "undefined" ? exports : this),
    function () {
        function request(e, t, n) {
            var r = URL.parse(e),
                i = HTTP.createClient(r.port, r.hostname),
                s = i.request("GET", r.pathname, {
                    host: r.hostname
                });
            i.addListener("error", function (e) {
                e.errno === process.ECONNREFUSED ? fabric.log("ECONNREFUSED: connection refused to " + i.host + ":" + i.port) : fabric.log(e.message)
            }), s.end(), s.on("response", function (e) {
                var r = "";
                t && e.setEncoding(t), e.on("end", function () {
                    n(r)
                }), e.on("data", function (t) {
                    e.statusCode === 200 && (r += t)
                })
            })
        }
        if (typeof document != "undefined" && typeof window != "undefined") return;
        var DOMParser = (new require("xmldom")).DOMParser,
            URL = require("url"),
            HTTP = require("http"),
            Canvas = require("canvas"),
            Image = require("canvas").Image;
        fabric.util.loadImage = function (e, t) {
            request(e, "binary", function (n) {
                var r = new Image;
                r.src = new Buffer(n, "binary"), r._src = e, t(r)
            })
        }, fabric.loadSVGFromURL = function (e, t) {
            e = e.replace(/^\n\s*/, "").replace(/\?.*$/, "").trim(), request(e, "", function (e) {
                fabric.loadSVGFromString(e, t)
            })
        }, fabric.loadSVGFromString = function (e, t) {
            var n = (new DOMParser).parseFromString(e);
            fabric.parseSVGDocument(n.documentElement, function (e, n) {
                t(e, n)
            })
        }, fabric.util.getScript = function (url, callback) {
            request(url, "", function (body) {
                eval(body), callback && callback()
            })
        }, fabric.Image.fromObject = function (e, t) {
            fabric.util.loadImage(e.src, function (n) {
                var r = new fabric.Image(n);
                r._initConfig(e), r._initFilters(e), t(r)
            })
        }, fabric.createCanvasForNode = function (e, t) {
            var n = fabric.document.createElement("canvas"),
                r = new Canvas(e || 600, t || 600);
            n.style = {}, n.width = r.width, n.height = r.height;
            var i = fabric.Canvas || fabric.StaticCanvas,
                s = new i(n);
            return s.contextContainer = r.getContext("2d"), s.nodeCanvas = r, s
        }, fabric.StaticCanvas.prototype.createPNGStream = function () {
            return this.nodeCanvas.createPNGStream()
        };
        var origSetWidth = fabric.StaticCanvas.prototype.setWidth;
        fabric.StaticCanvas.prototype.setWidth = function (e) {
            return origSetWidth.call(this), this.nodeCanvas.width = e, this
        }, fabric.Canvas && (fabric.Canvas.prototype.setWidth = fabric.StaticCanvas.prototype.setWidth);
        var origSetHeight = fabric.StaticCanvas.prototype.setHeight;
        fabric.StaticCanvas.prototype.setHeight = function (e) {
            return origSetHeight.call(this), this.nodeCanvas.height = e, this
        }, fabric.Canvas && (fabric.Canvas.prototype.setHeight = fabric.StaticCanvas.prototype.setHeight)
    }();