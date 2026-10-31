// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), u = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function ee(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var te = ee.prototype = new b();
	te.constructor = ee, _(te, y.prototype), te.isPureReactComponent = !0;
	var ne = Array.isArray;
	function re() {}
	var x = {
		H: null,
		A: null,
		T: null,
		S: null
	}, S = Object.prototype.hasOwnProperty;
	function C(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function w(e, t) {
		return C(e.type, t, e.props);
	}
	function T(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ie(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ae = /\/+/g;
	function E(e, t) {
		return typeof e == "object" && e && e.key != null ? ie("" + e.key) : t.toString(36);
	}
	function D(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(re, re) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function oe(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, oe(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + E(e, 0) : a, ne(o) ? (i = "", c != null && (i = c.replace(ae, "$&/") + "/"), oe(o, r, i, "", function(e) {
			return e;
		})) : o != null && (T(o) && (o = w(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ae, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ne(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + E(a, u), c += oe(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + E(a, u++), c += oe(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return oe(D(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function O(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return oe(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function k(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var se = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ce(e) {
		var t = x.T, n = {};
		n.types = t === null ? null : t.types, x.T = n;
		try {
			var r = e(), i = x.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(re, se);
		} catch (e) {
			se(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), x.T = t;
		}
	}
	function le(e) {
		var t = x.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else ce(le.bind(null, e));
	}
	var ue = {
		map: O,
		forEach: function(e, t, n) {
			O(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return O(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return O(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!T(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = ue, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = ee, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return x.H.useMemoCache(e);
		}
	}, e.addTransitionType = le, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !S.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return C(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) S.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return C(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = T, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: k
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = ce, e.unstable_useCacheRefresh = function() {
		return x.H.useCacheRefresh();
	}, e.use = function(e) {
		return x.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return x.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return x.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return x.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return x.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return x.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return x.H.useEffectEvent(e);
	}, e.useId = function() {
		return x.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return x.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return x.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return x.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return x.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return x.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return x.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return x.H.useRef(e);
	}, e.useState = function(e) {
		return x.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return x.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return x.H.useTransition();
	}, e.version = "19.3.1";
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = u();
})), f = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function ee(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, te || (te = !0, w());
			else {
				var t = n(l);
				t !== null && ae(ee, t.startTime - e);
			}
		}
	}
	var te = !1, ne = -1, re = 5, x = -1;
	function S() {
		return g ? !0 : !(e.unstable_now() - x < re);
	}
	function C() {
		if (g = !1, te) {
			var t = e.unstable_now();
			x = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ne), ne = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && S());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(ee, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? w() : te = !1;
			}
		}
	}
	var w;
	if (typeof y == "function") w = function() {
		y(C);
	};
	else if (typeof MessageChannel < "u") {
		var T = new MessageChannel(), ie = T.port2;
		T.port1.onmessage = C, w = function() {
			ie.postMessage(null);
		};
	} else w = function() {
		_(C, 0);
	};
	function ae(t, n) {
		ne = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ne), ne = -1) : h = !0, ae(ee, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, te || (te = !0, w()))), r;
	}, e.unstable_shouldYield = S, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), p = /* @__PURE__ */ o(((e, t) => {
	t.exports = f();
})), m = /* @__PURE__ */ o(((e) => {
	var t = d();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), h = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = m();
})), g = /* @__PURE__ */ o(((e) => {
	var t = p(), n = d(), r = h();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function m(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && m(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var ee = null, te = null;
	function ne(e, t, n) {
		return e === n || e === t && (ee = e, !0);
	}
	function re(e, t, n) {
		return e === n ? (te = e, !1) : e === t && (te !== null && (ee = e), !0);
	}
	function x(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function S(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var C = Object.assign, w = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), ie = Symbol.for("react.portal"), ae = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), oe = Symbol.for("react.consumer"), O = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), se = Symbol.for("react.suspense"), ce = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), ue = Symbol.for("react.lazy"), de = Symbol.for("react.activity"), fe = Symbol.for("react.legacy_hidden"), pe = Symbol.for("react.memo_cache_sentinel"), me = Symbol.for("react.view_transition"), he = Symbol.for("react.recoverable"), ge = Symbol.iterator;
	function _e(e) {
		return typeof e != "object" || !e ? null : (e = ge && e[ge] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ve = Symbol.for("react.client.reference");
	function ye(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ve ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case ae: return "Fragment";
			case D: return "Profiler";
			case E: return "StrictMode";
			case se: return "Suspense";
			case ce: return "SuspenseList";
			case de: return "Activity";
			case me: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case ie: return "Portal";
			case O: return e.displayName || "Context";
			case oe: return (e._context.displayName || "Context") + ".Consumer";
			case k:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case le: return t = e.displayName || null, t === null ? ye(e.type) || "Memo" : t;
			case ue:
				t = e._payload, e = e._init;
				try {
					return ye(e(t));
				} catch {}
		}
		return null;
	}
	var be = Array.isArray, A = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, xe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Se = [], Ce = -1;
	function we(e) {
		return { current: e };
	}
	function Te(e) {
		0 > Ce || (e.current = Se[Ce], Se[Ce] = null, Ce--);
	}
	function M(e, t) {
		Ce++, Se[Ce] = e.current, e.current = t;
	}
	var Ee = we(null), De = we(null), Oe = we(null), ke = we(null);
	function Ae(e, t) {
		switch (M(Oe, t), M(De, e), M(Ee, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		Te(Ee), M(Ee, e);
	}
	function je() {
		Te(Ee), Te(De), Te(Oe);
	}
	function Me(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, M(ke, e)), t = Ee.current;
		var n = dp(t, e.type);
		t !== n && (M(De, e), M(Ee, n));
	}
	function Ne(e) {
		De.current === e && (Te(Ee), Te(De)), ke.current === e && (Te(ke), sh._currentValue = xe);
	}
	var Pe, Fe;
	function Ie(e) {
		if (Pe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Pe = t && t[1] || "", Fe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Pe + e + Fe;
	}
	var Le = !1;
	function Re(e, t) {
		if (!e || Le) return "";
		Le = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Le = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ie(n) : "";
	}
	function ze(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ie(e.type);
			case 16: return Ie("Lazy");
			case 13: return e.child !== t && t !== null ? Ie("Suspense Fallback") : Ie("Suspense");
			case 19: return Ie("SuspenseList");
			case 0:
			case 15: return Re(e.type, !1);
			case 11: return Re(e.type.render, !1);
			case 1: return Re(e.type, !0);
			case 31: return Ie("Activity");
			case 30: return Ie("ViewTransition");
			default: return "";
		}
	}
	function Be(e) {
		try {
			var t = "", n = null;
			do
				t += ze(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ve = Object.prototype.hasOwnProperty, He = t.unstable_scheduleCallback, Ue = t.unstable_cancelCallback, We = t.unstable_shouldYield, Ge = t.unstable_requestPaint, Ke = t.unstable_now, qe = t.unstable_getCurrentPriorityLevel, Je = t.unstable_ImmediatePriority, Ye = t.unstable_UserBlockingPriority, Xe = t.unstable_NormalPriority, Ze = t.unstable_LowPriority, Qe = t.unstable_IdlePriority, $e = t.log, et = t.unstable_setDisableYieldValue, tt = null, nt = null;
	function rt(e) {
		if (typeof $e == "function" && et(e), nt && typeof nt.setStrictMode == "function") try {
			nt.setStrictMode(tt, e);
		} catch {}
	}
	var it = Math.clz32 ? Math.clz32 : st, at = Math.log, ot = Math.LN2;
	function st(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (at(e) / ot | 0) | 0;
	}
	var ct = 256, lt = 262144, ut = 4194304;
	function dt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function ft(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = dt(n))) : i = dt(o) : i = dt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = dt(n))) : i = dt(o)) : i = dt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function pt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function mt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - it(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function ht(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function gt() {
		var e = ut;
		return ut <<= 1, !(ut & 62914560) && (ut = 4194304), e;
	}
	function _t(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function vt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function yt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - it(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && bt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function bt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - it(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function xt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - it(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function St(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ct(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function wt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Tt() {
		var e = j.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function Et(e, t) {
		var n = j.p;
		try {
			return j.p = e, t();
		} finally {
			j.p = n;
		}
	}
	var Dt = Math.random().toString(36).slice(2), N = "__reactFiber$" + Dt, Ot = "__reactProps$" + Dt, kt = "__reactContainer$" + Dt, At = "__reactEvents$" + Dt, jt = "__reactListeners$" + Dt, Mt = "__reactHandles$" + Dt, Nt = "__reactResources$" + Dt, Pt = "__reactMarker$" + Dt, Ft = "__reactLoad$" + Dt;
	function It(e) {
		delete e[N], delete e[Ot], delete e[jt], delete e[Mt];
	}
	function Lt(e) {
		var t;
		if (t = e[N]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[kt] || n[N]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[N]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Rt(e) {
		if (e = e[N] || e[kt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function zt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Bt(e) {
		var t = e[Nt];
		return t ||= e[Nt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function P(e) {
		e[Pt] = !0;
	}
	function Vt(e) {
		e[Ft] = void 0;
	}
	var F = /* @__PURE__ */ new Set(), Ht = {};
	function Ut(e, t) {
		Wt(e, t), Wt(e + "Capture", t);
	}
	function Wt(e, t) {
		for (Ht[e] = t, e = 0; e < t.length; e++) F.add(t[e]);
	}
	var Gt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), I = {}, Kt = {};
	function qt(e) {
		return Ve.call(Kt, e) ? !0 : Ve.call(I, e) ? !1 : Gt.test(e) ? Kt[e] = !0 : (I[e] = !0, !1);
	}
	var L = !1;
	function Jt() {
		var e = L;
		return L = !1, e;
	}
	function Yt(e, t, n) {
		if (qt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Xt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Zt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Qt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function $t(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function en(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function tn(e) {
		if (!e._valueTracker) {
			var t = $t(e) ? "checked" : "value";
			e._valueTracker = en(e, t, "" + e[t]);
		}
	}
	function nn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = $t(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var rn = /[\n"\\]/g;
	function an(e) {
		return e.replace(rn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function on(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Qt(t)) : e.value !== "" + Qt(t) && (e.value = "" + Qt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : cn(e, Qt(n)) : o === "number" && e.value == t ? cn(e, Qt(e.value)) : cn(e, Qt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Qt(s) : e.removeAttribute("name");
	}
	function sn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				tn(e);
				return;
			}
			n = n == null ? "" : "" + Qt(n), t = t == null ? n : "" + Qt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), tn(e);
	}
	function cn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function ln(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Qt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function un(e, t, n) {
		t != null && (t = "" + Qt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Qt(n);
	}
	function dn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (be(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Qt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), tn(e);
	}
	function fn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var pn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function mn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || pn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function hn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", L = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (mn(e, a, r), L = !0);
		} else for (var o in t) t.hasOwnProperty(o) && mn(e, o, t[o]);
	}
	function gn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var _n = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), vn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function yn(e) {
		return vn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function bn() {}
	var xn = null;
	function Sn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Cn = null, wn = null;
	function Tn(e) {
		var t = Rt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ot] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (on(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + an("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ot] || null;
								if (!a) throw Error(i(90));
								on(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && nn(r);
					}
					break a;
				case "textarea":
					un(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && ln(e, !!n.multiple, t, !1);
			}
		}
	}
	var En = !1;
	function Dn(e, t, n) {
		if (En) return e(t, n);
		En = !0;
		try {
			return e(t);
		} finally {
			if (En = !1, (Cn !== null || wn !== null) && (zd(), Cn && (t = Cn, e = wn, wn = Cn = null, Tn(t), e))) for (t = 0; t < e.length; t++) Tn(e[t]);
		}
	}
	function On(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ot] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var kn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, An = !1;
	if (kn) try {
		var jn = {};
		Object.defineProperty(jn, "passive", { get: function() {
			An = !0;
		} }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
	} catch {
		An = !1;
	}
	var Mn = null, Nn = null, Pn = null;
	function Fn() {
		if (Pn) return Pn;
		var e, t = Nn, n = t.length, r, i = "value" in Mn ? Mn.value : Mn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Pn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function In(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Ln() {
		return !0;
	}
	function Rn() {
		return !1;
	}
	function zn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Ln : Rn, this.isPropagationStopped = Rn, this;
		}
		return C(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Ln);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Ln);
			},
			persist: function() {},
			isPersistent: Ln
		}), t;
	}
	var Bn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Vn = zn(Bn), Hn = C({}, Bn, {
		view: 0,
		detail: 0
	}), Un = zn(Hn), Wn, Gn, Kn, qn = C({}, Hn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: ir,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (Wn = e.screenX - Kn.screenX, Gn = e.screenY - Kn.screenY) : Gn = Wn = 0, Kn = e), Wn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Gn;
		}
	}), Jn = zn(qn), Yn = zn(C({}, qn, { dataTransfer: 0 })), Xn = zn(C({}, Hn, { relatedTarget: 0 })), Zn = zn(C({}, Bn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Qn = zn(C({}, Bn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), $n = zn(C({}, Bn, { data: 0 })), er = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, tr = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, nr = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function rr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = nr[e]) ? !!t[e] : !1;
	}
	function ir() {
		return rr;
	}
	var ar = zn(C({}, Hn, {
		key: function(e) {
			if (e.key) {
				var t = er[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = In(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? tr[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: ir,
		charCode: function(e) {
			return e.type === "keypress" ? In(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? In(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), or = zn(C({}, qn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), sr = zn(C({}, Bn, { submitter: 0 })), cr = zn(C({}, Hn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: ir
	})), lr = zn(C({}, Bn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), ur = zn(C({}, qn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), dr = zn(C({}, Bn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), fr = [
		9,
		13,
		27,
		32
	], pr = kn && "CompositionEvent" in window, mr = null;
	kn && "documentMode" in document && (mr = document.documentMode);
	var hr = kn && "TextEvent" in window && !mr, gr = kn && (!pr || mr && 8 < mr && 11 >= mr), _r = " ", vr = !1;
	function yr(e, t) {
		switch (e) {
			case "keyup": return fr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function br(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var xr = !1;
	function Sr(e, t) {
		switch (e) {
			case "compositionend": return br(t);
			case "keypress": return t.which === 32 ? (vr = !0, _r) : null;
			case "textInput": return e = t.data, e === _r && vr ? null : e;
			default: return null;
		}
	}
	function Cr(e, t) {
		if (xr) return e === "compositionend" || !pr && yr(e, t) ? (e = Fn(), Pn = Nn = Mn = null, xr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return gr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var wr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Tr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!wr[e.type] : t === "textarea";
	}
	function Er(e, t, n, r) {
		Cn ? wn ? wn.push(r) : wn = [r] : Cn = r, t = Jf(t, "onChange"), 0 < t.length && (n = new Vn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Dr = null, Or = null;
	function kr(e) {
		Vf(e, 0);
	}
	function Ar(e) {
		if (nn(zt(e))) return e;
	}
	function jr(e, t) {
		if (e === "change") return t;
	}
	var Mr = !1;
	if (kn) {
		var Nr;
		if (kn) {
			var Pr = "oninput" in document;
			if (!Pr) {
				var Fr = document.createElement("div");
				Fr.setAttribute("oninput", "return;"), Pr = typeof Fr.oninput == "function";
			}
			Nr = Pr;
		} else Nr = !1;
		Mr = Nr && (!document.documentMode || 9 < document.documentMode);
	}
	function Ir() {
		Dr && (Dr.detachEvent("onpropertychange", Lr), Or = Dr = null);
	}
	function Lr(e) {
		if (e.propertyName === "value" && Ar(Or)) {
			var t = [];
			Er(t, Or, e, Sn(e)), Dn(kr, t);
		}
	}
	function Rr(e, t, n) {
		e === "focusin" ? (Ir(), Dr = t, Or = n, Dr.attachEvent("onpropertychange", Lr)) : e === "focusout" && Ir();
	}
	function zr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ar(Or);
	}
	function Br(e, t) {
		if (e === "click") return Ar(t);
	}
	function Vr(e, t) {
		if (e === "input" || e === "change") return Ar(t);
	}
	function Hr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Ur = typeof Object.is == "function" ? Object.is : Hr;
	function Wr(e, t) {
		if (Ur(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ve.call(t, i) || !Ur(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Gr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Kr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function qr(e, t) {
		var n = Kr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Kr(n);
		}
	}
	function Jr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Jr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Yr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Gr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Gr(e.document);
		}
		return t;
	}
	function Xr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Zr = kn && "documentMode" in document && 11 >= document.documentMode, Qr = null, $r = null, ei = null, ti = !1;
	function ni(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ti || Qr == null || Qr !== Gr(r) || (r = Qr, "selectionStart" in r && Xr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ei && Wr(ei, r) || (ei = r, r = Jf($r, "onSelect"), 0 < r.length && (t = new Vn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Qr)));
	}
	function ri(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var ii = {
		animationend: ri("Animation", "AnimationEnd"),
		animationiteration: ri("Animation", "AnimationIteration"),
		animationstart: ri("Animation", "AnimationStart"),
		transitionrun: ri("Transition", "TransitionRun"),
		transitionstart: ri("Transition", "TransitionStart"),
		transitioncancel: ri("Transition", "TransitionCancel"),
		transitionend: ri("Transition", "TransitionEnd")
	}, ai = {}, oi = {};
	kn && (oi = document.createElement("div").style, "AnimationEvent" in window || (delete ii.animationend.animation, delete ii.animationiteration.animation, delete ii.animationstart.animation), "TransitionEvent" in window || delete ii.transitionend.transition);
	function si(e) {
		if (ai[e]) return ai[e];
		if (!ii[e]) return e;
		var t = ii[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in oi) return ai[e] = t[n];
		return e;
	}
	var ci = si("animationend"), li = si("animationiteration"), ui = si("animationstart"), di = si("transitionrun"), fi = si("transitionstart"), pi = si("transitioncancel"), mi = si("transitionend"), hi = /* @__PURE__ */ new Map(), gi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	gi.push("scrollEnd");
	function _i(e, t) {
		hi.set(e, t), Ut(t, [e]);
	}
	var vi = 0;
	function yi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = bd.identifierPrefix;
		var n = vi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function bi(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Od;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function xi(e, t) {
		return e = bi(e), t = bi(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Si = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Ci = [], wi = 0, Ti = 0;
	function Ei() {
		for (var e = wi, t = Ti = wi = 0; t < e;) {
			var n = Ci[t];
			Ci[t++] = null;
			var r = Ci[t];
			Ci[t++] = null;
			var i = Ci[t];
			Ci[t++] = null;
			var a = Ci[t];
			if (Ci[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Ai(n, i, a);
		}
	}
	function Di(e, t, n, r) {
		Ci[wi++] = e, Ci[wi++] = t, Ci[wi++] = n, Ci[wi++] = r, Ti |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Oi(e, t, n, r) {
		return Di(e, t, n, r), ji(e);
	}
	function ki(e, t) {
		return Di(e, null, null, t), ji(e);
	}
	function Ai(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - it(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ji(e) {
		if (50 < kd) throw kd = 0, Ad = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Mi = {};
	function Ni(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Pi(e, t, n, r) {
		return new Ni(e, t, n, r);
	}
	function Fi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ii(e, t) {
		var n = e.alternate;
		return n === null ? (n = Pi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Li(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ri(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Fi(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, Ee.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case de: return e = Pi(31, n, t, a), e.elementType = de, e.lanes = o, e;
			case ae: return zi(n.children, a, o, t);
			case E:
				s = 8, a |= 24;
				break;
			case D: return e = Pi(12, n, t, a | 2), e.elementType = D, e.lanes = o, e;
			case se: return e = Pi(13, n, t, a), e.elementType = se, e.lanes = o, e;
			case ce: return e = Pi(19, n, t, a), e.elementType = ce, e.lanes = o, e;
			case fe:
			case me: return e = a | 32, e = Pi(30, n, t, e), e.elementType = me, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case O:
						s = 10;
						break a;
					case oe:
						s = 9;
						break a;
					case k:
						s = 11;
						break a;
					case le:
						s = 14;
						break a;
					case ue:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Pi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function zi(e, t, n, r) {
		return e = Pi(7, e, r, t), e.lanes = n, e;
	}
	function Bi(e, t, n) {
		return e = Pi(6, e, null, t), e.lanes = n, e;
	}
	function Vi(e) {
		var t = Pi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Hi(e, t, n) {
		return t = Pi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ui = /* @__PURE__ */ new WeakMap();
	function Wi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ui.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Be(t)
			}, Ui.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Be(t)
		};
	}
	var Gi = [], Ki = 0, qi = null, Ji = 0, Yi = [], Xi = 0, Zi = null, Qi = 1, $i = "";
	function ea(e, t) {
		Gi[Ki++] = Ji, Gi[Ki++] = qi, qi = e, Ji = t;
	}
	function ta(e, t, n) {
		Yi[Xi++] = Qi, Yi[Xi++] = $i, Yi[Xi++] = Zi, Zi = e;
		var r = Qi;
		e = $i;
		var i = 32 - it(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - it(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Qi = 1 << 32 - it(t) + i | n << i | r, $i = a + e;
		} else Qi = 1 << a | n << i | r, $i = e;
	}
	function na(e) {
		e.return !== null && (ea(e, 1), ta(e, 1, 0));
	}
	function ra(e) {
		for (; e === qi;) qi = Gi[--Ki], Gi[Ki] = null, Ji = Gi[--Ki], Gi[Ki] = null;
		for (; e === Zi;) Zi = Yi[--Xi], Yi[Xi] = null, $i = Yi[--Xi], Yi[Xi] = null, Qi = Yi[--Xi], Yi[Xi] = null;
	}
	function ia(e, t) {
		Yi[Xi++] = Qi, Yi[Xi++] = $i, Yi[Xi++] = Zi, Qi = t.id, $i = t.overflow, Zi = e;
	}
	var aa = null, R = null, z = !1, oa = null, sa = !1, ca = Error(i(519));
	function la(e) {
		throw ha(Wi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ca;
	}
	function ua(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[N] = e, t[Ot] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < zf.length; n++) Q(zf[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), sn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), dn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ep(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = bn), t = !0) : t = !1, t || la(e, !0);
	}
	function da(e) {
		for (aa = e.return; aa;) switch (aa.tag) {
			case 5:
			case 31:
			case 13:
				sa = !1;
				return;
			case 27:
			case 3:
				sa = !0;
				return;
			default: aa = aa.return;
		}
	}
	function fa(e) {
		if (e !== aa) return !1;
		if (!z) return da(e), z = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && R && la(e), da(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			R = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			R = dm(e);
		} else t === 27 ? (t = R, Sp(e.type) ? (e = um, um = null, R = e) : R = t) : R = aa ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function pa() {
		R = aa = null, z = !1;
	}
	function ma() {
		var e = oa;
		return e !== null && (fd === null ? fd = e : fd.push.apply(fd, e), oa = null), e;
	}
	function ha(e) {
		oa === null ? oa = [e] : oa.push(e);
	}
	var ga = we(null), _a = null, va = null;
	function ya(e, t, n) {
		M(ga, t._currentValue), t._currentValue = n;
	}
	function ba(e) {
		e._currentValue = ga.current, Te(ga);
	}
	function xa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Sa(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), xa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), xa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), xa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Ca(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Ur(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ke.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && Sa(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function wa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Ur(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ta(e) {
		_a = e, va = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ea(e) {
		return Oa(_a, e);
	}
	function Da(e, t) {
		return _a === null && Ta(e), Oa(e, t);
	}
	function Oa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, va === null) {
			if (e === null) throw Error(i(308));
			va = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else va = va.next = t;
		return n;
	}
	var ka = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Aa = t.unstable_scheduleCallback, ja = t.unstable_NormalPriority, Ma = {
		$$typeof: O,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Na() {
		return {
			controller: new ka(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Pa(e) {
		e.refCount--, e.refCount === 0 && Aa(ja, function() {
			e.controller.abort();
		});
	}
	function Fa(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ia = null;
	function La(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Ra = null, za = 0, Ba = 0, Va = null;
	function Ha(e, t) {
		if (Ra === null) {
			var n = Ra = [];
			za = 0, Ba = Pf(), Va = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return za++, t.then(Ua, Ua), t;
	}
	function Ua() {
		if (--za === 0 && (Ia = null, Ra !== null)) {
			Va !== null && (Va.status = "fulfilled");
			var e = Ra;
			Ra = null, Ba = 0, Va = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Wa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ga = A.S;
	A.S = function(e, t) {
		if (hd = Ke(), typeof t == "object" && t && typeof t.then == "function" && Ha(e, t), Ia !== null) for (var n = bf; n !== null;) Fa(n, Ia), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = bf; r !== null;) Fa(r, n), r = r.next;
			if (Ba !== 0) {
				r = Ia, r === null && (r = Ia = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ga !== null && Ga(e, t);
	};
	var Ka = we(null);
	function qa() {
		var e = Ka.current;
		return e === null ? q.pooledCache : e;
	}
	function Ja(e, t) {
		t === null ? M(Ka, Ka.current) : M(Ka, t.pool);
	}
	function Ya() {
		var e = qa();
		return e === null ? null : {
			parent: Ma._currentValue,
			pool: e
		};
	}
	var Xa = Error(i(460)), Za = Error(i(474)), Qa = Error(i(542)), $a = { then: function() {} };
	function eo(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function to(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(bn, bn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ao(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(bn, bn);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ao(e), e;
				}
				throw ro = t, Xa;
		}
	}
	function no(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ro = e, Xa) : e;
		}
	}
	var ro = null;
	function io() {
		if (ro === null) throw Error(i(459));
		var e = ro;
		return ro = null, e;
	}
	function ao(e) {
		if (e === Xa || e === Qa) throw Error(i(483));
	}
	var oo = null, so = 0;
	function co(e) {
		var t = so;
		return so += 1, oo === null && (oo = []), to(oo, e, t);
	}
	function lo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function uo(e, t) {
		throw t.$$typeof === w ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function fo(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ii(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Bi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === ae ? (e = d(e, t, n.props.children, r, n.key), lo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ue && no(i) === t.type) ? (t = a(t, n.props), lo(t, n), t.return = e, t) : (t = Ri(n.type, n.key, n.props, null, e.mode, r), lo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Hi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = zi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Bi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case T: return n = Ri(t.type, t.key, t.props, null, e.mode, n), lo(n, t), n.return = e, n;
					case ie: return t = Hi(t, e.mode, n), t.return = e, t;
					case ue: return t = no(t), f(e, t, n);
				}
				if (be(t) || _e(t)) return t = zi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, co(t), n);
				if (t.$$typeof === O) return f(e, Da(e, t), n);
				uo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case T: return n.key === i ? l(e, t, n, r) : null;
					case ie: return n.key === i ? u(e, t, n, r) : null;
					case ue: return n = no(n), p(e, t, n, r);
				}
				if (be(n) || _e(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, co(n), r);
				if (n.$$typeof === O) return p(e, t, Da(e, n), r);
				uo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case T: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case ie: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ue: return r = no(r), m(e, t, n, r, i);
				}
				if (be(r) || _e(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, co(r), i);
				if (r.$$typeof === O) return m(e, t, n, Da(t, r), i);
				uo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), z && ea(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return z && ea(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), z && ea(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), z && ea(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return z && ea(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), z && ea(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === ae && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case T:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === ae) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), lo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ue && no(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), lo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === ae ? (c = zi(o.props.children, e.mode, c, o.key), lo(c, o), c.return = e, e = c) : (c = Ri(o.type, o.key, o.props, null, e.mode, c), lo(c, o), c.return = e, e = c);
						}
						return s(e);
					case ie:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Hi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ue: return o = no(o), _(e, r, o, c);
				}
				if (be(o)) return h(e, r, o, c);
				if (_e(o)) {
					if (l = _e(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, co(o), c);
				if (o.$$typeof === O) return _(e, r, Da(e, o), c);
				uo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Bi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				so = 0;
				var i = _(e, t, n, r);
				return oo = null, i;
			} catch (t) {
				if (t === Xa || t === Qa) throw t;
				var a = Pi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var po = fo(!0), mo = fo(!1), ho = !1;
	function go(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function _o(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function vo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function yo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ji(e), Ai(e, null, n), t;
		}
		return Di(e, r, t, n), ji(e);
	}
	function B(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, xt(e, n);
		}
	}
	function bo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var xo = !1;
	function So() {
		if (xo) {
			var e = Va;
			if (e !== null) throw e;
		}
	}
	function Co(e, t, n, r) {
		xo = !1;
		var i = e.updateQueue;
		ho = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === Ba && (xo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = C({}, d, f);
								break a;
							case 2: ho = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), od |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function wo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function To(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) wo(n[e], t);
	}
	var Eo = we(null), Do = we(0);
	function Oo(e, t) {
		e = id, M(Do, e), M(Eo, t), id = e | t.baseLanes;
	}
	function ko() {
		M(Do, id), M(Eo, Eo.current);
	}
	function Ao() {
		id = Do.current, Te(Eo), Te(Do);
	}
	var V = we(null), jo = null;
	function Mo(e) {
		var t = e.alternate;
		M(Lo, Lo.current & 1), M(V, e), jo === null && (t === null || Eo.current !== null || t.memoizedState !== null) && (jo = e);
	}
	function No(e) {
		M(Lo, Lo.current), M(V, e), jo === null && (jo = e);
	}
	function Po(e) {
		e.tag === 22 ? (M(Lo, Lo.current), M(V, e), jo === null && (jo = e)) : Fo();
	}
	function Fo() {
		M(Lo, Lo.current), M(V, V.current);
	}
	function Io(e) {
		Te(V), jo === e && (jo = null), Te(Lo);
	}
	var Lo = we(0);
	function Ro(e, t) {
		M(V, V.current), M(Lo, t);
	}
	function zo(e) {
		Te(Lo), Te(V), jo === e && (jo = null);
	}
	function Bo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Vo = 0, H = null, U = null, Ho = null, Uo = !1, Wo = !1, Go = !1, Ko = 0, qo = 0, Jo = null, Yo = 0;
	function Xo() {
		throw Error(i(321));
	}
	function Zo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Ur(e[n], t[n])) return !1;
		return !0;
	}
	function Qo(e, t, n, r, i, a) {
		return Vo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? hc : gc, Go = !1, a = n(r, i), Go = !1, Wo && (a = es(t, n, r, i)), $o(e), a;
	}
	function $o(e) {
		A.H = mc;
		var t = U !== null && U.next !== null;
		if (Vo = 0, Ho = U = H = null, Uo = !1, qo = 0, Jo = null, t) throw Error(i(300));
		e === null || Nc || (e = e.dependencies, e !== null && wa(e) && (Nc = !0));
	}
	function es(e, t, n, r) {
		H = e;
		var a = 0;
		do {
			if (Wo && (Jo = null), qo = 0, Wo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Ho = U = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			A.H = _c, o = t(n, r);
		} while (Wo);
		return o;
	}
	function ts() {
		var e = A.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? cs(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t;
	}
	function ns() {
		var e = Ko !== 0;
		return Ko = 0, e;
	}
	function rs(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function is(e) {
		if (Uo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Uo = !1;
		}
		Vo = 0, Ho = U = H = null, Wo = !1, qo = Ko = 0, Jo = null;
	}
	function as() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Ho === null ? H.memoizedState = Ho = e : Ho = Ho.next = e, Ho;
	}
	function os() {
		if (U === null) {
			var e = H.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = U.next;
		var t = Ho === null ? H.memoizedState : Ho.next;
		if (t !== null) Ho = t, U = e;
		else {
			if (e === null) throw H.alternate === null ? Error(i(467)) : Error(i(310));
			U = e, e = {
				memoizedState: U.memoizedState,
				baseState: U.baseState,
				baseQueue: U.baseQueue,
				queue: U.queue,
				next: null
			}, Ho === null ? H.memoizedState = Ho = e : Ho = Ho.next = e;
		}
		return Ho;
	}
	function ss() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function cs(e) {
		var t = qo;
		return qo += 1, Jo === null && (Jo = []), e = to(Jo, e, t), t = H, (Ho === null ? t.memoizedState : Ho.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? hc : gc), e;
	}
	function ls(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return cs(e);
			if (e.$$typeof === he) return;
			if (e.$$typeof === O) return Ea(e);
		}
		throw Error(i(438, String(e)));
	}
	function us(e) {
		var t = null, n = H.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = H.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ss(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = pe;
		return t.index++, n;
	}
	function ds(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function fs(e) {
		return ps(os(), U, e);
	}
	function ps(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Vo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ba && (d = !0);
					else if ((Vo & p) === p) {
						u = u.next, p === Ba && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, H.lanes |= p, od |= p;
					f = u.action, Go && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, H.lanes |= f, od |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Ur(o, e.memoizedState) && (Nc = !0, d && (n = Va, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function ms(e) {
		var t = os(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Ur(o, t.memoizedState) || (Nc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function hs(e, t, n) {
		var r = H, a = os(), o = z;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Ur((U || a).memoizedState, n);
		if (s && (a.memoizedState = n, Nc = !0), a = a.queue, Bs(vs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Ho !== null && !!(Ho.memoizedState.tag & 1), Fs(e ? 9 : 8, { destroy: void 0 }, _s.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, q === null) throw Error(i(349));
			o || Vo & 127 || gs(r, t, n);
		}
		return n;
	}
	function gs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = H.updateQueue, t === null ? (t = ss(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function _s(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ys(t) && bs(e);
	}
	function vs(e, t, n) {
		return n(function() {
			ys(t) && bs(e);
		});
	}
	function ys(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Ur(e, n);
		} catch {
			return !0;
		}
	}
	function bs(e) {
		var t = ki(e, 2);
		t !== null && Pd(t, e, 2);
	}
	function xs(e) {
		var t = as();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Go) {
				rt(!0);
				try {
					n();
				} finally {
					rt(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ds,
			lastRenderedState: e
		}, t;
	}
	function Ss(e, t, n, r) {
		return e.baseState = n, ps(e, U, typeof r == "function" ? r : ds);
	}
	function Cs(e, t, n, r, a) {
		if (dc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			A.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, ws(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function ws(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = A.T, o = {};
			o.types = a === null ? null : a.types, A.T = o;
			try {
				var s = n(i, r), c = A.S;
				c !== null && c(o, s), Ts(e, t, s);
			} catch (n) {
				Ds(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), A.T = a;
			}
		} else try {
			a = n(i, r), Ts(e, t, a);
		} catch (n) {
			Ds(e, t, n);
		}
	}
	function Ts(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Es(e, t, n);
		}, function(n) {
			return Ds(e, t, n);
		}) : Es(e, t, n);
	}
	function Es(e, t, n) {
		t.status = "fulfilled", t.value = n, Os(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ws(e, n)));
	}
	function Ds(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Os(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Os(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ks(e, t) {
		return t;
	}
	function As(e, t) {
		if (z) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = H;
					if (z) {
						if (R) {
							b: {
								for (var i = R, a = sa; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								R = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						la(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = as(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ks,
			lastRenderedState: t
		}, n.queue = r, n = cc.bind(null, H, r), r.dispatch = n, r = xs(!1), a = uc.bind(null, H, !1, r.queue), r = as(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Cs.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function js(e) {
		return Ms(os(), U, e);
	}
	function Ms(e, t, n) {
		if (t = ps(e, t, ks)[0], e = fs(ds)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = cs(t);
		} catch (e) {
			throw e === Xa ? Qa : e;
		}
		else r = t;
		t = os();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (H.flags |= 2048, Fs(9, { destroy: void 0 }, Ns.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ns(e, t) {
		e.action = t;
	}
	function Ps(e) {
		var t = os(), n = U;
		if (n !== null) return Ms(t, n, e);
		os(), t = t.memoizedState, n = os();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Fs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = H.updateQueue, t === null && (t = ss(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Is() {
		return os().memoizedState;
	}
	function Ls(e, t, n, r) {
		var i = as();
		H.flags |= e, i.memoizedState = Fs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Rs(e, t, n, r) {
		var i = os();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		U !== null && r !== null && Zo(r, U.memoizedState.deps) ? i.memoizedState = Fs(t, a, n, r) : (H.flags |= e, i.memoizedState = Fs(1 | t, a, n, r));
	}
	function zs(e, t) {
		Ls(8390656, 8, e, t);
	}
	function Bs(e, t) {
		Rs(2048, 8, e, t);
	}
	function Vs(e) {
		H.flags |= 4;
		var t = H.updateQueue;
		if (t === null) t = ss(), H.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Hs(e) {
		var t = os().memoizedState;
		return Vs({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Us(e, t) {
		return Rs(4, 2, e, t);
	}
	function Ws(e, t) {
		return Rs(4, 4, e, t);
	}
	function Gs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Ks(e, t, n) {
		n = n == null ? null : n.concat([e]), Rs(4, 4, Gs.bind(null, t, e), n);
	}
	function qs() {}
	function Js(e, t) {
		var n = os();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Zo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Ys(e, t) {
		var n = os();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Zo(t, r[1])) return r[0];
		if (r = e(), Go) {
			rt(!0);
			try {
				e();
			} finally {
				rt(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Xs(e, t, n) {
		return n === void 0 || Vo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Md(), H.lanes |= e, od |= e, n);
	}
	function Zs(e, t, n, r) {
		return Ur(n, t) ? n : Eo.current === null ? !(Vo & 106) || Vo & 1073741824 && !(Y & 261930) ? (Nc = !0, e.memoizedState = n) : (e = Md(), H.lanes |= e, od |= e, t) : (e = Xs(e, n, r), Ur(e, t) || (Nc = !0), e);
	}
	function Qs(e, t, n, r, i) {
		var a = j.p;
		j.p = a !== 0 && 8 > a ? a : 8;
		var o = A.T, s = {};
		s.types = o === null ? null : o.types, A.T = s, uc(e, !1, t, n);
		try {
			var c = i(), l = A.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? lc(e, t, Wa(c, r), jd(e)) : lc(e, t, r, jd(e));
		} catch (n) {
			lc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, jd());
		} finally {
			j.p = a, o !== null && s.types !== null && (o.types = s.types), A.T = o;
		}
	}
	function $s() {}
	function ec(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = tc(e).queue;
		Qs(e, a, t, xe, n === null ? $s : function() {
			return nc(e), n(r);
		});
	}
	function tc(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: xe,
			baseState: xe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ds,
				lastRenderedState: xe
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ds,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function nc(e) {
		var t = tc(e);
		t.next === null && (t = e.alternate.memoizedState), lc(e, t.next.queue, {}, jd());
	}
	function rc() {
		return Ea(sh);
	}
	function ic() {
		return os().memoizedState;
	}
	function ac() {
		return os().memoizedState;
	}
	function oc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = jd();
					e = vo(n);
					var r = yo(t, e, n);
					r !== null && (Pd(r, t, n), B(r, t, n)), t = { cache: Na() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function sc(e, t, n) {
		var r = jd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, dc(e) ? fc(t, n) : (n = Oi(e, t, n, r), n !== null && (Pd(n, e, r), pc(n, t, r)));
	}
	function cc(e, t, n) {
		lc(e, t, n, jd());
	}
	function lc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (dc(e)) fc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Ur(s, o)) return Di(e, t, i, 0), q === null && Ei(), !1;
			} catch {}
			if (n = Oi(e, t, i, r), n !== null) return Pd(n, e, r), pc(n, t, r), !0;
		}
		return !1;
	}
	function uc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Pf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, dc(e)) {
			if (t) throw Error(i(479));
		} else t = Oi(e, n, r, 2), t !== null && Pd(t, e, 2);
	}
	function dc(e) {
		var t = e.alternate;
		return e === H || t !== null && t === H;
	}
	function fc(e, t) {
		Wo = Uo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function pc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, xt(e, n);
		}
	}
	var mc = {
		readContext: Ea,
		use: ls,
		useCallback: Xo,
		useContext: Xo,
		useEffect: Xo,
		useImperativeHandle: Xo,
		useLayoutEffect: Xo,
		useInsertionEffect: Xo,
		useMemo: Xo,
		useReducer: Xo,
		useRef: Xo,
		useState: Xo,
		useDebugValue: Xo,
		useDeferredValue: Xo,
		useTransition: Xo,
		useSyncExternalStore: Xo,
		useId: Xo,
		useHostTransitionStatus: Xo,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: Xo,
		useMemoCache: Xo,
		useCacheRefresh: Xo,
		useEffectEvent: Xo
	}, hc = {
		readContext: Ea,
		use: ls,
		useCallback: function(e, t) {
			return as().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ea,
		useEffect: zs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Ls(4194308, 4, Gs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Ls(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Ls(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = as();
			t = t === void 0 ? null : t;
			var r = e();
			if (Go) {
				rt(!0);
				try {
					e();
				} finally {
					rt(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = as();
			if (n !== void 0) {
				var i = n(t);
				if (Go) {
					rt(!0);
					try {
						n(t);
					} finally {
						rt(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = sc.bind(null, H, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = as();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = xs(e);
			var t = e.queue, n = cc.bind(null, H, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: qs,
		useDeferredValue: function(e, t) {
			return Xs(as(), e, t);
		},
		useTransition: function() {
			var e = xs(!1);
			return e = Qs.bind(null, H, e.queue, !0, !1), as().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = H, a = as();
			if (z) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || gs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, zs(vs.bind(null, r, o, e), [e]), r.flags |= 2048, Fs(9, { destroy: void 0 }, _s.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = as(), t = q.identifierPrefix;
			if (z) {
				var n = $i, r = Qi;
				n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ko++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Yo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: rc,
		useFormState: As,
		useActionState: As,
		useOptimistic: function(e) {
			var t = as();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = uc.bind(null, H, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: us,
		useCacheRefresh: function() {
			return as().memoizedState = oc.bind(null, H);
		},
		useEffectEvent: function(e) {
			var t = as(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, gc = {
		readContext: Ea,
		use: ls,
		useCallback: Js,
		useContext: Ea,
		useEffect: Bs,
		useImperativeHandle: Ks,
		useInsertionEffect: Us,
		useLayoutEffect: Ws,
		useMemo: Ys,
		useReducer: fs,
		useRef: Is,
		useState: function() {
			return fs(ds);
		},
		useDebugValue: qs,
		useDeferredValue: function(e, t) {
			return Zs(os(), U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = fs(ds)[0], t = os().memoizedState;
			return [typeof e == "boolean" ? e : cs(e), t];
		},
		useSyncExternalStore: hs,
		useId: ic,
		useHostTransitionStatus: rc,
		useFormState: js,
		useActionState: js,
		useOptimistic: function(e, t) {
			return Ss(os(), U, e, t);
		},
		useMemoCache: us,
		useCacheRefresh: ac,
		useEffectEvent: Hs
	}, _c = {
		readContext: Ea,
		use: ls,
		useCallback: Js,
		useContext: Ea,
		useEffect: Bs,
		useImperativeHandle: Ks,
		useInsertionEffect: Us,
		useLayoutEffect: Ws,
		useMemo: Ys,
		useReducer: ms,
		useRef: Is,
		useState: function() {
			return ms(ds);
		},
		useDebugValue: qs,
		useDeferredValue: function(e, t) {
			var n = os();
			return U === null ? Xs(n, e, t) : Zs(n, U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ms(ds)[0], t = os().memoizedState;
			return [typeof e == "boolean" ? e : cs(e), t];
		},
		useSyncExternalStore: hs,
		useId: ic,
		useHostTransitionStatus: rc,
		useFormState: Ps,
		useActionState: Ps,
		useOptimistic: function(e, t) {
			var n = os();
			return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ss(n, U, e, t);
		},
		useMemoCache: us,
		useCacheRefresh: ac,
		useEffectEvent: Hs
	};
	function vc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : C({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var yc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = vo(r);
			i.payload = t, n != null && (i.callback = n), t = yo(e, i, r), t !== null && (Pd(t, e, r), B(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = vo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = yo(e, i, r), t !== null && (Pd(t, e, r), B(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = jd(), r = vo(n);
			r.tag = 2, t != null && (r.callback = t), t = yo(e, r, n), t !== null && (Pd(t, e, n), B(t, e, n));
		}
	};
	function bc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Wr(n, r) || !Wr(i, a) : !0;
	}
	function xc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && yc.enqueueReplaceState(t, t.state, null);
	}
	function Sc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = C({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Cc(e) {
		Si(e);
	}
	function wc(e) {
		console.error(e);
	}
	function Tc(e) {
		Si(e);
	}
	function Ec(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Dc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Oc(e, t, n) {
		return n = vo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ec(e, t);
		}, n;
	}
	function kc(e) {
		return e = vo(e), e.tag = 3, e;
	}
	function Ac(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Dc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Dc(t, n, r), typeof i != "function" && (vd === null ? vd = /* @__PURE__ */ new Set([this]) : vd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function jc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ca(t, n, a, !0), n = V.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return jo === null ? Kd() : n.alternate === null && ad === 0 && (ad = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === $a ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), mf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === $a ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), mf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return mf(e, r, a), Kd(), !1;
		}
		if (z) return t = V.current, t === null ? (r !== ca && (t = Error(i(423), { cause: r }), ha(Wi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Wi(r, n), a = Oc(e.stateNode, r, a), bo(e, a), ad !== 4 && (ad = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ca && (e = Error(i(422), { cause: r }), ha(Wi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Wi(o, n), dd === null ? dd = [o] : dd.push(o), ad !== 4 && (ad = 2), t === null) return !0;
		r = Wi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Oc(n.stateNode, r, e), bo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (vd === null || !vd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = kc(a), Ac(a, e, n, r), bo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Mc = Error(i(461)), Nc = !1;
	function Pc(e, t, n, r) {
		t.child = e === null ? mo(t, null, n, r) : po(t, e.child, n, r);
	}
	function Fc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ta(t), r = Qo(e, t, n, o, a, i), s = ns(), e !== null && !Nc ? (rs(e, t, i), ll(e, t, i)) : (z && s && na(t), t.flags |= 1, Pc(e, t, r, i), t.child);
	}
	function Ic(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Fi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Lc(e, t, a, r, i)) : (e = Ri(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !ul(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Wr : n, n(o, r) && e.ref === t.ref) return ll(e, t, i);
		}
		return t.flags |= 1, e = Ii(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Lc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Wr(a, r) && e.ref === t.ref) {
				if (Nc = !1, t.pendingProps = r = a, ul(e, i)) e.flags & 131072 && (Nc = !0);
				else return t.lanes = e.lanes, ll(e, t, i);
			}
		}
		return Gc(e, t, n, r, i);
	}
	function Rc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Bc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ja(t, a === null ? null : a.cachePool), a === null ? ko() : Oo(t, a), Po(t);
			else return r = t.lanes = 536870912, Bc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ja(t, null), ko(), Fo()) : (Ja(t, a.cachePool), Oo(t, a), Fo(), t.memoizedState = null);
		return Pc(e, t, i, n), t.child;
	}
	function zc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Bc(e, t, n, r, i) {
		var a = qa();
		return a = a === null ? null : {
			parent: Ma._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ja(t, null), ko(), Po(t), e !== null && Ca(e, t, r, !0), t.childLanes = i, null;
	}
	function Vc(e, t) {
		return t = el({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Hc(e, t, n) {
		return po(t, e.child, null, n), e = Vc(t, t.pendingProps), e.flags |= 2, Io(t), t.memoizedState = null, e;
	}
	function Uc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (z) {
				if (r.mode === "hidden") return e = Vc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, zc(null, e);
				if (No(t), (e = R) ? (e = am(e, sa), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Zi === null ? null : {
						id: Qi,
						overflow: $i
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Vi(e), n.return = t, t.child = n, aa = t, R = null)) : e = null, e === null) throw la(t);
				return t.lanes = 536870912, null;
			}
			return Vc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (No(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Hc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Nc || Ca(e, t, n, !1), a = (n & e.childLanes) !== 0, Nc || a) {
				if (Eo.current === null) {
					if (r = q, r !== null && (s = St(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ki(e, s), Pd(r, e, s), Mc;
					Kd();
				}
				t = Hc(e, t, n);
			} else e = o.treeContext, R = lm(s.nextSibling), aa = t, z = !0, oa = null, sa = !1, e !== null && ia(t, e), t = Vc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ii(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Wc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Gc(e, t, n, r, i) {
		return Ta(t), n = Qo(e, t, n, r, void 0, i), r = ns(), e !== null && !Nc ? (rs(e, t, i), ll(e, t, i)) : (z && r && na(t), t.flags |= 1, Pc(e, t, n, i), t.child);
	}
	function Kc(e, t, n, r, i, a) {
		return Ta(t), t.updateQueue = null, n = es(t, r, n, i), $o(e), r = ns(), e !== null && !Nc ? (rs(e, t, a), ll(e, t, a)) : (z && r && na(t), t.flags |= 1, Pc(e, t, n, a), t.child);
	}
	function qc(e, t, n, r, i) {
		if (Ta(t), t.stateNode === null) {
			var a = Mi, o = n.contextType;
			typeof o == "object" && o && (a = Ea(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = yc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, go(t), o = n.contextType, a.context = typeof o == "object" && o ? Ea(o) : Mi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (vc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && yc.enqueueReplaceState(a, a.state, null), Co(t, r, a, i), So(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Sc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Mi, typeof u == "object" && u && (o = Ea(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && xc(t, a, r, o), ho = !1;
			var f = t.memoizedState;
			a.state = f, Co(t, r, a, i), So(), l = t.memoizedState, s || f !== l || ho ? (typeof d == "function" && (vc(t, n, d, r), l = t.memoizedState), (c = ho || bc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, _o(e, t), o = t.memoizedProps, u = Sc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Mi, typeof l == "object" && l && (c = Ea(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && xc(t, a, r, c), ho = !1, f = t.memoizedState, a.state = f, Co(t, r, a, i), So();
			var p = t.memoizedState;
			o !== d || f !== p || ho || e !== null && e.dependencies !== null && wa(e.dependencies) ? (typeof s == "function" && (vc(t, n, s, r), p = t.memoizedState), (u = ho || bc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && wa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Wc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = po(t, e.child, null, i), t.child = po(t, null, n, i)) : Pc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = ll(e, t, i), e;
	}
	function Jc(e, t, n, r) {
		return pa(), t.flags |= 256, Pc(e, t, n, r), t.child;
	}
	var Yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Xc(e) {
		return {
			baseLanes: e,
			cachePool: Ya()
		};
	}
	function Zc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ld), e;
	}
	function Qc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Lo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (z) {
				if (i ? Mo(t) : Fo(), (e = R) ? (e = am(e, sa), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Zi === null ? null : {
						id: Qi,
						overflow: $i
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Vi(e), n.return = t, t.child = n, aa = t, R = null)) : e = null, e === null) throw la(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Fo(), i = t.mode, a = el({
				mode: "hidden",
				children: a
			}, i), r = zi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Xc(n), r.childLanes = Zc(e, o, n), t.memoizedState = Yc, zc(null, r)) : (Mo(t), $c(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return nl(e, t, a, o, r, c, s, n);
		}
		return i ? (Fo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ii(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = zi(i, a, n, null), i.flags |= 2) : i = Ii(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, zc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Xc(n) : (a = i.cachePool, a === null ? a = Ya() : (s = Ma._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Zc(e, o, n), t.memoizedState = Yc, zc(e.child, r)) : (Mo(t), n = e.child, e = n.sibling, n = Ii(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function $c(e, t) {
		return t = el({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function el(e, t) {
		return e = Pi(22, e, null, t), e.lanes = 0, e;
	}
	function tl(e, t, n) {
		return po(t, e.child, null, n), e = $c(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function nl(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Mo(t), t.flags &= -257, tl(e, t, c)) : t.memoizedState === null ? (Fo(), o = a.fallback, s = t.mode, a = el({
			mode: "visible",
			children: a.children
		}, s), o = zi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, po(t, e.child, null, c), a = t.child, a.memoizedState = Xc(c), a.childLanes = Zc(e, r, c), t.memoizedState = Yc, zc(null, a)) : (Fo(), t.child = e.child, t.flags |= 128, null);
		if (Mo(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ha({
				value: a,
				source: null,
				stack: null
			})), tl(e, t, c);
		}
		if (Nc || Ca(e, t, c, !1), r = (c & e.childLanes) !== 0, Nc || r) {
			if (Eo.current !== null) return tl(e, t, c);
			if (r = q, r !== null && (a = St(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, ki(e, a), Pd(r, e, a), Mc;
			return om(o) || Kd(), tl(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, R = lm(o.nextSibling), aa = t, z = !0, oa = null, sa = !1, e !== null && ia(t, e), t = $c(t, a.children), t.flags |= 134221824, t);
	}
	function rl(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), xa(e.return, t, n);
	}
	function il(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Bo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function al(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function ol(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function sl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Lo.current;
		if (t.flags & 128) return Ro(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Ro(t, o), i === "backwards" && e !== null ? (ol(e), Pc(e, t, r, n), ol(e)) : Pc(e, t, r, n), r = z ? Ji : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && rl(e, n, t);
			else if (e.tag === 19) rl(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = il(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, ol(t)), al(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Bo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				al(t, !0, n, null, a, r);
				break;
			case "together":
				al(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = il(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), al(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function cl(e, t, n) {
		var r = t.pendingProps;
		return ya(t, t.type, r.value), Pc(e, t, r.children, n), t.child;
	}
	function ll(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), od |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Ca(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ii(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ii(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function ul(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && wa(e)));
	}
	function dl(e, t, n) {
		switch (t.tag) {
			case 3:
				Ae(t, t.stateNode.containerInfo), ya(t, Ma, e.memoizedState.cache), pa();
				break;
			case 27:
			case 5:
				Me(t);
				break;
			case 4:
				Ae(t, t.stateNode.containerInfo);
				break;
			case 10:
				ya(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, No(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Mo(t), t.flags |= 128, null;
					r = Ca(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Qc(e, t, n) : (Mo(t), e = ll(e, t, n), e === null ? null : e.sibling);
				}
				Mo(t);
				break;
			case 19:
				if (t.flags & 128) return sl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Ca(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return sl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ro(t, Lo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Rc(e, t, n, t.pendingProps);
			case 24: ya(t, Ma, e.memoizedState.cache);
		}
		return ll(e, t, n);
	}
	function fl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Nc = !0;
			else {
				if (!ul(e, n) && !(t.flags & 128)) return Nc = !1, dl(e, t, n);
				Nc = !!(e.flags & 131072);
			}
		} else Nc = !1, z && t.flags & 1048576 && ta(t, Ji, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = no(t.elementType), t.type = e, typeof e == "function") Fi(e) ? (r = Sc(e, r), t.tag = 1, t = qc(null, t, e, r, n)) : (t.tag = 0, t = Gc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === k) {
								t.tag = 11, t = Fc(null, t, e, r, n);
								break a;
							}
							if (a === le) {
								t.tag = 14, t = Ic(null, t, e, r, n);
								break a;
							}
							if (a === O) {
								t.tag = 10, t.type = e, t = cl(null, t, n);
								break a;
							}
						}
						throw t = ye(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Gc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Sc(r, t.pendingProps), qc(e, t, r, a, n);
			case 3:
				a: {
					if (Ae(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, _o(e, t), Co(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ya(t, Ma, r), r !== o.cache && Sa(t, [Ma], n, !0), So(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Jc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Wi(Error(i(424)), t), ha(a), t = Jc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (R = lm(e.firstChild), aa = t, z = !0, oa = null, sa = !0, n = mo(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (pa(), r === a) {
							t = ll(e, t, n);
							break a;
						}
						Pc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Wc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : z || (t.stateNode = fp(t.type, t.pendingProps, Oe.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Me(t), e === null && z && (r = t.stateNode = hm(t.type, t.pendingProps, Oe.current), aa = t, sa = !0, a = R, Sp(t.type) ? (um = a, R = lm(r.firstChild)) : R = a), Pc(e, t, t.pendingProps.children, n), Wc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && z && ((a = r = R) && (r = rm(r, t.type, t.pendingProps, sa), r === null ? a = !1 : (t.stateNode = r, aa = t, R = lm(r.firstChild), sa = !1, a = !0)), a || la(t)), Me(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Qo(e, t, ts, null, null, n), sh._currentValue = a), Wc(e, t), Pc(e, t, r, n), t.child;
			case 6: return e === null && z && ((e = n = R) && (n = im(n, t.pendingProps, sa), n === null ? e = !1 : (t.stateNode = n, aa = t, R = null, e = !0)), e || la(t)), null;
			case 13: return Qc(e, t, n);
			case 4: return Ae(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = po(t, null, r, n) : Pc(e, t, r, n), t.child;
			case 11: return Fc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Wc(e, t), Pc(e, t, r, n), t.child;
			case 8: return Pc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Pc(e, t, t.pendingProps.children, n), t.child;
			case 10: return cl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Ta(t), a = Ea(a), r = r(a), t.flags |= 1, Pc(e, t, r, n), t.child;
			case 14: return Ic(e, t, t.type, t.pendingProps, n);
			case 15: return Lc(e, t, t.type, t.pendingProps, n);
			case 19: return sl(e, t, n);
			case 31: return Uc(e, t, n);
			case 22: return Rc(e, t, n, t.pendingProps);
			case 24: return Ta(t), r = Ea(Ma), e === null ? (a = qa(), a === null && (a = q, o = Na(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, go(t), ya(t, Ma, a)) : ((e.lanes & n) !== 0 && (_o(e, t), Co(t, null, null, n), So()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ya(t, Ma, r), r !== a.cache && Sa(t, [Ma], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ya(t, Ma, r))), Pc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : z && na(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Wc(e, t), Pc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function pl(e) {
		e.flags |= 4;
	}
	function ml(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Ud()) e.flags |= 8192;
				else throw ro = $a, Za;
			}
		} else e.flags &= -16777217;
	}
	function hl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Ud()) e.flags |= 8192;
			else throw ro = $a, Za;
		}
	}
	function gl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : gt(), e.lanes |= t, ud |= t);
	}
	function _l(e, t) {
		if (!z) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function W(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function vl(e, t, n) {
		var r = t.pendingProps;
		switch (ra(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return W(t), null;
			case 1: return W(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ba(Ma), je(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (fa(t) ? pl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ma())), W(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (pl(t), o === null ? (W(t), ml(t, a, null, r, n)) : (W(t), hl(t, o))) : o ? o === e.memoizedState ? (W(t), t.flags &= -16777217) : (pl(t), W(t), hl(t, o)) : (e = e.memoizedProps, e !== r && pl(t), W(t), ml(t, a, e, r, n)), null;
			case 27:
				if (Ne(t), n = Oe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && pl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), t.subtreeFlags &= -33554433, null;
					}
					e = Ee.current, fa(t) ? ua(t, e) : (e = hm(a, r, n), t.stateNode = e, pl(t));
				}
				return W(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Ne(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && pl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = Ee.current, fa(t)) ua(t, o);
					else {
						var s = lp(Oe.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[N] = t, o[Ot] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && pl(t);
					}
				}
				return W(t), t.subtreeFlags &= -33554433, ml(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && pl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Oe.current, fa(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = aa, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[N] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || ep(e.nodeValue, n)), e || la(t, !0);
					} else e = lp(e).createTextNode(r), e[N] = t, t.stateNode = e;
				}
				return W(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = fa(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[N] = t;
						} else pa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), e = !1;
					} else n = ma(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Io(t), t) : (Io(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return W(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = fa(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[N] = t;
						} else pa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), a = !1;
					} else a = ma(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Io(t), t) : (Io(t), null);
				}
				return Io(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), gl(t, t.updateQueue), W(t), null);
			case 4: return je(), e === null && Wf(t.stateNode.containerInfo), t.flags |= 67108864, W(t), null;
			case 10: return ba(t.type), W(t), null;
			case 19:
				if (zo(t), r = t.memoizedState, r === null) return W(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) _l(r, !1);
					else {
						if (ad !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Bo(e), o !== null) {
								for (t.flags |= 128, _l(r, !1), e = o.updateQueue, t.updateQueue = e, gl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Li(n, e), n = n.sibling;
								return Ro(t, Lo.current & 1 | 2), z && ea(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ke() > gd && (t.flags |= 128, a = !0, _l(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Bo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, gl(t, e), _l(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !z) return W(t), null;
						} else 2 * Ke() - r.renderingStartTime > gd && n !== 536870912 && (t.flags |= 128, a = !0, _l(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ke(), e.sibling = null, o = Lo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || z ? Ro(t, o) : (n = o, M(V, t), M(Lo, n), jo === null && (jo = t)), z && ea(t, r.treeForkCount), e;
				}
				return W(t), null;
			case 22:
			case 23: return Io(t), Ao(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), n = t.updateQueue, n !== null && gl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && Te(Ka), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ba(Ma), W(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, W(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function yl(e, t) {
		switch (ra(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ba(Ma), je(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Ne(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Io(t), t.alternate === null) throw Error(i(340));
					pa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Io(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					pa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return zo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return je(), null;
			case 10: return ba(t.type), null;
			case 22:
			case 23: return Io(t), Ao(), e !== null && Te(Ka), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ba(Ma), null;
			case 25: return null;
			default: return null;
		}
	}
	function bl(e, t) {
		switch (ra(t), t.tag) {
			case 3:
				ba(Ma), je();
				break;
			case 26:
			case 27:
			case 5:
				Ne(t);
				break;
			case 4:
				je();
				break;
			case 31:
				t.memoizedState !== null && Io(t);
				break;
			case 13:
				Io(t);
				break;
			case 19:
				zo(t);
				break;
			case 10:
				ba(t.type);
				break;
			case 22:
			case 23:
				Io(t), Ao(), e !== null && Te(Ka);
				break;
			case 24: ba(Ma);
		}
	}
	function xl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Sl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Cl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				To(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function wl(e, t, n) {
		n.props = Sc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Tl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = yi(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							m(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function El(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Dl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Ol(e) {
		for (var t = e.return; t !== null && (jl(t) && em(e.stateNode, t.stateNode), !Al(t));) t = t.return;
	}
	function kl(e) {
		for (var t = e.return; t !== null && (jl(t) && tm(e.stateNode, t.stateNode), !Al(t));) t = t.return;
	}
	function Al(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function jl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Ml(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Nl(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[Ot] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Pl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Fl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Pl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Il(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = bn)), Dl(e, r), L = !0;
		else if (i !== 4 && (i === 27 && (Dl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Il(e, t, n, r), e = e.sibling; e !== null;) Il(e, t, n, r), e = e.sibling;
	}
	function Ll(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Dl(e, r), L = !0;
		else if (i !== 4 && (i === 27 && (Dl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Ll(e, t, n, r), e = e.sibling; e !== null;) Ll(e, t, n, r), e = e.sibling;
	}
	function Rl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[N] = e, t[Ot] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var zl = !1, Bl = null;
	function Vl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (zl = !0);
	}
	var Hl = null;
	function Ul() {
		var e = Hl;
		return Hl = null, e;
	}
	var Wl = 0;
	function Gl(e, t, n, r, i) {
		return Wl = 0, Kl(e.child, t, n, r, i);
	}
	function Kl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				zl = !0, Tp(o, Wl === 0 ? t : t + "_" + Wl, n), Wl++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Kl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function ql(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || ql(e.child, t), e = e.sibling;
	}
	function Jl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Jl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = xi(t.default, t.share), t !== "none" && (Gl(e, n, t, null, !1) || ql(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Yl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = yi(r, n), a = xi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Jl(e) : Gl(e, i, a, null, !1) ? (Jl(e), n.paired || t || Nd(e, r.onEnter)) : ql(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Yl(e, t), e = e.sibling;
		else Jl(e);
	}
	function Xl(e) {
		if (Bl !== null && Bl.size !== 0) {
			var t = Bl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = xi(n.default, n.share);
								if (a !== "none" && (Gl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Nd(e, n.onShare)) : ql(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Xl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Zl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = yi(t, e.stateNode), r = Bl === null ? void 0 : Bl.get(n), i = xi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Gl(e, n, i, null, !1) ? r === void 0 ? Nd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Bl.delete(n), Nd(e, t.onShare)) : ql(e.child, !1)), Bl !== null && Xl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Zl(e), e = e.sibling;
		else Bl !== null && Xl(e);
	}
	function Ql(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = yi(t, e.stateNode);
				t = xi(t.default, t.update), e.flags &= -5, t !== "none" && Gl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Ql(e);
			e = e.sibling;
		}
	}
	function $l(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, ql(e.child, !1));
				}
				$l(e);
			}
			e = e.sibling;
		}
	}
	function eu(e) {
		if (e.tag === 30) e.stateNode.paired = null, ql(e.child, !1), $l(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) eu(e), e = e.sibling;
		else $l(e);
	}
	function tu(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? ql(e.child, !1) : e.subtreeFlags & 33554432 && tu(e), e = e.sibling;
	}
	function nu(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Wl < a.length) {
					var l = a[Wl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Wl === 0 ? n : n + "_" + Wl, i), s && e.flags & 4 || (Hl === null && (Hl = []), Hl.push(c, Wl === 0 ? r : r + "_" + Wl, t.memoizedProps)), Wl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : nu(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function ru(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = yi(n, r), a = xi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Wl = 0, i = nu(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Nd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && ru(e, t);
			e = e.sibling;
		}
	}
	var iu = !1, G = !1, au = !1, ou = !1, su = typeof WeakSet == "function" ? WeakSet : Set, cu = null, lu = !1, uu = !1, du = !1, fu = !1;
	function pu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Yr(e), Xr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, cu = t, t = n ? 9270 : 1024; cu !== null;) {
			if (e = cu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Zl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Vl(e), mu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Zl(r), mu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Vl(e), mu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, cu = r) : (n && Ql(e), mu(n));
			}
		}
		Bl = null;
	}
	function mu(e) {
		for (; cu !== null;) {
			var t = cu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Sc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Z(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = yi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = xi(a.default, a.update), a !== "none" && Gl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, cu = r;
				break;
			}
			cu = t.return;
		}
	}
	function hu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Fu(e, n), r & 4 && xl(5, n);
				break;
			case 1:
				if (Fu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Sc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Cl(n), r & 512 && Tl(n, n.return);
				break;
			case 3:
				if (Fu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						To(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Rl(n);
			case 26:
			case 5:
				Fu(e, n), t === null && r & 4 && Ml(n), r & 512 && Tl(n, n.return);
				break;
			case 12:
				Fu(e, n);
				break;
			case 31:
				Fu(e, n), r & 4 && wu(e, n);
				break;
			case 13:
				Fu(e, n), r & 4 && Tu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _f.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || iu, !r) {
					var a = t !== null && t.memoizedState !== null || G;
					t = iu, i = G, iu = r, (G = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Lu(e, n, r)) : Fu(e, n), iu = t, G = i;
				}
				break;
			case 30:
				Fu(e, n), r & 512 && Tl(n, n.return);
				break;
			case 7: r & 512 && Tl(n, n.return);
			default: Fu(e, n);
		}
	}
	function gu(e, t) {
		for (e = e.child; e !== null;) _u(e, t), e = e.sibling;
	}
	function _u(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					Z(e, e.return, t);
				}
				vu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, L = !0;
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && gu(e, t);
				break;
			default: gu(e, t);
		}
	}
	function vu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						_u(n, r);
						break a;
					case 22:
						n.memoizedState === null && vu(n, r);
						break a;
					default: vu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function yu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, yu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && It(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var bu = null, xu = !1;
	function Su(e, t, n) {
		for (n = n.child; n !== null;) Cu(e, t, n), n = n.sibling;
	}
	function Cu(e, t, n) {
		if (nt && typeof nt.onCommitFiberUnmount == "function") try {
			nt.onCommitFiberUnmount(tt, n);
		} catch {}
		switch (n.tag) {
			case 26:
				G || El(n, t), Su(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !G && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				G || El(n, t), kl(n);
				var r = bu, i = xu;
				Sp(n.type) && (bu = n.stateNode, xu = !1), Su(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), bu = r, xu = i;
				break;
			case 5: G || El(n, t), kl(n);
			case 6:
				if (n.tag === 6 && kl(n), r = bu, i = xu, bu = null, Su(e, t, n), bu = r, xu = i, bu !== null) {
					if (xu) try {
						(bu.nodeType === 9 ? bu.body : bu.nodeName === "HTML" ? bu.ownerDocument.body : bu).removeChild(n.stateNode), L = !0;
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						bu.removeChild(n.stateNode), L = !0;
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				bu !== null && (xu ? (e = bu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(bu, n.stateNode));
				break;
			case 4:
				r = bu, i = xu, bu = n.stateNode.containerInfo, xu = !0, Su(e, t, n), bu = r, xu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Sl(2, n, t), G || Sl(4, n, t), Su(e, t, n);
				break;
			case 1:
				G || (El(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && wl(n, t, r)), Su(e, t, n);
				break;
			case 21:
				Su(e, t, n);
				break;
			case 22:
				G = (r = G) || n.memoizedState !== null, Su(e, t, n), G = r;
				break;
			case 30:
				El(n, t), Su(e, t, n);
				break;
			case 7:
				G || El(n, t), Su(e, t, n);
				break;
			default: Su(e, t, n);
		}
	}
	function wu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function Tu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Eu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new su()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new su()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Du(e, t) {
		var n = Eu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = vf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Ou(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							bu = l.stateNode, xu = !1;
							break a;
						}
						break;
					case 5:
						bu = l.stateNode, xu = !1;
						break a;
					case 3:
					case 4:
						bu = l.stateNode.containerInfo, xu = !0;
						break a;
				}
				l = l.return;
			}
			if (bu === null) throw Error(i(160));
			Cu(s, c, o), bu = null, xu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Au(t, e, n), t = t.sibling;
	}
	var ku = null;
	function Au(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Ou(t, e, n), ju(e), a & 4 && (Sl(3, e, e.return), xl(3, e), Sl(5, e, e.return));
				break;
			case 1:
				Ou(t, e, n), ju(e), a & 512 && (G || r === null || El(r, r.return)), a & 64 && iu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = ku, Ou(t, e, n), ju(e), a & 512 && (G || r === null || El(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (iu) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Pt] || r[N] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[N] = e, P(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[N] = e, P(r), t = r;
									}
									e.stateNode = t;
								}
							} else iu || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Nl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || G || t.parentNode.removeChild(t)) : a.count--, n === null ? iu || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Ou(t, e, n), ju(e), a & 512 && (G || r === null || El(r, r.return)), r !== null && a & 4 && Nl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = au, au = !1, Ou(t, e, n), au = o, ju(e), a & 512 && (G || r === null || El(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						fn(t, ""), L = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Nl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (ou = !0);
				break;
			case 6:
				if (Ou(t, e, n), ju(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, L = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (L = !1, Wm = null, o = ku, ku = bm(t.containerInfo), Ou(t, e, n), ku = o, ju(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				ou && (ou = !1, Mu(e)), L = !1;
				break;
			case 4:
				a = au, au = iu, r = Jt(), o = ku, ku = bm(e.stateNode.containerInfo), Ou(t, e, n), ju(e), ku = o, L && uu && (du = !0), L = r, au = a;
				break;
			case 12:
				Ou(t, e, n), ju(e);
				break;
			case 31:
				Ou(t, e, n), ju(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 13:
				Ou(t, e, n), ju(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (md = Ke()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = iu, l = G, u = au;
				iu = c || o, au = u || o, G = l || s, Ou(t, e, n), G = l, au = u, iu = c, ju(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || iu || G || (t = s || G, n = iu, r = G, iu = o || iu, G = t, Iu(e, 2), iu = n, G = r), !o && au || gu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Du(e, n))));
				break;
			case 19:
				Ou(t, e, n), ju(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Du(e, t)));
				break;
			case 30:
				a & 512 && (G || r === null || El(r, r.return)), a = Jt(), o = uu, s = (n & 335544064) === n, c = e.memoizedProps, uu = s && xi(c.default, c.update) !== "none", Ou(t, e, n), ju(e), s && r !== null && L && (e.flags |= 4), uu = o, L = a;
				break;
			case 21: break;
			case 7: a & 512 && (G || r === null || El(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Ou(t, e, n), ju(e);
		}
	}
	function ju(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Pl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (jl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Al(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Ll(e, Fl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (fn(l, ""), n.flags &= -33), Ll(e, Fl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Il(e, Fl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Mu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Mu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Nu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Pu(t, e), t = t.sibling;
		else ru(t, !1);
	}
	function Pu(e, t) {
		var n = e.alternate;
		if (n === null) Yl(e, !1);
		else switch (e.tag) {
			case 3:
				if (fu = lu = !1, Ul(), Nu(t, e), !lu && !du) {
					if (e = Hl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), fu = !0;
				}
				Hl = null;
				break;
			case 5:
				Nu(t, e);
				break;
			case 4:
				r = lu, lu = !1, Nu(t, e), lu && (du = !0), lu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Nu(t, e) : Yl(e, !1));
				break;
			case 30:
				r = lu, i = Ul(), lu = !1, Nu(t, e), lu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = yi(a, o), o = yi(n.memoizedProps, o);
				var s = xi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Wl = 0, t = nu(e, n, t, o, s, a, !0), Wl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Nd(e, e.memoizedProps.onUpdate), Hl = i) : i !== null && (i.push.apply(i, Hl), Hl = i), lu = e.flags & 32 ? !0 : r;
				break;
			default: Nu(t, e);
		}
	}
	function Fu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) hu(e, t.alternate, t), t = t.sibling;
	}
	function Iu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Sl(4, n, n.return), Iu(n, r);
					break;
				case 1:
					El(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && wl(n, n.return, i), Iu(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					El(n, n.return), n.tag !== 5 && n.tag !== 27 || kl(n), Iu(n, r);
					break;
				case 6:
					kl(n);
					break;
				case 26:
					El(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || G || i.parentNode.removeChild(i), Iu(n, r);
					break;
				case 22:
					n.memoizedState === null && Iu(n, r);
					break;
				case 30:
					El(n, n.return), Iu(n, r);
					break;
				case 7: El(n, n.return);
				default: Iu(n, r);
			}
			e = e.sibling;
		}
	}
	function Lu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Lu(i, a, n), xl(4, a);
					break;
				case 1:
					if (Lu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) wo(l[i], c);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					s && o & 64 && Cl(a), Tl(a, a.return);
					break;
				case 27: n & 2 && Rl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Ol(a), Lu(i, a, n), s && r === null && o & 4 && Ml(a), Tl(a, a.return);
					break;
				case 6:
					Ol(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || iu || Km(bm(c.ownerDocument), a.type, c), Lu(i, a, n), s && r === null && o & 4 && Ml(a), Tl(a, a.return);
					break;
				case 12:
					Lu(i, a, n);
					break;
				case 31:
					Lu(i, a, n), s && o & 4 && wu(i, a);
					break;
				case 13:
					Lu(i, a, n), s && o & 4 && Tu(i, a);
					break;
				case 22:
					a.memoizedState === null && Lu(i, a, n), Tl(a, a.return);
					break;
				case 30:
					Lu(i, a, n), Tl(a, a.return);
					break;
				case 7: Tl(a, a.return);
				default: Lu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Ru(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Pa(n));
	}
	function zu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Pa(e));
	}
	function Bu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Vu(e, t, n, r), t = t.sibling;
		else i && tu(t);
	}
	function Vu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && eu(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Bu(e, t, n, r), a & 2048 && xl(9, t);
				break;
			case 1:
				Bu(e, t, n, r);
				break;
			case 3:
				Bu(e, t, n, r), i && fu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Pa(a)));
				break;
			case 12:
				if (a & 2048) {
					Bu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Bu(e, t, n, r);
				break;
			case 31:
				Bu(e, t, n, r);
				break;
			case 13:
				Bu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && eu(t), o._visibility & 2 ? Bu(e, t, n, r) : (o._visibility |= 2, Hu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && eu(s), o._visibility & 2 ? Bu(e, t, n, r) : Uu(e, t)), a & 2048 && Ru(s, t);
				break;
			case 24:
				Bu(e, t, n, r), a & 2048 && zu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (ql(a.child, !0), ql(t.child, !0))), Bu(e, t, n, r);
				break;
			default: Bu(e, t, n, r);
		}
	}
	function Hu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Hu(a, o, s, c, i), xl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Hu(a, o, s, c, i)) : u._visibility & 2 ? Hu(a, o, s, c, i) : Uu(a, o), i && l & 2048 && Ru(o.alternate, o);
					break;
				case 24:
					Hu(a, o, s, c, i), i && l & 2048 && zu(o.alternate, o);
					break;
				default: Hu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Uu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Uu(n, r), i & 2048 && Ru(r.alternate, r);
					break;
				case 24:
					Uu(n, r), i & 2048 && zu(r.alternate, r);
					break;
				default: Uu(n, r);
			}
			t = t.sibling;
		}
	}
	var Wu = 8192;
	function Gu(e, t, n) {
		if (e.subtreeFlags & Wu) for (e = e.child; e !== null;) Ku(e, t, n), e = e.sibling;
	}
	function Ku(e, t, n) {
		switch (e.tag) {
			case 26:
				Gu(e, t, n), e.flags & Wu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, ku, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Gu(e, t, n), e.flags & Wu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = ku;
				ku = bm(e.stateNode.containerInfo), Gu(e, t, n), ku = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Wu, Wu = 16777216, Gu(e, t, n), Wu = r) : Gu(e, t, n));
				break;
			case 30:
				if ((e.flags & Wu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Bl === null && (Bl = /* @__PURE__ */ new Map()), Bl.set(r, i);
				}
				Gu(e, t, n);
				break;
			default: Gu(e, t, n);
		}
	}
	function qu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ju(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				cu = r, Zu(r, e);
			}
			qu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Yu(e), e = e.sibling;
	}
	function Yu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ju(e), e.flags & 2048 && Sl(9, e, e.return);
				break;
			case 3:
				Ju(e);
				break;
			case 12:
				Ju(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Xu(e)) : Ju(e);
				break;
			default: Ju(e);
		}
	}
	function Xu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				cu = r, Zu(r, e);
			}
			qu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Sl(8, t, t.return), Xu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Xu(t));
					break;
				default: Xu(t);
			}
			e = e.sibling;
		}
	}
	function Zu(e, t) {
		for (; cu !== null;) {
			var n = cu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Sl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Pa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, cu = r;
			else a: for (n = e; cu !== null;) {
				r = cu;
				var i = r.sibling, a = r.return;
				if (yu(r), r === n) {
					cu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, cu = i;
					break a;
				}
				cu = a;
			}
		}
	}
	var Qu = {
		getCacheForType: function(e) {
			var t = Ea(Ma), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ea(Ma).controller.signal;
		}
	}, $u = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, ed = null, td = !1, nd = !1, rd = !1, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = null, fd = null, pd = !1, md = 0, hd = 0, gd = Infinity, _d = null, vd = null, yd = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
	function jd() {
		return K & 2 && Y !== 0 ? Y & -Y : A.T === null ? Tt() : Pf();
	}
	function Md() {
		if (ld === 0) {
			if (!(Y & 536870912) || z) {
				var e = lt;
				lt <<= 1, !(lt & 3932160) && (lt = 262144), ld = e;
			} else ld = 536870912;
		}
		return e = V.current, e !== null && (e.flags |= 32), ld;
	}
	function Nd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(yi(e.memoizedProps, n))), Dd === null && (Dd = []), Dd.push(t.bind(null, r));
		}
	}
	function Pd(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Vd(e, 0), Rd(e, Y, ld, !1)), vt(e, n), K & 2 && e === q || (e === q && (!(K & 2) && (sd |= n), ad === 4 && Rd(e, Y, ld, !1)), Ef(e));
	}
	function Fd(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || pt(e, t), a = r ? Yd(e, t) : qd(e, t, !0), o = r;
		do {
			if (a === 0) {
				nd && !r && Rd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Ld(n)) a = qd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = dd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Vd(c, s).flags |= 256), s = qd(c, s, !1), s !== 2 && s !== 6) {
								if (rd && !l) {
									c.errorRecoveryDisabledLanes |= o, sd |= o, a = 4;
									break a;
								}
								o = fd, fd = a, o !== null && (fd === null ? fd = o : fd.push.apply(fd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Vd(e, 0), Rd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Rd(r, t, ld, !td);
							break a;
						case 2:
							fd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = md + 300 - Ke(), 10 < a)) {
						if (Rd(r, t, ld, !td), ft(r, 0, !0) !== 0) break a;
						Sd = t, r.timeoutHandle = gp(Id.bind(null, r, n, fd, _d, pd, t, ld, sd, ud, td, o, "Throttled", -0, 0), a);
						break a;
					}
					Id(r, n, fd, _d, pd, t, ld, sd, ud, td, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Ef(e);
	}
	function Id(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: bn
		}, Bl = null, Ku(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? md - Ke() : (a & 4194048) === a ? hd - Ke() : 0, m = eh(d, m), m !== null) ? (Sd = a, e.cancelPendingCommit = m(nf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Rd(e, a, o, !l)) : nf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Ld(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Ur(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rd(e, t, n, r) {
		t = mt(e, t), t &= ~cd, t &= ~sd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - it(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && bt(e, n, t);
	}
	function zd() {
		return K & 6 ? !0 : (Df(0, !1), !1);
	}
	function Bd() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, va = _a = null, is(e), oo = null, so = 0, e = J;
			for (; e !== null;) bl(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Vd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sd = 0, Bd(), q = e, J = n = Ii(e.current, null), Y = t, X = 0, ed = null, td = !1, nd = pt(e, t), rd = !1, ud = ld = cd = sd = od = ad = 0, fd = dd = null, pd = !1, id = mt(e, t), Ei(), n;
	}
	function Hd(e, t) {
		H = null, A.H = mc, t === Xa || t === Qa ? (t = io(), X = 3) : t === Za ? (t = io(), X = 4) : X = t === Mc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, ed = t, J === null && (ad = 1, Ec(e, Wi(t, e.current)));
	}
	function Ud() {
		var e = V.current;
		return e === null ? !0 : (Y & 4194048) === Y ? jo === null : (Y & 62914560) === Y || Y & 536870912 ? e === jo : !1;
	}
	function Wd() {
		var e = A.H;
		return A.H = mc, e === null ? mc : e;
	}
	function Gd() {
		var e = A.A;
		return A.A = Qu, e;
	}
	function Kd() {
		ad = 4, td || (Y & 4194048) !== Y && V.current !== null || (nd = !0), !(od & 134217727) && !(sd & 134217727) || q === null || Rd(q, Y, ld, !1);
	}
	function qd(e, t, n) {
		var r = K;
		K |= 2;
		var i = Wd(), a = Gd();
		(q !== e || Y !== t) && (_d = null, Vd(e, t)), t = !1;
		var o = ad;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = ed;
					switch (X) {
						case 8:
							Bd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							V.current === null && (t = !0);
							var l = X;
							if (X = 0, ed = null, $d(e, s, c, l), n && nd) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, ed = null, $d(e, s, c, l);
					}
				}
				Jd(), o = ad;
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, va = _a = null, K = r, A.H = i, A.A = a, J === null && (q = null, Y = 0, Ei()), o;
	}
	function Jd() {
		for (; J !== null;) Zd(J);
	}
	function Yd(e, t) {
		var n = K;
		K |= 2;
		var r = Wd(), a = Gd();
		q !== e || Y !== t ? (_d = null, gd = Ke() + 500, Vd(e, t)) : nd = pt(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = ed;
					b: switch (X) {
						case 1:
							X = 0, ed = null, $d(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (eo(o)) {
								X = 0, ed = null, Qd(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), Ef(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							eo(o) ? (X = 0, ed = null, Qd(t)) : (X = 0, ed = null, $d(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Ym(s) : c.stateNode.complete) {
										X = 0, ed = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, ef(u));
										}
										break b;
									}
							}
							X = 0, ed = null, $d(e, t, o, 5);
							break;
						case 6:
							X = 0, ed = null, $d(e, t, o, 6);
							break;
						case 8:
							Bd(), ad = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Xd();
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return va = _a = null, A.H = r, A.A = a, K = n, J === null ? (q = null, Y = 0, Ei(), ad) : 0;
	}
	function Xd() {
		for (; J !== null && !We();) Zd(J);
	}
	function Zd(e) {
		var t = fl(e.alternate, e, id);
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : J = t;
	}
	function Qd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Kc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = Kc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5:
				is(t);
				var r = t;
				r === aa && (z ? (da(r), r.tag === 5 && r.stateNode != null && (R = r.stateNode)) : (da(r), z = !0));
			default: bl(n, t), t = J = Li(t, id), t = fl(n, t, id);
		}
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : J = t;
	}
	function $d(e, t, n, r) {
		va = _a = null, is(t), oo = null, so = 0;
		var i = t.return;
		try {
			if (jc(e, i, t, n, Y)) {
				ad = 1, Ec(e, Wi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			ad = 1, Ec(e, Wi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (z || r === 1 ? e = !0 : nd || Y & 536870912 ? e = !1 : (td = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = V.current, r !== null && r.tag === 13 && (r.flags |= 16384))), tf(t, e)) : ef(t);
	}
	function ef(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				tf(t, td);
				return;
			}
			e = t.return;
			var n = vl(t.alternate, t, id);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		ad === 0 && (ad = 5);
	}
	function tf(e, t) {
		do {
			var n = yl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		ad = 6, J = null;
	}
	function nf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			df();
		while (yd !== 0);
		if (K & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === q && (J = q = null, Y = 0), xd = t, bd = e, Sd = n, wd = a, Td = r, rf(e, t, n, s, c, l, f);
		}
	}
	function rf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Cd = s, s |= Ti, yt(e, n, s, r, i, a), Dd = null, (n & 335544064) === n ? (Od = La(e), r = 10262) : (Od = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yf(Xe, function() {
			return ff(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), zl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = A.T, A.T = null, i = j.p, j.p = 2, a = K, K |= 4;
			try {
				pu(e, t, n);
			} finally {
				K = a, j.p = i, A.T = r;
			}
		}
		yd = 1, zl ? Ed = Mp(o, e.containerInfo, Od, sf, cf, of, lf, ff, af, null, null) : (sf(), cf(), lf());
	}
	function af(e) {
		if (yd !== 0) {
			var t = bd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function of() {
		yd === 3 && (yd = 0, Pu(xd, bd), yd = 4);
	}
	function sf() {
		if (yd === 1) {
			yd = 0;
			var e = bd, t = xd, n = Sd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = A.T, A.T = null;
				var i = j.p;
				j.p = 2;
				var a = K;
				K |= 4;
				try {
					uu = du = !1, Au(t, e, n), n = cp;
					var o = Yr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Jr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Xr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = qr(s, h), v = qr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					K = a, j.p = i, A.T = r;
				}
			}
			e.current = t, yd = 2;
		}
	}
	function cf() {
		if (yd === 2) {
			yd = 0;
			var e = bd, t = xd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = K;
				K |= 4;
				try {
					hu(e, t.alternate, t);
				} finally {
					K = i, j.p = r, A.T = n;
				}
			}
			yd = 3;
		}
	}
	function lf() {
		if (yd === 4 || yd === 3) {
			yd = 0;
			var e = Ed;
			Ed = null, Ge();
			var t = bd, n = xd, r = Sd, i = Td, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? yd = 5 : (yd = 0, xd = bd = null, uf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (vd = null), wt(r), n = n.stateNode, nt && typeof nt.onCommitFiberRoot == "function") try {
				nt.onCommitFiberRoot(tt, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = A.T, a = j.p, j.p = 2, A.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					A.T = n, j.p = a;
				}
			}
			if (i = Dd, o = Od, Od = null, i !== null && (Dd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Sd & 3 && df(), Ef(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ad ? kd++ : (kd = 0, Ad = t) : (kd = 0, Ad = null), Df(0, !1);
		}
	}
	function uf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Pa(t)));
	}
	function df() {
		return Ed !== null && (Ed.skipTransition(), Ed = null), sf(), cf(), lf(), ff();
	}
	function ff() {
		if (yd !== 5) return !1;
		var e = bd, t = Cd;
		Cd = 0;
		var n = wt(Sd), r = A.T, a = j.p;
		try {
			j.p = 32 > n ? 32 : n, A.T = null, n = wd, wd = null;
			var o = bd, s = Sd;
			if (yd = 0, xd = bd = null, Sd = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Yu(o.current), Vu(o, o.current, s, n), K = c, Df(0, !1), nt && typeof nt.onPostCommitFiberRoot == "function") try {
				nt.onPostCommitFiberRoot(tt, o);
			} catch {}
			return !0;
		} finally {
			j.p = a, A.T = r, uf(e, t);
		}
	}
	function pf(e, t, n) {
		t = Wi(n, t), t = Oc(e.stateNode, t, 2), e = yo(e, t, 2), e !== null && (vt(e, 2), Ef(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) pf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				pf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vd === null || !vd.has(r))) {
					e = Wi(n, e), n = kc(2), r = yo(t, n, 2), r !== null && (Ac(n, r, t, e), vt(r, 2), Ef(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new $u();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (rd = !0, i.add(n), e = hf.bind(null, e, t, n), t.then(e, e));
	}
	function hf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (ad === 4 || ad === 3 && (Y & 62914560) === Y && 300 > Ke() - md ? K & 2 ? cd |= n : Vd(e, 0) : cd |= n, ud === Y && (ud = 0)), Ef(e);
	}
	function gf(e, t) {
		t === 0 && (t = gt()), e = ki(e, t), e !== null && (vt(e, t), Ef(e));
	}
	function _f(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), gf(e, n);
	}
	function vf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), gf(e, n);
	}
	function yf(e, t) {
		return He(e, t);
	}
	var bf = null, xf = null, Sf = !1, Cf = !1, wf = !1, Tf = 0;
	function Ef(e) {
		e !== xf && e.next === null && (xf === null ? bf = xf = e : xf = xf.next = e), Cf = !0, Sf || (Sf = !0, Nf());
	}
	function Df(e, t) {
		if (!wf && Cf) {
			wf = !0;
			do
				for (var n = !1, r = bf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - it(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Mf(r, a));
						} else a = Y, a = ft(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || pt(r, a) || (n = !0, Mf(r, a));
					}
					r = r.next;
				}
			while (n);
			wf = !1;
		}
	}
	function Of() {
		kf();
	}
	function kf() {
		Cf = Sf = !1;
		var e = 0;
		Tf !== 0 && hp() && (e = Tf);
		for (var t = Ke(), n = null, r = bf; r !== null;) {
			var i = r.next, a = Af(r, t);
			a === 0 ? (r.next = null, n === null ? bf = i : n.next = i, i === null && (xf = n)) : (n = r, (e !== 0 || a & 3) && (Cf = !0)), r = i;
		}
		yd !== 0 && yd !== 5 || Df(e, !1), Tf !== 0 && (Tf = 0);
	}
	function Af(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - it(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ht(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = ft(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ue(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || pt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ue(r), wt(n)) {
				case 2:
				case 8:
					n = Ye;
					break;
				case 32:
					n = Xe;
					break;
				case 268435456:
					n = Qe;
					break;
				default: n = Xe;
			}
			return r = jf.bind(null, e), n = He(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ue(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function jf(e, t) {
		if (yd !== 0 && yd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (df() && e.callbackNode !== n) return null;
		var r = Y;
		return r = ft(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Fd(e, r, t), Af(e, Ke()), e.callbackNode != null && e.callbackNode === n ? jf.bind(null, e) : null);
	}
	function Mf(e, t) {
		if (df()) return null;
		Fd(e, t, !0);
	}
	function Nf() {
		bp(function() {
			K & 6 ? He(Je, Of) : kf();
		});
	}
	function Pf() {
		if (Tf === 0) {
			var e = Ba;
			e === 0 && (e = ct, ct <<= 1, !(ct & 261888) && (ct = 256)), Tf = e;
		}
		return Tf;
	}
	function Ff(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : yn(e);
	}
	function If(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Ff((i[Ot] || null).action), o = r.submitter;
			o && (t = (t = o[Ot] || null) ? Ff(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Vn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Tf !== 0) {
								var e = new FormData(i, o);
								ec(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), ec(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Lf = 0; Lf < gi.length; Lf++) {
		var Rf = gi[Lf];
		_i(Rf.toLowerCase(), "on" + (Rf[0].toUpperCase() + Rf.slice(1)));
	}
	_i(ci, "onAnimationEnd"), _i(li, "onAnimationIteration"), _i(ui, "onAnimationStart"), _i("dblclick", "onDoubleClick"), _i("focusin", "onFocus"), _i("focusout", "onBlur"), _i(di, "onTransitionRun"), _i(fi, "onTransitionStart"), _i(pi, "onTransitionCancel"), _i(mi, "onTransitionEnd"), Wt("onMouseEnter", ["mouseout", "mouseover"]), Wt("onMouseLeave", ["mouseout", "mouseover"]), Wt("onPointerEnter", ["pointerout", "pointerover"]), Wt("onPointerLeave", ["pointerout", "pointerover"]), Ut("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ut("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ut("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ut("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ut("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ut("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var zf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zf));
	function Vf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Si(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Si(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[At];
		n === void 0 && (n = t[At] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Gf(t, e, 2, !1), n.add(r));
	}
	function Hf(e, t, n) {
		var r = 0;
		t && (r |= 4), Gf(n, e, r, t);
	}
	var Uf = "_reactListening" + Math.random().toString(36).slice(2);
	function Wf(e) {
		if (!e[Uf]) {
			e[Uf] = !0, F.forEach(function(t) {
				t !== "selectionchange" && (Bf.has(t) || Hf(t, !1, e), Hf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Uf] || (t[Uf] = !0, Hf("selectionchange", !1, t));
		}
	}
	function Gf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !An || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Kf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Lt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Dn(function() {
			var r = a, i = Sn(n), s = [];
			a: {
				var c = hi.get(e);
				if (c !== void 0) {
					var l = Vn, u = e;
					switch (e) {
						case "keypress": if (In(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = ar;
							break;
						case "focusin":
							u = "focus", l = Xn;
							break;
						case "focusout":
							u = "blur", l = Xn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Xn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Jn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Yn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = cr;
							break;
						case ci:
						case li:
						case ui:
							l = Zn;
							break;
						case mi:
							l = lr;
							break;
						case "scroll":
						case "scrollend":
							l = Un;
							break;
						case "wheel":
							l = ur;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Qn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = or;
							break;
						case "submit":
							l = sr;
							break;
						case "toggle":
						case "beforetoggle": l = dr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = On(m, p), g != null && d.push(qf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== xn && (u = n.relatedTarget || n.fromElement) && (Lt(u) || u[kt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Lt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Jn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = or, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : zt(c), h = l == null ? u : zt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Lt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? S(c, l, Yf) : null, c !== null && Xf(s, u, c, d, !1), l !== null && f !== null && Xf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? zt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = jr;
					else if (Tr(c)) {
						if (Mr) _ = Vr;
						else {
							_ = zr;
							var v = Rr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && gn(r.elementType) && (_ = jr) : _ = Br;
					if (_ &&= _(e, r)) {
						Er(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? zt(r) : window, e) {
					case "focusin":
						(Tr(v) || v.contentEditable === "true") && (Qr = v, $r = r, ei = null);
						break;
					case "focusout":
						ei = $r = Qr = null;
						break;
					case "mousedown":
						ti = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ti = !1, ni(s, n, i);
						break;
					case "selectionchange": if (Zr) break;
					case "keydown":
					case "keyup": ni(s, n, i);
				}
				var y;
				if (pr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else xr ? yr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (gr && n.locale !== "ko" && (xr || b !== "onCompositionStart" ? b === "onCompositionEnd" && xr && (y = Fn()) : (Mn = i, Nn = "value" in Mn ? Mn.value : Mn.textContent, xr = !0)), v = Jf(r, b), 0 < v.length && (b = new $n(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = br(n), y !== null && (b.data = y)))), (y = hr ? Sr(e, n) : Cr(e, n)) && (b = Jf(r, "onBeforeInput"), 0 < b.length && (v = new $n("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), If(s, e, r, n, i);
			}
			Vf(s, t);
		});
	}
	function qf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Jf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = On(e, n), i != null && r.unshift(qf(e, i, a)), i = On(e, t), i != null && r.push(qf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Yf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = On(n, a), l != null && o.unshift(qf(n, l, c))) : i || (l = On(n, a), l != null && o.push(qf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
	function $f(e) {
		return (typeof e == "string" ? e : "" + e).replace(Zf, "\n").replace(Qf, "");
	}
	function ep(e, t) {
		return t = $f(t), $f(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || fn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && fn(e, "" + r);
				else return;
				break;
			case "className":
				Xt(e, "class", r);
				break;
			case "tabIndex":
				Xt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Xt(e, n, r);
				break;
			case "style":
				hn(e, r, o);
				return;
			case "data": if (t !== "object") {
				Xt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = yn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = yn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = bn);
				return;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = yn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Yt(e, "popover", r);
				break;
			case "xlinkActuate":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Zt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Zt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Zt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Zt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Yt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = _n.get(n) || n, Yt(e, n, r);
			else return;
		}
		L = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				hn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") fn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") fn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = bn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Ht.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[Ot] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					L = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Yt(e, n, r);
				}
				return;
		}
		L = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				sn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && ln(e, !!r, n, !0) : ln(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				dn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < zf.length; r++) Q(zf[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (gn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (L = !0), o = m;
							break;
						case "name":
							m !== f && (L = !0), a = m;
							break;
						case "checked":
							m !== f && (L = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (L = !0), d = m;
							break;
						case "value":
							m !== f && (L = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (L = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				on(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (L = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (L = !0), c = o;
						break;
					case "multiple": o !== l && (L = !0), s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? ln(e, !!n, n ? [] : "", !1) : ln(e, !!n, t, !0)) : ln(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (L = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (L = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				un(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (L = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (gn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[N] = r, n[Ot] = t, np(n, e, t), P(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Pt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : C({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), m(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), m(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		m(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = b(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		m(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = lp(e).activeElement, e !== null && m(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), m(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), m(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return m(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		m(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = Lt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = S(n, a, x), t === null ? t = !1 : (m(t, !0, ne, a, n), a = ee, ee = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = S(r, a, x), t === null ? t = !1 : (m(t, !0, re, a, r), a = ee, te = ee = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		m(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), Zp(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), Zp(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = b(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), It(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Pt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && $(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === bn && (e.onclick = null), It(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		It(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = j.d;
	j.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = zd();
		return e || t;
	}
	function Cm(e) {
		var t = Rt(e);
		t !== null && t.tag === 5 && t.type === "form" ? nc(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = an(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), P(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + an(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + an(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + an(n.imageSizes) + "\"]")) : i += "[href=\"" + an(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = C({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[Ft] = !0, o.onload = o.onerror = function() {
					Vt(o);
				}), P(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + an(r) + "\"][href=\"" + an(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = C({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), P(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Bt(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = C({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					P(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = C({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), P(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = C({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), P(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Oe.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Bt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Bt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Bt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + an(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return C({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Ft]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Ft] = !0, t.onload = t.onerror = Vt.bind(null, t), np(t, "link", n), P(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + an(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + an(n.href) + "\"]");
				if (r) return t.instance = r, P(r), r;
				var a = C({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), P(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, P(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), P(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, P(a), a) : (r = n, (a = vm.get(o)) && (r = C({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), P(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Pt] || a[N] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, P(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), P(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: O,
		Provider: null,
		Consumer: null,
		_currentValue: xe,
		_currentValue2: xe,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = _t(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _t(0), this.hiddenUpdates = _t(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Pi(3, null, null, t), e.current = a, a.stateNode = e, t = Na(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, go(a), e;
	}
	function uh(e) {
		return e ? (e = Mi, e) : Mi;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = vo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = yo(e, r, t), n !== null && (Pd(n, e, t), B(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ki(e, 67108864);
			t !== null && Pd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = jd();
			t = Ct(t);
			var n = ki(e, t);
			n !== null && Pd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 2, yh(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 8, yh(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Kf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Rt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = dt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - it(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Ef(a), !(K & 6) && (gd = Ke() + 500, Df(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ki(a, 2), s !== null && Pd(s, a, 2), zd(), ph(a, 2);
					}
					if (a = bh(r), a === null && Kf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Kf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = Sn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Lt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (qe()) {
				case Je: return 2;
				case Ye: return 8;
				case Xe:
				case Ze: return 32;
				case Qe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Rt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = Lt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Et(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Et(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				xn = r, n.target.dispatchEvent(r), xn = null;
			} else return t = Rt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Rt(n);
				a !== null && (e.splice(t, 3), t -= 3, ec(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Ot] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ot] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, jd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), zd(), t[kt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Tt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	j.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: A,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			tt = Jh.inject(qh), nt = Jh;
		} catch {}
	}
	e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = Cc, c = wc, l = Tc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = lh(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Uh), t.context = uh(null), n = t.current, r = jd(), r = Ct(r), o = vo(r), o.callback = null, yo(n, o, r), n = r, t.current.lanes = n, vt(t, n), Ef(t), e[kt] = t.current, Wf(e), new Gh(t);
	};
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = g();
}));
// node_modules/.pnpm/comma-separated-tokens@2.0.3/node_modules/comma-separated-tokens/index.js
function v(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
// node_modules/.pnpm/estree-util-is-identifier-name@3.0.0/node_modules/estree-util-is-identifier-name/lib/index.js
var y = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, b = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ee = {};
function te(e, t) {
	return ((t || ee).jsx ? b : y).test(e);
}
// node_modules/.pnpm/hast-util-whitespace@3.0.0/node_modules/hast-util-whitespace/lib/index.js
var ne = /[ \t\n\f\r]/g;
function re(e) {
	return typeof e == "object" ? e.type === "text" && x(e.value) : x(e);
}
function x(e) {
	return e.replace(ne, "") === "";
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/schema.js
var S = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
S.prototype.normal = {}, S.prototype.property = {}, S.prototype.space = void 0;
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/merge.js
function C(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new S(n, r, t);
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/normalize.js
function w(e) {
	return e.toLowerCase();
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/info.js
var T = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
T.prototype.attribute = "", T.prototype.booleanish = !1, T.prototype.boolean = !1, T.prototype.commaOrSpaceSeparated = !1, T.prototype.commaSeparated = !1, T.prototype.defined = !1, T.prototype.mustUseProperty = !1, T.prototype.number = !1, T.prototype.overloadedBoolean = !1, T.prototype.property = "", T.prototype.spaceSeparated = !1, T.prototype.space = void 0;
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/types.js
var ie = /* @__PURE__ */ s({
	boolean: () => E,
	booleanish: () => D,
	commaOrSpaceSeparated: () => ce,
	commaSeparated: () => se,
	number: () => O,
	overloadedBoolean: () => oe,
	spaceSeparated: () => k
}), ae = 0, E = le(), D = le(), oe = le(), O = le(), k = le(), se = le(), ce = le();
function le() {
	return 2 ** ++ae;
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/defined-info.js
var ue = Object.keys(ie), de = class extends T {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), fe(this, "space", r), typeof n == "number") for (; ++i < ue.length;) {
			let e = ue[i];
			fe(this, ue[i], (n & ie[e]) === ie[e]);
		}
	}
};
de.prototype.defined = !0;
function fe(e, t, n) {
	n && (e[t] = n);
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/create.js
function pe(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new de(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[w(r)] = r, n[w(a.attribute)] = r;
	}
	return new S(t, n, e.space);
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/aria.js
var me = pe({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: D,
		ariaAutoComplete: null,
		ariaBusy: D,
		ariaChecked: D,
		ariaColCount: O,
		ariaColIndex: O,
		ariaColSpan: O,
		ariaControls: k,
		ariaCurrent: null,
		ariaDescribedBy: k,
		ariaDetails: null,
		ariaDisabled: D,
		ariaDropEffect: k,
		ariaErrorMessage: null,
		ariaExpanded: D,
		ariaFlowTo: k,
		ariaGrabbed: D,
		ariaHasPopup: null,
		ariaHidden: D,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: k,
		ariaLevel: O,
		ariaLive: null,
		ariaModal: D,
		ariaMultiLine: D,
		ariaMultiSelectable: D,
		ariaOrientation: null,
		ariaOwns: k,
		ariaPlaceholder: null,
		ariaPosInSet: O,
		ariaPressed: D,
		ariaReadOnly: D,
		ariaRelevant: null,
		ariaRequired: D,
		ariaRoleDescription: k,
		ariaRowCount: O,
		ariaRowIndex: O,
		ariaRowSpan: O,
		ariaSelected: D,
		ariaSetSize: O,
		ariaSort: null,
		ariaValueMax: O,
		ariaValueMin: O,
		ariaValueNow: O,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-sensitive-transform.js
function he(e, t) {
	return t in e ? e[t] : t;
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-insensitive-transform.js
function ge(e, t) {
	return he(e, t.toLowerCase());
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/html.js
var _e = pe({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: se,
		acceptCharset: k,
		accessKey: k,
		action: null,
		allow: null,
		allowFullScreen: E,
		allowPaymentRequest: E,
		allowUserMedia: E,
		alpha: E,
		alt: null,
		as: null,
		async: E,
		autoCapitalize: null,
		autoComplete: k,
		autoFocus: E,
		autoPlay: E,
		blocking: k,
		capture: null,
		charSet: null,
		checked: E,
		cite: null,
		className: k,
		closedBy: null,
		colorSpace: null,
		cols: O,
		colSpan: O,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: D,
		controls: E,
		controlsList: k,
		coords: O | se,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: E,
		defer: E,
		dir: null,
		dirName: null,
		disabled: E,
		download: oe,
		draggable: D,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: E,
		formTarget: null,
		headers: k,
		height: O,
		hidden: oe,
		high: O,
		href: null,
		hrefLang: null,
		htmlFor: k,
		httpEquiv: k,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: E,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: E,
		itemId: null,
		itemProp: k,
		itemRef: k,
		itemScope: E,
		itemType: k,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: E,
		low: O,
		manifest: null,
		max: null,
		maxLength: O,
		media: null,
		method: null,
		min: null,
		minLength: O,
		multiple: E,
		muted: E,
		name: null,
		nonce: null,
		noModule: E,
		noValidate: E,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: E,
		optimum: O,
		pattern: null,
		ping: k,
		placeholder: null,
		playsInline: E,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: E,
		referrerPolicy: null,
		rel: k,
		required: E,
		reversed: E,
		rows: O,
		rowSpan: O,
		sandbox: k,
		scope: null,
		scoped: E,
		seamless: E,
		selected: E,
		shadowRootClonable: E,
		shadowRootCustomElementRegistry: E,
		shadowRootDelegatesFocus: E,
		shadowRootMode: null,
		shadowRootSerializable: E,
		shape: null,
		size: O,
		sizes: null,
		slot: null,
		span: O,
		spellCheck: D,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: O,
		step: null,
		style: null,
		tabIndex: O,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: E,
		useMap: null,
		value: D,
		width: O,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: k,
		axis: null,
		background: null,
		bgColor: null,
		border: O,
		borderColor: null,
		bottomMargin: O,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: E,
		declare: E,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: O,
		leftMargin: O,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: O,
		marginWidth: O,
		noResize: E,
		noHref: E,
		noShade: E,
		noWrap: E,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: O,
		rules: null,
		scheme: null,
		scrolling: D,
		standby: null,
		summary: null,
		text: null,
		topMargin: O,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: O,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: E,
		disablePictureInPicture: E,
		disableRemotePlayback: E,
		exportParts: se,
		part: k,
		prefix: null,
		property: null,
		results: O,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: ge
}), ve = pe({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: ce,
		accentHeight: O,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: O,
		amplitude: O,
		arabicForm: null,
		ascent: O,
		attributeName: null,
		attributeType: null,
		azimuth: O,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: O,
		by: null,
		calcMode: null,
		capHeight: O,
		className: k,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: O,
		diffuseConstant: O,
		direction: null,
		display: null,
		dur: null,
		divisor: O,
		dominantBaseline: null,
		download: E,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: O,
		enableBackground: null,
		end: null,
		event: null,
		exponent: O,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: O,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: se,
		g2: se,
		glyphName: se,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: O,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: O,
		horizOriginX: O,
		horizOriginY: O,
		id: null,
		ideographic: O,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: O,
		k: O,
		k1: O,
		k2: O,
		k3: O,
		k4: O,
		kernelMatrix: ce,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: O,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: O,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: O,
		overlineThickness: O,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: O,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: k,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: O,
		pointsAtY: O,
		pointsAtZ: O,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: ce,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: ce,
		rev: ce,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: ce,
		requiredFeatures: ce,
		requiredFonts: ce,
		requiredFormats: ce,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: O,
		specularExponent: O,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: O,
		strikethroughThickness: O,
		string: null,
		stroke: null,
		strokeDashArray: ce,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: O,
		strokeOpacity: O,
		strokeWidth: null,
		style: null,
		surfaceScale: O,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: ce,
		tabIndex: O,
		tableValues: null,
		target: null,
		targetX: O,
		targetY: O,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: ce,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: O,
		underlineThickness: O,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: O,
		values: null,
		vAlphabetic: O,
		vMathematical: O,
		vectorEffect: null,
		vHanging: O,
		vIdeographic: O,
		version: null,
		vertAdvY: O,
		vertOriginX: O,
		vertOriginY: O,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: O,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: he
}), ye = pe({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), be = pe({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: ge
}), A = pe({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), j = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, xe = /[A-Z]/g, Se = /-[a-z]/g, Ce = /^data[-\w.:]+$/i;
function we(e, t) {
	let n = w(t), r = t, i = T;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && Ce.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(Se, M);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!Se.test(e)) {
				let n = e.replace(xe, Te);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = de;
	}
	return new i(r, t);
}
function Te(e) {
	return "-" + e.toLowerCase();
}
function M(e) {
	return e.charAt(1).toUpperCase();
}
// node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/index.js
var Ee = C([
	me,
	_e,
	ye,
	be,
	A
], "html"), De = C([
	me,
	ve,
	ye,
	be,
	A
], "svg");
// node_modules/.pnpm/space-separated-tokens@2.0.2/node_modules/space-separated-tokens/index.js
function Oe(e) {
	return e.join(" ").trim();
}
// node_modules/.pnpm/inline-style-parser@0.2.7/node_modules/inline-style-parser/cjs/index.js
var ke = /* @__PURE__ */ o(((e, t) => {
	var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, i = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, c = /^[;\s]*/, l = /^\s+|\s+$/g;
	function u(e, t) {
		if (typeof e != "string") throw TypeError("First argument must be a string");
		if (!e) return [];
		t ||= {};
		var l = 1, u = 1;
		function f(e) {
			var t = e.match(r);
			t && (l += t.length);
			var n = e.lastIndexOf("\n");
			u = ~n ? e.length - n : u + e.length;
		}
		function p() {
			var e = {
				line: l,
				column: u
			};
			return function(t) {
				return t.position = new m(e), _(), t;
			};
		}
		function m(e) {
			this.start = e, this.end = {
				line: l,
				column: u
			}, this.source = t.source;
		}
		m.prototype.content = e;
		function h(n) {
			var r = /* @__PURE__ */ Error(t.source + ":" + l + ":" + u + ": " + n);
			if (r.reason = n, r.filename = t.source, r.line = l, r.column = u, r.source = e, !t.silent) throw r;
		}
		function g(t) {
			var n = t.exec(e);
			if (n) {
				var r = n[0];
				return f(r), e = e.slice(r.length), n;
			}
		}
		function _() {
			g(i);
		}
		function v(e) {
			var t;
			for (e ||= []; t = y();) t !== !1 && e.push(t);
			return e;
		}
		function y() {
			var t = p();
			if (e.charAt(0) == "/" && e.charAt(1) == "*") {
				for (var n = 2; e.charAt(n) != "" && (e.charAt(n) != "*" || e.charAt(n + 1) != "/");) ++n;
				if (n += 2, e.charAt(n - 1) === "") return h("End of comment missing");
				var r = e.slice(2, n - 2);
				return u += 2, f(r), e = e.slice(n), u += 2, t({
					type: "comment",
					comment: r
				});
			}
		}
		function b() {
			var e = p(), t = g(a);
			if (t) {
				if (y(), !g(o)) return h("property missing ':'");
				var r = g(s), i = e({
					type: "declaration",
					property: d(t[0].replace(n, "")),
					value: r ? d(r[0].replace(n, "")) : ""
				});
				return g(c), i;
			}
		}
		function ee() {
			var e = [];
			v(e);
			for (var t; t = b();) t !== !1 && (e.push(t), v(e));
			return e;
		}
		return _(), ee();
	}
	function d(e) {
		return e ? e.replace(l, "") : "";
	}
	t.exports = u;
})), Ae = /* @__PURE__ */ o(((e, t, n) => {
	var r = n && n.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = a;
	var i = r(ke());
	function a(e, t) {
		let n = null;
		if (!e || typeof e != "string") return n;
		let r = (0, i.default)(e), a = typeof t == "function";
		return r.forEach((e) => {
			if (e.type !== "declaration") return;
			let { property: r, value: i } = e;
			a ? t(r, i, e) : i && (n ||= {}, n[r] = i);
		}), n;
	}
})), je = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.camelCase = void 0;
	var t = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, r = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, a = /^-(ms)-/, o = function(e) {
		return !e || r.test(e) || t.test(e);
	}, s = function(e, t) {
		return t.toUpperCase();
	}, c = function(e, t) {
		return `${t}-`;
	};
	e.camelCase = function(e, t) {
		return t === void 0 && (t = {}), o(e) ? e : (e = e.toLowerCase(), e = t.reactCompat ? e.replace(a, c) : e.replace(i, c), e.replace(n, s));
	};
})), Me = /* @__PURE__ */ o(((e, t, n) => {
	var r = (n && n.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(Ae()), i = je();
	function a(e, t) {
		var n = {};
		return !e || typeof e != "string" || (0, r.default)(e, function(e, r) {
			e && r && (n[(0, i.camelCase)(e, t)] = r);
		}), n;
	}
	a.default = a, t.exports = a;
})), Ne = Fe("end"), Pe = Fe("start");
function Fe(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function Ie(e) {
	let t = Pe(e), n = Ne(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
// node_modules/.pnpm/unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/lib/index.js
function Le(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? ze(e.position) : "start" in e || "end" in e ? ze(e) : "line" in e || "column" in e ? Re(e) : "";
}
function Re(e) {
	return Be(e && e.line) + ":" + Be(e && e.column);
}
function ze(e) {
	return Re(e && e.start) + "-" + Re(e && e.end);
}
function Be(e) {
	return e && typeof e == "number" ? e : 1;
}
// node_modules/.pnpm/vfile-message@4.0.3/node_modules/vfile-message/lib/index.js
var Ve = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = Le(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Ve.prototype.file = "", Ve.prototype.name = "", Ve.prototype.reason = "", Ve.prototype.message = "", Ve.prototype.stack = "", Ve.prototype.column = void 0, Ve.prototype.line = void 0, Ve.prototype.ancestors = void 0, Ve.prototype.cause = void 0, Ve.prototype.fatal = void 0, Ve.prototype.place = void 0, Ve.prototype.ruleId = void 0, Ve.prototype.source = void 0;
// node_modules/.pnpm/hast-util-to-jsx-runtime@2.3.6/node_modules/hast-util-to-jsx-runtime/lib/index.js
var He = /* @__PURE__ */ l(Me(), 1), Ue = {}.hasOwnProperty, We = /* @__PURE__ */ new Map(), Ge = /[A-Z]/g, Ke = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), qe = /* @__PURE__ */ new Set(["td", "th"]), Je = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ye(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = ot(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = at(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? De : Ee,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = Xe(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function Xe(e, t, n) {
	if (t.type === "element") return Ze(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return Qe(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return et(e, t, n);
	if (t.type === "mdxjsEsm") return $e(e, t);
	if (t.type === "root") return tt(e, t, n);
	if (t.type === "text") return nt(e, t);
}
function Ze(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = De, e.schema = i), e.ancestors.push(t);
	let a = ft(e, t.tagName, !1), o = st(e, t), s = lt(e, t);
	return Ke.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !re(e);
	})), rt(e, o, a, t), it(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Qe(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	pt(e, t.position);
}
function $e(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	pt(e, t.position);
}
function et(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = De, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : ft(e, t.name, !0), o = ct(e, t), s = lt(e, t);
	return rt(e, o, a, t), it(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function tt(e, t, n) {
	let r = {};
	return it(r, lt(e, t)), e.create(t, e.Fragment, r, n);
}
function nt(e, t) {
	return t.value;
}
function rt(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function it(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function at(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function ot(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = Pe(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function st(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && Ue.call(t.properties, i)) {
		let a = ut(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && qe.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function ct(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") {
		if (r.data && r.data.estree && e.evaluater) {
			let t = r.data.estree.body[0];
			t.type;
			let i = t.expression;
			i.type;
			let a = i.properties[0];
			a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
		} else pt(e, t.position);
	} else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") {
			if (r.value.data && r.value.data.estree && e.evaluater) {
				let t = r.value.data.estree.body[0];
				t.type, a = e.evaluater.evaluateExpression(t.expression);
			} else pt(e, t.position);
		} else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function lt(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : We;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = Xe(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function ut(e, t, n) {
	let r = we(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? v(n) : Oe(n)), r.property === "style") {
			let t = typeof n == "object" ? n : dt(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = mt(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? j[r.property] || r.property : r.attribute, n];
	}
}
function dt(e, t) {
	try {
		return (0, He.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Ve("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = Je + "#cannot-parse-style-attribute", r;
	}
}
function ft(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = te(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = te(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return Ue.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	pt(e);
}
function pt(e, t) {
	let n = new Ve("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = Je + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function mt(e) {
	let t = {}, n;
	for (n in e) Ue.call(e, n) && (t[ht(n)] = e[n]);
	return t;
}
function ht(e) {
	let t = e.replace(Ge, gt);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function gt(e) {
	return "-" + e.toLowerCase();
}
// node_modules/.pnpm/html-url-attributes@3.0.1/node_modules/html-url-attributes/lib/index.js
var _t = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
}, vt = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), yt = /* @__PURE__ */ o(((e, t) => {
	t.exports = vt();
})), bt = {};
function xt(e, t) {
	let n = t || bt;
	return St(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function St(e, t, n) {
	if (wt(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return Ct(e.children, t, n);
	}
	return Array.isArray(e) ? Ct(e, t, n) : "";
}
function Ct(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = St(e[i], t, n);
	return r.join("");
}
function wt(e) {
	return !!(e && typeof e == "object");
}
// node_modules/.pnpm/decode-named-character-reference@1.3.0/node_modules/decode-named-character-reference/index.dom.js
var Tt = document.createElement("i");
function Et(e) {
	let t = "&" + e + ";";
	Tt.innerHTML = t;
	let n = Tt.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
// node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/index.js
function Dt(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function N(e, t) {
	return e.length > 0 ? (Dt(e, e.length, 0, t), e) : t;
}
// node_modules/.pnpm/micromark-util-combine-extensions@2.0.1/node_modules/micromark-util-combine-extensions/index.js
var Ot = {}.hasOwnProperty;
function kt(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) At(t, e[n]);
	return t;
}
function At(e, t) {
	let n;
	for (n in t) {
		let r = (Ot.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			Ot.call(r, a) || (r[a] = []);
			let e = i[a];
			jt(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function jt(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	Dt(e, 0, 0, r);
}
// node_modules/.pnpm/micromark-util-decode-numeric-character-reference@2.0.2/node_modules/micromark-util-decode-numeric-character-reference/index.js
function Mt(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
// node_modules/.pnpm/micromark-util-normalize-identifier@2.0.1/node_modules/micromark-util-normalize-identifier/index.js
function Nt(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
// node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/index.js
var Pt = Wt(/[A-Za-z]/), Ft = Wt(/[\dA-Za-z]/), It = Wt(/[#-'*+\--9=?A-Z^-~]/);
function Lt(e) {
	return e !== null && (e < 32 || e === 127);
}
var Rt = Wt(/\d/), zt = Wt(/[\dA-Fa-f]/), Bt = Wt(/[!-/:-@[-`{-~]/);
function P(e) {
	return e !== null && e < -2;
}
function Vt(e) {
	return e !== null && (e < 0 || e === 32);
}
function F(e) {
	return e === -2 || e === -1 || e === 32;
}
var Ht = Wt(/\p{P}|\p{S}/u), Ut = Wt(/\s/);
function Wt(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
// node_modules/.pnpm/micromark-util-sanitize-uri@2.0.1/node_modules/micromark-util-sanitize-uri/index.js
function Gt(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && Ft(e.charCodeAt(n + 1)) && Ft(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
// node_modules/.pnpm/micromark-factory-space@2.1.0/node_modules/micromark-factory-space/index.js
function I(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return F(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return F(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
function Kt(e, t, n, r, i, a) {
	let o = 0;
	return s;
	function s(t) {
		return a > 0 && F(t) ? (e.enter(r), c(t)) : l(t);
	}
	function c(t) {
		return F(t) && o < a ? (e.consume(t), o++, c) : (e.exit(r), l(t));
	}
	function l(e) {
		return o >= i ? t(e) : n(e);
	}
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/content.js
var qt = { tokenize: L };
function L(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) e.consume(n);
		else return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), I(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
		else return P(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
// node_modules/.pnpm/micromark-util-edit-map@1.0.0/node_modules/micromark-util-edit-map/index.js
var Jt = class {
	constructor() {
		this.index = /* @__PURE__ */ new Map(), this.map = [];
	}
	add(e, t, n) {
		Yt(this, e, t, n, !1);
	}
	addBefore(e, t, n) {
		Yt(this, e, t, n, !0);
	}
	consume(e) {
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function Yt(e, t, n, r, i) {
	if (n === 0 && r.length === 0) return;
	let a = e.index.get(t);
	if (a) {
		a[1] += n, i ? (r.push(...a[2]), a[2] = r) : a[2].push(...r);
		return;
	}
	let o = [
		t,
		n,
		r
	];
	e.map.push(o), e.index.set(t, o);
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/document.js
var Xt = { tokenize: Qt }, Zt = { tokenize: $t };
function Qt(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			let c = new Jt();
			return c.add(a + 1, 0, t.events.slice(n)), c.add(n, s - n, []), c.consume(t.events), l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !(!i.currentConstruct || i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Zt, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(Zt, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) i && v(), _(0), e.consume(n);
		else return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
		else return P(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			let l = new Jt();
			l.add(a + 1, 0, t.events.slice(n)), l.add(n, e - n, []), l.consume(t.events);
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function $t(e, t, n) {
	return I(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
// node_modules/.pnpm/micromark-util-classify-character@2.0.1/node_modules/micromark-util-classify-character/index.js
function en(e) {
	if (e === null || Vt(e) || Ut(e)) return 1;
	if (Ht(e)) return 2;
}
// node_modules/.pnpm/micromark-util-resolve-all@2.0.1/node_modules/micromark-util-resolve-all/index.js
function tn(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/attention.js
var nn = {
	name: "attention",
	resolveAll: rn,
	tokenize: an
};
function rn(e, t) {
	let n = -1, r;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		let i = n;
		for (; i--;) if (e[i][0] === "exit" && e[i][1].type === "attentionSequence" && e[i][1]._open && t.sliceSerialize(e[i][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[i][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[i][1].end.offset - e[i][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			let a = e[i][1].end.offset - e[i][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1, o = { ...e[i][1].end }, s = { ...e[n][1].start };
			on(o, -a), on(s, a);
			let c = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: o,
				end: { ...e[i][1].end }
			}, l = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: s
			}, u = {
				type: a > 1 ? "strongText" : "emphasisText",
				start: { ...e[i][1].end },
				end: { ...e[n][1].start }
			}, d = {
				type: a > 1 ? "strong" : "emphasis",
				start: { ...c.start },
				end: { ...l.end }
			};
			e[i][1].end = { ...c.start }, e[n][1].start = { ...l.end }, r = [], e[i][1].end.offset - e[i][1].start.offset && (r = N(r, [[
				"enter",
				e[i][1],
				t
			], [
				"exit",
				e[i][1],
				t
			]])), r = N(r, [
				[
					"enter",
					d,
					t
				],
				[
					"enter",
					c,
					t
				],
				[
					"exit",
					c,
					t
				],
				[
					"enter",
					u,
					t
				]
			]), r = N(r, tn(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t)), r = N(r, [
				[
					"exit",
					u,
					t
				],
				[
					"enter",
					l,
					t
				],
				[
					"exit",
					l,
					t
				],
				[
					"exit",
					d,
					t
				]
			]);
			let f = 0;
			e[n][1].end.offset - e[n][1].start.offset && (f = 2, r = N(r, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])), Dt(e, i - 1, n - i + 3, r), n = i + r.length - f - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function an(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = en(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = en(o), u = !l || l === 2 && i || n.includes(o) && o !== 42 && o !== 95, d = !i || i === 2 && l || n.includes(r) && r !== 42 && r !== 95;
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function on(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/autolink.js
var sn = {
	name: "autolink",
	tokenize: cn
};
function cn(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return Pt(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || Ft(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || Ft(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || Lt(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : It(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return Ft(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || Ft(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/blank-line.js
var ln = {
	partial: !0,
	tokenize: un
};
function un(e, t, n) {
	return r;
	function r(t) {
		return F(t) ? I(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || P(e) ? t(e) : n(e);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/block-quote.js
var dn = {
	continuation: { tokenize: pn },
	exit: mn,
	name: "blockQuote",
	tokenize: fn
};
function fn(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return F(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function pn(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return F(t) ? I(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(dn, t, n)(r);
	}
}
function mn(e) {
	e.exit("blockQuote");
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/character-escape.js
var hn = {
	name: "characterEscape",
	tokenize: gn
};
function gn(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return Bt(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/character-reference.js
var _n = {
	name: "characterReference",
	tokenize: vn
};
function vn(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = Ft, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = zt, u) : (e.enter("characterReferenceValue"), a = 7, o = Rt, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === Ft && !Et(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/partial-non-lazy-continuation.js
var yn = {
	partial: !0,
	tokenize: bn
};
function bn(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-fenced.js
var xn = {
	concrete: !0,
	name: "codeFenced",
	tokenize: Sn
};
function Sn(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: ee
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), F(t) ? I(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || P(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(yn, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || P(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : F(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), I(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || P(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || P(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && F(t) ? I(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || P(t) ? e.check(yn, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || P(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function b(n) {
		return e.exit("codeFenced"), t(n);
	}
	function ee(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), F(t) ? I(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), F(t) ? I(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || P(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-indented.js
var Cn = {
	name: "codeIndented",
	tokenize: Tn
}, wn = {
	partial: !0,
	tokenize: En
};
function Tn(e, t, n) {
	return r;
	function r(t) {
		return e.enter("codeIndented"), Kt(e, i, n, "linePrefix", 4, 4)(t);
	}
	function i(t) {
		return t === null ? o(t) : P(t) ? e.attempt(wn, i, o)(t) : (e.enter("codeFlowValue"), a(t));
	}
	function a(t) {
		return t === null || P(t) ? (e.exit("codeFlowValue"), i(t)) : (e.consume(t), a);
	}
	function o(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function En(e, t, n) {
	let r = this;
	return i;
	function i(o) {
		return r.parser.lazy[r.now().line] ? n(o) : P(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : Kt(e, t, a, "linePrefix", 4, 4)(o);
	}
	function a(e) {
		return P(e) ? i(e) : n(e);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/code-text.js
var Dn = {
	name: "codeText",
	previous: kn,
	resolve: On,
	tokenize: An
};
function On(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function kn(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function An(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : P(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || P(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
// node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var jn = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && Mn(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), Mn(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), Mn(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				Mn(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				Mn(this.left, t.reverse());
			}
		}
	}
};
function Mn(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
// node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/index.js
function Nn(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new jn(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, Pn(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return Dt(e, 0, Infinity, u.slice(0)), !l;
}
function Pn(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/content.js
var Fn = {
	resolve: Ln,
	tokenize: Rn
}, In = {
	partial: !0,
	tokenize: zn
};
function Ln(e) {
	return Nn(e), e;
}
function Rn(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : P(t) ? e.check(In, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function zn(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), I(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || P(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
// node_modules/.pnpm/micromark-factory-destination@2.0.1/node_modules/micromark-factory-destination/index.js
function Bn(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || Lt(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || P(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || Vt(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || Lt(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
// node_modules/.pnpm/micromark-factory-label@2.0.1/node_modules/micromark-factory-label/index.js
function Vn(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || 
		/* c8 ignore next 3 */
		l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : P(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || P(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !F(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
// node_modules/.pnpm/micromark-factory-title@2.0.1/node_modules/micromark-factory-title/index.js
function Hn(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : P(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), I(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || P(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
// node_modules/.pnpm/micromark-factory-whitespace@2.0.1/node_modules/micromark-factory-whitespace/index.js
function Un(e, t) {
	let n;
	return r;
	function r(i) {
		return P(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : F(i) ? I(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/definition.js
var Wn = {
	name: "definition",
	tokenize: Kn
}, Gn = {
	partial: !0,
	tokenize: qn
};
function Kn(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return Vn.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = Nt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return Vt(t) ? Un(e, l)(t) : l(t);
	}
	function l(t) {
		return Bn(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(Gn, d, d)(t);
	}
	function d(t) {
		return F(t) ? I(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || P(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function qn(e, t, n) {
	return r;
	function r(t) {
		return Vt(t) ? Un(e, i)(t) : n(t);
	}
	function i(t) {
		return Hn(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return F(t) ? I(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || P(e) ? t(e) : n(e);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Jn = {
	name: "hardBreakEscape",
	tokenize: Yn
};
function Yn(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return P(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/heading-atx.js
var Xn = {
	name: "headingAtx",
	resolve: Zn,
	tokenize: Qn
};
function Zn(e, t) {
	let n = e.length - 2, r = 3;
	if (e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r) {
		let i = {
			type: "atxHeadingText",
			start: e[r][1].start,
			end: e[n][1].end
		}, a = {
			type: "chunkText",
			start: e[r][1].start,
			end: e[n][1].end,
			contentType: "text"
		};
		Dt(e, r, n - r + 1, [
			[
				"enter",
				i,
				t
			],
			[
				"enter",
				a,
				t
			],
			[
				"exit",
				a,
				t
			],
			[
				"exit",
				i,
				t
			]
		]);
	}
	return e;
}
function Qn(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || Vt(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || P(n) ? (e.exit("atxHeading"), t(n)) : F(n) ? I(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || Vt(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
// node_modules/.pnpm/micromark-util-html-tag-name@2.0.1/node_modules/micromark-util-html-tag-name/index.js
var $n = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), er = [
	"pre",
	"script",
	"style",
	"textarea"
], tr = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: rr,
	tokenize: ir
}, nr = {
	partial: !0,
	tokenize: ar
};
function rr(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function ir(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : k) : Pt(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : Pt(a) ? (e.consume(a), i = 4, r.interrupt ? t : k) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : k) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : w : m) : n(i);
	}
	function h(t) {
		return Pt(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || Vt(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && er.includes(l) ? (i = 1, r.interrupt ? t(s) : w(s)) : $n.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : w(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || Ft(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : w) : n(i);
	}
	function v(t) {
		return F(t) ? (e.consume(t), v) : S(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), S) : t === 58 || t === 95 || Pt(t) ? (e.consume(t), b) : F(t) ? (e.consume(t), y) : S(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Ft(t) ? (e.consume(t), b) : ee(t);
	}
	function ee(t) {
		return t === 61 ? (e.consume(t), te) : F(t) ? (e.consume(t), ee) : y(t);
	}
	function te(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, ne) : F(t) ? (e.consume(t), te) : re(t);
	}
	function ne(t) {
		return t === c ? (e.consume(t), c = null, x) : t === null || P(t) ? n(t) : (e.consume(t), ne);
	}
	function re(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || Vt(t) ? ee(t) : (e.consume(t), re);
	}
	function x(e) {
		return e === 47 || e === 62 || F(e) ? y(e) : n(e);
	}
	function S(t) {
		return t === 62 ? (e.consume(t), C) : n(t);
	}
	function C(t) {
		return t === null || P(t) ? w(t) : F(t) ? (e.consume(t), C) : n(t);
	}
	function w(t) {
		return t === 45 && i === 2 ? (e.consume(t), E) : t === 60 && i === 1 ? (e.consume(t), D) : t === 62 && i === 4 ? (e.consume(t), se) : t === 63 && i === 3 ? (e.consume(t), k) : t === 93 && i === 5 ? (e.consume(t), O) : P(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(nr, ce, T)(t)) : t === null || P(t) ? (e.exit("htmlFlowData"), T(t)) : (e.consume(t), w);
	}
	function T(t) {
		return e.check(yn, ie, ce)(t);
	}
	function ie(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), ae;
	}
	function ae(t) {
		return t === null || P(t) ? T(t) : (e.enter("htmlFlowData"), w(t));
	}
	function E(t) {
		return t === 45 ? (e.consume(t), k) : w(t);
	}
	function D(t) {
		return t === 47 ? (e.consume(t), o = "", oe) : w(t);
	}
	function oe(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return er.includes(n) ? (e.consume(t), se) : w(t);
		}
		return Pt(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), oe) : w(t);
	}
	function O(t) {
		return t === 93 ? (e.consume(t), k) : w(t);
	}
	function k(t) {
		return t === 62 ? (e.consume(t), se) : t === 45 && i === 2 ? (e.consume(t), k) : w(t);
	}
	function se(t) {
		return t === null || P(t) ? (e.exit("htmlFlowData"), ce(t)) : (e.consume(t), se);
	}
	function ce(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function ar(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(ln, t, n);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/html-text.js
var or = {
	name: "htmlText",
	tokenize: sr
};
function sr(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), ee) : t === 63 ? (e.consume(t), y) : Pt(t) ? (e.consume(t), re) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : Pt(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : P(t) ? (o = d, D(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? E(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : P(t) ? (o = h, D(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? E(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? E(t) : P(t) ? (o = v, D(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : P(t) ? (o = y, D(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? E(e) : y(e);
	}
	function ee(t) {
		return Pt(t) ? (e.consume(t), te) : n(t);
	}
	function te(t) {
		return t === 45 || Ft(t) ? (e.consume(t), te) : ne(t);
	}
	function ne(t) {
		return P(t) ? (o = ne, D(t)) : F(t) ? (e.consume(t), ne) : E(t);
	}
	function re(t) {
		return t === 45 || Ft(t) ? (e.consume(t), re) : t === 47 || t === 62 || Vt(t) ? x(t) : n(t);
	}
	function x(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || Pt(t) ? (e.consume(t), S) : P(t) ? (o = x, D(t)) : F(t) ? (e.consume(t), x) : E(t);
	}
	function S(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Ft(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return t === 61 ? (e.consume(t), w) : P(t) ? (o = C, D(t)) : F(t) ? (e.consume(t), C) : x(t);
	}
	function w(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, T) : P(t) ? (o = w, D(t)) : F(t) ? (e.consume(t), w) : (e.consume(t), ie);
	}
	function T(t) {
		return t === i ? (e.consume(t), i = void 0, ae) : t === null ? n(t) : P(t) ? (o = T, D(t)) : (e.consume(t), T);
	}
	function ie(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || Vt(t) ? x(t) : (e.consume(t), ie);
	}
	function ae(e) {
		return e === 47 || e === 62 || Vt(e) ? x(e) : n(e);
	}
	function E(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function D(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), oe;
	}
	function oe(t) {
		return F(t) ? I(e, O, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : O(t);
	}
	function O(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-end.js
var cr = {
	name: "labelEnd",
	resolveAll: fr,
	resolveTo: pr,
	tokenize: mr
}, lr = { tokenize: hr }, ur = { tokenize: gr }, dr = { tokenize: _r };
function fr(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && Dt(e, 0, e.length, n), e;
}
function pr(e, t) {
	let n = e.length, r = 0, i, a, o;
	for (; n--;) {
		let t = e[n][1];
		if (i) {
			if (t.type === "link" || t.type === "labelLink" && t._inactive) break;
			e[n][0] === "enter" && t.type === "labelLink" && (t._inactive = !0);
		} else if (a) {
			if (e[n][0] === "enter" && (t.type === "labelImage" || t.type === "labelLink") && !t._balanced && (i = n, t.type !== "labelLink")) {
				r = 2;
				break;
			}
		} else t.type === "labelEnd" && (a = n);
	}
	let s = {
		type: e[i][1].type === "labelLink" ? "link" : "image",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	}, c = {
		type: "label",
		start: { ...e[i][1].start },
		end: { ...e[a][1].end }
	}, l = {
		type: "labelText",
		start: { ...e[i + r + 2][1].end },
		end: { ...e[a - 2][1].start }
	};
	return o = [[
		"enter",
		s,
		t
	], [
		"enter",
		c,
		t
	]], o = N(o, e.slice(i + 1, i + r + 3)), o = N(o, [[
		"enter",
		l,
		t
	]]), o = N(o, tn(t.parser.constructs.insideSpan.null, e.slice(i + r + 4, a - 3), t)), o = N(o, [
		[
			"exit",
			l,
			t
		],
		e[a - 2],
		e[a - 1],
		[
			"exit",
			c,
			t
		]
	]), o = N(o, e.slice(a + 1)), o = N(o, [[
		"exit",
		s,
		t
	]]), Dt(e, i, e.length, o), e;
}
function mr(e, t, n) {
	let r = this, i = r._labelStarts, a, o;
	if (i) {
		for (; i.length > 0 && i[i.length - 1]._balanced;) i.pop();
		a = i[i.length - 1];
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(Nt(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(lr, u, o ? u : d)(t) : t === 91 ? e.attempt(ur, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(dr, u, d)(t);
	}
	function u(e) {
		return i.pop(), t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function hr(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return Vt(t) ? Un(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : Bn(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return Vt(t) ? Un(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? Hn(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return Vt(t) ? Un(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function gr(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Vn.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(Nt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function _r(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-start-image.js
var vr = {
	name: "labelStartImage",
	resolveAll: cr.resolveAll,
	tokenize: yr
};
function yr(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), o;
	}
	function o(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelImage"), s) : n(t);
	}
	function s(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/label-start-link.js
var br = {
	name: "labelStartLink",
	resolveAll: cr.resolveAll,
	tokenize: xr
};
function xr(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelLink"), o;
	}
	function o(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/line-ending.js
var Sr = {
	name: "lineEnding",
	tokenize: Cr
};
function Cr(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), I(e, t, "linePrefix");
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/thematic-break.js
var wr = {
	name: "thematicBreak",
	tokenize: Tr
};
function Tr(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || P(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), F(t) ? I(e, s, "whitespace")(t) : s(t));
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/list.js
var Er = {
	continuation: { tokenize: Ar },
	exit: Mr,
	name: "list",
	tokenize: kr
}, Dr = {
	partial: !0,
	tokenize: Nr
}, Or = {
	partial: !0,
	tokenize: jr
};
function kr(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : Rt(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(wr, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return Rt(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(ln, r.interrupt ? n : u, e.attempt(Dr, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return F(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function Ar(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(ln, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, I(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !F(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Or, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, I(e, e.attempt(Er, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function jr(e, t, n) {
	let r = this;
	return I(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function Mr(e) {
	e.exit(this.containerState.type);
}
function Nr(e, t, n) {
	let r = this;
	return I(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !F(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
// node_modules/.pnpm/micromark-core-commonmark@2.0.4/node_modules/micromark-core-commonmark/lib/setext-underline.js
var Pr = {
	name: "setextUnderline",
	resolveTo: Fr,
	tokenize: Ir
};
function Fr(e, t) {
	let n = new Jt(), r = e.length, i, a, o;
	for (; r--;) if (e[r][0] === "enter") {
		if (e[r][1].type === "content") {
			i = r;
			break;
		}
		e[r][1].type === "paragraph" && (a = r);
	} else e[r][1].type === "content" && n.add(r, 1, []), !o && e[r][1].type === "definition" && (o = r);
	let s = {
		type: "setextHeading",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[a][1].type = "setextHeadingText", o ? (n.add(a, 0, [[
		"enter",
		s,
		t
	]]), n.add(o + 1, 0, [[
		"exit",
		e[i][1],
		t
	]]), e[i][1].end = { ...e[o][1].end }) : e[i][1] = s, n.add(e.length, 0, [[
		"exit",
		s,
		t
	]]), n.consume(e), e;
}
function Ir(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), F(t) ? I(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || P(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/flow.js
var Lr = { tokenize: Rr };
function Rr(e) {
	let t = this, n = e.attempt(ln, r, e.attempt(this.parser.constructs.flowInitial, i, I(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Fn, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/initialize/text.js
var zr = { resolveAll: Ur() }, Br = Hr("string"), Vr = Hr("text");
function Hr(e) {
	return {
		resolveAll: Ur(e === "text" ? Wr : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) t.consume(e);
			else return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Ur(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : t[r] && t[r][1].type === "data" || (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function Wr(e, t) {
	let n = new Jt(), r = 0;
	for (; ++r <= e.length;) if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
		let i = e[r - 1][1], a = t.sliceStream(i), o = a.length, s = -1, c = 0, l;
		for (; o--;) {
			let e = a[o];
			if (typeof e == "string") {
				for (s = e.length; e.charCodeAt(s - 1) === 32;) c++, s--;
				if (s) break;
				s = -1;
			} else if (e === -2) l = !0, c++;
			else if (e !== -1) {
				o++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && r === e.length && (c = 0), c) {
			let a = {
				type: r === e.length || l || c < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: o ? s : i.start._bufferIndex + s,
					_index: i.start._index + o,
					line: i.end.line,
					column: i.end.column - c,
					offset: i.end.offset - c
				},
				end: { ...i.end }
			};
			i.end = { ...a.start }, i.start.offset === i.end.offset ? Object.assign(i, a) : n.add(r, 0, [[
				"enter",
				a,
				t
			], [
				"exit",
				a,
				t
			]]);
		}
		r++;
	}
	return n.consume(e), e;
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/constructs.js
var Gr = /* @__PURE__ */ s({
	attentionMarkers: () => $r,
	contentInitial: () => qr,
	disable: () => ei,
	document: () => Kr,
	flow: () => Yr,
	flowInitial: () => Jr,
	insideSpan: () => Qr,
	string: () => Xr,
	text: () => Zr
}), Kr = {
	42: Er,
	43: Er,
	45: Er,
	48: Er,
	49: Er,
	50: Er,
	51: Er,
	52: Er,
	53: Er,
	54: Er,
	55: Er,
	56: Er,
	57: Er,
	62: dn
}, qr = { 91: Wn }, Jr = {
	[-2]: Cn,
	[-1]: Cn,
	32: Cn
}, Yr = {
	35: Xn,
	42: wr,
	45: [Pr, wr],
	60: tr,
	61: Pr,
	95: wr,
	96: xn,
	126: xn
}, Xr = {
	38: _n,
	92: hn
}, Zr = {
	[-5]: Sr,
	[-4]: Sr,
	[-3]: Sr,
	33: vr,
	38: _n,
	42: nn,
	60: [sn, or],
	91: br,
	92: [Jn, hn],
	93: cr,
	95: nn,
	96: Dn
}, Qr = { null: [nn, zr] }, $r = { null: [42, 95] }, ei = { null: [] };
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/create-tokenizer.js
function ti(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: ne(ee),
		check: ne(te),
		consume: v,
		enter: y,
		exit: b,
		interrupt: ne(te, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = N(o, e), g(), o[o.length - 1] === null ? (re(t, 0), l.events = tn(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return ri(p(e), t);
	}
	function p(e) {
		return ni(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, S();
	}
	function g() {
		for (; r._index < o.length;) {
			let e = o[r._index];
			if (typeof e == "string") {
				let t = r._index;
				for (r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === t && r._bufferIndex < e.length;) _(e.charCodeAt(r._bufferIndex));
			} else _(e);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		P(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, S()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function b(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function ee(e, t) {
		re(e, t.from);
	}
	function te(e, t) {
		t.restore();
	}
	function ne(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = x(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function re(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && Dt(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function x() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, S();
		}
	}
	function S() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function ni(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function ri(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/parse.js
function ii(e) {
	let t = {
		constructs: kt([Gr, ...(e || {}).extensions || []]),
		content: n(qt),
		defined: [],
		document: n(Xt),
		flow: n(Lr),
		lazy: {},
		string: n(Br),
		text: n(Vr)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return ti(t, e, n);
		}
	}
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/postprocess.js
function ai(e) {
	for (; !Nn(e););
	return e;
}
// node_modules/.pnpm/micromark@4.0.3/node_modules/micromark/lib/preprocess.js
var oi = /[\0\t\n\r]/g;
function si() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i));
		let s = [], c = 0;
		for (t = "", n &&= (i.charCodeAt(0) === 65279 && c++, void 0); c < i.length;) {
			oi.lastIndex = c;
			let n = oi.exec(i), a = n && n.index !== void 0 ? n.index : i.length, o = i.charCodeAt(a);
			if (!n) {
				t = i.slice(c);
				break;
			}
			if (o === 10 && c === a && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), c < a && (s.push(i.slice(c, a)), e += a - c), o) {
				case 0:
					s.push(65533), e++;
					break;
				case 9: {
					let t = Math.ceil(e / 4) * 4;
					for (s.push(-2); e++ < t;) s.push(-1);
					break;
				}
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			c = a + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
// node_modules/.pnpm/micromark-util-decode-string@2.0.1/node_modules/micromark-util-decode-string/index.js
var ci = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function li(e) {
	return e.replace(ci, ui);
}
function ui(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return Mt(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return Et(n) || e;
}
// node_modules/.pnpm/mdast-util-from-markdown@2.1.0/node_modules/mdast-util-from-markdown/lib/index.js
var di = {}.hasOwnProperty;
function fi(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), pi(n)(ai(ii(n).document().write(si()(e, t, !0))));
}
function pi(e) {
	let t = {
		afterExit: [],
		beforeEnter: [],
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: o(we),
			autolinkProtocol: S,
			autolinkEmail: S,
			atxHeading: o(j),
			blockQuote: o(_e),
			characterEscape: S,
			characterReference: S,
			codeFenced: o(ve),
			codeFencedFenceInfo: s,
			codeFencedFenceMeta: s,
			codeIndented: o(ve, s),
			codeText: o(ye, s),
			codeTextData: S,
			data: S,
			codeFlowValue: S,
			definition: o(be),
			definitionDestinationString: s,
			definitionLabelString: s,
			definitionTitleString: s,
			emphasis: o(A),
			hardBreakEscape: o(xe),
			hardBreakTrailing: o(xe),
			htmlFlow: o(Se, s),
			htmlFlowData: S,
			htmlText: o(Se, s),
			htmlTextData: S,
			image: o(Ce),
			label: s,
			link: o(we),
			listItem: o(M),
			listItemValue: p,
			listOrdered: o(Te, f),
			listUnordered: o(Te),
			paragraph: o(Ee),
			reference: ue,
			referenceString: s,
			resourceDestinationString: s,
			resourceTitleString: s,
			setextHeading: o(j),
			strong: o(De),
			thematicBreak: o(ke)
		},
		exit: {
			atxHeading: l(),
			atxHeadingSequence: te,
			autolink: l(),
			autolinkEmail: ge,
			autolinkProtocol: he,
			blockQuote: l(),
			characterEscapeValue: C,
			characterReferenceMarkerHexadecimal: fe,
			characterReferenceMarkerNumeric: fe,
			characterReferenceValue: pe,
			characterReference: me,
			codeFenced: l(_),
			codeFencedFence: g,
			codeFencedFenceInfo: m,
			codeFencedFenceMeta: h,
			codeFlowValue: C,
			codeIndented: l(v),
			codeText: l(E),
			codeTextData: C,
			data: C,
			definition: l(),
			definitionDestinationString: ee,
			definitionLabelString: y,
			definitionTitleString: b,
			emphasis: l(),
			hardBreakEscape: l(T),
			hardBreakTrailing: l(T),
			htmlFlow: l(ie),
			htmlFlowData: C,
			htmlText: l(ae),
			htmlTextData: C,
			image: l(oe),
			label: k,
			labelText: O,
			lineEnding: w,
			link: l(D),
			listItem: l(),
			listOrdered: l(),
			listUnordered: l(),
			paragraph: l(),
			referenceString: de,
			resourceDestinationString: se,
			resourceTitleString: ce,
			resource: le,
			setextHeading: l(x),
			setextHeadingLineSequence: re,
			setextHeadingText: ne,
			strong: l(),
			thematicBreak: l()
		}
	};
	hi(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: [],
			position: void 0
		}, o = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: c,
			exit: u,
			buffer: s,
			resume: d,
			data: n
		}, l = [], f = [], p = -1;
		for (; ++p < e.length;) f.push(e[p]), (e[p][1].type === "listOrdered" || e[p][1].type === "listUnordered") && (e[p][0] === "enter" ? l.push(f.length - 1) : a(f, l.pop()));
		for (e = f, p = -1; ++p < e.length;) {
			let n = t[e[p][0]];
			e[p][0] === "enter" && t.beforeEnter.length > 0 && i(t.beforeEnter, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), di.call(n, e[p][1].type) && n[e[p][1].type].call({
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), e[p][0] === "exit" && t.afterExit.length > 0 && i(t.afterExit, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]);
		}
		if (o.tokenStack.length > 0) {
			let e = o.tokenStack[o.tokenStack.length - 1];
			(e[1] || _i).call(o, void 0, e[0]);
		}
		for (r.position = {
			start: mi(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: mi(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, p = -1; ++p < t.transforms.length;) r = t.transforms[p](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = -1;
		for (; ++r < e.length;) e[r].call(t, n);
	}
	function a(e, t) {
		let n = e.length - 1, r = t - 1, i = -1, a = !1, o, s, c, l, u = [];
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let n = r;
					for (s = void 0; n--;) {
						let t = e[n];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = n;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), u.push({
						at: s || r,
						event: [
							"exit",
							o,
							t[2]
						]
					});
				}
				if (t[1].type === "listItemPrefix") {
					let e = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = e, u.push({
						at: r,
						event: [
							"enter",
							e,
							t[2]
						]
					}), c = void 0, l = !0;
				}
			}
		}
		let d = e.splice(t), f = 0;
		for (r = -1; ++r < d.length;) {
			for (; f < u.length && u[f].at === t + r;) e.push(u[f++].event);
			e.push(d[r]);
		}
		e[t][1]._spread = a;
	}
	function o(e, t) {
		return n;
		function n(n) {
			c.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function s() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function c(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: mi(t.start),
			end: void 0
		};
	}
	function l(e) {
		return t;
		function t(t) {
			e && e.call(this, t), u.call(this, t);
		}
	}
	function u(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (!r) throw Error("Cannot close `" + e.type + "` (" + Le({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || _i).call(this, e, r[0])), n.position.end = mi(e.end);
	}
	function d() {
		return xt(this.stack.pop());
	}
	function f() {
		this.data.expectingFirstListItemValue = !0;
	}
	function p(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function h() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function g() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function v() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function y(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Nt(this.sliceSerialize(e)).toLowerCase();
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function ee() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function te(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function ne() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function re(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function x() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function S(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		n && n.type === "text" || (n = Oe(), n.position = {
			start: mi(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function C(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = mi(e.end);
	}
	function w(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = mi(e.end), this.data.atHardBreak = void 0;
		} else !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (S.call(this, e), C.call(this, e));
	}
	function T() {
		this.data.atHardBreak = !0;
	}
	function ie() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ae() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function E() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function D() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function oe() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function O(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = li(t), n.identifier = Nt(t).toLowerCase();
	}
	function k() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function se() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function ce() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function le() {
		this.data.inReference = void 0;
	}
	function ue() {
		this.data.referenceType = "collapsed";
	}
	function de(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Nt(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function fe(e) {
		this.data.characterReferenceType = e.type;
	}
	function pe(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = Mt(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = Et(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function me(e) {
		let t = this.stack.pop();
		t.position.end = mi(e.end);
	}
	function he(e) {
		C.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function ge(e) {
		C.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function _e() {
		return {
			type: "blockquote",
			children: [],
			position: void 0
		};
	}
	function ve() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: "",
			position: void 0
		};
	}
	function ye() {
		return {
			type: "inlineCode",
			value: "",
			position: void 0
		};
	}
	function be() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: "",
			position: void 0
		};
	}
	function A() {
		return {
			type: "emphasis",
			children: [],
			position: void 0
		};
	}
	function j() {
		return {
			type: "heading",
			depth: 0,
			children: [],
			position: void 0
		};
	}
	function xe() {
		return {
			type: "break",
			position: void 0
		};
	}
	function Se() {
		return {
			type: "html",
			value: "",
			position: void 0
		};
	}
	function Ce() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null,
			position: void 0
		};
	}
	function we() {
		return {
			type: "link",
			title: null,
			url: "",
			children: [],
			position: void 0
		};
	}
	function Te(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: [],
			position: void 0
		};
	}
	function M(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: [],
			position: void 0
		};
	}
	function Ee() {
		return {
			type: "paragraph",
			children: [],
			position: void 0
		};
	}
	function De() {
		return {
			type: "strong",
			children: [],
			position: void 0
		};
	}
	function Oe() {
		return {
			type: "text",
			value: "",
			position: void 0
		};
	}
	function ke() {
		return {
			type: "thematicBreak",
			position: void 0
		};
	}
}
function mi(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function hi(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? hi(e, r) : gi(e, r);
	}
}
function gi(e, t) {
	let n;
	for (n in t) if (di.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "afterExit":
		case "beforeEnter": {
			let r = t[n];
			r && e[n].push(r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function _i(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + Le({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + Le({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + Le({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
// node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/lib/index.js
function vi(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return fi(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function yi(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/break.js
function bi(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/code.js
function xi(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/delete.js
function Si(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function Ci(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function wi(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Gt(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/heading.js
function Ti(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/html.js
function Ei(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/revert.js
function Di(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function Oi(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return Di(e, t);
	let i = {
		src: Gt(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/image.js
function ki(e, t) {
	let n = { src: Gt(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function Ai(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function ji(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return Di(e, t);
	let i = { href: Gt(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/link.js
function Mi(e, t) {
	let n = { href: Gt(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function Ni(e, t, n) {
	let r = e.all(t), i = n ? Pi(n) : Fi(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function Pi(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = Fi(n[r]);
	}
	return t;
}
function Fi(e) {
	return e.spread ?? e.children.length > 1;
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/list.js
function Ii(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function Li(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/root.js
function Ri(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/strong.js
function zi(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table.js
function Bi(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = Pe(t.children[1]), o = Ne(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function Vi(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function Hi(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/trim-lines@3.0.1/node_modules/trim-lines/index.js
var Ui = 9, Wi = 32;
function Gi(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(Ki(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(Ki(t.slice(i), i > 0, !1)), a.join("");
}
function Ki(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Ui || t === Wi;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Ui || t === Wi;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/text.js
function qi(e, t) {
	let n = {
		type: "text",
		value: Gi(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function Ji(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/handlers/index.js
var Yi = {
	blockquote: yi,
	break: bi,
	code: xi,
	delete: Si,
	emphasis: Ci,
	footnoteReference: wi,
	heading: Ti,
	html: Ei,
	imageReference: Oi,
	image: ki,
	inlineCode: Ai,
	linkReference: ji,
	link: Mi,
	listItem: Ni,
	list: Ii,
	paragraph: Li,
	root: Ri,
	strong: zi,
	table: Bi,
	tableCell: Hi,
	tableRow: Vi,
	text: qi,
	thematicBreak: Ji,
	toml: Xi,
	yaml: Xi,
	definition: Xi,
	footnoteDefinition: Xi
};
function Xi() {}
// node_modules/.pnpm/@ungap+structured-clone@1.4.0/node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: Zi } = Object, Qi = typeof self == "object" ? self : globalThis, $i = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new Qi[e](t);
}, ea = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? Zi(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof Qi[e] == "function" ? $i(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n($i(a, o), i);
	};
	return r;
}, ta = (e) => ea(/* @__PURE__ */ new Map(), e)(0), na = "", { toString: ra } = {}, { keys: ia, is: aa } = Object, R = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = ra.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, na];
		case "Object": return [2, na];
		case "Date": return [3, na];
		case "RegExp": return [4, na];
		case "Map": return [5, na];
		case "Set": return [6, na];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, z = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), oa = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = R(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && aa(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of ia(o)) (e || !z(R(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? na : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(z(R(n)) || z(R(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !z(R(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, sa = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return oa(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, ca = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? ta(sa(e, t)) : structuredClone(e) : (e, t) => ta(sa(e, t));
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/footer.js
function la(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function ua(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function da(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || la, r = e.options.footnoteBackLabel || ua, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = Gt(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
		for (; f !== void 0 && ++u <= f;) {
			d.length > 0 && d.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(c, u);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), d.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + l + (u > 1 ? "-" + u : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(c, u),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let p = a[a.length - 1];
		if (p && p.type === "element" && p.tagName === "p") {
			let e = p.children[p.children.length - 1];
			e && e.type === "text" ? e.value += " " : p.children.push({
				type: "text",
				value: " "
			}), p.children.push(...d);
		} else a.push(...d);
		let m = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + l },
			children: e.wrap(a, !0)
		};
		e.patch(i, m), s.push(m);
	}
	if (s.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...ca(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(s, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
// node_modules/.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/lib/index.js
var fa = (function(e) {
	if (e == null) return _a;
	if (typeof e == "function") return ga(e);
	if (typeof e == "object") return Array.isArray(e) ? pa(e) : ma(e);
	if (typeof e == "string") return ha(e);
	throw Error("Expected function, string, or object as test");
});
function pa(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = fa(e[n]);
	return ga(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function ma(e) {
	let t = e;
	return ga(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function ha(e) {
	return ga(t);
	function t(t) {
		return t && t.type === e;
	}
}
function ga(e) {
	return t;
	function t(t, n, r) {
		return !!(va(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function _a() {
	return !0;
}
function va(e) {
	return typeof e == "object" && !!e && "type" in e;
}
// node_modules/.pnpm/unist-util-visit-parents@6.1.0/node_modules/unist-util-visit-parents/lib/color.js
function ya(e) {
	return e;
}
// node_modules/.pnpm/unist-util-visit-parents@6.1.0/node_modules/unist-util-visit-parents/lib/index.js
var ba = [];
function xa(e, t, n, r) {
	if (!e || typeof e != "object") throw Error("Unexpected value `" + e + "` for `tree`, expected node");
	let i = !0, a, o, s, c;
	if (typeof n == "function" || n && typeof n == "object" ? (a = t, o = n, r && (i = !1)) : (o = t, n && (i = !1)), typeof o == "function") s = o;
	else if (o && typeof o == "object") {
		if (o.enter !== null && o.enter !== void 0) {
			if (typeof o.enter == "function") s = o.enter;
			else throw Error("Unexpected value `" + o.enter + "` for `visitors.enter`, expected optional visitor");
		}
		if (typeof o.exit == "function") c = o.exit;
		else throw Error("Unexpected value `" + o.exit + "` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)");
	} else throw Error("Unexpected value `" + o + "` for `enter` or `visitors`, expected visitor or object with visitors");
	let l = fa(a), u = i ? 1 : -1;
	d(e, void 0, [])();
	function d(e, t, n) {
		let r = e && typeof e == "object" ? e : {};
		if (typeof r.type == "string") {
			let t = typeof r.tagName == "string" ? r.tagName : typeof r.name == "string" ? r.name : void 0;
			Object.defineProperty(o, "name", { value: "node (" + ya(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return o;
		function o() {
			let r = !a || l(e, t, n[n.length - 1] || void 0), o = ba;
			if (s && r && (o = Sa(s(e, n, t)), o[0] === !1)) return o;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && o[0] !== "skip") {
					let e = (i ? -1 : t.children.length) + u, r = [...n, t];
					for (; e > -1 && e < t.children.length;) {
						let n = t.children[e], i = d(n, e, r)();
						if (i[0] === !1) return i;
						e = typeof i[1] == "number" ? i[1] : e + u;
					}
				}
			}
			if (c && r) {
				let r = Sa(c(e, n, t));
				if (r[0] === "skip") throw Error("Unexpected value `" + r[0] + "` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing");
				if (r[0] === !1 || typeof r[1] == "number") return r;
			}
			return o;
		}
	}
}
function Sa(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? ba : [e];
}
// node_modules/.pnpm/unist-util-visit@5.2.0/node_modules/unist-util-visit/lib/index.js
function Ca(e, t, n, r) {
	let i, a, o;
	typeof n == "function" || n && typeof n == "object" ? (i = t, a = n, o = r) : (a = t, o = n), typeof a == "function" ? xa(e, i, Ta(a), o) : xa(e, i, wa(a), o);
}
function wa(e) {
	return !e || typeof e != "object" ? e : {
		enter: typeof e.enter == "function" ? Ta(e.enter) : e.enter,
		exit: typeof e.exit == "function" ? Ta(e.exit) : e.exit
	};
}
function Ta(e) {
	return t;
	function t(t, n, r) {
		return e(t, r, n[n.length - 1]);
	}
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/state.js
var Ea = {}.hasOwnProperty, Da = {};
function Oa(e, t) {
	let n = t || Da, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: Aa,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...Yi,
			...n.handlers
		},
		one: o,
		options: n,
		patch: ka,
		wrap: Ma
	};
	return Ca(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (Ea.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = ca(n);
				return r.children = a.all(e), r;
			}
			return ca(e);
		}
		return (a.options.unknownHandler || ja)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = Na(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = Na(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function ka(e, t) {
	e.position && (t.position = Ie(e));
}
function Aa(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, ca(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function ja(e, t) {
	let n = t.data || {}, r = "value" in t && !(Ea.call(n, "hProperties") || Ea.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Ma(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function Na(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
// node_modules/.pnpm/mdast-util-to-hast@13.2.1/node_modules/mdast-util-to-hast/lib/index.js
function Pa(e, t) {
	let n = Oa(e, t), r = n.one(e, void 0), i = da(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
// node_modules/.pnpm/remark-rehype@11.1.2/node_modules/remark-rehype/lib/index.js
function Fa(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = Pa(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return Pa(n, {
			file: r,
			...e || t
		});
	};
}
// node_modules/.pnpm/bail@2.0.2/node_modules/bail/index.js
function Ia(e) {
	if (e) throw e;
}
// node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js
var La = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
// node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function Ra(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
// node_modules/.pnpm/trough@2.2.0/node_modules/trough/lib/index.js
function za() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) r(a);
			else {
				for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
				t = o, s ? Ba(s, i)(...o) : r(null, ...o);
			}
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function Ba(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minpath.browser.js
var Va = {
	basename: Ha,
	dirname: Ua,
	extname: Wa,
	join: Ga,
	sep: "/"
};
function Ha(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	Ja(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Ua(e) {
	if (Ja(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Wa(e) {
	Ja(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
		} else n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function Ga(...e) {
	let t = -1, n;
	for (; ++t < e.length;) Ja(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : Ka(n);
}
function Ka(e) {
	Ja(e);
	let t = e.codePointAt(0) === 47, n = qa(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function qa(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function Ja(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minproc.browser.js
var Ya = { cwd: Xa };
function Xa() {
	return "/";
}
// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.shared.js
function Za(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/minurl.browser.js
function Qa(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!Za(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return $a(e);
}
function $a(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
// node_modules/.pnpm/vfile@6.0.3/node_modules/vfile/lib/index.js
var eo = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], to = class {
	constructor(e) {
		let t;
		t = e ? Za(e) ? { path: e } : typeof e == "string" || ao(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : Ya.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < eo.length;) {
			let e = eo[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) eo.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? Va.basename(this.path) : void 0;
	}
	set basename(e) {
		ro(e, "basename"), no(e, "basename"), this.path = Va.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? Va.dirname(this.path) : void 0;
	}
	set dirname(e) {
		io(this.basename, "dirname"), this.path = Va.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? Va.extname(this.path) : void 0;
	}
	set extname(e) {
		if (no(e, "extname"), io(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = Va.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		Za(e) && (e = Qa(e)), ro(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? Va.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		ro(e, "stem"), no(e, "stem"), this.path = Va.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new Ve(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function no(e, t) {
	if (e && e.includes(Va.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + Va.sep + "`");
}
function ro(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function io(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function ao(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
// node_modules/.pnpm/unified@11.0.5/node_modules/unified/lib/callable-instance.js
var oo = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), so = /* @__PURE__ */ l(La(), 1), co = {}.hasOwnProperty, lo = new class e extends oo {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = za();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, so.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (po("data", this.frozen), this.namespace[e] = t, this) : co.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (po("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = go(e), n = this.parser || this.Parser;
		return uo("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), uo("process", this.parser || this.Parser), fo("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = go(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				vo(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), uo("processSync", this.parser || this.Parser), fo("processSync", this.compiler || this.Compiler), this.process(e, r), ho("processSync", "process", t), n;
		function r(e, r) {
			t = !0, Ia(e), n = r;
		}
	}
	run(e, t, n) {
		mo(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = go(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), ho("runSync", "run", n), r;
		function i(e, t) {
			Ia(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = go(t), r = this.compiler || this.Compiler;
		return fo("stringify", r), mo(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (po("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, so.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				Ra(o) && Ra(r) && (r = (0, so.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function uo(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function fo(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function po(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function mo(e) {
	if (!Ra(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function ho(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function go(e) {
	return _o(e) ? e : new to(e);
}
function _o(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function vo(e) {
	return typeof e == "string" || yo(e);
}
function yo(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
// node_modules/.pnpm/react-markdown@9.1.0_@types+react@19.3.0_react@19.3.1/node_modules/react-markdown/lib/index.js
var B = yt(), bo = d(), xo = [], So = { allowDangerousHtml: !0 }, Co = /^(https?|ircs?|mailto|xmpp)$/i, wo = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function To(e) {
	let t = Eo(e), n = Do(e);
	return Oo(t.runSync(t.parse(n), n), e);
}
function Eo(e) {
	let t = e.rehypePlugins || xo, n = e.remarkPlugins || xo, r = e.remarkRehypeOptions ? {
		...e.remarkRehypeOptions,
		...So
	} : So;
	return lo().use(vi).use(n).use(Fa, r).use(t);
}
function Do(e) {
	let t = e.children || "", n = new to();
	return typeof t == "string" ? n.value = t : "" + t, n;
}
function Oo(e, t) {
	let n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || ko;
	for (let e of wo) Object.hasOwn(t, e.from) && "" + e.from + (e.to ? "use `" + e.to + "` instead" : "remove it") + e.id;
	return t.className && (e = {
		type: "element",
		tagName: "div",
		properties: { className: t.className },
		children: e.type === "root" ? e.children : [e]
	}), Ca(e, l), Ye(e, {
		Fragment: B.Fragment,
		components: i,
		ignoreInvalidStyle: !0,
		jsx: B.jsx,
		jsxs: B.jsxs,
		passKeys: !0,
		passNode: !0
	});
	function l(e, t, i) {
		if (e.type === "raw" && i && typeof t == "number") return o ? i.children.splice(t, 1) : i.children[t] = {
			type: "text",
			value: e.value
		}, t;
		if (e.type === "element") {
			let t;
			for (t in _t) if (Object.hasOwn(_t, t) && Object.hasOwn(e.properties, t)) {
				let n = e.properties[t], r = _t[t];
				(r === null || r.includes(e.tagName)) && (e.properties[t] = c(String(n || ""), t, e));
			}
		}
		if (e.type === "element") {
			let o = n ? !n.includes(e.tagName) : a ? a.includes(e.tagName) : !1;
			if (!o && r && typeof t == "number" && (o = !r(e, t, i)), o && i && typeof t == "number") return s && e.children ? i.children.splice(t, 1, ...e.children) : i.children.splice(t, 1), t;
		}
	}
}
function ko(e) {
	let t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
	return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || Co.test(e.slice(0, t)) ? e : "";
}
// packages/components/src/lib/photography/content.json
var Ao = _(), V = {
	photos: /* @__PURE__ */ JSON.parse("{\"portfolio-00\":{\"src\":\"/assets/greensburg-newborn-photography-twins.webp\",\"smallSrc\":\"/assets/greensburg-newborn-photography-twins-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"Twin newborns sleeping side by side on a soft blanket\"},\"portfolio-01\":{\"src\":\"/assets/greensburg-creative-portrait-conservatory.webp\",\"smallSrc\":\"/assets/greensburg-creative-portrait-conservatory-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A girl in a sunlit conservatory\"},\"portfolio-02\":{\"src\":\"/assets/greensburg-fine-art-childrens-portrait-garden.webp\",\"smallSrc\":\"/assets/greensburg-fine-art-childrens-portrait-garden-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A girl among garden flowers beneath a colorful sky\"},\"portfolio-07\":{\"src\":\"/assets/greensburg-pa-family-photography-green-dresses.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-green-dresses-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A mother and three girls together outdoors in green dresses\"},\"portfolio-08\":{\"src\":\"/assets/westmoreland-county-family-photography-evergreens.webp\",\"smallSrc\":\"/assets/westmoreland-county-family-photography-evergreens-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A family of five nestled among evergreen trees\"},\"portfolio-12\":{\"src\":\"/assets/greensburg-fine-art-photography-girl-white-horse.webp\",\"smallSrc\":\"/assets/greensburg-fine-art-photography-girl-white-horse-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A girl embracing a white horse in warm golden light\"},\"portfolio-16\":{\"src\":\"/assets/greensburg-family-photography-mother-daughter.webp\",\"smallSrc\":\"/assets/greensburg-family-photography-mother-daughter-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A mother and daughter beneath a flowing white canopy\"},\"portfolio-17\":{\"src\":\"/assets/greensburg-pet-photography-two-dogs.webp\",\"smallSrc\":\"/assets/greensburg-pet-photography-two-dogs-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"Two dogs wearing pink bandanas against a white background\"},\"portfolio-18\":{\"src\":\"/assets/greensburg-childrens-portraits-fence.webp\",\"smallSrc\":\"/assets/greensburg-childrens-portraits-fence-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"Three children peeking through a wooden fence\"},\"portfolio-19\":{\"src\":\"/assets/greensburg-fine-art-childrens-photography-fairy.webp\",\"smallSrc\":\"/assets/greensburg-fine-art-childrens-photography-fairy-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A child dressed as a fairy sitting on a white horse\"},\"portfolio-21\":{\"src\":\"/assets/greensburg-baby-photography-milestone.webp\",\"smallSrc\":\"/assets/greensburg-baby-photography-milestone-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A baby wearing a crown beside a basket of apples\"},\"portfolio-22\":{\"src\":\"/assets/greensburg-newborn-photography-purple-moon.webp\",\"smallSrc\":\"/assets/greensburg-newborn-photography-purple-moon-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A sleeping newborn in a purple hat with a tiny moon\"},\"portfolio-23\":{\"src\":\"/assets/greensburg-baby-portraits-easter.webp\",\"smallSrc\":\"/assets/greensburg-baby-portraits-easter-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A baby in a basket beside a rabbit\"},\"portfolio-24\":{\"src\":\"/assets/greensburg-maternity-photography-blue-gown.webp\",\"smallSrc\":\"/assets/greensburg-maternity-photography-blue-gown-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"An expectant mother in a blue gown holding her child\"},\"portfolio-25\":{\"src\":\"/assets/greensburg-pa-family-photography-golden-light.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-golden-light-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A family of three together in warm evening light\"},\"portfolio-26\":{\"src\":\"/assets/greensburg-fine-art-childrens-portrait-dandelion.webp\",\"smallSrc\":\"/assets/greensburg-fine-art-childrens-portrait-dandelion-640.webp\",\"width\":1300,\"height\":1488,\"smallWidth\":640,\"alt\":\"A whimsical portrait of a toddler beside a giant dandelion\"},\"portfolio-27\":{\"src\":\"/assets/greensburg-fine-art-photography-red-cape.webp\",\"smallSrc\":\"/assets/greensburg-fine-art-photography-red-cape-640.webp\",\"width\":1258,\"height\":1488,\"smallWidth\":640,\"alt\":\"A child in a red cape beside a tree in a storybook scene\"},\"wedding-00\":{\"src\":\"/assets/greensburg-wedding-photographer-doorway.webp\",\"smallSrc\":\"/assets/greensburg-wedding-photographer-doorway-640.webp\",\"width\":800,\"height\":533,\"smallWidth\":640,\"alt\":\"A black-and-white wedding portrait of a couple in a doorway\"},\"wedding-01\":{\"src\":\"/assets/pittsburgh-wedding-photographer-ceremony.webp\",\"smallSrc\":\"/assets/pittsburgh-wedding-photographer-ceremony-640.webp\",\"width\":1536,\"height\":1024,\"smallWidth\":640,\"alt\":\"A wedding ceremony in a church aisle\"},\"wedding-02\":{\"src\":\"/assets/greensburg-wedding-photography-stone-arch.webp\",\"smallSrc\":\"/assets/greensburg-wedding-photography-stone-arch-640.webp\",\"width\":1536,\"height\":1024,\"smallWidth\":640,\"alt\":\"Newlyweds together on stone steps beneath an arch\"},\"wedding-03\":{\"src\":\"/assets/pittsburgh-greensburg-wedding-photography-red-door.webp\",\"smallSrc\":\"/assets/pittsburgh-greensburg-wedding-photography-red-door-640.webp\",\"width\":1536,\"height\":1024,\"smallWidth\":640,\"alt\":\"Newlyweds embracing beside an ornate red church door\"},\"wedding-04\":{\"src\":\"/assets/pittsburgh-wedding-photography-window-kiss.webp\",\"smallSrc\":\"/assets/pittsburgh-wedding-photography-window-kiss-640.webp\",\"width\":576,\"height\":384,\"smallWidth\":576,\"alt\":\"A black-and-white portrait of newlyweds kissing by a window\"},\"wedding-09\":{\"src\":\"/assets/westmoreland-county-wedding-photography-mirror.webp\",\"smallSrc\":\"/assets/westmoreland-county-wedding-photography-mirror-640.webp\",\"width\":1536,\"height\":1024,\"smallWidth\":640,\"alt\":\"A black-and-white wedding portrait of a couple kissing, reflected in an oval mirror\"},\"wedding-10\":{\"src\":\"/assets/greensburg-wedding-photography-couple.webp\",\"smallSrc\":\"/assets/greensburg-wedding-photography-couple-640.webp\",\"width\":576,\"height\":384,\"smallWidth\":576,\"alt\":\"A couple sharing a tender moment in their wedding attire\"},\"wedding-11\":{\"src\":\"/assets/pittsburgh-wedding-photography-wedding-party.webp\",\"smallSrc\":\"/assets/pittsburgh-wedding-photography-wedding-party-640.webp\",\"width\":960,\"height\":640,\"smallWidth\":640,\"alt\":\"A wedding party gathered beneath a stone arch\"},\"ptba-photo-00\":{\"src\":\"/assets/pittsburgh-food-photography-cocktail.webp\",\"smallSrc\":\"/assets/pittsburgh-food-photography-cocktail-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A styled cocktail with a citrus garnish\"},\"ptba-photo-01\":{\"src\":\"/assets/greensburg-product-photography-handbag-lifestyle.webp\",\"smallSrc\":\"/assets/greensburg-product-photography-handbag-lifestyle-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A handbag styled in a lifestyle scene\"},\"ptba-photo-03\":{\"src\":\"/assets/pittsburgh-food-photography-plated-meal.webp\",\"smallSrc\":\"/assets/pittsburgh-food-photography-plated-meal-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A freshly plated meal photographed for a business\"},\"ptba-photo-04\":{\"src\":\"/assets/greensburg-business-brand-photography.webp\",\"smallSrc\":\"/assets/greensburg-business-brand-photography-640.webp\",\"width\":1440,\"height\":925,\"smallWidth\":640,\"alt\":\"A business owner working at a laptop\"},\"ptba-photo-05\":{\"src\":\"/assets/greensburg-product-photography-styled-handbag.webp\",\"smallSrc\":\"/assets/greensburg-product-photography-styled-handbag-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A handbag arranged with complementary accessories\"},\"ptba-photo-06\":{\"src\":\"/assets/pittsburgh-food-photography-cheesecake.webp\",\"smallSrc\":\"/assets/pittsburgh-food-photography-cheesecake-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A slice of cheesecake with a decorative topping\"},\"ptba-photo-07\":{\"src\":\"/assets/westmoreland-county-drink-photography.webp\",\"smallSrc\":\"/assets/westmoreland-county-drink-photography-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A carefully styled cocktail\"},\"ptba-photo-11\":{\"src\":\"/assets/pittsburgh-business-photography-professional.webp\",\"smallSrc\":\"/assets/pittsburgh-business-photography-professional-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A professional talking on the phone\"},\"ptba-photo-13\":{\"src\":\"/assets/westmoreland-county-business-photography-dj.webp\",\"smallSrc\":\"/assets/westmoreland-county-business-photography-dj-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A DJ at an entertainment setup\"},\"ptba-photo-14\":{\"src\":\"/assets/greensburg-product-photography-bottles.webp\",\"smallSrc\":\"/assets/greensburg-product-photography-bottles-640.webp\",\"width\":1440,\"height\":960,\"smallWidth\":640,\"alt\":\"A styled collection of bottled products\"},\"ptba-photo-15\":{\"src\":\"/assets/greensburg-corporate-headshot.webp\",\"smallSrc\":\"/assets/greensburg-corporate-headshot-640.webp\",\"width\":1440,\"height\":1152,\"smallWidth\":640,\"alt\":\"A professional headshot\"},\"owner-maa\":{\"src\":\"/assets/tabitha-memories-as-art-greensburg-photographer.webp\",\"smallSrc\":\"/assets/tabitha-memories-as-art-greensburg-photographer-640.webp\",\"width\":768,\"height\":1280,\"smallWidth\":480,\"alt\":\"Tabitha, the photographer behind Memories as Art, holding her camera\"},\"owner-ptba\":{\"src\":\"/assets/tabitha-greensburg-photographer-marketer.webp\",\"smallSrc\":\"/assets/tabitha-greensburg-photographer-marketer-640.webp\",\"width\":720,\"height\":1200,\"smallWidth\":480,\"alt\":\"Tabitha at her laptop\"},\"upload-marble-wedding\":{\"src\":\"/assets/greensburg-pa-wedding-photography-marble-staircase.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-marble-staircase-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Wedding couple framed by an ornate arch above a marble staircase\"},\"upload-dog-tennis-ball\":{\"src\":\"/assets/greensburg-pa-pet-photography-dog-tennis-ball.webp\",\"smallSrc\":\"/assets/greensburg-pa-pet-photography-dog-tennis-ball-640.webp\",\"width\":2048,\"height\":1366,\"smallWidth\":640,\"alt\":\"Studio portrait of a dog holding a tennis ball against a warm brown backdrop\"},\"upload-pond-wedding\":{\"src\":\"/assets/westmoreland-county-wedding-photography-pond-kiss.webp\",\"smallSrc\":\"/assets/westmoreland-county-wedding-photography-pond-kiss-640.webp\",\"width\":1980,\"height\":1320,\"smallWidth\":640,\"alt\":\"Newlyweds kissing beside a pond and wooden railing in warm evening light\"},\"upload-newborn-knit\":{\"src\":\"/assets/greensburg-pa-newborn-photography-knitted-bonnet.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-photography-knitted-bonnet-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of a sleeping newborn in a knitted bonnet and basket\"},\"upload-red-dress-forest\":{\"src\":\"/assets/greensburg-pa-senior-portrait-red-dress-woodland-creek.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-red-dress-woodland-creek-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Portrait of a young woman in a red dress seated on a fallen tree above a woodland creek\"},\"upload-santa-baking\":{\"src\":\"/assets/greensburg-pa-santa-photography-baking-cookies.webp\",\"smallSrc\":\"/assets/greensburg-pa-santa-photography-baking-cookies-640.webp\",\"width\":1955,\"height\":1303,\"smallWidth\":640,\"alt\":\"A smiling child decorating cookies with Santa in a warmly lit Christmas kitchen\"},\"upload-senior-flowers\":{\"src\":\"/assets/greensburg-pa-senior-photography-flowers-white-hat.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-photography-flowers-white-hat-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Senior portrait of a young woman in a white sunhat seated beside colorful flowers and a street clock\"},\"upload-toddler-dock\":{\"src\":\"/assets/greensburg-pa-childrens-photography-woodland-dock-lantern.webp\",\"smallSrc\":\"/assets/greensburg-pa-childrens-photography-woodland-dock-lantern-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"A toddler in denim overalls sitting on a small wooden dock beside a glowing lantern\"},\"upload-storm-couple\":{\"src\":\"/assets/westmoreland-county-couples-photography-lightning-sky.webp\",\"smallSrc\":\"/assets/westmoreland-county-couples-photography-lightning-sky-640.webp\",\"width\":2048,\"height\":1366,\"smallWidth\":640,\"alt\":\"A couple holding hands with rolling green hills and a dramatic lightning sky behind them\"},\"upload-halloween-carriage\":{\"src\":\"/assets/greensburg-pa-halloween-portraits-haunted-carriage.webp\",\"smallSrc\":\"/assets/greensburg-pa-halloween-portraits-haunted-carriage-640.webp\",\"width\":2048,\"height\":1366,\"smallWidth\":640,\"alt\":\"Four children in a theatrical Halloween portrait with a skeleton carriage, purple lighting, and swirling fog\"},\"upload-newborn-hands\":{\"src\":\"/assets/greensburg-pa-newborn-photography-parents-hands.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-photography-parents-hands-640.webp\",\"width\":2048,\"height\":1638,\"smallWidth\":640,\"alt\":\"Black-and-white newborn composite showing a sleeping baby gently supported in parents’ hands\"},\"upload-wedding-mother\":{\"src\":\"/assets/westmoreland-county-wedding-photography-mother-bride-mirror.webp\",\"smallSrc\":\"/assets/westmoreland-county-wedding-photography-mother-bride-mirror-640.webp\",\"width\":1980,\"height\":1320,\"smallWidth\":640,\"alt\":\"A bride embracing her mother, reflected in an ornate mirror in black and white\"},\"upload-wedding-details\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bridal-details-collage.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bridal-details-collage-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Black-and-white wedding collage of the bride, rings, dress, flower girl, and finishing touches\"},\"upload-hedgehog-valentine\":{\"src\":\"/assets/greensburg-pa-pet-photography-hedgehog-valentine.webp\",\"smallSrc\":\"/assets/greensburg-pa-pet-photography-hedgehog-valentine-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"A hedgehog wearing a bow tie and holding a red rose among Valentine decorations\"},\"upload-family-sleigh\":{\"src\":\"/assets/westmoreland-county-christmas-family-photography-horse-sleigh.webp\",\"smallSrc\":\"/assets/westmoreland-county-christmas-family-photography-horse-sleigh-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"A family beside a red Christmas sleigh and white horse in a snowy seasonal portrait\"},\"upload-princess-carriage\":{\"src\":\"/assets/greensburg-pa-princess-portrait-session-horse-carriage.webp\",\"smallSrc\":\"/assets/greensburg-pa-princess-portrait-session-horse-carriage-640.webp\",\"width\":2048,\"height\":1365,\"smallWidth\":640,\"alt\":\"Two girls in blue princess dresses seated in a white carriage beside a flower-adorned white horse\"},\"upload-girl-cardinals\":{\"src\":\"/assets/greensburg-pa-fine-art-childrens-photography-red-cardinals.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-childrens-photography-red-cardinals-640.webp\",\"width\":1800,\"height\":1200,\"smallWidth\":640,\"alt\":\"A girl in a red winter dress holding a birdcage on a snowy woodland path surrounded by red cardinals\"},\"upload-gazebo-wedding\":{\"src\":\"/assets/westmoreland-county-wedding-photography-rainy-night-gazebo.webp\",\"smallSrc\":\"/assets/westmoreland-county-wedding-photography-rainy-night-gazebo-640.webp\",\"width\":1946,\"height\":1297,\"smallWidth\":640,\"alt\":\"Newlyweds holding hands beneath a glowing gazebo during a rainy night\"},\"db-0000\":{\"src\":\"/assets/greensburg-pa-family-photography-military-parent-keepsake-db0000.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-military-parent-keepsake-db0000-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Hands holding a silver military parent keepsake necklace.\"},\"db-0001\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-woodland-wedding-walk-db0001.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-woodland-wedding-walk-db0001-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom walking together through green woodland.\"},\"db-0002\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baseball-newborn-collage-db0002.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baseball-newborn-collage-db0002-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of sleeping newborn portraits with baseball props.\"},\"db-0003\":{\"src\":\"/assets/greensburg-pa-family-photography-child-with-fluffy-chicken-db0003.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-with-fluffy-chicken-db0003-640.webp\",\"width\":960,\"height\":960,\"smallWidth\":640,\"alt\":\"Young child watching a fluffy white chicken outdoors.\"},\"db-0004\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-fountain-wedding-ceremony-db0004.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-fountain-wedding-ceremony-db0004-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple exchanging vows with an officiant in front of a fountain.\"},\"db-0005\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-sunlit-field-db0005.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-sunlit-field-db0005-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Family seated together in a sunlit grassy field.\"},\"db-0006\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-groom-under-umbrella-db0006.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-groom-under-umbrella-db0006-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing beneath a pale umbrella.\"},\"db-0007\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-woodland-tea-party-db0007.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-woodland-tea-party-db0007-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a colorful tutu having a woodland tea party with a teddy bear.\"},\"db-0008\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-church-doorway-db0008.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-church-doorway-db0008-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing outside tall church doors.\"},\"db-0009\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-basket-bunny-collage-db0009.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-basket-bunny-collage-db0009-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two baby portraits with a white rabbit and a rustic basket.\"},\"db-0011\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-romantic-wedding-collage-db0011.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-romantic-wedding-collage-db0011-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of bride and groom portraits in warm outdoor light.\"},\"db-0012\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-sunflower-field-couple-db0012.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-sunflower-field-couple-db0012-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing in a field of sunflowers.\"},\"db-0013\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-winter-wreath-db0013.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-winter-wreath-db0013-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping wrapped newborn nestled in an evergreen wreath.\"},\"db-0014\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-floral-grass-nest-db0014.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-floral-grass-nest-db0014-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newborn lying in a white nest surrounded by flowers on grass.\"},\"db-0016\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-tutu-by-water-db0016.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-tutu-by-water-db0016-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a pink tutu seated on a log beside still water.\"},\"db-0017\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-white-unicorn-db0017.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-white-unicorn-db0017-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl standing beside a white horse styled as a unicorn.\"},\"db-0018\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-rabbit-portrait-collage-db0018.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-rabbit-portrait-collage-db0018-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a girl in a blue dress holding and standing with a rabbit.\"},\"db-0019\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-maternity-woodland-pink-gown-db0019.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-maternity-woodland-pink-gown-db0019-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Pregnant woman in a flowing pink gown in a wooded setting.\"},\"db-0020\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-sunflower-collage-db0020.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-sunflower-collage-db0020-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of outdoor maternity portraits with sunflowers and warm light.\"},\"db-0021\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-blue-knit-hat-db0021.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-blue-knit-hat-db0021-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a blue knitted hat on a soft blanket.\"},\"db-0022\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-makeup-black-white-db0022.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-makeup-black-white-db0022-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white photograph of a bride having her makeup applied.\"},\"db-0023\":{\"src\":\"/assets/pittsburgh-area-family-photography-boy-on-sandy-beach-db0023.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-boy-on-sandy-beach-db0023-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young boy holding a stick while standing on a sandy beach.\"},\"db-0024\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-sunset-grass-db0024.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-sunset-grass-db0024-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple sitting closely together in a sunlit grassy field.\"},\"db-0025\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-colorful-feather-boa-db0025.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-colorful-feather-boa-db0025-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling girl wearing a colorful feather boa against a gray backdrop.\"},\"db-0026\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-unicorn-sunset-field-db0026.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-unicorn-sunset-field-db0026-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child touching a white horse styled as a unicorn in a glowing field.\"},\"db-0027\":{\"src\":\"/assets/greensburg-pa-boudoir-photography-black-white-boudoir-collage-db0027.webp\",\"smallSrc\":\"/assets/greensburg-pa-boudoir-photography-black-white-boudoir-collage-db0027-640.webp\",\"width\":1600,\"height\":808,\"smallWidth\":640,\"alt\":\"Black and white collage of an adult woman in lingerie beside an ornate bed.\"},\"db-0028\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-winter-couple-white-horse-db0028.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-winter-couple-white-horse-db0028-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Couple standing with a decorated white horse in a winter setting.\"},\"db-0029\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-apple-crate-flowers-db0029.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-apple-crate-flowers-db0029-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn posed in a red apple crate among small flowers.\"},\"db-0030\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-party-outdoor-pavilion-db0030.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-party-outdoor-pavilion-db0030-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Large wedding party standing together outside a pavilion.\"},\"db-0031\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-gray-cat-green-backdrop-db0031.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-gray-cat-green-backdrop-db0031-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Long-haired gray cat looking toward the camera against a green backdrop.\"},\"db-0032\":{\"src\":\"/assets/pittsburgh-area-family-photography-mother-daughter-window-collage-db0032.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-mother-daughter-window-collage-db0032-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white collage of a mother helping a girl into a dress by a window.\"},\"db-0033\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-bridge-marriage-proposal-db0033.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-bridge-marriage-proposal-db0033-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Man kneeling to propose to a woman on a wooden garden bridge.\"},\"db-0034\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-beach-wedding-silhouette-db0034.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-beach-wedding-silhouette-db0034-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom walking along the shore in sunset silhouette.\"},\"db-0035\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-with-baby-goat-db0035.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-with-baby-goat-db0035-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn nestled beside a small goat on a cream blanket.\"},\"db-0036\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-winter-picnic-db0036.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-winter-picnic-db0036-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple sharing a winter picnic beneath a blanket with lanterns nearby.\"},\"db-0037\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-chair-garden-db0037.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-chair-garden-db0037-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Toddler standing beside a small wooden chair in a garden.\"},\"db-0038\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-white-horse-winter-db0038.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-white-horse-winter-db0038-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three children with a decorated white horse in a wintry landscape.\"},\"db-0039\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-beach-family-fantasy-db0039.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-beach-family-fantasy-db0039-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three people wearing colorful mermaid tails on a beach at sunset.\"},\"db-0040\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-first-birthday-pink-balloons-db0040.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-first-birthday-pink-balloons-db0040-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Baby seated with a cake and pastel balloons for a first birthday portrait.\"},\"db-0041\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-church-wedding-couple-db0041.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-church-wedding-couple-db0041-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom posing together inside a church.\"},\"db-0042\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-cowboy-boots-detail-db0042.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-cowboy-boots-detail-db0042-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride lifting her skirt to show cowboy boots beside the groom.\"},\"db-0043\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-boots-knit-blanket-db0043.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-boots-knit-blanket-db0043-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn posed beside boots with a chunky knitted blanket.\"},\"db-0044\":{\"src\":\"/assets/pittsburgh-area-pet-photography-puppy-tutu-white-background-db0044.webp\",\"smallSrc\":\"/assets/pittsburgh-area-pet-photography-puppy-tutu-white-background-db0044-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Golden puppy wearing a brown tutu against a white background.\"},\"db-0045\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-pink-formal-gown-db0045.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-pink-formal-gown-db0045-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Girl in a long pink gown posing against a draped floral studio backdrop.\"},\"db-0046\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-moon-collage-db0046.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-moon-collage-db0046-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two newborn portraits featuring a crescent moon prop and a sleeping close-up.\"},\"db-0047\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-embracing-tree-db0047.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-embracing-tree-db0047-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing beside a large tree in warm evening light.\"},\"db-0048\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-leafy-tree-db0048.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-leafy-tree-db0048-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom facing one another beside a leafy tree.\"},\"db-0049\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-dandelion-portrait-db0049.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-dandelion-portrait-db0049-640.webp\",\"width\":1280,\"height\":1600,\"smallWidth\":512,\"alt\":\"Toddler holding a dandelion in warm outdoor light.\"},\"db-0050\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-white-lace-greenery-db0050.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-white-lace-greenery-db0050-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Pregnant woman in a white lace dress standing beside green foliage.\"},\"db-0051\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-red-phone-booth-db0051.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-red-phone-booth-db0051-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman posing in a red telephone booth wearing a dark dress.\"},\"db-0052\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-siblings-lying-grass-db0052.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-siblings-lying-grass-db0052-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of two children lying on grass.\"},\"db-0053\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-rabbit-tea-party-db0053.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-rabbit-tea-party-db0053-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a hat holding a rabbit beside a whimsical tea set.\"},\"db-0054\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-dance-black-white-db0054.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-dance-black-white-db0054-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a smiling bride and groom dancing.\"},\"db-0055\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-spring-floral-hat-db0055.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-spring-floral-hat-db0055-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a cream dress and flower-trimmed hat posing in a studio.\"},\"db-0056\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-christmas-newborn-red-box-db0056.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-christmas-newborn-red-box-db0056-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a striped hat in a red box with Christmas props.\"},\"db-0057\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-santa-baby-red-sofa-db0057.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-santa-baby-red-sofa-db0057-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Santa leaning toward a baby seated on a red sofa beside a Christmas tree.\"},\"db-0058\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-rocky-shore-db0058.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-rocky-shore-db0058-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing on a beach beside large shoreline rocks.\"},\"db-0059\":{\"src\":\"/assets/pittsburgh-area-pet-photography-couple-with-dogs-collage-db0059.webp\",\"smallSrc\":\"/assets/pittsburgh-area-pet-photography-couple-with-dogs-collage-db0059-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a couple holding small dogs and individual dog portraits.\"},\"db-0060\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-rings-roses-detail-db0060.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-rings-roses-detail-db0060-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding rings resting on a reflective surface beside cream roses.\"},\"db-0061\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-dramatic-bridal-silhouette-db0061.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-dramatic-bridal-silhouette-db0061-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white bridal portrait with dramatic backlighting and a veil.\"},\"db-0062\":{\"src\":\"/assets/pittsburgh-area-family-photography-three-brothers-studio-sofa-db0062.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-three-brothers-studio-sofa-db0062-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three boys seated together on a studio sofa with a small rabbit.\"},\"db-0063\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-maternity-autumn-couple-collage-db0063.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-maternity-autumn-couple-collage-db0063-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a couple and maternity portraits in warm autumn light.\"},\"db-0064\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-mother-lifting-child-sunlight-db0064.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-mother-lifting-child-sunlight-db0064-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman lifting a smiling young child in warm outdoor light.\"},\"db-0065\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-church-wedding-ceremony-wide-db0065.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-church-wedding-ceremony-wide-db0065-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wide black and white view of a wedding ceremony inside a church.\"},\"db-0066\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bridal-hair-preparation-db0066.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bridal-hair-preparation-db0066-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close-up of a bride having her hair styled.\"},\"db-0067\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-dove-release-db0067.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-dove-release-db0067-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a purple tutu releasing white doves in golden light.\"},\"db-0068\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-party-jumping-db0068.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-party-jumping-db0068-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding party jumping together on a green lawn.\"},\"db-0069\":{\"src\":\"/assets/greensburg-pa-family-photography-girl-small-wildflower-bouquet-db0069.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-girl-small-wildflower-bouquet-db0069-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young girl holding a small bouquet of white flowers outdoors.\"},\"db-0070\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-cake-smash-two-portrait-collage-db0070.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-cake-smash-two-portrait-collage-db0070-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a toddler enjoying a blue and white birthday cake in a high chair.\"},\"db-0071\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-wrapped-newborn-gray-studio-db0071.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-wrapped-newborn-gray-studio-db0071-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn wrapped in pale fabric against a gray background.\"},\"db-0072\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-details-and-dance-collage-db0072.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-details-and-dance-collage-db0072-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of wedding rings, vows, couple portraits and dancing.\"},\"db-0073\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-boy-pony-cowboy-portrait-db0073.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-boy-pony-cowboy-portrait-db0073-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Boy in a cowboy hat riding a small pony beside a wooden fence.\"},\"db-0074\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-red-sofa-db0074.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-red-sofa-db0074-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom sharing a kiss while seated on a red sofa outdoors.\"},\"db-0075\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-girl-christmas-red-ornament-db0075.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-girl-christmas-red-ornament-db0075-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Girl holding a red ornament in a decorated Christmas studio scene.\"},\"db-0076\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-woman-white-unicorn-golden-field-db0076.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-woman-white-unicorn-golden-field-db0076-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman in a long cream dress standing with a white horse styled as a unicorn.\"},\"db-0077\":{\"src\":\"/assets/pittsburgh-area-family-photography-brothers-vintage-truck-db0077.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-brothers-vintage-truck-db0077-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two young boys posing in front of a vintage green truck.\"},\"db-0078\":{\"src\":\"/assets/greensburg-pa-family-photography-parents-lifting-boy-sunset-db0078.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-parents-lifting-boy-sunset-db0078-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents lifting a young boy in warm evening light.\"},\"db-0079\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-knight-princess-unicorn-db0079.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-knight-princess-unicorn-db0079-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children dressed as a knight and princess sitting on a white horse styled as a unicorn.\"},\"db-0080\":{\"src\":\"/assets/pittsburgh-area-family-photography-extended-family-meadow-db0080.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-extended-family-meadow-db0080-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Extended family posing together beside a hay bale in a meadow.\"},\"db-0081\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-doves-rustic-barn-db0081.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-doves-rustic-barn-db0081-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a cream dress holding white doves beside a rustic barn.\"},\"db-0082\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-kissing-white-dove-db0082.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-kissing-white-dove-db0082-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a purple tutu holding a white dove near her face in golden light.\"},\"db-0083\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-groom-getting-ready-bowtie-db0083.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-groom-getting-ready-bowtie-db0083-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white photograph of a woman adjusting a groom's bow tie.\"},\"db-0084\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-hand-parent-detail-db0084.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-hand-parent-detail-db0084-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Black and white close-up of a newborn hand curled around an adult finger.\"},\"db-0085\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-railway-vintage-suitcases-db0085.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-railway-vintage-suitcases-db0085-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple kissing on railway tracks beside vintage suitcases.\"},\"db-0086\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-princess-carriage-winter-group-db0086.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-princess-carriage-winter-group-db0086-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children and costumed adults with a white horse and fairy-tale carriage in winter.\"},\"db-0087\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-autumn-harvest-portrait-db0087.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-autumn-harvest-portrait-db0087-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a colorful tutu seated with pumpkins, fruit and a small wagon.\"},\"db-0088\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-three-woodland-db0088.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-three-woodland-db0088-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents and their young child posing together in woodland.\"},\"db-0089\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-classical-doorway-db0089.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-classical-doorway-db0089-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing beside a white columned doorway.\"},\"db-0090\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-stone-wall-db0090.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-stone-wall-db0090-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing beside a weathered stone wall.\"},\"db-0091\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-by-fountain-db0091.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-by-fountain-db0091-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Large wedding party posing together beside a fountain.\"},\"db-0092\":{\"src\":\"/assets/pittsburgh-area-family-photography-mother-two-daughters-sofa-db0092.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-mother-two-daughters-sofa-db0092-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Woman and two girls seated together on a brown sofa.\"},\"db-0094\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-camera-outdoors-db0094.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-camera-outdoors-db0094-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman holding a camera to her face in a green outdoor setting.\"},\"db-0096\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-purple-dress-floral-hat-collage-db0096.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-purple-dress-floral-hat-collage-db0096-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a young girl in a purple dress and flower-trimmed straw hat.\"},\"db-0097\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-heart-basket-rope-db0097.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-heart-basket-rope-db0097-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a green knitted hat nestled in a heart-shaped basket with rope props.\"},\"db-0098\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-wizard-books-owl-db0098.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-wizard-books-owl-db0098-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn dressed as a wizard with books, glasses and an owl toy.\"},\"db-0099\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-sunset-landscape-db0099.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-sunset-landscape-db0099-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing on a lawn beneath a colorful sunset.\"},\"db-0100\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-sleeping-white-wrap-db0100.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-sleeping-white-wrap-db0100-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of a sleeping newborn wrapped in pale fabric with hands beside the face.\"},\"db-0101\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-red-haired-young-woman-chair-db0101.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-red-haired-young-woman-chair-db0101-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman seated on a wooden chair in a sunlit garden.\"},\"db-0102\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-rocky-beach-db0102.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-rocky-beach-db0102-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a white dress posing on a rocky beach at sunset.\"},\"db-0103\":{\"src\":\"/assets/westmoreland-county-pa-boudoir-photography-boudoir-black-lingerie-armchair-db0103.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-boudoir-photography-boudoir-black-lingerie-armchair-db0103-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Adult woman in black lingerie and stockings reclining on a lace-covered armchair.\"},\"db-0104\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-feet-heart-hands-db0104.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-feet-heart-hands-db0104-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close-up of newborn feet framed by adult hands forming a heart.\"},\"db-0105\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-plaid-cap-gray-backdrop-db0105.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-plaid-cap-gray-backdrop-db0105-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a plaid cap against a gray backdrop.\"},\"db-0106\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-girl-carousel-horse-fantasy-db0106.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-girl-carousel-horse-fantasy-db0106-640.webp\",\"width\":1280,\"height\":1600,\"smallWidth\":512,\"alt\":\"Girl in a turquoise dress seated on a colorful carousel horse in a sparkling fantasy scene.\"},\"db-0107\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-rainbow-balloons-db0107.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-rainbow-balloons-db0107-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby seated beside a small cake with rainbow balloons on a wooden bridge.\"},\"db-0108\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-first-birthday-highchair-cake-db0108.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-first-birthday-highchair-cake-db0108-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby in a wooden high chair with a first birthday cake.\"},\"db-0109\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-cake-cutting-db0109.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-cake-cutting-db0109-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride and groom cutting a tiered wedding cake in a wooden venue.\"},\"db-0110\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-vintage-hot-cocoa-stand-db0110.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-vintage-hot-cocoa-stand-db0110-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents and their baby posing beside a rustic hot cocoa stand outdoors.\"},\"db-0111\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-groom-rustic-window-db0111.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-groom-rustic-window-db0111-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of bride and groom beside a window in a rustic building.\"},\"db-0112\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-first-steps-garden-db0112.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-first-steps-garden-db0112-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Baby standing on grass while an adult holds both hands.\"},\"db-0113\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-lakeside-db0113.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-lakeside-db0113-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple kissing beside a softly lit lake.\"},\"db-0114\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-princess-carriage-white-horse-snow-db0114.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-princess-carriage-white-horse-snow-db0114-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a blue princess dress seated in a pink carriage beside a white horse in snow.\"},\"db-0115\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-getting-ready-collage-db0115.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-getting-ready-collage-db0115-640.webp\",\"width\":1600,\"height\":800,\"smallWidth\":640,\"alt\":\"Black and white collage of bridal preparations, jewelry and a seated bride.\"},\"db-0116\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-floating-bed-moon-fantasy-db0116.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-floating-bed-moon-fantasy-db0116-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Dreamlike portrait of a girl sleeping on a floating bed above water beneath a large moon.\"},\"db-0118\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-maternity-willow-tree-db0118.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-maternity-willow-tree-db0118-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Pregnant woman in a white dress standing beneath hanging willow branches.\"},\"db-0119\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-blue-glasses-db0119.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-blue-glasses-db0119-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in a patterned red dress holding blue glasses against a green outdoor background.\"},\"db-0120\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-rainbow-tutu-birthday-db0120.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-rainbow-tutu-birthday-db0120-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Baby wearing a rainbow tutu seated with a small birthday cake and bunting.\"},\"db-0121\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-mermaid-seashells-db0121.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-mermaid-seashells-db0121-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn dressed as a mermaid on a sandy backdrop with seashells and starfish.\"},\"db-0122\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-sparkler-exit-db0122.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-sparkler-exit-db0122-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom walking through a line of guests holding sparklers.\"},\"db-0123\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-groom-vintage-car-db0123.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-groom-vintage-car-db0123-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling bride and groom seated inside a vintage car.\"},\"db-0124\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-lakeside-stone-wall-db0124.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-lakeside-stone-wall-db0124-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing beside a stone wall and sunlit water.\"},\"db-0125\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-pink-cupcake-db0125.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-pink-cupcake-db0125-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a pink birthday outfit seated beside cupcakes.\"},\"db-0126\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-christmas-baby-sleigh-white-pony-db0126.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-christmas-baby-sleigh-white-pony-db0126-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a red sleigh beside a white pony in a snowy Christmas scene.\"},\"db-0127\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-boy-gray-cardigan-studio-db0127.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-boy-gray-cardigan-studio-db0127-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Boy wearing a gray cardigan in a studio portrait.\"},\"db-0128\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-vintage-basin-collage-db0128.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-vintage-basin-collage-db0128-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two portraits of a baby seated on a blanket and in a vintage basin.\"},\"db-0130\":{\"src\":\"/assets/westmoreland-county-pa-fashion-photography-red-evening-gown-dramatic-light-db0130.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fashion-photography-red-evening-gown-dramatic-light-db0130-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman in a red evening gown against a dark background.\"},\"db-0131\":{\"src\":\"/assets/pittsburgh-area-family-photography-mother-child-garden-canopy-db0131.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-mother-child-garden-canopy-db0131-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman embracing a child beneath an outdoor fabric canopy.\"},\"db-0133\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-waterfront-riverboat-proposal-db0133.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-waterfront-riverboat-proposal-db0133-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Man kneeling during a waterfront proposal beside a riverboat.\"},\"db-0134\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-pink-ruffles-studio-db0134.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-pink-ruffles-studio-db0134-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a pink ruffled outfit seated against a gray studio background.\"},\"db-0135\":{\"src\":\"/assets/greensburg-pa-wedding-photography-church-ceremony-wide-interior-db0135.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-church-ceremony-wide-interior-db0135-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding ceremony viewed from the back of a church.\"},\"db-0136\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-groom-wedding-day-collage-db0136.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-groom-wedding-day-collage-db0136-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of bride and groom portraits, wedding rings and bridal details.\"},\"db-0137\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-child-woodland-tea-party-db0137.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-child-woodland-tea-party-db0137-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child seated at a decorated woodland tea party table.\"},\"db-0138\":{\"src\":\"/assets/greensburg-pa-family-photography-boy-striped-shirt-wood-post-db0138.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-boy-striped-shirt-wood-post-db0138-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Boy in a striped shirt leaning beside a wooden post.\"},\"db-0139\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-gown-window-back-db0139.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-gown-window-back-db0139-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride standing at a tall window showing the back and train of her gown.\"},\"db-0140\":{\"src\":\"/assets/pittsburgh-area-family-photography-mother-three-children-willow-db0140.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-mother-three-children-willow-db0140-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman and three children seated beneath leafy willow branches.\"},\"db-0141\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-drumstick-street-db0141.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-drumstick-street-db0141-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman holding drumsticks on a softly blurred street.\"},\"db-0142\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-groom-kissing-bride-forehead-waterfall-db0142.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-groom-kissing-bride-forehead-waterfall-db0142-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Groom kissing the bride on the forehead beside a waterfall.\"},\"db-0143\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-purple-flowers-garden-db0143.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-purple-flowers-garden-db0143-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child holding purple and white flowers near her face.\"},\"db-0144\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-polka-dot-tie-db0144.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-polka-dot-tie-db0144-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a gray polka dot necktie on a gray blanket.\"},\"db-0145\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-church-four-image-collage-db0145.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-church-four-image-collage-db0145-640.webp\",\"width\":1028,\"height\":1600,\"smallWidth\":411,\"alt\":\"Four-image collage of a wedding couple, church interior and bridal portraits.\"},\"db-0146\":{\"src\":\"/assets/pittsburgh-area-boudoir-photography-black-lace-pearls-monochrome-db0146.webp\",\"smallSrc\":\"/assets/pittsburgh-area-boudoir-photography-black-lace-pearls-monochrome-db0146-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Adult woman in black lace lingerie and pearls seated on a bed in black and white.\"},\"db-0147\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-red-dress-floral-crown-woodland-db0147.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-red-dress-floral-crown-woodland-db0147-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Child in a red dress and floral crown leaning against a tree.\"},\"db-0148\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-christmas-evergreen-portrait-db0148.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-christmas-evergreen-portrait-db0148-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Family of four seated among decorated Christmas trees.\"},\"db-0149\":{\"src\":\"/assets/pittsburgh-area-boudoir-photography-black-white-lace-bed-portrait-db0149.webp\",\"smallSrc\":\"/assets/pittsburgh-area-boudoir-photography-black-white-lace-bed-portrait-db0149-640.webp\",\"width\":1600,\"height\":808,\"smallWidth\":640,\"alt\":\"Adult woman in black and white lace lingerie reclining on a cream bed.\"},\"db-0150\":{\"src\":\"/assets/greensburg-pa-family-photography-child-white-dress-greenhouse-db0150.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-white-dress-greenhouse-db0150-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Child in a white dress standing among flowers and watering cans.\"},\"db-0151\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-boy-vintage-suitcases-railway-db0151.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-boy-vintage-suitcases-railway-db0151-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Boy in a plaid shirt seated on vintage suitcases on railway tracks.\"},\"db-0152\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-embracing-guest-outside-db0152.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-embracing-guest-outside-db0152-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride embracing a guest outdoors among the wedding party.\"},\"db-0153\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-white-top-outdoor-db0153.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-white-top-outdoor-db0153-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in a white top and pale shorts posing outdoors.\"},\"db-0154\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-dog-pink-sweater-studio-db0154.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-dog-pink-sweater-studio-db0154-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Small dog wearing a pink sweater on a cream fur rug.\"},\"db-0155\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-mermaid-trident-children-beach-db0155.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-mermaid-trident-children-beach-db0155-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children with a mermaid tail costume and trident in a beach fantasy portrait.\"},\"db-0156\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-mother-child-floral-white-pony-db0156.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-mother-child-floral-white-pony-db0156-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman and child standing beside a white pony decorated with flowers.\"},\"db-0157\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-teal-orchid-tiered-wedding-cake-db0157.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-teal-orchid-tiered-wedding-cake-db0157-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Teal tiered wedding cake decorated with white orchids.\"},\"db-0158\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-heart-basket-teddy-bears-db0158.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-heart-basket-teddy-bears-db0158-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a heart-shaped basket beside teddy bears.\"},\"db-0159\":{\"src\":\"/assets/greensburg-pa-wedding-photography-sparkling-love-reception-table-db0159.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-sparkling-love-reception-table-db0159-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sparkling LOVE letters and candles on a sequined wedding reception table.\"},\"db-0160\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-bridesmaids-black-dresses-db0160.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-bridesmaids-black-dresses-db0160-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and bridesmaids holding pale flower bouquets outdoors.\"},\"db-0162\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-blue-wrap-db0162.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-blue-wrap-db0162-640.webp\",\"width\":1600,\"height\":1066,\"smallWidth\":640,\"alt\":\"Sleeping newborn resting on folded hands beside a pale blue wrap.\"},\"db-0163\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-woman-german-shepherd-monochrome-db0163.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-woman-german-shepherd-monochrome-db0163-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman embracing a German shepherd in a black and white outdoor portrait.\"},\"db-0164\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-floral-dress-garden-swing-db0164.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-floral-dress-garden-swing-db0164-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in a dark floral dress seated on a rope swing.\"},\"db-0165\":{\"src\":\"/assets/greensburg-pa-wedding-photography-groomsmen-holding-bride-outdoors-db0165.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-groomsmen-holding-bride-outdoors-db0165-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Groomsmen holding the smiling bride beside a rustic building.\"},\"db-0166\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-diamond-rings-reflective-surface-db0166.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-diamond-rings-reflective-surface-db0166-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Diamond wedding rings on a reflective surface with sparkling highlights.\"},\"db-0167\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-knit-lamb-hat-toy-db0167.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-knit-lamb-hat-toy-db0167-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a knitted lamb hat beside a matching toy.\"},\"db-0168\":{\"src\":\"/assets/greensburg-pa-wedding-photography-field-wedding-party-three-image-collage-db0168.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-field-wedding-party-three-image-collage-db0168-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three-image wedding collage with couple portraits and a wedding party in a meadow.\"},\"db-0169\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-teddy-vintage-camera-barn-db0169.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-teddy-vintage-camera-barn-db0169-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child holding a teddy bear and vintage camera beside a wooden barn.\"},\"db-0170\":{\"src\":\"/assets/pittsburgh-area-family-photography-boy-gray-knit-hood-studio-db0170.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-boy-gray-knit-hood-studio-db0170-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Boy in a gray knitted hood against a neutral studio background.\"},\"db-0171\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-toy-shop-three-image-collage-db0171.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-toy-shop-three-image-collage-db0171-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three baby portraits with toys, a knitted cardigan and a red plaid outfit.\"},\"db-0172\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-siblings-teddy-bear-outdoor-blanket-db0172.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-siblings-teddy-bear-outdoor-blanket-db0172-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children smiling with a large teddy bear on an outdoor blanket.\"},\"db-0173\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-autumn-overlook-db0173.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-autumn-overlook-db0173-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Groom kissing the bride on the cheek at an autumn hillside overlook.\"},\"db-0174\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-woman-vintage-truck-db0174.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-woman-vintage-truck-db0174-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in blue posing beside a teal vintage truck.\"},\"db-0176\":{\"src\":\"/assets/pittsburgh-area-business-brand-photography-business-book-reading-detail-db0176.webp\",\"smallSrc\":\"/assets/pittsburgh-area-business-brand-photography-business-book-reading-detail-db0176-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman holding an open business book while seated indoors.\"},\"db-0177\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-spring-child-rabbits-vintage-pram-db0177.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-spring-child-rabbits-vintage-pram-db0177-640.webp\",\"width\":1575,\"height\":1260,\"smallWidth\":640,\"alt\":\"Child in a pink dress beside rabbits in a flower-decorated vintage pram.\"},\"db-0179\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-floral-vintage-pram-db0179.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-floral-vintage-pram-db0179-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby seated in a flower-decorated vintage pram.\"},\"db-0180\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-leather-jacket-woodland-path-db0180.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-woman-leather-jacket-woodland-path-db0180-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in a black jacket posing beside a woodland path.\"},\"db-0181\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-couple-green-woodland-clearing-db0181.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-couple-green-woodland-clearing-db0181-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in a green woodland clearing.\"},\"db-0182\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-dress-preparation-monochrome-db0182.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-dress-preparation-monochrome-db0182-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Attendants helping the bride adjust her wedding gown in black and white.\"},\"db-0183\":{\"src\":\"/assets/greensburg-pa-family-photography-child-lavender-white-dress-studio-db0183.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-lavender-white-dress-studio-db0183-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Child in a white and lavender dress posing against a bright background.\"},\"db-0184\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-child-guest-church-pew-monochrome-db0184.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-child-guest-church-pew-monochrome-db0184-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child wedding guest seated in a church pew in black and white.\"},\"db-0185\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-rustic-wedding-sign-tub-flowers-db0185.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-rustic-wedding-sign-tub-flowers-db0185-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Rustic wedding direction sign beside flowers and a vintage bathtub.\"},\"db-0186\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-maternity-flowing-blue-gown-woods-db0186.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-maternity-flowing-blue-gown-woods-db0186-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Pregnant woman wearing a flowing blue gown in a wooded setting.\"},\"db-0187\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-cream-wrap-closeup-db0187.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-cream-wrap-closeup-db0187-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of a sleeping newborn wrapped in a cream blanket.\"},\"db-0189\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-children-miniature-train-fantasy-db0189.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-children-miniature-train-fantasy-db0189-640.webp\",\"width\":1600,\"height\":1200,\"smallWidth\":640,\"alt\":\"Two children riding a miniature train in a textured fantasy scene.\"},\"db-0190\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-knit-hat-blanket-db0190.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-knit-hat-blanket-db0190-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a pink knitted hat beneath a matching blanket.\"},\"db-0191\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-black-jacket-tree-db0191.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-black-jacket-tree-db0191-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in a black jacket posing beside a tree.\"},\"db-0192\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-woman-yellow-flowers-truck-db0192.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-red-haired-woman-yellow-flowers-truck-db0192-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman holding yellow flowers in front of a teal vintage truck.\"},\"db-0193\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-church-aisle-monochrome-db0193.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-church-aisle-monochrome-db0193-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Newlywed couple walking down a church aisle in black and white.\"},\"db-0194\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-embracing-garden-stone-wall-db0194.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-embracing-garden-stone-wall-db0194-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in a garden beside a stone wall.\"},\"db-0195\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-family-snowy-christmas-sleigh-pony-db0195.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-family-snowy-christmas-sleigh-pony-db0195-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family posing with a red sleigh and white pony in a snowy Christmas scene.\"},\"db-0196\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-woman-peach-dress-river-db0196.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-woman-peach-dress-river-db0196-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a peach dress posing in shallow water.\"},\"db-0197\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-kissing-rustic-barn-doors-db0197.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-kissing-rustic-barn-doors-db0197-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing in an open rustic barn doorway.\"},\"db-0198\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-floral-dress-white-chair-meadow-db0198.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-floral-dress-white-chair-meadow-db0198-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a dark floral dress seated on a white chair in a meadow.\"},\"db-0199\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-purple-bonnet-balloons-db0199.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-purple-bonnet-balloons-db0199-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Baby in a purple bonnet seated with pastel balloons.\"},\"db-0200\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-floral-crown-moon-night-portrait-db0200.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-floral-crown-moon-night-portrait-db0200-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Young person wearing a floral crown in a misty moonlit fantasy portrait.\"},\"db-0201\":{\"src\":\"/assets/greensburg-pa-wedding-photography-smiling-bride-wedding-vows-db0201.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-smiling-bride-wedding-vows-db0201-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling bride facing the groom during their wedding ceremony.\"},\"db-0202\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-couple-laughing-embrace-monochrome-db0202.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-couple-laughing-embrace-monochrome-db0202-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Bride and groom laughing together in a black and white portrait.\"},\"db-0203\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-fairy-child-unicorn-golden-light-db0203.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-fairy-child-unicorn-golden-light-db0203-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child wearing fairy wings and a flower crown beside a unicorn in golden light.\"},\"db-0204\":{\"src\":\"/assets/greensburg-pa-wedding-photography-couple-doorway-illuminated-love-db0204.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-couple-doorway-illuminated-love-db0204-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Bride and groom kissing in a doorway beneath illuminated LOVE letters.\"},\"db-0205\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-two-boxer-dogs-autumn-db0205.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-two-boxer-dogs-autumn-db0205-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two adults and a child posing with two boxer dogs in autumn woods.\"},\"db-0206\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-autumn-hills-stormy-sky-db0206.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-autumn-hills-stormy-sky-db0206-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing beneath a cloudy sky at an autumn overlook.\"},\"db-0207\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-teddy-clouds-dove-fantasy-db0207.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-teddy-clouds-dove-fantasy-db0207-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Child holding a teddy bear amid glowing clouds and a flying dove.\"},\"db-0208\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-kissing-wooden-bridge-monochrome-db0208.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-kissing-wooden-bridge-monochrome-db0208-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple seated together and kissing on a wooden bridge in black and white.\"},\"db-0209\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-party-vintage-chairs-meadow-db0209.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-party-vintage-chairs-meadow-db0209-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding party posing around vintage chairs in a grassy meadow.\"},\"db-0210\":{\"src\":\"/assets/greensburg-pa-family-photography-child-pigtails-floral-dress-outdoor-db0210.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-pigtails-floral-dress-outdoor-db0210-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with pigtails holding her cheeks in an outdoor portrait.\"},\"db-0211\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-spooky-skeleton-night-monochrome-db0211.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-spooky-skeleton-night-monochrome-db0211-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children holding hands in a spooky scene with skeleton decorations.\"},\"db-0212\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-seated-window-sepia-db0212.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-seated-window-sepia-db0212-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride seated beside a bright window in a warm-toned portrait.\"},\"db-0213\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-baby-purple-tutu-heart-backdrop-db0213.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-baby-purple-tutu-heart-backdrop-db0213-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Baby wearing a purple tutu seated before a heart-patterned backdrop.\"},\"db-0214\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-cheek-kiss-golden-garden-db0214.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-cheek-kiss-golden-garden-db0214-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Man kissing a smiling woman on the cheek in a sunlit garden.\"},\"db-0215\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-child-white-unicorn-db0215.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-child-white-unicorn-db0215-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Pregnant woman beside a white unicorn with a child seated on its back.\"},\"db-0216\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-church-pews-db0216.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-church-pews-db0216-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding guests seated in church pews during a ceremony.\"},\"db-0217\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-rustic-barn-portrait-db0217.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-rustic-barn-portrait-db0217-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a cream sweater and boots posing at a rustic barn.\"},\"db-0218\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-children-christmas-tree-dual-collage-db0218.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-children-christmas-tree-dual-collage-db0218-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Color and black and white portraits of three children beside a Christmas tree.\"},\"db-0219\":{\"src\":\"/assets/greensburg-pa-wedding-photography-couple-meadow-sunset-portrait-db0219.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-couple-meadow-sunset-portrait-db0219-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom touching foreheads in a meadow at sunset.\"},\"db-0221\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-embrace-bare-branches-db0221.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-embrace-bare-branches-db0221-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing outdoors beneath bare branches.\"},\"db-0222\":{\"src\":\"/assets/greensburg-pa-wedding-photography-newlyweds-walking-sunlit-bridge-db0222.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-newlyweds-walking-sunlit-bridge-db0222-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom holding hands on a sunlit pedestrian bridge.\"},\"db-0223\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-vintage-hat-lace-top-monochrome-db0223.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-vintage-hat-lace-top-monochrome-db0223-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman wearing a vintage hat and lace top beside a wooden wall.\"},\"db-0224\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-boy-pumpkins-autumn-meadow-db0224.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-boy-pumpkins-autumn-meadow-db0224-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Boy in a plaid shirt seated among pumpkins in an autumn meadow.\"},\"db-0225\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-laughing-waterfront-fountain-db0225.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-laughing-waterfront-fountain-db0225-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Couple laughing together beside a waterfront fountain.\"},\"db-0226\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-knit-hat-basket-monochrome-db0226.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-knit-hat-basket-monochrome-db0226-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a knitted hat resting in a basket in black and white.\"},\"db-0227\":{\"src\":\"/assets/pittsburgh-area-pet-photography-child-black-dog-golden-meadow-db0227.webp\",\"smallSrc\":\"/assets/pittsburgh-area-pet-photography-child-black-dog-golden-meadow-db0227-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child embracing a black dog in a golden meadow.\"},\"db-0228\":{\"src\":\"/assets/greensburg-pa-wedding-photography-newlyweds-golden-sunset-meadow-db0228.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-newlyweds-golden-sunset-meadow-db0228-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in a meadow beneath a golden sunset.\"},\"db-0229\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-yellow-blouse-blue-glasses-grass-db0229.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-yellow-blouse-blue-glasses-grass-db0229-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman in blue glasses and a yellow blouse lying on the grass.\"},\"db-0230\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-embrace-beneath-bridal-veil-db0230.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-embrace-beneath-bridal-veil-db0230-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing beneath a veil outdoors.\"},\"db-0231\":{\"src\":\"/assets/greensburg-pa-family-photography-family-four-golden-meadow-db0231.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-four-golden-meadow-db0231-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two adults and two children seated on a blanket in a golden meadow.\"},\"db-0232\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-baby-yellow-trousers-spring-lamb-db0232.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-baby-yellow-trousers-spring-lamb-db0232-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby wearing yellow trousers seated beside a lamb in a spring studio scene.\"},\"db-0233\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-couple-stone-church-twin-towers-db0233.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-couple-stone-church-twin-towers-db0233-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride and groom standing outside a stone church with twin towers.\"},\"db-0234\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-waterfront-riverboat-evening-db0234.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-waterfront-riverboat-evening-db0234-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple holding hands beside the water with a riverboat in the background.\"},\"db-0235\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-church-exterior-newlyweds-dual-collage-db0235.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-church-exterior-newlyweds-dual-collage-db0235-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two-image collage of a church exterior and newlyweds holding hands at its doors.\"},\"db-0236\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-gold-bow-eyelashes-closeup-db0236.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-gold-bow-eyelashes-closeup-db0236-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of a baby wearing a pink headband with a gold bow.\"},\"db-0238\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-sunlit-young-woman-garden-closeup-db0238.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-sunlit-young-woman-garden-closeup-db0238-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman with her hands beside her hair in a sunlit outdoor portrait.\"},\"db-0239\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-pink-top-jeweled-headband-outdoor-db0239.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-pink-top-jeweled-headband-outdoor-db0239-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a pink top and jeweled headband posing outdoors.\"},\"db-0240\":{\"src\":\"/assets/greensburg-pa-family-photography-child-blue-ruffled-blouse-studio-db0240.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-blue-ruffled-blouse-studio-db0240-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a blue ruffled blouse and floral headband in a studio portrait.\"},\"db-0242\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-doorway-garden-collage-db0242.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-doorway-garden-collage-db0242-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two-image collage of newlyweds kissing in a doorway and seated beside a pond.\"},\"db-0243\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-white-wrap-monochrome-db0243.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-white-wrap-monochrome-db0243-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wrapped in a white blanket in black and white.\"},\"db-0244\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-fishing-dock-lantern-db0244.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-fishing-dock-lantern-db0244-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a navy outfit seated on a wooden dock with a lantern and fishing rod.\"},\"db-0245\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-lavender-reception-table-details-db0245.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-lavender-reception-table-details-db0245-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding reception table set with lavender napkins, favors and a floral centerpiece.\"},\"db-0246\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-baby-purple-dress-rabbit-ducklings-db0246.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-baby-purple-dress-rabbit-ducklings-db0246-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a purple dress seated beside a rabbit and ducklings in a spring scene.\"},\"db-0247\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-five-tier-wedding-cake-peach-roses-db0247.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-five-tier-wedding-cake-peach-roses-db0247-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Five-tier white wedding cake decorated with peach roses.\"},\"db-0248\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-couple-baby-shoes-collage-db0248.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-couple-baby-shoes-collage-db0248-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Two-image maternity collage showing a couple and a pregnant woman holding baby shoes.\"},\"db-0249\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-purple-tail-beach-portrait-db0249.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-purple-tail-beach-portrait-db0249-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a blue and purple mermaid costume seated on a beach.\"},\"db-0250\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-preparing-in-window-light-db0250.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-preparing-in-window-light-db0250-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride standing beside a window during wedding preparations.\"},\"db-0251\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-in-sunflowers-db0251.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-in-sunflowers-db0251-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close view of a couple holding hands in a sunflower field.\"},\"db-0252\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-children-on-holiday-train-set-db0252.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-children-on-holiday-train-set-db0252-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Two children seated on a holiday train portrait set.\"},\"db-0253\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-knit-hat-db0253.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-knit-hat-db0253-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a pink knit hat on a soft blanket.\"},\"db-0254\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-embracing-among-pine-trees-db0254.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-embracing-among-pine-trees-db0254-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing in a grove of tall pine trees.\"},\"db-0255\":{\"src\":\"/assets/greensburg-pa-family-photography-children-seated-in-grass-with-boots-db0255.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-children-seated-in-grass-with-boots-db0255-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated together in grass beside a pair of boots.\"},\"db-0256\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-mother-holding-baby-outdoors-db0256.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-mother-holding-baby-outdoors-db0256-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Mother holding a smiling baby against a leafy background.\"},\"db-0257\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-with-vintage-truck-db0257.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-with-vintage-truck-db0257-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman leaning beside a vintage truck and sunflowers.\"},\"db-0258\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-nautical-first-birthday-portrait-db0258.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-nautical-first-birthday-portrait-db0258-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby celebrating a first birthday on a nautical portrait set.\"},\"db-0259\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-walking-in-garden-db0259.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-walking-in-garden-db0259-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom holding hands in a garden.\"},\"db-0260\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-parasols-in-dreamlike-landscape-db0260.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-parasols-in-dreamlike-landscape-db0260-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl holding a parasol in a dreamlike landscape with birds.\"},\"db-0261\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-expectant-couple-by-rustic-door-db0261.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-expectant-couple-by-rustic-door-db0261-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Expectant couple embracing beside a rustic doorway.\"},\"db-0262\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-equestrian-portrait-with-brown-horse-db0262.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-equestrian-portrait-with-brown-horse-db0262-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman standing with a brown horse beside a fence.\"},\"db-0263\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-in-cowboy-hats-with-horse-db0263.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-in-cowboy-hats-with-horse-db0263-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children in cowboy hats standing with a horse.\"},\"db-0264\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-baby-in-autumn-grass-with-leaves-db0264.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-baby-in-autumn-grass-with-leaves-db0264-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby seated in grass with autumn leaves floating nearby.\"},\"db-0265\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-senior-guitar-portrait-collage-db0265.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-senior-guitar-portrait-collage-db0265-640.webp\",\"width\":1600,\"height\":1280,\"smallWidth\":640,\"alt\":\"Collage of a young woman posing with an acoustic guitar.\"},\"db-0266\":{\"src\":\"/assets/pittsburgh-area-family-photography-parents-holding-baby-in-garden-db0266.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-parents-holding-baby-in-garden-db0266-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents holding their baby in a leafy garden.\"},\"db-0267\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-by-city-railing-db0267.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-by-city-railing-db0267-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman standing beside a railing outside a stone building.\"},\"db-0268\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-reception-first-dance-db0268.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-reception-first-dance-db0268-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom dancing together at their reception.\"},\"db-0269\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-in-silhouette-by-window-db0269.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-in-silhouette-by-window-db0269-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Child silhouetted beside a bright window.\"},\"db-0270\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-twin-babies-in-metal-tub-db0270.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-twin-babies-in-metal-tub-db0270-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two babies sitting in a metal tub surrounded by rubber ducks.\"},\"db-0271\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-smiling-baby-in-striped-romper-db0271.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-smiling-baby-in-striped-romper-db0271-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby in a striped romper on a studio backdrop.\"},\"db-0272\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-in-woodland-studio-portrait-db0272.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-in-woodland-studio-portrait-db0272-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Parents and baby seated together on a woodland studio set.\"},\"db-0273\":{\"src\":\"/assets/greensburg-pa-boudoir-photography-black-and-white-seated-boudoir-portrait-db0273.webp\",\"smallSrc\":\"/assets/greensburg-pa-boudoir-photography-black-and-white-seated-boudoir-portrait-db0273-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Black and white portrait of a woman seated beside a dressing table.\"},\"db-0274\":{\"src\":\"/assets/westmoreland-county-pa-fashion-photography-fashion-portraits-with-top-hat-and-fur-db0274.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fashion-photography-fashion-portraits-with-top-hat-and-fur-db0274-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Pair of fashion portraits featuring a black top hat and fur vest.\"},\"db-0275\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-black-and-white-bride-groom-embrace-db0275.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-black-and-white-bride-groom-embrace-db0275-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Black and white portrait of a bride and groom embracing.\"},\"db-0276\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-with-teddy-bears-on-sofa-db0276.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-with-teddy-bears-on-sofa-db0276-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newborn posed among teddy bears on a small sofa.\"},\"db-0277\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-picking-flowers-in-field-db0277.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-picking-flowers-in-field-db0277-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a sun hat picking flowers in a sunlit field.\"},\"db-0278\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-by-industrial-steps-db0278.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-by-industrial-steps-db0278-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young man in a striped sweater beside outdoor steps.\"},\"db-0279\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-embracing-in-woodland-db0279.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-embracing-in-woodland-db0279-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in sunlit woodland.\"},\"db-0280\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-with-basket-in-autumn-garden-db0280.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-with-basket-in-autumn-garden-db0280-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Girl holding a basket in a warmly lit garden.\"},\"db-0281\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-at-sunset-on-porch-db0281.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-at-sunset-on-porch-db0281-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom standing together on a porch in golden light.\"},\"db-0282\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-in-purple-knit-outfit-db0282.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-in-purple-knit-outfit-db0282-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a purple knit hat and outfit.\"},\"db-0283\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-black-and-white-baby-chair-collage-db0283.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-black-and-white-baby-chair-collage-db0283-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white collage of baby portraits with wicker chairs and a mirror.\"},\"db-0284\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-on-rustic-camping-set-db0284.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-on-rustic-camping-set-db0284-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn posed on a rustic camping set with a tent and lantern.\"},\"db-0285\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-wrapped-in-blue-blanket-db0285.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-wrapped-in-blue-blanket-db0285-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby looking toward the camera while wrapped in a blue blanket.\"},\"db-0286\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-embracing-with-city-skyline-db0286.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-embracing-with-city-skyline-db0286-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing outdoors with a city skyline behind them.\"},\"db-0287\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-parents-cradling-newborn-in-dark-studio-db0287.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-parents-cradling-newborn-in-dark-studio-db0287-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Parents cradling their newborn against a dark studio background.\"},\"db-0288\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-in-glass-corridor-collage-db0288.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-in-glass-corridor-collage-db0288-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two wedding portraits of a couple in a bright glass corridor.\"},\"db-0289\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-by-wooden-fence-collage-db0289.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-by-wooden-fence-collage-db0289-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding portrait collage with a bride and groom beside a wooden fence.\"},\"db-0291\":{\"src\":\"/assets/greensburg-pa-family-photography-children-embracing-at-ocean-sunset-db0291.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-children-embracing-at-ocean-sunset-db0291-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children embracing at the edge of the ocean at sunset.\"},\"db-0292\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-smiling-child-in-brown-cap-db0292.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-smiling-child-in-brown-cap-db0292-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling child wearing a brown cap outdoors.\"},\"db-0293\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-beside-painted-portrait-db0293.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-beside-painted-portrait-db0293-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple kissing beside a large painted portrait indoors.\"},\"db-0294\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-in-glasshouse-doorway-db0294.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-in-glasshouse-doorway-db0294-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman posing in the doorway of a white glasshouse.\"},\"db-0295\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-black-and-white-couple-by-tree-db0295.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-black-and-white-couple-by-tree-db0295-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a couple embracing beside a tree.\"},\"db-0296\":{\"src\":\"/assets/pittsburgh-area-fashion-photography-studio-fashion-portrait-with-turquoise-top-db0296.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fashion-photography-studio-fashion-portrait-with-turquoise-top-db0296-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Woman posing in a turquoise top against a gray studio backdrop.\"},\"db-0297\":{\"src\":\"/assets/greensburg-pa-family-photography-family-group-in-winter-landscape-db0297.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-group-in-winter-landscape-db0297-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family group standing together in a winter landscape.\"},\"db-0298\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-apples-in-autumn-woodland-db0298.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-apples-in-autumn-woodland-db0298-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child seated among apples in autumn woodland.\"},\"db-0299\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-in-yellow-blouse-db0299.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-in-yellow-blouse-db0299-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a yellow blouse posing against a green background.\"},\"db-0301\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-girl-cuddling-dog-in-autumn-woodland-db0301.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-girl-cuddling-dog-in-autumn-woodland-db0301-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl cuddling a dog among autumn leaves.\"},\"db-0302\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-girl-on-floral-carousel-portrait-set-db0302.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-girl-on-floral-carousel-portrait-set-db0302-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Girl with flowers posing beside a floral carousel horse.\"},\"db-0303\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-with-teddy-bears-in-rustic-studio-db0303.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-with-teddy-bears-in-rustic-studio-db0303-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby posed with teddy bears on a rustic studio set.\"},\"db-0304\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-girl-with-pumpkins-and-falling-leaves-db0304.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-girl-with-pumpkins-and-falling-leaves-db0304-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl sitting beside pumpkins in an autumn scene.\"},\"db-0305\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-and-white-horse-with-autumn-leaves-db0305.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-and-white-horse-with-autumn-leaves-db0305-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl standing beside a grazing white horse with falling autumn leaves.\"},\"db-0306\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-baby-on-christmas-studio-set-db0306.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-baby-on-christmas-studio-set-db0306-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a plaid outfit on a Christmas studio set.\"},\"db-0307\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-portrait-collage-db0307.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-portrait-collage-db0307-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Collage of sleeping newborn portraits with soft blankets and flowers.\"},\"db-0308\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-by-colorful-graffiti-db0308.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-portrait-by-colorful-graffiti-db0308-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young man leaning on a railing beside colorful graffiti.\"},\"db-0309\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-with-cow-on-rustic-farm-set-db0309.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-with-cow-on-rustic-farm-set-db0309-640.webp\",\"width\":875,\"height\":875,\"smallWidth\":640,\"alt\":\"Child beside a cow and hay bales on a rustic farm portrait set.\"},\"db-0310\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-with-dogs-on-country-path-db0310.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-with-dogs-on-country-path-db0310-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family group standing on a country path with their dogs.\"},\"db-0311\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-seated-on-railway-tracks-db0311.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-seated-on-railway-tracks-db0311-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple seated together on railway tracks in warm sunlight.\"},\"db-0312\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-in-hat-and-cream-dress-db0312.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-in-hat-and-cream-dress-db0312-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman posing in a hat and cream dress in a bright studio.\"},\"db-0313\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-in-pink-dress-with-white-horse-db0313.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-in-pink-dress-with-white-horse-db0313-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a pink dress standing beside a white horse.\"},\"db-0314\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-floral-white-horse-in-snow-db0314.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-floral-white-horse-in-snow-db0314-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl with a flower adorned white horse in a snowy scene.\"},\"db-0315\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-with-miniature-dollhouse-scene-db0315.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-with-miniature-dollhouse-scene-db0315-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Playful portrait of a child interacting with a miniature dollhouse scene.\"},\"db-0316\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-dog-portrait-by-rustic-blue-door-db0316.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-dog-portrait-by-rustic-blue-door-db0316-640.webp\",\"width\":1280,\"height\":1600,\"smallWidth\":512,\"alt\":\"Dog sitting beside a weathered blue door.\"},\"db-0317\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-in-green-toy-tractor-db0317.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-in-green-toy-tractor-db0317-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Smiling toddler seated in a green toy tractor outdoors.\"},\"db-0318\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-black-and-white-baby-with-floral-headband-db0318.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-black-and-white-baby-with-floral-headband-db0318-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white baby portrait with a floral headband.\"},\"db-0319\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-heart-shaped-basket-db0319.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-heart-shaped-basket-db0319-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a heart shaped basket beside a teddy bear.\"},\"db-0320\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-in-floral-headband-and-pink-skirt-db0320.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-in-floral-headband-and-pink-skirt-db0320-640.webp\",\"width\":800,\"height\":1000,\"smallWidth\":512,\"alt\":\"Baby seated in a pink skirt and floral headband.\"},\"db-0322\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-with-horses-in-autumn-field-db0322.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-with-horses-in-autumn-field-db0322-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family group posing with horses in an autumn field.\"},\"db-0323\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-swaddled-newborn-in-rustic-nest-db0323.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-swaddled-newborn-in-rustic-nest-db0323-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Swaddled newborn sleeping in a rustic woven nest.\"},\"db-0324\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-in-white-dress-and-veil-in-woodland-db0324.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-in-white-dress-and-veil-in-woodland-db0324-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a white dress and veil standing in sunlit woodland.\"},\"db-0325\":{\"src\":\"/assets/westmoreland-county-pa-professional-headshot-photography-professional-suit-portrait-collage-db0325.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-professional-headshot-photography-professional-suit-portrait-collage-db0325-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Color and black and white professional portraits of a man in a suit.\"},\"db-0327\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-in-pink-tulle-skirt-db0327.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-in-pink-tulle-skirt-db0327-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a pink tulle skirt and headband.\"},\"db-0328\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-white-horse-in-snow-db0328.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-white-horse-in-snow-db0328-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a blue coat riding a white horse in a snowy scene.\"},\"db-0329\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-woodland-tea-party-with-white-rabbit-db0329.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-woodland-tea-party-with-white-rabbit-db0329-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl at a fanciful woodland tea party beside a white rabbit.\"},\"db-0330\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-siblings-at-autumn-apple-stand-db0330.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-siblings-at-autumn-apple-stand-db0330-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children at an apple stand surrounded by autumn leaves.\"},\"db-0331\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-embracing-in-garden-db0331.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-embracing-in-garden-db0331-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride and groom embracing beneath a garden tree.\"},\"db-0332\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-parents-holding-newborn-in-bright-studio-db0332.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-parents-holding-newborn-in-bright-studio-db0332-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents holding their newborn in a bright studio portrait.\"},\"db-0333\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-portrait-on-halloween-skeleton-carriage-set-db0333.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-portrait-on-halloween-skeleton-carriage-set-db0333-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Portrait on a smoky Halloween set with a skeleton carriage.\"},\"db-0335\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-in-sunlit-evergreen-field-db0335.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-in-sunlit-evergreen-field-db0335-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Family posing together in a sunlit field of evergreen trees.\"},\"db-0337\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-dramatic-shadow-hands-db0337.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-dramatic-shadow-hands-db0337-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white theatrical portrait with a cloaked child and large shadow hands.\"},\"db-0338\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-on-celestial-crescent-moon-set-db0338.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-on-celestial-crescent-moon-set-db0338-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl seated on a crescent moon in a colorful celestial portrait set.\"},\"db-0339\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-with-vintage-carousel-horse-db0339.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-with-vintage-carousel-horse-db0339-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a pink dress beside a vintage carousel horse.\"},\"db-0340\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-three-women-in-studio-family-portrait-db0340.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-three-women-in-studio-family-portrait-db0340-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Three women smiling together against a dark studio backdrop.\"},\"db-0341\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-with-floral-hat-and-spring-flowers-db0341.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-with-floral-hat-and-spring-flowers-db0341-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby wearing a floral hat beside a vase of spring flowers.\"},\"db-0342\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-with-wedding-party-on-lawn-db0342.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-with-wedding-party-on-lawn-db0342-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and wedding party celebrating together on a lawn.\"},\"db-0343\":{\"src\":\"/assets/westmoreland-county-pa-boudoir-photography-studio-boudoir-portrait-in-black-lingerie-db0343.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-boudoir-photography-studio-boudoir-portrait-in-black-lingerie-db0343-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Adult woman posing in black lingerie in a bright studio.\"},\"db-0344\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-playing-in-glowing-meadow-db0344.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-playing-in-glowing-meadow-db0344-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children playing in a colorful meadow at sunset.\"},\"db-0345\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-and-painted-horse-at-sunset-db0345.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-and-painted-horse-at-sunset-db0345-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl standing with a decorated horse in golden sunset light.\"},\"db-0346\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-senior-portrait-by-green-vintage-truck-db0346.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-senior-portrait-by-green-vintage-truck-db0346-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman smiling beside a green vintage truck.\"},\"db-0347\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-crown-in-garden-db0347.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-crown-in-garden-db0347-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl wearing an ornate crown in a green garden.\"},\"db-0348\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-and-groom-beside-wedding-bus-db0348.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-and-groom-beside-wedding-bus-db0348-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom posing beside a wedding bus.\"},\"db-0349\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-dog-in-valentine-costume-db0349.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-dog-in-valentine-costume-db0349-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Dog wearing red heart glasses and a red tutu on a Valentine set.\"},\"db-0350\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-with-floral-headband-db0350.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-with-floral-headband-db0350-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a floral headband on soft bedding.\"},\"db-0351\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-with-sun-hat-and-flowers-db0351.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-senior-portrait-with-sun-hat-and-flowers-db0351-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a sun hat sitting beside flowering shrubs.\"},\"db-0352\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-pale-knit-hat-db0352.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-newborn-in-pale-knit-hat-db0352-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a pale knit hat against a gray backdrop.\"},\"db-0353\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-silhouetted-under-lit-umbrella-db0353.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-silhouetted-under-lit-umbrella-db0353-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple silhouetted beneath a glowing umbrella.\"},\"db-0354\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-black-and-white-parents-with-newborn-db0354.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-black-and-white-parents-with-newborn-db0354-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of parents cradling their newborn.\"},\"db-0355\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-bouquet-with-roses-and-pearls-db0355.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bridal-bouquet-with-roses-and-pearls-db0355-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bridal bouquet with roses beside a strand of pearls.\"},\"db-0356\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-cake-with-white-orchid-db0356.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-cake-with-white-orchid-db0356-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Close view of a turquoise wedding cake decorated with a white orchid.\"},\"db-0357\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-portrait-by-rustic-building-db0357.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-portrait-by-rustic-building-db0357-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple standing together beside a rustic wooden building.\"},\"db-0358\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-celebrating-on-lawn-db0358.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-celebrating-on-lawn-db0358-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Large wedding party celebrating outdoors on a lawn.\"},\"db-0359\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-apples-in-autumn-portrait-collage-db0359.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-with-apples-in-autumn-portrait-collage-db0359-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Collage of a girl holding apples in an autumn garden.\"},\"db-0360\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bridal-shoes-on-wooden-floor-db0360.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bridal-shoes-on-wooden-floor-db0360-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sparkling bridal shoes arranged on a wooden floor.\"},\"db-0361\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-standing-at-bright-window-db0361.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-standing-at-bright-window-db0361-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride in a lace gown standing beside a bright window.\"},\"db-0362\":{\"src\":\"/assets/pittsburgh-area-boudoir-photography-mirrored-boudoir-portrait-in-black-lace-db0362.webp\",\"smallSrc\":\"/assets/pittsburgh-area-boudoir-photography-mirrored-boudoir-portrait-in-black-lace-db0362-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Adult woman in black lace lingerie posed beside a mirror.\"},\"db-0363\":{\"src\":\"/assets/greensburg-pa-boudoir-photography-black-and-white-boudoir-portrait-diptych-db0363.webp\",\"smallSrc\":\"/assets/greensburg-pa-boudoir-photography-black-and-white-boudoir-portrait-diptych-db0363-640.webp\",\"width\":1600,\"height\":808,\"smallWidth\":640,\"alt\":\"Black and white boudoir portrait pair of an adult woman in an upholstered chair.\"},\"db-0364\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-in-bear-hat-on-honey-pot-db0364.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-in-bear-hat-on-honey-pot-db0364-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a bear hat posed on a honey pot prop.\"},\"db-0365\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-sports-portrait-by-green-door-db0365.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-senior-sports-portrait-by-green-door-db0365-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young man posing with sports equipment beside a green doorway.\"},\"db-0366\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-family-on-winter-sleigh-with-horse-db0366.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-family-on-winter-sleigh-with-horse-db0366-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family on a red sleigh beside a white horse in a snowy scene.\"},\"db-0367\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-newborn-in-pumpkin-hat-with-autumn-props-db0367.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-newborn-in-pumpkin-hat-with-autumn-props-db0367-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a pumpkin hat with autumn decorations.\"},\"db-0368\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bridal-preparations-and-dress-collage-db0368.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bridal-preparations-and-dress-collage-db0368-640.webp\",\"width\":889,\"height\":997,\"smallWidth\":571,\"alt\":\"Collage of bridal preparations, portraits and a wedding dress.\"},\"db-0369\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-among-willow-branches-db0369.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-among-willow-branches-db0369-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Girl holding leafy willow branches in a sunlit garden.\"},\"db-0370\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-embrace-with-bride-db0370.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-embrace-with-bride-db0370-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close view of a wedding guest embracing the bride.\"},\"db-0371\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-in-golden-woodland-light-db0371.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-in-golden-woodland-light-db0371-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in golden woodland light.\"},\"db-0372\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-kissing-on-garden-bridge-db0372.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-kissing-on-garden-bridge-db0372-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing on a garden bridge.\"},\"db-0373\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-with-vintage-car-db0373.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-with-vintage-car-db0373-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white wedding portrait with a vintage car.\"},\"db-0374\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-holding-red-apples-in-garden-db0374.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-holding-red-apples-in-garden-db0374-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl holding red apples in a softly lit garden.\"},\"db-0375\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-holiday-family-vintage-truck-db0375.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-holiday-family-vintage-truck-db0375-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family standing beside a green vintage pickup decorated for the holidays.\"},\"db-0376\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-globe-studio-db0376.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-globe-studio-db0376-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Seated baby in a blue shirt beside a globe against a wooden backdrop.\"},\"db-0377\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-apple-sign-db0377.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-apple-sign-db0377-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby sitting in grass with an apples sign and a red apple.\"},\"db-0378\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-child-hot-cocoa-stand-db0378.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-child-hot-cocoa-stand-db0378-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child at a rustic hot cocoa stand decorated with holiday greenery.\"},\"db-0379\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-vintage-child-floral-portrait-db0379.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-vintage-child-floral-portrait-db0379-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a vintage white dress and bonnet beside flowering branches.\"},\"db-0380\":{\"src\":\"/assets/pittsburgh-area-boudoir-photography-window-light-boudoir-diptych-db0380.webp\",\"smallSrc\":\"/assets/pittsburgh-area-boudoir-photography-window-light-boudoir-diptych-db0380-640.webp\",\"width\":1600,\"height\":808,\"smallWidth\":640,\"alt\":\"Two black and white boudoir portraits of an adult woman beside a window.\"},\"db-0381\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-artist-rustic-easel-db0381.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-artist-rustic-easel-db0381-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman holding a paintbrush beside a painting and weathered wooden wall.\"},\"db-0382\":{\"src\":\"/assets/westmoreland-county-pa-fashion-photography-black-gold-dress-diptych-db0382.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fashion-photography-black-gold-dress-diptych-db0382-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Studio portrait diptych of a woman in a black and gold dress.\"},\"db-0383\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-embrace-window-db0383.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-embrace-window-db0383-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride embracing a woman beside bright windows while holding her bouquet.\"},\"db-0384\":{\"src\":\"/assets/greensburg-pa-family-photography-family-rustic-tractor-db0384.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-rustic-tractor-db0384-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family posing beside a weathered red tractor in a wooded setting.\"},\"db-0385\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-white-dress-studio-db0385.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-white-dress-studio-db0385-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with folded arms wearing a pale dress against a soft studio backdrop.\"},\"db-0386\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-reading-butterfly-fantasy-db0386.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-reading-butterfly-fantasy-db0386-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Dreamlike portrait of a child reading an oversized book surrounded by butterflies.\"},\"db-0387\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-soft-light-embrace-db0387.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-soft-light-embrace-db0387-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing in softly glowing outdoor light.\"},\"db-0388\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-park-bench-db0388.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-park-bench-db0388-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom seated together on a park bench.\"},\"db-0389\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-autumn-lake-db0389.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-autumn-lake-db0389-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom holding hands beside a lake under autumn trees.\"},\"db-0390\":{\"src\":\"/assets/greensburg-pa-wedding-photography-groom-kissing-bride-temple-db0390.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-groom-kissing-bride-temple-db0390-640.webp\",\"width\":1600,\"height\":1066,\"smallWidth\":640,\"alt\":\"Groom kissing the bride's temple beside an outdoor columned walkway.\"},\"db-0391\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-baby-parent-shoulder-db0391.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-baby-parent-shoulder-db0391-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping baby resting on a parent's shoulder outdoors.\"},\"db-0392\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-dancer-beach-sunset-db0392.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-dancer-beach-sunset-db0392-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Dancer in a flowing pink dress leaping along a beach at sunset.\"},\"db-0393\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-church-altar-db0393.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-church-altar-db0393-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride and groom kissing before an ornate church altar.\"},\"db-0394\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-rainbow-tutu-grass-db0394.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-rainbow-tutu-grass-db0394-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby in a rainbow tutu sitting in grass with a colorful birthday prop.\"},\"db-0395\":{\"src\":\"/assets/pittsburgh-area-fashion-photography-pink-hat-fashion-diptych-db0395.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fashion-photography-pink-hat-fashion-diptych-db0395-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two studio portraits of a woman wearing a large pink hat and patterned dress.\"},\"db-0396\":{\"src\":\"/assets/greensburg-pa-pet-photography-dog-tiara-flower-studio-db0396.webp\",\"smallSrc\":\"/assets/greensburg-pa-pet-photography-dog-tiara-flower-studio-db0396-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Dog wearing a tiara and pink outfit surrounded by flowers.\"},\"db-0397\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-bear-costume-teddy-db0397.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-bear-costume-teddy-db0397-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a knitted bear outfit beside a teddy bear.\"},\"db-0398\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-story-collage-db0398.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-story-collage-db0398-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding collage showing the couple, bridal portraits, ceremony moments and rings.\"},\"db-0399\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-meadow-sunset-db0399.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-meadow-sunset-db0399-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom sitting together in a sunlit meadow.\"},\"db-0400\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-bar-stools-window-db0400.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-bar-stools-window-db0400-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride seated among tall bar stools beside bright windows.\"},\"db-0401\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-basketball-senior-brick-steps-db0401.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-basketball-senior-brick-steps-db0401-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young man seated on brick steps with a basketball.\"},\"db-0402\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-birdcage-veil-monochrome-db0402.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-birdcage-veil-monochrome-db0402-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Black and white bridal portrait with a birdcage veil.\"},\"db-0403\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-dance-reception-db0403.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-dance-reception-db0403-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride dancing with an older man during a wedding reception.\"},\"db-0404\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-studio-outfit-diptych-db0404.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-studio-outfit-diptych-db0404-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two studio portraits of a toddler in a sailor outfit and a pink shirt.\"},\"db-0405\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-wooden-staircase-db0405.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-wooden-staircase-db0405-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride seated on a wooden staircase holding a bright bouquet.\"},\"db-0406\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-ring-dark-surface-db0406.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-ring-dark-surface-db0406-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Diamond ring photographed on a dark reflective surface.\"},\"db-0407\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-fountain-db0407.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-fountain-db0407-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in front of a fountain.\"},\"db-0408\":{\"src\":\"/assets/greensburg-pa-family-photography-child-autumn-backlight-db0408.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-autumn-backlight-db0408-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Smiling child in a dark outfit and scarf against glowing autumn foliage.\"},\"db-0409\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-grass-golden-light-db0409.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-grass-golden-light-db0409-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple sitting close together on grass in golden evening light.\"},\"db-0410\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-santa-child-magic-book-db0410.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-santa-child-magic-book-db0410-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Santa and a child reading a glowing Christmas storybook beside a snowy window.\"},\"db-0411\":{\"src\":\"/assets/greensburg-pa-family-photography-extended-family-beach-db0411.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-extended-family-beach-db0411-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Large family posing on a beach by the ocean at sunset.\"},\"db-0412\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-bubble-exit-db0412.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-bubble-exit-db0412-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newlyweds walking through bubbles as guests celebrate outside.\"},\"db-0413\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-flower-girl-ceremony-aisle-db0413.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-flower-girl-ceremony-aisle-db0413-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Flower girl walking along the aisle during a wedding ceremony.\"},\"db-0414\":{\"src\":\"/assets/greensburg-pa-wedding-photography-ring-bearer-church-aisle-db0414.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-ring-bearer-church-aisle-db0414-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child carrying a wedding sign while walking down a church aisle.\"},\"db-0415\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-groom-carrying-bride-meadow-db0415.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-groom-carrying-bride-meadow-db0415-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Groom carrying the bride through tall meadow grass.\"},\"db-0416\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-wooden-footbridge-db0416.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-wooden-footbridge-db0416-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple seated together on a wooden footbridge over a pond.\"},\"db-0417\":{\"src\":\"/assets/greensburg-pa-family-photography-family-baby-woodland-db0417.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-baby-woodland-db0417-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents holding their baby for a woodland family portrait.\"},\"db-0418\":{\"src\":\"/assets/westmoreland-county-pa-fashion-photography-patterned-dress-hat-diptych-db0418.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fashion-photography-patterned-dress-hat-diptych-db0418-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Fashion diptych of a woman wearing a patterned dress and tan hat.\"},\"db-0419\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-snow-kiss-db0419.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-snow-kiss-db0419-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Bride and groom kissing outdoors beneath snow-covered branches.\"},\"db-0421\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-woman-dog-golden-meadow-db0421.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-woman-dog-golden-meadow-db0421-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Woman crouching in a sunlit meadow as a black dog reaches toward her.\"},\"db-0422\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-baby-holiday-studio-diptych-db0422.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-baby-holiday-studio-diptych-db0422-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two baby portraits with Christmas ornaments, a tree and a toy soldier.\"},\"db-0423\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-veil-yellow-flower-db0423.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-veil-yellow-flower-db0423-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child wearing a white dress and veil while holding a yellow flower.\"},\"db-0424\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-pink-flower-studio-db0424.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-pink-flower-studio-db0424-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby wearing a pink flower headband beside a plush toy.\"},\"db-0425\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-christmas-tree-farm-db0425.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-christmas-tree-farm-db0425-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated together among evergreen trees.\"},\"db-0426\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-knit-sweater-outdoors-db0426.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-knit-sweater-outdoors-db0426-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling toddler standing outdoors in a cable-knit sweater.\"},\"db-0427\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-man-car-night-monochrome-db0427.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-man-car-night-monochrome-db0427-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a young man beside a car with illuminated headlights.\"},\"db-0428\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-purple-elephant-costume-db0428.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-purple-elephant-costume-db0428-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a purple elephant outfit and small crown.\"},\"db-0429\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-first-birthday-purple-cake-db0429.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-first-birthday-purple-cake-db0429-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a purple dress beside balloons, a birthday cake and a number one.\"},\"db-0430\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-horse-american-flags-db0430.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-horse-american-flags-db0430-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children posing with a white horse and small American flags.\"},\"db-0431\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-birthday-cake-smash-collage-db0431.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-birthday-cake-smash-collage-db0431-640.webp\",\"width\":1317,\"height\":900,\"smallWidth\":640,\"alt\":\"Collage of a baby's first birthday cake smash with colorful balloons.\"},\"db-0432\":{\"src\":\"/assets/greensburg-pa-family-photography-mother-children-feeding-cow-db0432.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-mother-children-feeding-cow-db0432-640.webp\",\"width\":868,\"height\":867,\"smallWidth\":640,\"alt\":\"Woman and two children feeding a black and white cow outdoors.\"},\"db-0433\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-living-room-sofa-db0433.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-living-room-sofa-db0433-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family seated together on a sofa in a richly decorated living room.\"},\"db-0434\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-kiss-autumn-woods-db0434.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-kiss-autumn-woods-db0434-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing in an autumn woodland.\"},\"db-0435\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-hands-monochrome-db0435.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-hands-monochrome-db0435-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a curled sleeping newborn supported by adult hands.\"},\"db-0436\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-princess-horse-tea-db0436.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-princess-horse-tea-db0436-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a blue princess dress at a tiny table beside a white horse.\"},\"db-0437\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-tutu-log-monochrome-db0437.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-tutu-log-monochrome-db0437-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a smiling child in a tutu seated on a log.\"},\"db-0438\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-young-man-beach-rocks-db0438.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-young-man-beach-rocks-db0438-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young man seated on rocks beside the beach in warm evening light.\"},\"db-0439\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-cowboy-hat-doorway-db0439.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-cowboy-hat-doorway-db0439-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman wearing a cowboy hat and denim shorts beside large wooden doors.\"},\"db-0440\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bridal-reflection-monochrome-db0440.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bridal-reflection-monochrome-db0440-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Black and white reflection of a bride in a mirror near a doorway.\"},\"db-0441\":{\"src\":\"/assets/greensburg-pa-family-photography-child-scarf-autumn-portrait-db0441.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-scarf-autumn-portrait-db0441-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling child wearing a scarf in warm autumn light.\"},\"db-0442\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-woodland-studio-set-db0442.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-woodland-studio-set-db0442-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Child seated among flowers and rustic props in an enchanted woodland studio set.\"},\"db-0443\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-dog-garden-walk-db0443.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-dog-garden-walk-db0443-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple walking their dog along a garden path.\"},\"db-0444\":{\"src\":\"/assets/greensburg-pa-wedding-photography-groomsmen-church-window-db0444.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-groomsmen-church-window-db0444-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two men in suits and boutonnieres standing together inside a church.\"},\"db-0445\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-dramatic-sky-db0445.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-dramatic-sky-db0445-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in open countryside beneath a dramatic sky.\"},\"db-0446\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-feet-wedding-rings-db0446.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-feet-wedding-rings-db0446-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close-up of a baby's feet with rings balanced on the toes.\"},\"db-0447\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-party-reception-bar-db0447.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-party-reception-bar-db0447-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding guests and attendants talking together near a reception bar.\"},\"db-0448\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-eyelashes-closeup-db0448.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-eyelashes-closeup-db0448-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close-up of a baby's face and eyelashes.\"},\"db-0449\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-floral-woodland-studio-db0449.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-floral-woodland-studio-db0449-640.webp\",\"width\":1000,\"height\":1500,\"smallWidth\":427,\"alt\":\"Child in a floral dress seated amid flowers in a woodland studio setting.\"},\"db-0450\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-ornate-rotunda-db0450.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-ornate-rotunda-db0450-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple kissing beneath an ornate circular ceiling and stone balcony.\"},\"db-0451\":{\"src\":\"/assets/westmoreland-county-pa-pet-photography-blue-eyed-cat-portrait-db0451.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-pet-photography-blue-eyed-cat-portrait-db0451-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Long-haired cat with bright blue eyes against a dark background.\"},\"db-0452\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-pink-dress-closeup-db0452.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-pink-dress-closeup-db0452-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close portrait of a child looking down while wearing a pink dress.\"},\"db-0453\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-floral-dress-planters-db0453.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-floral-dress-planters-db0453-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler in a floral dress seated beside flowering window boxes.\"},\"db-0454\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-rose-petal-backdrop-db0454.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-rose-petal-backdrop-db0454-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby in a white outfit lying amid scattered pink rose petals.\"},\"db-0455\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-floral-dress-chair-db0455.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-young-woman-floral-dress-chair-db0455-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a floral dress seated on an ornate chair outdoors.\"},\"db-0456\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-fairy-pink-dress-db0456.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-fairy-pink-dress-db0456-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child wearing fairy wings and a flowing pink dress in a sunlit field.\"},\"db-0457\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-vintage-suitcase-teddy-db0457.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-vintage-suitcase-teddy-db0457-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby in a vintage suitcase with a teddy bear and pearls.\"},\"db-0458\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-siblings-christmas-newborn-db0458.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-siblings-christmas-newborn-db0458-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child seated beside a sleeping newborn with teddy bears and Christmas decorations.\"},\"db-0459\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-bridal-veil-studio-db0459.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-bridal-veil-studio-db0459-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a white dress and veil posing against a textured studio backdrop.\"},\"db-0460\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-reclining-portrait-db0460.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-young-woman-reclining-portrait-db0460-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman smiling while reclining against a dark wooden background.\"},\"db-0461\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-baby-holiday-outfit-rustic-studio-db0461.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-baby-holiday-outfit-rustic-studio-db0461-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a festive outfit seated in a rustic studio with a teddy bear.\"},\"db-0462\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-party-outdoor-portrait-db0462.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-party-outdoor-portrait-db0462-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding party posing outdoors with the bride and groom.\"},\"db-0463\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-vintage-pram-db0463.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-vintage-pram-db0463-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Sleeping newborn in a vintage pram draped with a pink blanket.\"},\"db-0464\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-dog-patriotic-studio-db0464.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-dog-patriotic-studio-db0464-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby seated in a basket beside a dog with an American flag backdrop.\"},\"db-0465\":{\"src\":\"/assets/greensburg-pa-wedding-photography-newlyweds-vintage-sofa-meadow-db0465.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-newlyweds-vintage-sofa-meadow-db0465-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom seated on a vintage sofa in a meadow.\"},\"db-0466\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-evergreen-tree-portrait-db0466.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-evergreen-tree-portrait-db0466-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Couple embracing among evergreen trees in soft sunlight.\"},\"db-0467\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-western-hats-outdoors-db0467.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-western-hats-outdoors-db0467-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple wearing Western hats and posing together outdoors.\"},\"db-0468\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-rings-rose-bouquet-db0468.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-rings-rose-bouquet-db0468-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding rings nestled inside a pale rose in a bouquet.\"},\"db-0469\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-child-valentine-rose-petals-db0469.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-child-valentine-rose-petals-db0469-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child blowing a kiss with red rose petals and Valentine decorations.\"},\"db-0470\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-mother-newborn-dark-portrait-db0470.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-mother-newborn-dark-portrait-db0470-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Mother cradling her sleeping newborn against a dark background.\"},\"db-0471\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-details-monochrome-collage-db0471.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-details-monochrome-collage-db0471-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Black and white collage of a newborn's face, feet, hand and ear.\"},\"db-0472\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-sunset-railing-db0472.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-sunset-railing-db0472-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing beside a railing at sunset.\"},\"db-0473\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-passing-train-db0473.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-passing-train-db0473-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom standing together beside a moving train.\"},\"db-0474\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-kiss-woodland-monochrome-db0474.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-kiss-woodland-monochrome-db0474-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Black and white portrait of a bride and groom kissing in a woodland clearing.\"},\"db-0475\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-family-beach-dune-fence-db0475.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-family-beach-dune-fence-db0475-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family seated together on sand beside a dune fence.\"},\"db-0476\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-silhouette-db0476.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-silhouette-db0476-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Silhouetted couple holding hands against a glowing evening sky.\"},\"db-0477\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-twins-floral-nest-db0477.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-newborn-twins-floral-nest-db0477-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two sleeping newborns curled together in a nest surrounded by dried flowers.\"},\"db-0478\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-angel-wings-golden-light-db0478.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-angel-wings-golden-light-db0478-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn posed with white feathered angel wings in warm light.\"},\"db-0479\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-siblings-swaddled-newborn-db0479.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-siblings-swaddled-newborn-db0479-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child lying beside and embracing a swaddled sleeping newborn.\"},\"db-0481\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-countryside-clouds-db0481.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-countryside-clouds-db0481-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in a field beneath dramatic clouds.\"},\"db-0482\":{\"src\":\"/assets/pittsburgh-area-fashion-photography-pink-hat-sunglasses-diptych-db0482.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fashion-photography-pink-hat-sunglasses-diptych-db0482-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Fashion diptych of a woman wearing a pink hat, sunglasses and patterned dress.\"},\"db-0483\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-grand-staircase-db0483.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-grand-staircase-db0483-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom standing on an ornate indoor staircase.\"},\"db-0485\":{\"src\":\"/assets/pittsburgh-area-family-photography-father-lifting-child-outdoors-db0485.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-father-lifting-child-outdoors-db0485-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Father lifting a smiling child into the air beside a tree.\"},\"db-0486\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-knit-outfit-db0486.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-knit-outfit-db0486-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a pale knitted outfit on a soft blanket.\"},\"db-0487\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-mother-baby-monochrome-studio-db0487.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-mother-baby-monochrome-studio-db0487-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a mother holding her sleeping baby.\"},\"db-0488\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-dog-floral-studio-db0488.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-dog-floral-studio-db0488-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated with a small dog against a lush floral studio backdrop.\"},\"db-0489\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-child-holiday-vintage-truck-db0489.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-child-holiday-vintage-truck-db0489-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Smiling child leaning from the window of a green truck decorated for Christmas.\"},\"db-0490\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-family-feet-newborn-detail-db0490.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-family-feet-newborn-detail-db0490-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white close-up of a baby's feet resting between adult feet.\"},\"db-0491\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-wildflower-meadow-db0491.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-wildflower-meadow-db0491-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children smiling together in a meadow of tall grass and wildflowers.\"},\"db-0492\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-child-christmas-window-sleigh-db0492.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-child-christmas-window-sleigh-db0492-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child looking through a snowy window toward a magical Santa sleigh.\"},\"db-0493\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-knit-bunny-blanket-db0493.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-knit-bunny-blanket-db0493-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a knitted bonnet and holding a small stuffed toy.\"},\"db-0494\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-columned-building-db0494.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-columned-building-db0494-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom seated closely beside a stone columned building.\"},\"db-0495\":{\"src\":\"/assets/greensburg-pa-family-photography-child-feeding-goat-garden-db0495.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-child-feeding-goat-garden-db0495-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling child feeding a small goat beside a garden bench.\"},\"db-0496\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-holiday-baking-db0496.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-holiday-baking-db0496-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family preparing holiday treats together at a kitchen table.\"},\"db-0497\":{\"src\":\"/assets/pittsburgh-area-family-photography-father-baby-lift-monochrome-db0497.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-father-baby-lift-monochrome-db0497-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black and white portrait of a father lifting his baby into the air.\"},\"db-0498\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-flower-garden-db0498.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-flower-garden-db0498-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom embracing in a colorful flower garden.\"},\"db-0499\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-fairytale-princess-db0499.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-fairytale-princess-db0499-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children meeting a woman in a blue fairytale princess gown outdoors.\"},\"db-0500\":{\"src\":\"/assets/pittsburgh-area-pet-photography-blue-eyed-longhaired-cat-db0500.webp\",\"smallSrc\":\"/assets/pittsburgh-area-pet-photography-blue-eyed-longhaired-cat-db0500-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Longhaired cat with blue eyes against a soft gray background.\"},\"db-0501\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-winter-hot-cocoa-toddler-db0501.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-winter-hot-cocoa-toddler-db0501-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler holding a teddy bear at a festive hot cocoa stand in the snow.\"},\"db-0502\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-splashing-sunset-puddle-db0502.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-splashing-sunset-puddle-db0502-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children holding hands and splashing in a puddle in warm woodland light.\"},\"db-0503\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-son-porch-db0503.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-maternity-son-porch-db0503-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Maternity portrait with a child beside a wooden porch and flowering tree.\"},\"db-0504\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-smiling-baby-blue-cap-db0504.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-smiling-baby-blue-cap-db0504-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby wearing a blue cap on a fluffy blanket.\"},\"db-0505\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-cheerleader-megaphone-studio-db0505.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-cheerleader-megaphone-studio-db0505-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Young woman posing with a red cheerleading megaphone and pom-poms.\"},\"db-0507\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-window-light-maternity-diptych-db0507.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-window-light-maternity-diptych-db0507-640.webp\",\"width\":1600,\"height\":1280,\"smallWidth\":640,\"alt\":\"Black-and-white maternity portraits with children beside a bright window.\"},\"db-0508\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-purple-ruffled-bonnet-db0508.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-purple-ruffled-bonnet-db0508-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby wearing a purple ruffled bonnet on a cream blanket.\"},\"db-0509\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-child-holding-lamb-db0509.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-child-holding-lamb-db0509-640.webp\",\"width\":960,\"height\":960,\"smallWidth\":640,\"alt\":\"Child seated in a studio holding a black-and-white lamb.\"},\"db-0510\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-pastel-dress-vintage-pram-db0510.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-pastel-dress-vintage-pram-db0510-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a pastel dress beside a vintage pram with a lamb in a woodland scene.\"},\"db-0511\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-siblings-floral-garden-diptych-db0511.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-siblings-floral-garden-diptych-db0511-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two portraits of smiling children against a flowering garden background.\"},\"db-0512\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-pink-balloon-diptych-db0512.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-pink-balloon-diptych-db0512-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in pink birthday outfits posing with balloons in a studio diptych.\"},\"db-0513\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-pink-dress-lollipop-milkshake-db0513.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-pink-dress-lollipop-milkshake-db0513-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in a pink dress holding a lollipop and milkshake beside a draped tent.\"},\"db-0514\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-christmas-newborn-two-dogs-db0514.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-christmas-newborn-two-dogs-db0514-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a Santa hat between two white dogs with Christmas lights.\"},\"db-0515\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-train-platform-db0515.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-train-platform-db0515-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple holding hands beside railway tracks in warm evening light.\"},\"db-0516\":{\"src\":\"/assets/greensburg-pa-family-photography-children-rustic-window-frames-db0516.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-children-rustic-window-frames-db0516-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children looking at each other through openings in a rustic wooden wall.\"},\"db-0517\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-sunset-couple-lift-silhouette-db0517.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-sunset-couple-lift-silhouette-db0517-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Silhouette of a couple embracing with one partner lifted against a golden sunset.\"},\"db-0518\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-family-hands-maternity-detail-db0518.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-family-hands-maternity-detail-db0518-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white close-up of family hands resting on a pregnant belly.\"},\"db-0519\":{\"src\":\"/assets/greensburg-pa-family-photography-mother-children-floral-swing-db0519.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-mother-children-floral-swing-db0519-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Woman and three children seated on a flower-covered circular swing beneath leafy branches.\"},\"db-0520\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-red-polka-dot-costume-diptych-db0520.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-red-polka-dot-costume-diptych-db0520-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two portraits of a toddler in a red-and-black polka-dot costume with mouse ears.\"},\"db-0521\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-white-veil-closeup-db0521.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-white-veil-closeup-db0521-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up studio portrait of a girl in a white dress and veil.\"},\"db-0522\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-gray-diptych-db0522.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-gray-diptych-db0522-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Two close-up portraits of a sleeping newborn on gray fabric.\"},\"db-0523\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-twins-superhero-knit-db0523.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-twins-superhero-knit-db0523-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn twins wearing colorful superhero-inspired knit hats on comic books.\"},\"db-0525\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-white-wrap-db0525.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-sleeping-newborn-white-wrap-db0525-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn with hands beside the face in a white wrap.\"},\"db-0526\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-vintage-car-monochrome-db0526.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-vintage-car-monochrome-db0526-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white wedding portrait of a couple kissing beside a vintage car.\"},\"db-0527\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-family-stacked-studio-newborn-db0527.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-family-stacked-studio-newborn-db0527-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Studio family portrait with a child holding a sleeping newborn above two reclining adults.\"},\"db-0528\":{\"src\":\"/assets/greensburg-pa-boudoir-photography-black-lace-boudoir-collage-db0528.webp\",\"smallSrc\":\"/assets/greensburg-pa-boudoir-photography-black-lace-boudoir-collage-db0528-640.webp\",\"width\":1600,\"height\":808,\"smallWidth\":640,\"alt\":\"Four adult boudoir portraits in black lace lingerie and a white robe.\"},\"db-0529\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-siblings-beach-cheek-kiss-db0529.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-siblings-beach-cheek-kiss-db0529-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated on sand with one kissing the other on the cheek.\"},\"db-0530\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-jumping-autumn-pond-db0530.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-jumping-autumn-pond-db0530-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children jumping with raised arms beside a pond in autumn.\"},\"db-0531\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-jeweled-headband-outdoors-db0531.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-jeweled-headband-outdoors-db0531-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling girl in a white dress and jeweled headband against a green background.\"},\"db-0532\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-santa-christmas-baking-db0532.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-santa-christmas-baking-db0532-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children mixing batter with Santa in a festive baking scene.\"},\"db-0533\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-forehead-kiss-garden-db0533.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-forehead-kiss-garden-db0533-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple holding hands as one kisses the other on the forehead in a garden.\"},\"db-0534\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-family-winter-sleigh-white-horse-db0534.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-family-winter-sleigh-white-horse-db0534-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family posing with a red holiday sleigh and white horse in the snow.\"},\"db-0535\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-child-church-pew-db0535.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-child-church-pew-db0535-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sepia wedding portrait of a bride holding hands with a child beside church pews.\"},\"db-0536\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-blue-cake-db0536.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-first-birthday-blue-cake-db0536-640.webp\",\"width\":1600,\"height\":1061,\"smallWidth\":640,\"alt\":\"Baby wearing a gray hat and blue first-birthday shirt beside a cake.\"},\"db-0537\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-pink-floral-knit-hat-db0537.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-pink-floral-knit-hat-db0537-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Softly lit close-up of a child wearing a pink floral knit hat.\"},\"db-0538\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-siblings-cradling-newborn-monochrome-db0538.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-siblings-cradling-newborn-monochrome-db0538-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of two children cradling a swaddled newborn on a bed.\"},\"db-0539\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-parent-hand-monochrome-diptych-db0539.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-parent-hand-monochrome-diptych-db0539-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white diptych of a newborn holding an adult finger and sleeping in a wrap.\"},\"db-0540\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-petting-cow-golden-meadow-db0540.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-petting-cow-golden-meadow-db0540-640.webp\",\"width\":960,\"height\":960,\"smallWidth\":640,\"alt\":\"Child petting a grazing black-and-white cow in golden meadow light.\"},\"db-0541\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-twirling-pink-tutu-db0541.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-twirling-pink-tutu-db0541-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child twirling in a pink tutu with hair flowing in golden evening light.\"},\"db-0543\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-children-christmas-sleigh-horse-db0543.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-children-christmas-sleigh-horse-db0543-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated on a red holiday sleigh beside a white horse in the snow.\"},\"db-0544\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-rainbow-first-birthday-collage-db0544.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-rainbow-first-birthday-collage-db0544-640.webp\",\"width\":1317,\"height\":900,\"smallWidth\":640,\"alt\":\"First-birthday collage with a baby, colorful balloons, and a rainbow cake.\"},\"db-0545\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-four-autumn-pond-db0545.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-four-autumn-pond-db0545-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family of four holding hands beside a pond with autumn trees.\"},\"db-0546\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-family-hot-cocoa-christmas-db0546.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-family-hot-cocoa-christmas-db0546-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family sitting together with mugs beside a holiday hot cocoa stand.\"},\"db-0547\":{\"src\":\"/assets/westmoreland-county-pa-business-brand-photography-desk-coffee-laptop-lifestyle-db0547.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-business-brand-photography-desk-coffee-laptop-lifestyle-db0547-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Hands holding a coffee mug at a white desk with a laptop, flowers, and framed artwork.\"},\"db-0548\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-pine-tree-portrait-db0548.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-pine-tree-portrait-db0548-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple smiling at each other between rows of sunlit pine trees.\"},\"db-0549\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-engagement-ring-autumn-leaf-db0549.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-engagement-ring-autumn-leaf-db0549-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple holding an autumn leaf with an engagement ring resting on it.\"},\"db-0550\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-white-wrap-overhead-db0550.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-white-wrap-overhead-db0550-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wrapped in white fabric on a gray blanket.\"},\"db-0551\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-white-doves-pastel-db0551.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-white-doves-pastel-db0551-640.webp\",\"width\":1319,\"height\":1265,\"smallWidth\":640,\"alt\":\"Girl in a white dress with white doves in a soft pastel scene.\"},\"db-0552\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-children-crescent-moon-clouds-db0552.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-children-crescent-moon-clouds-db0552-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children sitting on a crescent moon amid colorful clouds and stars.\"},\"db-0553\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-child-holiday-white-horse-db0553.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-child-holiday-white-horse-db0553-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Child wearing a dark cape beside a decorated white horse in the snow.\"},\"db-0554\":{\"src\":\"/assets/pittsburgh-area-pet-photography-dog-milkshake-dessert-counter-db0554.webp\",\"smallSrc\":\"/assets/pittsburgh-area-pet-photography-dog-milkshake-dessert-counter-db0554-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Small dog peeking over a counter beside a milkshake and dessert.\"},\"db-0555\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-children-candy-garden-db0555.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-children-candy-garden-db0555-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children holding colorful sweets beside a garden tent.\"},\"db-0556\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-pink-dress-white-horse-db0556.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-girl-pink-dress-white-horse-db0556-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a pink dress standing nose to nose with a white horse.\"},\"db-0557\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-blanket-monochrome-db0557.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-blanket-monochrome-db0557-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of a baby beneath a blanket.\"},\"db-0558\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-first-birthday-cupcake-db0558.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-first-birthday-cupcake-db0558-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby wearing pink accessories beside a birthday cake and cupcake prop.\"},\"db-0559\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-baby-purple-flower-db0559.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-sleeping-baby-purple-flower-db0559-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping baby with a purple flower headband resting on a pink blanket.\"},\"db-0560\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-ornate-gazebo-db0560.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-ornate-gazebo-db0560-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sepia wedding portrait of a couple inside an ornate iron gazebo.\"},\"db-0561\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-hands-face-monochrome-db0561.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-hands-face-monochrome-db0561-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of a smiling girl holding her hands to her face.\"},\"db-0562\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-ivory-wedding-cake-pink-roses-db0562.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-ivory-wedding-cake-pink-roses-db0562-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Tiered ivory wedding cake decorated with pale pink roses.\"},\"db-0563\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-seashell-sunset-beach-db0563.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-baby-seashell-sunset-beach-db0563-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby sitting in a large shell prop beside the sea at sunset.\"},\"db-0564\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-sunflower-field-black-dress-db0564.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-sunflower-field-black-dress-db0564-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a black dress posing among tall sunflowers.\"},\"db-0565\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-white-hat-stone-wall-db0565.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-white-hat-stone-wall-db0565-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman wearing a white hat and casual clothes beside a stone wall.\"},\"db-0566\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-garden-dance-db0566.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-garden-dance-db0566-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple holding hands and turning toward each other on a green lawn.\"},\"db-0567\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-cake-closeup-db0567.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-cake-closeup-db0567-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of a toddler eating cake with frosting on the face.\"},\"db-0568\":{\"src\":\"/assets/westmoreland-county-pa-food-photography-turquoise-orchid-tiered-cake-db0568.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-food-photography-turquoise-orchid-tiered-cake-db0568-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Tall turquoise and white decorated cake with white orchid flowers.\"},\"db-0569\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-expectant-couple-blue-dress-db0569.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-expectant-couple-blue-dress-db0569-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Expectant couple touching foreheads and resting hands on a pregnant belly outdoors.\"},\"db-0570\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-kiss-flower-garden-db0570.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-kiss-flower-garden-db0570-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple kissing while seated beside vibrant garden flowers.\"},\"db-0571\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-mother-kissing-baby-garden-db0571.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-mother-kissing-baby-garden-db0571-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman kissing a smiling baby in a garden.\"},\"db-0572\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-autumn-leaves-db0572.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-autumn-leaves-db0572-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family posed together among colorful autumn leaves.\"},\"db-0573\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-blowing-dandelion-db0573.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-blowing-dandelion-db0573-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl blowing seeds from a dandelion in a sunlit meadow.\"},\"db-0575\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-flowering-tree-db0575.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-flowering-tree-db0575-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Wedding couple standing beneath a flowering tree.\"},\"db-0576\":{\"src\":\"/assets/greensburg-pa-wedding-photography-winter-wedding-snow-sunlight-db0576.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-winter-wedding-snow-sunlight-db0576-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple walking through snowy woodland in golden sunlight.\"},\"db-0577\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-rings-sunflower-bouquet-db0577.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-rings-sunflower-bouquet-db0577-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of wedding rings on hands resting over a sunflower bouquet.\"},\"db-0578\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-three-grass-db0578.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-three-grass-db0578-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family of three seated together on green grass.\"},\"db-0580\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-angel-child-white-horse-db0580.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-angel-child-white-horse-db0580-640.webp\",\"width\":1600,\"height\":1280,\"smallWidth\":640,\"alt\":\"Girl wearing white angel wings leaning across a white horse decorated with flowers.\"},\"db-0581\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-vintage-car-db0581.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-vintage-car-db0581-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple standing beside a black vintage car.\"},\"db-0582\":{\"src\":\"/assets/greensburg-pa-wedding-photography-rustic-wedding-detail-collage-db0582.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-rustic-wedding-detail-collage-db0582-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding collage with bouquet details, a hanging dress, and the wedding couple.\"},\"db-0583\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-siblings-pumpkin-autumn-porch-db0583.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-siblings-pumpkin-autumn-porch-db0583-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children seated on porch steps with a pumpkin and autumn props.\"},\"db-0584\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-garden-swing-db0584.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-garden-swing-db0584-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling child in denim overalls riding a garden swing.\"},\"db-0585\":{\"src\":\"/assets/greensburg-pa-family-photography-family-field-sunset-db0585.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-field-sunset-db0585-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family seated and standing together on a grassy hillside at sunset.\"},\"db-0586\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-ballet-shoes-db0586.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-ballet-shoes-db0586-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn with a pink flower headband and tiny pink ballet shoes.\"},\"db-0587\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-dress-sunlit-door-db0587.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-dress-sunlit-door-db0587-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding dress hanging in front of a bright glass-paneled door.\"},\"db-0588\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-church-pews-db0588.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-church-pews-db0588-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding guests and attendants standing beside church pews.\"},\"db-0589\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-preparations-sepia-db0589.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-preparations-sepia-db0589-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Sepia portrait of a seated bride smiling during wedding preparations.\"},\"db-0590\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-wooden-fence-db0590.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-wooden-fence-db0590-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling toddler standing behind a weathered wooden fence.\"},\"db-0591\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-pink-formal-gown-dance-floor-db0591.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-pink-formal-gown-dance-floor-db0591-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young woman in a pink formal gown posing on a dance floor.\"},\"db-0592\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-bridge-sepia-db0592.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-bridge-sepia-db0592-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sepia portrait of a wedding couple kissing on a small bridge.\"},\"db-0593\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-sister-holding-swaddled-newborn-db0593.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-sister-holding-swaddled-newborn-db0593-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Smiling girl holding a sleeping swaddled newborn in a studio portrait.\"},\"db-0595\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-city-skyline-db0595.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-kiss-city-skyline-db0595-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white wedding portrait of a couple kissing with a city skyline behind them.\"},\"db-0597\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-dress-ocean-db0597.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-dress-ocean-db0597-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a white dress standing at the edge of the ocean.\"},\"db-0598\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-bow-white-hat-db0598.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-pink-bow-white-hat-db0598-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn wearing a white hat with a large pink bow.\"},\"db-0599\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-red-wagon-meadow-db0599.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-red-wagon-meadow-db0599-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling toddler sitting with a red toy wagon in a sunlit meadow.\"},\"db-0600\":{\"src\":\"/assets/greensburg-pa-wedding-photography-pink-rose-bridal-bouquet-db0600.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-pink-rose-bridal-bouquet-db0600-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Close-up of a bridal bouquet with pink roses and small white flowers.\"},\"db-0601\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-siblings-rustic-fence-path-db0601.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-siblings-rustic-fence-path-db0601-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two children smiling beside a rustic wooden fence on a brick path.\"},\"db-0602\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-miniature-steam-train-db0602.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-miniature-steam-train-db0602-640.webp\",\"width\":1600,\"height\":1200,\"smallWidth\":640,\"alt\":\"Two children riding a miniature steam locomotive in a whimsical railway scene.\"},\"db-0603\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-family-winter-games-picnic-db0603.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-family-winter-games-picnic-db0603-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family sitting on a blanket outdoors with board games and warm winter clothing.\"},\"db-0604\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-embrace-gazebo-sunset-db0604.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-embrace-gazebo-sunset-db0604-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing beside a gazebo in warm sunset light.\"},\"db-0605\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-wooden-pergola-db0605.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-wooden-pergola-db0605-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing along a wooden pergola walkway.\"},\"db-0606\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-violin-pickup-truck-db0606.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-violin-pickup-truck-db0606-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride in a wedding dress playing a violin while sitting on a pickup truck.\"},\"db-0607\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-sitting-nursery-crib-db0607.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-sitting-nursery-crib-db0607-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby sitting in a crib in a softly lit nursery.\"},\"db-0608\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-wicker-basket-outdoors-db0608.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-newborn-wicker-basket-outdoors-db0608-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sleeping newborn in a wicker basket on grass with a lace blanket.\"},\"db-0609\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-baby-bunny-duckling-spring-db0609.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-baby-bunny-duckling-spring-db0609-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in a floral dress seated beside a white rabbit and ducklings.\"},\"db-0610\":{\"src\":\"/assets/westmoreland-county-pa-professional-headshot-photography-smiling-woman-red-chair-db0610.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-professional-headshot-photography-smiling-woman-red-chair-db0610-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling woman resting her arms on a red studio chair.\"},\"db-0611\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-blue-dress-garden-path-db0611.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-blue-dress-garden-path-db0611-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a blue dress standing on a garden path between flower beds.\"},\"db-0612\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-dove-monochrome-db0612.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girl-white-dove-monochrome-db0612-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of a girl in a tutu holding a white dove.\"},\"db-0613\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-hot-cocoa-snow-db0613.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-children-hot-cocoa-snow-db0613-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Two children at a decorated hot cocoa stand in a snowy scene.\"},\"db-0614\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-young-man-brick-wall-db0614.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-young-man-brick-wall-db0614-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Young man in a white shirt seated in front of a brick wall.\"},\"db-0615\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-embrace-church-db0615.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-guests-embrace-church-db0615-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding guests embracing and smiling beside church pews.\"},\"db-0617\":{\"src\":\"/assets/pittsburgh-area-product-photography-framed-child-portrait-nursery-db0617.webp\",\"smallSrc\":\"/assets/pittsburgh-area-product-photography-framed-child-portrait-nursery-db0617-640.webp\",\"width\":1600,\"height\":1189,\"smallWidth\":640,\"alt\":\"Large framed child portrait displayed above a small pink bed in a nursery.\"},\"db-0618\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-girls-white-horse-sunset-db0618.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-girls-white-horse-sunset-db0618-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two girls in light dresses posing with a white horse at sunset.\"},\"db-0619\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-twins-touching-monochrome-db0619.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-twins-touching-monochrome-db0619-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white close-up of sleeping newborn twins facing each other.\"},\"db-0620\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-floral-swing-outdoors-db0620.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-girl-floral-swing-outdoors-db0620-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Girl in a pink dress sitting on a white swing surrounded by flowers.\"},\"db-0621\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-mother-lifting-baby-monochrome-db0621.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-mother-lifting-baby-monochrome-db0621-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Black-and-white portrait of a woman lifting a smiling baby outdoors.\"},\"db-0622\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-church-diptych-db0622.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-church-diptych-db0622-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding diptych with a close-up couple portrait and a ceremony interior.\"},\"db-0623\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-rustic-barn-db0623.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-holding-hands-rustic-barn-db0623-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple holding hands beside a rustic wooden barn in evening light.\"},\"db-0624\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-rustic-barn-sepia-db0624.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-rustic-barn-sepia-db0624-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Sepia portrait of a bride standing beside a large rustic wooden barn.\"},\"db-0625\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-child-teddy-bear-garden-picnic-db0625.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-child-teddy-bear-garden-picnic-db0625-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child teddy bear garden picnic.\"},\"db-0626\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-reflection-in-gold-mirror-db0626.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-reflection-in-gold-mirror-db0626-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride reflection in gold mirror.\"},\"db-0627\":{\"src\":\"/assets/greensburg-pa-senior-portrait-photography-smiling-woman-pink-top-outdoors-db0627.webp\",\"smallSrc\":\"/assets/greensburg-pa-senior-portrait-photography-smiling-woman-pink-top-outdoors-db0627-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling woman pink top outdoors.\"},\"db-0628\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-foreheads-together-stone-wall-db0628.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-foreheads-together-stone-wall-db0628-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple foreheads together stone wall.\"},\"db-0629\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-and-groom-cutting-cake-db0629.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-and-groom-cutting-cake-db0629-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom cutting cake.\"},\"db-0630\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-standing-blue-shirt-collage-db0630.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-standing-blue-shirt-collage-db0630-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler standing blue shirt collage.\"},\"db-0631\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-standing-by-lakeside-boats-db0631.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-standing-by-lakeside-boats-db0631-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple standing by lakeside boats.\"},\"db-0632\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-and-flower-girl-outdoors-db0632.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-and-flower-girl-outdoors-db0632-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride and flower girl outdoors.\"},\"db-0633\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-portrait-on-seaside-rock-db0633.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-mermaid-portrait-on-seaside-rock-db0633-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Mermaid portrait on seaside rock.\"},\"db-0634\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-kissing-stone-wall-db0634.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-kissing-stone-wall-db0634-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom kissing stone wall.\"},\"db-0635\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-with-unicorn-in-meadow-db0635.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-with-unicorn-in-meadow-db0635-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with unicorn in meadow.\"},\"db-0636\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-portraits-photo-collage-db0636.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-portraits-photo-collage-db0636-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding portraits photo collage.\"},\"db-0639\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-ceremony-guests-in-pews-db0639.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-ceremony-guests-in-pews-db0639-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding ceremony guests in pews.\"},\"db-0640\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-kissing-church-doorway-db0640.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-couple-kissing-church-doorway-db0640-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple kissing church doorway.\"},\"db-0641\":{\"src\":\"/assets/pittsburgh-area-family-photography-boy-reading-at-window-db0641.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-boy-reading-at-window-db0641-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Boy reading at window.\"},\"db-0642\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-embracing-autumn-sunlight-db0642.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-embracing-autumn-sunlight-db0642-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple embracing autumn sunlight.\"},\"db-0643\":{\"src\":\"/assets/westmoreland-county-pa-boudoir-photography-adult-reclining-with-pearl-necklaces-db0643.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-boudoir-photography-adult-reclining-with-pearl-necklaces-db0643-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"A woman reclining in a lace top with pearl necklaces.\"},\"db-0644\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-cuddling-goat-garden-db0644.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-cuddling-goat-garden-db0644-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child cuddling goat garden.\"},\"db-0645\":{\"src\":\"/assets/greensburg-pa-family-photography-mother-kissing-toddler-collage-db0645.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-mother-kissing-toddler-collage-db0645-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Mother kissing toddler collage.\"},\"db-0646\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-with-flower-headband-db0646.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-with-flower-headband-db0646-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler with flower headband.\"},\"db-0647\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-pink-dress-wicker-chair-collage-db0647.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-pink-dress-wicker-chair-collage-db0647-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child pink dress wicker chair collage.\"},\"db-0648\":{\"src\":\"/assets/greensburg-pa-wedding-photography-child-lifting-brides-veil-db0648.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-child-lifting-brides-veil-db0648-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child lifting brides veil.\"},\"db-0650\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-with-white-birds-dream-scene-db0650.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-with-white-birds-dream-scene-db0650-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with white birds dream scene.\"},\"db-0651\":{\"src\":\"/assets/greensburg-pa-family-photography-family-sitting-in-autumn-leaves-db0651.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-sitting-in-autumn-leaves-db0651-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family sitting in autumn leaves.\"},\"db-0652\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-two-children-riding-white-unicorn-db0652.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-two-children-riding-white-unicorn-db0652-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Two children riding white unicorn.\"},\"db-0653\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-with-paper-parasol-db0653.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-with-paper-parasol-db0653-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with paper parasol.\"},\"db-0654\":{\"src\":\"/assets/greensburg-pa-family-photography-mother-and-baby-garden-collage-db0654.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-mother-and-baby-garden-collage-db0654-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Mother and baby garden collage.\"},\"db-0655\":{\"src\":\"/assets/westmoreland-county-pa-senior-portrait-photography-woman-with-red-hair-outdoor-portrait-db0655.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-senior-portrait-photography-woman-with-red-hair-outdoor-portrait-db0655-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman with red hair outdoor portrait.\"},\"db-0657\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-in-high-chair-red-balloons-db0657.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-in-high-chair-red-balloons-db0657-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby in high chair red balloons.\"},\"db-0658\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-baby-carriage-unicorn-garden-collage-db0658.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-baby-carriage-unicorn-garden-collage-db0658-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Baby carriage unicorn garden collage.\"},\"db-0659\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-black-and-white-portrait-db0659.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-toddler-black-and-white-portrait-db0659-640.webp\",\"width\":1600,\"height\":1600,\"smallWidth\":640,\"alt\":\"Toddler black and white portrait.\"},\"db-0660\":{\"src\":\"/assets/greensburg-pa-family-photography-parents-newborn-and-two-dogs-db0660.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-parents-newborn-and-two-dogs-db0660-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents newborn and two dogs.\"},\"db-0661\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-kissing-through-ornate-mirror-db0661.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-kissing-through-ornate-mirror-db0661-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple kissing through ornate mirror.\"},\"db-0662\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-by-railing-monochrome-db0662.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-wedding-couple-by-railing-monochrome-db0662-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple by railing monochrome.\"},\"db-0663\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-two-boys-with-toy-sailboat-db0663.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-two-boys-with-toy-sailboat-db0663-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Two boys with toy sailboat.\"},\"db-0664\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-in-blue-princess-costume-db0664.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-in-blue-princess-costume-db0664-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in blue princess costume.\"},\"db-0665\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-santa-with-lantern-in-snow-db0665.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-santa-with-lantern-in-snow-db0665-640.webp\",\"width\":1575,\"height\":1050,\"smallWidth\":640,\"alt\":\"Santa with lantern in snow.\"},\"db-0666\":{\"src\":\"/assets/greensburg-pa-wedding-photography-older-wedding-couple-kissing-db0666.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-older-wedding-couple-kissing-db0666-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Older wedding couple kissing.\"},\"db-0667\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-at-garden-tea-table-db0667.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-children-at-garden-tea-table-db0667-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children at garden tea table.\"},\"db-0668\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-in-fairytale-princess-dress-db0668.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-in-fairytale-princess-dress-db0668-640.webp\",\"width\":900,\"height\":600,\"smallWidth\":640,\"alt\":\"Child in fairytale princess dress.\"},\"db-0669\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-baby-lying-on-textured-blanket-db0669.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-baby-lying-on-textured-blanket-db0669-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby lying on textured blanket.\"},\"db-0670\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-portrait-black-and-white-db0670.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-portrait-black-and-white-db0670-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby portrait black and white.\"},\"db-0671\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-woman-in-white-dress-by-barn-db0671.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-woman-in-white-dress-by-barn-db0671-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman in white dress by barn.\"},\"db-0672\":{\"src\":\"/assets/greensburg-pa-engagement-couples-photography-couple-and-dog-wedding-announcement-db0672.webp\",\"smallSrc\":\"/assets/greensburg-pa-engagement-couples-photography-couple-and-dog-wedding-announcement-db0672-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple holding hands behind a dog with a wedding announcement sign.\"},\"db-0673\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-swaddled-newborn-in-autumn-box-db0673.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-swaddled-newborn-in-autumn-box-db0673-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Swaddled newborn in autumn box.\"},\"db-0674\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-dancing-in-wildflower-meadow-db0674.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-dancing-in-wildflower-meadow-db0674-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple dancing in wildflower meadow.\"},\"db-0675\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-and-groom-by-woodland-water-db0675.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-and-groom-by-woodland-water-db0675-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom by woodland water.\"},\"db-0676\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-at-hot-cocoa-holiday-stand-db0676.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-family-at-hot-cocoa-holiday-stand-db0676-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family at hot cocoa holiday stand.\"},\"db-0677\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-with-white-flower-db0677.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-with-white-flower-db0677-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Sleeping newborn with white flower.\"},\"db-0678\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-and-lamb-in-lavender-field-db0678.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-and-lamb-in-lavender-field-db0678-640.webp\",\"width\":1600,\"height\":1002,\"smallWidth\":640,\"alt\":\"Child and lamb in lavender field.\"},\"db-0679\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-on-waterfront-with-sunset-sky-db0679.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-on-waterfront-with-sunset-sky-db0679-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Couple on waterfront with sunset sky.\"},\"db-0680\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-blowing-sparkling-fairy-dust-db0680.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-blowing-sparkling-fairy-dust-db0680-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child blowing sparkling fairy dust.\"},\"db-0681\":{\"src\":\"/assets/greensburg-pa-fashion-photography-portrait-with-blue-fan-red-background-db0681.webp\",\"smallSrc\":\"/assets/greensburg-pa-fashion-photography-portrait-with-blue-fan-red-background-db0681-640.webp\",\"width\":864,\"height\":576,\"smallWidth\":640,\"alt\":\"Portrait with blue fan red background.\"},\"db-0682\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-child-with-parasol-portrait-collage-db0682.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-child-with-parasol-portrait-collage-db0682-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with parasol portrait collage.\"},\"db-0683\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-bride-holding-young-child-in-barn-db0683.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-bride-holding-young-child-in-barn-db0683-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride holding young child in barn.\"},\"db-0684\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-santa-with-lantern-in-woodland-db0684.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-santa-with-lantern-in-woodland-db0684-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Santa with lantern in woodland.\"},\"db-0685\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-child-with-floral-headpiece-collage-db0685.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-child-with-floral-headpiece-collage-db0685-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with floral headpiece collage.\"},\"db-0686\":{\"src\":\"/assets/pittsburgh-area-family-photography-siblings-with-vintage-baby-carriage-db0686.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-siblings-with-vintage-baby-carriage-db0686-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Siblings with vintage baby carriage.\"},\"db-0687\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-children-baking-at-holiday-table-db0687.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-children-baking-at-holiday-table-db0687-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children baking at holiday table.\"},\"db-0688\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-child-with-hands-in-prayer-db0688.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-child-with-hands-in-prayer-db0688-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and child with hands in prayer.\"},\"db-0689\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-family-at-christmas-cocoa-stand-db0689.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-family-at-christmas-cocoa-stand-db0689-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family at christmas cocoa stand.\"},\"db-0690\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-and-goat-in-wicker-chair-db0690.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-toddler-and-goat-in-wicker-chair-db0690-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Toddler and goat in wicker chair.\"},\"db-0692\":{\"src\":\"/assets/pittsburgh-area-fashion-photography-dancers-in-decorative-stage-cage-db0692.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fashion-photography-dancers-in-decorative-stage-cage-db0692-640.webp\",\"width\":1416,\"height\":1600,\"smallWidth\":566,\"alt\":\"Dancers in decorative stage cage.\"},\"db-0693\":{\"src\":\"/assets/greensburg-pa-themed-portrait-photography-toddler-with-snowman-holiday-set-db0693.webp\",\"smallSrc\":\"/assets/greensburg-pa-themed-portrait-photography-toddler-with-snowman-holiday-set-db0693-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler with snowman holiday set.\"},\"db-0694\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-smiling-from-vintage-car-db0694.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-smiling-from-vintage-car-db0694-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride smiling from vintage car.\"},\"db-0695\":{\"src\":\"/assets/pittsburgh-area-senior-portrait-photography-woman-with-red-hair-green-scarf-db0695.webp\",\"smallSrc\":\"/assets/pittsburgh-area-senior-portrait-photography-woman-with-red-hair-green-scarf-db0695-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Woman with red hair green scarf.\"},\"db-0696\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-at-vintage-garden-tea-table-db0696.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-at-vintage-garden-tea-table-db0696-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child at vintage garden tea table.\"},\"db-0697\":{\"src\":\"/assets/westmoreland-county-pa-family-photography-boy-in-woodland-basket-db0697.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-family-photography-boy-in-woodland-basket-db0697-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Boy sitting among fishing nets in warm woodland light.\"},\"db-0698\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-in-rust-knit-wrap-db0698.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-sleeping-newborn-in-rust-knit-wrap-db0698-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Sleeping newborn in rust knit wrap.\"},\"db-0699\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-vows-in-church-db0699.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-vows-in-church-db0699-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding vows in church.\"},\"db-0700\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-pirate-birthday-cake-detail-db0700.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-pirate-birthday-cake-detail-db0700-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby pirate birthday cake detail.\"},\"db-0701\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-newlyweds-kissing-under-fireworks-db0701.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-newlyweds-kissing-under-fireworks-db0701-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newlyweds kissing under fireworks.\"},\"db-0702\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-child-cuddling-sleeping-newborn-db0702.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-child-cuddling-sleeping-newborn-db0702-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child cuddling sleeping newborn.\"},\"db-0703\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-in-church-monochrome-db0703.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-wedding-party-in-church-monochrome-db0703-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding party in church monochrome.\"},\"db-0704\":{\"src\":\"/assets/pittsburgh-area-wedding-photography-newlyweds-in-tall-woodland-db0704.webp\",\"smallSrc\":\"/assets/pittsburgh-area-wedding-photography-newlyweds-in-tall-woodland-db0704-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Newlyweds in tall woodland.\"},\"db-0705\":{\"src\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-and-white-horse-portrait-collage-db0705.webp\",\"smallSrc\":\"/assets/greensburg-pa-fine-art-portrait-photography-child-and-white-horse-portrait-collage-db0705-640.webp\",\"width\":1600,\"height\":800,\"smallWidth\":640,\"alt\":\"Child and white horse portrait collage.\"},\"db-0706\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-blowing-sparkles-with-balloons-db0706.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-blowing-sparkles-with-balloons-db0706-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child blowing sparkles with balloons.\"},\"db-0707\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-and-white-unicorn-at-sunset-db0707.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-and-white-unicorn-at-sunset-db0707-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children and white unicorn at sunset.\"},\"db-0708\":{\"src\":\"/assets/greensburg-pa-family-photography-group-in-vintage-suits-and-hats-db0708.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-group-in-vintage-suits-and-hats-db0708-640.webp\",\"width\":1016,\"height\":1524,\"smallWidth\":427,\"alt\":\"Group in vintage suits and hats.\"},\"db-0709\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-in-fairytale-carriage-db0709.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-in-fairytale-carriage-db0709-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child in fairytale carriage.\"},\"db-0712\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-groomsmen-toasting-with-personalized-cups-db0712.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-groomsmen-toasting-with-personalized-cups-db0712-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Groomsmen toasting with personalized cups.\"},\"db-0713\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-with-flower-headband-studio-portrait-db0713.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-with-flower-headband-studio-portrait-db0713-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with flower headband studio portrait.\"},\"db-0714\":{\"src\":\"/assets/greensburg-pa-family-photography-family-sitting-on-lakeside-dock-db0714.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-family-sitting-on-lakeside-dock-db0714-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family sitting on lakeside dock.\"},\"db-0715\":{\"src\":\"/assets/westmoreland-county-pa-themed-portrait-photography-siblings-in-winter-train-themed-set-db0715.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-themed-portrait-photography-siblings-in-winter-train-themed-set-db0715-640.webp\",\"width\":1600,\"height\":1280,\"smallWidth\":640,\"alt\":\"Siblings in winter train themed set.\"},\"db-0716\":{\"src\":\"/assets/pittsburgh-area-professional-headshot-photography-man-adjusting-tie-studio-portrait-db0716.webp\",\"smallSrc\":\"/assets/pittsburgh-area-professional-headshot-photography-man-adjusting-tie-studio-portrait-db0716-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Man adjusting tie studio portrait.\"},\"db-0717\":{\"src\":\"/assets/greensburg-pa-wedding-photography-newlyweds-together-in-warm-light-db0717.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-newlyweds-together-in-warm-light-db0717-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newlyweds together in warm light.\"},\"db-0718\":{\"src\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-white-unicorn-and-flowers-db0718.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-fine-art-portrait-photography-child-with-white-unicorn-and-flowers-db0718-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Child with white unicorn and flowers.\"},\"db-0719\":{\"src\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-by-vintage-blue-car-db0719.webp\",\"smallSrc\":\"/assets/pittsburgh-area-engagement-couples-photography-couple-kissing-by-vintage-blue-car-db0719-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple kissing by vintage blue car.\"},\"db-0720\":{\"src\":\"/assets/greensburg-pa-newborn-baby-photography-smiling-baby-portrait-collage-db0720.webp\",\"smallSrc\":\"/assets/greensburg-pa-newborn-baby-photography-smiling-baby-portrait-collage-db0720-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Smiling baby portrait collage.\"},\"db-0722\":{\"src\":\"/assets/pittsburgh-area-themed-portrait-photography-family-with-baby-in-holiday-studio-db0722.webp\",\"smallSrc\":\"/assets/pittsburgh-area-themed-portrait-photography-family-with-baby-in-holiday-studio-db0722-640.webp\",\"width\":1600,\"height\":1066,\"smallWidth\":640,\"alt\":\"Family with baby in holiday studio.\"},\"db-0723\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-reception-table-and-candles-db0723.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-reception-table-and-candles-db0723-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding reception table and candles.\"},\"db-0724\":{\"src\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-sitting-together-by-lake-db0724.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-engagement-couples-photography-couple-sitting-together-by-lake-db0724-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Couple sitting together by lake.\"},\"db-0725\":{\"src\":\"/assets/pittsburgh-area-family-photography-children-on-blanket-with-boots-db0725.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-children-on-blanket-with-boots-db0725-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Children on blanket with boots.\"},\"db-0726\":{\"src\":\"/assets/greensburg-pa-pet-photography-two-dogs-wearing-flower-garlands-db0726.webp\",\"smallSrc\":\"/assets/greensburg-pa-pet-photography-two-dogs-wearing-flower-garlands-db0726-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Two dogs wearing flower garlands.\"},\"db-0727\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-basket-portrait-collage-db0727.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-newborn-basket-portrait-collage-db0727-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newborn basket portrait collage.\"},\"db-0728\":{\"src\":\"/assets/pittsburgh-area-newborn-baby-photography-crawling-twins-black-and-white-db0728.webp\",\"smallSrc\":\"/assets/pittsburgh-area-newborn-baby-photography-crawling-twins-black-and-white-db0728-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Crawling twins black and white.\"},\"db-0729\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-kissing-by-railing-db0729.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-kissing-by-railing-db0729-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Wedding couple kissing by railing.\"},\"db-0730\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-together-by-water-db0730.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-together-by-water-db0730-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newlyweds together by water.\"},\"db-0731\":{\"src\":\"/assets/pittsburgh-area-family-photography-child-with-colorful-flower-crown-db0731.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-child-with-colorful-flower-crown-db0731-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child with colorful flower crown.\"},\"db-0732\":{\"src\":\"/assets/greensburg-pa-family-photography-parents-holding-toddler-outdoors-db0732.webp\",\"smallSrc\":\"/assets/greensburg-pa-family-photography-parents-holding-toddler-outdoors-db0732-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Parents holding toddler outdoors.\"},\"db-0733\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-with-red-trolley-db0733.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-bride-and-groom-with-red-trolley-db0733-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Bride and groom with red trolley.\"},\"db-0734\":{\"src\":\"/assets/pittsburgh-area-family-photography-family-by-lake-and-blue-boats-db0734.webp\",\"smallSrc\":\"/assets/pittsburgh-area-family-photography-family-by-lake-and-blue-boats-db0734-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Family by lake and blue boats.\"},\"db-0735\":{\"src\":\"/assets/greensburg-pa-fashion-photography-dance-school-portrait-and-performance-collage-db0735.webp\",\"smallSrc\":\"/assets/greensburg-pa-fashion-photography-dance-school-portrait-and-performance-collage-db0735-640.webp\",\"width\":1280,\"height\":1600,\"smallWidth\":512,\"alt\":\"Dance school portrait and performance collage.\"},\"db-0736\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-with-birthday-cake-db0736.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-toddler-with-birthday-cake-db0736-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Toddler with birthday cake.\"},\"db-0737\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-in-cowboy-costumes-with-pony-db0737.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-children-in-cowboy-costumes-with-pony-db0737-640.webp\",\"width\":1600,\"height\":1068,\"smallWidth\":640,\"alt\":\"Children in cowboy costumes with pony.\"},\"db-0738\":{\"src\":\"/assets/greensburg-pa-wedding-photography-bride-in-ornate-mirror-monochrome-db0738.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-bride-in-ornate-mirror-monochrome-db0738-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"Bride in ornate mirror monochrome.\"},\"db-0739\":{\"src\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-under-military-sword-arch-db0739.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-wedding-photography-newlyweds-under-military-sword-arch-db0739-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Newlyweds under military sword arch.\"},\"db-0740\":{\"src\":\"/assets/pittsburgh-area-boudoir-photography-adult-at-vanity-mirror-in-blue-top-db0740.webp\",\"smallSrc\":\"/assets/pittsburgh-area-boudoir-photography-adult-at-vanity-mirror-in-blue-top-db0740-640.webp\",\"width\":1067,\"height\":1600,\"smallWidth\":427,\"alt\":\"A woman seated at a vanity mirror wearing a blue top.\"},\"db-0741\":{\"src\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-landscape-at-sunset-db0741.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-wedding-couple-landscape-at-sunset-db0741-640.webp\",\"width\":1600,\"height\":1112,\"smallWidth\":640,\"alt\":\"Wedding couple landscape at sunset.\"},\"db-0742\":{\"src\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-flower-headband-portrait-collage-db0742.webp\",\"smallSrc\":\"/assets/westmoreland-county-pa-newborn-baby-photography-baby-flower-headband-portrait-collage-db0742-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Baby flower headband portrait collage.\"},\"db-0743\":{\"src\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-and-lamb-garden-portrait-collage-db0743.webp\",\"smallSrc\":\"/assets/pittsburgh-area-fine-art-portrait-photography-child-and-lamb-garden-portrait-collage-db0743-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Child and lamb garden portrait collage.\"},\"db-0744\":{\"src\":\"/assets/greensburg-pa-wedding-photography-engraved-wedding-rings-on-reflective-surface-db0744.webp\",\"smallSrc\":\"/assets/greensburg-pa-wedding-photography-engraved-wedding-rings-on-reflective-surface-db0744-640.webp\",\"width\":1600,\"height\":1067,\"smallWidth\":640,\"alt\":\"Engraved wedding rings on reflective surface.\"},\"architecture\":{\"src\":\"/assets/architecture.svg\",\"smallSrc\":\"/assets/architecture.svg\",\"width\":800,\"height\":1100,\"smallWidth\":800,\"alt\":\"Illustrated house — real estate portfolio placeholder\"}}"),
	collections: /* @__PURE__ */ JSON.parse("{\"portraits\":{\"label\":\"Portraits\",\"eyebrow\":\"The art of being you\",\"headline\":\"Ordinary moments.\\n*Extraordinary memories.*\",\"description\":\"Portrait photography for every chapter of your story, from tiny beginnings and growing families to beloved pets and a little make-believe. Based in Greensburg, PA, serving Westmoreland County and the Pittsburgh area.\",\"images\":[\"upload-senior-flowers\",\"upload-dog-tennis-ball\",\"upload-newborn-knit\",\"upload-family-sleigh\",\"portfolio-12\"],\"items\":[{\"slug\":\"pets\",\"label\":\"Pets\",\"title\":\"For the ones\\n*with paws.*\",\"seo\":\"Pet Photography in Greensburg PA\",\"summary\":\"Big personalities. Little paws. An entire piece of your heart.\",\"images\":[\"upload-dog-tennis-ball\",\"upload-hedgehog-valentine\",\"portfolio-17\",\"db-0003\",\"db-0009\",\"db-0018\",\"db-0031\",\"db-0035\",\"db-0044\",\"db-0053\",\"db-0059\",\"db-0062\",\"db-0073\",\"db-0081\",\"db-0154\",\"db-0163\",\"db-0205\",\"db-0227\",\"db-0301\",\"db-0316\",\"db-0349\",\"db-0396\",\"db-0421\",\"db-0432\",\"db-0451\",\"db-0464\",\"db-0488\",\"db-0500\",\"db-0509\",\"db-0514\",\"db-0540\",\"db-0554\",\"db-0556\",\"db-0580\",\"db-0609\",\"db-0618\",\"db-0660\",\"db-0672\",\"db-0726\"],\"text\":[\"They are part of the family, too. Pet portraits celebrate the expressions, quirks, and connections that make your companion unmistakably yours.\",\"Plan a pet photography session in Greensburg or the surrounding Westmoreland County area. Tell me about your pet’s personality, favorite things, and whether you would like to be in the photographs together.\"],\"details\":[\"Personality-filled portraits\",\"Pets on their own or with family\",\"A setting planned around your pet\"]},{\"slug\":\"families\",\"label\":\"Families\",\"title\":\"Your people.\\n*Your kind of love.*\",\"seo\":\"Greensburg PA Family Photography\",\"summary\":\"The in-between moments are the ones you will want to keep.\",\"images\":[\"upload-toddler-dock\",\"upload-family-sleigh\",\"portfolio-25\",\"portfolio-07\",\"portfolio-08\",\"portfolio-16\",\"portfolio-18\",\"db-0000\",\"db-0003\",\"db-0005\",\"db-0023\",\"db-0032\",\"db-0038\",\"db-0052\",\"db-0059\",\"db-0062\",\"db-0064\",\"db-0069\",\"db-0077\",\"db-0078\",\"db-0080\",\"db-0088\",\"db-0092\",\"db-0110\",\"db-0127\",\"db-0131\",\"db-0138\",\"db-0140\",\"db-0143\",\"db-0148\",\"db-0150\",\"db-0156\",\"db-0170\",\"db-0172\",\"db-0183\",\"db-0195\",\"db-0205\",\"db-0210\",\"db-0218\",\"db-0227\",\"db-0231\",\"db-0240\",\"db-0255\",\"db-0256\",\"db-0263\",\"db-0266\",\"db-0272\",\"db-0291\",\"db-0297\",\"db-0310\",\"db-0322\",\"db-0335\",\"db-0340\",\"db-0375\",\"db-0384\",\"db-0408\",\"db-0411\",\"db-0417\",\"db-0425\",\"db-0432\",\"db-0433\",\"db-0441\",\"db-0452\",\"db-0475\",\"db-0479\",\"db-0485\",\"db-0488\",\"db-0491\",\"db-0495\",\"db-0496\",\"db-0497\",\"db-0502\",\"db-0503\",\"db-0507\",\"db-0511\",\"db-0516\",\"db-0518\",\"db-0519\",\"db-0527\",\"db-0529\",\"db-0530\",\"db-0534\",\"db-0538\",\"db-0543\",\"db-0545\",\"db-0546\",\"db-0571\",\"db-0572\",\"db-0578\",\"db-0583\",\"db-0585\",\"db-0593\",\"db-0601\",\"db-0603\",\"db-0621\",\"db-0625\",\"db-0641\",\"db-0645\",\"db-0647\",\"db-0651\",\"db-0653\",\"db-0654\",\"db-0660\",\"db-0682\",\"db-0685\",\"db-0686\",\"db-0697\",\"db-0708\",\"db-0713\",\"db-0714\",\"db-0725\",\"db-0731\",\"db-0732\",\"db-0734\"],\"text\":[\"The way they hold your hand. The laugh you hear before you see it. Family photography makes room for all the little things that tell your story, alongside the portraits everyone will want on the wall.\",\"Based in Greensburg, I photograph families throughout Westmoreland County and the Pittsburgh area. We will talk through your family, clothing, and a setting that feels like you before your session.\"],\"details\":[\"Immediate and extended families\",\"Connection, movement, and personality\",\"Children at every age\"]},{\"slug\":\"newborn\",\"label\":\"Newborn\",\"title\":\"So small.\\n*So much to remember.*\",\"seo\":\"Greensburg Newborn & Baby Photography\",\"summary\":\"From the very beginning to that first birthday.\",\"images\":[\"upload-newborn-knit\",\"upload-toddler-dock\",\"upload-newborn-hands\",\"portfolio-22\",\"portfolio-00\",\"portfolio-21\",\"portfolio-23\",\"portfolio-24\",\"db-0002\",\"db-0009\",\"db-0013\",\"db-0014\",\"db-0019\",\"db-0020\",\"db-0021\",\"db-0029\",\"db-0035\",\"db-0037\",\"db-0040\",\"db-0043\",\"db-0046\",\"db-0049\",\"db-0050\",\"db-0056\",\"db-0057\",\"db-0063\",\"db-0070\",\"db-0071\",\"db-0084\",\"db-0087\",\"db-0097\",\"db-0098\",\"db-0100\",\"db-0104\",\"db-0105\",\"db-0107\",\"db-0108\",\"db-0112\",\"db-0118\",\"db-0120\",\"db-0121\",\"db-0125\",\"db-0128\",\"db-0134\",\"db-0144\",\"db-0158\",\"db-0162\",\"db-0167\",\"db-0171\",\"db-0179\",\"db-0186\",\"db-0187\",\"db-0190\",\"db-0199\",\"db-0213\",\"db-0215\",\"db-0226\",\"db-0232\",\"db-0236\",\"db-0243\",\"db-0244\",\"db-0246\",\"db-0248\",\"db-0253\",\"db-0258\",\"db-0261\",\"db-0270\",\"db-0271\",\"db-0276\",\"db-0282\",\"db-0283\",\"db-0284\",\"db-0285\",\"db-0287\",\"db-0303\",\"db-0307\",\"db-0317\",\"db-0318\",\"db-0319\",\"db-0320\",\"db-0323\",\"db-0327\",\"db-0332\",\"db-0341\",\"db-0350\",\"db-0352\",\"db-0354\",\"db-0364\",\"db-0376\",\"db-0377\",\"db-0391\",\"db-0394\",\"db-0397\",\"db-0404\",\"db-0422\",\"db-0424\",\"db-0426\",\"db-0428\",\"db-0429\",\"db-0431\",\"db-0435\",\"db-0446\",\"db-0448\",\"db-0453\",\"db-0454\",\"db-0457\",\"db-0458\",\"db-0461\",\"db-0463\",\"db-0464\",\"db-0470\",\"db-0471\",\"db-0477\",\"db-0478\",\"db-0479\",\"db-0486\",\"db-0487\",\"db-0490\",\"db-0493\",\"db-0503\",\"db-0504\",\"db-0507\",\"db-0508\",\"db-0512\",\"db-0514\",\"db-0518\",\"db-0522\",\"db-0523\",\"db-0525\",\"db-0527\",\"db-0536\",\"db-0538\",\"db-0539\",\"db-0544\",\"db-0550\",\"db-0557\",\"db-0558\",\"db-0559\",\"db-0563\",\"db-0567\",\"db-0569\",\"db-0571\",\"db-0586\",\"db-0590\",\"db-0593\",\"db-0598\",\"db-0599\",\"db-0607\",\"db-0608\",\"db-0609\",\"db-0619\",\"db-0621\",\"db-0630\",\"db-0646\",\"db-0657\",\"db-0659\",\"db-0660\",\"db-0669\",\"db-0670\",\"db-0673\",\"db-0677\",\"db-0690\",\"db-0698\",\"db-0700\",\"db-0702\",\"db-0720\",\"db-0727\",\"db-0728\",\"db-0736\",\"db-0742\"],\"text\":[\"Tiny fingers, sleepy stretches, and a whole new kind of love. Newborn portraits preserve the fleeting details of your baby’s first chapter.\",\"The baby plan follows your little one through newborn, 3, 6, 9, and 12 months, with an optional free maternity session add-on. Reach out to discuss your due date, scheduling, and current collection details for Greensburg, Westmoreland County, or the Pittsburgh area.\"],\"details\":[\"Newborn portraits\",\"3-, 6-, and 9-month milestones\",\"12-month first birthday portraits\"],\"babyPlan\":true},{\"slug\":\"seniors\",\"label\":\"Seniors\",\"title\":\"This chapter\\n*is all yours.*\",\"seo\":\"Greensburg PA Senior Portrait Photographer\",\"summary\":\"A celebration of who you are and everything ahead.\",\"images\":[\"upload-red-dress-forest\",\"upload-senior-flowers\",\"db-0051\",\"db-0094\",\"db-0101\",\"db-0102\",\"db-0119\",\"db-0141\",\"db-0153\",\"db-0164\",\"db-0174\",\"db-0180\",\"db-0191\",\"db-0192\",\"db-0196\",\"db-0198\",\"db-0217\",\"db-0223\",\"db-0229\",\"db-0238\",\"db-0239\",\"db-0257\",\"db-0262\",\"db-0265\",\"db-0267\",\"db-0278\",\"db-0294\",\"db-0299\",\"db-0308\",\"db-0312\",\"db-0346\",\"db-0351\",\"db-0365\",\"db-0381\",\"db-0401\",\"db-0427\",\"db-0438\",\"db-0439\",\"db-0455\",\"db-0460\",\"db-0505\",\"db-0564\",\"db-0565\",\"db-0591\",\"db-0614\",\"db-0627\",\"db-0655\",\"db-0671\",\"db-0695\"],\"text\":[\"Senior portraits should feel personal. Bring the interests, outfits, places, and little details that make this milestone yours, and we will build a session around your personality.\",\"For high school seniors in Greensburg, Westmoreland County, and the greater Pittsburgh area. Tell me your graduation year and the mood you have in mind, from simple and natural to imaginative and expressive.\"],\"details\":[\"Personal style and meaningful settings\",\"Outfit and location planning\",\"A milestone worth celebrating\"]},{\"slug\":\"limited-edition\",\"label\":\"Limited Edition\",\"title\":\"A little magic.\\n*Only for a moment.*\",\"seo\":\"Limited Edition Photography Sessions in Greensburg\",\"summary\":\"Seasonal stories and imaginative little adventures.\",\"images\":[\"upload-santa-baking\",\"upload-halloween-carriage\",\"upload-family-sleigh\",\"upload-princess-carriage\",\"upload-girl-cardinals\",\"portfolio-19\",\"portfolio-12\",\"portfolio-23\",\"portfolio-08\",\"db-0017\",\"db-0026\",\"db-0028\",\"db-0038\",\"db-0039\",\"db-0055\",\"db-0056\",\"db-0057\",\"db-0075\",\"db-0076\",\"db-0079\",\"db-0086\",\"db-0087\",\"db-0098\",\"db-0106\",\"db-0110\",\"db-0114\",\"db-0121\",\"db-0126\",\"db-0137\",\"db-0148\",\"db-0151\",\"db-0177\",\"db-0195\",\"db-0211\",\"db-0213\",\"db-0218\",\"db-0224\",\"db-0232\",\"db-0246\",\"db-0252\",\"db-0302\",\"db-0304\",\"db-0306\",\"db-0330\",\"db-0333\",\"db-0366\",\"db-0367\",\"db-0375\",\"db-0378\",\"db-0410\",\"db-0422\",\"db-0425\",\"db-0430\",\"db-0436\",\"db-0458\",\"db-0461\",\"db-0464\",\"db-0469\",\"db-0489\",\"db-0492\",\"db-0496\",\"db-0499\",\"db-0501\",\"db-0509\",\"db-0513\",\"db-0514\",\"db-0520\",\"db-0532\",\"db-0534\",\"db-0543\",\"db-0546\",\"db-0553\",\"db-0555\",\"db-0583\",\"db-0603\",\"db-0609\",\"db-0613\",\"db-0665\",\"db-0676\",\"db-0684\",\"db-0687\",\"db-0689\",\"db-0693\",\"db-0715\",\"db-0722\"],\"text\":[\"Limited Edition sessions are special, themed experiences: Christmas with Santa, unicorn stories, Easter with live animals, and other seasonal ideas that turn a photograph into a memory.\",\"Themes, dates, props, and animal participation vary by event. Ask what is being planned for Greensburg and Westmoreland County, or share the theme you would love to see next. The photographs here show past creative work; current offerings are confirmed when booking.\"],\"details\":[\"Christmas with Santa\",\"Unicorn and fairytale sessions\",\"Easter and seasonal themes\"]},{\"slug\":\"fine-art\",\"label\":\"Fine Art\",\"title\":\"Some stories\\n*begin with a daydream.*\",\"seo\":\"Fine Art Children’s Photography in Greensburg PA\",\"summary\":\"Imagination, light, and a little something extraordinary.\",\"images\":[\"upload-red-dress-forest\",\"upload-toddler-dock\",\"upload-storm-couple\",\"upload-halloween-carriage\",\"upload-princess-carriage\",\"upload-girl-cardinals\",\"portfolio-19\",\"portfolio-12\",\"portfolio-27\",\"portfolio-26\",\"portfolio-02\",\"portfolio-01\",\"db-0007\",\"db-0016\",\"db-0017\",\"db-0018\",\"db-0025\",\"db-0026\",\"db-0039\",\"db-0045\",\"db-0053\",\"db-0055\",\"db-0067\",\"db-0073\",\"db-0076\",\"db-0079\",\"db-0081\",\"db-0082\",\"db-0086\",\"db-0096\",\"db-0106\",\"db-0114\",\"db-0116\",\"db-0137\",\"db-0147\",\"db-0155\",\"db-0156\",\"db-0169\",\"db-0189\",\"db-0200\",\"db-0203\",\"db-0207\",\"db-0211\",\"db-0215\",\"db-0249\",\"db-0260\",\"db-0264\",\"db-0269\",\"db-0277\",\"db-0280\",\"db-0292\",\"db-0298\",\"db-0305\",\"db-0309\",\"db-0313\",\"db-0314\",\"db-0315\",\"db-0324\",\"db-0328\",\"db-0329\",\"db-0337\",\"db-0338\",\"db-0339\",\"db-0344\",\"db-0345\",\"db-0347\",\"db-0359\",\"db-0369\",\"db-0374\",\"db-0379\",\"db-0385\",\"db-0386\",\"db-0392\",\"db-0410\",\"db-0423\",\"db-0430\",\"db-0436\",\"db-0437\",\"db-0442\",\"db-0449\",\"db-0456\",\"db-0459\",\"db-0489\",\"db-0492\",\"db-0499\",\"db-0502\",\"db-0510\",\"db-0521\",\"db-0531\",\"db-0537\",\"db-0540\",\"db-0541\",\"db-0551\",\"db-0552\",\"db-0556\",\"db-0561\",\"db-0573\",\"db-0580\",\"db-0584\",\"db-0597\",\"db-0602\",\"db-0611\",\"db-0612\",\"db-0618\",\"db-0620\",\"db-0633\",\"db-0635\",\"db-0644\",\"db-0650\",\"db-0652\",\"db-0658\",\"db-0663\",\"db-0664\",\"db-0667\",\"db-0668\",\"db-0678\",\"db-0680\",\"db-0696\",\"db-0705\",\"db-0706\",\"db-0707\",\"db-0709\",\"db-0718\",\"db-0737\",\"db-0743\"],\"text\":[\"Fine art portraits turn a feeling or an idea into a visual story. A favorite fairytale, a child’s imagination, or a beautiful moment can become the beginning of something magical.\",\"Creative sessions are planned individually, with styling, setting, and artistic editing working together. Explore fine art children’s photography from Memories as Art in Greensburg, serving families across Westmoreland County and the Pittsburgh region.\"],\"details\":[\"An individually planned creative concept\",\"Expressive portraits and artistic editing\",\"Artwork inspired by your story\"]},{\"slug\":\"boudoir\",\"label\":\"Boudoir\",\"title\":\"Your confidence.\\n*Your story.*\",\"summary\":\"Personal, expressive portraits that celebrate your individual style.\",\"seo\":\"Greensburg PA Boudoir Photographer\",\"text\":[\"Boudoir photography is a personal way to express confidence, softness, strength, or a side of yourself you want to celebrate. Share the mood, styling, and level of coverage you feel comfortable with so we can plan portraits that feel like you.\",\"Based in the Greensburg area, Memories as Art welcomes boudoir photography inquiries from adults throughout Westmoreland County and the greater Pittsburgh area.\"],\"details\":[\"Tell me about your ideas, wardrobe preferences, and the feeling you want your photographs to have.\",\"Ask about session planning, styling, and what to expect when you inquire.\"],\"images\":[\"db-0740\",\"db-0273\",\"db-0146\",\"db-0027\",\"db-0103\",\"db-0149\",\"db-0343\",\"db-0362\",\"db-0363\",\"db-0380\",\"db-0528\",\"db-0643\"]}]},\"weddings\":{\"label\":\"Weddings\",\"eyebrow\":\"The wedding collection\",\"headline\":\"A love like yours.\\n*Remembered beautifully.*\",\"description\":\"Wedding photography for the moments you plan and the ones that find you. Celebrating couples in Greensburg, Pittsburgh, and Westmoreland County, with destination inquiries welcome.\",\"images\":[\"upload-gazebo-wedding\",\"upload-marble-wedding\",\"upload-pond-wedding\",\"upload-wedding-mother\",\"upload-wedding-details\",\"wedding-03\",\"wedding-04\",\"wedding-10\"],\"items\":[{\"slug\":\"engagements\",\"label\":\"Engagement Sessions\",\"title\":\"Before “I do,”\\n*there is you.*\",\"seo\":\"Pittsburgh & Greensburg Engagement Photography\",\"summary\":\"A little time together. A story that is just beginning.\",\"images\":[\"upload-storm-couple\",\"db-0012\",\"db-0024\",\"db-0028\",\"db-0033\",\"db-0036\",\"db-0047\",\"db-0085\",\"db-0113\",\"db-0133\",\"db-0208\",\"db-0214\",\"db-0225\",\"db-0234\",\"db-0251\",\"db-0254\",\"db-0286\",\"db-0293\",\"db-0295\",\"db-0311\",\"db-0353\",\"db-0357\",\"db-0387\",\"db-0409\",\"db-0416\",\"db-0443\",\"db-0466\",\"db-0467\",\"db-0476\",\"db-0517\",\"db-0548\",\"db-0549\",\"db-0569\",\"db-0604\",\"db-0605\",\"db-0623\",\"db-0628\",\"db-0631\",\"db-0642\",\"db-0661\",\"db-0672\",\"db-0674\",\"db-0679\",\"db-0719\",\"db-0724\"],\"text\":[\"An engagement session is a chance to slow down, be together, and celebrate this part of your story. Choose a place that means something to you, or let us talk through a setting that fits the two of you.\",\"Plan engagement photographs in Pittsburgh, Greensburg, or Westmoreland County. We will discuss the feel of the session, clothing, timing, and how you would like to use your photographs.\"],\"details\":[\"A location with meaning\",\"Relaxed portraits together\",\"Planning before your wedding day\"]},{\"slug\":\"full-day\",\"label\":\"Full Day Weddings\",\"title\":\"The whole story.\\n*All the feeling.*\",\"seo\":\"Pittsburgh & Greensburg Wedding Photographer\",\"summary\":\"From quiet anticipation to a room full of celebration.\",\"images\":[\"upload-marble-wedding\",\"upload-pond-wedding\",\"upload-wedding-mother\",\"upload-wedding-details\",\"upload-gazebo-wedding\",\"wedding-03\",\"wedding-09\",\"wedding-01\",\"wedding-11\",\"wedding-00\",\"wedding-04\",\"db-0001\",\"db-0004\",\"db-0006\",\"db-0008\",\"db-0011\",\"db-0022\",\"db-0030\",\"db-0034\",\"db-0041\",\"db-0042\",\"db-0048\",\"db-0054\",\"db-0058\",\"db-0060\",\"db-0061\",\"db-0065\",\"db-0066\",\"db-0068\",\"db-0072\",\"db-0074\",\"db-0083\",\"db-0089\",\"db-0090\",\"db-0091\",\"db-0099\",\"db-0109\",\"db-0111\",\"db-0115\",\"db-0122\",\"db-0123\",\"db-0124\",\"db-0135\",\"db-0136\",\"db-0139\",\"db-0142\",\"db-0145\",\"db-0152\",\"db-0157\",\"db-0159\",\"db-0160\",\"db-0165\",\"db-0166\",\"db-0168\",\"db-0173\",\"db-0181\",\"db-0182\",\"db-0184\",\"db-0185\",\"db-0193\",\"db-0194\",\"db-0197\",\"db-0201\",\"db-0202\",\"db-0204\",\"db-0206\",\"db-0209\",\"db-0212\",\"db-0216\",\"db-0219\",\"db-0221\",\"db-0222\",\"db-0228\",\"db-0230\",\"db-0233\",\"db-0235\",\"db-0242\",\"db-0245\",\"db-0247\",\"db-0250\",\"db-0259\",\"db-0268\",\"db-0275\",\"db-0279\",\"db-0281\",\"db-0288\",\"db-0289\",\"db-0331\",\"db-0342\",\"db-0348\",\"db-0355\",\"db-0356\",\"db-0358\",\"db-0360\",\"db-0361\",\"db-0368\",\"db-0370\",\"db-0371\",\"db-0372\",\"db-0373\",\"db-0383\",\"db-0388\",\"db-0389\",\"db-0390\",\"db-0393\",\"db-0398\",\"db-0399\",\"db-0400\",\"db-0402\",\"db-0403\",\"db-0405\",\"db-0406\",\"db-0407\",\"db-0412\",\"db-0413\",\"db-0414\",\"db-0415\",\"db-0419\",\"db-0434\",\"db-0440\",\"db-0444\",\"db-0445\",\"db-0447\",\"db-0450\",\"db-0462\",\"db-0465\",\"db-0468\",\"db-0472\",\"db-0473\",\"db-0474\",\"db-0481\",\"db-0483\",\"db-0494\",\"db-0498\",\"db-0515\",\"db-0526\",\"db-0533\",\"db-0535\",\"db-0560\",\"db-0562\",\"db-0566\",\"db-0570\",\"db-0575\",\"db-0576\",\"db-0577\",\"db-0581\",\"db-0582\",\"db-0587\",\"db-0588\",\"db-0589\",\"db-0592\",\"db-0595\",\"db-0600\",\"db-0606\",\"db-0615\",\"db-0622\",\"db-0624\",\"db-0626\",\"db-0629\",\"db-0632\",\"db-0634\",\"db-0636\",\"db-0639\",\"db-0640\",\"db-0648\",\"db-0662\",\"db-0666\",\"db-0675\",\"db-0683\",\"db-0688\",\"db-0694\",\"db-0699\",\"db-0701\",\"db-0703\",\"db-0704\",\"db-0712\",\"db-0717\",\"db-0723\",\"db-0729\",\"db-0730\",\"db-0733\",\"db-0738\",\"db-0739\",\"db-0741\",\"db-0744\"],\"text\":[\"A wedding day is more than a collection of portraits. It is the anticipation, the people who came to celebrate, the way you look at each other, and the moments you never want to forget.\",\"For full day wedding photography in Pittsburgh, Greensburg, and Westmoreland County, share your date, venue, and plans. Together we will talk through the timeline and the coverage that fits your day.\"],\"details\":[\"Getting ready and meaningful details\",\"Ceremony, family, and couple portraits\",\"Reception moments and celebration\"]},{\"slug\":\"destination\",\"label\":\"Destination Weddings\",\"title\":\"Wherever love\\n*takes you.*\",\"seo\":\"Destination Wedding Photography | Pittsburgh Based\",\"summary\":\"A beautiful place. Your favorite people. A new adventure.\",\"images\":[\"wedding-02\",\"wedding-10\"],\"preview\":true,\"previewNote\":\"Wedding photography previews · Destination portfolio coming soon\",\"text\":[\"When your celebration takes you somewhere special, the photographs should hold onto the feeling of the place as well as the people. Destination wedding inquiries are welcome.\",\"Share your destination, dates, venue, and the experiences you want remembered. Travel arrangements, availability, and coverage are discussed individually with Memories as Art, based in the Greensburg and Pittsburgh region.\"],\"details\":[\"Your destination and wedding plans\",\"Coverage built around your itinerary\",\"Travel details discussed individually\"]},{\"slug\":\"small-weddings-elopements\",\"label\":\"Small Weddings / Elopements\",\"title\":\"A smaller gathering.\\n*A love just as big.*\",\"seo\":\"Pittsburgh Elopement & Small Wedding Photographer\",\"summary\":\"Intimate celebrations, with room for what matters most.\",\"images\":[\"wedding-04\",\"wedding-00\",\"wedding-10\"],\"preview\":true,\"previewNote\":\"Wedding photography previews · Intimate wedding portfolio coming soon\",\"text\":[\"An intimate wedding can be full of meaning: a small group of loved ones, a quiet exchange of vows, or an afternoon that feels entirely your own.\",\"For small weddings and elopements around Pittsburgh, Greensburg, and Westmoreland County, tell me about your plans. We can talk through the ceremony, portraits, and the moments you would most like to preserve.\"],\"details\":[\"Intimate ceremonies\",\"Couple and family portraits\",\"Coverage shaped around your celebration\"]}]},\"commercial\":{\"label\":\"Commercial\",\"eyebrow\":\"Images with intention\",\"headline\":\"A fresh perspective.\\n*A lasting impression.*\",\"description\":\"Commercial photography for the people, places, products, and businesses shaping our community. Serving Greensburg, Westmoreland County, and the greater Pittsburgh area.\",\"images\":[\"ptba-photo-00\",\"ptba-photo-03\",\"ptba-photo-04\"],\"items\":[{\"slug\":\"real-estate\",\"label\":\"Real Estate\",\"title\":\"Every space\\n*has a story.*\",\"seo\":\"Greensburg & Westmoreland County Real Estate Photography\",\"summary\":\"A thoughtful first impression for your next listing.\",\"images\":[\"architecture\"],\"preview\":true,\"previewNote\":\"Portfolio placeholder · Property photographs coming soon\",\"text\":[\"Real estate photography helps buyers and renters understand a property before they walk through the door. Clear views, considered compositions, and attention to the details help a space tell its story.\",\"For a property in Greensburg, Westmoreland County, or the Pittsburgh area, share the address, approximate size, key features, and timeline. Image requirements and any video or aerial requests can be discussed for your project.\"],\"details\":[\"Residential and commercial spaces\",\"Listing and property marketing images\",\"A plan for your property’s key features\"]},{\"slug\":\"local-business\",\"label\":\"Local Business\",\"title\":\"Your business.\\n*Seen with fresh eyes.*\",\"seo\":\"Greensburg & Pittsburgh Business Brand Photography\",\"summary\":\"People, places, and the details that make your brand yours.\",\"images\":[\"ptba-photo-04\",\"ptba-photo-11\",\"ptba-photo-13\",\"db-0176\",\"db-0547\"],\"text\":[\"Show the people and everyday details behind your business. Brand photographs give your website, social channels, and marketing a more personal, consistent visual story.\",\"Working with businesses around Greensburg, Westmoreland County, and Pittsburgh, I connect the photography to how you will use it. For a wider marketing project, explore my work with PTBA Business Services.\"],\"details\":[\"Brand stories and working moments\",\"Images for websites and social media\",\"Photography planned with your marketing in mind\"]},{\"slug\":\"food\",\"label\":\"Food Photography\",\"title\":\"A feast\\n*for the eyes.*\",\"seo\":\"Pittsburgh & Greensburg Food Photography\",\"summary\":\"Flavor, texture, and the atmosphere around the table.\",\"images\":[\"ptba-photo-03\",\"ptba-photo-06\",\"ptba-photo-00\",\"ptba-photo-07\",\"db-0157\",\"db-0247\",\"db-0562\",\"db-0568\"],\"text\":[\"From a signature cocktail to a beautifully plated dish, food photography gives people a taste of what you create. Light, color, texture, and a sense of place help each image feel inviting.\",\"For restaurants, distilleries, cafés, and food businesses in Pittsburgh and Westmoreland County, share your menu, seasonal plans, and where the photographs will appear.\"],\"details\":[\"Food and drink photography\",\"Menu and seasonal features\",\"Social, website, and marketing content\"]},{\"slug\":\"corporate-headshots\",\"label\":\"Corporate Headshots\",\"title\":\"A portrait\\n*with purpose.*\",\"seo\":\"Greensburg & Pittsburgh Corporate Headshots\",\"summary\":\"A professional first impression that still feels like you.\",\"images\":[\"ptba-photo-15\",\"ptba-photo-04\",\"ptba-photo-11\",\"db-0325\",\"db-0610\",\"db-0716\"],\"text\":[\"Professional portraits help people connect with the person behind a name. Plan a headshot that fits your role, your brand, and the places it will be seen.\",\"Individual and team headshot inquiries are welcome for Greensburg, Westmoreland County, and Pittsburgh businesses. Tell me about your team size, location, preferred look, and intended use.\"],\"details\":[\"Individual professional portraits\",\"Team headshot inquiries\",\"Website and professional profile imagery\"]},{\"slug\":\"corporate-events\",\"label\":\"Corporate Events\",\"title\":\"People together.\\n*Moments that matter.*\",\"seo\":\"Pittsburgh & Westmoreland County Corporate Event Photography\",\"summary\":\"The people, details, and energy of your event.\",\"images\":[\"ptba-photo-13\",\"ptba-photo-11\"],\"preview\":true,\"previewNote\":\"Business and entertainment previews · Corporate event portfolio coming soon\",\"text\":[\"From a gathering of colleagues to a brand celebration, event photography tells the story through the people, the setting, and the interactions in between.\",\"For a corporate event in Pittsburgh, Greensburg, or Westmoreland County, share the date, venue, schedule, and the images your team needs afterward. Coverage and usage are planned around your event.\"],\"details\":[\"People and event atmosphere\",\"Brand details and key moments\",\"A clear brief for your marketing team\"]},{\"slug\":\"products\",\"label\":\"Product Photography\",\"title\":\"The details\\n*make the difference.*\",\"seo\":\"Greensburg & Pittsburgh Product Photography\",\"summary\":\"Bring the texture, character, and purpose of your products into focus.\",\"images\":[\"ptba-photo-05\",\"ptba-photo-14\",\"ptba-photo-01\",\"db-0166\",\"db-0617\"],\"text\":[\"Thoughtful product photographs help people picture what you make and why it belongs in their lives. From simple product views to styled brand stories, the approach starts with your audience.\",\"Plan product photography for your online shop, website, social media, or promotional campaign. Serving makers, merchants, and businesses in Greensburg, Pittsburgh, and Westmoreland County.\"],\"details\":[\"Styled products and brand details\",\"Online shop and website imagery\",\"Campaign and social content\"]},{\"slug\":\"fashion\",\"label\":\"Fashion\",\"title\":\"Style with\\n*a point of view.*\",\"seo\":\"Pittsburgh & Greensburg Fashion Photography\",\"summary\":\"Clothing, character, and a story told through style.\",\"images\":[\"db-0130\",\"db-0274\",\"db-0296\",\"db-0382\",\"db-0395\",\"db-0418\",\"db-0482\",\"db-0681\",\"db-0692\",\"db-0735\"],\"text\":[\"Fashion photography brings together styling, expression, and a visual idea. A collection, a brand, or a single statement piece can become the starting point for the story.\",\"For boutiques, designers, and creative businesses around Pittsburgh and Greensburg, share your collection, inspiration, models, and intended use. We will discuss a direction that fits your project.\"],\"details\":[\"Boutique and designer inquiries\",\"Styled collections and accessories\",\"Creative campaign planning\"]}]}}"),
	media: { "/": {
		type: "slideshow",
		images: [
			"portfolio-19",
			"upload-gazebo-wedding",
			"upload-storm-couple",
			"upload-senior-flowers",
			"upload-newborn-knit",
			"upload-girl-cardinals",
			"upload-toddler-dock",
			"upload-dog-tennis-ball",
			"upload-princess-carriage",
			"upload-marble-wedding",
			"upload-santa-baking",
			"upload-red-dress-forest",
			"upload-family-sleigh",
			"upload-pond-wedding",
			"upload-hedgehog-valentine",
			"upload-wedding-mother",
			"upload-halloween-carriage",
			"upload-newborn-hands",
			"upload-wedding-details",
			"portfolio-12",
			"portfolio-25",
			"portfolio-22",
			"wedding-03"
		]
	} },
	pages: /* @__PURE__ */ JSON.parse("{\"/\":{\"title\":\"Greensburg PA Photographer | Memories as Art Photography\",\"description\":\"Portrait, wedding, and commercial photography by Memories as Art. Based in Greensburg PA, serving Pittsburgh and Westmoreland County.\",\"heading\":\"Your life.\\n*A work of art.*\",\"intro\":\"\",\"eyebrow\":\"\",\"body\":\"\",\"image\":\"/assets/greensburg-fine-art-photography-girl-white-horse.webp\",\"heroIds\":[\"portfolio-19\",\"upload-gazebo-wedding\",\"upload-storm-couple\",\"upload-senior-flowers\",\"upload-newborn-knit\",\"upload-girl-cardinals\",\"upload-toddler-dock\",\"upload-dog-tennis-ball\",\"upload-princess-carriage\",\"upload-marble-wedding\",\"upload-santa-baking\",\"upload-red-dress-forest\",\"upload-family-sleigh\",\"upload-pond-wedding\",\"upload-hedgehog-valentine\",\"upload-wedding-mother\",\"upload-halloween-carriage\",\"upload-newborn-hands\",\"upload-wedding-details\",\"portfolio-12\",\"portfolio-25\",\"portfolio-22\",\"wedding-03\"],\"galleryIds\":[],\"preview\":false},\"/portraits/\":{\"title\":\"Greensburg PA Portrait Photographer | Memories as Art\",\"description\":\"Portrait photography for every chapter of your story, from tiny beginnings and growing families to beloved pets and a little make-believe. Based in Greensburg, PA, serving Westmoreland County and the Pittsburgh area.\",\"heading\":\"Ordinary moments.\\n*Extraordinary memories.*\",\"intro\":\"Portrait photography for every chapter of your story, from tiny beginnings and growing families to beloved pets and a little make-believe. Based in Greensburg, PA, serving Westmoreland County and the Pittsburgh area.\",\"eyebrow\":\"The art of being you\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-senior-photography-flowers-white-hat.webp\",\"heroIds\":[\"upload-senior-flowers\",\"upload-dog-tennis-ball\",\"upload-newborn-knit\",\"upload-family-sleigh\",\"portfolio-12\"],\"galleryIds\":[],\"preview\":false},\"/portraits/pets/\":{\"title\":\"Pet Photography in Greensburg PA | Memories as Art\",\"description\":\"Plan a pet photography session in Greensburg or the surrounding Westmoreland County area. Tell me about your pet’s personality, favorite things, and whether you would like to be in the photographs together.\",\"heading\":\"For the ones\\n*with paws.*\",\"intro\":\"Big personalities. Little paws. An entire piece of your heart.\",\"eyebrow\":\"[Portraits](/portraits/) / Pets\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-pet-photography-dog-tennis-ball.webp\",\"heroIds\":[\"upload-dog-tennis-ball\",\"upload-hedgehog-valentine\",\"portfolio-17\"],\"galleryIds\":[\"upload-dog-tennis-ball\",\"upload-hedgehog-valentine\",\"portfolio-17\",\"db-0003\",\"db-0009\",\"db-0018\",\"db-0031\",\"db-0035\",\"db-0044\",\"db-0053\",\"db-0059\",\"db-0062\",\"db-0073\",\"db-0081\",\"db-0154\",\"db-0163\",\"db-0205\",\"db-0227\",\"db-0301\",\"db-0316\",\"db-0349\",\"db-0396\",\"db-0421\",\"db-0432\",\"db-0451\",\"db-0464\",\"db-0488\",\"db-0500\",\"db-0509\",\"db-0514\",\"db-0540\",\"db-0554\",\"db-0556\",\"db-0580\",\"db-0609\",\"db-0618\",\"db-0660\",\"db-0672\",\"db-0726\"],\"preview\":false},\"/portraits/families/\":{\"title\":\"Greensburg PA Family Photography | Memories as Art\",\"description\":\"Based in Greensburg, I photograph families throughout Westmoreland County and the Pittsburgh area. We will talk through your family, clothing, and a setting that feels like you before your session.\",\"heading\":\"Your people.\\n*Your kind of love.*\",\"intro\":\"The in-between moments are the ones you will want to keep.\",\"eyebrow\":\"[Portraits](/portraits/) / Families\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-childrens-photography-woodland-dock-lantern.webp\",\"heroIds\":[\"upload-toddler-dock\",\"upload-family-sleigh\",\"portfolio-25\"],\"galleryIds\":[\"upload-toddler-dock\",\"upload-family-sleigh\",\"portfolio-25\",\"portfolio-07\",\"portfolio-08\",\"portfolio-16\",\"portfolio-18\",\"db-0000\",\"db-0003\",\"db-0005\",\"db-0023\",\"db-0032\",\"db-0038\",\"db-0052\",\"db-0059\",\"db-0062\",\"db-0064\",\"db-0069\",\"db-0077\",\"db-0078\",\"db-0080\",\"db-0088\",\"db-0092\",\"db-0110\",\"db-0127\",\"db-0131\",\"db-0138\",\"db-0140\",\"db-0143\",\"db-0148\",\"db-0150\",\"db-0156\",\"db-0170\",\"db-0172\",\"db-0183\",\"db-0195\",\"db-0205\",\"db-0210\",\"db-0218\",\"db-0227\",\"db-0231\",\"db-0240\",\"db-0255\",\"db-0256\",\"db-0263\",\"db-0266\",\"db-0272\",\"db-0291\",\"db-0297\",\"db-0310\",\"db-0322\",\"db-0335\",\"db-0340\",\"db-0375\",\"db-0384\",\"db-0408\",\"db-0411\",\"db-0417\",\"db-0425\",\"db-0432\",\"db-0433\",\"db-0441\",\"db-0452\",\"db-0475\",\"db-0479\",\"db-0485\",\"db-0488\",\"db-0491\",\"db-0495\",\"db-0496\",\"db-0497\",\"db-0502\",\"db-0503\",\"db-0507\",\"db-0511\",\"db-0516\",\"db-0518\",\"db-0519\",\"db-0527\",\"db-0529\",\"db-0530\",\"db-0534\",\"db-0538\",\"db-0543\",\"db-0545\",\"db-0546\",\"db-0571\",\"db-0572\",\"db-0578\",\"db-0583\",\"db-0585\",\"db-0593\",\"db-0601\",\"db-0603\",\"db-0621\",\"db-0625\",\"db-0641\",\"db-0645\",\"db-0647\",\"db-0651\",\"db-0653\",\"db-0654\",\"db-0660\",\"db-0682\",\"db-0685\",\"db-0686\",\"db-0697\",\"db-0708\",\"db-0713\",\"db-0714\",\"db-0725\",\"db-0731\",\"db-0732\",\"db-0734\"],\"preview\":false},\"/portraits/newborn/\":{\"title\":\"Greensburg Newborn & Baby Photography | Memories as Art\",\"description\":\"The baby plan follows your little one through newborn, 3, 6, 9, and 12 months, with an optional free maternity session add-on. Reach out to discuss your due date, scheduling, and current collection details for Greensburg, Westmoreland County, or the Pittsburgh area.\",\"heading\":\"So small.\\n*So much to remember.*\",\"intro\":\"From the very beginning to that first birthday.\",\"eyebrow\":\"[Portraits](/portraits/) / Newborn\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-newborn-photography-knitted-bonnet.webp\",\"heroIds\":[\"upload-newborn-knit\",\"upload-toddler-dock\",\"upload-newborn-hands\"],\"galleryIds\":[\"upload-newborn-knit\",\"upload-toddler-dock\",\"upload-newborn-hands\",\"portfolio-22\",\"portfolio-00\",\"portfolio-21\",\"portfolio-23\",\"portfolio-24\",\"db-0002\",\"db-0009\",\"db-0013\",\"db-0014\",\"db-0019\",\"db-0020\",\"db-0021\",\"db-0029\",\"db-0035\",\"db-0037\",\"db-0040\",\"db-0043\",\"db-0046\",\"db-0049\",\"db-0050\",\"db-0056\",\"db-0057\",\"db-0063\",\"db-0070\",\"db-0071\",\"db-0084\",\"db-0087\",\"db-0097\",\"db-0098\",\"db-0100\",\"db-0104\",\"db-0105\",\"db-0107\",\"db-0108\",\"db-0112\",\"db-0118\",\"db-0120\",\"db-0121\",\"db-0125\",\"db-0128\",\"db-0134\",\"db-0144\",\"db-0158\",\"db-0162\",\"db-0167\",\"db-0171\",\"db-0179\",\"db-0186\",\"db-0187\",\"db-0190\",\"db-0199\",\"db-0213\",\"db-0215\",\"db-0226\",\"db-0232\",\"db-0236\",\"db-0243\",\"db-0244\",\"db-0246\",\"db-0248\",\"db-0253\",\"db-0258\",\"db-0261\",\"db-0270\",\"db-0271\",\"db-0276\",\"db-0282\",\"db-0283\",\"db-0284\",\"db-0285\",\"db-0287\",\"db-0303\",\"db-0307\",\"db-0317\",\"db-0318\",\"db-0319\",\"db-0320\",\"db-0323\",\"db-0327\",\"db-0332\",\"db-0341\",\"db-0350\",\"db-0352\",\"db-0354\",\"db-0364\",\"db-0376\",\"db-0377\",\"db-0391\",\"db-0394\",\"db-0397\",\"db-0404\",\"db-0422\",\"db-0424\",\"db-0426\",\"db-0428\",\"db-0429\",\"db-0431\",\"db-0435\",\"db-0446\",\"db-0448\",\"db-0453\",\"db-0454\",\"db-0457\",\"db-0458\",\"db-0461\",\"db-0463\",\"db-0464\",\"db-0470\",\"db-0471\",\"db-0477\",\"db-0478\",\"db-0479\",\"db-0486\",\"db-0487\",\"db-0490\",\"db-0493\",\"db-0503\",\"db-0504\",\"db-0507\",\"db-0508\",\"db-0512\",\"db-0514\",\"db-0518\",\"db-0522\",\"db-0523\",\"db-0525\",\"db-0527\",\"db-0536\",\"db-0538\",\"db-0539\",\"db-0544\",\"db-0550\",\"db-0557\",\"db-0558\",\"db-0559\",\"db-0563\",\"db-0567\",\"db-0569\",\"db-0571\",\"db-0586\",\"db-0590\",\"db-0593\",\"db-0598\",\"db-0599\",\"db-0607\",\"db-0608\",\"db-0609\",\"db-0619\",\"db-0621\",\"db-0630\",\"db-0646\",\"db-0657\",\"db-0659\",\"db-0660\",\"db-0669\",\"db-0670\",\"db-0673\",\"db-0677\",\"db-0690\",\"db-0698\",\"db-0700\",\"db-0702\",\"db-0720\",\"db-0727\",\"db-0728\",\"db-0736\",\"db-0742\"],\"preview\":false},\"/portraits/seniors/\":{\"title\":\"Greensburg PA Senior Portrait Photographer | Memories as Art\",\"description\":\"For high school seniors in Greensburg, Westmoreland County, and the greater Pittsburgh area. Tell me your graduation year and the mood you have in mind, from simple and natural to imaginative and expressive.\",\"heading\":\"This chapter\\n*is all yours.*\",\"intro\":\"A celebration of who you are and everything ahead.\",\"eyebrow\":\"[Portraits](/portraits/) / Seniors\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-senior-portrait-red-dress-woodland-creek.webp\",\"heroIds\":[\"upload-red-dress-forest\",\"upload-senior-flowers\",\"db-0051\"],\"galleryIds\":[\"upload-red-dress-forest\",\"upload-senior-flowers\",\"db-0051\",\"db-0094\",\"db-0101\",\"db-0102\",\"db-0119\",\"db-0141\",\"db-0153\",\"db-0164\",\"db-0174\",\"db-0180\",\"db-0191\",\"db-0192\",\"db-0196\",\"db-0198\",\"db-0217\",\"db-0223\",\"db-0229\",\"db-0238\",\"db-0239\",\"db-0257\",\"db-0262\",\"db-0265\",\"db-0267\",\"db-0278\",\"db-0294\",\"db-0299\",\"db-0308\",\"db-0312\",\"db-0346\",\"db-0351\",\"db-0365\",\"db-0381\",\"db-0401\",\"db-0427\",\"db-0438\",\"db-0439\",\"db-0455\",\"db-0460\",\"db-0505\",\"db-0564\",\"db-0565\",\"db-0591\",\"db-0614\",\"db-0627\",\"db-0655\",\"db-0671\",\"db-0695\"],\"preview\":false},\"/portraits/limited-edition/\":{\"title\":\"Limited Edition Photography Sessions in Greensburg | Memories as Art\",\"description\":\"Themes, dates, props, and animal participation vary by event. Ask what is being planned for Greensburg and Westmoreland County, or share the theme you would love to see next. The photographs here show past creative work; current offerings are confirmed when booking.\",\"heading\":\"A little magic.\\n*Only for a moment.*\",\"intro\":\"Seasonal stories and imaginative little adventures.\",\"eyebrow\":\"[Portraits](/portraits/) / Limited Edition\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-santa-photography-baking-cookies.webp\",\"heroIds\":[\"upload-santa-baking\",\"upload-halloween-carriage\",\"upload-family-sleigh\"],\"galleryIds\":[\"upload-santa-baking\",\"upload-halloween-carriage\",\"upload-family-sleigh\",\"upload-princess-carriage\",\"upload-girl-cardinals\",\"portfolio-19\",\"portfolio-12\",\"portfolio-23\",\"portfolio-08\",\"db-0017\",\"db-0026\",\"db-0028\",\"db-0038\",\"db-0039\",\"db-0055\",\"db-0056\",\"db-0057\",\"db-0075\",\"db-0076\",\"db-0079\",\"db-0086\",\"db-0087\",\"db-0098\",\"db-0106\",\"db-0110\",\"db-0114\",\"db-0121\",\"db-0126\",\"db-0137\",\"db-0148\",\"db-0151\",\"db-0177\",\"db-0195\",\"db-0211\",\"db-0213\",\"db-0218\",\"db-0224\",\"db-0232\",\"db-0246\",\"db-0252\",\"db-0302\",\"db-0304\",\"db-0306\",\"db-0330\",\"db-0333\",\"db-0366\",\"db-0367\",\"db-0375\",\"db-0378\",\"db-0410\",\"db-0422\",\"db-0425\",\"db-0430\",\"db-0436\",\"db-0458\",\"db-0461\",\"db-0464\",\"db-0469\",\"db-0489\",\"db-0492\",\"db-0496\",\"db-0499\",\"db-0501\",\"db-0509\",\"db-0513\",\"db-0514\",\"db-0520\",\"db-0532\",\"db-0534\",\"db-0543\",\"db-0546\",\"db-0553\",\"db-0555\",\"db-0583\",\"db-0603\",\"db-0609\",\"db-0613\",\"db-0665\",\"db-0676\",\"db-0684\",\"db-0687\",\"db-0689\",\"db-0693\",\"db-0715\",\"db-0722\"],\"preview\":false},\"/portraits/fine-art/\":{\"title\":\"Fine Art Children’s Photography in Greensburg PA | Memories as Art\",\"description\":\"Creative sessions are planned individually, with styling, setting, and artistic editing working together. Explore fine art children’s photography from Memories as Art in Greensburg, serving families across Westmoreland County and the Pittsburgh region.\",\"heading\":\"Some stories\\n*begin with a daydream.*\",\"intro\":\"Imagination, light, and a little something extraordinary.\",\"eyebrow\":\"[Portraits](/portraits/) / Fine Art\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-senior-portrait-red-dress-woodland-creek.webp\",\"heroIds\":[\"upload-red-dress-forest\",\"upload-toddler-dock\",\"upload-storm-couple\"],\"galleryIds\":[\"upload-red-dress-forest\",\"upload-toddler-dock\",\"upload-storm-couple\",\"upload-halloween-carriage\",\"upload-princess-carriage\",\"upload-girl-cardinals\",\"portfolio-19\",\"portfolio-12\",\"portfolio-27\",\"portfolio-26\",\"portfolio-02\",\"portfolio-01\",\"db-0007\",\"db-0016\",\"db-0017\",\"db-0018\",\"db-0025\",\"db-0026\",\"db-0039\",\"db-0045\",\"db-0053\",\"db-0055\",\"db-0067\",\"db-0073\",\"db-0076\",\"db-0079\",\"db-0081\",\"db-0082\",\"db-0086\",\"db-0096\",\"db-0106\",\"db-0114\",\"db-0116\",\"db-0137\",\"db-0147\",\"db-0155\",\"db-0156\",\"db-0169\",\"db-0189\",\"db-0200\",\"db-0203\",\"db-0207\",\"db-0211\",\"db-0215\",\"db-0249\",\"db-0260\",\"db-0264\",\"db-0269\",\"db-0277\",\"db-0280\",\"db-0292\",\"db-0298\",\"db-0305\",\"db-0309\",\"db-0313\",\"db-0314\",\"db-0315\",\"db-0324\",\"db-0328\",\"db-0329\",\"db-0337\",\"db-0338\",\"db-0339\",\"db-0344\",\"db-0345\",\"db-0347\",\"db-0359\",\"db-0369\",\"db-0374\",\"db-0379\",\"db-0385\",\"db-0386\",\"db-0392\",\"db-0410\",\"db-0423\",\"db-0430\",\"db-0436\",\"db-0437\",\"db-0442\",\"db-0449\",\"db-0456\",\"db-0459\",\"db-0489\",\"db-0492\",\"db-0499\",\"db-0502\",\"db-0510\",\"db-0521\",\"db-0531\",\"db-0537\",\"db-0540\",\"db-0541\",\"db-0551\",\"db-0552\",\"db-0556\",\"db-0561\",\"db-0573\",\"db-0580\",\"db-0584\",\"db-0597\",\"db-0602\",\"db-0611\",\"db-0612\",\"db-0618\",\"db-0620\",\"db-0633\",\"db-0635\",\"db-0644\",\"db-0650\",\"db-0652\",\"db-0658\",\"db-0663\",\"db-0664\",\"db-0667\",\"db-0668\",\"db-0678\",\"db-0680\",\"db-0696\",\"db-0705\",\"db-0706\",\"db-0707\",\"db-0709\",\"db-0718\",\"db-0737\",\"db-0743\"],\"preview\":false},\"/portraits/boudoir/\":{\"title\":\"Greensburg PA Boudoir Photographer | Memories as Art\",\"description\":\"Based in the Greensburg area, Memories as Art welcomes boudoir photography inquiries from adults throughout Westmoreland County and the greater Pittsburgh area.\",\"heading\":\"Your confidence.\\n*Your story.*\",\"intro\":\"Personal, expressive portraits that celebrate your individual style.\",\"eyebrow\":\"[Portraits](/portraits/) / Boudoir\",\"body\":\"\",\"image\":\"/assets/pittsburgh-area-boudoir-photography-adult-at-vanity-mirror-in-blue-top-db0740.webp\",\"heroIds\":[\"db-0740\",\"db-0273\",\"db-0146\"],\"galleryIds\":[\"db-0740\",\"db-0273\",\"db-0146\",\"db-0027\",\"db-0103\",\"db-0149\",\"db-0343\",\"db-0362\",\"db-0363\",\"db-0380\",\"db-0528\",\"db-0643\"],\"preview\":false},\"/weddings/\":{\"title\":\"Pittsburgh & Greensburg Wedding Photographer | Memories as Art\",\"description\":\"Wedding photography for the moments you plan and the ones that find you. Celebrating couples in Greensburg, Pittsburgh, and Westmoreland County, with destination inquiries welcome.\",\"heading\":\"A love like yours.\\n*Remembered beautifully.*\",\"intro\":\"Wedding photography for the moments you plan and the ones that find you. Celebrating couples in Greensburg, Pittsburgh, and Westmoreland County, with destination inquiries welcome.\",\"eyebrow\":\"The wedding collection\",\"body\":\"\",\"image\":\"/assets/westmoreland-county-wedding-photography-rainy-night-gazebo.webp\",\"heroIds\":[\"upload-gazebo-wedding\",\"upload-marble-wedding\",\"upload-pond-wedding\",\"upload-wedding-mother\",\"upload-wedding-details\",\"wedding-03\",\"wedding-04\",\"wedding-10\"],\"galleryIds\":[],\"preview\":false},\"/weddings/engagements/\":{\"title\":\"Pittsburgh & Greensburg Engagement Photography | Memories as Art\",\"description\":\"Plan engagement photographs in Pittsburgh, Greensburg, or Westmoreland County. We will discuss the feel of the session, clothing, timing, and how you would like to use your photographs.\",\"heading\":\"Before “I do,”\\n*there is you.*\",\"intro\":\"A little time together. A story that is just beginning.\",\"eyebrow\":\"[Weddings](/weddings/) / Engagement Sessions\",\"body\":\"\",\"image\":\"/assets/westmoreland-county-couples-photography-lightning-sky.webp\",\"heroIds\":[\"upload-storm-couple\",\"db-0012\",\"db-0024\"],\"galleryIds\":[\"upload-storm-couple\",\"db-0012\",\"db-0024\",\"db-0028\",\"db-0033\",\"db-0036\",\"db-0047\",\"db-0085\",\"db-0113\",\"db-0133\",\"db-0208\",\"db-0214\",\"db-0225\",\"db-0234\",\"db-0251\",\"db-0254\",\"db-0286\",\"db-0293\",\"db-0295\",\"db-0311\",\"db-0353\",\"db-0357\",\"db-0387\",\"db-0409\",\"db-0416\",\"db-0443\",\"db-0466\",\"db-0467\",\"db-0476\",\"db-0517\",\"db-0548\",\"db-0549\",\"db-0569\",\"db-0604\",\"db-0605\",\"db-0623\",\"db-0628\",\"db-0631\",\"db-0642\",\"db-0661\",\"db-0672\",\"db-0674\",\"db-0679\",\"db-0719\",\"db-0724\"],\"preview\":false},\"/weddings/full-day/\":{\"title\":\"Pittsburgh & Greensburg Wedding Photographer | Memories as Art\",\"description\":\"For full day wedding photography in Pittsburgh, Greensburg, and Westmoreland County, share your date, venue, and plans. Together we will talk through the timeline and the coverage that fits your day.\",\"heading\":\"The whole story.\\n*All the feeling.*\",\"intro\":\"From quiet anticipation to a room full of celebration.\",\"eyebrow\":\"[Weddings](/weddings/) / Full Day Weddings\",\"body\":\"\",\"image\":\"/assets/greensburg-pa-wedding-photography-marble-staircase.webp\",\"heroIds\":[\"upload-marble-wedding\",\"upload-pond-wedding\",\"upload-wedding-mother\"],\"galleryIds\":[\"upload-marble-wedding\",\"upload-pond-wedding\",\"upload-wedding-mother\",\"upload-wedding-details\",\"upload-gazebo-wedding\",\"wedding-03\",\"wedding-09\",\"wedding-01\",\"wedding-11\",\"wedding-00\",\"wedding-04\",\"db-0001\",\"db-0004\",\"db-0006\",\"db-0008\",\"db-0011\",\"db-0022\",\"db-0030\",\"db-0034\",\"db-0041\",\"db-0042\",\"db-0048\",\"db-0054\",\"db-0058\",\"db-0060\",\"db-0061\",\"db-0065\",\"db-0066\",\"db-0068\",\"db-0072\",\"db-0074\",\"db-0083\",\"db-0089\",\"db-0090\",\"db-0091\",\"db-0099\",\"db-0109\",\"db-0111\",\"db-0115\",\"db-0122\",\"db-0123\",\"db-0124\",\"db-0135\",\"db-0136\",\"db-0139\",\"db-0142\",\"db-0145\",\"db-0152\",\"db-0157\",\"db-0159\",\"db-0160\",\"db-0165\",\"db-0166\",\"db-0168\",\"db-0173\",\"db-0181\",\"db-0182\",\"db-0184\",\"db-0185\",\"db-0193\",\"db-0194\",\"db-0197\",\"db-0201\",\"db-0202\",\"db-0204\",\"db-0206\",\"db-0209\",\"db-0212\",\"db-0216\",\"db-0219\",\"db-0221\",\"db-0222\",\"db-0228\",\"db-0230\",\"db-0233\",\"db-0235\",\"db-0242\",\"db-0245\",\"db-0247\",\"db-0250\",\"db-0259\",\"db-0268\",\"db-0275\",\"db-0279\",\"db-0281\",\"db-0288\",\"db-0289\",\"db-0331\",\"db-0342\",\"db-0348\",\"db-0355\",\"db-0356\",\"db-0358\",\"db-0360\",\"db-0361\",\"db-0368\",\"db-0370\",\"db-0371\",\"db-0372\",\"db-0373\",\"db-0383\",\"db-0388\",\"db-0389\",\"db-0390\",\"db-0393\",\"db-0398\",\"db-0399\",\"db-0400\",\"db-0402\",\"db-0403\",\"db-0405\",\"db-0406\",\"db-0407\",\"db-0412\",\"db-0413\",\"db-0414\",\"db-0415\",\"db-0419\",\"db-0434\",\"db-0440\",\"db-0444\",\"db-0445\",\"db-0447\",\"db-0450\",\"db-0462\",\"db-0465\",\"db-0468\",\"db-0472\",\"db-0473\",\"db-0474\",\"db-0481\",\"db-0483\",\"db-0494\",\"db-0498\",\"db-0515\",\"db-0526\",\"db-0533\",\"db-0535\",\"db-0560\",\"db-0562\",\"db-0566\",\"db-0570\",\"db-0575\",\"db-0576\",\"db-0577\",\"db-0581\",\"db-0582\",\"db-0587\",\"db-0588\",\"db-0589\",\"db-0592\",\"db-0595\",\"db-0600\",\"db-0606\",\"db-0615\",\"db-0622\",\"db-0624\",\"db-0626\",\"db-0629\",\"db-0632\",\"db-0634\",\"db-0636\",\"db-0639\",\"db-0640\",\"db-0648\",\"db-0662\",\"db-0666\",\"db-0675\",\"db-0683\",\"db-0688\",\"db-0694\",\"db-0699\",\"db-0701\",\"db-0703\",\"db-0704\",\"db-0712\",\"db-0717\",\"db-0723\",\"db-0729\",\"db-0730\",\"db-0733\",\"db-0738\",\"db-0739\",\"db-0741\",\"db-0744\"],\"preview\":false},\"/weddings/destination/\":{\"title\":\"Destination Wedding Photography | Pittsburgh Based | Memories as Art\",\"description\":\"Share your destination, dates, venue, and the experiences you want remembered. Travel arrangements, availability, and coverage are discussed individually with Memories as Art, based in the Greensburg and Pittsburgh region.\",\"heading\":\"Wherever love\\n*takes you.*\",\"intro\":\"A beautiful place. Your favorite people. A new adventure.\",\"eyebrow\":\"[Weddings](/weddings/) / Destination Weddings\",\"body\":\"\",\"image\":\"/assets/greensburg-wedding-photography-stone-arch.webp\",\"heroIds\":[\"wedding-02\",\"wedding-10\"],\"galleryIds\":[\"wedding-02\",\"wedding-10\"],\"preview\":true},\"/weddings/small-weddings-elopements/\":{\"title\":\"Pittsburgh Elopement & Small Wedding Photographer | Memories as Art\",\"description\":\"For small weddings and elopements around Pittsburgh, Greensburg, and Westmoreland County, tell me about your plans. We can talk through the ceremony, portraits, and the moments you would most like to preserve.\",\"heading\":\"A smaller gathering.\\n*A love just as big.*\",\"intro\":\"Intimate celebrations, with room for what matters most.\",\"eyebrow\":\"[Weddings](/weddings/) / Small Weddings / Elopements\",\"body\":\"\",\"image\":\"/assets/pittsburgh-wedding-photography-window-kiss.webp\",\"heroIds\":[\"wedding-04\",\"wedding-00\",\"wedding-10\"],\"galleryIds\":[\"wedding-04\",\"wedding-00\",\"wedding-10\"],\"preview\":true},\"/commercial/\":{\"title\":\"Greensburg & Pittsburgh Commercial Photography | Memories as Art\",\"description\":\"Commercial photography for the people, places, products, and businesses shaping our community. Serving Greensburg, Westmoreland County, and the greater Pittsburgh area.\",\"heading\":\"A fresh perspective.\\n*A lasting impression.*\",\"intro\":\"Commercial photography for the people, places, products, and businesses shaping our community. Serving Greensburg, Westmoreland County, and the greater Pittsburgh area.\",\"eyebrow\":\"Images with intention\",\"body\":\"\",\"image\":\"/assets/pittsburgh-food-photography-cocktail.webp\",\"heroIds\":[\"ptba-photo-00\",\"ptba-photo-03\",\"ptba-photo-04\"],\"galleryIds\":[],\"preview\":false},\"/commercial/real-estate/\":{\"title\":\"Greensburg & Westmoreland County Real Estate Photography | Memories as Art\",\"description\":\"For a property in Greensburg, Westmoreland County, or the Pittsburgh area, share the address, approximate size, key features, and timeline. Image requirements and any video or aerial requests can be discussed for your project.\",\"heading\":\"Every space\\n*has a story.*\",\"intro\":\"A thoughtful first impression for your next listing.\",\"eyebrow\":\"[Commercial](/commercial/) / Real Estate\",\"body\":\"\",\"image\":\"/assets/architecture.svg\",\"heroIds\":[\"architecture\"],\"galleryIds\":[],\"preview\":true},\"/commercial/local-business/\":{\"title\":\"Greensburg & Pittsburgh Business Brand Photography | Memories as Art\",\"description\":\"Working with businesses around Greensburg, Westmoreland County, and Pittsburgh, I connect the photography to how you will use it. For a wider marketing project, explore my work with PTBA Business Services.\",\"heading\":\"Your business.\\n*Seen with fresh eyes.*\",\"intro\":\"People, places, and the details that make your brand yours.\",\"eyebrow\":\"[Commercial](/commercial/) / Local Business\",\"body\":\"\",\"image\":\"/assets/greensburg-business-brand-photography.webp\",\"heroIds\":[\"ptba-photo-04\",\"ptba-photo-11\",\"ptba-photo-13\"],\"galleryIds\":[\"ptba-photo-04\",\"ptba-photo-11\",\"ptba-photo-13\",\"db-0176\",\"db-0547\"],\"preview\":false},\"/commercial/food/\":{\"title\":\"Pittsburgh & Greensburg Food Photography | Memories as Art\",\"description\":\"For restaurants, distilleries, cafés, and food businesses in Pittsburgh and Westmoreland County, share your menu, seasonal plans, and where the photographs will appear.\",\"heading\":\"A feast\\n*for the eyes.*\",\"intro\":\"Flavor, texture, and the atmosphere around the table.\",\"eyebrow\":\"[Commercial](/commercial/) / Food Photography\",\"body\":\"\",\"image\":\"/assets/pittsburgh-food-photography-plated-meal.webp\",\"heroIds\":[\"ptba-photo-03\",\"ptba-photo-06\",\"ptba-photo-00\"],\"galleryIds\":[\"ptba-photo-03\",\"ptba-photo-06\",\"ptba-photo-00\",\"ptba-photo-07\",\"db-0157\",\"db-0247\",\"db-0562\",\"db-0568\"],\"preview\":false},\"/commercial/corporate-headshots/\":{\"title\":\"Greensburg & Pittsburgh Corporate Headshots | Memories as Art\",\"description\":\"Individual and team headshot inquiries are welcome for Greensburg, Westmoreland County, and Pittsburgh businesses. Tell me about your team size, location, preferred look, and intended use.\",\"heading\":\"A portrait\\n*with purpose.*\",\"intro\":\"A professional first impression that still feels like you.\",\"eyebrow\":\"[Commercial](/commercial/) / Corporate Headshots\",\"body\":\"\",\"image\":\"/assets/greensburg-corporate-headshot.webp\",\"heroIds\":[\"ptba-photo-15\",\"ptba-photo-04\",\"ptba-photo-11\"],\"galleryIds\":[\"ptba-photo-15\",\"ptba-photo-04\",\"ptba-photo-11\",\"db-0325\",\"db-0610\",\"db-0716\"],\"preview\":false},\"/commercial/corporate-events/\":{\"title\":\"Pittsburgh & Westmoreland County Corporate Event Photography | Memories as Art\",\"description\":\"For a corporate event in Pittsburgh, Greensburg, or Westmoreland County, share the date, venue, schedule, and the images your team needs afterward. Coverage and usage are planned around your event.\",\"heading\":\"People together.\\n*Moments that matter.*\",\"intro\":\"The people, details, and energy of your event.\",\"eyebrow\":\"[Commercial](/commercial/) / Corporate Events\",\"body\":\"\",\"image\":\"/assets/westmoreland-county-business-photography-dj.webp\",\"heroIds\":[\"ptba-photo-13\",\"ptba-photo-11\"],\"galleryIds\":[\"ptba-photo-13\",\"ptba-photo-11\"],\"preview\":true},\"/commercial/products/\":{\"title\":\"Greensburg & Pittsburgh Product Photography | Memories as Art\",\"description\":\"Plan product photography for your online shop, website, social media, or promotional campaign. Serving makers, merchants, and businesses in Greensburg, Pittsburgh, and Westmoreland County.\",\"heading\":\"The details\\n*make the difference.*\",\"intro\":\"Bring the texture, character, and purpose of your products into focus.\",\"eyebrow\":\"[Commercial](/commercial/) / Product Photography\",\"body\":\"\",\"image\":\"/assets/greensburg-product-photography-styled-handbag.webp\",\"heroIds\":[\"ptba-photo-05\",\"ptba-photo-14\",\"ptba-photo-01\"],\"galleryIds\":[\"ptba-photo-05\",\"ptba-photo-14\",\"ptba-photo-01\",\"db-0166\",\"db-0617\"],\"preview\":false},\"/commercial/fashion/\":{\"title\":\"Pittsburgh & Greensburg Fashion Photography | Memories as Art\",\"description\":\"For boutiques, designers, and creative businesses around Pittsburgh and Greensburg, share your collection, inspiration, models, and intended use. We will discuss a direction that fits your project.\",\"heading\":\"Style with\\n*a point of view.*\",\"intro\":\"Clothing, character, and a story told through style.\",\"eyebrow\":\"[Commercial](/commercial/) / Fashion\",\"body\":\"\",\"image\":\"/assets/westmoreland-county-pa-fashion-photography-red-evening-gown-dramatic-light-db0130.webp\",\"heroIds\":[\"db-0130\",\"db-0274\",\"db-0296\"],\"galleryIds\":[\"db-0130\",\"db-0274\",\"db-0296\",\"db-0382\",\"db-0395\",\"db-0418\",\"db-0482\",\"db-0681\",\"db-0692\",\"db-0735\"],\"preview\":false},\"/shop/\":{\"title\":\"Shop · Coming Soon | Memories as Art\",\"description\":\"The Memories as Art shop is coming soon. Follow Tabitha’s fine art photography and creative work.\",\"heading\":\"A little wonder,\\n*for your everyday.*\",\"intro\":\"Artful things are on their way.\",\"eyebrow\":\"Memories as Art Shop\",\"body\":\"![A child in a red cape beside a tree in a storybook scene](/assets/greensburg-fine-art-photography-red-cape.webp)\\n\\nComing soon\\n\\n## Something lovely\\n*is taking shape.*\\n\\nThe Memories as Art shop is still being created. Follow along for new artwork and the next chapter.\\n\\n[Follow the art](https://www.facebook.com/AuthorIllustratorTabithaBowman/photos)\",\"image\":\"/assets/greensburg-fine-art-photography-red-cape.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/about/\":{\"title\":\"Meet Tabitha | Greensburg Photographer, Memories as Art\",\"description\":\"Meet Tabitha, the photographer and digital artist behind Memories as Art in Greensburg, serving Pittsburgh and Westmoreland County.\",\"heading\":\"Hi, I’m Tabitha.\\n*I see the art in it.*\",\"intro\":\"In the big celebrations, the tiny expressions, and the beautifully ordinary things we might otherwise forget. Photography is how I hold onto those moments — and help you hold onto yours.\",\"eyebrow\":\"The artist behind the photographs\",\"body\":\"![Tabitha, the photographer behind Memories as Art, holding her camera](/assets/tabitha-memories-as-art-greensburg-photographer.webp)\\n\\nI’m a photographer, digital artist, marketer, and mother in the Greensburg area. I love finding the color, light, and feeling that make a photograph worth returning to. Sometimes that means a quiet family portrait. Sometimes it means a little storybook magic.\\n\\n[Tell me your story](/inquire/)\\n\\nOne artist. Many kinds of stories.\\n\\n## Rooted in connection.\\n*Made with imagination.*\\n\\nMemories as Art is where your life and my imagination meet. Alongside portraits and weddings, I create commercial images and help businesses tell their stories through photography, design, and digital marketing.\\n\\n[Explore PTBA Business Services](https://ptbabusinessservices.com/)\",\"image\":\"/assets/tabitha-memories-as-art-greensburg-photographer.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/inquire/\":{\"title\":\"Photography Inquiries | Greensburg & Pittsburgh\",\"description\":\"Contact Memories as Art about portrait, wedding, real estate, and commercial photography in Greensburg, Pittsburgh, and Westmoreland County.\",\"heading\":\"What shall we\\n*create together?*\",\"intro\":\"Portraits, wedding plans, or a fresh vision for your business. I would love to hear what you are imagining.\",\"eyebrow\":\"Your story starts here\",\"body\":\"![A mother and daughter beneath a flowing white canopy](/assets/greensburg-family-photography-mother-daughter.webp)\\n\\nGreensburg · Pittsburgh · Westmoreland County\\n\\n## Let’s start with\\n*a little hello.*\\n\\nTell me about the photography you have in mind.\\n\\nInclude your preferred date or due date, location, the people involved, and anything you would love to ask.\\n\\n[Open the inquiry form](https://www.memoriesasart.com/book-your-session)\\n\\nThe inquiry form opens on the current Memories as Art website.\\n\\n[Find me on Facebook](https://www.facebook.com/memoriesasartphotography)[Follow on Instagram](https://www.instagram.com/memoriesasart_photography/)\",\"image\":\"/assets/greensburg-family-photography-mother-daughter.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/client-galleries/\":{\"title\":\"Client Photo Galleries | Memories as Art\",\"description\":\"Access your Memories as Art photography gallery and get in touch for help with your photographs.\",\"heading\":\"Your memories,\\n*waiting for you.*\",\"intro\":\"A place to return to the photographs we made together.\",\"eyebrow\":\"For my clients\",\"body\":\"![A family of three together in warm evening light](/assets/greensburg-pa-family-photography-golden-light.webp)\\n\\n## Find your gallery.\\n\\nOpen client access to view your photographs. If your gallery requires a password, use the details shared with you.\\n\\n[Open client galleries](https://www.memoriesasart.com/client-access)\\n\\nLooking for a gallery or need your access details again?\\n\\n[Get in touch](/inquire/)\",\"image\":\"/assets/greensburg-pa-family-photography-golden-light.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/blog/what-to-wear-family-photos/\":{\"title\":\"What to wear for family photographs | Memories as Art Journal\",\"description\":\"A practical wardrobe guide for Greensburg family photographs: comfortable clothing, coordinated colors, textures and planning for the season.\",\"heading\":\"What to wear for family photographs\",\"intro\":\"A thoughtful wardrobe can bring a photograph together without making everyone look exactly alike.\",\"eyebrow\":\"The Journal / Portrait notes\",\"body\":\"![A family of five nestled among evergreen trees](/assets/westmoreland-county-family-photography-evergreens.webp)\\n\\nWhen you are planning family photographs in the Greensburg area, clothing is one of the choices you can make before the camera comes out. The goal is to support the people in the photograph. Start with comfort, a few compatible colors, and the setting you have in mind.\\n\\n## Start with one outfit you love\\n\\nChoose an outfit that feels good on one person, then build the other outfits around its colors. Soft blue, cream, muted rose, warm brown, or gentle greens can give you a useful starting point. You do not need to use all of them, and your own style should lead the decision.\\n\\n## Coordinate without copying\\n\\nA little variety helps a family portrait feel natural. Mix a solid shirt with a subtle pattern, or bring in texture through a knit, linen, or a soft layer. Large lettering and very bold graphics can pull attention away from faces, so think about whether you want them to be part of the story.\\n\\n## Plan for the place and the season\\n\\nFor an outdoor session, consider temperature, walking, and sitting. Shoes should make sense for the ground you will be on. An easy layer can be useful when a Western Pennsylvania evening feels cooler than the afternoon. Before buying something new, confirm the session location and the overall look.\\n\\n## Give little ones room to be themselves\\n\\nHave children try on their outfits before the session. Itchy fabric, tight shoes, or something that needs constant adjusting can make it harder to relax. A comfortable outfit that allows a hug, a walk, or a little play is a thoughtful choice.\\n\\n## Think about where the photograph will live\\n\\nIf you hope to display a portrait at home, consider the colors in that room. They do not have to match perfectly; it is simply another way to make the finished photograph feel like it belongs in your life.\\n\\nBring your ideas when you inquire about [family photography](/portraits/families/). We can begin with the people, the place, and a look that feels like you.\\n\\n[Back to the journal](/blog/)\",\"image\":\"/assets/westmoreland-county-family-photography-evergreens.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/blog/pittsburgh-wedding-photo-timeline/\":{\"title\":\"Make room for the moments | Memories as Art Journal\",\"description\":\"Plan a Pittsburgh-area wedding photography timeline around your priorities, travel, family photographs and breathing room.\",\"heading\":\"Make room for the moments\",\"intro\":\"A starting point for planning your Pittsburgh-area wedding photography timeline.\",\"eyebrow\":\"The Journal / Wedding notes\",\"body\":\"![Newlyweds together on stone steps beneath an arch](/assets/greensburg-wedding-photography-stone-arch.webp)\\n\\nA good wedding photography timeline gives important moments somewhere to happen. It also leaves room for the day to feel like a celebration. Whether your wedding is in Pittsburgh, Greensburg, or elsewhere in Western Pennsylvania, begin with the events and people that matter most to you.\\n\\n## Decide what you want remembered\\n\\nAre getting-ready moments important? Do you want time for portraits together before the ceremony? Is a particular reception tradition a priority? Write down a short list before choosing coverage hours. Your photographer can discuss how those priorities fit the day you are planning.\\n\\n## Account for the actual journey\\n\\nIf the ceremony, portraits, and reception are in different places, include travel, parking, and the time it takes a group to leave one location and arrive at another. Check the route near your wedding date rather than relying only on a quiet-day estimate.\\n\\n## Make family photographs easier to organize\\n\\nPrepare a concise list of the groupings you want. Share names as well as relationships, and flag any family circumstances you want handled thoughtfully. A trusted person who recognizes everyone can be helpful when gathering the next group.\\n\\n## Talk about light and a weather alternative\\n\\nThe look of an outdoor portrait changes with the time of day, season, and setting. Discuss your ceremony timing, the available portrait locations, and an indoor or sheltered alternative. Venue permissions and access should be confirmed with the venue.\\n\\n## Leave breathing room\\n\\nA schedule with every minute assigned is difficult to follow when something runs late. Allow pauses around transitions and make sure the day includes time with the people you invited. Your photographs should remember the celebration you lived.\\n\\nWhen you [inquire about wedding photography](/weddings/experience/), share your date, venue, broad schedule, and priorities. Coverage, staffing, and delivery details can then be discussed specifically for your plans.\\n\\n[Back to the journal](/blog/)\",\"image\":\"/assets/greensburg-wedding-photography-stone-arch.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/blog/fine-art-childrens-portraits/\":{\"title\":\"From imagination to artwork | Memories as Art Journal\",\"description\":\"Explore fine-art children’s portraiture: personal ideas, thoughtful styling, expressive photographs and artistic editing at Memories as Art.\",\"heading\":\"From imagination to artwork\",\"intro\":\"What makes a fine-art children’s portrait feel like a story?\",\"eyebrow\":\"The Journal / The art of childhood\",\"body\":\"![A child in a red cape beside a tree in a storybook scene](/assets/greensburg-fine-art-photography-red-cape.webp)\\n\\nA fine-art children’s portrait can begin with something wonderfully small: a favorite color, a beloved story, an expression, or the way a child gets lost in their own imagination. The finished image brings that idea together with light, styling, and an artistic point of view.\\n\\n## Begin with the child\\n\\nAn imaginative concept works best when it leaves room for the person in the photograph. Talk about your child’s interests, personality, and comfort in a new setting. A quiet child and an energetic storyteller may need very different approaches.\\n\\n## Give the idea a visual language\\n\\nColor and texture help set a mood. Soft fabrics might suggest a gentle dream; a bright detail can make a character feel bold. A setting does not have to be complicated to be expressive. The aim is to make the details work together around the child.\\n\\n## Understand the role of editing\\n\\nFine-art portraiture can include creative editing or compositing as well as the original photograph. That means a finished scene may be an artistic interpretation, rather than a literal record of everything present during the session. It is useful to discuss the planned approach before booking.\\n\\n## Use past work as inspiration\\n\\nThe fine-art collection shows different creative directions from past work. A photograph featuring a particular prop, animal, or location does not mean that exact experience is currently available. Bring the images you love and ask what kind of concept can be created now.\\n\\n## Imagine the finished photograph\\n\\nThink about how you would like to enjoy the image: displayed in a child’s room, collected with family portraits, or kept as a reminder of this stage. Ask about current artwork and digital options as part of planning.\\n\\nExplore [fine-art children’s photography](/portraits/fine-art/) to see how a little imagination can become a photograph with a story of its own.\\n\\n[Back to the journal](/blog/)\",\"image\":\"/assets/greensburg-fine-art-photography-red-cape.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/blog/prepare-home-real-estate-photos/\":{\"title\":\"Before the first photograph | Memories as Art Journal\",\"description\":\"Prepare a Greensburg-area property for real estate photographs with a useful checklist for rooms, surfaces, lighting, exterior areas and access.\",\"heading\":\"Before the first photograph\",\"intro\":\"A practical home preparation checklist for your next property listing.\",\"eyebrow\":\"The Journal / Spaces & first impressions\",\"body\":\"![Illustrated house — real estate portfolio placeholder](/assets/architecture.svg)\\n\\nPreparing a property before a photography appointment helps the images focus on the space. Whether you are an owner or an agent planning a Greensburg-area listing, a simple walkthrough can reveal the small details that are easiest to fix before the camera is set up.\\n\\n## Start with the rooms that matter most\\n\\nWalk through the main living spaces, kitchen, bedrooms, and bathrooms. Straighten furniture and bedding, clear distracting surface clutter, and remove items that you do not want visible in published listing photographs.\\n\\n## Check personal and identifying details\\n\\nLook for mail, documents, family photographs, prescription labels, computer screens, and valuables. Decide what should be put away before the appointment. The person preparing the home is best placed to know what should remain private.\\n\\n## Make light and access predictable\\n\\nCheck that the rooms can be accessed and discuss any lighting issues with your photographer. Identify locked spaces, alarm arrangements, parking, pets, and other practical details before the appointment rather than working them out on arrival.\\n\\n## Give the exterior the same attention\\n\\nTidy the entryway, arrange outdoor furniture, and move items that distract from the property when practical. Let your photographer know about features you want included and any areas that are not ready.\\n\\n## Confirm the project details\\n\\nBefore booking, ask about the scope, image count, turnaround, file specifications, and permitted uses. If you need photographs for more than a standard property listing, say so. Add-ons and availability should be confirmed directly rather than assumed.\\n\\nHave a property in Greensburg or Westmoreland County? [Start a real estate photography conversation](/commercial/real-estate/) with the location, approximate size, and your timing.\\n\\n[Back to the journal](/blog/)\",\"image\":\"/assets/architecture.svg\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/blog/\":{\"title\":\"Photography Blog | Greensburg Portraits & Pittsburgh Weddings\",\"description\":\"Photography ideas and planning advice from Memories as Art: Greensburg family portraits, fine art, Pittsburgh weddings, and commercial photography.\",\"heading\":\"The *Journal.*\",\"intro\":\"Ideas, inspiration, and a little preparation for the memories ahead.\",\"eyebrow\":\"Notes from behind the lens\",\"body\":\"[![A family of five nestled among evergreen trees](/assets/westmoreland-county-family-photography-evergreens.webp)\\n\\nPortrait notes\\n\\n## What to wear for family photographs\\n\\nA thoughtful wardrobe can bring a photograph together without making everyone look exactly alike.](/blog/what-to-wear-family-photos/)[![Newlyweds together on stone steps beneath an arch](/assets/greensburg-wedding-photography-stone-arch.webp)\\n\\nWedding notes\\n\\n## Make room for the moments\\n\\nA starting point for planning your Pittsburgh-area wedding photography timeline.](/blog/pittsburgh-wedding-photo-timeline/)[![A child in a red cape beside a tree in a storybook scene](/assets/greensburg-fine-art-photography-red-cape.webp)\\n\\nThe art of childhood\\n\\n## From imagination to artwork\\n\\nWhat makes a fine-art children’s portrait feel like a story?](/blog/fine-art-childrens-portraits/)[![Illustrated house — real estate portfolio placeholder](/assets/architecture.svg)\\n\\nSpaces & first impressions\\n\\n## Before the first photograph\\n\\nA practical home preparation checklist for your next property listing.](/blog/prepare-home-real-estate-photos/)\",\"image\":\"/assets/greensburg-fine-art-photography-girl-white-horse.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false},\"/not-found/\":{\"title\":\"Page not found | Memories as Art\",\"description\":\"Return to Memories as Art photography.\",\"heading\":\"This page\\n*has wandered off.*\",\"intro\":\"\",\"eyebrow\":\"A little detour\",\"body\":\"\",\"image\":\"/assets/greensburg-fine-art-photography-girl-white-horse.webp\",\"heroIds\":[],\"galleryIds\":[],\"preview\":false}}"),
	aliases: {
		"/families/": "/portraits/",
		"/portraits/newborns/": "/portraits/newborn/",
		"/portraits/fine-art-children/": "/portraits/fine-art/",
		"/real-estate/": "/commercial/real-estate/",
		"/weddings/portfolio/": "/weddings/full-day/",
		"/weddings/experience/": "/weddings/",
		"/services/": "/",
		"/portfolio/": "/portraits/",
		"/portraits/maternity/": "/portraits/newborn/"
	},
	articles: [
		{
			slug: "what-to-wear-family-photos",
			category: "portraits",
			tag: "Portrait notes",
			title: "What to wear for family photographs",
			subtitle: "A thoughtful wardrobe can bring a photograph together without making everyone look exactly alike.",
			img: "portfolio-08",
			alt: "Family together among evergreen trees",
			desc: "A practical wardrobe guide for Greensburg family photographs: comfortable clothing, coordinated colors, textures and planning for the season.",
			body: "When you are planning family photographs in the Greensburg area, clothing is one of the choices you can make before the camera comes out. The goal is to support the people in the photograph. Start with comfort, a few compatible colors, and the setting you have in mind.\n\n## Start with one outfit you love\n\nChoose an outfit that feels good on one person, then build the other outfits around its colors. Soft blue, cream, muted rose, warm brown, or gentle greens can give you a useful starting point. You do not need to use all of them, and your own style should lead the decision.\n\n## Coordinate without copying\n\nA little variety helps a family portrait feel natural. Mix a solid shirt with a subtle pattern, or bring in texture through a knit, linen, or a soft layer. Large lettering and very bold graphics can pull attention away from faces, so think about whether you want them to be part of the story.\n\n## Plan for the place and the season\n\nFor an outdoor session, consider temperature, walking, and sitting. Shoes should make sense for the ground you will be on. An easy layer can be useful when a Western Pennsylvania evening feels cooler than the afternoon. Before buying something new, confirm the session location and the overall look.\n\n## Give little ones room to be themselves\n\nHave children try on their outfits before the session. Itchy fabric, tight shoes, or something that needs constant adjusting can make it harder to relax. A comfortable outfit that allows a hug, a walk, or a little play is a thoughtful choice.\n\n## Think about where the photograph will live\n\nIf you hope to display a portrait at home, consider the colors in that room. They do not have to match perfectly; it is simply another way to make the finished photograph feel like it belongs in your life.\n\nBring your ideas when you inquire about [family photography](/portraits/families/). We can begin with the people, the place, and a look that feels like you."
		},
		{
			slug: "pittsburgh-wedding-photo-timeline",
			category: "weddings",
			tag: "Wedding notes",
			title: "Make room for the moments",
			subtitle: "A starting point for planning your Pittsburgh-area wedding photography timeline.",
			img: "wedding-02",
			alt: "Bride and groom beneath a stone arch",
			desc: "Plan a Pittsburgh-area wedding photography timeline around your priorities, travel, family photographs and breathing room.",
			body: "A good wedding photography timeline gives important moments somewhere to happen. It also leaves room for the day to feel like a celebration. Whether your wedding is in Pittsburgh, Greensburg, or elsewhere in Western Pennsylvania, begin with the events and people that matter most to you.\n\n## Decide what you want remembered\n\nAre getting-ready moments important? Do you want time for portraits together before the ceremony? Is a particular reception tradition a priority? Write down a short list before choosing coverage hours. Your photographer can discuss how those priorities fit the day you are planning.\n\n## Account for the actual journey\n\nIf the ceremony, portraits, and reception are in different places, include travel, parking, and the time it takes a group to leave one location and arrive at another. Check the route near your wedding date rather than relying only on a quiet-day estimate.\n\n## Make family photographs easier to organize\n\nPrepare a concise list of the groupings you want. Share names as well as relationships, and flag any family circumstances you want handled thoughtfully. A trusted person who recognizes everyone can be helpful when gathering the next group.\n\n## Talk about light and a weather alternative\n\nThe look of an outdoor portrait changes with the time of day, season, and setting. Discuss your ceremony timing, the available portrait locations, and an indoor or sheltered alternative. Venue permissions and access should be confirmed with the venue.\n\n## Leave breathing room\n\nA schedule with every minute assigned is difficult to follow when something runs late. Allow pauses around transitions and make sure the day includes time with the people you invited. Your photographs should remember the celebration you lived.\n\nWhen you [inquire about wedding photography](/weddings/experience/), share your date, venue, broad schedule, and priorities. Coverage, staffing, and delivery details can then be discussed specifically for your plans."
		},
		{
			slug: "fine-art-childrens-portraits",
			category: "portraits",
			tag: "The art of childhood",
			title: "From imagination to artwork",
			subtitle: "What makes a fine-art children’s portrait feel like a story?",
			img: "portfolio-27",
			alt: "A child in a red cape beside a tree in a creative portrait",
			desc: "Explore fine-art children’s portraiture: personal ideas, thoughtful styling, expressive photographs and artistic editing at Memories as Art.",
			body: "A fine-art children’s portrait can begin with something wonderfully small: a favorite color, a beloved story, an expression, or the way a child gets lost in their own imagination. The finished image brings that idea together with light, styling, and an artistic point of view.\n\n## Begin with the child\n\nAn imaginative concept works best when it leaves room for the person in the photograph. Talk about your child’s interests, personality, and comfort in a new setting. A quiet child and an energetic storyteller may need very different approaches.\n\n## Give the idea a visual language\n\nColor and texture help set a mood. Soft fabrics might suggest a gentle dream; a bright detail can make a character feel bold. A setting does not have to be complicated to be expressive. The aim is to make the details work together around the child.\n\n## Understand the role of editing\n\nFine-art portraiture can include creative editing or compositing as well as the original photograph. That means a finished scene may be an artistic interpretation, rather than a literal record of everything present during the session. It is useful to discuss the planned approach before booking.\n\n## Use past work as inspiration\n\nThe fine-art collection shows different creative directions from past work. A photograph featuring a particular prop, animal, or location does not mean that exact experience is currently available. Bring the images you love and ask what kind of concept can be created now.\n\n## Imagine the finished photograph\n\nThink about how you would like to enjoy the image: displayed in a child’s room, collected with family portraits, or kept as a reminder of this stage. Ask about current artwork and digital options as part of planning.\n\nExplore [fine-art children’s photography](/portraits/fine-art/) to see how a little imagination can become a photograph with a story of its own."
		},
		{
			slug: "prepare-home-real-estate-photos",
			category: "business",
			tag: "Spaces & first impressions",
			title: "Before the first photograph",
			subtitle: "A practical home preparation checklist for your next property listing.",
			img: "architecture",
			alt: "Architectural line illustration of a home",
			desc: "Prepare a Greensburg-area property for real estate photographs with a useful checklist for rooms, surfaces, lighting, exterior areas and access.",
			body: "Preparing a property before a photography appointment helps the images focus on the space. Whether you are an owner or an agent planning a Greensburg-area listing, a simple walkthrough can reveal the small details that are easiest to fix before the camera is set up.\n\n## Start with the rooms that matter most\n\nWalk through the main living spaces, kitchen, bedrooms, and bathrooms. Straighten furniture and bedding, clear distracting surface clutter, and remove items that you do not want visible in published listing photographs.\n\n## Check personal and identifying details\n\nLook for mail, documents, family photographs, prescription labels, computer screens, and valuables. Decide what should be put away before the appointment. The person preparing the home is best placed to know what should remain private.\n\n## Make light and access predictable\n\nCheck that the rooms can be accessed and discuss any lighting issues with your photographer. Identify locked spaces, alarm arrangements, parking, pets, and other practical details before the appointment rather than working them out on arrival.\n\n## Give the exterior the same attention\n\nTidy the entryway, arrange outdoor furniture, and move items that distract from the property when practical. Let your photographer know about features you want included and any areas that are not ready.\n\n## Confirm the project details\n\nBefore booking, ask about the scope, image count, turnaround, file specifications, and permitted uses. If you need photographs for more than a standard property listing, say so. Add-ons and availability should be confirmed directly rather than assumed.\n\nHave a property in Greensburg or Westmoreland County? [Start a real estate photography conversation](/commercial/real-estate/) with the location, approximate size, and your timing."
		}
	]
}, jo = V.pages;
Object.keys(jo).filter((e) => e !== "/not-found/");
// packages/components/src/lib/photography/memories-portfolio.tsx
function Mo(e) {
	let t = e?.trim() ?? "";
	if (/^\/(?!\/)/.test(t) && !t.includes("\\")) return t;
	try {
		let e = new URL(t);
		return e.protocol === "https:" ? e.href : "";
	} catch {
		return "";
	}
}
function No({ photo: e, eager: t = !1, sizes: n = "(max-width: 1440px) 44vw, 700px" }) {
	return /* @__PURE__ */ (0, B.jsx)("img", {
		src: e.src,
		alt: e.alt,
		width: e.width,
		height: e.height,
		srcSet: e.smallSrc !== void 0 && e.smallSrc !== e.src ? `${e.smallSrc} ${e.smallWidth}w, ${e.src} ${e.width}w` : void 0,
		sizes: n,
		loading: t ? "eager" : "lazy",
		fetchPriority: t ? "high" : void 0,
		decoding: "async"
	});
}
function Po({ groupKey: e, group: t }) {
	return /* @__PURE__ */ (0, B.jsx)(B.Fragment, { children: t.items.map((t) => /* @__PURE__ */ (0, B.jsx)("a", {
		href: `/${e}/${t.slug}/`,
		children: t.label
	}, t.slug)) });
}
function Fo({ groupKey: e, group: t, active: n }) {
	let [r, i] = (0, bo.useState)(!1);
	return /* @__PURE__ */ (0, B.jsxs)("div", {
		className: "collection-nav-group",
		children: [
			/* @__PURE__ */ (0, B.jsx)("a", {
				href: `/${e}/`,
				"aria-current": n === e ? "page" : void 0,
				children: t.label
			}),
			/* @__PURE__ */ (0, B.jsx)("button", {
				className: "dropdown-toggle",
				"aria-expanded": r,
				"aria-controls": `nav-${e}`,
				"aria-label": `Show ${t.label.toLowerCase()} portfolios`,
				onClick: () => i(!r),
				children: "⌄"
			}),
			/* @__PURE__ */ (0, B.jsx)("div", {
				className: "dropdown",
				id: `nav-${e}`,
				hidden: !r,
				children: /* @__PURE__ */ (0, B.jsx)(Po, {
					groupKey: e,
					group: t
				})
			})
		]
	});
}
function Io({ active: e }) {
	let [t, n] = (0, bo.useState)(!1);
	return /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
		/* @__PURE__ */ (0, B.jsx)("a", {
			className: "skip-link",
			href: "#main",
			children: "Skip to content"
		}),
		/* @__PURE__ */ (0, B.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, B.jsxs)("nav", {
					className: "header-links",
					"aria-label": "Studio",
					children: [/* @__PURE__ */ (0, B.jsx)("a", {
						href: "/about/",
						children: "About"
					}), /* @__PURE__ */ (0, B.jsx)("a", {
						href: "/blog/",
						children: "Journal"
					})]
				}),
				/* @__PURE__ */ (0, B.jsx)("a", {
					className: "brand",
					href: "/",
					"aria-label": "Memories as Art home",
					children: /* @__PURE__ */ (0, B.jsx)("span", {
						className: "brand-window",
						children: /* @__PURE__ */ (0, B.jsx)("img", {
							src: "/assets/brand-logo-transparent.png",
							width: 1254,
							height: 1254,
							alt: "Memories as Art"
						})
					})
				}),
				/* @__PURE__ */ (0, B.jsxs)("nav", {
					className: "header-links right",
					"aria-label": "Get in touch",
					children: [/* @__PURE__ */ (0, B.jsx)("a", {
						href: "/client-galleries/",
						children: "Client galleries"
					}), /* @__PURE__ */ (0, B.jsx)("a", {
						href: "/inquire/",
						children: "Inquire ↗"
					})]
				}),
				/* @__PURE__ */ (0, B.jsxs)("button", {
					className: "menu-toggle",
					"aria-controls": "site-menu",
					"aria-expanded": t,
					onClick: () => n(!t),
					children: ["Menu ", /* @__PURE__ */ (0, B.jsx)("span", {
						"aria-hidden": "true",
						children: "☰"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, B.jsxs)("nav", {
			id: "site-menu",
			className: "site-menu",
			"aria-label": "Main menu",
			hidden: !t,
			children: [
				Object.entries(V.collections).map(([e, t]) => /* @__PURE__ */ (0, B.jsxs)("details", {
					className: "nav-group",
					children: [/* @__PURE__ */ (0, B.jsxs)("summary", { children: [t.label, /* @__PURE__ */ (0, B.jsx)("span", {
						"aria-hidden": "true",
						children: "+"
					})] }), /* @__PURE__ */ (0, B.jsxs)("div", { children: [/* @__PURE__ */ (0, B.jsxs)("a", {
						href: `/${e}/`,
						children: ["Explore all ", t.label.toLowerCase()]
					}), /* @__PURE__ */ (0, B.jsx)(Po, {
						groupKey: e,
						group: t
					})] })]
				}, e)),
				/* @__PURE__ */ (0, B.jsx)("a", {
					href: "/shop/",
					children: "Shop · Coming soon"
				}),
				/* @__PURE__ */ (0, B.jsx)("a", {
					href: "/about/",
					children: "About Tabitha"
				}),
				/* @__PURE__ */ (0, B.jsx)("a", {
					href: "/blog/",
					children: "Journal"
				}),
				/* @__PURE__ */ (0, B.jsx)("a", {
					href: "/client-galleries/",
					children: "Client galleries"
				}),
				/* @__PURE__ */ (0, B.jsx)("a", {
					href: "/inquire/",
					children: "Inquire"
				})
			]
		}),
		e === "" ? null : /* @__PURE__ */ (0, B.jsxs)("nav", {
			className: "collection-nav",
			"aria-label": "Photography collections",
			children: [Object.entries(V.collections).map(([t, n]) => /* @__PURE__ */ (0, B.jsx)(Fo, {
				groupKey: t,
				group: n,
				active: e
			}, t)), /* @__PURE__ */ (0, B.jsx)("a", {
				href: "/shop/",
				children: "Shop"
			})]
		})
	] });
}
function Lo() {
	return /* @__PURE__ */ (0, B.jsxs)("footer", {
		className: "site-footer",
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "footer-main",
			children: [
				/* @__PURE__ */ (0, B.jsx)("a", {
					className: "footer-name",
					href: "/",
					children: "Memories as Art"
				}),
				/* @__PURE__ */ (0, B.jsxs)("p", { children: [
					"Photographs with feeling.",
					/* @__PURE__ */ (0, B.jsx)("br", {}),
					"Greensburg · Westmoreland County · Pittsburgh"
				] }),
				/* @__PURE__ */ (0, B.jsxs)("nav", {
					"aria-label": "Studio links",
					children: [
						/* @__PURE__ */ (0, B.jsx)("a", {
							href: "/about/",
							children: "About"
						}),
						/* @__PURE__ */ (0, B.jsx)("a", {
							href: "/blog/",
							children: "Journal"
						}),
						/* @__PURE__ */ (0, B.jsx)("a", {
							href: "/client-galleries/",
							children: "Client galleries"
						}),
						/* @__PURE__ */ (0, B.jsx)("a", {
							href: "/inquire/",
							children: "Inquire"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, B.jsxs)("div", {
			className: "footer-bottom",
			children: [/* @__PURE__ */ (0, B.jsx)("small", { children: "© 2026 Memories as Art Photography" }), /* @__PURE__ */ (0, B.jsxs)("nav", {
				"aria-label": "Social media",
				children: [
					/* @__PURE__ */ (0, B.jsx)("a", {
						href: "https://www.instagram.com/memoriesasart_photography/",
						children: "Instagram"
					}),
					/* @__PURE__ */ (0, B.jsx)("a", {
						href: "https://www.facebook.com/memoriesasartphotography/photos",
						children: "Facebook"
					}),
					/* @__PURE__ */ (0, B.jsx)("a", {
						href: "https://www.facebook.com/AuthorIllustratorTabithaBowman/photos",
						children: "Fine art Facebook"
					}),
					/* @__PURE__ */ (0, B.jsx)("a", {
						href: "https://www.tiktok.com/@tabithaashleydavis",
						children: "TikTok"
					})
				]
			})]
		})]
	});
}
var Ro = "(prefers-reduced-motion: reduce)";
function zo(e) {
	let t = window.matchMedia(Ro);
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
}
function Bo() {
	return window.matchMedia(Ro).matches;
}
function Vo() {
	return !0;
}
function H({ photos: e, home: t, heading: n, video: r }) {
	let [i, a] = (0, bo.useState)(0), [o, s] = (0, bo.useState)(!1), c = (0, bo.useSyncExternalStore)(zo, Bo, Vo), l = (t) => a((n) => (n + t + e.length) % e.length);
	return (0, bo.useEffect)(() => {
		if (o || c || e.length < 2 || r !== "") return;
		let t = window.setInterval(() => a((t) => (t + 1) % e.length), 6e3);
		return () => window.clearInterval(t);
	}, [
		o,
		c,
		e.length,
		r
	]), /* @__PURE__ */ (0, B.jsxs)("section", {
		className: `hero-media ${t ? "home-media" : "portfolio-media"}`,
		"aria-label": t ? "Selected photography by Memories as Art" : "Portfolio slideshow",
		children: [
			/* @__PURE__ */ (0, B.jsx)("div", {
				className: "hero-frames",
				children: e.map((e, t) => /* @__PURE__ */ (0, B.jsx)("figure", {
					className: `hero-slide${t === i ? " is-active" : ""}`,
					"aria-hidden": t !== i,
					style: { "--slide-image": `url("${e.src}")` },
					children: /* @__PURE__ */ (0, B.jsx)(No, {
						photo: e,
						eager: t === 0,
						sizes: "100vw"
					})
				}, e.src))
			}),
			r === "" ? null : /* @__PURE__ */ (0, B.jsx)("video", {
				className: "hero-video",
				src: r,
				poster: e[0].src,
				muted: !0,
				playsInline: !0,
				loop: !0,
				controls: !0,
				autoPlay: !c,
				preload: "none",
				"aria-label": "Photography film",
				style: { opacity: 1 }
			}),
			t ? /* @__PURE__ */ (0, B.jsxs)("div", {
				className: "hero-caption",
				children: [
					/* @__PURE__ */ (0, B.jsx)("p", { children: "PHOTOGRAPHY WITH A LITTLE WONDER" }),
					/* @__PURE__ */ (0, B.jsx)("h1", { children: /* @__PURE__ */ (0, B.jsx)(Wo, {
						inline: !0,
						clientUrl: "https://www.memoriesasart.com/client-access",
						children: n
					}) }),
					/* @__PURE__ */ (0, B.jsx)("span", { children: "Greensburg, PA & the Pittsburgh area" })
				]
			}) : null,
			/* @__PURE__ */ (0, B.jsxs)("div", {
				className: "media-controls",
				children: [
					/* @__PURE__ */ (0, B.jsx)("button", {
						onClick: () => l(-1),
						"aria-label": "Previous slide",
						children: "←"
					}),
					/* @__PURE__ */ (0, B.jsxs)("span", {
						className: "media-count",
						children: [
							String(i + 1).padStart(2, "0"),
							" / ",
							String(e.length).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, B.jsx)("button", {
						onClick: () => l(1),
						"aria-label": "Next slide",
						children: "→"
					}),
					/* @__PURE__ */ (0, B.jsx)("button", {
						onClick: () => s(!o),
						"aria-label": o ? "Play slideshow" : "Pause slideshow",
						children: /* @__PURE__ */ (0, B.jsx)("span", {
							"aria-hidden": "true",
							children: o ? "▶" : "Ⅱ"
						})
					})
				]
			})
		]
	});
}
function U({ photos: e, index: t, onClose: n, onMove: r }) {
	let i = (0, bo.useRef)(null);
	(0, bo.useEffect)(() => {
		let e = i.current;
		return e.showModal(), () => e.close();
	}, []);
	let a = (n) => r((t + n + e.length) % e.length);
	return /* @__PURE__ */ (0, B.jsxs)("dialog", {
		ref: i,
		className: "lightbox",
		"aria-label": "Photograph viewer",
		onKeyDown: (e) => {
			e.key === "Escape" && n(), e.key === "ArrowLeft" && a(-1), e.key === "ArrowRight" && a(1);
		},
		onCancel: (e) => {
			e.preventDefault(), n();
		},
		children: [
			/* @__PURE__ */ (0, B.jsx)("button", {
				autoFocus: !0,
				className: "lightbox-close",
				"aria-label": "Close photograph",
				onClick: n,
				children: "×"
			}),
			/* @__PURE__ */ (0, B.jsx)("img", {
				src: e[t].src,
				alt: e[t].alt
			}),
			/* @__PURE__ */ (0, B.jsxs)("div", {
				className: "lightbox-bar",
				children: [
					/* @__PURE__ */ (0, B.jsx)("button", {
						onClick: () => a(-1),
						"aria-label": "Previous photograph",
						children: "←"
					}),
					/* @__PURE__ */ (0, B.jsx)("p", {
						className: "lightbox-caption",
						"aria-live": "polite",
						children: e[t].alt
					}),
					/* @__PURE__ */ (0, B.jsx)("button", {
						onClick: () => a(1),
						"aria-label": "Next photograph",
						children: "→"
					})
				]
			})
		]
	});
}
function Ho({ photos: e }) {
	let [t, n] = (0, bo.useState)(null);
	return /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "gallery-section wrap",
		children: [/* @__PURE__ */ (0, B.jsx)("div", {
			className: "photo-grid",
			"data-editable-gallery": !0,
			children: e.map((e, t) => /* @__PURE__ */ (0, B.jsxs)("button", {
				className: "photo",
				"aria-label": `View photograph: ${e.alt}`,
				onClick: () => n(t),
				children: [/* @__PURE__ */ (0, B.jsx)(No, {
					photo: e,
					sizes: t % 3 == 2 ? "(max-width: 1440px) 90vw, 1400px" : void 0
				}), /* @__PURE__ */ (0, B.jsx)("span", {
					className: "view-photo",
					"aria-hidden": "true",
					children: "View photograph ↗"
				})]
			}, e.src))
		}), t === null ? null : /* @__PURE__ */ (0, B.jsx)(U, {
			photos: e,
			index: t,
			onClose: () => n(null),
			onMove: n
		})]
	});
}
function Uo({ children: e }) {
	return /* @__PURE__ */ (0, B.jsx)(B.Fragment, { children: e });
}
function Wo({ children: e, clientUrl: t, inline: n = !1 }) {
	return /* @__PURE__ */ (0, B.jsx)(To, {
		components: n ? { p: Uo } : void 0,
		urlTransform: (e) => e === "https://www.memoriesasart.com/client-access" ? t : Mo(e),
		children: e
	});
}
function Go({ service: e }) {
	return /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "contact-strip",
		children: [/* @__PURE__ */ (0, B.jsxs)("h2", { children: ["Let’s make something ", /* @__PURE__ */ (0, B.jsx)("em", { children: "worth keeping." })] }), /* @__PURE__ */ (0, B.jsxs)("a", {
			className: "text-link",
			href: `/inquire/?service=${encodeURIComponent(e)}`,
			children: ["Start a conversation ", /* @__PURE__ */ (0, B.jsx)("span", {
				"aria-hidden": "true",
				children: "↗"
			})]
		})]
	});
}
function Ko({ groupKey: e, group: t, photo: n }) {
	let [r, i] = (0, bo.useState)(!1);
	return /* @__PURE__ */ (0, B.jsxs)("article", {
		className: "door",
		children: [
			/* @__PURE__ */ (0, B.jsx)("a", {
				href: `/${e}/`,
				children: /* @__PURE__ */ (0, B.jsx)("div", {
					className: "door-image",
					children: /* @__PURE__ */ (0, B.jsx)(No, { photo: n })
				})
			}),
			/* @__PURE__ */ (0, B.jsxs)("div", {
				className: "door-label",
				children: [/* @__PURE__ */ (0, B.jsx)("a", {
					href: `/${e}/`,
					children: t.label
				}), /* @__PURE__ */ (0, B.jsx)("button", {
					className: "dropdown-toggle",
					"aria-expanded": r,
					"aria-controls": `door-${e}`,
					"aria-label": `Show ${t.label.toLowerCase()} collections`,
					onClick: () => i(!r),
					children: "+"
				})]
			}),
			/* @__PURE__ */ (0, B.jsx)("div", {
				id: `door-${e}`,
				className: "door-dropdown",
				hidden: !r,
				children: /* @__PURE__ */ (0, B.jsx)(Po, {
					groupKey: e,
					group: t
				})
			})
		]
	});
}
function qo() {
	return /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsxs)("section", {
		className: "home-collections wrap",
		id: "collections",
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "section-label",
			children: [/* @__PURE__ */ (0, B.jsx)("span", { children: "FIND YOUR STORY" }), /* @__PURE__ */ (0, B.jsx)("span", { children: "01 — 04" })]
		}), /* @__PURE__ */ (0, B.jsxs)("div", {
			className: "four-doors",
			children: [Object.entries(V.collections).map(([e, t]) => /* @__PURE__ */ (0, B.jsx)(Ko, {
				groupKey: e,
				group: t,
				photo: V.photos[e === "portraits" ? "portfolio-19" : e === "weddings" ? "wedding-03" : "ptba-photo-00"]
			}, e)), /* @__PURE__ */ (0, B.jsxs)("article", {
				className: "door",
				children: [
					/* @__PURE__ */ (0, B.jsx)("a", {
						href: "/shop/",
						children: /* @__PURE__ */ (0, B.jsx)("div", {
							className: "door-image",
							children: /* @__PURE__ */ (0, B.jsx)(No, { photo: V.photos["portfolio-27"] })
						})
					}),
					/* @__PURE__ */ (0, B.jsxs)("div", {
						className: "door-label",
						children: [/* @__PURE__ */ (0, B.jsx)("a", {
							href: "/shop/",
							children: "Shop"
						}), /* @__PURE__ */ (0, B.jsx)("span", {
							"aria-hidden": "true",
							children: "↗"
						})]
					}),
					/* @__PURE__ */ (0, B.jsx)("p", {
						className: "coming-soon",
						children: "Coming soon"
					})
				]
			})]
		})]
	}), /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "home-intro wrap",
		children: [
			/* @__PURE__ */ (0, B.jsx)("p", {
				className: "eyebrow",
				children: "A little imagination. A lot of heart."
			}),
			/* @__PURE__ */ (0, B.jsxs)("h2", { children: [
				"For the moments that feel",
				/* @__PURE__ */ (0, B.jsx)("br", {}),
				/* @__PURE__ */ (0, B.jsx)("em", { children: "like a little bit of magic." })
			] }),
			/* @__PURE__ */ (0, B.jsx)("p", { children: "I’m Tabitha, the photographer and artist behind Memories as Art. I create photographs that hold onto a feeling — from the people you love to the stories you are building." }),
			/* @__PURE__ */ (0, B.jsxs)("p", {
				className: "local-line",
				children: [
					"Portraits, weddings & commercial photography",
					/* @__PURE__ */ (0, B.jsx)("br", {}),
					"Greensburg, Pennsylvania · Westmoreland County · Pittsburgh"
				]
			}),
			/* @__PURE__ */ (0, B.jsx)("a", {
				className: "text-link",
				href: "/about/",
				children: "Meet the artist ↗"
			})
		]
	})] });
}
function Jo({ groupKey: e, group: t }) {
	return /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "wrap collection-section",
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "section-label",
			children: [/* @__PURE__ */ (0, B.jsx)("span", { children: "EXPLORE THE COLLECTIONS" }), /* @__PURE__ */ (0, B.jsx)("span", { children: String(t.items.length).padStart(2, "0") })]
		}), /* @__PURE__ */ (0, B.jsx)("div", {
			className: "portfolio-cards",
			children: t.items.map((t) => /* @__PURE__ */ (0, B.jsxs)("a", {
				className: "portfolio-card",
				href: `/${e}/${t.slug}/`,
				children: [
					/* @__PURE__ */ (0, B.jsx)("div", {
						className: "card-image",
						children: /* @__PURE__ */ (0, B.jsx)(No, { photo: V.photos[t.images[0]] })
					}),
					/* @__PURE__ */ (0, B.jsxs)("h3", { children: [
						t.label,
						" ",
						/* @__PURE__ */ (0, B.jsx)("span", {
							"aria-hidden": "true",
							children: "↗"
						})
					] }),
					/* @__PURE__ */ (0, B.jsx)("p", { children: t.summary })
				]
			}, t.slug))
		})]
	});
}
function Yo({ item: e, clientUrl: t }) {
	return /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsxs)("section", {
		className: "portfolio-story wrap",
		children: [/* @__PURE__ */ (0, B.jsx)("h2", { children: e.seo }), /* @__PURE__ */ (0, B.jsx)("div", {
			className: "story-copy",
			children: e.text.map((e) => /* @__PURE__ */ (0, B.jsx)(Wo, {
				clientUrl: t,
				children: e
			}, e))
		})]
	}), e.babyPlan === !0 ? /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "baby-plan wrap",
		children: [/* @__PURE__ */ (0, B.jsxs)("div", { children: [
			/* @__PURE__ */ (0, B.jsx)("p", {
				className: "eyebrow",
				children: "The baby plan"
			}),
			/* @__PURE__ */ (0, B.jsxs)("h2", { children: [
				"A whole year",
				/* @__PURE__ */ (0, B.jsx)("br", {}),
				/* @__PURE__ */ (0, B.jsx)("em", { children: "of little wonders." })
			] }),
			/* @__PURE__ */ (0, B.jsx)("p", { children: "Five chapters, from the very beginning to their first birthday." })
		] }), /* @__PURE__ */ (0, B.jsxs)("div", { children: [
			/* @__PURE__ */ (0, B.jsx)("ol", {
				className: "milestones",
				children: [
					"Newborn",
					"3 months",
					"6 months",
					"9 months",
					"12 months"
				].map((e, t) => /* @__PURE__ */ (0, B.jsxs)("li", { children: [/* @__PURE__ */ (0, B.jsx)("span", { children: String(t + 1).padStart(2, "0") }), /* @__PURE__ */ (0, B.jsx)("p", { children: e })] }, e))
			}),
			/* @__PURE__ */ (0, B.jsxs)("p", {
				className: "maternity-note",
				children: [
					"Optional ",
					/* @__PURE__ */ (0, B.jsx)("strong", { children: "free maternity session" }),
					" add-on."
				]
			}),
			/* @__PURE__ */ (0, B.jsx)("a", {
				className: "text-link",
				href: "/inquire/?service=Newborn%20baby%20plan",
				children: "Ask about the baby plan ↗"
			})
		] })]
	}) : null] });
}
function Xo() {
	let [e, t] = (0, bo.useState)("all");
	return /* @__PURE__ */ (0, B.jsxs)("section", {
		className: "journal-page wrap",
		children: [/* @__PURE__ */ (0, B.jsx)("div", {
			className: "journal-filters",
			"aria-label": "Filter stories",
			children: [
				["all", "All stories"],
				["portraits", "Portraits"],
				["weddings", "Weddings"],
				["business", "Business"]
			].map(([n, r]) => /* @__PURE__ */ (0, B.jsx)("button", {
				"aria-pressed": e === n,
				onClick: () => t(n),
				children: r
			}, n))
		}), /* @__PURE__ */ (0, B.jsx)("div", {
			className: "journal-cards",
			children: V.articles.filter((t) => e === "all" || t.category === e).map((e) => /* @__PURE__ */ (0, B.jsxs)("a", {
				className: "journal-card",
				href: `/blog/${e.slug}/`,
				children: [
					/* @__PURE__ */ (0, B.jsx)("div", {
						className: "journal-image",
						children: /* @__PURE__ */ (0, B.jsx)(No, { photo: V.photos[e.img] })
					}),
					/* @__PURE__ */ (0, B.jsx)("p", {
						className: "eyebrow",
						children: e.tag
					}),
					/* @__PURE__ */ (0, B.jsx)("h2", { children: e.title }),
					/* @__PURE__ */ (0, B.jsx)("p", { children: e.desc })
				]
			}, e.slug))
		})]
	});
}
function Zo(e) {
	let t = e.pagePath ?? "/", n = jo[t] === void 0 ? "/" : t, r = jo[n], i = n.split("/").filter(Boolean), a = i[0] ?? "", o = i.length <= 2 ? V.collections[a] : void 0, s = o?.items.find((e) => e.slug === i[1]), c = n === "/", l = e.heading?.trim() ?? "", u = l === "" ? c ? "Your life.  \n*A work of art.*" : s?.title ?? o?.headline ?? r.heading : l, d = e.intro?.trim() ?? "", f = d === "" ? s?.summary ?? o?.description ?? r.intro : d, p = Mo(e.clientGalleryUrl), m = p === "" ? "https://www.memoriesasart.com/client-access" : p, h = Mo(e.heroImage?.src), g = c ? V.media["/"].images : s === void 0 ? o === void 0 ? r.heroIds : o.images : s.images.slice(0, 3), _ = (e) => e.filter((e) => e !== "architecture").map((e) => V.photos[e]), v = h === "" ? _(g) : [{
		src: h,
		alt: e.heroImage?.alt ?? "Selected photography by Memories as Art"
	}], y = (e.galleryImages ?? "").split("\n").map((e) => {
		let [t, ...n] = e.split("|");
		return {
			src: Mo(t),
			alt: n.join("|").trim() === "" ? "Photograph by Memories as Art" : n.join("|").trim()
		};
	}).filter((e) => e.src !== ""), b = y.length > 0 ? y : _(s === void 0 ? r.galleryIds : s.images);
	return /* @__PURE__ */ (0, B.jsxs)("div", {
		className: "maa-site",
		"data-flow": "bleed",
		children: [
			/* @__PURE__ */ (0, B.jsx)(Io, { active: a }),
			/* @__PURE__ */ (0, B.jsxs)("main", {
				id: "main",
				children: [
					c ? null : /* @__PURE__ */ (0, B.jsxs)("header", {
						className: "page-intro",
						children: [
							/* @__PURE__ */ (0, B.jsx)("p", {
								className: "eyebrow",
								children: s === void 0 ? o === void 0 ? r.eyebrow : o.eyebrow : `${o.label} / ${s.label}`
							}),
							/* @__PURE__ */ (0, B.jsx)("h1", { children: /* @__PURE__ */ (0, B.jsx)(Wo, {
								inline: !0,
								clientUrl: m,
								children: u
							}) }),
							/* @__PURE__ */ (0, B.jsx)("p", { children: f })
						]
					}),
					v.length > 0 ? /* @__PURE__ */ (0, B.jsx)(H, {
						photos: v,
						home: c,
						heading: u,
						video: Mo(e.heroVideo)
					}, `${n}:${h}`) : null,
					" ",
					c ? /* @__PURE__ */ (0, B.jsx)(qo, {}) : s === void 0 ? o === void 0 ? /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [n === "/blog/" ? /* @__PURE__ */ (0, B.jsx)(Xo, {}) : /* @__PURE__ */ (0, B.jsx)("section", {
						className: "photography-copy wrap article-copy",
						children: /* @__PURE__ */ (0, B.jsx)(Wo, {
							clientUrl: m,
							children: r.body
						})
					}), b.length > 0 ? /* @__PURE__ */ (0, B.jsx)(Ho, { photos: b }) : null] }) : /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
						/* @__PURE__ */ (0, B.jsx)(Jo, {
							groupKey: a,
							group: o
						}),
						a === "commercial" ? /* @__PURE__ */ (0, B.jsxs)("section", {
							className: "marketing-note wrap",
							children: [
								/* @__PURE__ */ (0, B.jsx)("p", {
									className: "eyebrow",
									children: "The bigger picture"
								}),
								/* @__PURE__ */ (0, B.jsxs)("h2", { children: [
									"Good photographs.",
									/* @__PURE__ */ (0, B.jsx)("br", {}),
									/* @__PURE__ */ (0, B.jsx)("em", { children: "Thoughtful marketing." })
								] }),
								/* @__PURE__ */ (0, B.jsx)("p", { children: "Need help putting your images to work? I also offer digital marketing and design through PTBA Business Services." }),
								/* @__PURE__ */ (0, B.jsx)("a", {
									className: "text-link",
									href: "https://ptbabusinessservices.com/",
									children: "Explore my marketing work ↗"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, B.jsx)(Go, { service: o.label })
					] }) : /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
						/* @__PURE__ */ (0, B.jsx)(Yo, {
							item: s,
							clientUrl: m
						}),
						s.preview === !0 ? /* @__PURE__ */ (0, B.jsx)("p", {
							className: "preview-note",
							children: s.previewNote
						}) : null,
						/* @__PURE__ */ (0, B.jsx)(Ho, { photos: b }),
						/* @__PURE__ */ (0, B.jsx)("section", {
							className: "session-notes wrap",
							children: /* @__PURE__ */ (0, B.jsx)("div", { children: s.details.map((e) => /* @__PURE__ */ (0, B.jsx)("p", { children: e }, e)) })
						}),
						/* @__PURE__ */ (0, B.jsx)(Go, { service: s.label })
					] })
				]
			}),
			/* @__PURE__ */ (0, B.jsx)(Lo, {})
		]
	});
}
// tools/preview/client.tsx
var Qo = document.getElementById("photography-preview");
Qo && (0, Ao.hydrateRoot)(Qo, (0, bo.createElement)(Zo, { pagePath: Qo.dataset.pagePath }));
