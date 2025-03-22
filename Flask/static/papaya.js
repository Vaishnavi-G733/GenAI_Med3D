var PAPAYA_BUILD_NUM = "1455",
    papayaLoadableImages = [],
    Base64Binary = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        decodeArrayBuffer: function(c) {
            var a = this._keyStr.indexOf(c.charAt(c.length - 1)),
                d = this._keyStr.indexOf(c.charAt(c.length - 2)),
                b = c.length / 4 * 3;
            64 == a && b--;
            64 == d && b--;
            a = new ArrayBuffer(b);
            this.decode(c, a, b);
            return a
        },
        decode: function(c, a, d) {
            var b, e, g, h, f, l = 0,
                k = 0;
            a = a ? new Uint8Array(a) : new Uint8Array(d);
            c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            for (l = 0; l < d; l += 3) b = this._keyStr.indexOf(c.charAt(k++)),
                e = this._keyStr.indexOf(c.charAt(k++)), h = this._keyStr.indexOf(c.charAt(k++)), f = this._keyStr.indexOf(c.charAt(k++)), b = b << 2 | e >> 4, e = (e & 15) << 4 | h >> 2, g = (h & 3) << 6 | f, a[l] = b, 64 != h && (a[l + 1] = e), 64 != f && (a[l + 2] = g);
            return a
        }
    };
! function(c, a) {
    "undefined" != typeof module && module.exports ? module.exports.browser = a() : "function" == typeof define ? define(a) : this[c] = a()
}("bowser", function() {
    function c(c, a, d) {
        return (c = c.match(a)) && c.length > d && c[d] || 0
    }

    function a(a) {
        var b = /(msie|trident)/i.test(a),
            h = /chrome|crios/i.test(a),
            f = /phantom/i.test(a),
            l = /iphone/i.test(a),
            k = /ipad/i.test(a),
            p = /ipod/i.test(a),
            r = /touchpad/i.test(a),
            u = /silk/i.test(a),
            z = /safari/i.test(a) && !h && !f && !u,
            y = /android/i.test(a),
            x = /opera/i.test(a) || /opr/i.test(a),
            D = /firefox/i.test(a),
            B = /gecko\//i.test(a),
            w = /seamonkey\//i.test(a),
            L = /webos/i.test(a),
            C = /windows phone/i.test(a),
            I = /blackberry/i.test(a),
            M = /version\/(\d+(\.\d+)?)/i,
            F = /firefox[ \/](\d+(\.\d+)?)/i,
            t = {};
        p && (l = !1);
        if (C) t = {
            name: "Windows Phone",
            windowsphone: !0,
            msie: !0,
            mobile: !0,
            version: c(a, /iemobile\/(\d+(\.\d+)?)/i, 1)
        };
        else if (x) d = c(a, M, 1) || c(a, /opr\/(\d+(\.\d+)?)/i, 1) || c(a, /opera[ \/](\d+(\.\d+)?)/i, 1), t = {
            name: "Opera",
            opera: !0,
            version: d
        }, y && (t.android = !0, t.mobile = !0), h && (t.webkit = !0);
        else if (b) t = {
            name: "Internet Explorer",
            msie: !0,
            version: c(a, /(msie |rv:)(\d+(\.\d+)?)/i, 2)
        };
        else if (h) {
            t = {
                name: "Chrome",
                webkit: !0,
                chrome: !0,
                version: c(a, /(?:chrome|crios)\/(\d+(\.\d+)?)/i, 1)
            };
            y && (t.android = !0);
            if (k || p || l) t[l ? "iphone" : k ? "ipad" : "ipod"] = !0, t.ios = !0;
            if (t.android || t.ios) t.mobile = !0
        } else f ? t = {
            name: "PhantomJS",
            webkit: !0,
            phantom: !0,
            version: c(a, /phantomjs\/(\d+(\.\d+)?)/i, 1)
        } : r ? t = {
            name: "TouchPad",
            webkit: !0,
            touchpad: !0,
            version: c(a, /touchpad\/(\d+(\.\d+)?)/i, 1)
        } : u ? t = {
            name: "Amazon Silk",
            webkit: !0,
            android: !0,
            mobile: !0,
            version: c(a, /silk\/(\d+(\.\d+)?)/i,
                1)
        } : l || k || p ? (t = {
            name: l ? "iPhone" : k ? "iPad" : "iPod",
            webkit: !0,
            mobile: !0,
            ios: !0
        }, t[l ? "iphone" : k ? "ipad" : "ipod"] = !0, M.test(a) && (t.version = c(a, M, 1))) : I ? (t = {
            name: "BlackBerry",
            blackberry: !0,
            mobile: !0
        }, (d = c(a, M, 1)) ? (t.version = d, t.webkit = !0) : t.version = c(a, /blackberry[\d]+\/(\d+(\.\d+)?)/i, 1)) : L ? t = {
            name: "WebOS",
            mobile: !0,
            webkit: !0,
            webos: !0,
            version: c(a, M, 1) || c(a, /wosbrowser\/(\d+(\.\d+)?)/i, 1)
        } : B ? (t = {
            name: "Gecko",
            gecko: !0,
            mozilla: !0,
            version: c(a, F, 1)
        }, w ? (t.name = "SeaMonkey", t.seamonkey = !0, t.version = c(a, /seamonkey\/(\d+(\.\d+)?)/i,
            1)) : D && (t.name = "Firefox", t.firefox = !0), y ? (t.android = !0, t.mobile = !0) : !y && D && /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(a) && (t.firefoxos = !0, t.mobile = !0)) : y ? t = {
            name: "Android",
            webkit: !0,
            android: !0,
            mobile: !0,
            version: c(a, M, 1)
        } : z && (t = {
            name: "Safari",
            webkit: !0,
            safari: !0,
            version: c(a, M, 1)
        });
        if (y) {
            if (a = c(a, /android[ \/](\d+(\.\d+)*)/i, 1)) t.osversion = a
        } else if (l || k || p) {
            if (a = c(a, /os (\d+([_\s]\d+)*) like mac os x/i, 1)) t.osversion = a.replace(/[_\s]/g, ".")
        } else C && (a = c(a, /windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
            1)) && (t.osversion = a);
        t.msie && 9 <= t.version || t.chrome && 20 <= t.version || t.firefox && 10 <= t.version || t.safari && 5 <= t.version || t.opera && 10 <= t.version || t.ios && t.osversion && 6 <= t.osversion.split(".")[0] ? t.a = !0 : t.msie && 9 > t.version || t.chrome && 20 > t.version || t.firefox && 10 > t.version || t.safari && 5 > t.version || t.opera && 10 > t.version || t.ios && t.osversion && 6 > t.osversion.split(".")[0] ? t.c = !0 : t.x = !0;
        return t
    }
    var d, b = a("undefined" !== typeof navigator ? navigator.userAgent : "");
    b._detect = a;
    return b
});
"use strict";
var numeric = {
    inv: function(c) {
        var a = numeric.dim(c),
            d = Math.abs,
            b = a[0],
            a = a[1],
            e = c.clone(),
            g, h, f = numeric.identity(b),
            l, k, p, r, u;
        for (r = 0; r < a; ++r) {
            h = c = -1;
            for (p = r; p !== b; ++p) u = d(e[p][r]), u > h && (c = p, h = u);
            h = e[c];
            e[c] = e[r];
            e[r] = h;
            k = f[c];
            f[c] = f[r];
            f[r] = k;
            c = h[r];
            for (u = r; u !== a; ++u) h[u] /= c;
            for (u = a - 1; - 1 !== u; --u) k[u] /= c;
            for (p = b - 1; - 1 !== p; --p)
                if (p !== r) {
                    g = e[p];
                    l = f[p];
                    c = g[r];
                    for (u = r + 1; u !== a; ++u) g[u] -= h[u] * c;
                    for (u = a - 1; 0 < u; --u) l[u] -= k[u] * c, --u, l[u] -= k[u] * c;
                    0 === u && (l[0] -= k[0] * c)
                }
        }
        return f
    },
    dim: function(c) {
        var a, d;
        return "object" ===
            typeof c ? (a = c[0], "object" === typeof a ? (d = a[0], "object" === typeof d ? numeric._dim(c) : [c.length, a.length]) : [c.length]) : []
    },
    _dim: function(c) {
        for (var a = [];
            "object" === typeof c;) a.push(c.length), c = c[0];
        return a
    },
    identity: function(c) {
        return numeric.diag(numeric.rep([c], 1))
    },
    rep: function(c, a, d) {
        "undefined" === typeof d && (d = 0);
        var b = c[d],
            e = Array(b);
        if (d === c.length - 1) {
            for (b -= 2; 0 <= b; b -= 2) e[b + 1] = a, e[b] = a; - 1 === b && (e[0] = a);
            return e
        }
        for (--b; 0 <= b; b--) e[b] = numeric.rep(c, a, d + 1);
        return e
    },
    diag: function(c) {
        var a, d, b, e = c.length,
            g = Array(e),
            h;
        for (a = e - 1; 0 <= a; a--) {
            h = Array(e);
            d = a + 2;
            for (b = e - 1; b >= d; b -= 2) h[b] = 0, h[b - 1] = 0;
            b > a && (h[b] = 0);
            h[a] = c[a];
            for (b = a - 1; 1 <= b; b -= 2) h[b] = 0, h[b - 1] = 0;
            0 === b && (h[0] = 0);
            g[a] = h
        }
        return g
    }
};
! function(c) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = c();
    else if ("function" == typeof define && define.amd) define([], c);
    else {
        var a;
        "undefined" != typeof window ? a = window : "undefined" != typeof global ? a = global : "undefined" != typeof self && (a = self);
        a.pako = c()
    }
}(function() {
    return function a(d, b, e) {
        function g(f, k) {
            if (!b[f]) {
                if (!d[f]) {
                    var p = "function" == typeof require && require;
                    if (!k && p) return p(f, !0);
                    if (h) return h(f, !0);
                    throw Error("Cannot find module '" + f + "'");
                }
                p = b[f] = {
                    exports: {}
                };
                d[f][0].call(p.exports,
                    function(a) {
                        var e = d[f][1][a];
                        return g(e ? e : a)
                    }, p, p.exports, a, d, b, e)
            }
            return b[f].exports
        }
        for (var h = "function" == typeof require && require, f = 0; f < e.length; f++) g(e[f]);
        return g
    }({
        1: [function(a, d, b) {
            function e(a, d, e, b) {
                d = new u(d);
                d.onFinish = b;
                d.push(a, !0, e)
            }
            var g = a("./zlib/inflate.js"),
                h = a("./utils/common"),
                f = a("./utils/strings"),
                l = a("./zlib/constants"),
                k = a("./zlib/messages"),
                p = a("./zlib/zstream"),
                r = a("./zlib/gzheader"),
                u = function(a) {
                    var d = this.options = h.assign({
                        chunkSize: 16384,
                        windowBits: 0,
                        to: ""
                    }, a || {});
                    d.raw && 0 <= d.windowBits && 16 > d.windowBits && (d.windowBits = -d.windowBits, 0 === d.windowBits && (d.windowBits = -15));
                    !(0 <= d.windowBits && 16 > d.windowBits) || a && a.windowBits || (d.windowBits += 32);
                    15 < d.windowBits && 48 > d.windowBits && 0 === (d.windowBits & 15) && (d.windowBits |= 15);
                    this.err = 0;
                    this.msg = "";
                    this.ended = !1;
                    this.chunks = [];
                    this.strm = new p;
                    this.strm.avail_out = 0;
                    a = g.inflateInit2(this.strm, d.windowBits);
                    if (a !== l.Z_OK) throw Error(k[a]);
                    this.header = new r;
                    g.inflateGetHeader(this.strm, this.header)
                };
            u.prototype.push = function(a,
                d, e) {
                var b = this.strm;
                d = this.options.chunkSize;
                if (this.ended) return !1;
                b.input = "string" === typeof a ? f.binstring2buf(a) : a;
                b.next_in = 0;
                b.avail_in = b.input.length;
                a = (new DataView(a.buffer)).getUint32(a.byteLength - 4, !0);
                this.progressMeter = e;
                this.progressIterations = a / d;
                this.progressIndex = 0;
                this.progressNextGoal = .25;
                this.progressMeter && this.progressMeter.drawProgress(.1, "Unpacking");
                setTimeout(this.pushProcess.bind(this), 0)
            };
            u.prototype.pushProcess = function() {
                var a = this.strm,
                    d = this.options.chunkSize,
                    e, b, f;
                do {
                    0 === a.avail_out && (a.output = new h.Buf8(d), a.next_out = 0, a.avail_out = d);
                    e = g.inflate(a, l.Z_NO_FLUSH);
                    if (e !== l.Z_STREAM_END && e !== l.Z_OK) return this.onEnd(e), this.ended = !0, !1;
                    if (a.next_out && (0 === a.avail_out || e === l.Z_STREAM_END || 0 === a.avail_in && b === l.Z_FINISH)) this.onData(h.shrinkBuf(a.output, a.next_out));
                    this.progressIndex += 1;
                    f = this.progressIndex / this.progressIterations;
                    this.progressMeter && this.progressMeter.drawProgress(f, "Unpacking")
                } while (f < this.progressNextGoal && (0 < a.avail_in || 0 === a.avail_out) &&
                    e !== l.Z_STREAM_END);
                (0 < a.avail_in || 0 === a.avail_out) && e !== l.Z_STREAM_END ? (this.progressNextGoal += .1, setTimeout(this.pushProcess.bind(this), 0)) : (e === l.Z_STREAM_END && (b = l.Z_FINISH), b === l.Z_FINISH && (e = g.inflateEnd(this.strm), this.onEnd(e), this.ended = !0), this.onFinish(this.result))
            };
            u.prototype.onData = function(a) {
                this.chunks.push(a)
            };
            u.prototype.onEnd = function(a) {
                a === l.Z_OK && (this.result = "string" === this.options.to ? this.chunks.join("") : h.flattenChunks(this.chunks));
                this.chunks = [];
                this.err = a;
                this.msg = this.strm.msg
            };
            b.Inflate = u;
            b.inflate = e;
            b.inflateRaw = function(a, d) {
                d = d || {};
                d.raw = !0;
                return e(a, d)
            };
            b.ungzip = e
        }, {
            "./utils/common": 2,
            "./utils/strings": 3,
            "./zlib/constants": 5,
            "./zlib/gzheader": 7,
            "./zlib/inflate.js": 9,
            "./zlib/messages": 11,
            "./zlib/zstream": 12
        }],
        2: [function(a, d, b) {
            a = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
            b.assign = function(a) {
                for (var d = Array.prototype.slice.call(arguments, 1); d.length;) {
                    var e = d.shift();
                    if (e) {
                        if ("object" !== typeof e) throw new TypeError(e +
                            "must be non-object");
                        for (var b in e) e.hasOwnProperty(b) && (a[b] = e[b])
                    }
                }
                return a
            };
            b.shrinkBuf = function(a, d) {
                if (a.length === d) return a;
                if (a.subarray) return a.subarray(0, d);
                a.length = d;
                return a
            };
            var e = {
                    arraySet: function(a, d, e, b, g) {
                        if (d.subarray && a.subarray) a.set(d.subarray(e, e + b), g);
                        else
                            for (var r = 0; r < b; r++) a[g + r] = d[e + r]
                    },
                    flattenChunks: function(a) {
                        var d, e, b, g, r;
                        d = b = 0;
                        for (e = a.length; d < e; d++) b += a[d].length;
                        r = new Uint8Array(b);
                        d = b = 0;
                        for (e = a.length; d < e; d++) g = a[d], r.set(g, b), b += g.length;
                        return r
                    }
                },
                g = {
                    arraySet: function(a,
                        d, e, b, g) {
                        for (var r = 0; r < b; r++) a[g + r] = d[e + r]
                    },
                    flattenChunks: function(a) {
                        return [].concat.apply([], a)
                    }
                };
            b.setTyped = function(a) {
                a ? (b.Buf8 = Uint8Array, b.Buf16 = Uint16Array, b.Buf32 = Int32Array, b.assign(b, e)) : (b.Buf8 = Array, b.Buf16 = Array, b.Buf32 = Array, b.assign(b, g))
            };
            b.setTyped(a)
        }, {}],
        3: [function(a, d, b) {
            function e(a, d) {
                if (65537 > d && (a.subarray && f || !a.subarray && h)) return String.fromCharCode.apply(null, g.shrinkBuf(a, d));
                for (var e = "", b = 0; b < d; b++) e += String.fromCharCode(a[b]);
                return e
            }
            var g = a("./common"),
                h = !0,
                f = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (l) {
                h = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (k) {
                f = !1
            }
            var p = new g.Buf8(256);
            for (a = 0; 256 > a; a++) p[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
            p[254] = p[254] = 1;
            b.string2buf = function(a) {
                var d, e, b, h, f, l = a.length,
                    k = 0;
                for (h = 0; h < l; h++) e = a.charCodeAt(h), 55296 === (e & 64512) && h + 1 < l && (b = a.charCodeAt(h + 1), 56320 === (b & 64512) && (e = 65536 + (e - 55296 << 10) + (b - 56320), h++)), k += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4;
                d = new g.Buf8(k);
                for (h = f = 0; f < k; h++) e = a.charCodeAt(h),
                    55296 === (e & 64512) && h + 1 < l && (b = a.charCodeAt(h + 1), 56320 === (b & 64512) && (e = 65536 + (e - 55296 << 10) + (b - 56320), h++)), 128 > e ? d[f++] = e : (2048 > e ? d[f++] = 192 | e >>> 6 : (65536 > e ? d[f++] = 224 | e >>> 12 : (d[f++] = 240 | e >>> 18, d[f++] = 128 | e >>> 12 & 63), d[f++] = 128 | e >>> 6 & 63), d[f++] = 128 | e & 63);
                return d
            };
            b.buf2binstring = function(a) {
                return e(a, a.length)
            };
            b.binstring2buf = function(a) {
                for (var d = new g.Buf8(a.length), e = 0, b = d.length; e < b; e++) d[e] = a.charCodeAt(e);
                return d
            };
            b.buf2string = function(a, d) {
                var b, g, h, f, l = d || a.length,
                    k = Array(2 * l);
                for (b = g = 0; b <
                    l;)
                    if (h = a[b++], 128 > h) k[g++] = h;
                    else if (f = p[h], 4 < f) k[g++] = 65533, b += f - 1;
                else {
                    for (h &= 2 === f ? 31 : 3 === f ? 15 : 7; 1 < f && b < l;) h = h << 6 | a[b++] & 63, f--;
                    1 < f ? k[g++] = 65533 : 65536 > h ? k[g++] = h : (h -= 65536, k[g++] = 55296 | h >> 10 & 1023, k[g++] = 56320 | h & 1023)
                }
                return e(k, g)
            };
            b.utf8border = function(a, d) {
                var e;
                d = d || a.length;
                d > a.length && (d = a.length);
                for (e = d - 1; 0 <= e && 128 === (a[e] & 192);) e--;
                return 0 > e || 0 === e ? d : e + p[a[e]] > d ? e : d
            }
        }, {
            "./common": 2
        }],
        4: [function(a, d, b) {
            d.exports = function(a, d, b, f) {
                var l = a & 65535 | 0;
                a = a >>> 16 & 65535 | 0;
                for (var k = 0; 0 !== b;) {
                    k =
                        2E3 < b ? 2E3 : b;
                    b -= k;
                    do l = l + d[f++] | 0, a = a + l | 0; while (--k);
                    l %= 65521;
                    a %= 65521
                }
                return l | a << 16 | 0
            }
        }, {}],
        5: [function(a, d, b) {
                d.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                }
            },
            {}
        ],
        6: [function(a, d, b) {
            var e = function() {
                for (var a, d = [], e = 0; 256 > e; e++) {
                    a = e;
                    for (var b = 0; 8 > b; b++) a = a & 1 ? 3988292384 ^ a >>> 1 : a >>> 1;
                    d[e] = a
                }
                return d
            }();
            d.exports = function(a, d, b, l) {
                b = l + b;
                for (a ^= -1; l < b; l++) a = a >>> 8 ^ e[(a ^ d[l]) & 255];
                return a ^ -1
            }
        }, {}],
        7: [function(a, d, b) {
            d.exports = function() {
                this.os = this.xflags = this.time = this.text = 0;
                this.extra = null;
                this.extra_len = 0;
                this.comment = this.name = "";
                this.hcrc = 0;
                this.done = !1
            }
        }, {}],
        8: [function(a, d, b) {
            d.exports = function(a, d) {
                var b, f, l, k, p, r, u, z, y, x, D, B, w, L, C, I, M, F, t, E, v, m, n,
                    H;
                b = a.state;
                f = a.next_in;
                n = a.input;
                l = f + (a.avail_in - 5);
                k = a.next_out;
                H = a.output;
                p = k - (d - a.avail_out);
                r = k + (a.avail_out - 257);
                u = b.dmax;
                z = b.wsize;
                y = b.whave;
                x = b.wnext;
                D = b.window;
                B = b.hold;
                w = b.bits;
                L = b.lencode;
                C = b.distcode;
                I = (1 << b.lenbits) - 1;
                M = (1 << b.distbits) - 1;
                a: do b: for (15 > w && (B += n[f++] << w, w += 8, B += n[f++] << w, w += 8), F = L[B & I];;) {
                        t = F >>> 24;
                        B >>>= t;
                        w -= t;
                        t = F >>> 16 & 255;
                        if (0 === t) H[k++] = F & 65535;
                        else if (t & 16) {
                            E = F & 65535;
                            if (t &= 15) w < t && (B += n[f++] << w, w += 8), E += B & (1 << t) - 1, B >>>= t, w -= t;
                            15 > w && (B += n[f++] << w, w += 8, B += n[f++] << w, w +=
                                8);
                            F = C[B & M];
                            c: for (;;) {
                                t = F >>> 24;
                                B >>>= t;
                                w -= t;
                                t = F >>> 16 & 255;
                                if (t & 16) {
                                    F &= 65535;
                                    t &= 15;
                                    w < t && (B += n[f++] << w, w += 8, w < t && (B += n[f++] << w, w += 8));
                                    F += B & (1 << t) - 1;
                                    if (F > u) {
                                        a.msg = "invalid distance too far back";
                                        b.mode = 30;
                                        break a
                                    }
                                    B >>>= t;
                                    w -= t;
                                    t = k - p;
                                    if (F > t) {
                                        t = F - t;
                                        if (t > y && b.sane) {
                                            a.msg = "invalid distance too far back";
                                            b.mode = 30;
                                            break a
                                        }
                                        v = 0;
                                        m = D;
                                        if (0 === x) {
                                            if (v += z - t, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = k - F;
                                                m = H
                                            }
                                        } else if (x < t) {
                                            if (v += z + x - t, t -= x, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = 0;
                                                if (x < E) {
                                                    t = x;
                                                    E -= t;
                                                    do H[k++] = D[v++]; while (--t);
                                                    v = k - F;
                                                    m = H
                                                }
                                            }
                                        } else if (v += x - t, t < E) {
                                            E -= t;
                                            do H[k++] = D[v++]; while (--t);
                                            v = k - F;
                                            m = H
                                        }
                                        for (; 2 < E;) H[k++] = m[v++], H[k++] = m[v++], H[k++] = m[v++], E -= 3;
                                        E && (H[k++] = m[v++], 1 < E && (H[k++] = m[v++]))
                                    } else {
                                        v = k - F;
                                        do H[k++] = H[v++], H[k++] = H[v++], H[k++] = H[v++], E -= 3; while (2 < E);
                                        E && (H[k++] = H[v++], 1 < E && (H[k++] = H[v++]))
                                    }
                                } else if (0 === (t & 64)) {
                                    F = C[(F & 65535) + (B & (1 << t) - 1)];
                                    continue c
                                } else {
                                    a.msg = "invalid distance code";
                                    b.mode = 30;
                                    break a
                                }
                                break
                            }
                        } else if (0 === (t & 64)) {
                            F = L[(F & 65535) + (B & (1 << t) - 1)];
                            continue b
                        } else {
                            t & 32 ? b.mode = 12 : (a.msg = "invalid literal/length code",
                                b.mode = 30);
                            break a
                        }
                        break
                    }
                    while (f < l && k < r);
                    E = w >> 3;
                f -= E;
                w -= E << 3;
                a.next_in = f;
                a.next_out = k;
                a.avail_in = f < l ? 5 + (l - f) : 5 - (f - l);
                a.avail_out = k < r ? 257 + (r - k) : 257 - (k - r);
                b.hold = B & (1 << w) - 1;
                b.bits = w
            }
        }, {}],
        9: [function(a, d, b) {
                function e(a) {
                    return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((a & 65280) << 8) + ((a & 255) << 24)
                }

                function g() {
                    this.mode = 0;
                    this.last = !1;
                    this.wrap = 0;
                    this.havedict = !1;
                    this.total = this.check = this.dmax = this.flags = 0;
                    this.head = null;
                    this.wnext = this.whave = this.wsize = this.wbits = 0;
                    this.window = null;
                    this.extra = this.offset = this.length =
                        this.bits = this.hold = 0;
                    this.distcode = this.lencode = null;
                    this.have = this.ndist = this.nlen = this.ncode = this.distbits = this.lenbits = 0;
                    this.next = null;
                    this.lens = new p.Buf16(320);
                    this.work = new p.Buf16(288);
                    this.distdyn = this.lendyn = null;
                    this.was = this.back = this.sane = 0
                }

                function h(a) {
                    var d;
                    if (!a || !a.state) return -2;
                    d = a.state;
                    a.total_in = a.total_out = d.total = 0;
                    a.msg = "";
                    d.wrap && (a.adler = d.wrap & 1);
                    d.mode = 1;
                    d.last = 0;
                    d.havedict = 0;
                    d.dmax = 32768;
                    d.head = null;
                    d.hold = 0;
                    d.bits = 0;
                    d.lencode = d.lendyn = new p.Buf32(852);
                    d.distcode = d.distdyn =
                        new p.Buf32(592);
                    d.sane = 1;
                    d.back = -1;
                    return 0
                }

                function f(a) {
                    var d;
                    if (!a || !a.state) return -2;
                    d = a.state;
                    d.wsize = 0;
                    d.whave = 0;
                    d.wnext = 0;
                    return h(a)
                }

                function l(a, d) {
                    var e, b;
                    if (!a || !a.state) return -2;
                    b = a.state;
                    0 > d ? (e = 0, d = -d) : (e = (d >> 4) + 1, 48 > d && (d &= 15));
                    if (d && (8 > d || 15 < d)) return -2;
                    null !== b.window && b.wbits !== d && (b.window = null);
                    b.wrap = e;
                    b.wbits = d;
                    return f(a)
                }

                function k(a, d) {
                    var e;
                    if (!a) return -2;
                    e = new g;
                    a.state = e;
                    e.window = null;
                    e = l(a, d);
                    0 !== e && (a.state = null);
                    return e
                }
                var p = a("../utils/common"),
                    r = a("./adler32"),
                    u =
                    a("./crc32"),
                    z = a("./inffast"),
                    y = a("./inftrees"),
                    x = !0,
                    D, B;
                b.inflateReset = f;
                b.inflateReset2 = l;
                b.inflateResetKeep = h;
                b.inflateInit = function(a) {
                    return k(a, 15)
                };
                b.inflateInit2 = k;
                b.inflate = function(a, d) {
                    var b, g, h, f, l, k, v, m, n, H, J, q, A, N, K = 0,
                        Q, R, P, O = new p.Buf8(4),
                        S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return -2;
                    b = a.state;
                    12 === b.mode && (b.mode = 13);
                    l = a.next_out;
                    h = a.output;
                    v = a.avail_out;
                    f = a.next_in;
                    g = a.input;
                    k = a.avail_in;
                    m = b.hold;
                    n = b.bits;
                    H = k;
                    J = v;
                    P = 0;
                    a: for (;;) switch (b.mode) {
                        case 1:
                            if (0 === b.wrap) {
                                b.mode = 13;
                                break
                            }
                            for (; 16 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (b.wrap & 2 && 35615 === m) {
                                b.check = 0;
                                O[0] = m & 255;
                                O[1] = m >>> 8 & 255;
                                b.check = u(b.check, O, 2, 0);
                                n = m = 0;
                                b.mode = 2;
                                break
                            }
                            b.flags = 0;
                            b.head && (b.head.done = !1);
                            if (!(b.wrap & 1) || (((m & 255) << 8) + (m >> 8)) % 31) {
                                a.msg = "incorrect header check";
                                b.mode = 30;
                                break
                            }
                            if (8 !== (m & 15)) {
                                a.msg = "unknown compression method";
                                b.mode = 30;
                                break
                            }
                            m >>>= 4;
                            n -= 4;
                            A = (m & 15) + 8;
                            if (0 === b.wbits) b.wbits = A;
                            else if (A > b.wbits) {
                                a.msg = "invalid window size";
                                b.mode = 30;
                                break
                            }
                            b.dmax = 1 << A;
                            a.adler = b.check = 1;
                            b.mode = m & 512 ? 10 : 12;
                            n = m = 0;
                            break;
                        case 2:
                            for (; 16 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.flags = m;
                            if (8 !== (b.flags & 255)) {
                                a.msg = "unknown compression method";
                                b.mode = 30;
                                break
                            }
                            if (b.flags & 57344) {
                                a.msg = "unknown header flags set";
                                b.mode = 30;
                                break
                            }
                            b.head && (b.head.text = m >> 8 & 1);
                            b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                            n = m = 0;
                            b.mode = 3;
                        case 3:
                            for (; 32 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.head && (b.head.time = m);
                            b.flags & 512 && (O[0] = m & 255,
                                O[1] = m >>> 8 & 255, O[2] = m >>> 16 & 255, O[3] = m >>> 24 & 255, b.check = u(b.check, O, 4, 0));
                            n = m = 0;
                            b.mode = 4;
                        case 4:
                            for (; 16 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.head && (b.head.xflags = m & 255, b.head.os = m >> 8);
                            b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                            n = m = 0;
                            b.mode = 5;
                        case 5:
                            if (b.flags & 1024) {
                                for (; 16 > n;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                b.length = m;
                                b.head && (b.head.extra_len = m);
                                b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                                n = m = 0
                            } else b.head && (b.head.extra = null);
                            b.mode = 6;
                        case 6:
                            if (b.flags & 1024 && (q = b.length, q > k && (q = k), q && (b.head && (A = b.head.extra_len - b.length, b.head.extra || (b.head.extra = Array(b.head.extra_len)), p.arraySet(b.head.extra, g, f, q, A)), b.flags & 512 && (b.check = u(b.check, g, q, f)), k -= q, f += q, b.length -= q), b.length)) break a;
                            b.length = 0;
                            b.mode = 7;
                        case 7:
                            if (b.flags & 2048) {
                                if (0 === k) break a;
                                q = 0;
                                do A = g[f + q++], b.head && A && 65536 > b.length && (b.head.name += String.fromCharCode(A)); while (A && q < k);
                                b.flags & 512 && (b.check = u(b.check, g, q, f));
                                k -= q;
                                f += q;
                                if (A) break a
                            } else b.head && (b.head.name =
                                null);
                            b.length = 0;
                            b.mode = 8;
                        case 8:
                            if (b.flags & 4096) {
                                if (0 === k) break a;
                                q = 0;
                                do A = g[f + q++], b.head && A && 65536 > b.length && (b.head.comment += String.fromCharCode(A)); while (A && q < k);
                                b.flags & 512 && (b.check = u(b.check, g, q, f));
                                k -= q;
                                f += q;
                                if (A) break a
                            } else b.head && (b.head.comment = null);
                            b.mode = 9;
                        case 9:
                            if (b.flags & 512) {
                                for (; 16 > n;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                if (m !== (b.check & 65535)) {
                                    a.msg = "header crc mismatch";
                                    b.mode = 30;
                                    break
                                }
                                n = m = 0
                            }
                            b.head && (b.head.hcrc = b.flags >> 9 & 1, b.head.done = !0);
                            a.adler = b.check = 0;
                            b.mode = 12;
                            break;
                        case 10:
                            for (; 32 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            a.adler = b.check = e(m);
                            n = m = 0;
                            b.mode = 11;
                        case 11:
                            if (0 === b.havedict) return a.next_out = l, a.avail_out = v, a.next_in = f, a.avail_in = k, b.hold = m, b.bits = n, 2;
                            a.adler = b.check = 1;
                            b.mode = 12;
                        case 12:
                            if (5 === d || 6 === d) break a;
                        case 13:
                            if (b.last) {
                                m >>>= n & 7;
                                n -= n & 7;
                                b.mode = 27;
                                break
                            }
                            for (; 3 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.last = m & 1;
                            m >>>= 1;
                            --n;
                            switch (m & 3) {
                                case 0:
                                    b.mode = 14;
                                    break;
                                case 1:
                                    q = b;
                                    if (x) {
                                        A = void 0;
                                        D = new p.Buf32(512);
                                        B = new p.Buf32(32);
                                        for (A = 0; 144 > A;) q.lens[A++] =
                                            8;
                                        for (; 256 > A;) q.lens[A++] = 9;
                                        for (; 280 > A;) q.lens[A++] = 7;
                                        for (; 288 > A;) q.lens[A++] = 8;
                                        y(1, q.lens, 0, 288, D, 0, q.work, {
                                            bits: 9
                                        });
                                        for (A = 0; 32 > A;) q.lens[A++] = 5;
                                        y(2, q.lens, 0, 32, B, 0, q.work, {
                                            bits: 5
                                        });
                                        x = !1
                                    }
                                    q.lencode = D;
                                    q.lenbits = 9;
                                    q.distcode = B;
                                    q.distbits = 5;
                                    b.mode = 20;
                                    if (6 === d) {
                                        m >>>= 2;
                                        n -= 2;
                                        break a
                                    }
                                    break;
                                case 2:
                                    b.mode = 17;
                                    break;
                                case 3:
                                    a.msg = "invalid block type", b.mode = 30
                            }
                            m >>>= 2;
                            n -= 2;
                            break;
                        case 14:
                            m >>>= n & 7;
                            for (n -= n & 7; 32 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if ((m & 65535) !== (m >>> 16 ^ 65535)) {
                                a.msg = "invalid stored block lengths";
                                b.mode = 30;
                                break
                            }
                            b.length = m & 65535;
                            n = m = 0;
                            b.mode = 15;
                            if (6 === d) break a;
                        case 15:
                            b.mode = 16;
                        case 16:
                            if (q = b.length) {
                                q > k && (q = k);
                                q > v && (q = v);
                                if (0 === q) break a;
                                p.arraySet(h, g, f, q, l);
                                k -= q;
                                f += q;
                                v -= q;
                                l += q;
                                b.length -= q;
                                break
                            }
                            b.mode = 12;
                            break;
                        case 17:
                            for (; 14 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.nlen = (m & 31) + 257;
                            m >>>= 5;
                            n -= 5;
                            b.ndist = (m & 31) + 1;
                            m >>>= 5;
                            n -= 5;
                            b.ncode = (m & 15) + 4;
                            m >>>= 4;
                            n -= 4;
                            if (286 < b.nlen || 30 < b.ndist) {
                                a.msg = "too many length or distance symbols";
                                b.mode = 30;
                                break
                            }
                            b.have = 0;
                            b.mode = 18;
                        case 18:
                            for (; b.have < b.ncode;) {
                                for (; 3 >
                                    n;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                b.lens[S[b.have++]] = m & 7;
                                m >>>= 3;
                                n -= 3
                            }
                            for (; 19 > b.have;) b.lens[S[b.have++]] = 0;
                            b.lencode = b.lendyn;
                            b.lenbits = 7;
                            q = {
                                bits: b.lenbits
                            };
                            P = y(0, b.lens, 0, 19, b.lencode, 0, b.work, q);
                            b.lenbits = q.bits;
                            if (P) {
                                a.msg = "invalid code lengths set";
                                b.mode = 30;
                                break
                            }
                            b.have = 0;
                            b.mode = 19;
                        case 19:
                            for (; b.have < b.nlen + b.ndist;) {
                                for (;;) {
                                    K = b.lencode[m & (1 << b.lenbits) - 1];
                                    q = K >>> 24;
                                    K &= 65535;
                                    if (q <= n) break;
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                if (16 > K) m >>>= q, n -= q, b.lens[b.have++] = K;
                                else {
                                    if (16 === K) {
                                        for (A =
                                            q + 2; n < A;) {
                                            if (0 === k) break a;
                                            k--;
                                            m += g[f++] << n;
                                            n += 8
                                        }
                                        m >>>= q;
                                        n -= q;
                                        if (0 === b.have) {
                                            a.msg = "invalid bit length repeat";
                                            b.mode = 30;
                                            break
                                        }
                                        A = b.lens[b.have - 1];
                                        q = 3 + (m & 3);
                                        m >>>= 2;
                                        n -= 2
                                    } else if (17 === K) {
                                        for (A = q + 3; n < A;) {
                                            if (0 === k) break a;
                                            k--;
                                            m += g[f++] << n;
                                            n += 8
                                        }
                                        m >>>= q;
                                        n -= q;
                                        A = 0;
                                        q = 3 + (m & 7);
                                        m >>>= 3;
                                        n -= 3
                                    } else {
                                        for (A = q + 7; n < A;) {
                                            if (0 === k) break a;
                                            k--;
                                            m += g[f++] << n;
                                            n += 8
                                        }
                                        m >>>= q;
                                        n -= q;
                                        A = 0;
                                        q = 11 + (m & 127);
                                        m >>>= 7;
                                        n -= 7
                                    }
                                    if (b.have + q > b.nlen + b.ndist) {
                                        a.msg = "invalid bit length repeat";
                                        b.mode = 30;
                                        break
                                    }
                                    for (; q--;) b.lens[b.have++] = A
                                }
                            }
                            if (30 === b.mode) break;
                            if (0 === b.lens[256]) {
                                a.msg = "invalid code -- missing end-of-block";
                                b.mode = 30;
                                break
                            }
                            b.lenbits = 9;
                            q = {
                                bits: b.lenbits
                            };
                            P = y(1, b.lens, 0, b.nlen, b.lencode, 0, b.work, q);
                            b.lenbits = q.bits;
                            if (P) {
                                a.msg = "invalid literal/lengths set";
                                b.mode = 30;
                                break
                            }
                            b.distbits = 6;
                            b.distcode = b.distdyn;
                            q = {
                                bits: b.distbits
                            };
                            P = y(2, b.lens, b.nlen, b.ndist, b.distcode, 0, b.work, q);
                            b.distbits = q.bits;
                            if (P) {
                                a.msg = "invalid distances set";
                                b.mode = 30;
                                break
                            }
                            b.mode = 20;
                            if (6 === d) break a;
                        case 20:
                            b.mode = 21;
                        case 21:
                            if (6 <= k && 258 <= v) {
                                a.next_out = l;
                                a.avail_out =
                                    v;
                                a.next_in = f;
                                a.avail_in = k;
                                b.hold = m;
                                b.bits = n;
                                z(a, J);
                                l = a.next_out;
                                h = a.output;
                                v = a.avail_out;
                                f = a.next_in;
                                g = a.input;
                                k = a.avail_in;
                                m = b.hold;
                                n = b.bits;
                                12 === b.mode && (b.back = -1);
                                break
                            }
                            for (b.back = 0;;) {
                                K = b.lencode[m & (1 << b.lenbits) - 1];
                                q = K >>> 24;
                                A = K >>> 16 & 255;
                                K &= 65535;
                                if (q <= n) break;
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (A && 0 === (A & 240)) {
                                N = q;
                                Q = A;
                                for (R = K;;) {
                                    K = b.lencode[R + ((m & (1 << N + Q) - 1) >> N)];
                                    q = K >>> 24;
                                    A = K >>> 16 & 255;
                                    K &= 65535;
                                    if (N + q <= n) break;
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                m >>>= N;
                                n -= N;
                                b.back += N
                            }
                            m >>>= q;
                            n -= q;
                            b.back +=
                                q;
                            b.length = K;
                            if (0 === A) {
                                b.mode = 26;
                                break
                            }
                            if (A & 32) {
                                b.back = -1;
                                b.mode = 12;
                                break
                            }
                            if (A & 64) {
                                a.msg = "invalid literal/length code";
                                b.mode = 30;
                                break
                            }
                            b.extra = A & 15;
                            b.mode = 22;
                        case 22:
                            if (b.extra) {
                                for (A = b.extra; n < A;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                b.length += m & (1 << b.extra) - 1;
                                m >>>= b.extra;
                                n -= b.extra;
                                b.back += b.extra
                            }
                            b.was = b.length;
                            b.mode = 23;
                        case 23:
                            for (;;) {
                                K = b.distcode[m & (1 << b.distbits) - 1];
                                q = K >>> 24;
                                A = K >>> 16 & 255;
                                K &= 65535;
                                if (q <= n) break;
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (0 === (A & 240)) {
                                N = q;
                                Q = A;
                                for (R = K;;) {
                                    K = b.distcode[R +
                                        ((m & (1 << N + Q) - 1) >> N)];
                                    q = K >>> 24;
                                    A = K >>> 16 & 255;
                                    K &= 65535;
                                    if (N + q <= n) break;
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                m >>>= N;
                                n -= N;
                                b.back += N
                            }
                            m >>>= q;
                            n -= q;
                            b.back += q;
                            if (A & 64) {
                                a.msg = "invalid distance code";
                                b.mode = 30;
                                break
                            }
                            b.offset = K;
                            b.extra = A & 15;
                            b.mode = 24;
                        case 24:
                            if (b.extra) {
                                for (A = b.extra; n < A;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                b.offset += m & (1 << b.extra) - 1;
                                m >>>= b.extra;
                                n -= b.extra;
                                b.back += b.extra
                            }
                            if (b.offset > b.dmax) {
                                a.msg = "invalid distance too far back";
                                b.mode = 30;
                                break
                            }
                            b.mode = 25;
                        case 25:
                            if (0 === v) break a;
                            q = J - v;
                            if (b.offset > q) {
                                q = b.offset - q;
                                if (q > b.whave && b.sane) {
                                    a.msg = "invalid distance too far back";
                                    b.mode = 30;
                                    break
                                }
                                q > b.wnext ? (q -= b.wnext, A = b.wsize - q) : A = b.wnext - q;
                                q > b.length && (q = b.length);
                                N = b.window
                            } else N = h, A = l - b.offset, q = b.length;
                            q > v && (q = v);
                            v -= q;
                            b.length -= q;
                            do h[l++] = N[A++]; while (--q);
                            0 === b.length && (b.mode = 21);
                            break;
                        case 26:
                            if (0 === v) break a;
                            h[l++] = b.length;
                            v--;
                            b.mode = 21;
                            break;
                        case 27:
                            if (b.wrap) {
                                for (; 32 > n;) {
                                    if (0 === k) break a;
                                    k--;
                                    m |= g[f++] << n;
                                    n += 8
                                }
                                J -= v;
                                a.total_out += J;
                                b.total += J;
                                J && (a.adler = b.check = b.flags ? u(b.check,
                                    h, J, l - J) : r(b.check, h, J, l - J));
                                J = v;
                                if ((b.flags ? m : e(m)) !== b.check) {
                                    a.msg = "incorrect data check";
                                    b.mode = 30;
                                    break
                                }
                                n = m = 0
                            }
                            b.mode = 28;
                        case 28:
                            if (b.wrap && b.flags) {
                                for (; 32 > n;) {
                                    if (0 === k) break a;
                                    k--;
                                    m += g[f++] << n;
                                    n += 8
                                }
                                if (m !== (b.total & 4294967295)) {
                                    a.msg = "incorrect length check";
                                    b.mode = 30;
                                    break
                                }
                                n = m = 0
                            }
                            b.mode = 29;
                        case 29:
                            P = 1;
                            break a;
                        case 30:
                            P = -3;
                            break a;
                        case 31:
                            return -4;
                        default:
                            return -2
                    }
                    a.next_out = l;
                    a.avail_out = v;
                    a.next_in = f;
                    a.avail_in = k;
                    b.hold = m;
                    b.bits = n;
                    if (b.wsize || J !== a.avail_out && 30 > b.mode && (27 > b.mode || 4 !== d)) g =
                        a.output, f = a.next_out, l = J - a.avail_out, v = a.state, null === v.window && (v.wsize = 1 << v.wbits, v.wnext = 0, v.whave = 0, v.window = new p.Buf8(v.wsize)), l >= v.wsize ? (p.arraySet(v.window, g, f - v.wsize, v.wsize, 0), v.wnext = 0, v.whave = v.wsize) : (k = v.wsize - v.wnext, k > l && (k = l), p.arraySet(v.window, g, f - l, k, v.wnext), (l -= k) ? (p.arraySet(v.window, g, f - l, l, 0), v.wnext = l, v.whave = v.wsize) : (v.wnext += k, v.wnext === v.wsize && (v.wnext = 0), v.whave < v.wsize && (v.whave += k)));
                    H -= a.avail_in;
                    J -= a.avail_out;
                    a.total_in += H;
                    a.total_out += J;
                    b.total += J;
                    b.wrap &&
                        J && (a.adler = b.check = b.flags ? u(b.check, h, J, a.next_out - J) : r(b.check, h, J, a.next_out - J));
                    a.data_type = b.bits + (b.last ? 64 : 0) + (12 === b.mode ? 128 : 0) + (20 === b.mode || 15 === b.mode ? 256 : 0);
                    (0 === H && 0 === J || 4 === d) && 0 === P && (P = -5);
                    return P
                };
                b.inflateEnd = function(a) {
                    if (!a || !a.state) return -2;
                    var d = a.state;
                    d.window && (d.window = null);
                    a.state = null;
                    return 0
                };
                b.inflateGetHeader = function(a, d) {
                    var b;
                    if (!a || !a.state) return -2;
                    b = a.state;
                    if (0 === (b.wrap & 2)) return -2;
                    b.head = d;
                    d.done = !1;
                    return 0
                };
                b.inflateInfo = "pako inflate (from Nodeca project)"
            },
            {
                "../utils/common": 2,
                "./adler32": 4,
                "./crc32": 6,
                "./inffast": 8,
                "./inftrees": 10
            }
        ],
        10: [function(a, d, b) {
            var e = a("../utils/common"),
                g = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                h = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                l = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25,
                    25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
                ];
            d.exports = function(a, d, b, u, z, y, x, D) {
                for (var B = D.bits, w = 0, L = 0, C = 0, I = 0, M = 0, F = 0, t = 0, E = 0, v = 0, m = 0, n, H, J = null, q = 0, A, N = new e.Buf16(16), F = new e.Buf16(16), K = null, Q = 0, R, P, O, w = 0; 15 >= w; w++) N[w] = 0;
                for (L = 0; L < u; L++) N[d[b + L]]++;
                M = B;
                for (I = 15; 1 <= I && 0 === N[I]; I--);
                M > I && (M = I);
                if (0 === I) return z[y++] = 20971520, z[y++] = 20971520, D.bits = 1, 0;
                for (C = 1; C < I && 0 === N[C]; C++);
                M < C && (M = C);
                for (w = E = 1; 15 >= w; w++)
                    if (E <<= 1, E -= N[w], 0 > E) return -1;
                if (0 < E && (0 === a || 1 !== I)) return -1;
                F[1] = 0;
                for (w = 1; 15 > w; w++) F[w + 1] = F[w] +
                    N[w];
                for (L = 0; L < u; L++) 0 !== d[b + L] && (x[F[d[b + L]]++] = L);
                switch (a) {
                    case 0:
                        J = K = x;
                        A = 19;
                        break;
                    case 1:
                        J = g;
                        q -= 257;
                        K = h;
                        Q -= 257;
                        A = 256;
                        break;
                    default:
                        J = f, K = l, A = -1
                }
                L = m = 0;
                w = C;
                B = y;
                F = M;
                t = 0;
                H = -1;
                v = 1 << M;
                u = v - 1;
                if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                for (var S = 0;;) {
                    S++;
                    R = w - t;
                    x[L] < A ? (P = 0, O = x[L]) : x[L] > A ? (P = K[Q + x[L]], O = J[q + x[L]]) : (P = 96, O = 0);
                    E = 1 << w - t;
                    C = n = 1 << F;
                    do n -= E, z[B + (m >> t) + n] = R << 24 | P << 16 | O | 0; while (0 !== n);
                    for (E = 1 << w - 1; m & E;) E >>= 1;
                    0 !== E ? (m &= E - 1, m += E) : m = 0;
                    L++;
                    if (0 === --N[w]) {
                        if (w === I) break;
                        w = d[b + x[L]]
                    }
                    if (w > M && (m & u) !== H) {
                        0 ===
                            t && (t = M);
                        B += C;
                        F = w - t;
                        for (E = 1 << F; F + t < I;) {
                            E -= N[F + t];
                            if (0 >= E) break;
                            F++;
                            E <<= 1
                        }
                        v += 1 << F;
                        if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                        H = m & u;
                        z[H] = M << 24 | F << 16 | B - y | 0
                    }
                }
                0 !== m && (z[B + m] = w - t << 24 | 4194304);
                D.bits = M;
                return 0
            }
        }, {
            "../utils/common": 2
        }],
        11: [function(a, d, b) {
            d.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        12: [function(a, d, b) {
            d.exports = function() {
                this.input = null;
                this.total_in =
                    this.avail_in = this.next_in = 0;
                this.output = null;
                this.total_out = this.avail_out = this.next_out = 0;
                this.msg = "";
                this.state = null;
                this.data_type = 2;
                this.adler = 0
            }
        }, {}]
    }, {}, [1])(1)
});
(function(c) {
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = c() : "function" === typeof define && define.amd ? define([], c) : ("undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this).nifti = c()
})(function() {
    return function a(d, b, e) {
        function g(f, k) {
            if (!b[f]) {
                if (!d[f]) {
                    var p = "function" == typeof require && require;
                    if (!k && p) return p(f, !0);
                    if (h) return h(f, !0);
                    p = Error("Cannot find module '" + f + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                p = b[f] = {
                    exports: {}
                };
                d[f][0].call(p.exports, function(a) {
                    var b = d[f][1][a];
                    return g(b ? b : a)
                }, p, p.exports, a, d, b, e)
            }
            return b[f].exports
        }
        for (var h = "function" == typeof require && require, f = 0; f < e.length; f++) g(e[f]);
        return g
    }({
        1: [function(a, d, b) {
            b = a("./lib/utils/common").assign;
            var e = a("./lib/deflate"),
                g = a("./lib/inflate");
            a = a("./lib/zlib/constants");
            var h = {};
            b(h, e, g, a);
            d.exports = h
        }, {
            "./lib/deflate": 2,
            "./lib/inflate": 3,
            "./lib/utils/common": 4,
            "./lib/zlib/constants": 7
        }],
        2: [function(a, d, b) {
            function e(a, d) {
                var b = new r(d);
                b.push(a, !0);
                if (b.err) throw b.msg;
                return b.result
            }
            var g = a("./zlib/deflate.js"),
                h = a("./utils/common"),
                f = a("./utils/strings"),
                l = a("./zlib/messages"),
                k = a("./zlib/zstream"),
                p = Object.prototype.toString,
                r = function(a) {
                    a = this.options = h.assign({
                        level: -1,
                        method: 8,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: 0,
                        to: ""
                    }, a || {});
                    a.raw && 0 < a.windowBits ? a.windowBits = -a.windowBits : a.gzip && 0 < a.windowBits && 16 > a.windowBits && (a.windowBits += 16);
                    this.err = 0;
                    this.msg = "";
                    this.ended = !1;
                    this.chunks = [];
                    this.strm = new k;
                    this.strm.avail_out =
                        0;
                    var d = g.deflateInit2(this.strm, a.level, a.method, a.windowBits, a.memLevel, a.strategy);
                    if (0 !== d) throw Error(l[d]);
                    a.header && g.deflateSetHeader(this.strm, a.header)
                };
            r.prototype.push = function(a, d) {
                var b = this.strm,
                    e = this.options.chunkSize,
                    l, k;
                if (this.ended) return !1;
                k = d === ~~d ? d : !0 === d ? 4 : 0;
                "string" === typeof a ? b.input = f.string2buf(a) : "[object ArrayBuffer]" === p.call(a) ? b.input = new Uint8Array(a) : b.input = a;
                b.next_in = 0;
                b.avail_in = b.input.length;
                do {
                    0 === b.avail_out && (b.output = new h.Buf8(e), b.next_out = 0, b.avail_out =
                        e);
                    l = g.deflate(b, k);
                    if (1 !== l && 0 !== l) return this.onEnd(l), this.ended = !0, !1;
                    if (0 === b.avail_out || 0 === b.avail_in && (4 === k || 2 === k))
                        if ("string" === this.options.to) this.onData(f.buf2binstring(h.shrinkBuf(b.output, b.next_out)));
                        else this.onData(h.shrinkBuf(b.output, b.next_out))
                } while ((0 < b.avail_in || 0 === b.avail_out) && 1 !== l);
                if (4 === k) return l = g.deflateEnd(this.strm), this.onEnd(l), this.ended = !0, 0 === l;
                2 === k && (this.onEnd(0), b.avail_out = 0);
                return !0
            };
            r.prototype.onData = function(a) {
                this.chunks.push(a)
            };
            r.prototype.onEnd =
                function(a) {
                    0 === a && (this.result = "string" === this.options.to ? this.chunks.join("") : h.flattenChunks(this.chunks));
                    this.chunks = [];
                    this.err = a;
                    this.msg = this.strm.msg
                };
            b.Deflate = r;
            b.deflate = e;
            b.deflateRaw = function(a, d) {
                d = d || {};
                d.raw = !0;
                return e(a, d)
            };
            b.gzip = function(a, d) {
                d = d || {};
                d.gzip = !0;
                return e(a, d)
            }
        }, {
            "./utils/common": 4,
            "./utils/strings": 5,
            "./zlib/deflate.js": 9,
            "./zlib/messages": 14,
            "./zlib/zstream": 16
        }],
        3: [function(a, d, b) {
            function e(a, d) {
                var b = new z(d);
                b.push(a, !0);
                if (b.err) throw b.msg;
                return b.result
            }
            var g = a("./zlib/inflate.js"),
                h = a("./utils/common"),
                f = a("./utils/strings"),
                l = a("./zlib/constants"),
                k = a("./zlib/messages"),
                p = a("./zlib/zstream"),
                r = a("./zlib/gzheader"),
                u = Object.prototype.toString,
                z = function(a) {
                    var d = this.options = h.assign({
                        chunkSize: 16384,
                        windowBits: 0,
                        to: ""
                    }, a || {});
                    d.raw && 0 <= d.windowBits && 16 > d.windowBits && (d.windowBits = -d.windowBits, 0 === d.windowBits && (d.windowBits = -15));
                    !(0 <= d.windowBits && 16 > d.windowBits) || a && a.windowBits || (d.windowBits += 32);
                    15 < d.windowBits && 48 > d.windowBits && 0 === (d.windowBits &
                        15) && (d.windowBits |= 15);
                    this.err = 0;
                    this.msg = "";
                    this.ended = !1;
                    this.chunks = [];
                    this.strm = new p;
                    this.strm.avail_out = 0;
                    a = g.inflateInit2(this.strm, d.windowBits);
                    if (a !== l.Z_OK) throw Error(k[a]);
                    this.header = new r;
                    g.inflateGetHeader(this.strm, this.header)
                };
            z.prototype.push = function(a, d) {
                var b = this.strm,
                    e = this.options.chunkSize,
                    k, p, C, r, z, F = !1;
                if (this.ended) return !1;
                p = d === ~~d ? d : !0 === d ? l.Z_FINISH : l.Z_NO_FLUSH;
                "string" === typeof a ? b.input = f.binstring2buf(a) : "[object ArrayBuffer]" === u.call(a) ? b.input = new Uint8Array(a) :
                    b.input = a;
                b.next_in = 0;
                b.avail_in = b.input.length;
                do {
                    0 === b.avail_out && (b.output = new h.Buf8(e), b.next_out = 0, b.avail_out = e);
                    k = g.inflate(b, l.Z_NO_FLUSH);
                    k === l.Z_BUF_ERROR && !0 === F && (k = l.Z_OK, F = !1);
                    if (k !== l.Z_STREAM_END && k !== l.Z_OK) return this.onEnd(k), this.ended = !0, !1;
                    if (b.next_out && (0 === b.avail_out || k === l.Z_STREAM_END || 0 === b.avail_in && (p === l.Z_FINISH || p === l.Z_SYNC_FLUSH)))
                        if ("string" === this.options.to) C = f.utf8border(b.output, b.next_out), r = b.next_out - C, z = f.buf2string(b.output, C), b.next_out = r, b.avail_out =
                            e - r, r && h.arraySet(b.output, b.output, C, r, 0), this.onData(z);
                        else this.onData(h.shrinkBuf(b.output, b.next_out));
                    0 === b.avail_in && 0 === b.avail_out && (F = !0)
                } while ((0 < b.avail_in || 0 === b.avail_out) && k !== l.Z_STREAM_END);
                k === l.Z_STREAM_END && (p = l.Z_FINISH);
                if (p === l.Z_FINISH) return k = g.inflateEnd(this.strm), this.onEnd(k), this.ended = !0, k === l.Z_OK;
                p === l.Z_SYNC_FLUSH && (this.onEnd(l.Z_OK), b.avail_out = 0);
                return !0
            };
            z.prototype.onData = function(a) {
                this.chunks.push(a)
            };
            z.prototype.onEnd = function(a) {
                a === l.Z_OK && (this.result =
                    "string" === this.options.to ? this.chunks.join("") : h.flattenChunks(this.chunks));
                this.chunks = [];
                this.err = a;
                this.msg = this.strm.msg
            };
            b.Inflate = z;
            b.inflate = e;
            b.inflateRaw = function(a, d) {
                d = d || {};
                d.raw = !0;
                return e(a, d)
            };
            b.ungzip = e
        }, {
            "./utils/common": 4,
            "./utils/strings": 5,
            "./zlib/constants": 7,
            "./zlib/gzheader": 10,
            "./zlib/inflate.js": 12,
            "./zlib/messages": 14,
            "./zlib/zstream": 16
        }],
        4: [function(a, d, b) {
            a = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
            b.assign = function(a) {
                for (var d =
                        Array.prototype.slice.call(arguments, 1); d.length;) {
                    var b = d.shift();
                    if (b) {
                        if ("object" !== typeof b) throw new TypeError(b + "must be non-object");
                        for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e])
                    }
                }
                return a
            };
            b.shrinkBuf = function(a, d) {
                if (a.length === d) return a;
                if (a.subarray) return a.subarray(0, d);
                a.length = d;
                return a
            };
            var e = {
                    arraySet: function(a, d, b, e, g) {
                        if (d.subarray && a.subarray) a.set(d.subarray(b, b + e), g);
                        else
                            for (var r = 0; r < e; r++) a[g + r] = d[b + r]
                    },
                    flattenChunks: function(a) {
                        var d, b, e, g, r;
                        d = e = 0;
                        for (b = a.length; d < b; d++) e +=
                            a[d].length;
                        r = new Uint8Array(e);
                        d = e = 0;
                        for (b = a.length; d < b; d++) g = a[d], r.set(g, e), e += g.length;
                        return r
                    }
                },
                g = {
                    arraySet: function(a, d, b, e, g) {
                        for (var r = 0; r < e; r++) a[g + r] = d[b + r]
                    },
                    flattenChunks: function(a) {
                        return [].concat.apply([], a)
                    }
                };
            b.setTyped = function(a) {
                a ? (b.Buf8 = Uint8Array, b.Buf16 = Uint16Array, b.Buf32 = Int32Array, b.assign(b, e)) : (b.Buf8 = Array, b.Buf16 = Array, b.Buf32 = Array, b.assign(b, g))
            };
            b.setTyped(a)
        }, {}],
        5: [function(a, d, b) {
            function e(a, d) {
                if (65537 > d && (a.subarray && f || !a.subarray && h)) return String.fromCharCode.apply(null,
                    g.shrinkBuf(a, d));
                for (var b = "", e = 0; e < d; e++) b += String.fromCharCode(a[e]);
                return b
            }
            var g = a("./common"),
                h = !0,
                f = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (l) {
                h = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (k) {
                f = !1
            }
            var p = new g.Buf8(256);
            for (a = 0; 256 > a; a++) p[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
            p[254] = p[254] = 1;
            b.string2buf = function(a) {
                var d, b, e, h, f, l = a.length,
                    k = 0;
                for (h = 0; h < l; h++) b = a.charCodeAt(h), 55296 === (b & 64512) && h + 1 < l && (e = a.charCodeAt(h + 1), 56320 === (e & 64512) && (b = 65536 +
                    (b - 55296 << 10) + (e - 56320), h++)), k += 128 > b ? 1 : 2048 > b ? 2 : 65536 > b ? 3 : 4;
                d = new g.Buf8(k);
                for (h = f = 0; f < k; h++) b = a.charCodeAt(h), 55296 === (b & 64512) && h + 1 < l && (e = a.charCodeAt(h + 1), 56320 === (e & 64512) && (b = 65536 + (b - 55296 << 10) + (e - 56320), h++)), 128 > b ? d[f++] = b : (2048 > b ? d[f++] = 192 | b >>> 6 : (65536 > b ? d[f++] = 224 | b >>> 12 : (d[f++] = 240 | b >>> 18, d[f++] = 128 | b >>> 12 & 63), d[f++] = 128 | b >>> 6 & 63), d[f++] = 128 | b & 63);
                return d
            };
            b.buf2binstring = function(a) {
                return e(a, a.length)
            };
            b.binstring2buf = function(a) {
                for (var d = new g.Buf8(a.length), b = 0, e = d.length; b <
                    e; b++) d[b] = a.charCodeAt(b);
                return d
            };
            b.buf2string = function(a, d) {
                var b, g, h, f, l = d || a.length,
                    k = Array(2 * l);
                for (b = g = 0; b < l;)
                    if (h = a[b++], 128 > h) k[g++] = h;
                    else if (f = p[h], 4 < f) k[g++] = 65533, b += f - 1;
                else {
                    for (h &= 2 === f ? 31 : 3 === f ? 15 : 7; 1 < f && b < l;) h = h << 6 | a[b++] & 63, f--;
                    1 < f ? k[g++] = 65533 : 65536 > h ? k[g++] = h : (h -= 65536, k[g++] = 55296 | h >> 10 & 1023, k[g++] = 56320 | h & 1023)
                }
                return e(k, g)
            };
            b.utf8border = function(a, d) {
                var b;
                d = d || a.length;
                d > a.length && (d = a.length);
                for (b = d - 1; 0 <= b && 128 === (a[b] & 192);) b--;
                return 0 > b || 0 === b ? d : b + p[a[b]] > d ? b : d
            }
        }, {
            "./common": 4
        }],
        6: [function(a, d, b) {
            d.exports = function(a, d, b, f) {
                var l = a & 65535 | 0;
                a = a >>> 16 & 65535 | 0;
                for (var k = 0; 0 !== b;) {
                    k = 2E3 < b ? 2E3 : b;
                    b -= k;
                    do l = l + d[f++] | 0, a = a + l | 0; while (--k);
                    l %= 65521;
                    a %= 65521
                }
                return l | a << 16 | 0
            }
        }, {}],
        7: [function(a, d, b) {
            d.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, {}],
        8: [function(a, d, b) {
            var e = function() {
                for (var a, d = [], b = 0; 256 > b; b++) {
                    a = b;
                    for (var e = 0; 8 > e; e++) a = a & 1 ? 3988292384 ^ a >>> 1 : a >>> 1;
                    d[b] = a
                }
                return d
            }();
            d.exports = function(a, d, b, l) {
                b = l + b;
                for (a ^= -1; l < b; l++) a = a >>> 8 ^ e[(a ^ d[l]) & 255];
                return a ^ -1
            }
        }, {}],
        9: [function(a, d, b) {
            function e(a, d) {
                a.msg = t[d];
                return d
            }

            function g(a) {
                for (var d = a.length; 0 <= --d;) a[d] = 0
            }

            function h(a) {
                var d = a.state,
                    b = d.pending;
                b > a.avail_out && (b = a.avail_out);
                0 !== b && (C.arraySet(a.output, d.pending_buf, d.pending_out, b, a.next_out), a.next_out += b, d.pending_out += b, a.total_out += b, a.avail_out -= b, d.pending -= b, 0 === d.pending && (d.pending_out = 0))
            }

            function f(a, d) {
                I._tr_flush_block(a, 0 <= a.block_start ? a.block_start : -1, a.strstart - a.block_start, d);
                a.block_start = a.strstart;
                h(a.strm)
            }

            function l(a, d) {
                a.pending_buf[a.pending++] = d
            }

            function k(a, d) {
                a.pending_buf[a.pending++] = d >>> 8 & 255;
                a.pending_buf[a.pending++] = d & 255
            }

            function p(a, d) {
                var b = a.max_chain_length,
                    e = a.strstart,
                    g, h = a.prev_length,
                    f = a.nice_match,
                    C = a.strstart > a.w_size - 262 ? a.strstart - (a.w_size - 262) : 0,
                    l = a.window,
                    k = a.w_mask,
                    p = a.prev,
                    P = a.strstart + 258,
                    w = l[e + h - 1],
                    r = l[e + h];
                a.prev_length >= a.good_match && (b >>= 2);
                f > a.lookahead && (f = a.lookahead);
                do
                    if (g = d, l[g + h] === r && l[g + h - 1] === w && l[g] === l[e] && l[++g] === l[e + 1]) {
                        e += 2;
                        for (g++; l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && l[++e] === l[++g] && e < P;);
                        g = 258 - (P - e);
                        e = P - 258;
                        if (g > h) {
                            a.match_start = d;
                            h = g;
                            if (g >= f) break;
                            w = l[e + h - 1];
                            r =
                                l[e + h]
                        }
                    } while ((d = p[d & k]) > C && 0 !== --b);
                return h <= a.lookahead ? h : a.lookahead
            }

            function r(a) {
                var d = a.w_size,
                    b, e, g, h;
                do {
                    h = a.window_size - a.lookahead - a.strstart;
                    if (a.strstart >= d + (d - 262)) {
                        C.arraySet(a.window, a.window, d, d, 0);
                        a.match_start -= d;
                        a.strstart -= d;
                        a.block_start -= d;
                        b = e = a.hash_size;
                        do g = a.head[--b], a.head[b] = g >= d ? g - d : 0; while (--e);
                        b = e = d;
                        do g = a.prev[--b], a.prev[b] = g >= d ? g - d : 0; while (--e);
                        h += d
                    }
                    if (0 === a.strm.avail_in) break;
                    b = a.strm;
                    e = a.window;
                    g = a.strstart + a.lookahead;
                    var f = b.avail_in;
                    f > h && (f = h);
                    0 === f ? e = 0 : (b.avail_in -=
                        f, C.arraySet(e, b.input, b.next_in, f, g), 1 === b.state.wrap ? b.adler = M(b.adler, e, f, g) : 2 === b.state.wrap && (b.adler = F(b.adler, e, f, g)), b.next_in += f, b.total_in += f, e = f);
                    a.lookahead += e;
                    if (3 <= a.lookahead + a.insert)
                        for (h = a.strstart - a.insert, a.ins_h = a.window[h], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[h + 1]) & a.hash_mask; a.insert && !(a.ins_h = (a.ins_h << a.hash_shift ^ a.window[h + 3 - 1]) & a.hash_mask, a.prev[h & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = h, h++, a.insert--, 3 > a.lookahead + a.insert););
                } while (262 > a.lookahead && 0 !== a.strm.avail_in)
            }

            function u(a, d) {
                for (var b;;) {
                    if (262 > a.lookahead) {
                        r(a);
                        if (262 > a.lookahead && 0 === d) return 1;
                        if (0 === a.lookahead) break
                    }
                    b = 0;
                    3 <= a.lookahead && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, b = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart);
                    0 !== b && a.strstart - b <= a.w_size - 262 && (a.match_length = p(a, b));
                    if (3 <= a.match_length)
                        if (b = I._tr_tally(a, a.strstart - a.match_start, a.match_length - 3), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && 3 <= a.lookahead) {
                            a.match_length--;
                            do a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart; while (0 !== --a.match_length);
                            a.strstart++
                        } else a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask;
                    else b = I._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++;
                    if (b && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 2 > a.strstart ? a.strstart : 2;
                return 4 ===
                    d ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function z(a, d) {
                for (var b, e;;) {
                    if (262 > a.lookahead) {
                        r(a);
                        if (262 > a.lookahead && 0 === d) return 1;
                        if (0 === a.lookahead) break
                    }
                    b = 0;
                    3 <= a.lookahead && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, b = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart);
                    a.prev_length = a.match_length;
                    a.prev_match = a.match_start;
                    a.match_length = 2;
                    0 !== b && a.prev_length < a.max_lazy_match && a.strstart - b <= a.w_size - 262 &&
                        (a.match_length = p(a, b), 5 >= a.match_length && (1 === a.strategy || 3 === a.match_length && 4096 < a.strstart - a.match_start) && (a.match_length = 2));
                    if (3 <= a.prev_length && a.match_length <= a.prev_length) {
                        e = a.strstart + a.lookahead - 3;
                        b = I._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - 3);
                        a.lookahead -= a.prev_length - 1;
                        a.prev_length -= 2;
                        do ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart); while (0 !== --a.prev_length);
                        a.match_available = 0;
                        a.match_length = 2;
                        a.strstart++;
                        if (b && (f(a, !1), 0 === a.strm.avail_out)) return 1
                    } else if (a.match_available) {
                        if ((b = I._tr_tally(a, 0, a.window[a.strstart - 1])) && f(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out) return 1
                    } else a.match_available = 1, a.strstart++, a.lookahead--
                }
                a.match_available && (I._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0);
                a.insert = 2 > a.strstart ? a.strstart : 2;
                return 4 === d ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function y(a,
                d) {
                for (var b, e, g, h = a.window;;) {
                    if (258 >= a.lookahead) {
                        r(a);
                        if (258 >= a.lookahead && 0 === d) return 1;
                        if (0 === a.lookahead) break
                    }
                    a.match_length = 0;
                    if (3 <= a.lookahead && 0 < a.strstart && (e = a.strstart - 1, b = h[e], b === h[++e] && b === h[++e] && b === h[++e])) {
                        for (g = a.strstart + 258; b === h[++e] && b === h[++e] && b === h[++e] && b === h[++e] && b === h[++e] && b === h[++e] && b === h[++e] && b === h[++e] && e < g;);
                        a.match_length = 258 - (g - e);
                        a.match_length > a.lookahead && (a.match_length = a.lookahead)
                    }
                    3 <= a.match_length ? (b = I._tr_tally(a, 1, a.match_length - 3), a.lookahead -=
                        a.match_length, a.strstart += a.match_length, a.match_length = 0) : (b = I._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++);
                    if (b && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 0;
                return 4 === d ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function x(a, d) {
                for (var b;;) {
                    if (0 === a.lookahead && (r(a), 0 === a.lookahead)) {
                        if (0 === d) return 1;
                        break
                    }
                    a.match_length = 0;
                    b = I._tr_tally(a, 0, a.window[a.strstart]);
                    a.lookahead--;
                    a.strstart++;
                    if (b && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert =
                    0;
                return 4 === d ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function D() {
                this.strm = null;
                this.status = 0;
                this.pending_buf = null;
                this.wrap = this.pending = this.pending_out = this.pending_buf_size = 0;
                this.gzhead = null;
                this.gzindex = 0;
                this.method = 8;
                this.last_flush = -1;
                this.w_mask = this.w_bits = this.w_size = 0;
                this.window = null;
                this.window_size = 0;
                this.head = this.prev = null;
                this.nice_match = this.good_match = this.strategy = this.level = this.max_lazy_match = this.max_chain_length = this.prev_length =
                    this.lookahead = this.match_start = this.strstart = this.match_available = this.prev_match = this.match_length = this.block_start = this.hash_shift = this.hash_mask = this.hash_bits = this.hash_size = this.ins_h = 0;
                this.dyn_ltree = new C.Buf16(1146);
                this.dyn_dtree = new C.Buf16(122);
                this.bl_tree = new C.Buf16(78);
                g(this.dyn_ltree);
                g(this.dyn_dtree);
                g(this.bl_tree);
                this.bl_desc = this.d_desc = this.l_desc = null;
                this.bl_count = new C.Buf16(16);
                this.heap = new C.Buf16(573);
                g(this.heap);
                this.heap_max = this.heap_len = 0;
                this.depth = new C.Buf16(573);
                g(this.depth);
                this.bi_valid = this.bi_buf = this.insert = this.matches = this.static_len = this.opt_len = this.d_buf = this.last_lit = this.lit_bufsize = this.l_buf = 0
            }

            function B(a) {
                var d;
                if (!a || !a.state) return e(a, -2);
                a.total_in = a.total_out = 0;
                a.data_type = 2;
                d = a.state;
                d.pending = 0;
                d.pending_out = 0;
                0 > d.wrap && (d.wrap = -d.wrap);
                d.status = d.wrap ? 42 : 113;
                a.adler = 2 === d.wrap ? 0 : 1;
                d.last_flush = 0;
                I._tr_init(d);
                return 0
            }

            function w(a) {
                var d = B(a);
                0 === d && (a = a.state, a.window_size = 2 * a.w_size, g(a.head), a.max_lazy_match = E[a.level].max_lazy,
                    a.good_match = E[a.level].good_length, a.nice_match = E[a.level].nice_length, a.max_chain_length = E[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = 2, a.match_available = 0, a.ins_h = 0);
                return d
            }

            function L(a, d, b, g, h, f) {
                if (!a) return -2;
                var l = 1; - 1 === d && (d = 6);
                0 > g ? (l = 0, g = -g) : 15 < g && (l = 2, g -= 16);
                if (1 > h || 9 < h || 8 !== b || 8 > g || 15 < g || 0 > d || 9 < d || 0 > f || 4 < f) return e(a, -2);
                8 === g && (g = 9);
                var k = new D;
                a.state = k;
                k.strm = a;
                k.wrap = l;
                k.gzhead = null;
                k.w_bits = g;
                k.w_size = 1 << k.w_bits;
                k.w_mask =
                    k.w_size - 1;
                k.hash_bits = h + 7;
                k.hash_size = 1 << k.hash_bits;
                k.hash_mask = k.hash_size - 1;
                k.hash_shift = ~~((k.hash_bits + 3 - 1) / 3);
                k.window = new C.Buf8(2 * k.w_size);
                k.head = new C.Buf16(k.hash_size);
                k.prev = new C.Buf16(k.w_size);
                k.lit_bufsize = 1 << h + 6;
                k.pending_buf_size = 4 * k.lit_bufsize;
                k.pending_buf = new C.Buf8(k.pending_buf_size);
                k.d_buf = k.lit_bufsize >> 1;
                k.l_buf = 3 * k.lit_bufsize;
                k.level = d;
                k.strategy = f;
                k.method = b;
                return w(a)
            }
            var C = a("../utils/common"),
                I = a("./trees"),
                M = a("./adler32"),
                F = a("./crc32"),
                t = a("./messages");
            a = function(a,
                d, b, e, g) {
                this.good_length = a;
                this.max_lazy = d;
                this.nice_length = b;
                this.max_chain = e;
                this.func = g
            };
            var E;
            E = [new a(0, 0, 0, 0, function(a, d) {
                var b = 65535;
                for (b > a.pending_buf_size - 5 && (b = a.pending_buf_size - 5);;) {
                    if (1 >= a.lookahead) {
                        r(a);
                        if (0 === a.lookahead && 0 === d) return 1;
                        if (0 === a.lookahead) break
                    }
                    a.strstart += a.lookahead;
                    a.lookahead = 0;
                    var e = a.block_start + b;
                    if (0 === a.strstart || a.strstart >= e)
                        if (a.lookahead = a.strstart - e, a.strstart = e, f(a, !1), 0 === a.strm.avail_out) return 1;
                    if (a.strstart - a.block_start >= a.w_size - 262 && (f(a,
                            !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 0;
                if (4 === d) return f(a, !0), 0 === a.strm.avail_out ? 3 : 4;
                a.strstart > a.block_start && f(a, !1);
                return 1
            }), new a(4, 4, 8, 4, u), new a(4, 5, 16, 8, u), new a(4, 6, 32, 32, u), new a(4, 4, 16, 16, z), new a(8, 16, 32, 32, z), new a(8, 16, 128, 128, z), new a(8, 32, 128, 256, z), new a(32, 128, 258, 1024, z), new a(32, 258, 258, 4096, z)];
            b.deflateInit = function(a, d) {
                return L(a, d, 8, 15, 8, 0)
            };
            b.deflateInit2 = L;
            b.deflateReset = w;
            b.deflateResetKeep = B;
            b.deflateSetHeader = function(a, d) {
                if (!a || !a.state || 2 !== a.state.wrap) return -2;
                a.state.gzhead = d;
                return 0
            };
            b.deflate = function(a, d) {
                var b, f, C, q;
                if (!a || !a.state || 5 < d || 0 > d) return a ? e(a, -2) : -2;
                f = a.state;
                if (!a.output || !a.input && 0 !== a.avail_in || 666 === f.status && 4 !== d) return e(a, 0 === a.avail_out ? -5 : -2);
                f.strm = a;
                b = f.last_flush;
                f.last_flush = d;
                42 === f.status && (2 === f.wrap ? (a.adler = 0, l(f, 31), l(f, 139), l(f, 8), f.gzhead ? (l(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ? 16 : 0)), l(f, f.gzhead.time & 255), l(f, f.gzhead.time >> 8 & 255), l(f, f.gzhead.time >>
                    16 & 255), l(f, f.gzhead.time >> 24 & 255), l(f, 9 === f.level ? 2 : 2 <= f.strategy || 2 > f.level ? 4 : 0), l(f, f.gzhead.os & 255), f.gzhead.extra && f.gzhead.extra.length && (l(f, f.gzhead.extra.length & 255), l(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (a.adler = F(a.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = 69) : (l(f, 0), l(f, 0), l(f, 0), l(f, 0), l(f, 0), l(f, 9 === f.level ? 2 : 2 <= f.strategy || 2 > f.level ? 4 : 0), l(f, 3), f.status = 113)) : (C = 8 + (f.w_bits - 8 << 4) << 8, q = -1, q = 2 <= f.strategy || 2 > f.level ? 0 : 6 > f.level ? 1 : 6 === f.level ? 2 : 3, C |= q << 6, 0 !==
                    f.strstart && (C |= 32), f.status = 113, k(f, C + (31 - C % 31)), 0 !== f.strstart && (k(f, a.adler >>> 16), k(f, a.adler & 65535)), a.adler = 1));
                if (69 === f.status)
                    if (f.gzhead.extra) {
                        for (C = f.pending; f.gzindex < (f.gzhead.extra.length & 65535) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending !== f.pending_buf_size));) l(f, f.gzhead.extra[f.gzindex] & 255), f.gzindex++;
                        f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C));
                        f.gzindex ===
                            f.gzhead.extra.length && (f.gzindex = 0, f.status = 73)
                    } else f.status = 73;
                if (73 === f.status)
                    if (f.gzhead.name) {
                        C = f.pending;
                        do {
                            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending === f.pending_buf_size)) {
                                q = 1;
                                break
                            }
                            q = f.gzindex < f.gzhead.name.length ? f.gzhead.name.charCodeAt(f.gzindex++) & 255 : 0;
                            l(f, q)
                        } while (0 !== q);
                        f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C));
                        0 === q && (f.gzindex = 0, f.status = 91)
                    } else f.status =
                        91;
                if (91 === f.status)
                    if (f.gzhead.comment) {
                        C = f.pending;
                        do {
                            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending === f.pending_buf_size)) {
                                q = 1;
                                break
                            }
                            q = f.gzindex < f.gzhead.comment.length ? f.gzhead.comment.charCodeAt(f.gzindex++) & 255 : 0;
                            l(f, q)
                        } while (0 !== q);
                        f.gzhead.hcrc && f.pending > C && (a.adler = F(a.adler, f.pending_buf, f.pending - C, C));
                        0 === q && (f.status = 103)
                    } else f.status = 103;
                103 === f.status && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size &&
                    h(a), f.pending + 2 <= f.pending_buf_size && (l(f, a.adler & 255), l(f, a.adler >> 8 & 255), a.adler = 0, f.status = 113)) : f.status = 113);
                if (0 !== f.pending) {
                    if (h(a), 0 === a.avail_out) return f.last_flush = -1, 0
                } else if (0 === a.avail_in && (d << 1) - (4 < d ? 9 : 0) <= (b << 1) - (4 < b ? 9 : 0) && 4 !== d) return e(a, -5);
                if (666 === f.status && 0 !== a.avail_in) return e(a, -5);
                if (0 !== a.avail_in || 0 !== f.lookahead || 0 !== d && 666 !== f.status) {
                    b = 2 === f.strategy ? x(f, d) : 3 === f.strategy ? y(f, d) : E[f.level].func(f, d);
                    if (3 === b || 4 === b) f.status = 666;
                    if (1 === b || 3 === b) return 0 === a.avail_out &&
                        (f.last_flush = -1), 0;
                    if (2 === b && (1 === d ? I._tr_align(f) : 5 !== d && (I._tr_stored_block(f, 0, 0, !1), 3 === d && (g(f.head), 0 === f.lookahead && (f.strstart = 0, f.block_start = 0, f.insert = 0))), h(a), 0 === a.avail_out)) return f.last_flush = -1, 0
                }
                if (4 !== d) return 0;
                if (0 >= f.wrap) return 1;
                2 === f.wrap ? (l(f, a.adler & 255), l(f, a.adler >> 8 & 255), l(f, a.adler >> 16 & 255), l(f, a.adler >> 24 & 255), l(f, a.total_in & 255), l(f, a.total_in >> 8 & 255), l(f, a.total_in >> 16 & 255), l(f, a.total_in >> 24 & 255)) : (k(f, a.adler >>> 16), k(f, a.adler & 65535));
                h(a);
                0 < f.wrap && (f.wrap = -f.wrap);
                return 0 !== f.pending ? 0 : 1
            };
            b.deflateEnd = function(a) {
                var d;
                if (!a || !a.state) return -2;
                d = a.state.status;
                if (42 !== d && 69 !== d && 73 !== d && 91 !== d && 103 !== d && 113 !== d && 666 !== d) return e(a, -2);
                a.state = null;
                return 113 === d ? e(a, -3) : 0
            };
            b.deflateInfo = "pako deflate (from Nodeca project)"
        }, {
            "../utils/common": 4,
            "./adler32": 6,
            "./crc32": 8,
            "./messages": 14,
            "./trees": 15
        }],
        10: [function(a, d, b) {
            d.exports = function() {
                this.os = this.xflags = this.time = this.text = 0;
                this.extra = null;
                this.extra_len = 0;
                this.comment = this.name = "";
                this.hcrc = 0;
                this.done = !1
            }
        }, {}],
        11: [function(a, d, b) {
            d.exports = function(a, d) {
                var b, f, l, k, p, r, u, z, y, x, D, B, w, L, C, I, M, F, t, E, v, m, n, H;
                b = a.state;
                f = a.next_in;
                n = a.input;
                l = f + (a.avail_in - 5);
                k = a.next_out;
                H = a.output;
                p = k - (d - a.avail_out);
                r = k + (a.avail_out - 257);
                u = b.dmax;
                z = b.wsize;
                y = b.whave;
                x = b.wnext;
                D = b.window;
                B = b.hold;
                w = b.bits;
                L = b.lencode;
                C = b.distcode;
                I = (1 << b.lenbits) - 1;
                M = (1 << b.distbits) - 1;
                a: do b: for (15 > w && (B += n[f++] << w, w += 8, B += n[f++] << w, w += 8), F = L[B & I];;) {
                        t = F >>> 24;
                        B >>>= t;
                        w -= t;
                        t = F >>> 16 & 255;
                        if (0 === t) H[k++] = F & 65535;
                        else if (t & 16) {
                            E = F & 65535;
                            if (t &= 15) w < t && (B += n[f++] << w, w += 8), E += B & (1 << t) - 1, B >>>= t, w -= t;
                            15 > w && (B += n[f++] << w, w += 8, B += n[f++] << w, w += 8);
                            F = C[B & M];
                            c: for (;;) {
                                t = F >>> 24;
                                B >>>= t;
                                w -= t;
                                t = F >>> 16 & 255;
                                if (t & 16) {
                                    F &= 65535;
                                    t &= 15;
                                    w < t && (B += n[f++] << w, w += 8, w < t && (B += n[f++] << w, w += 8));
                                    F += B & (1 << t) - 1;
                                    if (F > u) {
                                        a.msg = "invalid distance too far back";
                                        b.mode = 30;
                                        break a
                                    }
                                    B >>>= t;
                                    w -= t;
                                    t = k - p;
                                    if (F > t) {
                                        t = F - t;
                                        if (t > y && b.sane) {
                                            a.msg = "invalid distance too far back";
                                            b.mode = 30;
                                            break a
                                        }
                                        v = 0;
                                        m = D;
                                        if (0 === x) {
                                            if (v += z - t, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = k - F;
                                                m = H
                                            }
                                        } else if (x < t) {
                                            if (v +=
                                                z + x - t, t -= x, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = 0;
                                                if (x < E) {
                                                    t = x;
                                                    E -= t;
                                                    do H[k++] = D[v++]; while (--t);
                                                    v = k - F;
                                                    m = H
                                                }
                                            }
                                        } else if (v += x - t, t < E) {
                                            E -= t;
                                            do H[k++] = D[v++]; while (--t);
                                            v = k - F;
                                            m = H
                                        }
                                        for (; 2 < E;) H[k++] = m[v++], H[k++] = m[v++], H[k++] = m[v++], E -= 3;
                                        E && (H[k++] = m[v++], 1 < E && (H[k++] = m[v++]))
                                    } else {
                                        v = k - F;
                                        do H[k++] = H[v++], H[k++] = H[v++], H[k++] = H[v++], E -= 3; while (2 < E);
                                        E && (H[k++] = H[v++], 1 < E && (H[k++] = H[v++]))
                                    }
                                } else if (0 === (t & 64)) {
                                    F = C[(F & 65535) + (B & (1 << t) - 1)];
                                    continue c
                                } else {
                                    a.msg = "invalid distance code";
                                    b.mode = 30;
                                    break a
                                }
                                break
                            }
                        } else if (0 ===
                            (t & 64)) {
                            F = L[(F & 65535) + (B & (1 << t) - 1)];
                            continue b
                        } else {
                            t & 32 ? b.mode = 12 : (a.msg = "invalid literal/length code", b.mode = 30);
                            break a
                        }
                        break
                    }
                    while (f < l && k < r);
                    E = w >> 3;
                f -= E;
                w -= E << 3;
                a.next_in = f;
                a.next_out = k;
                a.avail_in = f < l ? 5 + (l - f) : 5 - (f - l);
                a.avail_out = k < r ? 257 + (r - k) : 257 - (k - r);
                b.hold = B & (1 << w) - 1;
                b.bits = w
            }
        }, {}],
        12: [function(a, d, b) {
            function e(a) {
                return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((a & 65280) << 8) + ((a & 255) << 24)
            }

            function g() {
                this.mode = 0;
                this.last = !1;
                this.wrap = 0;
                this.havedict = !1;
                this.total = this.check = this.dmax = this.flags = 0;
                this.head =
                    null;
                this.wnext = this.whave = this.wsize = this.wbits = 0;
                this.window = null;
                this.extra = this.offset = this.length = this.bits = this.hold = 0;
                this.distcode = this.lencode = null;
                this.have = this.ndist = this.nlen = this.ncode = this.distbits = this.lenbits = 0;
                this.next = null;
                this.lens = new p.Buf16(320);
                this.work = new p.Buf16(288);
                this.distdyn = this.lendyn = null;
                this.was = this.back = this.sane = 0
            }

            function h(a) {
                var d;
                if (!a || !a.state) return -2;
                d = a.state;
                a.total_in = a.total_out = d.total = 0;
                a.msg = "";
                d.wrap && (a.adler = d.wrap & 1);
                d.mode = 1;
                d.last = 0;
                d.havedict =
                    0;
                d.dmax = 32768;
                d.head = null;
                d.hold = 0;
                d.bits = 0;
                d.lencode = d.lendyn = new p.Buf32(852);
                d.distcode = d.distdyn = new p.Buf32(592);
                d.sane = 1;
                d.back = -1;
                return 0
            }

            function f(a) {
                var d;
                if (!a || !a.state) return -2;
                d = a.state;
                d.wsize = 0;
                d.whave = 0;
                d.wnext = 0;
                return h(a)
            }

            function l(a, d) {
                var b, e;
                if (!a || !a.state) return -2;
                e = a.state;
                0 > d ? (b = 0, d = -d) : (b = (d >> 4) + 1, 48 > d && (d &= 15));
                if (d && (8 > d || 15 < d)) return -2;
                null !== e.window && e.wbits !== d && (e.window = null);
                e.wrap = b;
                e.wbits = d;
                return f(a)
            }

            function k(a, d) {
                var b;
                if (!a) return -2;
                b = new g;
                a.state =
                    b;
                b.window = null;
                b = l(a, d);
                0 !== b && (a.state = null);
                return b
            }
            var p = a("../utils/common"),
                r = a("./adler32"),
                u = a("./crc32"),
                z = a("./inffast"),
                y = a("./inftrees"),
                x = !0,
                D, B;
            b.inflateReset = f;
            b.inflateReset2 = l;
            b.inflateResetKeep = h;
            b.inflateInit = function(a) {
                return k(a, 15)
            };
            b.inflateInit2 = k;
            b.inflate = function(a, d) {
                var b, g, h, f, l, k, v, m, n, H, J, q, A, N, K = 0,
                    Q, R, P, O = new p.Buf8(4),
                    S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return -2;
                b = a.state;
                12 === b.mode && (b.mode = 13);
                l = a.next_out;
                h = a.output;
                v = a.avail_out;
                f = a.next_in;
                g = a.input;
                k = a.avail_in;
                m = b.hold;
                n = b.bits;
                H = k;
                J = v;
                P = 0;
                a: for (;;) switch (b.mode) {
                    case 1:
                        if (0 === b.wrap) {
                            b.mode = 13;
                            break
                        }
                        for (; 16 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        if (b.wrap & 2 && 35615 === m) {
                            b.check = 0;
                            O[0] = m & 255;
                            O[1] = m >>> 8 & 255;
                            b.check = u(b.check, O, 2, 0);
                            n = m = 0;
                            b.mode = 2;
                            break
                        }
                        b.flags = 0;
                        b.head && (b.head.done = !1);
                        if (!(b.wrap & 1) || (((m & 255) << 8) + (m >> 8)) % 31) {
                            a.msg = "incorrect header check";
                            b.mode = 30;
                            break
                        }
                        if (8 !== (m & 15)) {
                            a.msg = "unknown compression method";
                            b.mode =
                                30;
                            break
                        }
                        m >>>= 4;
                        n -= 4;
                        A = (m & 15) + 8;
                        if (0 === b.wbits) b.wbits = A;
                        else if (A > b.wbits) {
                            a.msg = "invalid window size";
                            b.mode = 30;
                            break
                        }
                        b.dmax = 1 << A;
                        a.adler = b.check = 1;
                        b.mode = m & 512 ? 10 : 12;
                        n = m = 0;
                        break;
                    case 2:
                        for (; 16 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        b.flags = m;
                        if (8 !== (b.flags & 255)) {
                            a.msg = "unknown compression method";
                            b.mode = 30;
                            break
                        }
                        if (b.flags & 57344) {
                            a.msg = "unknown header flags set";
                            b.mode = 30;
                            break
                        }
                        b.head && (b.head.text = m >> 8 & 1);
                        b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                        n = m = 0;
                        b.mode = 3;
                    case 3:
                        for (; 32 >
                            n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        b.head && (b.head.time = m);
                        b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, O[2] = m >>> 16 & 255, O[3] = m >>> 24 & 255, b.check = u(b.check, O, 4, 0));
                        n = m = 0;
                        b.mode = 4;
                    case 4:
                        for (; 16 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        b.head && (b.head.xflags = m & 255, b.head.os = m >> 8);
                        b.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                        n = m = 0;
                        b.mode = 5;
                    case 5:
                        if (b.flags & 1024) {
                            for (; 16 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.length = m;
                            b.head && (b.head.extra_len = m);
                            b.flags & 512 && (O[0] = m & 255,
                                O[1] = m >>> 8 & 255, b.check = u(b.check, O, 2, 0));
                            n = m = 0
                        } else b.head && (b.head.extra = null);
                        b.mode = 6;
                    case 6:
                        if (b.flags & 1024 && (q = b.length, q > k && (q = k), q && (b.head && (A = b.head.extra_len - b.length, b.head.extra || (b.head.extra = Array(b.head.extra_len)), p.arraySet(b.head.extra, g, f, q, A)), b.flags & 512 && (b.check = u(b.check, g, q, f)), k -= q, f += q, b.length -= q), b.length)) break a;
                        b.length = 0;
                        b.mode = 7;
                    case 7:
                        if (b.flags & 2048) {
                            if (0 === k) break a;
                            q = 0;
                            do A = g[f + q++], b.head && A && 65536 > b.length && (b.head.name += String.fromCharCode(A)); while (A && q < k);
                            b.flags & 512 && (b.check = u(b.check, g, q, f));
                            k -= q;
                            f += q;
                            if (A) break a
                        } else b.head && (b.head.name = null);
                        b.length = 0;
                        b.mode = 8;
                    case 8:
                        if (b.flags & 4096) {
                            if (0 === k) break a;
                            q = 0;
                            do A = g[f + q++], b.head && A && 65536 > b.length && (b.head.comment += String.fromCharCode(A)); while (A && q < k);
                            b.flags & 512 && (b.check = u(b.check, g, q, f));
                            k -= q;
                            f += q;
                            if (A) break a
                        } else b.head && (b.head.comment = null);
                        b.mode = 9;
                    case 9:
                        if (b.flags & 512) {
                            for (; 16 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (m !== (b.check & 65535)) {
                                a.msg = "header crc mismatch";
                                b.mode = 30;
                                break
                            }
                            n =
                                m = 0
                        }
                        b.head && (b.head.hcrc = b.flags >> 9 & 1, b.head.done = !0);
                        a.adler = b.check = 0;
                        b.mode = 12;
                        break;
                    case 10:
                        for (; 32 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        a.adler = b.check = e(m);
                        n = m = 0;
                        b.mode = 11;
                    case 11:
                        if (0 === b.havedict) return a.next_out = l, a.avail_out = v, a.next_in = f, a.avail_in = k, b.hold = m, b.bits = n, 2;
                        a.adler = b.check = 1;
                        b.mode = 12;
                    case 12:
                        if (5 === d || 6 === d) break a;
                    case 13:
                        if (b.last) {
                            m >>>= n & 7;
                            n -= n & 7;
                            b.mode = 27;
                            break
                        }
                        for (; 3 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        b.last = m & 1;
                        m >>>= 1;
                        --n;
                        switch (m & 3) {
                            case 0:
                                b.mode = 14;
                                break;
                            case 1:
                                q = b;
                                if (x) {
                                    A = void 0;
                                    D = new p.Buf32(512);
                                    B = new p.Buf32(32);
                                    for (A = 0; 144 > A;) q.lens[A++] = 8;
                                    for (; 256 > A;) q.lens[A++] = 9;
                                    for (; 280 > A;) q.lens[A++] = 7;
                                    for (; 288 > A;) q.lens[A++] = 8;
                                    y(1, q.lens, 0, 288, D, 0, q.work, {
                                        bits: 9
                                    });
                                    for (A = 0; 32 > A;) q.lens[A++] = 5;
                                    y(2, q.lens, 0, 32, B, 0, q.work, {
                                        bits: 5
                                    });
                                    x = !1
                                }
                                q.lencode = D;
                                q.lenbits = 9;
                                q.distcode = B;
                                q.distbits = 5;
                                b.mode = 20;
                                if (6 === d) {
                                    m >>>= 2;
                                    n -= 2;
                                    break a
                                }
                                break;
                            case 2:
                                b.mode = 17;
                                break;
                            case 3:
                                a.msg = "invalid block type", b.mode = 30
                        }
                        m >>>= 2;
                        n -= 2;
                        break;
                    case 14:
                        m >>>= n & 7;
                        for (n -= n & 7; 32 > n;) {
                            if (0 ===
                                k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        if ((m & 65535) !== (m >>> 16 ^ 65535)) {
                            a.msg = "invalid stored block lengths";
                            b.mode = 30;
                            break
                        }
                        b.length = m & 65535;
                        n = m = 0;
                        b.mode = 15;
                        if (6 === d) break a;
                    case 15:
                        b.mode = 16;
                    case 16:
                        if (q = b.length) {
                            q > k && (q = k);
                            q > v && (q = v);
                            if (0 === q) break a;
                            p.arraySet(h, g, f, q, l);
                            k -= q;
                            f += q;
                            v -= q;
                            l += q;
                            b.length -= q;
                            break
                        }
                        b.mode = 12;
                        break;
                    case 17:
                        for (; 14 > n;) {
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        b.nlen = (m & 31) + 257;
                        m >>>= 5;
                        n -= 5;
                        b.ndist = (m & 31) + 1;
                        m >>>= 5;
                        n -= 5;
                        b.ncode = (m & 15) + 4;
                        m >>>= 4;
                        n -= 4;
                        if (286 < b.nlen || 30 < b.ndist) {
                            a.msg =
                                "too many length or distance symbols";
                            b.mode = 30;
                            break
                        }
                        b.have = 0;
                        b.mode = 18;
                    case 18:
                        for (; b.have < b.ncode;) {
                            for (; 3 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.lens[S[b.have++]] = m & 7;
                            m >>>= 3;
                            n -= 3
                        }
                        for (; 19 > b.have;) b.lens[S[b.have++]] = 0;
                        b.lencode = b.lendyn;
                        b.lenbits = 7;
                        q = {
                            bits: b.lenbits
                        };
                        P = y(0, b.lens, 0, 19, b.lencode, 0, b.work, q);
                        b.lenbits = q.bits;
                        if (P) {
                            a.msg = "invalid code lengths set";
                            b.mode = 30;
                            break
                        }
                        b.have = 0;
                        b.mode = 19;
                    case 19:
                        for (; b.have < b.nlen + b.ndist;) {
                            for (;;) {
                                K = b.lencode[m & (1 << b.lenbits) - 1];
                                q = K >>> 24;
                                K &= 65535;
                                if (q <= n) break;
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (16 > K) m >>>= q, n -= q, b.lens[b.have++] = K;
                            else {
                                if (16 === K) {
                                    for (A = q + 2; n < A;) {
                                        if (0 === k) break a;
                                        k--;
                                        m += g[f++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    if (0 === b.have) {
                                        a.msg = "invalid bit length repeat";
                                        b.mode = 30;
                                        break
                                    }
                                    A = b.lens[b.have - 1];
                                    q = 3 + (m & 3);
                                    m >>>= 2;
                                    n -= 2
                                } else if (17 === K) {
                                    for (A = q + 3; n < A;) {
                                        if (0 === k) break a;
                                        k--;
                                        m += g[f++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    A = 0;
                                    q = 3 + (m & 7);
                                    m >>>= 3;
                                    n -= 3
                                } else {
                                    for (A = q + 7; n < A;) {
                                        if (0 === k) break a;
                                        k--;
                                        m += g[f++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    A = 0;
                                    q = 11 + (m & 127);
                                    m >>>= 7;
                                    n -= 7
                                }
                                if (b.have +
                                    q > b.nlen + b.ndist) {
                                    a.msg = "invalid bit length repeat";
                                    b.mode = 30;
                                    break
                                }
                                for (; q--;) b.lens[b.have++] = A
                            }
                        }
                        if (30 === b.mode) break;
                        if (0 === b.lens[256]) {
                            a.msg = "invalid code -- missing end-of-block";
                            b.mode = 30;
                            break
                        }
                        b.lenbits = 9;
                        q = {
                            bits: b.lenbits
                        };
                        P = y(1, b.lens, 0, b.nlen, b.lencode, 0, b.work, q);
                        b.lenbits = q.bits;
                        if (P) {
                            a.msg = "invalid literal/lengths set";
                            b.mode = 30;
                            break
                        }
                        b.distbits = 6;
                        b.distcode = b.distdyn;
                        q = {
                            bits: b.distbits
                        };
                        P = y(2, b.lens, b.nlen, b.ndist, b.distcode, 0, b.work, q);
                        b.distbits = q.bits;
                        if (P) {
                            a.msg = "invalid distances set";
                            b.mode = 30;
                            break
                        }
                        b.mode = 20;
                        if (6 === d) break a;
                    case 20:
                        b.mode = 21;
                    case 21:
                        if (6 <= k && 258 <= v) {
                            a.next_out = l;
                            a.avail_out = v;
                            a.next_in = f;
                            a.avail_in = k;
                            b.hold = m;
                            b.bits = n;
                            z(a, J);
                            l = a.next_out;
                            h = a.output;
                            v = a.avail_out;
                            f = a.next_in;
                            g = a.input;
                            k = a.avail_in;
                            m = b.hold;
                            n = b.bits;
                            12 === b.mode && (b.back = -1);
                            break
                        }
                        for (b.back = 0;;) {
                            K = b.lencode[m & (1 << b.lenbits) - 1];
                            q = K >>> 24;
                            A = K >>> 16 & 255;
                            K &= 65535;
                            if (q <= n) break;
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        if (A && 0 === (A & 240)) {
                            N = q;
                            Q = A;
                            for (R = K;;) {
                                K = b.lencode[R + ((m & (1 << N + Q) - 1) >> N)];
                                q = K >>> 24;
                                A =
                                    K >>> 16 & 255;
                                K &= 65535;
                                if (N + q <= n) break;
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            m >>>= N;
                            n -= N;
                            b.back += N
                        }
                        m >>>= q;
                        n -= q;
                        b.back += q;
                        b.length = K;
                        if (0 === A) {
                            b.mode = 26;
                            break
                        }
                        if (A & 32) {
                            b.back = -1;
                            b.mode = 12;
                            break
                        }
                        if (A & 64) {
                            a.msg = "invalid literal/length code";
                            b.mode = 30;
                            break
                        }
                        b.extra = A & 15;
                        b.mode = 22;
                    case 22:
                        if (b.extra) {
                            for (A = b.extra; n < A;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.length += m & (1 << b.extra) - 1;
                            m >>>= b.extra;
                            n -= b.extra;
                            b.back += b.extra
                        }
                        b.was = b.length;
                        b.mode = 23;
                    case 23:
                        for (;;) {
                            K = b.distcode[m & (1 << b.distbits) - 1];
                            q = K >>>
                                24;
                            A = K >>> 16 & 255;
                            K &= 65535;
                            if (q <= n) break;
                            if (0 === k) break a;
                            k--;
                            m += g[f++] << n;
                            n += 8
                        }
                        if (0 === (A & 240)) {
                            N = q;
                            Q = A;
                            for (R = K;;) {
                                K = b.distcode[R + ((m & (1 << N + Q) - 1) >> N)];
                                q = K >>> 24;
                                A = K >>> 16 & 255;
                                K &= 65535;
                                if (N + q <= n) break;
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            m >>>= N;
                            n -= N;
                            b.back += N
                        }
                        m >>>= q;
                        n -= q;
                        b.back += q;
                        if (A & 64) {
                            a.msg = "invalid distance code";
                            b.mode = 30;
                            break
                        }
                        b.offset = K;
                        b.extra = A & 15;
                        b.mode = 24;
                    case 24:
                        if (b.extra) {
                            for (A = b.extra; n < A;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            b.offset += m & (1 << b.extra) - 1;
                            m >>>= b.extra;
                            n -= b.extra;
                            b.back +=
                                b.extra
                        }
                        if (b.offset > b.dmax) {
                            a.msg = "invalid distance too far back";
                            b.mode = 30;
                            break
                        }
                        b.mode = 25;
                    case 25:
                        if (0 === v) break a;
                        q = J - v;
                        if (b.offset > q) {
                            q = b.offset - q;
                            if (q > b.whave && b.sane) {
                                a.msg = "invalid distance too far back";
                                b.mode = 30;
                                break
                            }
                            q > b.wnext ? (q -= b.wnext, A = b.wsize - q) : A = b.wnext - q;
                            q > b.length && (q = b.length);
                            N = b.window
                        } else N = h, A = l - b.offset, q = b.length;
                        q > v && (q = v);
                        v -= q;
                        b.length -= q;
                        do h[l++] = N[A++]; while (--q);
                        0 === b.length && (b.mode = 21);
                        break;
                    case 26:
                        if (0 === v) break a;
                        h[l++] = b.length;
                        v--;
                        b.mode = 21;
                        break;
                    case 27:
                        if (b.wrap) {
                            for (; 32 >
                                n;) {
                                if (0 === k) break a;
                                k--;
                                m |= g[f++] << n;
                                n += 8
                            }
                            J -= v;
                            a.total_out += J;
                            b.total += J;
                            J && (a.adler = b.check = b.flags ? u(b.check, h, J, l - J) : r(b.check, h, J, l - J));
                            J = v;
                            if ((b.flags ? m : e(m)) !== b.check) {
                                a.msg = "incorrect data check";
                                b.mode = 30;
                                break
                            }
                            n = m = 0
                        }
                        b.mode = 28;
                    case 28:
                        if (b.wrap && b.flags) {
                            for (; 32 > n;) {
                                if (0 === k) break a;
                                k--;
                                m += g[f++] << n;
                                n += 8
                            }
                            if (m !== (b.total & 4294967295)) {
                                a.msg = "incorrect length check";
                                b.mode = 30;
                                break
                            }
                            n = m = 0
                        }
                        b.mode = 29;
                    case 29:
                        P = 1;
                        break a;
                    case 30:
                        P = -3;
                        break a;
                    case 31:
                        return -4;
                    default:
                        return -2
                }
                a.next_out = l;
                a.avail_out =
                    v;
                a.next_in = f;
                a.avail_in = k;
                b.hold = m;
                b.bits = n;
                if (b.wsize || J !== a.avail_out && 30 > b.mode && (27 > b.mode || 4 !== d)) g = a.output, f = a.next_out, l = J - a.avail_out, v = a.state, null === v.window && (v.wsize = 1 << v.wbits, v.wnext = 0, v.whave = 0, v.window = new p.Buf8(v.wsize)), l >= v.wsize ? (p.arraySet(v.window, g, f - v.wsize, v.wsize, 0), v.wnext = 0, v.whave = v.wsize) : (k = v.wsize - v.wnext, k > l && (k = l), p.arraySet(v.window, g, f - l, k, v.wnext), (l -= k) ? (p.arraySet(v.window, g, f - l, l, 0), v.wnext = l, v.whave = v.wsize) : (v.wnext += k, v.wnext === v.wsize && (v.wnext = 0), v.whave <
                    v.wsize && (v.whave += k)));
                H -= a.avail_in;
                J -= a.avail_out;
                a.total_in += H;
                a.total_out += J;
                b.total += J;
                b.wrap && J && (a.adler = b.check = b.flags ? u(b.check, h, J, a.next_out - J) : r(b.check, h, J, a.next_out - J));
                a.data_type = b.bits + (b.last ? 64 : 0) + (12 === b.mode ? 128 : 0) + (20 === b.mode || 15 === b.mode ? 256 : 0);
                (0 === H && 0 === J || 4 === d) && 0 === P && (P = -5);
                return P
            };
            b.inflateEnd = function(a) {
                if (!a || !a.state) return -2;
                var b = a.state;
                b.window && (b.window = null);
                a.state = null;
                return 0
            };
            b.inflateGetHeader = function(a, b) {
                var d;
                if (!a || !a.state) return -2;
                d = a.state;
                if (0 === (d.wrap & 2)) return -2;
                d.head = b;
                b.done = !1;
                return 0
            };
            b.inflateInfo = "pako inflate (from Nodeca project)"
        }, {
            "../utils/common": 4,
            "./adler32": 6,
            "./crc32": 8,
            "./inffast": 11,
            "./inftrees": 13
        }],
        13: [function(a, d, b) {
            var e = a("../utils/common"),
                g = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                h = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049,
                    3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0
                ],
                l = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            d.exports = function(a, b, d, u, z, y, x, D) {
                for (var B = D.bits, w = 0, L = 0, C = 0, I = 0, M = 0, F = 0, t = 0, E = 0, v = 0, m = 0, n, H, J = null, q = 0, A, N = new e.Buf16(16), F = new e.Buf16(16), K = null, Q = 0, R, P, O, w = 0; 15 >= w; w++) N[w] = 0;
                for (L = 0; L < u; L++) N[b[d + L]]++;
                M = B;
                for (I = 15; 1 <= I && 0 === N[I]; I--);
                M > I && (M = I);
                if (0 === I) return z[y++] = 20971520, z[y++] = 20971520, D.bits = 1, 0;
                for (C = 1; C < I && 0 === N[C]; C++);
                M < C && (M = C);
                for (w =
                    E = 1; 15 >= w; w++)
                    if (E <<= 1, E -= N[w], 0 > E) return -1;
                if (0 < E && (0 === a || 1 !== I)) return -1;
                F[1] = 0;
                for (w = 1; 15 > w; w++) F[w + 1] = F[w] + N[w];
                for (L = 0; L < u; L++) 0 !== b[d + L] && (x[F[b[d + L]]++] = L);
                0 === a ? (J = K = x, A = 19) : 1 === a ? (J = g, q -= 257, K = h, Q -= 257, A = 256) : (J = f, K = l, A = -1);
                L = m = 0;
                w = C;
                B = y;
                F = M;
                t = 0;
                H = -1;
                v = 1 << M;
                u = v - 1;
                if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                for (var S = 0;;) {
                    S++;
                    R = w - t;
                    x[L] < A ? (P = 0, O = x[L]) : x[L] > A ? (P = K[Q + x[L]], O = J[q + x[L]]) : (P = 96, O = 0);
                    E = 1 << w - t;
                    C = n = 1 << F;
                    do n -= E, z[B + (m >> t) + n] = R << 24 | P << 16 | O | 0; while (0 !== n);
                    for (E = 1 << w - 1; m & E;) E >>= 1;
                    0 !== E ?
                        (m &= E - 1, m += E) : m = 0;
                    L++;
                    if (0 === --N[w]) {
                        if (w === I) break;
                        w = b[d + x[L]]
                    }
                    if (w > M && (m & u) !== H) {
                        0 === t && (t = M);
                        B += C;
                        F = w - t;
                        for (E = 1 << F; F + t < I;) {
                            E -= N[F + t];
                            if (0 >= E) break;
                            F++;
                            E <<= 1
                        }
                        v += 1 << F;
                        if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                        H = m & u;
                        z[H] = M << 24 | F << 16 | B - y | 0
                    }
                }
                0 !== m && (z[B + m] = w - t << 24 | 4194304);
                D.bits = M;
                return 0
            }
        }, {
            "../utils/common": 4
        }],
        14: [function(a, d, b) {
                d.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
            },
            {}
        ],
        15: [function(a, d, b) {
            function e(a) {
                for (var b = a.length; 0 <= --b;) a[b] = 0
            }

            function g(a, b) {
                a.pending_buf[a.pending++] = b & 255;
                a.pending_buf[a.pending++] = b >>> 8 & 255
            }

            function h(a, b, d) {
                a.bi_valid > 16 - d ? (a.bi_buf |= b << a.bi_valid & 65535, g(a, a.bi_buf), a.bi_buf = b >> 16 - a.bi_valid, a.bi_valid += d - 16) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += d)
            }

            function f(a, b, d) {
                h(a, d[2 * b], d[2 * b + 1])
            }

            function l(a, b) {
                var d = 0;
                do d |= a & 1, a >>>= 1, d <<= 1; while (0 < --b);
                return d >>> 1
            }

            function k(a, b, d) {
                var e = Array(16),
                    g = 0,
                    h;
                for (h = 1; 15 >= h; h++) e[h] =
                    g = g + d[h - 1] << 1;
                for (d = 0; d <= b; d++) g = a[2 * d + 1], 0 !== g && (a[2 * d] = l(e[g]++, g))
            }

            function p(a) {
                var b;
                for (b = 0; 286 > b; b++) a.dyn_ltree[2 * b] = 0;
                for (b = 0; 30 > b; b++) a.dyn_dtree[2 * b] = 0;
                for (b = 0; 19 > b; b++) a.bl_tree[2 * b] = 0;
                a.dyn_ltree[512] = 1;
                a.opt_len = a.static_len = 0;
                a.last_lit = a.matches = 0
            }

            function r(a) {
                8 < a.bi_valid ? g(a, a.bi_buf) : 0 < a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf);
                a.bi_buf = 0;
                a.bi_valid = 0
            }

            function u(a, b, d, e) {
                var g = 2 * b,
                    h = 2 * d;
                return a[g] < a[h] || a[g] === a[h] && e[b] <= e[d]
            }

            function z(a, b, d) {
                for (var e = a.heap[d], g = d <<
                        1; g <= a.heap_len;) {
                    g < a.heap_len && u(b, a.heap[g + 1], a.heap[g], a.depth) && g++;
                    if (u(b, e, a.heap[g], a.depth)) break;
                    a.heap[d] = a.heap[g];
                    d = g;
                    g <<= 1
                }
                a.heap[d] = e
            }

            function y(a, b, d) {
                var e, g, k = 0,
                    l, A;
                if (0 !== a.last_lit) {
                    do e = a.pending_buf[a.d_buf + 2 * k] << 8 | a.pending_buf[a.d_buf + 2 * k + 1], g = a.pending_buf[a.l_buf + k], k++, 0 === e ? f(a, g, b) : (l = n[g], f(a, l + 256 + 1, b), A = I[l], 0 !== A && (g -= H[l], h(a, g, A)), e--, l = 256 > e ? m[e] : m[256 + (e >>> 7)], f(a, l, d), A = M[l], 0 !== A && (e -= J[l], h(a, e, A))); while (k < a.last_lit)
                }
                f(a, 256, b)
            }

            function x(a, b) {
                var d = b.dyn_tree,
                    e = b.stat_desc.static_tree,
                    g = b.stat_desc.has_stree,
                    h = b.stat_desc.elems,
                    f, m = -1,
                    l;
                a.heap_len = 0;
                a.heap_max = 573;
                for (f = 0; f < h; f++) 0 !== d[2 * f] ? (a.heap[++a.heap_len] = m = f, a.depth[f] = 0) : d[2 * f + 1] = 0;
                for (; 2 > a.heap_len;) l = a.heap[++a.heap_len] = 2 > m ? ++m : 0, d[2 * l] = 1, a.depth[l] = 0, a.opt_len--, g && (a.static_len -= e[2 * l + 1]);
                b.max_code = m;
                for (f = a.heap_len >> 1; 1 <= f; f--) z(a, d, f);
                l = h;
                do f = a.heap[1], a.heap[1] = a.heap[a.heap_len--], z(a, d, 1), e = a.heap[1], a.heap[--a.heap_max] = f, a.heap[--a.heap_max] = e, d[2 * l] = d[2 * f] + d[2 * e], a.depth[l] = (a.depth[f] >=
                    a.depth[e] ? a.depth[f] : a.depth[e]) + 1, d[2 * f + 1] = d[2 * e + 1] = l, a.heap[1] = l++, z(a, d, 1); while (2 <= a.heap_len);
                a.heap[--a.heap_max] = a.heap[1];
                f = b.dyn_tree;
                l = b.max_code;
                for (var A = b.stat_desc.static_tree, n = b.stat_desc.has_stree, q = b.stat_desc.extra_bits, C = b.stat_desc.extra_base, N = b.stat_desc.max_length, J, p, K = 0, h = 0; 15 >= h; h++) a.bl_count[h] = 0;
                f[2 * a.heap[a.heap_max] + 1] = 0;
                for (e = a.heap_max + 1; 573 > e; e++) g = a.heap[e], h = f[2 * f[2 * g + 1] + 1] + 1, h > N && (h = N, K++), f[2 * g + 1] = h, g > l || (a.bl_count[h]++, J = 0, g >= C && (J = q[g - C]), p = f[2 * g], a.opt_len +=
                    p * (h + J), n && (a.static_len += p * (A[2 * g + 1] + J)));
                if (0 !== K) {
                    do {
                        for (h = N - 1; 0 === a.bl_count[h];) h--;
                        a.bl_count[h]--;
                        a.bl_count[h + 1] += 2;
                        a.bl_count[N]--;
                        K -= 2
                    } while (0 < K);
                    for (h = N; 0 !== h; h--)
                        for (g = a.bl_count[h]; 0 !== g;) A = a.heap[--e], A > l || (f[2 * A + 1] !== h && (a.opt_len += (h - f[2 * A + 1]) * f[2 * A], f[2 * A + 1] = h), g--)
                }
                k(d, m, a.bl_count)
            }

            function D(a, b, d) {
                var e, g = -1,
                    h, f = b[1],
                    m = 0,
                    k = 7,
                    l = 4;
                0 === f && (k = 138, l = 3);
                b[2 * (d + 1) + 1] = 65535;
                for (e = 0; e <= d; e++) h = f, f = b[2 * (e + 1) + 1], ++m < k && h === f || (m < l ? a.bl_tree[2 * h] += m : 0 !== h ? (h !== g && a.bl_tree[2 * h]++, a.bl_tree[32]++) :
                    10 >= m ? a.bl_tree[34]++ : a.bl_tree[36]++, m = 0, g = h, 0 === f ? (k = 138, l = 3) : h === f ? (k = 6, l = 3) : (k = 7, l = 4))
            }

            function B(a, b, d) {
                var e, g = -1,
                    m, k = b[1],
                    l = 0,
                    A = 7,
                    n = 4;
                0 === k && (A = 138, n = 3);
                for (e = 0; e <= d; e++)
                    if (m = k, k = b[2 * (e + 1) + 1], !(++l < A && m === k)) {
                        if (l < n) {
                            do f(a, m, a.bl_tree); while (0 !== --l)
                        } else 0 !== m ? (m !== g && (f(a, m, a.bl_tree), l--), f(a, 16, a.bl_tree), h(a, l - 3, 2)) : 10 >= l ? (f(a, 17, a.bl_tree), h(a, l - 3, 3)) : (f(a, 18, a.bl_tree), h(a, l - 11, 7));
                        l = 0;
                        g = m;
                        0 === k ? (A = 138, n = 3) : m === k ? (A = 6, n = 3) : (A = 7, n = 4)
                    }
            }

            function w(a) {
                var b = 4093624447,
                    d;
                for (d = 0; 31 >= d; d++,
                    b >>>= 1)
                    if (b & 1 && 0 !== a.dyn_ltree[2 * d]) return 0;
                if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return 1;
                for (d = 32; 256 > d; d++)
                    if (0 !== a.dyn_ltree[2 * d]) return 1;
                return 0
            }

            function L(a, b, d, e) {
                h(a, 0 + (e ? 1 : 0), 3);
                r(a);
                g(a, d);
                g(a, ~d);
                C.arraySet(a.pending_buf, a.window, b, d, a.pending);
                a.pending += d
            }
            var C = a("../utils/common"),
                I = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                M = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                F = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                t = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                E = Array(576);
            e(E);
            var v = Array(60);
            e(v);
            var m = Array(512);
            e(m);
            var n = Array(256);
            e(n);
            var H = Array(29);
            e(H);
            var J = Array(30);
            e(J);
            var q = function(a, b, d, e, g) {
                    this.static_tree = a;
                    this.extra_bits = b;
                    this.extra_base = d;
                    this.elems = e;
                    this.max_length = g;
                    this.has_stree = a && a.length
                },
                A, N, K, Q = function(a, b) {
                    this.dyn_tree = a;
                    this.max_code = 0;
                    this.stat_desc = b
                },
                R = !1;
            b._tr_init = function(a) {
                if (!R) {
                    var b, d, e, g = Array(16);
                    for (e = d = 0; 28 > e; e++)
                        for (H[e] = d, b = 0; b < 1 << I[e]; b++) n[d++] = e;
                    n[d - 1] = e;
                    for (e = d = 0; 16 > e; e++)
                        for (J[e] = d, b = 0; b < 1 << M[e]; b++) m[d++] = e;
                    for (d >>= 7; 30 > e; e++)
                        for (J[e] = d << 7, b = 0; b < 1 << M[e] - 7; b++) m[256 + d++] = e;
                    for (b = 0; 15 >= b; b++) g[b] = 0;
                    for (b = 0; 143 >= b;) E[2 * b + 1] = 8, b++, g[8]++;
                    for (; 255 >= b;) E[2 * b + 1] = 9, b++, g[9]++;
                    for (; 279 >= b;) E[2 * b + 1] = 7, b++, g[7]++;
                    for (; 287 >= b;) E[2 * b + 1] = 8, b++, g[8]++;
                    k(E, 287, g);
                    for (b = 0; 30 > b; b++) v[2 * b + 1] = 5, v[2 * b] = l(b, 5);
                    A = new q(E, I, 257, 286, 15);
                    N = new q(v, M, 0, 30, 15);
                    K = new q([], F, 0, 19, 7);
                    R = !0
                }
                a.l_desc = new Q(a.dyn_ltree, A);
                a.d_desc = new Q(a.dyn_dtree, N);
                a.bl_desc = new Q(a.bl_tree,
                    K);
                a.bi_buf = 0;
                a.bi_valid = 0;
                p(a)
            };
            b._tr_stored_block = L;
            b._tr_flush_block = function(a, b, d, e) {
                var g, f, m = 0;
                if (0 < a.level) {
                    2 === a.strm.data_type && (a.strm.data_type = w(a));
                    x(a, a.l_desc);
                    x(a, a.d_desc);
                    D(a, a.dyn_ltree, a.l_desc.max_code);
                    D(a, a.dyn_dtree, a.d_desc.max_code);
                    x(a, a.bl_desc);
                    for (m = 18; 3 <= m && 0 === a.bl_tree[2 * t[m] + 1]; m--);
                    a.opt_len += 3 * (m + 1) + 14;
                    g = a.opt_len + 3 + 7 >>> 3;
                    f = a.static_len + 3 + 7 >>> 3;
                    f <= g && (g = f)
                } else g = f = d + 5;
                if (d + 4 <= g && -1 !== b) L(a, b, d, e);
                else if (4 === a.strategy || f === g) h(a, 2 + (e ? 1 : 0), 3), y(a, E, v);
                else {
                    h(a,
                        4 + (e ? 1 : 0), 3);
                    b = a.l_desc.max_code + 1;
                    d = a.d_desc.max_code + 1;
                    m += 1;
                    h(a, b - 257, 5);
                    h(a, d - 1, 5);
                    h(a, m - 4, 4);
                    for (g = 0; g < m; g++) h(a, a.bl_tree[2 * t[g] + 1], 3);
                    B(a, a.dyn_ltree, b - 1);
                    B(a, a.dyn_dtree, d - 1);
                    y(a, a.dyn_ltree, a.dyn_dtree)
                }
                p(a);
                e && r(a)
            };
            b._tr_tally = function(a, b, d) {
                a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255;
                a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = b & 255;
                a.pending_buf[a.l_buf + a.last_lit] = d & 255;
                a.last_lit++;
                0 === b ? a.dyn_ltree[2 * d]++ : (a.matches++, b--, a.dyn_ltree[2 * (n[d] + 256 + 1)]++, a.dyn_dtree[2 * (256 > b ? m[b] : m[256 + (b >>>
                    7)])]++);
                return a.last_lit === a.lit_bufsize - 1
            };
            b._tr_align = function(a) {
                h(a, 2, 3);
                f(a, 256, E);
                16 === a.bi_valid ? (g(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : 8 <= a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf & 255, a.bi_buf >>= 8, a.bi_valid -= 8)
            }
        }, {
            "../utils/common": 4
        }],
        16: [function(a, d, b) {
            d.exports = function() {
                this.input = null;
                this.total_in = this.avail_in = this.next_in = 0;
                this.output = null;
                this.total_out = this.avail_out = this.next_out = 0;
                this.msg = "";
                this.state = null;
                this.data_type = 2;
                this.adler = 0
            }
        }, {}],
        17: [function(a, d, b) {
            var e =
                e || {};
            e.NIFTI1 = e.NIFTI1 || ("undefined" !== typeof a ? a("./nifti1.js") : null);
            e.NIFTI2 = e.NIFTI2 || ("undefined" !== typeof a ? a("./nifti2.js") : null);
            e.Utils = e.Utils || ("undefined" !== typeof a ? a("./utilities.js") : null);
            var g = g || ("undefined" !== typeof a ? a("pako") : null);
            e.isNIFTI1 = function(a) {
                var b, d;
                if (a.byteLength < e.NIFTI1.STANDARD_HEADER_SIZE) return !1;
                (b = new DataView(a)) && (d = b.getUint8(e.NIFTI1.MAGIC_NUMBER_LOCATION));
                a = b.getUint8(e.NIFTI1.MAGIC_NUMBER_LOCATION + 1);
                b = b.getUint8(e.NIFTI1.MAGIC_NUMBER_LOCATION + 2);
                return !(d !== e.NIFTI1.MAGIC_NUMBER[0] || a !== e.NIFTI1.MAGIC_NUMBER[1] || b !== e.NIFTI1.MAGIC_NUMBER[2])
            };
            e.isNIFTI2 = function(a) {
                var b, d;
                if (a.byteLength < e.NIFTI1.STANDARD_HEADER_SIZE) return !1;
                b = new DataView(a);
                a = b.getUint8(e.NIFTI2.MAGIC_NUMBER_LOCATION);
                d = b.getUint8(e.NIFTI2.MAGIC_NUMBER_LOCATION + 1);
                b = b.getUint8(e.NIFTI2.MAGIC_NUMBER_LOCATION + 2);
                return !(a !== e.NIFTI2.MAGIC_NUMBER[0] || d !== e.NIFTI2.MAGIC_NUMBER[1] || b !== e.NIFTI2.MAGIC_NUMBER[2])
            };
            e.isNIFTI = function(a) {
                return e.isNIFTI1(a) || e.isNIFTI2(a)
            };
            e.isCompressed =
                function(a) {
                    var b;
                    return a && (b = new DataView(a), a = b.getUint8(0), b = b.getUint8(1), a === e.Utils.GUNZIP_MAGIC_COOKIE1 || b === e.Utils.GUNZIP_MAGIC_COOKIE2) ? !0 : !1
                };
            e.decompress = function(a) {
                return g.inflate(a).buffer
            };
            e.readHeader = function(a) {
                var b = null;
                e.isCompressed(a) && (a = e.decompress(a));
                e.isNIFTI1(a) ? b = new e.NIFTI1 : e.isNIFTI2(a) && (b = new e.NIFTI2);
                b ? b.readHeader(a) : console.error("That file does not appear to be NIFTI!");
                return b
            };
            e.hasExtension = function(a) {
                return 0 != a.extensionFlag[0]
            };
            e.readImage = function(a,
                b) {
                var d = a.vox_offset,
                    e = 1,
                    g = 1;
                a.dims[4] && (e = a.dims[4]);
                a.dims[5] && (g = a.dims[5]);
                return b.slice(d, d + a.numBitsPerVoxel / 8 * a.dims[2] * a.dims[3] * e * g * a.dims[1])
            };
            e.readExtension = function(a, b) {
                var d = a.getExtensionLocation();
                return b.slice(d, d + a.extensionSize)
            };
            e.readExtensionData = function(a, b) {
                var d = a.getExtensionLocation();
                return b.slice(d + 8, d + a.extensionSize - 8)
            };
            "undefined" !== typeof d && d.exports && (d.exports = e)
        }, {
            "./nifti1.js": 18,
            "./nifti2.js": 19,
            "./utilities.js": 20,
            pako: 1
        }],
        18: [function(a, d, b) {
            var e = e || {};
            e.Utils = e.Utils || ("undefined" !== typeof a ? a("./utilities.js") : null);
            e.NIFTI1 = e.NIFTI1 || function() {
                this.littleEndian = !1;
                this.dim_info = 0;
                this.dims = [];
                this.slice_code = this.slice_end = this.slice_start = this.numBitsPerVoxel = this.datatypeCode = this.intent_code = this.intent_p3 = this.intent_p2 = this.intent_p1 = 0;
                this.pixDims = [];
                this.vox_offset = 0;
                this.scl_slope = 1;
                this.toffset = this.slice_duration = this.cal_min = this.cal_max = this.xyzt_units = this.scl_inter = 0;
                this.intent_name = this.aux_file = this.description = "";
                this.qoffset_z =
                    this.qoffset_y = this.qoffset_x = this.quatern_d = this.quatern_c = this.quatern_b = this.sform_code = this.qform_code = 0;
                this.affine = [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]
                ];
                this.magic = 0;
                this.isHDR = !1;
                this.extensionFlag = [0, 0, 0, 0];
                this.extensionCode = this.extensionSize = 0
            };
            e.NIFTI1.TYPE_NONE = 0;
            e.NIFTI1.TYPE_BINARY = 1;
            e.NIFTI1.TYPE_UINT8 = 2;
            e.NIFTI1.TYPE_INT16 = 4;
            e.NIFTI1.TYPE_INT32 = 8;
            e.NIFTI1.TYPE_FLOAT32 = 16;
            e.NIFTI1.TYPE_COMPLEX64 = 32;
            e.NIFTI1.TYPE_FLOAT64 = 64;
            e.NIFTI1.TYPE_RGB24 = 128;
            e.NIFTI1.TYPE_INT8 = 256;
            e.NIFTI1.TYPE_UINT16 =
                512;
            e.NIFTI1.TYPE_UINT32 = 768;
            e.NIFTI1.TYPE_INT64 = 1024;
            e.NIFTI1.TYPE_UINT64 = 1280;
            e.NIFTI1.TYPE_FLOAT128 = 1536;
            e.NIFTI1.TYPE_COMPLEX128 = 1792;
            e.NIFTI1.TYPE_COMPLEX256 = 2048;
            e.NIFTI1.XFORM_UNKNOWN = 0;
            e.NIFTI1.XFORM_SCANNER_ANAT = 1;
            e.NIFTI1.XFORM_ALIGNED_ANAT = 2;
            e.NIFTI1.XFORM_TALAIRACH = 3;
            e.NIFTI1.XFORM_MNI_152 = 4;
            e.NIFTI1.SPATIAL_UNITS_MASK = 7;
            e.NIFTI1.TEMPORAL_UNITS_MASK = 56;
            e.NIFTI1.UNITS_UNKNOWN = 0;
            e.NIFTI1.UNITS_METER = 1;
            e.NIFTI1.UNITS_MM = 2;
            e.NIFTI1.UNITS_MICRON = 3;
            e.NIFTI1.UNITS_SEC = 8;
            e.NIFTI1.UNITS_MSEC = 16;
            e.NIFTI1.UNITS_USEC = 24;
            e.NIFTI1.UNITS_HZ = 32;
            e.NIFTI1.UNITS_PPM = 40;
            e.NIFTI1.UNITS_RADS = 48;
            e.NIFTI1.MAGIC_COOKIE = 348;
            e.NIFTI1.STANDARD_HEADER_SIZE = 348;
            e.NIFTI1.MAGIC_NUMBER_LOCATION = 344;
            e.NIFTI1.MAGIC_NUMBER = [110, 43, 49];
            e.NIFTI1.MAGIC_NUMBER2 = [110, 105, 49];
            e.NIFTI1.EXTENSION_HEADER_SIZE = 8;
            e.NIFTI1.prototype.readHeader = function(a) {
                a = new DataView(a);
                var b = e.Utils.getIntAt(a, 0, this.littleEndian),
                    d, l;
                b !== e.NIFTI1.MAGIC_COOKIE && (this.littleEndian = !0, b = e.Utils.getIntAt(a, 0, this.littleEndian));
                if (b !== e.NIFTI1.MAGIC_COOKIE) throw Error("This does not appear to be a NIFTI file!");
                this.dim_info = e.Utils.getByteAt(a, 39);
                for (d = 0; 8 > d; d += 1) b = 40 + 2 * d, this.dims[d] = e.Utils.getShortAt(a, b, this.littleEndian);
                this.intent_p1 = e.Utils.getFloatAt(a, 56, this.littleEndian);
                this.intent_p2 = e.Utils.getFloatAt(a, 60, this.littleEndian);
                this.intent_p3 = e.Utils.getFloatAt(a, 64, this.littleEndian);
                this.intent_code = e.Utils.getShortAt(a, 68, this.littleEndian);
                this.datatypeCode = e.Utils.getShortAt(a, 70, this.littleEndian);
                this.numBitsPerVoxel = e.Utils.getShortAt(a, 72, this.littleEndian);
                this.slice_start = e.Utils.getShortAt(a,
                    74, this.littleEndian);
                for (d = 0; 8 > d; d += 1) b = 76 + 4 * d, this.pixDims[d] = e.Utils.getFloatAt(a, b, this.littleEndian);
                this.vox_offset = e.Utils.getFloatAt(a, 108, this.littleEndian);
                this.scl_slope = e.Utils.getFloatAt(a, 112, this.littleEndian);
                this.scl_inter = e.Utils.getFloatAt(a, 116, this.littleEndian);
                this.slice_end = e.Utils.getShortAt(a, 120, this.littleEndian);
                this.slice_code = e.Utils.getByteAt(a, 122);
                this.xyzt_units = e.Utils.getByteAt(a, 123);
                this.cal_max = e.Utils.getFloatAt(a, 124, this.littleEndian);
                this.cal_min = e.Utils.getFloatAt(a,
                    128, this.littleEndian);
                this.slice_duration = e.Utils.getFloatAt(a, 132, this.littleEndian);
                this.toffset = e.Utils.getFloatAt(a, 136, this.littleEndian);
                this.description = e.Utils.getStringAt(a, 148, 228);
                this.aux_file = e.Utils.getStringAt(a, 228, 252);
                this.qform_code = e.Utils.getShortAt(a, 252, this.littleEndian);
                this.sform_code = e.Utils.getShortAt(a, 254, this.littleEndian);
                this.quatern_b = e.Utils.getFloatAt(a, 256, this.littleEndian);
                this.quatern_c = e.Utils.getFloatAt(a, 260, this.littleEndian);
                this.quatern_d = e.Utils.getFloatAt(a,
                    264, this.littleEndian);
                this.qoffset_x = e.Utils.getFloatAt(a, 268, this.littleEndian);
                this.qoffset_y = e.Utils.getFloatAt(a, 272, this.littleEndian);
                this.qoffset_z = e.Utils.getFloatAt(a, 276, this.littleEndian);
                for (d = 0; 3 > d; d += 1)
                    for (l = 0; 4 > l; l += 1) b = 280 + 4 * (4 * d + l), this.affine[d][l] = e.Utils.getFloatAt(a, b, this.littleEndian);
                this.affine[3][0] = 0;
                this.affine[3][1] = 0;
                this.affine[3][2] = 0;
                this.affine[3][3] = 1;
                this.intent_name = e.Utils.getStringAt(a, 328, 344);
                this.magic = e.Utils.getStringAt(a, 344, 348);
                this.isHDR = this.magic ===
                    e.NIFTI1.MAGIC_NUMBER2;
                a.byteLength > e.NIFTI1.MAGIC_COOKIE && (this.extensionFlag[0] = e.Utils.getByteAt(a, 348), this.extensionFlag[1] = e.Utils.getByteAt(a, 349), this.extensionFlag[2] = e.Utils.getByteAt(a, 350), this.extensionFlag[3] = e.Utils.getByteAt(a, 351), this.extensionFlag[0] && (this.extensionSize = this.getExtensionSize(a), this.extensionCode = this.getExtensionCode(a)))
            };
            e.NIFTI1.prototype.toFormattedString = function() {
                var a = e.Utils.formatNumber,
                    b;
                b = "" + ("Dim Info = " + this.dim_info + "\n");
                b += "Image Dimensions (1-8): " +
                    this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] + ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7] + "\n";
                b += "Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3 + "\n";
                b += "Intent Code = " + this.intent_code + "\n";
                b += "Datatype = " + this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode) + ")\n";
                b += "Bits Per Voxel = " + this.numBitsPerVoxel + "\n";
                b += "Slice Start = " + this.slice_start + "\n";
                b += "Voxel Dimensions (1-8): " + a(this.pixDims[0]) +
                    ", " + a(this.pixDims[1]) + ", " + a(this.pixDims[2]) + ", " + a(this.pixDims[3]) + ", " + a(this.pixDims[4]) + ", " + a(this.pixDims[5]) + ", " + a(this.pixDims[6]) + ", " + a(this.pixDims[7]) + "\n";
                b += "Image Offset = " + this.vox_offset + "\n";
                b += "Data Scale:  Slope = " + a(this.scl_slope) + "  Intercept = " + a(this.scl_inter) + "\n";
                b += "Slice End = " + this.slice_end + "\n";
                b += "Slice Code = " + this.slice_code + "\n";
                b += "Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(e.NIFTI1.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(e.NIFTI1.TEMPORAL_UNITS_MASK &
                    this.xyzt_units) + ")\n";
                b += "Display Range:  Max = " + a(this.cal_max) + "  Min = " + a(this.cal_min) + "\n";
                b += "Slice Duration = " + this.slice_duration + "\n";
                b += "Time Axis Shift = " + this.toffset + "\n";
                b += 'Description: "' + this.description + '"\n';
                b += 'Auxiliary File: "' + this.aux_file + '"\n';
                b += "Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code) + ")\n";
                b += "S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code) + ")\n";
                b += "Quaternion Parameters:  b = " + a(this.quatern_b) +
                    "  c = " + a(this.quatern_c) + "  d = " + a(this.quatern_d) + "\n";
                b += "Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z + "\n";
                b += "S-Form Parameters X: " + a(this.affine[0][0]) + ", " + a(this.affine[0][1]) + ", " + a(this.affine[0][2]) + ", " + a(this.affine[0][3]) + "\n";
                b += "S-Form Parameters Y: " + a(this.affine[1][0]) + ", " + a(this.affine[1][1]) + ", " + a(this.affine[1][2]) + ", " + a(this.affine[1][3]) + "\n";
                b += "S-Form Parameters Z: " + a(this.affine[2][0]) + ", " + a(this.affine[2][1]) + ", " + a(this.affine[2][2]) +
                    ", " + a(this.affine[2][3]) + "\n";
                b += 'Intent Name: "' + this.intent_name + '"\n';
                this.extensionFlag[0] && (b += "Extension: Size = " + this.extensionSize + "  Code = " + this.extensionCode + "\n");
                return b
            };
            e.NIFTI1.prototype.getDatatypeCodeString = function(a) {
                return a === e.NIFTI1.TYPE_UINT8 ? "1-Byte Unsigned Integer" : a === e.NIFTI1.TYPE_INT16 ? "2-Byte Signed Integer" : a === e.NIFTI1.TYPE_INT32 ? "4-Byte Signed Integer" : a === e.NIFTI1.TYPE_FLOAT32 ? "4-Byte Float" : a === e.NIFTI1.TYPE_FLOAT64 ? "8-Byte Float" : a === e.NIFTI1.TYPE_RGB24 ? "RGB" :
                    a === e.NIFTI1.TYPE_INT8 ? "1-Byte Signed Integer" : a === e.NIFTI1.TYPE_UINT16 ? "2-Byte Unsigned Integer" : a === e.NIFTI1.TYPE_UINT32 ? "4-Byte Unsigned Integer" : a === e.NIFTI1.TYPE_INT64 ? "8-Byte Signed Integer" : a === e.NIFTI1.TYPE_UINT64 ? "8-Byte Unsigned Integer" : "Unknown"
            };
            e.NIFTI1.prototype.getTransformCodeString = function(a) {
                return a === e.NIFTI1.XFORM_SCANNER_ANAT ? "Scanner" : a === e.NIFTI1.XFORM_ALIGNED_ANAT ? "Aligned" : a === e.NIFTI1.XFORM_TALAIRACH ? "Talairach" : a === e.NIFTI1.XFORM_MNI_152 ? "MNI" : "Unknown"
            };
            e.NIFTI1.prototype.getUnitsCodeString =
                function(a) {
                    return a === e.NIFTI1.UNITS_METER ? "Meters" : a === e.NIFTI1.UNITS_MM ? "Millimeters" : a === e.NIFTI1.UNITS_MICRON ? "Microns" : a === e.NIFTI1.UNITS_SEC ? "Seconds" : a === e.NIFTI1.UNITS_MSEC ? "Milliseconds" : a === e.NIFTI1.UNITS_USEC ? "Microseconds" : a === e.NIFTI1.UNITS_HZ ? "Hz" : a === e.NIFTI1.UNITS_PPM ? "PPM" : a === e.NIFTI1.UNITS_RADS ? "Rads" : "Unknown"
                };
            e.NIFTI1.prototype.getQformMat = function() {
                return this.convertNiftiQFormToNiftiSForm(this.quatern_b, this.quatern_c, this.quatern_d, this.qoffset_x, this.qoffset_y, this.qoffset_z,
                    this.pixDims[1], this.pixDims[2], this.pixDims[3], this.pixDims[0])
            };
            e.NIFTI1.prototype.convertNiftiQFormToNiftiSForm = function(a, b, d, e, k, p, r, u, z, y) {
                var x = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    D = d;
                x[3][0] = x[3][1] = x[3][2] = 0;
                x[3][3] = 1;
                d = 1 - (a * a + b * b + D * D);
                1E-7 > d ? (d = 1 / Math.sqrt(a * a + b * b + D * D), a *= d, b *= d, D *= d, d = 0) : d = Math.sqrt(d);
                r = 0 < r ? r : 1;
                u = 0 < u ? u : 1;
                z = 0 < z ? z : 1;
                0 > y && (z = -z);
                x[0][0] = (d * d + a * a - b * b - D * D) * r;
                x[0][1] = 2 * (a * b - d * D) * u;
                x[0][2] = 2 * (a * D + d * b) * z;
                x[1][0] = 2 * (a * b + d * D) * r;
                x[1][1] = (d * d + b * b - a * a - D * D) * u;
                x[1][2] = 2 * (b * D - d *
                    a) * z;
                x[2][0] = 2 * (a * D - d * b) * r;
                x[2][1] = 2 * (b * D + d * a) * u;
                x[2][2] = (d * d + D * D - b * b - a * a) * z;
                x[0][3] = e;
                x[1][3] = k;
                x[2][3] = p;
                return x
            };
            e.NIFTI1.prototype.convertNiftiSFormToNEMA = function(a) {
                var b, d, e, k, p, r, u, z, y, x, D, B, w, L, C, I;
                C = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ];
                I = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ];
                b = a[0][0];
                d = a[0][1];
                e = a[0][2];
                k = a[1][0];
                p = a[1][1];
                r = a[1][2];
                u = a[2][0];
                z = a[2][1];
                y = a[2][2];
                a = Math.sqrt(b * b + k * k + u * u);
                if (0 === a) return null;
                b /= a;
                k /= a;
                u /= a;
                a = Math.sqrt(d * d + p * p + z * z);
                if (0 === a) return null;
                d /= a;
                p /= a;
                z /= a;
                a = b * d + k * p + u * z;
                if (1E-4 < Math.abs(a)) {
                    d -=
                        a * b;
                    p -= a * k;
                    z -= a * u;
                    a = Math.sqrt(d * d + p * p + z * z);
                    if (0 === a) return null;
                    d /= a;
                    p /= a;
                    z /= a
                }
                a = Math.sqrt(e * e + r * r + y * y);
                0 === a ? (e = k * z - u * p, r = u * d - z * b, y = b * p - k * d) : (e /= a, r /= a, y /= a);
                a = b * e + k * r + u * y;
                if (1E-4 < Math.abs(a)) {
                    e -= a * b;
                    r -= a * k;
                    y -= a * u;
                    a = Math.sqrt(e * e + r * r + y * y);
                    if (0 === a) return null;
                    e /= a;
                    r /= a;
                    y /= a
                }
                a = d * e + p * r + z * y;
                if (1E-4 < Math.abs(a)) {
                    e -= a * d;
                    r -= a * p;
                    y -= a * z;
                    a = Math.sqrt(e * e + r * r + y * y);
                    if (0 === a) return null;
                    e /= a;
                    r /= a;
                    y /= a
                }
                C[0][0] = b;
                C[0][1] = d;
                C[0][2] = e;
                C[1][0] = k;
                C[1][1] = p;
                C[1][2] = r;
                C[2][0] = u;
                C[2][1] = z;
                C[2][2] = y;
                u = this.nifti_mat33_determ(C);
                if (0 === u) return null;
                L = -666;
                b = k = p = r = 1;
                d = 2;
                e = 3;
                for (z = 1; 3 >= z; z += 1)
                    for (y = 1; 3 >= y; y += 1)
                        if (z !== y)
                            for (x = 1; 3 >= x; x += 1)
                                if (z !== x && y !== x)
                                    for (I[0][0] = I[0][1] = I[0][2] = I[1][0] = I[1][1] = I[1][2] = I[2][0] = I[2][1] = I[2][2] = 0, D = -1; 1 >= D; D += 2)
                                        for (B = -1; 1 >= B; B += 2)
                                            for (w = -1; 1 >= w; w += 2) I[0][z - 1] = D, I[1][y - 1] = B, I[2][x - 1] = w, a = this.nifti_mat33_determ(I), 0 < a * u && (a = this.nifti_mat33_mul(I, C), a = a[0][0] + a[1][1] + a[2][2], a > L && (L = a, b = z, d = y, e = x, k = D, p = B, r = w));
                C = I = a = u = z = y = 0;
                switch (b * k) {
                    case 1:
                        C = "X";
                        u = "+";
                        break;
                    case -1:
                        C = "X";
                        u = "-";
                        break;
                    case 2:
                        C =
                            "Y";
                        u = "+";
                        break;
                    case -2:
                        C = "Y";
                        u = "-";
                        break;
                    case 3:
                        C = "Z";
                        u = "+";
                        break;
                    case -3:
                        C = "Z", u = "-"
                }
                switch (d * p) {
                    case 1:
                        I = "X";
                        z = "+";
                        break;
                    case -1:
                        I = "X";
                        z = "-";
                        break;
                    case 2:
                        I = "Y";
                        z = "+";
                        break;
                    case -2:
                        I = "Y";
                        z = "-";
                        break;
                    case 3:
                        I = "Z";
                        z = "+";
                        break;
                    case -3:
                        I = "Z", z = "-"
                }
                switch (e * r) {
                    case 1:
                        a = "X";
                        y = "+";
                        break;
                    case -1:
                        a = "X";
                        y = "-";
                        break;
                    case 2:
                        a = "Y";
                        y = "+";
                        break;
                    case -2:
                        a = "Y";
                        y = "-";
                        break;
                    case 3:
                        a = "Z";
                        y = "+";
                        break;
                    case -3:
                        a = "Z", y = "-"
                }
                return C + I + a + u + z + y
            };
            e.NIFTI1.prototype.nifti_mat33_mul = function(a, b) {
                var d = [
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0,
                            0
                        ]
                    ],
                    e, k;
                for (e = 0; 3 > e; e += 1)
                    for (k = 0; 3 > k; k += 1) d[e][k] = a[e][0] * b[0][k] + a[e][1] * b[1][k] + a[e][2] * b[2][k];
                return d
            };
            e.NIFTI1.prototype.nifti_mat33_determ = function(a) {
                var b, d, e, k, p, r, u, z;
                b = a[0][0];
                d = a[0][1];
                e = a[0][2];
                k = a[1][0];
                p = a[1][1];
                r = a[1][2];
                u = a[2][0];
                z = a[2][1];
                a = a[2][2];
                return b * p * a - b * z * r - k * d * a + k * z * e + u * d * r - u * p * e
            };
            e.NIFTI1.prototype.getExtensionLocation = function() {
                return e.NIFTI1.MAGIC_COOKIE + 4
            };
            e.NIFTI1.prototype.getExtensionSize = function(a) {
                return e.Utils.getIntAt(a, this.getExtensionLocation(), this.littleEndian)
            };
            e.NIFTI1.prototype.getExtensionCode = function(a) {
                return e.Utils.getIntAt(a, this.getExtensionLocation() + 4, this.littleEndian)
            };
            "undefined" !== typeof d && d.exports && (d.exports = e.NIFTI1)
        }, {
            "./utilities.js": 20
        }],
        19: [function(a, d, b) {
            var e = e || {};
            e.Utils = e.Utils || ("undefined" !== typeof a ? a("./utilities.js") : null);
            e.NIFTI1 = e.NIFTI1 || ("undefined" !== typeof a ? a("./nifti1.js") : null);
            e.NIFTI2 = e.NIFTI2 || function() {
                this.littleEndian = !1;
                this.dim_info = 0;
                this.dims = [];
                this.slice_code = this.slice_end = this.slice_start = this.numBitsPerVoxel =
                    this.datatypeCode = this.intent_code = this.intent_p3 = this.intent_p2 = this.intent_p1 = 0;
                this.pixDims = [];
                this.vox_offset = 0;
                this.scl_slope = 1;
                this.toffset = this.slice_duration = this.cal_min = this.cal_max = this.xyzt_units = this.scl_inter = 0;
                this.intent_name = this.aux_file = this.description = "";
                this.qoffset_z = this.qoffset_y = this.qoffset_x = this.quatern_d = this.quatern_c = this.quatern_b = this.sform_code = this.qform_code = 0;
                this.affine = [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]
                ];
                this.magic = 0;
                this.extensionFlag = [0, 0, 0, 0]
            };
            e.NIFTI2.MAGIC_COOKIE =
                540;
            e.NIFTI2.MAGIC_NUMBER_LOCATION = 4;
            e.NIFTI2.MAGIC_NUMBER = [110, 43, 50, 0, 13, 10, 26, 10];
            e.NIFTI2.prototype.readHeader = function(a) {
                a = new DataView(a);
                var b = e.Utils.getIntAt(a, 0, this.littleEndian),
                    d, l;
                b !== e.NIFTI2.MAGIC_COOKIE && (this.littleEndian = !0, b = e.Utils.getIntAt(a, 0, this.littleEndian));
                if (b !== e.NIFTI2.MAGIC_COOKIE) throw Error("This does not appear to be a NIFTI file!");
                this.datatypeCode = e.Utils.getShortAt(a, 12, this.littleEndian);
                this.numBitsPerVoxel = e.Utils.getShortAt(a, 14, this.littleEndian);
                for (d =
                    0; 8 > d; d += 1) b = 16 + 8 * d, this.dims[d] = e.Utils.getLongAt(a, b, this.littleEndian);
                this.intent_p1 = e.Utils.getDoubleAt(a, 80, this.littleEndian);
                this.intent_p2 = e.Utils.getDoubleAt(a, 88, this.littleEndian);
                this.intent_p3 = e.Utils.getDoubleAt(a, 96, this.littleEndian);
                for (d = 0; 8 > d; d += 1) b = 104 + 8 * d, this.pixDims[d] = e.Utils.getDoubleAt(a, b, this.littleEndian);
                this.vox_offset = e.Utils.getLongAt(a, 168, this.littleEndian);
                this.scl_slope = e.Utils.getDoubleAt(a, 176, this.littleEndian);
                this.scl_inter = e.Utils.getDoubleAt(a, 184, this.littleEndian);
                this.cal_max = e.Utils.getDoubleAt(a, 192, this.littleEndian);
                this.cal_min = e.Utils.getDoubleAt(a, 200, this.littleEndian);
                this.slice_duration = e.Utils.getDoubleAt(a, 208, this.littleEndian);
                this.toffset = e.Utils.getDoubleAt(a, 216, this.littleEndian);
                this.slice_start = e.Utils.getLongAt(a, 224, this.littleEndian);
                this.slice_end = e.Utils.getLongAt(a, 232, this.littleEndian);
                this.description = e.Utils.getStringAt(a, 240, 320);
                this.aux_file = e.Utils.getStringAt(a, 320, 344);
                this.qform_code = e.Utils.getIntAt(a, 344, this.littleEndian);
                this.sform_code = e.Utils.getIntAt(a, 348, this.littleEndian);
                this.quatern_b = e.Utils.getDoubleAt(a, 352, this.littleEndian);
                this.quatern_c = e.Utils.getDoubleAt(a, 360, this.littleEndian);
                this.quatern_d = e.Utils.getDoubleAt(a, 368, this.littleEndian);
                this.qoffset_x = e.Utils.getDoubleAt(a, 376, this.littleEndian);
                this.qoffset_y = e.Utils.getDoubleAt(a, 384, this.littleEndian);
                this.qoffset_z = e.Utils.getDoubleAt(a, 392, this.littleEndian);
                for (d = 0; 3 > d; d += 1)
                    for (l = 0; 4 > l; l += 1) b = 400 + 8 * (4 * d + l), this.affine[d][l] = e.Utils.getDoubleAt(a,
                        b, this.littleEndian);
                this.affine[3][0] = 0;
                this.affine[3][1] = 0;
                this.affine[3][2] = 0;
                this.affine[3][3] = 1;
                this.slice_code = e.Utils.getIntAt(a, 496, this.littleEndian);
                this.xyzt_units = e.Utils.getIntAt(a, 500, this.littleEndian);
                this.intent_code = e.Utils.getIntAt(a, 504, this.littleEndian);
                this.intent_name = e.Utils.getStringAt(a, 508, 524);
                this.dim_info = e.Utils.getByteAt(a, 524);
                a.byteLength > e.NIFTI2.MAGIC_COOKIE && (this.extensionFlag[0] = e.Utils.getByteAt(a, 540), this.extensionFlag[1] = e.Utils.getByteAt(a, 541), this.extensionFlag[2] =
                    e.Utils.getByteAt(a, 542), this.extensionFlag[3] = e.Utils.getByteAt(a, 543), this.extensionFlag[0] && (this.extensionSize = this.getExtensionSize(a), this.extensionCode = this.getExtensionCode(a)))
            };
            e.NIFTI2.prototype.toFormattedString = function() {
                var a = e.Utils.formatNumber,
                    b;
                b = "" + ("Datatype = " + +this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode) + ")\n");
                b += "Bits Per Voxel =  = " + this.numBitsPerVoxel + "\n";
                b += "Image Dimensions (1-8): " + this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] +
                    ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7] + "\n";
                b += "Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3 + "\n";
                b += "Voxel Dimensions (1-8): " + a(this.pixDims[0]) + ", " + a(this.pixDims[1]) + ", " + a(this.pixDims[2]) + ", " + a(this.pixDims[3]) + ", " + a(this.pixDims[4]) + ", " + a(this.pixDims[5]) + ", " + a(this.pixDims[6]) + ", " + a(this.pixDims[7]) + "\n";
                b += "Image Offset = " + this.vox_offset + "\n";
                b += "Data Scale:  Slope = " + a(this.scl_slope) + "  Intercept = " + a(this.scl_inter) +
                    "\n";
                b += "Display Range:  Max = " + a(this.cal_max) + "  Min = " + a(this.cal_min) + "\n";
                b += "Slice Duration = " + this.slice_duration + "\n";
                b += "Time Axis Shift = " + this.toffset + "\n";
                b += "Slice Start = " + this.slice_start + "\n";
                b += "Slice End = " + this.slice_end + "\n";
                b += 'Description: "' + this.description + '"\n';
                b += 'Auxiliary File: "' + this.aux_file + '"\n';
                b += "Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code) + ")\n";
                b += "S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code) +
                    ")\n";
                b += "Quaternion Parameters:  b = " + a(this.quatern_b) + "  c = " + a(this.quatern_c) + "  d = " + a(this.quatern_d) + "\n";
                b += "Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z + "\n";
                b += "S-Form Parameters X: " + a(this.affine[0][0]) + ", " + a(this.affine[0][1]) + ", " + a(this.affine[0][2]) + ", " + a(this.affine[0][3]) + "\n";
                b += "S-Form Parameters Y: " + a(this.affine[1][0]) + ", " + a(this.affine[1][1]) + ", " + a(this.affine[1][2]) + ", " + a(this.affine[1][3]) + "\n";
                b += "S-Form Parameters Z: " +
                    a(this.affine[2][0]) + ", " + a(this.affine[2][1]) + ", " + a(this.affine[2][2]) + ", " + a(this.affine[2][3]) + "\n";
                b += "Slice Code = " + this.slice_code + "\n";
                b += "Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(e.NIFTI1.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(e.NIFTI1.TEMPORAL_UNITS_MASK & this.xyzt_units) + ")\n";
                b += "Intent Code = " + this.intent_code + "\n";
                b += 'Intent Name: "' + this.intent_name + '"\n';
                return b += "Dim Info = " + this.dim_info + "\n"
            };
            e.NIFTI2.prototype.getExtensionLocation =
                function() {
                    return e.NIFTI2.MAGIC_COOKIE + 4
                };
            e.NIFTI2.prototype.getExtensionSize = e.NIFTI1.prototype.getExtensionSize;
            e.NIFTI2.prototype.getExtensionCode = e.NIFTI1.prototype.getExtensionCode;
            e.NIFTI2.prototype.getDatatypeCodeString = e.NIFTI1.prototype.getDatatypeCodeString;
            e.NIFTI2.prototype.getTransformCodeString = e.NIFTI1.prototype.getTransformCodeString;
            e.NIFTI2.prototype.getUnitsCodeString = e.NIFTI1.prototype.getUnitsCodeString;
            e.NIFTI2.prototype.getQformMat = e.NIFTI1.prototype.getQformMat;
            e.NIFTI2.prototype.convertNiftiQFormToNiftiSForm =
                e.NIFTI1.prototype.convertNiftiQFormToNiftiSForm;
            e.NIFTI2.prototype.convertNiftiSFormToNEMA = e.NIFTI1.prototype.convertNiftiSFormToNEMA;
            e.NIFTI2.prototype.nifti_mat33_mul = e.NIFTI1.prototype.nifti_mat33_mul;
            e.NIFTI2.prototype.nifti_mat33_determ = e.NIFTI1.prototype.nifti_mat33_determ;
            "undefined" !== typeof d && d.exports && (d.exports = e.NIFTI2)
        }, {
            "./nifti1.js": 18,
            "./utilities.js": 20
        }],
        20: [function(a, d, b) {
            var e = e || {};
            e.Utils = e.Utils || {};
            e.Utils.crcTable = null;
            e.Utils.GUNZIP_MAGIC_COOKIE1 = 31;
            e.Utils.GUNZIP_MAGIC_COOKIE2 =
                139;
            e.Utils.getStringAt = function(a, b, d) {
                for (var e = "", k; b < d; b += 1) k = a.getUint8(b), 0 !== k && (e += String.fromCharCode(k));
                return e
            };
            e.Utils.getByteAt = function(a, b) {
                return a.getInt8(b)
            };
            e.Utils.getShortAt = function(a, b, d) {
                return a.getInt16(b, d)
            };
            e.Utils.getIntAt = function(a, b, d) {
                return a.getInt32(b, d)
            };
            e.Utils.getFloatAt = function(a, b, d) {
                return a.getFloat32(b, d)
            };
            e.Utils.getDoubleAt = function(a, b, d) {
                return a.getFloat64(b, d)
            };
            e.Utils.getLongAt = function(a, b, d) {
                var l, k = [],
                    p = 0;
                for (l = 0; 8 > l; l += 1) k[l] = e.Utils.getByteAt(a,
                    b + l, d);
                for (l = k.length - 1; 0 <= l; l--) p = 256 * p + k[l];
                return p
            };
            e.Utils.toArrayBuffer = function(a) {
                var b, d, e;
                b = new ArrayBuffer(a.length);
                d = new Uint8Array(b);
                for (e = 0; e < a.length; e += 1) d[e] = a[e];
                return b
            };
            e.Utils.isString = function(a) {
                return "string" === typeof a || a instanceof String
            };
            e.Utils.formatNumber = function(a, b) {
                var d = 0,
                    d = e.Utils.isString(a) ? Number(a) : a,
                    d = b ? d.toPrecision(5) : d.toPrecision(7);
                return parseFloat(d)
            };
            e.Utils.makeCRCTable = function() {
                for (var a, b = [], d = 0; 256 > d; d++) {
                    a = d;
                    for (var e = 0; 8 > e; e++) a = a & 1 ? 3988292384 ^
                        a >>> 1 : a >>> 1;
                    b[d] = a
                }
                return b
            };
            e.Utils.crc32 = function(a) {
                for (var b = e.Utils.crcTable || (e.Utils.crcTable = e.Utils.makeCRCTable()), d = -1, l = 0; l < a.byteLength; l++) d = d >>> 8 ^ b[(d ^ a.getUint8(l)) & 255];
                return (d ^ -1) >>> 0
            };
            "undefined" !== typeof d && d.exports && (d.exports = e.Utils)
        }, {}]
    }, {}, [17])(17)
});
(function(c) {
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = c() : "function" === typeof define && define.amd ? define([], c) : ("undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this).gifti = c()
})(function() {
    return function a(d, b, e) {
        function g(f, k) {
            if (!b[f]) {
                if (!d[f]) {
                    var p = "function" == typeof require && require;
                    if (!k && p) return p(f, !0);
                    if (h) return h(f, !0);
                    p = Error("Cannot find module '" + f + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                p = b[f] = {
                    exports: {}
                };
                d[f][0].call(p.exports, function(a) {
                    var b = d[f][1][a];
                    return g(b ? b : a)
                }, p, p.exports, a, d, b, e)
            }
            return b[f].exports
        }
        for (var h = "function" == typeof require && require, f = 0; f < e.length; f++) g(e[f]);
        return g
    }({
        1: [function(a, d, b) {
            a = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                decodeArrayBuffer: function(a) {
                    var b = this._keyStr.indexOf(a.charAt(a.length - 1)),
                        d = this._keyStr.indexOf(a.charAt(a.length - 2)),
                        f = a.length / 4 * 3;
                    64 == b && f--;
                    64 == d && f--;
                    b = new ArrayBuffer(f);
                    this.decode(a, b, f);
                    return b
                },
                decode: function(a, b, d) {
                    var f, l, k, p, r, u = 0,
                        z = 0;
                    b = b ? new Uint8Array(b) : new Uint8Array(d);
                    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    for (u = 0; u < d; u += 3) f = this._keyStr.indexOf(a.charAt(z++)), l = this._keyStr.indexOf(a.charAt(z++)), p = this._keyStr.indexOf(a.charAt(z++)), r = this._keyStr.indexOf(a.charAt(z++)), f = f << 2 | l >> 4, l = (l & 15) << 4 | p >> 2, k = (p & 3) << 6 | r, b[u] = f, 64 != p && (b[u + 1] = l), 64 != r && (b[u + 2] = k);
                    return b
                }
            };
            "undefined" !== typeof d && d.exports && (d.exports = a)
        }, {}],
        2: [function(a, d, b) {}, {}],
        3: [function(a, d, b) {
            (function(d) {
                function g() {
                    try {
                        var a =
                            new Uint8Array(1);
                        a.foo = function() {
                            return 42
                        };
                        return 42 === a.foo() && "function" === typeof a.subarray && 0 === a.subarray(1, 1).byteLength
                    } catch (b) {
                        return !1
                    }
                }

                function h(a) {
                    if (!(this instanceof h)) return 1 < arguments.length ? new h(a, arguments[1]) : new h(a);
                    h.TYPED_ARRAY_SUPPORT || (this.length = 0, this.parent = void 0);
                    if ("number" === typeof a) {
                        var b;
                        b = k(this, 0 > a ? 0 : p(a) | 0);
                        if (!h.TYPED_ARRAY_SUPPORT)
                            for (var d = 0; d < a; d++) b[d] = 0;
                        return b
                    }
                    if ("string" === typeof a) {
                        b = this;
                        d = 1 < arguments.length ? arguments[1] : "utf8";
                        if ("string" !==
                            typeof d || "" === d) d = "utf8";
                        var e = u(a, d) | 0;
                        b = k(b, e);
                        b.write(a, d);
                        return b
                    }
                    return f(this, a)
                }

                function f(a, b) {
                    if (h.isBuffer(b)) {
                        var d = a,
                            e = p(b.length) | 0,
                            d = k(d, e);
                        b.copy(d, 0, 0, e);
                        return d
                    }
                    if (n(b)) {
                        for (var d = a, e = p(b.length) | 0, d = k(d, e), f = 0; f < e; f += 1) d[f] = b[f] & 255;
                        return d
                    }
                    if (null == b) throw new TypeError("must start with number, buffer, array or string");
                    if ("undefined" !== typeof ArrayBuffer) {
                        if (b.buffer instanceof ArrayBuffer) return l(a, b);
                        if (b instanceof ArrayBuffer) return d = a, b.byteLength, h.TYPED_ARRAY_SUPPORT ?
                            (d = new Uint8Array(b), d.__proto__ = h.prototype) : d = l(d, new Uint8Array(b)), d
                    }
                    if (b.length) {
                        d = a;
                        e = p(b.length) | 0;
                        d = k(d, e);
                        for (f = 0; f < e; f += 1) d[f] = b[f] & 255;
                        return d
                    }
                    d = a;
                    f = 0;
                    "Buffer" === b.type && n(b.data) && (e = b.data, f = p(e.length) | 0);
                    for (var d = k(d, f), g = 0; g < f; g += 1) d[g] = e[g] & 255;
                    return d
                }

                function l(a, b) {
                    var d = p(b.length) | 0;
                    a = k(a, d);
                    for (var e = 0; e < d; e += 1) a[e] = b[e] & 255;
                    return a
                }

                function k(a, b) {
                    h.TYPED_ARRAY_SUPPORT ? (a = new Uint8Array(b), a.__proto__ = h.prototype) : a.length = b;
                    0 !== b && b <= h.poolSize >>> 1 && (a.parent = H);
                    return a
                }

                function p(a) {
                    if (a >= (h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes");
                    return a | 0
                }

                function r(a, b) {
                    if (!(this instanceof r)) return new r(a, b);
                    var d = new h(a, b);
                    delete d.parent;
                    return d
                }

                function u(a, b) {
                    "string" !== typeof a && (a = "" + a);
                    var d = a.length;
                    if (0 === d) return 0;
                    for (var e = !1;;) switch (b) {
                        case "ascii":
                        case "binary":
                        case "raw":
                        case "raws":
                            return d;
                        case "utf8":
                        case "utf-8":
                            return F(a).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * d;
                        case "hex":
                            return d >>> 1;
                        case "base64":
                            return v.toByteArray(M(a)).length;
                        default:
                            if (e) return F(a).length;
                            b = ("" + b).toLowerCase();
                            e = !0
                    }
                }

                function z(a, b, d) {
                    var e = !1;
                    b |= 0;
                    d = void 0 === d || Infinity === d ? this.length : d | 0;
                    a || (a = "utf8");
                    0 > b && (b = 0);
                    d > this.length && (d = this.length);
                    if (d <= b) return "";
                    for (;;) switch (a) {
                        case "hex":
                            a = b;
                            b = this.length;
                            if (!a || 0 > a) a = 0;
                            if (!d || 0 > d || d > b) d = b;
                            for (b = ""; a < d; a++) e = this[a], e = 16 > e ? "0" + e.toString(16) : e.toString(16), b += e;
                            return b;
                        case "utf8":
                        case "utf-8":
                            return y(this, b, d);
                        case "ascii":
                            a = b;
                            b = "";
                            for (d = Math.min(this.length, d); a < d; a++) b += String.fromCharCode(this[a] & 127);
                            return b;
                        case "binary":
                            a = b;
                            b = "";
                            for (d = Math.min(this.length, d); a < d; a++) b += String.fromCharCode(this[a]);
                            return b;
                        case "base64":
                            return a = b, d = 0 === a && d === this.length ? v.fromByteArray(this) : v.fromByteArray(this.slice(a, d)), d;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            d = this.slice(b, d);
                            a = "";
                            for (b = 0; b < d.length; b += 2) a += String.fromCharCode(d[b] + 256 *
                                d[b + 1]);
                            return a;
                        default:
                            if (e) throw new TypeError("Unknown encoding: " + a);
                            a = (a + "").toLowerCase();
                            e = !0
                    }
                }

                function y(a, b, d) {
                    d = Math.min(a.length, d);
                    for (var e = []; b < d;) {
                        var f = a[b],
                            g = null,
                            m = 239 < f ? 4 : 223 < f ? 3 : 191 < f ? 2 : 1;
                        if (b + m <= d) {
                            var h, k, l;
                            switch (m) {
                                case 1:
                                    128 > f && (g = f);
                                    break;
                                case 2:
                                    h = a[b + 1];
                                    128 === (h & 192) && (f = (f & 31) << 6 | h & 63, 127 < f && (g = f));
                                    break;
                                case 3:
                                    h = a[b + 1];
                                    k = a[b + 2];
                                    128 === (h & 192) && 128 === (k & 192) && (f = (f & 15) << 12 | (h & 63) << 6 | k & 63, 2047 < f && (55296 > f || 57343 < f) && (g = f));
                                    break;
                                case 4:
                                    h = a[b + 1], k = a[b + 2], l = a[b + 3], 128 === (h &
                                        192) && 128 === (k & 192) && 128 === (l & 192) && (f = (f & 15) << 18 | (h & 63) << 12 | (k & 63) << 6 | l & 63, 65535 < f && 1114112 > f && (g = f))
                            }
                        }
                        null === g ? (g = 65533, m = 1) : 65535 < g && (g -= 65536, e.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023);
                        e.push(g);
                        b += m
                    }
                    a = e.length;
                    if (a <= J) e = String.fromCharCode.apply(String, e);
                    else {
                        d = "";
                        for (b = 0; b < a;) d += String.fromCharCode.apply(String, e.slice(b, b += J));
                        e = d
                    }
                    return e
                }

                function x(a, b, d) {
                    if (0 !== a % 1 || 0 > a) throw new RangeError("offset is not uint");
                    if (a + b > d) throw new RangeError("Trying to access beyond buffer length");
                }

                function D(a,
                    b, d, e, f, g) {
                    if (!h.isBuffer(a)) throw new TypeError("buffer must be a Buffer instance");
                    if (b > f || b < g) throw new RangeError("value is out of bounds");
                    if (d + e > a.length) throw new RangeError("index out of range");
                }

                function B(a, b, d, e) {
                    0 > b && (b = 65535 + b + 1);
                    for (var f = 0, g = Math.min(a.length - d, 2); f < g; f++) a[d + f] = (b & 255 << 8 * (e ? f : 1 - f)) >>> 8 * (e ? f : 1 - f)
                }

                function w(a, b, d, e) {
                    0 > b && (b = 4294967295 + b + 1);
                    for (var f = 0, g = Math.min(a.length - d, 4); f < g; f++) a[d + f] = b >>> 8 * (e ? f : 3 - f) & 255
                }

                function L(a, b, d, e, f, g) {
                    if (d + e > a.length) throw new RangeError("index out of range");
                    if (0 > d) throw new RangeError("index out of range");
                }

                function C(a, b, d, e, f) {
                    f || L(a, b, d, 4, 3.4028234663852886E38, -3.4028234663852886E38);
                    m.write(a, b, d, e, 23, 4);
                    return d + 4
                }

                function I(a, b, d, e, f) {
                    f || L(a, b, d, 8, 1.7976931348623157E308, -1.7976931348623157E308);
                    m.write(a, b, d, e, 52, 8);
                    return d + 8
                }

                function M(a) {
                    a = a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
                    a = a.replace(q, "");
                    if (2 > a.length) return "";
                    for (; 0 !== a.length % 4;) a += "=";
                    return a
                }

                function F(a, b) {
                    b = b || Infinity;
                    for (var d, e = a.length, f = null, g = [], m = 0; m < e; m++) {
                        d = a.charCodeAt(m);
                        if (55295 < d && 57344 > d) {
                            if (!f) {
                                if (56319 < d) {
                                    -1 < (b -= 3) && g.push(239, 191, 189);
                                    continue
                                } else if (m + 1 === e) {
                                    -1 < (b -= 3) && g.push(239, 191, 189);
                                    continue
                                }
                                f = d;
                                continue
                            }
                            if (56320 > d) {
                                -1 < (b -= 3) && g.push(239, 191, 189);
                                f = d;
                                continue
                            }
                            d = (f - 55296 << 10 | d - 56320) + 65536
                        } else f && -1 < (b -= 3) && g.push(239, 191, 189);
                        f = null;
                        if (128 > d) {
                            if (0 > --b) break;
                            g.push(d)
                        } else if (2048 > d) {
                            if (0 > (b -= 2)) break;
                            g.push(d >> 6 | 192, d & 63 | 128)
                        } else if (65536 > d) {
                            if (0 > (b -= 3)) break;
                            g.push(d >> 12 | 224, d >> 6 & 63 | 128, d & 63 | 128)
                        } else if (1114112 > d) {
                            if (0 > (b -= 4)) break;
                            g.push(d >> 18 |
                                240, d >> 12 & 63 | 128, d >> 6 & 63 | 128, d & 63 | 128)
                        } else throw Error("Invalid code point");
                    }
                    return g
                }

                function t(a) {
                    for (var b = [], d = 0; d < a.length; d++) b.push(a.charCodeAt(d) & 255);
                    return b
                }

                function E(a, b, d, e) {
                    for (var f = 0; f < e && !(f + d >= b.length || f >= a.length); f++) b[f + d] = a[f];
                    return f
                }
                var v = a("base64-js"),
                    m = a("ieee754"),
                    n = a("isarray");
                b.Buffer = h;
                b.SlowBuffer = r;
                b.INSPECT_MAX_BYTES = 50;
                h.poolSize = 8192;
                var H = {};
                h.TYPED_ARRAY_SUPPORT = void 0 !== d.TYPED_ARRAY_SUPPORT ? d.TYPED_ARRAY_SUPPORT : g();
                h._augment = function(a) {
                    a.__proto__ =
                        h.prototype;
                    return a
                };
                h.TYPED_ARRAY_SUPPORT ? (h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, "undefined" !== typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
                    value: null,
                    configurable: !0
                })) : (h.prototype.length = void 0, h.prototype.parent = void 0);
                h.isBuffer = function(a) {
                    return !(null == a || !a._isBuffer)
                };
                h.compare = function(a, b) {
                    if (!h.isBuffer(a) || !h.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
                    if (a === b) return 0;
                    for (var d = a.length,
                            e = b.length, f = 0, g = Math.min(d, e); f < g && a[f] === b[f];) ++f;
                    f !== g && (d = a[f], e = b[f]);
                    return d < e ? -1 : e < d ? 1 : 0
                };
                h.isEncoding = function(a) {
                    switch (String(a).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "raw":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                };
                h.concat = function(a, b) {
                    if (!n(a)) throw new TypeError("list argument must be an Array of Buffers.");
                    if (0 === a.length) return new h(0);
                    var d;
                    if (void 0 === b)
                        for (d = b = 0; d < a.length; d++) b +=
                            a[d].length;
                    var e = new h(b),
                        f = 0;
                    for (d = 0; d < a.length; d++) {
                        var g = a[d];
                        g.copy(e, f);
                        f += g.length
                    }
                    return e
                };
                h.byteLength = u;
                h.prototype._isBuffer = !0;
                h.prototype.toString = function() {
                    var a = this.length | 0;
                    return 0 === a ? "" : 0 === arguments.length ? y(this, 0, a) : z.apply(this, arguments)
                };
                h.prototype.equals = function(a) {
                    if (!h.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
                    return this === a ? !0 : 0 === h.compare(this, a)
                };
                h.prototype.inspect = function() {
                    var a = "",
                        d = b.INSPECT_MAX_BYTES;
                    0 < this.length && (a = this.toString("hex",
                        0, d).match(/.{2}/g).join(" "), this.length > d && (a += " ... "));
                    return "<Buffer " + a + ">"
                };
                h.prototype.compare = function(a) {
                    if (!h.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
                    return this === a ? 0 : h.compare(this, a)
                };
                h.prototype.indexOf = function(a, b) {
                    function d(a, b, e) {
                        for (var f = -1, g = 0; e + g < a.length; g++)
                            if (a[e + g] === b[-1 === f ? 0 : g - f]) {
                                if (-1 === f && (f = g), g - f + 1 === b.length) return e + f
                            } else f = -1;
                        return -1
                    }
                    2147483647 < b ? b = 2147483647 : -2147483648 > b && (b = -2147483648);
                    b >>= 0;
                    if (0 === this.length || b >= this.length) return -1;
                    0 > b && (b = Math.max(this.length + b, 0));
                    if ("string" === typeof a) return 0 === a.length ? -1 : String.prototype.indexOf.call(this, a, b);
                    if (h.isBuffer(a)) return d(this, a, b);
                    if ("number" === typeof a) return h.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, a, b) : d(this, [a], b);
                    throw new TypeError("val must be string, number or Buffer");
                };
                h.prototype.write = function(a, b, d, e) {
                    if (void 0 === b) e = "utf8", d = this.length, b = 0;
                    else if (void 0 === d && "string" === typeof b) e = b, d = this.length,
                        b = 0;
                    else if (isFinite(b)) b |= 0, isFinite(d) ? (d |= 0, void 0 === e && (e = "utf8")) : (e = d, d = void 0);
                    else {
                        var f = e;
                        e = b;
                        b = d | 0;
                        d = f
                    }
                    f = this.length - b;
                    if (void 0 === d || d > f) d = f;
                    if (0 < a.length && (0 > d || 0 > b) || b > this.length) throw new RangeError("attempt to write outside buffer bounds");
                    e || (e = "utf8");
                    for (f = !1;;) switch (e) {
                        case "hex":
                            b = Number(b) || 0;
                            e = this.length - b;
                            d ? (d = Number(d), d > e && (d = e)) : d = e;
                            e = a.length;
                            if (0 !== e % 2) throw Error("Invalid hex string");
                            d > e / 2 && (d = e / 2);
                            for (e = 0; e < d; e++) {
                                f = parseInt(a.substr(2 * e, 2), 16);
                                if (isNaN(f)) throw Error("Invalid hex string");
                                this[b + e] = f
                            }
                            return e;
                        case "utf8":
                        case "utf-8":
                            return E(F(a, this.length - b), this, b, d);
                        case "ascii":
                            return E(t(a), this, b, d);
                        case "binary":
                            return E(t(a), this, b, d);
                        case "base64":
                            return E(v.toByteArray(M(a)), this, b, d);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            e = this.length - b;
                            for (var g = void 0, g = f = void 0, m = [], h = 0; h < a.length && !(0 > (e -= 2)); h++) g = a.charCodeAt(h), f = g >> 8, g %= 256, m.push(g), m.push(f);
                            return E(m, this, b, d);
                        default:
                            if (f) throw new TypeError("Unknown encoding: " + e);
                            e = ("" + e).toLowerCase();
                            f = !0
                    }
                };
                h.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var J = 4096;
                h.prototype.slice = function(a, b) {
                    var d = this.length;
                    a = ~~a;
                    b = void 0 === b ? d : ~~b;
                    0 > a ? (a += d, 0 > a && (a = 0)) : a > d && (a = d);
                    0 > b ? (b += d, 0 > b && (b = 0)) : b > d && (b = d);
                    b < a && (b = a);
                    if (h.TYPED_ARRAY_SUPPORT) d = this.subarray(a, b), d.__proto__ = h.prototype;
                    else
                        for (var e = b - a, d = new h(e, void 0), f = 0; f < e; f++) d[f] = this[f + a];
                    d.length && (d.parent = this.parent || this);
                    return d
                };
                h.prototype.readUIntLE = function(a, b, d) {
                    a |= 0;
                    b |= 0;
                    d || x(a, b, this.length);
                    d = this[a];
                    for (var e = 1, f = 0; ++f < b && (e *= 256);) d += this[a + f] * e;
                    return d
                };
                h.prototype.readUIntBE = function(a, b, d) {
                    a |= 0;
                    b |= 0;
                    d || x(a, b, this.length);
                    d = this[a + --b];
                    for (var e = 1; 0 < b && (e *= 256);) d += this[a + --b] * e;
                    return d
                };
                h.prototype.readUInt8 = function(a, b) {
                    b || x(a, 1, this.length);
                    return this[a]
                };
                h.prototype.readUInt16LE = function(a, b) {
                    b || x(a, 2, this.length);
                    return this[a] | this[a + 1] << 8
                };
                h.prototype.readUInt16BE = function(a, b) {
                    b || x(a, 2, this.length);
                    return this[a] << 8 | this[a + 1]
                };
                h.prototype.readUInt32LE =
                    function(a, b) {
                        b || x(a, 4, this.length);
                        return (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + 16777216 * this[a + 3]
                    };
                h.prototype.readUInt32BE = function(a, b) {
                    b || x(a, 4, this.length);
                    return 16777216 * this[a] + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3])
                };
                h.prototype.readIntLE = function(a, b, d) {
                    a |= 0;
                    b |= 0;
                    d || x(a, b, this.length);
                    d = this[a];
                    for (var e = 1, f = 0; ++f < b && (e *= 256);) d += this[a + f] * e;
                    d >= 128 * e && (d -= Math.pow(2, 8 * b));
                    return d
                };
                h.prototype.readIntBE = function(a, b, d) {
                    a |= 0;
                    b |= 0;
                    d || x(a, b, this.length);
                    d = b;
                    for (var e = 1, f = this[a + --d]; 0 < d && (e *=
                            256);) f += this[a + --d] * e;
                    f >= 128 * e && (f -= Math.pow(2, 8 * b));
                    return f
                };
                h.prototype.readInt8 = function(a, b) {
                    b || x(a, 1, this.length);
                    return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
                };
                h.prototype.readInt16LE = function(a, b) {
                    b || x(a, 2, this.length);
                    var d = this[a] | this[a + 1] << 8;
                    return d & 32768 ? d | 4294901760 : d
                };
                h.prototype.readInt16BE = function(a, b) {
                    b || x(a, 2, this.length);
                    var d = this[a + 1] | this[a] << 8;
                    return d & 32768 ? d | 4294901760 : d
                };
                h.prototype.readInt32LE = function(a, b) {
                    b || x(a, 4, this.length);
                    return this[a] | this[a + 1] << 8 | this[a + 2] <<
                        16 | this[a + 3] << 24
                };
                h.prototype.readInt32BE = function(a, b) {
                    b || x(a, 4, this.length);
                    return this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]
                };
                h.prototype.readFloatLE = function(a, b) {
                    b || x(a, 4, this.length);
                    return m.read(this, a, !0, 23, 4)
                };
                h.prototype.readFloatBE = function(a, b) {
                    b || x(a, 4, this.length);
                    return m.read(this, a, !1, 23, 4)
                };
                h.prototype.readDoubleLE = function(a, b) {
                    b || x(a, 8, this.length);
                    return m.read(this, a, !0, 52, 8)
                };
                h.prototype.readDoubleBE = function(a, b) {
                    b || x(a, 8, this.length);
                    return m.read(this, a, !1, 52, 8)
                };
                h.prototype.writeUIntLE = function(a, b, d, e) {
                    a = +a;
                    b |= 0;
                    d |= 0;
                    e || D(this, a, b, d, Math.pow(2, 8 * d), 0);
                    e = 1;
                    var f = 0;
                    for (this[b] = a & 255; ++f < d && (e *= 256);) this[b + f] = a / e & 255;
                    return b + d
                };
                h.prototype.writeUIntBE = function(a, b, d, e) {
                    a = +a;
                    b |= 0;
                    d |= 0;
                    e || D(this, a, b, d, Math.pow(2, 8 * d), 0);
                    e = d - 1;
                    var f = 1;
                    for (this[b + e] = a & 255; 0 <= --e && (f *= 256);) this[b + e] = a / f & 255;
                    return b + d
                };
                h.prototype.writeUInt8 = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 1, 255, 0);
                    h.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
                    this[b] = a & 255;
                    return b + 1
                };
                h.prototype.writeUInt16LE =
                    function(a, b, d) {
                        a = +a;
                        b |= 0;
                        d || D(this, a, b, 2, 65535, 0);
                        h.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) : B(this, a, b, !0);
                        return b + 2
                    };
                h.prototype.writeUInt16BE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 2, 65535, 0);
                    h.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a & 255) : B(this, a, b, !1);
                    return b + 2
                };
                h.prototype.writeUInt32LE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 4, 4294967295, 0);
                    h.TYPED_ARRAY_SUPPORT ? (this[b + 3] = a >>> 24, this[b + 2] = a >>> 16, this[b + 1] = a >>> 8, this[b] = a & 255) : w(this, a, b, !0);
                    return b + 4
                };
                h.prototype.writeUInt32BE =
                    function(a, b, d) {
                        a = +a;
                        b |= 0;
                        d || D(this, a, b, 4, 4294967295, 0);
                        h.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = a & 255) : w(this, a, b, !1);
                        return b + 4
                    };
                h.prototype.writeIntLE = function(a, b, d, e) {
                    a = +a;
                    b |= 0;
                    e || (e = Math.pow(2, 8 * d - 1), D(this, a, b, d, e - 1, -e));
                    e = 0;
                    var f = 1,
                        g = 0 > a ? 1 : 0;
                    for (this[b] = a & 255; ++e < d && (f *= 256);) this[b + e] = (a / f >> 0) - g & 255;
                    return b + d
                };
                h.prototype.writeIntBE = function(a, b, d, e) {
                    a = +a;
                    b |= 0;
                    e || (e = Math.pow(2, 8 * d - 1), D(this, a, b, d, e - 1, -e));
                    e = d - 1;
                    var f = 1,
                        g = 0 > a ? 1 : 0;
                    for (this[b + e] = a & 255; 0 <=
                        --e && (f *= 256);) this[b + e] = (a / f >> 0) - g & 255;
                    return b + d
                };
                h.prototype.writeInt8 = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 1, 127, -128);
                    h.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
                    0 > a && (a = 255 + a + 1);
                    this[b] = a & 255;
                    return b + 1
                };
                h.prototype.writeInt16LE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 2, 32767, -32768);
                    h.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) : B(this, a, b, !0);
                    return b + 2
                };
                h.prototype.writeInt16BE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 2, 32767, -32768);
                    h.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a &
                        255) : B(this, a, b, !1);
                    return b + 2
                };
                h.prototype.writeInt32LE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 4, 2147483647, -2147483648);
                    h.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8, this[b + 2] = a >>> 16, this[b + 3] = a >>> 24) : w(this, a, b, !0);
                    return b + 4
                };
                h.prototype.writeInt32BE = function(a, b, d) {
                    a = +a;
                    b |= 0;
                    d || D(this, a, b, 4, 2147483647, -2147483648);
                    0 > a && (a = 4294967295 + a + 1);
                    h.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16, this[b + 2] = a >>> 8, this[b + 3] = a & 255) : w(this, a, b, !1);
                    return b + 4
                };
                h.prototype.writeFloatLE = function(a,
                    b, d) {
                    return C(this, a, b, !0, d)
                };
                h.prototype.writeFloatBE = function(a, b, d) {
                    return C(this, a, b, !1, d)
                };
                h.prototype.writeDoubleLE = function(a, b, d) {
                    return I(this, a, b, !0, d)
                };
                h.prototype.writeDoubleBE = function(a, b, d) {
                    return I(this, a, b, !1, d)
                };
                h.prototype.copy = function(a, b, d, e) {
                    d || (d = 0);
                    e || 0 === e || (e = this.length);
                    b >= a.length && (b = a.length);
                    b || (b = 0);
                    0 < e && e < d && (e = d);
                    if (e === d || 0 === a.length || 0 === this.length) return 0;
                    if (0 > b) throw new RangeError("targetStart out of bounds");
                    if (0 > d || d >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (0 > e) throw new RangeError("sourceEnd out of bounds");
                    e > this.length && (e = this.length);
                    a.length - b < e - d && (e = a.length - b + d);
                    var f = e - d;
                    if (this === a && d < b && b < e)
                        for (e = f - 1; 0 <= e; e--) a[e + b] = this[e + d];
                    else if (1E3 > f || !h.TYPED_ARRAY_SUPPORT)
                        for (e = 0; e < f; e++) a[e + b] = this[e + d];
                    else Uint8Array.prototype.set.call(a, this.subarray(d, d + f), b);
                    return f
                };
                h.prototype.fill = function(a, b, d) {
                    a || (a = 0);
                    b || (b = 0);
                    d || (d = this.length);
                    if (d < b) throw new RangeError("end < start");
                    if (d !== b && 0 !== this.length) {
                        if (0 > b || b >= this.length) throw new RangeError("start out of bounds");
                        if (0 > d || d > this.length) throw new RangeError("end out of bounds");
                        if ("number" === typeof a)
                            for (; b < d; b++) this[b] = a;
                        else {
                            a = F(a.toString());
                            for (var e = a.length; b < d; b++) this[b] = a[b % e]
                        }
                        return this
                    }
                };
                var q = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
        }, {
            "base64-js": 4,
            ieee754: 5,
            isarray: 6
        }],
        4: [function(a, d, b) {
            (function(a) {
                function b(a) {
                    a = k[a.charCodeAt(0)];
                    return void 0 !== a ? a : -1
                }

                function d(a, b, e) {
                    for (var f = [], g = b; g < e; g +=
                        3) b = (a[g] << 16) + (a[g + 1] << 8) + a[g + 2], f.push(l[b >> 18 & 63] + l[b >> 12 & 63] + l[b >> 6 & 63] + l[b & 63]);
                    return f.join("")
                }
                var f, l = [];
                for (f = 0; 64 > f; f++) l[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [f];
                var k = [];
                for (f = 0; 64 > f; ++f) k["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] = f;
                k[45] = 62;
                k[95] = 63;
                var p = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
                a.toByteArray = function(a) {
                    function d(a) {
                        l[w++] = a
                    }
                    var e, f, h, k, l;
                    if (0 < a.length % 4) throw Error("Invalid string. Length must be a multiple of 4");
                    e = a.length;
                    k = "=" === a.charAt(e - 2) ? 2 : "=" === a.charAt(e - 1) ? 1 : 0;
                    l = new p(3 * a.length / 4 - k);
                    f = 0 < k ? a.length - 4 : a.length;
                    var w = 0;
                    for (e = 0; e < f; e += 4) h = b(a.charAt(e)) << 18 | b(a.charAt(e + 1)) << 12 | b(a.charAt(e + 2)) << 6 | b(a.charAt(e + 3)), d((h & 16711680) >> 16), d((h & 65280) >> 8), d(h & 255);
                    2 === k ? (h = b(a.charAt(e)) << 2 | b(a.charAt(e + 1)) >> 4, d(h & 255)) : 1 === k && (h = b(a.charAt(e)) << 10 | b(a.charAt(e + 1)) << 4 | b(a.charAt(e + 2)) >> 2, d(h >> 8 & 255), d(h & 255));
                    return l
                };
                a.fromByteArray = function(a) {
                    var b, e = a.length % 3,
                        f = "",
                        g = [],
                        k;
                    b = 0;
                    for (k = a.length - e; b < k; b +=
                        16383) g.push(d(a, b, b + 16383 > k ? k : b + 16383));
                    switch (e) {
                        case 1:
                            a = a[a.length - 1];
                            f += l[a >> 2];
                            f += l[a << 4 & 63];
                            f += "==";
                            break;
                        case 2:
                            a = (a[a.length - 2] << 8) + a[a.length - 1], f += l[a >> 10], f += l[a >> 4 & 63], f += l[a << 2 & 63], f += "="
                    }
                    g.push(f);
                    return g.join("")
                }
            })("undefined" === typeof b ? this.base64js = {} : b)
        }, {}],
        5: [function(a, d, b) {
            b.read = function(a, b, d, f, l) {
                var k;
                k = 8 * l - f - 1;
                var p = (1 << k) - 1,
                    r = p >> 1,
                    u = -7;
                l = d ? l - 1 : 0;
                var z = d ? -1 : 1,
                    y = a[b + l];
                l += z;
                d = y & (1 << -u) - 1;
                y >>= -u;
                for (u += k; 0 < u; d = 256 * d + a[b + l], l += z, u -= 8);
                k = d & (1 << -u) - 1;
                d >>= -u;
                for (u += f; 0 < u; k =
                    256 * k + a[b + l], l += z, u -= 8);
                if (0 === d) d = 1 - r;
                else {
                    if (d === p) return k ? NaN : Infinity * (y ? -1 : 1);
                    k += Math.pow(2, f);
                    d -= r
                }
                return (y ? -1 : 1) * k * Math.pow(2, d - f)
            };
            b.write = function(a, b, d, f, l, k) {
                var p, r = 8 * k - l - 1,
                    u = (1 << r) - 1,
                    z = u >> 1,
                    y = 23 === l ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                k = f ? 0 : k - 1;
                var x = f ? 1 : -1,
                    D = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
                b = Math.abs(b);
                isNaN(b) || Infinity === b ? (b = isNaN(b) ? 1 : 0, f = u) : (f = Math.floor(Math.log(b) / Math.LN2), 1 > b * (p = Math.pow(2, -f)) && (f--, p *= 2), b = 1 <= f + z ? b + y / p : b + y * Math.pow(2, 1 - z), 2 <= b * p && (f++, p /= 2), f + z >= u ? (b = 0, f = u) : 1 <= f + z ?
                    (b = (b * p - 1) * Math.pow(2, l), f += z) : (b = b * Math.pow(2, z - 1) * Math.pow(2, l), f = 0));
                for (; 8 <= l; a[d + k] = b & 255, k += x, b /= 256, l -= 8);
                f = f << l | b;
                for (r += l; 0 < r; a[d + k] = f & 255, k += x, f /= 256, r -= 8);
                a[d + k - x] |= 128 * D
            }
        }, {}],
        6: [function(a, d, b) {
            var e = {}.toString;
            d.exports = Array.isArray || function(a) {
                return "[object Array]" == e.call(a)
            }
        }, {}],
        7: [function(a, d, b) {
            function e() {
                this._events = this._events || {};
                this._maxListeners = this._maxListeners || void 0
            }

            function g(a) {
                return "function" === typeof a
            }

            function h(a) {
                return "object" === typeof a && null !== a
            }
            d.exports = e;
            e.EventEmitter = e;
            e.prototype._events = void 0;
            e.prototype._maxListeners = void 0;
            e.defaultMaxListeners = 10;
            e.prototype.setMaxListeners = function(a) {
                if ("number" !== typeof a || 0 > a || isNaN(a)) throw TypeError("n must be a positive number");
                this._maxListeners = a;
                return this
            };
            e.prototype.emit = function(a) {
                var b, d, e, r;
                this._events || (this._events = {});
                if ("error" === a && (!this._events.error || h(this._events.error) && !this._events.error.length)) {
                    b = arguments[1];
                    if (b instanceof Error) throw b;
                    throw TypeError('Uncaught, unspecified "error" event.');
                }
                d = this._events[a];
                if (void 0 === d) return !1;
                if (g(d)) switch (arguments.length) {
                    case 1:
                        d.call(this);
                        break;
                    case 2:
                        d.call(this, arguments[1]);
                        break;
                    case 3:
                        d.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        b = Array.prototype.slice.call(arguments, 1), d.apply(this, b)
                } else if (h(d))
                    for (b = Array.prototype.slice.call(arguments, 1), r = d.slice(), d = r.length, e = 0; e < d; e++) r[e].apply(this, b);
                return !0
            };
            e.prototype.addListener = function(a, b) {
                var d;
                if (!g(b)) throw TypeError("listener must be a function");
                this._events || (this._events = {});
                this._events.newListener && this.emit("newListener", a, g(b.listener) ? b.listener : b);
                this._events[a] ? h(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b;
                h(this._events[a]) && !this._events[a].warned && (d = void 0 !== this._maxListeners ? this._maxListeners : e.defaultMaxListeners) && 0 < d && this._events[a].length > d && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                    this._events[a].length), "function" === typeof console.trace && console.trace());
                return this
            };
            e.prototype.on = e.prototype.addListener;
            e.prototype.once = function(a, b) {
                function d() {
                    this.removeListener(a, d);
                    e || (e = !0, b.apply(this, arguments))
                }
                if (!g(b)) throw TypeError("listener must be a function");
                var e = !1;
                d.listener = b;
                this.on(a, d);
                return this
            };
            e.prototype.removeListener = function(a, b) {
                var d, e, r;
                if (!g(b)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[a]) return this;
                d = this._events[a];
                r = d.length;
                e = -1;
                if (d === b || g(d.listener) && d.listener === b) delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
                else if (h(d)) {
                    for (; 0 < r--;)
                        if (d[r] === b || d[r].listener && d[r].listener === b) {
                            e = r;
                            break
                        } if (0 > e) return this;
                    1 === d.length ? (d.length = 0, delete this._events[a]) : d.splice(e, 1);
                    this._events.removeListener && this.emit("removeListener", a, b)
                }
                return this
            };
            e.prototype.removeAllListeners = function(a) {
                var b;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ?
                    this._events = {} : this._events[a] && delete this._events[a], this;
                if (0 === arguments.length) {
                    for (b in this._events) "removeListener" !== b && this.removeAllListeners(b);
                    this.removeAllListeners("removeListener");
                    this._events = {};
                    return this
                }
                b = this._events[a];
                if (g(b)) this.removeListener(a, b);
                else if (b)
                    for (; b.length;) this.removeListener(a, b[b.length - 1]);
                delete this._events[a];
                return this
            };
            e.prototype.listeners = function(a) {
                return this._events && this._events[a] ? g(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
            };
            e.prototype.listenerCount = function(a) {
                if (this._events) {
                    a = this._events[a];
                    if (g(a)) return 1;
                    if (a) return a.length
                }
                return 0
            };
            e.listenerCount = function(a, b) {
                return a.listenerCount(b)
            }
        }, {}],
        8: [function(a, d, b) {
            d.exports = "function" === typeof Object.create ? function(a, b) {
                a.super_ = b;
                a.prototype = Object.create(b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : function(a, b) {
                a.super_ = b;
                var d = function() {};
                d.prototype = b.prototype;
                a.prototype = new d;
                a.prototype.constructor = a
            }
        }, {}],
        9: [function(a,
            d, b) {
            d.exports = function(a) {
                return !(null == a || !(a._isBuffer || a.constructor && "function" === typeof a.constructor.isBuffer && a.constructor.isBuffer(a)))
            }
        }, {}],
        10: [function(a, d, b) {
            d.exports = Array.isArray || function(a) {
                return "[object Array]" == Object.prototype.toString.call(a)
            }
        }, {}],
        11: [function(a, d, b) {
            function e() {
                k = !1;
                p.length ? l = p.concat(l) : r = -1;
                l.length && g()
            }

            function g() {
                if (!k) {
                    var a = setTimeout(e);
                    k = !0;
                    for (var b = l.length; b;) {
                        p = l;
                        for (l = []; ++r < b;) p && p[r].run();
                        r = -1;
                        b = l.length
                    }
                    p = null;
                    k = !1;
                    clearTimeout(a)
                }
            }

            function h(a,
                b) {
                this.fun = a;
                this.array = b
            }

            function f() {}
            a = d.exports = {};
            var l = [],
                k = !1,
                p, r = -1;
            a.nextTick = function(a) {
                var b = Array(arguments.length - 1);
                if (1 < arguments.length)
                    for (var d = 1; d < arguments.length; d++) b[d - 1] = arguments[d];
                l.push(new h(a, b));
                1 !== l.length || k || setTimeout(g, 0)
            };
            h.prototype.run = function() {
                this.fun.apply(null, this.array)
            };
            a.title = "browser";
            a.browser = !0;
            a.env = {};
            a.argv = [];
            a.version = "";
            a.versions = {};
            a.on = f;
            a.addListener = f;
            a.once = f;
            a.off = f;
            a.removeListener = f;
            a.removeAllListeners = f;
            a.emit = f;
            a.binding = function(a) {
                throw Error("process.binding is not supported");
            };
            a.cwd = function() {
                return "/"
            };
            a.chdir = function(a) {
                throw Error("process.chdir is not supported");
            };
            a.umask = function() {
                return 0
            }
        }, {}],
        12: [function(a, d, b) {
            d.exports = a("./lib/_stream_duplex.js")
        }, {
            "./lib/_stream_duplex.js": 13
        }],
        13: [function(a, d, b) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                l.call(this, a);
                k.call(this, a);
                a && !1 === a.readable && (this.readable = !1);
                a && !1 === a.writable && (this.writable = !1);
                this.allowHalfOpen = !0;
                a && !1 === a.allowHalfOpen && (this.allowHalfOpen = !1);
                this.once("end", g)
            }

            function g() {
                this.allowHalfOpen ||
                    this._writableState.ended || f(h, this)
            }

            function h(a) {
                a.end()
            }
            b = Object.keys || function(a) {
                var b = [],
                    d;
                for (d in a) b.push(d);
                return b
            };
            d.exports = e;
            var f = a("process-nextick-args");
            d = a("core-util-is");
            d.inherits = a("inherits");
            var l = a("./_stream_readable"),
                k = a("./_stream_writable");
            d.inherits(e, l);
            a = b(k.prototype);
            for (d = 0; d < a.length; d++) b = a[d], e.prototype[b] || (e.prototype[b] = k.prototype[b])
        }, {
            "./_stream_readable": 15,
            "./_stream_writable": 17,
            "core-util-is": 18,
            inherits: 8,
            "process-nextick-args": 19
        }],
        14: [function(a,
            d, b) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                g.call(this, a)
            }
            d.exports = e;
            var g = a("./_stream_transform");
            d = a("core-util-is");
            d.inherits = a("inherits");
            d.inherits(e, g);
            e.prototype._transform = function(a, b, d) {
                d(null, a)
            }
        }, {
            "./_stream_transform": 16,
            "core-util-is": 18,
            inherits: 8
        }],
        15: [function(a, d, b) {
            (function(b) {
                function g(b, d) {
                    H = H || a("./_stream_duplex");
                    b = b || {};
                    this.objectMode = !!b.objectMode;
                    d instanceof H && (this.objectMode = this.objectMode || !!b.readableObjectMode);
                    var e = b.highWaterMark,
                        f = this.objectMode ?
                        16 : 16384;
                    this.highWaterMark = e || 0 === e ? e : f;
                    this.highWaterMark = ~~this.highWaterMark;
                    this.buffer = [];
                    this.length = 0;
                    this.pipes = null;
                    this.pipesCount = 0;
                    this.flowing = null;
                    this.reading = this.endEmitted = this.ended = !1;
                    this.sync = !0;
                    this.readableListening = this.emittedReadable = this.needReadable = !1;
                    this.defaultEncoding = b.defaultEncoding || "utf8";
                    this.ranOut = !1;
                    this.awaitDrain = 0;
                    this.readingMore = !1;
                    this.encoding = this.decoder = null;
                    b.encoding && (n || (n = a("string_decoder/").StringDecoder), this.decoder = new n(b.encoding),
                        this.encoding = b.encoding)
                }

                function h(b) {
                    H = H || a("./_stream_duplex");
                    if (!(this instanceof h)) return new h(b);
                    this._readableState = new g(b, this);
                    this.readable = !0;
                    b && "function" === typeof b.read && (this._read = b.read);
                    F.call(this)
                }

                function f(a, b, d, e, f) {
                    var g;
                    g = d;
                    var m = null;
                    M.isBuffer(g) || "string" === typeof g || null === g || void 0 === g || b.objectMode || (m = new TypeError("Invalid non-string/buffer chunk"));
                    (g = m) ? a.emit("error", g): null === d ? (b.reading = !1, b.ended || (b.decoder && (d = b.decoder.end()) && d.length && (b.buffer.push(d),
                        b.length += b.objectMode ? 1 : d.length), b.ended = !0, k(a))) : b.objectMode || d && 0 < d.length ? b.ended && !f ? (d = Error("stream.push() after EOF"), a.emit("error", d)) : b.endEmitted && f ? (d = Error("stream.unshift() after end event"), a.emit("error", d)) : (!b.decoder || f || e || (d = b.decoder.write(d)), f || (b.reading = !1), b.flowing && 0 === b.length && !b.sync ? (a.emit("data", d), a.read(0)) : (b.length += b.objectMode ? 1 : d.length, f ? b.buffer.unshift(d) : b.buffer.push(d), b.needReadable && k(a)), b.readingMore || (b.readingMore = !0, C(r, a, b))) : f || (b.reading = !1);
                    return !b.ended && (b.needReadable || b.length < b.highWaterMark || 0 === b.length)
                }

                function l(a, b) {
                    if (0 === b.length && b.ended) return 0;
                    if (b.objectMode) return 0 === a ? 0 : 1;
                    if (null === a || isNaN(a)) return b.flowing && b.buffer.length ? b.buffer[0].length : b.length;
                    if (0 >= a) return 0;
                    if (a > b.highWaterMark) {
                        var d = a;
                        8388608 <= d ? d = 8388608 : (d--, d |= d >>> 1, d |= d >>> 2, d |= d >>> 4, d |= d >>> 8, d |= d >>> 16, d++);
                        b.highWaterMark = d
                    }
                    if (a > b.length) {
                        if (b.ended) return b.length;
                        b.needReadable = !0;
                        return 0
                    }
                    return a
                }

                function k(a) {
                    var b = a._readableState;
                    b.needReadable = !1;
                    b.emittedReadable || (m("emitReadable", b.flowing), b.emittedReadable = !0, b.sync ? C(p, a) : p(a))
                }

                function p(a) {
                    m("emit readable");
                    a.emit("readable");
                    x(a)
                }

                function r(a, b) {
                    for (var d = b.length; !b.reading && !b.flowing && !b.ended && b.length < b.highWaterMark && (m("maybeReadMore read 0"), a.read(0), d !== b.length);) d = b.length;
                    b.readingMore = !1
                }

                function u(a) {
                    return function() {
                        var b = a._readableState;
                        m("pipeOnDrain", b.awaitDrain);
                        b.awaitDrain && b.awaitDrain--;
                        0 === b.awaitDrain && a.listeners("data").length && (b.flowing = !0, x(a))
                    }
                }

                function z(a) {
                    m("readable nexttick read 0");
                    a.read(0)
                }

                function y(a, b) {
                    b.reading || (m("resume read 0"), a.read(0));
                    b.resumeScheduled = !1;
                    a.emit("resume");
                    x(a);
                    b.flowing && !b.reading && a.read(0)
                }

                function x(a) {
                    var b = a._readableState;
                    m("flow", b.flowing);
                    if (b.flowing) {
                        do var d = a.read(); while (null !== d && b.flowing)
                    }
                }

                function D(a, b) {
                    var d = b.buffer,
                        e = b.length,
                        f = !!b.decoder,
                        g = !!b.objectMode;
                    if (0 === d.length) return null;
                    if (0 === e) e = null;
                    else if (g) e = d.shift();
                    else if (!a || a >= e) e = f ? d.join("") : 1 === d.length ? d[0] :
                        M.concat(d, e), d.length = 0;
                    else if (a < d[0].length) g = d[0], e = g.slice(0, a), d[0] = g.slice(a);
                    else if (a === d[0].length) e = d.shift();
                    else
                        for (var e = f ? "" : new M(a), m = 0, h = 0, k = d.length; h < k && m < a; h++) {
                            var g = d[0],
                                l = Math.min(a - m, g.length);
                            f ? e += g.slice(0, l) : g.copy(e, m, 0, l);
                            l < g.length ? d[0] = g.slice(l) : d.shift();
                            m += l
                        }
                    return e
                }

                function B(a) {
                    var b = a._readableState;
                    if (0 < b.length) throw Error("endReadable called on non-empty stream");
                    b.endEmitted || (b.ended = !0, C(w, b, a))
                }

                function w(a, b) {
                    a.endEmitted || 0 !== a.length || (a.endEmitted = !0, b.readable = !1, b.emit("end"))
                }

                function L(a, b) {
                    for (var d = 0, e = a.length; d < e; d++) b(a[d], d)
                }
                d.exports = h;
                var C = a("process-nextick-args"),
                    I = a("isarray"),
                    M = a("buffer").Buffer;
                h.ReadableState = g;
                a("events");
                var F;
                try {
                    F = a("stream")
                } catch (t) {} finally {
                    F || (F = a("events").EventEmitter)
                }
                var M = a("buffer").Buffer,
                    E = a("core-util-is");
                E.inherits = a("inherits");
                var v = a("util"),
                    m;
                m = v && v.debuglog ? v.debuglog("stream") : function() {};
                var n;
                E.inherits(h, F);
                var H;
                h.prototype.push = function(a, b) {
                    var d = this._readableState;
                    d.objectMode ||
                        "string" !== typeof a || (b = b || d.defaultEncoding, b !== d.encoding && (a = new M(a, b), b = ""));
                    return f(this, d, a, b, !1)
                };
                h.prototype.unshift = function(a) {
                    return f(this, this._readableState, a, "", !0)
                };
                h.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                };
                h.prototype.setEncoding = function(b) {
                    n || (n = a("string_decoder/").StringDecoder);
                    this._readableState.decoder = new n(b);
                    this._readableState.encoding = b;
                    return this
                };
                h.prototype.read = function(a) {
                    m("read", a);
                    var b = this._readableState,
                        d = a;
                    if ("number" !== typeof a ||
                        0 < a) b.emittedReadable = !1;
                    if (0 === a && b.needReadable && (b.length >= b.highWaterMark || b.ended)) return m("read: emitReadable", b.length, b.ended), 0 === b.length && b.ended ? B(this) : k(this), null;
                    a = l(a, b);
                    if (0 === a && b.ended) return 0 === b.length && B(this), null;
                    var e = b.needReadable;
                    m("need readable", e);
                    if (0 === b.length || b.length - a < b.highWaterMark) e = !0, m("length less than watermark", e);
                    if (b.ended || b.reading) e = !1, m("reading or ended", e);
                    e && (m("do read"), b.reading = !0, b.sync = !0, 0 === b.length && (b.needReadable = !0), this._read(b.highWaterMark),
                        b.sync = !1);
                    e && !b.reading && (a = l(d, b));
                    e = 0 < a ? D(a, b) : null;
                    null === e && (b.needReadable = !0, a = 0);
                    b.length -= a;
                    0 !== b.length || b.ended || (b.needReadable = !0);
                    d !== a && b.ended && 0 === b.length && B(this);
                    null !== e && this.emit("data", e);
                    return e
                };
                h.prototype._read = function(a) {
                    this.emit("error", Error("not implemented"))
                };
                h.prototype.pipe = function(a, d) {
                    function f(a) {
                        m("onunpipe");
                        a === w && h()
                    }

                    function g() {
                        m("onend");
                        a.end()
                    }

                    function h() {
                        m("cleanup");
                        a.removeListener("close", n);
                        a.removeListener("finish", p);
                        a.removeListener("drain",
                            z);
                        a.removeListener("error", l);
                        a.removeListener("unpipe", f);
                        w.removeListener("end", g);
                        w.removeListener("end", h);
                        w.removeListener("data", k);
                        y = !0;
                        !t.awaitDrain || a._writableState && !a._writableState.needDrain || z()
                    }

                    function k(b) {
                        m("ondata");
                        !1 === a.write(b) && (1 !== t.pipesCount || t.pipes[0] !== a || 1 !== w.listenerCount("data") || y || (m("false write response, pause", w._readableState.awaitDrain), w._readableState.awaitDrain++), w.pause())
                    }

                    function l(b) {
                        m("onerror", b);
                        r();
                        a.removeListener("error", l);
                        0 === a.listeners("error").length &&
                            a.emit("error", b)
                    }

                    function n() {
                        a.removeListener("finish", p);
                        r()
                    }

                    function p() {
                        m("onfinish");
                        a.removeListener("close", n);
                        r()
                    }

                    function r() {
                        m("unpipe");
                        w.unpipe(a)
                    }
                    var w = this,
                        t = this._readableState;
                    switch (t.pipesCount) {
                        case 0:
                            t.pipes = a;
                            break;
                        case 1:
                            t.pipes = [t.pipes, a];
                            break;
                        default:
                            t.pipes.push(a)
                    }
                    t.pipesCount += 1;
                    m("pipe count=%d opts=%j", t.pipesCount, d);
                    var x = d && !1 === d.end || a === b.stdout || a === b.stderr ? h : g;
                    if (t.endEmitted) C(x);
                    else w.once("end", x);
                    a.on("unpipe", f);
                    var z = u(w);
                    a.on("drain", z);
                    var y = !1;
                    w.on("data",
                        k);
                    if (a._events && a._events.error) I(a._events.error) ? a._events.error.unshift(l) : a._events.error = [l, a._events.error];
                    else a.on("error", l);
                    a.once("close", n);
                    a.once("finish", p);
                    a.emit("pipe", w);
                    t.flowing || (m("pipe resume"), w.resume());
                    return a
                };
                h.prototype.unpipe = function(a) {
                    var b = this._readableState;
                    if (0 === b.pipesCount) return this;
                    if (1 === b.pipesCount) {
                        if (a && a !== b.pipes) return this;
                        a || (a = b.pipes);
                        b.pipes = null;
                        b.pipesCount = 0;
                        b.flowing = !1;
                        a && a.emit("unpipe", this);
                        return this
                    }
                    if (!a) {
                        a = b.pipes;
                        var d = b.pipesCount;
                        b.pipes = null;
                        b.pipesCount = 0;
                        b.flowing = !1;
                        for (var e = 0; e < d; e++) a[e].emit("unpipe", this);
                        return this
                    }
                    a: {
                        for (var e = b.pipes, d = 0, f = e.length; d < f; d++)
                            if (e[d] === a) {
                                e = d;
                                break a
                            } e = -1
                    }
                    if (-1 === e) return this;
                    b.pipes.splice(e, 1);
                    --b.pipesCount;
                    1 === b.pipesCount && (b.pipes = b.pipes[0]);
                    a.emit("unpipe", this);
                    return this
                };
                h.prototype.on = function(a, b) {
                    var d = F.prototype.on.call(this, a, b);
                    "data" === a && !1 !== this._readableState.flowing && this.resume();
                    if ("readable" === a && this.readable) {
                        var e = this._readableState;
                        e.readableListening ||
                            (e.readableListening = !0, e.emittedReadable = !1, e.needReadable = !0, e.reading ? e.length && k(this, e) : C(z, this))
                    }
                    return d
                };
                h.prototype.addListener = h.prototype.on;
                h.prototype.resume = function() {
                    var a = this._readableState;
                    a.flowing || (m("resume"), a.flowing = !0, a.resumeScheduled || (a.resumeScheduled = !0, C(y, this, a)));
                    return this
                };
                h.prototype.pause = function() {
                    m("call pause flowing=%j", this._readableState.flowing);
                    !1 !== this._readableState.flowing && (m("pause"), this._readableState.flowing = !1, this.emit("pause"));
                    return this
                };
                h.prototype.wrap = function(a) {
                    var b = this._readableState,
                        d = !1,
                        e = this;
                    a.on("end", function() {
                        m("wrapped end");
                        if (b.decoder && !b.ended) {
                            var a = b.decoder.end();
                            a && a.length && e.push(a)
                        }
                        e.push(null)
                    });
                    a.on("data", function(f) {
                        m("wrapped data");
                        b.decoder && (f = b.decoder.write(f));
                        b.objectMode && (null === f || void 0 === f) || !(b.objectMode || f && f.length) || e.push(f) || (d = !0, a.pause())
                    });
                    for (var f in a) void 0 === this[f] && "function" === typeof a[f] && (this[f] = function(b) {
                        return function() {
                            return a[b].apply(a, arguments)
                        }
                    }(f));
                    L(["error",
                        "close", "destroy", "pause", "resume"
                    ], function(b) {
                        a.on(b, e.emit.bind(e, b))
                    });
                    e._read = function(b) {
                        m("wrapped _read", b);
                        d && (d = !1, a.resume())
                    };
                    return e
                };
                h._fromList = D
            }).call(this, a("_process"))
        }, {
            "./_stream_duplex": 13,
            _process: 11,
            buffer: 3,
            "core-util-is": 18,
            events: 7,
            inherits: 8,
            isarray: 10,
            "process-nextick-args": 19,
            "string_decoder/": 26,
            util: 2
        }],
        16: [function(a, d, b) {
            function e(a) {
                this.afterTransform = function(b, d) {
                    var e;
                    e = a._transformState;
                    e.transforming = !1;
                    var f = e.writecb;
                    f ? (e.writechunk = null, e.writecb = null,
                        null !== d && void 0 !== d && a.push(d), f && f(b), e = a._readableState, e.reading = !1, (e.needReadable || e.length < e.highWaterMark) && a._read(e.highWaterMark), e = void 0) : e = a.emit("error", Error("no writecb in Transform class"));
                    return e
                };
                this.transforming = this.needTransform = !1;
                this.writechunk = this.writecb = null
            }

            function g(a) {
                if (!(this instanceof g)) return new g(a);
                f.call(this, a);
                this._transformState = new e(this);
                var b = this;
                this._readableState.needReadable = !0;
                this._readableState.sync = !1;
                a && ("function" === typeof a.transform &&
                    (this._transform = a.transform), "function" === typeof a.flush && (this._flush = a.flush));
                this.once("prefinish", function() {
                    "function" === typeof this._flush ? this._flush(function(a) {
                        h(b, a)
                    }) : h(b)
                })
            }

            function h(a, b) {
                if (b) return a.emit("error", b);
                var d = a._transformState;
                if (a._writableState.length) throw Error("calling transform done when ws.length != 0");
                if (d.transforming) throw Error("calling transform done when still transforming");
                return a.push(null)
            }
            d.exports = g;
            var f = a("./_stream_duplex");
            d = a("core-util-is");
            d.inherits = a("inherits");
            d.inherits(g, f);
            g.prototype.push = function(a, b) {
                this._transformState.needTransform = !1;
                return f.prototype.push.call(this, a, b)
            };
            g.prototype._transform = function(a, b, d) {
                throw Error("not implemented");
            };
            g.prototype._write = function(a, b, d) {
                var e = this._transformState;
                e.writecb = d;
                e.writechunk = a;
                e.writeencoding = b;
                e.transforming || (a = this._readableState, (e.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark))
            };
            g.prototype._read = function(a) {
                a = this._transformState;
                null !== a.writechunk && a.writecb && !a.transforming ? (a.transforming = !0, this._transform(a.writechunk, a.writeencoding, a.afterTransform)) : a.needTransform = !0
            }
        }, {
            "./_stream_duplex": 13,
            "core-util-is": 18,
            inherits: 8
        }],
        17: [function(a, d, b) {
            function e() {}

            function g(a, b, d) {
                this.chunk = a;
                this.encoding = b;
                this.callback = d;
                this.next = null
            }

            function h(b, d) {
                w = w || a("./_stream_duplex");
                b = b || {};
                this.objectMode = !!b.objectMode;
                d instanceof w && (this.objectMode = this.objectMode || !!b.writableObjectMode);
                var e = b.highWaterMark,
                    f = this.objectMode ?
                    16 : 16384;
                this.highWaterMark = e || 0 === e ? e : f;
                this.highWaterMark = ~~this.highWaterMark;
                this.finished = this.ended = this.ending = this.needDrain = !1;
                this.decodeStrings = !1 !== b.decodeStrings;
                this.defaultEncoding = b.defaultEncoding || "utf8";
                this.length = 0;
                this.writing = !1;
                this.corked = 0;
                this.sync = !0;
                this.bufferProcessing = !1;
                this.onwrite = function(a) {
                    var b = d._writableState,
                        e = b.sync,
                        f = b.writecb;
                    b.writing = !1;
                    b.writecb = null;
                    b.length -= b.writelen;
                    b.writelen = 0;
                    a ? (--b.pendingcb, e ? z(f, a) : f(a), d._writableState.errorEmitted = !0, d.emit("error",
                        a)) : ((a = r(b)) || b.corked || b.bufferProcessing || !b.bufferedRequest || p(d, b), e ? z(k, d, b, a, f) : k(d, b, a, f))
                };
                this.writecb = null;
                this.writelen = 0;
                this.lastBufferedRequest = this.bufferedRequest = null;
                this.pendingcb = 0;
                this.errorEmitted = this.prefinished = !1
            }

            function f(b) {
                w = w || a("./_stream_duplex");
                if (!(this instanceof f || this instanceof w)) return new f(b);
                this._writableState = new h(b, this);
                this.writable = !0;
                b && ("function" === typeof b.write && (this._write = b.write), "function" === typeof b.writev && (this._writev = b.writev));
                D.call(this)
            }

            function l(a, b, d, e, f, g, h) {
                b.writelen = e;
                b.writecb = h;
                b.writing = !0;
                b.sync = !0;
                d ? a._writev(f, b.onwrite) : a._write(f, g, b.onwrite);
                b.sync = !1
            }

            function k(a, b, d, e) {
                !d && 0 === b.length && b.needDrain && (b.needDrain = !1, a.emit("drain"));
                b.pendingcb--;
                e();
                u(a, b)
            }

            function p(a, b) {
                b.bufferProcessing = !0;
                var d = b.bufferedRequest;
                if (a._writev && d && d.next) {
                    for (var e = [], f = []; d;) f.push(d.callback), e.push(d), d = d.next;
                    b.pendingcb++;
                    b.lastBufferedRequest = null;
                    l(a, b, !0, b.length, e, "", function(a) {
                        for (var d = 0; d < f.length; d++) b.pendingcb--,
                            f[d](a)
                    })
                } else {
                    for (; d && (e = d.chunk, l(a, b, !1, b.objectMode ? 1 : e.length, e, d.encoding, d.callback), d = d.next, !b.writing););
                    null === d && (b.lastBufferedRequest = null)
                }
                b.bufferedRequest = d;
                b.bufferProcessing = !1
            }

            function r(a) {
                return a.ending && 0 === a.length && null === a.bufferedRequest && !a.finished && !a.writing
            }

            function u(a, b) {
                var d = r(b);
                d && (0 === b.pendingcb ? (b.prefinished || (b.prefinished = !0, a.emit("prefinish")), b.finished = !0, a.emit("finish")) : b.prefinished || (b.prefinished = !0, a.emit("prefinish")));
                return d
            }
            d.exports = f;
            var z = a("process-nextick-args"),
                y = a("buffer").Buffer;
            f.WritableState = h;
            d = a("core-util-is");
            d.inherits = a("inherits");
            var x = {
                    deprecate: a("util-deprecate")
                },
                D;
            try {
                D = a("stream")
            } catch (B) {} finally {
                D || (D = a("events").EventEmitter)
            }
            y = a("buffer").Buffer;
            d.inherits(f, D);
            var w;
            h.prototype.getBuffer = function() {
                for (var a = this.bufferedRequest, b = []; a;) b.push(a), a = a.next;
                return b
            };
            (function() {
                try {
                    Object.defineProperty(h.prototype, "buffer", {
                        get: x.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
                    })
                } catch (a) {}
            })();
            f.prototype.pipe = function() {
                this.emit("error", Error("Cannot pipe. Not readable."))
            };
            f.prototype.write = function(a, b, d) {
                var f = this._writableState,
                    h = !1;
                "function" === typeof b && (d = b, b = null);
                y.isBuffer(a) ? b = "buffer" : b || (b = f.defaultEncoding);
                "function" !== typeof d && (d = e);
                if (f.ended) f = d, a = Error("write after end"), this.emit("error", a), z(f, a);
                else {
                    var k = d,
                        p = !0;
                    y.isBuffer(a) || "string" === typeof a || null === a || void 0 === a || f.objectMode || (p = new TypeError("Invalid non-string/buffer chunk"), this.emit("error", p), z(k,
                        p), p = !1);
                    p && (f.pendingcb++, h = b, f.objectMode || !1 === f.decodeStrings || "string" !== typeof a || (a = new y(a, h)), y.isBuffer(a) && (h = "buffer"), k = f.objectMode ? 1 : a.length, f.length += k, b = f.length < f.highWaterMark, b || (f.needDrain = !0), f.writing || f.corked ? (k = f.lastBufferedRequest, f.lastBufferedRequest = new g(a, h, d), k ? k.next = f.lastBufferedRequest : f.bufferedRequest = f.lastBufferedRequest) : l(this, f, !1, k, a, h, d), h = b)
                }
                return h
            };
            f.prototype.cork = function() {
                this._writableState.corked++
            };
            f.prototype.uncork = function() {
                var a = this._writableState;
                a.corked && (a.corked--, a.writing || a.corked || a.finished || a.bufferProcessing || !a.bufferedRequest || p(this, a))
            };
            f.prototype.setDefaultEncoding = function(a) {
                "string" === typeof a && (a = a.toLowerCase());
                if (!(-1 < "hex utf8 utf-8 ascii binary base64 ucs2 ucs-2 utf16le utf-16le raw".split(" ").indexOf((a + "").toLowerCase()))) throw new TypeError("Unknown encoding: " + a);
                this._writableState.defaultEncoding = a
            };
            f.prototype._write = function(a, b, d) {
                d(Error("not implemented"))
            };
            f.prototype._writev = null;
            f.prototype.end = function(a,
                b, d) {
                var e = this._writableState;
                "function" === typeof a ? (d = a, b = a = null) : "function" === typeof b && (d = b, b = null);
                null !== a && void 0 !== a && this.write(a, b);
                e.corked && (e.corked = 1, this.uncork());
                if (!e.ending && !e.finished) {
                    a = d;
                    e.ending = !0;
                    u(this, e);
                    if (a)
                        if (e.finished) z(a);
                        else this.once("finish", a);
                    e.ended = !0
                }
            }
        }, {
            "./_stream_duplex": 13,
            buffer: 3,
            "core-util-is": 18,
            events: 7,
            inherits: 8,
            "process-nextick-args": 19,
            "util-deprecate": 20
        }],
        18: [function(a, d, b) {
                (function(a) {
                    b.isArray = function(a) {
                        return Array.isArray ? Array.isArray(a) :
                            "[object Array]" === Object.prototype.toString.call(a)
                    };
                    b.isBoolean = function(a) {
                        return "boolean" === typeof a
                    };
                    b.isNull = function(a) {
                        return null === a
                    };
                    b.isNullOrUndefined = function(a) {
                        return null == a
                    };
                    b.isNumber = function(a) {
                        return "number" === typeof a
                    };
                    b.isString = function(a) {
                        return "string" === typeof a
                    };
                    b.isSymbol = function(a) {
                        return "symbol" === typeof a
                    };
                    b.isUndefined = function(a) {
                        return void 0 === a
                    };
                    b.isRegExp = function(a) {
                        return "[object RegExp]" === Object.prototype.toString.call(a)
                    };
                    b.isObject = function(a) {
                        return "object" ===
                            typeof a && null !== a
                    };
                    b.isDate = function(a) {
                        return "[object Date]" === Object.prototype.toString.call(a)
                    };
                    b.isError = function(a) {
                        return "[object Error]" === Object.prototype.toString.call(a) || a instanceof Error
                    };
                    b.isFunction = function(a) {
                        return "function" === typeof a
                    };
                    b.isPrimitive = function(a) {
                        return null === a || "boolean" === typeof a || "number" === typeof a || "string" === typeof a || "symbol" === typeof a || "undefined" === typeof a
                    };
                    b.isBuffer = a.isBuffer
                }).call(this, {
                    isBuffer: a("../../../../insert-module-globals/node_modules/is-buffer/index.js")
                })
            },
            {
                "../../../../insert-module-globals/node_modules/is-buffer/index.js": 9
            }
        ],
        19: [function(a, d, b) {
            (function(a) {
                function b(d) {
                    for (var f = Array(arguments.length - 1), g = 0; g < f.length;) f[g++] = arguments[g];
                    a.nextTick(function() {
                        d.apply(null, f)
                    })
                }!a.version || 0 === a.version.indexOf("v0.") || 0 === a.version.indexOf("v1.") && 0 !== a.version.indexOf("v1.8.") ? d.exports = b : d.exports = a.nextTick
            }).call(this, a("_process"))
        }, {
            _process: 11
        }],
        20: [function(a, d, b) {
            (function(a) {
                function b(d) {
                    try {
                        if (!a.localStorage) return !1
                    } catch (f) {
                        return !1
                    }
                    d =
                        a.localStorage[d];
                    return null == d ? !1 : "true" === String(d).toLowerCase()
                }
                d.exports = function(a, d) {
                    if (b("noDeprecation")) return a;
                    var e = !1;
                    return function() {
                        if (!e) {
                            if (b("throwDeprecation")) throw Error(d);
                            b("traceDeprecation") ? console.trace(d) : console.warn(d);
                            e = !0
                        }
                        return a.apply(this, arguments)
                    }
                }
            }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
        }, {}],
        21: [function(a, d, b) {
            d.exports = a("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_passthrough.js": 14
        }],
        22: [function(a, d, b) {
            var e;
            a: {
                try {
                    e = a("stream");
                    break a
                } catch (g) {}
                e = void 0
            }
            b = d.exports = a("./lib/_stream_readable.js");
            b.Stream = e || b;
            b.Readable = b;
            b.Writable = a("./lib/_stream_writable.js");
            b.Duplex = a("./lib/_stream_duplex.js");
            b.Transform = a("./lib/_stream_transform.js");
            b.PassThrough = a("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_duplex.js": 13,
            "./lib/_stream_passthrough.js": 14,
            "./lib/_stream_readable.js": 15,
            "./lib/_stream_transform.js": 16,
            "./lib/_stream_writable.js": 17
        }],
        23: [function(a, d, b) {
            d.exports =
                a("./lib/_stream_transform.js")
        }, {
            "./lib/_stream_transform.js": 16
        }],
        24: [function(a, d, b) {
            d.exports = a("./lib/_stream_writable.js")
        }, {
            "./lib/_stream_writable.js": 17
        }],
        25: [function(a, d, b) {
            function e() {
                g.call(this)
            }
            d.exports = e;
            var g = a("events").EventEmitter;
            a("inherits")(e, g);
            e.Readable = a("readable-stream/readable.js");
            e.Writable = a("readable-stream/writable.js");
            e.Duplex = a("readable-stream/duplex.js");
            e.Transform = a("readable-stream/transform.js");
            e.PassThrough = a("readable-stream/passthrough.js");
            e.Stream =
                e;
            e.prototype.pipe = function(a, b) {
                function d(b) {
                    a.writable && !1 === a.write(b) && y.pause && y.pause()
                }

                function e() {
                    y.readable && y.resume && y.resume()
                }

                function p() {
                    x || (x = !0, a.end())
                }

                function r() {
                    x || (x = !0, "function" === typeof a.destroy && a.destroy())
                }

                function u(a) {
                    z();
                    if (0 === g.listenerCount(this, "error")) throw a;
                }

                function z() {
                    y.removeListener("data", d);
                    a.removeListener("drain", e);
                    y.removeListener("end", p);
                    y.removeListener("close", r);
                    y.removeListener("error", u);
                    a.removeListener("error", u);
                    y.removeListener("end",
                        z);
                    y.removeListener("close", z);
                    a.removeListener("close", z)
                }
                var y = this;
                y.on("data", d);
                a.on("drain", e);
                a._isStdio || b && !1 === b.end || (y.on("end", p), y.on("close", r));
                var x = !1;
                y.on("error", u);
                a.on("error", u);
                y.on("end", z);
                y.on("close", z);
                a.on("close", z);
                a.emit("pipe", y);
                return a
            }
        }, {
            events: 7,
            inherits: 8,
            "readable-stream/duplex.js": 12,
            "readable-stream/passthrough.js": 21,
            "readable-stream/readable.js": 22,
            "readable-stream/transform.js": 23,
            "readable-stream/writable.js": 24
        }],
        26: [function(a, d, b) {
            function e(a) {
                return a.toString(this.encoding)
            }

            function g(a) {
                this.charLength = (this.charReceived = a.length % 2) ? 2 : 0
            }

            function h(a) {
                this.charLength = (this.charReceived = a.length % 3) ? 3 : 0
            }
            var f = a("buffer").Buffer,
                l = f.isEncoding || function(a) {
                    switch (a && a.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };
            a = b.StringDecoder = function(a) {
                this.encoding = (a || "utf8").toLowerCase().replace(/[-_]/, "");
                if (a && !l(a)) throw Error("Unknown encoding: " +
                    a);
                switch (this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2;
                        this.detectIncompleteChar = g;
                        break;
                    case "base64":
                        this.surrogateSize = 3;
                        this.detectIncompleteChar = h;
                        break;
                    default:
                        this.write = e;
                        return
                }
                this.charBuffer = new f(6);
                this.charLength = this.charReceived = 0
            };
            a.prototype.write = function(a) {
                for (var b = ""; this.charLength;) {
                    b = a.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : a.length;
                    a.copy(this.charBuffer, this.charReceived, 0, b);
                    this.charReceived += b;
                    if (this.charReceived < this.charLength) return "";
                    a = a.slice(b, a.length);
                    var b = this.charBuffer.slice(0, this.charLength).toString(this.encoding),
                        d = b.charCodeAt(b.length - 1);
                    if (55296 <= d && 56319 >= d) this.charLength += this.surrogateSize, b = "";
                    else {
                        this.charReceived = this.charLength = 0;
                        if (0 === a.length) return b;
                        break
                    }
                }
                this.detectIncompleteChar(a);
                var e = a.length;
                this.charLength && (a.copy(this.charBuffer, 0, a.length - this.charReceived, e), e -= this.charReceived);
                b += a.toString(this.encoding, 0, e);
                e = b.length -
                    1;
                d = b.charCodeAt(e);
                return 55296 <= d && 56319 >= d ? (d = this.surrogateSize, this.charLength += d, this.charReceived += d, this.charBuffer.copy(this.charBuffer, d, 0, d), a.copy(this.charBuffer, 0, 0, d), b.substring(0, e)) : b
            };
            a.prototype.detectIncompleteChar = function(a) {
                for (var b = 3 <= a.length ? 3 : a.length; 0 < b; b--) {
                    var d = a[a.length - b];
                    if (1 == b && 6 == d >> 5) {
                        this.charLength = 2;
                        break
                    }
                    if (2 >= b && 14 == d >> 4) {
                        this.charLength = 3;
                        break
                    }
                    if (3 >= b && 30 == d >> 3) {
                        this.charLength = 4;
                        break
                    }
                }
                this.charReceived = b
            };
            a.prototype.end = function(a) {
                var b = "";
                a && a.length &&
                    (b = this.write(a));
                this.charReceived && (a = this.encoding, b += this.charBuffer.slice(0, this.charReceived).toString(a));
                return b
            }
        }, {
            buffer: 3
        }],
        27: [function(a, d, b) {
            b = a("./lib/utils/common").assign;
            var e = a("./lib/deflate"),
                g = a("./lib/inflate");
            a = a("./lib/zlib/constants");
            var h = {};
            b(h, e, g, a);
            d.exports = h
        }, {
            "./lib/deflate": 28,
            "./lib/inflate": 29,
            "./lib/utils/common": 30,
            "./lib/zlib/constants": 33
        }],
        28: [function(a, d, b) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                a = this.options = f.assign({
                    level: -1,
                    method: 8,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: 0,
                    to: ""
                }, a || {});
                a.raw && 0 < a.windowBits ? a.windowBits = -a.windowBits : a.gzip && 0 < a.windowBits && 16 > a.windowBits && (a.windowBits += 16);
                this.err = 0;
                this.msg = "";
                this.ended = !1;
                this.chunks = [];
                this.strm = new p;
                this.strm.avail_out = 0;
                var b = h.deflateInit2(this.strm, a.level, a.method, a.windowBits, a.memLevel, a.strategy);
                if (0 !== b) throw Error(k[b]);
                a.header && h.deflateSetHeader(this.strm, a.header)
            }

            function g(a, b) {
                var d = new e(b);
                d.push(a, !0);
                if (d.err) throw d.msg;
                return d.result
            }
            var h = a("./zlib/deflate"),
                f = a("./utils/common"),
                l = a("./utils/strings"),
                k = a("./zlib/messages"),
                p = a("./zlib/zstream"),
                r = Object.prototype.toString;
            e.prototype.push = function(a, b) {
                var d = this.strm,
                    e = this.options.chunkSize,
                    g, k;
                if (this.ended) return !1;
                k = b === ~~b ? b : !0 === b ? 4 : 0;
                "string" === typeof a ? d.input = l.string2buf(a) : "[object ArrayBuffer]" === r.call(a) ? d.input = new Uint8Array(a) : d.input = a;
                d.next_in = 0;
                d.avail_in = d.input.length;
                do {
                    0 === d.avail_out && (d.output = new f.Buf8(e), d.next_out = 0, d.avail_out = e);
                    g = h.deflate(d,
                        k);
                    if (1 !== g && 0 !== g) return this.onEnd(g), this.ended = !0, !1;
                    if (0 === d.avail_out || 0 === d.avail_in && (4 === k || 2 === k))
                        if ("string" === this.options.to) this.onData(l.buf2binstring(f.shrinkBuf(d.output, d.next_out)));
                        else this.onData(f.shrinkBuf(d.output, d.next_out))
                } while ((0 < d.avail_in || 0 === d.avail_out) && 1 !== g);
                if (4 === k) return g = h.deflateEnd(this.strm), this.onEnd(g), this.ended = !0, 0 === g;
                2 === k && (this.onEnd(0), d.avail_out = 0);
                return !0
            };
            e.prototype.onData = function(a) {
                this.chunks.push(a)
            };
            e.prototype.onEnd = function(a) {
                0 ===
                    a && (this.result = "string" === this.options.to ? this.chunks.join("") : f.flattenChunks(this.chunks));
                this.chunks = [];
                this.err = a;
                this.msg = this.strm.msg
            };
            b.Deflate = e;
            b.deflate = g;
            b.deflateRaw = function(a, b) {
                b = b || {};
                b.raw = !0;
                return g(a, b)
            };
            b.gzip = function(a, b) {
                b = b || {};
                b.gzip = !0;
                return g(a, b)
            }
        }, {
            "./utils/common": 30,
            "./utils/strings": 31,
            "./zlib/deflate": 35,
            "./zlib/messages": 40,
            "./zlib/zstream": 42
        }],
        29: [function(a, d, b) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                var b = this.options = f.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, a || {});
                b.raw && 0 <= b.windowBits && 16 > b.windowBits && (b.windowBits = -b.windowBits, 0 === b.windowBits && (b.windowBits = -15));
                !(0 <= b.windowBits && 16 > b.windowBits) || a && a.windowBits || (b.windowBits += 32);
                15 < b.windowBits && 48 > b.windowBits && 0 === (b.windowBits & 15) && (b.windowBits |= 15);
                this.err = 0;
                this.msg = "";
                this.ended = !1;
                this.chunks = [];
                this.strm = new r;
                this.strm.avail_out = 0;
                a = h.inflateInit2(this.strm, b.windowBits);
                if (a !== k.Z_OK) throw Error(p[a]);
                this.header = new u;
                h.inflateGetHeader(this.strm, this.header)
            }

            function g(a, b) {
                var d = new e(b);
                d.push(a, !0);
                if (d.err) throw d.msg;
                return d.result
            }
            var h = a("./zlib/inflate"),
                f = a("./utils/common"),
                l = a("./utils/strings"),
                k = a("./zlib/constants"),
                p = a("./zlib/messages"),
                r = a("./zlib/zstream"),
                u = a("./zlib/gzheader"),
                z = Object.prototype.toString;
            e.prototype.push = function(a, b) {
                var d = this.strm,
                    e = this.options.chunkSize,
                    g, p, C, r, u, F = !1;
                if (this.ended) return !1;
                p = b === ~~b ? b : !0 === b ? k.Z_FINISH : k.Z_NO_FLUSH;
                "string" === typeof a ? d.input = l.binstring2buf(a) : "[object ArrayBuffer]" === z.call(a) ?
                    d.input = new Uint8Array(a) : d.input = a;
                d.next_in = 0;
                d.avail_in = d.input.length;
                do {
                    0 === d.avail_out && (d.output = new f.Buf8(e), d.next_out = 0, d.avail_out = e);
                    g = h.inflate(d, k.Z_NO_FLUSH);
                    g === k.Z_BUF_ERROR && !0 === F && (g = k.Z_OK, F = !1);
                    if (g !== k.Z_STREAM_END && g !== k.Z_OK) return this.onEnd(g), this.ended = !0, !1;
                    if (d.next_out && (0 === d.avail_out || g === k.Z_STREAM_END || 0 === d.avail_in && (p === k.Z_FINISH || p === k.Z_SYNC_FLUSH)))
                        if ("string" === this.options.to) C = l.utf8border(d.output, d.next_out), r = d.next_out - C, u = l.buf2string(d.output,
                            C), d.next_out = r, d.avail_out = e - r, r && f.arraySet(d.output, d.output, C, r, 0), this.onData(u);
                        else this.onData(f.shrinkBuf(d.output, d.next_out));
                    0 === d.avail_in && 0 === d.avail_out && (F = !0)
                } while ((0 < d.avail_in || 0 === d.avail_out) && g !== k.Z_STREAM_END);
                g === k.Z_STREAM_END && (p = k.Z_FINISH);
                if (p === k.Z_FINISH) return g = h.inflateEnd(this.strm), this.onEnd(g), this.ended = !0, g === k.Z_OK;
                p === k.Z_SYNC_FLUSH && (this.onEnd(k.Z_OK), d.avail_out = 0);
                return !0
            };
            e.prototype.onData = function(a) {
                this.chunks.push(a)
            };
            e.prototype.onEnd = function(a) {
                a ===
                    k.Z_OK && (this.result = "string" === this.options.to ? this.chunks.join("") : f.flattenChunks(this.chunks));
                this.chunks = [];
                this.err = a;
                this.msg = this.strm.msg
            };
            b.Inflate = e;
            b.inflate = g;
            b.inflateRaw = function(a, b) {
                b = b || {};
                b.raw = !0;
                return g(a, b)
            };
            b.ungzip = g
        }, {
            "./utils/common": 30,
            "./utils/strings": 31,
            "./zlib/constants": 33,
            "./zlib/gzheader": 36,
            "./zlib/inflate": 38,
            "./zlib/messages": 40,
            "./zlib/zstream": 42
        }],
        30: [function(a, d, b) {
            a = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Int32Array;
            b.assign = function(a) {
                for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
                    var d = b.shift();
                    if (d) {
                        if ("object" !== typeof d) throw new TypeError(d + "must be non-object");
                        for (var e in d) d.hasOwnProperty(e) && (a[e] = d[e])
                    }
                }
                return a
            };
            b.shrinkBuf = function(a, b) {
                if (a.length === b) return a;
                if (a.subarray) return a.subarray(0, b);
                a.length = b;
                return a
            };
            var e = {
                    arraySet: function(a, b, d, e, g) {
                        if (b.subarray && a.subarray) a.set(b.subarray(d, d + e), g);
                        else
                            for (var r = 0; r < e; r++) a[g + r] = b[d + r]
                    },
                    flattenChunks: function(a) {
                        var b, d,
                            e, g, r;
                        b = e = 0;
                        for (d = a.length; b < d; b++) e += a[b].length;
                        r = new Uint8Array(e);
                        b = e = 0;
                        for (d = a.length; b < d; b++) g = a[b], r.set(g, e), e += g.length;
                        return r
                    }
                },
                g = {
                    arraySet: function(a, b, d, e, g) {
                        for (var r = 0; r < e; r++) a[g + r] = b[d + r]
                    },
                    flattenChunks: function(a) {
                        return [].concat.apply([], a)
                    }
                };
            b.setTyped = function(a) {
                a ? (b.Buf8 = Uint8Array, b.Buf16 = Uint16Array, b.Buf32 = Int32Array, b.assign(b, e)) : (b.Buf8 = Array, b.Buf16 = Array, b.Buf32 = Array, b.assign(b, g))
            };
            b.setTyped(a)
        }, {}],
        31: [function(a, d, b) {
            function e(a, b) {
                if (65537 > b && (a.subarray && f ||
                        !a.subarray && h)) return String.fromCharCode.apply(null, g.shrinkBuf(a, b));
                for (var d = "", e = 0; e < b; e++) d += String.fromCharCode(a[e]);
                return d
            }
            var g = a("./common"),
                h = !0,
                f = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (l) {
                h = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (k) {
                f = !1
            }
            var p = new g.Buf8(256);
            for (a = 0; 256 > a; a++) p[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
            p[254] = p[254] = 1;
            b.string2buf = function(a) {
                var b, d, e, f, h, k = a.length,
                    l = 0;
                for (f = 0; f < k; f++) d = a.charCodeAt(f), 55296 === (d & 64512) &&
                    f + 1 < k && (e = a.charCodeAt(f + 1), 56320 === (e & 64512) && (d = 65536 + (d - 55296 << 10) + (e - 56320), f++)), l += 128 > d ? 1 : 2048 > d ? 2 : 65536 > d ? 3 : 4;
                b = new g.Buf8(l);
                for (f = h = 0; h < l; f++) d = a.charCodeAt(f), 55296 === (d & 64512) && f + 1 < k && (e = a.charCodeAt(f + 1), 56320 === (e & 64512) && (d = 65536 + (d - 55296 << 10) + (e - 56320), f++)), 128 > d ? b[h++] = d : (2048 > d ? b[h++] = 192 | d >>> 6 : (65536 > d ? b[h++] = 224 | d >>> 12 : (b[h++] = 240 | d >>> 18, b[h++] = 128 | d >>> 12 & 63), b[h++] = 128 | d >>> 6 & 63), b[h++] = 128 | d & 63);
                return b
            };
            b.buf2binstring = function(a) {
                return e(a, a.length)
            };
            b.binstring2buf = function(a) {
                for (var b =
                        new g.Buf8(a.length), d = 0, e = b.length; d < e; d++) b[d] = a.charCodeAt(d);
                return b
            };
            b.buf2string = function(a, b) {
                var d, f, g, h, k = b || a.length,
                    l = Array(2 * k);
                for (d = f = 0; d < k;)
                    if (g = a[d++], 128 > g) l[f++] = g;
                    else if (h = p[g], 4 < h) l[f++] = 65533, d += h - 1;
                else {
                    for (g &= 2 === h ? 31 : 3 === h ? 15 : 7; 1 < h && d < k;) g = g << 6 | a[d++] & 63, h--;
                    1 < h ? l[f++] = 65533 : 65536 > g ? l[f++] = g : (g -= 65536, l[f++] = 55296 | g >> 10 & 1023, l[f++] = 56320 | g & 1023)
                }
                return e(l, f)
            };
            b.utf8border = function(a, b) {
                var d;
                b = b || a.length;
                b > a.length && (b = a.length);
                for (d = b - 1; 0 <= d && 128 === (a[d] & 192);) d--;
                return 0 >
                    d || 0 === d ? b : d + p[a[d]] > b ? d : b
            }
        }, {
            "./common": 30
        }],
        32: [function(a, d, b) {
            d.exports = function(a, b, d, f) {
                var l = a & 65535 | 0;
                a = a >>> 16 & 65535 | 0;
                for (var k = 0; 0 !== d;) {
                    k = 2E3 < d ? 2E3 : d;
                    d -= k;
                    do l = l + b[f++] | 0, a = a + l | 0; while (--k);
                    l %= 65521;
                    a %= 65521
                }
                return l | a << 16 | 0
            }
        }, {}],
        33: [function(a, d, b) {
            d.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, {}],
        34: [function(a, d, b) {
            var e = function() {
                for (var a, b = [], d = 0; 256 > d; d++) {
                    a = d;
                    for (var e = 0; 8 > e; e++) a = a & 1 ? 3988292384 ^ a >>> 1 : a >>> 1;
                    b[d] = a
                }
                return b
            }();
            d.exports = function(a, b, d, l) {
                d = l + d;
                for (a ^= -1; l < d; l++) a = a >>> 8 ^ e[(a ^ b[l]) & 255];
                return a ^ -1
            }
        }, {}],
        35: [function(a, d, b) {
            function e(a, b) {
                a.msg = E[b];
                return b
            }

            function g(a) {
                for (var b = a.length; 0 <= --b;) a[b] = 0
            }

            function h(a) {
                var b =
                    a.state,
                    d = b.pending;
                d > a.avail_out && (d = a.avail_out);
                0 !== d && (I.arraySet(a.output, b.pending_buf, b.pending_out, d, a.next_out), a.next_out += d, b.pending_out += d, a.total_out += d, a.avail_out -= d, b.pending -= d, 0 === b.pending && (b.pending_out = 0))
            }

            function f(a, b) {
                M._tr_flush_block(a, 0 <= a.block_start ? a.block_start : -1, a.strstart - a.block_start, b);
                a.block_start = a.strstart;
                h(a.strm)
            }

            function l(a, b) {
                a.pending_buf[a.pending++] = b
            }

            function k(a, b) {
                a.pending_buf[a.pending++] = b >>> 8 & 255;
                a.pending_buf[a.pending++] = b & 255
            }

            function p(a,
                b) {
                var d = a.max_chain_length,
                    e = a.strstart,
                    f, g = a.prev_length,
                    h = a.nice_match,
                    k = a.strstart > a.w_size - 262 ? a.strstart - (a.w_size - 262) : 0,
                    l = a.window,
                    C = a.w_mask,
                    p = a.prev,
                    w = a.strstart + 258,
                    r = l[e + g - 1],
                    t = l[e + g];
                a.prev_length >= a.good_match && (d >>= 2);
                h > a.lookahead && (h = a.lookahead);
                do
                    if (f = b, l[f + g] === t && l[f + g - 1] === r && l[f] === l[e] && l[++f] === l[e + 1]) {
                        e += 2;
                        for (f++; l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && l[++e] === l[++f] && e < w;);
                        f = 258 - (w - e);
                        e = w -
                            258;
                        if (f > g) {
                            a.match_start = b;
                            g = f;
                            if (f >= h) break;
                            r = l[e + g - 1];
                            t = l[e + g]
                        }
                    } while ((b = p[b & C]) > k && 0 !== --d);
                return g <= a.lookahead ? g : a.lookahead
            }

            function r(a) {
                var b = a.w_size,
                    d, e, f, g;
                do {
                    g = a.window_size - a.lookahead - a.strstart;
                    if (a.strstart >= b + (b - 262)) {
                        I.arraySet(a.window, a.window, b, b, 0);
                        a.match_start -= b;
                        a.strstart -= b;
                        a.block_start -= b;
                        d = e = a.hash_size;
                        do f = a.head[--d], a.head[d] = f >= b ? f - b : 0; while (--e);
                        d = e = b;
                        do f = a.prev[--d], a.prev[d] = f >= b ? f - b : 0; while (--e);
                        g += b
                    }
                    if (0 === a.strm.avail_in) break;
                    d = a.strm;
                    e = a.window;
                    f = a.strstart +
                        a.lookahead;
                    var h = d.avail_in;
                    h > g && (h = g);
                    0 === h ? e = 0 : (d.avail_in -= h, I.arraySet(e, d.input, d.next_in, h, f), 1 === d.state.wrap ? d.adler = F(d.adler, e, h, f) : 2 === d.state.wrap && (d.adler = t(d.adler, e, h, f)), d.next_in += h, d.total_in += h, e = h);
                    a.lookahead += e;
                    if (3 <= a.lookahead + a.insert)
                        for (g = a.strstart - a.insert, a.ins_h = a.window[g], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[g + 1]) & a.hash_mask; a.insert && !(a.ins_h = (a.ins_h << a.hash_shift ^ a.window[g + 3 - 1]) & a.hash_mask, a.prev[g & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = g, g++, a.insert--,
                                3 > a.lookahead + a.insert););
                } while (262 > a.lookahead && 0 !== a.strm.avail_in)
            }

            function u(a, b) {
                for (var d;;) {
                    if (262 > a.lookahead) {
                        r(a);
                        if (262 > a.lookahead && 0 === b) return 1;
                        if (0 === a.lookahead) break
                    }
                    d = 0;
                    3 <= a.lookahead && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, d = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart);
                    0 !== d && a.strstart - d <= a.w_size - 262 && (a.match_length = p(a, d));
                    if (3 <= a.match_length)
                        if (d = M._tr_tally(a, a.strstart - a.match_start, a.match_length - 3), a.lookahead -=
                            a.match_length, a.match_length <= a.max_lazy_match && 3 <= a.lookahead) {
                            a.match_length--;
                            do a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart; while (0 !== --a.match_length);
                            a.strstart++
                        } else a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask;
                    else d = M._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++;
                    if (d &&
                        (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 2 > a.strstart ? a.strstart : 2;
                return 4 === b ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function z(a, b) {
                for (var d, e;;) {
                    if (262 > a.lookahead) {
                        r(a);
                        if (262 > a.lookahead && 0 === b) return 1;
                        if (0 === a.lookahead) break
                    }
                    d = 0;
                    3 <= a.lookahead && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, d = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart);
                    a.prev_length = a.match_length;
                    a.prev_match = a.match_start;
                    a.match_length = 2;
                    0 !== d && a.prev_length < a.max_lazy_match && a.strstart - d <= a.w_size - 262 && (a.match_length = p(a, d), 5 >= a.match_length && (1 === a.strategy || 3 === a.match_length && 4096 < a.strstart - a.match_start) && (a.match_length = 2));
                    if (3 <= a.prev_length && a.match_length <= a.prev_length) {
                        e = a.strstart + a.lookahead - 3;
                        d = M._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - 3);
                        a.lookahead -= a.prev_length - 1;
                        a.prev_length -= 2;
                        do ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 3 - 1]) & a.hash_mask, a.prev[a.strstart &
                            a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart); while (0 !== --a.prev_length);
                        a.match_available = 0;
                        a.match_length = 2;
                        a.strstart++;
                        if (d && (f(a, !1), 0 === a.strm.avail_out)) return 1
                    } else if (a.match_available) {
                        if ((d = M._tr_tally(a, 0, a.window[a.strstart - 1])) && f(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out) return 1
                    } else a.match_available = 1, a.strstart++, a.lookahead--
                }
                a.match_available && (M._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0);
                a.insert = 2 > a.strstart ? a.strstart : 2;
                return 4 === b ? (f(a,
                    !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function y(a, b) {
                for (var d, e, g, h = a.window;;) {
                    if (258 >= a.lookahead) {
                        r(a);
                        if (258 >= a.lookahead && 0 === b) return 1;
                        if (0 === a.lookahead) break
                    }
                    a.match_length = 0;
                    if (3 <= a.lookahead && 0 < a.strstart && (e = a.strstart - 1, d = h[e], d === h[++e] && d === h[++e] && d === h[++e])) {
                        for (g = a.strstart + 258; d === h[++e] && d === h[++e] && d === h[++e] && d === h[++e] && d === h[++e] && d === h[++e] && d === h[++e] && d === h[++e] && e < g;);
                        a.match_length = 258 - (g - e);
                        a.match_length > a.lookahead && (a.match_length =
                            a.lookahead)
                    }
                    3 <= a.match_length ? (d = M._tr_tally(a, 1, a.match_length - 3), a.lookahead -= a.match_length, a.strstart += a.match_length, a.match_length = 0) : (d = M._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++);
                    if (d && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 0;
                return 4 === b ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function x(a, b) {
                for (var d;;) {
                    if (0 === a.lookahead && (r(a), 0 === a.lookahead)) {
                        if (0 === b) return 1;
                        break
                    }
                    a.match_length = 0;
                    d = M._tr_tally(a, 0, a.window[a.strstart]);
                    a.lookahead--;
                    a.strstart++;
                    if (d && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 0;
                return 4 === b ? (f(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (f(a, !1), 0 === a.strm.avail_out) ? 1 : 2
            }

            function D(a, b, d, e, f) {
                this.good_length = a;
                this.max_lazy = b;
                this.nice_length = d;
                this.max_chain = e;
                this.func = f
            }

            function B() {
                this.strm = null;
                this.status = 0;
                this.pending_buf = null;
                this.wrap = this.pending = this.pending_out = this.pending_buf_size = 0;
                this.gzhead = null;
                this.gzindex = 0;
                this.method = 8;
                this.last_flush = -1;
                this.w_mask = this.w_bits =
                    this.w_size = 0;
                this.window = null;
                this.window_size = 0;
                this.head = this.prev = null;
                this.nice_match = this.good_match = this.strategy = this.level = this.max_lazy_match = this.max_chain_length = this.prev_length = this.lookahead = this.match_start = this.strstart = this.match_available = this.prev_match = this.match_length = this.block_start = this.hash_shift = this.hash_mask = this.hash_bits = this.hash_size = this.ins_h = 0;
                this.dyn_ltree = new I.Buf16(1146);
                this.dyn_dtree = new I.Buf16(122);
                this.bl_tree = new I.Buf16(78);
                g(this.dyn_ltree);
                g(this.dyn_dtree);
                g(this.bl_tree);
                this.bl_desc = this.d_desc = this.l_desc = null;
                this.bl_count = new I.Buf16(16);
                this.heap = new I.Buf16(573);
                g(this.heap);
                this.heap_max = this.heap_len = 0;
                this.depth = new I.Buf16(573);
                g(this.depth);
                this.bi_valid = this.bi_buf = this.insert = this.matches = this.static_len = this.opt_len = this.d_buf = this.last_lit = this.lit_bufsize = this.l_buf = 0
            }

            function w(a) {
                var b;
                if (!a || !a.state) return e(a, -2);
                a.total_in = a.total_out = 0;
                a.data_type = 2;
                b = a.state;
                b.pending = 0;
                b.pending_out = 0;
                0 > b.wrap && (b.wrap = -b.wrap);
                b.status = b.wrap ?
                    42 : 113;
                a.adler = 2 === b.wrap ? 0 : 1;
                b.last_flush = 0;
                M._tr_init(b);
                return 0
            }

            function L(a) {
                var b = w(a);
                0 === b && (a = a.state, a.window_size = 2 * a.w_size, g(a.head), a.max_lazy_match = v[a.level].max_lazy, a.good_match = v[a.level].good_length, a.nice_match = v[a.level].nice_length, a.max_chain_length = v[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = 2, a.match_available = 0, a.ins_h = 0);
                return b
            }

            function C(a, b, d, f, g, h) {
                if (!a) return -2;
                var k = 1; - 1 === b && (b = 6);
                0 > f ? (k = 0, f = -f) : 15 < f &&
                    (k = 2, f -= 16);
                if (1 > g || 9 < g || 8 !== d || 8 > f || 15 < f || 0 > b || 9 < b || 0 > h || 4 < h) return e(a, -2);
                8 === f && (f = 9);
                var l = new B;
                a.state = l;
                l.strm = a;
                l.wrap = k;
                l.gzhead = null;
                l.w_bits = f;
                l.w_size = 1 << l.w_bits;
                l.w_mask = l.w_size - 1;
                l.hash_bits = g + 7;
                l.hash_size = 1 << l.hash_bits;
                l.hash_mask = l.hash_size - 1;
                l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3);
                l.window = new I.Buf8(2 * l.w_size);
                l.head = new I.Buf16(l.hash_size);
                l.prev = new I.Buf16(l.w_size);
                l.lit_bufsize = 1 << g + 6;
                l.pending_buf_size = 4 * l.lit_bufsize;
                l.pending_buf = new I.Buf8(l.pending_buf_size);
                l.d_buf =
                    l.lit_bufsize >> 1;
                l.l_buf = 3 * l.lit_bufsize;
                l.level = b;
                l.strategy = h;
                l.method = d;
                return L(a)
            }
            var I = a("../utils/common"),
                M = a("./trees"),
                F = a("./adler32"),
                t = a("./crc32"),
                E = a("./messages"),
                v;
            v = [new D(0, 0, 0, 0, function(a, b) {
                var d = 65535;
                for (d > a.pending_buf_size - 5 && (d = a.pending_buf_size - 5);;) {
                    if (1 >= a.lookahead) {
                        r(a);
                        if (0 === a.lookahead && 0 === b) return 1;
                        if (0 === a.lookahead) break
                    }
                    a.strstart += a.lookahead;
                    a.lookahead = 0;
                    var e = a.block_start + d;
                    if (0 === a.strstart || a.strstart >= e)
                        if (a.lookahead = a.strstart - e, a.strstart = e, f(a,
                                !1), 0 === a.strm.avail_out) return 1;
                    if (a.strstart - a.block_start >= a.w_size - 262 && (f(a, !1), 0 === a.strm.avail_out)) return 1
                }
                a.insert = 0;
                if (4 === b) return f(a, !0), 0 === a.strm.avail_out ? 3 : 4;
                a.strstart > a.block_start && f(a, !1);
                return 1
            }), new D(4, 4, 8, 4, u), new D(4, 5, 16, 8, u), new D(4, 6, 32, 32, u), new D(4, 4, 16, 16, z), new D(8, 16, 32, 32, z), new D(8, 16, 128, 128, z), new D(8, 32, 128, 256, z), new D(32, 128, 258, 1024, z), new D(32, 258, 258, 4096, z)];
            b.deflateInit = function(a, b) {
                return C(a, b, 8, 15, 8, 0)
            };
            b.deflateInit2 = C;
            b.deflateReset = L;
            b.deflateResetKeep =
                w;
            b.deflateSetHeader = function(a, b) {
                if (!a || !a.state || 2 !== a.state.wrap) return -2;
                a.state.gzhead = b;
                return 0
            };
            b.deflate = function(a, b) {
                var d, f, C, p;
                if (!a || !a.state || 5 < b || 0 > b) return a ? e(a, -2) : -2;
                f = a.state;
                if (!a.output || !a.input && 0 !== a.avail_in || 666 === f.status && 4 !== b) return e(a, 0 === a.avail_out ? -5 : -2);
                f.strm = a;
                d = f.last_flush;
                f.last_flush = b;
                42 === f.status && (2 === f.wrap ? (a.adler = 0, l(f, 31), l(f, 139), l(f, 8), f.gzhead ? (l(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ?
                    16 : 0)), l(f, f.gzhead.time & 255), l(f, f.gzhead.time >> 8 & 255), l(f, f.gzhead.time >> 16 & 255), l(f, f.gzhead.time >> 24 & 255), l(f, 9 === f.level ? 2 : 2 <= f.strategy || 2 > f.level ? 4 : 0), l(f, f.gzhead.os & 255), f.gzhead.extra && f.gzhead.extra.length && (l(f, f.gzhead.extra.length & 255), l(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (a.adler = t(a.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = 69) : (l(f, 0), l(f, 0), l(f, 0), l(f, 0), l(f, 0), l(f, 9 === f.level ? 2 : 2 <= f.strategy || 2 > f.level ? 4 : 0), l(f, 3), f.status = 113)) : (C = 8 + (f.w_bits - 8 << 4) << 8,
                    p = -1, p = 2 <= f.strategy || 2 > f.level ? 0 : 6 > f.level ? 1 : 6 === f.level ? 2 : 3, C |= p << 6, 0 !== f.strstart && (C |= 32), f.status = 113, k(f, C + (31 - C % 31)), 0 !== f.strstart && (k(f, a.adler >>> 16), k(f, a.adler & 65535)), a.adler = 1));
                if (69 === f.status)
                    if (f.gzhead.extra) {
                        for (C = f.pending; f.gzindex < (f.gzhead.extra.length & 65535) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > C && (a.adler = t(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending !== f.pending_buf_size));) l(f, f.gzhead.extra[f.gzindex] & 255), f.gzindex++;
                        f.gzhead.hcrc &&
                            f.pending > C && (a.adler = t(a.adler, f.pending_buf, f.pending - C, C));
                        f.gzindex === f.gzhead.extra.length && (f.gzindex = 0, f.status = 73)
                    } else f.status = 73;
                if (73 === f.status)
                    if (f.gzhead.name) {
                        C = f.pending;
                        do {
                            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > C && (a.adler = t(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending === f.pending_buf_size)) {
                                p = 1;
                                break
                            }
                            p = f.gzindex < f.gzhead.name.length ? f.gzhead.name.charCodeAt(f.gzindex++) & 255 : 0;
                            l(f, p)
                        } while (0 !== p);
                        f.gzhead.hcrc && f.pending > C && (a.adler = t(a.adler,
                            f.pending_buf, f.pending - C, C));
                        0 === p && (f.gzindex = 0, f.status = 91)
                    } else f.status = 91;
                if (91 === f.status)
                    if (f.gzhead.comment) {
                        C = f.pending;
                        do {
                            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > C && (a.adler = t(a.adler, f.pending_buf, f.pending - C, C)), h(a), C = f.pending, f.pending === f.pending_buf_size)) {
                                p = 1;
                                break
                            }
                            p = f.gzindex < f.gzhead.comment.length ? f.gzhead.comment.charCodeAt(f.gzindex++) & 255 : 0;
                            l(f, p)
                        } while (0 !== p);
                        f.gzhead.hcrc && f.pending > C && (a.adler = t(a.adler, f.pending_buf, f.pending - C, C));
                        0 === p && (f.status =
                            103)
                    } else f.status = 103;
                103 === f.status && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size && h(a), f.pending + 2 <= f.pending_buf_size && (l(f, a.adler & 255), l(f, a.adler >> 8 & 255), a.adler = 0, f.status = 113)) : f.status = 113);
                if (0 !== f.pending) {
                    if (h(a), 0 === a.avail_out) return f.last_flush = -1, 0
                } else if (0 === a.avail_in && (b << 1) - (4 < b ? 9 : 0) <= (d << 1) - (4 < d ? 9 : 0) && 4 !== b) return e(a, -5);
                if (666 === f.status && 0 !== a.avail_in) return e(a, -5);
                if (0 !== a.avail_in || 0 !== f.lookahead || 0 !== b && 666 !== f.status) {
                    d = 2 === f.strategy ? x(f, b) : 3 === f.strategy ? y(f,
                        b) : v[f.level].func(f, b);
                    if (3 === d || 4 === d) f.status = 666;
                    if (1 === d || 3 === d) return 0 === a.avail_out && (f.last_flush = -1), 0;
                    if (2 === d && (1 === b ? M._tr_align(f) : 5 !== b && (M._tr_stored_block(f, 0, 0, !1), 3 === b && (g(f.head), 0 === f.lookahead && (f.strstart = 0, f.block_start = 0, f.insert = 0))), h(a), 0 === a.avail_out)) return f.last_flush = -1, 0
                }
                if (4 !== b) return 0;
                if (0 >= f.wrap) return 1;
                2 === f.wrap ? (l(f, a.adler & 255), l(f, a.adler >> 8 & 255), l(f, a.adler >> 16 & 255), l(f, a.adler >> 24 & 255), l(f, a.total_in & 255), l(f, a.total_in >> 8 & 255), l(f, a.total_in >> 16 &
                    255), l(f, a.total_in >> 24 & 255)) : (k(f, a.adler >>> 16), k(f, a.adler & 65535));
                h(a);
                0 < f.wrap && (f.wrap = -f.wrap);
                return 0 !== f.pending ? 0 : 1
            };
            b.deflateEnd = function(a) {
                var b;
                if (!a || !a.state) return -2;
                b = a.state.status;
                if (42 !== b && 69 !== b && 73 !== b && 91 !== b && 103 !== b && 113 !== b && 666 !== b) return e(a, -2);
                a.state = null;
                return 113 === b ? e(a, -3) : 0
            };
            b.deflateInfo = "pako deflate (from Nodeca project)"
        }, {
            "../utils/common": 30,
            "./adler32": 32,
            "./crc32": 34,
            "./messages": 40,
            "./trees": 41
        }],
        36: [function(a, d, b) {
            d.exports = function() {
                this.os = this.xflags =
                    this.time = this.text = 0;
                this.extra = null;
                this.extra_len = 0;
                this.comment = this.name = "";
                this.hcrc = 0;
                this.done = !1
            }
        }, {}],
        37: [function(a, d, b) {
            d.exports = function(a, b) {
                var d, f, l, k, p, r, u, z, y, x, D, B, w, L, C, I, M, F, t, E, v, m, n, H;
                d = a.state;
                f = a.next_in;
                n = a.input;
                l = f + (a.avail_in - 5);
                k = a.next_out;
                H = a.output;
                p = k - (b - a.avail_out);
                r = k + (a.avail_out - 257);
                u = d.dmax;
                z = d.wsize;
                y = d.whave;
                x = d.wnext;
                D = d.window;
                B = d.hold;
                w = d.bits;
                L = d.lencode;
                C = d.distcode;
                I = (1 << d.lenbits) - 1;
                M = (1 << d.distbits) - 1;
                a: do b: for (15 > w && (B += n[f++] << w, w += 8, B += n[f++] <<
                            w, w += 8), F = L[B & I];;) {
                        t = F >>> 24;
                        B >>>= t;
                        w -= t;
                        t = F >>> 16 & 255;
                        if (0 === t) H[k++] = F & 65535;
                        else if (t & 16) {
                            E = F & 65535;
                            if (t &= 15) w < t && (B += n[f++] << w, w += 8), E += B & (1 << t) - 1, B >>>= t, w -= t;
                            15 > w && (B += n[f++] << w, w += 8, B += n[f++] << w, w += 8);
                            F = C[B & M];
                            c: for (;;) {
                                t = F >>> 24;
                                B >>>= t;
                                w -= t;
                                t = F >>> 16 & 255;
                                if (t & 16) {
                                    F &= 65535;
                                    t &= 15;
                                    w < t && (B += n[f++] << w, w += 8, w < t && (B += n[f++] << w, w += 8));
                                    F += B & (1 << t) - 1;
                                    if (F > u) {
                                        a.msg = "invalid distance too far back";
                                        d.mode = 30;
                                        break a
                                    }
                                    B >>>= t;
                                    w -= t;
                                    t = k - p;
                                    if (F > t) {
                                        t = F - t;
                                        if (t > y && d.sane) {
                                            a.msg = "invalid distance too far back";
                                            d.mode =
                                                30;
                                            break a
                                        }
                                        v = 0;
                                        m = D;
                                        if (0 === x) {
                                            if (v += z - t, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = k - F;
                                                m = H
                                            }
                                        } else if (x < t) {
                                            if (v += z + x - t, t -= x, t < E) {
                                                E -= t;
                                                do H[k++] = D[v++]; while (--t);
                                                v = 0;
                                                if (x < E) {
                                                    t = x;
                                                    E -= t;
                                                    do H[k++] = D[v++]; while (--t);
                                                    v = k - F;
                                                    m = H
                                                }
                                            }
                                        } else if (v += x - t, t < E) {
                                            E -= t;
                                            do H[k++] = D[v++]; while (--t);
                                            v = k - F;
                                            m = H
                                        }
                                        for (; 2 < E;) H[k++] = m[v++], H[k++] = m[v++], H[k++] = m[v++], E -= 3;
                                        E && (H[k++] = m[v++], 1 < E && (H[k++] = m[v++]))
                                    } else {
                                        v = k - F;
                                        do H[k++] = H[v++], H[k++] = H[v++], H[k++] = H[v++], E -= 3; while (2 < E);
                                        E && (H[k++] = H[v++], 1 < E && (H[k++] = H[v++]))
                                    }
                                } else if (0 ===
                                    (t & 64)) {
                                    F = C[(F & 65535) + (B & (1 << t) - 1)];
                                    continue c
                                } else {
                                    a.msg = "invalid distance code";
                                    d.mode = 30;
                                    break a
                                }
                                break
                            }
                        } else if (0 === (t & 64)) {
                            F = L[(F & 65535) + (B & (1 << t) - 1)];
                            continue b
                        } else {
                            t & 32 ? d.mode = 12 : (a.msg = "invalid literal/length code", d.mode = 30);
                            break a
                        }
                        break
                    }
                    while (f < l && k < r);
                    E = w >> 3;
                f -= E;
                w -= E << 3;
                a.next_in = f;
                a.next_out = k;
                a.avail_in = f < l ? 5 + (l - f) : 5 - (f - l);
                a.avail_out = k < r ? 257 + (r - k) : 257 - (k - r);
                d.hold = B & (1 << w) - 1;
                d.bits = w
            }
        }, {}],
        38: [function(a, d, b) {
            function e(a) {
                return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((a & 65280) << 8) + ((a & 255) <<
                    24)
            }

            function g() {
                this.mode = 0;
                this.last = !1;
                this.wrap = 0;
                this.havedict = !1;
                this.total = this.check = this.dmax = this.flags = 0;
                this.head = null;
                this.wnext = this.whave = this.wsize = this.wbits = 0;
                this.window = null;
                this.extra = this.offset = this.length = this.bits = this.hold = 0;
                this.distcode = this.lencode = null;
                this.have = this.ndist = this.nlen = this.ncode = this.distbits = this.lenbits = 0;
                this.next = null;
                this.lens = new p.Buf16(320);
                this.work = new p.Buf16(288);
                this.distdyn = this.lendyn = null;
                this.was = this.back = this.sane = 0
            }

            function h(a) {
                var b;
                if (!a || !a.state) return -2;
                b = a.state;
                a.total_in = a.total_out = b.total = 0;
                a.msg = "";
                b.wrap && (a.adler = b.wrap & 1);
                b.mode = 1;
                b.last = 0;
                b.havedict = 0;
                b.dmax = 32768;
                b.head = null;
                b.hold = 0;
                b.bits = 0;
                b.lencode = b.lendyn = new p.Buf32(852);
                b.distcode = b.distdyn = new p.Buf32(592);
                b.sane = 1;
                b.back = -1;
                return 0
            }

            function f(a) {
                var b;
                if (!a || !a.state) return -2;
                b = a.state;
                b.wsize = 0;
                b.whave = 0;
                b.wnext = 0;
                return h(a)
            }

            function l(a, b) {
                var d, e;
                if (!a || !a.state) return -2;
                e = a.state;
                0 > b ? (d = 0, b = -b) : (d = (b >> 4) + 1, 48 > b && (b &= 15));
                if (b && (8 > b || 15 < b)) return -2;
                null !== e.window && e.wbits !== b && (e.window = null);
                e.wrap = d;
                e.wbits = b;
                return f(a)
            }

            function k(a, b) {
                var d;
                if (!a) return -2;
                d = new g;
                a.state = d;
                d.window = null;
                d = l(a, b);
                0 !== d && (a.state = null);
                return d
            }
            var p = a("../utils/common"),
                r = a("./adler32"),
                u = a("./crc32"),
                z = a("./inffast"),
                y = a("./inftrees"),
                x = !0,
                D, B;
            b.inflateReset = f;
            b.inflateReset2 = l;
            b.inflateResetKeep = h;
            b.inflateInit = function(a) {
                return k(a, 15)
            };
            b.inflateInit2 = k;
            b.inflate = function(a, b) {
                var d, f, g, h, k, l, v, m, n, H, J, q, A, N, K = 0,
                    Q, R, P, O = new p.Buf8(4),
                    S = [16, 17, 18, 0, 8,
                        7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
                    ];
                if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return -2;
                d = a.state;
                12 === d.mode && (d.mode = 13);
                k = a.next_out;
                g = a.output;
                v = a.avail_out;
                h = a.next_in;
                f = a.input;
                l = a.avail_in;
                m = d.hold;
                n = d.bits;
                H = l;
                J = v;
                P = 0;
                a: for (;;) switch (d.mode) {
                    case 1:
                        if (0 === d.wrap) {
                            d.mode = 13;
                            break
                        }
                        for (; 16 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        if (d.wrap & 2 && 35615 === m) {
                            d.check = 0;
                            O[0] = m & 255;
                            O[1] = m >>> 8 & 255;
                            d.check = u(d.check, O, 2, 0);
                            n = m = 0;
                            d.mode = 2;
                            break
                        }
                        d.flags = 0;
                        d.head && (d.head.done = !1);
                        if (!(d.wrap &
                                1) || (((m & 255) << 8) + (m >> 8)) % 31) {
                            a.msg = "incorrect header check";
                            d.mode = 30;
                            break
                        }
                        if (8 !== (m & 15)) {
                            a.msg = "unknown compression method";
                            d.mode = 30;
                            break
                        }
                        m >>>= 4;
                        n -= 4;
                        A = (m & 15) + 8;
                        if (0 === d.wbits) d.wbits = A;
                        else if (A > d.wbits) {
                            a.msg = "invalid window size";
                            d.mode = 30;
                            break
                        }
                        d.dmax = 1 << A;
                        a.adler = d.check = 1;
                        d.mode = m & 512 ? 10 : 12;
                        n = m = 0;
                        break;
                    case 2:
                        for (; 16 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        d.flags = m;
                        if (8 !== (d.flags & 255)) {
                            a.msg = "unknown compression method";
                            d.mode = 30;
                            break
                        }
                        if (d.flags & 57344) {
                            a.msg = "unknown header flags set";
                            d.mode = 30;
                            break
                        }
                        d.head && (d.head.text = m >> 8 & 1);
                        d.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, d.check = u(d.check, O, 2, 0));
                        n = m = 0;
                        d.mode = 3;
                    case 3:
                        for (; 32 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        d.head && (d.head.time = m);
                        d.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, O[2] = m >>> 16 & 255, O[3] = m >>> 24 & 255, d.check = u(d.check, O, 4, 0));
                        n = m = 0;
                        d.mode = 4;
                    case 4:
                        for (; 16 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        d.head && (d.head.xflags = m & 255, d.head.os = m >> 8);
                        d.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, d.check = u(d.check, O, 2, 0));
                        n = m = 0;
                        d.mode =
                            5;
                    case 5:
                        if (d.flags & 1024) {
                            for (; 16 > n;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            d.length = m;
                            d.head && (d.head.extra_len = m);
                            d.flags & 512 && (O[0] = m & 255, O[1] = m >>> 8 & 255, d.check = u(d.check, O, 2, 0));
                            n = m = 0
                        } else d.head && (d.head.extra = null);
                        d.mode = 6;
                    case 6:
                        if (d.flags & 1024 && (q = d.length, q > l && (q = l), q && (d.head && (A = d.head.extra_len - d.length, d.head.extra || (d.head.extra = Array(d.head.extra_len)), p.arraySet(d.head.extra, f, h, q, A)), d.flags & 512 && (d.check = u(d.check, f, q, h)), l -= q, h += q, d.length -= q), d.length)) break a;
                        d.length = 0;
                        d.mode =
                            7;
                    case 7:
                        if (d.flags & 2048) {
                            if (0 === l) break a;
                            q = 0;
                            do A = f[h + q++], d.head && A && 65536 > d.length && (d.head.name += String.fromCharCode(A)); while (A && q < l);
                            d.flags & 512 && (d.check = u(d.check, f, q, h));
                            l -= q;
                            h += q;
                            if (A) break a
                        } else d.head && (d.head.name = null);
                        d.length = 0;
                        d.mode = 8;
                    case 8:
                        if (d.flags & 4096) {
                            if (0 === l) break a;
                            q = 0;
                            do A = f[h + q++], d.head && A && 65536 > d.length && (d.head.comment += String.fromCharCode(A)); while (A && q < l);
                            d.flags & 512 && (d.check = u(d.check, f, q, h));
                            l -= q;
                            h += q;
                            if (A) break a
                        } else d.head && (d.head.comment = null);
                        d.mode =
                            9;
                    case 9:
                        if (d.flags & 512) {
                            for (; 16 > n;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            if (m !== (d.check & 65535)) {
                                a.msg = "header crc mismatch";
                                d.mode = 30;
                                break
                            }
                            n = m = 0
                        }
                        d.head && (d.head.hcrc = d.flags >> 9 & 1, d.head.done = !0);
                        a.adler = d.check = 0;
                        d.mode = 12;
                        break;
                    case 10:
                        for (; 32 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        a.adler = d.check = e(m);
                        n = m = 0;
                        d.mode = 11;
                    case 11:
                        if (0 === d.havedict) return a.next_out = k, a.avail_out = v, a.next_in = h, a.avail_in = l, d.hold = m, d.bits = n, 2;
                        a.adler = d.check = 1;
                        d.mode = 12;
                    case 12:
                        if (5 === b || 6 === b) break a;
                    case 13:
                        if (d.last) {
                            m >>>=
                                n & 7;
                            n -= n & 7;
                            d.mode = 27;
                            break
                        }
                        for (; 3 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        d.last = m & 1;
                        m >>>= 1;
                        --n;
                        switch (m & 3) {
                            case 0:
                                d.mode = 14;
                                break;
                            case 1:
                                q = d;
                                if (x) {
                                    A = void 0;
                                    D = new p.Buf32(512);
                                    B = new p.Buf32(32);
                                    for (A = 0; 144 > A;) q.lens[A++] = 8;
                                    for (; 256 > A;) q.lens[A++] = 9;
                                    for (; 280 > A;) q.lens[A++] = 7;
                                    for (; 288 > A;) q.lens[A++] = 8;
                                    y(1, q.lens, 0, 288, D, 0, q.work, {
                                        bits: 9
                                    });
                                    for (A = 0; 32 > A;) q.lens[A++] = 5;
                                    y(2, q.lens, 0, 32, B, 0, q.work, {
                                        bits: 5
                                    });
                                    x = !1
                                }
                                q.lencode = D;
                                q.lenbits = 9;
                                q.distcode = B;
                                q.distbits = 5;
                                d.mode = 20;
                                if (6 === b) {
                                    m >>>= 2;
                                    n -= 2;
                                    break a
                                }
                                break;
                            case 2:
                                d.mode = 17;
                                break;
                            case 3:
                                a.msg = "invalid block type", d.mode = 30
                        }
                        m >>>= 2;
                        n -= 2;
                        break;
                    case 14:
                        m >>>= n & 7;
                        for (n -= n & 7; 32 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        if ((m & 65535) !== (m >>> 16 ^ 65535)) {
                            a.msg = "invalid stored block lengths";
                            d.mode = 30;
                            break
                        }
                        d.length = m & 65535;
                        n = m = 0;
                        d.mode = 15;
                        if (6 === b) break a;
                    case 15:
                        d.mode = 16;
                    case 16:
                        if (q = d.length) {
                            q > l && (q = l);
                            q > v && (q = v);
                            if (0 === q) break a;
                            p.arraySet(g, f, h, q, k);
                            l -= q;
                            h += q;
                            v -= q;
                            k += q;
                            d.length -= q;
                            break
                        }
                        d.mode = 12;
                        break;
                    case 17:
                        for (; 14 > n;) {
                            if (0 === l) break a;
                            l--;
                            m += f[h++] <<
                                n;
                            n += 8
                        }
                        d.nlen = (m & 31) + 257;
                        m >>>= 5;
                        n -= 5;
                        d.ndist = (m & 31) + 1;
                        m >>>= 5;
                        n -= 5;
                        d.ncode = (m & 15) + 4;
                        m >>>= 4;
                        n -= 4;
                        if (286 < d.nlen || 30 < d.ndist) {
                            a.msg = "too many length or distance symbols";
                            d.mode = 30;
                            break
                        }
                        d.have = 0;
                        d.mode = 18;
                    case 18:
                        for (; d.have < d.ncode;) {
                            for (; 3 > n;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            d.lens[S[d.have++]] = m & 7;
                            m >>>= 3;
                            n -= 3
                        }
                        for (; 19 > d.have;) d.lens[S[d.have++]] = 0;
                        d.lencode = d.lendyn;
                        d.lenbits = 7;
                        q = {
                            bits: d.lenbits
                        };
                        P = y(0, d.lens, 0, 19, d.lencode, 0, d.work, q);
                        d.lenbits = q.bits;
                        if (P) {
                            a.msg = "invalid code lengths set";
                            d.mode = 30;
                            break
                        }
                        d.have = 0;
                        d.mode = 19;
                    case 19:
                        for (; d.have < d.nlen + d.ndist;) {
                            for (;;) {
                                K = d.lencode[m & (1 << d.lenbits) - 1];
                                q = K >>> 24;
                                K &= 65535;
                                if (q <= n) break;
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            if (16 > K) m >>>= q, n -= q, d.lens[d.have++] = K;
                            else {
                                if (16 === K) {
                                    for (A = q + 2; n < A;) {
                                        if (0 === l) break a;
                                        l--;
                                        m += f[h++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    if (0 === d.have) {
                                        a.msg = "invalid bit length repeat";
                                        d.mode = 30;
                                        break
                                    }
                                    A = d.lens[d.have - 1];
                                    q = 3 + (m & 3);
                                    m >>>= 2;
                                    n -= 2
                                } else if (17 === K) {
                                    for (A = q + 3; n < A;) {
                                        if (0 === l) break a;
                                        l--;
                                        m += f[h++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    A = 0;
                                    q = 3 +
                                        (m & 7);
                                    m >>>= 3;
                                    n -= 3
                                } else {
                                    for (A = q + 7; n < A;) {
                                        if (0 === l) break a;
                                        l--;
                                        m += f[h++] << n;
                                        n += 8
                                    }
                                    m >>>= q;
                                    n -= q;
                                    A = 0;
                                    q = 11 + (m & 127);
                                    m >>>= 7;
                                    n -= 7
                                }
                                if (d.have + q > d.nlen + d.ndist) {
                                    a.msg = "invalid bit length repeat";
                                    d.mode = 30;
                                    break
                                }
                                for (; q--;) d.lens[d.have++] = A
                            }
                        }
                        if (30 === d.mode) break;
                        if (0 === d.lens[256]) {
                            a.msg = "invalid code -- missing end-of-block";
                            d.mode = 30;
                            break
                        }
                        d.lenbits = 9;
                        q = {
                            bits: d.lenbits
                        };
                        P = y(1, d.lens, 0, d.nlen, d.lencode, 0, d.work, q);
                        d.lenbits = q.bits;
                        if (P) {
                            a.msg = "invalid literal/lengths set";
                            d.mode = 30;
                            break
                        }
                        d.distbits = 6;
                        d.distcode =
                            d.distdyn;
                        q = {
                            bits: d.distbits
                        };
                        P = y(2, d.lens, d.nlen, d.ndist, d.distcode, 0, d.work, q);
                        d.distbits = q.bits;
                        if (P) {
                            a.msg = "invalid distances set";
                            d.mode = 30;
                            break
                        }
                        d.mode = 20;
                        if (6 === b) break a;
                    case 20:
                        d.mode = 21;
                    case 21:
                        if (6 <= l && 258 <= v) {
                            a.next_out = k;
                            a.avail_out = v;
                            a.next_in = h;
                            a.avail_in = l;
                            d.hold = m;
                            d.bits = n;
                            z(a, J);
                            k = a.next_out;
                            g = a.output;
                            v = a.avail_out;
                            h = a.next_in;
                            f = a.input;
                            l = a.avail_in;
                            m = d.hold;
                            n = d.bits;
                            12 === d.mode && (d.back = -1);
                            break
                        }
                        for (d.back = 0;;) {
                            K = d.lencode[m & (1 << d.lenbits) - 1];
                            q = K >>> 24;
                            A = K >>> 16 & 255;
                            K &= 65535;
                            if (q <=
                                n) break;
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        if (A && 0 === (A & 240)) {
                            N = q;
                            Q = A;
                            for (R = K;;) {
                                K = d.lencode[R + ((m & (1 << N + Q) - 1) >> N)];
                                q = K >>> 24;
                                A = K >>> 16 & 255;
                                K &= 65535;
                                if (N + q <= n) break;
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            m >>>= N;
                            n -= N;
                            d.back += N
                        }
                        m >>>= q;
                        n -= q;
                        d.back += q;
                        d.length = K;
                        if (0 === A) {
                            d.mode = 26;
                            break
                        }
                        if (A & 32) {
                            d.back = -1;
                            d.mode = 12;
                            break
                        }
                        if (A & 64) {
                            a.msg = "invalid literal/length code";
                            d.mode = 30;
                            break
                        }
                        d.extra = A & 15;
                        d.mode = 22;
                    case 22:
                        if (d.extra) {
                            for (A = d.extra; n < A;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            d.length += m & (1 <<
                                d.extra) - 1;
                            m >>>= d.extra;
                            n -= d.extra;
                            d.back += d.extra
                        }
                        d.was = d.length;
                        d.mode = 23;
                    case 23:
                        for (;;) {
                            K = d.distcode[m & (1 << d.distbits) - 1];
                            q = K >>> 24;
                            A = K >>> 16 & 255;
                            K &= 65535;
                            if (q <= n) break;
                            if (0 === l) break a;
                            l--;
                            m += f[h++] << n;
                            n += 8
                        }
                        if (0 === (A & 240)) {
                            N = q;
                            Q = A;
                            for (R = K;;) {
                                K = d.distcode[R + ((m & (1 << N + Q) - 1) >> N)];
                                q = K >>> 24;
                                A = K >>> 16 & 255;
                                K &= 65535;
                                if (N + q <= n) break;
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            m >>>= N;
                            n -= N;
                            d.back += N
                        }
                        m >>>= q;
                        n -= q;
                        d.back += q;
                        if (A & 64) {
                            a.msg = "invalid distance code";
                            d.mode = 30;
                            break
                        }
                        d.offset = K;
                        d.extra = A & 15;
                        d.mode = 24;
                    case 24:
                        if (d.extra) {
                            for (A =
                                d.extra; n < A;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            d.offset += m & (1 << d.extra) - 1;
                            m >>>= d.extra;
                            n -= d.extra;
                            d.back += d.extra
                        }
                        if (d.offset > d.dmax) {
                            a.msg = "invalid distance too far back";
                            d.mode = 30;
                            break
                        }
                        d.mode = 25;
                    case 25:
                        if (0 === v) break a;
                        q = J - v;
                        if (d.offset > q) {
                            q = d.offset - q;
                            if (q > d.whave && d.sane) {
                                a.msg = "invalid distance too far back";
                                d.mode = 30;
                                break
                            }
                            q > d.wnext ? (q -= d.wnext, A = d.wsize - q) : A = d.wnext - q;
                            q > d.length && (q = d.length);
                            N = d.window
                        } else N = g, A = k - d.offset, q = d.length;
                        q > v && (q = v);
                        v -= q;
                        d.length -= q;
                        do g[k++] = N[A++]; while (--q);
                        0 === d.length && (d.mode = 21);
                        break;
                    case 26:
                        if (0 === v) break a;
                        g[k++] = d.length;
                        v--;
                        d.mode = 21;
                        break;
                    case 27:
                        if (d.wrap) {
                            for (; 32 > n;) {
                                if (0 === l) break a;
                                l--;
                                m |= f[h++] << n;
                                n += 8
                            }
                            J -= v;
                            a.total_out += J;
                            d.total += J;
                            J && (a.adler = d.check = d.flags ? u(d.check, g, J, k - J) : r(d.check, g, J, k - J));
                            J = v;
                            if ((d.flags ? m : e(m)) !== d.check) {
                                a.msg = "incorrect data check";
                                d.mode = 30;
                                break
                            }
                            n = m = 0
                        }
                        d.mode = 28;
                    case 28:
                        if (d.wrap && d.flags) {
                            for (; 32 > n;) {
                                if (0 === l) break a;
                                l--;
                                m += f[h++] << n;
                                n += 8
                            }
                            if (m !== (d.total & 4294967295)) {
                                a.msg = "incorrect length check";
                                d.mode =
                                    30;
                                break
                            }
                            n = m = 0
                        }
                        d.mode = 29;
                    case 29:
                        P = 1;
                        break a;
                    case 30:
                        P = -3;
                        break a;
                    case 31:
                        return -4;
                    default:
                        return -2
                }
                a.next_out = k;
                a.avail_out = v;
                a.next_in = h;
                a.avail_in = l;
                d.hold = m;
                d.bits = n;
                if (d.wsize || J !== a.avail_out && 30 > d.mode && (27 > d.mode || 4 !== b)) f = a.output, h = a.next_out, k = J - a.avail_out, v = a.state, null === v.window && (v.wsize = 1 << v.wbits, v.wnext = 0, v.whave = 0, v.window = new p.Buf8(v.wsize)), k >= v.wsize ? (p.arraySet(v.window, f, h - v.wsize, v.wsize, 0), v.wnext = 0, v.whave = v.wsize) : (l = v.wsize - v.wnext, l > k && (l = k), p.arraySet(v.window, f, h -
                    k, l, v.wnext), (k -= l) ? (p.arraySet(v.window, f, h - k, k, 0), v.wnext = k, v.whave = v.wsize) : (v.wnext += l, v.wnext === v.wsize && (v.wnext = 0), v.whave < v.wsize && (v.whave += l)));
                H -= a.avail_in;
                J -= a.avail_out;
                a.total_in += H;
                a.total_out += J;
                d.total += J;
                d.wrap && J && (a.adler = d.check = d.flags ? u(d.check, g, J, a.next_out - J) : r(d.check, g, J, a.next_out - J));
                a.data_type = d.bits + (d.last ? 64 : 0) + (12 === d.mode ? 128 : 0) + (20 === d.mode || 15 === d.mode ? 256 : 0);
                (0 === H && 0 === J || 4 === b) && 0 === P && (P = -5);
                return P
            };
            b.inflateEnd = function(a) {
                if (!a || !a.state) return -2;
                var b =
                    a.state;
                b.window && (b.window = null);
                a.state = null;
                return 0
            };
            b.inflateGetHeader = function(a, b) {
                var d;
                if (!a || !a.state) return -2;
                d = a.state;
                if (0 === (d.wrap & 2)) return -2;
                d.head = b;
                b.done = !1;
                return 0
            };
            b.inflateInfo = "pako inflate (from Nodeca project)"
        }, {
            "../utils/common": 30,
            "./adler32": 32,
            "./crc32": 34,
            "./inffast": 37,
            "./inftrees": 39
        }],
        39: [function(a, d, b) {
            var e = a("../utils/common"),
                g = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                h = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17,
                    18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
                ],
                f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                l = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            d.exports = function(a, b, d, u, z, y, x, D) {
                for (var B = D.bits, w = 0, L = 0, C = 0, I = 0, M = 0, F = 0, t = 0, E = 0, v = 0, m = 0, n, H, J = null, q = 0, A, N = new e.Buf16(16), F = new e.Buf16(16), K = null, Q = 0, R, P, O, w = 0; 15 >= w; w++) N[w] = 0;
                for (L = 0; L < u; L++) N[b[d + L]]++;
                M = B;
                for (I = 15; 1 <=
                    I && 0 === N[I]; I--);
                M > I && (M = I);
                if (0 === I) return z[y++] = 20971520, z[y++] = 20971520, D.bits = 1, 0;
                for (C = 1; C < I && 0 === N[C]; C++);
                M < C && (M = C);
                for (w = E = 1; 15 >= w; w++)
                    if (E <<= 1, E -= N[w], 0 > E) return -1;
                if (0 < E && (0 === a || 1 !== I)) return -1;
                F[1] = 0;
                for (w = 1; 15 > w; w++) F[w + 1] = F[w] + N[w];
                for (L = 0; L < u; L++) 0 !== b[d + L] && (x[F[b[d + L]]++] = L);
                0 === a ? (J = K = x, A = 19) : 1 === a ? (J = g, q -= 257, K = h, Q -= 257, A = 256) : (J = f, K = l, A = -1);
                L = m = 0;
                w = C;
                B = y;
                F = M;
                t = 0;
                H = -1;
                v = 1 << M;
                u = v - 1;
                if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                for (var S = 0;;) {
                    S++;
                    R = w - t;
                    x[L] < A ? (P = 0, O = x[L]) : x[L] > A ? (P = K[Q +
                        x[L]], O = J[q + x[L]]) : (P = 96, O = 0);
                    E = 1 << w - t;
                    C = n = 1 << F;
                    do n -= E, z[B + (m >> t) + n] = R << 24 | P << 16 | O | 0; while (0 !== n);
                    for (E = 1 << w - 1; m & E;) E >>= 1;
                    0 !== E ? (m &= E - 1, m += E) : m = 0;
                    L++;
                    if (0 === --N[w]) {
                        if (w === I) break;
                        w = b[d + x[L]]
                    }
                    if (w > M && (m & u) !== H) {
                        0 === t && (t = M);
                        B += C;
                        F = w - t;
                        for (E = 1 << F; F + t < I;) {
                            E -= N[F + t];
                            if (0 >= E) break;
                            F++;
                            E <<= 1
                        }
                        v += 1 << F;
                        if (1 === a && 852 < v || 2 === a && 592 < v) return 1;
                        H = m & u;
                        z[H] = M << 24 | F << 16 | B - y | 0
                    }
                }
                0 !== m && (z[B + m] = w - t << 24 | 4194304);
                D.bits = M;
                return 0
            }
        }, {
            "../utils/common": 30
        }],
        40: [function(a, d, b) {
            d.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        41: [function(a, d, b) {
            function e(a) {
                for (var b = a.length; 0 <= --b;) a[b] = 0
            }

            function g(a, b, d, e, f) {
                this.static_tree = a;
                this.extra_bits = b;
                this.extra_base = d;
                this.elems = e;
                this.max_length = f;
                this.has_stree = a && a.length
            }

            function h(a, b) {
                this.dyn_tree = a;
                this.max_code = 0;
                this.stat_desc = b
            }

            function f(a, b) {
                a.pending_buf[a.pending++] = b & 255;
                a.pending_buf[a.pending++] = b >>> 8 & 255
            }

            function l(a,
                b, d) {
                a.bi_valid > 16 - d ? (a.bi_buf |= b << a.bi_valid & 65535, f(a, a.bi_buf), a.bi_buf = b >> 16 - a.bi_valid, a.bi_valid += d - 16) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += d)
            }

            function k(a, b, d) {
                l(a, d[2 * b], d[2 * b + 1])
            }

            function p(a, b) {
                var d = 0;
                do d |= a & 1, a >>>= 1, d <<= 1; while (0 < --b);
                return d >>> 1
            }

            function r(a, b, d) {
                var e = Array(16),
                    f = 0,
                    g;
                for (g = 1; 15 >= g; g++) e[g] = f = f + d[g - 1] << 1;
                for (d = 0; d <= b; d++) f = a[2 * d + 1], 0 !== f && (a[2 * d] = p(e[f]++, f))
            }

            function u(a) {
                var b;
                for (b = 0; 286 > b; b++) a.dyn_ltree[2 * b] = 0;
                for (b = 0; 30 > b; b++) a.dyn_dtree[2 * b] = 0;
                for (b = 0; 19 >
                    b; b++) a.bl_tree[2 * b] = 0;
                a.dyn_ltree[512] = 1;
                a.opt_len = a.static_len = 0;
                a.last_lit = a.matches = 0
            }

            function z(a) {
                8 < a.bi_valid ? f(a, a.bi_buf) : 0 < a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf);
                a.bi_buf = 0;
                a.bi_valid = 0
            }

            function y(a, b, d, e) {
                var f = 2 * b,
                    g = 2 * d;
                return a[f] < a[g] || a[f] === a[g] && e[b] <= e[d]
            }

            function x(a, b, d) {
                for (var e = a.heap[d], f = d << 1; f <= a.heap_len;) {
                    f < a.heap_len && y(b, a.heap[f + 1], a.heap[f], a.depth) && f++;
                    if (y(b, e, a.heap[f], a.depth)) break;
                    a.heap[d] = a.heap[f];
                    d = f;
                    f <<= 1
                }
                a.heap[d] = e
            }

            function D(a, b, d) {
                var e, f,
                    g = 0,
                    h, m;
                if (0 !== a.last_lit) {
                    do e = a.pending_buf[a.d_buf + 2 * g] << 8 | a.pending_buf[a.d_buf + 2 * g + 1], f = a.pending_buf[a.l_buf + g], g++, 0 === e ? k(a, f, b) : (h = J[f], k(a, h + 256 + 1, b), m = F[h], 0 !== m && (f -= q[h], l(a, f, m)), e--, h = 256 > e ? H[e] : H[256 + (e >>> 7)], k(a, h, d), m = t[h], 0 !== m && (e -= A[h], l(a, e, m))); while (g < a.last_lit)
                }
                k(a, 256, b)
            }

            function B(a, b) {
                var d = b.dyn_tree,
                    e = b.stat_desc.static_tree,
                    f = b.stat_desc.has_stree,
                    g = b.stat_desc.elems,
                    h, l = -1,
                    k;
                a.heap_len = 0;
                a.heap_max = 573;
                for (h = 0; h < g; h++) 0 !== d[2 * h] ? (a.heap[++a.heap_len] = l = h, a.depth[h] =
                    0) : d[2 * h + 1] = 0;
                for (; 2 > a.heap_len;) k = a.heap[++a.heap_len] = 2 > l ? ++l : 0, d[2 * k] = 1, a.depth[k] = 0, a.opt_len--, f && (a.static_len -= e[2 * k + 1]);
                b.max_code = l;
                for (h = a.heap_len >> 1; 1 <= h; h--) x(a, d, h);
                k = g;
                do h = a.heap[1], a.heap[1] = a.heap[a.heap_len--], x(a, d, 1), e = a.heap[1], a.heap[--a.heap_max] = h, a.heap[--a.heap_max] = e, d[2 * k] = d[2 * h] + d[2 * e], a.depth[k] = (a.depth[h] >= a.depth[e] ? a.depth[h] : a.depth[e]) + 1, d[2 * h + 1] = d[2 * e + 1] = k, a.heap[1] = k++, x(a, d, 1); while (2 <= a.heap_len);
                a.heap[--a.heap_max] = a.heap[1];
                h = b.dyn_tree;
                k = b.max_code;
                for (var m =
                        b.stat_desc.static_tree, n = b.stat_desc.has_stree, p = b.stat_desc.extra_bits, q = b.stat_desc.extra_base, u = b.stat_desc.max_length, t, v, w = 0, g = 0; 15 >= g; g++) a.bl_count[g] = 0;
                h[2 * a.heap[a.heap_max] + 1] = 0;
                for (e = a.heap_max + 1; 573 > e; e++) f = a.heap[e], g = h[2 * h[2 * f + 1] + 1] + 1, g > u && (g = u, w++), h[2 * f + 1] = g, f > k || (a.bl_count[g]++, t = 0, f >= q && (t = p[f - q]), v = h[2 * f], a.opt_len += v * (g + t), n && (a.static_len += v * (m[2 * f + 1] + t)));
                if (0 !== w) {
                    do {
                        for (g = u - 1; 0 === a.bl_count[g];) g--;
                        a.bl_count[g]--;
                        a.bl_count[g + 1] += 2;
                        a.bl_count[u]--;
                        w -= 2
                    } while (0 < w);
                    for (g =
                        u; 0 !== g; g--)
                        for (f = a.bl_count[g]; 0 !== f;) m = a.heap[--e], m > k || (h[2 * m + 1] !== g && (a.opt_len += (g - h[2 * m + 1]) * h[2 * m], h[2 * m + 1] = g), f--)
                }
                r(d, l, a.bl_count)
            }

            function w(a, b, d) {
                var e, f = -1,
                    g, h = b[1],
                    k = 0,
                    l = 7,
                    m = 4;
                0 === h && (l = 138, m = 3);
                b[2 * (d + 1) + 1] = 65535;
                for (e = 0; e <= d; e++) g = h, h = b[2 * (e + 1) + 1], ++k < l && g === h || (k < m ? a.bl_tree[2 * g] += k : 0 !== g ? (g !== f && a.bl_tree[2 * g]++, a.bl_tree[32]++) : 10 >= k ? a.bl_tree[34]++ : a.bl_tree[36]++, k = 0, f = g, 0 === h ? (l = 138, m = 3) : g === h ? (l = 6, m = 3) : (l = 7, m = 4))
            }

            function L(a, b, d) {
                var e, f = -1,
                    g, h = b[1],
                    m = 0,
                    n = 7,
                    p = 4;
                0 === h && (n = 138,
                    p = 3);
                for (e = 0; e <= d; e++)
                    if (g = h, h = b[2 * (e + 1) + 1], !(++m < n && g === h)) {
                        if (m < p) {
                            do k(a, g, a.bl_tree); while (0 !== --m)
                        } else 0 !== g ? (g !== f && (k(a, g, a.bl_tree), m--), k(a, 16, a.bl_tree), l(a, m - 3, 2)) : 10 >= m ? (k(a, 17, a.bl_tree), l(a, m - 3, 3)) : (k(a, 18, a.bl_tree), l(a, m - 11, 7));
                        m = 0;
                        f = g;
                        0 === h ? (n = 138, p = 3) : g === h ? (n = 6, p = 3) : (n = 7, p = 4)
                    }
            }

            function C(a) {
                var b = 4093624447,
                    d;
                for (d = 0; 31 >= d; d++, b >>>= 1)
                    if (b & 1 && 0 !== a.dyn_ltree[2 * d]) return 0;
                if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return 1;
                for (d = 32; 256 > d; d++)
                    if (0 !== a.dyn_ltree[2 *
                            d]) return 1;
                return 0
            }

            function I(a, b, d, e) {
                l(a, 0 + (e ? 1 : 0), 3);
                z(a);
                f(a, d);
                f(a, ~d);
                M.arraySet(a.pending_buf, a.window, b, d, a.pending);
                a.pending += d
            }
            var M = a("../utils/common"),
                F = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                t = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                E = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                v = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                m = Array(576);
            e(m);
            var n = Array(60);
            e(n);
            var H = Array(512);
            e(H);
            var J = Array(256);
            e(J);
            var q = Array(29);
            e(q);
            var A =
                Array(30);
            e(A);
            var N, K, Q, R = !1;
            b._tr_init = function(a) {
                if (!R) {
                    var b, d, e, f = Array(16);
                    for (e = d = 0; 28 > e; e++)
                        for (q[e] = d, b = 0; b < 1 << F[e]; b++) J[d++] = e;
                    J[d - 1] = e;
                    for (e = d = 0; 16 > e; e++)
                        for (A[e] = d, b = 0; b < 1 << t[e]; b++) H[d++] = e;
                    for (d >>= 7; 30 > e; e++)
                        for (A[e] = d << 7, b = 0; b < 1 << t[e] - 7; b++) H[256 + d++] = e;
                    for (b = 0; 15 >= b; b++) f[b] = 0;
                    for (b = 0; 143 >= b;) m[2 * b + 1] = 8, b++, f[8]++;
                    for (; 255 >= b;) m[2 * b + 1] = 9, b++, f[9]++;
                    for (; 279 >= b;) m[2 * b + 1] = 7, b++, f[7]++;
                    for (; 287 >= b;) m[2 * b + 1] = 8, b++, f[8]++;
                    r(m, 287, f);
                    for (b = 0; 30 > b; b++) n[2 * b + 1] = 5, n[2 * b] = p(b, 5);
                    N = new g(m,
                        F, 257, 286, 15);
                    K = new g(n, t, 0, 30, 15);
                    Q = new g([], E, 0, 19, 7);
                    R = !0
                }
                a.l_desc = new h(a.dyn_ltree, N);
                a.d_desc = new h(a.dyn_dtree, K);
                a.bl_desc = new h(a.bl_tree, Q);
                a.bi_buf = 0;
                a.bi_valid = 0;
                u(a)
            };
            b._tr_stored_block = I;
            b._tr_flush_block = function(a, b, d, e) {
                var f, g, h = 0;
                if (0 < a.level) {
                    2 === a.strm.data_type && (a.strm.data_type = C(a));
                    B(a, a.l_desc);
                    B(a, a.d_desc);
                    w(a, a.dyn_ltree, a.l_desc.max_code);
                    w(a, a.dyn_dtree, a.d_desc.max_code);
                    B(a, a.bl_desc);
                    for (h = 18; 3 <= h && 0 === a.bl_tree[2 * v[h] + 1]; h--);
                    a.opt_len += 3 * (h + 1) + 14;
                    f = a.opt_len + 3 +
                        7 >>> 3;
                    g = a.static_len + 3 + 7 >>> 3;
                    g <= f && (f = g)
                } else f = g = d + 5;
                if (d + 4 <= f && -1 !== b) I(a, b, d, e);
                else if (4 === a.strategy || g === f) l(a, 2 + (e ? 1 : 0), 3), D(a, m, n);
                else {
                    l(a, 4 + (e ? 1 : 0), 3);
                    b = a.l_desc.max_code + 1;
                    d = a.d_desc.max_code + 1;
                    h += 1;
                    l(a, b - 257, 5);
                    l(a, d - 1, 5);
                    l(a, h - 4, 4);
                    for (f = 0; f < h; f++) l(a, a.bl_tree[2 * v[f] + 1], 3);
                    L(a, a.dyn_ltree, b - 1);
                    L(a, a.dyn_dtree, d - 1);
                    D(a, a.dyn_ltree, a.dyn_dtree)
                }
                u(a);
                e && z(a)
            };
            b._tr_tally = function(a, b, d) {
                a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255;
                a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = b & 255;
                a.pending_buf[a.l_buf +
                    a.last_lit] = d & 255;
                a.last_lit++;
                0 === b ? a.dyn_ltree[2 * d]++ : (a.matches++, b--, a.dyn_ltree[2 * (J[d] + 256 + 1)]++, a.dyn_dtree[2 * (256 > b ? H[b] : H[256 + (b >>> 7)])]++);
                return a.last_lit === a.lit_bufsize - 1
            };
            b._tr_align = function(a) {
                l(a, 2, 3);
                k(a, 256, m);
                16 === a.bi_valid ? (f(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : 8 <= a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf & 255, a.bi_buf >>= 8, a.bi_valid -= 8)
            }
        }, {
            "../utils/common": 30
        }],
        42: [function(a, d, b) {
            d.exports = function() {
                this.input = null;
                this.total_in = this.avail_in = this.next_in = 0;
                this.output =
                    null;
                this.total_out = this.avail_out = this.next_out = 0;
                this.msg = "";
                this.state = null;
                this.data_type = 2;
                this.adler = 0
            }
        }, {}],
        43: [function(a, d, b) {
            (function(d) {
                (function(b) {
                    function h(a, d) {
                        if (!(this instanceof h)) return new h(a, d);
                        for (var e = 0, f = F.length; e < f; e++) this[F[e]] = "";
                        this.q = this.c = "";
                        this.bufferCheckPosition = b.MAX_BUFFER_LENGTH;
                        this.opt = d || {};
                        this.opt.lowercase = this.opt.lowercase || this.opt.lowercasetags;
                        this.looseCase = this.opt.lowercase ? "toLowerCase" : "toUpperCase";
                        this.tags = [];
                        this.closed = this.closedRoot =
                            this.sawRoot = !1;
                        this.tag = this.error = null;
                        this.strict = !!a;
                        this.noscript = !(!a && !this.opt.noscript);
                        this.state = G.BEGIN;
                        this.ENTITIES = (this.strictEntities = this.opt.strictEntities) ? Object.create(b.XML_ENTITIES) : Object.create(b.ENTITIES);
                        this.attribList = [];
                        this.opt.xmlns && (this.ns = Object.create(R));
                        if (this.trackPosition = !1 !== this.opt.position) this.position = this.line = this.column = 0;
                        this.onready && this.onready(void 0)
                    }

                    function f(a, b) {
                        if (!(this instanceof f)) return new f(a, b);
                        t.apply(this);
                        this._parser = new h(a,
                            b);
                        this.readable = this.writable = !0;
                        var d = this;
                        this._parser.onend = function() {
                            d.emit("end")
                        };
                        this._parser.onerror = function(a) {
                            d.emit("error", a);
                            d._parser.error = null
                        };
                        this._decoder = null;
                        v.forEach(function(a) {
                            Object.defineProperty(d, "on" + a, {
                                get: function() {
                                    return d._parser["on" + a]
                                },
                                set: function(b) {
                                    if (!b) return d.removeAllListeners(a), d._parser["on" + a] = b;
                                    d.on(a, b)
                                },
                                enumerable: !0,
                                configurable: !1
                            })
                        })
                    }

                    function l(a) {
                        return a.split("").reduce(function(a, b) {
                            a[b] = !0;
                            return a
                        }, {})
                    }

                    function k(a, b) {
                        return "[object RegExp]" ===
                            Object.prototype.toString.call(a) ? !!b.match(a) : a[b]
                    }

                    function p(a, b, d) {
                        a.textNode && r(a);
                        a[b] && a[b](d)
                    }

                    function r(a) {
                        a.textNode = u(a.opt, a.textNode);
                        a.textNode && a.ontext && a.ontext(a.textNode);
                        a.textNode = ""
                    }

                    function u(a, b) {
                        a.trim && (b = b.trim());
                        a.normalize && (b = b.replace(/\s+/g, " "));
                        return b
                    }

                    function z(a, b) {
                        r(a);
                        a.trackPosition && (b += "\nLine: " + a.line + "\nColumn: " + a.column + "\nChar: " + a.c);
                        b = Error(b);
                        a.error = b;
                        a.onerror && a.onerror(b);
                        return a
                    }

                    function y(a) {
                        a.sawRoot && !a.closedRoot && x(a, "Unclosed root tag");
                        a.state !== G.BEGIN && a.state !== G.BEGIN_WHITESPACE && a.state !== G.TEXT && z(a, "Unexpected end");
                        r(a);
                        a.c = "";
                        a.closed = !0;
                        a.onend && a.onend(void 0);
                        h.call(a, a.strict, a.opt);
                        return a
                    }

                    function x(a, b) {
                        if ("object" !== typeof a || !(a instanceof h)) throw Error("bad call to strictFail");
                        a.strict && z(a, b)
                    }

                    function D(a, b) {
                        var d = 0 > a.indexOf(":") ? ["", a] : a.split(":"),
                            e = d[0],
                            d = d[1];
                        b && "xmlns" === a && (e = "xmlns", d = "");
                        return {
                            prefix: e,
                            local: d
                        }
                    }

                    function B(a) {
                        a.strict || (a.attribName = a.attribName[a.looseCase]());
                        if (-1 === a.attribList.indexOf(a.attribName) &&
                            !a.tag.attributes.hasOwnProperty(a.attribName))
                            if (a.opt.xmlns) {
                                var b = D(a.attribName, !0),
                                    d = b.local;
                                if ("xmlns" === b.prefix)
                                    if ("xml" === d && a.attribValue !== K) x(a, "xml: prefix must be bound to " + K + "\nActual: " + a.attribValue);
                                    else if ("xmlns" === d && a.attribValue !== Q) x(a, "xmlns: prefix must be bound to " + Q + "\nActual: " + a.attribValue);
                                else {
                                    var b = a.tag,
                                        e = a.tags[a.tags.length - 1] || a;
                                    b.ns === e.ns && (b.ns = Object.create(e.ns));
                                    b.ns[d] = a.attribValue
                                }
                                a.attribList.push([a.attribName, a.attribValue])
                            } else a.tag.attributes[a.attribName] =
                                a.attribValue, p(a, "onattribute", {
                                    name: a.attribName,
                                    value: a.attribValue
                                });
                        a.attribName = a.attribValue = ""
                    }

                    function w(a, b) {
                        if (a.opt.xmlns) {
                            var d = a.tag,
                                e = D(a.tagName);
                            d.prefix = e.prefix;
                            d.local = e.local;
                            d.uri = d.ns[e.prefix] || "";
                            d.prefix && !d.uri && (x(a, "Unbound namespace prefix: " + JSON.stringify(a.tagName)), d.uri = e.prefix);
                            e = a.tags[a.tags.length - 1] || a;
                            d.ns && e.ns !== d.ns && Object.keys(d.ns).forEach(function(b) {
                                p(a, "onopennamespace", {
                                    prefix: b,
                                    uri: d.ns[b]
                                })
                            });
                            for (var e = 0, f = a.attribList.length; e < f; e++) {
                                var g = a.attribList[e],
                                    h = g[0],
                                    k = g[1],
                                    l = D(h, !0),
                                    g = l.prefix,
                                    m = "" === g ? "" : d.ns[g] || "",
                                    k = {
                                        name: h,
                                        value: k,
                                        prefix: g,
                                        local: l.local,
                                        uri: m
                                    };
                                g && "xmlns" !== g && !m && (x(a, "Unbound namespace prefix: " + JSON.stringify(g)), k.uri = g);
                                a.tag.attributes[h] = k;
                                p(a, "onattribute", k)
                            }
                            a.attribList.length = 0
                        }
                        a.tag.isSelfClosing = !!b;
                        a.sawRoot = !0;
                        a.tags.push(a.tag);
                        p(a, "onopentag", a.tag);
                        b || (a.noscript || "script" !== a.tagName.toLowerCase() ? a.state = G.TEXT : a.state = G.SCRIPT, a.tag = null, a.tagName = "");
                        a.attribName = a.attribValue = "";
                        a.attribList.length = 0
                    }

                    function L(a) {
                        if (a.tagName) {
                            if (a.script) {
                                if ("script" !==
                                    a.tagName) {
                                    a.script += "</" + a.tagName + ">";
                                    a.tagName = "";
                                    a.state = G.SCRIPT;
                                    return
                                }
                                p(a, "onscript", a.script);
                                a.script = ""
                            }
                            var b = a.tags.length,
                                d = a.tagName;
                            a.strict || (d = d[a.looseCase]());
                            for (var e = d; b--;)
                                if (a.tags[b].name !== e) x(a, "Unexpected close tag");
                                else break;
                            if (0 > b) x(a, "Unmatched closing tag: " + a.tagName), a.textNode += "</" + a.tagName + ">";
                            else {
                                a.tagName = d;
                                for (d = a.tags.length; d-- > b;) {
                                    var f = a.tag = a.tags.pop();
                                    a.tagName = a.tag.name;
                                    p(a, "onclosetag", a.tagName);
                                    for (var g in f.ns);
                                    e = a.tags[a.tags.length - 1] || a;
                                    a.opt.xmlns && f.ns !== e.ns && Object.keys(f.ns).forEach(function(b) {
                                        p(a, "onclosenamespace", {
                                            prefix: b,
                                            uri: f.ns[b]
                                        })
                                    })
                                }
                                0 === b && (a.closedRoot = !0);
                                a.tagName = a.attribValue = a.attribName = "";
                                a.attribList.length = 0
                            }
                        } else x(a, "Weird empty close tag."), a.textNode += "</>";
                        a.state = G.TEXT
                    }

                    function C(a) {
                        var b = a.entity,
                            d = b.toLowerCase(),
                            e, f = "";
                        if (a.ENTITIES[b]) return a.ENTITIES[b];
                        if (a.ENTITIES[d]) return a.ENTITIES[d];
                        b = d;
                        "#" === b.charAt(0) && ("x" === b.charAt(1) ? (b = b.slice(2), e = parseInt(b, 16), f = e.toString(16)) : (b = b.slice(1),
                            e = parseInt(b, 10), f = e.toString(10)));
                        b = b.replace(/^0+/, "");
                        return f.toLowerCase() !== b ? (x(a, "Invalid character entity"), "&" + a.entity + ";") : String.fromCodePoint(e)
                    }

                    function I(a, b) {
                        "<" === b ? (a.state = G.OPEN_WAKA, a.startTagPosition = a.position) : k(m, b) || (x(a, "Non-whitespace before first tag."), a.textNode = b, a.state = G.TEXT)
                    }

                    function M(a, b) {
                        var d = "";
                        b < a.length && (d = a.charAt(b));
                        return d
                    }
                    b.parser = function(a, b) {
                        return new h(a, b)
                    };
                    b.SAXParser = h;
                    b.SAXStream = f;
                    b.createStream = function(a, b) {
                        return new f(a, b)
                    };
                    b.MAX_BUFFER_LENGTH =
                        65536;
                    var F = "comment sgmlDecl textNode tagName doctype procInstName procInstBody entity attribName attribValue cdata script".split(" ");
                    b.EVENTS = "text processinginstruction sgmldeclaration doctype comment attribute opentag closetag opencdata cdata closecdata error end ready script opennamespace closenamespace".split(" ");
                    Object.create || (Object.create = function(a) {
                        function b() {}
                        b.prototype = a;
                        return new b
                    });
                    Object.keys || (Object.keys = function(a) {
                        var b = [],
                            d;
                        for (d in a) a.hasOwnProperty(d) && b.push(d);
                        return b
                    });
                    h.prototype = {
                        end: function() {
                            y(this)
                        },
                        write: function(a) {
                            if (this.error) throw this.error;
                            if (this.closed) return z(this, "Cannot write after close. Assign an onready handler.");
                            if (null === a) return y(this);
                            for (var d = 0, e = "";;) {
                                this.c = e = M(a, d++);
                                if (!e) break;
                                this.trackPosition && (this.position++, "\n" === e ? (this.line++, this.column = 0) : this.column++);
                                switch (this.state) {
                                    case G.BEGIN:
                                        this.state = G.BEGIN_WHITESPACE;
                                        if ("\ufeff" === e) continue;
                                        I(this, e);
                                        continue;
                                    case G.BEGIN_WHITESPACE:
                                        I(this, e);
                                        continue;
                                    case G.TEXT:
                                        if (this.sawRoot &&
                                            !this.closedRoot) {
                                            for (var f = d - 1; e && "<" !== e && "&" !== e;)(e = M(a, d++)) && this.trackPosition && (this.position++, "\n" === e ? (this.line++, this.column = 0) : this.column++);
                                            this.textNode += a.substring(f, d - 1)
                                        }
                                        "<" !== e || this.sawRoot && this.closedRoot && !this.strict ? (k(m, e) || this.sawRoot && !this.closedRoot || x(this, "Text data outside of root node."), "&" === e ? this.state = G.TEXT_ENTITY : this.textNode += e) : (this.state = G.OPEN_WAKA, this.startTagPosition = this.position);
                                        continue;
                                    case G.SCRIPT:
                                        "<" === e ? this.state = G.SCRIPT_ENDING : this.script +=
                                            e;
                                        continue;
                                    case G.SCRIPT_ENDING:
                                        "/" === e ? this.state = G.CLOSE_TAG : (this.script += "<" + e, this.state = G.SCRIPT);
                                        continue;
                                    case G.OPEN_WAKA:
                                        "!" === e ? (this.state = G.SGML_DECL, this.sgmlDecl = "") : k(m, e) || (k(P, e) ? (this.state = G.OPEN_TAG, this.tagName = e) : "/" === e ? (this.state = G.CLOSE_TAG, this.tagName = "") : "?" === e ? (this.state = G.PROC_INST, this.procInstName = this.procInstBody = "") : (x(this, "Unencoded <"), this.startTagPosition + 1 < this.position && (e = Array(this.position - this.startTagPosition).join(" ") + e), this.textNode += "<" + e, this.state =
                                            G.TEXT));
                                        continue;
                                    case G.SGML_DECL:
                                        (this.sgmlDecl + e).toUpperCase() === A ? (p(this, "onopencdata"), this.state = G.CDATA, this.cdata = this.sgmlDecl = "") : "--" === this.sgmlDecl + e ? (this.state = G.COMMENT, this.sgmlDecl = this.comment = "") : (this.sgmlDecl + e).toUpperCase() === N ? (this.state = G.DOCTYPE, (this.doctype || this.sawRoot) && x(this, "Inappropriately located doctype declaration"), this.sgmlDecl = this.doctype = "") : ">" === e ? (p(this, "onsgmldeclaration", this.sgmlDecl), this.sgmlDecl = "", this.state = G.TEXT) : (k(J, e) && (this.state = G.SGML_DECL_QUOTED),
                                            this.sgmlDecl += e);
                                        continue;
                                    case G.SGML_DECL_QUOTED:
                                        e === this.q && (this.state = G.SGML_DECL, this.q = "");
                                        this.sgmlDecl += e;
                                        continue;
                                    case G.DOCTYPE:
                                        ">" === e ? (this.state = G.TEXT, p(this, "ondoctype", this.doctype), this.doctype = !0) : (this.doctype += e, "[" === e ? this.state = G.DOCTYPE_DTD : k(J, e) && (this.state = G.DOCTYPE_QUOTED, this.q = e));
                                        continue;
                                    case G.DOCTYPE_QUOTED:
                                        this.doctype += e;
                                        e === this.q && (this.q = "", this.state = G.DOCTYPE);
                                        continue;
                                    case G.DOCTYPE_DTD:
                                        this.doctype += e;
                                        "]" === e ? this.state = G.DOCTYPE : k(J, e) && (this.state = G.DOCTYPE_DTD_QUOTED,
                                            this.q = e);
                                        continue;
                                    case G.DOCTYPE_DTD_QUOTED:
                                        this.doctype += e;
                                        e === this.q && (this.state = G.DOCTYPE_DTD, this.q = "");
                                        continue;
                                    case G.COMMENT:
                                        "-" === e ? this.state = G.COMMENT_ENDING : this.comment += e;
                                        continue;
                                    case G.COMMENT_ENDING:
                                        "-" === e ? (this.state = G.COMMENT_ENDED, (this.comment = u(this.opt, this.comment)) && p(this, "oncomment", this.comment), this.comment = "") : (this.comment += "-" + e, this.state = G.COMMENT);
                                        continue;
                                    case G.COMMENT_ENDED:
                                        ">" !== e ? (x(this, "Malformed comment"), this.comment += "--" + e, this.state = G.COMMENT) : this.state =
                                            G.TEXT;
                                        continue;
                                    case G.CDATA:
                                        "]" === e ? this.state = G.CDATA_ENDING : this.cdata += e;
                                        continue;
                                    case G.CDATA_ENDING:
                                        "]" === e ? this.state = G.CDATA_ENDING_2 : (this.cdata += "]" + e, this.state = G.CDATA);
                                        continue;
                                    case G.CDATA_ENDING_2:
                                        ">" === e ? (this.cdata && p(this, "oncdata", this.cdata), p(this, "onclosecdata"), this.cdata = "", this.state = G.TEXT) : "]" === e ? this.cdata += "]" : (this.cdata += "]]" + e, this.state = G.CDATA);
                                        continue;
                                    case G.PROC_INST:
                                        "?" === e ? this.state = G.PROC_INST_ENDING : k(m, e) ? this.state = G.PROC_INST_BODY : this.procInstName += e;
                                        continue;
                                    case G.PROC_INST_BODY:
                                        if (!this.procInstBody && k(m, e)) continue;
                                        else "?" === e ? this.state = G.PROC_INST_ENDING : this.procInstBody += e;
                                        continue;
                                    case G.PROC_INST_ENDING:
                                        ">" === e ? (p(this, "onprocessinginstruction", {
                                            name: this.procInstName,
                                            body: this.procInstBody
                                        }), this.procInstName = this.procInstBody = "", this.state = G.TEXT) : (this.procInstBody += "?" + e, this.state = G.PROC_INST_BODY);
                                        continue;
                                    case G.OPEN_TAG:
                                        if (k(O, e)) this.tagName += e;
                                        else {
                                            this.strict || (this.tagName = this.tagName[this.looseCase]());
                                            var f = this.tags[this.tags.length -
                                                    1] || this,
                                                h = this.tag = {
                                                    name: this.tagName,
                                                    attributes: {}
                                                };
                                            this.opt.xmlns && (h.ns = f.ns);
                                            this.attribList.length = 0;
                                            ">" === e ? w(this) : "/" === e ? this.state = G.OPEN_TAG_SLASH : (k(m, e) || x(this, "Invalid character in tag name"), this.state = G.ATTRIB)
                                        }
                                        continue;
                                    case G.OPEN_TAG_SLASH:
                                        ">" === e ? (w(this, !0), L(this)) : (x(this, "Forward-slash in opening tag not followed by >"), this.state = G.ATTRIB);
                                        continue;
                                    case G.ATTRIB:
                                        if (k(m, e)) continue;
                                        else ">" === e ? w(this) : "/" === e ? this.state = G.OPEN_TAG_SLASH : k(P, e) ? (this.attribName = e, this.attribValue =
                                            "", this.state = G.ATTRIB_NAME) : x(this, "Invalid attribute name");
                                        continue;
                                    case G.ATTRIB_NAME:
                                        "=" === e ? this.state = G.ATTRIB_VALUE : ">" === e ? (x(this, "Attribute without value"), this.attribValue = this.attribName, B(this), w(this)) : k(m, e) ? this.state = G.ATTRIB_NAME_SAW_WHITE : k(O, e) ? this.attribName += e : x(this, "Invalid attribute name");
                                        continue;
                                    case G.ATTRIB_NAME_SAW_WHITE:
                                        if ("=" === e) this.state = G.ATTRIB_VALUE;
                                        else if (k(m, e)) continue;
                                        else x(this, "Attribute without value"), this.attribValue = this.tag.attributes[this.attribName] =
                                            "", p(this, "onattribute", {
                                                name: this.attribName,
                                                value: ""
                                            }), this.attribName = "", ">" === e ? w(this) : k(P, e) ? (this.attribName = e, this.state = G.ATTRIB_NAME) : (x(this, "Invalid attribute name"), this.state = G.ATTRIB);
                                        continue;
                                    case G.ATTRIB_VALUE:
                                        if (k(m, e)) continue;
                                        else k(J, e) ? (this.q = e, this.state = G.ATTRIB_VALUE_QUOTED) : (x(this, "Unquoted attribute value"), this.state = G.ATTRIB_VALUE_UNQUOTED, this.attribValue = e);
                                        continue;
                                    case G.ATTRIB_VALUE_QUOTED:
                                        if (e !== this.q) {
                                            "&" === e ? this.state = G.ATTRIB_VALUE_ENTITY_Q : this.attribValue +=
                                                e;
                                            continue
                                        }
                                        B(this);
                                        this.q = "";
                                        this.state = G.ATTRIB_VALUE_CLOSED;
                                        continue;
                                    case G.ATTRIB_VALUE_CLOSED:
                                        k(m, e) ? this.state = G.ATTRIB : ">" === e ? w(this) : "/" === e ? this.state = G.OPEN_TAG_SLASH : k(P, e) ? (x(this, "No whitespace between attributes"), this.attribName = e, this.attribValue = "", this.state = G.ATTRIB_NAME) : x(this, "Invalid attribute name");
                                        continue;
                                    case G.ATTRIB_VALUE_UNQUOTED:
                                        if (!k(q, e)) {
                                            "&" === e ? this.state = G.ATTRIB_VALUE_ENTITY_U : this.attribValue += e;
                                            continue
                                        }
                                        B(this);
                                        ">" === e ? w(this) : this.state = G.ATTRIB;
                                        continue;
                                    case G.CLOSE_TAG:
                                        if (this.tagName) ">" ===
                                            e ? L(this) : k(O, e) ? this.tagName += e : this.script ? (this.script += "</" + this.tagName, this.tagName = "", this.state = G.SCRIPT) : (k(m, e) || x(this, "Invalid tagname in closing tag"), this.state = G.CLOSE_TAG_SAW_WHITE);
                                        else if (k(m, e)) continue;
                                        else k(P, e) ? this.tagName = e : this.script ? (this.script += "</" + e, this.state = G.SCRIPT) : x(this, "Invalid tagname in closing tag.");
                                        continue;
                                    case G.CLOSE_TAG_SAW_WHITE:
                                        if (k(m, e)) continue;
                                        ">" === e ? L(this) : x(this, "Invalid characters in closing tag");
                                        continue;
                                    case G.TEXT_ENTITY:
                                    case G.ATTRIB_VALUE_ENTITY_Q:
                                    case G.ATTRIB_VALUE_ENTITY_U:
                                        var l,
                                            n;
                                        switch (this.state) {
                                            case G.TEXT_ENTITY:
                                                l = G.TEXT;
                                                n = "textNode";
                                                break;
                                            case G.ATTRIB_VALUE_ENTITY_Q:
                                                l = G.ATTRIB_VALUE_QUOTED;
                                                n = "attribValue";
                                                break;
                                            case G.ATTRIB_VALUE_ENTITY_U:
                                                l = G.ATTRIB_VALUE_UNQUOTED, n = "attribValue"
                                        }
                                        ";" === e ? (this[n] += C(this), this.entity = "", this.state = l) : k(this.entity.length ? U : S, e) ? this.entity += e : (x(this, "Invalid character in entity name"), this[n] += "&" + this.entity + e, this.entity = "", this.state = l);
                                        continue;
                                    default:
                                        throw Error(this, "Unknown state: " + this.state);
                                }
                            }
                            if (this.position >= this.bufferCheckPosition) {
                                a =
                                    Math.max(b.MAX_BUFFER_LENGTH, 10);
                                e = d = 0;
                                for (l = F.length; e < l; e++) {
                                    n = this[F[e]].length;
                                    if (n > a) switch (F[e]) {
                                        case "textNode":
                                            r(this);
                                            break;
                                        case "cdata":
                                            p(this, "oncdata", this.cdata);
                                            this.cdata = "";
                                            break;
                                        case "script":
                                            p(this, "onscript", this.script);
                                            this.script = "";
                                            break;
                                        default:
                                            z(this, "Max buffer length exceeded: " + F[e])
                                    }
                                    d = Math.max(d, n)
                                }
                                this.bufferCheckPosition = b.MAX_BUFFER_LENGTH - d + this.position
                            }
                            return this
                        },
                        resume: function() {
                            this.error = null;
                            return this
                        },
                        close: function() {
                            return this.write(null)
                        },
                        flush: function() {
                            r(this);
                            "" !== this.cdata && (p(this, "oncdata", this.cdata), this.cdata = "");
                            "" !== this.script && (p(this, "onscript", this.script), this.script = "")
                        }
                    };
                    var t;
                    try {
                        t = a("stream").Stream
                    } catch (E) {
                        t = function() {}
                    }
                    var v = b.EVENTS.filter(function(a) {
                        return "error" !== a && "end" !== a
                    });
                    f.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: f
                        }
                    });
                    f.prototype.write = function(b) {
                        "function" === typeof d && "function" === typeof d.isBuffer && d.isBuffer(b) && (this._decoder || (this._decoder = new(a("string_decoder").StringDecoder)("utf8")), b = this._decoder.write(b));
                        this._parser.write(b.toString());
                        this.emit("data", b);
                        return !0
                    };
                    f.prototype.end = function(a) {
                        a && a.length && this.write(a);
                        this._parser.end();
                        return !0
                    };
                    f.prototype.on = function(a, b) {
                        var d = this;
                        d._parser["on" + a] || -1 === v.indexOf(a) || (d._parser["on" + a] = function() {
                            var b = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                            b.splice(0, 0, a);
                            d.emit.apply(d, b)
                        });
                        return t.prototype.on.call(d, a, b)
                    };
                    var m = "\r\n\t ",
                        n = "0124356789",
                        H = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        J = "'\"",
                        q = m + ">",
                        A =
                        "[CDATA[",
                        N = "DOCTYPE",
                        K = "http://www.w3.org/XML/1998/namespace",
                        Q = "http://www.w3.org/2000/xmlns/",
                        R = {
                            xml: K,
                            xmlns: Q
                        },
                        m = l(m),
                        n = l(n),
                        H = l(H),
                        P = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
                        O = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/,
                        S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
                        U = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/,
                        J = l(J),
                        q = l(q),
                        G = 0;
                    b.STATE = {
                        BEGIN: G++,
                        BEGIN_WHITESPACE: G++,
                        TEXT: G++,
                        TEXT_ENTITY: G++,
                        OPEN_WAKA: G++,
                        SGML_DECL: G++,
                        SGML_DECL_QUOTED: G++,
                        DOCTYPE: G++,
                        DOCTYPE_QUOTED: G++,
                        DOCTYPE_DTD: G++,
                        DOCTYPE_DTD_QUOTED: G++,
                        COMMENT_STARTING: G++,
                        COMMENT: G++,
                        COMMENT_ENDING: G++,
                        COMMENT_ENDED: G++,
                        CDATA: G++,
                        CDATA_ENDING: G++,
                        CDATA_ENDING_2: G++,
                        PROC_INST: G++,
                        PROC_INST_BODY: G++,
                        PROC_INST_ENDING: G++,
                        OPEN_TAG: G++,
                        OPEN_TAG_SLASH: G++,
                        ATTRIB: G++,
                        ATTRIB_NAME: G++,
                        ATTRIB_NAME_SAW_WHITE: G++,
                        ATTRIB_VALUE: G++,
                        ATTRIB_VALUE_QUOTED: G++,
                        ATTRIB_VALUE_CLOSED: G++,
                        ATTRIB_VALUE_UNQUOTED: G++,
                        ATTRIB_VALUE_ENTITY_Q: G++,
                        ATTRIB_VALUE_ENTITY_U: G++,
                        CLOSE_TAG: G++,
                        CLOSE_TAG_SAW_WHITE: G++,
                        SCRIPT: G++,
                        SCRIPT_ENDING: G++
                    };
                    b.XML_ENTITIES = {
                        amp: "&",
                        gt: ">",
                        lt: "<",
                        quot: '"',
                        apos: "'"
                    };
                    b.ENTITIES = {
                        amp: "&",
                        gt: ">",
                        lt: "<",
                        quot: '"',
                        apos: "'",
                        AElig: 198,
                        Aacute: 193,
                        Acirc: 194,
                        Agrave: 192,
                        Aring: 197,
                        Atilde: 195,
                        Auml: 196,
                        Ccedil: 199,
                        ETH: 208,
                        Eacute: 201,
                        Ecirc: 202,
                        Egrave: 200,
                        Euml: 203,
                        Iacute: 205,
                        Icirc: 206,
                        Igrave: 204,
                        Iuml: 207,
                        Ntilde: 209,
                        Oacute: 211,
                        Ocirc: 212,
                        Ograve: 210,
                        Oslash: 216,
                        Otilde: 213,
                        Ouml: 214,
                        THORN: 222,
                        Uacute: 218,
                        Ucirc: 219,
                        Ugrave: 217,
                        Uuml: 220,
                        Yacute: 221,
                        aacute: 225,
                        acirc: 226,
                        aelig: 230,
                        agrave: 224,
                        aring: 229,
                        atilde: 227,
                        auml: 228,
                        ccedil: 231,
                        eacute: 233,
                        ecirc: 234,
                        egrave: 232,
                        eth: 240,
                        euml: 235,
                        iacute: 237,
                        icirc: 238,
                        igrave: 236,
                        iuml: 239,
                        ntilde: 241,
                        oacute: 243,
                        ocirc: 244,
                        ograve: 242,
                        oslash: 248,
                        otilde: 245,
                        ouml: 246,
                        szlig: 223,
                        thorn: 254,
                        uacute: 250,
                        ucirc: 251,
                        ugrave: 249,
                        uuml: 252,
                        yacute: 253,
                        yuml: 255,
                        copy: 169,
                        reg: 174,
                        nbsp: 160,
                        iexcl: 161,
                        cent: 162,
                        pound: 163,
                        curren: 164,
                        yen: 165,
                        brvbar: 166,
                        sect: 167,
                        uml: 168,
                        ordf: 170,
                        laquo: 171,
                        not: 172,
                        shy: 173,
                        macr: 175,
                        deg: 176,
                        plusmn: 177,
                        sup1: 185,
                        sup2: 178,
                        sup3: 179,
                        acute: 180,
                        micro: 181,
                        para: 182,
                        middot: 183,
                        cedil: 184,
                        ordm: 186,
                        raquo: 187,
                        frac14: 188,
                        frac12: 189,
                        frac34: 190,
                        iquest: 191,
                        times: 215,
                        divide: 247,
                        OElig: 338,
                        oelig: 339,
                        Scaron: 352,
                        scaron: 353,
                        Yuml: 376,
                        fnof: 402,
                        circ: 710,
                        tilde: 732,
                        Alpha: 913,
                        Beta: 914,
                        Gamma: 915,
                        Delta: 916,
                        Epsilon: 917,
                        Zeta: 918,
                        Eta: 919,
                        Theta: 920,
                        Iota: 921,
                        Kappa: 922,
                        Lambda: 923,
                        Mu: 924,
                        Nu: 925,
                        Xi: 926,
                        Omicron: 927,
                        Pi: 928,
                        Rho: 929,
                        Sigma: 931,
                        Tau: 932,
                        Upsilon: 933,
                        Phi: 934,
                        Chi: 935,
                        Psi: 936,
                        Omega: 937,
                        alpha: 945,
                        beta: 946,
                        gamma: 947,
                        delta: 948,
                        epsilon: 949,
                        zeta: 950,
                        eta: 951,
                        theta: 952,
                        iota: 953,
                        kappa: 954,
                        lambda: 955,
                        mu: 956,
                        nu: 957,
                        xi: 958,
                        omicron: 959,
                        pi: 960,
                        rho: 961,
                        sigmaf: 962,
                        sigma: 963,
                        tau: 964,
                        upsilon: 965,
                        phi: 966,
                        chi: 967,
                        psi: 968,
                        omega: 969,
                        thetasym: 977,
                        upsih: 978,
                        piv: 982,
                        ensp: 8194,
                        emsp: 8195,
                        thinsp: 8201,
                        zwnj: 8204,
                        zwj: 8205,
                        lrm: 8206,
                        rlm: 8207,
                        ndash: 8211,
                        mdash: 8212,
                        lsquo: 8216,
                        rsquo: 8217,
                        sbquo: 8218,
                        ldquo: 8220,
                        rdquo: 8221,
                        bdquo: 8222,
                        dagger: 8224,
                        Dagger: 8225,
                        bull: 8226,
                        hellip: 8230,
                        permil: 8240,
                        prime: 8242,
                        Prime: 8243,
                        lsaquo: 8249,
                        rsaquo: 8250,
                        oline: 8254,
                        frasl: 8260,
                        euro: 8364,
                        image: 8465,
                        weierp: 8472,
                        real: 8476,
                        trade: 8482,
                        alefsym: 8501,
                        larr: 8592,
                        uarr: 8593,
                        rarr: 8594,
                        darr: 8595,
                        harr: 8596,
                        crarr: 8629,
                        lArr: 8656,
                        uArr: 8657,
                        rArr: 8658,
                        dArr: 8659,
                        hArr: 8660,
                        forall: 8704,
                        part: 8706,
                        exist: 8707,
                        empty: 8709,
                        nabla: 8711,
                        isin: 8712,
                        notin: 8713,
                        ni: 8715,
                        prod: 8719,
                        sum: 8721,
                        minus: 8722,
                        lowast: 8727,
                        radic: 8730,
                        prop: 8733,
                        infin: 8734,
                        ang: 8736,
                        and: 8743,
                        or: 8744,
                        cap: 8745,
                        cup: 8746,
                        "int": 8747,
                        there4: 8756,
                        sim: 8764,
                        cong: 8773,
                        asymp: 8776,
                        ne: 8800,
                        equiv: 8801,
                        le: 8804,
                        ge: 8805,
                        sub: 8834,
                        sup: 8835,
                        nsub: 8836,
                        sube: 8838,
                        supe: 8839,
                        oplus: 8853,
                        otimes: 8855,
                        perp: 8869,
                        sdot: 8901,
                        lceil: 8968,
                        rceil: 8969,
                        lfloor: 8970,
                        rfloor: 8971,
                        lang: 9001,
                        rang: 9002,
                        loz: 9674,
                        spades: 9824,
                        clubs: 9827,
                        hearts: 9829,
                        diams: 9830
                    };
                    Object.keys(b.ENTITIES).forEach(function(a) {
                        var d = b.ENTITIES[a],
                            d = "number" ===
                            typeof d ? String.fromCharCode(d) : d;
                        b.ENTITIES[a] = d
                    });
                    for (var T in b.STATE) b.STATE[b.STATE[T]] = T;
                    G = b.STATE;
                    String.fromCodePoint || function() {
                        var a = String.fromCharCode,
                            b = Math.floor,
                            d = function() {
                                var d = [],
                                    e, f, g = -1,
                                    h = arguments.length;
                                if (!h) return "";
                                for (var l = ""; ++g < h;) {
                                    f = Number(arguments[g]);
                                    if (!isFinite(f) || 0 > f || 1114111 < f || b(f) !== f) throw RangeError("Invalid code point: " + f);
                                    65535 >= f ? d.push(f) : (f -= 65536, e = (f >> 10) + 55296, f = f % 1024 + 56320, d.push(e, f));
                                    if (g + 1 === h || 16384 < d.length) l += a.apply(null, d), d.length = 0
                                }
                                return l
                            };
                        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
                            value: d,
                            configurable: !0,
                            writable: !0
                        }) : String.fromCodePoint = d
                    }()
                })("undefined" === typeof b ? this.sax = {} : b)
            }).call(this, a("buffer").Buffer)
        }, {
            buffer: 3,
            stream: 25,
            string_decoder: 26
        }],
        44: [function(a, d, b) {
            var e = e || {};
            e.Transform = e.Transform || ("undefined" !== typeof a ? a("./transform.js") : null);
            var g = g || ("undefined" !== typeof a ? a("../lib/base64-binary.js") : null),
                h = h || ("undefined" !== typeof a ? a("pako") : null);
            e.NIFTI_INTENT_GENMATRIX = "NIFTI_INTENT_GENMATRIX";
            e.NIFTI_INTENT_LABEL = "NIFTI_INTENT_LABEL";
            e.NIFTI_INTENT_NODE_INDEX = "NIFTI_INTENT_NODE_INDEX";
            e.NIFTI_INTENT_POINTSET = "NIFTI_INTENT_POINTSET";
            e.NIFTI_INTENT_RGB_VECTOR = "NIFTI_INTENT_RGB_VECTOR";
            e.NIFTI_INTENT_RGBA_VECTOR = "NIFTI_INTENT_RGBA_VECTOR";
            e.NIFTI_INTENT_SHAPE = "NIFTI_INTENT_SHAPE";
            e.NIFTI_INTENT_TIME_SERIES = "NIFTI_INTENT_TIME_SERIES";
            e.NIFTI_INTENT_TRIANGLE = "NIFTI_INTENT_TRIANGLE";
            e.NIFTI_INTENT_NONE = "NIFTI_INTENT_NONE";
            e.NIFTI_INTENT_VECTOR = "NIFTI_INTENT_VECTOR";
            e.ATT_ARRAYINDEXINGORDER =
                "ArrayIndexingOrder";
            e.ATT_DATATYPE = "DataType";
            e.ATT_DIMENSIONALITY = "Dimensionality";
            e.ATT_DIMN = "Dim";
            e.ATT_ENCODING = "Encoding";
            e.ATT_ENDIAN = "Endian";
            e.ATT_EXTERNALFILENAME = "ExternalFileName";
            e.ATT_EXTERNALFILEOFFSET = "ExternalFileOffset";
            e.ATT_INTENT = "Intent";
            e.ENCODING_ASCII = "ASCII";
            e.ENCODING_BASE64BINARY = "Base64Binary";
            e.ENCODING_GZIPBASE64BINARY = "GZipBase64Binary";
            e.ENCODING_EXTERNALFILEBINARY = "ExternalFileBinary";
            e.TYPE_NIFTI_TYPE_UINT8 = "NIFTI_TYPE_UINT8";
            e.TYPE_NIFTI_TYPE_INT32 = "NIFTI_TYPE_INT32";
            e.TYPE_NIFTI_TYPE_FLOAT32 = "NIFTI_TYPE_FLOAT32";
            e.DataArray = e.DataArray || function() {
                this.attributes = null;
                this.metadata = {};
                this.transforms = [];
                this.data = null;
                this.dataConverted = !1
            };
            e.DataArray.prototype.isPointSet = function() {
                return this.attributes[e.ATT_INTENT] === e.NIFTI_INTENT_POINTSET
            };
            e.DataArray.prototype.isTriangles = function() {
                return this.attributes[e.ATT_INTENT] === e.NIFTI_INTENT_TRIANGLE
            };
            e.DataArray.prototype.isNormals = function() {
                return this.attributes[e.ATT_INTENT] === e.NIFTI_INTENT_VECTOR
            };
            e.DataArray.prototype.isColors =
                function() {
                    return this.attributes[e.ATT_INTENT] === e.NIFTI_INTENT_RGB_VECTOR || this.attributes[e.ATT_INTENT] === e.NIFTI_INTENT_RGBA_VECTOR
                };
            e.DataArray.prototype.getDimensions = function() {
                return parseInt(this.attributes[e.ATT_DIMENSIONALITY])
            };
            e.DataArray.prototype.getNumElements = function(a) {
                void 0 === a && (a = 0);
                return parseInt(this.attributes[e.ATT_DIMN + a])
            };
            e.DataArray.prototype.isScalar = function() {
                return 1 == this.getDimensions()
            };
            e.DataArray.prototype.isTriple = function() {
                return 2 == this.getDimensions() &&
                    3 == this.getNumElements(1)
            };
            e.DataArray.prototype.isQuad = function() {
                return 2 == this.getDimensions() && 4 == this.getNumElements(1)
            };
            e.DataArray.prototype.isAscii = function() {
                return e.ENCODING_ASCII === this.attributes[e.ATT_ENCODING]
            };
            e.DataArray.prototype.isBase64Binary = function() {
                return e.ENCODING_BASE64BINARY === this.attributes[e.ATT_ENCODING]
            };
            e.DataArray.prototype.isGzipBase64Binary = function() {
                return e.ENCODING_GZIPBASE64BINARY === this.attributes[e.ATT_ENCODING]
            };
            e.DataArray.prototype.isBase64Encoded = function() {
                return this.isBase64Binary() ||
                    this.isGzipBase64Binary()
            };
            e.DataArray.prototype.isFloat32 = function() {
                return e.TYPE_NIFTI_TYPE_FLOAT32 === this.attributes[e.ATT_DATATYPE]
            };
            e.DataArray.prototype.isInt32 = function() {
                return e.TYPE_NIFTI_TYPE_INT32 === this.attributes[e.ATT_DATATYPE]
            };
            e.DataArray.prototype.isUnsignedInt8 = function() {
                return e.TYPE_NIFTI_TYPE_UINT8 === this.attributes[e.ATT_DATATYPE]
            };
            e.DataArray.prototype.getData = function() {
                this.dataConverted || (this.dataConverted = !0, this.isAscii() ? this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8ASCII(this) :
                    this.isInt32() ? e.DataArray.readSignedInt32ASCII(this) : e.DataArray.readFloat32ASCII(this) : this.isBase64Binary() ? this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8Base64(this) : this.isInt32() ? e.DataArray.readSignedInt32Base64(this) : e.DataArray.readFloat32Base64(this) : this.isGzipBase64Binary() && (this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8GZIPBase64(this) : this.isInt32() ? e.DataArray.readSignedInt32GZIPBase64(this) : e.DataArray.readFloat32GZIPBase64(this)));
                return this.data
            };
            e.DataArray.prototype.getDataAsync =
                function(a, b) {
                    this.dataConverted || (this.dataConverted = !0, this.isAscii() ? (this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8ASCII(this) : this.isInt32() ? e.DataArray.readSignedInt32ASCII(this) : e.DataArray.readFloat32ASCII(this), b()) : this.isBase64Binary() ? (this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8Base64(this) : this.isInt32() ? e.DataArray.readSignedInt32Base64(this) : e.DataArray.readFloat32Base64(this), b()) : this.isGzipBase64Binary() && (this.isUnsignedInt8() ? e.DataArray.readUnsignedInt8GZIPBase64Async(this,
                        a, b) : this.isInt32() ? e.DataArray.readSignedInt32GZIPBase64Async(this, a, b) : e.DataArray.readFloat32GZIPBase64Async(this, a, b)))
                };
            e.DataArray.readFloat32ASCII = function(a) {
                a.data = new Float32Array(a.data.match(/[+-]?\d+(\.\d+)?/g).map(function(a) {
                    return parseFloat(a)
                }))
            };
            e.DataArray.readSignedInt32ASCII = function(a) {
                a.data = new Int32Array(a.data.match(/[+-]?\d+(\.\d+)?/g).map(function(a) {
                    return parseInt(a)
                }))
            };
            e.DataArray.readUnsignedInt8ASCII = function(a) {
                a.data = new Uint8Array(a.data.match(/[+-]?\d+(\.\d+)?/g).map(function(a) {
                    return parseInt(a)
                }))
            };
            e.DataArray.readUnsignedInt8Base64 = function(a) {
                var b = g.decodeArrayBuffer(a.data);
                a.data = new Uint8Array(b, 0, b.byteLength)
            };
            e.DataArray.readSignedInt32Base64 = function(a) {
                var b = g.decodeArrayBuffer(a.data);
                a.data = new Int32Array(b, 0, b.byteLength / 4)
            };
            e.DataArray.readFloat32Base64 = function(a) {
                var b = g.decodeArrayBuffer(a.data);
                a.data = new Float32Array(b, 0, b.byteLength / 4)
            };
            e.DataArray.readUnsignedInt8GZIPBase64 = function(a) {
                var b = g.decodeArrayBuffer(a.data),
                    b = h.inflate(b).buffer;
                a.data = new Uint8Array(b, 0, b.byteLength)
            };
            e.DataArray.readUnsignedInt8GZIPBase64Async = function(a, b, d) {
                var p = g.decodeArrayBuffer(a.data),
                    r = new h.Inflate,
                    u = function() {
                        a.data = new Uint8Array(r.result.buffer, 0, r.result.buffer.byteLength);
                        d(a.data)
                    };
                setTimeout(function() {
                    e.DataArray.readNext(r, p, 0, b, u)
                }, 0)
            };
            e.DataArray.readSignedInt32GZIPBase64 = function(a) {
                var b = g.decodeArrayBuffer(a.data),
                    b = h.inflate(b).buffer;
                a.data = new Int32Array(b, 0, b.byteLength / 4)
            };
            e.DataArray.readSignedInt32GZIPBase64Async = function(a, b, d) {
                var p = g.decodeArrayBuffer(a.data),
                    r = new h.Inflate,
                    u = function() {
                        a.data = new Int32Array(r.result.buffer, 0, r.result.buffer.byteLength / 4);
                        d(a.data)
                    };
                setTimeout(function() {
                    e.DataArray.readNext(r, p, 0, b, u)
                }, 0)
            };
            e.DataArray.readFloat32GZIPBase64 = function(a) {
                var b = g.decodeArrayBuffer(a.data),
                    b = h.inflate(b).buffer;
                a.data = new Float32Array(b, 0, b.byteLength / 4)
            };
            e.DataArray.readFloat32GZIPBase64Async = function(a, b, d) {
                var p = g.decodeArrayBuffer(a.data),
                    r = new h.Inflate,
                    u = function() {
                        a.data = new Float32Array(r.result.buffer, 0, r.result.buffer.byteLength /
                            4);
                        d(a.data)
                    };
                setTimeout(function() {
                    e.DataArray.readNext(r, p, 0, b, u)
                }, 0)
            };
            e.DataArray.readNext = function(a, b, d, g, h) {
                var u = d + 32768,
                    z = u >= b.byteLength;
                a.push(b.slice(d, d + 32768), z);
                z ? h() : (g(u / b.byteLength), setTimeout(function() {
                    e.DataArray.readNext(a, b, u, g, h)
                }, 0))
            };
            "undefined" !== typeof d && d.exports && (d.exports = e.DataArray)
        }, {
            "../lib/base64-binary.js": 1,
            "./transform.js": 46,
            pako: 27
        }],
        45: [function(a, d, b) {
            var e = e || {};
            e.Utils = e.Utils || ("undefined" !== typeof a ? a("./utilities.js") : null);
            e.DataArray = e.DataArray ||
                ("undefined" !== typeof a ? a("./dataArray.js") : null);
            e.Transform = e.Transform || ("undefined" !== typeof a ? a("./transform.js") : null);
            var g = g || ("undefined" !== typeof a ? a("sax") : null);
            e.TAG_TRANSFORM = "CoordinateSystemTransformMatrix";
            e.TAG_DATA = "Data";
            e.TAG_DATAARRAY = "DataArray";
            e.TAG_DATASPACE = "DataSpace";
            e.TAG_GIFTI = "GIFTI";
            e.TAG_LABEL = "Label";
            e.TAG_LABELTABLE = "LabelTable";
            e.TAG_MATRIXDATA = "MatrixData";
            e.TAG_METADATA = "MetaData";
            e.TAG_MD = "MD";
            e.TAG_NAME = "Name";
            e.TAG_TRANSFORMEDSPACE = "TransformedSpace";
            e.TAG_VALUE =
                "Value";
            e.GIFTI = e.GIFTI || function() {
                this.attributes = null;
                this.metadata = {};
                this.dataArrays = []
            };
            e.GIFTI.prototype.getPointsDataArray = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a += 1)
                    if (this.dataArrays[a].isPointSet()) return this.dataArrays[a];
                return null
            };
            e.GIFTI.prototype.getTrianglesDataArray = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a += 1)
                    if (this.dataArrays[a].isTriangles()) return this.dataArrays[a];
                return null
            };
            e.GIFTI.prototype.getNormalsDataArray = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a +=
                    1)
                    if (this.dataArrays[a].isNormals()) return this.dataArrays[a];
                return null
            };
            e.GIFTI.prototype.getColorsDataArray = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a += 1)
                    if (this.dataArrays[a].isColors()) return this.dataArrays[a];
                return null
            };
            e.GIFTI.prototype.getNumPoints = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a += 1)
                    if (this.dataArrays[a].isPointSet()) return this.dataArrays[a].getNumElements();
                return 0
            };
            e.GIFTI.prototype.getNumTriangles = function() {
                var a;
                for (a = 0; a < this.dataArrays.length; a += 1)
                    if (this.dataArrays[a].isTriangles()) return this.dataArrays[a].getNumElements();
                return 0
            };
            e.isThisFormat = function(a) {
                return -1 !== a.indexOf(".gii")
            };
            e.parse = function(a) {
                var b = g.parser(!0),
                    d = null,
                    k = null,
                    p = null,
                    r = null,
                    u = null,
                    z = null,
                    y = "",
                    x = !1,
                    D = !1,
                    B = !1,
                    w = !1,
                    L = !1,
                    C = !1;
                b.onopentag = function(a) {
                    a.name === e.TAG_GIFTI ? (p = d = new e.GIFTI, d.attributes = a.attributes) : a.name !== e.TAG_METADATA && a.name !== e.TAG_MD && (a.name === e.TAG_NAME ? x = !0 : a.name === e.TAG_VALUE ? D = !0 : a.name === e.TAG_DATAARRAY ? (p = k = new e.DataArray, d.dataArrays.push(k), k.attributes = a.attributes) : a.name === e.TAG_TRANSFORM ? (z = new e.Transform,
                        k.transforms.push(z)) : a.name === e.TAG_DATASPACE ? B = !0 : a.name === e.TAG_TRANSFORMEDSPACE ? w = !0 : a.name === e.TAG_MATRIXDATA ? L = !0 : a.name === e.TAG_DATA && (C = !0))
                };
                b.ontext = b.oncdata = function(a) {
                    x ? y += a : D ? y += a : B ? y += a : w ? y += a : L ? y += a : C && (y += a)
                };
                b.onclosetag = function(a) {
                    a !== e.TAG_GIFTI && a !== e.TAG_METADATA && (a === e.TAG_MD ? p && (p.metadata[r] = u) : a === e.TAG_NAME ? (x = !1, r = y, y = "") : a === e.TAG_VALUE ? (D = !1, u = y, y = "") : a !== e.TAG_DATAARRAY && a !== e.TAG_TRANSFORM && (a === e.TAG_DATASPACE ? (B = !1, z.dataSpace = y, y = "") : a === e.TAG_TRANSFORMEDSPACE ?
                        (w = !1, z.transformedSpace = y, y = "") : a === e.TAG_MATRIXDATA ? (L = !1, z.matrixData = y, y = "") : a === e.TAG_DATA && (C = !1, k.data = y, y = "")))
                };
                b.onerror = function(a) {
                    console.log(a)
                };
                b.write(a).close();
                return d
            };
            "undefined" !== typeof d && d.exports && (d.exports = e)
        }, {
            "./dataArray.js": 44,
            "./transform.js": 46,
            "./utilities.js": 47,
            sax: 43
        }],
        46: [function(a, d, b) {
            var e = e || {};
            e.Transform = e.Transform || function() {
                this.matrixData = this.transformedSpace = this.dataSpace = null
            };
            "undefined" !== typeof d && d.exports && (d.exports = e.Transform)
        }, {}],
        47: [function(a,
            d, b) {
            var e = e || {};
            e.Utils = e.Utils || {};
            e.Utils.crcTable = null;
            e.Utils.makeCRCTable = function() {
                for (var a, b = [], d = 0; 256 > d; d++) {
                    a = d;
                    for (var e = 0; 8 > e; e++) a = a & 1 ? 3988292384 ^ a >>> 1 : a >>> 1;
                    b[d] = a
                }
                return b
            };
            e.Utils.crc32 = function(a) {
                for (var b = e.Utils.crcTable || (e.Utils.crcTable = e.Utils.makeCRCTable()), d = -1, l = 0; l < a.byteLength; l++) d = d >>> 8 ^ b[(d ^ a.getUint8(l)) & 255];
                return (d ^ -1) >>> 0
            };
            "undefined" !== typeof d && d.exports && (d.exports = e.Utils)
        }, {}]
    }, {}, [45])(45)
});
glMatrixArrayType = "undefined" != typeof Float32Array ? Float32Array : "undefined" != typeof WebGLFloatArray ? WebGLFloatArray : Array;
var vec3 = {
        create: function(c) {
            var a = new glMatrixArrayType(3);
            c && (a[0] = c[0], a[1] = c[1], a[2] = c[2]);
            return a
        },
        set: function(c, a) {
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            return a
        },
        add: function(c, a, d) {
            if (!d || c == d) return c[0] += a[0], c[1] += a[1], c[2] += a[2], c;
            d[0] = c[0] + a[0];
            d[1] = c[1] + a[1];
            d[2] = c[2] + a[2];
            return d
        },
        subtract: function(c, a, d) {
            if (!d || c == d) return c[0] -= a[0], c[1] -= a[1], c[2] -= a[2], c;
            d[0] = c[0] - a[0];
            d[1] = c[1] - a[1];
            d[2] = c[2] - a[2];
            return d
        },
        negate: function(c, a) {
            a || (a = c);
            a[0] = -c[0];
            a[1] = -c[1];
            a[2] = -c[2];
            return a
        },
        scale: function(c,
            a, d) {
            if (!d || c == d) return c[0] *= a, c[1] *= a, c[2] *= a, c;
            d[0] = c[0] * a;
            d[1] = c[1] * a;
            d[2] = c[2] * a;
            return d
        },
        normalize: function(c, a) {
            a || (a = c);
            var d = c[0],
                b = c[1],
                e = c[2],
                g = Math.sqrt(d * d + b * b + e * e);
            if (g) {
                if (1 == g) return a[0] = d, a[1] = b, a[2] = e, a
            } else return a[0] = 0, a[1] = 0, a[2] = 0, a;
            g = 1 / g;
            a[0] = d * g;
            a[1] = b * g;
            a[2] = e * g;
            return a
        },
        cross: function(c, a, d) {
            d || (d = c);
            var b = c[0],
                e = c[1];
            c = c[2];
            var g = a[0],
                h = a[1];
            a = a[2];
            d[0] = e * a - c * h;
            d[1] = c * g - b * a;
            d[2] = b * h - e * g;
            return d
        },
        length: function(c) {
            var a = c[0],
                d = c[1];
            c = c[2];
            return Math.sqrt(a * a + d * d + c *
                c)
        },
        dot: function(c, a) {
            return c[0] * a[0] + c[1] * a[1] + c[2] * a[2]
        },
        direction: function(c, a, d) {
            d || (d = c);
            var b = c[0] - a[0],
                e = c[1] - a[1];
            c = c[2] - a[2];
            a = Math.sqrt(b * b + e * e + c * c);
            if (!a) return d[0] = 0, d[1] = 0, d[2] = 0, d;
            a = 1 / a;
            d[0] = b * a;
            d[1] = e * a;
            d[2] = c * a;
            return d
        },
        lerp: function(c, a, d, b) {
            b || (b = c);
            b[0] = c[0] + d * (a[0] - c[0]);
            b[1] = c[1] + d * (a[1] - c[1]);
            b[2] = c[2] + d * (a[2] - c[2]);
            return b
        },
        str: function(c) {
            return "[" + c[0] + ", " + c[1] + ", " + c[2] + "]"
        }
    },
    mat3 = {
        create: function(c) {
            var a = new glMatrixArrayType(9);
            c && (a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] =
                c[3], a[4] = c[4], a[5] = c[5], a[6] = c[6], a[7] = c[7], a[8] = c[8], a[9] = c[9]);
            return a
        },
        set: function(c, a) {
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = c[3];
            a[4] = c[4];
            a[5] = c[5];
            a[6] = c[6];
            a[7] = c[7];
            a[8] = c[8];
            return a
        },
        identity: function(c) {
            c[0] = 1;
            c[1] = 0;
            c[2] = 0;
            c[3] = 0;
            c[4] = 1;
            c[5] = 0;
            c[6] = 0;
            c[7] = 0;
            c[8] = 1;
            return c
        },
        transpose: function(c, a) {
            if (!a || c == a) {
                var d = c[1],
                    b = c[2],
                    e = c[5];
                c[1] = c[3];
                c[2] = c[6];
                c[3] = d;
                c[5] = c[7];
                c[6] = b;
                c[7] = e;
                return c
            }
            a[0] = c[0];
            a[1] = c[3];
            a[2] = c[6];
            a[3] = c[1];
            a[4] = c[4];
            a[5] = c[7];
            a[6] = c[2];
            a[7] = c[5];
            a[8] = c[8];
            return a
        },
        toMat4: function(c, a) {
            a || (a = mat4.create());
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = 0;
            a[4] = c[3];
            a[5] = c[4];
            a[6] = c[5];
            a[7] = 0;
            a[8] = c[6];
            a[9] = c[7];
            a[10] = c[8];
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        },
        str: function(c) {
            return "[" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + ", " + c[4] + ", " + c[5] + ", " + c[6] + ", " + c[7] + ", " + c[8] + "]"
        }
    },
    mat4 = {
        create: function(c) {
            var a = new glMatrixArrayType(16);
            c && (a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = c[3], a[4] = c[4], a[5] = c[5], a[6] = c[6], a[7] = c[7], a[8] = c[8], a[9] = c[9], a[10] = c[10], a[11] = c[11], a[12] =
                c[12], a[13] = c[13], a[14] = c[14], a[15] = c[15]);
            return a
        },
        set: function(c, a) {
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = c[3];
            a[4] = c[4];
            a[5] = c[5];
            a[6] = c[6];
            a[7] = c[7];
            a[8] = c[8];
            a[9] = c[9];
            a[10] = c[10];
            a[11] = c[11];
            a[12] = c[12];
            a[13] = c[13];
            a[14] = c[14];
            a[15] = c[15];
            return a
        },
        identity: function(c) {
            c[0] = 1;
            c[1] = 0;
            c[2] = 0;
            c[3] = 0;
            c[4] = 0;
            c[5] = 1;
            c[6] = 0;
            c[7] = 0;
            c[8] = 0;
            c[9] = 0;
            c[10] = 1;
            c[11] = 0;
            c[12] = 0;
            c[13] = 0;
            c[14] = 0;
            c[15] = 1;
            return c
        },
        transpose: function(c, a) {
            if (!a || c == a) {
                var d = c[1],
                    b = c[2],
                    e = c[3],
                    g = c[6],
                    h = c[7],
                    f = c[11];
                c[1] = c[4];
                c[2] =
                    c[8];
                c[3] = c[12];
                c[4] = d;
                c[6] = c[9];
                c[7] = c[13];
                c[8] = b;
                c[9] = g;
                c[11] = c[14];
                c[12] = e;
                c[13] = h;
                c[14] = f;
                return c
            }
            a[0] = c[0];
            a[1] = c[4];
            a[2] = c[8];
            a[3] = c[12];
            a[4] = c[1];
            a[5] = c[5];
            a[6] = c[9];
            a[7] = c[13];
            a[8] = c[2];
            a[9] = c[6];
            a[10] = c[10];
            a[11] = c[14];
            a[12] = c[3];
            a[13] = c[7];
            a[14] = c[11];
            a[15] = c[15];
            return a
        },
        determinant: function(c) {
            var a = c[0],
                d = c[1],
                b = c[2],
                e = c[3],
                g = c[4],
                h = c[5],
                f = c[6],
                l = c[7],
                k = c[8],
                p = c[9],
                r = c[10],
                u = c[11],
                z = c[12],
                y = c[13],
                x = c[14];
            c = c[15];
            return z * p * f * e - k * y * f * e - z * h * r * e + g * y * r * e + k * h * x * e - g * p * x * e - z * p * b * l + k * y * b * l +
                z * d * r * l - a * y * r * l - k * d * x * l + a * p * x * l + z * h * b * u - g * y * b * u - z * d * f * u + a * y * f * u + g * d * x * u - a * h * x * u - k * h * b * c + g * p * b * c + k * d * f * c - a * p * f * c - g * d * r * c + a * h * r * c
        },
        inverse: function(c, a) {
            a || (a = c);
            var d = c[0],
                b = c[1],
                e = c[2],
                g = c[3],
                h = c[4],
                f = c[5],
                l = c[6],
                k = c[7],
                p = c[8],
                r = c[9],
                u = c[10],
                z = c[11],
                y = c[12],
                x = c[13],
                D = c[14],
                B = c[15],
                w = d * f - b * h,
                L = d * l - e * h,
                C = d * k - g * h,
                I = b * l - e * f,
                M = b * k - g * f,
                F = e * k - g * l,
                t = p * x - r * y,
                E = p * D - u * y,
                v = p * B - z * y,
                m = r * D - u * x,
                n = r * B - z * x,
                H = u * B - z * D,
                J = 1 / (w * H - L * n + C * m + I * v - M * E + F * t);
            a[0] = (f * H - l * n + k * m) * J;
            a[1] = (-b * H + e * n - g * m) * J;
            a[2] = (x * F - D * M + B * I) * J;
            a[3] =
                (-r * F + u * M - z * I) * J;
            a[4] = (-h * H + l * v - k * E) * J;
            a[5] = (d * H - e * v + g * E) * J;
            a[6] = (-y * F + D * C - B * L) * J;
            a[7] = (p * F - u * C + z * L) * J;
            a[8] = (h * n - f * v + k * t) * J;
            a[9] = (-d * n + b * v - g * t) * J;
            a[10] = (y * M - x * C + B * w) * J;
            a[11] = (-p * M + r * C - z * w) * J;
            a[12] = (-h * m + f * E - l * t) * J;
            a[13] = (d * m - b * E + e * t) * J;
            a[14] = (-y * I + x * L - D * w) * J;
            a[15] = (p * I - r * L + u * w) * J;
            return a
        },
        toRotationMat: function(c, a) {
            a || (a = mat4.create());
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = c[3];
            a[4] = c[4];
            a[5] = c[5];
            a[6] = c[6];
            a[7] = c[7];
            a[8] = c[8];
            a[9] = c[9];
            a[10] = c[10];
            a[11] = c[11];
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        },
        toMat3: function(c, a) {
            a || (a = mat3.create());
            a[0] = c[0];
            a[1] = c[1];
            a[2] = c[2];
            a[3] = c[4];
            a[4] = c[5];
            a[5] = c[6];
            a[6] = c[8];
            a[7] = c[9];
            a[8] = c[10];
            return a
        },
        toInverseMat3: function(c, a) {
            var d = c[0],
                b = c[1],
                e = c[2],
                g = c[4],
                h = c[5],
                f = c[6],
                l = c[8],
                k = c[9],
                p = c[10],
                r = p * h - f * k,
                u = -p * g + f * l,
                z = k * g - h * l,
                y = d * r + b * u + e * z;
            if (!y) return null;
            y = 1 / y;
            a || (a = mat3.create());
            a[0] = r * y;
            a[1] = (-p * b + e * k) * y;
            a[2] = (f * b - e * h) * y;
            a[3] = u * y;
            a[4] = (p * d - e * l) * y;
            a[5] = (-f * d + e * g) * y;
            a[6] = z * y;
            a[7] = (-k * d + b * l) * y;
            a[8] = (h * d - b * g) * y;
            return a
        },
        multiply: function(c, a, d) {
            d || (d =
                c);
            var b = c[0],
                e = c[1],
                g = c[2],
                h = c[3],
                f = c[4],
                l = c[5],
                k = c[6],
                p = c[7],
                r = c[8],
                u = c[9],
                z = c[10],
                y = c[11],
                x = c[12],
                D = c[13],
                B = c[14];
            c = c[15];
            var w = a[0],
                L = a[1],
                C = a[2],
                I = a[3],
                M = a[4],
                F = a[5],
                t = a[6],
                E = a[7],
                v = a[8],
                m = a[9],
                n = a[10],
                H = a[11],
                J = a[12],
                q = a[13],
                A = a[14];
            a = a[15];
            d[0] = w * b + L * f + C * r + I * x;
            d[1] = w * e + L * l + C * u + I * D;
            d[2] = w * g + L * k + C * z + I * B;
            d[3] = w * h + L * p + C * y + I * c;
            d[4] = M * b + F * f + t * r + E * x;
            d[5] = M * e + F * l + t * u + E * D;
            d[6] = M * g + F * k + t * z + E * B;
            d[7] = M * h + F * p + t * y + E * c;
            d[8] = v * b + m * f + n * r + H * x;
            d[9] = v * e + m * l + n * u + H * D;
            d[10] = v * g + m * k + n * z + H * B;
            d[11] = v * h + m * p + n * y + H * c;
            d[12] = J * b + q * f + A * r + a * x;
            d[13] = J * e + q * l + A * u + a * D;
            d[14] = J * g + q * k + A * z + a * B;
            d[15] = J * h + q * p + A * y + a * c;
            return d
        },
        multiplyVec3: function(c, a, d) {
            d || (d = a);
            var b = a[0],
                e = a[1];
            a = a[2];
            d[0] = c[0] * b + c[4] * e + c[8] * a + c[12];
            d[1] = c[1] * b + c[5] * e + c[9] * a + c[13];
            d[2] = c[2] * b + c[6] * e + c[10] * a + c[14];
            return d
        },
        multiplyVec4: function(c, a, d) {
            d || (d = a);
            var b = a[0],
                e = a[1],
                g = a[2];
            a = a[3];
            d[0] = c[0] * b + c[4] * e + c[8] * g + c[12] * a;
            d[1] = c[1] * b + c[5] * e + c[9] * g + c[13] * a;
            d[2] = c[2] * b + c[6] * e + c[10] * g + c[14] * a;
            d[3] = c[3] * b + c[7] * e + c[11] * g + c[15] * a;
            return d
        },
        translate: function(c,
            a, d) {
            var b = a[0],
                e = a[1];
            a = a[2];
            if (!d || c == d) return c[12] = c[0] * b + c[4] * e + c[8] * a + c[12], c[13] = c[1] * b + c[5] * e + c[9] * a + c[13], c[14] = c[2] * b + c[6] * e + c[10] * a + c[14], c[15] = c[3] * b + c[7] * e + c[11] * a + c[15], c;
            var g = c[0],
                h = c[1],
                f = c[2],
                l = c[3],
                k = c[4],
                p = c[5],
                r = c[6],
                u = c[7],
                z = c[8],
                y = c[9],
                x = c[10],
                D = c[11];
            d[0] = g;
            d[1] = h;
            d[2] = f;
            d[3] = l;
            d[4] = k;
            d[5] = p;
            d[6] = r;
            d[7] = u;
            d[8] = z;
            d[9] = y;
            d[10] = x;
            d[11] = D;
            d[12] = g * b + k * e + z * a + c[12];
            d[13] = h * b + p * e + y * a + c[13];
            d[14] = f * b + r * e + x * a + c[14];
            d[15] = l * b + u * e + D * a + c[15];
            return d
        },
        scale: function(c, a, d) {
            var b = a[0],
                e =
                a[1];
            a = a[2];
            if (!d || c == d) return c[0] *= b, c[1] *= b, c[2] *= b, c[3] *= b, c[4] *= e, c[5] *= e, c[6] *= e, c[7] *= e, c[8] *= a, c[9] *= a, c[10] *= a, c[11] *= a, c;
            d[0] = c[0] * b;
            d[1] = c[1] * b;
            d[2] = c[2] * b;
            d[3] = c[3] * b;
            d[4] = c[4] * e;
            d[5] = c[5] * e;
            d[6] = c[6] * e;
            d[7] = c[7] * e;
            d[8] = c[8] * a;
            d[9] = c[9] * a;
            d[10] = c[10] * a;
            d[11] = c[11] * a;
            d[12] = c[12];
            d[13] = c[13];
            d[14] = c[14];
            d[15] = c[15];
            return d
        },
        rotate: function(c, a, d, b) {
            var e = d[0],
                g = d[1];
            d = d[2];
            var h = Math.sqrt(e * e + g * g + d * d);
            if (!h) return null;
            1 != h && (h = 1 / h, e *= h, g *= h, d *= h);
            var f = Math.sin(a),
                l = Math.cos(a),
                k = 1 - l;
            a = c[0];
            var h = c[1],
                p = c[2],
                r = c[3],
                u = c[4],
                z = c[5],
                y = c[6],
                x = c[7],
                D = c[8],
                B = c[9],
                w = c[10],
                L = c[11],
                C = e * e * k + l,
                I = g * e * k + d * f,
                M = d * e * k - g * f,
                F = e * g * k - d * f,
                t = g * g * k + l,
                E = d * g * k + e * f,
                v = e * d * k + g * f,
                e = g * d * k - e * f,
                g = d * d * k + l;
            b ? c != b && (b[12] = c[12], b[13] = c[13], b[14] = c[14], b[15] = c[15]) : b = c;
            b[0] = a * C + u * I + D * M;
            b[1] = h * C + z * I + B * M;
            b[2] = p * C + y * I + w * M;
            b[3] = r * C + x * I + L * M;
            b[4] = a * F + u * t + D * E;
            b[5] = h * F + z * t + B * E;
            b[6] = p * F + y * t + w * E;
            b[7] = r * F + x * t + L * E;
            b[8] = a * v + u * e + D * g;
            b[9] = h * v + z * e + B * g;
            b[10] = p * v + y * e + w * g;
            b[11] = r * v + x * e + L * g;
            return b
        },
        rotateX: function(c, a, d) {
            var b = Math.sin(a);
            a = Math.cos(a);
            var e = c[4],
                g = c[5],
                h = c[6],
                f = c[7],
                l = c[8],
                k = c[9],
                p = c[10],
                r = c[11];
            d ? c != d && (d[0] = c[0], d[1] = c[1], d[2] = c[2], d[3] = c[3], d[12] = c[12], d[13] = c[13], d[14] = c[14], d[15] = c[15]) : d = c;
            d[4] = e * a + l * b;
            d[5] = g * a + k * b;
            d[6] = h * a + p * b;
            d[7] = f * a + r * b;
            d[8] = e * -b + l * a;
            d[9] = g * -b + k * a;
            d[10] = h * -b + p * a;
            d[11] = f * -b + r * a;
            return d
        },
        rotateY: function(c, a, d) {
            var b = Math.sin(a);
            a = Math.cos(a);
            var e = c[0],
                g = c[1],
                h = c[2],
                f = c[3],
                l = c[8],
                k = c[9],
                p = c[10],
                r = c[11];
            d ? c != d && (d[4] = c[4], d[5] = c[5], d[6] = c[6], d[7] = c[7], d[12] = c[12], d[13] = c[13], d[14] = c[14],
                d[15] = c[15]) : d = c;
            d[0] = e * a + l * -b;
            d[1] = g * a + k * -b;
            d[2] = h * a + p * -b;
            d[3] = f * a + r * -b;
            d[8] = e * b + l * a;
            d[9] = g * b + k * a;
            d[10] = h * b + p * a;
            d[11] = f * b + r * a;
            return d
        },
        rotateZ: function(c, a, d) {
            var b = Math.sin(a);
            a = Math.cos(a);
            var e = c[0],
                g = c[1],
                h = c[2],
                f = c[3],
                l = c[4],
                k = c[5],
                p = c[6],
                r = c[7];
            d ? c != d && (d[8] = c[8], d[9] = c[9], d[10] = c[10], d[11] = c[11], d[12] = c[12], d[13] = c[13], d[14] = c[14], d[15] = c[15]) : d = c;
            d[0] = e * a + l * b;
            d[1] = g * a + k * b;
            d[2] = h * a + p * b;
            d[3] = f * a + r * b;
            d[4] = e * -b + l * a;
            d[5] = g * -b + k * a;
            d[6] = h * -b + p * a;
            d[7] = f * -b + r * a;
            return d
        },
        frustum: function(c, a, d, b,
            e, g, h) {
            h || (h = mat4.create());
            var f = a - c,
                l = b - d,
                k = g - e;
            h[0] = 2 * e / f;
            h[1] = 0;
            h[2] = 0;
            h[3] = 0;
            h[4] = 0;
            h[5] = 2 * e / l;
            h[6] = 0;
            h[7] = 0;
            h[8] = (a + c) / f;
            h[9] = (b + d) / l;
            h[10] = -(g + e) / k;
            h[11] = -1;
            h[12] = 0;
            h[13] = 0;
            h[14] = -(g * e * 2) / k;
            h[15] = 0;
            return h
        },
        perspective: function(c, a, d, b, e) {
            c = d * Math.tan(c * Math.PI / 360);
            a *= c;
            return mat4.frustum(-a, a, -c, c, d, b, e)
        },
        ortho: function(c, a, d, b, e, g, h) {
            h || (h = mat4.create());
            var f = a - c,
                l = b - d,
                k = g - e;
            h[0] = 2 / f;
            h[1] = 0;
            h[2] = 0;
            h[3] = 0;
            h[4] = 0;
            h[5] = 2 / l;
            h[6] = 0;
            h[7] = 0;
            h[8] = 0;
            h[9] = 0;
            h[10] = -2 / k;
            h[11] = 0;
            h[12] = -(c + a) / f;
            h[13] = -(b + d) / l;
            h[14] = -(g + e) / k;
            h[15] = 1;
            return h
        },
        lookAt: function(c, a, d, b) {
            b || (b = mat4.create());
            var e = c[0],
                g = c[1];
            c = c[2];
            var h = d[0],
                f = d[1],
                l = d[2];
            d = a[1];
            var k = a[2];
            if (e == a[0] && g == d && c == k) return mat4.identity(b);
            var p, r, u, z;
            d = e - a[0];
            k = g - a[1];
            a = c - a[2];
            z = 1 / Math.sqrt(d * d + k * k + a * a);
            d *= z;
            k *= z;
            a *= z;
            p = f * a - l * k;
            l = l * d - h * a;
            h = h * k - f * d;
            (z = Math.sqrt(p * p + l * l + h * h)) ? (z = 1 / z, p *= z, l *= z, h *= z) : h = l = p = 0;
            f = k * h - a * l;
            r = a * p - d * h;
            u = d * l - k * p;
            (z = Math.sqrt(f * f + r * r + u * u)) ? (z = 1 / z, f *= z, r *= z, u *= z) : u = r = f = 0;
            b[0] = p;
            b[1] = f;
            b[2] = d;
            b[3] = 0;
            b[4] = l;
            b[5] = r;
            b[6] = k;
            b[7] = 0;
            b[8] = h;
            b[9] = u;
            b[10] = a;
            b[11] = 0;
            b[12] = -(p * e + l * g + h * c);
            b[13] = -(f * e + r * g + u * c);
            b[14] = -(d * e + k * g + a * c);
            b[15] = 1;
            return b
        },
        str: function(c) {
            return "[" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + ", " + c[4] + ", " + c[5] + ", " + c[6] + ", " + c[7] + ", " + c[8] + ", " + c[9] + ", " + c[10] + ", " + c[11] + ", " + c[12] + ", " + c[13] + ", " + c[14] + ", " + c[15] + "]"
        }
    };
quat4 = {
    create: function(c) {
        var a = new glMatrixArrayType(4);
        c && (a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = c[3]);
        return a
    },
    set: function(c, a) {
        a[0] = c[0];
        a[1] = c[1];
        a[2] = c[2];
        a[3] = c[3];
        return a
    },
    calculateW: function(c, a) {
        var d = c[0],
            b = c[1],
            e = c[2];
        if (!a || c == a) return c[3] = -Math.sqrt(Math.abs(1 - d * d - b * b - e * e)), c;
        a[0] = d;
        a[1] = b;
        a[2] = e;
        a[3] = -Math.sqrt(Math.abs(1 - d * d - b * b - e * e));
        return a
    },
    inverse: function(c, a) {
        if (!a || c == a) return c[0] *= 1, c[1] *= 1, c[2] *= 1, c;
        a[0] = -c[0];
        a[1] = -c[1];
        a[2] = -c[2];
        a[3] = c[3];
        return a
    },
    length: function(c) {
        var a =
            c[0],
            d = c[1],
            b = c[2];
        c = c[3];
        return Math.sqrt(a * a + d * d + b * b + c * c)
    },
    normalize: function(c, a) {
        a || (a = c);
        var d = c[0],
            b = c[1],
            e = c[2],
            g = c[3],
            h = Math.sqrt(d * d + b * b + e * e + g * g);
        if (0 == h) return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, a;
        h = 1 / h;
        a[0] = d * h;
        a[1] = b * h;
        a[2] = e * h;
        a[3] = g * h;
        return a
    },
    multiply: function(c, a, d) {
        d || (d = c);
        var b = c[0],
            e = c[1],
            g = c[2];
        c = c[3];
        var h = a[0],
            f = a[1],
            l = a[2];
        a = a[3];
        d[0] = b * a + c * h + e * l - g * f;
        d[1] = e * a + c * f + g * h - b * l;
        d[2] = g * a + c * l + b * f - e * h;
        d[3] = c * a - b * h - e * f - g * l;
        return d
    },
    multiplyVec3: function(c, a, d) {
        d || (d = a);
        var b = a[0],
            e = a[1],
            g =
            a[2];
        a = c[0];
        var h = c[1],
            f = c[2];
        c = c[3];
        var l = c * b + h * g - f * e,
            k = c * e + f * b - a * g,
            p = c * g + a * e - h * b,
            b = -a * b - h * e - f * g;
        d[0] = l * c + b * -a + k * -f - p * -h;
        d[1] = k * c + b * -h + p * -a - l * -f;
        d[2] = p * c + b * -f + l * -h - k * -a;
        return d
    },
    toMat3: function(c, a) {
        a || (a = mat3.create());
        var d = c[0],
            b = c[1],
            e = c[2],
            g = c[3],
            h = d + d,
            f = b + b,
            l = e + e,
            k = d * h,
            p = d * f,
            d = d * l,
            r = b * f,
            b = b * l,
            e = e * l,
            h = g * h,
            f = g * f,
            g = g * l;
        a[0] = 1 - (r + e);
        a[1] = p - g;
        a[2] = d + f;
        a[3] = p + g;
        a[4] = 1 - (k + e);
        a[5] = b - h;
        a[6] = d - f;
        a[7] = b + h;
        a[8] = 1 - (k + r);
        return a
    },
    toMat4: function(c, a) {
        a || (a = mat4.create());
        var d = c[0],
            b = c[1],
            e = c[2],
            g = c[3],
            h = d + d,
            f = b + b,
            l = e + e,
            k = d * h,
            p = d * f,
            d = d * l,
            r = b * f,
            b = b * l,
            e = e * l,
            h = g * h,
            f = g * f,
            g = g * l;
        a[0] = 1 - (r + e);
        a[1] = p - g;
        a[2] = d + f;
        a[3] = 0;
        a[4] = p + g;
        a[5] = 1 - (k + e);
        a[6] = b - h;
        a[7] = 0;
        a[8] = d - f;
        a[9] = b + h;
        a[10] = 1 - (k + r);
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1;
        return a
    },
    slerp: function(c, a, d, b) {
        b || (b = c);
        var e = d;
        0 > c[0] * a[0] + c[1] * a[1] + c[2] * a[2] + c[3] * a[3] && (e = -1 * d);
        b[0] = 1 - d * c[0] + e * a[0];
        b[1] = 1 - d * c[1] + e * a[1];
        b[2] = 1 - d * c[2] + e * a[2];
        b[3] = 1 - d * c[3] + e * a[3];
        return b
    },
    str: function(c) {
        return "[" + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + "]"
    }
};
var GLU = {};
(function(c) {
    c.unProject = function(a, d, b, e, g, h, f) {
        a = [a, d, b, 1];
        d = [];
        c.multMatrices(e, g, d);
        if (!c.invertMatrix(d, d)) return !1;
        a[0] = (a[0] - h[0]) / h[2];
        a[1] = (a[1] - h[1]) / h[3];
        a[0] = 2 * a[0] - 1;
        a[1] = 2 * a[1] - 1;
        a[2] = 2 * a[2] - 1;
        e = [];
        c.multMatrixVec(d, a, e);
        if (0 === e[3]) return !1;
        e[0] /= e[3];
        e[1] /= e[3];
        e[2] /= e[3];
        f[0] = e[0];
        f[1] = e[1];
        f[2] = e[2];
        return !0
    };
    c.multMatrixVec = function(a, c, b) {
        for (var e = 0; 4 > e; e += 1) b[e] = c[0] * a[0 + e] + c[1] * a[4 + e] + c[2] * a[8 + e] + c[3] * a[12 + e]
    };
    c.multMatrices = function(a, c, b) {
        for (var e = 0; 4 > e; e += 1)
            for (var g = 0; 4 >
                g; g += 1) b[4 * e + g] = a[4 * e + 0] * c[0 + g] + a[4 * e + 1] * c[4 + g] + a[4 * e + 2] * c[8 + g] + a[4 * e + 3] * c[12 + g]
    };
    c.invertMatrix = function(a, c) {
        var b = [];
        b[0] = a[5] * a[10] * a[15] - a[5] * a[11] * a[14] - a[9] * a[6] * a[15] + a[9] * a[7] * a[14] + a[13] * a[6] * a[11] - a[13] * a[7] * a[10];
        b[4] = -a[4] * a[10] * a[15] + a[4] * a[11] * a[14] + a[8] * a[6] * a[15] - a[8] * a[7] * a[14] - a[12] * a[6] * a[11] + a[12] * a[7] * a[10];
        b[8] = a[4] * a[9] * a[15] - a[4] * a[11] * a[13] - a[8] * a[5] * a[15] + a[8] * a[7] * a[13] + a[12] * a[5] * a[11] - a[12] * a[7] * a[9];
        b[12] = -a[4] * a[9] * a[14] + a[4] * a[10] * a[13] + a[8] * a[5] * a[14] - a[8] * a[6] * a[13] -
            a[12] * a[5] * a[10] + a[12] * a[6] * a[9];
        b[1] = -a[1] * a[10] * a[15] + a[1] * a[11] * a[14] + a[9] * a[2] * a[15] - a[9] * a[3] * a[14] - a[13] * a[2] * a[11] + a[13] * a[3] * a[10];
        b[5] = a[0] * a[10] * a[15] - a[0] * a[11] * a[14] - a[8] * a[2] * a[15] + a[8] * a[3] * a[14] + a[12] * a[2] * a[11] - a[12] * a[3] * a[10];
        b[9] = -a[0] * a[9] * a[15] + a[0] * a[11] * a[13] + a[8] * a[1] * a[15] - a[8] * a[3] * a[13] - a[12] * a[1] * a[11] + a[12] * a[3] * a[9];
        b[13] = a[0] * a[9] * a[14] - a[0] * a[10] * a[13] - a[8] * a[1] * a[14] + a[8] * a[2] * a[13] + a[12] * a[1] * a[10] - a[12] * a[2] * a[9];
        b[2] = a[1] * a[6] * a[15] - a[1] * a[7] * a[14] - a[5] * a[2] * a[15] +
            a[5] * a[3] * a[14] + a[13] * a[2] * a[7] - a[13] * a[3] * a[6];
        b[6] = -a[0] * a[6] * a[15] + a[0] * a[7] * a[14] + a[4] * a[2] * a[15] - a[4] * a[3] * a[14] - a[12] * a[2] * a[7] + a[12] * a[3] * a[6];
        b[10] = a[0] * a[5] * a[15] - a[0] * a[7] * a[13] - a[4] * a[1] * a[15] + a[4] * a[3] * a[13] + a[12] * a[1] * a[7] - a[12] * a[3] * a[5];
        b[14] = -a[0] * a[5] * a[14] + a[0] * a[6] * a[13] + a[4] * a[1] * a[14] - a[4] * a[2] * a[13] - a[12] * a[1] * a[6] + a[12] * a[2] * a[5];
        b[3] = -a[1] * a[6] * a[11] + a[1] * a[7] * a[10] + a[5] * a[2] * a[11] - a[5] * a[3] * a[10] - a[9] * a[2] * a[7] + a[9] * a[3] * a[6];
        b[7] = a[0] * a[6] * a[11] - a[0] * a[7] * a[10] - a[4] * a[2] *
            a[11] + a[4] * a[3] * a[10] + a[8] * a[2] * a[7] - a[8] * a[3] * a[6];
        b[11] = -a[0] * a[5] * a[11] + a[0] * a[7] * a[9] + a[4] * a[1] * a[11] - a[4] * a[3] * a[9] - a[8] * a[1] * a[7] + a[8] * a[3] * a[5];
        b[15] = a[0] * a[5] * a[10] - a[0] * a[6] * a[9] - a[4] * a[1] * a[10] + a[4] * a[2] * a[9] + a[8] * a[1] * a[6] - a[8] * a[2] * a[5];
        var e = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
        if (0 === e) return !1;
        for (var e = 1 / e, g = 0; 16 > g; g += 1) c[g] = b[g] * e;
        return !0
    }
})(GLU);
var PAPAYA_BROWSER_MIN_FIREFOX = 7,
    PAPAYA_BROWSER_MIN_CHROME = 7,
    PAPAYA_BROWSER_MIN_SAFARI = 6,
    PAPAYA_BROWSER_MIN_IE = 10,
    PAPAYA_BROWSER_MIN_OPERA = 12,
    PAPAYA_SURFACE_BROWSER_MIN_FIREFOX = 7,
    PAPAYA_SURFACE_BROWSER_MIN_CHROME = 8,
    PAPAYA_SURFACE_BROWSER_MIN_SAFARI = 6,
    PAPAYA_SURFACE_BROWSER_MIN_IE = 11,
    PAPAYA_SURFACE_BROWSER_MIN_OPERA = 12,
    PAPAYA_CONTAINER_CLASS_NAME = "papaya",
    PAPAYA_CONTAINER_COLLAPSABLE = "papaya-collapsable",
    PAPAYA_CONTAINER_COLLAPSABLE_EXEMPT = "papaya-collapsable-exempt",
    PAPAYA_CONTAINER_FULLSCREEN = "papaya-fullscreen",
    PAPAYA_VIEWER_CSS = "papaya-viewer",
    PAPAYA_TOOLBAR_CSS = "papaya-toolbar",
    PAPAYA_TITLEBAR_CSS = "papaya-titlebar",
    PAPAYA_SLIDER_CSS = "papaya-slider-slice",
    PAPAYA_KIOSK_CONTROLS_CSS = "papaya-kiosk-controls",
    PAPAYA_DISPLAY_CSS = "papaya-display",
    PAPAYA_DIALOG_CSS = "papaya-dialog",
    PAPAYA_DIALOG_CONTENT_CSS = "papaya-dialog-content",
    PAPAYA_DIALOG_CONTENT_NOWRAP_CSS = "papaya-dialog-content-nowrap",
    PAPAYA_DIALOG_CONTENT_LABEL_CSS = "papaya-dialog-content-label",
    PAPAYA_DIALOG_CONTENT_CONTROL_CSS = "papaya-dialog-content-control",
    PAPAYA_DIALOG_TITLE_CSS = "papaya-dialog-title",
    PAPAYA_DIALOG_BUTTON_CSS = "papaya-dialog-button",
    PAPAYA_DIALOG_BACKGROUND = "papaya-dialog-background",
    PAPAYA_DIALOG_STOPSCROLL = "papaya-dialog-stopscroll",
    PAPAYA_DIALOG_CONTENT_HELP = "papaya-dialog-content-help",
    PAPAYA_MENU_CSS = "papaya-menu",
    PAPAYA_MENU_LABEL_CSS = "papaya-menu-label",
    PAPAYA_MENU_TITLEBAR_CSS = "papaya-menu-titlebar",
    PAPAYA_MENU_ICON_CSS = "papaya-menu-icon",
    PAPAYA_MENU_HOVERING_CSS = "papaya-menu-hovering",
    PAPAYA_MENU_SPACER_CSS = "papaya-menu-spacer",
    PAPAYA_MENU_UNSELECTABLE = "papaya-menu-unselectable",
    PAPAYA_MENU_FILECHOOSER = "papaya-menu-filechooser",
    PAPAYA_MENU_BUTTON_CSS = "papaya-menu-button",
    PAPAYA_MENU_BUTTON_HOVERING_CSS = "papaya-menu-button-hovering",
    PAPAYA_MENU_COLORTABLE_CSS = "papaya-menu-colortable",
    PAPAYA_MENU_INPUT_FIELD = "papaya-menu-input",
    PAPAYA_MENU_SLIDER = "papaya-menu-slider",
    PAPAYA_CONTROL_INCREMENT_BUTTON_CSS = "papaya-control-increment",
    PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS = "papaya-control-goto-center",
    PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS =
    "papaya-control-goto-origin",
    PAPAYA_CONTROL_SWAP_BUTTON_CSS = "papaya-control-swap",
    PAPAYA_CONTROL_DIRECTION_SLIDER = "papaya-direction-slider",
    PAPAYA_CONTROL_MAIN_SLIDER = "papaya-main-slider",
    PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS = "papaya-main-increment",
    PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS = "papaya-main-decrement",
    PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS = "papaya-main-swap",
    PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS = "papaya-main-goto-center",
    PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS = "papaya-main-goto-origin",
    PAPAYA_CONTROL_BAR_LABELS_CSS = "papaya-controlbar-label",
    PAPAYA_UTILS_CHECKFORJS_CSS = "checkForJS",
    PAPAYA_UTILS_UNSUPPORTED_CSS = "papaya-utils-unsupported",
    PAPAYA_UTILS_UNSUPPORTED_MESSAGE_CSS = "papaya-utils-unsupported-message",
    PAPAYA_DEFAULT_VIEWER_ID = "papayaViewer",
    PAPAYA_DEFAULT_DISPLAY_ID = "papayaDisplay",
    PAPAYA_DEFAULT_TOOLBAR_ID = "papayaToolbar",
    PAPAYA_DEFAULT_CONTAINER_ID = "papaya",
    PAPAYA_DEFAULT_SLIDER_ID = "papayaSliceSlider",
    PAPAYA_SPACING = 3,
    PAPAYA_PADDING = 8,
    PAPAYA_CONTAINER_PADDING = 20,
    PAPAYA_CONTAINER_PADDING_TOP = PAPAYA_CONTAINER_PADDING,
    PAPAYA_MANGO_INSTALLED = "mangoinstalled",
    PAPAYA_CUSTOM_PROTOCOL = "mango",
    GUNZIP_MAGIC_COOKIE1 = 31,
    GUNZIP_MAGIC_COOKIE2 = 139;
"use strict";
var papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.ArrayUtils = papaya.utilities.ArrayUtils || {};
papaya.utilities.ArrayUtils.createArray = function(c) {
    var a = Array(c || 0),
        d;
    if (1 < arguments.length) {
        var b = Array.prototype.slice.call(arguments, 1);
        for (d = 0; d < c; d += 1) a[d] = papaya.utilities.ArrayUtils.createArray.apply(this, b)
    }
    return a
};
papaya.utilities.ArrayUtils.contains = function(c, a) {
    for (var d = c.length; d--;)
        if (c[d] === a) return !0;
    return !1
};
papaya.utilities.ArrayUtils.cleanArray = function(c) {
    for (var a = [], d = 0; d < c.length; d++) c[d] && a.push(c[d]);
    return a
};
Array.prototype.clone = function() {
    var c, a;
    c = this.slice(0);
    for (a = 0; a < this.length; a += 1) this[a].clone && (c[a] = this[a].clone());
    return c
};
"use strict";
papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.MathUtils = papaya.utilities.MathUtils || {};
papaya.utilities.MathUtils.EPSILON = 1E-8;
papaya.utilities.MathUtils.signum = function(c) {
    return c ? 0 > c ? -1 : 1 : 0
};
papaya.utilities.MathUtils.lineDistance = function(c, a, d, b) {
    c = d - c;
    a = b - a;
    return Math.sqrt(c * c + a * a)
};
papaya.utilities.MathUtils.lineDistance3d = function(c, a, d, b, e, g) {
    c = b - c;
    a = e - a;
    d = g - d;
    return Math.sqrt(c * c + a * a + d * d)
};
papaya.utilities.MathUtils.essentiallyEqual = function(c, a) {
    return c === a || Math.abs(c - a) <= (Math.abs(c) > Math.abs(a) ? Math.abs(a) : Math.abs(c)) * papaya.utilities.MathUtils.EPSILON
};
papaya.utilities.MathUtils.getPowerOfTwo = function(c, a) {
    for (a = a || 1; a < c;) a *= 2;
    return a
};

function papayaRoundFast(c) {
    return 0 < c ? c + .5 | 0 : c - .5 | 0
}

function papayaFloorFast(c) {
    return c | 0
}
"use strict";
papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.ObjectUtils = papaya.utilities.ObjectUtils || {};
papaya.utilities.ObjectUtils.bind = function(c, a, d, b) {
    if (2 === arguments.length) return function() {
        return a.apply(c, arguments)
    };
    var e = Array.prototype.slice;
    return function() {
        var g = d || arguments;
        !0 === b ? (g = e.call(arguments, 0), g = g.concat(d)) : "number" === typeof b && (g = e.call(arguments, 0), Ext.Array.insert(g, b, d));
        return a.apply(c || window, g)
    }
};
papaya.utilities.ObjectUtils.isString = function(c) {
    return "string" === typeof c || c instanceof String
};
papaya.utilities.ObjectUtils.dereference = function(c) {
    return papaya.utilities.ObjectUtils.dereferenceIn(window, c)
};
papaya.utilities.ObjectUtils.dereferenceIn = function(c, a) {
    var d, b;
    if (!papaya.utilities.ObjectUtils.isString(a)) return null;
    if (b = a.replace(/(^[' "]+|[" ']+$)/g, "").match(/(^[\w\$]+(\.[\w\$]+)*)/))
        for (b = b[1].split("."), d = c[b.shift()]; d && b.length;) d = d[b.shift()];
    return d || null
};
"use strict";
papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.PlatformUtils = papaya.utilities.PlatformUtils || {};
var console = console || {};
console.log = console.log || function() {};
console.warn = console.warn || function() {};
console.error = console.error || function() {};
console.info = console.info || function() {};
papaya.utilities.PlatformUtils.os = null;
papaya.utilities.PlatformUtils.browser = bowser.name;
papaya.utilities.PlatformUtils.browserVersion = bowser.version;
papaya.utilities.PlatformUtils.ios = bowser.ios;
papaya.utilities.PlatformUtils.mobile = bowser.mobile;
papaya.utilities.PlatformUtils.lastScrollEventTimestamp = 0;
papaya.utilities.PlatformUtils.smallScreen = window.matchMedia && window.matchMedia("only screen and (max-width: 760px)").matches;
papaya.utilities.PlatformUtils.detectOs = function() {
    return -1 !== navigator.appVersion.indexOf("Win") ? "Windows" : -1 !== navigator.appVersion.indexOf("Mac") ? "MacOS" : -1 !== navigator.appVersion.indexOf("X11") || -1 !== navigator.appVersion.indexOf("Linux") ? "Linux" : "Unknown"
};
papaya.utilities.PlatformUtils.os = papaya.utilities.PlatformUtils.detectOs();
papaya.utilities.PlatformUtils.checkForBrowserCompatibility = function() {
    if ("Firefox" === papaya.utilities.PlatformUtils.browser) {
        if (papaya.utilities.PlatformUtils.browserVersion < PAPAYA_BROWSER_MIN_FIREFOX) return "Papaya requires Firefox version " + PAPAYA_BROWSER_MIN_FIREFOX + " or higher."
    } else if ("Chrome" === papaya.utilities.PlatformUtils.browser) {
        if (papaya.utilities.PlatformUtils.browserVersion < PAPAYA_BROWSER_MIN_CHROME) return "Papaya requires Chrome version " + PAPAYA_BROWSER_MIN_CHROME + " or higher."
    } else if ("Internet Explorer" ===
        papaya.utilities.PlatformUtils.browser) {
        if (papaya.utilities.PlatformUtils.browserVersion < PAPAYA_BROWSER_MIN_IE) return "Papaya requires Internet Explorer version " + PAPAYA_BROWSER_MIN_IE + " or higher."
    } else if ("Safari" === papaya.utilities.PlatformUtils.browser) {
        if (papaya.utilities.PlatformUtils.browserVersion < PAPAYA_BROWSER_MIN_SAFARI) return "Papaya requires Safari version " + PAPAYA_BROWSER_MIN_SAFARI + " or higher."
    } else if ("Opera" === papaya.utilities.PlatformUtils.browser && papaya.utilities.PlatformUtils.browserVersion <
        PAPAYA_BROWSER_MIN_OPERA) return "Papaya requires Opera version " + PAPAYA_BROWSER_MIN_OPERA + " or higher.";
    return null
};
papaya.utilities.PlatformUtils.isWebGLSupported = function() {
    var c, a, d;
    try {
        if (c = document.createElement("canvas"), a = c.getContext("webgl") || c.getContext("experimental-webgl"), d = a.getExtension("OES_element_index_uint"), !d) return !1
    } catch (b) {
        return console.log("There was a problem detecting WebGL! " + b), !1
    }
    return !0
};
papaya.utilities.PlatformUtils.getMousePositionX = function(c) {
    var a;
    c.originalEvent && (c = c.originalEvent);
    if (c.targetTouches) {
        if (1 === c.targetTouches.length && (a = c.targetTouches[0])) return a.pageX
    } else if (c.changedTouches && 1 === c.changedTouches.length && (a = c.changedTouches[0])) return a.pageX;
    return c.pageX
};
papaya.utilities.PlatformUtils.getMousePositionY = function(c) {
    var a;
    if (c.targetTouches) {
        if (1 === c.targetTouches.length && (a = c.targetTouches[0])) return a.pageY
    } else if (c.changedTouches && 1 === c.changedTouches.length && (a = c.changedTouches[0])) return a.pageY;
    return c.pageY
};
papaya.utilities.PlatformUtils.getScrollSign = function(c, a) {
    var d, b;
    d = a ? 75 : "Firefox" === papaya.utilities.PlatformUtils.browser ? 10 : "Chrome" === papaya.utilities.PlatformUtils.browser ? 50 : "Internet Explorer" === papaya.utilities.PlatformUtils.browser ? 0 : "Safari" === papaya.utilities.PlatformUtils.browser ? 50 : 10;
    b = Date.now();
    return b - papaya.utilities.PlatformUtils.lastScrollEventTimestamp > d ? (papaya.utilities.PlatformUtils.lastScrollEventTimestamp = b, b = papaya.utilities.PlatformUtils.normalizeWheel(c).spinY, d = 0 < -1 *
        papaya.utilities.PlatformUtils.normalizeWheel(c).spinY ? 1 : -1, d *= Math.ceil(Math.abs(b / 10))) : 0
};
papaya.utilities.PlatformUtils.makeSlice = function(c, a, d) {
    return "undefined" === typeof File ? function() {} : File.prototype.slice ? c.slice(a, a + d) : File.prototype.mozSlice ? c.mozSlice(a, d) : File.prototype.webkitSlice ? c.webkitSlice(a, d) : null
};
papaya.utilities.PlatformUtils.isPlatformLittleEndian = function() {
    var c = new ArrayBuffer(2);
    (new DataView(c)).setInt16(0, 256, !0);
    return 256 === (new Int16Array(c))[0]
};
papaya.utilities.PlatformUtils.isInputRangeSupported = function() {
    var c = document.createElement("input");
    c.setAttribute("type", "range");
    return "range" === c.type
};
papaya.utilities.PlatformUtils.launchCustomProtocol = function(c, a, d) {
    var b, e, g = !1;
    if ("Internet Explorer" === papaya.utilities.PlatformUtils.browser) e = window.open("", "", "width=0,height=0"), e.document.write("<iframe src='" + a + "'></iframe>"), setTimeout(function() {
        try {
            e.location.href, g = !0
        } catch (a) {
            console.log(a)
        }
        g ? e.setTimeout("window.close()", 100) : e.close();
        d(g)
    }, 100);
    else if ("Firefox" === papaya.utilities.PlatformUtils.browser) {
        try {
            b = $("<iframe />"), b.css({
                    display: "none"
                }), b.appendTo("body"), b[0].contentWindow.location.href =
                a, g = !0
        } catch (h) {
            g = !1
        }
        b.remove();
        d(g)
    } else "Chrome" === papaya.utilities.PlatformUtils.browser ? (c.viewerHtml.css({
        outline: 0
    }), c.viewerHtml.attr("tabindex", "1"), c.viewerHtml.focus(), c.viewerHtml.blur(function() {
        g = !0;
        d(!0)
    }), location.href = a, setTimeout(function() {
        c.viewerHtml.off("blur");
        c.viewerHtml.removeAttr("tabindex");
        g || d(!1)
    }, 2E3)) : ((b = papaya.utilities.UrlUtils.readCookie(papaya.viewer.Preferences.COOKIE_PREFIX + PAPAYA_MANGO_INSTALLED)) || papaya.mangoinstalled ? g = !0 : confirm("This feature requires that " +
        (papaya.utilities.PlatformUtils.ios ? "iMango" : "Mango") + " is installed.  Continue?") && (papaya.utilities.UrlUtils.createCookie(papaya.viewer.Preferences.COOKIE_PREFIX + PAPAYA_MANGO_INSTALLED, !0, papaya.viewer.Preferences.COOKIE_EXPIRY_DAYS), g = !0), g && (location.href = a), d(g))
};
papaya.utilities.PlatformUtils.getSupportedScrollEvent = function() {
    return "Firefox" === papaya.utilities.PlatformUtils.browser ? "DOMMouseScroll" : "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"
};
var PIXEL_STEP = 10,
    LINE_HEIGHT = 40,
    PAGE_HEIGHT = 800;
papaya.utilities.PlatformUtils.normalizeWheel = function(c) {
    var a = 0,
        d = 0,
        b = 0,
        e = 0;
    "detail" in c && (d = c.detail);
    "wheelDelta" in c && (d = -c.wheelDelta / 120);
    "wheelDeltaY" in c && (d = -c.wheelDeltaY / 120);
    "wheelDeltaX" in c && (a = -c.wheelDeltaX / 120);
    "axis" in c && c.axis === c.HORIZONTAL_AXIS && (a = d, d = 0);
    b = a * PIXEL_STEP;
    e = d * PIXEL_STEP;
    "deltaY" in c && (e = c.deltaY);
    "deltaX" in c && (b = c.deltaX);
    (b || e) && c.deltaMode && (1 == c.deltaMode ? (b *= LINE_HEIGHT, e *= LINE_HEIGHT) : (b *= PAGE_HEIGHT, e *= PAGE_HEIGHT));
    b && !a && (a = 1 > b ? -1 : 1);
    e && !d && (d = 1 > e ? -1 :
        1);
    return {
        spinX: a,
        spinY: d,
        pixelX: b,
        pixelY: e
    }
};
"use strict";
papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.StringUtils = papaya.utilities.StringUtils || {};
papaya.utilities.StringUtils.isStringBlank = function(c) {
    return c && "string" == (typeof c).toLowerCase() ? 0 === c.trim().length : !0
};
papaya.utilities.StringUtils.formatNumber = function(c, a) {
    var d = 0,
        d = papaya.utilities.ObjectUtils.isString(c) ? Number(c) : c,
        d = a ? d.toPrecision(5) : d.toPrecision(7);
    return parseFloat(d)
};
papaya.utilities.StringUtils.getSizeString = function(c) {
    var a = null;
    return a = 1048576 < c ? papaya.utilities.StringUtils.formatNumber(c / 1048576, !0) + " Mb" : 1024 < c ? papaya.utilities.StringUtils.formatNumber(c / 1024, !0) + " Kb" : c + " Bytes"
};
papaya.utilities.StringUtils.wordwrap = function(c, a, d, b) {
    d = d || "\n";
    a = a || 75;
    return c ? c.match(new RegExp(".{1," + a + "}(\\s|$)" + (b ? "|.{" + a + "}|.+$" : "|\\S+?(\\s|$)"), "g")).join(d) : c
};
papaya.utilities.StringUtils.truncateMiddleString = function(c, a) {
    if (c.length <= a) return c;
    var d = a - 3,
        b = Math.ceil(d / 2),
        d = Math.floor(d / 2);
    return c.substr(0, b) + "..." + c.substr(c.length - d)
};
papaya.utilities.StringUtils.pad = function(c, a) {
    return ("000000000" + c).substr(-a)
};
papaya.utilities.StringUtils.arrayBufferToString = function(c) {
    c = new Uint8Array(c);
    c = String.fromCharCode.apply(String, c);
    if (/[\u0080-\uffff]/.test(c)) throw Error("this string seems to contain (still encoded) multibytes");
    return c
};
"function" !== typeof String.prototype.startsWith && (String.prototype.startsWith = function(c) {
    return 0 === this.indexOf(c)
});
"function" !== typeof String.prototype.endsWith && (String.prototype.endsWith = function(c) {
    return -1 !== this.indexOf(c, this.length - c.length)
});
"function" !== typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
});
"use strict";
papaya = papaya || {};
papaya.utilities = papaya.utilities || {};
papaya.utilities.UrlUtils = papaya.utilities.UrlUtils || {};
papaya.utilities.UrlUtils.createCookie = function(c, a, d) {
    var b;
    d ? (b = new Date, b.setTime(b.getTime() + 864E5 * d), d = "; expires=" + b.toGMTString()) : d = "";
    document.cookie = c + "=" + a + d + "; path=/"
};
papaya.utilities.UrlUtils.readCookie = function(c) {
    var a, d, b;
    c += "=";
    a = document.cookie.split(";");
    for (d = 0; d < a.length; d += 1) {
        for (b = a[d];
            " " === b.charAt(0);) b = b.substring(1, b.length);
        if (0 === b.indexOf(c)) return b.substring(c.length, b.length)
    }
    return null
};
papaya.utilities.UrlUtils.eraseCookie = function(c) {
    papaya.utilities.UrlUtils.createCookie(c, "", -1)
};
papaya.utilities.UrlUtils.getQueryParams = function(c) {
    var a, d, b = /[?&]?([^=]+)=([^&]*)/g;
    if (-1 !== document.location.href.indexOf("?"))
        for (d = document.location.href.substring(document.location.href.indexOf("?") + 1), d = d.split("+").join(" "), a = b.exec(d); a;) c[decodeURIComponent(a[1])] = decodeURIComponent(a[2]), a = b.exec(d)
};
papaya.utilities.UrlUtils.getAbsoluteUrl = function(c, a) {
    var d, b;
    d = window.location.href;
    d = d.substring(0, d.lastIndexOf("/"));
    b = document.createElement("a");
    b.href = d + "/" + a;
    d = b.host;
    b = b.pathname;
    "/" !== b.charAt(0) && (b = "/" + b);
    return c + "://" + d + b
};
"use strict";
papaya = papaya || {};
papaya.core = papaya.core || {};
papaya.core.Coordinate = papaya.core.Coordinate || function(c, a, d) {
    this.x = c;
    this.y = a;
    this.z = d
};
papaya.core.Coordinate.prototype.setCoordinate = function(c, a, d, b) {
    b ? (this.x = Math.round(c), this.y = Math.round(a), this.z = Math.round(d)) : (this.x = c, this.y = a, this.z = d)
};
papaya.core.Coordinate.prototype.toString = function() {
    return "(" + this.x + "," + this.y + "," + this.z + ")"
};
papaya.core.Coordinate.prototype.isAllZeros = function() {
    return 0 === this.x && 0 === this.y && 0 === this.z
};
"use strict";
papaya = papaya || {};
papaya.core = papaya.core || {};
papaya.core.Point = papaya.core.Point || function(c, a) {
    this.x = c;
    this.y = a
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.Header = papaya.volume.Header || function(c) {
    this.origin = this.error = this.imageRange = this.orientation = this.imageType = this.imageDescription = this.voxelDimensions = this.imageDimensions = this.fileFormat = null;
    this.pad = c;
    this.orientationCertainty = papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN;
    this.onFinishedFileFormatRead = null
};
papaya.volume.Header.HEADER_TYPE_UNKNOWN = 0;
papaya.volume.Header.HEADER_TYPE_NIFTI = 1;
papaya.volume.Header.HEADER_TYPE_DICOM = 2;
papaya.volume.Header.ERROR_UNRECOGNIZED_FORMAT = "This format is not recognized!";
papaya.volume.Header.INVALID_IMAGE_DIMENSIONS = "Image dimensions are not valid!";
papaya.volume.Header.INVALID_VOXEL_DIMENSIONS = "Voxel dimensions are not valid!";
papaya.volume.Header.INVALID_DATATYPE = "Datatype is not valid or not supported!";
papaya.volume.Header.INVALID_IMAGE_RANGE = "Image range is not valid!";
papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN = 0;
papaya.volume.Header.ORIENTATION_CERTAINTY_LOW = 1;
papaya.volume.Header.ORIENTATION_CERTAINTY_HIGH = 2;
papaya.volume.Header.prototype.findHeaderType = function(c, a) {
    return papaya.volume.nifti.HeaderNIFTI.isThisFormat(c, a) ? papaya.volume.Header.HEADER_TYPE_NIFTI : papaya.Container.DICOM_SUPPORT && papaya.volume.dicom.HeaderDICOM.isThisFormat(c, a) ? papaya.volume.Header.HEADER_TYPE_DICOM : papaya.volume.Header.HEADER_TYPE_UNKNOWN
};
papaya.volume.Header.prototype.readHeaderData = function(c, a, d, b, e) {
    c = this.findHeaderType(c, a);
    this.onFinishedFileFormatRead = e;
    c === papaya.volume.Header.HEADER_TYPE_NIFTI ? (this.fileFormat = new papaya.volume.nifti.HeaderNIFTI, this.fileFormat.readHeaderData(a, d, b, papaya.utilities.ObjectUtils.bind(this, this.onFinishedHeaderRead))) : c === papaya.volume.Header.HEADER_TYPE_DICOM ? (this.fileFormat = new papaya.volume.dicom.HeaderDICOM, this.fileFormat.readHeaderData(a, d, b, papaya.utilities.ObjectUtils.bind(this, this.onFinishedHeaderRead))) :
        (this.error = Error(papaya.volume.Header.ERROR_UNRECOGNIZED_FORMAT), this.onFinishedFileFormatRead())
};
papaya.volume.Header.prototype.onFinishedHeaderRead = function() {
    this.fileFormat.hasError() ? this.error = this.fileFormat.error : (this.imageType = this.fileFormat.getImageType(), this.imageType.isValid() || (this.error = Error(papaya.volume.Header.INVALID_DATATYPE)), this.imageDimensions = this.fileFormat.getImageDimensions(), this.imageDimensions.isValid() || (this.error = Error(papaya.volume.Header.INVALID_IMAGE_DIMENSIONS)), this.voxelDimensions = this.fileFormat.getVoxelDimensions(), this.voxelDimensions.isValid() || (this.error =
            Error(papaya.volume.Header.INVALID_VOXEL_DIMENSIONS)), this.pad && this.imageDimensions.padIsometric(this.voxelDimensions), this.orientation = this.fileFormat.getOrientation(), this.orientation.isValid() ? this.orientationCertainty = this.fileFormat.getOrientationCertainty() : (this.orientation = new papaya.volume.Orientation(papaya.volume.Orientation.DEFAULT), this.orientationCertainty = papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN), this.orientation.createInfo(this.imageDimensions, this.voxelDimensions), this.origin =
        this.orientation.convertCoordinate(this.fileFormat.getOrigin(), new papaya.core.Coordinate(0, 0, 0)), this.imageRange = this.fileFormat.getImageRange(), this.imageRange.isValid() || (this.error = Error(papaya.volume.Header.INVALID_IMAGE_RANGE)), this.imageDescription = this.fileFormat.getImageDescription());
    this.onFinishedFileFormatRead()
};
papaya.volume.Header.prototype.getName = function() {
    return this.fileFormat.getName()
};
papaya.volume.Header.prototype.getSeriesLabels = function() {
    return this.fileFormat.getSeriesLabels()
};
papaya.volume.Header.prototype.readImageData = function(c, a) {
    this.fileFormat.readImageData(c, a)
};
papaya.volume.Header.prototype.hasError = function() {
    return null !== this.error
};
papaya.volume.Header.prototype.getBestTransform = function() {
    return this.fileFormat.getBestTransform()
};
papaya.volume.Header.prototype.getBestTransformOrigin = function() {
    return this.fileFormat.getBestTransformOrigin()
};
papaya.volume.Header.prototype.toString = function() {
    return this.fileFormat.toString()
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.ImageData = papaya.volume.ImageData || function(c) {
    this.data = null;
    this.pad = c
};
papaya.volume.ImageData.prototype.readFileData = function(c, a, d) {
    var b, e;
    this.pad && (a = this.padIsometric(c, a));
    if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_RGB)
        if (b = a.byteLength / 3, e = 2 * b, c = c.imageType.rgbBySample, a = new DataView(a, 0), this.data = new Uint32Array(b), c) {
            for (c = 0; c < b; c += 1) this.data[c] |= a.getUint8(c) << 16;
            for (c = 0; c < b; c += 1) this.data[c] |= a.getUint8(c + b) << 8;
            for (c = 0; c < b; c += 1) this.data[c] |= a.getUint8(c + e)
        } else
            for (c = 0; c < b; c += 1) this.data[c] = a.getUint8(3 * c) << 16 | a.getUint8(3 * c + 1) << 8 | a.getUint8(3 *
                c + 2);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED && 1 === c.imageType.numBytes) this.data = new Int8Array(a, 0, a.byteLength);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED && 1 === c.imageType.numBytes) this.data = new Uint8Array(a, 0, a.byteLength);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED && 2 === c.imageType.numBytes) this.data = new Int16Array(a, 0, a.byteLength / 2);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED &&
        2 === c.imageType.numBytes) this.data = new Uint16Array(a, 0, a.byteLength / 2);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED && 4 === c.imageType.numBytes) this.data = new Int32Array(a, 0, a.byteLength / 4);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED && 4 === c.imageType.numBytes) this.data = new Uint32Array(a, 0, a.byteLength / 4);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_FLOAT && 4 === c.imageType.numBytes)
        if (c.imageType.swapped)
            for (b = a.byteLength /
                Float32Array.BYTES_PER_ELEMENT, a = new DataView(a, 0), this.data = new Float32Array(b), c = 0; c < b; c += 1) this.data[c] = a.getFloat32(c * Float32Array.BYTES_PER_ELEMENT);
        else this.data = new Float32Array(a, 0, a.byteLength / 4);
    else if (c.imageType.datatype === papaya.volume.ImageType.DATATYPE_FLOAT && 8 === c.imageType.numBytes)
        if (c.imageType.swapped)
            for (b = a.byteLength / Float64Array.BYTES_PER_ELEMENT, a = new DataView(a, 0), this.data = new Float64Array(b), c = 0; c < b; c += 1) this.data[c] = a.getFloat64(c * Float64Array.BYTES_PER_ELEMENT);
        else this.data =
            new Float64Array(a, 0, a.byteLength / 8);
    d()
};
papaya.volume.ImageData.prototype.padIsometric = function(c, a) {
    for (var d = c.imageDimensions, b = c.voxelDimensions, e = c.imageType.numBytes, g = new Uint8Array(a, 0, a.byteLength), h = d.colsOrig, f = d.rowsOrig, d = d.slicesOrig, l = h * b.colSize, k = f * b.rowSize, p = d * b.sliceSize, r = Math.max(Math.max(l, k), p), l = parseInt((r - l) / b.colSize / 2, 10), k = parseInt((r - k) / b.rowSize / 2, 10), r = parseInt((r - p) / b.sliceSize / 2, 10), u = h + 2 * l, z = f + 2 * k, h = h * e, l = l * e, k = k * u * e, y = r * u * z * e, p = b = 0, e = new ArrayBuffer(u * z * (d + 2 * r) * e), r = new Uint8Array(e, 0, e.byteLength),
            b = b + y, u = 0; u < d; u += 1) {
        b += k;
        for (z = 0; z < f; z += 1) {
            b += l;
            for (y = 0; y < h; y += 1, p++, b++) r[b] = g[p];
            b += l
        }
        b += k
    }
    return e
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.ImageDescription = papaya.volume.ImageDescription || function(c) {
    this.notes = "(none)";
    papaya.utilities.StringUtils.isStringBlank(c) || (this.notes = c)
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.ImageDimensions = papaya.volume.ImageDimensions || function(c, a, d, b) {
    this.cols = c;
    this.rows = a;
    this.slices = d;
    this.colsOrig = c;
    this.rowsOrig = a;
    this.slicesOrig = d;
    this.zDim = this.yDim = this.xDim = -1;
    this.timepoints = b || 1;
    this.dataOffsets = [];
    this.dataLengths = []
};
papaya.volume.ImageDimensions.prototype.padIsometric = function(c) {
    var a = this.cols,
        d = this.rows,
        b = this.slices,
        e = a * c.colSize,
        g = d * c.rowSize,
        h = b * c.sliceSize,
        f = Math.max(Math.max(e, g), h),
        e = parseInt((f - e) / c.colSize / 2, 10),
        g = parseInt((f - g) / c.rowSize / 2, 10);
    c = parseInt((f - h) / c.sliceSize / 2, 10);
    this.cols = a + 2 * e;
    this.rows = d + 2 * g;
    this.slices = b + 2 * c
};
papaya.volume.ImageDimensions.prototype.getNumVoxelsSeries = function() {
    return this.cols * this.rows * this.slices * this.timepoints
};
papaya.volume.ImageDimensions.prototype.getNumVoxelsSlice = function() {
    return this.rows * this.cols
};
papaya.volume.ImageDimensions.prototype.getNumVoxelsVolume = function() {
    return this.rows * this.cols * this.slices
};
papaya.volume.ImageDimensions.prototype.isValid = function() {
    return 0 < this.cols && 0 < this.rows && 0 < this.slices && 0 < this.timepoints && 0 <= this.dataOffsets[0] && 0 <= this.dataLengths[0]
};
var moduleType = typeof module;
"undefined" !== moduleType && module.exports && (module.exports.ImageDimensions = papaya.volume.ImageDimensions);
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.ImageRange = papaya.volume.ImageRange || function(c, a) {
    this.displayMin = c;
    this.displayMax = a;
    this.imageMax = this.imageMin = 0;
    this.dataScaleSlopes = [];
    this.dataScaleIntercepts = [];
    this.globalDataScaleSlope = 1;
    this.globalDataScaleIntercept = 0;
    this.usesGlobalDataScale = !1
};
papaya.volume.ImageRange.DEFAULT_SCALE = 1;
papaya.volume.ImageRange.DEFAULT_INTERCEPT = 0;
papaya.volume.ImageRange.prototype.isValid = function() {
    return !0
};
papaya.volume.ImageRange.prototype.setGlobalDataScale = function(c, a) {
    this.globalDataScaleSlope = c;
    this.globalDataScaleIntercept = a;
    this.usesGlobalDataScale = !0;
    this.dataScaleSlopes = [];
    this.dataScaleIntercepts = []
};
papaya.volume.ImageRange.prototype.validateDataScale = function() {
    var c, a, d = !1;
    if (1 !== this.globalDataScaleSlope || 0 !== this.globalDataScaleIntercept) this.dataScaleSlopes = [], this.dataScaleIntercepts = [], this.usesGlobalDataScale = !0;
    else if (0 < this.dataScaleSlopes.length && 0 < this.dataScaleIntercepts.length) {
        a = this.dataScaleSlopes[0];
        for (c = 1; c < this.dataScaleSlopes.length; c += 1)
            if (a !== this.dataScaleSlopes[c]) {
                d = !0;
                break
            } a = this.dataScaleIntercepts[0];
        for (c = 1; c < this.dataScaleIntercepts.length; c += 1)
            if (a !== this.dataScaleIntercepts[c]) {
                d = !0;
                break
            } d ? this.usesGlobalDataScale = !1 : this.setGlobalDataScale(this.dataScaleSlopes[0], this.dataScaleIntercepts[0])
    } else this.setGlobalDataScale(1, 0)
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.ImageType = papaya.volume.ImageType || function(c, a, d, b) {
    this.datatype = c;
    this.numBytes = a;
    this.littleEndian = d;
    this.swapped = !1;
    this.compressed = b;
    this.rgbBySample = !1
};
papaya.volume.ImageType.DATATYPE_UNKNOWN = 0;
papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED = 1;
papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED = 2;
papaya.volume.ImageType.DATATYPE_FLOAT = 3;
papaya.volume.ImageType.DATATYPE_RGB = 4;
papaya.volume.ImageType.MAX_SUPPORTED_BYTES_FLOAT = 8;
papaya.volume.ImageType.MAX_SUPPORTED_BYTES_INTEGER = 4;
papaya.volume.ImageType.prototype.isValid = function() {
    return this.datatype <= papaya.volume.ImageType.DATATYPE_RGB && this.datatype > papaya.volume.ImageType.DATATYPE_UNKNOWN && 0 < this.numBytes && (this.datatype === papaya.volume.ImageType.DATATYPE_FLOAT && this.numBytes <= papaya.volume.ImageType.MAX_SUPPORTED_BYTES_FLOAT || this.datatype !== papaya.volume.ImageType.DATATYPE_FLOAT && this.numBytes <= papaya.volume.ImageType.MAX_SUPPORTED_BYTES_INTEGER)
};
papaya.volume.ImageType.prototype.getTypeDescription = function() {
    return this.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED ? "Signed Integer" : this.datatype === papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED ? "Unsigned Integer" : this.datatype === papaya.volume.ImageType.DATATYPE_FLOAT ? "Float" : this.datatype === papaya.volume.ImageType.DATATYPE_RGB ? "RGB" : "Unknown"
};
papaya.volume.ImageType.prototype.getOrderDescription = function() {
    return 1 < this.numBytes ? this.littleEndian ? "Little Endian" : "Big Endian" : null
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.nifti = papaya.volume.nifti || {};
var xss = xss || ("undefined" !== typeof require ? require("xss") : null);
papaya.volume.nifti.HeaderNIFTI = papaya.volume.nifti.HeaderNIFTI || function() {
    this.nifti = null;
    this.compressed = this.isNIFTI2 = !1;
    this.imageData = this.ext = null
};
papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT = "XYZ-++";
papaya.volume.nifti.HeaderNIFTI.SPATIAL_UNITS_MASK = 7;
papaya.volume.nifti.HeaderNIFTI.TEMPORAL_UNITS_MASK = 56;
papaya.volume.nifti.HeaderNIFTI.isThisFormat = function(c, a) {
    return -1 !== c.indexOf(".nii") ? !0 : nifti.isNIFTI(a[0])
};
papaya.volume.nifti.HeaderNIFTI.prototype.readHeaderData = function(c, a, d, b) {
    this.nifti = nifti.readHeader(c[0]);
    this.isNIFTI2 = nifti.isNIFTI2(c[0]);
    try {
        nifti.hasExtension(this.nifti) && (this.ext = nifti.readExtensionData(this.nifti, c[0]))
    } catch (e) {
        console.log("Problem reading NIFTI extension.")
    }
    this.imageData = nifti.readImage(this.nifti, c[0]);
    b()
};
papaya.volume.nifti.HeaderNIFTI.prototype.readImageData = function(c, a) {
    a(this.imageData);
    this.imageData = null
};
papaya.volume.nifti.HeaderNIFTI.prototype.getImageDimensions = function() {
    var c = new papaya.volume.ImageDimensions(this.nifti.dims[1], this.nifti.dims[2], this.nifti.dims[3], this.nifti.dims[4]);
    c.dataOffsets[0] = this.nifti.vox_offset;
    c.dataLengths[0] = c.getNumVoxelsSeries() * (this.nifti.numBitsPerVoxel / 8);
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getName = function() {
    return null
};
papaya.volume.nifti.HeaderNIFTI.prototype.getSeriesLabels = function() {
    var c = null;
    if (this.ext) try {
        var a = papaya.utilities.StringUtils.arrayBufferToString(this.ext).replace(/[^\x20-\x7F]/g, "").trim(),
            d = $.parseXML(a),
            b = $(d).find("MangoVolume");
        if (b.length) {
            var e = b.find("Series");
            if (e.length) {
                var g = e.find("Point"),
                    h = e.attr("length"),
                    c = Array(h);
                g.each(function() {
                    var a = $(this).attr("index"),
                        b = $(this).attr("name");
                    c[parseInt(a)] = b
                })
            }
        }
    } catch (f) {
        console.log("Unrecognized NIFTI extension found.")
    }
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getVoxelDimensions = function() {
    var c;
    c = new papaya.volume.VoxelDimensions(this.nifti.pixDims[1], this.nifti.pixDims[2], this.nifti.pixDims[3], this.nifti.pixDims[4]);
    c.spatialUnit = this.nifti.xyzt_units & papaya.volume.nifti.HeaderNIFTI.SPATIAL_UNITS_MASK;
    c.temporalUnit = this.nifti.xyzt_units & papaya.volume.nifti.HeaderNIFTI.TEMPORAL_UNITS_MASK;
    c.flip = -1 === this.nifti.pixDims[0];
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getImageType = function() {
    var c = papaya.volume.ImageType.DATATYPE_UNKNOWN;
    this.nifti.datatypeCode === nifti.NIFTI1.TYPE_UINT8 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_UINT16 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_UINT32 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_UINT64 ? c = papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED : this.nifti.datatypeCode === nifti.NIFTI1.TYPE_INT8 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_INT16 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_INT32 ||
        this.nifti.datatypeCode === nifti.NIFTI1.TYPE_INT64 ? c = papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED : this.nifti.datatypeCode === nifti.NIFTI1.TYPE_FLOAT32 || this.nifti.datatypeCode === nifti.NIFTI1.TYPE_FLOAT64 ? c = papaya.volume.ImageType.DATATYPE_FLOAT : this.nifti.datatypeCode === nifti.NIFTI1.TYPE_RGB24 && (c = papaya.volume.ImageType.DATATYPE_RGB);
    return new papaya.volume.ImageType(c, this.nifti.numBitsPerVoxel / 8, this.nifti.littleEndian, this.compressed)
};
papaya.volume.nifti.HeaderNIFTI.prototype.getOrientation = function() {
    var c = null;
    0 < this.nifti.qform_code && !this.qFormHasRotations() && (c = this.getOrientationQform());
    this.nifti.sform_code > this.nifti.qform_code && !this.sFormHasRotations() && (c = this.getOrientationSform());
    null === c && (c = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT);
    return new papaya.volume.Orientation(c)
};
papaya.volume.nifti.HeaderNIFTI.prototype.getOrientationQform = function() {
    var c = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT,
        c = this.nifti.convertNiftiQFormToNiftiSForm(this.nifti.quatern_b, this.nifti.quatern_c, this.nifti.quatern_d, this.nifti.qoffset_x, this.nifti.qoffset_y, this.nifti.qoffset_z, this.nifti.pixDims[1], this.nifti.pixDims[2], this.nifti.pixDims[3], this.nifti.pixDims[0]);
    0 < this.nifti.qform_code ? (c = this.nifti.convertNiftiSFormToNEMA(c), papaya.volume.Orientation.isValidOrientationString(c) ||
        (c = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT)) : c = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT;
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getOrientationSform = function() {
    var c = this.nifti.convertNiftiSFormToNEMA(this.nifti.affine);
    papaya.volume.Orientation.isValidOrientationString(c) || (c = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT);
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getQformMatCopy = function() {
    return this.nifti.getQformMat().clone()
};
papaya.volume.nifti.HeaderNIFTI.prototype.getSformMatCopy = function() {
    return this.nifti.affine.clone()
};
papaya.volume.nifti.HeaderNIFTI.prototype.getOrigin = function(c, a) {
    var d = new papaya.core.Coordinate(0, 0, 0),
        b, e, g, h, f, l, k;
    0 < this.nifti.qform_code && !a ? this.qFormHasRotations() ? (b = this.nifti.getQformMat(), b = numeric.inv(b), d.setCoordinate(b[0][3], b[1][3], b[2][3])) : (b = this.nifti.convertNiftiQFormToNiftiSForm(this.nifti.quatern_b, this.nifti.quatern_c, this.nifti.quatern_d, this.nifti.qoffset_x, this.nifti.qoffset_y, this.nifti.qoffset_z, this.nifti.pixDims[1], this.nifti.pixDims[2], this.nifti.pixDims[3], this.nifti.pixDims[0]),
        b = this.nifti.convertNiftiSFormToNEMA(b), papaya.volume.Orientation.isValidOrientationString(b) || (b = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT), g = b.substring(0, 3).toUpperCase(), e = b.substring(3), b = g.indexOf("X"), h = g.indexOf("Y"), g = g.indexOf("Z"), f = "+" === e.charAt(b), l = "+" === e.charAt(h), k = "+" === e.charAt(g), e = Array(3), e[0] = this.nifti.qoffset_x / this.nifti.pixDims[b + 1] * (f ? -1 : 1), e[1] = this.nifti.qoffset_y / this.nifti.pixDims[h + 1] * (l ? -1 : 1), e[2] = this.nifti.qoffset_z / this.nifti.pixDims[g + 1] * (k ? -1 : 1), d.setCoordinate(e[0],
            e[1], e[2], !0)) : 0 < this.nifti.sform_code && !c && (this.sFormHasRotations() ? (b = numeric.inv(this.nifti.affine), d.setCoordinate(b[0][3], b[1][3], b[2][3])) : (b = this.nifti.convertNiftiSFormToNEMA(this.nifti.affine), papaya.volume.Orientation.isValidOrientationString(b) || (b = papaya.volume.nifti.HeaderNIFTI.ORIENTATION_DEFAULT), g = b.substring(0, 3).toUpperCase(), e = b.substring(3), b = g.indexOf("X"), h = g.indexOf("Y"), g = g.indexOf("Z"), f = "+" === e.charAt(b), l = "+" === e.charAt(h), k = "+" === e.charAt(g), e = Array(3), e[0] = this.nifti.affine[0][3] /
        this.nifti.pixDims[b + 1] * (f ? -1 : 1), e[1] = this.nifti.affine[1][3] / this.nifti.pixDims[h + 1] * (l ? -1 : 1), e[2] = this.nifti.affine[2][3] / this.nifti.pixDims[g + 1] * (k ? -1 : 1), d.setCoordinate(e[0], e[1], e[2], !0)));
    d.isAllZeros() && d.setCoordinate(this.nifti.dims[1] / 2, this.nifti.dims[2] / 2, this.nifti.dims[3] / 2);
    return d
};
papaya.volume.nifti.HeaderNIFTI.prototype.qFormHasRotations = function() {
    return papaya.volume.Transform.hasRotations(this.getQformMatCopy())
};
papaya.volume.nifti.HeaderNIFTI.prototype.sFormHasRotations = function() {
    return papaya.volume.Transform.hasRotations(this.getSformMatCopy())
};
papaya.volume.nifti.HeaderNIFTI.prototype.getImageRange = function() {
    var c = new papaya.volume.ImageRange(this.nifti.cal_min, this.nifti.cal_max),
        a = this.nifti.scl_slope,
        d = this.getImageDimensions();
    0 === a && (a = 1);
    c.setGlobalDataScale(a, this.nifti.scl_inter, d.slices * d.timepoints);
    c.validateDataScale();
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.hasError = function() {
    return !1
};
papaya.volume.nifti.HeaderNIFTI.prototype.getImageDescription = function() {
    return new papaya.volume.ImageDescription(this.nifti.description)
};
papaya.volume.nifti.HeaderNIFTI.prototype.getOrientationCertainty = function() {
    var c, a;
    c = papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN;
    if (0 < this.nifti.qform_code || 0 < this.nifti.sform_code) c = papaya.volume.Header.ORIENTATION_CERTAINTY_LOW, a = this.getOrigin(), null === a || a.isAllZeros() || (c = papaya.volume.Header.ORIENTATION_CERTAINTY_HIGH);
    return c
};
papaya.volume.nifti.HeaderNIFTI.prototype.getBestTransform = function() {
    return 0 < this.nifti.qform_code && this.nifti.qform_code > this.nifti.sform_code && this.qFormHasRotations() ? this.getQformMatCopy() : 0 < this.nifti.sform_code && this.nifti.sform_code >= this.nifti.qform_code && this.sFormHasRotations() ? this.getSformMatCopy() : null
};
papaya.volume.nifti.HeaderNIFTI.prototype.getBestTransformOrigin = function() {
    return 0 < this.nifti.qform_code && this.nifti.qform_code > this.nifti.sform_code && this.qFormHasRotations() ? this.getOrigin(!0, !1) : 0 < this.nifti.sform_code && this.nifti.sform_code >= this.nifti.qform_code && this.sFormHasRotations() ? this.getOrigin(!1, !0) : null
};
papaya.volume.nifti.HeaderNIFTI.prototype.toString = function() {
    var c = papaya.utilities.StringUtils.formatNumber,
        a = "";
    this.isNIFTI2 ? (a += "<span style='color:#B5CBD3'>Datatype</span><span style='color:gray'> = </span>" + this.nifti.datatypeCode + " (" + this.nifti.getDatatypeCodeString(this.nifti.datatypeCode) + ")<br />", a += "<span style='color:#B5CBD3'>Bits Per Voxel</span><span style='color:gray'> = </span>" + this.nifti.numBitsPerVoxel + "<br />", a += "<span style='color:#B5CBD3'>Image Dimensions</span> (1-8): " +
        this.nifti.dims[0] + ", " + this.nifti.dims[1] + ", " + this.nifti.dims[2] + ", " + this.nifti.dims[3] + ", " + this.nifti.dims[4] + ", " + this.nifti.dims[5] + ", " + this.nifti.dims[6] + ", " + this.nifti.dims[7] + "<br />", a += "<span style='color:#B5CBD3'>Intent Parameters</span> (1-3): " + this.nifti.intent_p1 + ", " + this.nifti.intent_p2 + ", " + this.nifti.intent_p3 + "<br />", a += "<span style='color:#B5CBD3'>Voxel Dimensions</span> (1-8): " + c(this.nifti.pixDims[0]) + ", " + c(this.nifti.pixDims[1]) + ", " + c(this.nifti.pixDims[2]) + ", " + c(this.nifti.pixDims[3]) +
        ", " + c(this.nifti.pixDims[4]) + ", " + c(this.nifti.pixDims[5]) + ", " + c(this.nifti.pixDims[6]) + ", " + c(this.nifti.pixDims[7]) + "<br />", a += "<span style='color:#B5CBD3'>Image Offset</span><span style='color:gray'> = </span>" + this.nifti.vox_offset + "<br />", a += "<span style='color:#B5CBD3'>Data Scale:  Slope</span><span style='color:gray'> = </span>" + this.nifti.scl_slope + "  <span style='color:#B5CBD3'>Intercept</span><span style='color:gray'> = </span>" + this.nifti.scl_inter + "<br />", a += "<span style='color:#B5CBD3'>Display Range:  Max</span><span style='color:gray'> = </span>" +
        this.nifti.cal_max + "  <span style='color:#B5CBD3'>Min</span><span style='color:gray'> = </span>" + this.nifti.cal_min + "<br />", a += "<span style='color:#B5CBD3'>Slice Duration</span><span style='color:gray'> = </span>" + this.nifti.slice_duration + "<br />", a += "<span style='color:#B5CBD3'>Time Axis Shift</span><span style='color:gray'> = </span>" + this.nifti.toffset + "<br />", a += "<span style='color:#B5CBD3'>Slice Start</span><span style='color:gray'> = </span>" + this.nifti.slice_start + "<br />", a += "<span style='color:#B5CBD3'>Slice End</span><span style='color:gray'> = </span>" +
        this.nifti.slice_end + "<br />", a += "<span style='color:#B5CBD3'>Description</span>: \"" + filterXSS(this.nifti.description) + '"<br />', a += "<span style='color:#B5CBD3'>Auxiliary File</span>: \"" + filterXSS(this.nifti.aux_file) + '"<br />', a += "<span style='color:#B5CBD3'>Q-Form Code</span><span style='color:gray'> = </span>" + this.nifti.qform_code + " (" + this.nifti.getTransformCodeString(this.nifti.qform_code) + ")<br />", a += "<span style='color:#B5CBD3'>S-Form Code</span><span style='color:gray'> = </span>" + this.nifti.sform_code +
        " (" + this.nifti.getTransformCodeString(this.nifti.sform_code) + ")<br />", a += "<span style='color:#B5CBD3'>Quaternion Parameters</span>:  <span style='color:#B5CBD3'>b</span> <span style='color:gray'>=</span> " + c(this.nifti.quatern_b) + "  <span style='color:#B5CBD3'>c</span> <span style='color:gray'>=</span> " + c(this.nifti.quatern_c) + "  <span style='color:#B5CBD3'>d</span> <span style='color:gray'>=</span> " + c(this.nifti.quatern_d) + "<br />", a += "<span style='color:#B5CBD3'>Quaternion Offsets</span>:  <span style='color:#B5CBD3'>x</span> <span style='color:gray'>=</span> " +
        this.nifti.qoffset_x + "  <span style='color:#B5CBD3'>y</span> <span style='color:gray'>=</span> " + this.nifti.qoffset_y + "  <span style='color:#B5CBD3'>z</span> <span style='color:gray'>=</span> " + this.nifti.qoffset_z + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters X</span>: " + c(this.nifti.affine[0][0]) + ", " + c(this.nifti.affine[0][1]) + ", " + c(this.nifti.affine[0][2]) + ", " + c(this.nifti.affine[0][3]) + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters Y</span>: " + c(this.nifti.affine[1][0]) +
        ", " + c(this.nifti.affine[1][1]) + ", " + c(this.nifti.affine[1][2]) + ", " + c(this.nifti.affine[1][3]) + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters Z</span>: " + c(this.nifti.affine[2][0]) + ", " + c(this.nifti.affine[2][1]) + ", " + c(this.nifti.affine[2][2]) + ", " + c(this.nifti.affine[2][3]) + "<br />", a += "<span style='color:#B5CBD3'>Slice Code</span><span style='color:gray'> = </span>" + this.nifti.slice_code + "<br />", a += "<span style='color:#B5CBD3'>Units Code</span><span style='color:gray'> = </span>" +
        this.nifti.xyzt_units + " (" + this.nifti.getUnitsCodeString(nifti.NIFTI1.SPATIAL_UNITS_MASK & this.nifti.xyzt_units) + ", " + this.nifti.getUnitsCodeString(nifti.NIFTI1.TEMPORAL_UNITS_MASK & this.nifti.xyzt_units) + ")<br />", a += "<span style='color:#B5CBD3'>Intent Code </span><span style='color:gray'> = </span>" + this.nifti.intent_code + "<br />", a += "<span style='color:#B5CBD3'>Intent Name</span>: \"" + filterXSS(this.nifti.intent_name) + '"<br />', a += "<span style='color:#B5CBD3'>Dim Info </span><span style='color:gray'> = </span>" +
        this.nifti.dim_info + "<br />") : (a += "<span style='color:#B5CBD3'>Dim Info</span><span style='color:gray'> = </span>" + this.nifti.dim_info + "<br />", a += "<span style='color:#B5CBD3'>Image Dimensions</span> (1-8): " + this.nifti.dims[0] + ", " + this.nifti.dims[1] + ", " + this.nifti.dims[2] + ", " + this.nifti.dims[3] + ", " + this.nifti.dims[4] + ", " + this.nifti.dims[5] + ", " + this.nifti.dims[6] + ", " + this.nifti.dims[7] + "<br />", a += "<span style='color:#B5CBD3'>Intent Parameters</span> (1-3): " + this.nifti.intent_p1 + ", " + this.nifti.intent_p2 +
        ", " + this.nifti.intent_p3 + "<br />", a += "<span style='color:#B5CBD3'>Intent Code</span><span style='color:gray'> = </span>" + this.nifti.intent_code + "<br />", a += "<span style='color:#B5CBD3'>Datatype</span><span style='color:gray'> = </span>" + this.nifti.datatypeCode + " (" + this.nifti.getDatatypeCodeString(this.nifti.datatypeCode) + ")<br />", a += "<span style='color:#B5CBD3'>Bits Per Voxel</span><span style='color:gray'> = </span>" + this.nifti.numBitsPerVoxel + "<br />", a += "<span style='color:#B5CBD3'>Slice Start</span><span style='color:gray'> = </span>" +
        this.nifti.slice_start + "<br />", a += "<span style='color:#B5CBD3'>Voxel Dimensions</span> (1-8): " + c(this.nifti.pixDims[0]) + ", " + c(this.nifti.pixDims[1]) + ", " + c(this.nifti.pixDims[2]) + ", " + c(this.nifti.pixDims[3]) + ", " + c(this.nifti.pixDims[4]) + ", " + c(this.nifti.pixDims[5]) + ", " + c(this.nifti.pixDims[6]) + ", " + c(this.nifti.pixDims[7]) + "<br />", a += "<span style='color:#B5CBD3'>Image Offset</span><span style='color:gray'> = </span>" + this.nifti.vox_offset + "<br />", a += "<span style='color:#B5CBD3'>Data Scale</span>:  <span style='color:#B5CBD3'>Slope</span> = " +
        this.nifti.scl_slope + "  <span style='color:#B5CBD3'>Intercept</span> = " + this.nifti.scl_inter + "<br />", a += "<span style='color:#B5CBD3'>Slice End</span><span style='color:gray'> = </span>" + this.nifti.slice_end + "<br />", a += "<span style='color:#B5CBD3'>Slice Code</span><span style='color:gray'> = </span>" + this.nifti.slice_code + "<br />", a += "<span style='color:#B5CBD3'>Units Code</span><span style='color:gray'> = </span>" + this.nifti.xyzt_units + " (" + this.nifti.getUnitsCodeString(nifti.NIFTI1.SPATIAL_UNITS_MASK &
            this.nifti.xyzt_units) + ", " + this.nifti.getUnitsCodeString(nifti.NIFTI1.TEMPORAL_UNITS_MASK & this.nifti.xyzt_units) + ")<br />", a += "<span style='color:#B5CBD3'>Display Range</span>:  <span style='color:#B5CBD3'>Max</span><span style='color:gray'> = </span>" + this.nifti.cal_max + "  <span style='color:#B5CBD3'>Min</span><span style='color:gray'> = </span>" + this.nifti.cal_min + "<br />", a += "<span style='color:#B5CBD3'>Slice Duration</span><span style='color:gray'> = </span>" + this.nifti.slice_duration + "<br />",
        a += "<span style='color:#B5CBD3'>Time Axis Shift</span><span style='color:gray'> = </span>" + this.nifti.toffset + "<br />", a += "<span style='color:#B5CBD3'>Description</span>: \"" + filterXSS(this.nifti.description) + '"<br />', a += "<span style='color:#B5CBD3'>Auxiliary File</span>: \"" + filterXSS(this.nifti.aux_file) + '"<br />', a += "<span style='color:#B5CBD3'>Q-Form Code</span><span style='color:gray'> = </span>" + this.nifti.qform_code + " (" + this.nifti.getTransformCodeString(this.nifti.qform_code) + ")<br />", a +=
        "<span style='color:#B5CBD3'>S-Form Code</span><span style='color:gray'> = </span>" + this.nifti.sform_code + " (" + this.nifti.getTransformCodeString(this.nifti.sform_code) + ")<br />", a += "<span style='color:#B5CBD3'>Quaternion Parameters</span>:  <span style='color:#B5CBD3'>b</span><span style='color:gray'> = </span>" + c(this.nifti.quatern_b) + "  <span style='color:#B5CBD3'>c</span><span style='color:gray'> = </span>" + c(this.nifti.quatern_c) + "  <span style='color:#B5CBD3'>d</span><span style='color:gray'> = </span>" +
        c(this.nifti.quatern_d) + "<br />", a += "<span style='color:#B5CBD3'>Quaternion Offsets</span>:  <span style='color:#B5CBD3'>x</span><span style='color:gray'> = </span>" + this.nifti.qoffset_x + "  <span style='color:#B5CBD3'>y</span><span style='color:gray'> = </span>" + this.nifti.qoffset_y + "  <span style='color:#B5CBD3'>z</span><span style='color:gray'> = </span>" + this.nifti.qoffset_z + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters X</span>: " + c(this.nifti.affine[0][0]) + ", " + c(this.nifti.affine[0][1]) +
        ", " + c(this.nifti.affine[0][2]) + ", " + c(this.nifti.affine[0][3]) + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters Y</span>: " + c(this.nifti.affine[1][0]) + ", " + c(this.nifti.affine[1][1]) + ", " + c(this.nifti.affine[1][2]) + ", " + c(this.nifti.affine[1][3]) + "<br />", a += "<span style='color:#B5CBD3'>S-Form Parameters Z</span>: " + c(this.nifti.affine[2][0]) + ", " + c(this.nifti.affine[2][1]) + ", " + c(this.nifti.affine[2][2]) + ", " + c(this.nifti.affine[2][3]) + "<br />", a += "<span style='color:#B5CBD3'>Intent Name</span>: \"" +
        filterXSS(this.nifti.intent_name) + '"<br />');
    return a
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.dicom = papaya.volume.dicom || {};
papaya.volume.dicom.HeaderDICOM = papaya.volume.dicom.HeaderDICOM || function() {
    this.series = null;
    this.seriesMap = [];
    this.dialogHandler = this.onFinishedHeaderRead = this.error = null
};
papaya.volume.dicom.HeaderDICOM.ORIENTATION_DEFAULT = "XYZ+--";
papaya.volume.dicom.HeaderDICOM.SUPPORTED_TRANSFER_SYNTAXES = "1.2.840.10008.1.2 1.2.840.10008.1.2.1 1.2.840.10008.1.2.2 1.2.840.10008.1.2.1.99 1.2.840.10008.1.2.4.50 1.2.840.10008.1.2.4.51 1.2.840.10008.1.2.4.57 1.2.840.10008.1.2.4.70 1.2.840.10008.1.2.4.80 1.2.840.10008.1.2.4.81 1.2.840.10008.1.2.4.90 1.2.840.10008.1.2.4.91 1.2.840.10008.1.2.5".split(" ");
papaya.volume.dicom.HeaderDICOM.isThisFormat = function(c, a) {
    var d, b, e, g, h = 0;
    if (-1 !== c.indexOf(".dcm")) return !0;
    d = new DataView(a[0]);
    b = daikon.Parser.MAGIC_COOKIE_OFFSET;
    e = daikon.Parser.MAGIC_COOKIE.length;
    for (g = 0; g < e; g += 1) d.getUint8(b + g) === daikon.Parser.MAGIC_COOKIE[g] && (h += 1);
    if (4 === h) return !0;
    b = new daikon.Parser;
    d = b.testForValidTag(d);
    return null !== d && 8 >= d.group && !b.hasError()
};
papaya.volume.dicom.HeaderDICOM.prototype.setSeries = function(c, a) {
    var d;
    for (d = 0; d < Object.keys(this.seriesMap).length; d += 1)
        if (-1 !== Object.keys(this.seriesMap)[d].indexOf(a)) {
            this.series = this.seriesMap[Object.keys(this.seriesMap)[d]];
            break
        }
};
papaya.volume.dicom.HeaderDICOM.prototype.getDataScaleSlope = function(c, a) {
    return c ? a.getDataScaleElscint() || 1 : a.getDataScaleSlope() || 1
};
papaya.volume.dicom.HeaderDICOM.prototype.getDataScaleIntercept = function(c, a) {
    return c ? 0 : a.getDataScaleIntercept() || 0
};
papaya.volume.dicom.HeaderDICOM.prototype.finishedHeaderRead = function() {
    var c, a;
    if (this.error) this.onFinishedHeaderRead();
    else if (1 < Object.keys(this.seriesMap).length) {
        this.series = this.seriesMap[Object.keys(this.seriesMap)[0]];
        c = [];
        for (a = 0; a < Object.keys(this.seriesMap).length; a += 1) c.push(this.seriesMap[Object.keys(this.seriesMap)[a]]);
        c = {
            items: [{
                label: "Select:",
                field: "series",
                options: c
            }]
        };
        this.dialogHandler.showDialog("Select DICOM Series", c, this, papaya.utilities.ObjectUtils.bind(this, this.setSeries),
            papaya.utilities.ObjectUtils.bind(this, this.finishedSeriesSelection))
    } else this.series = this.seriesMap[Object.keys(this.seriesMap)[0]], 0 < this.series.images.length ? (this.series.buildSeries(), this.isTransferSyntaxSupported() || (this.error = Error("This transfer syntax is currently not supported!"))) : this.error = Error("No images found!"), this.onFinishedHeaderRead()
};
papaya.volume.dicom.HeaderDICOM.prototype.isTransferSyntaxSupported = function() {
    var c = this.series.images[0].getTransferSyntax();
    return papaya.utilities.StringUtils.isStringBlank(c) || papaya.utilities.ArrayUtils.contains(papaya.volume.dicom.HeaderDICOM.SUPPORTED_TRANSFER_SYNTAXES, c)
};
papaya.volume.dicom.HeaderDICOM.prototype.finishedSeriesSelection = function() {
    0 < this.series.images.length ? (this.series.buildSeries(), this.isTransferSyntaxSupported() || (this.error = Error("This transfer syntax is currently not supported!"))) : this.error = Error("No images found!");
    this.seriesMap = null;
    this.onFinishedHeaderRead()
};
papaya.volume.dicom.HeaderDICOM.prototype.readHeaderData = function(c, a, d, b) {
    this.onFinishedHeaderRead = b;
    this.dialogHandler = d;
    this.readNextHeaderData(c, 0, a, papaya.utilities.ObjectUtils.bind(this, this.finishedHeaderRead))
};
papaya.volume.dicom.HeaderDICOM.prototype.readNextHeaderData = function(c, a, d, b) {
    var e, g;
    a >= c.length ? (d.drawProgress(1, "Reading DICOM Headers"), b()) : (e = daikon.Series.parseImage(new DataView(c[a])), null === e ? this.error = daikon.Series.parserError : e.hasPixelData() ? (g = this.findSeries(e.getSeriesId()), g || (g = new daikon.Series, this.seriesMap[e.getSeriesId()] = g), g.addImage(e)) : this.error = Error("No pixel data found!"), this.error ? b() : (d.drawProgress(a / c.length, "Reading DICOM Headers"), setTimeout(function() {
        this.readNextHeaderData(c,
            a + 1, d, b)
    }.bind(this), 0)))
};
papaya.volume.dicom.HeaderDICOM.prototype.getName = function() {
    var c = this.series.getName();
    return c ? c : null
};
papaya.volume.dicom.HeaderDICOM.prototype.getSeriesLabels = function() {
    return null
};
papaya.volume.dicom.HeaderDICOM.prototype.findSeries = function(c) {
    return 0 === Object.keys(this.seriesMap).length ? null : this.seriesMap[c]
};
papaya.volume.dicom.HeaderDICOM.prototype.readImageData = function(c, a) {
    this.series.concatenateImageData(c, a)
};
papaya.volume.dicom.HeaderDICOM.prototype.getImageDimensions = function() {
    var c, a, d;
    this.series.isMosaic ? (c = this.series.images[0].getMosaicCols() * this.series.images[0].getMosaicRows(), c = new papaya.volume.ImageDimensions(parseInt(this.series.images[0].getCols() / this.series.images[0].getMosaicCols()), parseInt(this.series.images[0].getRows() / this.series.images[0].getMosaicRows()), c, this.series.images.length)) : c = this.series.isMultiFrameVolume ? new papaya.volume.ImageDimensions(this.series.images[0].getCols(),
        this.series.images[0].getRows(), this.series.numberOfFrames, 1) : this.series.isMultiFrameTimeseries ? new papaya.volume.ImageDimensions(this.series.images[0].getCols(), this.series.images[0].getRows(), this.series.numberOfFramesInFile, this.series.numberOfFrames) : this.series.isImplicitTimeseries ? new papaya.volume.ImageDimensions(this.series.images[0].getCols(), this.series.images[0].getRows(), parseInt(this.series.images.length / this.series.numberOfFrames), this.series.numberOfFrames) : new papaya.volume.ImageDimensions(this.series.images[0].getCols(),
        this.series.images[0].getRows(), this.series.images.length, 1);
    d = parseInt(c.getNumVoxelsSeries() * parseInt(this.series.images[0].getBitsAllocated() / 8) / this.series.images.length);
    for (a = 0; a < this.series.images.length; a += 1) c.dataOffsets[a] = this.series.images[a].getPixelData().offsetValue, c.dataLengths[a] = d;
    return c
};
papaya.volume.dicom.HeaderDICOM.prototype.getVoxelDimensions = function() {
    var c, a;
    c = this.series.images[0].getPixelSpacing() || [0, 0];
    a = Math.max(this.series.images[0].getSliceGap(), this.series.images[0].getSliceThickness());
    daikon.Series.useExplicitSpacing && (a = daikon.Series.useExplicitSpacing);
    this.series.isMosaic || this.series.isMultiFrame || 1 === this.series.images.length || daikon.Series.useExplicitOrdering || (a = Math.abs(this.series.images[0].getSliceLocation() - this.series.images[1].getSliceLocation()), 0 ===
        a && (a = Math.max(this.series.images[0].getSliceGap(), this.series.images[0].getSliceThickness())));
    c = new papaya.volume.VoxelDimensions(c[1], c[0], a, this.series.images[0].getTR() / 1E3);
    c.isValid() || (0 === c.rowSize && (c.rowSize = 1), 0 === c.colSize && (c.colSize = 1), 0 === c.sliceSize && (c.sliceSize = 1));
    c.spatialUnit = papaya.volume.VoxelDimensions.UNITS_MM;
    c.temporalUnit = papaya.volume.VoxelDimensions.UNITS_SEC;
    return c
};
papaya.volume.dicom.HeaderDICOM.prototype.getImageType = function() {
    var c;
    c = this.series.images[0].getDataType();
    c = new papaya.volume.ImageType(c === daikon.Image.BYTE_TYPE_INTEGER ? papaya.volume.ImageType.DATATYPE_INTEGER_SIGNED : c === daikon.Image.BYTE_TYPE_INTEGER_UNSIGNED ? papaya.volume.ImageType.DATATYPE_INTEGER_UNSIGNED : c === daikon.Image.BYTE_TYPE_FLOAT ? papaya.volume.ImageType.DATATYPE_FLOAT : c === daikon.Image.BYTE_TYPE_RGB ? papaya.volume.ImageType.DATATYPE_RGB : papaya.volume.ImageType.DATATYPE_UNKNOWN, parseInt(this.series.images[0].getBitsAllocated() /
        8), this.series.images[0].littleEndian, !1);
    c.rgbBySample = 1 === this.series.images[0].getPlanarConfig();
    return c
};
papaya.volume.dicom.HeaderDICOM.prototype.getImageRange = function() {
    var c, a, d, b, e, g, h, f, l, k = [],
        p = [];
    f = [];
    l = [];
    for (e = a = c = 0; e < this.series.images.length; e += 1) d = this.series.images[e], b = d.getImageMax() * this.getDataScaleSlope(this.series.isElscint, d) + (d.getDataScaleIntercept() || 0), d = d.getImageMin() * this.getDataScaleSlope(this.series.isElscint, d) + (d.getDataScaleIntercept() || 0), 0 === e ? (c = b, a = d) : (b > c && (c = b), d < a && (a = d));
    g = b = 0;
    if (this.series.isElscint)
        for (e = 0; e < this.series.images.length; e += 1) d = this.series.images[e],
            h = d.getWindowWidth() * d.getDataScaleElscint(), d = d.getWindowCenter() * d.getDataScaleElscint(), 0 === e ? (b = h, g = d) : g < d && (b = h, g = d);
    else
        for (e = 0; e < this.series.images.length; e += 1) d = this.series.images[e], h = d.getWindowWidth(), d = d.getWindowCenter(), 0 === e ? (b = h, g = d) : g < d && (b = h, g = d);
    c = new papaya.volume.ImageRange(a, c);
    c.displayMin = g - b / 2;
    c.displayMax = g + b / 2;
    e = this.getImageDimensions();
    if (this.series.isMosaic) {
        f = e.slices;
        l = f * this.series.images.length;
        for (e = 0; e < l; e += 1) d = this.series.images[parseInt(e / f)], k[e] = this.getDataScaleSlope(this.series.isElscint,
            d), p[e] = this.getDataScaleIntercept(this.series.isElscint, d);
        c.dataScaleSlopes = k;
        c.dataScaleIntercepts = p
    } else if (this.series.isMultiFrame) {
        e = e.slices * e.timepoints;
        k = [];
        p = [];
        l = parseInt(e / this.series.images.length);
        for (e = 0; e < this.series.images.length; e += 1)
            for (f = 0; f < l; f += 1) d = this.series.images[e], k[e * l + f] = this.getDataScaleSlope(this.series.isElscint, d), p[e * l + f] = this.getDataScaleIntercept(this.series.isElscint, d);
        c.dataScaleSlopes = k;
        c.dataScaleIntercepts = p
    } else if (this.series.isImplicitTimeseries)
        if (e =
            e.slices * e.timepoints, this.series.images.length !== e) c.setGlobalDataScale(this.getDataScaleSlope(this.series.isElscint, this.series.images[0]), this.getDataScaleIntercept(this.series.isElscint, this.series.images[0]), this.series.numberOfFrames);
        else {
            for (e = 0; e < this.series.images.length; e += 1) d = this.series.images[e], f[e] = this.getDataScaleSlope(this.series.isElscint, d), l[e] = this.getDataScaleIntercept(this.series.isElscint, d);
            c.dataScaleSlopes = f;
            c.dataScaleIntercepts = l
        }
    else {
        for (e = 0; e < this.series.images.length; e +=
            1) d = this.series.images[e], f[e] = this.getDataScaleSlope(this.series.isElscint, d), l[e] = this.getDataScaleIntercept(this.series.isElscint, d);
        c.dataScaleSlopes = f;
        c.dataScaleIntercepts = l
    }
    c.validateDataScale();
    return c
};
papaya.volume.dicom.HeaderDICOM.prototype.getOrientation = function() {
    var c = this.series.images[0].getOrientation();
    null === c && (c = papaya.volume.dicom.HeaderDICOM.ORIENTATION_DEFAULT);
    c = c.substring(0, 5) + (this.series.sliceSense ? "+" : "-");
    return new papaya.volume.Orientation(c)
};
papaya.volume.dicom.HeaderDICOM.prototype.getOrientationCertainty = function() {
    return null === this.series.images[0].getOrientation() ? papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN : this.series.isMosaic || this.series.isMultiFrameVolume ? papaya.volume.Header.ORIENTATION_CERTAINTY_LOW : papaya.volume.Header.ORIENTATION_CERTAINTY_HIGH
};
papaya.volume.dicom.HeaderDICOM.prototype.getOrigin = function() {
    var c = this.getBestTransform();
    return c ? (c = numeric.inv(c), new papaya.core.Coordinate(c[0][3], c[1][3], c[2][3])) : new papaya.core.Coordinate(0, 0, 0)
};
papaya.volume.dicom.HeaderDICOM.prototype.hasError = function() {
    return null !== this.error
};
papaya.volume.dicom.HeaderDICOM.prototype.getImageDescription = function() {
    var c, a, d, b, e, g = "";
    c = this.series.images[0].getPatientName();
    a = this.series.images[0].getPatientID();
    d = this.series.images[0].getStudyTime();
    b = this.series.images[0].getStudyDate();
    e = this.series.images[0].getImageDescription();
    c && (g += " " + c);
    a && (g += " " + a);
    d && (g += " " + d);
    b && (g += " " + b);
    e && (g += " " + e);
    return new papaya.volume.ImageDescription(g.trim())
};
papaya.volume.dicom.HeaderDICOM.prototype.getBestTransform = function() {
    var c = this.series.images[0].getImageDirections(),
        a = null;
    if (c) var a = this.getVoxelDimensions(),
        d = this.series.images[0].getImagePosition(),
        b = [c[0], c[1], c[2]],
        c = [c[3], c[4], c[5]],
        e = [b[1] * c[2] - b[2] * c[1], b[2] * c[0] - b[0] * c[2], b[0] * c[1] - b[1] * c[0]],
        a = [
            [b[0] * a.colSize * -1, c[0] * a.rowSize * -1, e[0] * a.sliceSize * -1, -1 * d[0]],
            [b[1] * a.colSize * -1, c[1] * a.rowSize * -1, e[1] * a.sliceSize * -1, -1 * d[1]],
            [b[2] * a.colSize, c[2] * a.rowSize, e[2] * a.sliceSize, d[2]],
            [0, 0,
                0, 1
            ]
        ];
    return a
};
papaya.volume.dicom.HeaderDICOM.prototype.getBestTransformOrigin = function() {
    return this.getOrigin()
};
papaya.volume.dicom.HeaderDICOM.prototype.toString = function() {
    return this.series.images[0].toString()
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.Orientation = papaya.volume.Orientation || function(c) {
    this.orientation = c;
    this.orientMat = null;
    this.zIncrement = this.yIncrement = this.xIncrement = -1
};
papaya.volume.Orientation.DEFAULT = "XYZ+--";
papaya.volume.Orientation.isValidOrientationString = function(c) {
    var a, d = !0;
    if (null === c || 6 !== c.length) d = !1;
    a = c.toUpperCase().indexOf("X");
    if (-1 === a || 2 < a || c.toUpperCase().lastIndexOf("X") !== a) d = !1;
    a = c.toUpperCase().indexOf("Y");
    if (-1 === a || 2 < a || c.toUpperCase().lastIndexOf("Y") !== a) d = !1;
    a = c.toUpperCase().indexOf("Z");
    if (-1 === a || 2 < a || c.toUpperCase().lastIndexOf("Z") !== a) d = !1;
    "+" !== c.charAt(3) && "-" !== c.charAt(3) && (d = !1);
    "+" !== c.charAt(4) && "-" !== c.charAt(4) && (d = !1);
    "+" !== c.charAt(5) && "-" !== c.charAt(5) && (d = !1);
    return d
};
papaya.volume.Orientation.prototype.convertIndexToOffsetNative = function(c, a, d) {
    return c * this.xIncrement + a * this.yIncrement + d * this.zIncrement
};
papaya.volume.Orientation.prototype.convertIndexToOffset = function(c, a, d) {
    var b, e;
    b = papayaFloorFast(c * this.orientMat[0][0] + a * this.orientMat[0][1] + d * this.orientMat[0][2] + this.orientMat[0][3]);
    e = papayaFloorFast(c * this.orientMat[1][0] + a * this.orientMat[1][1] + d * this.orientMat[1][2] + this.orientMat[1][3]);
    c = papayaFloorFast(c * this.orientMat[2][0] + a * this.orientMat[2][1] + d * this.orientMat[2][2] + this.orientMat[2][3]);
    return b * this.xIncrement + e * this.yIncrement + c * this.zIncrement
};
papaya.volume.Orientation.prototype.convertCoordinate = function(c, a) {
    a.x = papayaRoundFast(c.x * this.orientMat[0][0] + c.y * this.orientMat[0][1] + c.z * this.orientMat[0][2] + this.orientMat[0][3]);
    a.y = papayaRoundFast(c.x * this.orientMat[1][0] + c.y * this.orientMat[1][1] + c.z * this.orientMat[1][2] + this.orientMat[1][3]);
    a.z = papayaRoundFast(c.x * this.orientMat[2][0] + c.y * this.orientMat[2][1] + c.z * this.orientMat[2][2] + this.orientMat[2][3]);
    return a
};
papaya.volume.Orientation.prototype.createInfo = function(c, a) {
    var d, b, e, g, h, f, l, k, p, r, u, z, y, x, D, B;
    r = c.cols;
    u = c.rows;
    z = c.slices;
    y = c.getNumVoxelsSlice();
    x = a.colSize;
    D = a.rowSize;
    B = a.sliceSize;
    l = "+" === this.orientation.charAt(3);
    k = "+" === this.orientation.charAt(4);
    p = "+" === this.orientation.charAt(5); - 1 !== this.orientation.toUpperCase().indexOf("XYZ") ? (c.xDim = r, c.yDim = u, c.zDim = z, a.xSize = x, a.ySize = D, a.zSize = B, this.xIncrement = 1, this.yIncrement = r, this.zIncrement = y, l ? (d = 1, g = 0) : (d = -1, g = r - 1), k ? (b = -1, h = u - 1) : (b = 1,
            h = 0), p ? (e = -1, f = z - 1) : (e = 1, f = 0)) : -1 !== this.orientation.toUpperCase().indexOf("XZY") ? (c.xDim = r, c.yDim = z, c.zDim = u, a.xSize = x, a.ySize = B, a.zSize = D, this.xIncrement = 1, this.yIncrement = y, this.zIncrement = r, l ? (d = 1, g = 0) : (d = -1, g = r - 1), k ? (e = -1, f = u - 1) : (e = 1, f = 0), p ? (b = -1, h = z - 1) : (b = 1, h = 0)) : -1 !== this.orientation.toUpperCase().indexOf("YXZ") ? (c.xDim = u, c.yDim = r, c.zDim = z, a.xSize = D, a.ySize = x, a.zSize = B, this.xIncrement = r, this.yIncrement = 1, this.zIncrement = y, l ? (b = -1, h = r - 1) : (b = 1, h = 0), k ? (d = 1, g = 0) : (d = -1, g = u - 1), p ? (e = -1, f = z - 1) : (e =
            1, f = 0)) : -1 !== this.orientation.toUpperCase().indexOf("YZX") ? (c.xDim = z, c.yDim = r, c.zDim = u, a.xSize = B, a.ySize = x, a.zSize = D, this.xIncrement = y, this.yIncrement = 1, this.zIncrement = r, l ? (b = -1, h = r - 1) : (b = 1, h = 0), k ? (e = -1, f = u - 1) : (e = 1, f = 0), p ? (d = 1, g = 0) : (d = -1, g = z - 1)) : -1 !== this.orientation.toUpperCase().indexOf("ZXY") ? (c.xDim = u, c.yDim = z, c.zDim = r, a.xSize = D, a.ySize = B, a.zSize = x, this.xIncrement = r, this.yIncrement = y, this.zIncrement = 1, l ? (e = -1, f = r - 1) : (e = 1, f = 0), k ? (d = 1, g = 0) : (d = -1, g = u - 1), p ? (b = -1, h = z - 1) : (b = 1, h = 0)) : -1 !== this.orientation.toUpperCase().indexOf("ZYX") &&
        (c.xDim = z, c.yDim = u, c.zDim = r, a.xSize = B, a.ySize = D, a.zSize = x, this.xIncrement = y, this.yIncrement = r, this.zIncrement = 1, l ? (e = -1, f = r - 1) : (e = 1, f = 0), k ? (b = -1, h = u - 1) : (b = 1, h = 0), p ? (d = 1, g = 0) : (d = -1, g = z - 1));
    this.orientMat = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    this.orientMat[0][0] = d;
    this.orientMat[0][1] = 0;
    this.orientMat[0][2] = 0;
    this.orientMat[0][3] = g;
    this.orientMat[1][0] = 0;
    this.orientMat[1][1] = b;
    this.orientMat[1][2] = 0;
    this.orientMat[1][3] = h;
    this.orientMat[2][0] = 0;
    this.orientMat[2][1] = 0;
    this.orientMat[2][2] = e;
    this.orientMat[2][3] =
        f;
    this.orientMat[3][0] = 0;
    this.orientMat[3][1] = 0;
    this.orientMat[3][2] = 0;
    this.orientMat[3][3] = 1
};
papaya.volume.Orientation.prototype.isValid = function() {
    return papaya.volume.Orientation.isValidOrientationString(this.orientation)
};
papaya.volume.Orientation.prototype.getOrientationDescription = function() {
    var c = this.orientation;
    return "Cols (" + c.charAt(0) + c.charAt(3) + "), Rows (" + c.charAt(1) + c.charAt(4) + "), Slices (" + c.charAt(2) + c.charAt(5) + ")"
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.Transform = papaya.volume.Transform || function(c, a) {
    this.voxelValue = new papaya.volume.VoxelValue(a.imageData, a.header.imageType, a.header.imageDimensions, a.header.imageRange, a.header.orientation);
    this.voxelDimensions = a.header.voxelDimensions;
    this.imageDimensions = a.header.imageDimensions;
    this.volume = a;
    this.mat = papaya.volume.Transform.IDENTITY.clone();
    this.indexMat = papaya.volume.Transform.IDENTITY.clone();
    this.sizeMat = papaya.volume.Transform.IDENTITY.clone();
    this.sizeMatInverse = papaya.volume.Transform.IDENTITY.clone();
    this.mmMat = papaya.volume.Transform.IDENTITY.clone();
    this.worldMat = papaya.volume.Transform.IDENTITY.clone();
    this.worldMatNifti = null;
    this.originMat = papaya.volume.Transform.IDENTITY.clone();
    this.tempMat = papaya.volume.Transform.IDENTITY.clone();
    this.tempMat2 = papaya.volume.Transform.IDENTITY.clone();
    this.orientMat = papaya.volume.Transform.IDENTITY.clone();
    this.centerMat = papaya.volume.Transform.IDENTITY.clone();
    this.centerMatInverse = papaya.volume.Transform.IDENTITY.clone();
    this.rotMatX = papaya.volume.Transform.IDENTITY.clone();
    this.rotMatY = papaya.volume.Transform.IDENTITY.clone();
    this.rotMatZ = papaya.volume.Transform.IDENTITY.clone();
    this.rotMat = papaya.volume.Transform.IDENTITY.clone();
    this.updateTransforms(c)
};
papaya.volume.Transform.IDENTITY = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];
papaya.volume.Transform.EPSILON = 1E-5;
papaya.volume.Transform.printTransform = function(c) {
    console.log(c[0][0] + " " + c[0][1] + " " + c[0][2] + " " + c[0][3]);
    console.log(c[1][0] + " " + c[1][1] + " " + c[1][2] + " " + c[1][3]);
    console.log(c[2][0] + " " + c[2][1] + " " + c[2][2] + " " + c[2][3]);
    console.log(c[3][0] + " " + c[3][1] + " " + c[3][2] + " " + c[3][3])
};
papaya.volume.Transform.decompose = function(c) {
    var a, d, b, e, g, h, f, l, k, p, r, u, z, y, x, D, B, w, L, C;
    C = [];
    a = papaya.volume.Transform.validateNum(c[0][3]);
    d = papaya.volume.Transform.validateNum(c[1][3]);
    b = papaya.volume.Transform.validateNum(c[2][3]);
    e = papaya.volume.Transform.validateNum(Math.atan(c[2][1] / c[2][2]));
    g = 0 === e ? papaya.volume.Transform.validateNum(Math.atan(-1 * Math.cos(e) * (c[2][0] / c[2][2]))) : papaya.volume.Transform.validateNum(Math.atan(-1 * Math.sin(e) * (c[2][0] / c[2][1])));
    0 === g && (g = papaya.volume.Transform.EPSILON);
    l = papaya.volume.Transform.validateScale(c[2][2] / (Math.cos(g) * Math.cos(e)));
    f = Math.cos(e);
    k = Math.sin(e) * Math.sin(g) + Math.sin(e) * (Math.cos(g) / Math.tan(g));
    p = c[1][0] * (Math.sin(e) / Math.tan(g)) + c[1][1];
    h = -1 * Math.sin(e);
    r = Math.cos(e) * Math.sin(g) + Math.cos(e) * (Math.cos(g) / Math.tan(g));
    u = c[1][0] * (Math.cos(e) / Math.tan(g)) + c[1][2];
    h = papaya.volume.Transform.validateNum(Math.atan((f * u - p * h) / (p * r - k * u)));
    f = papaya.volume.Transform.validateScale(p / (Math.cos(h) * f + Math.sin(h) * k));
    k = papaya.volume.Transform.validateNum((f *
        Math.sin(h) * Math.cos(g) - c[1][0]) / (l * Math.sin(g)));
    p = Math.cos(g) * Math.cos(h);
    r = f * Math.cos(g) * Math.sin(h);
    u = -1 * l * Math.sin(g);
    z = Math.sin(e) * Math.sin(g) * Math.cos(h) - Math.cos(e) * Math.sin(h);
    y = Math.sin(e) * Math.sin(g) * Math.sin(h) + Math.cos(e) * Math.cos(h);
    x = l * Math.sin(e) * Math.cos(g);
    D = Math.cos(e) * Math.sin(g) * Math.cos(h) + Math.sin(e) * Math.sin(h);
    B = Math.cos(e) * Math.sin(g) * Math.sin(h) - Math.sin(e) * Math.cos(h);
    w = l * Math.cos(e) * Math.cos(g);
    y = r * z - p * y;
    x = u * z - p * x;
    z = z * c[0][0] - p * c[0][1];
    B = r * D - p * B;
    w = u * D - p * w;
    L = D * c[0][0] -
        p * c[0][2];
    D = papaya.volume.Transform.validateNum((B * z - L * y) / (x * B - y * w));
    y = papaya.volume.Transform.validateNum((z * w - x * L) / (y * w - x * B));
    c = papaya.volume.Transform.validateScale((c[0][0] - y * r - D * u) / p);
    g === papaya.volume.Transform.EPSILON && (g = 0);
    e *= 180 / Math.PI;
    g *= 180 / Math.PI;
    h *= 180 / Math.PI;
    C[0] = papaya.volume.Transform.validateZero(a);
    C[1] = papaya.volume.Transform.validateZero(d);
    C[2] = papaya.volume.Transform.validateZero(b);
    C[3] = papaya.volume.Transform.validateZero(e);
    C[4] = papaya.volume.Transform.validateZero(g);
    C[5] = papaya.volume.Transform.validateZero(h);
    C[6] = c;
    C[7] = f;
    C[8] = l;
    C[9] = papaya.volume.Transform.validateZero(k);
    C[10] = papaya.volume.Transform.validateZero(D);
    C[11] = papaya.volume.Transform.validateZero(y);
    return C
};
papaya.volume.Transform.hasRotations = function(c) {
    var a, d;
    return null !== c ? (a = papaya.volume.Transform.decompose(c), c = Math.abs(1 - Math.abs(a[3]) / 90) % 1, d = Math.abs(1 - Math.abs(a[4]) / 90) % 1, a = Math.abs(1 - Math.abs(a[5]) / 90) % 1, .01 < c || .01 < d || .01 < a) : !1
};
papaya.volume.Transform.validateNum = function(c) {
    return c === Number.POSITIVE_INFINITY || c === Number.NEGATIVE_INFINITY || isNaN(c) || 0 === c ? 0 : c
};
papaya.volume.Transform.validateScale = function(c) {
    return c === Number.POSITIVE_INFINITY || c === Number.NEGATIVE_INFINITY || isNaN(c) ? 1 : c
};
papaya.volume.Transform.validateZero = function(c) {
    return Math.abs(c) < papaya.volume.Transform.EPSILON ? 0 : c
};
papaya.volume.Transform.prototype.updateSizeMat = function() {
    this.sizeMat[0][0] = this.voxelDimensions.xSize;
    this.sizeMat[1][1] = this.voxelDimensions.ySize;
    this.sizeMat[2][2] = this.voxelDimensions.zSize;
    this.sizeMat[3][3] = 1;
    this.sizeMatInverse[0][0] = 1 / this.voxelDimensions.xSize;
    this.sizeMatInverse[1][1] = 1 / this.voxelDimensions.ySize;
    this.sizeMatInverse[2][2] = 1 / this.voxelDimensions.zSize;
    this.sizeMatInverse[3][3] = 1
};
papaya.volume.Transform.prototype.updateOrientMat = function() {
    this.orientMat = this.volume.header.orientation.orientMat
};
papaya.volume.Transform.prototype.updateIndexTransform = function() {
    var c, a;
    for (c = 0; 4 > c; c += 1)
        for (a = 0; 4 > a; a += 1) this.indexMat[c][a] = this.orientMat[c][0] * this.mat[0][a] + this.orientMat[c][1] * this.mat[1][a] + this.orientMat[c][2] * this.mat[2][a] + this.orientMat[c][3] * this.mat[3][a]
};
papaya.volume.Transform.prototype.updateMmTransform = function() {
    var c, a;
    for (c = 0; 4 > c; c += 1)
        for (a = 0; 4 > a; a += 1) this.mmMat[c][a] = this.indexMat[c][0] * this.sizeMatInverse[0][a] + this.indexMat[c][1] * this.sizeMatInverse[1][a] + this.indexMat[c][2] * this.sizeMatInverse[2][a] + this.indexMat[c][3] * this.sizeMatInverse[3][a]
};
papaya.volume.Transform.prototype.updateOriginMat = function() {
    this.originMat[0][0] = 1;
    this.originMat[1][1] = -1;
    this.originMat[2][2] = -1;
    this.originMat[3][3] = 1;
    this.originMat[0][3] = this.volume.header.origin.x;
    this.originMat[1][3] = this.volume.header.origin.y;
    this.originMat[2][3] = this.volume.header.origin.z
};
papaya.volume.Transform.prototype.updateImageMat = function(c, a, d, b, e, g) {
    this.updateCenterMat(c, a, d);
    a = b * Math.PI / 180;
    c = Math.cos(a);
    a = Math.sin(a);
    this.rotMatX[1][1] = c;
    this.rotMatX[1][2] = a;
    this.rotMatX[2][1] = -1 * a;
    this.rotMatX[2][2] = c;
    a = e * Math.PI / 180;
    c = Math.cos(a);
    a = Math.sin(a);
    this.rotMatY[0][0] = c;
    this.rotMatY[0][2] = -1 * a;
    this.rotMatY[2][0] = a;
    this.rotMatY[2][2] = c;
    a = g * Math.PI / 180;
    c = Math.cos(a);
    a = Math.sin(a);
    this.rotMatZ[0][0] = c;
    this.rotMatZ[0][1] = a;
    this.rotMatZ[1][0] = -1 * a;
    this.rotMatZ[1][1] = c;
    for (e = 0; 4 >
        e; e += 1)
        for (g = 0; 4 > g; g += 1) this.tempMat[e][g] = this.rotMatX[e][0] * this.rotMatY[0][g] + this.rotMatX[e][1] * this.rotMatY[1][g] + this.rotMatX[e][2] * this.rotMatY[2][g] + this.rotMatX[e][3] * this.rotMatY[3][g];
    for (e = 0; 4 > e; e += 1)
        for (g = 0; 4 > g; g += 1) this.rotMat[e][g] = this.tempMat[e][0] * this.rotMatZ[0][g] + this.tempMat[e][1] * this.rotMatZ[1][g] + this.tempMat[e][2] * this.rotMatZ[2][g] + this.tempMat[e][3] * this.rotMatZ[3][g];
    for (e = 0; 4 > e; e += 1)
        for (g = 0; 4 > g; g += 1) this.tempMat[e][g] = this.sizeMatInverse[e][0] * this.centerMatInverse[0][g] +
            this.sizeMatInverse[e][1] * this.centerMatInverse[1][g] + this.sizeMatInverse[e][2] * this.centerMatInverse[2][g] + this.sizeMatInverse[e][3] * this.centerMatInverse[3][g];
    for (e = 0; 4 > e; e += 1)
        for (g = 0; 4 > g; g += 1) this.tempMat2[e][g] = this.tempMat[e][0] * this.rotMat[0][g] + this.tempMat[e][1] * this.rotMat[1][g] + this.tempMat[e][2] * this.rotMat[2][g] + this.tempMat[e][3] * this.rotMat[3][g];
    for (e = 0; 4 > e; e += 1)
        for (g = 0; 4 > g; g += 1) this.tempMat[e][g] = this.tempMat2[e][0] * this.centerMat[0][g] + this.tempMat2[e][1] * this.centerMat[1][g] + this.tempMat2[e][2] *
            this.centerMat[2][g] + this.tempMat2[e][3] * this.centerMat[3][g];
    for (e = 0; 4 > e; e += 1)
        for (g = 0; 4 > g; g += 1) this.tempMat2[e][g] = this.tempMat[e][0] * this.sizeMat[0][g] + this.tempMat[e][1] * this.sizeMat[1][g] + this.tempMat[e][2] * this.sizeMat[2][g] + this.tempMat[e][3] * this.sizeMat[3][g];
    this.volume.transform.updateTransforms(this.tempMat2)
};
papaya.volume.Transform.prototype.updateCenterMat = function(c, a, d) {
    this.centerMat[0][0] = 1;
    this.centerMat[1][1] = 1;
    this.centerMat[2][2] = 1;
    this.centerMat[3][3] = 1;
    this.centerMat[0][3] = -1 * c;
    this.centerMat[1][3] = -1 * a;
    this.centerMat[2][3] = -1 * d;
    this.centerMatInverse[0][0] = 1;
    this.centerMatInverse[1][1] = 1;
    this.centerMatInverse[2][2] = 1;
    this.centerMatInverse[3][3] = 1;
    this.centerMatInverse[0][3] = c;
    this.centerMatInverse[1][3] = a;
    this.centerMatInverse[2][3] = d
};
papaya.volume.Transform.prototype.updateWorldMat = function() {
    var c, a, d, b;
    if (this.worldMatNifti) {
        d = [
            [-1, 0, 0, this.imageDimensions.xDim - 1],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        b = papaya.volume.Transform.IDENTITY.clone();
        b[0][0] = -1;
        b[1][1] = -1;
        b[2][2] = -1;
        b[3][3] = 1;
        b[0][3] = this.volume.header.origin.x;
        b[1][3] = this.volume.header.origin.y;
        b[2][3] = this.volume.header.origin.z;
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat[c][a] = this.sizeMat[c][0] * b[0][a] + this.sizeMat[c][1] * b[1][a] + this.sizeMat[c][2] * b[2][a] + this.sizeMat[c][3] *
                b[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat2[c][a] = this.tempMat[c][0] * d[0][a] + this.tempMat[c][1] * d[1][a] + this.tempMat[c][2] * d[2][a] + this.tempMat[c][3] * d[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat[c][a] = this.tempMat2[c][0] * this.mat[0][a] + this.tempMat2[c][1] * this.mat[1][a] + this.tempMat2[c][2] * this.mat[2][a] + this.tempMat2[c][3] * this.mat[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat2[c][a] = this.tempMat[c][0] * d[0][a] + this.tempMat[c][1] * d[1][a] + this.tempMat[c][2] * d[2][a] + this.tempMat[c][3] *
                d[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat[c][a] = this.tempMat2[c][0] * b[0][a] + this.tempMat2[c][1] * b[1][a] + this.tempMat2[c][2] * b[2][a] + this.tempMat2[c][3] * b[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat2[c][a] = this.tempMat[c][0] * this.sizeMatInverse[0][a] + this.tempMat[c][1] * this.sizeMatInverse[1][a] + this.tempMat[c][2] * this.sizeMatInverse[2][a] + this.tempMat[c][3] * this.sizeMatInverse[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.worldMat[c][a] = this.worldMatNifti[c][0] * this.tempMat2[0][a] +
                this.worldMatNifti[c][1] * this.tempMat2[1][a] + this.worldMatNifti[c][2] * this.tempMat2[2][a] + this.worldMatNifti[c][3] * this.tempMat2[3][a]
    } else {
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.tempMat[c][a] = this.indexMat[c][0] * this.originMat[0][a] + this.indexMat[c][1] * this.originMat[1][a] + this.indexMat[c][2] * this.originMat[2][a] + this.indexMat[c][3] * this.originMat[3][a];
        for (c = 0; 4 > c; c += 1)
            for (a = 0; 4 > a; a += 1) this.worldMat[c][a] = this.tempMat[c][0] * this.sizeMatInverse[0][a] + this.tempMat[c][1] * this.sizeMatInverse[1][a] +
                this.tempMat[c][2] * this.sizeMatInverse[2][a] + this.tempMat[c][3] * this.sizeMatInverse[3][a]
    }
};
papaya.volume.Transform.prototype.updateMat = function(c) {
    var a, d;
    for (d = 0; 4 > d; d += 1)
        for (a = 0; 4 > a; a += 1) this.mat[d][a] = c[d][a]
};
papaya.volume.Transform.prototype.updateTransforms = function(c) {
    this.updateMat(c);
    this.updateSizeMat();
    this.updateOrientMat();
    this.updateOriginMat();
    this.updateIndexTransform();
    this.updateMmTransform();
    this.updateWorldMat()
};
papaya.volume.Transform.prototype.getVoxelAtIndexNative = function(c, a, d, b, e) {
    return this.voxelValue.getVoxelAtIndexNative(c, a, d, b, e)
};
papaya.volume.Transform.prototype.getVoxelAtIndex = function(c, a, d, b, e) {
    return this.voxelValue.getVoxelAtIndex(c, a, d, b, e)
};
papaya.volume.Transform.prototype.getVoxelAtCoordinate = function(c, a, d, b, e) {
    return this.voxelValue.getVoxelAtIndexNative(c * this.worldMat[0][0] + a * this.worldMat[0][1] + d * this.worldMat[0][2] + this.worldMat[0][3], c * this.worldMat[1][0] + a * this.worldMat[1][1] + d * this.worldMat[1][2] + this.worldMat[1][3], c * this.worldMat[2][0] + a * this.worldMat[2][1] + d * this.worldMat[2][2] + this.worldMat[2][3], b, e)
};
papaya.volume.Transform.prototype.getVoxelAtMM = function(c, a, d, b, e) {
    return this.voxelValue.getVoxelAtIndexNative(c * this.mmMat[0][0] + a * this.mmMat[0][1] + d * this.mmMat[0][2] + this.mmMat[0][3], c * this.mmMat[1][0] + a * this.mmMat[1][1] + d * this.mmMat[1][2] + this.mmMat[1][3], c * this.mmMat[2][0] + a * this.mmMat[2][1] + d * this.mmMat[2][2] + this.mmMat[2][3], b, e)
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.Volume = papaya.volume.Volume || function(c, a, d) {
    this.progressMeter = c;
    this.dialogHandler = a;
    this.files = [];
    this.rawData = [];
    this.fileLength = 0;
    this.fileName = this.urls = null;
    this.compressed = !1;
    this.transform = null;
    this.numTimepoints = 0;
    this.transform = this.error = this.onFinishedRead = null;
    this.isLoaded = !1;
    this.numTimepoints = 1;
    this.loaded = !1;
    this.params = d;
    this.header = new papaya.volume.Header(void 0 !== this.params && this.params.padAllImages);
    this.imageData = new papaya.volume.ImageData(void 0 !== this.params &&
        this.params.padAllImages)
};
papaya.volume.Volume.PROGRESS_LABEL_LOADING = "Loading";
papaya.volume.Volume.prototype.fileIsCompressed = function(c, a) {
    var d, b;
    return c && -1 !== c.indexOf(".gz") || a && (d = new DataView(a), b = d.getUint8(0), d = d.getUint8(1), b === GUNZIP_MAGIC_COOKIE1 || d === GUNZIP_MAGIC_COOKIE2) ? !0 : !1
};
papaya.volume.Volume.prototype.readFiles = function(c, a) {
    this.files = c;
    this.fileName = c[0].name;
    this.onFinishedRead = a;
    this.compressed = this.fileIsCompressed(this.fileName);
    this.fileLength = this.files[0].size;
    this.readNextFile(this, 0)
};
papaya.volume.Volume.prototype.readNextFile = function(c, a) {
    var d;
    if (a < this.files.length) {
        d = papaya.utilities.PlatformUtils.makeSlice(this.files[a], 0, this.files[a].size);
        try {
            var b = new FileReader;
            b.onloadend = papaya.utilities.ObjectUtils.bind(c, function(b) {
                b.target.readyState === FileReader.DONE && (c.rawData[a] = b.target.result, setTimeout(function() {
                    c.readNextFile(c, a + 1)
                }, 0))
            });
            b.onerror = papaya.utilities.ObjectUtils.bind(c, function(a) {
                c.error = Error("There was a problem reading that file:\n\n" + a.getMessage());
                c.finishedLoad()
            });
            b.readAsArrayBuffer(d)
        } catch (e) {
            c.error = Error("There was a problem reading that file:\n\n" + e.message), c.finishedLoad()
        }
    } else setTimeout(function() {
        c.decompress(c)
    }, 0)
};
papaya.volume.Volume.prototype.readURLs = function(c, a) {
    var d = this;
    this.urls = c;
    this.fileName = c[0].substr(c[0].lastIndexOf("/") + 1, c[0].length);
    this.onFinishedRead = a;
    this.compressed = this.fileIsCompressed(this.fileName); - 1 !== this.fileName.indexOf("?") && (this.fileName = this.fileName.substr(0, this.fileName.indexOf("?")));
    this.rawData = [];
    this.loadedFileCount = 0;
    this.readEachURL(this).done(function() {
        setTimeout(function() {
            d.decompress(d)
        }, 0)
    }).fail(function(a, c, d) {
        c = c.message || "";
        "undefined" !== typeof d && (c =
            "Response status = " + d.status);
        a.error = Error("There was a problem reading that file (" + a.fileName + "):\n\n" + c);
        a.finishedLoad()
    })
};
papaya.volume.Volume.prototype.loadURL = function(c, a, d) {
    var b, e, g, h;
    b = jQuery.Deferred();
    "string" === typeof(new XMLHttpRequest).responseType ? (e = new XMLHttpRequest, e.open("GET", c, !0), e.responseType = "arraybuffer", e.onreadystatechange = function() {
        4 === e.readyState && (200 === e.status ? (a.fileLength = a.rawData.byteLength, b.resolve(e.response)) : b.reject(a, !1, e))
    }, e.onprogress = function(a) {
        a.lengthComputable && b.notify(a.loaded, a.total)
    }, e.send(null)) : (a.error = Error("There was a problem reading that file (" + a.fileName +
        "):\n\nResponse type is not supported."), a.finishedLoad());
    return b.promise().done(function(b) {
        a.loadedFileCount++;
        a.rawData[d] = b
    }).fail(function(a, b, c) {
        console.error(a, b, c)
    }).progress(function(b, c) {
        g = parseInt(100 * a.loadedFileCount / a.urls.length, 10);
        h = papaya.volume.Volume.PROGRESS_LABEL_LOADING + " image " + (a.loadedFileCount + 1) + " of " + a.urls.length + " (" + g + "%)";
        a.progressMeter.drawProgress(b / c, h)
    })
};
papaya.volume.Volume.prototype.readEachURL = function(c) {
    for (var a = [], d = 0; d < c.urls.length; d++) {
        var b = c.loadURL(c.urls[d], c, d);
        a.push(b)
    }
    return $.when.apply($, a)
};
papaya.volume.Volume.prototype.readBinaryData = function(c, a) {
    var d = null;
    try {
        this.fileName = c[0] instanceof ArrayBuffer ? "unknown" : c[0], this.onFinishedRead = a, d = this, this.fileLength = 0, d.readNextBinaryData(d, 0, c)
    } catch (b) {
        d && (d.error = Error("There was a problem reading that file:\n\n" + b.message), d.finishedLoad())
    }
};
papaya.volume.Volume.prototype.readNextBinaryData = function(c, a, d) {
    if (a < d.length) try {
        c.rawData[a] = d[a] instanceof ArrayBuffer ? d[a] : papaya.utilities.ObjectUtils.dereference(d[a]), c.compressed = this.fileIsCompressed(this.fileName, c.rawData[a]), setTimeout(function() {
            c.readNextBinaryData(c, a + 1, d)
        }, 0)
    } catch (b) {
        c && (c.error = Error("There was a problem reading that file:\n\n" + b.message), c.finishedLoad())
    } else c.decompress(c)
};
papaya.volume.Volume.prototype.readEncodedData = function(c, a) {
    var d = null;
    try {
        this.fileName = c[0], this.onFinishedRead = a, d = this, this.fileLength = 0, d.readNextEncodedData(d, 0, c)
    } catch (b) {
        d && (d.error = Error("There was a problem reading that file:\n\n" + b.message), d.finishedLoad())
    }
};
papaya.volume.Volume.prototype.readNextEncodedData = function(c, a, d) {
    if (a < d.length) try {
        var b = papaya.utilities.ObjectUtils.dereference(d[a]);
        b ? c.rawData[a] = Base64Binary.decodeArrayBuffer(b) : (this.fileName = "unknown", c.rawData[a] = Base64Binary.decodeArrayBuffer(d[a]));
        c.compressed = this.fileIsCompressed(this.fileName, c.rawData[a]);
        setTimeout(function() {
            c.readNextEncodedData(c, a + 1, d)
        }, 0)
    } catch (e) {
        c && (c.error = Error("There was a problem reading that file:\n\n" + e.message), c.finishedLoad())
    } else c.decompress(c)
};
papaya.volume.Volume.prototype.getVoxelAtIndexNative = function(c, a, d, b, e) {
    return this.transform.getVoxelAtIndexNative(c, a, d, 0, e)
};
papaya.volume.Volume.prototype.getVoxelAtIndex = function(c, a, d, b, e) {
    return this.transform.getVoxelAtIndex(c, a, d, b, e)
};
papaya.volume.Volume.prototype.getVoxelAtCoordinate = function(c, a, d, b, e) {
    return this.transform.getVoxelAtCoordinate(c, a, d, b, e)
};
papaya.volume.Volume.prototype.getVoxelAtMM = function(c, a, d, b, e) {
    return this.transform.getVoxelAtMM(c, a, d, b, e)
};
papaya.volume.Volume.prototype.hasError = function() {
    return null !== this.error
};
papaya.volume.Volume.prototype.getXDim = function() {
    return this.header.imageDimensions.xDim
};
papaya.volume.Volume.prototype.getYDim = function() {
    return this.header.imageDimensions.yDim
};
papaya.volume.Volume.prototype.getZDim = function() {
    return this.header.imageDimensions.zDim
};
papaya.volume.Volume.prototype.getXSize = function() {
    return this.header.voxelDimensions.xSize
};
papaya.volume.Volume.prototype.getYSize = function() {
    return this.header.voxelDimensions.ySize
};
papaya.volume.Volume.prototype.getZSize = function() {
    return this.header.voxelDimensions.zSize
};
papaya.volume.Volume.prototype.decompress = function(c) {
    c.compressed = c.compressed || c.fileIsCompressed(c.fileName, c.rawData[0]);
    if (c.compressed) try {
        pako.inflate(new Uint8Array(c.rawData[0]), null, this.progressMeter, function(a) {
            c.finishedDecompress(c, a.buffer)
        })
    } catch (a) {
        console.log(a)
    } else setTimeout(function() {
        c.finishedReadData(c)
    }, 0)
};
papaya.volume.Volume.prototype.finishedDecompress = function(c, a) {
    c.rawData[0] = a;
    setTimeout(function() {
        c.finishedReadData(c)
    }, 0)
};
papaya.volume.Volume.prototype.finishedReadData = function(c) {
    c.rawData = papaya.utilities.ArrayUtils.cleanArray(c.rawData);
    c.header.readHeaderData(c.fileName, c.rawData, this.progressMeter, this.dialogHandler, papaya.utilities.ObjectUtils.bind(this, this.finishedReadHeaderData))
};
papaya.volume.Volume.prototype.finishedReadHeaderData = function() {
    this.rawData = null;
    this.header.hasError() ? (this.error = this.header.error, console.error(this.error.stack), this.onFinishedRead(this)) : (this.header.imageType.swapped = this.header.imageType.littleEndian !== papaya.utilities.PlatformUtils.isPlatformLittleEndian(), this.header.getName() && (this.fileName = this.header.getName()), this.header.readImageData(this.progressMeter, papaya.utilities.ObjectUtils.bind(this, this.finishedReadImageData)))
};
papaya.volume.Volume.prototype.finishedReadImageData = function(c) {
    this.imageData.readFileData(this.header, c, papaya.utilities.ObjectUtils.bind(this, this.finishedLoad))
};
papaya.volume.Volume.prototype.finishedLoad = function() {
    this.loaded || (this.loaded = !0, this.onFinishedRead && (this.hasError() ? console.log(this.error) : (this.transform = new papaya.volume.Transform(papaya.volume.Transform.IDENTITY.clone(), this), this.numTimepoints = this.header.imageDimensions.timepoints || 1, this.applyBestTransform()), this.isLoaded = !0, this.rawData = null, this.onFinishedRead(this)))
};
papaya.volume.Volume.prototype.setOrigin = function(c) {
    c = this.header.orientation.convertCoordinate(c, new papaya.core.Coordinate(0, 0, 0));
    this.header.origin.setCoordinate(c.x, c.y, c.z)
};
papaya.volume.Volume.prototype.getOrigin = function() {
    return this.header.orientation.convertCoordinate(this.header.origin, new papaya.core.Coordinate(0, 0, 0))
};
papaya.volume.Volume.prototype.applyBestTransform = function() {
    var c = this.header.getBestTransform();
    null !== c && (this.transform.worldMatNifti = numeric.inv(c), this.setOrigin(this.header.getBestTransformOrigin()), this.transform.updateWorldMat())
};
papaya.volume.Volume.prototype.isWorldSpaceOnly = function() {
    var c, a = !1;
    return this.header.fileFormat instanceof papaya.volume.nifti.HeaderNIFTI ? (c = this.header.fileFormat, 0 < c.nifti.qform_code && (a |= !c.qFormHasRotations()), 0 < c.nifti.sform_code && (a |= !c.sFormHasRotations()), !a) : !1
};
papaya.volume.Volume.prototype.getSeriesLabels = function() {
    return this.header.getSeriesLabels()
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.VoxelDimensions = papaya.volume.VoxelDimensions || function(c, a, d, b) {
    this.colSize = Math.abs(c);
    this.rowSize = Math.abs(a);
    this.sliceSize = Math.abs(d);
    this.zSize = this.ySize = this.xSize = 0;
    this.flip = !1;
    this.timeSize = b;
    this.temporalUnit = this.spatialUnit = papaya.volume.VoxelDimensions.UNITS_UNKNOWN
};
papaya.volume.VoxelDimensions.UNITS_UNKNOWN = 0;
papaya.volume.VoxelDimensions.UNITS_METER = 1;
papaya.volume.VoxelDimensions.UNITS_MM = 2;
papaya.volume.VoxelDimensions.UNITS_MICRON = 3;
papaya.volume.VoxelDimensions.UNITS_SEC = 8;
papaya.volume.VoxelDimensions.UNITS_MSEC = 16;
papaya.volume.VoxelDimensions.UNITS_USEC = 24;
papaya.volume.VoxelDimensions.UNITS_HZ = 32;
papaya.volume.VoxelDimensions.UNITS_PPM = 40;
papaya.volume.VoxelDimensions.UNITS_RADS = 48;
papaya.volume.VoxelDimensions.UNIT_STRINGS = [];
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_UNKNOWN] = "Unknown Unit";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_METER] = "Meters";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_MM] = "Millimeters";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_MICRON] = "Microns";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_SEC] = "Seconds";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_MSEC] = "Milliseconds";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_USEC] = "Microseconds";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_HZ] = "Hertz";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_PPM] = "Parts-per-million";
papaya.volume.VoxelDimensions.UNIT_STRINGS[papaya.volume.VoxelDimensions.UNITS_RADS] = "Radians-per-second";
papaya.volume.VoxelDimensions.prototype.isValid = function() {
    return 0 < this.colSize && 0 < this.rowSize && 0 < this.sliceSize && 0 <= this.timeSize
};
papaya.volume.VoxelDimensions.prototype.getSpatialUnitString = function() {
    return papaya.volume.VoxelDimensions.UNIT_STRINGS[this.spatialUnit]
};
papaya.volume.VoxelDimensions.prototype.getTemporalUnitString = function() {
    return papaya.volume.VoxelDimensions.UNIT_STRINGS[this.temporalUnit]
};
papaya.volume.VoxelDimensions.prototype.getTemporalUnitMultiplier = function() {
    return this.temporalUnit === papaya.volume.VoxelDimensions.UNITS_MSEC ? .001 : this.temporalUnit === papaya.volume.VoxelDimensions.UNITS_USEC ? 1E-6 : 1
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.volume.VoxelValue = papaya.volume.VoxelValue || function(c, a, d, b, e) {
    this.imageData = c;
    this.imageType = a;
    this.imageRange = b;
    this.orientation = e;
    this.swap16 = 2 === this.imageType.numBytes && this.imageType.swapped && this.imageType.datatype !== papaya.volume.ImageType.DATATYPE_FLOAT;
    this.swap32 = 4 === this.imageType.numBytes && this.imageType.swapped && this.imageType.datatype !== papaya.volume.ImageType.DATATYPE_FLOAT;
    this.xIncrement = e.xIncrement;
    this.yIncrement = e.yIncrement;
    this.zIncrement = e.zIncrement;
    this.xDim = d.xDim;
    this.yDim = d.yDim;
    this.zDim = d.zDim;
    this.sliceSize = d.getNumVoxelsSlice();
    this.volSize = d.getNumVoxelsVolume();
    this.dataScaleSlopes = b.dataScaleSlopes;
    this.dataScaleIntercepts = b.dataScaleIntercepts;
    this.globalDataScaleSlope = b.globalDataScaleSlope;
    this.globalDataScaleIntercept = b.globalDataScaleIntercept;
    this.usesGlobalDataScale = b.usesGlobalDataScale;
    this.interpFirstPass = [
        [0, 0],
        [0, 0]
    ];
    this.interpSecondPass = [0, 0];
    this.forceABS = !1
};
papaya.volume.VoxelValue.prototype.getVoxelAtIndexNative = function(c, a, d, b, e) {
    return e ? (c = papayaRoundFast(c), a = papayaRoundFast(a), d = papayaRoundFast(d), this.getVoxelAtOffset(this.orientation.convertIndexToOffsetNative(c, a, d), b, c, a, d)) : this.getVoxelAtIndexLinear(c, a, d, b)
};
papaya.volume.VoxelValue.prototype.getVoxelAtIndex = function(c, a, d, b, e) {
    return e ? (c = papayaRoundFast(c), a = papayaRoundFast(a), d = papayaRoundFast(d), this.getVoxelAtOffset(this.orientation.convertIndexToOffset(c, a, d), b, c, a, d)) : this.getVoxelAtIndexLinear(c, a, d, b)
};
papaya.volume.VoxelValue.prototype.getVoxelAtOffset = function(c, a, d, b, e) {
    c += this.volSize * a;
    if (0 > d || d >= this.xDim || 0 > b || b >= this.yDim || 0 > e || e >= this.zDim) return 0;
    this.usesGlobalDataScale ? d = this.checkSwap(this.imageData.data[c]) * this.globalDataScaleSlope + this.globalDataScaleIntercept : (d = parseInt(c / this.sliceSize), d = this.checkSwap(this.imageData.data[c]) * this.dataScaleSlopes[d] + this.dataScaleIntercepts[d]);
    return this.forceABS ? Math.abs(d) : d
};
papaya.volume.VoxelValue.prototype.getVoxelAtIndexLinear = function(c, a, d, b) {
    var e, g, h, f, l, k, p, r, u;
    l = Math.floor(c);
    k = Math.floor(a);
    p = Math.floor(d);
    e = c - l;
    g = a - k;
    h = d - p;
    f = 0 !== e;
    r = 0 !== g;
    u = 0 !== h;
    if (f && r && u) {
        for (a = 0; 2 > a; a += 1)
            for (d = 0; 2 > d; d += 1) f = this.orientation.convertIndexToOffsetNative(l + a, k + d, p), c = this.getVoxelAtOffset(f, b, l + a, k + d, p) * (1 - h), f = this.orientation.convertIndexToOffsetNative(l + a, k + d, p + 1), f = this.getVoxelAtOffset(f, b, l + a, k + d, p + 1) * h, this.interpFirstPass[a][d] = c + f;
        this.interpSecondPass[0] = this.interpFirstPass[0][0] *
            (1 - g) + this.interpFirstPass[0][1] * g;
        this.interpSecondPass[1] = this.interpFirstPass[1][0] * (1 - g) + this.interpFirstPass[1][1] * g;
        b = this.interpSecondPass[0] * (1 - e) + this.interpSecondPass[1] * e
    } else if (f && r && !u) {
        for (a = 0; 2 > a; a += 1) f = this.orientation.convertIndexToOffsetNative(l + a, k, p), c = this.getVoxelAtOffset(f, b, l + a, k, p) * (1 - g), f = this.orientation.convertIndexToOffsetNative(l + a, k + 1, p), f = this.getVoxelAtOffset(f, b, l + a, k + 1, p) * g, this.interpSecondPass[a] = c + f;
        b = this.interpSecondPass[0] * (1 - e) + this.interpSecondPass[1] * e
    } else if (f &&
        !r && u) {
        for (a = 0; 2 > a; a += 1) f = this.orientation.convertIndexToOffsetNative(l + a, k, p), c = this.getVoxelAtOffset(f, b, l + a, k, p) * (1 - h), f = this.orientation.convertIndexToOffsetNative(l + a, k, p + 1), f = this.getVoxelAtOffset(f, b, l + a, k, p + 1) * h, this.interpSecondPass[a] = c + f;
        b = this.interpSecondPass[0] * (1 - e) + this.interpSecondPass[1] * e
    } else if (!f && r && u) {
        for (d = 0; 2 > d; d += 1) f = this.orientation.convertIndexToOffsetNative(l, k + d, p), c = this.getVoxelAtOffset(f, b, l, k + d, p) * (1 - h), f = this.orientation.convertIndexToOffsetNative(l, k + d, p + 1), f =
            this.getVoxelAtOffset(f, b, l, k + d, p + 1) * h, this.interpSecondPass[d] = c + f;
        b = this.interpSecondPass[0] * (1 - g) + this.interpSecondPass[1] * g
    } else f || r || !u ? f || !r || u ? !f || r || u ? b = this.getVoxelAtOffset(this.orientation.convertIndexToOffsetNative(c, a, d), b, c, a, d) : (f = this.orientation.convertIndexToOffsetNative(l, k, p), c = this.getVoxelAtOffset(f, b, l, k, p) * (1 - e), f = this.orientation.convertIndexToOffsetNative(l + 1, k, p), f = this.getVoxelAtOffset(f, b, l + 1, k, p) * e, b = c + f) : (f = this.orientation.convertIndexToOffsetNative(l, k, p), c = this.getVoxelAtOffset(f,
        b, l, k, p) * (1 - g), f = this.orientation.convertIndexToOffsetNative(l, k + 1, p), f = this.getVoxelAtOffset(f, b, l, k + 1, p) * g, b = c + f) : (f = this.orientation.convertIndexToOffsetNative(l, k, p), c = this.getVoxelAtOffset(f, b, l, k, p) * (1 - h), f = this.orientation.convertIndexToOffsetNative(l, k, p + 1), f = this.getVoxelAtOffset(f, b, l, k, p + 1) * h, b = c + f);
    return b
};
papaya.volume.VoxelValue.prototype.checkSwap = function(c) {
    return this.swap16 ? ((c & 255) << 8 | c >> 8 & 255) << 16 >> 16 : this.swap32 ? (c & 255) << 24 | (c & 65280) << 8 | c >> 8 & 65280 | c >> 24 & 255 : c
};
"use strict";
papaya = papaya || {};
papaya.surface = papaya.surface || {};
papaya.surface.Surface = papaya.surface.Surface || function(c, a) {
    this.progressMeter = c;
    this.colorsData = this.normalsData = this.triangleData = this.pointData = this.onFinishedRead = this.rawData = this.filename = this.error = null;
    this.numTriangles = this.numPoints = 0;
    this.solidColor = this.colorsBuffer = this.normalsBuffer = this.trianglesBuffer = this.pointsBuffer = null;
    this.surfaceType = papaya.surface.Surface.SURFACE_TYPE_UNKNOWN;
    this.fileFormat = null;
    this.params = a;
    this.volume = this.nextSurface = null;
    this.alpha = 1
};
papaya.surface.Surface.SURFACE_TYPE_UNKNOWN = 0;
papaya.surface.Surface.SURFACE_TYPE_GIFTI = 1;
papaya.surface.Surface.SURFACE_TYPE_MANGO = 2;
papaya.surface.Surface.SURFACE_TYPE_VTK = 3;
papaya.surface.Surface.findSurfaceType = function(c) {
    return gifti.isThisFormat(c) ? papaya.surface.Surface.SURFACE_TYPE_GIFTI : papaya.surface.SurfaceMango.isThisFormat(c) ? papaya.surface.Surface.SURFACE_TYPE_MANGO : papaya.surface.SurfaceVTK.isThisFormat(c) ? papaya.surface.Surface.SURFACE_TYPE_VTK : papaya.surface.Surface.SURFACE_TYPE_UNKNOWN
};
papaya.surface.Surface.prototype.makeFileFormat = function(c) {
    this.surfaceType = papaya.surface.Surface.findSurfaceType(c);
    this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_GIFTI ? this.fileFormat = new papaya.surface.SurfaceGIFTI : this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_MANGO ? this.fileFormat = new papaya.surface.SurfaceMango : this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_VTK && (this.fileFormat = new papaya.surface.SurfaceVTK)
};
papaya.surface.Surface.prototype.readURL = function(c, a, d) {
    var b, e = this;
    this.filename = c.substr(c.lastIndexOf("/") + 1, c.length);
    this.onFinishedRead = d;
    this.volume = a;
    this.processParams(this.filename);
    this.makeFileFormat(this.filename);
    if (this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_UNKNOWN) this.error = Error("This surface format is not supported!"), this.finishedLoading();
    else try {
        "string" === typeof(new XMLHttpRequest).responseType ? (b = new XMLHttpRequest, b.open("GET", c, !0), this.fileFormat.isSurfaceDataBinary() &&
            (b.responseType = "arraybuffer"), b.onreadystatechange = function() {
                4 === b.readyState && (200 === b.status ? e.rawData = b.response : e.error = Error("There was a problem reading that file (" + e.filename + "):\n\nResponse status = " + b.status), e.finishedLoading())
            }, b.onprogress = function(a) {
                a.lengthComputable && e.progressMeter.drawProgress(a.loaded / a.total, papaya.volume.Volume.PROGRESS_LABEL_LOADING)
            }, b.send(null)) : (e.error = Error("There was a problem reading that file (" + e.filename + "):\n\nResponse type is not supported."),
            e.finishedLoading())
    } catch (g) {
        null !== e && (e.error = Error("There was a problem reading that file (" + e.filename + "):\n\n" + g.message), e.finishedLoading())
    }
};
papaya.surface.Surface.prototype.readFile = function(c, a, d) {
    var b = papaya.utilities.PlatformUtils.makeSlice(c, 0, c.size),
        e = this;
    this.filename = c.name;
    this.onFinishedRead = d;
    this.volume = a;
    this.processParams(this.filename);
    this.makeFileFormat(this.filename);
    if (this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_UNKNOWN) this.error = Error("This surface format is not supported!"), this.finishedLoading();
    else try {
        var g = new FileReader;
        g.onloadend = function(a) {
            a.target.readyState === FileReader.DONE && (e.rawData =
                a.target.result, e.finishedLoading())
        };
        g.onerror = function(a) {
            e.error = Error("There was a problem reading that file:\n\n" + a.getMessage());
            e.finishedLoading()
        };
        this.fileFormat.isSurfaceDataBinary() ? g.readAsArrayBuffer(b) : g.readAsText(b)
    } catch (h) {
        e.error = Error("There was a problem reading that file:\n\n" + h.message), e.finishedLoading()
    }
};
papaya.surface.Surface.prototype.readEncodedData = function(c, a, d) {
    this.filename = c + ".surf.gii";
    this.onFinishedRead = d;
    this.volume = a;
    this.processParams(c);
    this.makeFileFormat(this.filename);
    if (this.surfaceType === papaya.surface.Surface.SURFACE_TYPE_UNKNOWN) this.error = Error("This surface format is not supported!");
    else try {
        this.fileFormat.isSurfaceDataBinary() ? this.rawData = Base64Binary.decodeArrayBuffer(papaya.utilities.ObjectUtils.dereference(c)) : this.rawData = atob(papaya.utilities.ObjectUtils.dereference(c))
    } catch (b) {
        this.error =
            Error("There was a problem reading that file:\n\n" + b.message)
    }
    this.finishedLoading()
};
papaya.surface.Surface.prototype.processParams = function(c) {
    if (c = this.params[c]) void 0 !== c.color && (this.solidColor = c.color), void 0 !== c.alpha && (this.alpha = c.alpha), void 0 !== c.icon && (this.staticIcon = c.icon)
};
papaya.surface.Surface.prototype.finishedLoading = function() {
    this.readData()
};
papaya.surface.Surface.prototype.readData = function() {
    if (this.error) console.log(this.error), this.onFinishedRead(this);
    else {
        var c = this.progressMeter,
            a = function(a) {
                c.drawProgress(a, "Loading surface...")
            };
        try {
            this.fileFormat.readData(this.rawData, a, papaya.utilities.ObjectUtils.bind(this, this.finishedReading), this.volume)
        } catch (d) {
            this.error = d, this.onFinishedRead(this)
        }
    }
};
papaya.surface.Surface.prototype.finishedReading = function() {
    var c = this.fileFormat.getNumSurfaces(),
        a = this,
        d;
    if (this.fileFormat.error) this.error = this.fileFormat.error;
    else
        for (d = 0; d < c; d += 1) 0 < d && (a.nextSurface = new papaya.surface.Surface, a = a.nextSurface), a.numPoints = this.fileFormat.getNumPoints(d), a.numTriangles = this.fileFormat.getNumTriangles(d), a.pointData = this.fileFormat.getPointData(d), a.normalsData = this.fileFormat.getNormalsData(d), a.triangleData = this.fileFormat.getTriangleData(d), a.colorsData =
            this.fileFormat.getColorsData(d), null === a.normalsData && this.generateNormals(), this.fileFormat.getSolidColor(d) && (a.solidColor = this.fileFormat.getSolidColor(d));
    this.progressMeter.drawProgress(1, "Loading surface...");
    this.onFinishedRead(this)
};
papaya.surface.Surface.prototype.generateNormals = function() {
    var c = [],
        a = [],
        d = [],
        b = [],
        e = [],
        g, h = this.pointData.length,
        f, l, k, p, r, u, z, y, x, D;
    this.normalsData = new Float32Array(h);
    f = 3 * this.numTriangles;
    for (g = 0; g < f; g += 3) y = 3 * this.triangleData[g], x = 3 * this.triangleData[g + 1], D = 3 * this.triangleData[g + 2], c.x = this.pointData[y], c.y = this.pointData[y + 1], c.z = this.pointData[y + 2], a.x = this.pointData[x], a.y = this.pointData[x + 1], a.z = this.pointData[x + 2], d.x = this.pointData[D], d.y = this.pointData[D + 1], d.z = this.pointData[D + 2], l =
        a.x - c.x, k = a.y - c.y, p = a.z - c.z, r = d.x - c.x, u = d.y - c.y, z = d.z - c.z, b[0] = u * p - z * k, b[1] = z * l - r * p, b[2] = r * k - u * l, this.normalsData[y] += b[0], this.normalsData[y + 1] += b[1], this.normalsData[y + 2] += b[2], this.normalsData[x] += b[0], this.normalsData[x + 1] += b[1], this.normalsData[x + 2] += b[2], this.normalsData[D] += b[0], this.normalsData[D + 1] += b[1], this.normalsData[D + 2] += b[2];
    for (g = 0; g < h; g += 3) b[0] = -1 * this.normalsData[g], b[1] = -1 * this.normalsData[g + 1], b[2] = -1 * this.normalsData[g + 2], vec3.normalize(b, e), this.normalsData[g] = e[0], this.normalsData[g +
        1] = e[1], this.normalsData[g + 2] = e[2]
};
"use strict";
papaya = papaya || {};
papaya.surface = papaya.surface || {};
papaya.surface.SurfaceGIFTI = papaya.surface.SurfaceGIFTI || function() {
    this.onFinishedRead = this.colorsData = this.normalsData = this.triangleData = this.pointData = this.error = this.gii = null
};
papaya.surface.SurfaceGIFTI.prototype.isSurfaceDataBinary = function() {
    return !1
};
papaya.surface.SurfaceGIFTI.prototype.readData = function(c, a, d) {
    var b = this;
    a(0);
    this.onFinishedRead = d;
    this.gii = gifti.parse(c);
    setTimeout(function() {
        b.readDataPoints(b, a)
    }, 0)
};
papaya.surface.SurfaceGIFTI.prototype.readDataPoints = function(c, a) {
    a(.2);
    null != c.gii.getPointsDataArray() ? c.pointData = c.gii.getPointsDataArray().getData() : c.error = Error("Surface is missing point information!");
    if ("ColumnMajorOrder" === c.gii.getPointsDataArray().attributes.ArrayIndexingOrder)
        for (var d = c.pointData.slice(), b = d.length / 3, e = 0, g = 0; g < b; g++)
            for (var h = 0; 3 > h; h++) c.pointData[e] = d[h * b + g], e++;
    setTimeout(function() {
        c.readDataNormals(c, a)
    }, 0)
};
papaya.surface.SurfaceGIFTI.prototype.readDataNormals = function(c, a) {
    a(.4);
    null != c.gii.getNormalsDataArray() && (c.normalsData = c.gii.getNormalsDataArray().getData());
    setTimeout(function() {
        c.readDataTriangles(c, a)
    }, 0)
};
papaya.surface.SurfaceGIFTI.prototype.readDataTriangles = function(c, a) {
    a(.6);
    null != c.gii.getTrianglesDataArray() ? c.triangleData = c.gii.getTrianglesDataArray().getData() : c.error = Error("Surface is missing triangle information!");
    if ("ColumnMajorOrder" === c.gii.getTrianglesDataArray().attributes.ArrayIndexingOrder)
        for (var d = c.triangleData.slice(), b = d.length / 3, e = 0, g = 0; g < b; g++)
            for (var h = 0; 3 > h; h++) c.triangleData[e] = d[h * b + g], e++;
    setTimeout(function() {
        c.readDataColors(c, a)
    }, 0)
};
papaya.surface.SurfaceGIFTI.prototype.readDataColors = function(c, a) {
    a(.8);
    null != c.gii.getColorsDataArray() && (c.colorsData = c.gii.getColorsDataArray().getData());
    setTimeout(function() {
        c.onFinishedRead()
    }, 0)
};
papaya.surface.SurfaceGIFTI.prototype.getNumSurfaces = function() {
    return 1
};
papaya.surface.SurfaceGIFTI.prototype.getNumPoints = function() {
    return this.gii.getNumPoints()
};
papaya.surface.SurfaceGIFTI.prototype.getNumTriangles = function() {
    return this.gii.getNumTriangles()
};
papaya.surface.SurfaceGIFTI.prototype.getPointData = function() {
    return this.pointData
};
papaya.surface.SurfaceGIFTI.prototype.getNormalsData = function() {
    return this.normalsData
};
papaya.surface.SurfaceGIFTI.prototype.getTriangleData = function() {
    return this.triangleData
};
papaya.surface.SurfaceGIFTI.prototype.getColorsData = function() {
    return this.colorsData
};
papaya.surface.SurfaceGIFTI.prototype.getSolidColor = function() {
    return this.solidColor
};
"use strict";
papaya = papaya || {};
papaya.surface = papaya.surface || {};
papaya.surface.SurfaceMango = papaya.surface.SurfaceMango || function() {
    this.onFinishedRead = this.error = null;
    this.origin = [];
    this.imageDims = [];
    this.voxelDims = [];
    this.center = [];
    this.diffs = [];
    this.dv = null;
    this.numSurfaces = this.dataLength = this.surfaceIndex = this.index = 0;
    this.littleEndian = !1;
    this.surfaces = [];
    this.v15 = this.v14 = !1
};
papaya.surface.SurfaceMangoData = papaya.surface.SurfaceMangoData || function() {
    this.colorsData = this.normalsData = this.triangleData = this.pointData = null;
    this.solidColor = []
};
papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5 = "mangol15".split("");
papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_5 = "mangob15".split("");
papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_4 = "mangol14".split("");
papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_4 = "mangob14".split("");
papaya.surface.SurfaceMango.SURFACE_OVERLAY_MAGIC_NUMBER = [0, 0, 0, 0, "s", "c", "a", "l"];
papaya.surface.SurfaceMango.NAME_SIZE = 64;
papaya.surface.SurfaceMango.isThisFormat = function(c) {
    return c.endsWith(".surf")
};
papaya.surface.SurfaceMango.prototype.isSurfaceDataBinary = function() {
    return !0
};
papaya.surface.SurfaceMango.prototype.isLittleEndian15 = function(c) {
    c = new Uint8Array(c);
    var a;
    for (a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5.length; a += 1)
        if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5[a].charCodeAt(0)) return !1;
    return !0
};
papaya.surface.SurfaceMango.prototype.isLittleEndian14 = function(c) {
    c = new Uint8Array(c);
    var a;
    for (a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_4.length; a += 1)
        if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_4[a].charCodeAt(0)) return !1;
    return !0
};
papaya.surface.SurfaceMango.prototype.isVersion15 = function(c) {
    c = new Uint8Array(c);
    var a, d = !0;
    for (a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5.length; a += 1)
        if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5[a].charCodeAt(0)) {
            d = !1;
            break
        } if (!d)
        for (d = !0, a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_5.length; a += 1)
            if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_5[a].charCodeAt(0)) {
                d = !1;
                break
            } return d
};
papaya.surface.SurfaceMango.prototype.isVersion14 = function(c) {
    c = new Uint8Array(c);
    var a, d = !0;
    for (a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_4.length; a += 1)
        if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_4[a].charCodeAt(0)) {
            d = !1;
            break
        } if (!d)
        for (d = !0, a = 0; a < papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_4.length; a += 1)
            if (c[a] !== papaya.surface.SurfaceMango.MAGIC_NUMBER_BIG_1_4[a].charCodeAt(0)) {
                d = !1;
                break
            } return d
};
papaya.surface.SurfaceMango.prototype.isLittleEndian = function(c) {
    return this.isLittleEndian15(c) || this.isLittleEndian14(c)
};
papaya.surface.SurfaceMango.prototype.hasOverlay = function() {
    var c, a;
    for (c = 0; c < papaya.surface.SurfaceMango.SURFACE_OVERLAY_MAGIC_NUMBER.length; c += 1)
        if ((a = papaya.surface.SurfaceMango.SURFACE_OVERLAY_MAGIC_NUMBER[c]) && (a = papaya.surface.SurfaceMango.SURFACE_OVERLAY_MAGIC_NUMBER[c].charCodeAt(0)), this.dv.getUint8(this.index + c) !== a) return !1;
    return !0
};
papaya.surface.SurfaceMango.prototype.getString = function(c) {
    var a, d = [];
    for (a = 0; a < c; a += 1) d[a] = this.dv.getUint8(this.index + a);
    return String.fromCharCode.apply(null, d)
};
papaya.surface.SurfaceMango.prototype.readData = function(c, a, d) {
    a(.2);
    this.littleEndian = this.isLittleEndian(c);
    this.dataLength = c.byteLength;
    this.v14 = this.isVersion14(c);
    this.v15 = this.isVersion15(c);
    this.index = papaya.surface.SurfaceMango.MAGIC_NUMBER_LITTLE_1_5.length;
    this.dv = new DataView(c);
    if (!this.v14 && !this.v15) throw Error("Only Mango surface format version 1.4 and 1.5 are supported!");
    this.onFinishedRead = d;
    c = this.dv.getUint32(this.index, this.littleEndian);
    this.index += 4;
    this.numSurfaces = this.dv.getUint32(this.index,
        this.littleEndian);
    this.index += 4;
    this.index += 128;
    this.imageDims[0] = this.dv.getUint32(this.index, this.littleEndian);
    this.index += 4;
    this.imageDims[1] = this.dv.getUint32(this.index, this.littleEndian);
    this.index += 4;
    this.imageDims[2] = this.dv.getUint32(this.index, this.littleEndian);
    this.index += 4;
    this.voxelDims[0] = this.dv.getFloat32(this.index, this.littleEndian);
    this.index += 4;
    this.voxelDims[1] = this.dv.getFloat32(this.index, this.littleEndian);
    this.index += 4;
    this.voxelDims[2] = this.dv.getFloat32(this.index, this.littleEndian);
    this.index += 4;
    this.origin[0] = this.dv.getFloat32(this.index, this.littleEndian) * this.voxelDims[0];
    this.index += 4;
    this.origin[1] = this.dv.getFloat32(this.index, this.littleEndian) * this.voxelDims[1];
    this.index += 4;
    this.origin[2] = this.dv.getFloat32(this.index, this.littleEndian) * this.voxelDims[2];
    this.index += 4;
    this.center[0] = this.imageDims[0] * this.voxelDims[0] / 2;
    this.center[1] = this.imageDims[1] * this.voxelDims[1] / 2;
    this.center[2] = this.imageDims[2] * this.voxelDims[2] / 2;
    this.v14 ? (this.diffs[0] = this.center[0] - this.origin[0],
        this.diffs[1] = this.center[1] - this.origin[1], this.diffs[2] = this.origin[2] - this.center[2]) : (this.diffs[0] = this.center[0] - this.origin[0], this.diffs[1] = this.center[1] - this.origin[1], this.diffs[2] = this.center[2] - this.origin[2]);
    this.index += 4;
    this.index += c;
    this.readNextSurface(this, a)
};
papaya.surface.SurfaceMango.prototype.readNextSurface = function(c, a) {
    var d = new papaya.surface.SurfaceMangoData;
    c.index += papaya.surface.SurfaceMango.NAME_SIZE;
    c.surfaces[c.surfaceIndex] = d;
    c.surfaces[c.surfaceIndex].solidColor[0] = c.dv.getFloat32(c.index, c.littleEndian);
    c.index += 4;
    c.surfaces[c.surfaceIndex].solidColor[1] = c.dv.getFloat32(c.index, c.littleEndian);
    c.index += 4;
    c.surfaces[c.surfaceIndex].solidColor[2] = c.dv.getFloat32(c.index, c.littleEndian);
    c.index += 4;
    setTimeout(function() {
        c.readDataPoints(c,
            a)
    }, 0)
};
papaya.surface.SurfaceMango.prototype.readDataPoints = function(c, a) {
    var d, b;
    a(.4);
    c.index += 4;
    d = c.dv.getInt32(c.index, c.littleEndian);
    c.index += 4;
    c.surfaces[c.surfaceIndex].pointData = new Float32Array(d);
    if (c.v14)
        for (b = 0; b < d; b += 1, c.index += 4) c.surfaces[c.surfaceIndex].pointData[b] = (2 !== b % 3 ? -1 : 1) * (c.dv.getFloat32(c.index, c.littleEndian) + c.diffs[b % 3]);
    else
        for (b = 0; b < d; b += 1, c.index += 4) c.surfaces[c.surfaceIndex].pointData[b] = (0 !== b % 3 ? -1 : 1) * (c.dv.getFloat32(c.index, c.littleEndian) + c.diffs[b % 3]);
    setTimeout(function() {
            c.readDataNormals(c, a)
        },
        0)
};
papaya.surface.SurfaceMango.prototype.readDataNormals = function(c, a) {
    var d, b;
    a(.6);
    c.index += 4;
    d = c.dv.getInt32(c.index, c.littleEndian);
    c.index += 4;
    c.surfaces[c.surfaceIndex].normalsData = new Float32Array(d);
    if (c.v14)
        for (b = 0; b < d; b += 1, c.index += 4) c.surfaces[c.surfaceIndex].normalsData[b] = (2 !== b % 3 ? -1 : 1) * c.dv.getFloat32(c.index, c.littleEndian);
    else
        for (b = 0; b < d; b += 1, c.index += 4) c.surfaces[c.surfaceIndex].normalsData[b] = (0 !== b % 3 ? -1 : 1) * c.dv.getFloat32(c.index, c.littleEndian);
    setTimeout(function() {
            c.readDataTriangles(c, a)
        },
        0)
};
papaya.surface.SurfaceMango.prototype.readDataTriangles = function(c, a) {
    var d, b;
    a(.8);
    c.index += 4;
    d = c.dv.getInt32(c.index, c.littleEndian);
    c.index += 4;
    c.surfaces[c.surfaceIndex].triangleData = new Uint32Array(d);
    for (b = 0; b < d; b += 1, c.index += 4) c.surfaces[c.surfaceIndex].triangleData[b] = c.dv.getUint32(c.index, c.littleEndian);
    setTimeout(function() {
        c.readDataColors(c, a)
    }, 0)
};
papaya.surface.SurfaceMango.prototype.readDataColors = function(c, a) {
    for (var d, b, e, g, h, f, l, k; c.index < c.dataLength;)
        if (c.hasOverlay()) {
            c.index += papaya.surface.SurfaceMango.SURFACE_OVERLAY_MAGIC_NUMBER.length;
            c.index += papaya.surface.SurfaceMango.NAME_SIZE;
            l = c.getString(papaya.surface.SurfaceMango.NAME_SIZE);
            c.index += papaya.surface.SurfaceMango.NAME_SIZE;
            l = l.replace(/\0/g, "");
            c.index += 4;
            d = c.dv.getFloat32(this.index, this.littleEndian);
            c.index += 4;
            b = c.dv.getFloat32(this.index, this.littleEndian);
            c.index +=
                4;
            e = 255 / (b - d);
            c.index += 4;
            c.index += 4;
            g = c.dv.getUint32(this.index, this.littleEndian);
            c.index += 4;
            h = new Float32Array(g);
            for (k = 0; k < g; k += 1, c.index += 4) h[k] = c.dv.getFloat32(c.index, c.littleEndian);
            l = papaya.viewer.ColorTable.findLUT(l) !== papaya.viewer.ColorTable.TABLE_GRAYSCALE ? new papaya.viewer.ColorTable(l, !1) : new papaya.viewer.ColorTable("Spectrum", !1);
            l.updateLUT(0, 255);
            g = c.surfaces[c.surfaceIndex].pointData.length / 3;
            null === c.surfaces[c.surfaceIndex].colorsData && (c.surfaces[c.surfaceIndex].colorsData =
                new Float32Array(4 * g));
            for (k = 0; k < g; k += 1) f = h[k], f <= d ? 0 === c.surfaces[c.surfaceIndex].colorsData[4 * k + 3] && (c.surfaces[c.surfaceIndex].colorsData[4 * k] = c.surfaces[c.surfaceIndex].solidColor[0], c.surfaces[c.surfaceIndex].colorsData[4 * k + 1] = c.surfaces[c.surfaceIndex].solidColor[1], c.surfaces[c.surfaceIndex].colorsData[4 * k + 2] = c.surfaces[c.surfaceIndex].solidColor[2], c.surfaces[c.surfaceIndex].colorsData[4 * k + 3] = 1) : (f > b ? (c.surfaces[c.surfaceIndex].colorsData[4 * k] = l.lookupRed(255) / 255, c.surfaces[c.surfaceIndex].colorsData[4 *
                k + 1] = l.lookupGreen(255) / 255, c.surfaces[c.surfaceIndex].colorsData[4 * k + 2] = l.lookupBlue(255) / 255) : (f = Math.floor((f - d) * e + .5), c.surfaces[c.surfaceIndex].colorsData[4 * k] = l.lookupRed(f) / 255, c.surfaces[c.surfaceIndex].colorsData[4 * k + 1] = l.lookupGreen(f) / 255, c.surfaces[c.surfaceIndex].colorsData[4 * k + 2] = l.lookupBlue(f) / 255), c.surfaces[c.surfaceIndex].colorsData[4 * k + 3] = 1)
        } else break;
    c.surfaceIndex++;
    c.surfaceIndex === c.numSurfaces ? setTimeout(function() {
        c.onFinishedRead()
    }, 0) : setTimeout(function() {
        c.readNextSurface(c,
            a)
    }, 0)
};
papaya.surface.SurfaceMango.prototype.getNumSurfaces = function() {
    return this.numSurfaces
};
papaya.surface.SurfaceMango.prototype.getNumPoints = function(c) {
    return this.surfaces[c].pointData.length / 3
};
papaya.surface.SurfaceMango.prototype.getNumTriangles = function(c) {
    return this.surfaces[c].triangleData.length / 3
};
papaya.surface.SurfaceMango.prototype.getSolidColor = function(c) {
    return this.surfaces[c].solidColor
};
papaya.surface.SurfaceMango.prototype.getPointData = function(c) {
    return this.surfaces[c].pointData
};
papaya.surface.SurfaceMango.prototype.getNormalsData = function(c) {
    return this.surfaces[c].normalsData
};
papaya.surface.SurfaceMango.prototype.getTriangleData = function(c) {
    return this.surfaces[c].triangleData
};
papaya.surface.SurfaceMango.prototype.getColorsData = function(c) {
    return this.surfaces[c].colorsData
};
"use strict";
papaya = papaya || {};
papaya.surface = papaya.surface || {};
papaya.surface.SurfaceVTK = papaya.surface.SurfaceVTK || function() {
    this.dv = this.onFinishedRead = this.error = null;
    this.index = 0;
    this.littleEndian = !0;
    this.numPoints = 0;
    this.description = this.vtkVersion = this.colorsData = this.normalsData = this.triangleData = this.pointData = null;
    this.ascii = !1;
    this.volume = null;
    this.headerRead = this.done = !1
};
papaya.surface.SurfaceVTK.MAGIC_NUMBER = "# vtk DataFile Version";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_ASCII = "ASCII";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_DATASET = "DATASET";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_POLYDATA = "POLYDATA";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_POINTS = "POINTS";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_POLYGONS = "POLYGONS";
papaya.surface.SurfaceVTK.MAGIC_NUMBER_NORMALS = "NORMALS";
papaya.surface.SurfaceVTK.isThisFormat = function(c) {
    return c.endsWith(".vtk")
};
papaya.surface.SurfaceVTK.prototype.isSurfaceDataBinary = function() {
    return !0
};
papaya.surface.SurfaceVTK.prototype.hasOverlay = function() {
    return !1
};
papaya.surface.SurfaceVTK.prototype.getNextLine = function(c) {
    var a, d, b = [];
    c || (c = 256);
    for (a = 0; a < c; a += 1) {
        if (this.index >= this.dv.byteLength) {
            this.done = !0;
            break
        }
        d = this.dv.getUint8(this.index++);
        if (32 > d) {
            (!this.headerRead || this.ascii) && this.index < this.dv.byteLength && 32 > this.dv.getUint8(this.index) && this.index++;
            break
        }
        b[a] = d
    }
    return String.fromCharCode.apply(null, b)
};
papaya.surface.SurfaceVTK.prototype.readData = function(c, a, d, b) {
    var e = this,
        g;
    a(.2);
    this.onFinishedRead = d;
    this.dv = new DataView(c);
    this.volume = b;
    this.vtkVersion = this.getNextLine().substring(papaya.surface.SurfaceVTK.MAGIC_NUMBER.length).trim();
    this.description = this.getNextLine().trim();
    this.ascii = this.getNextLine() == papaya.surface.SurfaceVTK.MAGIC_NUMBER_ASCII;
    this.datasetType = this.getNextLine().substring(papaya.surface.SurfaceVTK.MAGIC_NUMBER_DATASET.length).trim();
    this.headerRead = !0;
    this.datasetType !=
        papaya.surface.SurfaceVTK.MAGIC_NUMBER_POLYDATA && (this.error = Error("VTK: Only POLYDATA format is currently supported!"), this.onFinishedRead());
    g = this.getNextLine().split(" ");
    g[0] == papaya.surface.SurfaceVTK.MAGIC_NUMBER_POINTS && setTimeout(function() {
        e.readDataPoints(e, g[1], a)
    }, 0)
};
papaya.surface.SurfaceVTK.prototype.readNextData = function(c, a) {
    var d, b = .2;
    c.pointData && (b += .2);
    c.normalsData && (b += .2);
    c.triangleData && (b += .2);
    a(b);
    if (c.done || c.pointData && c.normalsData && c.triangleData) c.onFinishedRead();
    else(d = this.getNextLine().split(" ")) && d[0] == papaya.surface.SurfaceVTK.MAGIC_NUMBER_POINTS ? setTimeout(function() {
            c.readDataPoints(c, d[1], a)
        }, 0) : d && d[0] == papaya.surface.SurfaceVTK.MAGIC_NUMBER_POLYGONS ? setTimeout(function() {
            c.readDataTriangles(c, d[1], a)
        }, 0) : d && d[0] == papaya.surface.SurfaceVTK.MAGIC_NUMBER_NORMALS ?
        setTimeout(function() {
            c.readDataNormals(c, a)
        }, 0) : setTimeout(function() {
            c.readNextData(c, a)
        }, 0)
};
papaya.surface.SurfaceVTK.prototype.readDataPoints = function(c, a, d) {
    var b, e = 0,
        g = [],
        h, f = 0,
        l = 3 * a;
    c.numPoints = a;
    c.pointData = new Float32Array(l);
    var k = c.volume.header.orientation.orientation;
    b = c.volume.header.voxelDimensions;
    h = c.volume.header.origin;
    a = ("-" === k.charAt(3) ? 1 : -1) * (b.flip ? -1 : 1);
    var p = "-" !== k.charAt(4) ? 1 : -1,
        r = "-" !== k.charAt(5) ? 1 : -1,
        u = k.indexOf("X"),
        z = k.indexOf("Y"),
        k = k.indexOf("Z"),
        y = a * h.x * b.xSize,
        x = p * h.y * b.ySize,
        D = r * h.z * b.zSize;
    if (c.ascii)
        for (; f < l;)
            for (h = c.getNextLine().trim().split(" "), b =
                0; b < h.length; b += 1) g[e] = parseFloat(h[b]), 2 === e && (c.pointData[f++] = g[u] * a - y, c.pointData[f++] = g[z] * p - x, c.pointData[f++] = g[k] * r - D), e++, e %= 3;
    else
        for (b = 0; b < l; b += 1, c.index += 4) g[e] = c.dv.getFloat32(c.index, !1), 2 === e && (c.pointData[f++] = g[u] * a - y, c.pointData[f++] = g[z] * p - x, c.pointData[f++] = g[k] * r - D), e++, e %= 3;
    c.readNextData(c, d)
};
papaya.surface.SurfaceVTK.prototype.readDataNormals = function(c, a) {
    var d, b, e = 0,
        g = 3 * c.numPoints;
    c.normalsData = new Float32Array(g);
    if (c.ascii)
        for (; e < g;)
            for (b = c.getNextLine().trim().split(" "), d = 0; d < b.length; d += 1) c.normalsData[e++] = parseFloat(b[d]);
    else
        for (d = 0; d < g; d += 1, c.index += 4) c.normalsData[d] = c.dv.getFloat32(c.index, !1);
    c.readNextData(c, a)
};
papaya.surface.SurfaceVTK.prototype.readDataTriangles = function(c, a, d) {
    var b, e = 0,
        g = 3 * a;
    c.triangleData = new Uint32Array(g);
    if (c.ascii)
        for (; e < g;)
            for (a = c.getNextLine().trim().split(" "), b = 1; b < a.length; b += 1) c.triangleData[e++] = parseInt(a[b], 10);
    else
        for (b = 0; b < a; b += 1, c.index += 16) c.triangleData[3 * b] = c.dv.getUint32(c.index + 4, !1), c.triangleData[3 * b + 1] = c.dv.getUint32(c.index + 8, !1), c.triangleData[3 * b + 2] = c.dv.getUint32(c.index + 12, !1);
    c.readNextData(c, d)
};
papaya.surface.SurfaceVTK.prototype.getColorsData = function() {
    return null
};
papaya.surface.SurfaceVTK.prototype.getNumSurfaces = function() {
    return 1
};
papaya.surface.SurfaceVTK.prototype.getNumPoints = function() {
    return this.pointData.length / 3
};
papaya.surface.SurfaceVTK.prototype.getNumTriangles = function() {
    return this.triangleData.length / 3
};
papaya.surface.SurfaceVTK.prototype.getSolidColor = function() {
    return this.solidColor
};
papaya.surface.SurfaceVTK.prototype.getPointData = function() {
    return this.pointData
};
papaya.surface.SurfaceVTK.prototype.getNormalsData = function() {
    return this.normalsData
};
papaya.surface.SurfaceVTK.prototype.getTriangleData = function() {
    return this.triangleData
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.Dialog = papaya.ui.Dialog || function(c, a, d, b, e, g, h, f) {
    this.container = c;
    this.viewer = c.viewer;
    this.title = a;
    this.modifier = "";
    papaya.utilities.StringUtils.isStringBlank(h) || (this.modifier = h);
    this.id = this.title.replace(/ /g, "_");
    this.content = d;
    this.dataSource = b;
    this.callback = e;
    this.callbackOk = g;
    this.doWrap = f;
    this.scrollBehavior2 = this.scrollBehavior1 = null
};
papaya.ui.Dialog.showModalDialog = function(c, a, d) {
    var b, e, g;
    c = document.documentElement;
    var h = window.pageYOffset || c.scrollTop;
    b = $(window).outerWidth();
    c = $(window).outerHeight();
    e = $(d).outerWidth();
    g = $(d).outerHeight();
    b = b / 2 - e / 2 + "px";
    c = h + c / 2 - g / 2 + "px";
    $(d).css({
        position: "absolute",
        zIndex: 100,
        left: b,
        top: c
    });
    a.removeScroll();
    $(d).hide().fadeIn(200)
};
papaya.ui.Dialog.prototype.showDialog = function() {
    var c, a, d, b, e;
    b = "#" + this.id;
    c = $(b);
    c.remove();
    e = $("body");
    d = "<div id='" + this.id + "' class='" + PAPAYA_DIALOG_CSS + "'><span class='" + PAPAYA_DIALOG_TITLE_CSS + "'>" + this.title + "</span>";
    if (this.content) {
        d += "<div class='" + PAPAYA_DIALOG_CONTENT_CSS + "'><table>";
        for (c = 0; c < this.content.items.length; c += 1)
            if (this.content.items[c].spacer) d += "<tr><td class='" + PAPAYA_DIALOG_CONTENT_LABEL_CSS + "'>&nbsp;</td><td class='" + PAPAYA_DIALOG_CONTENT_CONTROL_CSS + "'>&nbsp;</td></tr>";
            else if (this.content.items[c].readonly) d += "<tr><td class='" + PAPAYA_DIALOG_CONTENT_LABEL_CSS + "'>" + this.content.items[c].label + "</td><td class='" + PAPAYA_DIALOG_CONTENT_CONTROL_CSS + "' id='" + this.content.items[c].field + "'></td></tr>";
        else {
            a = this.content.items[c].disabled && !0 === papaya.utilities.ObjectUtils.bind(this.container, papaya.utilities.ObjectUtils.dereferenceIn(this, this.content.items[c].disabled))() ? "disabled='disabled'" : "";
            d += "<tr><td class='" + PAPAYA_DIALOG_CONTENT_LABEL_CSS + "'>" + this.content.items[c].label +
                "</td><td class='" + PAPAYA_DIALOG_CONTENT_CONTROL_CSS + "'><select " + a + " id='" + this.content.items[c].field + "'>";
            for (a = 0; a < this.content.items[c].options.length; a += 1) d += "<option value='" + this.content.items[c].options[a] + "'>" + papaya.utilities.StringUtils.truncateMiddleString(this.content.items[c].options[a].toString(), 40) + "</option>";
            d += "</select></td></tr>";
            this.content.items[c].help && (d += "<tr><td colspan='2' class='" + PAPAYA_DIALOG_CONTENT_HELP + "'>" + this.content.items[c].help + "</td></tr>")
        }
        d += "</table></div>"
    }
    d +=
        "<div class='" + PAPAYA_DIALOG_BUTTON_CSS + "'><button type='button' id='" + this.id + "-Ok'>Ok</button></div></div>";
    e.append('<div class="' + PAPAYA_DIALOG_BACKGROUND + '"></div>');
    e.append(d);
    for (c = 0; c < this.content.items.length; c += 1) this.content.items[c].readonly ? (d = this.dataSource[this.content.items[c].field](this.modifier), null !== d ? $("#" + this.content.items[c].field).html(d) : $("#" + this.content.items[c].field).parent().remove()) : this.content.items[c].spacer || (d = $("#" + this.content.items[c].field), d.val(this.dataSource[this.content.items[c].field]),
        d.change(papaya.utilities.ObjectUtils.bind(this, this.doAction, [this.content.items[c].field])));
    this.doWrap || $("." + PAPAYA_DIALOG_CONTENT_CSS).addClass(PAPAYA_DIALOG_CONTENT_NOWRAP_CSS);
    $("#" + this.id + "-Ok").click(papaya.utilities.ObjectUtils.bind(this, this.doOk));
    c = $(b);
    e.addClass(PAPAYA_DIALOG_STOPSCROLL);
    papaya.ui.Dialog.showModalDialog(this, this.viewer, c[0])
};
papaya.ui.Dialog.prototype.doOk = function() {
    var c, a;
    c = $("." + PAPAYA_DIALOG_CSS);
    a = $("." + PAPAYA_DIALOG_BACKGROUND);
    c.hide(100);
    a.hide(100);
    c.remove();
    a.remove();
    window.onmousewheel = this.scrollBehavior1;
    document.onmousewheel = this.scrollBehavior2;
    this.callbackOk && this.callbackOk();
    $("body").removeClass(PAPAYA_DIALOG_STOPSCROLL);
    this.container.viewer.addScroll()
};
papaya.ui.Dialog.prototype.doAction = function(c) {
    this.callback(c, $("#" + c).val())
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.Menu = papaya.ui.Menu || function(c, a, d, b, e) {
    this.viewer = c;
    this.method = a.method;
    this.isTitleBar = a.titleBar;
    this.label = a.label;
    this.icons = a.icons;
    this.callback = d;
    this.dataSource = b;
    this.items = [];
    this.rangeItem = null;
    this.menuOnHover = a.menuOnHover;
    this.contextMenu = !1;
    void 0 === e || null === e ? (this.imageIndex = -1, this.modifier = this.viewer.container.containerIndex) : (this.imageIndex = e, this.modifier = e + this.viewer.container.containerIndex);
    this.buttonId = this.label.replace(/ /g, "_").replace("...", "_") + (this.modifier ||
        "");
    this.menuId = (this.label + "Menu").replace(/ /g, "_").replace("...", "_") + (this.modifier || "");
    this.isRight = null !== a.icons;
    this.isImageButton = a.imageButton;
    this.isSurfaceButton = a.surfaceButton;
    this.htmlParent = this.viewer.container.showControlBar && this.viewer.container.kioskMode && this.viewer.container.showImageButtons ? this.viewer.container.sliderControlHtml : this.viewer.container.toolbarHtml
};
papaya.ui.Menu.doShowMenu = function(c, a, d, b) {
    var e, g, h, f, l = $(a).parent().offset();
    $(c.canvas).offset();
    $(c.container.display.canvas).outerHeight();
    e = $(a).offset();
    g = $(a).outerWidth();
    h = $(d).outerWidth();
    f = $(d).outerHeight();
    e = e.left - l.left + (b ? -1 * h + g : 0) + "px";
    c = c.container.showControlBar && c.container.kioskMode && c.container.showImageButtons ? -1 * PAPAYA_SPACING - f + "px" : $(a).outerHeight() + (b ? 0 : PAPAYA_SPACING) + "px";
    $(d).css({
        position: "absolute",
        zIndex: 100,
        left: e,
        top: c
    });
    $(d).hide().fadeIn(200)
};
papaya.ui.Menu.getColorComponents = function(c) {
    return c ? c.match(/\d+/g) : [0, 0, 0, 255]
};
papaya.ui.Menu.getNiceForegroundColor = function(c) {
    c = papaya.ui.Menu.getColorComponents(c);
    127 < (parseInt(c[0]) + parseInt(c[1]) + parseInt(c[2])) / 3 ? c[0] = c[1] = c[2] = 0 : c[0] = c[1] = c[2] = 255;
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")"
};
papaya.ui.Menu.prototype.buildMenuButton = function() {
    var c, a, d;
    d = "#" + this.buttonId;
    c = $(d);
    c.remove();
    c = null;
    this.icons ? (c = "<span id='" + this.buttonId + "' class='" + PAPAYA_MENU_UNSELECTABLE + " " + PAPAYA_MENU_ICON_CSS + " " + (this.isImageButton ? PAPAYA_MENU_BUTTON_CSS : "") + "'" + (this.isRight ? " style='float:right'" : "") + "><img class='" + PAPAYA_MENU_UNSELECTABLE + "' style='width:" + papaya.viewer.ColorTable.ICON_SIZE + "px; height:" + papaya.viewer.ColorTable.ICON_SIZE + "px; vertical-align:bottom; ", c = !this.isSurfaceButton &&
            this.dataSource.isSelected(parseInt(this.imageIndex, 10)) ? c + "border:2px solid #FF5A3D;background-color:#eeeeee;padding:1px;" : c + "border:2px outset lightgray;background-color:#eeeeee;padding:1px;", c = this.method ? c + ("' src='" + this.icons[papaya.utilities.ObjectUtils.bind(this.viewer, papaya.utilities.ObjectUtils.dereferenceIn(this.viewer, this.method))() ? 1 : 0] + "' /></span>") : c + ("' src='" + this.icons[0] + "' /></span>")) : c = this.isTitleBar ? "<div class='" + PAPAYA_MENU_UNSELECTABLE + " " + PAPAYA_MENU_TITLEBAR_CSS + " " +
        PAPAYA_TITLEBAR_CSS + "' style='z-index:-1;position:absolute;top:0px;width:" + this.htmlParent.width() + "px;text-align:center;color:" + papaya.ui.Menu.getNiceForegroundColor(this.viewer.bgColor) + "'>" + this.label + "</div>" : "<span id='" + this.buttonId + "' class='" + PAPAYA_MENU_UNSELECTABLE + " " + PAPAYA_MENU_LABEL_CSS + "'>" + this.label + "</span>";
    this.htmlParent.append(c);
    this.isTitleBar || (c = $(d), d = "#" + this.buttonId + " > img", d = $(d), a = this, this.menuOnHover && (d.mouseenter(function() {
        a.showHoverMenuTimeout = setTimeout(papaya.utilities.ObjectUtils.bind(a,
            a.showMenu), 500)
    }), d.mouseleave(function() {
        clearTimeout(a.showHoverMenuTimeout);
        a.showHoverMenuTimeout = null
    })), c.click(papaya.utilities.ObjectUtils.bind(this, this.doClick)), this.icons ? (d.hover(function() {
        1 < a.icons.length ? $(this).css({
            "border-color": "gray"
        }) : $(this).css({
            "border-color": "#FF5A3D"
        })
    }, papaya.utilities.ObjectUtils.bind(a, function() {
        a.dataSource.isSelected(parseInt(a.imageIndex, 10)) && a.dataSource.isSelectable() ? $("#" + a.buttonId + " > img").css({
            border: "2px solid #FF5A3D"
        }) : $("#" + a.buttonId +
            " > img").css({
            border: "2px outset lightgray"
        })
    })), d.mousedown(function() {
        $(this).css({
            border: "2px inset lightgray"
        })
    }), d.mouseup(function() {
        $(this).css({
            border: "2px outset lightgray"
        })
    })) : this.isTitleBar || c.hover(function() {
        $(this).toggleClass(PAPAYA_MENU_BUTTON_HOVERING_CSS)
    }));
    return this.buttonId
};
papaya.ui.Menu.prototype.setMenuButton = function(c) {
    this.buttonId = c
};
papaya.ui.Menu.prototype.buildMenu = function() {
    var c;
    this.htmlParent.append("<ul id='" + this.menuId + "' class='" + PAPAYA_MENU_CSS + "'></ul>");
    this.viewer.container.contextManager && papaya.utilities.PlatformUtils.smallScreen && ($("#" + this.menuId)[0].style.width = this.viewer.viewerDim - 10 + "px");
    for (c = 0; c < this.items.length; c += 1) this.items[c].hide || this.items[c].buildHTML(this.menuId)
};
papaya.ui.Menu.prototype.addMenuItem = function(c) {
    c instanceof papaya.ui.MenuItemRange && (this.rangeItem = c);
    this.items.push(c)
};
papaya.ui.Menu.prototype.showContextMenu = function() {
    var c, a, d, b = 0,
        e;
    0 < this.items.length && (d = "#" + this.menuId, a = $(d), c = a.is(":visible"), a.remove(), c || (this.htmlParent = this.viewer.container.viewerHtml, this.buildMenu(), a = $(d), a.hide(), c = a.outerHeight(), d = $(this.viewer.canvas).offset(), e = $(this.viewer.container.display.canvas).outerHeight(), this.viewer.contextMenuMousePositionY + c > d.top + e + $(this.viewer.canvas).outerHeight() + PAPAYA_SPACING && (b = this.viewer.contextMenuMousePositionY + c - (d.top + e + $(this.viewer.canvas).outerHeight() +
        PAPAYA_SPACING) - 1), this.viewer.container.contextManager && papaya.utilities.PlatformUtils.smallScreen ? a.css({
        position: "absolute",
        zIndex: 100,
        left: this.viewer.canvasRect.left,
        top: this.viewer.canvasRect.top - b
    }) : a.css({
        position: "absolute",
        zIndex: 100,
        left: this.viewer.contextMenuMousePositionX + this.viewer.canvasRect.left,
        top: this.viewer.contextMenuMousePositionY + this.viewer.canvasRect.top - b
    }), a.hide().fadeIn(200)))
};
papaya.ui.Menu.prototype.showMenu = function() {
    var c, a, d;
    this.viewer.container.toolbar.closeAllMenus();
    this.contextMenu ? this.showContextMenu() : 0 < this.items.length && (d = "#" + this.menuId, a = $(d), c = a.is(":visible"), a.remove(), c || (c = $("#" + this.buttonId), this.buildMenu(), a = $(d), a.hide(), papaya.ui.Menu.doShowMenu(this.viewer, c[0], a[0], this.isRight)))
};
papaya.ui.Menu.prototype.doClick = function() {
    var c;
    c = $("#" + this.menuId).is(":visible");
    this.callback(this.buttonId);
    this.icons && (this.method ? $("#" + this.buttonId + " > img").attr("src", this.icons[papaya.utilities.ObjectUtils.bind(this.viewer, papaya.utilities.ObjectUtils.dereferenceIn(this.viewer, this.method))() ? 1 : 0]) : $("#" + this.buttonId + " > img").attr("src", this.icons[0]));
    this.menuOnHover || c || this.showMenu()
};
papaya.ui.Menu.prototype.updateRangeItem = function(c, a) {
    this.rangeItem && ($("#" + this.rangeItem.minId).val(c), $("#" + this.rangeItem.maxId).val(a))
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItem = papaya.ui.MenuItem || function(c, a, d, b, e, g, h) {
    this.viewer = c;
    this.modifier = "";
    papaya.utilities.StringUtils.isStringBlank(h) || (this.modifier = "-" + h);
    this.dataSource = e;
    this.method = g;
    this.label = this.dataSource && this.method ? this.dataSource[this.method]() : a;
    this.action = d + this.modifier;
    this.id = this.action.replace(/ /g, "_") + this.viewer.container.containerIndex;
    this.callback = b;
    this.menu = null;
    this.isContext = !1
};
papaya.ui.MenuItem.prototype.buildHTML = function(c) {
    var a;
    a = this.dataSource && this.method ? this.dataSource[this.method]() : this.label;
    a = "<li id='" + this.id + "'><span class='" + PAPAYA_MENU_UNSELECTABLE + "'>" + a + "</span>" + (this.menu ? "<span style='float:right'>&nbsp;&#x25B6;</span>" : "") + "</li>";
    $("#" + c).append(a);
    c = $("#" + this.id);
    this.viewer.container.contextManager && papaya.utilities.PlatformUtils.smallScreen && (c[0].style.width = this.viewer.viewerDim - 10 + "px", c[0].style.fontSize = "18px");
    c.click(papaya.utilities.ObjectUtils.bind(this,
        function(a) {
            this.doAction(this.isContext && a.shiftKey)
        }));
    c.hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    })
};
papaya.ui.MenuItem.prototype.doAction = function(c) {
    c || this.menu || (this.viewer.showingContextMenu = !1);
    this.callback(this.action, null, c)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemCheckBox = papaya.ui.MenuItemCheckBox || function(c, a, d, b, e, g, h) {
    this.viewer = c;
    this.label = a;
    this.modifier = "";
    void 0 !== h && null !== h && (this.modifier = "-" + h);
    this.action = d + this.modifier;
    this.method = g;
    this.id = this.action.replace(/ /g, "_").replace(/\(/g, "").replace(/\)/g, "") + this.viewer.container.containerIndex;
    this.callback = b;
    this.dataSource = e
};
papaya.ui.MenuItemCheckBox.prototype.buildHTML = function(c) {
    var a, d;
    a = this.dataSource[this.method](this.label);
    d = "";
    a && (d = "checked='checked'");
    a = "<li id='" + this.id + "'><input type='checkbox' class='" + PAPAYA_MENU_COLORTABLE_CSS + "' name='" + PAPAYA_MENU_COLORTABLE_CSS + "' id='" + this.id + "' value='" + this.id + "' " + d + "><span class='" + PAPAYA_MENU_UNSELECTABLE + "'>&nbsp;" + this.label + "</span></li>";
    $("#" + c).append(a);
    c = $("#" + this.id);
    c.click(papaya.utilities.ObjectUtils.bind(this, this.doAction));
    c.hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    })
};
papaya.ui.MenuItemCheckBox.prototype.doAction = function() {
    $("." + PAPAYA_MENU_COLORTABLE_CSS).removeAttr("checked");
    $("#" + this.id + " > input")[0].checked = !0;
    this.callback(this.action, null, !0)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemRadioButton = papaya.ui.MenuItemRadioButton || function(c, a, d, b, e, g, h) {
    this.viewer = c;
    this.label = a;
    this.modifier = "";
    void 0 !== h && null !== h && (this.modifier = "-" + h);
    this.methodParam = this.action = d + this.modifier;
    this.method = g;
    this.id = this.action.replace(/ /g, "_").replace(/\(/g, "").replace(/\)/g, "") + this.viewer.container.containerIndex;
    this.callback = b;
    this.dataSource = e
};
papaya.ui.MenuItemRadioButton.prototype.buildHTML = function(c) {
    var a, d;
    a = this.dataSource[this.method](this.label);
    d = "";
    a && (d = "checked='checked'");
    a = "<li id='" + this.id + "'><input type='radio' class='" + PAPAYA_MENU_COLORTABLE_CSS + "' name='" + PAPAYA_MENU_COLORTABLE_CSS + "' id='" + this.id + "' value='" + this.id + "' " + d + "><span class='" + PAPAYA_MENU_UNSELECTABLE + "'>&nbsp;" + this.label + "</span></li>";
    $("#" + c).append(a);
    c = $("#" + this.id);
    c.click(papaya.utilities.ObjectUtils.bind(this, this.doAction));
    c.hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    })
};
papaya.ui.MenuItemRadioButton.prototype.doAction = function() {
    $("." + PAPAYA_MENU_COLORTABLE_CSS).removeAttr("checked");
    $("#" + this.id + " > input")[0].checked = !0;
    this.callback(this.action, null, !0)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemFileChooser = papaya.ui.MenuItemFileChooser || function(c, a, d, b, e, g) {
    this.viewer = c;
    this.label = a;
    this.modifier = "";
    void 0 !== g && null !== g && (this.modifier = "-" + g);
    this.action = d + this.modifier;
    this.id = this.action.replace(/ /g, "_") + this.viewer.container.containerIndex;
    this.fileChooserId = "fileChooser" + this.label.replace(/ /g, "_").replace(/\./g, "") + this.viewer.container.containerIndex + (e ? "folder" : "");
    this.callback = b;
    this.folder = e
};
papaya.ui.MenuItemFileChooser.prototype.buildHTML = function(c) {
    var a, d;
    a = this;
    d = "<li id='" + this.id + "'><span class='" + PAPAYA_MENU_UNSELECTABLE + "'><label class='" + PAPAYA_MENU_FILECHOOSER + "' for='" + this.fileChooserId + "'>" + this.label;
    d = this.folder ? d + ("</label><input type='file' id='" + this.fileChooserId + "' multiple='multiple' webkitdirectory directory name='files' /></span></li>") : d + ("</label><input type='file' id='" + this.fileChooserId + "' multiple='multiple' name='files' /></span></li>");
    $("#" + c).append(d);
    $("#" + this.fileChooserId)[0].onchange = papaya.utilities.ObjectUtils.bind(a, function() {
        a.callback(a.action, document.getElementById(a.fileChooserId).files)
    });
    $("#" + this.id).hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    })
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemRange = papaya.ui.MenuItemRange || function(c, a, d, b, e, g, h) {
    "ChangeRangeNeg" === d && (this.negatives = !0, h = c.getScreenVolumeIndex(c.screenVolumes[parseInt(h)].negativeScreenVol).toString());
    this.viewer = c;
    this.label = a;
    this.index = h;
    this.modifier = "";
    void 0 !== h && (this.modifier = "-" + h);
    this.action = d + this.modifier;
    this.minId = this.action.replace(/ /g, "_") + "Min" + this.viewer.container.containerIndex;
    this.maxId = this.action.replace(/ /g, "_") + "Max" + this.viewer.container.containerIndex;
    this.callback = b;
    this.dataSource = e;
    this.method = g;
    this.id = a + this.modifier + this.viewer.container.containerIndex;
    this.grabOffset = 0;
    this.screenVol = this.viewer.screenVolumes[this.index]
};
papaya.ui.MenuItemRange.getRelativeMousePositionFromParentX = function(c, a) {
    var d = c.parent().offset();
    return papaya.utilities.PlatformUtils.getMousePositionX(a) - d.left
};
papaya.ui.MenuItemRange.getRelativeMousePositionX = function(c, a) {
    var d = c.offset();
    return papaya.utilities.PlatformUtils.getMousePositionX(a) - d.left
};
papaya.ui.MenuItemRange.prototype.buildHTML = function(c) {
    var a, d, b, e, g, h, f, l, k, p;
    g = this.id + "SliderMin";
    f = this.id + "SliderMax";
    k = this.id + "Slider";
    a = this.dataSource[this.method]();
    d = this;
    a = "<li id='" + this.id + "'><span class='" + PAPAYA_MENU_UNSELECTABLE + "' style=''><input class='" + PAPAYA_MENU_INPUT_FIELD + "' type='text' size='4' id='" + this.minId + "' value='" + a[0] + "' /><div style='display:inline-block;position:relative;width:" + (papaya.viewer.ColorTable.COLOR_BAR_WIDTH + papaya.viewer.ColorTable.ARROW_ICON_WIDTH) +
        "px;top:-12px;'><img id='" + g + "' class='" + PAPAYA_MENU_UNSELECTABLE + "' style='position:absolute;top:5px;left:" + d.screenVol.colorTable.minLUT / papaya.viewer.ColorTable.LUT_MAX * (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1) + "px;z-index:99' src='" + papaya.viewer.ColorTable.ARROW_ICON + "' /><img id='" + f + "' class='" + PAPAYA_MENU_UNSELECTABLE + "' style='position:absolute;top:5px;left:" + d.screenVol.colorTable.maxLUT / papaya.viewer.ColorTable.LUT_MAX * (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1) + "px;z-index:99' src='" +
        papaya.viewer.ColorTable.ARROW_ICON + "' /><img id='" + k + "' class='" + PAPAYA_MENU_UNSELECTABLE + "' style='position:absolute;top:0;left:" + parseInt(papaya.viewer.ColorTable.ARROW_ICON_WIDTH / 2, 10) + "px;' src='" + this.viewer.screenVolumes[parseInt(this.index, 10)].colorBar + "' /></div><input class='" + PAPAYA_MENU_INPUT_FIELD + "' type='text' size='4' id='" + this.maxId + "' value='" + a[1] + "' /></span></li>";
    $("#" + c).append(a);
    b = $("#" + this.minId);
    e = $("#" + this.maxId);
    h = $("#" + g);
    l = $("#" + f);
    p = $("#" + k);
    papaya.utilities.PlatformUtils.ios &&
        (b[0].style.width = "35px", b[0].style.marginRight = "4px", e[0].style.width = "35px", e[0].style.marginRight = "4px");
    h.bind(papaya.utilities.PlatformUtils.ios ? "touchstart" : "mousedown", function(a) {
        d.grabOffset = papaya.ui.MenuItemRange.getRelativeMousePositionX(h, a);
        $(window).bind(papaya.utilities.PlatformUtils.ios ? "touchmove" : "mousemove", function(a) {
            var c;
            c = d.screenVol.colorTable.maxLUT / papaya.viewer.ColorTable.LUT_MAX * (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1);
            a = papaya.ui.MenuItemRange.getRelativeMousePositionFromParentX(h,
                a) - d.grabOffset;
            0 > a ? a = 0 : a >= papaya.viewer.ColorTable.COLOR_BAR_WIDTH ? a = papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1 : a > c && (a = c);
            d.screenVol.updateMinLUT(Math.round(a / (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1) * papaya.viewer.ColorTable.LUT_MAX));
            h.css({
                left: a + "px"
            });
            d.viewer.drawViewer(!1, !0);
            b.val(d.dataSource[d.method]()[0]);
            d.screenVol.updateColorBar();
            p.attr("src", d.screenVol.colorBar)
        });
        return !1
    });
    l.bind(papaya.utilities.PlatformUtils.ios ? "touchstart" : "mousedown", function(a) {
        d.grabOffset = papaya.ui.MenuItemRange.getRelativeMousePositionX(l,
            a);
        $(window).bind(papaya.utilities.PlatformUtils.ios ? "touchmove" : "mousemove", function(a) {
            var b;
            b = d.screenVol.colorTable.minLUT / papaya.viewer.ColorTable.LUT_MAX * (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1);
            a = papaya.ui.MenuItemRange.getRelativeMousePositionFromParentX(l, a) - d.grabOffset;
            0 > a ? a = 0 : a >= papaya.viewer.ColorTable.COLOR_BAR_WIDTH ? a = papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1 : a < b && (a = b);
            d.screenVol.updateMaxLUT(Math.round(a / (papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1) * papaya.viewer.ColorTable.LUT_MAX));
            l.css({
                left: a + "px"
            });
            d.viewer.drawViewer(!1, !0);
            e.val(d.dataSource[d.method]()[1]);
            d.screenVol.updateColorBar();
            p.attr("src", d.screenVol.colorBar)
        });
        return !1
    });
    $(window).bind(papaya.utilities.PlatformUtils.ios ? "touchend" : "mouseup", function() {
        $(window).unbind(papaya.utilities.PlatformUtils.ios ? "touchmove" : "mousemove")
    });
    $("#" + this.id).hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    });
    b.change(papaya.utilities.ObjectUtils.bind(this, function() {
        d.rangeChanged(!0)
    }));
    e.change(papaya.utilities.ObjectUtils.bind(this,
        function() {
            d.rangeChanged(!1)
        }));
    b.keyup(papaya.utilities.ObjectUtils.bind(this, function(a) {
        13 === a.keyCode && (d.rangeChanged(!1), d.viewer.container.toolbar.closeAllMenus())
    }));
    e.keyup(papaya.utilities.ObjectUtils.bind(this, function(a) {
        13 === a.keyCode && (d.rangeChanged(!1), d.viewer.container.toolbar.closeAllMenus())
    }));
    papaya.utilities.PlatformUtils.ios || setTimeout(function() {
        b.focus();
        b.select()
    }, 10)
};
papaya.ui.MenuItemRange.prototype.rangeChanged = function(c) {
    this.updateDataSource(c);
    this.viewer.drawViewer(!0);
    this.resetSlider()
};
papaya.ui.MenuItemRange.prototype.updateDataSource = function(c) {
    var a, d, b, e;
    e = $("#" + this.minId);
    b = $("#" + this.maxId);
    d = parseFloat(e.val());
    isNaN(d) && (d = this.dataSource.screenMin);
    a = parseFloat(b.val());
    isNaN(a) && (a = this.dataSource.screenMax);
    e.val(d);
    b.val(a);
    this.negatives ? this.dataSource.setScreenRangeNegatives(d, a) : this.dataSource.setScreenRange(d, a);
    c && (b.focus(), b.select())
};
papaya.ui.MenuItemRange.prototype.resetSlider = function() {
    var c, a, d;
    c = this.id + "SliderMin";
    a = this.id + "SliderMax";
    d = this.id + "Slider";
    c = $("#" + c);
    a = $("#" + a);
    d = $("#" + d);
    c.css({
        left: 0
    });
    a.css({
        left: papaya.viewer.ColorTable.COLOR_BAR_WIDTH - 1 + "px"
    });
    this.screenVol.resetDynamicRange();
    d.attr("src", this.screenVol.colorBar)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemSlider = papaya.ui.MenuItemSlider || function(c, a, d, b, e, g, h) {
    "alphaneg" === d && (d = "alpha", h = c.getScreenVolumeIndex(c.screenVolumes[parseInt(h)].negativeScreenVol).toString());
    this.viewer = c;
    this.label = a;
    this.index = h;
    this.modifier = "";
    papaya.utilities.StringUtils.isStringBlank(h) || (this.modifier = "-" + h);
    this.dataSource = e;
    this.method = g;
    this.action = d;
    this.event = -1 != this.action.toLowerCase().indexOf("alpha") || this.viewer.screenVolumes[0].isHighResSlice ? "change" : "input change";
    this.id = this.action.replace(/ /g,
        "_") + this.viewer.container.containerIndex + "_" + this.index;
    this.callback = b;
    this.screenVol = e
};
papaya.ui.MenuItemSlider.prototype.buildHTML = function(c) {
    var a, d, b, e, g;
    g = this.event;
    d = this.id + "Slider";
    a = "<li id='" + this.id + "'><span style='padding-right:5px;' class='" + PAPAYA_MENU_UNSELECTABLE + "'>" + this.label + ":</span><input min='0' max='100' value='" + parseInt(100 * (1 - this.screenVol[this.action]), 10) + "' id='" + d + "' class='" + PAPAYA_MENU_SLIDER + "' type='range' /></li>";
    $("#" + c).append(a);
    $("#" + this.id).hover(function() {
        $(this).toggleClass(PAPAYA_MENU_HOVERING_CSS)
    });
    b = $("#" + d);
    e = this;
    $("#" + this.id + "Slider").on(g,
        function() {
            e.screenVol[e.action] = 1 - b.val() / 100;
            e.doAction();
            e.viewer.drawViewer(!0, !1)
        })
};
papaya.ui.MenuItemSlider.prototype.doAction = function() {
    this.callback(this.action, null, !0)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papaya.ui.MenuItemSpacer = papaya.ui.MenuItemSpacer || function() {};
papaya.ui.MenuItemSpacer.prototype.buildHTML = function(c) {
    var a;
    a = "<div class='" + PAPAYA_MENU_SPACER_CSS + " " + PAPAYA_MENU_UNSELECTABLE + "'></div>";
    $("#" + c).append(a)
};
"use strict";
papaya = papaya || {};
papaya.ui = papaya.ui || {};
papayaLoadableImages = papayaLoadableImages || [];
papaya.ui.Toolbar = papaya.ui.Toolbar || function(c) {
    this.container = c;
    this.viewer = c.viewer;
    this.spaceMenu = this.surfaceMenus = this.imageMenus = null
};
papaya.ui.Toolbar.SIZE = 22;
papaya.ui.Toolbar.ICON_IMAGESPACE = "data:image/gif;base64,R0lGODlhFAAUAPcAMf//////GP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2f/ZNbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1qWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpVpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAUABQAAAipAFUIHEiwoMB/A1coXLiwisOHVf4hVLFCosWLGC9SzMgR48Z/VEJSUVjFj0mTESdWBCmS5EmU/6oIXCly5IqSLx/OlFjT5Us/DneybIkzp8yPDElChCjwj8Q/UKOqmkqVatOnUaGqmsaVq1UVTv+lGjv2z9SuXlVdFUs2ldmtaKeubev2bFy1YCXSfYt2mty8/6CS5XtXRcasVRMftJj1beK/hicanKwiIAA7";
papaya.ui.Toolbar.ICON_WORLDSPACE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAplJREFUeNqM1H1ozVEcx/Hr3p+7O08jQzbzMErznEItK0+Fv0Ye/tki20ia//wn+YMSaXkoEiKkkCVKZhOipsnDstnFagzlrmGMNfeO6/Nd71unu2s59bq7O517ft/z/X7Pz+dLPUbLJrkqX+SbdEubfJZK2cC6PiOQYm61HJcpkintEpcmCcpryZV5spaHhvvbdJ9slsPyU67wgPlEli0X5aiMkMeyXSbKnVRRVxDRRtkm5czbZrv5vkgu8z1P9stWfleRHGkhT3xCLu1YzZIjpfKWnA6VEn43mwcWEaWlo1Ve2YZj5Jms53iP5BjFsFz9lg/yDj0U7JbslFpZQyBP2a83khoiLiWPA/h/OVGOk+GwnJ5y1iyRS5Im1VLm18cKOc+CYrlGjnxUuZPIOlAn0yWdNXdlrMyRE7LM00eBjBT7niFVTvHsKJ8k6sw1yC4ZIl0EUMOcRT/X44v14xEZSBWfk+d8NpzKujgPGiYrOXI+XTGeGtjpewtjm16Qh3JT3sgvickfNo4yF6V4PVyE2wQUZvP7FmmIa/iDIpwkHRPkrC2iEIlhEZ2mtarIsz3sOoX0PPrP7nAWPRYjj51E85JiJEYO0VsfR5hL5wZal3T7aZl10kLiEyNEHtOSbt4g/gaduRjzC+S9RwtZ332XBxQpzGZ+p72SR5BumUYHLaaDSiySUXKPig6Wj+SmjX5s4BQB0pFBQVo4dhenspfKC1kaYLKVa9pOAW5Q2Ww2qeU92kHbzZRDvK2sBSfLDLtNUp/82rOj7nDm9tJi7lhoeWNzG7Pkqxz8R5p8ByhcGVd0CzkOOWv28KBJvNGa+V2/Y5U08vQm8mgvmTNyjpxHSFUj6/9rZPKerGSTuCPCi7qIdX3GXwEGAPFYt+/OgAXDAAAAAElFTkSuQmCC";
papaya.ui.Toolbar.ICON_EXPAND = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE00lEQVR42u2djW3UQBCFJx3QAemAdJBQAVABTgekAqCC0EGOCoAKWDqADkIHKQGPfKdEh3Nr7493Z977pJWQwtk7+77ETs6zdyYEmrPWEyBtoQDgUABwKAA4FAAcCgAOBQCHAoBDAcChAOBQAHAoADgUABwKAE6uALfjuGg094dx7Mbxo9H5D7wZxzCOF43O/3scN6kvzhXg5ziuGhV+4K20k0DD/964/jCO16kv9iCABvCu0bm/ySRgS4KAC7Abx3Wjc9/J9OO/JUGABXjYn/9Po/O/kimAVtd/EQMC6E1Krevkbhx/Kx17KSpBrcuAHjd2kx2kcwGUYRxfy60LBO9lEjxGEAMCKINQgqUsDV8JYkQAZRBKEGNN+EqQzgTQa/6p69YglOA5YuHPrW2QzgT4NI77SCGDUIJjYuEP4ziXaX2fEqRDAT4vLIgSTCxdq49iSIA1hSGzZo3MCbC2QDTWro1JAVIKRSBlTcwKkFqwV1LXwrQAOYV7ImcNzAuQuwDWya3dhQAlFsIiJWp2I0CpBbFCqVpdCVByYXqmZI3uBCi9QL1RujaXAigeJahRk1sBFE8S1KrFtQCKBwlq1uBeAMWyBLXnDiGAYlGCLeYMI4BiSYKt5golgGJBgi3nCCeA0rMEW88NUgClRwlazKk7AeaaI3WCpQVQepKg1VzmBMhqjs0V4Lg9unavXg8StJzDS5keDX/ai5jVHl9ih5DDBgka/hep36jZMoAeBNRexA8ySaBzydobweoWMS2C6CH84lgVQNkyEJfhK5YFULYIxm34inUBlFhA55K+h8DcTddTBjEcvuJBAOWUBIOkh3Qp0+/ZpY/bDV4EUJ6T4GocvxKP+ZwAgzgIX/EkgKIS6K+ihx/ZQTL+Srbn+K+dgzgJX/EmgKLX7fP9v1O/84+53B8zSPs9iYriUQCyAgoADgUAhwKAQwHAoQDgUABwKAA4FAAcCgAOBQCHAoBDAcChAOB4FEDfDr6Sacfykm8Hy/6YfDu4Y46fCgpS9oEQ7X3QZ/L5QEiH8JGwBLwIcOqh0CtJF6DWw6bd4EGAUyHpj2z9iJWcx8LvT3x9EOMSWBeAjSGZWBaArWEFsCoAm0MLwfZwO+c+0FV7+NwGETk3XTF6CKDlHOY+rLrpBhHcImbbuXS3RQw3idp2Tt1tEsVt4rhNHDeK3HCOUAJYCH/rucIIYCn8LecMIYDF8Leau3sBLIe/RQ2uBfAQfu1a3ArgKfyaNbkUwGP4tWpzJ4Dn8GvU6EoAhPBL1+pGAKTwS9bsQgDE8EvVbl4A5PBLrIFpARj+I6lrYVYAhv8/KWtiUgCG/zxr18acAAw/zpo1MiUAw1/O0rUyI8D9woLII0skOBcDAuhHrFxECmH488QkmFvbIJ0JcIpBGH6MmATHBDEiwCAMfylrJAhiQIBBGP5alkoQpHMB9Lr1PX6oJPS4tXsRY+geAkOlY2vX1UXk/wTpXICa1P6w6hhzvXpbo+eHFUDZjeO60bnvpN53/1KCgAuQ1RyZyVxz7NYEARcgqz06k+P2+BYEaSjArcRvUmqh1/+dtAv/wGGDjFb3AXqTfZP6YqtbxJBCUABwKAA4FAAcCgAOBQCHAoBDAcChAOBQAHAoADgUABwKAA4FAIcCgPMPvdAfn3qMP2kAAAAASUVORK5CYII=";
papaya.ui.Toolbar.ICON_COLLAPSE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEJGlDQ1BJQ0MgUHJvZmlsZQAAOBGFVd9v21QUPolvUqQWPyBYR4eKxa9VU1u5GxqtxgZJk6XtShal6dgqJOQ6N4mpGwfb6baqT3uBNwb8AUDZAw9IPCENBmJ72fbAtElThyqqSUh76MQPISbtBVXhu3ZiJ1PEXPX6yznfOec7517bRD1fabWaGVWIlquunc8klZOnFpSeTYrSs9RLA9Sr6U4tkcvNEi7BFffO6+EdigjL7ZHu/k72I796i9zRiSJPwG4VHX0Z+AxRzNRrtksUvwf7+Gm3BtzzHPDTNgQCqwKXfZwSeNHHJz1OIT8JjtAq6xWtCLwGPLzYZi+3YV8DGMiT4VVuG7oiZpGzrZJhcs/hL49xtzH/Dy6bdfTsXYNY+5yluWO4D4neK/ZUvok/17X0HPBLsF+vuUlhfwX4j/rSfAJ4H1H0qZJ9dN7nR19frRTeBt4Fe9FwpwtN+2p1MXscGLHR9SXrmMgjONd1ZxKzpBeA71b4tNhj6JGoyFNp4GHgwUp9qplfmnFW5oTdy7NamcwCI49kv6fN5IAHgD+0rbyoBc3SOjczohbyS1drbq6pQdqumllRC/0ymTtej8gpbbuVwpQfyw66dqEZyxZKxtHpJn+tZnpnEdrYBbueF9qQn93S7HQGGHnYP7w6L+YGHNtd1FJitqPAR+hERCNOFi1i1alKO6RQnjKUxL1GNjwlMsiEhcPLYTEiT9ISbN15OY/jx4SMshe9LaJRpTvHr3C/ybFYP1PZAfwfYrPsMBtnE6SwN9ib7AhLwTrBDgUKcm06FSrTfSj187xPdVQWOk5Q8vxAfSiIUc7Z7xr6zY/+hpqwSyv0I0/QMTRb7RMgBxNodTfSPqdraz/sDjzKBrv4zu2+a2t0/HHzjd2Lbcc2sG7GtsL42K+xLfxtUgI7YHqKlqHK8HbCCXgjHT1cAdMlDetv4FnQ2lLasaOl6vmB0CMmwT/IPszSueHQqv6i/qluqF+oF9TfO2qEGTumJH0qfSv9KH0nfS/9TIp0Wboi/SRdlb6RLgU5u++9nyXYe69fYRPdil1o1WufNSdTTsp75BfllPy8/LI8G7AUuV8ek6fkvfDsCfbNDP0dvRh0CrNqTbV7LfEEGDQPJQadBtfGVMWEq3QWWdufk6ZSNsjG2PQjp3ZcnOWWing6noonSInvi0/Ex+IzAreevPhe+CawpgP1/pMTMDo64G0sTCXIM+KdOnFWRfQKdJvQzV1+Bt8OokmrdtY2yhVX2a+qrykJfMq4Ml3VR4cVzTQVz+UoNne4vcKLoyS+gyKO6EHe+75Fdt0Mbe5bRIf/wjvrVmhbqBN97RD1vxrahvBOfOYzoosH9bq94uejSOQGkVM6sN/7HelL4t10t9F4gPdVzydEOx83Gv+uNxo7XyL/FtFl8z9ZAHF4bBsrEwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAeJJREFUOBG1lU1KA0EQhTP5c5MggkvFvQfQjS4iIcled3qBrDyCHsFsvEBcegBBkEBA0VuIW0UFBX8w4/c6VUMbAhoYG16qquvVm05Nd0+SpmlBI0mSogzxV5iY8Yf6EiWUp6NQasJFWfPL7lucQIzzvoDAn6xxrsRDEXYVrE0S44dM86kJC1GtNKxeDy+ULFDiAbQsrpqtMFeXb3GNuDLBaVmtL6zkZH+qCPegGQm1iftR3CduR3HTanxBY62I4OIiPoGOcoxdMIh4A81ZroMvblgINmiEnBcY0f++Cl6B2rMBzp0n3+aUE8cXEGqdVyaRDSY/FGDP2D4N3B64Bs/Ah/wdsA4acG+U8Fr5GuHtIaItpb1cAW2gv18FEt0HC8CHfM0pVxXXavSSpRG0fMUK1NA5sAeWwSfQ6i7AEPhwf4mJAyDBO3AJVBO0dNLw8x+hFfnLsj0kSlt0+kbYOuExiFuhng7JH2LFld0Ej2AeeCu6cF5cy3vs/XiDeAIWwS3Q298G8ZDoFuiBI7ACdKjegcZYSz2eBgjap1dAxafOkW9zyoUj7LnY/hCFmNsByYQRzf9IR6L5XUKI/uXarHn/4Gvn/H5tQvqfi14rcXHzs6vPYh3RmT9N2ZHWxkYgt4/pN/LAOfka/AG9AAAAAElFTkSuQmCC";
papaya.ui.Toolbar.FILE_MENU_DATA = {
    label: "File",
    icons: null,
    items: [{
        label: "Add Image...",
        action: "OpenImage",
        type: "file",
        hide: papaya.utilities.PlatformUtils.ios
    }, {
        label: "Add Surface...",
        action: "OpenSurface",
        type: "file",
        hide: papaya.utilities.PlatformUtils.ios
    }, {
        label: "Add DICOM Folder...",
        action: "OpenFolder",
        type: "folder",
        hide: "Chrome" !== papaya.utilities.PlatformUtils.browser || "undefined" === typeof daikon
    }, {
        label: "Add DTI Vector Series...",
        action: "OpenDTI",
        type: "file"
    }, {
        type: "spacer"
    }, {
        label: "Close All",
        action: "CloseAllImages"
    }]
};
papaya.ui.Toolbar.RGB_FILE_MENU_DATA = {
    label: "File",
    icons: null,
    items: [{
        label: "Close All",
        action: "CloseAllImages"
    }]
};
papaya.ui.Toolbar.MENU_DATA = {
    menus: [papaya.ui.Toolbar.FILE_MENU_DATA, {
            label: "View",
            icons: null,
            items: [{
                label: "Orientation",
                action: "ShowOrientation",
                type: "checkbox",
                method: "isShowingOrientation"
            }, {
                label: "Crosshairs",
                action: "ShowCrosshairs",
                type: "checkbox",
                method: "isShowingCrosshairs"
            }, {
                label: "Ruler",
                action: "ShowRuler",
                type: "checkbox",
                method: "isShowingRuler"
            }, {
                type: "spacer",
                required: "hasSurface"
            }, {
                label: "Surface Planes",
                action: "ShowSurfacePlanes",
                type: "checkbox",
                method: "isShowingSurfacePlanes",
                required: "hasSurface"
            }]
        },
        {
            label: "Settings",
            icons: null,
            items: [{
                label: "Viewer Preferences",
                action: "Preferences"
            }, {
                label: "Surface Preferences",
                action: "SurfacePreferences",
                required: "hasSurface"
            }]
        }, {
            label: "Help",
            icons: null,
            items: [{
                label: "Show Keyboard Reference",
                action: "KeyboardRef"
            }, {
                label: "Show Mouse Reference",
                action: "MouseRef"
            }, {
                label: "Show License",
                action: "License"
            }]
        }, {
            label: "TITLE",
            icons: null,
            titleBar: "true"
        }, {
            label: "EXPAND",
            icons: [papaya.ui.Toolbar.ICON_EXPAND, papaya.ui.Toolbar.ICON_COLLAPSE],
            items: [],
            method: "isCollapsable",
            required: "isExpandable"
        }, {
            label: "SPACE",
            icons: [papaya.ui.Toolbar.ICON_IMAGESPACE, papaya.ui.Toolbar.ICON_WORLDSPACE],
            items: [],
            method: "isWorldMode",
            menuOnHover: !0
        }
    ]
};
papaya.ui.Toolbar.MENU_DATA_KIOSK = {
    menus: [{
        label: "EXPAND",
        icons: [papaya.ui.Toolbar.ICON_EXPAND, papaya.ui.Toolbar.ICON_COLLAPSE],
        items: [],
        method: "isCollapsable",
        required: "isExpandable"
    }]
};
papaya.ui.Toolbar.OVERLAY_IMAGE_MENU_DATA = {
    items: [{
            label: "Show Header",
            action: "ShowHeader"
        }, {
            label: "Show Image Info",
            action: "ImageInfo"
        }, {
            type: "spacer",
            required: "isParametricCombined"
        }, {
            label: "DisplayRange",
            action: "ChangeRange",
            type: "displayrange",
            method: "getRange"
        }, {
            label: "Load Negatives",
            action: "LoadNegatives",
            required: "canCurrentOverlayLoadNegatives"
        }, {
            label: "Transparency",
            action: "alpha",
            type: "range",
            method: "getAlpha"
        }, {
            label: "Color Table",
            action: "ColorTable",
            items: [],
            required: "isNonParametricCombined"
        },
        {
            type: "spacer",
            required: "isParametricCombined"
        }, {
            label: "DisplayRange",
            action: "ChangeRangeNeg",
            type: "displayrange",
            method: "getRangeNegative",
            required: "isParametricCombined"
        }, {
            label: "Transparency",
            action: "alphaneg",
            type: "range",
            method: "getAlpha",
            required: "isParametricCombined"
        }, {
            type: "spacer",
            required: "isParametricCombined"
        }, {
            label: "Hide Overlay",
            action: "ToggleOverlay",
            method: "getHiddenLabel"
        }, {
            label: "Close Overlay",
            action: "CloseOverlay",
            required: "isDesktopMode"
        }, {
            label: "Open in Mango",
            action: "OpenInMango",
            required: "canOpenInMango"
        }
    ]
};
papaya.ui.Toolbar.BASE_IMAGE_MENU_DATA = {
    items: [{
        label: "Show Header",
        action: "ShowHeader"
    }, {
        label: "Show Image Info",
        action: "ImageInfo"
    }, {
        label: "DisplayRange",
        action: "ChangeRange",
        type: "displayrange",
        method: "getRange"
    }, papaya.ui.Toolbar.OVERLAY_IMAGE_MENU_DATA.items[6], {
        label: "Rotation",
        action: "Rotation",
        items: [{
            label: "About X Axis",
            action: "rotationX",
            type: "range",
            method: "getRotationX"
        }, {
            label: "About Y Axis",
            action: "rotationY",
            type: "range",
            method: "getRotationY"
        }, {
            label: "About Z Axis",
            action: "rotationZ",
            type: "range",
            method: "getRotationZ"
        }, {
            label: "Reset Transform",
            action: "ResetTransform"
        }, {
            label: "Rotate About Center",
            action: "Rotate About Center",
            type: "radiobutton",
            method: "isRotatingAbout"
        }, {
            label: "Rotate About Origin",
            action: "Rotate About Origin",
            type: "radiobutton",
            method: "isRotatingAbout"
        }, {
            label: "Rotate About Crosshairs",
            action: "Rotate About Crosshairs",
            type: "radiobutton",
            method: "isRotatingAbout"
        }]
    }, {
        label: "Open in Mango",
        action: "OpenInMango",
        required: "canOpenInMango"
    }]
};
papaya.ui.Toolbar.RGB_IMAGE_MENU_DATA = {
    items: [{
        label: "Show Header",
        action: "ShowHeader"
    }, {
        label: "Show Image Info",
        action: "ImageInfo"
    }, {
        label: "Open in Mango",
        action: "OpenInMango",
        required: "canOpenInMango"
    }]
};
papaya.ui.Toolbar.SURFACE_MENU_DATA = {
    items: [{
        label: "Show Surface Info",
        action: "SurfaceInfo"
    }, {
        label: "Transparency",
        action: "alpha",
        type: "range",
        method: "getAlpha"
    }]
};
papaya.ui.Toolbar.DTI_IMAGE_MENU_DATA = {
    items: [{
        label: "Show Header",
        action: "ShowHeader"
    }, {
        label: "Show Image Info",
        action: "ImageInfo"
    }, {
        label: "Display Colors",
        action: "DTI-RGB",
        type: "checkbox",
        method: "isDTIRGB"
    }, {
        label: "Display Lines",
        action: "DTI-Lines",
        type: "checkbox",
        method: "isDTILines"
    }, {
        label: "Display Lines &amp; Colors",
        action: "DTI-LinesColors",
        type: "checkbox",
        method: "isDTILinesAndRGB"
    }, {
        label: "Transparency",
        action: "alpha",
        type: "range",
        method: "getAlpha",
        required: "canCurrentOverlayLoadMod"
    }, {
        label: "Modulate with...",
        action: "DTI-Mod",
        type: "file",
        hide: papaya.utilities.PlatformUtils.ios,
        required: "canCurrentOverlayLoadMod"
    }, {
        label: "Modulation",
        action: "dtiAlphaFactor",
        type: "range",
        method: "getDtiAlphaFactor",
        required: "canCurrentOverlayModulate"
    }, {
        label: "Open in Mango",
        action: "OpenInMango",
        required: "canOpenInMango"
    }]
};
papaya.ui.Toolbar.PREFERENCES_DATA = {
    items: [{
        label: "Coordinate display of:",
        field: "atlasLocks",
        options: ["Mouse", "Crosshairs"]
    }, {
        label: "Scroll wheel behavior:",
        field: "scrollBehavior",
        options: ["Zoom", "Increment Slice"],
        disabled: "container.disableScrollWheel"
    }, {
        spacer: "true"
    }, {
        label: "Smooth display:",
        field: "smoothDisplay",
        options: ["Yes", "No"]
    }, {
        label: "Radiological display:",
        field: "radiological",
        options: ["Yes", "No"]
    }]
};
papaya.ui.Toolbar.PREFERENCES_SURFACE_DATA = {
    items: [{
        label: "Background color:",
        field: "surfaceBackgroundColor",
        options: ["Black", "Dark Gray", "Gray", "Light Gray", "White"]
    }]
};
papaya.ui.Toolbar.IMAGE_INFO_DATA = {
    items: [{
            label: "Filename:",
            field: "getFilename",
            readonly: "true"
        }, {
            spacer: "true"
        }, {
            label: "Image Dims:",
            field: "getImageDimensionsDescription",
            readonly: "true"
        }, {
            label: "Voxel Dims:",
            field: "getVoxelDimensionsDescription",
            readonly: "true"
        }, {
            spacer: "true"
        }, {
            label: "Byte Type:",
            field: "getByteTypeDescription",
            readonly: "true"
        }, {
            label: "Byte Order:",
            field: "getByteOrderDescription",
            readonly: "true"
        }, {
            spacer: "true"
        }, {
            label: "Orientation:",
            field: "getOrientationDescription",
            readonly: "true"
        },
        {
            spacer: "true"
        }, {
            label: "Notes:",
            field: "getImageDescription",
            readonly: "true"
        }
    ]
};
papaya.ui.Toolbar.SERIES_INFO_DATA = {
    items: [{
            label: "Filename:",
            field: "getFilename",
            readonly: "true"
        }, {
            label: "File Length:",
            field: "getFileLength",
            readonly: "true"
        }, {
            spacer: "true"
        }, {
            label: "Image Dims:",
            field: "getImageDimensionsDescription",
            readonly: "true"
        }, {
            label: "Voxel Dims:",
            field: "getVoxelDimensionsDescription",
            readonly: "true"
        }, {
            label: "Series Points:",
            field: "getSeriesDimensionsDescription",
            readonly: "true"
        }, {
            label: "Series Point Size:",
            field: "getSeriesSizeDescription",
            readonly: "true"
        }, {
            spacer: "true"
        },
        {
            label: "Byte Type:",
            field: "getByteTypeDescription",
            readonly: "true"
        }, {
            label: "Byte Order:",
            field: "getByteOrderDescription",
            readonly: "true"
        }, {
            label: "Compressed:",
            field: "getCompressedDescription",
            readonly: "true"
        }, {
            spacer: "true"
        }, {
            label: "Orientation:",
            field: "getOrientationDescription",
            readonly: "true"
        }, {
            label: "Notes:",
            field: "getImageDescription",
            readonly: "true"
        }
    ]
};
papaya.ui.Toolbar.SURFACE_INFO_DATA = {
    items: [{
        label: "Filename:",
        field: "getSurfaceFilename",
        readonly: "true"
    }, {
        spacer: "true"
    }, {
        label: "Points:",
        field: "getSurfaceNumPoints",
        readonly: "true"
    }, {
        label: "Triangles:",
        field: "getSurfaceNumTriangles",
        readonly: "true"
    }]
};
papaya.ui.Toolbar.HEADER_DATA = {
    items: [{
        label: "",
        field: "getHeaderDescription",
        readonly: "true"
    }]
};
papaya.ui.Toolbar.LICENSE_DATA = {
    items: [{
        label: "",
        field: "getLicense",
        readonly: "true"
    }]
};
papaya.ui.Toolbar.KEYBOARD_REF_DATA = {
    items: [{
        label: "",
        field: "getKeyboardReference",
        readonly: "true"
    }]
};
papaya.ui.Toolbar.MOUSE_REF_DATA = {
    items: [{
        label: "",
        field: "getMouseReference",
        readonly: "true"
    }]
};
papaya.ui.Toolbar.applyContextState = function(c) {
    var a;
    c.contextMenu = !0;
    if (c.items)
        for (a = 0; a < c.items.length; a += 1) c.items[a].menu ? papaya.ui.Toolbar.applyContextState(c.items[a].menu) : c.items[a].isContext = !0
};
papaya.ui.Toolbar.prototype.buildToolbar = function() {
    var c;
    this.spaceMenu = this.surfaceMenus = this.imageMenus = null;
    this.container.toolbarHtml.find("." + PAPAYA_MENU_ICON_CSS).remove();
    this.container.toolbarHtml.find("." + PAPAYA_MENU_LABEL_CSS).remove();
    this.container.toolbarHtml.find("." + PAPAYA_TITLEBAR_CSS).remove();
    if (this.container.kioskMode)
        for (c = 0; c < papaya.ui.Toolbar.MENU_DATA_KIOSK.menus.length; c += 1) this.buildMenu(papaya.ui.Toolbar.MENU_DATA_KIOSK.menus[c], null, this.viewer, null);
    else {
        0 < this.container.viewer.screenVolumes.length &&
            this.container.viewer.screenVolumes[0].rgb ? papaya.ui.Toolbar.MENU_DATA.menus[0] = papaya.ui.Toolbar.RGB_FILE_MENU_DATA : (papaya.ui.Toolbar.MENU_DATA.menus[0] = this.container.noNewFiles ? papaya.ui.Toolbar.RGB_FILE_MENU_DATA : papaya.ui.Toolbar.FILE_MENU_DATA, this.buildOpenMenuItems(papaya.ui.Toolbar.MENU_DATA));
        for (c = 0; c < papaya.ui.Toolbar.MENU_DATA.menus.length; c += 1) this.buildMenu(papaya.ui.Toolbar.MENU_DATA.menus[c], null, this.viewer, null);
        this.buildAtlasMenu()
    }
    this.buildColorMenuItems();
    this.container.titlebarHtml =
        this.container.containerHtml.find("." + PAPAYA_TITLEBAR_CSS);
    600 > this.container.getViewerDimensions()[0] ? this.container.titlebarHtml.css({
        visibility: "hidden"
    }) : this.container.titlebarHtml.css({
        visibility: "visible"
    })
};
papaya.ui.Toolbar.prototype.buildAtlasMenu = function() {
    if (papaya.data && papaya.data.Atlas) {
        var c = this.spaceMenu.items;
        c[0] = {
            label: papaya.data.Atlas.labels.atlas.header.name,
            action: "AtlasChanged-" + papaya.data.Atlas.labels.atlas.header.name,
            type: "radiobutton",
            method: "isUsingAtlas"
        };
        papaya.data.Atlas.labels.atlas.header.transformedname && (c[1] = {
            label: papaya.data.Atlas.labels.atlas.header.transformedname,
            action: "AtlasChanged-" + papaya.data.Atlas.labels.atlas.header.transformedname,
            type: "radiobutton",
            method: "isUsingAtlas"
        })
    }
};
papaya.ui.Toolbar.prototype.buildColorMenuItems = function() {
    var c, a, d, b;
    if (c = this.container.params.luts)
        for (a = 0; a < c.length; a += 1) papaya.viewer.ColorTable.addCustomLUT(c[a]);
    d = papaya.viewer.ColorTable.TABLE_ALL;
    c = papaya.ui.Toolbar.OVERLAY_IMAGE_MENU_DATA.items;
    for (a = 0; a < c.length; a += 1)
        if ("Color Table" === c[a].label) {
            c = c[a].items;
            break
        } for (a = 0; a < d.length; a += 1) b = {
        label: d[a].name,
        action: "ColorTable-" + d[a].name,
        type: "radiobutton",
        method: "isUsingColorTable"
    }, c[a] = b
};
papaya.ui.Toolbar.prototype.buildOpenMenuItems = function(c) {
    var a, d;
    for (a = 0; a < c.menus.length; a += 1)
        if ("File" === c.menus[a].label) {
            d = c.menus[a].items;
            break
        } if (d)
        for (a = 0; a < papayaLoadableImages.length; a += 1) papayaLoadableImages[a].hide || (papayaLoadableImages[a].surface ? (c = "Add Surface " + papayaLoadableImages[a].nicename, this.menuContains(d, c) || d.splice(2, 0, {
            label: c,
            action: "OpenSurface-" + papayaLoadableImages[a].name
        })) : (c = "Add " + papayaLoadableImages[a].nicename, this.menuContains(d, c) || d.splice(2, 0, {
            label: c,
            action: "Open-" + papayaLoadableImages[a].name
        })))
};
papaya.ui.Toolbar.prototype.menuContains = function(c, a) {
    var d;
    if (c)
        for (d = 0; d < c.length; d += 1)
            if (c[d].label === a) return !0;
    return !1
};
papaya.ui.Toolbar.prototype.buildMenu = function(c, a, d, b, e) {
    var g = null;
    void 0 === e && (e = !1);
    c.required && !0 !== papaya.utilities.ObjectUtils.bind(this.container, papaya.utilities.ObjectUtils.dereferenceIn(this.container, c.required))() || (g = new papaya.ui.Menu(this.viewer, c, papaya.utilities.ObjectUtils.bind(this, this.doAction), this.viewer, b), "SPACE" === c.label && (this.spaceMenu = c), e || (a ? g.setMenuButton(a) : a = g.buildMenuButton()), (c = c.items) && this.buildMenuItems(g, c, a, d, b));
    return g
};
papaya.ui.Toolbar.prototype.buildMenuItems = function(c, a, d, b, e) {
    var g, h, f;
    void 0 === e && (e = "");
    for (g = 0; g < a.length; g += 1) a[g].required && !0 !== papaya.utilities.ObjectUtils.bind(this.container, papaya.utilities.ObjectUtils.dereferenceIn(this.container, a[g].required))(parseInt(e)) ? h = null : "spacer" === a[g].type ? h = new papaya.ui.MenuItemSpacer : "radiobutton" === a[g].type ? h = new papaya.ui.MenuItemRadioButton(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), b, a[g].method, e) : "checkbox" ===
        a[g].type ? h = new papaya.ui.MenuItemCheckBox(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), b, a[g].method, e) : "file" === a[g].type ? a[g].hide || a[g].required && !0 !== papaya.utilities.ObjectUtils.bind(this.container, papaya.utilities.ObjectUtils.dereferenceIn(this.container, a[g].required))(parseInt(e)) || (h = new papaya.ui.MenuItemFileChooser(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), !1, e)) : "folder" === a[g].type ? h = a[g].hide ||
        a[g].required && !0 !== papaya.utilities.ObjectUtils.bind(this.container, papaya.utilities.ObjectUtils.dereferenceIn(this.container, a[g].required))(parseInt(e)) ? null : new papaya.ui.MenuItemFileChooser(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), !0, e) : "displayrange" === a[g].type ? h = this.viewer.screenVolumes[e].supportsDynamicColorTable() ? new papaya.ui.MenuItemRange(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), b, a[g].method,
            e) : null : "range" === a[g].type ? papaya.utilities.PlatformUtils.isInputRangeSupported() && (h = new papaya.ui.MenuItemSlider(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), b, a[g].method, e)) : h = new papaya.ui.MenuItem(this.viewer, a[g].label, a[g].action, papaya.utilities.ObjectUtils.bind(this, this.doAction), b, a[g].method, e), h && (c.addMenuItem(h), a[g].items && (f = this.buildMenu(a[g], d, b, e), h.menu = f, h.callback = papaya.utilities.ObjectUtils.bind(f, f.showMenu)))
};
papaya.ui.Toolbar.prototype.updateImageButtons = function() {
    this.container.toolbarHtml.find("." + PAPAYA_MENU_BUTTON_CSS).remove();
    this.doUpdateImageButtons();
    this.updateSurfaceButtons()
};
papaya.ui.Toolbar.prototype.doUpdateImageButtons = function() {
    var c, a, d;
    this.imageMenus = [];
    if (this.container.showImageButtons)
        for (a = this.viewer.screenVolumes.length - 1; 0 <= a; --a) d = this.viewer.screenVolumes[a], c = d.icon, c = [{
                label: "ImageButton",
                icons: [c],
                items: null,
                imageButton: !0
            }], c[0].items = 0 === a ? d.rgb ? papaya.ui.Toolbar.RGB_IMAGE_MENU_DATA.items : d.dti ? papaya.ui.Toolbar.DTI_IMAGE_MENU_DATA.items : papaya.ui.Toolbar.BASE_IMAGE_MENU_DATA.items : d.dti ? papaya.ui.Toolbar.DTI_IMAGE_MENU_DATA.items : papaya.ui.Toolbar.OVERLAY_IMAGE_MENU_DATA.items,
            this.container.combineParametric && d.parametric || this.imageMenus.push(this.buildMenu(c[0], null, d, a.toString()))
};
papaya.ui.Toolbar.prototype.updateSurfaceButtons = function() {
    var c, a, d = this;
    this.surfaceMenus = [];
    if (this.container.showImageButtons)
        for (c = this.viewer.surfaces.length - 1; 0 <= c; --c) {
            var b = this.viewer.surfaces[c];
            b.staticIcon ? papaya.viewer.ScreenVolume.makeStaticIcon(b.staticIcon, function(a, b) {
                d.surfaceMenus.push(d.buildMenu({
                    label: "SurfaceButton",
                    icons: [a],
                    items: papaya.ui.Toolbar.SURFACE_MENU_DATA.items,
                    imageButton: !0,
                    surfaceButton: !0
                }, null, d.viewer.surfaces[b], b.toString()))
            }, c) : (a = b.solidColor, null ===
                a && (a = [.5, .5, .5]), a = papaya.viewer.ScreenVolume.makeSolidIcon(a[0], a[1], a[2]), this.surfaceMenus.push(this.buildMenu({
                    label: "SurfaceButton",
                    icons: [a],
                    items: papaya.ui.Toolbar.SURFACE_MENU_DATA.items,
                    imageButton: !0,
                    surfaceButton: !0
                }, null, b, c.toString())))
        }
};
papaya.ui.Toolbar.prototype.closeAllMenus = function(c) {
    var a;
    a = this.container.toolbarHtml.find("." + PAPAYA_MENU_CSS);
    a.hide(100);
    a.remove();
    this.container.showControlBar && (a = this.container.sliderControlHtml.find("." + PAPAYA_MENU_CSS), a.hide(100), a.remove());
    a = this.container.toolbarHtml.find("." + PAPAYA_DIALOG_CSS);
    a.hide(100);
    a.remove();
    a = this.container.toolbarHtml.find("." + PAPAYA_DIALOG_BACKGROUND);
    a.hide(100);
    a.remove();
    !c && (c = this.container.viewerHtml.find("." + PAPAYA_MENU_CSS)) && (c.hide(100), c.remove())
};
papaya.ui.Toolbar.prototype.isShowingMenus = function() {
    var c, a;
    c = this.container.toolbarHtml.find("." + PAPAYA_MENU_CSS).is(":visible");
    a = this.container.toolbarHtml.find("." + PAPAYA_DIALOG_CSS).is(":visible");
    return c || a
};
papaya.ui.Toolbar.prototype.doAction = function(c, a, d) {
    var b, e;
    d || this.closeAllMenus();
    if (c)
        if (c.startsWith("ImageButton")) c = parseInt(c.substr(c.length - 2, 1), 10), this.viewer.setCurrentScreenVol(c), this.updateImageButtons();
        else if (c.startsWith("OpenSurface-")) a = c.substring(c.indexOf("-") + 1), this.viewer.loadSurface(a);
    else if (c.startsWith("Open-")) a = c.substring(c.indexOf("-") + 1), this.viewer.loadImage(a);
    else if ("OpenImage" === c) this.container.display.drawProgress(.1, "Loading"), this.viewer.loadImage(a);
    else if ("OpenDTI" === c) this.container.display.drawProgress(.1, "Loading"), this.viewer.loadingDTI = !0, this.viewer.loadImage(a);
    else if ("OpenSurface" === c) this.container.display.drawProgress(.1, "Loading"), this.viewer.loadSurface(a);
    else if ("OpenFolder" === c) {
        c = [];
        for (d = 0; d < a.length; d += 1) {
            e = !1;
            for (b = 0; b < papaya.Container.ignorePatterns.length; b += 1) papaya.Container.ignorePatterns[b].test(a[d].name) && (e = !0);
            e ? console.log("Ignoring file " + a[d].name) : c.push(a[d])
        }
        this.container.display.drawProgress(.1, "Loading");
        this.viewer.loadImage(c)
    } else c.startsWith("ColorTable") ? (a = c.substring(c.indexOf("-") + 1, c.lastIndexOf("-")), c = c.substring(c.lastIndexOf("-") + 1), this.viewer.screenVolumes[c].changeColorTable(this.viewer, a), this.updateImageButtons()) : c.startsWith("CloseAllImages") ? papaya.Container.resetViewer(this.container.containerIndex, {}) : "Preferences" === c ? (a = new papaya.ui.Dialog(this.container, "Viewer Preferences", papaya.ui.Toolbar.PREFERENCES_DATA, this.container.preferences, papaya.utilities.ObjectUtils.bind(this.container.preferences,
            this.container.preferences.updatePreference), papaya.utilities.ObjectUtils.bind(this, function() {
            this.viewer.updateScreenSliceTransforms();
            this.viewer.drawViewer(!1, !0)
        })), a.showDialog()) : "SurfacePreferences" === c ? (a = new papaya.ui.Dialog(this.container, "Surface Preferences", papaya.ui.Toolbar.PREFERENCES_SURFACE_DATA, this.container.preferences, papaya.utilities.ObjectUtils.bind(this.container.preferences, this.container.preferences.updatePreference), papaya.utilities.ObjectUtils.bind(this, function() {
            this.viewer.updateScreenSliceTransforms();
            this.viewer.surfaceView.updatePreferences();
            this.viewer.drawViewer(!1, !0)
        })), a.showDialog()) : "License" === c ? (a = new papaya.ui.Dialog(this.container, "License", papaya.ui.Toolbar.LICENSE_DATA, papaya.Container, null, null, null, !0), a.showDialog()) : "KeyboardRef" === c ? (a = new papaya.ui.Dialog(this.container, "Keyboard Reference", papaya.ui.Toolbar.KEYBOARD_REF_DATA, papaya.Container, null, null, null, !0), a.showDialog()) : "MouseRef" === c ? (a = new papaya.ui.Dialog(this.container, "Mouse Reference", papaya.ui.Toolbar.MOUSE_REF_DATA,
            papaya.Container, null, null, null, !0), a.showDialog()) : c.startsWith("ImageInfo") ? (c = c.substring(c.lastIndexOf("-") + 1), a = 1 < this.viewer.screenVolumes[c].volume.numTimepoints ? new papaya.ui.Dialog(this.container, "Image Info", papaya.ui.Toolbar.SERIES_INFO_DATA, this.viewer, null, null, c.toString()) : new papaya.ui.Dialog(this.container, "Image Info", papaya.ui.Toolbar.IMAGE_INFO_DATA, this.viewer, null, null, c.toString()), a.showDialog()) : c.startsWith("SurfaceInfo") ? (c = c.substring(c.lastIndexOf("-") + 1), a = new papaya.ui.Dialog(this.container,
            "Surface Info", papaya.ui.Toolbar.SURFACE_INFO_DATA, this.viewer, null, null, c.toString()), a.showDialog()) : c.startsWith("ShowHeader") ? (c = c.substring(c.lastIndexOf("-") + 1), a = new papaya.ui.Dialog(this.container, "Header", papaya.ui.Toolbar.HEADER_DATA, this.viewer, null, null, c.toString()), a.showDialog()) : c.startsWith("SPACE") ? (this.viewer.toggleWorldSpace(), this.viewer.drawViewer(!0)) : c.startsWith("AtlasChanged") ? (a = c.substring(c.lastIndexOf("-") + 1), this.viewer.atlas.currentAtlas = a, this.viewer.drawViewer(!0)) :
        c.startsWith("ShowRuler") ? ("Yes" === this.container.preferences.showRuler ? this.container.preferences.updatePreference("showRuler", "No") : this.container.preferences.updatePreference("showRuler", "Yes"), this.viewer.drawViewer(), this.closeAllMenus()) : c.startsWith("ShowOrientation") ? ("Yes" === this.container.preferences.showOrientation ? this.container.preferences.updatePreference("showOrientation", "No") : this.container.preferences.updatePreference("showOrientation", "Yes"), this.viewer.drawViewer(), this.closeAllMenus()) :
        c.startsWith("ShowCrosshairs") ? ("Yes" === this.container.preferences.showCrosshairs ? this.container.preferences.updatePreference("showCrosshairs", "No") : this.container.preferences.updatePreference("showCrosshairs", "Yes"), this.viewer.drawViewer(), this.closeAllMenus()) : c.startsWith("EXPAND") ? this.container.collapsable ? this.container.collapseViewer() : this.container.expandViewer() : c.startsWith("OpenInMango") ? (c = parseInt(c.substring(c.lastIndexOf("-") + 1), 10), 0 === c ? this.container.viewer.volume.urls[0] && papaya.utilities.PlatformUtils.launchCustomProtocol(this.container,
            papaya.utilities.UrlUtils.getAbsoluteUrl(PAPAYA_CUSTOM_PROTOCOL, this.container.viewer.volume.urls[0]), this.customProtocolResult) : this.container.viewer.screenVolumes[c].volume.urls[0] && papaya.utilities.PlatformUtils.launchCustomProtocol(this.container, papaya.utilities.UrlUtils.getAbsoluteUrl(PAPAYA_CUSTOM_PROTOCOL, this.container.viewer.screenVolumes[c].volume.urls[0]) + "?" + encodeURIComponent("baseimage=" + this.container.viewer.volume.fileName + "&params=o"), this.customProtocolResult)) : c.startsWith("CloseOverlay") ?
        (c = parseInt(c.substring(c.lastIndexOf("-") + 1), 10), this.container.viewer.removeOverlay(c)) : c.startsWith("ToggleOverlay") ? (c = parseInt(c.substring(c.lastIndexOf("-") + 1), 10), this.container.viewer.toggleOverlay(c)) : c.startsWith("Context-") ? this.container.contextManager.actionPerformed(c.substring(8)) : c.startsWith("DTI-RGB") ? (c = c.substring(c.lastIndexOf("-") + 1), this.viewer.screenVolumes[c].dtiLines = !1, this.viewer.screenVolumes[c].dtiColors = !0, this.viewer.screenVolumes[c].initDTI(), this.viewer.drawViewer(!0,
            !1)) : c.startsWith("DTI-LinesColors") ? (c = c.substring(c.lastIndexOf("-") + 1), this.viewer.screenVolumes[c].dtiLines = !0, this.viewer.screenVolumes[c].dtiColors = !0, this.viewer.screenVolumes[c].initDTI(), this.viewer.drawViewer(!0, !1)) : c.startsWith("DTI-Lines") ? (c = c.substring(c.lastIndexOf("-") + 1), this.viewer.screenVolumes[c].dtiLines = !0, this.viewer.screenVolumes[c].dtiColors = !1, this.viewer.screenVolumes[c].initDTI(), this.viewer.drawViewer(!0, !1)) : c.startsWith("DTI-Mod") ? (c = c.substring(c.lastIndexOf("-") +
            1), this.container.display.drawProgress(.1, "Loading"), this.viewer.loadingDTIModRef = this.viewer.screenVolumes[c], this.viewer.loadImage(a)) : c.startsWith("LoadNegatives") ? (c = c.substring(c.lastIndexOf("-") + 1), this.viewer.addParametric(c)) : c.startsWith("ShowSurfacePlanes") ? (this.viewer.surfaceView.showSurfacePlanes = !this.viewer.surfaceView.showSurfacePlanes, this.viewer.surfaceView.updateActivePlanes(), "Yes" === this.container.preferences.showSurfacePlanes ? this.container.preferences.updatePreference("showSurfacePlanes",
            "No") : this.container.preferences.updatePreference("showSurfacePlanes", "Yes"), this.viewer.drawViewer(!1, !0), this.closeAllMenus()) : c.startsWith("ShowSurfaceCrosshairs") ? (this.viewer.surfaceView.showSurfaceCrosshairs = !this.viewer.surfaceView.showSurfaceCrosshairs, this.viewer.surfaceView.updateActivePlanes(), "Yes" === this.container.preferences.showSurfaceCrosshairs ? this.container.preferences.updatePreference("showSurfaceCrosshairs", "No") : this.container.preferences.updatePreference("showSurfaceCrosshairs",
            "Yes"), this.viewer.drawViewer(!1, !0), this.closeAllMenus()) : c.startsWith("rotation") ? this.viewer.screenVolumes[0].updateTransform() : c.startsWith("Rotate About") ? (this.viewer.screenVolumes[0].rotationAbout = c.substring(0, c.indexOf("-")), this.viewer.screenVolumes[0].updateTransform(), this.viewer.drawViewer(!0, !1)) : c.startsWith("ResetTransform") && (this.viewer.screenVolumes[0].resetTransform(), this.viewer.screenVolumes[0].updateTransform(), this.viewer.drawViewer(!0, !1))
};
papaya.ui.Toolbar.prototype.customProtocolResult = function(c) {
    !1 === c && ("Chrome" === papaya.utilities.PlatformUtils.browser || "Internet Explorer" === papaya.utilities.PlatformUtils.browser ? alert("Mango does not appear to be installed.  You can download Mango at:\n\nhttp://ric.uthscsa.edu/mango") : papaya.utilities.PlatformUtils.ios ? confirm("iMango does not appear to be installed.  Would you like to download it now?") && window.open("http://itunes.apple.com/us/app/imango/id423626092") : confirm("Mango does not appear to be installed.  Would you like to download it now?") &&
        window.open("http://ric.uthscsa.edu/mango/mango.html"))
};
papaya.ui.Toolbar.prototype.updateTitleBar = function(c) {
    var a = this.container.titlebarHtml[0];
    a && (a.innerHTML = c);
    this.container.titlebarHtml.css({
        top: 0
    })
};
papaya.ui.Toolbar.prototype.showImageMenu = function(c) {
    this.viewer.screenVolumes[c].resetDynamicRange();
    this.imageMenus[c].showMenu()
};
papaya.ui.Toolbar.prototype.updateImageMenuRange = function(c, a, d) {
    this.imageMenus[c].updateRangeItem(a, d)
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
papaya.viewer.Atlas = papaya.viewer.Atlas || function(c, a, d) {
    this.container = a;
    this.callback = d;
    this.transformedname = this.name = null;
    this.labels = [];
    this.atlasLabelData = c.labels;
    this.volume = new papaya.volume.Volume(a.display, a.viewer);
    this.currentAtlas = this.transform = this.returnLabels = this.displayColumns = null;
    this.maxLabels = 0;
    this.probabilistic = !1;
    c = a.findLoadableImage(c.labels.atlas.header.images.summaryimagefile);
    a.params.atlasURL ? this.volume.readURLs([a.params.atlasURL], papaya.utilities.ObjectUtils.bind(this,
        this.readFinished)) : null !== c && void 0 !== c.encode ? this.volume.readEncodedData([c.encode], papaya.utilities.ObjectUtils.bind(this, this.readFinished)) : null !== c && void 0 !== c.url && this.volume.readURLs([c.url], papaya.utilities.ObjectUtils.bind(this, this.readFinished))
};
papaya.viewer.Atlas.MAX_LABELS = 4;
papaya.viewer.Atlas.PROBABILISTIC = ["probabalistic", "probabilistic", "statistic"];
papaya.viewer.Atlas.LABEL_SPLIT_REGEX = /\.|:|,|\//;
papaya.viewer.Atlas.prototype.getLabelAtCoordinate = function(c, a, d) {
    var b, e, g;
    this.transform && this.currentAtlas === this.transformedname ? (b = c * this.transform[0][0] + a * this.transform[0][1] + d * this.transform[0][2] + this.transform[0][3], e = c * this.transform[1][0] + a * this.transform[1][1] + d * this.transform[1][2] + this.transform[1][3], g = c * this.transform[2][0] + a * this.transform[2][1] + d * this.transform[2][2] + this.transform[2][3]) : (b = c, e = a, g = d);
    c = papaya.Container.atlasWorldSpace ? this.volume.getVoxelAtCoordinate(b, e, g, 0,
        !0) : this.volume.getVoxelAtIndex(c, a, d, 0, !0);
    this.probabilistic && --c;
    return this.formatLabels(this.labels[c], this.returnLabels)
};
papaya.viewer.Atlas.prototype.readFinished = function() {
    this.parseTransform();
    this.parseLabels();
    this.parseDisplayColumns();
    this.maxLabels = this.findMaxLabelParts();
    this.probabilistic = this.atlasLabelData.atlas.header.type && (this.atlasLabelData.atlas.header.type.toLowerCase() === papaya.viewer.Atlas.PROBABILISTIC[0] || this.atlasLabelData.atlas.header.type.toLowerCase() === papaya.viewer.Atlas.PROBABILISTIC[1] || this.atlasLabelData.atlas.header.type.toLowerCase() === papaya.viewer.Atlas.PROBABILISTIC[2]);
    this.returnLabels = [];
    this.returnLabels.length = this.maxLabels;
    this.atlasLabelData.atlas.header.transformedname && (this.transformedname = this.atlasLabelData.atlas.header.transformedname);
    this.currentAtlas = this.name = this.atlasLabelData.atlas.header.name;
    var c = this.container.params.atlas;
    c && c === this.transformedname && (this.currentAtlas = this.transformedname);
    this.callback()
};
papaya.viewer.Atlas.prototype.parseDisplayColumns = function() {
    var c, a, d;
    if (this.atlasLabelData.atlas.header.display)
        for (this.displayColumns = [], c = 0, a = this.atlasLabelData.atlas.header.display.split(papaya.viewer.Atlas.LABEL_SPLIT_REGEX), d = 0; d < a.length; d += 1) "*" === a[d] && (this.displayColumns[c] = d, c += 1)
};
papaya.viewer.Atlas.prototype.parseTransform = function() {
    var c, a, d;
    if (this.atlasLabelData.atlas.header.transform && (c = this.atlasLabelData.atlas.header.transform.split(" "), this.transform = papaya.volume.Transform.IDENTITY.clone(), 16 === c.length))
        for (a = 0; 4 > a; a += 1)
            for (d = 0; 4 > d; d += 1) this.transform[a][d] = parseFloat(c[4 * a + d])
};
papaya.viewer.Atlas.prototype.parseLabels = function() {
    var c, a, d;
    for (c = 0; c < this.atlasLabelData.atlas.data.label.length; c += 1) d = this.atlasLabelData.atlas.data.label[c], a = d.index ? parseInt(d.index, 10) : c, this.labels[a] = d.content ? d.content : d
};
papaya.viewer.Atlas.prototype.formatLabels = function(c, a) {
    var d, b, e;
    if (c)
        if (b = c.split(papaya.viewer.Atlas.LABEL_SPLIT_REGEX), this.displayColumns)
            for (d = 0; d < b.length; d += 1) d < this.displayColumns.length && (a[d] = b[this.displayColumns[d]]);
        else
            for (e = b.length, d = 0, e > papaya.viewer.Atlas.MAX_LABELS && (d = e - papaya.viewer.Atlas.MAX_LABELS); d < b.length; d += 1) a[d] = b[d].trim();
    else
        for (d = 0; d < a.length; d += 1) a[d] = "";
    return a
};
papaya.viewer.Atlas.prototype.findMaxLabelParts = function() {
    var c, a;
    if (this.displayColumns) return this.displayColumns.length;
    a = [];
    for (c = 0; c < this.labels.length; c += 1) this.formatLabels(this.labels[c], a);
    return a.length
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
papaya.viewer.ColorTable = papaya.viewer.ColorTable || function(c, a, d) {
    var b = null,
        b = void 0 !== d ? d : papaya.viewer.ColorTable.findLUT(c);
    this.lutData = b.data;
    this.minLUT = this.maxLUT = 0;
    this.knotThresholds = [];
    this.knotRangeRatios = [];
    this.LUTarrayG = Array(256);
    this.LUTarrayR = Array(256);
    this.LUTarrayB = Array(256);
    this.isBaseImage = a;
    this.knotMin = this.lutData[0];
    this.knotMax = this.lutData[this.lutData.length - 1];
    this.useGradation = "undefined" === typeof b.gradation || b.gradation;
    this.updateLUT(papaya.viewer.ColorTable.LUT_MIN,
        papaya.viewer.ColorTable.LUT_MAX)
};
papaya.viewer.ColorTable.TABLE_GRAYSCALE = {
    name: "Grayscale",
    data: [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_SPECTRUM = {
    name: "Spectrum",
    data: [
        [0, 0, 0, 0],
        [.1, 0, 0, 1],
        [.33, 0, 1, 1],
        [.5, 0, 1, 0],
        [.66, 1, 1, 0],
        [.9, 1, 0, 0],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_RED2YELLOW = {
    name: "Overlay (Positives)",
    data: [
        [0, 1, 0, 0],
        [1, 1, 1, 0]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_BLUE2GREEN = {
    name: "Overlay (Negatives)",
    data: [
        [0, 0, 0, 1],
        [1, 0, 1, 0]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_HOTANDCOLD = {
    name: "Hot-and-Cold",
    data: [
        [0, 0, 0, 1],
        [.15, 0, 1, 1],
        [.3, 0, 1, 0],
        [.45, 0, 0, 0],
        [.5, 0, 0, 0],
        [.55, 0, 0, 0],
        [.7, 1, 1, 0],
        [.85, 1, 0, 0],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_GOLD = {
    name: "Gold",
    data: [
        [0, 0, 0, 0],
        [.13, .19, .03, 0],
        [.25, .39, .12, 0],
        [.38, .59, .26, 0],
        [.5, .8, .46, .08],
        [.63, .99, .71, .21],
        [.75, .99, .88, .34],
        [.88, .99, .99, .48],
        [1, .9, .95, .61]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_RED2WHITE = {
    name: "Red Overlay",
    data: [
        [0, .75, 0, 0],
        [.5, 1, .5, 0],
        [.95, 1, 1, 0],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_GREEN2WHITE = {
    name: "Green Overlay",
    data: [
        [0, 0, .75, 0],
        [.5, .5, 1, 0],
        [.95, 1, 1, 0],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_BLUE2WHITE = {
    name: "Blue Overlay",
    data: [
        [0, 0, 0, 1],
        [.5, 0, .5, 1],
        [.95, 0, 1, 1],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_DTI_SPECTRUM = {
    name: "Spectrum",
    data: [
        [0, 1, 0, 0],
        [.5, 0, 1, 0],
        [1, 0, 0, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.TABLE_FIRE = {
    name: "Fire",
    data: [
        [0, 0, 0, 0],
        [.06, 0, 0, .36],
        [.16, .29, 0, .75],
        [.22, .48, 0, .89],
        [.31, .68, 0, .6],
        [.37, .76, 0, .36],
        [.5, .94, .31, 0],
        [.56, 1, .45, 0],
        [.81, 1, .91, 0],
        [.88, 1, 1, .38],
        [1, 1, 1, 1]
    ],
    gradation: !0
};
papaya.viewer.ColorTable.ARROW_ICON = "data:image/gif;base64,R0lGODlhCwARAPfGMf//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAM+4AAN0AALsAAKoAAIgAAHcAAFUAAEQAACIAABEAAADuAADdAAC7AACqAACIAAB3AABVAABEAAAiAAARAAAA7gAA3QAAuwAAqgAAiAAAdwAAVQAARAAAIgAAEe7u7t3d3bu7u6qqqoiIiHd3d1VVVURERCIiIhEREQAAACH5BAEAAMYALAAAAAALABEAAAg/AI0JFGhvoEGC+vodRKgv4UF7DSMqZBixoUKIFSv2w5jRIseOGztK/JgxpMiEJDWmHHkSZUuTIvvt60ezps2AADs=";
papaya.viewer.ColorTable.ARROW_ICON_WIDTH = 11;
papaya.viewer.ColorTable.DEFAULT_COLOR_TABLE = papaya.viewer.ColorTable.TABLE_GRAYSCALE;
papaya.viewer.ColorTable.PARAMETRIC_COLOR_TABLES = [papaya.viewer.ColorTable.TABLE_RED2YELLOW, papaya.viewer.ColorTable.TABLE_BLUE2GREEN];
papaya.viewer.ColorTable.OVERLAY_COLOR_TABLES = [papaya.viewer.ColorTable.TABLE_RED2WHITE, papaya.viewer.ColorTable.TABLE_GREEN2WHITE, papaya.viewer.ColorTable.TABLE_BLUE2WHITE];
papaya.viewer.ColorTable.TABLE_ALL = [papaya.viewer.ColorTable.TABLE_GRAYSCALE, papaya.viewer.ColorTable.TABLE_SPECTRUM, papaya.viewer.ColorTable.TABLE_FIRE, papaya.viewer.ColorTable.TABLE_HOTANDCOLD, papaya.viewer.ColorTable.TABLE_GOLD, papaya.viewer.ColorTable.TABLE_RED2YELLOW, papaya.viewer.ColorTable.TABLE_BLUE2GREEN, papaya.viewer.ColorTable.TABLE_RED2WHITE, papaya.viewer.ColorTable.TABLE_GREEN2WHITE, papaya.viewer.ColorTable.TABLE_BLUE2WHITE];
papaya.viewer.ColorTable.LUT_MIN = 0;
papaya.viewer.ColorTable.LUT_MAX = 255;
papaya.viewer.ColorTable.ICON_SIZE = 18;
papaya.viewer.ColorTable.COLOR_BAR_WIDTH = 100;
papaya.viewer.ColorTable.COLOR_BAR_HEIGHT = 15;
papaya.viewer.ColorTable.findLUT = function(c) {
    var a;
    for (a = 0; a < papaya.viewer.ColorTable.TABLE_ALL.length; a += 1)
        if (papaya.viewer.ColorTable.TABLE_ALL[a].name == c) return papaya.viewer.ColorTable.TABLE_ALL[a];
    return papaya.viewer.ColorTable.TABLE_GRAYSCALE
};
papaya.viewer.ColorTable.addCustomLUT = function(c) {
    papaya.viewer.ColorTable.findLUT(c.name).data === papaya.viewer.ColorTable.TABLE_GRAYSCALE.data && papaya.viewer.ColorTable.TABLE_ALL.push(c)
};
papaya.viewer.ColorTable.prototype.updateMinLUT = function(c) {
    this.updateLUT(c, this.maxLUT)
};
papaya.viewer.ColorTable.prototype.updateMaxLUT = function(c) {
    this.updateLUT(this.minLUT, c)
};
papaya.viewer.ColorTable.prototype.updateLUT = function(c, a) {
    var d, b, e;
    this.maxLUT = a;
    this.minLUT = c;
    d = this.maxLUT - this.minLUT;
    for (b = 0; b < this.lutData.length; b += 1) this.knotThresholds[b] = this.lutData[b][0] * d + this.minLUT;
    for (b = 0; b < this.lutData.length - 1; b += 1) this.knotRangeRatios[b] = papaya.viewer.ColorTable.LUT_MAX / (this.knotThresholds[b + 1] - this.knotThresholds[b]);
    for (b = 0; 256 > b; b += 1)
        if (b <= this.minLUT) this.LUTarrayR[b] = this.knotMin[1] * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayG[b] = this.knotMin[2] * papaya.viewer.ColorTable.LUT_MAX,
            this.LUTarrayB[b] = this.knotMin[3] * papaya.viewer.ColorTable.LUT_MAX;
        else if (b > this.maxLUT) this.LUTarrayR[b] = this.knotMax[1] * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayG[b] = this.knotMax[2] * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayB[b] = this.knotMax[3] * papaya.viewer.ColorTable.LUT_MAX;
    else
        for (d = 0; d < this.lutData.length - 1; d += 1) b > this.knotThresholds[d] && b <= this.knotThresholds[d + 1] && (this.useGradation ? (e = ((b - this.knotThresholds[d]) * this.knotRangeRatios[d] + .5) / papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayR[b] =
            ((1 - e) * this.lutData[d][1] + e * this.lutData[d + 1][1]) * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayG[b] = ((1 - e) * this.lutData[d][2] + e * this.lutData[d + 1][2]) * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayB[b] = ((1 - e) * this.lutData[d][3] + e * this.lutData[d + 1][3]) * papaya.viewer.ColorTable.LUT_MAX) : (this.LUTarrayR[b] = this.lutData[d][1] * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayG[b] = this.lutData[d][2] * papaya.viewer.ColorTable.LUT_MAX, this.LUTarrayB[b] = this.lutData[d][3] * papaya.viewer.ColorTable.LUT_MAX))
};
papaya.viewer.ColorTable.prototype.lookupRed = function(c) {
    return 0 <= c && 256 > c ? this.LUTarrayR[c] & 255 : 0
};
papaya.viewer.ColorTable.prototype.lookupGreen = function(c) {
    return 0 <= c && 256 > c ? this.LUTarrayG[c] & 255 : 0
};
papaya.viewer.ColorTable.prototype.lookupBlue = function(c) {
    return 0 <= c && 256 > c ? this.LUTarrayB[c] & 255 : 0
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
papaya.viewer.Display = papaya.viewer.Display || function(c, a) {
    this.container = c;
    this.viewer = c.viewer;
    this.canvas = document.createElement("canvas");
    this.canvas.width = a;
    this.canvas.height = papaya.viewer.Display.SIZE;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.padding = 0;
    this.canvas.style.margin = 0;
    this.canvas.style.border = "none";
    this.canvas.style.cursor = "default";
    this.tempCoord = new papaya.core.Coordinate(0, 0, 0);
    this.drawingError = !1;
    this.progressStartTime = this.progress = 0;
    this.progressTimeout =
        null;
    this.drawingProgress = !1;
    this.errorMessage = "";
    this.drawUninitializedDisplay()
};
papaya.viewer.Display.SIZE = 50;
papaya.viewer.Display.MINI_LABELS_THRESH = 700;
papaya.viewer.Display.PADDING = 8;
papaya.viewer.Display.FONT_COLOR_WHITE = "white";
papaya.viewer.Display.FONT_COLOR_ORANGE = "rgb(182, 59, 0)";
papaya.viewer.Display.FONT_SIZE_COORDINATE_LABEL = 12;
papaya.viewer.Display.FONT_COLOR_COORDINATE_LABEL = papaya.viewer.Display.FONT_COLOR_WHITE;
papaya.viewer.Display.FONT_TYPE_COORDINATE_LABEL = "sans-serif";
papaya.viewer.Display.FONT_SIZE_COORDINATE_VALUE = 18;
papaya.viewer.Display.FONT_COLOR_COORDINATE_VALUE = papaya.viewer.Display.FONT_COLOR_ORANGE;
papaya.viewer.Display.FONT_TYPE_COORDINATE_VALUE = "sans-serif";
papaya.viewer.Display.PRECISION_COORDINATE_VALUE = 5;
papaya.viewer.Display.PRECISION_COORDINATE_MAX = 12;
papaya.viewer.Display.FONT_SIZE_IMAGE_VALUE = 20;
papaya.viewer.Display.FONT_COLOR_IMAGE_VALUE = papaya.viewer.Display.FONT_COLOR_WHITE;
papaya.viewer.Display.FONT_TYPE_IMAGE_VALUE = "sans-serif";
papaya.viewer.Display.PRECISION_IMAGE_VALUE = 9;
papaya.viewer.Display.PRECISION_IMAGE_MAX = 14;
papaya.viewer.Display.FONT_SIZE_ATLAS_MINI = 14;
papaya.viewer.Display.FONT_SIZE_ATLAS = 20;
papaya.viewer.Display.FONT_TYPE_ATLAS = "sans-serif";
papaya.viewer.Display.FONT_SIZE_MESSAGE_VALUE = 20;
papaya.viewer.Display.FONT_TYPE_MESSAGE_VALUE = "sans-serif";
papaya.viewer.Display.FONT_COLOR_MESSAGE = "rgb(200, 75, 25)";
papaya.viewer.Display.PROGRESS_LABEL_SUFFIX = ["...", "", ".", ".."];
papaya.viewer.Display.PROGRESS_LABEL_DEFAULT = "Loading";
papaya.viewer.Display.prototype.drawUninitializedDisplay = function() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
};
papaya.viewer.Display.prototype.canDraw = function() {
    return !(this.drawingError || this.drawingProgress)
};
papaya.viewer.Display.prototype.drawEmptyDisplay = function() {
    this.canDraw() ? (this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle = "#000000", this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)) : this.drawError && this.drawError(this.errorMessage)
};
papaya.viewer.Display.prototype.drawDisplay = function(c, a, d) {
    var b, e, g, h, f, l, k, p, r;
    if (this.canDraw()) {
        if (h = this.viewer.canvas.width / 600, p = this.viewer.canvas.width / 2, f = p / 5, g = this.canvas.height, r = 300 > p, "Mouse" !== this.container.preferences.atlasLocks && (c = this.viewer.currentCoord.x, a = this.viewer.currentCoord.y, d = this.viewer.currentCoord.z), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle = "#000000", this.context.fillRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle =
            papaya.viewer.Display.FONT_COLOR_COORDINATE_LABEL, this.context.font = papaya.viewer.Display.FONT_SIZE_COORDINATE_LABEL + "px " + papaya.viewer.Display.FONT_TYPE_COORDINATE_LABEL, b = papaya.viewer.Display.FONT_SIZE_COORDINATE_LABEL + .75 * papaya.viewer.Display.PADDING, this.context.fillText("x", 1.5 * papaya.viewer.Display.PADDING, b), this.context.fillText("y", 1.5 * papaya.viewer.Display.PADDING + f, b), this.context.fillText("z", 1.5 * papaya.viewer.Display.PADDING + 2 * f, b), b += papaya.viewer.Display.FONT_SIZE_COORDINATE_VALUE +
            papaya.viewer.Display.PADDING / 2, this.context.fillStyle = papaya.viewer.Display.FONT_COLOR_COORDINATE_VALUE, this.context.font = papaya.viewer.Display.FONT_SIZE_COORDINATE_VALUE - (r ? 2 : 0) + "px " + papaya.viewer.Display.FONT_TYPE_COORDINATE_VALUE, this.viewer.worldSpace ? (e = this.viewer.screenVolumes[0].volume.header.origin, l = this.viewer.screenVolumes[0].volume.header.voxelDimensions, k = Math.min(papaya.viewer.Display.PRECISION_COORDINATE_MAX, Math.round(papaya.viewer.Display.PRECISION_COORDINATE_VALUE * h)), this.context.fillText(parseFloat(((c -
                e.x) * l.xSize).toString().substr(0, k)), 1.5 * papaya.viewer.Display.PADDING, b), this.context.fillText(parseFloat(((e.y - a) * l.ySize).toString().substr(0, k)), 1.5 * papaya.viewer.Display.PADDING + f, b), this.context.fillText(parseFloat(((e.z - d) * l.zSize).toString().substr(0, k)), 1.5 * papaya.viewer.Display.PADDING + 2 * f, b)) : (this.context.fillText(Math.round(c).toString(), 1.5 * papaya.viewer.Display.PADDING, b), this.context.fillText(Math.round(a).toString(), 1.5 * papaya.viewer.Display.PADDING + f, b), this.context.fillText(Math.round(d).toString(),
                1.5 * papaya.viewer.Display.PADDING + 2 * f, b)), this.viewer.currentScreenVolume.rgb || this.viewer.currentScreenVolume.dti || (e = this.viewer.getCurrentValueAt(c, a, d), this.canvas.currentval = e.toString(), b = g / 2 + papaya.viewer.Display.FONT_SIZE_IMAGE_VALUE / 2 - papaya.viewer.Display.PADDING / 2, this.context.fillStyle = papaya.viewer.Display.FONT_COLOR_IMAGE_VALUE, this.context.font = papaya.viewer.Display.FONT_SIZE_IMAGE_VALUE - (r ? 2 : 0) + "px " + papaya.viewer.Display.FONT_TYPE_IMAGE_VALUE, k = Math.min(papaya.viewer.Display.PRECISION_IMAGE_MAX,
                Math.round(papaya.viewer.Display.PRECISION_IMAGE_VALUE * h)), this.context.fillText(parseFloat(e.toString().substr(0, k)), 2 * papaya.viewer.Display.PADDING + 3 * f, b)), this.viewer.atlas && (!this.viewer.atlas.volume || this.viewer.atlas.volume.isLoaded))
            if (papaya.Container.atlasWorldSpace ? (this.viewer.getWorldCoordinateAtIndex(c, a, d, this.tempCoord), d = this.viewer.atlas.getLabelAtCoordinate(this.tempCoord.x, this.tempCoord.y, this.tempCoord.z, c, a, d)) : d = this.viewer.atlas.getLabelAtCoordinate(c, a, d, c, a, d), c = d.length,
                k = Math.ceil(this.viewer.atlas.maxLabels / 2), 300 > p && 2 <= c)
                for (a = .75 * p, h = c - 1; 0 <= h; --h) this.context.fillStyle = h === c - 2 ? papaya.viewer.Display.FONT_COLOR_ORANGE : papaya.viewer.Display.FONT_COLOR_WHITE, this.context.font = papaya.viewer.Display.FONT_SIZE_ATLAS_MINI + "px " + papaya.viewer.Display.FONT_TYPE_ATLAS, f = this.context.measureText(d[h]), f.width > a - 2 * papaya.viewer.Display.PADDING && (d[h] = d[h].substr(0, Math.round(d[h].length / 3)) + " ... " + d[h].substr(d[h].length - 3, 3)), h === c - 2 ? this.context.fillText(d[h], p + .25 * p,
                    1.5 * papaya.viewer.Display.PADDING + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : h === c - 1 && this.context.fillText(d[h], p + .25 * p, papaya.viewer.Display.PADDING + g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2);
            else if (600 > p && 2 < c)
            for (a = p / 2, h = c - 1; 0 <= h; --h) this.context.fillStyle = h < k ? papaya.viewer.Display.FONT_COLOR_ORANGE : papaya.viewer.Display.FONT_COLOR_WHITE, this.context.font = papaya.viewer.Display.FONT_SIZE_ATLAS_MINI + "px " + papaya.viewer.Display.FONT_TYPE_ATLAS, f = this.context.measureText(d[h]), f.width > a -
                6 * papaya.viewer.Display.PADDING && (d[h] = d[h].substr(0, Math.round(d[h].length / 3)) + " ... " + d[h].substr(d[h].length - 3, 3)), 0 === h ? this.context.fillText(d[h], p + 5 * papaya.viewer.Display.PADDING, 1.5 * papaya.viewer.Display.PADDING + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 1 === h ? this.context.fillText(d[h], p + 5 * papaya.viewer.Display.PADDING, papaya.viewer.Display.PADDING + g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 2 === h ? this.context.fillText(d[h], 1.5 * p + 5 * papaya.viewer.Display.PADDING, 1.5 * papaya.viewer.Display.PADDING +
                    papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 3 === h && this.context.fillText(d[h], 1.5 * p + 5 * papaya.viewer.Display.PADDING, papaya.viewer.Display.PADDING + g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2);
        else if (800 > p && 3 < c)
            for (a = p / 3, h = 0; 4 > h; h += 1) 2 > h ? (this.context.fillStyle = h < k ? papaya.viewer.Display.FONT_COLOR_ORANGE : papaya.viewer.Display.FONT_COLOR_WHITE, this.context.font = papaya.viewer.Display.FONT_SIZE_ATLAS_MINI + "px " + papaya.viewer.Display.FONT_TYPE_ATLAS, f = this.context.measureText(d[h]), f.width > a - 6 *
                papaya.viewer.Display.PADDING && (d[h] = d[h].substr(0, Math.round(d[h].length / 3)) + " ... " + d[h].substr(d[h].length - 3, 3)), 0 === h ? this.context.fillText(d[h], p + 5 * papaya.viewer.Display.PADDING, 1.5 * papaya.viewer.Display.PADDING + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 1 === h ? this.context.fillText(d[h], p + 5 * papaya.viewer.Display.PADDING, papaya.viewer.Display.PADDING + g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 2 === h ? this.context.fillText(d[h], 1.5 * p + 5 * papaya.viewer.Display.PADDING, 1.5 * papaya.viewer.Display.PADDING +
                    papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2) : 3 === h && this.context.fillText(d[h], 1.5 * p + 5 * papaya.viewer.Display.PADDING, papaya.viewer.Display.PADDING + g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS_MINI / 2)) : (b = g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS / 2 - papaya.viewer.Display.PADDING / 2, this.context.fillStyle = h < k ? papaya.viewer.Display.FONT_COLOR_ORANGE : papaya.viewer.Display.FONT_COLOR_WHITE, this.context.font = papaya.viewer.Display.FONT_SIZE_ATLAS + "px " + papaya.viewer.Display.FONT_TYPE_ATLAS, f = this.context.measureText(d[h]),
                f.width > a - 2 * papaya.viewer.Display.PADDING && (d[h] = d[h].substr(0, Math.round(d[h].length / 3)) + " ... " + d[h].substr(d[h].length - 3, 3)), 2 === h ? this.context.fillText(d[h], p + papaya.viewer.Display.PADDING + a, b) : 3 === h && this.context.fillText(d[h], p + papaya.viewer.Display.PADDING + 2 * a, b));
        else
            for (a = p / c, b = g / 2 + papaya.viewer.Display.FONT_SIZE_ATLAS / 2 - papaya.viewer.Display.PADDING / 2, h = 0; h < c; h += 1) this.context.fillStyle = h < k ? papaya.viewer.Display.FONT_COLOR_ORANGE : papaya.viewer.Display.FONT_COLOR_WHITE, this.context.font =
                papaya.viewer.Display.FONT_SIZE_ATLAS - (r ? 4 : 0) + "px " + papaya.viewer.Display.FONT_TYPE_ATLAS, f = this.context.measureText(d[h]), f.width > a - 2 * papaya.viewer.Display.PADDING - .05 * p * Math.max(0, 3 - c) && (d[h] = d[h].substr(0, Math.round(d[h].length / 3)) + " ... " + d[h].substr(d[h].length - 3, 3)), this.context.fillText(d[h], p + papaya.viewer.Display.PADDING + .05 * p * Math.max(0, 3 - c) + h * a, b)
    } else this.drawError && this.drawError(this.errorMessage)
};
papaya.viewer.Display.prototype.drawError = function(c) {
    var a;
    this.errorMessage = c;
    this.drawingError = !0;
    a = this;
    window.setTimeout(papaya.utilities.ObjectUtils.bind(a, function() {
        a.drawingError = !1
    }), 3E3);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "red";
    this.context.font = papaya.viewer.Display.FONT_SIZE_MESSAGE_VALUE + "px " + papaya.viewer.Display.FONT_TYPE_MESSAGE_VALUE;
    this.context.fillText(c, papaya.viewer.Display.PADDING, papaya.viewer.Display.FONT_SIZE_COORDINATE_LABEL + papaya.viewer.Display.PADDING + 1.5 * papaya.viewer.Display.PADDING)
};
papaya.viewer.Display.prototype.drawProgress = function(c, a) {
    var d, b, e, g;
    d = Math.round(1E3 * c);
    d > this.progress && (this.progress = d, d = void 0 !== a ? a : papaya.viewer.Display.PROGRESS_LABEL_DEFAULT, e = 0 === this.progressStartTime ? this.progressStartTime = (new Date).getTime() : (new Date).getTime(), e = parseInt((e - this.progressStartTime) / 500, 10) % 4, 990 <= this.progress ? (this.progressTimeout && (window.clearTimeout(this.progressTimeout), this.progressTimeout = null), this.drawingProgress = !1, this.progressStartTime = this.progress = 0,
        this.drawEmptyDisplay()) : (this.progressTimeout && window.clearTimeout(this.progressTimeout), b = this, this.progressTimeout = window.setTimeout(papaya.utilities.ObjectUtils.bind(b, function() {
            b.drawingProgress = !1
        }), 3E3), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle = "#fff", this.context.fillRect(0, 0, this.canvas.width, this.canvas.height), this.context.fillStyle = "#000", this.context.fillRect(0, 0, this.canvas.width * c, this.canvas.height), this.context.font = papaya.viewer.Display.FONT_SIZE_MESSAGE_VALUE +
        "px " + papaya.viewer.Display.FONT_TYPE_MESSAGE_VALUE, this.context.fillStyle = papaya.viewer.Display.FONT_COLOR_MESSAGE, g = papaya.viewer.Display.FONT_SIZE_COORDINATE_LABEL + papaya.viewer.Display.PADDING + 1.5 * papaya.viewer.Display.PADDING, this.context.fillText(d + papaya.viewer.Display.PROGRESS_LABEL_SUFFIX[e], 2 * papaya.viewer.Display.PADDING, g)))
};
"use strict";
papaya = papaya || {};
papaya.volume = papaya.volume || {};
papaya.viewer.Preferences = papaya.viewer.Preferences || function() {
    this.viewer = null;
    this.showCrosshairs = papaya.viewer.Preferences.DEFAULT_SHOW_CROSSHAIRS;
    this.atlasLocks = papaya.viewer.Preferences.DEFAULT_ATLAS_LOCKS;
    this.showOrientation = papaya.viewer.Preferences.DEFAULT_SHOW_ORIENTATION;
    this.scrollBehavior = papaya.viewer.Preferences.DEFAULT_SCROLL;
    this.smoothDisplay = papaya.viewer.Preferences.DEFAULT_SMOOTH_DISPLAY;
    this.radiological = papaya.viewer.Preferences.DEFAULT_RADIOLOGICAL;
    this.showRuler = papaya.viewer.Preferences.DEFAULT_SHOW_RULER;
    this.surfaceBackgroundColor = papaya.viewer.Preferences.DEFAULT_SURFACE_BACKGROUND_COLOR;
    this.showSurfacePlanes = papaya.viewer.Preferences.DEFAULT_SHOW_SURFACE_PLANES;
    this.showSurfaceCrosshairs = papaya.viewer.Preferences.DEFAULT_SHOW_SURFACE_CROSSHAIRS
};
papaya.viewer.Preferences.ALL_PREFS = "showCrosshairs atlasLocks showOrientation scrollBehavior smoothDisplay radiological showRuler surfaceBackgroundColor showSurfacePlanes".split(" ");
papaya.viewer.Preferences.COOKIE_PREFIX = "papaya-";
papaya.viewer.Preferences.COOKIE_EXPIRY_DAYS = 365;
papaya.viewer.Preferences.DEFAULT_SHOW_CROSSHAIRS = "Yes";
papaya.viewer.Preferences.DEFAULT_ATLAS_LOCKS = "Mouse";
papaya.viewer.Preferences.DEFAULT_SHOW_ORIENTATION = "No";
papaya.viewer.Preferences.DEFAULT_SCROLL = "Increment Slice";
papaya.viewer.Preferences.DEFAULT_SMOOTH_DISPLAY = "Yes";
papaya.viewer.Preferences.DEFAULT_RADIOLOGICAL = "No";
papaya.viewer.Preferences.DEFAULT_SHOW_RULER = "No";
papaya.viewer.Preferences.DEFAULT_SURFACE_BACKGROUND_COLOR = "Gray";
papaya.viewer.Preferences.DEFAULT_SHOW_SURFACE_PLANES = "Yes";
papaya.viewer.Preferences.prototype.updatePreference = function(c, a) {
    this[c] = a;
    this.viewer.drawViewer(!0);
    papaya.utilities.UrlUtils.createCookie(papaya.viewer.Preferences.COOKIE_PREFIX + c, a, papaya.viewer.Preferences.COOKIE_EXPIRY_DAYS)
};
papaya.viewer.Preferences.prototype.readPreferences = function() {
    var c, a;
    for (c = 0; c < papaya.viewer.Preferences.ALL_PREFS.length; c += 1)(a = papaya.utilities.UrlUtils.readCookie(papaya.viewer.Preferences.COOKIE_PREFIX + papaya.viewer.Preferences.ALL_PREFS[c])) && (this[papaya.viewer.Preferences.ALL_PREFS[c]] = a)
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
papaya.viewer.ScreenSlice = papaya.viewer.ScreenSlice || function(c, a, d, b, e, g, h, f) {
    this.screenVolumes = h;
    this.sliceDirection = a;
    this.currentSlice = -1;
    this.xDim = d;
    this.yDim = b;
    this.xSize = e;
    this.ySize = g;
    this.canvasMain = document.createElement("canvas");
    this.canvasMain.width = this.xDim;
    this.canvasMain.height = this.yDim;
    this.contextMain = this.canvasMain.getContext("2d");
    this.imageDataDraw = this.contextMain.createImageData(this.xDim, this.yDim);
    this.screenDim = this.screenOffsetY = this.screenOffsetX = 0;
    this.screenTransform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.zoomTransform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.finalTransform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.radiologicalTransform = [
        [-1, 0, this.xDim],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.tempTransform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.tempTransform2 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.screenTransform2 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.finalTransform2 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.imageData = [];
    this.imageData2 = [];
    this.manager = f;
    this.rulerPoints = [new papaya.core.Point(parseInt(.25 * d), parseInt(.25 * b)), new papaya.core.Point(parseInt(.75 *
        d), parseInt(.75 * b))];
    this.tempPoint = new papaya.core.Point;
    this.contextDTILines = this.canvasDTILines = null
};
papaya.viewer.ScreenSlice.DIRECTION_UNKNOWN = 0;
papaya.viewer.ScreenSlice.DIRECTION_AXIAL = 1;
papaya.viewer.ScreenSlice.DIRECTION_CORONAL = 2;
papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL = 3;
papaya.viewer.ScreenSlice.DIRECTION_TEMPORAL = 4;
papaya.viewer.ScreenSlice.DIRECTION_SURFACE = 5;
papaya.viewer.ScreenSlice.SCREEN_PIXEL_MAX = 255;
papaya.viewer.ScreenSlice.SCREEN_PIXEL_MIN = 0;
papaya.viewer.ScreenSlice.GRAB_RADIUS = 5;
papaya.viewer.ScreenSlice.DTI_COLORS = ["#ff0000", "#00ff00", "#0000ff"];
papaya.viewer.ScreenSlice.prototype.updateSlice = function(c, a) {
    var d, b, e, g, h, f, l, k, p, r, u, z, y, x, D, B, w, L, C, I, M, F, t, E = !1,
        v, m = 0,
        n, H = !1,
        J = this.manager.isWorldMode();
    c = Math.round(c);
    v = this.manager.isRadiologicalMode() && this.isRadiologicalSensitive() ? -1 : 1;
    if (a || this.currentSlice !== c) {
        this.currentSlice = c;
        d = this.screenVolumes[0].volume.header.origin;
        b = this.screenVolumes[0].volume.header.voxelDimensions;
        this.contextMain.clearRect(0, 0, this.canvasMain.width, this.canvasMain.height);
        this.contextDTILines && this.contextDTILines.clearRect(0,
            0, this.screenDim, this.screenDim);
        this.imageData.length < this.screenVolumes.length && (this.imageData = papaya.utilities.ArrayUtils.createArray(this.screenVolumes.length, this.xDim * this.yDim), this.imageData2 = papaya.utilities.ArrayUtils.createArray(this.screenVolumes.length, 1));
        for (e = 0; e < this.screenVolumes.length; e += 1)
            if (!this.screenVolumes[e].hidden) {
                r = this.screenVolumes[e].currentTimepoint;
                u = this.screenVolumes[e].rgb;
                z = this.screenVolumes[e].dti;
                y = this.screenVolumes[e].dtiLines;
                H |= !y;
                L = this.screenVolumes[e].dtiColors;
                t = this.screenVolumes[e].dtiAlphaFactor;
                n = 0 === e || this.screenVolumes[e].interpolation;
                n &= "Yes" === this.manager.container.preferences.smoothDisplay;
                y && (this.updateDTILinesImage(), this.contextDTILines.lineWidth = 1, L || (this.contextDTILines.strokeStyle = papaya.viewer.ScreenSlice.DTI_COLORS[m], m += 1, m %= 3, this.contextDTILines.beginPath()));
                for (g = 0; g < this.yDim; g += 1)
                    for (h = 0; h < this.xDim; h += 1)(f = 0, l = 255, p = this.screenVolumes[e].alpha, u) ? (this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? f = this.screenVolumes[e].volume.getVoxelAtIndex(h,
                        g, c, r, !0) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? f = this.screenVolumes[e].volume.getVoxelAtIndex(h, c, g, r, !0) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (f = this.screenVolumes[e].volume.getVoxelAtIndex(c, h, g, r, !0)), k = 4 * (g * this.xDim + h), this.imageData[e][k] = f, this.imageDataDraw.data[k] = f >> 16 & 255, this.imageDataDraw.data[k + 1] = f >> 8 & 255, this.imageDataDraw.data[k + 2] = f & 255, this.imageDataDraw.data[k + 3] = l) : z ? (J ? (this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ?
                        (C = (h - d.x) * b.xSize, I = (d.y - g) * b.ySize, M = (d.z - c) * b.zSize) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (C = (h - d.x) * b.xSize, I = (d.y - c) * b.ySize, M = (d.z - g) * b.zSize) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (C = (c - d.x) * b.xSize, I = (d.y - h) * b.ySize, M = (d.z - g) * b.zSize), B = this.screenVolumes[e].volume.getVoxelAtCoordinate(C, I, M, 0, !n), x = this.screenVolumes[e].volume.getVoxelAtCoordinate(C, I, M, 1, !n), D = this.screenVolumes[e].volume.getVoxelAtCoordinate(C, I, M, 2, !n), this.screenVolumes[e].dtiVolumeMod &&
                        (p = Math.min(1, this.screenVolumes[e].dtiVolumeMod.getVoxelAtCoordinate(C, I, M, 0, !n)))) : (this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (C = h * b.xSize, I = g * b.ySize, M = c * b.zSize) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (C = h * b.xSize, I = c * b.ySize, M = g * b.zSize) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (C = c * b.xSize, I = h * b.ySize, M = g * b.zSize), B = this.screenVolumes[e].volume.getVoxelAtMM(C, I, M, 0, !n), x = this.screenVolumes[e].volume.getVoxelAtMM(C, I,
                        M, 1, !n), D = this.screenVolumes[e].volume.getVoxelAtMM(C, I, M, 2, !n), this.screenVolumes[e].dtiVolumeMod && (p = Math.min(1, this.screenVolumes[e].dtiVolumeMod.getVoxelAtMM(C, I, M, 0, !n)))), k = 4 * (g * this.xDim + h), y ? 0 !== B || 0 !== x || 0 !== D ? (this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (w = Math.atan2(v * x, B), F = Math.acos(Math.abs(D) / Math.sqrt(B * B + x * x + D * D))) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (w = Math.atan2(v * D, B), F = Math.acos(Math.abs(x) / Math.sqrt(B * B + x * x + D * D))) : this.sliceDirection ===
                        papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (w = Math.atan2(D, x), F = Math.acos(Math.abs(B) / Math.sqrt(B * B + x * x + D * D))), F = 1 - F / 1.5708, B = papayaRoundFast(Math.abs(255 * B)), x = papayaRoundFast(Math.abs(255 * x)), D = papayaRoundFast(Math.abs(255 * D)), f = papayaRoundFast(255 * p), f = (f & 255) << 24 | (B & 255) << 16 | (x & 255) << 8 | D & 255, L && (this.contextDTILines.beginPath(), l = f & 16777215, this.contextDTILines.strokeStyle = "#" + papaya.utilities.StringUtils.pad(l.toString(16), 6)), this.imageData[e][k] = w, this.imageData2[e][k] = f, p = Math.sin(w), f =
                        Math.cos(w), k = this.finalTransform2[0][2] + (h + .5) * this.finalTransform2[0][0], l = this.finalTransform2[1][2] + (g + .5) * this.finalTransform2[1][1], x = this.finalTransform2[0][2] + (h + .5 * F) * this.finalTransform2[0][0], D = this.finalTransform2[1][2] + (g + .5) * this.finalTransform2[1][1], B = f * (x - k) - p * (D - l) + k, x = p * (x - k) + f * (D - l) + l, this.contextDTILines.moveTo(B, x), x = this.finalTransform2[0][2] + (h + 1 - .5 * F) * this.finalTransform2[0][0], D = this.finalTransform2[1][2] + (g + .5) * this.finalTransform2[1][1], B = f * (x - k) - p * (D - l) + k, k = p * (x - k) + f *
                        (D - l) + l, this.contextDTILines.lineTo(B, k), L && this.contextDTILines.stroke()) : this.imageData[e][k] = Number.NaN : (p = 0 !== B || 0 !== x || 0 !== D ? 1 - (1 - p) * t : 0, B = papayaRoundFast(Math.abs(255 * B)), x = papayaRoundFast(Math.abs(255 * x)), D = papayaRoundFast(Math.abs(255 * D)), f = papayaRoundFast(255 * p), this.imageData[e][k] = (f & 255) << 24 | (B & 255) << 16 | (x & 255) << 8 | D & 255, E ? (this.imageDataDraw.data[k] = this.imageDataDraw.data[k] * (1 - p) + (B & 255) * p, this.imageDataDraw.data[k + 1] = this.imageDataDraw.data[k + 1] * (1 - p) + (x & 255) * p, this.imageDataDraw.data[k +
                        2] = this.imageDataDraw.data[k + 2] * (1 - p) + (D & 255) * p, this.imageDataDraw.data[k + 3] = l) : (this.imageDataDraw.data[k] = B & 255, this.imageDataDraw.data[k + 1] = x & 255, this.imageDataDraw.data[k + 2] = D & 255, this.imageDataDraw.data[k + 3] = f & 255))) : (J ? this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? f = this.screenVolumes[e].volume.getVoxelAtCoordinate((h - d.x) * b.xSize, (d.y - g) * b.ySize, (d.z - c) * b.zSize, r, !n) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? f = this.screenVolumes[e].volume.getVoxelAtCoordinate((h -
                            d.x) * b.xSize, (d.y - c) * b.ySize, (d.z - g) * b.zSize, r, !n) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (f = this.screenVolumes[e].volume.getVoxelAtCoordinate((c - d.x) * b.xSize, (d.y - h) * b.ySize, (d.z - g) * b.zSize, r, !n)) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? f = this.screenVolumes[e].volume.getVoxelAtMM(h * b.xSize, g * b.ySize, c * b.zSize, r, !n) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? f = this.screenVolumes[e].volume.getVoxelAtMM(h * b.xSize, c * b.ySize,
                            g * b.zSize, r, !n) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (f = this.screenVolumes[e].volume.getVoxelAtMM(c * b.xSize, h * b.ySize, g * b.zSize, r, !n)), k = 4 * (g * this.xDim + h), B = f, this.imageData[e][k] = f, !this.screenVolumes[e].negative && f <= this.screenVolumes[e].screenMin || this.screenVolumes[e].negative && f >= this.screenVolumes[e].screenMin || isNaN(f) ? (f = papaya.viewer.ScreenSlice.SCREEN_PIXEL_MIN, l = this.screenVolumes[e].isOverlay() ? 0 : 255) : f = !this.screenVolumes[e].negative && f >= this.screenVolumes[e].screenMax ||
                        this.screenVolumes[e].negative && f <= this.screenVolumes[e].screenMax ? papaya.viewer.ScreenSlice.SCREEN_PIXEL_MAX : papayaRoundFast((f - this.screenVolumes[e].screenMin) * this.screenVolumes[e].screenRatio), E) ? 0 < l && (this.imageDataDraw.data[k] = this.imageDataDraw.data[k] * (1 - p) + this.screenVolumes[e].colorTable.lookupRed(f, B) * p, this.imageDataDraw.data[k + 1] = this.imageDataDraw.data[k + 1] * (1 - p) + this.screenVolumes[e].colorTable.lookupGreen(f, B) * p, this.imageDataDraw.data[k + 2] = this.imageDataDraw.data[k + 2] * (1 - p) + this.screenVolumes[e].colorTable.lookupBlue(f,
                        B) * p, this.imageDataDraw.data[k + 3] = l) : (this.imageDataDraw.data[k] = this.screenVolumes[e].colorTable.lookupRed(f, B) * p, this.imageDataDraw.data[k + 1] = this.screenVolumes[e].colorTable.lookupGreen(f, B) * p, this.imageDataDraw.data[k + 2] = this.screenVolumes[e].colorTable.lookupBlue(f, B) * p, this.imageDataDraw.data[k + 3] = l);
                L || this.contextDTILines.stroke();
                y || (E = !0)
            } H && this.contextMain.putImageData(this.imageDataDraw, 0, 0)
    }
};
papaya.viewer.ScreenSlice.prototype.repaint = function(c, a, d) {
    var b, e, g, h;
    a = 0;
    var f, l, k, p, r, u, z, y, x, D;
    d = 0;
    var B = !1;
    this.currentSlice = c = Math.round(c);
    this.contextMain.clearRect(0, 0, this.canvasMain.width, this.canvasMain.height);
    this.contextDTILines && this.contextDTILines.clearRect(0, 0, this.screenDim, this.screenDim);
    if (this.imageData.length === this.screenVolumes.length) {
        for (c = 0; c < this.screenVolumes.length; c += 1)
            if (!this.screenVolumes[c].hidden) {
                l = this.screenVolumes[c].rgb;
                k = this.screenVolumes[c].dti;
                p = this.screenVolumes[c].dtiLines;
                D = this.screenVolumes[c].dtiColors;
                p && (this.contextDTILines.lineWidth = 1, D || (this.contextDTILines.strokeStyle = papaya.viewer.ScreenSlice.DTI_COLORS[d], d += 1, d %= 3, this.contextDTILines.beginPath()));
                for (b = 0; b < this.yDim; b += 1)
                    for (e = 0; e < this.xDim; e += 1)(g = this.imageData[c][a], h = 255, f = this.screenVolumes[c].alpha, a = 4 * (b * this.xDim + e), l) ? (this.imageDataDraw.data[a] = g >> 16 & 255, this.imageDataDraw.data[a + 1] = g >> 8 & 255, this.imageDataDraw.data[a + 2] = g & 255, this.imageDataDraw.data[a + 3] = h) : k ? p ? (h = this.imageData[c][a], isNaN(h) ||
                        (g = this.imageData2[c][a], x = g >> 16 & 255, y = g >> 8 & 255, u = g & 255, f = g & 16777215, this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? r = Math.acos(Math.abs(u) / Math.sqrt(x * x + y * y + u * u)) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? r = Math.acos(Math.abs(y) / Math.sqrt(x * x + y * y + u * u)) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (r = Math.acos(Math.abs(x) / Math.sqrt(x * x + y * y + u * u))), r = 1 - r / 1.5708, D && (this.contextDTILines.beginPath(), this.contextDTILines.strokeStyle = "#" + papaya.utilities.StringUtils.pad(f.toString(16),
                                6)), g = Math.sin(h), x = Math.cos(h), f = this.finalTransform2[0][2] + (e + .5) * this.finalTransform2[0][0], h = this.finalTransform2[1][2] + (b + .5) * this.finalTransform2[1][1], u = this.finalTransform2[0][2] + (e + .5 * r) * this.finalTransform2[0][0], z = this.finalTransform2[1][2] + (b + .5) * this.finalTransform2[1][1], y = x * (u - f) - g * (z - h) + f, u = g * (u - f) + x * (z - h) + h, this.contextDTILines.moveTo(y, u), u = this.finalTransform2[0][2] + (e + 1 - .5 * r) * this.finalTransform2[0][0], z = this.finalTransform2[1][2] + (b + .5) * this.finalTransform2[1][1], y = x * (u - f) - g *
                            (z - h) + f, g = g * (u - f) + x * (z - h) + h, this.contextDTILines.lineTo(y, g), D && this.contextDTILines.stroke())) : (g = this.imageData[c][a], f = g & 16777215, f = 0 !== f ? (g >> 24 & 255) / 255 : 0, B ? (this.imageDataDraw.data[a] = this.imageDataDraw.data[a] * (1 - f) + (g >> 16 & 255) * f, this.imageDataDraw.data[a + 1] = this.imageDataDraw.data[a + 1] * (1 - f) + (g >> 8 & 255) * f, this.imageDataDraw.data[a + 2] = this.imageDataDraw.data[a + 2] * (1 - f) + (g & 255) * f, this.imageDataDraw.data[a + 3] = h) : (this.imageDataDraw.data[a] = g >> 16 & 255, this.imageDataDraw.data[a + 1] = g >> 8 & 255, this.imageDataDraw.data[a +
                        2] = g & 255, this.imageDataDraw.data[a + 3] = g >> 24 & 255)) : (x = g = this.imageData[c][a], !this.screenVolumes[c].negative && g <= this.screenVolumes[c].screenMin || this.screenVolumes[c].negative && g >= this.screenVolumes[c].screenMin || isNaN(g) ? (g = papaya.viewer.ScreenSlice.SCREEN_PIXEL_MIN, h = this.screenVolumes[c].isOverlay() ? 0 : 255) : g = !this.screenVolumes[c].negative && g >= this.screenVolumes[c].screenMax || this.screenVolumes[c].negative && g <= this.screenVolumes[c].screenMax ? papaya.viewer.ScreenSlice.SCREEN_PIXEL_MAX : papayaRoundFast((g -
                        this.screenVolumes[c].screenMin) * this.screenVolumes[c].screenRatio), B) ? 0 < h && (this.imageDataDraw.data[a] = this.imageDataDraw.data[a] * (1 - f) + this.screenVolumes[c].colorTable.lookupRed(g, x) * f, this.imageDataDraw.data[a + 1] = this.imageDataDraw.data[a + 1] * (1 - f) + this.screenVolumes[c].colorTable.lookupGreen(g, x) * f, this.imageDataDraw.data[a + 2] = this.imageDataDraw.data[a + 2] * (1 - f) + this.screenVolumes[c].colorTable.lookupBlue(g, x) * f, this.imageDataDraw.data[a + 3] = h) : (this.imageDataDraw.data[a] = this.screenVolumes[c].colorTable.lookupRed(g,
                        x) * f, this.imageDataDraw.data[a + 1] = this.screenVolumes[c].colorTable.lookupGreen(g, x) * f, this.imageDataDraw.data[a + 2] = this.screenVolumes[c].colorTable.lookupBlue(g, x) * f, this.imageDataDraw.data[a + 3] = h);
                D || this.contextDTILines.stroke();
                p || (B = !0)
            } this.contextMain.putImageData(this.imageDataDraw, 0, 0)
    } else this.updateSlice(c, !0)
};
papaya.viewer.ScreenSlice.prototype.getRealWidth = function() {
    return this.xDim * this.xSize
};
papaya.viewer.ScreenSlice.prototype.getRealHeight = function() {
    return this.yDim * this.ySize
};
papaya.viewer.ScreenSlice.prototype.getXYratio = function() {
    return this.xSize / this.ySize
};
papaya.viewer.ScreenSlice.prototype.getYXratio = function() {
    return this.ySize / this.xSize
};
papaya.viewer.ScreenSlice.prototype.getXSize = function() {
    return this.xSize
};
papaya.viewer.ScreenSlice.prototype.getYSize = function() {
    return this.ySize
};
papaya.viewer.ScreenSlice.prototype.getXDim = function() {
    return this.xDim
};
papaya.viewer.ScreenSlice.prototype.getYDim = function() {
    return this.yDim
};
papaya.viewer.ScreenSlice.prototype.updateZoomTransform = function(c, a, d, b, e, g) {
    var h;
    a = (a + .5) * (c - 1) * -1;
    d = (d + .5) * (c - 1) * -1;
    b = a + b * (c - 1);
    h = -1 * (c - 1) * this.xDim;
    0 < b ? b = 0 : b < h && (b = h);
    e = d + e * (c - 1);
    h = -1 * (c - 1) * this.yDim;
    0 < e ? e = 0 : e < h && (e = h);
    1 < c && (this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (g.panAmountX = Math.round((b - a) / (c - 1)), g.panAmountY = Math.round((e - d) / (c - 1))) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (g.panAmountX = Math.round((b - a) / (c - 1)), g.panAmountZ = Math.round((e -
        d) / (c - 1))) : this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (g.panAmountY = Math.round((b - a) / (c - 1)), g.panAmountZ = Math.round((e - d) / (c - 1))));
    this.zoomTransform[0][0] = c;
    this.zoomTransform[0][1] = 0;
    this.zoomTransform[0][2] = b;
    this.zoomTransform[1][0] = 0;
    this.zoomTransform[1][1] = c;
    this.zoomTransform[1][2] = e;
    this.updateFinalTransform()
};
papaya.viewer.ScreenSlice.prototype.updateFinalTransform = function() {
    var c, a;
    if (this.manager.isRadiologicalMode() && this.isRadiologicalSensitive()) {
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.tempTransform[c][a] = this.screenTransform[c][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.tempTransform2[c][a] = this.tempTransform[c][0] * this.radiologicalTransform[0][a] + this.tempTransform[c][1] * this.radiologicalTransform[1][a] + this.tempTransform[c][2] * this.radiologicalTransform[2][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.finalTransform[c][a] =
                this.tempTransform2[c][0] * this.zoomTransform[0][a] + this.tempTransform2[c][1] * this.zoomTransform[1][a] + this.tempTransform2[c][2] * this.zoomTransform[2][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.tempTransform[c][a] = this.screenTransform2[c][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.tempTransform2[c][a] = this.tempTransform[c][0] * this.radiologicalTransform[0][a] + this.tempTransform[c][1] * this.radiologicalTransform[1][a] + this.tempTransform[c][2] * this.radiologicalTransform[2][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 >
                a; a += 1) this.finalTransform2[c][a] = this.tempTransform2[c][0] * this.zoomTransform[0][a] + this.tempTransform2[c][1] * this.zoomTransform[1][a] + this.tempTransform2[c][2] * this.zoomTransform[2][a]
    } else {
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.finalTransform[c][a] = this.screenTransform[c][0] * this.zoomTransform[0][a] + this.screenTransform[c][1] * this.zoomTransform[1][a] + this.screenTransform[c][2] * this.zoomTransform[2][a];
        for (c = 0; 3 > c; c += 1)
            for (a = 0; 3 > a; a += 1) this.finalTransform2[c][a] = this.screenTransform2[c][0] * this.zoomTransform[0][a] +
                this.screenTransform2[c][1] * this.zoomTransform[1][a] + this.screenTransform2[c][2] * this.zoomTransform[2][a]
    }
};
papaya.viewer.ScreenSlice.prototype.isRadiologicalSensitive = function() {
    return this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL || this.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL
};
papaya.viewer.ScreenSlice.prototype.findProximalRulerHandle = function(c, a) {
    this.tempPoint.x = c;
    this.tempPoint.y = a;
    return papaya.utilities.MathUtils.lineDistance(this.tempPoint.x, this.tempPoint.y, this.rulerPoints[0].x, this.rulerPoints[0].y) < papaya.viewer.ScreenSlice.GRAB_RADIUS ? this.rulerPoints[0] : papaya.utilities.MathUtils.lineDistance(this.tempPoint.x, this.tempPoint.y, this.rulerPoints[1].x, this.rulerPoints[1].y) < papaya.viewer.ScreenSlice.GRAB_RADIUS ? this.rulerPoints[1] : null
};
papaya.viewer.ScreenSlice.prototype.updateDTILinesImage = function() {
    if (null === this.canvasDTILines || this.canvasDTILines.width !== this.screenDim) this.canvasDTILines = document.createElement("canvas"), this.canvasDTILines.width = this.screenDim, this.canvasDTILines.height = this.screenDim, this.contextDTILines = this.canvasDTILines.getContext("2d")
};
papaya.viewer.ScreenSlice.prototype.clearDTILinesImage = function() {
    this.contextDTILines = this.canvasDTILines = null
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
papaya.viewer.ScreenVolume = papaya.viewer.ScreenVolume || function(c, a, d, b, e, g) {
    this.volume = c;
    this.lutName = d;
    this.colorTable = new papaya.viewer.ColorTable(this.lutName, b);
    this.screenMin = this.volume.header.imageRange.displayMin;
    this.screenMax = this.volume.header.imageRange.displayMax;
    this.imageMin = this.volume.header.imageRange.imageMin;
    this.imageMax = this.volume.header.imageRange.imageMax;
    this.alpha = 1;
    this.currentTimepoint = 0;
    this.parametric = void 0 !== e && e;
    this.negativeScreenVol = null;
    this.dtiLines = this.dti = !1;
    this.dtiColors = !0;
    this.dtiVolumeMod = null;
    this.dtiAlphaFactor = 1;
    this.rgb = this.volume.header.imageType.datatype === papaya.volume.ImageType.DATATYPE_RGB;
    this.hasCheckedImageRange = !1;
    this.interpolation = !0;
    this.error = null;
    this.hidden = !1;
    this.rotationZ = this.rotationY = this.rotationX = .5;
    this.rotationAbout = "Rotate About Center";
    this.isHighResSlice = 262144 < this.volume.header.imageDimensions.getNumVoxelsSlice();
    this.currentCoord = g;
    this.seriesLabels = this.volume.getSeriesLabels();
    this.staticIcon = null;
    (c = a[this.volume.fileName]) ?
    (c.icon && (this.staticIcon = c.icon), void 0 !== c.interpolation && (this.interpolation = c.interpolation), void 0 !== c.dti && ((this.dti = c.dti) && 3 !== this.volume.numTimepoints && (this.error = Error("DTI vector series must have 3 series points!")), this.dti && (this.dtiLines = c.dtiLines, this.dtiColors = c.dtiColors, this.dtiLines || this.dtiColors || (this.dtiColors = !0), this.initDTI())), void 0 !== c.min && void 0 !== c.max ? e ? (this.screenMin = -1 * Math.abs(c.min), this.screenMax = -1 * Math.abs(c.max)) : (this.screenMin = c.min, this.screenMax =
        c.max) : this.findDisplayRange(e, c), e ? void 0 !== c.negative_lut && (this.lutName = c.negative_lut, this.colorTable = new papaya.viewer.ColorTable(this.lutName, b)) : void 0 !== c.lut && ("string" === typeof c.lut || c.lut instanceof String ? (this.lutName = c.lut, this.colorTable = new papaya.viewer.ColorTable(this.lutName, b)) : (this.lutName = "Object", this.colorTable = c.lut)), void 0 === c.alpha || b || (this.alpha = c.alpha), c.labels && !this.seriesLabels && (this.seriesLabels = c.labels), b && (void 0 !== c.rotation && c.rotation.length && 3 === c.rotation.length &&
        (this.rotationX = (Math.min(Math.max(c.rotation[0], -90), 90) + 90) / 180, this.rotationY = (Math.min(Math.max(c.rotation[1], -90), 90) + 90) / 180, this.rotationZ = (Math.min(Math.max(c.rotation[2], -90), 90) + 90) / 180), c.rotationPoint && ("origin" === c.rotationPoint.toLowerCase() ? this.rotationAbout = "Rotate About Origin" : "crosshairs" === c.rotationPoint.toLowerCase() ? this.rotationAbout = "Rotate About Crosshairs" : this.rotationAbout = "Rotate About Center"), this.updateTransform())) : this.findDisplayRange(e, {});
    this.negative = !1;
    this.updateScreenRange();
    this.canvasIcon = document.createElement("canvas");
    this.canvasIcon.width = papaya.viewer.ColorTable.ICON_SIZE;
    this.canvasIcon.height = papaya.viewer.ColorTable.ICON_SIZE;
    this.contextIcon = this.canvasIcon.getContext("2d");
    this.imageDataIcon = this.contextIcon.createImageData(papaya.viewer.ColorTable.ICON_SIZE, papaya.viewer.ColorTable.ICON_SIZE);
    this.icon = null;
    this.canvasBar = document.createElement("canvas");
    this.canvasBar.width = papaya.viewer.ColorTable.COLOR_BAR_WIDTH;
    this.canvasBar.height = papaya.viewer.ColorTable.COLOR_BAR_HEIGHT;
    this.contextBar = this.canvasBar.getContext("2d");
    this.imageDataBar = this.contextBar.createImageData(papaya.viewer.ColorTable.COLOR_BAR_WIDTH, papaya.viewer.ColorTable.COLOR_BAR_HEIGHT);
    this.colorBar = null;
    this.originalScreenMin = this.screenMin;
    this.originalScreenMax = this.screenMax;
    this.updateIcon();
    this.updateColorBar()
};
papaya.viewer.ScreenVolume.makeSolidIcon = function(c, a, d) {
    var b = document.createElement("canvas");
    b.width = papaya.viewer.ColorTable.ICON_SIZE;
    b.height = papaya.viewer.ColorTable.ICON_SIZE;
    var e = b.getContext("2d");
    e.fillStyle = "rgb(" + parseInt(255 * c, 10) + "," + parseInt(255 * a, 10) + "," + parseInt(255 * d, 10) + ")";
    e.fillRect(0, 0, papaya.viewer.ColorTable.ICON_SIZE, papaya.viewer.ColorTable.ICON_SIZE);
    return b.toDataURL()
};
papaya.viewer.ScreenVolume.makeStaticIcon = function(c, a, d) {
    var b = new Image(papaya.viewer.ColorTable.ICON_SIZE, papaya.viewer.ColorTable.ICON_SIZE),
        e = document.createElement("canvas");
    e.width = papaya.viewer.ColorTable.ICON_SIZE;
    e.height = papaya.viewer.ColorTable.ICON_SIZE;
    var g = e.getContext("2d");
    b.onload = function() {
        g.drawImage(b, 0, 0, b.naturalWidth, b.naturalHeight, 0, 0, papaya.viewer.ColorTable.ICON_SIZE, papaya.viewer.ColorTable.ICON_SIZE);
        a(e.toDataURL(), d)
    };
    b.src = c
};
papaya.viewer.ScreenVolume.prototype.setScreenRange = function(c, a) {
    this.screenMin = c;
    this.screenMax = a;
    this.updateScreenRange()
};
papaya.viewer.ScreenVolume.prototype.resetScreenRange = function() {
    this.screenMin = this.originalScreenMin;
    this.screenMax = this.originalScreenMax;
    this.updateScreenRange()
};
papaya.viewer.ScreenVolume.prototype.setScreenRangeNegatives = function(c, a) {
    this.negativeScreenVol.setScreenRange(c, a)
};
papaya.viewer.ScreenVolume.prototype.updateScreenRange = function() {
    this.screenRatio = papaya.viewer.ScreenSlice.SCREEN_PIXEL_MAX / (this.screenMax - this.screenMin);
    this.negative = this.screenMax < this.screenMin
};
papaya.viewer.ScreenVolume.prototype.isOverlay = function() {
    return !this.colorTable.isBaseImage
};
papaya.viewer.ScreenVolume.prototype.findImageRange = function() {
    var c, a, d, b, e, g, h, f, l;
    if (this.volume.header.imageRange.imageMin === this.volume.header.imageRange.imageMax && !this.hasCheckedImageRange) {
        this.hasCheckedImageRange = !0;
        c = Number.MAX_VALUE;
        a = Number.MIN_VALUE;
        d = this.volume.header.imageDimensions.xDim;
        b = this.volume.header.imageDimensions.yDim;
        e = this.volume.header.imageDimensions.zDim;
        for (g = 0; g < e; g += 1)
            for (h = 0; h < b; h += 1)
                for (f = 0; f < d; f += 1) l = this.volume.getVoxelAtIndexNative(f, h, g, 0, !0), l > a && (a = l), l <
                    c && (c = l);
        this.volume.header.imageRange.imageMin = this.imageMin = c;
        this.volume.header.imageRange.imageMax = this.imageMax = a
    }
};
papaya.viewer.ScreenVolume.prototype.findDisplayRange = function(c, a) {
    var d, b, e, g;
    d = this.volume.header.imageRange.imageMin !== this.volume.header.imageRange.imageMax;
    b = this.screenMin;
    e = this.screenMax;
    c && Math.abs(b) > Math.abs(e) && (g = e, e = b, b = g);
    if (c || void 0 === a.minPercent && void 0 === a.maxPercent)
        if (this.isOverlay()) {
            if (b === e || 0 > b && 0 < e || 0 < b && 0 > e || c && (0 < b || 0 < e) || a.symmetric) this.findImageRange(), c ? a.symmetric || 0 === this.imageMin ? (b = -1 * (this.imageMax - .75 * this.imageMax), e = -1 * (this.imageMax - .25 * this.imageMax)) :
                (b = this.imageMin - .75 * this.imageMin, e = this.imageMin - .25 * this.imageMin) : (b = this.imageMax - .75 * this.imageMax, e = this.imageMax - .25 * this.imageMax);
            1 > b && -1 < b && 1 > e && -1 < e || (b = Math.round(b), e = Math.round(e))
        } else 1 > b && -1 < b && 1 > e && -1 < e || (b = Math.round(b), e = Math.round(e)), 0 === b && 0 === e && (this.findImageRange(), b = this.imageMin, e = this.imageMax), e <= b && (this.findImageRange(), b = this.imageMin, e = this.imageMax), d && b < this.imageMin && (this.findImageRange(), b = this.imageMin), d && e > this.imageMax && (this.findImageRange(), e = this.imageMax);
    else this.findImageRange(), b = void 0 !== a.minPercent ? this.imageMax * a.minPercent : this.imageMin, e = void 0 !== a.maxPercent ? this.imageMax * a.maxPercent : this.imageMax;
    this.screenMin = b;
    this.screenMax = e
};
papaya.viewer.ScreenVolume.prototype.isUsingColorTable = function(c) {
    return this.lutName === c
};
papaya.viewer.ScreenVolume.prototype.isRotatingAbout = function(c) {
    return this.rotationAbout === c
};
papaya.viewer.ScreenVolume.prototype.changeColorTable = function(c, a) {
    this.colorTable = new papaya.viewer.ColorTable(a, !this.isOverlay());
    this.lutName = a;
    this.updateIcon();
    this.updateColorBar();
    c.drawViewer(!0)
};
papaya.viewer.ScreenVolume.prototype.getRange = function() {
    var c = Array(2);
    c[0] = this.colorTable.minLUT / (255 / (this.screenMax - this.screenMin)) + this.screenMin;
    c[1] = this.colorTable.maxLUT / (255 / (this.screenMax - this.screenMin)) + this.screenMin;
    return c
};
papaya.viewer.ScreenVolume.prototype.getRangeNegative = function() {
    return this.negativeScreenVol.getRange()
};
papaya.viewer.ScreenVolume.prototype.getAlphaNegative = function() {
    return this.negativeScreenVol.alpha
};
papaya.viewer.ScreenVolume.prototype.incrementTimepoint = function() {
    var c = this.volume.numTimepoints;
    this.currentTimepoint += 1;
    this.currentTimepoint >= c && (this.currentTimepoint = c - 1)
};
papaya.viewer.ScreenVolume.prototype.decrementTimepoint = function() {
    --this.currentTimepoint;
    0 > this.currentTimepoint && (this.currentTimepoint = 0)
};
papaya.viewer.ScreenVolume.prototype.setTimepoint = function(c) {
    this.currentTimepoint = 0 > c ? 0 : c >= this.volume.numTimepoints ? this.volume.numTimepoints - 1 : c
};
papaya.viewer.ScreenVolume.prototype.updateMinLUT = function(c) {
    this.colorTable.updateMinLUT(c)
};
papaya.viewer.ScreenVolume.prototype.updateMaxLUT = function(c) {
    this.colorTable.updateMaxLUT(c)
};
papaya.viewer.ScreenVolume.prototype.updateLUT = function(c, a) {
    this.colorTable.updateLUT(c, a)
};
papaya.viewer.ScreenVolume.prototype.supportsDynamicColorTable = function() {
    return void 0 !== this.colorTable.updateMinLUT && void 0 !== this.colorTable.updateMaxLUT && void 0 !== this.colorTable.updateLUT
};
papaya.viewer.ScreenVolume.prototype.resetDynamicRange = function() {
    this.colorTable.minLUT = 0;
    this.colorTable.maxLUT = papaya.viewer.ColorTable.LUT_MAX;
    this.updateLUT(this.colorTable.minLUT, this.colorTable.maxLUT);
    this.updateColorBar()
};
papaya.viewer.ScreenVolume.prototype.getCurrentTime = function() {
    return this.currentTimepoint * this.volume.header.voxelDimensions.timeSize * this.volume.header.voxelDimensions.getTemporalUnitMultiplier()
};
papaya.viewer.ScreenVolume.prototype.setCurrentTime = function(c) {
    var a = this.volume.header.voxelDimensions.timeSize * this.volume.header.voxelDimensions.getTemporalUnitMultiplier();
    0 === a ? this.setTimepoint(0) : this.setTimepoint(parseInt(Math.round(c / a), 10))
};
papaya.viewer.ScreenVolume.prototype.hasError = function() {
    return null !== this.error
};
papaya.viewer.ScreenVolume.prototype.initDTI = function() {
    this.volume.numTimepoints = 1;
    this.volume.header.imageDimensions.timepoints = 1;
    this.colorTable = new papaya.viewer.ColorTable(this.lutName, !1, papaya.viewer.ColorTable.TABLE_DTI_SPECTRUM);
    this.volume.transform.voxelValue.forceABS = !this.dtiLines;
    this.updateIcon()
};
papaya.viewer.ScreenVolume.prototype.isDTILines = function() {
    return this.dtiLines && !this.dtiColors
};
papaya.viewer.ScreenVolume.prototype.isDTIRGB = function() {
    return !this.dtiLines && this.dtiColors
};
papaya.viewer.ScreenVolume.prototype.isDTILinesAndRGB = function() {
    return this.dtiLines && this.dtiColors
};
papaya.viewer.ScreenVolume.prototype.getHiddenLabel = function() {
    return this.hidden ? "Show Overlay" : "Hide Overlay"
};
papaya.viewer.ScreenVolume.prototype.updateIcon = function() {
    var c, a, d, b, e;
    if (this.staticIcon) {
        var g = this;
        papaya.viewer.ScreenVolume.makeStaticIcon(this.staticIcon, function(a) {
            g.icon = a
        })
    } else if (this.imageDataIcon) {
        c = papaya.viewer.ColorTable.LUT_MAX / papaya.viewer.ColorTable.ICON_SIZE;
        for (a = 0; a < papaya.viewer.ColorTable.ICON_SIZE; a += 1)
            for (d = 0; d < papaya.viewer.ColorTable.ICON_SIZE; d += 1) b = 4 * (a * papaya.viewer.ColorTable.ICON_SIZE + d), e = Math.round(d * c), this.imageDataIcon.data[b] = this.colorTable.lookupRed(e),
                this.imageDataIcon.data[b + 1] = this.colorTable.lookupGreen(e), this.imageDataIcon.data[b + 2] = this.colorTable.lookupBlue(e), this.imageDataIcon.data[b + 3] = 255;
        this.contextIcon.putImageData(this.imageDataIcon, 0, 0);
        this.icon = this.canvasIcon.toDataURL()
    }
};
papaya.viewer.ScreenVolume.prototype.updateColorBar = function() {
    var c, a, d, b, e;
    if (this.imageDataBar) {
        c = papaya.viewer.ColorTable.LUT_MAX / papaya.viewer.ColorTable.COLOR_BAR_WIDTH;
        for (a = 0; a < papaya.viewer.ColorTable.COLOR_BAR_HEIGHT; a += 1)
            for (d = 0; d < papaya.viewer.ColorTable.COLOR_BAR_WIDTH; d += 1) b = 4 * (a * papaya.viewer.ColorTable.COLOR_BAR_WIDTH + d), e = Math.round(d * c), this.imageDataBar.data[b] = this.colorTable.lookupRed(e), this.imageDataBar.data[b + 1] = this.colorTable.lookupGreen(e), this.imageDataBar.data[b + 2] = this.colorTable.lookupBlue(e),
                this.imageDataBar.data[b + 3] = 255;
        this.contextBar.putImageData(this.imageDataBar, 0, 0);
        this.colorBar = this.canvasBar.toDataURL()
    }
};
papaya.viewer.ScreenVolume.prototype.updateTransform = function() {
    var c = 180 * (this.rotationX - .5),
        a = 180 * (this.rotationY - .5),
        d = 180 * (this.rotationZ - .5),
        b, e, g;
    "Rotate About Origin" === this.rotationAbout ? (b = this.volume.header.origin.x * this.volume.header.voxelDimensions.xSize, e = this.volume.header.origin.y * this.volume.header.voxelDimensions.ySize, g = this.volume.header.origin.z * this.volume.header.voxelDimensions.zSize) : "Rotate About Crosshairs" === this.rotationAbout ? (b = this.currentCoord.x * this.volume.header.voxelDimensions.xSize,
        e = this.currentCoord.y * this.volume.header.voxelDimensions.ySize, g = this.currentCoord.z * this.volume.header.voxelDimensions.zSize) : (b = this.volume.header.imageDimensions.xDim / 2 * this.volume.header.voxelDimensions.xSize, e = this.volume.header.imageDimensions.yDim / 2 * this.volume.header.voxelDimensions.ySize, g = this.volume.header.imageDimensions.zDim / 2 * this.volume.header.voxelDimensions.zSize);
    this.volume.transform.updateImageMat(b, e, g, c, a, d)
};
papaya.viewer.ScreenVolume.prototype.resetTransform = function() {
    this.rotationZ = this.rotationY = this.rotationX = .5
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
var PAPAYA_BUILD_NUM = PAPAYA_BUILD_NUM || "0";
papaya.viewer.Viewer = papaya.viewer.Viewer || function(c, a, d, b) {
    this.container = c;
    this.canvas = document.createElement("canvas");
    this.canvas.width = a;
    this.canvas.height = d;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.padding = 0;
    this.canvas.style.margin = 0;
    this.canvas.style.border = "none";
    this.atlas = null;
    this.pageLoaded = this.initialized = !1;
    this.loadingVolume = null;
    this.volume = new papaya.volume.Volume(this.container.display, this);
    this.screenVolumes = [];
    this.surfaces = [];
    this.lowerImageTop = this.lowerImageBot =
        this.lowerImageBot2 = this.mainImage = this.selectedSlice = this.surfaceView = this.sagittalSlice = this.coronalSlice = this.axialSlice = this.currentScreenVolume = null;
    this.viewerDim = 0;
    this.ignoreSync = this.worldSpace = !1;
    this.currentCoord = new papaya.core.Coordinate(0, 0, 0);
    this.cursorPosition = new papaya.core.Coordinate(0, 0, 0);
    this.draggingSliceDir = this.longestDimSize = this.longestDim = 0;
    this.isLongTouch = this.didLongTouch = this.isPanning = this.isContextMode = this.isZoomMode = this.isWindowControl = this.isDragging = !1;
    this.zoomFactorPrevious =
        this.zoomFactor = papaya.viewer.Viewer.ZOOM_FACTOR_MIN;
    this.panAmountZ = this.panAmountY = this.panAmountX = this.panLocZ = this.panLocY = this.panLocX = this.zoomLocZ = this.zoomLocY = this.zoomLocX = 0;
    this.keyPressIgnored = !1;
    this.previousMousePosition = new papaya.core.Point;
    this.isShiftKeyDown = this.isAltKeyDown = this.isControlKeyDown = !1;
    this.toggleMainCrosshairs = !0;
    this.bgColor = null;
    this.loadingDTI = this.controlsHidden = this.hasSeries = !1;
    this.loadingDTIModRef = null;
    this.tempCoor = new papaya.core.Coordinate;
    this.listenerContextMenu =
        function(a) {
            a.preventDefault();
            return !1
        };
    this.listenerMouseMove = papaya.utilities.ObjectUtils.bind(this, this.mouseMoveEvent);
    this.listenerMouseDown = papaya.utilities.ObjectUtils.bind(this, this.mouseDownEvent);
    this.listenerMouseOut = papaya.utilities.ObjectUtils.bind(this, this.mouseOutEvent);
    this.listenerMouseLeave = papaya.utilities.ObjectUtils.bind(this, this.mouseLeaveEvent);
    this.listenerMouseUp = papaya.utilities.ObjectUtils.bind(this, this.mouseUpEvent);
    this.listenerMouseDoubleClick = papaya.utilities.ObjectUtils.bind(this,
        this.mouseDoubleClickEvent);
    this.listenerKeyDown = papaya.utilities.ObjectUtils.bind(this, this.keyDownEvent);
    this.listenerKeyUp = papaya.utilities.ObjectUtils.bind(this, this.keyUpEvent);
    this.listenerTouchMove = papaya.utilities.ObjectUtils.bind(this, this.touchMoveEvent);
    this.listenerTouchStart = papaya.utilities.ObjectUtils.bind(this, this.touchStartEvent);
    this.listenerTouchEnd = papaya.utilities.ObjectUtils.bind(this, this.touchEndEvent);
    this.initialCoordinate = null;
    this.listenerScroll = papaya.utilities.ObjectUtils.bind(this,
        this.scrolled);
    this.updateTimerEvent = this.updateTimer = this.longTouchTimer = null;
    this.drawEmptyViewer();
    this.processParams(b)
};
papaya.viewer.Viewer.GAP = PAPAYA_SPACING;
papaya.viewer.Viewer.BACKGROUND_COLOR = "rgba(0, 0, 0, 255)";
papaya.viewer.Viewer.CROSSHAIRS_COLOR = "rgba(28, 134, 238, 255)";
papaya.viewer.Viewer.KEYCODE_ROTATE_VIEWS = 32;
papaya.viewer.Viewer.KEYCODE_CENTER = 67;
papaya.viewer.Viewer.KEYCODE_ORIGIN = 79;
papaya.viewer.Viewer.KEYCODE_ARROW_UP = 38;
papaya.viewer.Viewer.KEYCODE_ARROW_DOWN = 40;
papaya.viewer.Viewer.KEYCODE_ARROW_RIGHT = 39;
papaya.viewer.Viewer.KEYCODE_ARROW_LEFT = 37;
papaya.viewer.Viewer.KEYCODE_PAGE_UP = 33;
papaya.viewer.Viewer.KEYCODE_PAGE_DOWN = 34;
papaya.viewer.Viewer.KEYCODE_SINGLE_QUOTE = 222;
papaya.viewer.Viewer.KEYCODE_FORWARD_SLASH = 191;
papaya.viewer.Viewer.KEYCODE_INCREMENT_MAIN = 71;
papaya.viewer.Viewer.KEYCODE_DECREMENT_MAIN = 86;
papaya.viewer.Viewer.KEYCODE_TOGGLE_CROSSHAIRS = 65;
papaya.viewer.Viewer.KEYCODE_SERIES_BACK = 188;
papaya.viewer.Viewer.KEYCODE_SERIES_FORWARD = 190;
papaya.viewer.Viewer.KEYCODE_RULER = 82;
papaya.viewer.Viewer.MAX_OVERLAYS = 8;
papaya.viewer.Viewer.ORIENTATION_MARKER_SUPERIOR = "S";
papaya.viewer.Viewer.ORIENTATION_MARKER_INFERIOR = "I";
papaya.viewer.Viewer.ORIENTATION_MARKER_ANTERIOR = "A";
papaya.viewer.Viewer.ORIENTATION_MARKER_POSTERIOR = "P";
papaya.viewer.Viewer.ORIENTATION_MARKER_LEFT = "L";
papaya.viewer.Viewer.ORIENTATION_MARKER_RIGHT = "R";
papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE = 16;
papaya.viewer.Viewer.ORIENTATION_CERTAINTY_UNKNOWN_COLOR = "red";
papaya.viewer.Viewer.ORIENTATION_CERTAINTY_LOW_COLOR = "yellow";
papaya.viewer.Viewer.ORIENTATION_CERTAINTY_HIGH_COLOR = "white";
papaya.viewer.Viewer.UPDATE_TIMER_INTERVAL = 250;
papaya.viewer.Viewer.ZOOM_FACTOR_MAX = 10;
papaya.viewer.Viewer.ZOOM_FACTOR_MIN = 1;
papaya.viewer.Viewer.MOUSE_SCROLL_THRESHLD = .25;
papaya.viewer.Viewer.TITLE_MAX_LENGTH = 30;
papaya.viewer.Viewer.validDimBounds = function(c, a) {
    return c < a ? c : a - 1
};
papaya.viewer.Viewer.getKeyCode = function(c) {
    return c.keyCode || c.charCode
};
papaya.viewer.Viewer.isControlKey = function(c) {
    c = papaya.viewer.Viewer.getKeyCode(c);
    return "MacOS" !== papaya.utilities.PlatformUtils.os || 91 !== c && 93 !== c && 224 !== c ? "MacOS" !== papaya.utilities.PlatformUtils.os && 17 === c : !0
};
papaya.viewer.Viewer.isAltKey = function(c) {
    return 18 === papaya.viewer.Viewer.getKeyCode(c)
};
papaya.viewer.Viewer.isShiftKey = function(c) {
    c = !!c.shiftKey;
    !c && window.event && (c = !!window.event.shiftKey);
    return c
};
papaya.viewer.Viewer.getOffsetRect = function(c) {
    c = c.getBoundingClientRect();
    var a = document.body,
        d = document.documentElement,
        b = c.left + (window.pageXOffset || d.scrollLeft) - (d.clientLeft || a.clientLeft || 0);
    return {
        top: Math.round(c.top + (window.pageYOffset || d.scrollTop) - (d.clientTop || a.clientTop || 0)),
        left: Math.round(b)
    }
};
papaya.viewer.Viewer.drawRoundRect = function(c, a, d, b, e, g, h, f) {
    "undefined" === typeof f && (f = !0);
    "undefined" === typeof g && (g = 5);
    c.beginPath();
    c.moveTo(a + g, d);
    c.lineTo(a + b - g, d);
    c.quadraticCurveTo(a + b, d, a + b, d + g);
    c.lineTo(a + b, d + e - g);
    c.quadraticCurveTo(a + b, d + e, a + b - g, d + e);
    c.lineTo(a + g, d + e);
    c.quadraticCurveTo(a, d + e, a, d + e - g);
    c.lineTo(a, d + g);
    c.quadraticCurveTo(a, d, a + g, d);
    c.closePath();
    f && c.stroke();
    h && c.fill()
};
papaya.viewer.Viewer.prototype.loadImage = function(c, a, d, b) {
    0 === this.screenVolumes.length ? this.loadBaseImage(c, a, d, b) : this.loadOverlay(c, a, d, b)
};
papaya.viewer.Viewer.prototype.showDialog = function(c, a, d, b, e) {
    var g, h = -1;
    for (g = 0; g < papayaContainers.length; g += 1)
        if (papayaContainers[g] === this.container) {
            h = g;
            break
        }(new papaya.ui.Dialog(this.container, c, a, d, b, e, h)). showDialog()
};
papaya.viewer.Viewer.prototype.loadBaseImage = function(c, a, d, b) {
    var e = [],
        g = this.container.findLoadableImages(c);
    this.volume = new papaya.volume.Volume(this.container.display, this, this.container.params);
    if (b) {
        if (g && g.length)
            for (c = 0; c < g.length; c += 1) e.push(g[c].encode);
        else Array.isArray(c) || (c = [c]), e = c;
        this.volume.readBinaryData(e, papaya.utilities.ObjectUtils.bind(this, this.initializeViewer))
    } else if (d) {
        if (g)
            for (c = 0; c < g.length; c += 1) e.push(g[c].encode);
        else e = c;
        this.volume.readEncodedData(e, papaya.utilities.ObjectUtils.bind(this,
            this.initializeViewer))
    } else if (null !== g && void 0 !== g[0].encode) {
        for (c = 0; c < g.length; c += 1) e.push(g[c].encode);
        this.volume.readEncodedData(e, papaya.utilities.ObjectUtils.bind(this, this.initializeViewer))
    } else if (a) this.volume.readURLs(c, papaya.utilities.ObjectUtils.bind(this, this.initializeViewer));
    else if (null !== g && void 0 !== g[0].url) {
        if (g)
            for (c = 0; c < g.length; c += 1) e.push(g[c].url);
        this.volume.readURLs(e, papaya.utilities.ObjectUtils.bind(this, this.initializeViewer))
    } else this.volume.readFiles(c, papaya.utilities.ObjectUtils.bind(this,
        this.initializeViewer))
};
papaya.viewer.Viewer.prototype.loadOverlay = function(c, a, d, b) {
    var e = this.container.findLoadableImage(c);
    this.loadingVolume = new papaya.volume.Volume(this.container.display, this, this.container.params);
    this.screenVolumes.length > papaya.viewer.Viewer.MAX_OVERLAYS ? (this.loadingVolume.error = Error("Maximum number of overlays (" + papaya.viewer.Viewer.MAX_OVERLAYS + ") has been reached!"), this.initializeOverlay()) : b ? (Array.isArray(c) || (c = [c]), this.loadingVolume.readBinaryData(c, papaya.utilities.ObjectUtils.bind(this, this.initializeOverlay))) :
        d ? (c = e.encode, c instanceof Array || (c = [], c[0] = e.encode), this.loadingVolume.readEncodedData(c, papaya.utilities.ObjectUtils.bind(this, this.initializeOverlay))) : null !== e && void 0 !== e.encode ? (c = e.encode, c instanceof Array || (c = [], c[0] = e.encode), this.loadingVolume.readEncodedData(c, papaya.utilities.ObjectUtils.bind(this, this.initializeOverlay))) : a ? this.loadingVolume.readURLs(c, papaya.utilities.ObjectUtils.bind(this, this.initializeOverlay)) : null !== e && void 0 !== e.url ? this.loadingVolume.readURLs([e.url], papaya.utilities.ObjectUtils.bind(this,
            this.initializeOverlay)) : this.loadingVolume.readFiles(c, papaya.utilities.ObjectUtils.bind(this, this.initializeOverlay))
};
papaya.viewer.Viewer.prototype.loadSurface = function(c, a, d) {
    var b = this.container.findLoadableImage(c, !0);
    if (0 == this.screenVolumes.length) this.container.display.drawError("Load an image before loading a surface!");
    else {
        var e = new papaya.surface.Surface(this.container.display, this.container.params);
        d ? e.readEncodedData(c[0], this.volume, papaya.utilities.ObjectUtils.bind(this, this.initializeSurface)) : null !== b && void 0 !== b.encode ? e.readEncodedData(b.encode, this.volume, papaya.utilities.ObjectUtils.bind(this,
            this.initializeSurface)) : a ? e.readURL(c, this.volume, papaya.utilities.ObjectUtils.bind(this, this.initializeSurface)) : null !== b && void 0 !== b.url ? e.readURL(b.url, this.volume, papaya.utilities.ObjectUtils.bind(this, this.initializeSurface)) : e.readFile(c[0], this.volume, papaya.utilities.ObjectUtils.bind(this, this.initializeSurface))
    }
};
papaya.viewer.Viewer.prototype.initializeSurface = function(c) {
    var a = c;
    if (c.error) c.error && this.container.display.drawError(c.error);
    else {
        for (; null !== a;) this.surfaces.push(a), a = a.nextSurface;
        if (null === this.surfaceView) this.lowerImageBot2 = this.surfaceView = new papaya.viewer.ScreenSurface(this.volume, this.surfaces, this, this.container.params), this.container.resizeViewerComponents(!0);
        else
            for (a = c; null !== a;) this.surfaceView.initBuffers(this.surfaceView.context, a), a = a.nextSurface;
        this.container.params.mainView &&
            "surface" === this.container.params.mainView.toLowerCase() && (this.mainImage = this.surfaceView, this.lowerImageTop = this.axialSlice, this.lowerImageBot = this.sagittalSlice, this.lowerImageBot2 = this.coronalSlice, this.viewsChanged());
        this.container.toolbar.buildToolbar();
        this.container.toolbar.updateImageButtons();
        this.container.hasMoreToLoad() ? this.container.loadNext() : this.finishedLoading()
    }
};
papaya.viewer.Viewer.prototype.atlasLoaded = function() {
    this.finishedLoading()
};
papaya.viewer.Viewer.prototype.initializeViewer = function() {
    var c, a;
    a = this;
    if (this.volume.hasError()) c = this.volume.error.message, this.resetViewer(), this.container.clearParams(), this.container.display.drawError(c);
    else if (this.screenVolumes[0] = new papaya.viewer.ScreenVolume(this.volume, this.container.params, papaya.viewer.ColorTable.DEFAULT_COLOR_TABLE.name, !0, !1, this.currentCoord), this.loadingDTI && (this.loadingDTI = !1, this.screenVolumes[0].dti = !0, this.screenVolumes[0].dti && 3 !== this.screenVolumes[0].volume.numTimepoints &&
            (this.screenVolumes[0].error = Error("DTI vector series must have 3 series points!")), this.screenVolumes[0].dti && this.screenVolumes[0].initDTI()), this.screenVolumes[0].hasError()) c = this.screenVolumes[0].error.message, this.resetViewer(), this.container.clearParams(), this.container.display.drawError(c);
    else {
        this.setCurrentScreenVol(0);
        this.axialSlice = new papaya.viewer.ScreenSlice(this.volume, papaya.viewer.ScreenSlice.DIRECTION_AXIAL, this.volume.getXDim(), this.volume.getYDim(), this.volume.getXSize(), this.volume.getYSize(),
            this.screenVolumes, this);
        this.coronalSlice = new papaya.viewer.ScreenSlice(this.volume, papaya.viewer.ScreenSlice.DIRECTION_CORONAL, this.volume.getXDim(), this.volume.getZDim(), this.volume.getXSize(), this.volume.getZSize(), this.screenVolumes, this);
        this.sagittalSlice = new papaya.viewer.ScreenSlice(this.volume, papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL, this.volume.getYDim(), this.volume.getZDim(), this.volume.getYSize(), this.volume.getZSize(), this.screenVolumes, this);
        void 0 === this.container.params.mainView ||
            "axial" === this.container.params.mainView.toLowerCase() ? (this.mainImage = this.axialSlice, this.lowerImageTop = this.sagittalSlice, this.lowerImageBot = this.coronalSlice) : "coronal" === this.container.params.mainView.toLowerCase() ? (this.mainImage = this.coronalSlice, this.lowerImageTop = this.axialSlice, this.lowerImageBot = this.sagittalSlice) : "sagittal" === this.container.params.mainView.toLowerCase() ? (this.mainImage = this.sagittalSlice, this.lowerImageTop = this.coronalSlice, this.lowerImageBot = this.axialSlice) : (this.mainImage =
                this.axialSlice, this.lowerImageTop = this.sagittalSlice, this.lowerImageBot = this.coronalSlice);
        this.canvas.addEventListener("mousemove", this.listenerMouseMove, !1);
        this.canvas.addEventListener("mousedown", this.listenerMouseDown, !1);
        this.canvas.addEventListener("mouseout", this.listenerMouseOut, !1);
        this.canvas.addEventListener("mouseleave", this.listenerMouseLeave, !1);
        this.canvas.addEventListener("mouseup", this.listenerMouseUp, !1);
        document.addEventListener("keydown", this.listenerKeyDown, !0);
        document.addEventListener("keyup",
            this.listenerKeyUp, !0);
        this.canvas.addEventListener("touchmove", this.listenerTouchMove, !1);
        this.canvas.addEventListener("touchstart", this.listenerTouchStart, !1);
        this.canvas.addEventListener("touchend", this.listenerTouchEnd, !1);
        this.canvas.addEventListener("dblclick", this.listenerMouseDoubleClick, !1);
        document.addEventListener("contextmenu", this.listenerContextMenu, !1);
        this.container.showControlBar ? ($(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_MAIN_SLIDER).find("button")).eq(0).click(function() {
                a.mainImage.sliceDirection ===
                    papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? a.incrementAxial(!1) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? a.incrementCoronal(!1) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && a.incrementSagittal(!0)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_MAIN_SLIDER).find("button")).eq(1).click(function() {
                a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? a.incrementAxial(!0) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ?
                    a.incrementCoronal(!0) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && a.incrementSagittal(!1)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(0).find("button").eq(0)).click(function() {
                a.incrementAxial(!1)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(0).find("button").eq(1)).click(function() {
                a.incrementAxial(!0)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(1).find("button").eq(0)).click(function() {
                a.incrementCoronal(!1)
            }),
            $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(1).find("button").eq(1)).click(function() {
                a.incrementCoronal(!0)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(2).find("button").eq(0)).click(function() {
                a.incrementSagittal(!0)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(2).find("button").eq(1)).click(function() {
                a.incrementSagittal(!1)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(3).find("button").eq(0)).click(function() {
                a.decrementSeriesPoint()
            }),
            $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(3).find("button").eq(1)).click(function() {
                a.incrementSeriesPoint()
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS)).click(function() {
                a.rotateViews()
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS)).click(function() {
                var c = new papaya.core.Coordinate(Math.floor(a.volume.header.imageDimensions.xDim / 2), Math.floor(a.volume.header.imageDimensions.yDim / 2), Math.floor(a.volume.header.imageDimensions.zDim /
                    2));
                a.gotoCoordinate(c)
            }), $(this.container.sliderControlHtml.find("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS)).click(function() {
                a.gotoCoordinate(a.volume.header.origin)
            }), $("." + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS).prop("disabled", !1), $("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS).prop("disabled", !1), $("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS).prop("disabled", !1), $("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS).prop("disabled", !1)) : this.container.showControls && ($("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).css({
                display: "inline"
            }),
            $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex).css({
                display: "inline"
            }), $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex).css({
                display: "inline"
            }), $(this.container.containerHtml.find("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex)).click(function() {
                a.rotateViews()
            }), $(this.container.containerHtml.find("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex)).click(function() {
                a.mainImage.sliceDirection ===
                    papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? a.incrementAxial(!1) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? a.incrementCoronal(!1) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && a.incrementSagittal(!0)
            }), $(this.container.containerHtml.find("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex)).click(function() {
                a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? a.incrementAxial(!0) : a.mainImage.sliceDirection ===
                    papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? a.incrementCoronal(!0) : a.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && a.incrementSagittal(!1)
            }), $(this.container.containerHtml.find("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.container.containerIndex)).click(function() {
                var c = new papaya.core.Coordinate(Math.floor(a.volume.header.imageDimensions.xDim / 2), Math.floor(a.volume.header.imageDimensions.yDim / 2), Math.floor(a.volume.header.imageDimensions.zDim / 2));
                a.gotoCoordinate(c)
            }),
            $(this.container.containerHtml.find("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.container.containerIndex)).click(function() {
                a.gotoCoordinate(a.volume.header.origin)
            }));
        this.hasSeries = 1 < this.volume.header.imageDimensions.timepoints;
        this.container.allowScroll && this.addScroll();
        this.setLongestDim(this.volume);
        this.calculateScreenSliceTransforms(this);
        this.currentCoord.setCoordinate(papayaFloorFast(this.volume.getXDim() / 2), papayaFloorFast(this.volume.getYDim() / 2), papayaFloorFast(this.volume.getZDim() /
            2));
        this.updateOffsetRect();
        this.bgColor = $("body").css("background-color");
        if ("rgba(0, 0, 0, 0)" === this.bgColor || "transparent" === this.bgColor) this.bgColor = "rgba(255, 255, 255, 255)";
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.volume.isWorldSpaceOnly() && (this.ignoreNiftiTransforms ? this.volume.header.orientationCertainty = papaya.volume.Header.ORIENTATION_CERTAINTY_UNKNOWN : this.worldSpace = !0);
        papaya.Container.atlas && (this.atlas =
            papaya.Container.atlas);
        this.initialized = !0;
        this.container.resizeViewerComponents(!0);
        this.drawViewer();
        this.container.toolbar.buildToolbar();
        this.container.toolbar.updateImageButtons();
        this.updateWindowTitle();
        this.container.loadingImageIndex = 1;
        this.container.hasMoreToLoad() ? this.container.loadNext() : this.finishedLoading()
    }
};
papaya.viewer.Viewer.prototype.finishedLoading = function() {
    this.pageLoaded || (this.goToInitialCoordinate(), this.updateSliceSliderControl(), this.pageLoaded = !0);
    this.container.loadingComplete && (this.container.loadingComplete(), this.container.loadingComplete = null);
    this.container.toolbar.buildToolbar();
    this.container.toolbar.updateImageButtons();
    this.updateWindowTitle()
};
papaya.viewer.Viewer.prototype.addScroll = function() {
    window.addEventListener(papaya.utilities.PlatformUtils.getSupportedScrollEvent(), this.listenerScroll, !1)
};
papaya.viewer.Viewer.prototype.removeScroll = function() {
    window.removeEventListener(papaya.utilities.PlatformUtils.getSupportedScrollEvent(), this.listenerScroll, !1)
};
papaya.viewer.Viewer.prototype.updateOffsetRect = function() {
    this.canvasRect = papaya.viewer.Viewer.getOffsetRect(this.canvas)
};
papaya.viewer.Viewer.prototype.initializeOverlay = function() {
    var c, a, d;
    if (this.loadingVolume.hasError()) this.container.display.drawError(this.loadingVolume.error.message), this.container.clearParams(), this.loadingVolume = null;
    else {
        a = (c = this.container.params[this.loadingVolume.fileName]) && c.parametric;
        d = c && c.dtiMod;
        if (this.loadingDTIModRef) this.loadingDTIModRef.dtiVolumeMod = this.loadingVolume, this.loadingDTIModRef = null;
        else if (d) {
            if (a = this.getScreenVolumeByName(c.dtiRef)) a.dtiVolumeMod = this.loadingVolume,
                a.dtiAlphaFactor = void 0 !== c.dtiModAlphaFactor ? c.dtiModAlphaFactor : 1
        } else {
            d = new papaya.viewer.ScreenVolume(this.loadingVolume, this.container.params, a ? papaya.viewer.ColorTable.PARAMETRIC_COLOR_TABLES[0].name : this.getNextColorTable(), !1, !1, this.currentCoord);
            this.loadingDTI && (this.loadingDTI = !1, d.dti = !0, d.dti && 3 !== d.volume.numTimepoints && (d.error = Error("DTI vector series must have 3 series points!")), d.dti && d.initDTI());
            if (d.hasError()) {
                this.container.display.drawError(d.error.message);
                this.container.clearParams();
                this.loadingVolume = null;
                return
            }
            this.screenVolumes[this.screenVolumes.length] = d;
            this.setCurrentScreenVol(this.screenVolumes.length - 1);
            a && (this.screenVolumes[this.screenVolumes.length - 1].findImageRange(), 0 > this.screenVolumes[this.screenVolumes.length - 1].volume.header.imageRange.imageMin && (this.screenVolumes[this.screenVolumes.length] = a = new papaya.viewer.ScreenVolume(this.loadingVolume, this.container.params, papaya.viewer.ColorTable.PARAMETRIC_COLOR_TABLES[1].name, !1, !0, this.currentCoord), d.negativeScreenVol =
                a, this.setCurrentScreenVol(this.screenVolumes.length - 1)))
        }
        this.container.toolbar.buildToolbar();
        this.container.toolbar.updateImageButtons();
        this.drawViewer(!0);
        this.hasSeries = !1;
        for (a = 0; a < this.screenVolumes.length; a += 1)
            if (1 < this.screenVolumes[a].volume.header.imageDimensions.timepoints) {
                this.hasSeries = !0;
                break
            } this.container.resizeViewerComponents();
        this.updateWindowTitle();
        this.loadingVolume = null;
        c && c.loadingComplete && c.loadingComplete();
        this.container.hasMoreToLoad() ? this.container.loadNext() : this.finishedLoading()
    }
};
papaya.viewer.Viewer.prototype.closeOverlayByRef = function(c) {
    this.closeOverlay(this.getScreenVolumeIndex(c))
};
papaya.viewer.Viewer.prototype.closeOverlay = function(c) {
    var a;
    for (a = 0; a < this.screenVolumes.length; a += 1) this.screenVolumes[a].negativeScreenVol === this.screenVolumes[c] && (this.screenVolumes[a].negativeScreenVol = null);
    this.screenVolumes.splice(c, 1);
    this.setCurrentScreenVol(this.screenVolumes.length - 1);
    this.drawViewer(!0);
    this.container.toolbar.buildToolbar();
    this.container.toolbar.updateImageButtons();
    this.updateWindowTitle();
    this.hasSeries = !1;
    for (a = 0; a < this.screenVolumes.length; a += 1)
        if (1 < this.screenVolumes[a].volume.header.imageDimensions.timepoints) {
            this.hasSeries = !0;
            break
        } this.container.resizeViewerComponents()
};
papaya.viewer.Viewer.prototype.hasDefinedAtlas = function() {
    var c;
    return "undefined" !== typeof papaya.data && (c = typeof papaya.data.Atlas, "undefined" !== c) ? !0 : !1
};
papaya.viewer.Viewer.prototype.loadAtlas = function() {
    null === this.atlas && (this.atlas = new papaya.viewer.Atlas(papaya.data.Atlas, this.container, papaya.utilities.ObjectUtils.bind(this, this.atlasLoaded)))
};
papaya.viewer.Viewer.prototype.isInsideMainSlice = function(c, a) {
    this.updateOffsetRect();
    c -= this.canvasRect.left;
    a -= this.canvasRect.top;
    return this.mainImage === this.axialSlice ? this.insideScreenSlice(this.axialSlice, c, a, this.volume.getXDim(), this.volume.getYDim()) : this.mainImage === this.coronalSlice ? this.insideScreenSlice(this.coronalSlice, c, a, this.volume.getXDim(), this.volume.getZDim()) : this.mainImage === this.sagittalSlice ? this.insideScreenSlice(this.sagittalSlice, c, a, this.volume.getYDim(), this.volume.getZDim()) :
        !1
};
papaya.viewer.Viewer.prototype.updatePosition = function(c, a, d, b) {
    var e, g;
    c.updateOffsetRect();
    e = a;
    g = d;
    a -= this.canvasRect.left;
    d -= this.canvasRect.top;
    if (this.insideScreenSlice(c.axialSlice, a, d, c.volume.getXDim(), c.volume.getYDim())) {
        if (!this.isDragging || this.draggingSliceDir === papaya.viewer.ScreenSlice.DIRECTION_AXIAL)
            if (a = this.convertScreenToImageCoordinateX(a, c.axialSlice), d = this.convertScreenToImageCoordinateY(d, c.axialSlice), a !== c.currentCoord.x || d !== c.currentCoord.y) c.currentCoord.x = a, c.currentCoord.y = d,
                this.draggingSliceDir = papaya.viewer.ScreenSlice.DIRECTION_AXIAL
    } else if (this.insideScreenSlice(c.coronalSlice, a, d, c.volume.getXDim(), c.volume.getZDim())) {
        if (!this.isDragging || this.draggingSliceDir === papaya.viewer.ScreenSlice.DIRECTION_CORONAL)
            if (a = this.convertScreenToImageCoordinateX(a, c.coronalSlice), d = this.convertScreenToImageCoordinateY(d, c.coronalSlice), a !== c.currentCoord.x || d !== c.currentCoord.y) c.currentCoord.x = a, c.currentCoord.z = d, this.draggingSliceDir = papaya.viewer.ScreenSlice.DIRECTION_CORONAL
    } else if (this.insideScreenSlice(c.sagittalSlice,
            a, d, c.volume.getYDim(), c.volume.getZDim())) {
        if (!this.isDragging || this.draggingSliceDir === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL)
            if (a = this.convertScreenToImageCoordinateX(a, c.sagittalSlice), d = this.convertScreenToImageCoordinateY(d, c.sagittalSlice), a !== c.currentCoord.x || d !== c.currentCoord.y) c.currentCoord.y = a, c.currentCoord.z = d, this.draggingSliceDir = papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL
    } else c.surfaceView && this.insideScreenSlice(c.surfaceView, a, d, c.surfaceView.screenDim, c.surfaceView.screenDim) &&
        c.surfaceView.updateDynamic(e, g, this.selectedSlice === this.mainImage ? 1 : 3);
    this.container.coordinateChanged(this);
    c.drawViewer(!1, b)
};
papaya.viewer.Viewer.prototype.convertScreenToImageCoordinateX = function(c, a) {
    return papaya.viewer.Viewer.validDimBounds(papayaFloorFast((c - a.finalTransform[0][2]) / a.finalTransform[0][0]), a.xDim)
};
papaya.viewer.Viewer.prototype.convertScreenToImageCoordinateY = function(c, a) {
    return papaya.viewer.Viewer.validDimBounds(papayaFloorFast((c - a.finalTransform[1][2]) / a.finalTransform[1][1]), a.yDim)
};
papaya.viewer.Viewer.prototype.convertScreenToImageCoordinate = function(c, a, d) {
    var b, e, g;
    void 0 === d && (d = this.mainImage);
    d.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (b = this.convertScreenToImageCoordinateX(c, d), e = this.convertScreenToImageCoordinateY(a, d), g = this.axialSlice.currentSlice) : d.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (b = this.convertScreenToImageCoordinateX(c, d), g = this.convertScreenToImageCoordinateY(a, d), e = this.coronalSlice.currentSlice) : d.sliceDirection ===
        papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (e = this.convertScreenToImageCoordinateX(c, d), g = this.convertScreenToImageCoordinateY(a, d), b = this.sagittalSlice.currentSlice);
    return new papaya.core.Coordinate(b, e, g)
};
papaya.viewer.Viewer.prototype.convertCurrentCoordinateToScreen = function(c) {
    return this.convertCoordinateToScreen(this.currentCoord, c)
};
papaya.viewer.Viewer.prototype.intersectsMainSlice = function(c) {
    var a = this.mainImage.sliceDirection;
    return a === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? c.z === this.mainImage.currentSlice : a === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? c.y === this.mainImage.currentSlice : a === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL ? c.x === this.mainImage.currentSlice : !1
};
papaya.viewer.Viewer.prototype.convertCoordinateToScreen = function(c, a) {
    var d, b, e;
    void 0 === a && (a = this.mainImage);
    e = a.sliceDirection;
    e === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (d = papayaFloorFast(a.finalTransform[0][2] + (c.x + .5) * a.finalTransform[0][0]), b = papayaFloorFast(a.finalTransform[1][2] + (c.y + .5) * a.finalTransform[1][1])) : e === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (d = papayaFloorFast(a.finalTransform[0][2] + (c.x + .5) * a.finalTransform[0][0]), b = papayaFloorFast(a.finalTransform[1][2] + (c.z + .5) * a.finalTransform[1][1])) :
        e === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (d = papayaFloorFast(a.finalTransform[0][2] + (c.y + .5) * a.finalTransform[0][0]), b = papayaFloorFast(a.finalTransform[1][2] + (c.z + .5) * a.finalTransform[1][1]));
    return new papaya.core.Point(d, b)
};
papaya.viewer.Viewer.prototype.updateCursorPosition = function(c, a, d) {
    var b, e, g, h = null,
        f;
    this.container.display && (a -= this.canvasRect.left, d -= this.canvasRect.top, this.insideScreenSlice(c.axialSlice, a, d, c.volume.getXDim(), c.volume.getYDim()) ? (b = this.convertScreenToImageCoordinateX(a, c.axialSlice), e = this.convertScreenToImageCoordinateY(d, c.axialSlice), g = c.axialSlice.currentSlice, f = !0) : this.insideScreenSlice(c.coronalSlice, a, d, c.volume.getXDim(), c.volume.getZDim()) ? (b = this.convertScreenToImageCoordinateX(a,
        c.coronalSlice), g = this.convertScreenToImageCoordinateY(d, c.coronalSlice), e = c.coronalSlice.currentSlice, f = !0) : this.insideScreenSlice(c.sagittalSlice, a, d, c.volume.getYDim(), c.volume.getZDim()) ? (e = this.convertScreenToImageCoordinateX(a, c.sagittalSlice), g = this.convertScreenToImageCoordinateY(d, c.sagittalSlice), b = c.sagittalSlice.currentSlice, f = !0) : this.insideScreenSlice(c.surfaceView, a, d) && (a -= c.surfaceView.screenOffsetX, d -= c.surfaceView.screenOffsetY, h = this.surfaceView.pick(a, d)) && (this.getIndexCoordinateAtWorld(h.coordinate[0],
        h.coordinate[1], h.coordinate[2], this.tempCoor), b = this.tempCoor.x, e = this.tempCoor.y, g = this.tempCoor.z, f = !0), f ? (this.cursorPosition.x = b, this.cursorPosition.y = e, this.cursorPosition.z = g, this.container.display.drawDisplay(b, e, g)) : this.container.display.drawEmptyDisplay())
};
papaya.viewer.Viewer.prototype.insideScreenSlice = function(c, a, d, b, e) {
    var g, h;
    if (!c) return !1;
    c === this.surfaceView ? (g = c.screenOffsetX, b = c.screenOffsetX + c.screenDim, h = c.screenOffsetY, c = c.screenOffsetY + c.screenDim) : (g = papayaRoundFast(c.screenTransform[0][2]), b = papayaRoundFast(c.screenTransform[0][2] + b * c.screenTransform[0][0]), h = papayaRoundFast(c.screenTransform[1][2]), c = papayaRoundFast(c.screenTransform[1][2] + e * c.screenTransform[1][1]));
    return a >= g && a < b && d >= h && d < c
};
papaya.viewer.Viewer.prototype.drawEmptyViewer = function() {
    var c, a, d;
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#AAAAAA";
    this.container.readyForDnD() && (this.context.font = "18px sans-serif", c = this.canvas.height - 22, a = "Drop here or click the File menu", d = this.context.measureText(a), d = d.width, this.context.fillText(a, this.canvas.width / 2 - d / 2, c));
    900 < this.canvas.width && (this.context.font = "14px sans-serif", c = this.canvas.height - 20,
        a = "Supported formats: NIFTI" + (papaya.Container.DICOM_SUPPORT ? ", DICOM" : ""), this.context.fillText(a, 20, c), this.context.font = "14px sans-serif", c = this.canvas.height - 20, a = "Papaya (Build " + PAPAYA_BUILD_NUM + ")", d = this.context.measureText(a), d = d.width, this.context.fillText(a, this.canvas.width - d - 20, c))
};
papaya.viewer.Viewer.prototype.drawViewer = function(c, a) {
    var d = "Yes" === this.container.preferences.radiological,
        b = "Yes" === this.container.preferences.showOrientation;
    this.initialized ? (this.context.save(), a ? (this.axialSlice.repaint(this.currentCoord.z, c, this.worldSpace), this.coronalSlice.repaint(this.currentCoord.y, c, this.worldSpace), this.sagittalSlice.repaint(this.currentCoord.x, c, this.worldSpace)) : ((c || this.draggingSliceDir !== papaya.viewer.ScreenSlice.DIRECTION_AXIAL) && this.axialSlice.updateSlice(this.currentCoord.z,
            c, this.worldSpace), (c || this.draggingSliceDir !== papaya.viewer.ScreenSlice.DIRECTION_CORONAL) && this.coronalSlice.updateSlice(this.currentCoord.y, c, this.worldSpace), (c || this.draggingSliceDir !== papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL) && this.sagittalSlice.updateSlice(this.currentCoord.x, c, this.worldSpace)), !this.hasSurface() || papaya.utilities.PlatformUtils.smallScreen && !c && this.selectedSlice !== this.surfaceView || this.surfaceView.draw(), "No" === this.container.preferences.smoothDisplay ? (this.context.imageSmoothingEnabled = !1, this.context.mozImageSmoothingEnabled = !1, this.context.msImageSmoothingEnabled = !1) : (this.context.imageSmoothingEnabled = !0, this.context.mozImageSmoothingEnabled = !0, this.context.msImageSmoothingEnabled = !0), this.drawScreenSlice(this.mainImage), this.container.orthogonal && (this.drawScreenSlice(this.lowerImageTop), this.drawScreenSlice(this.lowerImageBot), this.hasSurface() && this.drawScreenSlice(this.lowerImageBot2)), (b || d) && this.drawOrientation(), "Yes" === this.container.preferences.showCrosshairs && this.drawCrosshairs(),
        "Yes" === this.container.preferences.showRuler && this.drawRuler(), this.container.display && this.container.display.drawDisplay(this.currentCoord.x, this.currentCoord.y, this.currentCoord.z), this.container.contextManager && this.container.contextManager.drawToViewer && this.container.contextManager.drawToViewer(this.context)) : this.drawEmptyViewer()
};
papaya.viewer.Viewer.prototype.hasSurface = function() {
    return this.container.hasSurface() && this.surfaceView && this.surfaceView.initialized
};
papaya.viewer.Viewer.prototype.drawScreenSlice = function(c) {
    var a, d;
    c === this.surfaceView ? (this.context.fillStyle = this.surfaceView.getBackgroundColor(), this.context.fillRect(c.screenOffsetX, c.screenOffsetY, c.screenDim, c.screenDim), this.context.drawImage(c.canvas, c.screenOffsetX, c.screenOffsetY), "Yes" === this.container.preferences.showRuler && this.surfaceView === this.mainImage && (this.context.font = papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE + "px sans-serif", a = this.context.measureText("Ruler Length: ").width,
        d = this.context.measureText("Ruler Length: 000.00").width, d /= 2, this.context.fillStyle = "#ffb3db", this.context.fillText("Ruler Length:  ", c.screenDim / 2 - d / 2, papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE + 5), this.context.fillStyle = "#FFFFFF", this.context.fillText(this.surfaceView.getRulerLength().toFixed(2), c.screenDim / 2 + a - d / 2, papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE + 5))) : (this.context.fillStyle = papaya.viewer.Viewer.BACKGROUND_COLOR, this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.fillRect(c.screenOffsetX,
        c.screenOffsetY, c.screenDim, c.screenDim), this.context.save(), this.context.beginPath(), this.context.rect(c.screenOffsetX, c.screenOffsetY, c.screenDim, c.screenDim), this.context.clip(), this.context.setTransform(c.finalTransform[0][0], 0, 0, c.finalTransform[1][1], c.finalTransform[0][2], c.finalTransform[1][2]), this.context.drawImage(c.canvasMain, 0, 0), this.context.restore(), c.canvasDTILines && this.context.drawImage(c.canvasDTILines, c.screenOffsetX, c.screenOffsetY))
};
papaya.viewer.Viewer.prototype.drawOrientation = function() {
    var c, a, d, b, e, g, h, f, l, k, p, r = "Yes" === this.container.preferences.showOrientation;
    if (this.mainImage !== this.surfaceView) {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.fillStyle = this.getOrientationCertaintyColor();
        this.context.font = papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE + "px sans-serif";
        c = this.context.measureText("X");
        c = c.width;
        a = "Yes" === this.container.preferences.radiological;
        this.mainImage === this.axialSlice ? (d = papaya.viewer.Viewer.ORIENTATION_MARKER_ANTERIOR,
            b = papaya.viewer.Viewer.ORIENTATION_MARKER_POSTERIOR, a ? (e = papaya.viewer.Viewer.ORIENTATION_MARKER_RIGHT, g = papaya.viewer.Viewer.ORIENTATION_MARKER_LEFT) : (e = papaya.viewer.Viewer.ORIENTATION_MARKER_LEFT, g = papaya.viewer.Viewer.ORIENTATION_MARKER_RIGHT)) : this.mainImage === this.coronalSlice ? (d = papaya.viewer.Viewer.ORIENTATION_MARKER_SUPERIOR, b = papaya.viewer.Viewer.ORIENTATION_MARKER_INFERIOR, a ? (e = papaya.viewer.Viewer.ORIENTATION_MARKER_RIGHT, g = papaya.viewer.Viewer.ORIENTATION_MARKER_LEFT) : (e = papaya.viewer.Viewer.ORIENTATION_MARKER_LEFT,
            g = papaya.viewer.Viewer.ORIENTATION_MARKER_RIGHT)) : this.mainImage === this.sagittalSlice && (d = papaya.viewer.Viewer.ORIENTATION_MARKER_SUPERIOR, b = papaya.viewer.Viewer.ORIENTATION_MARKER_INFERIOR, e = papaya.viewer.Viewer.ORIENTATION_MARKER_ANTERIOR, g = papaya.viewer.Viewer.ORIENTATION_MARKER_POSTERIOR);
        a = this.mainImage.screenOffsetX;
        h = this.mainImage.screenOffsetX + this.mainImage.screenDim;
        f = Math.round(h / 2);
        l = this.mainImage.screenOffsetY;
        k = this.mainImage.screenOffsetY + this.mainImage.screenDim;
        p = Math.round(k /
            2);
        if (r || this.mainImage.isRadiologicalSensitive()) this.context.fillText(e, a + papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE, p + .5 * papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE), this.context.fillText(g, h - 1.5 * papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE, p + .5 * papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE);
        r && (this.context.fillText(d, f - c / 2, l + 1.5 * papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE), this.context.fillText(b, f - c / 2, k - papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE))
    }
};
papaya.viewer.Viewer.prototype.drawRuler = function() {
    var c, a, d, b, e, g;
    this.mainImage !== this.surfaceView && (this.mainImage === this.axialSlice ? (c = this.axialSlice.finalTransform[0][2] + (this.axialSlice.rulerPoints[0].x + .5) * this.axialSlice.finalTransform[0][0], a = this.axialSlice.finalTransform[1][2] + (this.axialSlice.rulerPoints[0].y + .5) * this.axialSlice.finalTransform[1][1], d = this.axialSlice.finalTransform[0][2] + (this.axialSlice.rulerPoints[1].x + .5) * this.axialSlice.finalTransform[0][0], b = this.axialSlice.finalTransform[1][2] +
            (this.axialSlice.rulerPoints[1].y + .5) * this.axialSlice.finalTransform[1][1]) : this.mainImage === this.coronalSlice ? (c = this.coronalSlice.finalTransform[0][2] + (this.coronalSlice.rulerPoints[0].x + .5) * this.coronalSlice.finalTransform[0][0], a = this.coronalSlice.finalTransform[1][2] + (this.coronalSlice.rulerPoints[0].y + .5) * this.coronalSlice.finalTransform[1][1], d = this.coronalSlice.finalTransform[0][2] + (this.coronalSlice.rulerPoints[1].x + .5) * this.coronalSlice.finalTransform[0][0], b = this.coronalSlice.finalTransform[1][2] +
            (this.coronalSlice.rulerPoints[1].y + .5) * this.coronalSlice.finalTransform[1][1]) : this.mainImage === this.sagittalSlice && (c = this.sagittalSlice.finalTransform[0][2] + (this.sagittalSlice.rulerPoints[0].x + .5) * this.sagittalSlice.finalTransform[0][0], a = this.sagittalSlice.finalTransform[1][2] + (this.sagittalSlice.rulerPoints[0].y + .5) * this.sagittalSlice.finalTransform[1][1], d = this.sagittalSlice.finalTransform[0][2] + (this.sagittalSlice.rulerPoints[1].x + .5) * this.sagittalSlice.finalTransform[0][0], b = this.sagittalSlice.finalTransform[1][2] +
            (this.sagittalSlice.rulerPoints[1].y + .5) * this.sagittalSlice.finalTransform[1][1]), this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.strokeStyle = "#FF1493", this.context.fillStyle = "#FF1493", this.context.lineWidth = 2, this.context.save(), this.context.beginPath(), this.context.moveTo(c, a), this.context.lineTo(d, b), this.context.stroke(), this.context.closePath(), this.context.beginPath(), this.context.arc(c, a, 3, 0, 2 * Math.PI, !1), this.context.arc(d, b, 3, 0, 2 * Math.PI, !1), this.context.fill(), this.context.closePath(),
        e = papaya.utilities.StringUtils.formatNumber(papaya.utilities.MathUtils.lineDistance(this.mainImage.rulerPoints[0].x * this.mainImage.xSize, this.mainImage.rulerPoints[0].y * this.mainImage.ySize, this.mainImage.rulerPoints[1].x * this.mainImage.xSize, this.mainImage.rulerPoints[1].y * this.mainImage.ySize), !1), g = this.context.measureText(e), g = g.width, c = parseInt((c + d) / 2) - g / 2, a = parseInt((a + b) / 2) + 7, this.context.fillStyle = "#FFFFFF", papaya.viewer.Viewer.drawRoundRect(this.context, c - 2, a - 14 - 2 + 1, g + 4, 18, 5, !0, !1), this.context.font =
        papaya.viewer.Viewer.ORIENTATION_MARKER_SIZE + "px sans-serif", this.context.strokeStyle = "#FF1493", this.context.fillStyle = "#FF1493", this.context.fillText(e, c, a))
};
papaya.viewer.Viewer.prototype.drawCrosshairs = function() {
    var c, a, d;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.strokeStyle = papaya.viewer.Viewer.CROSSHAIRS_COLOR;
    this.context.lineWidth = 1;
    if (this.mainImage !== this.axialSlice || this.toggleMainCrosshairs) this.context.save(), this.context.beginPath(), this.context.rect(this.axialSlice.screenOffsetX, this.axialSlice.screenOffsetY, this.axialSlice.screenDim, this.axialSlice.screenDim), this.context.closePath(), this.context.clip(), this.context.beginPath(),
        c = this.axialSlice.finalTransform[0][2] + (this.currentCoord.x + .5) * this.axialSlice.finalTransform[0][0], a = this.axialSlice.finalTransform[1][2], d = this.axialSlice.finalTransform[1][2] + this.axialSlice.yDim * this.axialSlice.finalTransform[1][1], this.context.moveTo(c, a), this.context.lineTo(c, d), c = this.axialSlice.finalTransform[1][2] + (this.currentCoord.y + .5) * this.axialSlice.finalTransform[1][1], a = this.axialSlice.finalTransform[0][2], d = this.axialSlice.finalTransform[0][2] + this.axialSlice.xDim * this.axialSlice.finalTransform[0][0],
        this.context.moveTo(a, c), this.context.lineTo(d, c), this.context.closePath(), this.context.stroke(), this.context.restore();
    if (this.mainImage !== this.coronalSlice || this.toggleMainCrosshairs) this.context.save(), this.context.beginPath(), this.context.rect(this.coronalSlice.screenOffsetX, this.coronalSlice.screenOffsetY, this.coronalSlice.screenDim, this.coronalSlice.screenDim), this.context.closePath(), this.context.clip(), this.context.beginPath(), c = this.coronalSlice.finalTransform[0][2] + (this.currentCoord.x +
        .5) * this.coronalSlice.finalTransform[0][0], a = this.coronalSlice.finalTransform[1][2], d = this.coronalSlice.finalTransform[1][2] + this.coronalSlice.yDim * this.coronalSlice.finalTransform[1][1], this.context.moveTo(c, a), this.context.lineTo(c, d), c = this.coronalSlice.finalTransform[1][2] + (this.currentCoord.z + .5) * this.coronalSlice.finalTransform[1][1], a = this.coronalSlice.finalTransform[0][2], d = this.coronalSlice.finalTransform[0][2] + this.coronalSlice.xDim * this.coronalSlice.finalTransform[0][0], this.context.moveTo(a,
        c), this.context.lineTo(d, c), this.context.closePath(), this.context.stroke(), this.context.restore();
    if (this.mainImage !== this.sagittalSlice || this.toggleMainCrosshairs) this.context.save(), this.context.beginPath(), this.context.rect(this.sagittalSlice.screenOffsetX, this.sagittalSlice.screenOffsetY, this.sagittalSlice.screenDim, this.sagittalSlice.screenDim), this.context.closePath(), this.context.clip(), this.context.beginPath(), c = this.sagittalSlice.finalTransform[0][2] + (this.currentCoord.y + .5) * this.sagittalSlice.finalTransform[0][0],
        a = this.sagittalSlice.finalTransform[1][2], d = this.sagittalSlice.finalTransform[1][2] + this.sagittalSlice.yDim * this.sagittalSlice.finalTransform[1][1], this.context.moveTo(c, a), this.context.lineTo(c, d), c = this.sagittalSlice.finalTransform[1][2] + (this.currentCoord.z + .5) * this.sagittalSlice.finalTransform[1][1], a = this.sagittalSlice.finalTransform[0][2], d = this.sagittalSlice.finalTransform[0][2] + this.sagittalSlice.xDim * this.sagittalSlice.finalTransform[0][0], this.context.moveTo(a, c), this.context.lineTo(d, c),
        this.context.closePath(), this.context.stroke(), this.context.restore()
};
papaya.viewer.Viewer.prototype.calculateScreenSliceTransforms = function() {
    this.container.orthogonalTall ? this.container.hasSurface() ? (this.viewerDim = this.canvas.height / 1.333, this.getTransformParameters(this.mainImage, this.viewerDim, !1, 3), this.mainImage.screenTransform[0][2] += this.mainImage.screenOffsetX = 0, this.mainImage.screenTransform[1][2] += this.mainImage.screenOffsetY = 0, this.getTransformParameters(this.lowerImageTop, this.viewerDim, !0, 3), this.lowerImageTop.screenTransform[0][2] += this.lowerImageTop.screenOffsetX =
        0, this.lowerImageTop.screenTransform[1][2] += this.lowerImageTop.screenOffsetY = this.viewerDim + papaya.viewer.Viewer.GAP, this.getTransformParameters(this.lowerImageBot, this.viewerDim, !0, 3), this.lowerImageBot.screenTransform[0][2] += this.lowerImageBot.screenOffsetX = (this.viewerDim - papaya.viewer.Viewer.GAP) / 3 + papaya.viewer.Viewer.GAP, this.lowerImageBot.screenTransform[1][2] += this.lowerImageBot.screenOffsetY = this.viewerDim + papaya.viewer.Viewer.GAP, this.getTransformParameters(this.lowerImageBot2, this.viewerDim,
            !0, 3), this.lowerImageBot2.screenTransform[0][2] += this.lowerImageBot2.screenOffsetX = 2 * ((this.viewerDim - papaya.viewer.Viewer.GAP) / 3 + papaya.viewer.Viewer.GAP), this.lowerImageBot2.screenTransform[1][2] += this.lowerImageBot2.screenOffsetY = this.viewerDim + papaya.viewer.Viewer.GAP) : (this.viewerDim = this.canvas.height / 1.5, this.getTransformParameters(this.mainImage, this.viewerDim, !1, 2), this.mainImage.screenTransform[0][2] += this.mainImage.screenOffsetX = 0, this.mainImage.screenTransform[1][2] += this.mainImage.screenOffsetY =
        0, this.getTransformParameters(this.lowerImageBot, this.viewerDim, !0, 2), this.lowerImageBot.screenTransform[0][2] += this.lowerImageBot.screenOffsetX = 0, this.lowerImageBot.screenTransform[1][2] += this.lowerImageBot.screenOffsetY = this.viewerDim + papaya.viewer.Viewer.GAP, this.getTransformParameters(this.lowerImageTop, this.viewerDim, !0, 2), this.lowerImageTop.screenTransform[0][2] += this.lowerImageTop.screenOffsetX = (this.viewerDim - papaya.viewer.Viewer.GAP) / 2 + papaya.viewer.Viewer.GAP, this.lowerImageTop.screenTransform[1][2] +=
        this.lowerImageTop.screenOffsetY = this.viewerDim + papaya.viewer.Viewer.GAP) : (this.viewerDim = this.canvas.height, this.container.hasSurface() ? (this.getTransformParameters(this.mainImage, this.viewerDim, !1, 3), this.mainImage.screenTransform[0][2] += this.mainImage.screenOffsetX = 0, this.mainImage.screenTransform[1][2] += this.mainImage.screenOffsetY = 0, this.getTransformParameters(this.lowerImageTop, this.viewerDim, !0, 3), this.lowerImageTop.screenTransform[0][2] += this.lowerImageTop.screenOffsetX = this.viewerDim + papaya.viewer.Viewer.GAP,
        this.lowerImageTop.screenTransform[1][2] += this.lowerImageTop.screenOffsetY = 0, this.getTransformParameters(this.lowerImageBot, this.viewerDim, !0, 3), this.lowerImageBot.screenTransform[0][2] += this.lowerImageBot.screenOffsetX = this.viewerDim + papaya.viewer.Viewer.GAP, this.lowerImageBot.screenTransform[1][2] += this.lowerImageBot.screenOffsetY = (this.viewerDim - papaya.viewer.Viewer.GAP) / 3 + papaya.viewer.Viewer.GAP, this.getTransformParameters(this.lowerImageBot2, this.viewerDim, !0, 3), this.lowerImageBot2.screenTransform[0][2] +=
        this.lowerImageBot2.screenOffsetX = this.viewerDim + papaya.viewer.Viewer.GAP, this.lowerImageBot2.screenTransform[1][2] += this.lowerImageBot2.screenOffsetY = (this.viewerDim - papaya.viewer.Viewer.GAP) / 3 * 2 + 2 * papaya.viewer.Viewer.GAP) : (this.getTransformParameters(this.mainImage, this.viewerDim, !1, 2), this.mainImage.screenTransform[0][2] += this.mainImage.screenOffsetX = 0, this.mainImage.screenTransform[1][2] += this.mainImage.screenOffsetY = 0, this.getTransformParameters(this.lowerImageBot, this.viewerDim, !0, 2), this.lowerImageBot.screenTransform[0][2] +=
        this.lowerImageBot.screenOffsetX = this.viewerDim + papaya.viewer.Viewer.GAP, this.lowerImageBot.screenTransform[1][2] += this.lowerImageBot.screenOffsetY = (this.viewerDim - papaya.viewer.Viewer.GAP) / 2 + papaya.viewer.Viewer.GAP, this.getTransformParameters(this.lowerImageTop, this.viewerDim, !0, 2), this.lowerImageTop.screenTransform[0][2] += this.lowerImageTop.screenOffsetX = this.viewerDim + papaya.viewer.Viewer.GAP, this.lowerImageTop.screenTransform[1][2] += this.lowerImageTop.screenOffsetY = 0));
    this.updateScreenSliceTransforms()
};
papaya.viewer.Viewer.prototype.updateScreenSliceTransforms = function() {
    this.axialSlice.updateFinalTransform();
    this.coronalSlice.updateFinalTransform();
    this.sagittalSlice.updateFinalTransform()
};
papaya.viewer.Viewer.prototype.getTransformParameters = function(c, a, d, b) {
    var e, g, h, f;
    e = d ? b : 1;
    c === this.surfaceView ? this.surfaceView.resize(this.viewerDim / e) : (c.getRealWidth() > c.getRealHeight() ? (g = (d ? a - papaya.viewer.Viewer.GAP : a) / this.longestDim / e * (c.getXSize() / this.longestDimSize), h = (d ? a - papaya.viewer.Viewer.GAP : a) / this.longestDim * c.getYXratio() / e * (c.getXSize() / this.longestDimSize)) : (g = (d ? a - papaya.viewer.Viewer.GAP : a) / this.longestDim * c.getXYratio() / e * (c.getYSize() / this.longestDimSize), h = (d ? a - papaya.viewer.Viewer.GAP :
        a) / this.longestDim / e * (c.getYSize() / this.longestDimSize)), f = ((d ? a - papaya.viewer.Viewer.GAP : a) / e - c.getXDim() * g) / 2, e = ((d ? a - papaya.viewer.Viewer.GAP : a) / e - c.getYDim() * h) / 2, c.screenDim = d ? (a - papaya.viewer.Viewer.GAP) / b : a, c.screenTransform[0][0] = g, c.screenTransform[1][1] = h, c.screenTransform[0][2] = f, c.screenTransform[1][2] = e, c.screenTransform2[0][0] = g, c.screenTransform2[1][1] = h, c.screenTransform2[0][2] = f, c.screenTransform2[1][2] = e)
};
papaya.viewer.Viewer.prototype.setLongestDim = function(c) {
    this.longestDim = c.getXDim();
    this.longestDimSize = c.getXSize();
    c.getYDim() * c.getYSize() > this.longestDim * this.longestDimSize && (this.longestDim = c.getYDim(), this.longestDimSize = c.getYSize());
    c.getZDim() * c.getZSize() > this.longestDim * this.longestDimSize && (this.longestDim = c.getZDim(), this.longestDimSize = c.getZSize())
};
papaya.viewer.Viewer.prototype.keyDownEvent = function(c) {
    var a;
    this.keyPressIgnored = !1;
    this.container.toolbar.isShowingMenus() || (1 < papayaContainers.length || papayaContainers[0].nestedViewer) && papaya.Container.papayaLastHoveredViewer !== this || (a = papaya.viewer.Viewer.getKeyCode(c), papaya.viewer.Viewer.isControlKey(c) ? this.isControlKeyDown = !0 : papaya.viewer.Viewer.isAltKey(c) ? this.isAltKeyDown = !0 : papaya.viewer.Viewer.isShiftKey(c) ? this.isShiftKeyDown = !0 : a === papaya.viewer.Viewer.KEYCODE_ROTATE_VIEWS ? this.rotateViews() :
        a === papaya.viewer.Viewer.KEYCODE_CENTER ? (a = new papaya.core.Coordinate(Math.floor(this.volume.header.imageDimensions.xDim / 2), Math.floor(this.volume.header.imageDimensions.yDim / 2), Math.floor(this.volume.header.imageDimensions.zDim / 2)), this.gotoCoordinate(a)) : a === papaya.viewer.Viewer.KEYCODE_ORIGIN ? this.gotoCoordinate(this.volume.header.origin) : a === papaya.viewer.Viewer.KEYCODE_ARROW_UP ? this.incrementCoronal(!1) : a === papaya.viewer.Viewer.KEYCODE_ARROW_DOWN ? this.incrementCoronal(!0) : a === papaya.viewer.Viewer.KEYCODE_ARROW_LEFT ?
        this.incrementSagittal(!0) : a === papaya.viewer.Viewer.KEYCODE_ARROW_RIGHT ? this.incrementSagittal(!1) : a === papaya.viewer.Viewer.KEYCODE_PAGE_DOWN || a === papaya.viewer.Viewer.KEYCODE_FORWARD_SLASH ? this.incrementAxial(!0) : a === papaya.viewer.Viewer.KEYCODE_PAGE_UP || a === papaya.viewer.Viewer.KEYCODE_SINGLE_QUOTE ? this.incrementAxial(!1) : a === papaya.viewer.Viewer.KEYCODE_INCREMENT_MAIN ? this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.incrementAxial(!1) : this.mainImage.sliceDirection ===
        papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.incrementCoronal(!1) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && this.incrementSagittal(!0) : a === papaya.viewer.Viewer.KEYCODE_DECREMENT_MAIN ? this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.incrementAxial(!0) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.incrementCoronal(!0) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL &&
        this.incrementSagittal(!1) : a === papaya.viewer.Viewer.KEYCODE_TOGGLE_CROSSHAIRS ? "Yes" === this.container.preferences.showCrosshairs && (this.toggleMainCrosshairs = !this.toggleMainCrosshairs, this.drawViewer(!0)) : a === papaya.viewer.Viewer.KEYCODE_SERIES_FORWARD ? this.incrementSeriesPoint() : a === papaya.viewer.Viewer.KEYCODE_SERIES_BACK ? this.decrementSeriesPoint() : a === papaya.viewer.Viewer.KEYCODE_RULER ? (this.container.preferences.showRuler = "Yes" === this.container.preferences.showRuler ? "No" : "Yes", this.drawViewer(!0,
            !0)) : this.keyPressIgnored = !0, this.keyPressIgnored || (c.handled = !0, c.preventDefault()))
};
papaya.viewer.Viewer.prototype.keyUpEvent = function(c) {
    1 < papayaContainers.length && papaya.Container.papayaLastHoveredViewer !== this || (this.isShiftKeyDown = this.isAltKeyDown = this.isControlKeyDown = !1, this.keyPressIgnored || (c.handled = !0, c.preventDefault()), this.hasSurface() && papaya.utilities.PlatformUtils.smallScreen && this.drawViewer(!0, !1))
};
papaya.viewer.Viewer.prototype.rotateViews = function() {
    var c;
    this.container.contextManager && this.container.contextManager.clearContext && this.container.contextManager.clearContext();
    this.hasSurface() ? (c = this.lowerImageBot2, this.lowerImageBot2 = this.lowerImageBot) : c = this.lowerImageBot;
    this.lowerImageBot = this.lowerImageTop;
    this.lowerImageTop = this.mainImage;
    this.mainImage = c;
    this.viewsChanged()
};
papaya.viewer.Viewer.prototype.viewsChanged = function() {
    this.calculateScreenSliceTransforms();
    this.hasSurface() && this.lowerImageBot2.clearDTILinesImage();
    this.lowerImageBot.clearDTILinesImage();
    this.lowerImageTop.clearDTILinesImage();
    this.mainImage.clearDTILinesImage();
    this.controlsHidden || (this.mainImage !== this.surfaceView ? this.fadeInControls() : ($("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).fadeOut(), $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex).fadeOut()),
        $("#" + PAPAYA_DEFAULT_SLIDER_ID + this.container.containerIndex + "main").find("button").prop("disabled", this.mainImage === this.surfaceView));
    this.drawViewer(!0);
    this.updateSliceSliderControl()
};
papaya.viewer.Viewer.prototype.timepointChanged = function() {
    this.drawViewer(!0);
    this.updateSliceSliderControl();
    this.updateWindowTitle()
};
papaya.viewer.Viewer.prototype.resetUpdateTimer = function(c) {
    var a = this;
    null !== this.updateTimer && (window.clearTimeout(this.updateTimer), this.updateTimerEvent = this.updateTimer = null);
    null !== c && (this.updateTimerEvent = c, this.updateTimer = window.setTimeout(papaya.utilities.ObjectUtils.bind(a, function() {
        a.updatePosition(this, papaya.utilities.PlatformUtils.getMousePositionX(a.updateTimerEvent), papaya.utilities.PlatformUtils.getMousePositionY(a.updateTimerEvent))
    }), papaya.viewer.Viewer.UPDATE_TIMER_INTERVAL))
};
papaya.viewer.Viewer.prototype.mouseDownEvent = function(c) {
    var a = !0,
        d;
    papaya.Container.allowPropagation || c.stopPropagation();
    c.preventDefault();
    if (this.showingContextMenu) this.container.toolbar.closeAllMenus(), c.handled = !0;
    else if ("IMG" === c.target.nodeName || "CANVAS" === c.target.nodeName) !0 !== c.handled && (this.container.toolbar.closeAllMenus(), this.previousMousePosition.x = papaya.utilities.PlatformUtils.getMousePositionX(c), this.previousMousePosition.y = papaya.utilities.PlatformUtils.getMousePositionY(c),
        this.findClickedSlice(this, this.previousMousePosition.x, this.previousMousePosition.y), (2 === c.button || this.isControlKeyDown || this.isLongTouch) && this.container.contextManager && this.selectedSlice === this.mainImage && this.mainImage === this.surfaceView ? (this.contextMenuMousePositionX = this.previousMousePosition.x - this.canvasRect.left, this.contextMenuMousePositionY = this.previousMousePosition.y - this.canvasRect.top, this.container.contextManager.prefersColorPicking && this.container.contextManager.prefersColorPicking() &&
            (d = this.surfaceView.pickColor(this.contextMenuMousePositionX, this.contextMenuMousePositionY), d = this.container.contextManager.getContextAtColor(d[0], d[1], d[2])), d && (this.isContextMode = !0, d = this.container.toolbar.buildMenu(d, null, null, null, !0), papaya.ui.Toolbar.applyContextState(d), a = !1, d.showMenu(), this.showingContextMenu = !0), this.isContextMode = !0) : (2 === c.button || this.isControlKeyDown || this.isLongTouch) && this.container.contextManager && this.selectedSlice === this.mainImage ? (this.isLongTouch ? (d = this.convertCurrentCoordinateToScreen(this.mainImage),
            this.contextMenuMousePositionX = d.x, this.contextMenuMousePositionY = d.y, d = this.container.contextManager.getContextAtImagePosition(this.currentCoord.x, this.currentCoord.y, this.currentCoord.z)) : (this.contextMenuMousePositionX = this.previousMousePosition.x - this.canvasRect.left, this.contextMenuMousePositionY = this.previousMousePosition.y - this.canvasRect.top, d = this.container.contextManager.getContextAtImagePosition(this.cursorPosition.x, this.cursorPosition.y, this.cursorPosition.z)), d && (this.isContextMode = !0, d = this.container.toolbar.buildMenu(d, null, null, null, !0), papaya.ui.Toolbar.applyContextState(d), a = !1, d.showMenu(), this.showingContextMenu = !0)) : 2 !== c.button && !this.isControlKeyDown || this.currentScreenVolume.rgb ? this.isAltKeyDown && this.selectedSlice ? (this.isZoomMode = !0, this.selectedSlice === this.surfaceView ? (this.isPanning = this.isShiftKeyDown, this.surfaceView.setStartDynamic(this.previousMousePosition.x, this.previousMousePosition.y)) : this.isZooming() && this.isShiftKeyDown ? (this.isPanning = !0, this.setStartPanLocation(this.convertScreenToImageCoordinateX(this.previousMousePosition.x,
            this.selectedSlice), this.convertScreenToImageCoordinateY(this.previousMousePosition.y, this.selectedSlice), this.selectedSlice.sliceDirection)) : this.setZoomLocation()) : this.selectedSlice && this.selectedSlice !== this.surfaceView ? (this.grabbedHandle = this.selectedSlice.findProximalRulerHandle(this.convertScreenToImageCoordinateX(this.previousMousePosition.x - this.canvasRect.left, this.selectedSlice), this.convertScreenToImageCoordinateY(this.previousMousePosition.y - this.canvasRect.top, this.selectedSlice)),
            null === this.grabbedHandle && (this.updatePosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c), !1), this.resetUpdateTimer(c))) : this.selectedSlice && this.selectedSlice === this.surfaceView && (this.surfaceView.findProximalRulerHandle(this.previousMousePosition.x - this.canvasRect.left, this.previousMousePosition.y - this.canvasRect.top) || (this.isPanning = this.isShiftKeyDown, this.surfaceView.setStartDynamic(this.previousMousePosition.x, this.previousMousePosition.y)),
            this.container.display.drawEmptyDisplay()) : (this.isWindowControl = !0, this.container.showImageButtons && (this.container.showControlBar || !this.container.kioskMode) && this.screenVolumes[this.getCurrentScreenVolIndex()].supportsDynamicColorTable() && this.container.toolbar.showImageMenu(this.getCurrentScreenVolIndex())), this.isDragging = a, c.handled = !0), this.controlsHidden || (this.controlsHiddenPrimed = !0)
};
papaya.viewer.Viewer.prototype.mouseUpEvent = function(c) {
    papaya.Container.allowPropagation || c.stopPropagation();
    c.preventDefault();
    this.showingContextMenu ? (this.showingContextMenu = !1, c.handled = !0) : ("IMG" !== c.target.nodeName && "CANVAS" !== c.target.nodeName || !0 === c.handled || (this.isWindowControl || this.isZoomMode || this.isContextMode || null !== this.grabbedHandle || this.surfaceView && -1 !== this.surfaceView.grabbedRulerPoint || this.updatePosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c)),
            this.selectedSlice === this.surfaceView && this.updateCursorPosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c)), this.zoomFactorPrevious = this.zoomFactor, this.isPanning = this.isZoomMode = this.isWindowControl = this.isDragging = !1, this.selectedSlice = null, this.controlsHiddenPrimed = !1, c.handled = !0), this.grabbedHandle = null, this.isContextMode = !1, this.updateWindowTitle(), this.updateSliceSliderControl(), this.container.toolbar.closeAllMenus(!0), this.hasSurface() &&
        (-1 === this.surfaceView.grabbedRulerPoint ? this.surfaceView.updateCurrent() : this.surfaceView.grabbedRulerPoint = -1, papaya.utilities.PlatformUtils.smallScreen && this.drawViewer(!0, !1)), this.controlsHidden && (this.controlsHidden = !1, this.fadeInControls()))
};
papaya.viewer.Viewer.prototype.fadeOutControls = function() {
    $("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).fadeOut();
    $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex).fadeOut();
    $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex).fadeOut();
    $("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.container.containerIndex).fadeOut();
    $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.container.containerIndex).fadeOut()
};
papaya.viewer.Viewer.prototype.fadeInControls = function() {
    600 > this.container.getViewerDimensions()[0] ? (this.mainImage !== this.surfaceView && ($("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).fadeIn(), $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex).fadeIn()), $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex).fadeIn()) : (this.mainImage !== this.surfaceView && ($("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).fadeIn(),
        $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex).fadeIn()), $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex).fadeIn(), $("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.container.containerIndex).fadeIn(), $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.container.containerIndex).fadeIn())
};
papaya.viewer.Viewer.prototype.findClickedSlice = function(c, a, d) {
    a -= this.canvasRect.left;
    d -= this.canvasRect.top;
    this.insideScreenSlice(c.axialSlice, a, d, c.volume.getXDim(), c.volume.getYDim()) ? this.selectedSlice = this.axialSlice : this.insideScreenSlice(c.coronalSlice, a, d, c.volume.getXDim(), c.volume.getZDim()) ? this.selectedSlice = this.coronalSlice : this.insideScreenSlice(c.sagittalSlice, a, d, c.volume.getYDim(), c.volume.getZDim()) ? this.selectedSlice = this.sagittalSlice : this.insideScreenSlice(c.surfaceView, a,
        d, c.volume.getYDim(), c.volume.getZDim()) ? this.selectedSlice = this.surfaceView : this.selectedSlice = null
};
papaya.viewer.Viewer.prototype.mouseMoveEvent = function(c) {
    c.preventDefault();
    if (this.showingContextMenu) c.handled = !0;
    else {
        var a, d;
        papaya.Container.papayaLastHoveredViewer = this;
        a = papaya.utilities.PlatformUtils.getMousePositionX(c);
        d = papaya.utilities.PlatformUtils.getMousePositionY(c);
        this.isDragging ? this.grabbedHandle ? this.isInsideMainSlice(a, d) && (this.grabbedHandle.x = this.convertScreenToImageCoordinateX(a - this.canvasRect.left, this.selectedSlice), this.grabbedHandle.y = this.convertScreenToImageCoordinateY(d -
            this.canvasRect.top, this.selectedSlice), this.drawViewer(!0, !0)) : this.isWindowControl ? (this.windowLevelChanged(this.previousMousePosition.x - a, this.previousMousePosition.y - d), this.previousMousePosition.x = a, this.previousMousePosition.y = d) : this.isPanning ? this.selectedSlice === this.surfaceView ? (this.surfaceView.updateTranslateDynamic(papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c), this.selectedSlice === this.mainImage ? 1 : 3), this.drawViewer(!1, !0)) : this.setCurrentPanLocation(this.convertScreenToImageCoordinateX(a,
            this.selectedSlice), this.convertScreenToImageCoordinateY(d, this.selectedSlice), this.selectedSlice.sliceDirection) : this.isZoomMode ? (this.selectedSlice === this.surfaceView ? (c = .5 * (this.previousMousePosition.y - d) * this.surfaceView.scaleFactor, this.surfaceView.zoom += c, this.previousMousePosition.x = a, this.previousMousePosition.y = d) : (c = .05 * (this.previousMousePosition.y - d), this.setZoomFactor(this.zoomFactorPrevious - c), this.axialSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocY, this.panAmountX,
            this.panAmountY, this), this.coronalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocZ, this.panAmountX, this.panAmountZ, this), this.sagittalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocY, this.zoomLocZ, this.panAmountY, this.panAmountZ, this)), this.drawViewer(!0)) : (this.resetUpdateTimer(null), null !== this.selectedSlice && (this.selectedSlice === this.surfaceView ? -1 !== this.surfaceView.grabbedRulerPoint ? (this.surfaceView.pickRuler(a - this.canvasRect.left, d - this.canvasRect.top), this.drawViewer(!1,
            !0)) : (this.surfaceView.updateDynamic(papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c), this.selectedSlice === this.mainImage ? 1 : 3), this.drawViewer(!1, !0), this.container.display.drawEmptyDisplay()) : this.updatePosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c)))) : (this.updateCursorPosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c)),
            this.isZoomMode = !1);
        this.controlsHidden && !this.isDragging && (this.controlsHidden = !1, this.fadeInControls());
        this.controlsTimer && (clearTimeout(this.controlsTimer), this.controlsTimer = null);
        this.controlsTimer = setTimeout(papaya.utilities.ObjectUtils.bind(this, function() {
            this.controlsHidden = !0;
            this.fadeOutControls()
        }), 8E3);
        this.controlsHiddenPrimed && (this.controlsHiddenPrimed = !1, this.controlsHidden = !0, this.fadeOutControls())
    }
};
papaya.viewer.Viewer.prototype.mouseDoubleClickEvent = function() {
    this.isAltKeyDown && (this.zoomFactorPrevious = 1, this.setZoomFactor(1))
};
papaya.viewer.Viewer.prototype.mouseOutEvent = function(c) {
    papaya.Container.papayaLastHoveredViewer = null;
    this.isDragging ? this.mouseUpEvent(c) : (this.container.display && this.container.display.drawEmptyDisplay(), this.grabbedHandle = null)
};
papaya.viewer.Viewer.prototype.mouseLeaveEvent = function() {};
papaya.viewer.Viewer.prototype.touchMoveEvent = function(c) {
    this.didLongTouch || (this.longTouchTimer && (clearTimeout(this.longTouchTimer), this.longTouchTimer = null), this.isDragging || (this.mouseDownEvent(c), this.isDragging = !0), this.mouseMoveEvent(c))
};
papaya.viewer.Viewer.prototype.touchStartEvent = function(c) {
    papaya.Container.allowPropagation || c.stopPropagation();
    c.preventDefault();
    this.longTouchTimer = setTimeout(papaya.utilities.ObjectUtils.bind(this, function() {
        this.doLongTouch(c)
    }), 500)
};
papaya.viewer.Viewer.prototype.touchEndEvent = function(c) {
    this.didLongTouch || (this.longTouchTimer && (clearTimeout(this.longTouchTimer), this.longTouchTimer = null), this.isDragging || this.mouseDownEvent(c), this.mouseUpEvent(c));
    this.isLongTouch = this.didLongTouch = !1
};
papaya.viewer.Viewer.prototype.doLongTouch = function(c) {
    this.longTouchTimer = null;
    this.isLongTouch = this.didLongTouch = !0;
    this.updateCursorPosition(this, papaya.utilities.PlatformUtils.getMousePositionX(c), papaya.utilities.PlatformUtils.getMousePositionY(c));
    this.mouseDownEvent(c);
    this.mouseUpEvent(c)
};
papaya.viewer.Viewer.prototype.windowLevelChanged = function(c, a) {
    var d, b;
    d = .025 * (this.currentScreenVolume.screenMax - this.currentScreenVolume.screenMin);
    Math.abs(c) > Math.abs(a) ? (b = this.currentScreenVolume.screenMin + d * papaya.utilities.MathUtils.signum(c), d = this.currentScreenVolume.screenMax + -1 * d * papaya.utilities.MathUtils.signum(c), d <= b && (d = b = this.currentScreenVolume.screenMin)) : (b = this.currentScreenVolume.screenMin + d * papaya.utilities.MathUtils.signum(a), d = this.currentScreenVolume.screenMax + d * papaya.utilities.MathUtils.signum(a));
    this.currentScreenVolume.setScreenRange(b, d);
    this.container.showImageButtons && this.container.toolbar.updateImageMenuRange(this.getCurrentScreenVolIndex(), parseFloat(b.toPrecision(7)), parseFloat(d.toPrecision(7)));
    this.drawViewer(!0)
};
papaya.viewer.Viewer.prototype.gotoCoordinate = function(c, a) {
    if (this.initialized) {
        var d = this.volume.header.imageDimensions.xDim,
            b = this.volume.header.imageDimensions.yDim,
            e = this.volume.header.imageDimensions.zDim;
        this.currentCoord.x = 0 > c.x ? 0 : c.x >= d ? d - 1 : c.x;
        this.currentCoord.y = 0 > c.y ? 0 : c.y >= b ? b - 1 : c.y;
        this.currentCoord.z = 0 > c.z ? 0 : c.z >= e ? e - 1 : c.z;
        this.drawViewer(!0);
        this.updateSliceSliderControl();
        a || (this.container.coordinateChanged(this), this.drawViewer(!1))
    }
};
papaya.viewer.Viewer.prototype.gotoWorldCoordinate = function(c, a) {
    var d = new papaya.core.Coordinate;
    this.gotoCoordinate(this.getIndexCoordinateAtWorld(c.x, c.y, c.z, d), a)
};

papaya.viewer.Viewer.prototype.resizeViewer = function(c) {
    var a = PAPAYA_PADDING / 2,
        d;
    this.canvas.width = c[0];
    this.canvas.height = c[1];

    if (this.initialized) {
        this.calculateScreenSliceTransforms();
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.drawViewer(true);

        if (this.container.showControls) {
            var offset = $(this.canvas).offset();

            // Increment Button
            d = $("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex);
            d.css({
                top: offset.top + a,
                left: this.container.containerIndex === 1 // Adjust for second viewer
                    ? offset.left + this.mainImage.screenDim - d.outerWidth() - a - 645 // Subtract 50 for adjustment
                    : offset.left + this.mainImage.screenDim - d.outerWidth() - a - 10,
                position: "absolute"
            });

            // Decrement Button
            d = $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + this.container.containerIndex);
            d.css({
                top: offset.top + d.outerHeight() + PAPAYA_PADDING,
                left: this.container.containerIndex === 1
                    ? offset.left + this.mainImage.screenDim - d.outerWidth() - a - 645
                    : offset.left + this.mainImage.screenDim - d.outerWidth() - a - 10,
                position: "absolute"
            });

            // Swap Button
            d = $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex);
            d.css({
                top: offset.top + this.mainImage.screenDim - d.outerHeight() - a,
                left: this.container.containerIndex === 1
                    ? offset.left + this.mainImage.screenDim - d.outerWidth() - a - 645
                    : offset.left + this.mainImage.screenDim - d.outerWidth() - a - 10,
                position: "absolute"
            });

            // Go To Center Button
            d = $("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.container.containerIndex);
            d.css({
                top: offset.top + this.mainImage.screenDim - d.outerHeight() - a,
                left: this.container.containerIndex === 1
                    ? offset.left + a - 640 // Subtract 50 for adjustment
                    : offset.left + a - 10,
                position: "absolute"
            });

            // Go To Origin Button
            d = $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.container.containerIndex);
            d.css({
                top: offset.top + this.mainImage.screenDim - d.outerHeight() - a,
                left: this.container.containerIndex === 1
                    ? offset.left + a + d.outerWidth() + PAPAYA_PADDING - 640 // Subtract 50 for adjustment
                    : offset.left + a + d.outerWidth() + PAPAYA_PADDING - 10,
                position: "absolute"
            });
        }
    }
};

papaya.viewer.Viewer.prototype.getWorldCoordinateAtIndex = function(c, a, d, b) {
    b.setCoordinate((c - this.volume.header.origin.x) * this.volume.header.voxelDimensions.xSize, (this.volume.header.origin.y - a) * this.volume.header.voxelDimensions.ySize, (this.volume.header.origin.z - d) * this.volume.header.voxelDimensions.zSize);
    return b
};
papaya.viewer.Viewer.prototype.getIndexCoordinateAtWorld = function(c, a, d, b) {
    b.setCoordinate(c / this.volume.header.voxelDimensions.xSize + this.volume.header.origin.x, -1 * (a / this.volume.header.voxelDimensions.ySize - this.volume.header.origin.y), -1 * (d / this.volume.header.voxelDimensions.zSize - this.volume.header.origin.z), !0);
    return b
};
papaya.viewer.Viewer.prototype.getNextColorTable = function() {
    var c, a = 0;
    for (c = 1; c < this.screenVolumes.length; c += 1) this.screenVolumes[c].dti || (a += 1);
    return papaya.viewer.ColorTable.OVERLAY_COLOR_TABLES[a % papaya.viewer.ColorTable.OVERLAY_COLOR_TABLES.length].name
};
papaya.viewer.Viewer.prototype.getCurrentValueAt = function(c, a, d) {
    var b = !this.currentScreenVolume.interpolation,
        b = b & "Yes" === this.container.preferences.smoothDisplay;
    return this.worldSpace ? (b |= this.currentScreenVolume.volume === this.volume && this.volume.isWorldSpaceOnly(), this.currentScreenVolume.volume.getVoxelAtCoordinate((c - this.volume.header.origin.x) * this.volume.header.voxelDimensions.xSize, (this.volume.header.origin.y - a) * this.volume.header.voxelDimensions.ySize, (this.volume.header.origin.z - d) * this.volume.header.voxelDimensions.zSize,
        this.currentScreenVolume.currentTimepoint, !b)) : this.currentScreenVolume.volume.getVoxelAtMM(c * this.volume.header.voxelDimensions.xSize, a * this.volume.header.voxelDimensions.ySize, d * this.volume.header.voxelDimensions.zSize, this.currentScreenVolume.currentTimepoint, !b)
};
papaya.viewer.Viewer.prototype.resetViewer = function() {
    this.container.showControlBar ? ($("." + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS).prop("disabled", !0)) : this.container.showControls && ($("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + this.container.containerIndex).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS +
        this.container.containerIndex).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + this.container.containerIndex).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.container.containerIndex).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.container.containerIndex).css({
        display: "none"
    }));
    this.initialized = !1;
    this.loadingVolume = null;
    this.volume = new papaya.volume.Volume(this.container.display, this);
    this.screenVolumes = [];
    this.surfaces = [];
    this.lowerImageTop = this.lowerImageBot = this.lowerImageBot2 = this.mainImage = this.sagittalSlice = this.coronalSlice = this.axialSlice = this.currentScreenVolume = this.surfaceView = null;
    this.viewerDim = 0;
    this.currentCoord = new papaya.core.Coordinate(0, 0, 0);
    this.draggingSliceDir = this.longestDimSize = this.longestDim = 0;
    this.hasSeries = this.isWindowControl = this.isDragging = !1;
    this.previousMousePosition = new papaya.core.Point;
    this.canvas.removeEventListener("mousemove", this.listenerMouseMove, !1);
    this.canvas.removeEventListener("mousedown",
        this.listenerMouseDown, !1);
    this.canvas.removeEventListener("mouseout", this.listenerMouseOut, !1);
    this.canvas.removeEventListener("mouseleave", this.listenerMouseLeave, !1);
    this.canvas.removeEventListener("mouseup", this.listenerMouseUp, !1);
    document.removeEventListener("keydown", this.listenerKeyDown, !0);
    document.removeEventListener("keyup", this.listenerKeyUp, !0);
    document.removeEventListener("contextmenu", this.listenerContextMenu, !1);
    this.canvas.removeEventListener("touchmove", this.listenerTouchMove, !1);
    this.canvas.removeEventListener("touchstart", this.listenerTouchStart, !1);
    this.canvas.removeEventListener("touchend", this.listenerTouchEnd, !1);
    this.canvas.removeEventListener("dblclick", this.listenerMouseDoubleClick, !1);
    this.removeScroll();
    this.updateTimerEvent = this.updateTimer = null;
    this.drawEmptyViewer();
    this.container.display && this.container.display.drawEmptyDisplay();
    this.updateSliceSliderControl();
    this.container.toolbar.buildToolbar()
};
papaya.viewer.Viewer.prototype.getHeaderDescription = function(c) {
    return this.screenVolumes[c || 0].volume.header.toString()
};
papaya.viewer.Viewer.prototype.getImageDimensionsDescription = function(c) {
    var a;
    a = this.screenVolumes[c].volume.header.orientation.orientation;
    c = this.screenVolumes[c].volume.header.imageDimensions;
    return "(" + a.charAt(0) + ", " + a.charAt(1) + ", " + a.charAt(2) + ") " + c.cols + " x " + c.rows + " x " + c.slices
};
papaya.viewer.Viewer.prototype.getVoxelDimensionsDescription = function(c) {
    var a;
    a = this.screenVolumes[c].volume.header.orientation.orientation;
    c = this.screenVolumes[c].volume.header.voxelDimensions;
    return "(" + a.charAt(0) + ", " + a.charAt(1) + ", " + a.charAt(2) + ") " + papaya.utilities.StringUtils.formatNumber(c.colSize, !0) + " x " + papaya.utilities.StringUtils.formatNumber(c.rowSize, !0) + " x " + papaya.utilities.StringUtils.formatNumber(c.sliceSize, !0) + " " + c.getSpatialUnitString()
};
papaya.viewer.Viewer.prototype.getSeriesDimensionsDescription = function(c) {
    return this.screenVolumes[c].volume.header.imageDimensions.timepoints.toString()
};
papaya.viewer.Viewer.prototype.getSeriesSizeDescription = function(c) {
    c = this.screenVolumes[c].volume.header.voxelDimensions;
    return c.timeSize.toString() + " " + c.getTemporalUnitString()
};
papaya.viewer.Viewer.prototype.getFilename = function(c) {
    return papaya.utilities.StringUtils.wordwrap(this.screenVolumes[c].volume.fileName, 25, "<br />", !0)
};
papaya.viewer.Viewer.prototype.getSurfaceFilename = function(c) {
    return papaya.utilities.StringUtils.wordwrap(this.surfaces[c].filename, 25, "<br />", !0)
};
papaya.viewer.Viewer.prototype.getSurfaceNumPoints = function(c) {
    return this.surfaces[c].numPoints
};
papaya.viewer.Viewer.prototype.getSurfaceNumTriangles = function(c) {
    return this.surfaces[c].numTriangles
};
papaya.viewer.Viewer.prototype.getNiceFilename = function(c) {
    c = this.screenVolumes[c].volume.fileName.replace(".nii", "").replace(".gz", "");
    c.length > papaya.viewer.Viewer.TITLE_MAX_LENGTH && (c = c.substr(0, papaya.viewer.Viewer.TITLE_MAX_LENGTH - 3) + "...");
    return c
};
papaya.viewer.Viewer.prototype.getFileLength = function(c) {
    return papaya.utilities.StringUtils.getSizeString(this.screenVolumes[c].volume.fileLength)
};
papaya.viewer.Viewer.prototype.getByteTypeDescription = function(c) {
    return this.screenVolumes[c].volume.header.imageType.numBytes + "-Byte " + this.screenVolumes[c].volume.header.imageType.getTypeDescription()
};
papaya.viewer.Viewer.prototype.getByteOrderDescription = function(c) {
    return this.screenVolumes[c].volume.header.imageType.getOrderDescription()
};
papaya.viewer.Viewer.prototype.getCompressedDescription = function(c) {
    return this.screenVolumes[c].volume.header.imageType.compressed ? "Yes" : "No"
};
papaya.viewer.Viewer.prototype.getOrientationDescription = function(c) {
    return this.screenVolumes[c].volume.header.orientation.getOrientationDescription()
};
papaya.viewer.Viewer.prototype.getImageDescription = function(c) {
    return papaya.utilities.StringUtils.wordwrap(this.screenVolumes[c].volume.header.imageDescription.notes, 35, "<br />", !0)
};
papaya.viewer.Viewer.prototype.setCurrentScreenVol = function(c) {
    this.currentScreenVolume = this.screenVolumes[c];
    this.updateWindowTitle()
};
papaya.viewer.Viewer.prototype.updateWindowTitle = function() {
    var c;
    this.initialized && (c = this.getNiceFilename(this.getCurrentScreenVolIndex()), 1 < this.currentScreenVolume.volume.numTimepoints && (c = this.currentScreenVolume.seriesLabels && this.currentScreenVolume.seriesLabels.length > this.currentScreenVolume.currentTimepoint ? this.currentScreenVolume.seriesLabels[this.currentScreenVolume.currentTimepoint] : c + " (" + (this.currentScreenVolume.currentTimepoint + 1) + " of " + this.currentScreenVolume.volume.numTimepoints +
        ")"), this.isZooming() && (c = c + " " + this.getZoomString()), this.container.toolbar.updateTitleBar(c))
};
papaya.viewer.Viewer.prototype.getCurrentScreenVolIndex = function() {
    var c;
    for (c = 0; c < this.screenVolumes.length; c += 1)
        if (this.screenVolumes[c] === this.currentScreenVolume) return c;
    return -1
};
papaya.viewer.Viewer.prototype.toggleWorldSpace = function() {
    this.worldSpace = !this.worldSpace;
    this.container.syncOverlaySeries && this.reconcileOverlaySeriesPoint(this.currentScreenVolume)
};
papaya.viewer.Viewer.prototype.isSelected = function(c) {
    return this.isSelectable() && c === this.getCurrentScreenVolIndex()
};
papaya.viewer.Viewer.prototype.isSelectable = function() {
    return 1 < this.screenVolumes.length
};
papaya.viewer.Viewer.prototype.processParams = function(c) {
    c.worldSpace && (this.worldSpace = !0);
    c.ignoreNiftiTransforms && (this.ignoreNiftiTransforms = !0);
    c.coordinate && (this.initialCoordinate = c.coordinate);
    c.ignoreSync && (this.ignoreSync = c.ignoreSync);
    this.container.isDesktopMode() || (void 0 !== c.showOrientation && (this.container.preferences.showOrientation = c.showOrientation ? "Yes" : "No"), void 0 !== c.smoothDisplay && (this.container.preferences.smoothDisplay = c.smoothDisplay ? "Yes" : "No"), void 0 !== c.radiological &&
        (this.container.preferences.radiological = c.radiological ? "Yes" : "No"), void 0 !== c.showRuler && (this.container.preferences.showRuler = c.showRuler ? "Yes" : "No"), void 0 !== c.showSurfacePlanes && (this.container.preferences.showSurfacePlanes = c.showSurfacePlanes ? "Yes" : "No"), void 0 !== c.showSurfaceCrosshairs && (this.container.preferences.showSurfaceCrosshairs = c.showSurfaceCrosshairs ? "Yes" : "No"))
};
papaya.viewer.Viewer.prototype.hasLoadedDTI = function() {
    return 1 === this.screenVolumes.length && this.screenVolumes[0].dti && null === this.screenVolumes[0].dtiVolumeMod
};
papaya.viewer.Viewer.prototype.goToInitialCoordinate = function() {
    var c = new papaya.core.Coordinate;
    0 < this.screenVolumes.length && (null === this.initialCoordinate ? c.setCoordinate(papayaFloorFast(this.volume.header.imageDimensions.xDim / 2), papayaFloorFast(this.volume.header.imageDimensions.yDim / 2), papayaFloorFast(this.volume.header.imageDimensions.zDim / 2), !0) : (this.worldSpace ? this.getIndexCoordinateAtWorld(this.initialCoordinate[0], this.initialCoordinate[1], this.initialCoordinate[2], c) : c.setCoordinate(this.initialCoordinate[0],
        this.initialCoordinate[1], this.initialCoordinate[2], !0), this.initialCoordinate = null), this.gotoCoordinate(c), this.container.display && this.container.display.drawDisplay(this.currentCoord.x, this.currentCoord.y, this.currentCoord.z))
};
papaya.viewer.Viewer.prototype.getOrientationCertaintyColor = function() {
    var c = this.screenVolumes[0].volume.header.orientationCertainty;
    return c === papaya.volume.Header.ORIENTATION_CERTAINTY_LOW ? papaya.viewer.Viewer.ORIENTATION_CERTAINTY_LOW_COLOR : c === papaya.volume.Header.ORIENTATION_CERTAINTY_HIGH ? papaya.viewer.Viewer.ORIENTATION_CERTAINTY_HIGH_COLOR : papaya.viewer.Viewer.ORIENTATION_CERTAINTY_UNKNOWN_COLOR
};
papaya.viewer.Viewer.prototype.isUsingAtlas = function(c) {
    return c === this.atlas.currentAtlas
};
papaya.viewer.Viewer.prototype.scrolled = function(c) {
    var a;
    c = c || window.event;
    c.target == this.canvas && (c.preventDefault && c.preventDefault(), c.returnValue = !1, a = "Increment Slice" === this.container.preferences.scrollBehavior, c = papaya.utilities.PlatformUtils.getScrollSign(c, !a), a ? 0 > c ? (this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.incrementAxial(!1, Math.abs(c)) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.incrementCoronal(!1, Math.abs(c)) :
        this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && this.incrementSagittal(!1, Math.abs(c)), this.gotoCoordinate(this.currentCoord)) : 0 < c && (this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.incrementAxial(!0, Math.abs(c)) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.incrementCoronal(!0, Math.abs(c)) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && this.incrementSagittal(!0, Math.abs(c)),
        this.gotoCoordinate(this.currentCoord)) : 0 !== c && (this.isZoomMode = !0, this.mainImage === this.surfaceView ? (this.surfaceView.zoom += -5 * c * this.surfaceView.scaleFactor, this.drawViewer(!1, !0)) : (this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.setZoomLocation(this.currentCoord.x, this.currentCoord.y, this.mainImage.sliceDirection) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.setZoomLocation(this.currentCoord.x, this.currentCoord.z, this.mainImage.sliceDirection) :
        this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && this.setZoomLocation(this.currentCoord.y, this.currentCoord.z, this.mainImage.sliceDirection), this.setZoomFactor(this.zoomFactorPrevious + .1 * c * this.zoomFactorPrevious)), this.zoomFactorPrevious = this.zoomFactor))
};
papaya.viewer.Viewer.prototype.incrementAxial = function(c, a) {
    var d = this.volume.header.imageDimensions.zDim;
    void 0 === a && (a = 1);
    c ? (this.currentCoord.z += a, this.currentCoord.z >= d && (this.currentCoord.z = d - 1)) : (this.currentCoord.z -= a, 0 > this.currentCoord.z && (this.currentCoord.z = 0));
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.incrementCoronal = function(c, a) {
    var d = this.volume.header.imageDimensions.yDim;
    void 0 === a && (a = 1);
    c ? (this.currentCoord.y += a, this.currentCoord.y >= d && (this.currentCoord.y = d - 1)) : (this.currentCoord.y -= a, 0 > this.currentCoord.y && (this.currentCoord.y = 0));
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.incrementSagittal = function(c, a) {
    var d = this.volume.header.imageDimensions.xDim;
    void 0 === a && (a = 1);
    c ? (this.currentCoord.x -= a, 0 > this.currentCoord.x && (this.currentCoord.x = 0)) : (this.currentCoord.x += a, this.currentCoord.x >= d && (this.currentCoord.x = d - 1));
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.setZoomFactor = function(c) {
    c > papaya.viewer.Viewer.ZOOM_FACTOR_MAX ? c = papaya.viewer.Viewer.ZOOM_FACTOR_MAX : c < papaya.viewer.Viewer.ZOOM_FACTOR_MIN && (c = papaya.viewer.Viewer.ZOOM_FACTOR_MIN);
    this.zoomFactor = c;
    1 === this.zoomFactor && (this.panAmountX = this.panAmountY = this.panAmountZ = 0);
    this.axialSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocY, this.panAmountX, this.panAmountY, this);
    this.coronalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocZ,
        this.panAmountX, this.panAmountZ, this);
    this.sagittalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocY, this.zoomLocZ, this.panAmountY, this.panAmountZ, this);
    this.drawViewer(!1, !0);
    this.updateWindowTitle()
};
papaya.viewer.Viewer.prototype.getZoomString = function() {
    return parseInt(100 * this.zoomFactor, 10) + "%"
};
papaya.viewer.Viewer.prototype.isZooming = function() {
    return 1 < this.zoomFactor
};
papaya.viewer.Viewer.prototype.setZoomLocation = function() {
    1 === this.zoomFactor && (this.zoomLocX = this.currentCoord.x, this.zoomLocY = this.currentCoord.y, this.zoomLocZ = this.currentCoord.z, this.axialSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocY, this.panAmountX, this.panAmountY, this), this.coronalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocZ, this.panAmountX, this.panAmountZ, this), this.sagittalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocY, this.zoomLocZ,
        this.panAmountY, this.panAmountZ, this), this.drawViewer(!1, !0))
};
papaya.viewer.Viewer.prototype.setStartPanLocation = function(c, a, d) {
    1 < this.zoomFactor && (d === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (this.panLocX = c, this.panLocY = a, this.panLocZ = this.axialSlice.currentSlice) : d === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (this.panLocX = c, this.panLocY = this.coronalSlice.currentSlice, this.panLocZ = a) : d === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (this.panLocX = this.sagittalSlice.currentSlice, this.panLocY = c, this.panLocZ = a))
};
papaya.viewer.Viewer.prototype.setCurrentPanLocation = function(c, a, d) {
    1 < this.zoomFactor && (d === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (this.panAmountX += c - this.panLocX, this.panAmountY += a - this.panLocY, this.panAmountZ = 0) : d === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (this.panAmountX += c - this.panLocX, this.panAmountY = 0, this.panAmountZ += a - this.panLocZ) : d === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (this.panAmountX = 0, this.panAmountY += c - this.panLocY, this.panAmountZ += a - this.panLocZ), this.axialSlice.updateZoomTransform(this.zoomFactor,
        this.zoomLocX, this.zoomLocY, this.panAmountX, this.panAmountY, this), this.coronalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocX, this.zoomLocZ, this.panAmountX, this.panAmountZ, this), this.sagittalSlice.updateZoomTransform(this.zoomFactor, this.zoomLocY, this.zoomLocZ, this.panAmountY, this.panAmountZ, this), this.drawViewer(!1, !0))
};
papaya.viewer.Viewer.prototype.isWorldMode = function() {
    return this.worldSpace
};
papaya.viewer.Viewer.prototype.isRadiologicalMode = function() {
    return "Yes" === this.container.preferences.radiological
};
papaya.viewer.Viewer.prototype.isCollapsable = function() {
    return this.container.collapsable
};
papaya.viewer.Viewer.prototype.mainSliderControlChanged = function() {
    this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? this.currentCoord.z = parseInt(this.mainSliderControl.val(), 10) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? this.currentCoord.y = parseInt(this.mainSliderControl.val(), 10) : this.mainImage.sliceDirection === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL && (this.currentCoord.x = parseInt(this.mainSliderControl.val(), 10));
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.axialSliderControlChanged = function() {
    this.currentCoord.z = parseInt(this.axialSliderControl.val(), 10);
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.coronalSliderControlChanged = function() {
    this.currentCoord.y = parseInt(this.coronalSliderControl.val(), 10);
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.sagittalSliderControlChanged = function() {
    this.currentCoord.x = parseInt(this.sagittalSliderControl.val(), 10);
    this.gotoCoordinate(this.currentCoord)
};
papaya.viewer.Viewer.prototype.seriesSliderControlChanged = function() {
    this.currentScreenVolume.setTimepoint(parseInt(this.seriesSliderControl.val(), 10));
    this.currentScreenVolume.isOverlay() && this.container.syncOverlaySeries && this.reconcileOverlaySeriesPoint(this.currentScreenVolume);
    this.timepointChanged()
};
papaya.viewer.Viewer.prototype.updateSliceSliderControl = function() {
    this.mainSliderControl && this.doUpdateSliceSliderControl(this.mainSliderControl, this.mainImage.sliceDirection);
    this.axialSliderControl && this.doUpdateSliceSliderControl(this.axialSliderControl, papaya.viewer.ScreenSlice.DIRECTION_AXIAL);
    this.coronalSliderControl && this.doUpdateSliceSliderControl(this.coronalSliderControl, papaya.viewer.ScreenSlice.DIRECTION_CORONAL);
    this.sagittalSliderControl && this.doUpdateSliceSliderControl(this.sagittalSliderControl,
        papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL);
    this.seriesSliderControl && this.doUpdateSliceSliderControl(this.seriesSliderControl, papaya.viewer.ScreenSlice.DIRECTION_TEMPORAL)
};
papaya.viewer.Viewer.prototype.doUpdateSliceSliderControl = function(c, a) {
    this.initialized ? (c.prop("disabled", !1), c.prop("min", "0"), c.prop("step", "1"), a === papaya.viewer.ScreenSlice.DIRECTION_AXIAL ? (c.prop("max", (this.volume.header.imageDimensions.zDim - 1).toString()), c.val(this.currentCoord.z)) : a === papaya.viewer.ScreenSlice.DIRECTION_CORONAL ? (c.prop("max", (this.volume.header.imageDimensions.yDim - 1).toString()), c.val(this.currentCoord.y)) : a === papaya.viewer.ScreenSlice.DIRECTION_SAGITTAL ? (c.prop("max",
        (this.volume.header.imageDimensions.xDim - 1).toString()), c.val(this.currentCoord.x)) : a === papaya.viewer.ScreenSlice.DIRECTION_TEMPORAL && (c.prop("max", (this.currentScreenVolume.volume.header.imageDimensions.timepoints - 1).toString()), c.val(this.currentScreenVolume.currentTimepoint))) : (c.prop("disabled", !0), c.prop("min", "0"), c.prop("step", "1"), c.prop("max", "1"), c.val(0))
};
papaya.viewer.Viewer.prototype.incrementSeriesPoint = function() {
    this.currentScreenVolume.incrementTimepoint();
    this.currentScreenVolume.isOverlay() && this.container.syncOverlaySeries && this.reconcileOverlaySeriesPoint(this.currentScreenVolume);
    this.timepointChanged()
};
papaya.viewer.Viewer.prototype.decrementSeriesPoint = function() {
    this.currentScreenVolume.decrementTimepoint();
    this.currentScreenVolume.isOverlay() && this.container.syncOverlaySeries && this.reconcileOverlaySeriesPoint(this.currentScreenVolume);
    this.timepointChanged()
};
papaya.viewer.Viewer.prototype.reconcileOverlaySeriesPoint = function(c) {
    var a, d;
    if (this.worldSpace)
        for (d = c.getCurrentTime(), a = 1; a < this.screenVolumes.length; a += 1) this.screenVolumes[a] !== c && this.screenVolumes[a].setCurrentTime(d);
    else
        for (d = c.currentTimepoint, a = 1; a < this.screenVolumes.length; a += 1) this.screenVolumes[a] !== c && this.screenVolumes[a].setTimepoint(d)
};
papaya.viewer.Viewer.prototype.hasParametricPair = function(c) {
    return c ? null !== this.screenVolumes[c].negativeScreenVol : !1
};
papaya.viewer.Viewer.prototype.getScreenVolumeIndex = function(c) {
    var a;
    if (c)
        for (a = 0; a < this.screenVolumes.length; a += 1)
            if (c === this.screenVolumes[a]) return a;
    return -1
};
papaya.viewer.Viewer.prototype.getScreenVolumeByName = function(c) {
    var a;
    for (a = 0; a < this.screenVolumes.length; a += 1)
        if (c == this.screenVolumes[a].volume.fileName) return this.screenVolumes[a];
    return null
};
papaya.viewer.Viewer.prototype.isShowingRuler = function() {
    return "Yes" === this.container.preferences.showRuler
};
papaya.viewer.Viewer.prototype.isShowingOrientation = function() {
    return "Yes" === this.container.preferences.showOrientation
};
papaya.viewer.Viewer.prototype.isShowingCrosshairs = function() {
    return "Yes" === this.container.preferences.showCrosshairs
};
papaya.viewer.Viewer.prototype.isShowingSurfacePlanes = function() {
    return this.surfaceView && this.surfaceView.showSurfacePlanes
};
papaya.viewer.Viewer.prototype.isShowingSurfaceCrosshairs = function() {
    return this.surfaceView && this.surfaceView.showSurfaceCrosshairs
};
papaya.viewer.Viewer.prototype.restart = function(c, a, d, b) {
    this.resetViewer();
    this.container.toolbar.updateImageButtons();
    this.loadImage(c, a, d, b)
};
papaya.viewer.Viewer.prototype.removeOverlay = function(c) {
    var a;
    c = this.container.viewer.screenVolumes[c];
    a = c.negativeScreenVol;
    this.closeOverlayByRef(c);
    this.container.combineParametric && this.closeOverlayByRef(a);
    this.drawViewer(!0, !1)
};
papaya.viewer.Viewer.prototype.toggleOverlay = function(c) {
    var a;
    c = this.container.viewer.screenVolumes[c];
    c.hidden = !c.hidden;
    a = c.negativeScreenVol;
    this.container.combineParametric && a && (a.hidden = !a.hidden);
    this.drawViewer(!0, !1);
    return c.hidden
};
papaya.viewer.Viewer.prototype.addParametric = function(c) {
    c = this.container.viewer.screenVolumes[c];
    var a;
    null === c.negativeScreenVol && (this.screenVolumes[this.screenVolumes.length] = a = new papaya.viewer.ScreenVolume(c.volume, {}, papaya.viewer.ColorTable.PARAMETRIC_COLOR_TABLES[1].name, !1, !0, this.currentCoord), c.negativeScreenVol = a, this.setCurrentScreenVol(this.screenVolumes.length - 1), this.drawViewer(!0, !1), this.container.toolbar.buildToolbar(), this.container.toolbar.updateImageButtons())
};
"use strict";
papaya = papaya || {};
papaya.viewer = papaya.viewer || {};
var shaderVert = "precision mediump float;\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec4 aVertexColor;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat3 uNMatrix;\nuniform vec3 uAmbientColor;\nuniform vec3 uPointLightingLocation;\nuniform vec3 uPointLightingColor;\nuniform bool uActivePlane;\nuniform bool uActivePlaneEdge;\nuniform bool uCrosshairs;\nuniform bool uColors;\nuniform bool uColorPicking;\nuniform bool uTrianglePicking;\nuniform bool uColorSolid;\nuniform vec4 uSolidColor;\nuniform bool uOrientationText;\nuniform bool uRuler;\nuniform float uAlpha;\nvarying vec3 vLightWeighting;\nvarying lowp vec4 vColor;\nvarying vec2 vTextureCoord;\nvoid main(void) {\n    vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);\n    gl_Position = uPMatrix * mvPosition;\n    if (!uActivePlane && !uActivePlaneEdge && !uCrosshairs && !uOrientationText && !uRuler) {\n       vec3 lightDirection = normalize(uPointLightingLocation - mvPosition.xyz);\n       vec3 transformedNormal = uNMatrix * aVertexNormal;\n       float directionalLightWeighting = max(dot(transformedNormal, lightDirection), 0.0);\n       vLightWeighting = uAmbientColor + uPointLightingColor * directionalLightWeighting;\n       if (uColors) {\n           vColor = aVertexColor;\n       }\n   }\n   if (uColorSolid) {\n       vColor = uSolidColor;\n   }\n   if (uOrientationText) {\n       vTextureCoord = aTextureCoord;\n   }\n}",
    shaderFrag =
    "precision mediump float;\nuniform bool uActivePlane;\nuniform bool uActivePlaneEdge;\nuniform bool uCrosshairs;\nuniform bool uColors;\nuniform bool uColorPicking;\nuniform bool uTrianglePicking;\nuniform bool uColorSolid;\nuniform vec4 uSolidColor;\nuniform bool uOrientationText;\nuniform bool uRuler;\nuniform sampler2D uSampler;\nuniform float uAlpha;\nvarying vec3 vLightWeighting;\nvarying lowp vec4 vColor;\nvarying vec2 vTextureCoord;\nvec4 packFloatToVec4i(const float value) {\n   const vec4 bitSh = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\n   const vec4 bitMsk = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\n   vec4 res = fract(value * bitSh);\n   res -= res.xxyz * bitMsk;\n   return res;\n}\nvoid main(void) {\n    vec4 fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);\n    if (uColors) {\n       fragmentColor = vColor;\n    } else if (uColorSolid) {\n       fragmentColor = vColor;\n    }\n    if (uActivePlane) {\n       gl_FragColor = vec4(0.10980392156863, 0.52549019607843, 0.93333333333333, 0.5);\n    } else if (uActivePlaneEdge) {\n       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n    } else if (uRuler) {\n       gl_FragColor = vec4(1.0, 0.078, 0.576, 1.0);\n    } else if (uOrientationText) {\n        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n        if (textureColor.a > 0.0) {\n           gl_FragColor = vec4(textureColor.rgb, textureColor.a);\n        } else {\n           gl_FragColor = vec4(textureColor.rgb, 0);\n        }\n    } else if (uCrosshairs) {\n       gl_FragColor = vec4(0.10980392156863, 0.52549019607843, 0.93333333333333, 1.0);\n    } else if (uColorPicking) {\n       gl_FragColor = vec4(fragmentColor.r, fragmentColor.g, fragmentColor.b, 1);\n    } else if (uTrianglePicking) {\n       gl_FragColor = packFloatToVec4i(gl_FragCoord.z);\n    } else {\n       gl_FragColor = vec4(fragmentColor.rgb * vLightWeighting, uAlpha);\n    }\n}";
papaya.viewer.ScreenSurface = papaya.viewer.ScreenSurface || function(c, a, d, b) {
    this.shaderProgram = null;
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.pMatrix1 = mat4.create();
    this.centerMat = mat4.create();
    this.centerMatInv = mat4.create();
    this.tempMat = mat4.create();
    this.tempMat2 = mat4.create();
    this.pickingBuffer = null;
    this.initialized = !1;
    this.screenDim = this.screenOffsetY = this.screenOffsetX = 0;
    this.screenTransform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.volume = c;
    this.surfaces = a;
    this.viewer = d;
    this.currentCoord =
        d.currentCoord;
    this.zoom = 0;
    this.sliceDirection = papaya.viewer.ScreenSlice.DIRECTION_SURFACE;
    this.dynamicStartY = this.dynamicStartX = -1;
    this.activePlaneVertsAxial = new Float32Array(12);
    this.activePlaneVertsCoronal = new Float32Array(12);
    this.activePlaneVertsSagittal = new Float32Array(12);
    this.activePlaneVertsAxialEdges = new Float32Array(24);
    this.activePlaneVertsCoronalEdges = new Float32Array(24);
    this.activePlaneVertsSagittalEdges = new Float32Array(24);
    this.orientationVerts = new Float32Array(24);
    this.crosshairLineVertsX =
        new Float32Array(6);
    this.crosshairLineVertsY = new Float32Array(6);
    this.crosshairLineVertsZ = new Float32Array(6);
    this.mouseRotDragX = this.clearTransform([]);
    this.mouseRotDragY = this.clearTransform([]);
    this.mouseRotDrag = this.clearTransform([]);
    this.mouseTransDrag = this.clearTransform([]);
    this.mouseRotCurrent = this.clearTransform([]);
    this.mouseTransCurrent = this.clearTransform([]);
    this.mouseRotTemp = this.clearTransform([]);
    this.mouseTransTemp = this.clearTransform([]);
    this.crosshairLineZBuffer = this.crosshairLineZBuffer =
        this.crosshairLineYBuffer = this.crosshairLineXBuffer = this.orientationBuffer = this.activePlaneSagittalEdgesBuffer = this.activePlaneCoronalEdgesBuffer = this.activePlaneAxialEdgesBuffer = this.activePlaneSagittalBuffer = this.activePlaneCoronalBuffer = this.activePlaneAxialBuffer = null;
    this.xSize = this.volume.header.voxelDimensions.xSize;
    this.xDim = this.volume.header.imageDimensions.xDim;
    this.xHalf = this.xDim * this.xSize / 2;
    this.ySize = this.volume.header.voxelDimensions.ySize;
    this.yDim = this.volume.header.imageDimensions.yDim;
    this.yHalf = this.yDim * this.ySize / 2;
    this.zSize = this.volume.header.voxelDimensions.zSize;
    this.zDim = this.volume.header.imageDimensions.zDim;
    this.zHalf = this.zDim * this.zSize / 2;
    this.showSurfacePlanes = "Yes" === d.container.preferences.showSurfacePlanes;
    this.backgroundColor = papaya.viewer.ScreenSurface.DEFAULT_BACKGROUND;
    this.pickLocY = this.pickLocX = 0;
    this.needsPickColor = !1;
    this.pickedColor = null;
    this.needsPick = !1;
    this.pickedCoordinate = null;
    this.scaleFactor = 1;
    this.rulerPoints = this.orientationContext = this.orientationCanvas =
        this.orientationTextureCoordBuffer = this.orientationTextureCoords = this.orientationTexture = null;
    this.grabbedRulerPoint = -1;
    this.processParams(b)
};
papaya.viewer.ScreenSurface.DEFAULT_ORIENTATION = [-.015552218963737041, .09408106275544359, -.9954430697501158, 0, -.9696501263313991, .24152923619118966, .03797658948646743, 0, .24400145970103732, .965822108594413, .0874693978960848, 0, 0, 0, 0, 1];
papaya.viewer.ScreenSurface.MOUSE_SENSITIVITY = .3;
papaya.viewer.ScreenSurface.DEFAULT_BACKGROUND = [.5, .5, .5];
papaya.viewer.ScreenSurface.TEXT_SIZE = 50;
papaya.viewer.ScreenSurface.ORIENTATION_SIZE = 10;
papaya.viewer.ScreenSurface.RULER_COLOR = [1, .078, .576];
papaya.viewer.ScreenSurface.RULER_NUM_LINES = 25;
papaya.viewer.ScreenSurface.RULER_RADIUS = 1;
papaya.viewer.ScreenSurface.EXT_INT = null;
papaya.viewer.ScreenSurface.makeShader = function(c, a, d) {
    d = c.createShader(d);
    c.shaderSource(d, a);
    c.compileShader(d);
    return c.getShaderParameter(d, c.COMPILE_STATUS) ? d : (console.log(c.getShaderInfoLog(d)), null)
};
papaya.viewer.ScreenSurface.initShaders = function(c) {
    var a = papaya.viewer.ScreenSurface.makeShader(c, shaderVert, c.VERTEX_SHADER),
        d = papaya.viewer.ScreenSurface.makeShader(c, shaderFrag, c.FRAGMENT_SHADER),
        b = c.createProgram();
    c.attachShader(b, d);
    c.attachShader(b, a);
    c.linkProgram(b);
    c.getProgramParameter(b, c.LINK_STATUS) || console.log("Could not initialise shaders");
    c.useProgram(b);
    b.vertexPositionAttribute = c.getAttribLocation(b, "aVertexPosition");
    c.enableVertexAttribArray(b.vertexPositionAttribute);
    b.vertexNormalAttribute =
        c.getAttribLocation(b, "aVertexNormal");
    c.enableVertexAttribArray(b.vertexNormalAttribute);
    b.vertexColorAttribute = c.getAttribLocation(b, "aVertexColor");
    b.textureCoordAttribute = c.getAttribLocation(b, "aTextureCoord");
    b.pMatrixUniform = c.getUniformLocation(b, "uPMatrix");
    b.mvMatrixUniform = c.getUniformLocation(b, "uMVMatrix");
    b.nMatrixUniform = c.getUniformLocation(b, "uNMatrix");
    b.ambientColorUniform = c.getUniformLocation(b, "uAmbientColor");
    b.pointLightingLocationUniform = c.getUniformLocation(b, "uPointLightingLocation");
    b.pointLightingColorUniform = c.getUniformLocation(b, "uPointLightingColor");
    b.activePlane = c.getUniformLocation(b, "uActivePlane");
    b.activePlaneEdge = c.getUniformLocation(b, "uActivePlaneEdge");
    b.colorPicking = c.getUniformLocation(b, "uColorPicking");
    b.trianglePicking = c.getUniformLocation(b, "uTrianglePicking");
    b.crosshairs = c.getUniformLocation(b, "uCrosshairs");
    b.hasColors = c.getUniformLocation(b, "uColors");
    b.hasSolidColor = c.getUniformLocation(b, "uColorSolid");
    b.solidColor = c.getUniformLocation(b, "uSolidColor");
    b.orientationText = c.getUniformLocation(b, "uOrientationText");
    b.samplerUniform = c.getUniformLocation(b, "uSampler");
    b.ruler = c.getUniformLocation(b, "uRuler");
    b.alphaVal = c.getUniformLocation(b, "uAlpha");
    return b
};
papaya.viewer.ScreenSurface.prototype.initialize = function() {
    var c;
    this.initialized = !0;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.screenDim;
    this.canvas.height = this.screenDim;
    this.context = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
    this.context.viewportWidth = this.canvas.width;
    this.context.viewportHeight = this.canvas.height;
    this.zoom = this.volume.header.imageDimensions.yDim * this.volume.header.voxelDimensions.ySize * 1.5;
    this.initPerspective();
    this.shaderProgram =
        papaya.viewer.ScreenSurface.initShaders(this.context);
    for (c = 0; c < this.surfaces.length; c += 1) this.initBuffers(this.context, this.surfaces[c]);
    this.calculateScaleFactor();
    this.initActivePlaneBuffers(this.context);
    this.initRulerBuffers(this.context);
    mat4.multiply(this.centerMat, papaya.viewer.ScreenSurface.DEFAULT_ORIENTATION, this.tempMat);
    mat4.multiply(this.tempMat, this.centerMatInv, this.mouseRotCurrent);
    papaya.viewer.ScreenSurface.EXT_INT = this.context.getExtension("OES_element_index_uint");
    papaya.viewer.ScreenSurface.EXT_INT ||
        console.log("This browser does not support OES_element_index_uint extension!");
    this.updateBackgroundColor()
};
papaya.viewer.ScreenSurface.prototype.calculateScaleFactor = function() {
    var c = this.ySize * this.yDim,
        a = this.zSize * this.zDim,
        d = this.xSize * this.xDim;
    c > d && (d = c);
    a > d && (d = a);
    this.scaleFactor = d / 256
};
papaya.viewer.ScreenSurface.prototype.resize = function(c) {
    this.initialized || this.initialize();
    this.screenDim = c;
    this.canvas.width = this.screenDim;
    this.canvas.height = this.screenDim;
    this.context.viewportWidth = this.canvas.width;
    this.context.viewportHeight = this.canvas.height
};
papaya.viewer.ScreenSurface.prototype.applyMatrixUniforms = function(c) {
    c.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, !1, this.pMatrix);
    c.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, !1, this.mvMatrix);
    var a = mat3.create();
    mat4.toInverseMat3(this.mvMatrix, a);
    mat3.transpose(a);
    c.uniformMatrix3fv(this.shaderProgram.nMatrixUniform, !1, a)
};
papaya.viewer.ScreenSurface.prototype.draw = function() {
    0 < this.surfaces.length && (this.initialized || this.initialize(), this.drawScene(this.context))
};
papaya.viewer.ScreenSurface.prototype.initBuffers = function(c, a) {
    a.pointsBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, a.pointsBuffer);
    c.bufferData(c.ARRAY_BUFFER, a.pointData, c.STATIC_DRAW);
    a.pointsBuffer.itemSize = 3;
    a.pointsBuffer.numItems = a.numPoints;
    a.normalsBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, a.normalsBuffer);
    c.bufferData(c.ARRAY_BUFFER, a.normalsData, c.STATIC_DRAW);
    a.normalsBuffer.itemSize = 3;
    a.normalsBuffer.numItems = a.numPoints;
    a.colorsData && (a.colorsBuffer = c.createBuffer(),
        c.bindBuffer(c.ARRAY_BUFFER, a.colorsBuffer), c.bufferData(c.ARRAY_BUFFER, a.colorsData, c.STATIC_DRAW), a.colorsBuffer.itemSize = 4, a.colorsBuffer.numItems = a.numPoints);
    a.trianglesBuffer = c.createBuffer();
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a.trianglesBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, a.triangleData, c.STATIC_DRAW);
    a.trianglesBuffer.itemSize = 1;
    a.trianglesBuffer.numItems = 3 * a.numTriangles
};
papaya.viewer.ScreenSurface.prototype.initOrientationBuffers = function(c) {
    this.makeOrientedTextSquare();
    this.orientationBuffer = c.createBuffer();
    this.orientationBuffer.itemSize = 3;
    this.orientationBuffer.numItems = 4;
    this.orientationTextureCoordBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, this.orientationTextureCoordBuffer);
    this.orientationTextureCoords = [0, 1, 0, 0, 1, 1, 1, 0];
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(this.orientationTextureCoords), c.STATIC_DRAW);
    this.orientationTextureCoordBuffer.itemSize =
        2;
    this.orientationTextureCoordBuffer.numItems = 4
};
papaya.viewer.ScreenSurface.prototype.initActivePlaneBuffers = function(c) {
    this.updateActivePlanes();
    this.activePlaneAxialBuffer = c.createBuffer();
    this.activePlaneAxialBuffer.itemSize = 3;
    this.activePlaneAxialBuffer.numItems = 4;
    this.activePlaneCoronalBuffer = c.createBuffer();
    this.activePlaneCoronalBuffer.itemSize = 3;
    this.activePlaneCoronalBuffer.numItems = 4;
    this.activePlaneSagittalBuffer = c.createBuffer();
    this.activePlaneSagittalBuffer.itemSize = 3;
    this.activePlaneSagittalBuffer.numItems = 4;
    this.activePlaneAxialEdgesBuffer =
        c.createBuffer();
    this.activePlaneAxialEdgesBuffer.itemSize = 3;
    this.activePlaneAxialEdgesBuffer.numItems = 8;
    this.activePlaneCoronalEdgesBuffer = c.createBuffer();
    this.activePlaneCoronalEdgesBuffer.itemSize = 3;
    this.activePlaneCoronalEdgesBuffer.numItems = 8;
    this.activePlaneSagittalEdgesBuffer = c.createBuffer();
    this.activePlaneSagittalEdgesBuffer.itemSize = 3;
    this.activePlaneSagittalEdgesBuffer.numItems = 8;
    this.crosshairLineXBuffer = c.createBuffer();
    this.crosshairLineXBuffer.itemSize = 3;
    this.crosshairLineXBuffer.numItems =
        2;
    this.crosshairLineYBuffer = c.createBuffer();
    this.crosshairLineYBuffer.itemSize = 3;
    this.crosshairLineYBuffer.numItems = 2;
    this.crosshairLineZBuffer = c.createBuffer();
    this.crosshairLineZBuffer.itemSize = 3;
    this.crosshairLineZBuffer.numItems = 2
};
papaya.viewer.ScreenSurface.prototype.initRulerBuffers = function(c) {
    this.rulerPointData = this.makeSphere(papaya.viewer.ScreenSurface.RULER_NUM_LINES, papaya.viewer.ScreenSurface.RULER_NUM_LINES, papaya.viewer.ScreenSurface.RULER_RADIUS * this.scaleFactor);
    this.sphereVertexPositionBuffer = c.createBuffer();
    this.sphereVertexPositionBuffer.itemSize = 3;
    this.sphereVertexPositionBuffer.numItems = this.rulerPointData.vertices.length / 3;
    this.sphereNormalsPositionBuffer = c.createBuffer();
    this.sphereNormalsPositionBuffer.itemSize =
        3;
    this.sphereNormalsPositionBuffer.numItems = this.rulerPointData.normals.length / 3;
    this.sphereVertexIndexBuffer = c.createBuffer();
    this.sphereVertexIndexBuffer.itemSize = 1;
    this.sphereVertexIndexBuffer.numItems = this.rulerPointData.indices.length;
    this.rulerLineBuffer = c.createBuffer();
    this.rulerLineBuffer.itemSize = 3;
    this.rulerLineBuffer.numItems = 2
};
papaya.viewer.ScreenSurface.prototype.initPerspective = function() {
    mat4.perspective(45, 1, 10, 1E5, this.pMatrix1);
    this.eye = new vec3.create;
    this.eye[0] = 0;
    this.eye[1] = 0;
    this.center = new vec3.create;
    this.centerWorld = new papaya.core.Coordinate;
    this.viewer.getWorldCoordinateAtIndex(parseInt(this.xDim / 2, 10), parseInt(this.yDim / 2, 10), parseInt(this.zDim / 2, 10), this.centerWorld);
    this.center[0] = this.centerWorld.x;
    this.center[1] = this.centerWorld.y;
    this.center[2] = this.centerWorld.z;
    mat4.identity(this.centerMat);
    mat4.translate(this.centerMat,
        [this.center[0], this.center[1], this.center[2]]);
    mat4.identity(this.centerMatInv);
    mat4.translate(this.centerMatInv, [-this.center[0], -this.center[1], -this.center[2]]);
    this.up = new vec3.create;
    this.up[0] = 0;
    this.up[1] = 1;
    this.up[2] = 0
};
papaya.viewer.ScreenSurface.prototype.updatePerspective = function() {
    var c;
    this.eye[2] = this.zoom;
    c = mat4.lookAt(this.eye, this.center, this.up);
    mat4.multiply(this.pMatrix1, c, this.pMatrix)
};
papaya.viewer.ScreenSurface.prototype.unpackFloatFromVec4i = function(c) {
    var a = [1 / 16777216, 1 / 65536, 1 / 256, 1];
    return c[0] * a[0] + c[1] * a[1] + c[2] * a[2] + c[3] * a[3]
};
papaya.viewer.ScreenSurface.prototype.hasTranslucentSurfaces = function() {
    var c;
    for (c = 0; c < this.surfaces.length; c += 1)
        if (1 > this.surfaces[c].alpha) return !0;
    return !1
};
papaya.viewer.ScreenSurface.prototype.drawScene = function(c) {
    var a, d, b;
    d = this.hasTranslucentSurfaces();
    c.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], 1);
    c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
    c.viewport(0, 0, c.viewportWidth, c.viewportHeight);
    mat4.identity(this.mvMatrix);
    mat4.multiply(this.mouseRotDrag, this.mouseRotCurrent, this.mouseRotTemp);
    mat4.multiply(this.mouseTransDrag, this.mouseTransCurrent, this.mouseTransTemp);
    mat4.multiply(this.mouseTransTemp, this.mouseRotTemp,
        this.tempMat);
    mat4.set(this.tempMat, this.mvMatrix);
    this.updatePerspective();
    this.applyMatrixUniforms(c);
    c.uniform3f(this.shaderProgram.ambientColorUniform, .2, .2, .2);
    c.uniform3f(this.shaderProgram.pointLightingLocationUniform, 0, 0, 300 * this.scaleFactor);
    c.uniform3f(this.shaderProgram.pointLightingColorUniform, .8, .8, .8);
    c.uniform1i(this.shaderProgram.orientationText, 0);
    c.uniform1i(this.shaderProgram.activePlane, 0);
    c.uniform1i(this.shaderProgram.activePlaneEdge, 0);
    c.uniform1i(this.shaderProgram.crosshairs,
        0);
    c.uniform1i(this.shaderProgram.hasColors, 0);
    c.uniform1i(this.shaderProgram.colorPicking, 0);
    c.uniform1i(this.shaderProgram.trianglePicking, 0);
    if (this.needsPick) {
        if (c.uniform1i(this.shaderProgram.trianglePicking, 1), null === this.pickingBuffer || this.pickingBuffer.length !== c.viewportWidth * c.viewportHeight * 4) this.pickingBuffer = new Uint8Array(c.viewportWidth * c.viewportHeight * 4)
    } else this.needsPickColor && (c.uniform1i(this.shaderProgram.colorPicking, 1), null === this.pickingBuffer || this.pickingBuffer.length !==
        c.viewportWidth * c.viewportHeight * 4) && (this.pickingBuffer = new Uint8Array(c.viewportWidth * c.viewportHeight * 4));
    c.enable(c.DEPTH_TEST);
    for (a = 0; a < this.surfaces.length; a += 1) this.renderSurface(c, a, 1 > this.surfaces[a].alpha, !0, !1);
    c.uniform1i(this.shaderProgram.hasSolidColor, 0);
    c.uniform1i(this.shaderProgram.hasColors, 0);
    if (this.needsPick) this.needsPick = !1, this.pickedCoordinate = this.findPickedCoordinate(c, this.pickLocX, this.pickLocY), c.uniform1i(this.shaderProgram.trianglePicking, 0);
    else if (this.needsPickColor) this.needsPickColor = !1, this.pickedColor = this.findPickedColor(c), c.uniform1i(this.shaderProgram.colorPicking, 0);
    else {
        this.showSurfacePlanes && (this.needsUpdateActivePlanes && (this.needsUpdateActivePlanes = !1, this.bindActivePlanes(c)), c.depthMask(!1), c.uniform1i(this.shaderProgram.activePlane, 1), c.enable(c.BLEND), c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneAxialBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneAxialBuffer.itemSize, c.FLOAT,
                !1, 0, 0), c.drawArrays(c.TRIANGLE_STRIP, 0, 4), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneCoronalBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneCoronalBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.TRIANGLE_STRIP, 0, 4), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneSagittalBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneSagittalBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.TRIANGLE_STRIP, 0, 4), c.depthMask(!0), c.disable(c.BLEND),
            c.uniform1i(this.shaderProgram.activePlane, 0), c.uniform1i(this.shaderProgram.activePlaneEdge, 1), c.lineWidth(this.isMainView() ? 3 : 2), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneAxialEdgesBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneAxialEdgesBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 8), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneCoronalEdgesBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneCoronalEdgesBuffer.itemSize,
                c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 8), c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneSagittalEdgesBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.activePlaneSagittalEdgesBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 8), c.uniform1i(this.shaderProgram.activePlaneEdge, 0));
        this.viewer.isShowingCrosshairs() && (this.viewer.mainImage !== this || this.viewer.toggleMainCrosshairs) && (this.needsUpdateActivePlanes && (this.needsUpdateActivePlanes = !1, this.bindActivePlanes(c)),
            c.uniform1i(this.shaderProgram.crosshairs, 1), c.lineWidth(this.isMainView() ? 3 : 2), c.bindBuffer(c.ARRAY_BUFFER, this.crosshairLineXBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.crosshairLineXBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 2), c.bindBuffer(c.ARRAY_BUFFER, this.crosshairLineYBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.crosshairLineYBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 2), c.bindBuffer(c.ARRAY_BUFFER,
                this.crosshairLineZBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.crosshairLineZBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 2), c.uniform1i(this.shaderProgram.crosshairs, 0));
        c.enable(c.DEPTH_TEST);
        for (a = 0; a < this.surfaces.length; a += 1) d && this.renderSurface(c, a, 1 > this.surfaces[a].alpha, !1, !0);
        this.viewer.mainImage === this.viewer.surfaceView && "Yes" === this.viewer.container.preferences.showOrientation && (a = this.currentCoord.x + (this.xDim / 2 - this.volume.header.origin.x),
            d = this.yDim - this.currentCoord.y - (this.yDim / 2 - this.volume.header.origin.y), b = this.zDim - this.currentCoord.z - (this.zDim / 2 - this.volume.header.origin.z), this.drawOrientedText(c, "S", papaya.viewer.ScreenSurface.TEXT_SIZE, [a * this.xSize - this.xHalf, d * this.ySize - this.yHalf, this.zHalf + papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor - (this.zDim / 2 - this.volume.header.origin.z) * this.zSize]), this.drawOrientedText(c, "I", papaya.viewer.ScreenSurface.TEXT_SIZE, [a * this.xSize - this.xHalf, d * this.ySize - this.yHalf,
                -this.zHalf - papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor - (this.zDim / 2 - this.volume.header.origin.z) * this.zSize
            ]), this.drawOrientedText(c, "P", papaya.viewer.ScreenSurface.TEXT_SIZE, [a * this.xSize - this.xHalf, -this.yHalf - papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor - (this.yDim / 2 - this.volume.header.origin.y) * this.ySize, b * this.zSize - this.zHalf]), this.drawOrientedText(c, "A", papaya.viewer.ScreenSurface.TEXT_SIZE, [a * this.xSize - this.xHalf, this.yHalf + papaya.viewer.ScreenSurface.ORIENTATION_SIZE *
                this.scaleFactor - (this.yDim / 2 - this.volume.header.origin.y) * this.ySize, b * this.zSize - this.zHalf
            ]), this.drawOrientedText(c, "L", papaya.viewer.ScreenSurface.TEXT_SIZE, [-this.xHalf - papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor + (this.xDim / 2 - this.volume.header.origin.x) * this.xSize, d * this.ySize - this.yHalf, b * this.zSize - this.zHalf]), this.drawOrientedText(c, "R", papaya.viewer.ScreenSurface.TEXT_SIZE, [this.xHalf + papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor + (this.xDim / 2 - this.volume.header.origin.x) *
                this.xSize, d * this.ySize - this.yHalf, b * this.zSize - this.zHalf
            ]));
        "Yes" === this.viewer.container.preferences.showRuler ? this.isMainView() && this.drawRuler(c) : this.rulerPoints = null
    }
    c.disable(c.DEPTH_TEST)
};
papaya.viewer.ScreenSurface.prototype.renderSurface = function(c, a, d, b, e) {
    c.uniform1f(this.shaderProgram.alphaVal, this.surfaces[a].alpha);
    d ? b ? (c.enable(c.BLEND), c.enable(c.CULL_FACE), c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA), c.frontFace(c.CCW), c.cullFace(c.FRONT), c.uniform3f(this.shaderProgram.ambientColorUniform, 0, 0, 0), c.uniform3f(this.shaderProgram.pointLightingLocationUniform, 0, 0, -300 * this.scaleFactor)) : e && (c.enable(c.BLEND), c.enable(c.CULL_FACE), c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA),
        c.frontFace(c.CCW), c.cullFace(c.BACK), c.uniform3f(this.shaderProgram.ambientColorUniform, .2, .2, .2), c.uniform3f(this.shaderProgram.pointLightingLocationUniform, 0, 0, 300 * this.scaleFactor)) : (c.uniform3f(this.shaderProgram.ambientColorUniform, .2, .2, .2), c.uniform3f(this.shaderProgram.pointLightingLocationUniform, 0, 0, 300 * this.scaleFactor));
    c.uniform1i(this.shaderProgram.hasSolidColor, 0);
    c.uniform1i(this.shaderProgram.hasColors, 0);
    this.surfaces[a].solidColor && (c.uniform1i(this.shaderProgram.hasSolidColor,
        1), c.uniform4f(this.shaderProgram.solidColor, this.surfaces[a].solidColor[0], this.surfaces[a].solidColor[1], this.surfaces[a].solidColor[2], 1));
    c.bindBuffer(c.ARRAY_BUFFER, this.surfaces[a].pointsBuffer);
    c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.surfaces[a].pointsBuffer.itemSize, c.FLOAT, !1, 0, 0);
    c.bindBuffer(c.ARRAY_BUFFER, this.surfaces[a].normalsBuffer);
    c.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.surfaces[a].normalsBuffer.itemSize, c.FLOAT, !1, 0, 0);
    this.surfaces[a].colorsData ?
        (c.uniform1i(this.shaderProgram.hasColors, 1), c.bindBuffer(c.ARRAY_BUFFER, this.surfaces[a].colorsBuffer), c.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute), c.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, this.surfaces[a].colorsBuffer.itemSize, c.FLOAT, !1, 0, 0)) : c.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.surfaces[a].trianglesBuffer);
    c.drawElements(c.TRIANGLES, this.surfaces[a].trianglesBuffer.numItems, c.UNSIGNED_INT,
        0);
    d && (b || e) && (c.disable(c.BLEND), c.disable(c.CULL_FACE))
};
papaya.viewer.ScreenSurface.prototype.drawRuler = function(c) {
    var a = !0;
    null === this.rulerPoints && (this.rulerPoints = new Float32Array(6), a = this.findInitialRulerPoints(c), this.drawScene(c));
    a && (c.uniform1i(this.shaderProgram.ruler, 1), this.drawRulerPoint(c, this.rulerPoints[0], this.rulerPoints[1], this.rulerPoints[2]), this.drawRulerPoint(c, this.rulerPoints[3], this.rulerPoints[4], this.rulerPoints[5]), c.bindBuffer(c.ARRAY_BUFFER, this.rulerLineBuffer), c.bufferData(c.ARRAY_BUFFER, this.rulerPoints, c.DYNAMIC_DRAW),
        c.bindBuffer(c.ARRAY_BUFFER, this.rulerLineBuffer), c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.rulerLineBuffer.itemSize, c.FLOAT, !1, 0, 0), c.drawArrays(c.LINES, 0, 2), c.uniform1i(this.shaderProgram.ruler, 0))
};
papaya.viewer.ScreenSurface.prototype.drawRulerPoint = function(c, a, d, b) {
    this.sphereVertexPositionBuffer.numItems = this.rulerPointData.vertices.length / 3;
    c.bindBuffer(c.ARRAY_BUFFER, this.sphereVertexPositionBuffer);
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(this.rulerPointData.vertices), c.STATIC_DRAW);
    this.sphereNormalsPositionBuffer.numItems = this.rulerPointData.normals.length / 3;
    c.bindBuffer(c.ARRAY_BUFFER, this.sphereNormalsPositionBuffer);
    c.bufferData(c.ARRAY_BUFFER, new Float32Array(this.rulerPointData.normals),
        c.STATIC_DRAW);
    this.sphereVertexIndexBuffer.numItems = this.rulerPointData.indices.length;
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.sphereVertexIndexBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.rulerPointData.indices), c.STATIC_DRAW);
    c.uniform1i(this.shaderProgram.hasSolidColor, 1);
    c.uniform4f(this.shaderProgram.solidColor, papaya.viewer.ScreenSurface.RULER_COLOR[0], papaya.viewer.ScreenSurface.RULER_COLOR[1], papaya.viewer.ScreenSurface.RULER_COLOR[2], 1);
    c.bindBuffer(c.ARRAY_BUFFER, this.sphereVertexPositionBuffer);
    c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.sphereVertexPositionBuffer.itemSize, c.FLOAT, !1, 0, 0);
    c.bindBuffer(c.ARRAY_BUFFER, this.sphereNormalsPositionBuffer);
    c.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.sphereNormalsPositionBuffer.itemSize, c.FLOAT, !1, 0, 0);
    mat4.set(this.mvMatrix, this.tempMat);
    mat4.translate(this.mvMatrix, [a, d, b]);
    this.applyMatrixUniforms(c);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.sphereVertexIndexBuffer);
    c.drawElements(c.TRIANGLES,
        this.sphereVertexIndexBuffer.numItems, c.UNSIGNED_SHORT, 0);
    mat4.set(this.tempMat, this.mvMatrix);
    this.applyMatrixUniforms(c)
};
papaya.viewer.ScreenSurface.prototype.drawOrientedText = function(c, a, d, b) {
    null === this.orientationCanvas && this.initOrientationBuffers(this.context);
    this.updateOrientedTextSquare(d, a);
    null === this.orientationTexture && (this.orientationTexture = c.createTexture());
    this.bindOrientation(c);
    c.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
    c.uniform1i(this.shaderProgram.orientationText, 1);
    c.enable(c.BLEND);
    c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA);
    this.orientationContext.imageSmoothingEnabled = !0;
    this.orientationContext.mozImageSmoothingEnabled = !0;
    this.orientationContext.msImageSmoothingEnabled = !0;
    this.orientationContext.textAlign = "center";
    this.orientationContext.textBaseline = "middle";
    this.orientationContext.font = d + "px sans-serif";
    this.orientationContext.clearRect(0, 0, this.orientationCanvas.width, this.orientationCanvas.height);
    this.orientationContext.fillStyle = "#FFFFFF";
    this.orientationContext.fillText(a, this.orientationCanvas.width / 2, this.orientationCanvas.height / 2);
    mat4.set(this.mvMatrix,
        this.tempMat);
    mat4.multiplyVec3(this.mvMatrix, b);
    mat4.identity(this.mvMatrix);
    c.bindBuffer(c.ARRAY_BUFFER, this.orientationBuffer);
    c.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.orientationBuffer.itemSize, c.FLOAT, !1, 0, 0);
    c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1);
    c.bindTexture(c.TEXTURE_2D, this.orientationTexture);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
    c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA,
        c.UNSIGNED_BYTE, this.orientationCanvas);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR_MIPMAP_NEAREST);
    c.generateMipmap(c.TEXTURE_2D);
    c.bindTexture(c.TEXTURE_2D, null);
    c.bindBuffer(c.ARRAY_BUFFER, this.orientationTextureCoordBuffer);
    c.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.orientationTextureCoordBuffer.itemSize, c.FLOAT, !1, 0, 0);
    c.activeTexture(c.TEXTURE0);
    c.bindTexture(c.TEXTURE_2D, this.orientationTexture);
    c.uniform1i(this.shaderProgram.samplerUniform, 0);
    mat4.translate(this.mvMatrix, b);
    this.applyMatrixUniforms(c);
    c.drawArrays(c.TRIANGLE_STRIP, 0, 4);
    mat4.set(this.tempMat, this.mvMatrix);
    this.applyMatrixUniforms(c);
    c.disable(c.BLEND);
    c.uniform1i(this.shaderProgram.orientationText, 0);
    c.disableVertexAttribArray(this.shaderProgram.textureCoordAttribute)
};
papaya.viewer.ScreenSurface.prototype.bindOrientation = function(c) {
    c.bindBuffer(c.ARRAY_BUFFER, this.orientationBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.orientationVerts, c.DYNAMIC_DRAW)
};
papaya.viewer.ScreenSurface.prototype.bindActivePlanes = function(c) {
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneAxialBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsAxial, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneCoronalBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsCoronal, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneSagittalBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsSagittal, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneAxialEdgesBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsAxialEdges, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneCoronalEdgesBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsCoronalEdges, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.activePlaneSagittalEdgesBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.activePlaneVertsSagittalEdges, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.crosshairLineXBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.crosshairLineVertsX, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER,
        this.crosshairLineYBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.crosshairLineVertsY, c.DYNAMIC_DRAW);
    c.bindBuffer(c.ARRAY_BUFFER, this.crosshairLineZBuffer);
    c.bufferData(c.ARRAY_BUFFER, this.crosshairLineVertsZ, c.DYNAMIC_DRAW)
};
papaya.viewer.ScreenSurface.prototype.clearDTILinesImage = function() {};
papaya.viewer.ScreenSurface.prototype.findProximalRulerHandle = function(c, a) {
    this.pick(c, a, !0);
    this.grabbedRulerPoint = -1;
    this.pickedCoordinate && this.rulerPoints && (papaya.utilities.MathUtils.lineDistance3d(this.rulerPoints[0], this.rulerPoints[1], this.rulerPoints[2], this.pickedCoordinate.coordinate[0], this.pickedCoordinate.coordinate[1], this.pickedCoordinate.coordinate[2]) < papaya.viewer.ScreenSlice.GRAB_RADIUS * this.scaleFactor ? this.grabbedRulerPoint = 0 : papaya.utilities.MathUtils.lineDistance3d(this.rulerPoints[3],
        this.rulerPoints[4], this.rulerPoints[5], this.pickedCoordinate.coordinate[0], this.pickedCoordinate.coordinate[1], this.pickedCoordinate.coordinate[2]) < papaya.viewer.ScreenSlice.GRAB_RADIUS * this.scaleFactor && (this.grabbedRulerPoint = 1));
    return -1 !== this.grabbedRulerPoint
};
papaya.viewer.ScreenSurface.prototype.setStartDynamic = function(c, a) {
    this.dynamicStartX = c;
    this.dynamicStartY = a
};
papaya.viewer.ScreenSurface.prototype.updateDynamic = function(c, a, d) {
    a = (a - this.dynamicStartY) * papaya.viewer.ScreenSurface.MOUSE_SENSITIVITY * d;
    c = (c - this.dynamicStartX) * papaya.viewer.ScreenSurface.MOUSE_SENSITIVITY * d * Math.PI / 180;
    mat4.identity(this.mouseRotDragX);
    mat4.rotateY(this.mouseRotDragX, c);
    c = a * Math.PI / 180;
    mat4.identity(this.mouseRotDragY);
    mat4.rotateX(this.mouseRotDragY, c);
    mat4.multiply(this.centerMat, this.mouseRotDragY, this.tempMat);
    mat4.multiply(this.tempMat, this.mouseRotDragX, this.tempMat2);
    mat4.multiply(this.tempMat2, this.centerMatInv, this.mouseRotDrag)
};
papaya.viewer.ScreenSurface.prototype.updateTranslateDynamic = function(c, a, d) {
    c = (c - this.dynamicStartX) * papaya.viewer.ScreenSurface.MOUSE_SENSITIVITY * d;
    a = (a - this.dynamicStartY) * papaya.viewer.ScreenSurface.MOUSE_SENSITIVITY * d * -1;
    mat4.identity(this.mouseTransDrag);
    mat4.translate(this.mouseTransDrag, [c, a, 0])
};
papaya.viewer.ScreenSurface.prototype.updateCurrent = function() {
    var c = mat4.multiply(this.mouseRotDrag, this.mouseRotCurrent);
    mat4.set(c, this.mouseRotCurrent);
    c = mat4.multiply(this.mouseTransDrag, this.mouseTransCurrent);
    mat4.set(c, this.mouseTransCurrent);
    mat4.identity(this.mouseTransDrag);
    mat4.identity(this.mouseRotDragX);
    mat4.identity(this.mouseRotDragY);
    mat4.identity(this.mouseRotDrag)
};
papaya.viewer.ScreenSurface.prototype.clearTransform = function(c) {
    mat4.identity(c);
    return c
};
papaya.viewer.ScreenSurface.prototype.makeOrientedTextSquare = function() {
    var c = papaya.viewer.ScreenSurface.ORIENTATION_SIZE * this.scaleFactor;
    this.orientationVerts[0] = -c;
    this.orientationVerts[1] = c;
    this.orientationVerts[2] = 0;
    this.orientationVerts[3] = -c;
    this.orientationVerts[4] = -c;
    this.orientationVerts[5] = 0;
    this.orientationVerts[6] = c;
    this.orientationVerts[7] = c;
    this.orientationVerts[8] = 0;
    this.orientationVerts[9] = c;
    this.orientationVerts[10] = -c;
    this.orientationVerts[11] = 0;
    this.orientationCanvas = document.createElement("canvas");
    this.orientationContext = this.orientationCanvas.getContext("2d");
    this.orientationContext.imageSmoothingEnabled = !0;
    this.orientationContext.mozImageSmoothingEnabled = !0;
    this.orientationContext.msImageSmoothingEnabled = !0;
    this.orientationContext.fillStyle = "#FFFFFF";
    this.orientationContext.textAlign = "center";
    this.orientationContext.textBaseline = "middle"
};
papaya.viewer.ScreenSurface.prototype.updateOrientedTextSquare = function(c, a) {
    var d;
    this.orientationContext.imageSmoothingEnabled = !0;
    this.orientationContext.mozImageSmoothingEnabled = !0;
    this.orientationContext.msImageSmoothingEnabled = !0;
    this.orientationContext.fillStyle = "#FFFFFF";
    this.orientationContext.textAlign = "center";
    this.orientationContext.textBaseline = "middle";
    this.orientationContext.font = c + "px sans-serif";
    d = this.orientationContext.measureText(a).width;
    d = Math.max(d, c);
    this.orientationCanvas.width =
        papaya.utilities.MathUtils.getPowerOfTwo(d);
    this.orientationCanvas.height = papaya.utilities.MathUtils.getPowerOfTwo(d)
};
papaya.viewer.ScreenSurface.prototype.updateActivePlanes = function() {
    var c, a, d;
    if (this.showSurfacePlanes || this.viewer.isShowingCrosshairs()) c = this.currentCoord.x + (this.xDim / 2 - this.volume.header.origin.x), a = this.yDim - this.currentCoord.y - (this.yDim / 2 - this.volume.header.origin.y), d = this.zDim - this.currentCoord.z - (this.zDim / 2 - this.volume.header.origin.z), this.activePlaneVertsAxial[0] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxial[1] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxial[2] =
        d * this.zSize - this.zHalf, this.activePlaneVertsAxial[3] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxial[4] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxial[5] = d * this.zSize - this.zHalf, this.activePlaneVertsAxial[6] = this.xHalf + this.centerWorld.x, this.activePlaneVertsAxial[7] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxial[8] = d * this.zSize - this.zHalf, this.activePlaneVertsAxial[9] = this.xHalf + this.centerWorld.x, this.activePlaneVertsAxial[10] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxial[11] =
        d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[0] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[1] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[2] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[3] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[4] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[5] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[6] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[7] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[8] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[9] = this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[10] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[11] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[12] = this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[13] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[14] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[15] =
        this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[16] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[17] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[18] = this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[19] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[20] = d * this.zSize - this.zHalf, this.activePlaneVertsAxialEdges[21] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsAxialEdges[22] = this.yHalf + this.centerWorld.y, this.activePlaneVertsAxialEdges[23] =
        d * this.zSize - this.zHalf, this.activePlaneVertsCoronal[0] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronal[1] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronal[2] = this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronal[3] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronal[4] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronal[5] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronal[6] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronal[7] = a * this.ySize - this.yHalf,
        this.activePlaneVertsCoronal[8] = this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronal[9] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronal[10] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronal[11] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[0] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[1] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[2] = this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[3] = -this.xHalf + this.centerWorld.x,
        this.activePlaneVertsCoronalEdges[4] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[5] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[6] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[7] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[8] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[9] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[10] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[11] = -this.zHalf +
        this.centerWorld.z, this.activePlaneVertsCoronalEdges[12] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[13] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[14] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[15] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[16] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[17] = this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[18] = this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[19] =
        a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[20] = this.zHalf + this.centerWorld.z, this.activePlaneVertsCoronalEdges[21] = -this.xHalf + this.centerWorld.x, this.activePlaneVertsCoronalEdges[22] = a * this.ySize - this.yHalf, this.activePlaneVertsCoronalEdges[23] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittal[0] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittal[1] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittal[2] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittal[3] =
        c * this.xSize - this.xHalf, this.activePlaneVertsSagittal[4] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittal[5] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittal[6] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittal[7] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittal[8] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittal[9] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittal[10] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittal[11] = -this.zHalf +
        this.centerWorld.z, this.activePlaneVertsSagittalEdges[0] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[1] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[2] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[3] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[4] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[5] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[6] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[7] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[8] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[9] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[10] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[11] = -this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[12] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[13] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[14] = -this.zHalf + this.centerWorld.z,
        this.activePlaneVertsSagittalEdges[15] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[16] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[17] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[18] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[19] = this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[20] = this.zHalf + this.centerWorld.z, this.activePlaneVertsSagittalEdges[21] = c * this.xSize - this.xHalf, this.activePlaneVertsSagittalEdges[22] = -this.yHalf + this.centerWorld.y, this.activePlaneVertsSagittalEdges[23] = this.zHalf + this.centerWorld.z, this.crosshairLineVertsZ[0] = c * this.xSize - this.xHalf, this.crosshairLineVertsZ[1] = a * this.ySize - this.yHalf, this.crosshairLineVertsZ[2] = -this.zHalf + this.centerWorld.z, this.crosshairLineVertsZ[3] = c * this.xSize - this.xHalf, this.crosshairLineVertsZ[4] = a * this.ySize - this.yHalf, this.crosshairLineVertsZ[5] = this.zHalf + this.centerWorld.z, this.crosshairLineVertsY[0] = c * this.xSize - this.xHalf, this.crosshairLineVertsY[1] = -this.yHalf + this.centerWorld.y, this.crosshairLineVertsY[2] = d * this.zSize - this.zHalf, this.crosshairLineVertsY[3] = c * this.xSize - this.xHalf, this.crosshairLineVertsY[4] = this.yHalf + this.centerWorld.y, this.crosshairLineVertsY[5] = d * this.zSize - this.zHalf, this.crosshairLineVertsX[0] = -this.xHalf + this.centerWorld.x, this.crosshairLineVertsX[1] = a * this.ySize - this.yHalf, this.crosshairLineVertsX[2] = d * this.zSize - this.zHalf, this.crosshairLineVertsX[3] = this.xHalf + this.centerWorld.x, this.crosshairLineVertsX[4] = a * this.ySize -
        this.yHalf, this.crosshairLineVertsX[5] = d * this.zSize - this.zHalf, this.needsUpdateActivePlanes = !0
};
papaya.viewer.ScreenSurface.prototype.pick = function(c, a, d) {
    this.needsPick = !0;
    this.pickLocX = c;
    this.pickLocY = a;
    this.draw();
    if (d) return this.pickedCoordinate;
    this.draw();
    return this.pickedCoordinate
};
papaya.viewer.ScreenSurface.prototype.pickRuler = function(c, a) {
    this.needsPick = !0;
    this.pickLocX = c;
    this.pickLocY = a;
    this.draw();
    this.pickedCoordinate && (this.rulerPoints[3 * this.grabbedRulerPoint] = this.pickedCoordinate.coordinate[0], this.rulerPoints[3 * this.grabbedRulerPoint + 1] = this.pickedCoordinate.coordinate[1], this.rulerPoints[3 * this.grabbedRulerPoint + 2] = this.pickedCoordinate.coordinate[2], this.draw());
    return this.pickedCoordinate
};
papaya.viewer.ScreenSurface.prototype.pickColor = function(c, a) {
    this.needsPickColor = !0;
    this.pickLocX = c;
    this.pickLocY = a;
    this.draw();
    this.draw();
    return this.pickedColor
};
papaya.viewer.ScreenSurface.prototype.findPickedCoordinate = function(c, a, d) {
    d = c.viewportHeight - 1 - d;
    var b, e = [];
    c.readPixels(a, d, 1, 1, c.RGBA, c.UNSIGNED_BYTE, this.pickingBuffer);
    b = this.unpackFloatFromVec4i(this.pickingBuffer) / 255;
    return 1 <= b ? null : GLU.unProject(a, d, b, this.mvMatrix, this.pMatrix, [0, 0, c.viewportWidth, c.viewportHeight], e) ? {
        coordinate: e,
        depth: b
    } : null
};
papaya.viewer.ScreenSurface.prototype.findInitialRulerPoints = function(c) {
    var a = c.viewportWidth,
        d = c.viewportHeight,
        b;
    c = [];
    var e = [],
        g, h;
    for (h = 1; 5 > h; h += 1) b = parseInt(.1 * a * h, 10), g = parseInt(.1 * d * h, 10), (b = this.pick(b, g, !0)) && c.push(b), b = parseInt(a - .1 * a * h, 10), g = parseInt(.1 * d * h, 10), (b = this.pick(b, g, !0)) && c.push(b), b = parseInt(a - .1 * a * h, 10), g = parseInt(d - .1 * d * h, 10), (b = this.pick(b, g, !0)) && c.push(b), b = parseInt(.1 * a * h, 10), g = parseInt(d - .1 * d * h, 10), (b = this.pick(b, g, !0)) && c.push(b);
    if (2 > c) return !1;
    for (h = a = 0; h < c.length; h +=
        1) c[h].depth < c[a].depth && (a = h);
    e.push(c[a].coordinate);
    c.splice(a, 1);
    for (h = a = 0; h < c.length; h += 1) c[h].depth < c[a].depth && (a = h);
    e.push(c[a].coordinate);
    this.rulerPoints[0] = e[0][0];
    this.rulerPoints[1] = e[0][1];
    this.rulerPoints[2] = e[0][2];
    this.rulerPoints[3] = e[1][0];
    this.rulerPoints[4] = e[1][1];
    this.rulerPoints[5] = e[1][2];
    return !0
};
papaya.viewer.ScreenSurface.prototype.findPickedColor = function(c) {
    c.readPixels(0, 0, c.viewportWidth, c.viewportHeight, c.RGBA, c.UNSIGNED_BYTE, this.pickingBuffer);
    c = (c.viewportHeight - 1 - this.pickLocY) * c.viewportWidth * 4 + 4 * this.pickLocX;
    return [this.pickingBuffer[c], this.pickingBuffer[c + 1], this.pickingBuffer[c + 2]]
};
papaya.viewer.ScreenSurface.prototype.getBackgroundColor = function() {
    return "rgba(" + parseInt(255 * this.backgroundColor[0] + .5) + "," + parseInt(255 * this.backgroundColor[1] + .5) + "," + parseInt(255 * this.backgroundColor[2] + .5) + ",255)"
};
papaya.viewer.ScreenSurface.prototype.updatePreferences = function() {
    this.updateBackgroundColor()
};
papaya.viewer.ScreenSurface.prototype.updateBackgroundColor = function() {
    var c = this.viewer.container.preferences.surfaceBackgroundColor;
    this.backgroundColor = "Black" === c ? [0, 0, 0] : "Dark Gray" === c ? [.25, .25, .25] : "Gray" === c ? [.5, .5, .5] : "Light Gray" === c ? [.75, .75, .75] : "White" === c ? [1, 1, 1] : papaya.viewer.ScreenSurface.DEFAULT_BACKGROUND
};
papaya.viewer.ScreenSurface.prototype.isMainView = function() {
    return this.viewer.mainImage === this.viewer.surfaceView
};
papaya.viewer.ScreenSurface.prototype.processParams = function(c) {
    this.viewer.container.isDesktopMode() || void 0 === c.surfaceBackground || (this.viewer.container.preferences.surfaceBackgroundColor = c.surfaceBackground)
};
papaya.viewer.ScreenSurface.prototype.makeSphere = function(c, a, d) {
    var b, e, g = [],
        h = [];
    for (b = 0; b <= c; b++) {
        e = b * Math.PI / c;
        var f = Math.sin(e),
            l = Math.cos(e);
        for (e = 0; e <= a; e++) {
            var k = 2 * e * Math.PI / a,
                p = Math.sin(k),
                k = Math.cos(k) * f,
                r = l,
                p = p * f;
            h.push(k);
            h.push(r);
            h.push(p);
            g.push(d * k);
            g.push(d * r);
            g.push(d * p)
        }
    }
    d = [];
    for (b = 0; b < c; b++)
        for (e = 0; e < a; e++) f = b * (a + 1) + e, l = f + a + 1, d.push(f), d.push(l), d.push(f + 1), d.push(l), d.push(l + 1), d.push(f + 1);
    return {
        vertices: g,
        normals: h,
        indices: d
    }
};
papaya.viewer.ScreenSurface.prototype.getRulerLength = function() {
    return papaya.utilities.MathUtils.lineDistance3d(this.rulerPoints[0], this.rulerPoints[1], this.rulerPoints[2], this.rulerPoints[3], this.rulerPoints[4], this.rulerPoints[5])
};
"use strict";
var papaya = papaya || {},
    papayaContainers = [],
    papayaLoadableImages = papayaLoadableImages || [],
    papayaDroppedFiles = [];
papaya.Container = papaya.Container || function(c) {
    this.containerHtml = c;
    this.preferences = this.toolbar = this.display = this.viewer = this.sliderControlHtml = this.titlebarHtml = this.displayHtml = this.viewerHtml = this.toolbarHtml = this.containerIndex = null;
    this.params = [];
    this.loadingSurfaceIndex = this.loadingImageIndex = 0;
    this.collapsable = this.nestedViewer = !1;
    this.orthogonal = !0;
    this.noNewFiles = this.kioskMode = this.orthogonalDynamic = this.orthogonalTall = !1;
    this.showControls = !0;
    this.showControlBar = !1;
    this.fullScreenPadding =
        this.showImageButtons = !0;
    this.combineParametric = !1;
    this.dropTimeout = null;
    this.showRuler = !1;
    this.syncOverlaySeries = !0;
    this.surfaceParams = {};
    this.contextManager = null;
    this.allowScroll = !0;
    this.loadingComplete = null;
    this.resetComponents()
};
papaya.Container.LICENSE_TEXT = "<p>THIS PRODUCT IS NOT FOR CLINICAL USE.<br /><br />This software is available for use, as is, free of charge.  The software and data derived from this software may not be used for clinical purposes.<br /><br />The authors of this software make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, non-infringement, or conformance to a specification or standard. The authors of this software shall not be liable for any damages suffered by licensee as a result of using or modifying this software or its derivatives.<br /><br />By using this software, you agree to be bounded by the terms of this license.  If you do not agree to the terms of this license, do not use this software.</p>";
papaya.Container.KEYBOARD_REF_TEXT = "<span style='color:#B5CBD3'>[Spacebar]</span> Cycle the main slice view in a clockwise rotation.<br /><br /><span style='color:#B5CBD3'>[Page Up]</span> or <span style='color:#B5CBD3'>[']</span> Increment the axial slice.<br /><br /><span style='color:#B5CBD3'>[Page Down]</span> or <span style='color:#B5CBD3'>[/]</span> Decrement the axial slice.<br /><br /><span style='color:#B5CBD3'>[Arrow Up]</span> and <span style='color:#B5CBD3'>[Arrow Down]</span> Increment/decrement the coronal slice.<br /><br /><span style='color:#B5CBD3'>[Arrow Right]</span> and <span style='color:#B5CBD3'>[Arrow Left]</span> Increment/decrement the sagittal slice.<br /><br /><span style='color:#B5CBD3'>[g]</span> and <span style='color:#B5CBD3'>[v]</span> Increment/decrement main slice.<br /><br /><span style='color:#B5CBD3'>[<]</span> or <span style='color:#B5CBD3'>[,]</span> Decrement the series point.<br /><br /><span style='color:#B5CBD3'>[>]</span> or <span style='color:#B5CBD3'>[.]</span> Increment the series point.<br /><br /><span style='color:#B5CBD3'>[o]</span> Navigate viewer to the image origin.<br /><br /><span style='color:#B5CBD3'>[c]</span> Navigate viewer to the center of the image.<br /><br /><span style='color:#B5CBD3'>[a]</span> Toggle main crosshairs on/off.";
papaya.Container.MOUSE_REF_TEXT = "<span style='color:#B5CBD3'>(Left-click and drag)</span> Change current coordinate.<br /><br /><span style='color:#B5CBD3'>[Alt](Left-click and drag)</span> Zoom in and out.<br /><br /><span style='color:#B5CBD3'>[Alt](Double left-click)</span> Reset zoom.<br /><br /><span style='color:#B5CBD3'>[Alt][Shift](Left-click and drag)</span> Pan zoomed image.<br /><br /><span style='color:#B5CBD3'>(Right-click and drag)</span> Window level controls.<br /><br /><span style='color:#B5CBD3'>(Scroll wheel)</span> See Preferences.<br /><br />";
papaya.Container.DICOM_SUPPORT = !0;
papaya.Container.syncViewers = !1;
papaya.Container.syncViewersWorld = !1;
papaya.Container.allowPropagation = !1;
papaya.Container.papayaLastHoveredViewer = null;
papaya.Container.ignorePatterns = [/^[.]/];
papaya.Container.atlas = null;
papaya.Container.atlasWorldSpace = !0;
papaya.Container.restartViewer = function(c, a, d, b, e) {
    papayaContainers[c].viewer.restart(a, d, b, e)
};
papaya.Container.resetViewer = function(c, a) {
    a || (a = papayaContainers[c].params, a.loadedImages && (a.images = a.loadedImages), a.loadedEncodedImages && (a.encodedImages = a.loadedEncodedImages), a.loadedBinaryImages && (a.binaryImages = a.loadedBinaryImages), a.loadedSurfaces && (a.surfaces = a.loadedSurfaces), a.loadedEncodedSurfaces && (a.encodedSurfaces = a.loadedEncodedSurfaces), a.loadedFiles && (a.files = a.loadedFiles));
    papayaContainers[c].viewer.resetViewer();
    papayaContainers[c].toolbar.updateImageButtons();
    papayaContainers[c].reset();
    papayaContainers[c].params = a;
    papayaContainers[c].readGlobalParams();
    papayaContainers[c].rebuildContainer(a, c);
    papayaContainers[c].viewer.processParams(a)
};
papaya.Container.removeImage = function(c, a) {
    1 > a && console.log("Cannot remove the base image.  Try papaya.Container.resetViewer() instead.");
    papayaContainers[c].viewer.removeOverlay(a)
};
papaya.Container.hideImage = function(c, a) {
    papayaContainers[c].viewer.screenVolumes[a].hidden = !0;
    papayaContainers[c].viewer.drawViewer(!0, !1)
};
papaya.Container.showImage = function(c, a) {
    papayaContainers[c].viewer.screenVolumes[a].hidden = !1;
    papayaContainers[c].viewer.drawViewer(!0, !1)
};
papaya.Container.addImage = function(c, a, d) {
    d && (papayaContainers[c].params = $.extend({}, papayaContainers[c].params, d));
    a instanceof Array ? d = a : (d = [], d[0] = a);
    papayaContainers[c].params.images ? papayaContainers[c].viewer.loadImage(d, !0, !1, !1) : papayaContainers[c].params.binaryImages ? papayaContainers[c].viewer.loadImage(d, !1, !1, !0) : papayaContainers[c].params.encodedImages && papayaContainers[c].viewer.loadImage(d, !1, !0, !1)
};
papaya.Container.findParameters = function(c) {
    var a, d = null;
    a = c.data("params");
    a || (c = c.find("." + PAPAYA_VIEWER_CSS)) && (a = c.data("params"));
    a && ("object" === typeof a ? d = a : window[a] && (d = window[a]));
    d && papaya.utilities.UrlUtils.getQueryParams(d);
    return d
};
papaya.Container.fillContainerHTML = function(c, a, d, b) {
    var e;
    a ? (d = c.find("#" + PAPAYA_DEFAULT_TOOLBAR_ID), e = c.find("#" + PAPAYA_DEFAULT_VIEWER_ID), a = c.find("#" + PAPAYA_DEFAULT_DISPLAY_ID), d ? d.addClass(PAPAYA_TOOLBAR_CSS) : c.prepend("<div class='" + PAPAYA_TOOLBAR_CSS + "' id='" + PAPAYA_DEFAULT_TOOLBAR_ID + "'></div>"), e ? e.addClass(PAPAYA_VIEWER_CSS) : $("<div class='" + PAPAYA_VIEWER_CSS + "' id='" + PAPAYA_DEFAULT_VIEWER_ID + "'></div>").insertAfter($("#" + PAPAYA_DEFAULT_TOOLBAR_ID)), a ? a.addClass(PAPAYA_DISPLAY_CSS) : $("<div class='" +
        PAPAYA_DISPLAY_CSS + "' id='" + PAPAYA_DEFAULT_DISPLAY_ID + "'></div>").insertAfter($("#" + PAPAYA_DEFAULT_VIEWER_ID)), console.log("This method of adding a Papaya container is deprecated.  Try simply <div class='papaya' data-params='params'></div> instead...")) : (a = void 0 !== b ? b : papayaContainers.length, c.attr("id", PAPAYA_DEFAULT_CONTAINER_ID + a), d && void 0 !== d.kioskMode && d.kioskMode || c.append("<div id='" + (PAPAYA_DEFAULT_TOOLBAR_ID + a) + "' class='" + PAPAYA_TOOLBAR_CSS + "'></div>"), c.append("<div id='" + (PAPAYA_DEFAULT_VIEWER_ID +
        a) + "' class='" + PAPAYA_VIEWER_CSS + "'></div>"), c.append("<div id='" + (PAPAYA_DEFAULT_DISPLAY_ID + a) + "' class='" + PAPAYA_DISPLAY_CSS + "'></div>"), d && d.showControlBar && (void 0 === d.showControls || d.showControls) ? (c.append("<div id='" + PAPAYA_KIOSK_CONTROLS_CSS + a + "' class='" + PAPAYA_KIOSK_CONTROLS_CSS + "'><div id='" + (PAPAYA_DEFAULT_SLIDER_ID + a) + "main' class='" + PAPAYA_SLIDER_CSS + " " + PAPAYA_CONTROL_MAIN_SLIDER + "'><span class='" + PAPAYA_CONTROL_BAR_LABELS_CSS + "'>Slice: </span> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS +
        "'>+</button> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>-</button> </div><div id='" + (PAPAYA_DEFAULT_SLIDER_ID + a) + "axial' class='" + PAPAYA_SLIDER_CSS + " " + PAPAYA_CONTROL_DIRECTION_SLIDER + "'><span class='" + PAPAYA_CONTROL_BAR_LABELS_CSS + "'>Axial: </span> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>+</button> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>-</button> </div><div id='" + (PAPAYA_DEFAULT_SLIDER_ID + a) + "coronal' class='" +
        PAPAYA_SLIDER_CSS + " " + PAPAYA_CONTROL_DIRECTION_SLIDER + "'><span class='" + PAPAYA_CONTROL_BAR_LABELS_CSS + "'>Coronal: </span> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>+</button> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>-</button> </div><div id='" + (PAPAYA_DEFAULT_SLIDER_ID + a) + "sagittal' class='" + PAPAYA_SLIDER_CSS + " " + PAPAYA_CONTROL_DIRECTION_SLIDER + "'><span class='" + PAPAYA_CONTROL_BAR_LABELS_CSS + "'>Sagittal: </span> <button type='button' class='" +
        PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>+</button> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>-</button> </div><div id='" + (PAPAYA_DEFAULT_SLIDER_ID + a) + "series' class='" + PAPAYA_SLIDER_CSS + " " + PAPAYA_CONTROL_DIRECTION_SLIDER + "'><span class='" + PAPAYA_CONTROL_BAR_LABELS_CSS + "'>Series: </span> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>&lt;</button> <button type='button' class='" + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS + "'>&gt;</button> </div>&nbsp;&nbsp;&nbsp;<button type='button' " +
        (d.kioskMode && (void 0 === d.showImageButtons || d.showImageButtons) ? "" : "style='float:right;margin-left:5px;' ") + "class='" + PAPAYA_CONTROL_SWAP_BUTTON_CSS + "'>Swap View</button> <button type='button' " + (d.kioskMode && (void 0 === d.showImageButtons || d.showImageButtons) ? "" : "style='float:right;margin-left:5px;' ") + "class='" + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS + "'>Go To Center</button> <button type='button' " + (d.kioskMode && (void 0 === d.showImageButtons || d.showImageButtons) ? "" : "style='float:right;margin-left:5px;' ") +
        "class='" + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS + "'>Go To Origin</button> </div>"), $("." + PAPAYA_CONTROL_INCREMENT_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS).prop("disabled", !0), $("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS).prop("disabled", !0)) : d && (void 0 === d.showControls || d.showControls) && (c.append("<button type='button' id='" + (PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + a) + "' class='" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS +
        "'>+</button> "), c.append("<button type='button' id='" + (PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + a) + "' class='" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + "'>-</button> "), c.append("<button type='button' id='" + (PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + a) + "' class='" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + "'>Swap View</button> "), c.append("<button type='button' id='" + (PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + a) + "' class='" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + "'>Go To Center</button> "), c.append("<button type='button' id='" +
        (PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + a) + "' class='" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + "'>Go To Origin</button> "), $("#" + PAPAYA_CONTROL_MAIN_INCREMENT_BUTTON_CSS + a).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_DECREMENT_BUTTON_CSS + a).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_SWAP_BUTTON_CSS + a).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + a).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + a).css({
        display: "none"
    })));
    return e
};
papaya.Container.buildContainer = function(c, a, d) {
    var b, e, g;
    e = null;
    b = papaya.utilities.PlatformUtils.checkForBrowserCompatibility();
    e = c.find("." + PAPAYA_VIEWER_CSS);
    null !== b ? (papaya.Container.removeCheckForJSClasses(c, e), c.addClass(PAPAYA_UTILS_UNSUPPORTED_CSS), e.addClass(PAPAYA_UTILS_UNSUPPORTED_MESSAGE_CSS), e.html(b)) : (b = void 0 !== d ? d : papayaContainers.length, d = new papaya.Container(c), d.containerIndex = b, d.preferences = new papaya.viewer.Preferences, papaya.Container.removeCheckForJSClasses(c, e), a && (d.params =
            $.extend(d.params, a)), d.nestedViewer = "BODY" !== c.parent()[0].tagName.toUpperCase(), d.readGlobalParams(), d.isDesktopMode() && d.preferences.readPreferences(), d.buildViewer(d.params), d.buildDisplay(), d.showControlBar && d.buildSliderControl(), d.buildToolbar(), d.setUpDnD(), (g = e.data("load-url")) ? (e = g, e instanceof Array || (e = [], e[0] = g), d.viewer.loadImage(e, !0, !1, !1)) : d.params.images ? (e = d.params.images[0], e instanceof Array || (e = [], e[0] = d.params.images[0]), d.viewer.loadImage(e, !0, !1, !1)) : d.params.encodedImages ?
        (e = d.params.encodedImages[0], e instanceof Array || (e = [], e[0] = d.params.encodedImages[0]), d.viewer.loadImage(e, !1, !0, !1)) : d.params.binaryImages ? (e = d.params.binaryImages[0], d.viewer.loadImage(e, !1, !1, !0)) : d.params.files ? (e = d.params.files[0], e instanceof Array || (e = [], e[0] = d.params.files[0]), d.viewer.loadImage(e, !1, !1, !1)) : d.viewer.finishedLoading(), d.resizeViewerComponents(!1), d.nestedViewer || (c.parent().height("50%"), c.parent().width("50%")), papayaContainers[b] = d, papaya.Container.showLicense(d, a))
};
papaya.Container.prototype.rebuildContainer = function(c, a) {
    this.containerHtml.empty();
    papaya.Container.fillContainerHTML(this.containerHtml, !1, c, a);
    papaya.Container.buildContainer(this.containerHtml, c, a);
    1 !== papayaContainers.length || papayaContainers[0].nestedViewer || ($("html").addClass(PAPAYA_CONTAINER_FULLSCREEN), $("body").addClass(PAPAYA_CONTAINER_FULLSCREEN), papaya.Container.setToFullPage())
};
papaya.Container.buildAllContainers = function() {
    var c, a;
    c = $("#" + PAPAYA_DEFAULT_CONTAINER_ID);
    0 < c.length ? (papaya.Container.fillContainerHTML(c, !0), a = papaya.Container.findParameters(c), papaya.Container.buildContainer(c, a)) : $("." + PAPAYA_CONTAINER_CLASS_NAME).each(function() {
        a = papaya.Container.findParameters($(this));
        null === a && (a = []);
        !0 === a.fullScreen && (a.fullScreenPadding = !1, a.kioskMode = !0, a.showControlBar = !1, $("body").css({
            "background-color": "black"
        }));
        papaya.Container.fillContainerHTML($(this), !1, a);
        papaya.Container.buildContainer($(this), a)
    });
    1 !== papayaContainers.length || papayaContainers[0].nestedViewer || ($("html").addClass(PAPAYA_CONTAINER_FULLSCREEN), $("body").addClass(PAPAYA_CONTAINER_FULLSCREEN), papaya.Container.setToFullPage(), papayaContainers[0].resizeViewerComponents(!0))
};
papaya.Container.startPapaya = function() {
    setTimeout(function() {
        window.scrollTo(0, 0)
    }, 0);
    papaya.Container.DICOM_SUPPORT = "undefined" !== typeof daikon;
    papaya.Container.buildAllContainers()
};
papaya.Container.resizePapaya = function(c, a) {
    var d;
    papaya.Container.updateOrthogonalState();
    if (1 !== papayaContainers.length || papayaContainers[0].nestedViewer)
        for (d = 0; d < papayaContainers.length; d += 1) papayaContainers[d].resizeViewerComponents(!0);
    else papaya.utilities.PlatformUtils.smallScreen && !a || papayaContainers[0].resizeViewerComponents(!0);
    setTimeout(function() {
        window.scrollTo(0, 0)
    }, 0)
};
papaya.Container.addViewer = function(c, a, d) {
    var b;
    b = $("#" + c);
    c = $('<div class="papaya"></div>');
    b.html(c);
    b[0].onclick = "";
    b.off("click");
    papaya.Container.fillContainerHTML(c, !1, a);
    papaya.Container.buildContainer(c, a);
    d && d()
};
papaya.Container.removeCheckForJSClasses = function(c, a) {
    a.removeClass(PAPAYA_CONTAINER_CLASS_NAME);
    a.removeClass(PAPAYA_UTILS_CHECKFORJS_CSS);
    c.removeClass(PAPAYA_CONTAINER_CLASS_NAME);
    c.removeClass(PAPAYA_UTILS_CHECKFORJS_CSS)
};
papaya.Container.setToFullPage = function() {
    document.body.style.marginTop = 0;
    document.body.style.marginBottom = 0;
    document.body.style.marginLeft = "auto";
    document.body.style.marginRight = "auto";
    document.body.style.padding = 0;
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%"
};
papaya.Container.getLicense = function() {
    return papaya.Container.LICENSE_TEXT
};
papaya.Container.getKeyboardReference = function() {
    return papaya.Container.KEYBOARD_REF_TEXT
};
papaya.Container.getMouseReference = function() {
    return papaya.Container.MOUSE_REF_TEXT
};
papaya.Container.setLicenseRead = function() {
    papaya.utilities.UrlUtils.createCookie(papaya.viewer.Preferences.COOKIE_PREFIX + "eula", "Yes", papaya.viewer.Preferences.COOKIE_EXPIRY_DAYS)
};
papaya.Container.isLicenseRead = function() {
    var c = papaya.utilities.UrlUtils.readCookie(papaya.viewer.Preferences.COOKIE_PREFIX + "eula");
    return c && "Yes" === c
};
papaya.Container.showLicense = function(c, a) {
    a && void 0 !== a.showEULA && a.showEULA && !papaya.Container.isLicenseRead() && (new papaya.ui.Dialog(c, "License", papaya.ui.Toolbar.LICENSE_DATA, papaya.Container, null, papaya.Container.setLicenseRead, null, !0)).showDialog()
};
papaya.Container.updateOrthogonalState = function() {
    var c;
    for (c = 0; c < papayaContainers.length; c += 1) papayaContainers[c].orthogonal && (papaya.utilities.PlatformUtils.mobile || papayaContainers[c].orthogonalDynamic) && ($(window).height() > $(window).width() ? papayaContainers[c].orthogonalTall = !0 : papayaContainers[c].orthogonalTall = !1)
};
papaya.Container.reorientPapaya = function() {
    var c;
    for (c = 0; c < papayaContainers.length; c += 1) papayaContainers[c].toolbar.closeAllMenus();
    papaya.Container.updateOrthogonalState();
    papaya.Container.resizePapaya(null, !0)
};
papaya.Container.prototype.resetComponents = function() {
    this.containerHtml.css({
        height: "50%"
    });
    this.containerHtml.css({
        width: "50%"
    });
    this.containerHtml.css({
        position:"absolute",
        top:"0px"
    });
    if (this.containerHtml.attr("id") === "papaya0") {
        this.containerHtml.css("margin-left", "0%");
    } else if (this.containerHtml.attr("id") === "papaya1") {
        this.containerHtml.css("margin-left", "50%");
    }
    $("head").append("<style>div#papayaViewer:before{ content:'' }</style>")
};
papaya.Container.prototype.hasSurface = function() {
    return this.viewer && 0 < this.viewer.surfaces.length
};
papaya.Container.prototype.getViewerDimensions = function() {
    var c, a, d, b;
    c = this.containerHtml.parent().width() - (this.fullScreenPadding ? 2 * PAPAYA_PADDING : 0);
    d = this.orthogonal ? this.hasSurface() ? 1.333 : 1.5 : 1;
    this.orthogonalTall || !this.orthogonal ? (c = (this.collapsable ? window.innerHeight : this.containerHtml.parent().height()) - (papaya.viewer.Display.SIZE + (this.kioskMode ? 0 : papaya.ui.Toolbar.SIZE + PAPAYA_SPACING) + PAPAYA_SPACING + (this.fullScreenPadding && !this.nestedViewer ? 2 * PAPAYA_CONTAINER_PADDING_TOP : 0)) - (this.showControlBar ?
        2 * papaya.ui.Toolbar.SIZE : 0), a = papayaRoundFast(c / d)) : (a = c, c = papayaRoundFast(a / d));
    if (!this.nestedViewer || this.collapsable) this.orthogonalTall ? (b = window.innerWidth - (this.fullScreenPadding ? 2 * PAPAYA_PADDING : 0), a > b && (a = b, c = papayaRoundFast(a * d))) : (b = window.innerHeight - (papaya.viewer.Display.SIZE + (this.kioskMode ? 0 : papaya.ui.Toolbar.SIZE + PAPAYA_SPACING) + PAPAYA_SPACING + (this.fullScreenPadding ? 2 * PAPAYA_CONTAINER_PADDING_TOP : 0)) - (this.showControlBar ? 2 * papaya.ui.Toolbar.SIZE : 0), c > b && (c = b, a = papayaRoundFast(c *
        d)));
    return [a, c]
};
papaya.Container.prototype.getViewerPadding = function() {
    var c, a;
    c = this.containerHtml.parent().width() - (this.fullScreenPadding ? 2 * PAPAYA_PADDING : 0);
    a = this.getViewerDimensions();
    return (c - a[0]) / 2
};
papaya.Container.prototype.readGlobalParams = function() {
    this.kioskMode = !0 === this.params.kioskMode || papaya.utilities.PlatformUtils.smallScreen;
    this.combineParametric = !0 === this.params.combineParametric;
    this.params.loadingComplete && (this.loadingComplete = this.params.loadingComplete);
    void 0 !== this.params.showControls && (this.showControls = this.params.showControls);
    void 0 !== this.params.noNewFiles && (this.noNewFiles = this.params.noNewFiles);
    void 0 !== this.params.showImageButtons && (this.showImageButtons = this.params.showImageButtons);
    papaya.utilities.PlatformUtils.smallScreen && (this.showImageButtons = !1);
    void 0 !== this.params.fullScreenPadding && (this.fullScreenPadding = this.params.fullScreenPadding);
    void 0 !== this.params.orthogonal && (this.orthogonal = this.params.orthogonal);
    this.surfaceParams.showSurfacePlanes = !0 === this.params.showSurfacePlanes;
    this.surfaceParams.showSurfaceCrosshairs = !0 === this.params.showSurfaceCrosshairs;
    this.surfaceParams.surfaceBackground = this.params.surfaceBackground;
    this.orthogonalTall = this.orthogonal && !0 ===
        this.params.orthogonalTall;
    this.orthogonalDynamic = this.orthogonal && !0 === this.params.orthogonalDynamic;
    void 0 !== this.params.allowScroll && (this.allowScroll = this.params.allowScroll);
    (papaya.utilities.PlatformUtils.mobile || this.orthogonalDynamic) && this.orthogonal && ($(window).height() > $(window).width() ? this.orthogonalTall = !0 : this.orthogonalTall = !1);
    void 0 !== this.params.syncOverlaySeries && (this.syncOverlaySeries = this.params.syncOverlaySeries);
    void 0 !== this.params.showControlBar && (this.showControlBar = this.showControls &&
        this.params.showControlBar);
    void 0 !== this.params.contextManager && (this.contextManager = this.params.contextManager);
    !0 === this.params.fullScreen && (this.fullScreenPadding = this.params.fullScreenPadding = !1, this.kioskMode = this.params.kioskMode = !0, this.showControlBar = this.params.showControlBar = !1, $("body").css("background-color:'black'"))
};
papaya.Container.prototype.reset = function() {
    this.loadingSurfaceIndex = this.loadingImageIndex = 0;
    this.collapsable = this.nestedViewer = !1;
    this.orthogonal = !0;
    this.noNewFiles = this.kioskMode = this.orthogonalDynamic = this.orthogonalTall = !1;
    this.showControls = !0;
    this.showControlBar = !1;
    this.fullScreenPadding = !0;
    this.showRuler = this.combineParametric = !1
};
papaya.Container.prototype.resizeViewerComponents = function(c) {
    var a, d, b = 0;
    this.toolbar.closeAllMenus();
    a = this.getViewerDimensions();
    d = this.getViewerPadding();
    this.toolbarHtml.css({
        width: a[0] + "px"
    });
    this.toolbarHtml.css({
        height: papaya.ui.Toolbar.SIZE + "px"
    });
    this.toolbarHtml.css({
        paddingLeft: d + "px"
    });
    this.toolbarHtml.css({
        paddingBottom: PAPAYA_SPACING + "px"
    });
    this.viewerHtml.css({
        width: a[0] + "px"
    });
    this.viewerHtml.css({
        height: a[1] + "px"
    });
    this.viewerHtml.css({
        paddingLeft: d + "px"
    });
    c && this.viewer.resizeViewer(a);
    this.displayHtml.css({
        height: papaya.viewer.Display.SIZE + "px"
    });
    this.displayHtml.css({
        paddingLeft: d + "px"
    });
    this.displayHtml.css({
        paddingTop: PAPAYA_SPACING + "px"
    });
    this.display.canvas.width = a[0];
    this.showControls && this.showControlBar ? (this.sliderControlHtml.css({
            width: a[0] + "px"
        }), this.sliderControlHtml.css({
            height: papaya.viewer.Display.SIZE + "px"
        }), b = this.kioskMode ? b + 0 : b + -50, b = this.viewer.hasSeries ? b + 200 : b + 0, a[0] < 775 + b ? ($("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS).css({
            display: "none"
        }), $("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS).css({
            display: "none"
        })) :
        ($("." + PAPAYA_CONTROL_GOTO_CENTER_BUTTON_CSS).css({
            display: "inline"
        }), $("." + PAPAYA_CONTROL_GOTO_ORIGIN_BUTTON_CSS).css({
            display: "inline"
        })), a[0] < 600 + b ? ($("." + PAPAYA_CONTROL_DIRECTION_SLIDER).css({
            display: "none"
        }), $("." + PAPAYA_CONTROL_MAIN_SLIDER).css({
            display: "inline"
        })) : ($("." + PAPAYA_CONTROL_DIRECTION_SLIDER).css({
            display: "inline"
        }), $("." + PAPAYA_CONTROL_MAIN_SLIDER).css({
            display: "none"
        })), this.viewer.hasSeries && a[0] < 450 + b && $("." + PAPAYA_CONTROL_MAIN_SLIDER).css({
            display: "none"
        }), 200 > a[0] ? $("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS).css({
            display: "none"
        }) :
        $("." + PAPAYA_CONTROL_SWAP_BUTTON_CSS).css({
            display: "inline"
        }), this.viewer.hasSeries ? $("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(3).css({
            display: "inline"
        }) : $("." + PAPAYA_CONTROL_DIRECTION_SLIDER).eq(3).css({
            display: "none"
        })) : this.showControls && this.viewer.initialized && (600 > a[0] ? ($("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS + this.containerIndex).css({
        display: "none"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.containerIndex).css({
        display: "none"
    })) : this.viewer.controlsHidden || ($("#" + PAPAYA_CONTROL_MAIN_GOTO_CENTER_BUTTON_CSS +
        this.containerIndex).css({
        display: "inline"
    }), $("#" + PAPAYA_CONTROL_MAIN_GOTO_ORIGIN_BUTTON_CSS + this.containerIndex).css({
        display: "inline"
    })));
    this.isDesktopMode() && (600 > a[0] ? this.titlebarHtml.css({
        visibility: "hidden"
    }) : this.titlebarHtml.css({
        visibility: "visible"
    }));
    this.nestedViewer && !this.collapsable || !this.fullScreenPadding ? this.containerHtml.css({
        paddingTop: "0"
    }) : this.containerHtml.css({
        paddingTop: PAPAYA_CONTAINER_PADDING_TOP + "px"
    });
    this.fullScreenPadding && (this.containerHtml.css({
        paddingLeft: PAPAYA_PADDING +
            "px"
    }), this.containerHtml.css({
        paddingRight: PAPAYA_PADDING + "px"
    }));
    this.viewer.initialized ? this.viewer.drawViewer(!1, !0) : (this.viewer.drawEmptyViewer(), this.display.drawEmptyDisplay());
    this.titlebarHtml.css({
        width: a[0] + "px",
        top: 0
    })
};
papaya.Container.prototype.updateViewerSize = function() {
    this.toolbar.closeAllMenus();
    this.viewer.resizeViewer(this.getViewerDimensions());
    this.viewer.updateOffsetRect()
};
papaya.Container.prototype.buildViewer = function(c) {
    var a;
    this.viewerHtml = this.containerHtml.find("." + PAPAYA_VIEWER_CSS);
    papaya.Container.removeCheckForJSClasses(this.containerHtml, this.viewerHtml);
    this.viewerHtml.html("");
    a = this.getViewerDimensions();
    this.viewer = new papaya.viewer.Viewer(this, a[0], a[1], c);
    this.viewerHtml.append($(this.viewer.canvas));
    this.preferences.viewer = this.viewer
};
papaya.Container.prototype.buildDisplay = function() {
    var c;
    this.displayHtml = this.containerHtml.find("." + PAPAYA_DISPLAY_CSS);
    c = this.getViewerDimensions();
    this.display = new papaya.viewer.Display(this, c[0]);
    this.displayHtml.append($(this.display.canvas))
};
papaya.Container.prototype.buildSliderControl = function() {
    this.sliderControlHtml = this.containerHtml.find("." + PAPAYA_KIOSK_CONTROLS_CSS)
};
papaya.Container.prototype.buildToolbar = function() {
    this.toolbarHtml = this.containerHtml.find("." + PAPAYA_TOOLBAR_CSS);
    this.toolbar = new papaya.ui.Toolbar(this);
    this.toolbar.buildToolbar();
    this.toolbar.updateImageButtons()
};
papaya.Container.prototype.readFile = function(c, a) {
    c.file(function(a, b) {
        a && "." !== b.name.charAt(0) && a(b)
    }.bind(this, a))
};
papaya.Container.prototype.readDir = function(c) {
    this.readDirNextEntries(c.createReader())
};
papaya.Container.prototype.readDirNextEntries = function(c) {
    var a = this;
    c.readEntries(function(d) {
        var b = d.length,
            e, g;
        if (0 < b) {
            for (e = 0; e < b; e += 1) g = d[e], g.isFile && a.readFile(g, papaya.utilities.ObjectUtils.bind(a, a.addDroppedFile));
            a.readDirNextEntries(c)
        }
    })
};
papaya.Container.prototype.setUpDnD = function() {
    var c = this;
    this.containerHtml[0].ondragover = function() {
        c.viewer.draggingOver = !0;
        c.viewer.initialized || c.viewer.drawEmptyViewer();
        return !1
    };
    this.containerHtml[0].ondragleave = function() {
        c.viewer.draggingOver = !1;
        c.viewer.initialized || c.viewer.drawEmptyViewer();
        return !1
    };
    this.containerHtml[0].ondragend = function() {
        c.viewer.draggingOver = !1;
        c.viewer.initialized || c.viewer.drawEmptyViewer();
        return !1
    };
    this.containerHtml[0].ondrop = function(a) {
        a.preventDefault();
        var d = a.dataTransfer;
        c.display.drawProgress(.1, "Loading");
        if (d)
            if (d.items && 0 < d.items.length) {
                a = d.items;
                var d = a.length,
                    b, e;
                for (b = 0; b < d; b += 1) e = a[b], e.getAsEntry ? e = e.getAsEntry() : e.webkitGetAsEntry && (e = e.webkitGetAsEntry()), e.isFile ? c.readFile(e, papaya.utilities.ObjectUtils.bind(c, c.addDroppedFile)) : e.isDirectory && c.readDir(e)
            } else d.files && 0 < d.files.length && c.viewer.loadImage(a.dataTransfer.files);
        return !1
    }
};
papaya.Container.prototype.addDroppedFile = function(c) {
    clearTimeout(this.dropTimeout);
    papayaDroppedFiles.push(c);
    this.dropTimeout = setTimeout(papaya.utilities.ObjectUtils.bind(this, this.droppedFilesFinishedLoading), 100)
};
papaya.Container.prototype.droppedFilesFinishedLoading = function() {
    papaya.surface.Surface.findSurfaceType(papayaDroppedFiles[0].name) !== papaya.surface.Surface.SURFACE_TYPE_UNKNOWN ? this.viewer.loadSurface(papayaDroppedFiles) : this.viewer.loadImage(papayaDroppedFiles);
    papayaDroppedFiles = []
};
papaya.Container.prototype.clearParams = function() {
    this.params = []
};
papaya.Container.prototype.loadNext = function() {
    this.hasImageToLoad() ? this.loadNextImage() : this.hasSurfaceToLoad() ? this.loadNextSurface() : this.hasAtlasToLoad() && this.viewer.loadAtlas()
};
papaya.Container.prototype.hasMoreToLoad = function() {
    return this.hasImageToLoad() || this.hasSurfaceToLoad() || this.hasAtlasToLoad()
};
papaya.Container.prototype.hasImageToLoad = function() {
    return this.params.images ? this.loadingImageIndex < this.params.images.length : this.params.binaryImages ? this.loadingImageIndex < this.params.binaryImages.length : this.params.encodedImages ? this.loadingImageIndex < this.params.encodedImages.length : this.params.files ? this.loadingImageIndex < this.params.files.length : !1
};
papaya.Container.prototype.hasAtlasToLoad = function() {
    return null == papaya.Container.atlas && this.viewer.hasDefinedAtlas()
};
papaya.Container.prototype.hasSurfaceToLoad = function() {
    return papaya.utilities.PlatformUtils.isWebGLSupported() ? this.params.surfaces ? this.loadingSurfaceIndex < this.params.surfaces.length : this.params.encodedSurfaces ? this.loadingSurfaceIndex < this.params.encodedSurfaces.length : !1 : (console.log("Warning: This browser version is not able to load surfaces."), !1)
};
papaya.Container.prototype.loadNextSurface = function() {
    var c = !1,
        a;
    this.params.surfaces ? this.loadingSurfaceIndex < this.params.surfaces.length ? (c = !0, a = this.params.surfaces[this.loadingSurfaceIndex], this.loadingSurfaceIndex += 1, this.viewer.loadSurface(a, !0, !1)) : (this.params.loadedSurfaces = this.params.surfaces, this.params.surfaces = []) : this.params.encodedSurfaces && (this.loadingSurfaceIndex < this.params.encodedSurfaces.length ? (c = !0, a = this.params.encodedSurfaces[this.loadingSurfaceIndex], a instanceof Array ||
        (a = [], a[0] = this.params.encodedSurfaces[this.loadingSurfaceIndex]), this.viewer.loadSurface(a, !1, !0), this.loadingSurfaceIndex += 1) : (this.params.loadedEncodedSurfaces = this.params.encodedSurfaces, this.params.encodedSurfaces = []));
    return c
};
papaya.Container.prototype.loadNextImage = function() {
    var c = !1,
        a;
    this.params.images ? this.loadingImageIndex < this.params.images.length ? (c = !0, a = this.params.images[this.loadingImageIndex], a instanceof Array || (a = [], a[0] = this.params.images[this.loadingImageIndex]), this.viewer.loadImage(a, !0, !1, !1), this.loadingImageIndex += 1) : (this.params.loadedImages = this.params.images, this.params.images = []) : this.params.binaryImages ? this.loadingImageIndex < this.params.binaryImages.length ? (c = !0, a = this.params.binaryImages[this.loadingImageIndex],
        a instanceof Array || (a = [], a[0] = this.params.binaryImages[this.loadingImageIndex]), this.viewer.loadImage(a, !1, !1, !0), this.loadingImageIndex += 1) : (this.params.loadedEncodedImages = this.params.binaryImages, this.params.binaryImages = []) : this.params.encodedImages ? this.loadingImageIndex < this.params.encodedImages.length ? (c = !0, a = this.params.encodedImages[this.loadingImageIndex], a instanceof Array || (a = [], a[0] = this.params.encodedImages[this.loadingImageIndex]), this.viewer.loadImage(a, !1, !0, !1), this.loadingImageIndex +=
        1) : (this.params.loadedEncodedImages = this.params.encodedImages, this.params.encodedImages = []) : this.params.files && (this.loadingImageIndex < this.params.files.length ? (c = !0, a = this.params.files[this.loadingImageIndex], a instanceof Array || (a = [], a[0] = this.params.files[this.loadingImageIndex]), this.viewer.loadImage(a, !1, !1, !1), this.loadingImageIndex += 1) : (this.params.loadedFiles = this.params.files, this.params.files = []));
    return c
};
papaya.Container.prototype.readyForDnD = function() {
    return !this.kioskMode && (void 0 === this.params.images || this.loadingImageIndex >= this.params.images.length) && (void 0 === this.params.binaryImages || this.loadingImageIndex >= this.params.binaryImages.length) && (void 0 === this.params.encodedImages || this.loadingImageIndex >= this.params.encodedImages.length) && (void 0 === this.params.encodedSurfaces || this.loadingSurfaceIndex >= this.params.encodedSurfaces.length)
};
papaya.Container.prototype.findLoadableImage = function(c, a) {
    var d;
    for (d = 0; d < papayaLoadableImages.length; d += 1)
        if (a) {
            if (papayaLoadableImages[d].surface && papayaLoadableImages[d].name == c) return papayaLoadableImages[d]
        } else if (papayaLoadableImages[d].name == c) return papayaLoadableImages[d];
    return void 0 !== window[c] ? {
        encode: c
    } : null
};
papaya.Container.prototype.findLoadableImages = function(c, a) {
    var d, b, e = [];
    Array.isArray(c) || (c = [c]);
    if (c)
        for (d = 0; d < c.length; d++)(b = this.findLoadableImage(c[d], a)) && e.push(b);
    return 0 < e.length ? e : null
};
papaya.Container.prototype.expandViewer = function() {
    var c = this;
    this.nestedViewer && (this.nestedViewer = !1, this.collapsable = !0, this.tempScrollTop = $(window).scrollTop(), $(":hidden").addClass(PAPAYA_CONTAINER_COLLAPSABLE_EXEMPT), $(document.body).children().hide(), this.containerHtml.show(), this.originalStyle = {}, this.originalStyle.width = document.body.style.width, this.originalStyle.height = document.body.style.height, this.originalStyle.marginTop = document.body.style.marginTop, this.originalStyle.marginRight = document.body.style.marginRight,
        this.originalStyle.marginBottom = document.body.style.marginBottom, this.originalStyle.marginLeft = document.body.style.marginLeft, this.originalStyle.paddingTop = document.body.style.paddingTop, this.originalStyle.paddingRight = document.body.style.paddingRight, this.originalStyle.paddingBottom = document.body.style.paddingBottom, this.originalStyle.paddingLeft = document.body.style.paddingLeft, this.originalStyle.overflow = document.body.style.overflow, papaya.Container.setToFullPage(), this.containerHtml.after('<div style="display:none" class="' +
            PAPAYA_CONTAINER_COLLAPSABLE + '"></div>'), $(document.body).prepend(this.containerHtml), this.resizeViewerComponents(!0), this.viewer.updateOffsetRect(), this.updateViewerSize(), setTimeout(function() {
            window.scrollTo(0, 0);
            c.viewer.addScroll()
        }, 0))
};
papaya.Container.prototype.collapseViewer = function() {
    var c, a;
    a = this;
    if (this.collapsable) {
        this.nestedViewer = !0;
        this.collapsable = !1;
        document.body.style.width = this.originalStyle.width;
        document.body.style.height = this.originalStyle.height;
        document.body.style.marginTop = this.originalStyle.marginTop;
        document.body.style.marginRight = this.originalStyle.marginRight;
        document.body.style.marginBottom = this.originalStyle.marginBottom;
        document.body.style.marginLeft = this.originalStyle.marginLeft;
        document.body.style.paddingTop =
            this.originalStyle.paddingTop;
        document.body.style.paddingRight = this.originalStyle.paddingRight;
        document.body.style.paddingBottom = this.originalStyle.paddingBottom;
        document.body.style.paddingLeft = this.originalStyle.paddingLeft;
        document.body.style.overflow = this.originalStyle.overflow;
        $("." + PAPAYA_CONTAINER_COLLAPSABLE).replaceWith(this.containerHtml);
        $(document.body).children(":not(." + PAPAYA_CONTAINER_COLLAPSABLE_EXEMPT + ")").show();
        $("." + PAPAYA_CONTAINER_COLLAPSABLE_EXEMPT).removeClass(PAPAYA_CONTAINER_COLLAPSABLE_EXEMPT);
        this.resizeViewerComponents(!0);
        for (c = 0; c < papayaContainers.length; c += 1) papayaContainers[c].updateViewerSize(), papayaContainers[c].viewer.drawViewer(!0);
        setTimeout(function() {
            $(window).scrollTop(a.tempScrollTop);
            a.viewer.removeScroll()
        }, 0)
    }
};
papaya.Container.prototype.isNestedViewer = function() {
    return this.nestedViewer || this.collapsable
};
papaya.Container.prototype.isDesktopMode = function() {
    return !this.kioskMode
};
papaya.Container.prototype.hasLoadedDTI = function() {
    return this.viewer.hasLoadedDTI()
};
papaya.Container.prototype.disableScrollWheel = function() {
    return this.isNestedViewer() || papaya.utilities.PlatformUtils.ios
};
papaya.Container.prototype.canOpenInMango = function() {
    return this.params.canOpenInMango
};
papaya.Container.prototype.isExpandable = function() {
    return this.params.expandable && this.isNestedViewer()
};
papaya.Container.prototype.isParametricCombined = function(c) {
    return this.combineParametric && this.viewer.hasParametricPair(c)
};
papaya.Container.prototype.isNonParametricCombined = function(c) {
    return !this.isParametricCombined(c)
};
papaya.Container.prototype.coordinateChanged = function(c) {
    var a, d, b = c.currentCoord;
    if (!c.ignoreSync)
        if (papaya.Container.syncViewersWorld)
            for (a = 0; a < papayaContainers.length; a += 1) papayaContainers[a].viewer === c || papayaContainers[a].viewer.ignoreSync || (d = new papaya.core.Coordinate, papayaContainers[a].viewer.gotoWorldCoordinate(c.getWorldCoordinateAtIndex(b.x, b.y, b.z, d), !0));
        else if (papaya.Container.syncViewers)
        for (a = 0; a < papayaContainers.length; a += 1) papayaContainers[a].viewer === c || papayaContainers[a].viewer.ignoreSync ||
            papayaContainers[a].viewer.gotoCoordinate(b, !0);
    c.surfaceView && c.surfaceView.updateActivePlanes();
    this.contextManager && this.contextManager.clearContext && this.contextManager.clearContext()
};
papaya.Container.prototype.canCurrentOverlayLoadNegatives = function() {
    var c = this.viewer.currentScreenVolume;
    return !c.negative && null === c.negativeScreenVol
};
papaya.Container.prototype.canCurrentOverlayLoadMod = function() {
    var c = this.viewer.currentScreenVolume;
    return c.dti && null === c.dtiVolumeMod
};
papaya.Container.prototype.canCurrentOverlayModulate = function() {
    var c = this.viewer.currentScreenVolume;
    return c.dti && null !== c.dtiVolumeMod
};
window.addEventListener("resize", papaya.Container.resizePapaya, !1);
window.addEventListener("orientationchange", papaya.Container.reorientPapaya, !1);
// window.addEventListener("load", papaya.Container.startPapaya, !1);
window.addEventListener("load", function() {
    papaya.Container.startPapaya("papaya1");
    papaya.Container.startPapaya("papaya2");
}, false);
window.addEventListener("message", function(c) {
    c.data === PAPAYA_MANGO_INSTALLED && (papaya.mangoinstalled = !0)
}, !1);