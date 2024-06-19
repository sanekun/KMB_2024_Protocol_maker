(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const a of s)
      if (a.type === "childList")
        for (const i of a.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const a = {};
    return (
      s.integrity && (a.integrity = s.integrity),
      s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const a = r(s);
    fetch(s.href, a);
  }
})();
function Do(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var vs = { exports: {} },
  C = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var K = typeof Symbol == "function" && Symbol.for,
  kn = K ? Symbol.for("react.element") : 60103,
  jn = K ? Symbol.for("react.portal") : 60106,
  Cr = K ? Symbol.for("react.fragment") : 60107,
  kr = K ? Symbol.for("react.strict_mode") : 60108,
  jr = K ? Symbol.for("react.profiler") : 60114,
  zr = K ? Symbol.for("react.provider") : 60109,
  Pr = K ? Symbol.for("react.context") : 60110,
  zn = K ? Symbol.for("react.async_mode") : 60111,
  $r = K ? Symbol.for("react.concurrent_mode") : 60111,
  Wr = K ? Symbol.for("react.forward_ref") : 60112,
  Yr = K ? Symbol.for("react.suspense") : 60113,
  xo = K ? Symbol.for("react.suspense_list") : 60120,
  Hr = K ? Symbol.for("react.memo") : 60115,
  Kr = K ? Symbol.for("react.lazy") : 60116,
  Lo = K ? Symbol.for("react.block") : 60121,
  Mo = K ? Symbol.for("react.fundamental") : 60117,
  Eo = K ? Symbol.for("react.responder") : 60118,
  Uo = K ? Symbol.for("react.scope") : 60119;
function ct(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case kn:
        switch (((e = e.type), e)) {
          case zn:
          case $r:
          case Cr:
          case jr:
          case kr:
          case Yr:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case Pr:
              case Wr:
              case Kr:
              case Hr:
              case zr:
                return e;
              default:
                return t;
            }
        }
      case jn:
        return t;
    }
  }
}
function Is(e) {
  return ct(e) === $r;
}
C.AsyncMode = zn;
C.ConcurrentMode = $r;
C.ContextConsumer = Pr;
C.ContextProvider = zr;
C.Element = kn;
C.ForwardRef = Wr;
C.Fragment = Cr;
C.Lazy = Kr;
C.Memo = Hr;
C.Portal = jn;
C.Profiler = jr;
C.StrictMode = kr;
C.Suspense = Yr;
C.isAsyncMode = function (e) {
  return Is(e) || ct(e) === zn;
};
C.isConcurrentMode = Is;
C.isContextConsumer = function (e) {
  return ct(e) === Pr;
};
C.isContextProvider = function (e) {
  return ct(e) === zr;
};
C.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === kn;
};
C.isForwardRef = function (e) {
  return ct(e) === Wr;
};
C.isFragment = function (e) {
  return ct(e) === Cr;
};
C.isLazy = function (e) {
  return ct(e) === Kr;
};
C.isMemo = function (e) {
  return ct(e) === Hr;
};
C.isPortal = function (e) {
  return ct(e) === jn;
};
C.isProfiler = function (e) {
  return ct(e) === jr;
};
C.isStrictMode = function (e) {
  return ct(e) === kr;
};
C.isSuspense = function (e) {
  return ct(e) === Yr;
};
C.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Cr ||
    e === $r ||
    e === jr ||
    e === kr ||
    e === Yr ||
    e === xo ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Kr ||
        e.$$typeof === Hr ||
        e.$$typeof === zr ||
        e.$$typeof === Pr ||
        e.$$typeof === Wr ||
        e.$$typeof === Mo ||
        e.$$typeof === Eo ||
        e.$$typeof === Uo ||
        e.$$typeof === Lo))
  );
};
C.typeOf = ct;
vs.exports = C;
var No = vs.exports,
  Ss = No,
  Vo = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  Ro = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  Bs = {};
Bs[Ss.ForwardRef] = Vo;
Bs[Ss.Memo] = Ro;
var As = { exports: {} },
  k = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var ji = Object.getOwnPropertySymbols,
  Co = Object.prototype.hasOwnProperty,
  ko = Object.prototype.propertyIsEnumerable;
function jo(e) {
  if (e == null)
    throw new TypeError(
      "Object.assign cannot be called with null or undefined"
    );
  return Object(e);
}
function zo() {
  try {
    if (!Object.assign) return !1;
    var e = new String("abc");
    if (((e[5] = "de"), Object.getOwnPropertyNames(e)[0] === "5")) return !1;
    for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
    var n = Object.getOwnPropertyNames(t).map(function (a) {
      return t[a];
    });
    if (n.join("") !== "0123456789") return !1;
    var s = {};
    return (
      "abcdefghijklmnopqrst".split("").forEach(function (a) {
        s[a] = a;
      }),
      Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst"
    );
  } catch {
    return !1;
  }
}
var Po = zo()
  ? Object.assign
  : function (e, t) {
      for (var r, n = jo(e), s, a = 1; a < arguments.length; a++) {
        r = Object(arguments[a]);
        for (var i in r) Co.call(r, i) && (n[i] = r[i]);
        if (ji) {
          s = ji(r);
          for (var o = 0; o < s.length; o++)
            ko.call(r, s[o]) && (n[s[o]] = r[s[o]]);
        }
      }
      return n;
    };
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pn = Po,
  gt = typeof Symbol == "function" && Symbol.for,
  Ye = gt ? Symbol.for("react.element") : 60103,
  $o = gt ? Symbol.for("react.portal") : 60106,
  Wo = gt ? Symbol.for("react.fragment") : 60107,
  Yo = gt ? Symbol.for("react.strict_mode") : 60108,
  Ho = gt ? Symbol.for("react.profiler") : 60114,
  Ko = gt ? Symbol.for("react.provider") : 60109,
  Jo = gt ? Symbol.for("react.context") : 60110,
  Go = gt ? Symbol.for("react.forward_ref") : 60112,
  qo = gt ? Symbol.for("react.suspense") : 60113,
  Zo = gt ? Symbol.for("react.memo") : 60115,
  Qo = gt ? Symbol.for("react.lazy") : 60116,
  zi = typeof Symbol == "function" && Symbol.iterator;
function He(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1;
    r < arguments.length;
    r++
  )
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Ts = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Fs = {};
function Ae(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = Fs),
    (this.updater = r || Ts);
}
Ae.prototype.isReactComponent = {};
Ae.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(He(85));
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ae.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Os() {}
Os.prototype = Ae.prototype;
function $n(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = Fs),
    (this.updater = r || Ts);
}
var Wn = ($n.prototype = new Os());
Wn.constructor = $n;
Pn(Wn, Ae.prototype);
Wn.isPureReactComponent = !0;
var Yn = { current: null },
  Ds = Object.prototype.hasOwnProperty,
  xs = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ls(e, t, r) {
  var n,
    s = {},
    a = null,
    i = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      Ds.call(t, n) && !xs.hasOwnProperty(n) && (s[n] = t[n]);
  var o = arguments.length - 2;
  if (o === 1) s.children = r;
  else if (1 < o) {
    for (var c = Array(o), u = 0; u < o; u++) c[u] = arguments[u + 2];
    s.children = c;
  }
  if (e && e.defaultProps)
    for (n in ((o = e.defaultProps), o)) s[n] === void 0 && (s[n] = o[n]);
  return {
    $$typeof: Ye,
    type: e,
    key: a,
    ref: i,
    props: s,
    _owner: Yn.current,
  };
}
function Xo(e, t) {
  return {
    $$typeof: Ye,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Hn(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ye;
}
function tc(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    ("" + e).replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var Ms = /\/+/g,
  mr = [];
function Es(e, t, r, n) {
  if (mr.length) {
    var s = mr.pop();
    return (
      (s.result = e),
      (s.keyPrefix = t),
      (s.func = r),
      (s.context = n),
      (s.count = 0),
      s
    );
  }
  return { result: e, keyPrefix: t, func: r, context: n, count: 0 };
}
function Us(e) {
  (e.result = null),
    (e.keyPrefix = null),
    (e.func = null),
    (e.context = null),
    (e.count = 0),
    10 > mr.length && mr.push(e);
}
function Tn(e, t, r, n) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (s) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Ye:
          case $o:
            a = !0;
        }
    }
  if (a) return r(n, e, t === "" ? "." + ln(e, 0) : t), 1;
  if (((a = 0), (t = t === "" ? "." : t + ":"), Array.isArray(e)))
    for (var i = 0; i < e.length; i++) {
      s = e[i];
      var o = t + ln(s, i);
      a += Tn(s, o, r, n);
    }
  else if (
    (e === null || typeof e != "object"
      ? (o = null)
      : ((o = (zi && e[zi]) || e["@@iterator"]),
        (o = typeof o == "function" ? o : null)),
    typeof o == "function")
  )
    for (e = o.call(e), i = 0; !(s = e.next()).done; )
      (s = s.value), (o = t + ln(s, i++)), (a += Tn(s, o, r, n));
  else if (s === "object")
    throw (
      ((r = "" + e),
      Error(
        He(
          31,
          r === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : r,
          ""
        )
      ))
    );
  return a;
}
function Fn(e, t, r) {
  return e == null ? 0 : Tn(e, "", t, r);
}
function ln(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? tc(e.key)
    : t.toString(36);
}
function ec(e, t) {
  e.func.call(e.context, t, e.count++);
}
function rc(e, t, r) {
  var n = e.result,
    s = e.keyPrefix;
  (e = e.func.call(e.context, t, e.count++)),
    Array.isArray(e)
      ? On(e, n, r, function (a) {
          return a;
        })
      : e != null &&
        (Hn(e) &&
          (e = Xo(
            e,
            s +
              (!e.key || (t && t.key === e.key)
                ? ""
                : ("" + e.key).replace(Ms, "$&/") + "/") +
              r
          )),
        n.push(e));
}
function On(e, t, r, n, s) {
  var a = "";
  r != null && (a = ("" + r).replace(Ms, "$&/") + "/"),
    (t = Es(t, a, n, s)),
    Fn(e, rc, t),
    Us(t);
}
var Ns = { current: null };
function Ut() {
  var e = Ns.current;
  if (e === null) throw Error(He(321));
  return e;
}
var nc = {
  ReactCurrentDispatcher: Ns,
  ReactCurrentBatchConfig: { suspense: null },
  ReactCurrentOwner: Yn,
  IsSomeRendererActing: { current: !1 },
  assign: Pn,
};
k.Children = {
  map: function (e, t, r) {
    if (e == null) return e;
    var n = [];
    return On(e, n, null, t, r), n;
  },
  forEach: function (e, t, r) {
    if (e == null) return e;
    (t = Es(null, null, t, r)), Fn(e, ec, t), Us(t);
  },
  count: function (e) {
    return Fn(
      e,
      function () {
        return null;
      },
      null
    );
  },
  toArray: function (e) {
    var t = [];
    return (
      On(e, t, null, function (r) {
        return r;
      }),
      t
    );
  },
  only: function (e) {
    if (!Hn(e)) throw Error(He(143));
    return e;
  },
};
k.Component = Ae;
k.Fragment = Wo;
k.Profiler = Ho;
k.PureComponent = $n;
k.StrictMode = Yo;
k.Suspense = qo;
k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nc;
k.cloneElement = function (e, t, r) {
  if (e == null) throw Error(He(267, e));
  var n = Pn({}, e.props),
    s = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = Yn.current)),
      t.key !== void 0 && (s = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var o = e.type.defaultProps;
    for (c in t)
      Ds.call(t, c) &&
        !xs.hasOwnProperty(c) &&
        (n[c] = t[c] === void 0 && o !== void 0 ? o[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) n.children = r;
  else if (1 < c) {
    o = Array(c);
    for (var u = 0; u < c; u++) o[u] = arguments[u + 2];
    n.children = o;
  }
  return { $$typeof: Ye, type: e.type, key: s, ref: a, props: n, _owner: i };
};
k.createContext = function (e, t) {
  return (
    t === void 0 && (t = null),
    (e = {
      $$typeof: Jo,
      _calculateChangedBits: t,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (e.Provider = { $$typeof: Ko, _context: e }),
    (e.Consumer = e)
  );
};
k.createElement = Ls;
k.createFactory = function (e) {
  var t = Ls.bind(null, e);
  return (t.type = e), t;
};
k.createRef = function () {
  return { current: null };
};
k.forwardRef = function (e) {
  return { $$typeof: Go, render: e };
};
k.isValidElement = Hn;
k.lazy = function (e) {
  return { $$typeof: Qo, _ctor: e, _status: -1, _result: null };
};
k.memo = function (e, t) {
  return { $$typeof: Zo, type: e, compare: t === void 0 ? null : t };
};
k.useCallback = function (e, t) {
  return Ut().useCallback(e, t);
};
k.useContext = function (e, t) {
  return Ut().useContext(e, t);
};
k.useDebugValue = function () {};
k.useEffect = function (e, t) {
  return Ut().useEffect(e, t);
};
k.useImperativeHandle = function (e, t, r) {
  return Ut().useImperativeHandle(e, t, r);
};
k.useLayoutEffect = function (e, t) {
  return Ut().useLayoutEffect(e, t);
};
k.useMemo = function (e, t) {
  return Ut().useMemo(e, t);
};
k.useReducer = function (e, t, r) {
  return Ut().useReducer(e, t, r);
};
k.useRef = function (e) {
  return Ut().useRef(e);
};
k.useState = function (e) {
  return Ut().useState(e);
};
k.version = "16.14.0";
As.exports = k;
var ic = As.exports;
const sc = Do(ic),
  Vs = new WeakMap(),
  Dn = new WeakMap();
function P(e) {
  const t = Vs.get(e);
  return (
    console.assert(t != null, "'this' is expected an Event object, but got", e),
    t
  );
}
function Pi(e) {
  if (e.passiveListener != null) {
    typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "Unable to preventDefault inside passive event listener invocation.",
        e.passiveListener
      );
    return;
  }
  e.event.cancelable &&
    ((e.canceled = !0),
    typeof e.event.preventDefault == "function" && e.event.preventDefault());
}
function pe(e, t) {
  Vs.set(this, {
    eventTarget: e,
    event: t,
    eventPhase: 2,
    currentTarget: e,
    canceled: !1,
    stopped: !1,
    immediateStopped: !1,
    passiveListener: null,
    timeStamp: t.timeStamp || Date.now(),
  }),
    Object.defineProperty(this, "isTrusted", { value: !1, enumerable: !0 });
  const r = Object.keys(t);
  for (let n = 0; n < r.length; ++n) {
    const s = r[n];
    s in this || Object.defineProperty(this, s, Rs(s));
  }
}
pe.prototype = {
  get type() {
    return P(this).event.type;
  },
  get target() {
    return P(this).eventTarget;
  },
  get currentTarget() {
    return P(this).currentTarget;
  },
  composedPath() {
    const e = P(this).currentTarget;
    return e == null ? [] : [e];
  },
  get NONE() {
    return 0;
  },
  get CAPTURING_PHASE() {
    return 1;
  },
  get AT_TARGET() {
    return 2;
  },
  get BUBBLING_PHASE() {
    return 3;
  },
  get eventPhase() {
    return P(this).eventPhase;
  },
  stopPropagation() {
    const e = P(this);
    (e.stopped = !0),
      typeof e.event.stopPropagation == "function" && e.event.stopPropagation();
  },
  stopImmediatePropagation() {
    const e = P(this);
    (e.stopped = !0),
      (e.immediateStopped = !0),
      typeof e.event.stopImmediatePropagation == "function" &&
        e.event.stopImmediatePropagation();
  },
  get bubbles() {
    return !!P(this).event.bubbles;
  },
  get cancelable() {
    return !!P(this).event.cancelable;
  },
  preventDefault() {
    Pi(P(this));
  },
  get defaultPrevented() {
    return P(this).canceled;
  },
  get composed() {
    return !!P(this).event.composed;
  },
  get timeStamp() {
    return P(this).timeStamp;
  },
  get srcElement() {
    return P(this).eventTarget;
  },
  get cancelBubble() {
    return P(this).stopped;
  },
  set cancelBubble(e) {
    if (!e) return;
    const t = P(this);
    (t.stopped = !0),
      typeof t.event.cancelBubble == "boolean" && (t.event.cancelBubble = !0);
  },
  get returnValue() {
    return !P(this).canceled;
  },
  set returnValue(e) {
    e || Pi(P(this));
  },
  initEvent() {},
};
Object.defineProperty(pe.prototype, "constructor", {
  value: pe,
  configurable: !0,
  writable: !0,
});
typeof window < "u" &&
  typeof window.Event < "u" &&
  (Object.setPrototypeOf(pe.prototype, window.Event.prototype),
  Dn.set(window.Event.prototype, pe));
function Rs(e) {
  return {
    get() {
      return P(this).event[e];
    },
    set(t) {
      P(this).event[e] = t;
    },
    configurable: !0,
    enumerable: !0,
  };
}
function ac(e) {
  return {
    value() {
      const t = P(this).event;
      return t[e].apply(t, arguments);
    },
    configurable: !0,
    enumerable: !0,
  };
}
function oc(e, t) {
  const r = Object.keys(t);
  if (r.length === 0) return e;
  function n(s, a) {
    e.call(this, s, a);
  }
  n.prototype = Object.create(e.prototype, {
    constructor: { value: n, configurable: !0, writable: !0 },
  });
  for (let s = 0; s < r.length; ++s) {
    const a = r[s];
    if (!(a in e.prototype)) {
      const o =
        typeof Object.getOwnPropertyDescriptor(t, a).value == "function";
      Object.defineProperty(n.prototype, a, o ? ac(a) : Rs(a));
    }
  }
  return n;
}
function Cs(e) {
  if (e == null || e === Object.prototype) return pe;
  let t = Dn.get(e);
  return (
    t == null && ((t = oc(Cs(Object.getPrototypeOf(e)), e)), Dn.set(e, t)), t
  );
}
function cc(e, t) {
  const r = Cs(Object.getPrototypeOf(t));
  return new r(e, t);
}
function uc(e) {
  return P(e).immediateStopped;
}
function lc(e, t) {
  P(e).eventPhase = t;
}
function hc(e, t) {
  P(e).currentTarget = t;
}
function $i(e, t) {
  P(e).passiveListener = t;
}
const ks = new WeakMap(),
  Wi = 1,
  Yi = 2,
  fr = 3;
function dr(e) {
  return e !== null && typeof e == "object";
}
function Me(e) {
  const t = ks.get(e);
  if (t == null)
    throw new TypeError(
      "'this' is expected an EventTarget object, but got another value."
    );
  return t;
}
function fc(e) {
  return {
    get() {
      let r = Me(this).get(e);
      for (; r != null; ) {
        if (r.listenerType === fr) return r.listener;
        r = r.next;
      }
      return null;
    },
    set(t) {
      typeof t != "function" && !dr(t) && (t = null);
      const r = Me(this);
      let n = null,
        s = r.get(e);
      for (; s != null; )
        s.listenerType === fr
          ? n !== null
            ? (n.next = s.next)
            : s.next !== null
            ? r.set(e, s.next)
            : r.delete(e)
          : (n = s),
          (s = s.next);
      if (t !== null) {
        const a = {
          listener: t,
          listenerType: fr,
          passive: !1,
          once: !1,
          next: null,
        };
        n === null ? r.set(e, a) : (n.next = a);
      }
    },
    configurable: !0,
    enumerable: !0,
  };
}
function dc(e, t) {
  Object.defineProperty(e, `on${t}`, fc(t));
}
function Hi(e) {
  function t() {
    zt.call(this);
  }
  t.prototype = Object.create(zt.prototype, {
    constructor: { value: t, configurable: !0, writable: !0 },
  });
  for (let r = 0; r < e.length; ++r) dc(t.prototype, e[r]);
  return t;
}
function zt() {
  if (this instanceof zt) {
    ks.set(this, new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0]))
    return Hi(arguments[0]);
  if (arguments.length > 0) {
    const e = new Array(arguments.length);
    for (let t = 0; t < arguments.length; ++t) e[t] = arguments[t];
    return Hi(e);
  }
  throw new TypeError("Cannot call a class as a function");
}
zt.prototype = {
  addEventListener(e, t, r) {
    if (t == null) return;
    if (typeof t != "function" && !dr(t))
      throw new TypeError("'listener' should be a function or an object.");
    const n = Me(this),
      s = dr(r),
      i = (s ? !!r.capture : !!r) ? Wi : Yi,
      o = {
        listener: t,
        listenerType: i,
        passive: s && !!r.passive,
        once: s && !!r.once,
        next: null,
      };
    let c = n.get(e);
    if (c === void 0) {
      n.set(e, o);
      return;
    }
    let u = null;
    for (; c != null; ) {
      if (c.listener === t && c.listenerType === i) return;
      (u = c), (c = c.next);
    }
    u.next = o;
  },
  removeEventListener(e, t, r) {
    if (t == null) return;
    const n = Me(this),
      a = (dr(r) ? !!r.capture : !!r) ? Wi : Yi;
    let i = null,
      o = n.get(e);
    for (; o != null; ) {
      if (o.listener === t && o.listenerType === a) {
        i !== null
          ? (i.next = o.next)
          : o.next !== null
          ? n.set(e, o.next)
          : n.delete(e);
        return;
      }
      (i = o), (o = o.next);
    }
  },
  dispatchEvent(e) {
    if (e == null || typeof e.type != "string")
      throw new TypeError('"event.type" should be a string.');
    const t = Me(this),
      r = e.type;
    let n = t.get(r);
    if (n == null) return !0;
    const s = cc(this, e);
    let a = null;
    for (; n != null; ) {
      if (
        (n.once
          ? a !== null
            ? (a.next = n.next)
            : n.next !== null
            ? t.set(r, n.next)
            : t.delete(r)
          : (a = n),
        $i(s, n.passive ? n.listener : null),
        typeof n.listener == "function")
      )
        try {
          n.listener.call(this, s);
        } catch (i) {
          typeof console < "u" &&
            typeof console.error == "function" &&
            console.error(i);
        }
      else
        n.listenerType !== fr &&
          typeof n.listener.handleEvent == "function" &&
          n.listener.handleEvent(s);
      if (uc(s)) break;
      n = n.next;
    }
    return $i(s, null), lc(s, 0), hc(s, null), !s.defaultPrevented;
  },
};
Object.defineProperty(zt.prototype, "constructor", {
  value: zt,
  configurable: !0,
  writable: !0,
});
typeof window < "u" &&
  typeof window.EventTarget < "u" &&
  Object.setPrototypeOf(zt.prototype, window.EventTarget.prototype);
var h = {};
h.SIZEOF_SHORT = 2;
h.SIZEOF_INT = 4;
h.FILE_IDENTIFIER_LENGTH = 4;
h.Encoding = { UTF8_BYTES: 1, UTF16_STRING: 2 };
h.int32 = new Int32Array(2);
h.float32 = new Float32Array(h.int32.buffer);
h.float64 = new Float64Array(h.int32.buffer);
h.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
h.Long = function (e, t) {
  (this.low = e | 0), (this.high = t | 0);
};
h.Long.create = function (e, t) {
  return e == 0 && t == 0 ? h.Long.ZERO : new h.Long(e, t);
};
h.Long.prototype.toFloat64 = function () {
  return (this.low >>> 0) + this.high * 4294967296;
};
h.Long.prototype.equals = function (e) {
  return this.low == e.low && this.high == e.high;
};
h.Long.ZERO = new h.Long(0, 0);
h.Builder = function (e) {
  if (e) var t = e;
  else var t = 1024;
  (this.bb = h.ByteBuffer.allocate(t)),
    (this.space = t),
    (this.minalign = 1),
    (this.vtable = null),
    (this.vtable_in_use = 0),
    (this.isNested = !1),
    (this.object_start = 0),
    (this.vtables = []),
    (this.vector_num_elems = 0),
    (this.force_defaults = !1);
};
h.Builder.prototype.clear = function () {
  this.bb.clear(),
    (this.space = this.bb.capacity()),
    (this.minalign = 1),
    (this.vtable = null),
    (this.vtable_in_use = 0),
    (this.isNested = !1),
    (this.object_start = 0),
    (this.vtables = []),
    (this.vector_num_elems = 0),
    (this.force_defaults = !1);
};
h.Builder.prototype.forceDefaults = function (e) {
  this.force_defaults = e;
};
h.Builder.prototype.dataBuffer = function () {
  return this.bb;
};
h.Builder.prototype.asUint8Array = function () {
  return this.bb
    .bytes()
    .subarray(this.bb.position(), this.bb.position() + this.offset());
};
h.Builder.prototype.prep = function (e, t) {
  e > this.minalign && (this.minalign = e);
  for (
    var r = (~(this.bb.capacity() - this.space + t) + 1) & (e - 1);
    this.space < r + e + t;

  ) {
    var n = this.bb.capacity();
    (this.bb = h.Builder.growByteBuffer(this.bb)),
      (this.space += this.bb.capacity() - n);
  }
  this.pad(r);
};
h.Builder.prototype.pad = function (e) {
  for (var t = 0; t < e; t++) this.bb.writeInt8(--this.space, 0);
};
h.Builder.prototype.writeInt8 = function (e) {
  this.bb.writeInt8((this.space -= 1), e);
};
h.Builder.prototype.writeInt16 = function (e) {
  this.bb.writeInt16((this.space -= 2), e);
};
h.Builder.prototype.writeInt32 = function (e) {
  this.bb.writeInt32((this.space -= 4), e);
};
h.Builder.prototype.writeInt64 = function (e) {
  this.bb.writeInt64((this.space -= 8), e);
};
h.Builder.prototype.writeFloat32 = function (e) {
  this.bb.writeFloat32((this.space -= 4), e);
};
h.Builder.prototype.writeFloat64 = function (e) {
  this.bb.writeFloat64((this.space -= 8), e);
};
h.Builder.prototype.addInt8 = function (e) {
  this.prep(1, 0), this.writeInt8(e);
};
h.Builder.prototype.addInt16 = function (e) {
  this.prep(2, 0), this.writeInt16(e);
};
h.Builder.prototype.addInt32 = function (e) {
  this.prep(4, 0), this.writeInt32(e);
};
h.Builder.prototype.addInt64 = function (e) {
  this.prep(8, 0), this.writeInt64(e);
};
h.Builder.prototype.addFloat32 = function (e) {
  this.prep(4, 0), this.writeFloat32(e);
};
h.Builder.prototype.addFloat64 = function (e) {
  this.prep(8, 0), this.writeFloat64(e);
};
h.Builder.prototype.addFieldInt8 = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addInt8(t), this.slot(e));
};
h.Builder.prototype.addFieldInt16 = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addInt16(t), this.slot(e));
};
h.Builder.prototype.addFieldInt32 = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addInt32(t), this.slot(e));
};
h.Builder.prototype.addFieldInt64 = function (e, t, r) {
  (this.force_defaults || !t.equals(r)) && (this.addInt64(t), this.slot(e));
};
h.Builder.prototype.addFieldFloat32 = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addFloat32(t), this.slot(e));
};
h.Builder.prototype.addFieldFloat64 = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addFloat64(t), this.slot(e));
};
h.Builder.prototype.addFieldOffset = function (e, t, r) {
  (this.force_defaults || t != r) && (this.addOffset(t), this.slot(e));
};
h.Builder.prototype.addFieldStruct = function (e, t, r) {
  t != r && (this.nested(t), this.slot(e));
};
h.Builder.prototype.nested = function (e) {
  if (e != this.offset())
    throw new Error("FlatBuffers: struct must be serialized inline.");
};
h.Builder.prototype.notNested = function () {
  if (this.isNested)
    throw new Error("FlatBuffers: object serialization must not be nested.");
};
h.Builder.prototype.slot = function (e) {
  this.vtable[e] = this.offset();
};
h.Builder.prototype.offset = function () {
  return this.bb.capacity() - this.space;
};
h.Builder.growByteBuffer = function (e) {
  var t = e.capacity();
  if (t & 3221225472)
    throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
  var r = t << 1,
    n = h.ByteBuffer.allocate(r);
  return n.setPosition(r - t), n.bytes().set(e.bytes(), r - t), n;
};
h.Builder.prototype.addOffset = function (e) {
  this.prep(h.SIZEOF_INT, 0), this.writeInt32(this.offset() - e + h.SIZEOF_INT);
};
h.Builder.prototype.startObject = function (e) {
  this.notNested(),
    this.vtable == null && (this.vtable = []),
    (this.vtable_in_use = e);
  for (var t = 0; t < e; t++) this.vtable[t] = 0;
  (this.isNested = !0), (this.object_start = this.offset());
};
h.Builder.prototype.endObject = function () {
  if (this.vtable == null || !this.isNested)
    throw new Error("FlatBuffers: endObject called without startObject");
  this.addInt32(0);
  for (
    var e = this.offset(), t = this.vtable_in_use - 1;
    t >= 0 && this.vtable[t] == 0;
    t--
  );
  for (var r = t + 1; t >= 0; t--)
    this.addInt16(this.vtable[t] != 0 ? e - this.vtable[t] : 0);
  var n = 2;
  this.addInt16(e - this.object_start);
  var s = (r + n) * h.SIZEOF_SHORT;
  this.addInt16(s);
  var a = 0,
    i = this.space;
  t: for (t = 0; t < this.vtables.length; t++) {
    var o = this.bb.capacity() - this.vtables[t];
    if (s == this.bb.readInt16(o)) {
      for (var c = h.SIZEOF_SHORT; c < s; c += h.SIZEOF_SHORT)
        if (this.bb.readInt16(i + c) != this.bb.readInt16(o + c)) continue t;
      a = this.vtables[t];
      break;
    }
  }
  return (
    a
      ? ((this.space = this.bb.capacity() - e),
        this.bb.writeInt32(this.space, a - e))
      : (this.vtables.push(this.offset()),
        this.bb.writeInt32(this.bb.capacity() - e, this.offset() - e)),
    (this.isNested = !1),
    e
  );
};
h.Builder.prototype.finish = function (e, t) {
  if (t) {
    var r = t;
    if (
      (this.prep(this.minalign, h.SIZEOF_INT + h.FILE_IDENTIFIER_LENGTH),
      r.length != h.FILE_IDENTIFIER_LENGTH)
    )
      throw new Error(
        "FlatBuffers: file identifier must be length " +
          h.FILE_IDENTIFIER_LENGTH
      );
    for (var n = h.FILE_IDENTIFIER_LENGTH - 1; n >= 0; n--)
      this.writeInt8(r.charCodeAt(n));
  }
  this.prep(this.minalign, h.SIZEOF_INT),
    this.addOffset(e),
    this.bb.setPosition(this.space);
};
h.Builder.prototype.requiredField = function (e, t) {
  var r = this.bb.capacity() - e,
    n = r - this.bb.readInt32(r),
    s = this.bb.readInt16(n + t) != 0;
  if (!s) throw new Error("FlatBuffers: field " + t + " must be set");
};
h.Builder.prototype.startVector = function (e, t, r) {
  this.notNested(),
    (this.vector_num_elems = t),
    this.prep(h.SIZEOF_INT, e * t),
    this.prep(r, e * t);
};
h.Builder.prototype.endVector = function () {
  return this.writeInt32(this.vector_num_elems), this.offset();
};
h.Builder.prototype.createString = function (e) {
  if (e instanceof Uint8Array) var t = e;
  else
    for (var t = [], r = 0; r < e.length; ) {
      var n,
        s = e.charCodeAt(r++);
      if (s < 55296 || s >= 56320) n = s;
      else {
        var a = e.charCodeAt(r++);
        n = (s << 10) + a + (65536 - 56623104 - 56320);
      }
      n < 128
        ? t.push(n)
        : (n < 2048
            ? t.push(((n >> 6) & 31) | 192)
            : (n < 65536
                ? t.push(((n >> 12) & 15) | 224)
                : t.push(((n >> 18) & 7) | 240, ((n >> 12) & 63) | 128),
              t.push(((n >> 6) & 63) | 128)),
          t.push((n & 63) | 128));
    }
  this.addInt8(0),
    this.startVector(1, t.length, 1),
    this.bb.setPosition((this.space -= t.length));
  for (var r = 0, i = this.space, o = this.bb.bytes(); r < t.length; r++)
    o[i++] = t[r];
  return this.endVector();
};
h.Builder.prototype.createLong = function (e, t) {
  return h.Long.create(e, t);
};
h.ByteBuffer = function (e) {
  (this.bytes_ = e), (this.position_ = 0);
};
h.ByteBuffer.allocate = function (e) {
  return new h.ByteBuffer(new Uint8Array(e));
};
h.ByteBuffer.prototype.clear = function () {
  this.position_ = 0;
};
h.ByteBuffer.prototype.bytes = function () {
  return this.bytes_;
};
h.ByteBuffer.prototype.position = function () {
  return this.position_;
};
h.ByteBuffer.prototype.setPosition = function (e) {
  this.position_ = e;
};
h.ByteBuffer.prototype.capacity = function () {
  return this.bytes_.length;
};
h.ByteBuffer.prototype.readInt8 = function (e) {
  return (this.readUint8(e) << 24) >> 24;
};
h.ByteBuffer.prototype.readUint8 = function (e) {
  return this.bytes_[e];
};
h.ByteBuffer.prototype.readInt16 = function (e) {
  return (this.readUint16(e) << 16) >> 16;
};
h.ByteBuffer.prototype.readUint16 = function (e) {
  return this.bytes_[e] | (this.bytes_[e + 1] << 8);
};
h.ByteBuffer.prototype.readInt32 = function (e) {
  return (
    this.bytes_[e] |
    (this.bytes_[e + 1] << 8) |
    (this.bytes_[e + 2] << 16) |
    (this.bytes_[e + 3] << 24)
  );
};
h.ByteBuffer.prototype.readUint32 = function (e) {
  return this.readInt32(e) >>> 0;
};
h.ByteBuffer.prototype.readInt64 = function (e) {
  return new h.Long(this.readInt32(e), this.readInt32(e + 4));
};
h.ByteBuffer.prototype.readUint64 = function (e) {
  return new h.Long(this.readUint32(e), this.readUint32(e + 4));
};
h.ByteBuffer.prototype.readFloat32 = function (e) {
  return (h.int32[0] = this.readInt32(e)), h.float32[0];
};
h.ByteBuffer.prototype.readFloat64 = function (e) {
  return (
    (h.int32[h.isLittleEndian ? 0 : 1] = this.readInt32(e)),
    (h.int32[h.isLittleEndian ? 1 : 0] = this.readInt32(e + 4)),
    h.float64[0]
  );
};
h.ByteBuffer.prototype.writeInt8 = function (e, t) {
  this.bytes_[e] = t;
};
h.ByteBuffer.prototype.writeUint8 = function (e, t) {
  this.bytes_[e] = t;
};
h.ByteBuffer.prototype.writeInt16 = function (e, t) {
  (this.bytes_[e] = t), (this.bytes_[e + 1] = t >> 8);
};
h.ByteBuffer.prototype.writeUint16 = function (e, t) {
  (this.bytes_[e] = t), (this.bytes_[e + 1] = t >> 8);
};
h.ByteBuffer.prototype.writeInt32 = function (e, t) {
  (this.bytes_[e] = t),
    (this.bytes_[e + 1] = t >> 8),
    (this.bytes_[e + 2] = t >> 16),
    (this.bytes_[e + 3] = t >> 24);
};
h.ByteBuffer.prototype.writeUint32 = function (e, t) {
  (this.bytes_[e] = t),
    (this.bytes_[e + 1] = t >> 8),
    (this.bytes_[e + 2] = t >> 16),
    (this.bytes_[e + 3] = t >> 24);
};
h.ByteBuffer.prototype.writeInt64 = function (e, t) {
  this.writeInt32(e, t.low), this.writeInt32(e + 4, t.high);
};
h.ByteBuffer.prototype.writeUint64 = function (e, t) {
  this.writeUint32(e, t.low), this.writeUint32(e + 4, t.high);
};
h.ByteBuffer.prototype.writeFloat32 = function (e, t) {
  (h.float32[0] = t), this.writeInt32(e, h.int32[0]);
};
h.ByteBuffer.prototype.writeFloat64 = function (e, t) {
  (h.float64[0] = t),
    this.writeInt32(e, h.int32[h.isLittleEndian ? 0 : 1]),
    this.writeInt32(e + 4, h.int32[h.isLittleEndian ? 1 : 0]);
};
h.ByteBuffer.prototype.getBufferIdentifier = function () {
  if (
    this.bytes_.length <
    this.position_ + h.SIZEOF_INT + h.FILE_IDENTIFIER_LENGTH
  )
    throw new Error(
      "FlatBuffers: ByteBuffer is too short to contain an identifier."
    );
  for (var e = "", t = 0; t < h.FILE_IDENTIFIER_LENGTH; t++)
    e += String.fromCharCode(this.readInt8(this.position_ + h.SIZEOF_INT + t));
  return e;
};
h.ByteBuffer.prototype.__offset = function (e, t) {
  var r = e - this.readInt32(e);
  return t < this.readInt16(r) ? this.readInt16(r + t) : 0;
};
h.ByteBuffer.prototype.__union = function (e, t) {
  return (e.bb_pos = t + this.readInt32(t)), (e.bb = this), e;
};
h.ByteBuffer.prototype.__string = function (e, t) {
  e += this.readInt32(e);
  var r = this.readInt32(e),
    n = "",
    s = 0;
  if (((e += h.SIZEOF_INT), t === h.Encoding.UTF8_BYTES))
    return this.bytes_.subarray(e, e + r);
  for (; s < r; ) {
    var a,
      i = this.readUint8(e + s++);
    if (i < 192) a = i;
    else {
      var o = this.readUint8(e + s++);
      if (i < 224) a = ((i & 31) << 6) | (o & 63);
      else {
        var c = this.readUint8(e + s++);
        if (i < 240) a = ((i & 15) << 12) | ((o & 63) << 6) | (c & 63);
        else {
          var u = this.readUint8(e + s++);
          a = ((i & 7) << 18) | ((o & 63) << 12) | ((c & 63) << 6) | (u & 63);
        }
      }
    }
    a < 65536
      ? (n += String.fromCharCode(a))
      : ((a -= 65536),
        (n += String.fromCharCode(
          (a >> 10) + 55296,
          (a & (1024 - 1)) + 56320
        )));
  }
  return n;
};
h.ByteBuffer.prototype.__indirect = function (e) {
  return e + this.readInt32(e);
};
h.ByteBuffer.prototype.__vector = function (e) {
  return e + this.readInt32(e) + h.SIZEOF_INT;
};
h.ByteBuffer.prototype.__vector_len = function (e) {
  return this.readInt32(e + this.readInt32(e));
};
h.ByteBuffer.prototype.__has_identifier = function (e) {
  if (e.length != h.FILE_IDENTIFIER_LENGTH)
    throw new Error(
      "FlatBuffers: file identifier must be length " + h.FILE_IDENTIFIER_LENGTH
    );
  for (var t = 0; t < h.FILE_IDENTIFIER_LENGTH; t++)
    if (e.charCodeAt(t) != this.readInt8(this.position_ + h.SIZEOF_INT + t))
      return !1;
  return !0;
};
h.ByteBuffer.prototype.createLong = function (e, t) {
  return h.Long.create(e, t);
};
function Lt(e, t, r) {
  return t <= e && e <= r;
}
function Jr(e) {
  if (e === void 0) return {};
  if (e === Object(e)) return e;
  throw TypeError("Could not convert argument to dictionary");
}
function pc(e) {
  for (var t = String(e), r = t.length, n = 0, s = []; n < r; ) {
    var a = t.charCodeAt(n);
    if (a < 55296 || a > 57343) s.push(a);
    else if (56320 <= a && a <= 57343) s.push(65533);
    else if (55296 <= a && a <= 56319)
      if (n === r - 1) s.push(65533);
      else {
        var i = e.charCodeAt(n + 1);
        if (56320 <= i && i <= 57343) {
          var o = a & 1023,
            c = i & 1023;
          s.push(65536 + (o << 10) + c), (n += 1);
        } else s.push(65533);
      }
    n += 1;
  }
  return s;
}
function yc(e) {
  for (var t = "", r = 0; r < e.length; ++r) {
    var n = e[r];
    n <= 65535
      ? (t += String.fromCharCode(n))
      : ((n -= 65536),
        (t += String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320)));
  }
  return t;
}
var gr = -1;
function Kn(e) {
  this.tokens = [].slice.call(e);
}
Kn.prototype = {
  endOfStream: function () {
    return !this.tokens.length;
  },
  read: function () {
    return this.tokens.length ? this.tokens.shift() : gr;
  },
  prepend: function (e) {
    if (Array.isArray(e))
      for (var t = e; t.length; ) this.tokens.unshift(t.pop());
    else this.tokens.unshift(e);
  },
  push: function (e) {
    if (Array.isArray(e))
      for (var t = e; t.length; ) this.tokens.push(t.shift());
    else this.tokens.push(e);
  },
};
var ye = -1;
function hn(e, t) {
  if (e) throw TypeError("Decoder error");
  return t || 65533;
}
var _r = "utf-8";
function wr(e, t) {
  if (!(this instanceof wr)) return new wr(e, t);
  if (((e = e !== void 0 ? String(e).toLowerCase() : _r), e !== _r))
    throw new Error("Encoding not supported. Only utf-8 is supported");
  (t = Jr(t)),
    (this._streaming = !1),
    (this._BOMseen = !1),
    (this._decoder = null),
    (this._fatal = !!t.fatal),
    (this._ignoreBOM = !!t.ignoreBOM),
    Object.defineProperty(this, "encoding", { value: "utf-8" }),
    Object.defineProperty(this, "fatal", { value: this._fatal }),
    Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
}
wr.prototype = {
  decode: function (t, r) {
    var n;
    typeof t == "object" && t instanceof ArrayBuffer
      ? (n = new Uint8Array(t))
      : typeof t == "object" && "buffer" in t && t.buffer instanceof ArrayBuffer
      ? (n = new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
      : (n = new Uint8Array(0)),
      (r = Jr(r)),
      this._streaming ||
        ((this._decoder = new bc({ fatal: this._fatal })),
        (this._BOMseen = !1)),
      (this._streaming = !!r.stream);
    for (
      var s = new Kn(n), a = [], i;
      !s.endOfStream() && ((i = this._decoder.handler(s, s.read())), i !== ye);

    )
      i !== null && (Array.isArray(i) ? a.push.apply(a, i) : a.push(i));
    if (!this._streaming) {
      do {
        if (((i = this._decoder.handler(s, s.read())), i === ye)) break;
        i !== null && (Array.isArray(i) ? a.push.apply(a, i) : a.push(i));
      } while (!s.endOfStream());
      this._decoder = null;
    }
    return (
      a.length &&
        ["utf-8"].indexOf(this.encoding) !== -1 &&
        !this._ignoreBOM &&
        !this._BOMseen &&
        (a[0] === 65279
          ? ((this._BOMseen = !0), a.shift())
          : (this._BOMseen = !0)),
      yc(a)
    );
  },
};
function vr(e, t) {
  if (!(this instanceof vr)) return new vr(e, t);
  if (((e = e !== void 0 ? String(e).toLowerCase() : _r), e !== _r))
    throw new Error("Encoding not supported. Only utf-8 is supported");
  (t = Jr(t)),
    (this._streaming = !1),
    (this._encoder = null),
    (this._options = { fatal: !!t.fatal }),
    Object.defineProperty(this, "encoding", { value: "utf-8" });
}
vr.prototype = {
  encode: function (t, r) {
    (t = t ? String(t) : ""),
      (r = Jr(r)),
      this._streaming || (this._encoder = new mc(this._options)),
      (this._streaming = !!r.stream);
    for (
      var n = [], s = new Kn(pc(t)), a;
      !s.endOfStream() && ((a = this._encoder.handler(s, s.read())), a !== ye);

    )
      Array.isArray(a) ? n.push.apply(n, a) : n.push(a);
    if (!this._streaming) {
      for (; (a = this._encoder.handler(s, s.read())), a !== ye; )
        Array.isArray(a) ? n.push.apply(n, a) : n.push(a);
      this._encoder = null;
    }
    return new Uint8Array(n);
  },
};
function bc(e) {
  var t = e.fatal,
    r = 0,
    n = 0,
    s = 0,
    a = 128,
    i = 191;
  this.handler = function (o, c) {
    if (c === gr && s !== 0) return (s = 0), hn(t);
    if (c === gr) return ye;
    if (s === 0) {
      if (Lt(c, 0, 127)) return c;
      if (Lt(c, 194, 223)) (s = 1), (r = c - 192);
      else if (Lt(c, 224, 239))
        c === 224 && (a = 160), c === 237 && (i = 159), (s = 2), (r = c - 224);
      else if (Lt(c, 240, 244))
        c === 240 && (a = 144), c === 244 && (i = 143), (s = 3), (r = c - 240);
      else return hn(t);
      return (r = r << (6 * s)), null;
    }
    if (!Lt(c, a, i))
      return (r = s = n = 0), (a = 128), (i = 191), o.prepend(c), hn(t);
    if (
      ((a = 128),
      (i = 191),
      (n += 1),
      (r += (c - 128) << (6 * (s - n))),
      n !== s)
    )
      return null;
    var u = r;
    return (r = s = n = 0), u;
  };
}
function mc(e) {
  e.fatal,
    (this.handler = function (t, r) {
      if (r === gr) return ye;
      if (Lt(r, 0, 127)) return r;
      var n, s;
      Lt(r, 128, 2047)
        ? ((n = 1), (s = 192))
        : Lt(r, 2048, 65535)
        ? ((n = 2), (s = 224))
        : Lt(r, 65536, 1114111) && ((n = 3), (s = 240));
      for (var a = [(r >> (6 * n)) + s]; n > 0; ) {
        var i = r >> (6 * (n - 1));
        a.push(128 | (i & 63)), (n -= 1);
      }
      return a;
    });
}
const Ir = typeof Buffer == "function" ? Buffer : null,
  js = typeof TextDecoder == "function" && typeof TextEncoder == "function",
  xn = ((e) => {
    if (js || !Ir) {
      const t = new e("utf-8");
      return (r) => t.decode(r);
    }
    return (t) => {
      const { buffer: r, byteOffset: n, length: s } = D(t);
      return Ir.from(r, n, s).toString();
    };
  })(typeof TextDecoder < "u" ? TextDecoder : wr),
  Gr = ((e) => {
    if (js || !Ir) {
      const t = new e();
      return (r) => t.encode(r);
    }
    return (t = "") => D(Ir.from(t, "utf8"));
  })(typeof TextEncoder < "u" ? TextEncoder : vr),
  $ = Object.freeze({ done: !0, value: void 0 });
class Ki {
  constructor(t) {
    this._json = t;
  }
  get schema() {
    return this._json.schema;
  }
  get batches() {
    return this._json.batches || [];
  }
  get dictionaries() {
    return this._json.dictionaries || [];
  }
}
class re {
  tee() {
    return this._getDOMStream().tee();
  }
  pipe(t, r) {
    return this._getNodeStream().pipe(t, r);
  }
  pipeTo(t, r) {
    return this._getDOMStream().pipeTo(t, r);
  }
  pipeThrough(t, r) {
    return this._getDOMStream().pipeThrough(t, r);
  }
  _getDOMStream() {
    return this._DOMStream || (this._DOMStream = this.toDOMStream());
  }
  _getNodeStream() {
    return this._nodeStream || (this._nodeStream = this.toNodeStream());
  }
}
class gc extends re {
  constructor() {
    super(),
      (this._values = []),
      (this.resolvers = []),
      (this._closedPromise = new Promise(
        (t) => (this._closedPromiseResolve = t)
      ));
  }
  get closed() {
    return this._closedPromise;
  }
  async cancel(t) {
    await this.return(t);
  }
  write(t) {
    this._ensureOpen() &&
      (this.resolvers.length <= 0
        ? this._values.push(t)
        : this.resolvers.shift().resolve({ done: !1, value: t }));
  }
  abort(t) {
    this._closedPromiseResolve &&
      (this.resolvers.length <= 0
        ? (this._error = { error: t })
        : this.resolvers.shift().reject({ done: !0, value: t }));
  }
  close() {
    if (this._closedPromiseResolve) {
      const { resolvers: t } = this;
      for (; t.length > 0; ) t.shift().resolve($);
      this._closedPromiseResolve(), (this._closedPromiseResolve = void 0);
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(t) {
    return it.toDOMStream(
      this._closedPromiseResolve || this._error ? this : this._values,
      t
    );
  }
  toNodeStream(t) {
    return it.toNodeStream(
      this._closedPromiseResolve || this._error ? this : this._values,
      t
    );
  }
  async throw(t) {
    return await this.abort(t), $;
  }
  async return(t) {
    return await this.close(), $;
  }
  async read(t) {
    return (await this.next(t, "read")).value;
  }
  async peek(t) {
    return (await this.next(t, "peek")).value;
  }
  next(...t) {
    return this._values.length > 0
      ? Promise.resolve({ done: !1, value: this._values.shift() })
      : this._error
      ? Promise.reject({ done: !0, value: this._error.error })
      : this._closedPromiseResolve
      ? new Promise((r, n) => {
          this.resolvers.push({ resolve: r, reject: n });
        })
      : Promise.resolve($);
  }
  _ensureOpen() {
    if (this._closedPromiseResolve) return !0;
    throw new Error(`${this} is closed`);
  }
}
const [_c, qr] = (() => {
    const e = () => {
      throw new Error("BigInt is not available in this environment");
    };
    function t() {
      throw e();
    }
    return (
      (t.asIntN = () => {
        throw e();
      }),
      (t.asUintN = () => {
        throw e();
      }),
      typeof BigInt < "u" ? [BigInt, !0] : [t, !1]
    );
  })(),
  [Te, qf] = (() => {
    const e = () => {
      throw new Error("BigInt64Array is not available in this environment");
    };
    class t {
      static get BYTES_PER_ELEMENT() {
        return 8;
      }
      static of() {
        throw e();
      }
      static from() {
        throw e();
      }
      constructor() {
        throw e();
      }
    }
    return typeof BigInt64Array < "u" ? [BigInt64Array, !0] : [t, !1];
  })(),
  [Ke, Zf] = (() => {
    const e = () => {
      throw new Error("BigUint64Array is not available in this environment");
    };
    class t {
      static get BYTES_PER_ELEMENT() {
        return 8;
      }
      static of() {
        throw e();
      }
      static from() {
        throw e();
      }
      constructor() {
        throw e();
      }
    }
    return typeof BigUint64Array < "u" ? [BigUint64Array, !0] : [t, !1];
  })(),
  wc = (e) => typeof e == "number",
  zs = (e) => typeof e == "boolean",
  lt = (e) => typeof e == "function",
  at = (e) => e != null && Object(e) === e,
  Pt = (e) => at(e) && lt(e.then),
  bt = (e) => at(e) && lt(e[Symbol.iterator]),
  Nt = (e) => at(e) && lt(e[Symbol.asyncIterator]),
  Ln = (e) => at(e) && at(e.schema),
  Ps = (e) => at(e) && "done" in e && "value" in e,
  $s = (e) => at(e) && lt(e.stat) && wc(e.fd),
  Ws = (e) => at(e) && Jn(e.body),
  vc = (e) => at(e) && lt(e.abort) && lt(e.getWriter) && !(e instanceof re),
  Jn = (e) => at(e) && lt(e.cancel) && lt(e.getReader) && !(e instanceof re),
  Ic = (e) =>
    at(e) && lt(e.end) && lt(e.write) && zs(e.writable) && !(e instanceof re),
  Ys = (e) =>
    at(e) && lt(e.read) && lt(e.pipe) && zs(e.readable) && !(e instanceof re);
var Sc = h.ByteBuffer;
const Gn = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : ArrayBuffer;
function Bc(e) {
  let t = e[0] ? [e[0]] : [],
    r,
    n,
    s,
    a;
  for (let i, o, c = 0, u = 0, d = e.length; ++c < d; ) {
    if (
      ((i = t[u]),
      (o = e[c]),
      !i || !o || i.buffer !== o.buffer || o.byteOffset < i.byteOffset)
    ) {
      o && (t[++u] = o);
      continue;
    }
    if (
      (({ byteOffset: r, byteLength: s } = i),
      ({ byteOffset: n, byteLength: a } = o),
      r + s < n || n + a < r)
    ) {
      o && (t[++u] = o);
      continue;
    }
    t[u] = new Uint8Array(i.buffer, r, n - r + a);
  }
  return t;
}
function Sr(e, t, r = 0, n = t.byteLength) {
  const s = e.byteLength,
    a = new Uint8Array(e.buffer, e.byteOffset, s),
    i = new Uint8Array(t.buffer, t.byteOffset, Math.min(n, s));
  return a.set(i, r), e;
}
function At(e, t) {
  let r = Bc(e),
    n = r.reduce((d, y) => d + y.byteLength, 0),
    s,
    a,
    i,
    o = 0,
    c = -1,
    u = Math.min(t || 1 / 0, n);
  for (let d = r.length; ++c < d; ) {
    if (
      ((s = r[c]),
      (a = s.subarray(0, Math.min(s.length, u - o))),
      u <= o + a.length)
    ) {
      a.length < s.length
        ? (r[c] = s.subarray(a.length))
        : a.length === s.length && c++,
        i ? Sr(i, a, o) : (i = a);
      break;
    }
    Sr(i || (i = new Uint8Array(u)), a, o), (o += a.length);
  }
  return [i || new Uint8Array(0), r.slice(c), n - (i ? i.byteLength : 0)];
}
function U(e, t) {
  let r = Ps(t) ? t.value : t;
  return r instanceof e
    ? e === Uint8Array
      ? new e(r.buffer, r.byteOffset, r.byteLength)
      : r
    : r
    ? (typeof r == "string" && (r = Gr(r)),
      r instanceof ArrayBuffer
        ? new e(r)
        : r instanceof Gn
        ? new e(r)
        : r instanceof Sc
        ? U(e, r.bytes())
        : ArrayBuffer.isView(r)
        ? r.byteLength <= 0
          ? new e(0)
          : new e(r.buffer, r.byteOffset, r.byteLength / e.BYTES_PER_ELEMENT)
        : e.from(r))
    : new e(0);
}
const De = (e) => U(Int32Array, e),
  Ac = (e) => U(Te, e),
  D = (e) => U(Uint8Array, e),
  Tc = (e) => U(Ke, e),
  Mn = (e) => (e.next(), e);
function* Fc(e, t) {
  const r = function* (s) {
      yield s;
    },
    n =
      typeof t == "string" ||
      ArrayBuffer.isView(t) ||
      t instanceof ArrayBuffer ||
      t instanceof Gn
        ? r(t)
        : bt(t)
        ? t
        : r(t);
  yield* Mn(
    (function* (s) {
      let a = null;
      do a = s.next(yield U(e, a));
      while (!a.done);
    })(n[Symbol.iterator]())
  );
}
const Oc = (e) => Fc(Uint8Array, e);
async function* Hs(e, t) {
  if (Pt(t)) return yield* Hs(e, await t);
  const r = async function* (a) {
      yield await a;
    },
    n = async function* (a) {
      yield* Mn(
        (function* (i) {
          let o = null;
          do o = i.next(yield o && o.value);
          while (!o.done);
        })(a[Symbol.iterator]())
      );
    },
    s =
      typeof t == "string" ||
      ArrayBuffer.isView(t) ||
      t instanceof ArrayBuffer ||
      t instanceof Gn
        ? r(t)
        : bt(t)
        ? n(t)
        : Nt(t)
        ? t
        : r(t);
  yield* Mn(
    (async function* (a) {
      let i = null;
      do i = await a.next(yield U(e, i));
      while (!i.done);
    })(s[Symbol.asyncIterator]())
  );
}
const Dc = (e) => Hs(Uint8Array, e);
function qn(e, t, r) {
  if (e !== 0) {
    r = r.slice(0, t + 1);
    for (let n = -1; ++n <= t; ) r[n] += e;
  }
  return r;
}
function xc(e, t) {
  let r = 0,
    n = e.length;
  if (n !== t.length) return !1;
  if (n > 0)
    do if (e[r] !== t[r]) return !1;
    while (++r < n);
  return !0;
}
const it = {
    fromIterable(e) {
      return ar(Lc(e));
    },
    fromAsyncIterable(e) {
      return ar(Mc(e));
    },
    fromDOMStream(e) {
      return ar(Ec(e));
    },
    fromNodeStream(e) {
      return ar(Nc(e));
    },
    toDOMStream(e, t) {
      throw new Error('"toDOMStream" not available in this environment');
    },
    toNodeStream(e, t) {
      throw new Error('"toNodeStream" not available in this environment');
    },
  },
  ar = (e) => (e.next(), e);
function* Lc(e) {
  let t,
    r = !1,
    n = [],
    s,
    a,
    i,
    o = 0;
  function c() {
    return a === "peek" ? At(n, i)[0] : (([s, n, o] = At(n, i)), s);
  }
  ({ cmd: a, size: i } = yield null);
  let u = Oc(e)[Symbol.iterator]();
  try {
    do
      if (
        (({ done: t, value: s } = isNaN(i - o)
          ? u.next(void 0)
          : u.next(i - o)),
        !t && s.byteLength > 0 && (n.push(s), (o += s.byteLength)),
        t || i <= o)
      )
        do ({ cmd: a, size: i } = yield c());
        while (i < o);
    while (!t);
  } catch (d) {
    (r = !0) && typeof u.throw == "function" && u.throw(d);
  } finally {
    r === !1 && typeof u.return == "function" && u.return();
  }
}
async function* Mc(e) {
  let t,
    r = !1,
    n = [],
    s,
    a,
    i,
    o = 0;
  function c() {
    return a === "peek" ? At(n, i)[0] : (([s, n, o] = At(n, i)), s);
  }
  ({ cmd: a, size: i } = yield null);
  let u = Dc(e)[Symbol.asyncIterator]();
  try {
    do
      if (
        (({ done: t, value: s } = isNaN(i - o)
          ? await u.next(void 0)
          : await u.next(i - o)),
        !t && s.byteLength > 0 && (n.push(s), (o += s.byteLength)),
        t || i <= o)
      )
        do ({ cmd: a, size: i } = yield c());
        while (i < o);
    while (!t);
  } catch (d) {
    (r = !0) && typeof u.throw == "function" && (await u.throw(d));
  } finally {
    r === !1 && typeof u.return == "function" && (await u.return());
  }
}
async function* Ec(e) {
  let t = !1,
    r = !1,
    n = [],
    s,
    a,
    i,
    o = 0;
  function c() {
    return a === "peek" ? At(n, i)[0] : (([s, n, o] = At(n, i)), s);
  }
  ({ cmd: a, size: i } = yield null);
  let u = new Uc(e);
  try {
    do
      if (
        (({ done: t, value: s } = isNaN(i - o)
          ? await u.read(void 0)
          : await u.read(i - o)),
        !t && s.byteLength > 0 && (n.push(D(s)), (o += s.byteLength)),
        t || i <= o)
      )
        do ({ cmd: a, size: i } = yield c());
        while (i < o);
    while (!t);
  } catch (d) {
    (r = !0) && (await u.cancel(d));
  } finally {
    r === !1 ? await u.cancel() : e.locked && u.releaseLock();
  }
}
class Uc {
  constructor(t) {
    (this.source = t), (this.byobReader = null), (this.defaultReader = null);
    try {
      this.supportsBYOB = !!(this.reader = this.getBYOBReader());
    } catch {
      this.supportsBYOB = !(this.reader = this.getDefaultReader());
    }
  }
  get closed() {
    return this.reader ? this.reader.closed.catch(() => {}) : Promise.resolve();
  }
  releaseLock() {
    this.reader && this.reader.releaseLock(),
      (this.reader = this.byobReader = this.defaultReader = null);
  }
  async cancel(t) {
    const { reader: r, source: n } = this;
    r && (await r.cancel(t).catch(() => {})),
      n && n.locked && this.releaseLock();
  }
  async read(t) {
    if (t === 0) return { done: this.reader == null, value: new Uint8Array(0) };
    const r =
      !this.supportsBYOB || typeof t != "number"
        ? await this.getDefaultReader().read()
        : await this.readFromBYOBReader(t);
    return !r.done && (r.value = D(r)), r;
  }
  getDefaultReader() {
    return (
      this.byobReader && this.releaseLock(),
      this.defaultReader ||
        ((this.defaultReader = this.source.getReader()),
        this.defaultReader.closed.catch(() => {})),
      (this.reader = this.defaultReader)
    );
  }
  getBYOBReader() {
    return (
      this.defaultReader && this.releaseLock(),
      this.byobReader ||
        ((this.byobReader = this.source.getReader({ mode: "byob" })),
        this.byobReader.closed.catch(() => {})),
      (this.reader = this.byobReader)
    );
  }
  async readFromBYOBReader(t) {
    return await Ks(this.getBYOBReader(), new ArrayBuffer(t), 0, t);
  }
}
async function Ks(e, t, r, n) {
  if (r >= n) return { done: !1, value: new Uint8Array(t, 0, n) };
  const { done: s, value: a } = await e.read(new Uint8Array(t, r, n - r));
  return (r += a.byteLength) < n && !s
    ? await Ks(e, a.buffer, r, n)
    : { done: s, value: new Uint8Array(a.buffer, 0, r) };
}
const fn = (e, t) => {
  let r = (s) => n([t, s]),
    n;
  return [t, r, new Promise((s) => (n = s) && e.once(t, r))];
};
async function* Nc(e) {
  let t = [],
    r = "error",
    n = !1,
    s = null,
    a,
    i,
    o = 0,
    c = [],
    u;
  function d() {
    return a === "peek" ? At(c, i)[0] : (([u, c, o] = At(c, i)), u);
  }
  if ((({ cmd: a, size: i } = yield null), e.isTTY))
    return yield new Uint8Array(0);
  try {
    (t[0] = fn(e, "end")), (t[1] = fn(e, "error"));
    do {
      if (
        ((t[2] = fn(e, "readable")),
        ([r, s] = await Promise.race(t.map((F) => F[2]))),
        r === "error")
      )
        break;
      if (
        ((n = r === "end") ||
          (isFinite(i - o)
            ? ((u = D(e.read(i - o))),
              u.byteLength < i - o && (u = D(e.read(void 0))))
            : (u = D(e.read(void 0))),
          u.byteLength > 0 && (c.push(u), (o += u.byteLength))),
        n || i <= o)
      )
        do ({ cmd: a, size: i } = yield d());
        while (i < o);
    } while (!n);
  } finally {
    await y(t, r === "error" ? s : null);
  }
  function y(F, M) {
    return (
      (u = c = null),
      new Promise(async (vt, sr) => {
        for (const [ie, Oo] of F) e.off(ie, Oo);
        try {
          const ie = e.destroy;
          ie && ie.call(e, M), (M = void 0);
        } catch (ie) {
          M = ie || M;
        } finally {
          M != null ? sr(M) : vt();
        }
      })
    );
  }
}
class x {}
var f;
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.V1 = 0)] = "V1"),
            (s[(s.V2 = 1)] = "V2"),
            (s[(s.V3 = 2)] = "V3"),
            (s[(s.V4 = 3)] = "V4");
        })(n.MetadataVersion || (n.MetadataVersion = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.Sparse = 0)] = "Sparse"), (s[(s.Dense = 1)] = "Dense");
        })(n.UnionMode || (n.UnionMode = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.HALF = 0)] = "HALF"),
            (s[(s.SINGLE = 1)] = "SINGLE"),
            (s[(s.DOUBLE = 2)] = "DOUBLE");
        })(n.Precision || (n.Precision = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.DAY = 0)] = "DAY"), (s[(s.MILLISECOND = 1)] = "MILLISECOND");
        })(n.DateUnit || (n.DateUnit = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.SECOND = 0)] = "SECOND"),
            (s[(s.MILLISECOND = 1)] = "MILLISECOND"),
            (s[(s.MICROSECOND = 2)] = "MICROSECOND"),
            (s[(s.NANOSECOND = 3)] = "NANOSECOND");
        })(n.TimeUnit || (n.TimeUnit = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.YEAR_MONTH = 0)] = "YEAR_MONTH"),
            (s[(s.DAY_TIME = 1)] = "DAY_TIME");
        })(n.IntervalUnit || (n.IntervalUnit = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.NONE = 0)] = "NONE"),
            (s[(s.Null = 1)] = "Null"),
            (s[(s.Int = 2)] = "Int"),
            (s[(s.FloatingPoint = 3)] = "FloatingPoint"),
            (s[(s.Binary = 4)] = "Binary"),
            (s[(s.Utf8 = 5)] = "Utf8"),
            (s[(s.Bool = 6)] = "Bool"),
            (s[(s.Decimal = 7)] = "Decimal"),
            (s[(s.Date = 8)] = "Date"),
            (s[(s.Time = 9)] = "Time"),
            (s[(s.Timestamp = 10)] = "Timestamp"),
            (s[(s.Interval = 11)] = "Interval"),
            (s[(s.List = 12)] = "List"),
            (s[(s.Struct_ = 13)] = "Struct_"),
            (s[(s.Union = 14)] = "Union"),
            (s[(s.FixedSizeBinary = 15)] = "FixedSizeBinary"),
            (s[(s.FixedSizeList = 16)] = "FixedSizeList"),
            (s[(s.Map = 17)] = "Map"),
            (s[(s.Duration = 18)] = "Duration"),
            (s[(s.LargeBinary = 19)] = "LargeBinary"),
            (s[(s.LargeUtf8 = 20)] = "LargeUtf8"),
            (s[(s.LargeList = 21)] = "LargeList");
        })(n.Type || (n.Type = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.Little = 0)] = "Little"), (s[(s.Big = 1)] = "Big");
        })(n.Endianness || (n.Endianness = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsNull(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startNull(i) {
            i.startObject(0);
          }
          static endNull(i) {
            return i.endObject();
          }
          static createNull(i) {
            return s.startNull(i), s.endNull(i);
          }
        }
        n.Null = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsStruct_(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startStruct_(i) {
            i.startObject(0);
          }
          static endStruct_(i) {
            return i.endObject();
          }
          static createStruct_(i) {
            return s.startStruct_(i), s.endStruct_(i);
          }
        }
        n.Struct_ = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsList(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startList(i) {
            i.startObject(0);
          }
          static endList(i) {
            return i.endObject();
          }
          static createList(i) {
            return s.startList(i), s.endList(i);
          }
        }
        n.List = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsLargeList(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startLargeList(i) {
            i.startObject(0);
          }
          static endLargeList(i) {
            return i.endObject();
          }
          static createLargeList(i) {
            return s.startLargeList(i), s.endLargeList(i);
          }
        }
        n.LargeList = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsFixedSizeList(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          listSize() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i ? this.bb.readInt32(this.bb_pos + i) : 0;
          }
          static startFixedSizeList(i) {
            i.startObject(1);
          }
          static addListSize(i, o) {
            i.addFieldInt32(0, o, 0);
          }
          static endFixedSizeList(i) {
            return i.endObject();
          }
          static createFixedSizeList(i, o) {
            return (
              s.startFixedSizeList(i),
              s.addListSize(i, o),
              s.endFixedSizeList(i)
            );
          }
        }
        n.FixedSizeList = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsMap(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          keysSorted() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i ? !!this.bb.readInt8(this.bb_pos + i) : !1;
          }
          static startMap(i) {
            i.startObject(1);
          }
          static addKeysSorted(i, o) {
            i.addFieldInt8(0, +o, 0);
          }
          static endMap(i) {
            return i.endObject();
          }
          static createMap(i, o) {
            return s.startMap(i), s.addKeysSorted(i, o), s.endMap(i);
          }
        }
        n.Map = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsUnion(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          mode() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.UnionMode.Sparse;
          }
          typeIds(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o
              ? this.bb.readInt32(this.bb.__vector(this.bb_pos + o) + i * 4)
              : 0;
          }
          typeIdsLength() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          typeIdsArray() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i
              ? new Int32Array(
                  this.bb.bytes().buffer,
                  this.bb.bytes().byteOffset +
                    this.bb.__vector(this.bb_pos + i),
                  this.bb.__vector_len(this.bb_pos + i)
                )
              : null;
          }
          static startUnion(i) {
            i.startObject(2);
          }
          static addMode(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.UnionMode.Sparse);
          }
          static addTypeIds(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static createTypeIdsVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addInt32(o[c]);
            return i.endVector();
          }
          static startTypeIdsVector(i, o) {
            i.startVector(4, o, 4);
          }
          static endUnion(i) {
            return i.endObject();
          }
          static createUnion(i, o, c) {
            return (
              s.startUnion(i),
              s.addMode(i, o),
              s.addTypeIds(i, c),
              s.endUnion(i)
            );
          }
        }
        n.Union = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsInt(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          bitWidth() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i ? this.bb.readInt32(this.bb_pos + i) : 0;
          }
          isSigned() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? !!this.bb.readInt8(this.bb_pos + i) : !1;
          }
          static startInt(i) {
            i.startObject(2);
          }
          static addBitWidth(i, o) {
            i.addFieldInt32(0, o, 0);
          }
          static addIsSigned(i, o) {
            i.addFieldInt8(1, +o, 0);
          }
          static endInt(i) {
            return i.endObject();
          }
          static createInt(i, o, c) {
            return (
              s.startInt(i),
              s.addBitWidth(i, o),
              s.addIsSigned(i, c),
              s.endInt(i)
            );
          }
        }
        n.Int = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsFloatingPoint(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          precision() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.Precision.HALF;
          }
          static startFloatingPoint(i) {
            i.startObject(1);
          }
          static addPrecision(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.Precision.HALF);
          }
          static endFloatingPoint(i) {
            return i.endObject();
          }
          static createFloatingPoint(i, o) {
            return (
              s.startFloatingPoint(i),
              s.addPrecision(i, o),
              s.endFloatingPoint(i)
            );
          }
        }
        n.FloatingPoint = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsUtf8(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startUtf8(i) {
            i.startObject(0);
          }
          static endUtf8(i) {
            return i.endObject();
          }
          static createUtf8(i) {
            return s.startUtf8(i), s.endUtf8(i);
          }
        }
        n.Utf8 = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsBinary(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startBinary(i) {
            i.startObject(0);
          }
          static endBinary(i) {
            return i.endObject();
          }
          static createBinary(i) {
            return s.startBinary(i), s.endBinary(i);
          }
        }
        n.Binary = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsLargeUtf8(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startLargeUtf8(i) {
            i.startObject(0);
          }
          static endLargeUtf8(i) {
            return i.endObject();
          }
          static createLargeUtf8(i) {
            return s.startLargeUtf8(i), s.endLargeUtf8(i);
          }
        }
        n.LargeUtf8 = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsLargeBinary(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startLargeBinary(i) {
            i.startObject(0);
          }
          static endLargeBinary(i) {
            return i.endObject();
          }
          static createLargeBinary(i) {
            return s.startLargeBinary(i), s.endLargeBinary(i);
          }
        }
        n.LargeBinary = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsFixedSizeBinary(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          byteWidth() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i ? this.bb.readInt32(this.bb_pos + i) : 0;
          }
          static startFixedSizeBinary(i) {
            i.startObject(1);
          }
          static addByteWidth(i, o) {
            i.addFieldInt32(0, o, 0);
          }
          static endFixedSizeBinary(i) {
            return i.endObject();
          }
          static createFixedSizeBinary(i, o) {
            return (
              s.startFixedSizeBinary(i),
              s.addByteWidth(i, o),
              s.endFixedSizeBinary(i)
            );
          }
        }
        n.FixedSizeBinary = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsBool(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          static startBool(i) {
            i.startObject(0);
          }
          static endBool(i) {
            return i.endObject();
          }
          static createBool(i) {
            return s.startBool(i), s.endBool(i);
          }
        }
        n.Bool = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsDecimal(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          precision() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i ? this.bb.readInt32(this.bb_pos + i) : 0;
          }
          scale() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? this.bb.readInt32(this.bb_pos + i) : 0;
          }
          static startDecimal(i) {
            i.startObject(2);
          }
          static addPrecision(i, o) {
            i.addFieldInt32(0, o, 0);
          }
          static addScale(i, o) {
            i.addFieldInt32(1, o, 0);
          }
          static endDecimal(i) {
            return i.endObject();
          }
          static createDecimal(i, o, c) {
            return (
              s.startDecimal(i),
              s.addPrecision(i, o),
              s.addScale(i, c),
              s.endDecimal(i)
            );
          }
        }
        n.Decimal = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsDate(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          unit() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.DateUnit.MILLISECOND;
          }
          static startDate(i) {
            i.startObject(1);
          }
          static addUnit(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.DateUnit.MILLISECOND);
          }
          static endDate(i) {
            return i.endObject();
          }
          static createDate(i, o) {
            return s.startDate(i), s.addUnit(i, o), s.endDate(i);
          }
        }
        n.Date = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsTime(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          unit() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.TimeUnit.MILLISECOND;
          }
          bitWidth() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? this.bb.readInt32(this.bb_pos + i) : 32;
          }
          static startTime(i) {
            i.startObject(2);
          }
          static addUnit(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.TimeUnit.MILLISECOND);
          }
          static addBitWidth(i, o) {
            i.addFieldInt32(1, o, 32);
          }
          static endTime(i) {
            return i.endObject();
          }
          static createTime(i, o, c) {
            return (
              s.startTime(i), s.addUnit(i, o), s.addBitWidth(i, c), s.endTime(i)
            );
          }
        }
        n.Time = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsTimestamp(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          unit() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.TimeUnit.SECOND;
          }
          timezone(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o ? this.bb.__string(this.bb_pos + o, i) : null;
          }
          static startTimestamp(i) {
            i.startObject(2);
          }
          static addUnit(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.TimeUnit.SECOND);
          }
          static addTimezone(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static endTimestamp(i) {
            return i.endObject();
          }
          static createTimestamp(i, o, c) {
            return (
              s.startTimestamp(i),
              s.addUnit(i, o),
              s.addTimezone(i, c),
              s.endTimestamp(i)
            );
          }
        }
        n.Timestamp = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsInterval(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          unit() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.IntervalUnit.YEAR_MONTH;
          }
          static startInterval(i) {
            i.startObject(1);
          }
          static addUnit(i, o) {
            i.addFieldInt16(
              0,
              o,
              e.apache.arrow.flatbuf.IntervalUnit.YEAR_MONTH
            );
          }
          static endInterval(i) {
            return i.endObject();
          }
          static createInterval(i, o) {
            return s.startInterval(i), s.addUnit(i, o), s.endInterval(i);
          }
        }
        n.Interval = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsDuration(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          unit() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.TimeUnit.MILLISECOND;
          }
          static startDuration(i) {
            i.startObject(1);
          }
          static addUnit(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.TimeUnit.MILLISECOND);
          }
          static endDuration(i) {
            return i.endObject();
          }
          static createDuration(i, o) {
            return s.startDuration(i), s.addUnit(i, o), s.endDuration(i);
          }
        }
        n.Duration = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsKeyValue(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          key(i) {
            let o = this.bb.__offset(this.bb_pos, 4);
            return o ? this.bb.__string(this.bb_pos + o, i) : null;
          }
          value(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o ? this.bb.__string(this.bb_pos + o, i) : null;
          }
          static startKeyValue(i) {
            i.startObject(2);
          }
          static addKey(i, o) {
            i.addFieldOffset(0, o, 0);
          }
          static addValue(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static endKeyValue(i) {
            return i.endObject();
          }
          static createKeyValue(i, o, c) {
            return (
              s.startKeyValue(i),
              s.addKey(i, o),
              s.addValue(i, c),
              s.endKeyValue(i)
            );
          }
        }
        n.KeyValue = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsDictionaryEncoding(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          id() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt64(this.bb_pos + i)
              : this.bb.createLong(0, 0);
          }
          indexType(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o
              ? (i || new e.apache.arrow.flatbuf.Int()).__init(
                  this.bb.__indirect(this.bb_pos + o),
                  this.bb
                )
              : null;
          }
          isOrdered() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i ? !!this.bb.readInt8(this.bb_pos + i) : !1;
          }
          static startDictionaryEncoding(i) {
            i.startObject(3);
          }
          static addId(i, o) {
            i.addFieldInt64(0, o, i.createLong(0, 0));
          }
          static addIndexType(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static addIsOrdered(i, o) {
            i.addFieldInt8(2, +o, 0);
          }
          static endDictionaryEncoding(i) {
            return i.endObject();
          }
          static createDictionaryEncoding(i, o, c, u) {
            return (
              s.startDictionaryEncoding(i),
              s.addId(i, o),
              s.addIndexType(i, c),
              s.addIsOrdered(i, u),
              s.endDictionaryEncoding(i)
            );
          }
        }
        n.DictionaryEncoding = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsField(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          name(i) {
            let o = this.bb.__offset(this.bb_pos, 4);
            return o ? this.bb.__string(this.bb_pos + o, i) : null;
          }
          nullable() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? !!this.bb.readInt8(this.bb_pos + i) : !1;
          }
          typeType() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i
              ? this.bb.readUint8(this.bb_pos + i)
              : e.apache.arrow.flatbuf.Type.NONE;
          }
          type(i) {
            let o = this.bb.__offset(this.bb_pos, 10);
            return o ? this.bb.__union(i, this.bb_pos + o) : null;
          }
          dictionary(i) {
            let o = this.bb.__offset(this.bb_pos, 12);
            return o
              ? (i || new e.apache.arrow.flatbuf.DictionaryEncoding()).__init(
                  this.bb.__indirect(this.bb_pos + o),
                  this.bb
                )
              : null;
          }
          children(i, o) {
            let c = this.bb.__offset(this.bb_pos, 14);
            return c
              ? (o || new e.apache.arrow.flatbuf.Field()).__init(
                  this.bb.__indirect(this.bb.__vector(this.bb_pos + c) + i * 4),
                  this.bb
                )
              : null;
          }
          childrenLength() {
            let i = this.bb.__offset(this.bb_pos, 14);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          customMetadata(i, o) {
            let c = this.bb.__offset(this.bb_pos, 16);
            return c
              ? (o || new e.apache.arrow.flatbuf.KeyValue()).__init(
                  this.bb.__indirect(this.bb.__vector(this.bb_pos + c) + i * 4),
                  this.bb
                )
              : null;
          }
          customMetadataLength() {
            let i = this.bb.__offset(this.bb_pos, 16);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          static startField(i) {
            i.startObject(7);
          }
          static addName(i, o) {
            i.addFieldOffset(0, o, 0);
          }
          static addNullable(i, o) {
            i.addFieldInt8(1, +o, 0);
          }
          static addTypeType(i, o) {
            i.addFieldInt8(2, o, e.apache.arrow.flatbuf.Type.NONE);
          }
          static addType(i, o) {
            i.addFieldOffset(3, o, 0);
          }
          static addDictionary(i, o) {
            i.addFieldOffset(4, o, 0);
          }
          static addChildren(i, o) {
            i.addFieldOffset(5, o, 0);
          }
          static createChildrenVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addOffset(o[c]);
            return i.endVector();
          }
          static startChildrenVector(i, o) {
            i.startVector(4, o, 4);
          }
          static addCustomMetadata(i, o) {
            i.addFieldOffset(6, o, 0);
          }
          static createCustomMetadataVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addOffset(o[c]);
            return i.endVector();
          }
          static startCustomMetadataVector(i, o) {
            i.startVector(4, o, 4);
          }
          static endField(i) {
            return i.endObject();
          }
          static createField(i, o, c, u, d, y, F, M) {
            return (
              s.startField(i),
              s.addName(i, o),
              s.addNullable(i, c),
              s.addTypeType(i, u),
              s.addType(i, d),
              s.addDictionary(i, y),
              s.addChildren(i, F),
              s.addCustomMetadata(i, M),
              s.endField(i)
            );
          }
        }
        n.Field = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          offset() {
            return this.bb.readInt64(this.bb_pos);
          }
          length() {
            return this.bb.readInt64(this.bb_pos + 8);
          }
          static createBuffer(i, o, c) {
            return i.prep(8, 16), i.writeInt64(c), i.writeInt64(o), i.offset();
          }
        }
        n.Buffer = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsSchema(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          endianness() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : e.apache.arrow.flatbuf.Endianness.Little;
          }
          fields(i, o) {
            let c = this.bb.__offset(this.bb_pos, 6);
            return c
              ? (o || new e.apache.arrow.flatbuf.Field()).__init(
                  this.bb.__indirect(this.bb.__vector(this.bb_pos + c) + i * 4),
                  this.bb
                )
              : null;
          }
          fieldsLength() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          customMetadata(i, o) {
            let c = this.bb.__offset(this.bb_pos, 8);
            return c
              ? (o || new e.apache.arrow.flatbuf.KeyValue()).__init(
                  this.bb.__indirect(this.bb.__vector(this.bb_pos + c) + i * 4),
                  this.bb
                )
              : null;
          }
          customMetadataLength() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          static startSchema(i) {
            i.startObject(3);
          }
          static addEndianness(i, o) {
            i.addFieldInt16(0, o, e.apache.arrow.flatbuf.Endianness.Little);
          }
          static addFields(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static createFieldsVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addOffset(o[c]);
            return i.endVector();
          }
          static startFieldsVector(i, o) {
            i.startVector(4, o, 4);
          }
          static addCustomMetadata(i, o) {
            i.addFieldOffset(2, o, 0);
          }
          static createCustomMetadataVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addOffset(o[c]);
            return i.endVector();
          }
          static startCustomMetadataVector(i, o) {
            i.startVector(4, o, 4);
          }
          static endSchema(i) {
            return i.endObject();
          }
          static finishSchemaBuffer(i, o) {
            i.finish(o);
          }
          static createSchema(i, o, c, u) {
            return (
              s.startSchema(i),
              s.addEndianness(i, o),
              s.addFields(i, c),
              s.addCustomMetadata(i, u),
              s.endSchema(i)
            );
          }
        }
        n.Schema = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(f || (f = {}));
var q;
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        n.Schema = f.apache.arrow.flatbuf.Schema;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        (function (s) {
          (s[(s.NONE = 0)] = "NONE"),
            (s[(s.Schema = 1)] = "Schema"),
            (s[(s.DictionaryBatch = 2)] = "DictionaryBatch"),
            (s[(s.RecordBatch = 3)] = "RecordBatch"),
            (s[(s.Tensor = 4)] = "Tensor"),
            (s[(s.SparseTensor = 5)] = "SparseTensor");
        })(n.MessageHeader || (n.MessageHeader = {}));
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          length() {
            return this.bb.readInt64(this.bb_pos);
          }
          nullCount() {
            return this.bb.readInt64(this.bb_pos + 8);
          }
          static createFieldNode(i, o, c) {
            return i.prep(8, 16), i.writeInt64(c), i.writeInt64(o), i.offset();
          }
        }
        n.FieldNode = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsRecordBatch(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          length() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt64(this.bb_pos + i)
              : this.bb.createLong(0, 0);
          }
          nodes(i, o) {
            let c = this.bb.__offset(this.bb_pos, 6);
            return c
              ? (o || new e.apache.arrow.flatbuf.FieldNode()).__init(
                  this.bb.__vector(this.bb_pos + c) + i * 16,
                  this.bb
                )
              : null;
          }
          nodesLength() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          buffers(i, o) {
            let c = this.bb.__offset(this.bb_pos, 8);
            return c
              ? (o || new f.apache.arrow.flatbuf.Buffer()).__init(
                  this.bb.__vector(this.bb_pos + c) + i * 16,
                  this.bb
                )
              : null;
          }
          buffersLength() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          static startRecordBatch(i) {
            i.startObject(3);
          }
          static addLength(i, o) {
            i.addFieldInt64(0, o, i.createLong(0, 0));
          }
          static addNodes(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static startNodesVector(i, o) {
            i.startVector(16, o, 8);
          }
          static addBuffers(i, o) {
            i.addFieldOffset(2, o, 0);
          }
          static startBuffersVector(i, o) {
            i.startVector(16, o, 8);
          }
          static endRecordBatch(i) {
            return i.endObject();
          }
          static createRecordBatch(i, o, c, u) {
            return (
              s.startRecordBatch(i),
              s.addLength(i, o),
              s.addNodes(i, c),
              s.addBuffers(i, u),
              s.endRecordBatch(i)
            );
          }
        }
        n.RecordBatch = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsDictionaryBatch(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          id() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt64(this.bb_pos + i)
              : this.bb.createLong(0, 0);
          }
          data(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o
              ? (i || new e.apache.arrow.flatbuf.RecordBatch()).__init(
                  this.bb.__indirect(this.bb_pos + o),
                  this.bb
                )
              : null;
          }
          isDelta() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i ? !!this.bb.readInt8(this.bb_pos + i) : !1;
          }
          static startDictionaryBatch(i) {
            i.startObject(3);
          }
          static addId(i, o) {
            i.addFieldInt64(0, o, i.createLong(0, 0));
          }
          static addData(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static addIsDelta(i, o) {
            i.addFieldInt8(2, +o, 0);
          }
          static endDictionaryBatch(i) {
            return i.endObject();
          }
          static createDictionaryBatch(i, o, c, u) {
            return (
              s.startDictionaryBatch(i),
              s.addId(i, o),
              s.addData(i, c),
              s.addIsDelta(i, u),
              s.endDictionaryBatch(i)
            );
          }
        }
        n.DictionaryBatch = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsMessage(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          version() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : f.apache.arrow.flatbuf.MetadataVersion.V1;
          }
          headerType() {
            let i = this.bb.__offset(this.bb_pos, 6);
            return i
              ? this.bb.readUint8(this.bb_pos + i)
              : e.apache.arrow.flatbuf.MessageHeader.NONE;
          }
          header(i) {
            let o = this.bb.__offset(this.bb_pos, 8);
            return o ? this.bb.__union(i, this.bb_pos + o) : null;
          }
          bodyLength() {
            let i = this.bb.__offset(this.bb_pos, 10);
            return i
              ? this.bb.readInt64(this.bb_pos + i)
              : this.bb.createLong(0, 0);
          }
          customMetadata(i, o) {
            let c = this.bb.__offset(this.bb_pos, 12);
            return c
              ? (o || new f.apache.arrow.flatbuf.KeyValue()).__init(
                  this.bb.__indirect(this.bb.__vector(this.bb_pos + c) + i * 4),
                  this.bb
                )
              : null;
          }
          customMetadataLength() {
            let i = this.bb.__offset(this.bb_pos, 12);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          static startMessage(i) {
            i.startObject(5);
          }
          static addVersion(i, o) {
            i.addFieldInt16(0, o, f.apache.arrow.flatbuf.MetadataVersion.V1);
          }
          static addHeaderType(i, o) {
            i.addFieldInt8(1, o, e.apache.arrow.flatbuf.MessageHeader.NONE);
          }
          static addHeader(i, o) {
            i.addFieldOffset(2, o, 0);
          }
          static addBodyLength(i, o) {
            i.addFieldInt64(3, o, i.createLong(0, 0));
          }
          static addCustomMetadata(i, o) {
            i.addFieldOffset(4, o, 0);
          }
          static createCustomMetadataVector(i, o) {
            i.startVector(4, o.length, 4);
            for (let c = o.length - 1; c >= 0; c--) i.addOffset(o[c]);
            return i.endVector();
          }
          static startCustomMetadataVector(i, o) {
            i.startVector(4, o, 4);
          }
          static endMessage(i) {
            return i.endObject();
          }
          static finishMessageBuffer(i, o) {
            i.finish(o);
          }
          static createMessage(i, o, c, u, d, y) {
            return (
              s.startMessage(i),
              s.addVersion(i, o),
              s.addHeaderType(i, c),
              s.addHeader(i, u),
              s.addBodyLength(i, d),
              s.addCustomMetadata(i, y),
              s.endMessage(i)
            );
          }
        }
        n.Message = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(q || (q = {}));
f.apache.arrow.flatbuf.Type;
var Tt = f.apache.arrow.flatbuf.DateUnit,
  V = f.apache.arrow.flatbuf.TimeUnit,
  ut = f.apache.arrow.flatbuf.Precision,
  Et = f.apache.arrow.flatbuf.UnionMode,
  be = f.apache.arrow.flatbuf.IntervalUnit,
  j = q.apache.arrow.flatbuf.MessageHeader,
  ft = f.apache.arrow.flatbuf.MetadataVersion,
  l;
(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.Null = 1)] = "Null"),
    (e[(e.Int = 2)] = "Int"),
    (e[(e.Float = 3)] = "Float"),
    (e[(e.Binary = 4)] = "Binary"),
    (e[(e.Utf8 = 5)] = "Utf8"),
    (e[(e.Bool = 6)] = "Bool"),
    (e[(e.Decimal = 7)] = "Decimal"),
    (e[(e.Date = 8)] = "Date"),
    (e[(e.Time = 9)] = "Time"),
    (e[(e.Timestamp = 10)] = "Timestamp"),
    (e[(e.Interval = 11)] = "Interval"),
    (e[(e.List = 12)] = "List"),
    (e[(e.Struct = 13)] = "Struct"),
    (e[(e.Union = 14)] = "Union"),
    (e[(e.FixedSizeBinary = 15)] = "FixedSizeBinary"),
    (e[(e.FixedSizeList = 16)] = "FixedSizeList"),
    (e[(e.Map = 17)] = "Map"),
    (e[(e.Dictionary = -1)] = "Dictionary"),
    (e[(e.Int8 = -2)] = "Int8"),
    (e[(e.Int16 = -3)] = "Int16"),
    (e[(e.Int32 = -4)] = "Int32"),
    (e[(e.Int64 = -5)] = "Int64"),
    (e[(e.Uint8 = -6)] = "Uint8"),
    (e[(e.Uint16 = -7)] = "Uint16"),
    (e[(e.Uint32 = -8)] = "Uint32"),
    (e[(e.Uint64 = -9)] = "Uint64"),
    (e[(e.Float16 = -10)] = "Float16"),
    (e[(e.Float32 = -11)] = "Float32"),
    (e[(e.Float64 = -12)] = "Float64"),
    (e[(e.DateDay = -13)] = "DateDay"),
    (e[(e.DateMillisecond = -14)] = "DateMillisecond"),
    (e[(e.TimestampSecond = -15)] = "TimestampSecond"),
    (e[(e.TimestampMillisecond = -16)] = "TimestampMillisecond"),
    (e[(e.TimestampMicrosecond = -17)] = "TimestampMicrosecond"),
    (e[(e.TimestampNanosecond = -18)] = "TimestampNanosecond"),
    (e[(e.TimeSecond = -19)] = "TimeSecond"),
    (e[(e.TimeMillisecond = -20)] = "TimeMillisecond"),
    (e[(e.TimeMicrosecond = -21)] = "TimeMicrosecond"),
    (e[(e.TimeNanosecond = -22)] = "TimeNanosecond"),
    (e[(e.DenseUnion = -23)] = "DenseUnion"),
    (e[(e.SparseUnion = -24)] = "SparseUnion"),
    (e[(e.IntervalDayTime = -25)] = "IntervalDayTime"),
    (e[(e.IntervalYearMonth = -26)] = "IntervalYearMonth");
})(l || (l = {}));
var b;
(function (e) {
  (e[(e.OFFSET = 0)] = "OFFSET"),
    (e[(e.DATA = 1)] = "DATA"),
    (e[(e.VALIDITY = 2)] = "VALIDITY"),
    (e[(e.TYPE = 3)] = "TYPE");
})(b || (b = {}));
function Js(e, t, r, n) {
  return (r & (1 << n)) !== 0;
}
function Vc(e, t, r, n) {
  return (r & (1 << n)) >> n;
}
function Rc(e, t, r) {
  return r
    ? !!(e[t >> 3] |= 1 << t % 8) || !0
    : !(e[t >> 3] &= ~(1 << t % 8)) && !1;
}
function Zn(e, t, r) {
  const n = (r.byteLength + 7) & -8;
  if (e > 0 || r.byteLength < n) {
    const s = new Uint8Array(n);
    return (
      s.set(
        e % 8 === 0
          ? r.subarray(e >> 3)
          : Br(Zr(r, e, t, null, Js)).subarray(0, n)
      ),
      s
    );
  }
  return r;
}
function Br(e) {
  let t = [],
    r = 0,
    n = 0,
    s = 0;
  for (const i of e)
    i && (s |= 1 << n), ++n === 8 && ((t[r++] = s), (s = n = 0));
  (r === 0 || n > 0) && (t[r++] = s);
  let a = new Uint8Array((t.length + 7) & -8);
  return a.set(t), a;
}
function* Zr(e, t, r, n, s) {
  let a = t % 8,
    i = t >> 3,
    o = 0,
    c = r;
  for (; c > 0; a = 0) {
    let u = e[i++];
    do yield s(n, o++, u, a);
    while (--c > 0 && ++a < 8);
  }
}
function En(e, t, r) {
  if (r - t <= 0) return 0;
  if (r - t < 8) {
    let a = 0;
    for (const i of Zr(e, t, r - t, e, Vc)) a += i;
    return a;
  }
  const n = (r >> 3) << 3,
    s = t + (t % 8 === 0 ? 0 : 8 - (t % 8));
  return En(e, t, s) + En(e, n, r) + Cc(e, s >> 3, (n - s) >> 3);
}
function Cc(e, t, r) {
  let n = 0,
    s = t | 0;
  const a = new DataView(e.buffer, e.byteOffset, e.byteLength),
    i = r === void 0 ? e.byteLength : s + r;
  for (; i - s >= 4; ) (n += dn(a.getUint32(s))), (s += 4);
  for (; i - s >= 2; ) (n += dn(a.getUint16(s))), (s += 2);
  for (; i - s >= 1; ) (n += dn(a.getUint8(s))), (s += 1);
  return n;
}
function dn(e) {
  let t = e | 0;
  return (
    (t = t - ((t >>> 1) & 1431655765)),
    (t = (t & 858993459) + ((t >>> 2) & 858993459)),
    (((t + (t >>> 4)) & 252645135) * 16843009) >>> 24
  );
}
class O {
  visitMany(t, ...r) {
    return t.map((n, s) => this.visit(n, ...r.map((a) => a[s])));
  }
  visit(...t) {
    return this.getVisitFn(t[0], !1).apply(this, t);
  }
  getVisitFn(t, r = !0) {
    return kc(this, t, r);
  }
  visitNull(t, ...r) {
    return null;
  }
  visitBool(t, ...r) {
    return null;
  }
  visitInt(t, ...r) {
    return null;
  }
  visitFloat(t, ...r) {
    return null;
  }
  visitUtf8(t, ...r) {
    return null;
  }
  visitBinary(t, ...r) {
    return null;
  }
  visitFixedSizeBinary(t, ...r) {
    return null;
  }
  visitDate(t, ...r) {
    return null;
  }
  visitTimestamp(t, ...r) {
    return null;
  }
  visitTime(t, ...r) {
    return null;
  }
  visitDecimal(t, ...r) {
    return null;
  }
  visitList(t, ...r) {
    return null;
  }
  visitStruct(t, ...r) {
    return null;
  }
  visitUnion(t, ...r) {
    return null;
  }
  visitDictionary(t, ...r) {
    return null;
  }
  visitInterval(t, ...r) {
    return null;
  }
  visitFixedSizeList(t, ...r) {
    return null;
  }
  visitMap(t, ...r) {
    return null;
  }
}
function kc(e, t, r = !0) {
  let n = null,
    s = l.NONE;
  switch (
    (t instanceof p || t instanceof x
      ? (s = pn(t.type))
      : t instanceof A
      ? (s = pn(t))
      : typeof (s = t) != "number" && (s = l[t]),
    s)
  ) {
    case l.Null:
      n = e.visitNull;
      break;
    case l.Bool:
      n = e.visitBool;
      break;
    case l.Int:
      n = e.visitInt;
      break;
    case l.Int8:
      n = e.visitInt8 || e.visitInt;
      break;
    case l.Int16:
      n = e.visitInt16 || e.visitInt;
      break;
    case l.Int32:
      n = e.visitInt32 || e.visitInt;
      break;
    case l.Int64:
      n = e.visitInt64 || e.visitInt;
      break;
    case l.Uint8:
      n = e.visitUint8 || e.visitInt;
      break;
    case l.Uint16:
      n = e.visitUint16 || e.visitInt;
      break;
    case l.Uint32:
      n = e.visitUint32 || e.visitInt;
      break;
    case l.Uint64:
      n = e.visitUint64 || e.visitInt;
      break;
    case l.Float:
      n = e.visitFloat;
      break;
    case l.Float16:
      n = e.visitFloat16 || e.visitFloat;
      break;
    case l.Float32:
      n = e.visitFloat32 || e.visitFloat;
      break;
    case l.Float64:
      n = e.visitFloat64 || e.visitFloat;
      break;
    case l.Utf8:
      n = e.visitUtf8;
      break;
    case l.Binary:
      n = e.visitBinary;
      break;
    case l.FixedSizeBinary:
      n = e.visitFixedSizeBinary;
      break;
    case l.Date:
      n = e.visitDate;
      break;
    case l.DateDay:
      n = e.visitDateDay || e.visitDate;
      break;
    case l.DateMillisecond:
      n = e.visitDateMillisecond || e.visitDate;
      break;
    case l.Timestamp:
      n = e.visitTimestamp;
      break;
    case l.TimestampSecond:
      n = e.visitTimestampSecond || e.visitTimestamp;
      break;
    case l.TimestampMillisecond:
      n = e.visitTimestampMillisecond || e.visitTimestamp;
      break;
    case l.TimestampMicrosecond:
      n = e.visitTimestampMicrosecond || e.visitTimestamp;
      break;
    case l.TimestampNanosecond:
      n = e.visitTimestampNanosecond || e.visitTimestamp;
      break;
    case l.Time:
      n = e.visitTime;
      break;
    case l.TimeSecond:
      n = e.visitTimeSecond || e.visitTime;
      break;
    case l.TimeMillisecond:
      n = e.visitTimeMillisecond || e.visitTime;
      break;
    case l.TimeMicrosecond:
      n = e.visitTimeMicrosecond || e.visitTime;
      break;
    case l.TimeNanosecond:
      n = e.visitTimeNanosecond || e.visitTime;
      break;
    case l.Decimal:
      n = e.visitDecimal;
      break;
    case l.List:
      n = e.visitList;
      break;
    case l.Struct:
      n = e.visitStruct;
      break;
    case l.Union:
      n = e.visitUnion;
      break;
    case l.DenseUnion:
      n = e.visitDenseUnion || e.visitUnion;
      break;
    case l.SparseUnion:
      n = e.visitSparseUnion || e.visitUnion;
      break;
    case l.Dictionary:
      n = e.visitDictionary;
      break;
    case l.Interval:
      n = e.visitInterval;
      break;
    case l.IntervalDayTime:
      n = e.visitIntervalDayTime || e.visitInterval;
      break;
    case l.IntervalYearMonth:
      n = e.visitIntervalYearMonth || e.visitInterval;
      break;
    case l.FixedSizeList:
      n = e.visitFixedSizeList;
      break;
    case l.Map:
      n = e.visitMap;
      break;
  }
  if (typeof n == "function") return n;
  if (!r) return () => null;
  throw new Error(`Unrecognized type '${l[s]}'`);
}
function pn(e) {
  switch (e.typeId) {
    case l.Null:
      return l.Null;
    case l.Int:
      const { bitWidth: t, isSigned: r } = e;
      switch (t) {
        case 8:
          return r ? l.Int8 : l.Uint8;
        case 16:
          return r ? l.Int16 : l.Uint16;
        case 32:
          return r ? l.Int32 : l.Uint32;
        case 64:
          return r ? l.Int64 : l.Uint64;
      }
      return l.Int;
    case l.Float:
      switch (e.precision) {
        case ut.HALF:
          return l.Float16;
        case ut.SINGLE:
          return l.Float32;
        case ut.DOUBLE:
          return l.Float64;
      }
      return l.Float;
    case l.Binary:
      return l.Binary;
    case l.Utf8:
      return l.Utf8;
    case l.Bool:
      return l.Bool;
    case l.Decimal:
      return l.Decimal;
    case l.Time:
      switch (e.unit) {
        case V.SECOND:
          return l.TimeSecond;
        case V.MILLISECOND:
          return l.TimeMillisecond;
        case V.MICROSECOND:
          return l.TimeMicrosecond;
        case V.NANOSECOND:
          return l.TimeNanosecond;
      }
      return l.Time;
    case l.Timestamp:
      switch (e.unit) {
        case V.SECOND:
          return l.TimestampSecond;
        case V.MILLISECOND:
          return l.TimestampMillisecond;
        case V.MICROSECOND:
          return l.TimestampMicrosecond;
        case V.NANOSECOND:
          return l.TimestampNanosecond;
      }
      return l.Timestamp;
    case l.Date:
      switch (e.unit) {
        case Tt.DAY:
          return l.DateDay;
        case Tt.MILLISECOND:
          return l.DateMillisecond;
      }
      return l.Date;
    case l.Interval:
      switch (e.unit) {
        case be.DAY_TIME:
          return l.IntervalDayTime;
        case be.YEAR_MONTH:
          return l.IntervalYearMonth;
      }
      return l.Interval;
    case l.Map:
      return l.Map;
    case l.List:
      return l.List;
    case l.Struct:
      return l.Struct;
    case l.Union:
      switch (e.mode) {
        case Et.Dense:
          return l.DenseUnion;
        case Et.Sparse:
          return l.SparseUnion;
      }
      return l.Union;
    case l.FixedSizeBinary:
      return l.FixedSizeBinary;
    case l.FixedSizeList:
      return l.FixedSizeList;
    case l.Dictionary:
      return l.Dictionary;
  }
  throw new Error(`Unrecognized type '${l[e.typeId]}'`);
}
O.prototype.visitInt8 = null;
O.prototype.visitInt16 = null;
O.prototype.visitInt32 = null;
O.prototype.visitInt64 = null;
O.prototype.visitUint8 = null;
O.prototype.visitUint16 = null;
O.prototype.visitUint32 = null;
O.prototype.visitUint64 = null;
O.prototype.visitFloat16 = null;
O.prototype.visitFloat32 = null;
O.prototype.visitFloat64 = null;
O.prototype.visitDateDay = null;
O.prototype.visitDateMillisecond = null;
O.prototype.visitTimestampSecond = null;
O.prototype.visitTimestampMillisecond = null;
O.prototype.visitTimestampMicrosecond = null;
O.prototype.visitTimestampNanosecond = null;
O.prototype.visitTimeSecond = null;
O.prototype.visitTimeMillisecond = null;
O.prototype.visitTimeMicrosecond = null;
O.prototype.visitTimeNanosecond = null;
O.prototype.visitDenseUnion = null;
O.prototype.visitSparseUnion = null;
O.prototype.visitIntervalDayTime = null;
O.prototype.visitIntervalYearMonth = null;
class m extends O {
  compareSchemas(t, r) {
    return (
      t === r ||
      (r instanceof t.constructor && st.compareFields(t.fields, r.fields))
    );
  }
  compareFields(t, r) {
    return (
      t === r ||
      (Array.isArray(t) &&
        Array.isArray(r) &&
        t.length === r.length &&
        t.every((n, s) => st.compareField(n, r[s])))
    );
  }
  compareField(t, r) {
    return (
      t === r ||
      (r instanceof t.constructor &&
        t.name === r.name &&
        t.nullable === r.nullable &&
        st.visit(t.type, r.type))
    );
  }
}
function et(e, t) {
  return t instanceof e.constructor;
}
function Je(e, t) {
  return e === t || et(e, t);
}
function Vt(e, t) {
  return (
    e === t ||
    (et(e, t) && e.bitWidth === t.bitWidth && e.isSigned === t.isSigned)
  );
}
function Qr(e, t) {
  return e === t || (et(e, t) && e.precision === t.precision);
}
function jc(e, t) {
  return e === t || (et(e, t) && e.byteWidth === t.byteWidth);
}
function Qn(e, t) {
  return e === t || (et(e, t) && e.unit === t.unit);
}
function Ge(e, t) {
  return (
    e === t || (et(e, t) && e.unit === t.unit && e.timezone === t.timezone)
  );
}
function qe(e, t) {
  return (
    e === t || (et(e, t) && e.unit === t.unit && e.bitWidth === t.bitWidth)
  );
}
function zc(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.children.length === t.children.length &&
      st.compareFields(e.children, t.children))
  );
}
function Pc(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.children.length === t.children.length &&
      st.compareFields(e.children, t.children))
  );
}
function Xn(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.mode === t.mode &&
      e.typeIds.every((r, n) => r === t.typeIds[n]) &&
      st.compareFields(e.children, t.children))
  );
}
function $c(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.id === t.id &&
      e.isOrdered === t.isOrdered &&
      st.visit(e.indices, t.indices) &&
      st.visit(e.dictionary, t.dictionary))
  );
}
function ti(e, t) {
  return e === t || (et(e, t) && e.unit === t.unit);
}
function Wc(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.listSize === t.listSize &&
      e.children.length === t.children.length &&
      st.compareFields(e.children, t.children))
  );
}
function Yc(e, t) {
  return (
    e === t ||
    (et(e, t) &&
      e.keysSorted === t.keysSorted &&
      e.children.length === t.children.length &&
      st.compareFields(e.children, t.children))
  );
}
m.prototype.visitNull = Je;
m.prototype.visitBool = Je;
m.prototype.visitInt = Vt;
m.prototype.visitInt8 = Vt;
m.prototype.visitInt16 = Vt;
m.prototype.visitInt32 = Vt;
m.prototype.visitInt64 = Vt;
m.prototype.visitUint8 = Vt;
m.prototype.visitUint16 = Vt;
m.prototype.visitUint32 = Vt;
m.prototype.visitUint64 = Vt;
m.prototype.visitFloat = Qr;
m.prototype.visitFloat16 = Qr;
m.prototype.visitFloat32 = Qr;
m.prototype.visitFloat64 = Qr;
m.prototype.visitUtf8 = Je;
m.prototype.visitBinary = Je;
m.prototype.visitFixedSizeBinary = jc;
m.prototype.visitDate = Qn;
m.prototype.visitDateDay = Qn;
m.prototype.visitDateMillisecond = Qn;
m.prototype.visitTimestamp = Ge;
m.prototype.visitTimestampSecond = Ge;
m.prototype.visitTimestampMillisecond = Ge;
m.prototype.visitTimestampMicrosecond = Ge;
m.prototype.visitTimestampNanosecond = Ge;
m.prototype.visitTime = qe;
m.prototype.visitTimeSecond = qe;
m.prototype.visitTimeMillisecond = qe;
m.prototype.visitTimeMicrosecond = qe;
m.prototype.visitTimeNanosecond = qe;
m.prototype.visitDecimal = Je;
m.prototype.visitList = zc;
m.prototype.visitStruct = Pc;
m.prototype.visitUnion = Xn;
m.prototype.visitDenseUnion = Xn;
m.prototype.visitSparseUnion = Xn;
m.prototype.visitDictionary = $c;
m.prototype.visitInterval = ti;
m.prototype.visitIntervalDayTime = ti;
m.prototype.visitIntervalYearMonth = ti;
m.prototype.visitFixedSizeList = Wc;
m.prototype.visitMap = Yc;
const st = new m();
class A {
  static isNull(t) {
    return t && t.typeId === l.Null;
  }
  static isInt(t) {
    return t && t.typeId === l.Int;
  }
  static isFloat(t) {
    return t && t.typeId === l.Float;
  }
  static isBinary(t) {
    return t && t.typeId === l.Binary;
  }
  static isUtf8(t) {
    return t && t.typeId === l.Utf8;
  }
  static isBool(t) {
    return t && t.typeId === l.Bool;
  }
  static isDecimal(t) {
    return t && t.typeId === l.Decimal;
  }
  static isDate(t) {
    return t && t.typeId === l.Date;
  }
  static isTime(t) {
    return t && t.typeId === l.Time;
  }
  static isTimestamp(t) {
    return t && t.typeId === l.Timestamp;
  }
  static isInterval(t) {
    return t && t.typeId === l.Interval;
  }
  static isList(t) {
    return t && t.typeId === l.List;
  }
  static isStruct(t) {
    return t && t.typeId === l.Struct;
  }
  static isUnion(t) {
    return t && t.typeId === l.Union;
  }
  static isFixedSizeBinary(t) {
    return t && t.typeId === l.FixedSizeBinary;
  }
  static isFixedSizeList(t) {
    return t && t.typeId === l.FixedSizeList;
  }
  static isMap(t) {
    return t && t.typeId === l.Map;
  }
  static isDictionary(t) {
    return t && t.typeId === l.Dictionary;
  }
  get typeId() {
    return l.NONE;
  }
  compareTo(t) {
    return st.visit(this, t);
  }
}
A[Symbol.toStringTag] = ((e) => (
  (e.children = null),
  (e.ArrayType = Array),
  (e[Symbol.toStringTag] = "DataType")
))(A.prototype);
let me = class extends A {
  toString() {
    return "Null";
  }
  get typeId() {
    return l.Null;
  }
};
me[Symbol.toStringTag] = ((e) => (e[Symbol.toStringTag] = "Null"))(
  me.prototype
);
class tt extends A {
  constructor(t, r) {
    super(), (this.isSigned = t), (this.bitWidth = r);
  }
  get typeId() {
    return l.Int;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 8:
        return this.isSigned ? Int8Array : Uint8Array;
      case 16:
        return this.isSigned ? Int16Array : Uint16Array;
      case 32:
        return this.isSigned ? Int32Array : Uint32Array;
      case 64:
        return this.isSigned ? Int32Array : Uint32Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
  }
}
tt[Symbol.toStringTag] = ((e) => (
  (e.isSigned = null), (e.bitWidth = null), (e[Symbol.toStringTag] = "Int")
))(tt.prototype);
class ei extends tt {
  constructor() {
    super(!0, 8);
  }
}
class ri extends tt {
  constructor() {
    super(!0, 16);
  }
}
class qt extends tt {
  constructor() {
    super(!0, 32);
  }
}
let ge = class extends tt {
  constructor() {
    super(!0, 64);
  }
};
class ni extends tt {
  constructor() {
    super(!1, 8);
  }
}
class ii extends tt {
  constructor() {
    super(!1, 16);
  }
}
class si extends tt {
  constructor() {
    super(!1, 32);
  }
}
let _e = class extends tt {
  constructor() {
    super(!1, 64);
  }
};
Object.defineProperty(ei.prototype, "ArrayType", { value: Int8Array });
Object.defineProperty(ri.prototype, "ArrayType", { value: Int16Array });
Object.defineProperty(qt.prototype, "ArrayType", { value: Int32Array });
Object.defineProperty(ge.prototype, "ArrayType", { value: Int32Array });
Object.defineProperty(ni.prototype, "ArrayType", { value: Uint8Array });
Object.defineProperty(ii.prototype, "ArrayType", { value: Uint16Array });
Object.defineProperty(si.prototype, "ArrayType", { value: Uint32Array });
Object.defineProperty(_e.prototype, "ArrayType", { value: Uint32Array });
class Zt extends A {
  constructor(t) {
    super(), (this.precision = t);
  }
  get typeId() {
    return l.Float;
  }
  get ArrayType() {
    switch (this.precision) {
      case ut.HALF:
        return Uint16Array;
      case ut.SINGLE:
        return Float32Array;
      case ut.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
}
Zt[Symbol.toStringTag] = ((e) => (
  (e.precision = null), (e[Symbol.toStringTag] = "Float")
))(Zt.prototype);
class Xr extends Zt {
  constructor() {
    super(ut.HALF);
  }
}
class ai extends Zt {
  constructor() {
    super(ut.SINGLE);
  }
}
class oi extends Zt {
  constructor() {
    super(ut.DOUBLE);
  }
}
Object.defineProperty(Xr.prototype, "ArrayType", { value: Uint16Array });
Object.defineProperty(ai.prototype, "ArrayType", { value: Float32Array });
Object.defineProperty(oi.prototype, "ArrayType", { value: Float64Array });
let Re = class extends A {
  constructor() {
    super();
  }
  get typeId() {
    return l.Binary;
  }
  toString() {
    return "Binary";
  }
};
Re[Symbol.toStringTag] = ((e) => (
  (e.ArrayType = Uint8Array), (e[Symbol.toStringTag] = "Binary")
))(Re.prototype);
let we = class extends A {
  constructor() {
    super();
  }
  get typeId() {
    return l.Utf8;
  }
  toString() {
    return "Utf8";
  }
};
we[Symbol.toStringTag] = ((e) => (
  (e.ArrayType = Uint8Array), (e[Symbol.toStringTag] = "Utf8")
))(we.prototype);
let Ce = class extends A {
  constructor() {
    super();
  }
  get typeId() {
    return l.Bool;
  }
  toString() {
    return "Bool";
  }
};
Ce[Symbol.toStringTag] = ((e) => (
  (e.ArrayType = Uint8Array), (e[Symbol.toStringTag] = "Bool")
))(Ce.prototype);
let Ar = class extends A {
  constructor(t, r) {
    super(), (this.scale = t), (this.precision = r);
  }
  get typeId() {
    return l.Decimal;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? "+" : ""}${
      this.scale
    }]`;
  }
};
Ar[Symbol.toStringTag] = ((e) => (
  (e.scale = null),
  (e.precision = null),
  (e.ArrayType = Uint32Array),
  (e[Symbol.toStringTag] = "Decimal")
))(Ar.prototype);
class ve extends A {
  constructor(t) {
    super(), (this.unit = t);
  }
  get typeId() {
    return l.Date;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${Tt[this.unit]}>`;
  }
}
ve[Symbol.toStringTag] = ((e) => (
  (e.unit = null), (e.ArrayType = Int32Array), (e[Symbol.toStringTag] = "Date")
))(ve.prototype);
class Hc extends ve {
  constructor() {
    super(Tt.DAY);
  }
}
class Ji extends ve {
  constructor() {
    super(Tt.MILLISECOND);
  }
}
class Tr extends A {
  constructor(t, r) {
    super(), (this.unit = t), (this.bitWidth = r);
  }
  get typeId() {
    return l.Time;
  }
  toString() {
    return `Time${this.bitWidth}<${V[this.unit]}>`;
  }
}
Tr[Symbol.toStringTag] = ((e) => (
  (e.unit = null),
  (e.bitWidth = null),
  (e.ArrayType = Int32Array),
  (e[Symbol.toStringTag] = "Time")
))(Tr.prototype);
class Fr extends A {
  constructor(t, r) {
    super(), (this.unit = t), (this.timezone = r);
  }
  get typeId() {
    return l.Timestamp;
  }
  toString() {
    return `Timestamp<${V[this.unit]}${
      this.timezone ? `, ${this.timezone}` : ""
    }>`;
  }
}
Fr[Symbol.toStringTag] = ((e) => (
  (e.unit = null),
  (e.timezone = null),
  (e.ArrayType = Int32Array),
  (e[Symbol.toStringTag] = "Timestamp")
))(Fr.prototype);
class Or extends A {
  constructor(t) {
    super(), (this.unit = t);
  }
  get typeId() {
    return l.Interval;
  }
  toString() {
    return `Interval<${be[this.unit]}>`;
  }
}
Or[Symbol.toStringTag] = ((e) => (
  (e.unit = null),
  (e.ArrayType = Int32Array),
  (e[Symbol.toStringTag] = "Interval")
))(Or.prototype);
let Ie = class extends A {
  constructor(t) {
    super(), (this.children = [t]);
  }
  get typeId() {
    return l.List;
  }
  toString() {
    return `List<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
};
Ie[Symbol.toStringTag] = ((e) => (
  (e.children = null), (e[Symbol.toStringTag] = "List")
))(Ie.prototype);
let mt = class extends A {
  constructor(t) {
    super(), (this.children = t);
  }
  get typeId() {
    return l.Struct;
  }
  toString() {
    return `Struct<{${this.children
      .map((t) => `${t.name}:${t.type}`)
      .join(", ")}}>`;
  }
};
mt[Symbol.toStringTag] = ((e) => (
  (e.children = null), (e[Symbol.toStringTag] = "Struct")
))(mt.prototype);
class ke extends A {
  constructor(t, r, n) {
    super(),
      (this.mode = t),
      (this.children = n),
      (this.typeIds = r = Int32Array.from(r)),
      (this.typeIdToChildIndex = r.reduce(
        (s, a, i) => ((s[a] = i) && s) || s,
        Object.create(null)
      ));
  }
  get typeId() {
    return l.Union;
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children
      .map((t) => `${t.type}`)
      .join(" | ")}>`;
  }
}
ke[Symbol.toStringTag] = ((e) => (
  (e.mode = null),
  (e.typeIds = null),
  (e.children = null),
  (e.typeIdToChildIndex = null),
  (e.ArrayType = Int8Array),
  (e[Symbol.toStringTag] = "Union")
))(ke.prototype);
let Dr = class extends A {
  constructor(t) {
    super(), (this.byteWidth = t);
  }
  get typeId() {
    return l.FixedSizeBinary;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
};
Dr[Symbol.toStringTag] = ((e) => (
  (e.byteWidth = null),
  (e.ArrayType = Uint8Array),
  (e[Symbol.toStringTag] = "FixedSizeBinary")
))(Dr.prototype);
let je = class extends A {
  constructor(t, r) {
    super(), (this.listSize = t), (this.children = [r]);
  }
  get typeId() {
    return l.FixedSizeList;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
  toString() {
    return `FixedSizeList[${this.listSize}]<${this.valueType}>`;
  }
};
je[Symbol.toStringTag] = ((e) => (
  (e.children = null),
  (e.listSize = null),
  (e[Symbol.toStringTag] = "FixedSizeList")
))(je.prototype);
let ze = class extends A {
  constructor(t, r = !1) {
    super(), (this.children = [t]), (this.keysSorted = r);
  }
  get typeId() {
    return l.Map;
  }
  get keyType() {
    return this.children[0].type.children[0].type;
  }
  get valueType() {
    return this.children[0].type.children[1].type;
  }
  toString() {
    return `Map<{${this.children[0].type.children
      .map((t) => `${t.name}:${t.type}`)
      .join(", ")}}>`;
  }
};
ze[Symbol.toStringTag] = ((e) => (
  (e.children = null), (e.keysSorted = null), (e[Symbol.toStringTag] = "Map_")
))(ze.prototype);
const Kc = (
  (e) => () =>
    ++e
)(-1);
class $t extends A {
  constructor(t, r, n, s) {
    super(),
      (this.indices = r),
      (this.dictionary = t),
      (this.isOrdered = s || !1),
      (this.id = n == null ? Kc() : typeof n == "number" ? n : n.low);
  }
  get typeId() {
    return l.Dictionary;
  }
  get children() {
    return this.dictionary.children;
  }
  get valueType() {
    return this.dictionary;
  }
  get ArrayType() {
    return this.dictionary.ArrayType;
  }
  toString() {
    return `Dictionary<${this.indices}, ${this.dictionary}>`;
  }
}
$t[Symbol.toStringTag] = ((e) => (
  (e.id = null),
  (e.indices = null),
  (e.isOrdered = null),
  (e.dictionary = null),
  (e[Symbol.toStringTag] = "Dictionary")
))($t.prototype);
function Gs(e) {
  let t = e;
  switch (e.typeId) {
    case l.Decimal:
      return 4;
    case l.Timestamp:
      return 2;
    case l.Date:
      return 1 + t.unit;
    case l.Interval:
      return 1 + t.unit;
    case l.Int:
      return 1 + +(t.bitWidth > 32);
    case l.Time:
      return 1 + +(t.bitWidth > 32);
    case l.FixedSizeList:
      return t.listSize;
    case l.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}
const Jc = -1;
class p {
  constructor(t, r, n, s, a, i, o) {
    (this.type = t),
      (this.dictionary = o),
      (this.offset = Math.floor(Math.max(r || 0, 0))),
      (this.length = Math.floor(Math.max(n || 0, 0))),
      (this._nullCount = Math.floor(Math.max(s || 0, -1))),
      (this.childData = (i || []).map((u) => (u instanceof p ? u : u.data)));
    let c;
    a instanceof p
      ? ((this.stride = a.stride),
        (this.values = a.values),
        (this.typeIds = a.typeIds),
        (this.nullBitmap = a.nullBitmap),
        (this.valueOffsets = a.valueOffsets))
      : ((this.stride = Gs(t)),
        a &&
          ((c = a[0]) && (this.valueOffsets = c),
          (c = a[1]) && (this.values = c),
          (c = a[2]) && (this.nullBitmap = c),
          (c = a[3]) && (this.typeIds = c)));
  }
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get byteLength() {
    let t = 0,
      { valueOffsets: r, values: n, nullBitmap: s, typeIds: a } = this;
    return (
      r && (t += r.byteLength),
      n && (t += n.byteLength),
      s && (t += s.byteLength),
      a && (t += a.byteLength),
      this.childData.reduce((i, o) => i + o.byteLength, t)
    );
  }
  get nullCount() {
    let t = this._nullCount,
      r;
    return (
      t <= Jc &&
        (r = this.nullBitmap) &&
        (this._nullCount = t =
          this.length - En(r, this.offset, this.offset + this.length)),
      t
    );
  }
  clone(
    t,
    r = this.offset,
    n = this.length,
    s = this._nullCount,
    a = this,
    i = this.childData
  ) {
    return new p(t, r, n, s, a, i, this.dictionary);
  }
  slice(t, r) {
    const { stride: n, typeId: s, childData: a } = this,
      i = +(this._nullCount === 0) - 1,
      o = s === 16 ? n : 1,
      c = this._sliceBuffers(t, r, n, s);
    return this.clone(
      this.type,
      this.offset + t,
      r,
      i,
      c,
      !a.length || this.valueOffsets ? a : this._sliceChildren(a, o * t, o * r)
    );
  }
  _changeLengthAndBackfillNullBitmap(t) {
    if (this.typeId === l.Null) return this.clone(this.type, 0, t, 0);
    const { length: r, nullCount: n } = this,
      s = new Uint8Array(((t + 63) & -64) >> 3).fill(255, 0, r >> 3);
    (s[r >> 3] = (1 << (r - (r & -8))) - 1),
      n > 0 && s.set(Zn(this.offset, r, this.nullBitmap), 0);
    const a = this.buffers;
    return (a[b.VALIDITY] = s), this.clone(this.type, 0, t, n + (t - r), a);
  }
  _sliceBuffers(t, r, n, s) {
    let a,
      { buffers: i } = this;
    return (
      (a = i[b.TYPE]) && (i[b.TYPE] = a.subarray(t, t + r)),
      ((a = i[b.OFFSET]) && (i[b.OFFSET] = a.subarray(t, t + r + 1))) ||
        ((a = i[b.DATA]) &&
          (i[b.DATA] = s === 6 ? a : a.subarray(n * t, n * (t + r)))),
      i
    );
  }
  _sliceChildren(t, r, n) {
    return t.map((s) => s.slice(r, n));
  }
  static new(t, r, n, s, a, i, o) {
    switch ((a instanceof p ? (a = a.buffers) : a || (a = []), t.typeId)) {
      case l.Null:
        return p.Null(t, r, n);
      case l.Int:
        return p.Int(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Dictionary:
        return p.Dictionary(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || [], o);
      case l.Float:
        return p.Float(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Bool:
        return p.Bool(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Decimal:
        return p.Decimal(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Date:
        return p.Date(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Time:
        return p.Time(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Timestamp:
        return p.Timestamp(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.Interval:
        return p.Interval(t, r, n, s || 0, a[b.VALIDITY], a[b.DATA] || []);
      case l.FixedSizeBinary:
        return p.FixedSizeBinary(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.DATA] || []
        );
      case l.Binary:
        return p.Binary(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.OFFSET] || [],
          a[b.DATA] || []
        );
      case l.Utf8:
        return p.Utf8(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.OFFSET] || [],
          a[b.DATA] || []
        );
      case l.List:
        return p.List(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.OFFSET] || [],
          (i || [])[0]
        );
      case l.FixedSizeList:
        return p.FixedSizeList(t, r, n, s || 0, a[b.VALIDITY], (i || [])[0]);
      case l.Struct:
        return p.Struct(t, r, n, s || 0, a[b.VALIDITY], i || []);
      case l.Map:
        return p.Map(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.OFFSET] || [],
          (i || [])[0]
        );
      case l.Union:
        return p.Union(
          t,
          r,
          n,
          s || 0,
          a[b.VALIDITY],
          a[b.TYPE] || [],
          a[b.OFFSET] || i,
          i
        );
    }
    throw new Error(`Unrecognized typeId ${t.typeId}`);
  }
  static Null(t, r, n) {
    return new p(t, r, n, 0);
  }
  static Int(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Dictionary(t, r, n, s, a, i, o) {
    return new p(t, r, n, s, [void 0, U(t.indices.ArrayType, i), D(a)], [], o);
  }
  static Float(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Bool(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Decimal(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Date(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Time(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Timestamp(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Interval(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static FixedSizeBinary(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, U(t.ArrayType, i), D(a)]);
  }
  static Binary(t, r, n, s, a, i, o) {
    return new p(t, r, n, s, [De(i), D(o), D(a)]);
  }
  static Utf8(t, r, n, s, a, i, o) {
    return new p(t, r, n, s, [De(i), D(o), D(a)]);
  }
  static List(t, r, n, s, a, i, o) {
    return new p(t, r, n, s, [De(i), void 0, D(a)], [o]);
  }
  static FixedSizeList(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, void 0, D(a)], [i]);
  }
  static Struct(t, r, n, s, a, i) {
    return new p(t, r, n, s, [void 0, void 0, D(a)], i);
  }
  static Map(t, r, n, s, a, i, o) {
    return new p(t, r, n, s, [De(i), void 0, D(a)], [o]);
  }
  static Union(t, r, n, s, a, i, o, c) {
    const u = [void 0, void 0, D(a), U(t.ArrayType, i)];
    return t.mode === Et.Sparse
      ? new p(t, r, n, s, u, o)
      : ((u[b.OFFSET] = De(o)), new p(t, r, n, s, u, c));
  }
}
p.prototype.childData = Object.freeze([]);
const Gc = void 0;
function Ee(e) {
  if (e === null) return "null";
  if (e === Gc) return "undefined";
  switch (typeof e) {
    case "number":
      return `${e}`;
    case "bigint":
      return `${e}`;
    case "string":
      return `"${e}"`;
  }
  return typeof e[Symbol.toPrimitive] == "function"
    ? e[Symbol.toPrimitive]("string")
    : ArrayBuffer.isView(e)
    ? `[${e}]`
    : JSON.stringify(e);
}
function qc(e) {
  if (!e || e.length <= 0)
    return function (s) {
      return !0;
    };
  let t = "",
    r = e.filter((n) => n === n);
  return (
    r.length > 0 &&
      (t = `
    switch (x) {${r
      .map(
        (n) => `
        case ${Zc(n)}:`
      )
      .join("")}
            return false;
    }`),
    e.length !== r.length &&
      (t = `if (x !== x) return false;
${t}`),
    new Function(
      "x",
      `${t}
return true;`
    )
  );
}
function Zc(e) {
  return typeof e != "bigint" ? Ee(e) : qr ? `${Ee(e)}n` : `"${Ee(e)}"`;
}
const yn = (e, t) => ((e * t + 63) & -64 || 64) / t,
  Qc = (e, t = 0) =>
    e.length >= t ? e.subarray(0, t) : Sr(new e.constructor(t), e, 0);
class Ze {
  constructor(t, r = 1) {
    (this.buffer = t),
      (this.stride = r),
      (this.BYTES_PER_ELEMENT = t.BYTES_PER_ELEMENT),
      (this.ArrayType = t.constructor),
      this._resize((this.length = (t.length / r) | 0));
  }
  get byteLength() {
    return (this.length * this.stride * this.BYTES_PER_ELEMENT) | 0;
  }
  get reservedLength() {
    return this.buffer.length / this.stride;
  }
  get reservedByteLength() {
    return this.buffer.byteLength;
  }
  set(t, r) {
    return this;
  }
  append(t) {
    return this.set(this.length, t);
  }
  reserve(t) {
    if (t > 0) {
      this.length += t;
      const r = this.stride,
        n = this.length * r,
        s = this.buffer.length;
      n >= s &&
        this._resize(
          s === 0
            ? yn(n * 1, this.BYTES_PER_ELEMENT)
            : yn(n * 2, this.BYTES_PER_ELEMENT)
        );
    }
    return this;
  }
  flush(t = this.length) {
    t = yn(t * this.stride, this.BYTES_PER_ELEMENT);
    const r = Qc(this.buffer, t);
    return this.clear(), r;
  }
  clear() {
    return (this.length = 0), this._resize(0), this;
  }
  _resize(t) {
    return (this.buffer = Sr(new this.ArrayType(t), this.buffer));
  }
}
Ze.prototype.offset = 0;
class Qe extends Ze {
  last() {
    return this.get(this.length - 1);
  }
  get(t) {
    return this.buffer[t];
  }
  set(t, r) {
    return (
      this.reserve(t - this.length + 1),
      (this.buffer[t * this.stride] = r),
      this
    );
  }
}
class qs extends Qe {
  constructor(t = new Uint8Array(0)) {
    super(t, 1 / 8), (this.numValid = 0);
  }
  get numInvalid() {
    return this.length - this.numValid;
  }
  get(t) {
    return (this.buffer[t >> 3] >> t % 8) & 1;
  }
  set(t, r) {
    const { buffer: n } = this.reserve(t - this.length + 1),
      s = t >> 3,
      a = t % 8,
      i = (n[s] >> a) & 1;
    return (
      r
        ? i === 0 && ((n[s] |= 1 << a), ++this.numValid)
        : i === 1 && ((n[s] &= ~(1 << a)), --this.numValid),
      this
    );
  }
  clear() {
    return (this.numValid = 0), super.clear();
  }
}
class Zs extends Qe {
  constructor(t = new Int32Array(1)) {
    super(t, 1);
  }
  append(t) {
    return this.set(this.length - 1, t);
  }
  set(t, r) {
    const n = this.length - 1,
      s = this.reserve(t - n + 1).buffer;
    return n < t++ && s.fill(s[n], n, t), (s[t] = s[t - 1] + r), this;
  }
  flush(t = this.length - 1) {
    return t > this.length && this.set(t - 1, 0), super.flush(t + 1);
  }
}
class Qs extends Ze {
  get ArrayType64() {
    return (
      this._ArrayType64 ||
      (this._ArrayType64 = this.buffer instanceof Int32Array ? Te : Ke)
    );
  }
  set(t, r) {
    switch ((this.reserve(t - this.length + 1), typeof r)) {
      case "bigint":
        this.buffer64[t] = r;
        break;
      case "number":
        this.buffer[t * this.stride] = r;
        break;
      default:
        this.buffer.set(r, t * this.stride);
    }
    return this;
  }
  _resize(t) {
    const r = super._resize(t),
      n = r.byteLength / (this.BYTES_PER_ELEMENT * this.stride);
    return (
      qr && (this.buffer64 = new this.ArrayType64(r.buffer, r.byteOffset, n)), r
    );
  }
}
let W = class {
  constructor({ type: t, nullValues: r }) {
    (this.length = 0),
      (this.finished = !1),
      (this.type = t),
      (this.children = []),
      (this.nullValues = r),
      (this.stride = Gs(t)),
      (this._nulls = new qs()),
      r && r.length > 0 && (this._isValid = qc(r));
  }
  static new(t) {}
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  static throughDOM(t) {
    throw new Error('"throughDOM" not available in this environment');
  }
  static throughIterable(t) {
    return Xc(t);
  }
  static throughAsyncIterable(t) {
    return tu(t);
  }
  toVector() {
    return x.new(this.flush());
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get nullCount() {
    return this._nulls.numInvalid;
  }
  get numChildren() {
    return this.children.length;
  }
  get byteLength() {
    let t = 0;
    return (
      this._offsets && (t += this._offsets.byteLength),
      this._values && (t += this._values.byteLength),
      this._nulls && (t += this._nulls.byteLength),
      this._typeIds && (t += this._typeIds.byteLength),
      this.children.reduce((r, n) => r + n.byteLength, t)
    );
  }
  get reservedLength() {
    return this._nulls.reservedLength;
  }
  get reservedByteLength() {
    let t = 0;
    return (
      this._offsets && (t += this._offsets.reservedByteLength),
      this._values && (t += this._values.reservedByteLength),
      this._nulls && (t += this._nulls.reservedByteLength),
      this._typeIds && (t += this._typeIds.reservedByteLength),
      this.children.reduce((r, n) => r + n.reservedByteLength, t)
    );
  }
  get valueOffsets() {
    return this._offsets ? this._offsets.buffer : null;
  }
  get values() {
    return this._values ? this._values.buffer : null;
  }
  get nullBitmap() {
    return this._nulls ? this._nulls.buffer : null;
  }
  get typeIds() {
    return this._typeIds ? this._typeIds.buffer : null;
  }
  append(t) {
    return this.set(this.length, t);
  }
  isValid(t) {
    return this._isValid(t);
  }
  set(t, r) {
    return this.setValid(t, this.isValid(r)) && this.setValue(t, r), this;
  }
  setValue(t, r) {
    this._setValue(this, t, r);
  }
  setValid(t, r) {
    return (this.length = this._nulls.set(t, +r).length), r;
  }
  addChild(t, r = `${this.numChildren}`) {
    throw new Error(`Cannot append children to non-nested type "${this.type}"`);
  }
  getChildAt(t) {
    return this.children[t] || null;
  }
  flush() {
    const t = [],
      r = this._values,
      n = this._offsets,
      s = this._typeIds,
      { length: a, nullCount: i } = this;
    s
      ? ((t[b.TYPE] = s.flush(a)), n && (t[b.OFFSET] = n.flush(a)))
      : n
      ? (r && (t[b.DATA] = r.flush(n.last())), (t[b.OFFSET] = n.flush(a)))
      : r && (t[b.DATA] = r.flush(a)),
      i > 0 && (t[b.VALIDITY] = this._nulls.flush(a));
    const o = p.new(
      this.type,
      0,
      a,
      i,
      t,
      this.children.map((c) => c.flush())
    );
    return this.clear(), o;
  }
  finish() {
    return (this.finished = !0), this.children.forEach((t) => t.finish()), this;
  }
  clear() {
    return (
      (this.length = 0),
      this._offsets && this._offsets.clear(),
      this._values && this._values.clear(),
      this._nulls && this._nulls.clear(),
      this._typeIds && this._typeIds.clear(),
      this.children.forEach((t) => t.clear()),
      this
    );
  }
};
W.prototype.length = 1;
W.prototype.stride = 1;
W.prototype.children = null;
W.prototype.finished = !1;
W.prototype.nullValues = null;
W.prototype._isValid = () => !0;
class Yt extends W {
  constructor(t) {
    super(t), (this._values = new Qe(new this.ArrayType(0), this.stride));
  }
  setValue(t, r) {
    const n = this._values;
    return n.reserve(t - n.length + 1), super.setValue(t, r);
  }
}
class tn extends W {
  constructor(t) {
    super(t), (this._pendingLength = 0), (this._offsets = new Zs());
  }
  setValue(t, r) {
    const n = this._pending || (this._pending = new Map()),
      s = n.get(t);
    s && (this._pendingLength -= s.length),
      (this._pendingLength += r.length),
      n.set(t, r);
  }
  setValid(t, r) {
    return super.setValid(t, r)
      ? !0
      : ((this._pending || (this._pending = new Map())).set(t, void 0), !1);
  }
  clear() {
    return (this._pendingLength = 0), (this._pending = void 0), super.clear();
  }
  flush() {
    return this._flush(), super.flush();
  }
  finish() {
    return this._flush(), super.finish();
  }
  _flush() {
    const t = this._pending,
      r = this._pendingLength;
    return (
      (this._pendingLength = 0),
      (this._pending = void 0),
      t && t.size > 0 && this._flushPending(t, r),
      this
    );
  }
}
function Xc(e) {
  const { ["queueingStrategy"]: t = "count" } = e,
    { ["highWaterMark"]: r = t !== "bytes" ? 1e3 : 2 ** 14 } = e,
    n = t !== "bytes" ? "length" : "byteLength";
  return function* (s) {
    let a = 0,
      i = W.new(e);
    for (const o of s) i.append(o)[n] >= r && ++a && (yield i.toVector());
    (i.finish().length > 0 || a === 0) && (yield i.toVector());
  };
}
function tu(e) {
  const { ["queueingStrategy"]: t = "count" } = e,
    { ["highWaterMark"]: r = t !== "bytes" ? 1e3 : 2 ** 14 } = e,
    n = t !== "bytes" ? "length" : "byteLength";
  return async function* (s) {
    let a = 0,
      i = W.new(e);
    for await (const o of s) i.append(o)[n] >= r && ++a && (yield i.toVector());
    (i.finish().length > 0 || a === 0) && (yield i.toVector());
  };
}
class eu extends W {
  constructor(t) {
    super(t), (this._values = new qs());
  }
  setValue(t, r) {
    this._values.set(t, +r);
  }
}
class ru extends W {
  setValue(t, r) {}
  setValid(t, r) {
    return (this.length = Math.max(t + 1, this.length)), r;
  }
}
class ci extends Yt {}
class nu extends ci {}
class iu extends ci {}
class su extends Yt {}
class au extends W {
  constructor({ type: t, nullValues: r, dictionaryHashFunction: n }) {
    super({ type: new $t(t.dictionary, t.indices, t.id, t.isOrdered) }),
      (this._nulls = null),
      (this._dictionaryOffset = 0),
      (this._keysToIndices = Object.create(null)),
      (this.indices = W.new({ type: this.type.indices, nullValues: r })),
      (this.dictionary = W.new({
        type: this.type.dictionary,
        nullValues: null,
      })),
      typeof n == "function" && (this.valueToKey = n);
  }
  get values() {
    return this.indices.values;
  }
  get nullCount() {
    return this.indices.nullCount;
  }
  get nullBitmap() {
    return this.indices.nullBitmap;
  }
  get byteLength() {
    return this.indices.byteLength + this.dictionary.byteLength;
  }
  get reservedLength() {
    return this.indices.reservedLength + this.dictionary.reservedLength;
  }
  get reservedByteLength() {
    return this.indices.reservedByteLength + this.dictionary.reservedByteLength;
  }
  isValid(t) {
    return this.indices.isValid(t);
  }
  setValid(t, r) {
    const n = this.indices;
    return (r = n.setValid(t, r)), (this.length = n.length), r;
  }
  setValue(t, r) {
    let n = this._keysToIndices,
      s = this.valueToKey(r),
      a = n[s];
    return (
      a === void 0 &&
        (n[s] = a =
          this._dictionaryOffset + this.dictionary.append(r).length - 1),
      this.indices.setValue(t, a)
    );
  }
  flush() {
    const t = this.type,
      r = this._dictionary,
      n = this.dictionary.toVector(),
      s = this.indices.flush().clone(t);
    return (
      (s.dictionary = r ? r.concat(n) : n),
      this.finished || (this._dictionaryOffset += n.length),
      (this._dictionary = s.dictionary),
      this.clear(),
      s
    );
  }
  finish() {
    return (
      this.indices.finish(),
      this.dictionary.finish(),
      (this._dictionaryOffset = 0),
      (this._keysToIndices = Object.create(null)),
      super.finish()
    );
  }
  clear() {
    return this.indices.clear(), this.dictionary.clear(), super.clear();
  }
  valueToKey(t) {
    return typeof t == "string" ? t : `${t}`;
  }
}
class ou extends Yt {}
const Xs = new Float64Array(1),
  se = new Uint32Array(Xs.buffer);
function cu(e) {
  let t = (e & 31744) >> 10,
    r = (e & 1023) / 1024,
    n = (-1) ** ((e & 32768) >> 15);
  switch (t) {
    case 31:
      return n * (r ? NaN : 1 / 0);
    case 0:
      return n * (r ? 6103515625e-14 * r : 0);
  }
  return n * 2 ** (t - 15) * (1 + r);
}
function ta(e) {
  if (e !== e) return 32256;
  Xs[0] = e;
  let t = ((se[1] & 2147483648) >> 16) & 65535,
    r = se[1] & 2146435072,
    n = 0;
  return (
    r >= 1089470464
      ? se[0] > 0
        ? (r = 31744)
        : ((r = (r & 2080374784) >> 16), (n = (se[1] & 1048575) >> 10))
      : r <= 1056964608
      ? ((n = 1048576 + (se[1] & 1048575)),
        (n = (1048576 + (n << ((r >> 20) - 998))) >> 21),
        (r = 0))
      : ((r = (r - 1056964608) >> 10), (n = ((se[1] & 1048575) + 512) >> 10)),
    t | r | (n & 65535)
  );
}
class en extends Yt {}
class uu extends en {
  setValue(t, r) {
    this._values.set(t, ta(r));
  }
}
class lu extends en {
  setValue(t, r) {
    this._values.set(t, r);
  }
}
class hu extends en {
  setValue(t, r) {
    this._values.set(t, r);
  }
}
const fu = Symbol.for("isArrowBigNum");
function _t(e, ...t) {
  return t.length === 0
    ? Object.setPrototypeOf(U(this.TypedArray, e), this.constructor.prototype)
    : Object.setPrototypeOf(
        new this.TypedArray(e, ...t),
        this.constructor.prototype
      );
}
_t.prototype[fu] = !0;
_t.prototype.toJSON = function () {
  return `"${Gt(this)}"`;
};
_t.prototype.valueOf = function () {
  return ea(this);
};
_t.prototype.toString = function () {
  return Gt(this);
};
_t.prototype[Symbol.toPrimitive] = function (e = "default") {
  switch (e) {
    case "number":
      return ea(this);
    case "string":
      return Gt(this);
    case "default":
      return xr(this);
  }
  return Gt(this);
};
function ue(...e) {
  return _t.apply(this, e);
}
function le(...e) {
  return _t.apply(this, e);
}
function Pe(...e) {
  return _t.apply(this, e);
}
Object.setPrototypeOf(ue.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(le.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(Pe.prototype, Object.create(Uint32Array.prototype));
Object.assign(ue.prototype, _t.prototype, {
  constructor: ue,
  signed: !0,
  TypedArray: Int32Array,
  BigIntArray: Te,
});
Object.assign(le.prototype, _t.prototype, {
  constructor: le,
  signed: !1,
  TypedArray: Uint32Array,
  BigIntArray: Ke,
});
Object.assign(Pe.prototype, _t.prototype, {
  constructor: Pe,
  signed: !0,
  TypedArray: Uint32Array,
  BigIntArray: Ke,
});
function ea(e) {
  let { buffer: t, byteOffset: r, length: n, signed: s } = e,
    a = new Int32Array(t, r, n),
    i = 0,
    o = 0,
    c = a.length,
    u,
    d;
  for (; o < c; )
    (d = a[o++]),
      (u = a[o++]),
      s || (u = u >>> 0),
      (i += (d >>> 0) + u * o ** 32);
  return i;
}
let Gt, xr;
qr
  ? ((xr = (e) =>
      e.byteLength === 8
        ? new e.BigIntArray(e.buffer, e.byteOffset, 1)[0]
        : bn(e)),
    (Gt = (e) =>
      e.byteLength === 8
        ? `${new e.BigIntArray(e.buffer, e.byteOffset, 1)[0]}`
        : bn(e)))
  : ((Gt = bn), (xr = Gt));
function bn(e) {
  let t = "",
    r = new Uint32Array(2),
    n = new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2),
    s = new Uint32Array((n = new Uint16Array(n).reverse()).buffer),
    a = -1,
    i = n.length - 1;
  do {
    for (r[0] = n[(a = 0)]; a < i; )
      (n[a++] = r[1] = r[0] / 10), (r[0] = ((r[0] - r[1] * 10) << 16) + n[a]);
    (n[a] = r[1] = r[0] / 10), (r[0] = r[0] - r[1] * 10), (t = `${r[0]}${t}`);
  } while (s[0] || s[1] || s[2] || s[3]);
  return t || "0";
}
class Fe {
  constructor(t, r) {
    return Fe.new(t, r);
  }
  static new(t, r) {
    switch (r) {
      case !0:
        return new ue(t);
      case !1:
        return new le(t);
    }
    switch (t.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case Te:
        return new ue(t);
    }
    return t.byteLength === 16 ? new Pe(t) : new le(t);
  }
  static signed(t) {
    return new ue(t);
  }
  static unsigned(t) {
    return new le(t);
  }
  static decimal(t) {
    return new Pe(t);
  }
}
class Rt extends Yt {
  setValue(t, r) {
    this._values.set(t, r);
  }
}
class du extends Rt {}
class pu extends Rt {}
class yu extends Rt {}
class bu extends Rt {
  constructor(t) {
    t.nullValues && (t.nullValues = t.nullValues.map(Lr)),
      super(t),
      (this._values = new Qs(new Int32Array(0), 2));
  }
  get values64() {
    return this._values.buffer64;
  }
  isValid(t) {
    return super.isValid(Lr(t));
  }
}
class mu extends Rt {}
class gu extends Rt {}
class _u extends Rt {}
class wu extends Rt {
  constructor(t) {
    t.nullValues && (t.nullValues = t.nullValues.map(Lr)),
      super(t),
      (this._values = new Qs(new Uint32Array(0), 2));
  }
  get values64() {
    return this._values.buffer64;
  }
  isValid(t) {
    return super.isValid(Lr(t));
  }
}
const Lr = ((e) => (t) => (
  ArrayBuffer.isView(t) &&
    ((e.buffer = t.buffer),
    (e.byteOffset = t.byteOffset),
    (e.byteLength = t.byteLength),
    (t = xr(e)),
    (e.buffer = null)),
  t
))({ BigIntArray: Te });
class Xe extends Yt {}
class vu extends Xe {}
class Iu extends Xe {}
class Su extends Xe {}
class Bu extends Xe {}
class tr extends Yt {}
class Au extends tr {}
class Tu extends tr {}
class Fu extends tr {}
class Ou extends tr {}
class ui extends Yt {}
class Du extends ui {}
class xu extends ui {}
class ra extends tn {
  constructor(t) {
    super(t), (this._values = new Ze(new Uint8Array(0)));
  }
  get byteLength() {
    let t = this._pendingLength + this.length * 4;
    return (
      this._offsets && (t += this._offsets.byteLength),
      this._values && (t += this._values.byteLength),
      this._nulls && (t += this._nulls.byteLength),
      t
    );
  }
  setValue(t, r) {
    return super.setValue(t, D(r));
  }
  _flushPending(t, r) {
    const n = this._offsets,
      s = this._values.reserve(r).buffer;
    let a = 0,
      i = 0,
      o = 0,
      c;
    for ([a, c] of t)
      c === void 0
        ? n.set(a, 0)
        : ((i = c.length), s.set(c, o), n.set(a, i), (o += i));
  }
}
class li extends tn {
  constructor(t) {
    super(t), (this._values = new Ze(new Uint8Array(0)));
  }
  get byteLength() {
    let t = this._pendingLength + this.length * 4;
    return (
      this._offsets && (t += this._offsets.byteLength),
      this._values && (t += this._values.byteLength),
      this._nulls && (t += this._nulls.byteLength),
      t
    );
  }
  setValue(t, r) {
    return super.setValue(t, Gr(r));
  }
  _flushPending(t, r) {}
}
li.prototype._flushPending = ra.prototype._flushPending;
class na {
  get length() {
    return this._values.length;
  }
  get(t) {
    return this._values[t];
  }
  clear() {
    return (this._values = null), this;
  }
  bind(t) {
    return t instanceof x ? t : ((this._values = t), this);
  }
}
const J = Symbol.for("parent"),
  he = Symbol.for("rowIndex"),
  nt = Symbol.for("keyToIdx"),
  rt = Symbol.for("idxToVal"),
  Un = Symbol.for("nodejs.util.inspect.custom");
class Mt {
  constructor(t, r) {
    (this[J] = t), (this.size = r);
  }
  entries() {
    return this[Symbol.iterator]();
  }
  has(t) {
    return this.get(t) !== void 0;
  }
  get(t) {
    let r;
    if (t != null) {
      const n = this[nt] || (this[nt] = new Map());
      let s = n.get(t);
      if (s !== void 0) {
        const a = this[rt] || (this[rt] = new Array(this.size));
        (r = a[s]) !== void 0 || (a[s] = r = this.getValue(s));
      } else if ((s = this.getIndex(t)) > -1) {
        n.set(t, s);
        const a = this[rt] || (this[rt] = new Array(this.size));
        (r = a[s]) !== void 0 || (a[s] = r = this.getValue(s));
      }
    }
    return r;
  }
  set(t, r) {
    if (t != null) {
      const n = this[nt] || (this[nt] = new Map());
      let s = n.get(t);
      if ((s === void 0 && n.set(t, (s = this.getIndex(t))), s > -1)) {
        const a = this[rt] || (this[rt] = new Array(this.size));
        a[s] = this.setValue(s, r);
      }
    }
    return this;
  }
  clear() {
    throw new Error(`Clearing ${this[Symbol.toStringTag]} not supported.`);
  }
  delete(t) {
    throw new Error(
      `Deleting ${this[Symbol.toStringTag]} values not supported.`
    );
  }
  *[Symbol.iterator]() {
    const t = this.keys(),
      r = this.values(),
      n = this[nt] || (this[nt] = new Map()),
      s = this[rt] || (this[rt] = new Array(this.size));
    for (
      let a, i, o = 0, c, u;
      !((c = t.next()).done || (u = r.next()).done);
      ++o
    )
      (a = c.value),
        (i = u.value),
        (s[o] = i),
        n.has(a) || n.set(a, o),
        yield [a, i];
  }
  forEach(t, r) {
    const n = this.keys(),
      s = this.values(),
      a = r === void 0 ? t : (c, u, d) => t.call(r, c, u, d),
      i = this[nt] || (this[nt] = new Map()),
      o = this[rt] || (this[rt] = new Array(this.size));
    for (
      let c, u, d = 0, y, F;
      !((y = n.next()).done || (F = s.next()).done);
      ++d
    )
      (c = y.value),
        (u = F.value),
        (o[d] = u),
        i.has(c) || i.set(c, d),
        a(u, c, this);
  }
  toArray() {
    return [...this.values()];
  }
  toJSON() {
    const t = {};
    return this.forEach((r, n) => (t[n] = r)), t;
  }
  inspect() {
    return this.toString();
  }
  [Un]() {
    return this.toString();
  }
  toString() {
    const t = [];
    return (
      this.forEach((r, n) => {
        (n = Ee(n)), (r = Ee(r)), t.push(`${n}: ${r}`);
      }),
      `{ ${t.join(", ")} }`
    );
  }
}
Mt[Symbol.toStringTag] = ((e) => (
  Object.defineProperties(e, {
    size: { writable: !0, enumerable: !1, configurable: !1, value: 0 },
    [J]: { writable: !0, enumerable: !1, configurable: !1, value: null },
    [he]: { writable: !0, enumerable: !1, configurable: !1, value: -1 },
  }),
  (e[Symbol.toStringTag] = "Row")
))(Mt.prototype);
class ia extends Mt {
  constructor(t) {
    return super(t, t.length), Lu(this);
  }
  keys() {
    return this[J].getChildAt(0)[Symbol.iterator]();
  }
  values() {
    return this[J].getChildAt(1)[Symbol.iterator]();
  }
  getKey(t) {
    return this[J].getChildAt(0).get(t);
  }
  getIndex(t) {
    return this[J].getChildAt(0).indexOf(t);
  }
  getValue(t) {
    return this[J].getChildAt(1).get(t);
  }
  setValue(t, r) {
    this[J].getChildAt(1).set(t, r);
  }
}
class sa extends Mt {
  constructor(t) {
    return super(t, t.type.children.length), aa(this);
  }
  *keys() {
    for (const t of this[J].type.children) yield t.name;
  }
  *values() {
    for (const t of this[J].type.children) yield this[t.name];
  }
  getKey(t) {
    return this[J].type.children[t].name;
  }
  getIndex(t) {
    return this[J].type.children.findIndex((r) => r.name === t);
  }
  getValue(t) {
    return this[J].getChildAt(t).get(this[he]);
  }
  setValue(t, r) {
    return this[J].getChildAt(t).set(this[he], r);
  }
}
Object.setPrototypeOf(Mt.prototype, Map.prototype);
const aa = (() => {
    const e = { enumerable: !0, configurable: !1, get: null, set: null };
    return (t) => {
      let r = -1,
        n = t[nt] || (t[nt] = new Map());
      const s = (i) =>
          function () {
            return this.get(i);
          },
        a = (i) =>
          function (o) {
            return this.set(i, o);
          };
      for (const i of t.keys())
        n.set(i, ++r),
          (e.get = s(i)),
          (e.set = a(i)),
          t.hasOwnProperty(i) ||
            ((e.enumerable = !0), Object.defineProperty(t, i, e)),
          t.hasOwnProperty(r) ||
            ((e.enumerable = !1), Object.defineProperty(t, r, e));
      return (e.get = e.set = null), t;
    };
  })(),
  Lu = (() => {
    if (typeof Proxy > "u") return aa;
    const e = Mt.prototype.has,
      t = Mt.prototype.get,
      r = Mt.prototype.set,
      n = Mt.prototype.getKey,
      s = {
        isExtensible() {
          return !1;
        },
        deleteProperty() {
          return !1;
        },
        preventExtensions() {
          return !0;
        },
        ownKeys(a) {
          return [...a.keys()].map((i) => `${i}`);
        },
        has(a, i) {
          switch (i) {
            case "getKey":
            case "getIndex":
            case "getValue":
            case "setValue":
            case "toArray":
            case "toJSON":
            case "inspect":
            case "constructor":
            case "isPrototypeOf":
            case "propertyIsEnumerable":
            case "toString":
            case "toLocaleString":
            case "valueOf":
            case "size":
            case "has":
            case "get":
            case "set":
            case "clear":
            case "delete":
            case "keys":
            case "values":
            case "entries":
            case "forEach":
            case "__proto__":
            case "__defineGetter__":
            case "__defineSetter__":
            case "hasOwnProperty":
            case "__lookupGetter__":
            case "__lookupSetter__":
            case Symbol.iterator:
            case Symbol.toStringTag:
            case J:
            case he:
            case rt:
            case nt:
            case Un:
              return !0;
          }
          return (
            typeof i == "number" && !a.has(i) && (i = a.getKey(i)), a.has(i)
          );
        },
        get(a, i, o) {
          switch (i) {
            case "getKey":
            case "getIndex":
            case "getValue":
            case "setValue":
            case "toArray":
            case "toJSON":
            case "inspect":
            case "constructor":
            case "isPrototypeOf":
            case "propertyIsEnumerable":
            case "toString":
            case "toLocaleString":
            case "valueOf":
            case "size":
            case "has":
            case "get":
            case "set":
            case "clear":
            case "delete":
            case "keys":
            case "values":
            case "entries":
            case "forEach":
            case "__proto__":
            case "__defineGetter__":
            case "__defineSetter__":
            case "hasOwnProperty":
            case "__lookupGetter__":
            case "__lookupSetter__":
            case Symbol.iterator:
            case Symbol.toStringTag:
            case J:
            case he:
            case rt:
            case nt:
            case Un:
              return Reflect.get(a, i, o);
          }
          return (
            typeof i == "number" && !e.call(o, i) && (i = n.call(o, i)),
            t.call(o, i)
          );
        },
        set(a, i, o, c) {
          switch (i) {
            case J:
            case he:
            case rt:
            case nt:
              return Reflect.set(a, i, o, c);
            case "getKey":
            case "getIndex":
            case "getValue":
            case "setValue":
            case "toArray":
            case "toJSON":
            case "inspect":
            case "constructor":
            case "isPrototypeOf":
            case "propertyIsEnumerable":
            case "toString":
            case "toLocaleString":
            case "valueOf":
            case "size":
            case "has":
            case "get":
            case "set":
            case "clear":
            case "delete":
            case "keys":
            case "values":
            case "entries":
            case "forEach":
            case "__proto__":
            case "__defineGetter__":
            case "__defineSetter__":
            case "hasOwnProperty":
            case "__lookupGetter__":
            case "__lookupSetter__":
            case Symbol.iterator:
            case Symbol.toStringTag:
              return !1;
          }
          return (
            typeof i == "number" && !e.call(c, i) && (i = n.call(c, i)),
            e.call(c, i) ? !!r.call(c, i, o) : !1
          );
        },
      };
    return (a) => new Proxy(a, s);
  })();
let Gi;
function oa(e, t, r, n) {
  let { length: s = 0 } = e,
    a = typeof t != "number" ? 0 : t,
    i = typeof r != "number" ? s : r;
  return (
    a < 0 && (a = ((a % s) + s) % s),
    i < 0 && (i = ((i % s) + s) % s),
    i < a && ((Gi = a), (a = i), (i = Gi)),
    i > s && (i = s),
    n ? n(e, a, i) : [a, i]
  );
}
const Mu = qr ? _c(0) : 0,
  qi = (e) => e !== e;
function Oe(e) {
  let t = typeof e;
  if (t !== "object" || e === null)
    return qi(e) ? qi : t !== "bigint" ? (r) => r === e : (r) => Mu + r === e;
  if (e instanceof Date) {
    const r = e.valueOf();
    return (n) => (n instanceof Date ? n.valueOf() === r : !1);
  }
  return ArrayBuffer.isView(e)
    ? (r) => (r ? xc(e, r) : !1)
    : e instanceof Map
    ? Uu(e)
    : Array.isArray(e)
    ? Eu(e)
    : e instanceof x
    ? Nu(e)
    : Vu(e);
}
function Eu(e) {
  const t = [];
  for (let r = -1, n = e.length; ++r < n; ) t[r] = Oe(e[r]);
  return rn(t);
}
function Uu(e) {
  let t = -1;
  const r = [];
  return e.forEach((n) => (r[++t] = Oe(n))), rn(r);
}
function Nu(e) {
  const t = [];
  for (let r = -1, n = e.length; ++r < n; ) t[r] = Oe(e.get(r));
  return rn(t);
}
function Vu(e) {
  const t = Object.keys(e);
  if (t.length === 0) return () => !1;
  const r = [];
  for (let n = -1, s = t.length; ++n < s; ) r[n] = Oe(e[t[n]]);
  return rn(r, t);
}
function rn(e, t) {
  return (r) => {
    if (!r || typeof r != "object") return !1;
    switch (r.constructor) {
      case Array:
        return Ru(e, r);
      case Map:
      case ia:
      case sa:
        return Zi(e, r, r.keys());
      case Object:
      case void 0:
        return Zi(e, r, t || Object.keys(r));
    }
    return r instanceof x ? Cu(e, r) : !1;
  };
}
function Ru(e, t) {
  const r = e.length;
  if (t.length !== r) return !1;
  for (let n = -1; ++n < r; ) if (!e[n](t[n])) return !1;
  return !0;
}
function Cu(e, t) {
  const r = e.length;
  if (t.length !== r) return !1;
  for (let n = -1; ++n < r; ) if (!e[n](t.get(n))) return !1;
  return !0;
}
function Zi(e, t, r) {
  const n = r[Symbol.iterator](),
    s = t instanceof Map ? t.keys() : Object.keys(t)[Symbol.iterator](),
    a = t instanceof Map ? t.values() : Object.values(t)[Symbol.iterator]();
  let i = 0,
    o = e.length,
    c = a.next(),
    u = n.next(),
    d = s.next();
  for (
    ;
    i < o &&
    !u.done &&
    !d.done &&
    !c.done &&
    !(u.value !== d.value || !e[i](c.value));
    ++i, u = n.next(), d = s.next(), c = a.next()
  );
  return i === o && u.done && d.done && c.done
    ? !0
    : (n.return && n.return(),
      s.return && s.return(),
      a.return && a.return(),
      !1);
}
class G extends x {
  constructor(t, r = [], n = ku(r)) {
    super(),
      (this._nullCount = -1),
      (this._type = t),
      (this._chunks = r),
      (this._chunkOffsets = n),
      (this._length = n[n.length - 1]),
      (this._numChildren = (this._type.children || []).length);
  }
  static flatten(...t) {
    return $u(x, t);
  }
  static concat(...t) {
    const r = G.flatten(...t);
    return new G(r[0].type, r);
  }
  get type() {
    return this._type;
  }
  get length() {
    return this._length;
  }
  get chunks() {
    return this._chunks;
  }
  get typeId() {
    return this._type.typeId;
  }
  get VectorName() {
    return `Chunked<${this._type}>`;
  }
  get data() {
    return this._chunks[0] ? this._chunks[0].data : null;
  }
  get ArrayType() {
    return this._type.ArrayType;
  }
  get numChildren() {
    return this._numChildren;
  }
  get stride() {
    return this._chunks[0] ? this._chunks[0].stride : 1;
  }
  get byteLength() {
    return this._chunks.reduce((t, r) => t + r.byteLength, 0);
  }
  get nullCount() {
    let t = this._nullCount;
    return (
      t < 0 &&
        (this._nullCount = t =
          this._chunks.reduce((r, { nullCount: n }) => r + n, 0)),
      t
    );
  }
  get indices() {
    if (A.isDictionary(this._type)) {
      if (!this._indices) {
        const t = this._chunks;
        this._indices =
          t.length === 1 ? t[0].indices : G.concat(...t.map((r) => r.indices));
      }
      return this._indices;
    }
    return null;
  }
  get dictionary() {
    return A.isDictionary(this._type)
      ? this._chunks[this._chunks.length - 1].data.dictionary
      : null;
  }
  *[Symbol.iterator]() {
    for (const t of this._chunks) yield* t;
  }
  clone(t = this._chunks) {
    return new G(this._type, t);
  }
  concat(...t) {
    return this.clone(G.flatten(this, ...t));
  }
  slice(t, r) {
    return oa(this, t, r, this._sliceInternal);
  }
  getChildAt(t) {
    if (t < 0 || t >= this._numChildren) return null;
    let r = this._children || (this._children = []),
      n,
      s,
      a;
    return (n = r[t])
      ? n
      : (s = (this._type.children || [])[t]) &&
        ((a = this._chunks
          .map((i) => i.getChildAt(t))
          .filter((i) => i != null)),
        a.length > 0)
      ? (r[t] = new G(s.type, a))
      : null;
  }
  search(t, r) {
    let n = t,
      s = this._chunkOffsets,
      a = s.length - 1;
    if (n < 0 || n >= s[a]) return null;
    if (a <= 1) return r ? r(this, 0, n) : [0, n];
    let i = 0,
      o = 0,
      c = 0;
    do {
      if (i + 1 === a) return r ? r(this, i, n - o) : [i, n - o];
      (c = (i + (a - i) / 2) | 0), n >= s[c] ? (i = c) : (a = c);
    } while (n < s[a] && n >= (o = s[i]));
    return null;
  }
  isValid(t) {
    return !!this.search(t, this.isValidInternal);
  }
  get(t) {
    return this.search(t, this.getInternal);
  }
  set(t, r) {
    this.search(t, ({ chunks: n }, s, a) => n[s].set(a, r));
  }
  indexOf(t, r) {
    return r && typeof r == "number"
      ? this.search(r, (n, s, a) => this.indexOfInternal(n, s, a, t))
      : this.indexOfInternal(this, 0, Math.max(0, r || 0), t);
  }
  toArray() {
    const { chunks: t } = this,
      r = t.length;
    let n = this._type.ArrayType;
    if (r <= 0) return new n(0);
    if (r <= 1) return t[0].toArray();
    let s = 0,
      a = new Array(r);
    for (let c = -1; ++c < r; ) s += (a[c] = t[c].toArray()).length;
    n !== a[0].constructor && (n = a[0].constructor);
    let i = new n(s),
      o = n === Array ? zu : ju;
    for (let c = -1, u = 0; ++c < r; ) u = o(a[c], i, u);
    return i;
  }
  getInternal({ _chunks: t }, r, n) {
    return t[r].get(n);
  }
  isValidInternal({ _chunks: t }, r, n) {
    return t[r].isValid(n);
  }
  indexOfInternal({ _chunks: t }, r, n, s) {
    let a = r - 1,
      i = t.length,
      o = n,
      c = 0,
      u = -1;
    for (; ++a < i; ) {
      if (~(u = t[a].indexOf(s, o))) return c + u;
      (o = 0), (c += t[a].length);
    }
    return -1;
  }
  _sliceInternal(t, r, n) {
    const s = [],
      { chunks: a, _chunkOffsets: i } = t;
    for (let o = -1, c = a.length; ++o < c; ) {
      const u = a[o],
        d = u.length,
        y = i[o];
      if (y >= n) break;
      if (r >= y + d) continue;
      if (y >= r && y + d <= n) {
        s.push(u);
        continue;
      }
      const F = Math.max(0, r - y),
        M = Math.min(n - y, d);
      s.push(u.slice(F, M));
    }
    return t.clone(s);
  }
}
function ku(e) {
  let t = new Uint32Array((e || []).length + 1),
    r = (t[0] = 0),
    n = t.length;
  for (let s = 0; ++s < n; ) t[s] = r += e[s - 1].length;
  return t;
}
const ju = (e, t, r) => (t.set(e, r), r + e.length),
  zu = (e, t, r) => {
    let n = r;
    for (let s = -1, a = e.length; ++s < a; ) t[n++] = e[s];
    return n;
  };
class dt extends G {
  constructor(t, r = [], n) {
    if (
      ((r = G.flatten(...r)),
      super(t.type, r, n),
      (this._field = t),
      r.length === 1 && !(this instanceof Qi))
    )
      return new Qi(t, r[0], this._chunkOffsets);
  }
  static new(t, r, ...n) {
    const s = G.flatten(
      Array.isArray(r)
        ? [...r, ...n]
        : r instanceof x
        ? [r, ...n]
        : [x.new(r, ...n)]
    );
    if (typeof t == "string") {
      const a = s[0].data.type;
      t = new L(t, a, !0);
    } else
      !t.nullable &&
        s.some(({ nullCount: a }) => a > 0) &&
        (t = t.clone({ nullable: !0 }));
    return new dt(t, s);
  }
  get field() {
    return this._field;
  }
  get name() {
    return this._field.name;
  }
  get nullable() {
    return this._field.nullable;
  }
  get metadata() {
    return this._field.metadata;
  }
  clone(t = this._chunks) {
    return new dt(this._field, t);
  }
  getChildAt(t) {
    if (t < 0 || t >= this.numChildren) return null;
    let r = this._children || (this._children = []),
      n,
      s,
      a;
    return (n = r[t])
      ? n
      : (s = (this.type.children || [])[t]) &&
        ((a = this._chunks
          .map((i) => i.getChildAt(t))
          .filter((i) => i != null)),
        a.length > 0)
      ? (r[t] = new dt(s, a))
      : null;
  }
}
class Qi extends dt {
  constructor(t, r, n) {
    super(t, [r], n), (this._chunk = r);
  }
  search(t, r) {
    return r ? r(this, 0, t) : [0, t];
  }
  isValid(t) {
    return this._chunk.isValid(t);
  }
  get(t) {
    return this._chunk.get(t);
  }
  set(t, r) {
    this._chunk.set(t, r);
  }
  indexOf(t, r) {
    return this._chunk.indexOf(t, r);
  }
}
const Jt = Array.isArray,
  ca = (e, t) => hi(e, t, [], 0),
  Pu = (e) => {
    const [t, r] = fi(e, [[], []]);
    return r.map((n, s) =>
      n instanceof dt
        ? dt.new(n.field.clone(t[s]), n)
        : n instanceof x
        ? dt.new(t[s], n)
        : dt.new(t[s], [])
    );
  },
  ua = (e) => fi(e, [[], []]),
  $u = (e, t) => Nn(e, t, [], 0),
  Wu = (e, t) => la(e, t, [], 0);
function hi(e, t, r, n) {
  let s,
    a = n,
    i = -1,
    o = t.length;
  for (; ++i < o; )
    Jt((s = t[i]))
      ? (a = hi(e, s, r, a).length)
      : s instanceof e && (r[a++] = s);
  return r;
}
function Nn(e, t, r, n) {
  let s,
    a = n,
    i = -1,
    o = t.length;
  for (; ++i < o; )
    Jt((s = t[i]))
      ? (a = Nn(e, s, r, a).length)
      : s instanceof G
      ? (a = Nn(e, s.chunks, r, a).length)
      : s instanceof e && (r[a++] = s);
  return r;
}
function la(e, t, r, n) {
  let s,
    a = n,
    i = -1,
    o = t.length;
  for (; ++i < o; )
    Jt((s = t[i]))
      ? (a = la(e, s, r, a).length)
      : s instanceof e
      ? (a = hi(
          x,
          s.schema.fields.map((c, u) => s.getChildAt(u)),
          r,
          a
        ).length)
      : s instanceof x && (r[a++] = s);
  return r;
}
const Yu = (e, [t, r], n) => ((e[0][n] = t), (e[1][n] = r), e);
function fi(e, t) {
  let r, n;
  switch ((n = e.length)) {
    case 0:
      return t;
    case 1:
      if (((r = t[0]), !e[0])) return t;
      if (Jt(e[0])) return fi(e[0], t);
      e[0] instanceof p ||
        e[0] instanceof x ||
        e[0] instanceof A ||
        ([r, e] = Object.entries(e[0]).reduce(Yu, t));
      break;
    default:
      Jt((r = e[n - 1]))
        ? (e = Jt(e[0]) ? e[0] : e.slice(0, n - 1))
        : ((e = Jt(e[0]) ? e[0] : e), (r = []));
  }
  let s = -1,
    a = -1,
    i = -1,
    o = e.length,
    c,
    u,
    [d, y] = t;
  for (; ++i < o; )
    (u = e[i]),
      u instanceof dt && (y[++a] = u)
        ? (d[++s] = u.field.clone(r[i], u.type, !0))
        : (({ [i]: c = i } = r),
          u instanceof A && (y[++a] = u)
            ? (d[++s] = L.new(c, u, !0))
            : u &&
              u.type &&
              (y[++a] = u) &&
              (u instanceof p && (y[a] = u = x.new(u)),
              (d[++s] = L.new(c, u.type, !0))));
  return t;
}
class R {
  constructor(t = [], r, n) {
    (this.fields = t || []),
      (this.metadata = r || new Map()),
      n || (n = Vn(t)),
      (this.dictionaries = n);
  }
  static from(...t) {
    return R.new(t[0], t[1]);
  }
  static new(...t) {
    return new R(ua(t)[0]);
  }
  get [Symbol.toStringTag]() {
    return "Schema";
  }
  toString() {
    return `Schema<{ ${this.fields.map((t, r) => `${r}: ${t}`).join(", ")} }>`;
  }
  compareTo(t) {
    return st.compareSchemas(this, t);
  }
  select(...t) {
    const r = t.reduce((n, s) => (n[s] = !0) && n, Object.create(null));
    return new R(
      this.fields.filter((n) => r[n.name]),
      this.metadata
    );
  }
  selectAt(...t) {
    return new R(t.map((r) => this.fields[r]).filter(Boolean), this.metadata);
  }
  assign(...t) {
    const r = t[0] instanceof R ? t[0] : new R(ca(L, t)),
      n = [...this.fields],
      s = or(or(new Map(), this.metadata), r.metadata),
      a = r.fields.filter((o) => {
        const c = n.findIndex((u) => u.name === o.name);
        return ~c
          ? (n[c] = o.clone({
              metadata: or(or(new Map(), n[c].metadata), o.metadata),
            })) && !1
          : !0;
      }),
      i = Vn(a, new Map());
    return new R([...n, ...a], s, new Map([...this.dictionaries, ...i]));
  }
}
class L {
  constructor(t, r, n = !1, s) {
    (this.name = t),
      (this.type = r),
      (this.nullable = n),
      (this.metadata = s || new Map());
  }
  static new(...t) {
    let [r, n, s, a] = t;
    return (
      t[0] &&
        typeof t[0] == "object" &&
        (({ name: r } = t[0]),
        n === void 0 && (n = t[0].type),
        s === void 0 && (s = t[0].nullable),
        a === void 0 && (a = t[0].metadata)),
      new L(`${r}`, n, s, a)
    );
  }
  get typeId() {
    return this.type.typeId;
  }
  get [Symbol.toStringTag]() {
    return "Field";
  }
  toString() {
    return `${this.name}: ${this.type}`;
  }
  compareTo(t) {
    return st.compareField(this, t);
  }
  clone(...t) {
    let [r, n, s, a] = t;
    return (
      !t[0] || typeof t[0] != "object"
        ? ([
            r = this.name,
            n = this.type,
            s = this.nullable,
            a = this.metadata,
          ] = t)
        : ({
            name: r = this.name,
            type: n = this.type,
            nullable: s = this.nullable,
            metadata: a = this.metadata,
          } = t[0]),
      L.new(r, n, s, a)
    );
  }
}
function or(e, t) {
  return new Map([...(e || new Map()), ...(t || new Map())]);
}
function Vn(e, t = new Map()) {
  for (let r = -1, n = e.length; ++r < n; ) {
    const a = e[r].type;
    if (A.isDictionary(a)) {
      if (!t.has(a.id)) t.set(a.id, a.dictionary);
      else if (t.get(a.id) !== a.dictionary)
        throw new Error(
          "Cannot create Schema containing two different dictionaries with the same Id"
        );
    }
    a.children && a.children.length > 0 && Vn(a.children, t);
  }
  return t;
}
R.prototype.fields = null;
R.prototype.metadata = null;
R.prototype.dictionaries = null;
L.prototype.type = null;
L.prototype.name = null;
L.prototype.nullable = null;
L.prototype.metadata = null;
class Hu extends tn {
  constructor(t) {
    super(t), (this._run = new na()), (this._offsets = new Zs());
  }
  addChild(t, r = "0") {
    if (this.numChildren > 0)
      throw new Error("ListBuilder can only have one child.");
    return (
      (this.children[this.numChildren] = t),
      (this.type = new Ie(new L(r, t.type, !0))),
      this.numChildren - 1
    );
  }
  clear() {
    return this._run.clear(), super.clear();
  }
  _flushPending(t) {
    const r = this._run,
      n = this._offsets,
      s = this._setValue;
    let a = 0,
      i;
    for ([a, i] of t)
      i === void 0 ? n.set(a, 0) : (n.set(a, i.length), s(this, a, r.bind(i)));
  }
}
class Ku extends W {
  constructor() {
    super(...arguments), (this._run = new na());
  }
  setValue(t, r) {
    super.setValue(t, this._run.bind(r));
  }
  addChild(t, r = "0") {
    if (this.numChildren > 0)
      throw new Error("FixedSizeListBuilder can only have one child.");
    const n = this.children.push(t);
    return (this.type = new je(this.type.listSize, new L(r, t.type, !0))), n;
  }
  clear() {
    return this._run.clear(), super.clear();
  }
}
class Ju extends tn {
  set(t, r) {
    return super.set(t, r);
  }
  setValue(t, r) {
    r = r instanceof Map ? r : new Map(Object.entries(r));
    const n = this._pending || (this._pending = new Map()),
      s = n.get(t);
    s && (this._pendingLength -= s.size),
      (this._pendingLength += r.size),
      n.set(t, r);
  }
  addChild(t, r = `${this.numChildren}`) {
    if (this.numChildren > 0)
      throw new Error("ListBuilder can only have one child.");
    return (
      (this.children[this.numChildren] = t),
      (this.type = new ze(new L(r, t.type, !0), this.type.keysSorted)),
      this.numChildren - 1
    );
  }
  _flushPending(t) {
    const r = this._offsets,
      n = this._setValue;
    t.forEach((s, a) => {
      s === void 0 ? r.set(a, 0) : (r.set(a, s.size), n(this, a, s));
    });
  }
}
class Gu extends W {
  addChild(t, r = `${this.numChildren}`) {
    const n = this.children.push(t);
    return (
      (this.type = new mt([...this.type.children, new L(r, t.type, !0)])), n
    );
  }
}
class di extends W {
  constructor(t) {
    super(t),
      (this._typeIds = new Qe(new Int8Array(0), 1)),
      typeof t.valueToChildTypeId == "function" &&
        (this._valueToChildTypeId = t.valueToChildTypeId);
  }
  get typeIdToChildIndex() {
    return this.type.typeIdToChildIndex;
  }
  append(t, r) {
    return this.set(this.length, t, r);
  }
  set(t, r, n) {
    return (
      n === void 0 && (n = this._valueToChildTypeId(this, r, t)),
      this.setValid(t, this.isValid(r)) && this.setValue(t, r, n),
      this
    );
  }
  setValue(t, r, n) {
    this._typeIds.set(t, n), super.setValue(t, r);
  }
  addChild(t, r = `${this.children.length}`) {
    const n = this.children.push(t),
      {
        type: { children: s, mode: a, typeIds: i },
      } = this,
      o = [...s, new L(r, t.type)];
    return (this.type = new ke(a, [...i, n], o)), n;
  }
  _valueToChildTypeId(t, r, n) {
    throw new Error(
      "Cannot map UnionBuilder value to child typeId. Pass the `childTypeId` as the second argument to unionBuilder.append(), or supply a `valueToChildTypeId` function as part of the UnionBuilder constructor options."
    );
  }
}
class qu extends di {}
class Zu extends di {
  constructor(t) {
    super(t), (this._offsets = new Qe(new Int32Array(0)));
  }
  setValue(t, r, n) {
    const s = this.type.typeIdToChildIndex[n];
    return (
      this._offsets.set(t, this.getChildAt(s).length), super.setValue(t, r, n)
    );
  }
}
class I extends O {}
const Qu = (e, t, r) => {
    e[t] = (r / 864e5) | 0;
  },
  pi = (e, t, r) => {
    (e[t] = r % 4294967296 | 0), (e[t + 1] = (r / 4294967296) | 0);
  },
  Xu = (e, t, r) => {
    (e[t] = (r * 1e3) % 4294967296 | 0),
      (e[t + 1] = ((r * 1e3) / 4294967296) | 0);
  },
  tl = (e, t, r) => {
    (e[t] = (r * 1e6) % 4294967296 | 0),
      (e[t + 1] = ((r * 1e6) / 4294967296) | 0);
  },
  ha = (e, t, r, n) => {
    const { [r]: s, [r + 1]: a } = t;
    s != null && a != null && e.set(n.subarray(0, a - s), s);
  },
  el = ({ offset: e, values: t }, r, n) => {
    const s = e + r;
    n ? (t[s >> 3] |= 1 << s % 8) : (t[s >> 3] &= ~(1 << s % 8));
  },
  fa = ({ values: e }, t, r) => {
    Qu(e, t, r.valueOf());
  },
  da = ({ values: e }, t, r) => {
    pi(e, t * 2, r.valueOf());
  },
  Ot = ({ stride: e, values: t }, r, n) => {
    t[e * r] = n;
  },
  pa = ({ stride: e, values: t }, r, n) => {
    t[e * r] = ta(n);
  },
  yi = (e, t, r) => {
    switch (typeof r) {
      case "bigint":
        e.values64[t] = r;
        break;
      case "number":
        e.values[t * e.stride] = r;
        break;
      default:
        const n = r,
          { stride: s, ArrayType: a } = e,
          i = U(a, n);
        e.values.set(i.subarray(0, s), s * t);
    }
  },
  rl = ({ stride: e, values: t }, r, n) => {
    t.set(n.subarray(0, e), e * r);
  },
  nl = ({ values: e, valueOffsets: t }, r, n) => ha(e, t, r, n),
  il = ({ values: e, valueOffsets: t }, r, n) => {
    ha(e, t, r, Gr(n));
  },
  sl = (e, t, r) => {
    e.type.bitWidth < 64 ? Ot(e, t, r) : yi(e, t, r);
  },
  al = (e, t, r) => {
    e.type.precision !== ut.HALF ? Ot(e, t, r) : pa(e, t, r);
  },
  ol = (e, t, r) => {
    e.type.unit === Tt.DAY ? fa(e, t, r) : da(e, t, r);
  },
  ya = ({ values: e }, t, r) => pi(e, t * 2, r / 1e3),
  ba = ({ values: e }, t, r) => pi(e, t * 2, r),
  ma = ({ values: e }, t, r) => Xu(e, t * 2, r),
  ga = ({ values: e }, t, r) => tl(e, t * 2, r),
  cl = (e, t, r) => {
    switch (e.type.unit) {
      case V.SECOND:
        return ya(e, t, r);
      case V.MILLISECOND:
        return ba(e, t, r);
      case V.MICROSECOND:
        return ma(e, t, r);
      case V.NANOSECOND:
        return ga(e, t, r);
    }
  },
  _a = ({ values: e, stride: t }, r, n) => {
    e[t * r] = n;
  },
  wa = ({ values: e, stride: t }, r, n) => {
    e[t * r] = n;
  },
  va = ({ values: e }, t, r) => {
    e.set(r.subarray(0, 2), 2 * t);
  },
  Ia = ({ values: e }, t, r) => {
    e.set(r.subarray(0, 2), 2 * t);
  },
  ul = (e, t, r) => {
    switch (e.type.unit) {
      case V.SECOND:
        return _a(e, t, r);
      case V.MILLISECOND:
        return wa(e, t, r);
      case V.MICROSECOND:
        return va(e, t, r);
      case V.NANOSECOND:
        return Ia(e, t, r);
    }
  },
  ll = ({ values: e }, t, r) => {
    e.set(r.subarray(0, 4), 4 * t);
  },
  hl = (e, t, r) => {
    const n = e.getChildAt(0),
      s = e.valueOffsets;
    for (let a = -1, i = s[t], o = s[t + 1]; i < o; ) n.set(i++, r.get(++a));
  },
  fl = (e, t, r) => {
    const n = e.getChildAt(0),
      s = e.valueOffsets,
      a = r instanceof Map ? [...r] : Object.entries(r);
    for (let i = -1, o = s[t], c = s[t + 1]; o < c; ) n.set(o++, a[++i]);
  },
  dl = (e, t) => (r, n, s) => r && r.set(e, t[s]),
  pl = (e, t) => (r, n, s) => r && r.set(e, t.get(s)),
  yl = (e, t) => (r, n, s) => r && r.set(e, t.get(n.name)),
  bl = (e, t) => (r, n, s) => r && r.set(e, t[n.name]),
  ml = (e, t, r) => {
    const n =
      r instanceof Map
        ? yl(t, r)
        : r instanceof x
        ? pl(t, r)
        : Array.isArray(r)
        ? dl(t, r)
        : bl(t, r);
    e.type.children.forEach((s, a) => n(e.getChildAt(a), s, a));
  },
  gl = (e, t, r) => {
    e.type.mode === Et.Dense ? Sa(e, t, r) : Ba(e, t, r);
  },
  Sa = (e, t, r) => {
    const n = e.typeIdToChildIndex[e.typeIds[t]],
      s = e.getChildAt(n);
    s && s.set(e.valueOffsets[t], r);
  },
  Ba = (e, t, r) => {
    const n = e.typeIdToChildIndex[e.typeIds[t]],
      s = e.getChildAt(n);
    s && s.set(t, r);
  },
  _l = (e, t, r) => {
    const n = e.getKey(t);
    n !== null && e.setValue(n, r);
  },
  wl = (e, t, r) => {
    e.type.unit === be.DAY_TIME ? Aa(e, t, r) : Ta(e, t, r);
  },
  Aa = ({ values: e }, t, r) => {
    e.set(r.subarray(0, 2), 2 * t);
  },
  Ta = ({ values: e }, t, r) => {
    e[t] = r[0] * 12 + (r[1] % 12);
  },
  vl = (e, t, r) => {
    const n = e.getChildAt(0),
      { stride: s } = e;
    for (let a = -1, i = t * s; ++a < s; ) n.set(i + a, r.get(a));
  };
I.prototype.visitBool = el;
I.prototype.visitInt = sl;
I.prototype.visitInt8 = Ot;
I.prototype.visitInt16 = Ot;
I.prototype.visitInt32 = Ot;
I.prototype.visitInt64 = yi;
I.prototype.visitUint8 = Ot;
I.prototype.visitUint16 = Ot;
I.prototype.visitUint32 = Ot;
I.prototype.visitUint64 = yi;
I.prototype.visitFloat = al;
I.prototype.visitFloat16 = pa;
I.prototype.visitFloat32 = Ot;
I.prototype.visitFloat64 = Ot;
I.prototype.visitUtf8 = il;
I.prototype.visitBinary = nl;
I.prototype.visitFixedSizeBinary = rl;
I.prototype.visitDate = ol;
I.prototype.visitDateDay = fa;
I.prototype.visitDateMillisecond = da;
I.prototype.visitTimestamp = cl;
I.prototype.visitTimestampSecond = ya;
I.prototype.visitTimestampMillisecond = ba;
I.prototype.visitTimestampMicrosecond = ma;
I.prototype.visitTimestampNanosecond = ga;
I.prototype.visitTime = ul;
I.prototype.visitTimeSecond = _a;
I.prototype.visitTimeMillisecond = wa;
I.prototype.visitTimeMicrosecond = va;
I.prototype.visitTimeNanosecond = Ia;
I.prototype.visitDecimal = ll;
I.prototype.visitList = hl;
I.prototype.visitStruct = ml;
I.prototype.visitUnion = gl;
I.prototype.visitDenseUnion = Sa;
I.prototype.visitSparseUnion = Ba;
I.prototype.visitDictionary = _l;
I.prototype.visitInterval = wl;
I.prototype.visitIntervalDayTime = Aa;
I.prototype.visitIntervalYearMonth = Ta;
I.prototype.visitFixedSizeList = vl;
I.prototype.visitMap = fl;
const nn = new I();
class Il extends O {
  visitNull() {
    return ru;
  }
  visitBool() {
    return eu;
  }
  visitInt() {
    return Rt;
  }
  visitInt8() {
    return du;
  }
  visitInt16() {
    return pu;
  }
  visitInt32() {
    return yu;
  }
  visitInt64() {
    return bu;
  }
  visitUint8() {
    return mu;
  }
  visitUint16() {
    return gu;
  }
  visitUint32() {
    return _u;
  }
  visitUint64() {
    return wu;
  }
  visitFloat() {
    return en;
  }
  visitFloat16() {
    return uu;
  }
  visitFloat32() {
    return lu;
  }
  visitFloat64() {
    return hu;
  }
  visitUtf8() {
    return li;
  }
  visitBinary() {
    return ra;
  }
  visitFixedSizeBinary() {
    return ou;
  }
  visitDate() {
    return ci;
  }
  visitDateDay() {
    return nu;
  }
  visitDateMillisecond() {
    return iu;
  }
  visitTimestamp() {
    return tr;
  }
  visitTimestampSecond() {
    return Au;
  }
  visitTimestampMillisecond() {
    return Tu;
  }
  visitTimestampMicrosecond() {
    return Fu;
  }
  visitTimestampNanosecond() {
    return Ou;
  }
  visitTime() {
    return Xe;
  }
  visitTimeSecond() {
    return vu;
  }
  visitTimeMillisecond() {
    return Iu;
  }
  visitTimeMicrosecond() {
    return Su;
  }
  visitTimeNanosecond() {
    return Bu;
  }
  visitDecimal() {
    return su;
  }
  visitList() {
    return Hu;
  }
  visitStruct() {
    return Gu;
  }
  visitUnion() {
    return di;
  }
  visitDenseUnion() {
    return Zu;
  }
  visitSparseUnion() {
    return qu;
  }
  visitDictionary() {
    return au;
  }
  visitInterval() {
    return ui;
  }
  visitIntervalDayTime() {
    return Du;
  }
  visitIntervalYearMonth() {
    return xu;
  }
  visitFixedSizeList() {
    return Ku;
  }
  visitMap() {
    return Ju;
  }
}
const Fa = new Il();
W.new = Oa;
function Oa(e) {
  const t = e.type,
    r = new (Fa.getVisitFn(t)())(e);
  if (t.children && t.children.length > 0) {
    const n = e.children || [],
      s = { nullValues: e.nullValues },
      a = Array.isArray(n) ? (i, o) => n[o] || s : ({ name: i }) => n[i] || s;
    t.children.forEach((i, o) => {
      const { type: c } = i,
        u = a(i, o);
      r.children.push(Oa({ ...u, type: c }));
    });
  }
  return r;
}
Object.keys(l)
  .map((e) => l[e])
  .filter((e) => typeof e == "number" && e !== l.NONE)
  .forEach((e) => {
    const t = Fa.visit(e);
    t.prototype._setValue = nn.getVisitFn(e);
  });
li.prototype._setValue = nn.visitBinary;
var Se;
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          static getRootAsFooter(i, o) {
            return (o || new s()).__init(
              i.readInt32(i.position()) + i.position(),
              i
            );
          }
          version() {
            let i = this.bb.__offset(this.bb_pos, 4);
            return i
              ? this.bb.readInt16(this.bb_pos + i)
              : f.apache.arrow.flatbuf.MetadataVersion.V1;
          }
          schema(i) {
            let o = this.bb.__offset(this.bb_pos, 6);
            return o
              ? (i || new f.apache.arrow.flatbuf.Schema()).__init(
                  this.bb.__indirect(this.bb_pos + o),
                  this.bb
                )
              : null;
          }
          dictionaries(i, o) {
            let c = this.bb.__offset(this.bb_pos, 8);
            return c
              ? (o || new e.apache.arrow.flatbuf.Block()).__init(
                  this.bb.__vector(this.bb_pos + c) + i * 24,
                  this.bb
                )
              : null;
          }
          dictionariesLength() {
            let i = this.bb.__offset(this.bb_pos, 8);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          recordBatches(i, o) {
            let c = this.bb.__offset(this.bb_pos, 10);
            return c
              ? (o || new e.apache.arrow.flatbuf.Block()).__init(
                  this.bb.__vector(this.bb_pos + c) + i * 24,
                  this.bb
                )
              : null;
          }
          recordBatchesLength() {
            let i = this.bb.__offset(this.bb_pos, 10);
            return i ? this.bb.__vector_len(this.bb_pos + i) : 0;
          }
          static startFooter(i) {
            i.startObject(4);
          }
          static addVersion(i, o) {
            i.addFieldInt16(0, o, f.apache.arrow.flatbuf.MetadataVersion.V1);
          }
          static addSchema(i, o) {
            i.addFieldOffset(1, o, 0);
          }
          static addDictionaries(i, o) {
            i.addFieldOffset(2, o, 0);
          }
          static startDictionariesVector(i, o) {
            i.startVector(24, o, 8);
          }
          static addRecordBatches(i, o) {
            i.addFieldOffset(3, o, 0);
          }
          static startRecordBatchesVector(i, o) {
            i.startVector(24, o, 8);
          }
          static endFooter(i) {
            return i.endObject();
          }
          static finishFooterBuffer(i, o) {
            i.finish(o);
          }
          static createFooter(i, o, c, u, d) {
            return (
              s.startFooter(i),
              s.addVersion(i, o),
              s.addSchema(i, c),
              s.addDictionaries(i, u),
              s.addRecordBatches(i, d),
              s.endFooter(i)
            );
          }
        }
        n.Footer = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(Se || (Se = {}));
(function (e) {
  (function (t) {
    (function (r) {
      (function (n) {
        class s {
          constructor() {
            (this.bb = null), (this.bb_pos = 0);
          }
          __init(i, o) {
            return (this.bb_pos = i), (this.bb = o), this;
          }
          offset() {
            return this.bb.readInt64(this.bb_pos);
          }
          metaDataLength() {
            return this.bb.readInt32(this.bb_pos + 8);
          }
          bodyLength() {
            return this.bb.readInt64(this.bb_pos + 16);
          }
          static createBlock(i, o, c, u) {
            return (
              i.prep(8, 24),
              i.writeInt64(u),
              i.pad(4),
              i.writeInt32(c),
              i.writeInt64(o),
              i.offset()
            );
          }
        }
        n.Block = s;
      })(r.flatbuf || (r.flatbuf = {}));
    })(t.arrow || (t.arrow = {}));
  })(e.apache || (e.apache = {}));
})(Se || (Se = {}));
var Xi = h.Long,
  Sl = h.Builder,
  Bl = h.ByteBuffer,
  Al = Se.apache.arrow.flatbuf.Block,
  It = Se.apache.arrow.flatbuf.Footer;
class $e {
  constructor(t, r = ft.V4, n, s) {
    (this.schema = t),
      (this.version = r),
      n && (this._recordBatches = n),
      s && (this._dictionaryBatches = s);
  }
  static decode(t) {
    t = new Bl(D(t));
    const r = It.getRootAsFooter(t),
      n = R.decode(r.schema());
    return new Tl(n, r);
  }
  static encode(t) {
    const r = new Sl(),
      n = R.encode(r, t.schema);
    It.startRecordBatchesVector(r, t.numRecordBatches),
      [...t.recordBatches()]
        .slice()
        .reverse()
        .forEach((i) => Wt.encode(r, i));
    const s = r.endVector();
    It.startDictionariesVector(r, t.numDictionaries),
      [...t.dictionaryBatches()]
        .slice()
        .reverse()
        .forEach((i) => Wt.encode(r, i));
    const a = r.endVector();
    return (
      It.startFooter(r),
      It.addSchema(r, n),
      It.addVersion(r, ft.V4),
      It.addRecordBatches(r, s),
      It.addDictionaries(r, a),
      It.finishFooterBuffer(r, It.endFooter(r)),
      r.asUint8Array()
    );
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  *recordBatches() {
    for (let t, r = -1, n = this.numRecordBatches; ++r < n; )
      (t = this.getRecordBatch(r)) && (yield t);
  }
  *dictionaryBatches() {
    for (let t, r = -1, n = this.numDictionaries; ++r < n; )
      (t = this.getDictionaryBatch(r)) && (yield t);
  }
  getRecordBatch(t) {
    return (
      (t >= 0 && t < this.numRecordBatches && this._recordBatches[t]) || null
    );
  }
  getDictionaryBatch(t) {
    return (
      (t >= 0 && t < this.numDictionaries && this._dictionaryBatches[t]) || null
    );
  }
}
class Tl extends $e {
  constructor(t, r) {
    super(t, r.version()), (this._footer = r);
  }
  get numRecordBatches() {
    return this._footer.recordBatchesLength();
  }
  get numDictionaries() {
    return this._footer.dictionariesLength();
  }
  getRecordBatch(t) {
    if (t >= 0 && t < this.numRecordBatches) {
      const r = this._footer.recordBatches(t);
      if (r) return Wt.decode(r);
    }
    return null;
  }
  getDictionaryBatch(t) {
    if (t >= 0 && t < this.numDictionaries) {
      const r = this._footer.dictionaries(t);
      if (r) return Wt.decode(r);
    }
    return null;
  }
}
class Wt {
  static decode(t) {
    return new Wt(t.metaDataLength(), t.bodyLength(), t.offset());
  }
  static encode(t, r) {
    const { metaDataLength: n } = r,
      s = new Xi(r.offset, 0),
      a = new Xi(r.bodyLength, 0);
    return Al.createBlock(t, s, n, a);
  }
  constructor(t, r, n) {
    (this.metaDataLength = t),
      (this.offset = typeof n == "number" ? n : n.low),
      (this.bodyLength = typeof r == "number" ? r : r.low);
  }
}
class Ue extends gc {
  write(t) {
    if ((t = D(t)).byteLength > 0) return super.write(t);
  }
  toString(t = !1) {
    return t ? xn(this.toUint8Array(!0)) : this.toUint8Array(!1).then(xn);
  }
  toUint8Array(t = !1) {
    return t
      ? At(this._values)[0]
      : (async () => {
          let r = [],
            n = 0;
          for await (const s of this) r.push(s), (n += s.byteLength);
          return At(r, n)[0];
        })();
  }
}
class Mr {
  constructor(t) {
    t && (this.source = new Fl(it.fromIterable(t)));
  }
  [Symbol.iterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Qt {
  constructor(t) {
    t instanceof Qt
      ? (this.source = t.source)
      : t instanceof Ue
      ? (this.source = new Kt(it.fromAsyncIterable(t)))
      : Ys(t)
      ? (this.source = new Kt(it.fromNodeStream(t)))
      : Jn(t)
      ? (this.source = new Kt(it.fromDOMStream(t)))
      : Ws(t)
      ? (this.source = new Kt(it.fromDOMStream(t.body)))
      : bt(t)
      ? (this.source = new Kt(it.fromIterable(t)))
      : Pt(t)
      ? (this.source = new Kt(it.fromAsyncIterable(t)))
      : Nt(t) && (this.source = new Kt(it.fromAsyncIterable(t)));
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next(t) {
    return this.source.next(t);
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  get closed() {
    return this.source.closed;
  }
  cancel(t) {
    return this.source.cancel(t);
  }
  peek(t) {
    return this.source.peek(t);
  }
  read(t) {
    return this.source.read(t);
  }
}
class Fl {
  constructor(t) {
    this.source = t;
  }
  cancel(t) {
    this.return(t);
  }
  peek(t) {
    return this.next(t, "peek").value;
  }
  read(t) {
    return this.next(t, "read").value;
  }
  next(t, r = "read") {
    return this.source.next({ cmd: r, size: t });
  }
  throw(t) {
    return Object.create((this.source.throw && this.source.throw(t)) || $);
  }
  return(t) {
    return Object.create((this.source.return && this.source.return(t)) || $);
  }
}
class Kt {
  constructor(t) {
    (this.source = t),
      (this._closedPromise = new Promise(
        (r) => (this._closedPromiseResolve = r)
      ));
  }
  async cancel(t) {
    await this.return(t);
  }
  get closed() {
    return this._closedPromise;
  }
  async read(t) {
    return (await this.next(t, "read")).value;
  }
  async peek(t) {
    return (await this.next(t, "peek")).value;
  }
  async next(t, r = "read") {
    return await this.source.next({ cmd: r, size: t });
  }
  async throw(t) {
    const r = (this.source.throw && (await this.source.throw(t))) || $;
    return (
      this._closedPromiseResolve && this._closedPromiseResolve(),
      (this._closedPromiseResolve = void 0),
      Object.create(r)
    );
  }
  async return(t) {
    const r = (this.source.return && (await this.source.return(t))) || $;
    return (
      this._closedPromiseResolve && this._closedPromiseResolve(),
      (this._closedPromiseResolve = void 0),
      Object.create(r)
    );
  }
}
class ts extends Mr {
  constructor(t, r) {
    super(),
      (this.position = 0),
      (this.buffer = D(t)),
      (this.size = typeof r > "u" ? this.buffer.byteLength : r);
  }
  readInt32(t) {
    const { buffer: r, byteOffset: n } = this.readAt(t, 4);
    return new DataView(r, n).getInt32(0, !0);
  }
  seek(t) {
    return (this.position = Math.min(t, this.size)), t < this.size;
  }
  read(t) {
    const { buffer: r, size: n, position: s } = this;
    return r && s < n
      ? (typeof t != "number" && (t = 1 / 0),
        (this.position = Math.min(n, s + Math.min(n - s, t))),
        r.subarray(s, this.position))
      : null;
  }
  readAt(t, r) {
    const n = this.buffer,
      s = Math.min(this.size, t + r);
    return n ? n.subarray(t, s) : new Uint8Array(r);
  }
  close() {
    this.buffer && (this.buffer = null);
  }
  throw(t) {
    return this.close(), { done: !0, value: t };
  }
  return(t) {
    return this.close(), { done: !0, value: t };
  }
}
class Er extends Qt {
  constructor(t, r) {
    super(),
      (this.position = 0),
      (this._handle = t),
      typeof r == "number"
        ? (this.size = r)
        : (this._pending = (async () => {
            (this.size = (await t.stat()).size), delete this._pending;
          })());
  }
  async readInt32(t) {
    const { buffer: r, byteOffset: n } = await this.readAt(t, 4);
    return new DataView(r, n).getInt32(0, !0);
  }
  async seek(t) {
    return (
      this._pending && (await this._pending),
      (this.position = Math.min(t, this.size)),
      t < this.size
    );
  }
  async read(t) {
    this._pending && (await this._pending);
    const { _handle: r, size: n, position: s } = this;
    if (r && s < n) {
      typeof t != "number" && (t = 1 / 0);
      let a = s,
        i = 0,
        o = 0,
        c = Math.min(n, a + Math.min(n - a, t)),
        u = new Uint8Array(Math.max(0, (this.position = c) - a));
      for (; (a += o) < c && (i += o) < u.byteLength; )
        ({ bytesRead: o } = await r.read(u, i, u.byteLength - i, a));
      return u;
    }
    return null;
  }
  async readAt(t, r) {
    this._pending && (await this._pending);
    const { _handle: n, size: s } = this;
    if (n && t + r < s) {
      const a = Math.min(s, t + r),
        i = new Uint8Array(a - t);
      return (await n.read(i, 0, r, t)).buffer;
    }
    return new Uint8Array(r);
  }
  async close() {
    const t = this._handle;
    (this._handle = null), t && (await t.close());
  }
  async throw(t) {
    return await this.close(), { done: !0, value: t };
  }
  async return(t) {
    return await this.close(), { done: !0, value: t };
  }
}
const Ol = 65536;
function ce(e) {
  return e < 0 && (e = 4294967295 + e + 1), `0x${e.toString(16)}`;
}
const Be = 8,
  bi = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8];
class Da {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return this.buffer[1];
  }
  low() {
    return this.buffer[0];
  }
  _times(t) {
    const r = new Uint32Array([
        this.buffer[1] >>> 16,
        this.buffer[1] & 65535,
        this.buffer[0] >>> 16,
        this.buffer[0] & 65535,
      ]),
      n = new Uint32Array([
        t.buffer[1] >>> 16,
        t.buffer[1] & 65535,
        t.buffer[0] >>> 16,
        t.buffer[0] & 65535,
      ]);
    let s = r[3] * n[3];
    this.buffer[0] = s & 65535;
    let a = s >>> 16;
    return (
      (s = r[2] * n[3]),
      (a += s),
      (s = (r[3] * n[2]) >>> 0),
      (a += s),
      (this.buffer[0] += a << 16),
      (this.buffer[1] = a >>> 0 < s ? Ol : 0),
      (this.buffer[1] += a >>> 16),
      (this.buffer[1] += r[1] * n[3] + r[2] * n[2] + r[3] * n[1]),
      (this.buffer[1] +=
        (r[0] * n[3] + r[1] * n[2] + r[2] * n[1] + r[3] * n[0]) << 16),
      this
    );
  }
  _plus(t) {
    const r = (this.buffer[0] + t.buffer[0]) >>> 0;
    (this.buffer[1] += t.buffer[1]),
      r < this.buffer[0] >>> 0 && ++this.buffer[1],
      (this.buffer[0] = r);
  }
  lessThan(t) {
    return (
      this.buffer[1] < t.buffer[1] ||
      (this.buffer[1] === t.buffer[1] && this.buffer[0] < t.buffer[0])
    );
  }
  equals(t) {
    return this.buffer[1] === t.buffer[1] && this.buffer[0] == t.buffer[0];
  }
  greaterThan(t) {
    return t.lessThan(this);
  }
  hex() {
    return `${ce(this.buffer[1])} ${ce(this.buffer[0])}`;
  }
}
class N extends Da {
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  static from(t, r = new Uint32Array(2)) {
    return N.fromString(typeof t == "string" ? t : t.toString(), r);
  }
  static fromNumber(t, r = new Uint32Array(2)) {
    return N.fromString(t.toString(), r);
  }
  static fromString(t, r = new Uint32Array(2)) {
    const n = t.length;
    let s = new N(r);
    for (let a = 0; a < n; ) {
      const i = Be < n - a ? Be : n - a,
        o = new N(new Uint32Array([parseInt(t.substr(a, i), 10), 0])),
        c = new N(new Uint32Array([bi[i], 0]));
      s.times(c), s.plus(o), (a += i);
    }
    return s;
  }
  static convertArray(t) {
    const r = new Uint32Array(t.length * 2);
    for (let n = -1, s = t.length; ++n < s; )
      N.from(t[n], new Uint32Array(r.buffer, r.byteOffset + 2 * n * 4, 2));
    return r;
  }
  static multiply(t, r) {
    return new N(new Uint32Array(t.buffer)).times(r);
  }
  static add(t, r) {
    return new N(new Uint32Array(t.buffer)).plus(r);
  }
}
class Q extends Da {
  negate() {
    return (
      (this.buffer[0] = ~this.buffer[0] + 1),
      (this.buffer[1] = ~this.buffer[1]),
      this.buffer[0] == 0 && ++this.buffer[1],
      this
    );
  }
  times(t) {
    return this._times(t), this;
  }
  plus(t) {
    return this._plus(t), this;
  }
  lessThan(t) {
    const r = this.buffer[1] << 0,
      n = t.buffer[1] << 0;
    return r < n || (r === n && this.buffer[0] < t.buffer[0]);
  }
  static from(t, r = new Uint32Array(2)) {
    return Q.fromString(typeof t == "string" ? t : t.toString(), r);
  }
  static fromNumber(t, r = new Uint32Array(2)) {
    return Q.fromString(t.toString(), r);
  }
  static fromString(t, r = new Uint32Array(2)) {
    const n = t.startsWith("-"),
      s = t.length;
    let a = new Q(r);
    for (let i = n ? 1 : 0; i < s; ) {
      const o = Be < s - i ? Be : s - i,
        c = new Q(new Uint32Array([parseInt(t.substr(i, o), 10), 0])),
        u = new Q(new Uint32Array([bi[o], 0]));
      a.times(u), a.plus(c), (i += o);
    }
    return n ? a.negate() : a;
  }
  static convertArray(t) {
    const r = new Uint32Array(t.length * 2);
    for (let n = -1, s = t.length; ++n < s; )
      Q.from(t[n], new Uint32Array(r.buffer, r.byteOffset + 2 * n * 4, 2));
    return r;
  }
  static multiply(t, r) {
    return new Q(new Uint32Array(t.buffer)).times(r);
  }
  static add(t, r) {
    return new Q(new Uint32Array(t.buffer)).plus(r);
  }
}
class St {
  constructor(t) {
    this.buffer = t;
  }
  high() {
    return new Q(
      new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2)
    );
  }
  low() {
    return new Q(
      new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2)
    );
  }
  negate() {
    return (
      (this.buffer[0] = ~this.buffer[0] + 1),
      (this.buffer[1] = ~this.buffer[1]),
      (this.buffer[2] = ~this.buffer[2]),
      (this.buffer[3] = ~this.buffer[3]),
      this.buffer[0] == 0 && ++this.buffer[1],
      this.buffer[1] == 0 && ++this.buffer[2],
      this.buffer[2] == 0 && ++this.buffer[3],
      this
    );
  }
  times(t) {
    const r = new N(new Uint32Array([this.buffer[3], 0])),
      n = new N(new Uint32Array([this.buffer[2], 0])),
      s = new N(new Uint32Array([this.buffer[1], 0])),
      a = new N(new Uint32Array([this.buffer[0], 0])),
      i = new N(new Uint32Array([t.buffer[3], 0])),
      o = new N(new Uint32Array([t.buffer[2], 0])),
      c = new N(new Uint32Array([t.buffer[1], 0])),
      u = new N(new Uint32Array([t.buffer[0], 0]));
    let d = N.multiply(a, u);
    this.buffer[0] = d.low();
    let y = new N(new Uint32Array([d.high(), 0]));
    return (
      (d = N.multiply(s, u)),
      y.plus(d),
      (d = N.multiply(a, c)),
      y.plus(d),
      (this.buffer[1] = y.low()),
      (this.buffer[3] = y.lessThan(d) ? 1 : 0),
      (this.buffer[2] = y.high()),
      new N(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2))
        .plus(N.multiply(n, u))
        .plus(N.multiply(s, c))
        .plus(N.multiply(a, o)),
      (this.buffer[3] += N.multiply(r, u)
        .plus(N.multiply(n, c))
        .plus(N.multiply(s, o))
        .plus(N.multiply(a, i))
        .low()),
      this
    );
  }
  plus(t) {
    let r = new Uint32Array(4);
    return (
      (r[3] = (this.buffer[3] + t.buffer[3]) >>> 0),
      (r[2] = (this.buffer[2] + t.buffer[2]) >>> 0),
      (r[1] = (this.buffer[1] + t.buffer[1]) >>> 0),
      (r[0] = (this.buffer[0] + t.buffer[0]) >>> 0),
      r[0] < this.buffer[0] >>> 0 && ++r[1],
      r[1] < this.buffer[1] >>> 0 && ++r[2],
      r[2] < this.buffer[2] >>> 0 && ++r[3],
      (this.buffer[3] = r[3]),
      (this.buffer[2] = r[2]),
      (this.buffer[1] = r[1]),
      (this.buffer[0] = r[0]),
      this
    );
  }
  hex() {
    return `${ce(this.buffer[3])} ${ce(this.buffer[2])} ${ce(
      this.buffer[1]
    )} ${ce(this.buffer[0])}`;
  }
  static multiply(t, r) {
    return new St(new Uint32Array(t.buffer)).times(r);
  }
  static add(t, r) {
    return new St(new Uint32Array(t.buffer)).plus(r);
  }
  static from(t, r = new Uint32Array(4)) {
    return St.fromString(typeof t == "string" ? t : t.toString(), r);
  }
  static fromNumber(t, r = new Uint32Array(4)) {
    return St.fromString(t.toString(), r);
  }
  static fromString(t, r = new Uint32Array(4)) {
    const n = t.startsWith("-"),
      s = t.length;
    let a = new St(r);
    for (let i = n ? 1 : 0; i < s; ) {
      const o = Be < s - i ? Be : s - i,
        c = new St(new Uint32Array([parseInt(t.substr(i, o), 10), 0, 0, 0])),
        u = new St(new Uint32Array([bi[o], 0, 0, 0]));
      a.times(u), a.plus(c), (i += o);
    }
    return n ? a.negate() : a;
  }
  static convertArray(t) {
    const r = new Uint32Array(t.length * 4);
    for (let n = -1, s = t.length; ++n < s; )
      St.from(t[n], new Uint32Array(r.buffer, r.byteOffset + 4 * 4 * n, 4));
    return r;
  }
}
class xa extends O {
  constructor(t, r, n, s) {
    super(),
      (this.nodesIndex = -1),
      (this.buffersIndex = -1),
      (this.bytes = t),
      (this.nodes = r),
      (this.buffers = n),
      (this.dictionaries = s);
  }
  visit(t) {
    return super.visit(t instanceof L ? t.type : t);
  }
  visitNull(t, { length: r } = this.nextFieldNode()) {
    return p.Null(t, 0, r);
  }
  visitBool(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Bool(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitInt(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Int(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitFloat(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Float(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitUtf8(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Utf8(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readOffsets(t),
      this.readData(t)
    );
  }
  visitBinary(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Binary(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readOffsets(t),
      this.readData(t)
    );
  }
  visitFixedSizeBinary(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.FixedSizeBinary(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readData(t)
    );
  }
  visitDate(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Date(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitTimestamp(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Timestamp(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitTime(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Time(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitDecimal(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Decimal(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitList(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.List(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readOffsets(t),
      this.visit(t.children[0])
    );
  }
  visitStruct(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Struct(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.visitMany(t.children)
    );
  }
  visitUnion(t) {
    return t.mode === Et.Sparse
      ? this.visitSparseUnion(t)
      : this.visitDenseUnion(t);
  }
  visitDenseUnion(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Union(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readTypeIds(t),
      this.readOffsets(t),
      this.visitMany(t.children)
    );
  }
  visitSparseUnion(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Union(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readTypeIds(t),
      this.visitMany(t.children)
    );
  }
  visitDictionary(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Dictionary(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readData(t.indices),
      this.readDictionary(t)
    );
  }
  visitInterval(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Interval(t, 0, r, n, this.readNullBitmap(t, n), this.readData(t));
  }
  visitFixedSizeList(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.FixedSizeList(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.visit(t.children[0])
    );
  }
  visitMap(t, { length: r, nullCount: n } = this.nextFieldNode()) {
    return p.Map(
      t,
      0,
      r,
      n,
      this.readNullBitmap(t, n),
      this.readOffsets(t),
      this.visit(t.children[0])
    );
  }
  nextFieldNode() {
    return this.nodes[++this.nodesIndex];
  }
  nextBufferRange() {
    return this.buffers[++this.buffersIndex];
  }
  readNullBitmap(t, r, n = this.nextBufferRange()) {
    return (r > 0 && this.readData(t, n)) || new Uint8Array(0);
  }
  readOffsets(t, r) {
    return this.readData(t, r);
  }
  readTypeIds(t, r) {
    return this.readData(t, r);
  }
  readData(t, { length: r, offset: n } = this.nextBufferRange()) {
    return this.bytes.subarray(n, n + r);
  }
  readDictionary(t) {
    return this.dictionaries.get(t.id);
  }
}
class Dl extends xa {
  constructor(t, r, n, s) {
    super(new Uint8Array(0), r, n, s), (this.sources = t);
  }
  readNullBitmap(t, r, { offset: n } = this.nextBufferRange()) {
    return r <= 0 ? new Uint8Array(0) : Br(this.sources[n]);
  }
  readOffsets(t, { offset: r } = this.nextBufferRange()) {
    return U(Uint8Array, U(Int32Array, this.sources[r]));
  }
  readTypeIds(t, { offset: r } = this.nextBufferRange()) {
    return U(Uint8Array, U(t.ArrayType, this.sources[r]));
  }
  readData(t, { offset: r } = this.nextBufferRange()) {
    const { sources: n } = this;
    return A.isTimestamp(t) ||
      ((A.isInt(t) || A.isTime(t)) && t.bitWidth === 64) ||
      (A.isDate(t) && t.unit === Tt.MILLISECOND)
      ? U(Uint8Array, Q.convertArray(n[r]))
      : A.isDecimal(t)
      ? U(Uint8Array, St.convertArray(n[r]))
      : A.isBinary(t) || A.isFixedSizeBinary(t)
      ? xl(n[r])
      : A.isBool(t)
      ? Br(n[r])
      : A.isUtf8(t)
      ? Gr(n[r].join(""))
      : U(
          Uint8Array,
          U(
            t.ArrayType,
            n[r].map((s) => +s)
          )
        );
  }
}
function xl(e) {
  const t = e.join(""),
    r = new Uint8Array(t.length / 2);
  for (let n = 0; n < t.length; n += 2)
    r[n >> 1] = parseInt(t.substr(n, 2), 16);
  return r;
}
var Ll = h.Long,
  es = f.apache.arrow.flatbuf.Null,
  cr = f.apache.arrow.flatbuf.Int,
  mn = f.apache.arrow.flatbuf.FloatingPoint,
  rs = f.apache.arrow.flatbuf.Binary,
  ns = f.apache.arrow.flatbuf.Bool,
  is = f.apache.arrow.flatbuf.Utf8,
  ur = f.apache.arrow.flatbuf.Decimal,
  gn = f.apache.arrow.flatbuf.Date,
  lr = f.apache.arrow.flatbuf.Time,
  hr = f.apache.arrow.flatbuf.Timestamp,
  _n = f.apache.arrow.flatbuf.Interval,
  ss = f.apache.arrow.flatbuf.List,
  as = f.apache.arrow.flatbuf.Struct_,
  ae = f.apache.arrow.flatbuf.Union,
  xe = f.apache.arrow.flatbuf.DictionaryEncoding,
  wn = f.apache.arrow.flatbuf.FixedSizeBinary,
  vn = f.apache.arrow.flatbuf.FixedSizeList,
  In = f.apache.arrow.flatbuf.Map;
class Ml extends O {
  visit(t, r) {
    return t == null || r == null ? void 0 : super.visit(t, r);
  }
  visitNull(t, r) {
    return es.startNull(r), es.endNull(r);
  }
  visitInt(t, r) {
    return (
      cr.startInt(r),
      cr.addBitWidth(r, t.bitWidth),
      cr.addIsSigned(r, t.isSigned),
      cr.endInt(r)
    );
  }
  visitFloat(t, r) {
    return (
      mn.startFloatingPoint(r),
      mn.addPrecision(r, t.precision),
      mn.endFloatingPoint(r)
    );
  }
  visitBinary(t, r) {
    return rs.startBinary(r), rs.endBinary(r);
  }
  visitBool(t, r) {
    return ns.startBool(r), ns.endBool(r);
  }
  visitUtf8(t, r) {
    return is.startUtf8(r), is.endUtf8(r);
  }
  visitDecimal(t, r) {
    return (
      ur.startDecimal(r),
      ur.addScale(r, t.scale),
      ur.addPrecision(r, t.precision),
      ur.endDecimal(r)
    );
  }
  visitDate(t, r) {
    return gn.startDate(r), gn.addUnit(r, t.unit), gn.endDate(r);
  }
  visitTime(t, r) {
    return (
      lr.startTime(r),
      lr.addUnit(r, t.unit),
      lr.addBitWidth(r, t.bitWidth),
      lr.endTime(r)
    );
  }
  visitTimestamp(t, r) {
    const n = (t.timezone && r.createString(t.timezone)) || void 0;
    return (
      hr.startTimestamp(r),
      hr.addUnit(r, t.unit),
      n !== void 0 && hr.addTimezone(r, n),
      hr.endTimestamp(r)
    );
  }
  visitInterval(t, r) {
    return _n.startInterval(r), _n.addUnit(r, t.unit), _n.endInterval(r);
  }
  visitList(t, r) {
    return ss.startList(r), ss.endList(r);
  }
  visitStruct(t, r) {
    return as.startStruct_(r), as.endStruct_(r);
  }
  visitUnion(t, r) {
    ae.startTypeIdsVector(r, t.typeIds.length);
    const n = ae.createTypeIdsVector(r, t.typeIds);
    return (
      ae.startUnion(r),
      ae.addMode(r, t.mode),
      ae.addTypeIds(r, n),
      ae.endUnion(r)
    );
  }
  visitDictionary(t, r) {
    const n = this.visit(t.indices, r);
    return (
      xe.startDictionaryEncoding(r),
      xe.addId(r, new Ll(t.id, 0)),
      xe.addIsOrdered(r, t.isOrdered),
      n !== void 0 && xe.addIndexType(r, n),
      xe.endDictionaryEncoding(r)
    );
  }
  visitFixedSizeBinary(t, r) {
    return (
      wn.startFixedSizeBinary(r),
      wn.addByteWidth(r, t.byteWidth),
      wn.endFixedSizeBinary(r)
    );
  }
  visitFixedSizeList(t, r) {
    return (
      vn.startFixedSizeList(r),
      vn.addListSize(r, t.listSize),
      vn.endFixedSizeList(r)
    );
  }
  visitMap(t, r) {
    return In.startMap(r), In.addKeysSorted(r, t.keysSorted), In.endMap(r);
  }
}
const Sn = new Ml();
function El(e, t = new Map()) {
  return new R(Nl(e, t), pr(e.customMetadata), t);
}
function La(e) {
  return new ot(e.count, Ma(e.columns), Ea(e.columns));
}
function Ul(e) {
  return new Ft(La(e.data), e.id, e.isDelta);
}
function Nl(e, t) {
  return (e.fields || []).filter(Boolean).map((r) => L.fromJSON(r, t));
}
function os(e, t) {
  return (e.children || []).filter(Boolean).map((r) => L.fromJSON(r, t));
}
function Ma(e) {
  return (e || []).reduce(
    (t, r) => [...t, new ne(r.count, Vl(r.VALIDITY)), ...Ma(r.children)],
    []
  );
}
function Ea(e, t = []) {
  for (let r = -1, n = (e || []).length; ++r < n; ) {
    const s = e[r];
    s.VALIDITY && t.push(new Bt(t.length, s.VALIDITY.length)),
      s.TYPE && t.push(new Bt(t.length, s.TYPE.length)),
      s.OFFSET && t.push(new Bt(t.length, s.OFFSET.length)),
      s.DATA && t.push(new Bt(t.length, s.DATA.length)),
      (t = Ea(s.children, t));
  }
  return t;
}
function Vl(e) {
  return (e || []).reduce((t, r) => t + +(r === 0), 0);
}
function Rl(e, t) {
  let r, n, s, a, i, o;
  return (
    !t || !(a = e.dictionary)
      ? ((i = us(e, os(e, t))),
        (s = new L(e.name, i, e.nullable, pr(e.customMetadata))))
      : t.has((r = a.id))
      ? ((n = (n = a.indexType) ? cs(n) : new qt()),
        (o = new $t(t.get(r), n, r, a.isOrdered)),
        (s = new L(e.name, o, e.nullable, pr(e.customMetadata))))
      : ((n = (n = a.indexType) ? cs(n) : new qt()),
        t.set(r, (i = us(e, os(e, t)))),
        (o = new $t(i, n, r, a.isOrdered)),
        (s = new L(e.name, o, e.nullable, pr(e.customMetadata)))),
    s || null
  );
}
function pr(e) {
  return new Map(Object.entries(e || {}));
}
function cs(e) {
  return new tt(e.isSigned, e.bitWidth);
}
function us(e, t) {
  const r = e.type.name;
  switch (r) {
    case "NONE":
      return new me();
    case "null":
      return new me();
    case "binary":
      return new Re();
    case "utf8":
      return new we();
    case "bool":
      return new Ce();
    case "list":
      return new Ie((t || [])[0]);
    case "struct":
      return new mt(t || []);
    case "struct_":
      return new mt(t || []);
  }
  switch (r) {
    case "int": {
      const n = e.type;
      return new tt(n.isSigned, n.bitWidth);
    }
    case "floatingpoint": {
      const n = e.type;
      return new Zt(ut[n.precision]);
    }
    case "decimal": {
      const n = e.type;
      return new Ar(n.scale, n.precision);
    }
    case "date": {
      const n = e.type;
      return new ve(Tt[n.unit]);
    }
    case "time": {
      const n = e.type;
      return new Tr(V[n.unit], n.bitWidth);
    }
    case "timestamp": {
      const n = e.type;
      return new Fr(V[n.unit], n.timezone);
    }
    case "interval": {
      const n = e.type;
      return new Or(be[n.unit]);
    }
    case "union": {
      const n = e.type;
      return new ke(Et[n.mode], n.typeIds || [], t || []);
    }
    case "fixedsizebinary": {
      const n = e.type;
      return new Dr(n.byteWidth);
    }
    case "fixedsizelist": {
      const n = e.type;
      return new je(n.listSize, (t || [])[0]);
    }
    case "map": {
      const n = e.type;
      return new ze((t || [])[0], n.keysSorted);
    }
  }
  throw new Error(`Unrecognized type: "${r}"`);
}
var Xt = h.Long,
  Cl = h.Builder,
  kl = h.ByteBuffer,
  H = f.apache.arrow.flatbuf.Type,
  ht = f.apache.arrow.flatbuf.Field,
  xt = f.apache.arrow.flatbuf.Schema,
  jl = f.apache.arrow.flatbuf.Buffer,
  Ct = q.apache.arrow.flatbuf.Message,
  jt = f.apache.arrow.flatbuf.KeyValue,
  zl = q.apache.arrow.flatbuf.FieldNode,
  ls = f.apache.arrow.flatbuf.Endianness,
  kt = q.apache.arrow.flatbuf.RecordBatch,
  oe = q.apache.arrow.flatbuf.DictionaryBatch;
class Z {
  constructor(t, r, n, s) {
    (this._version = r),
      (this._headerType = n),
      (this.body = new Uint8Array(0)),
      s && (this._createHeader = () => s),
      (this._bodyLength = typeof t == "number" ? t : t.low);
  }
  static fromJSON(t, r) {
    const n = new Z(0, ft.V4, r);
    return (n._createHeader = Pl(t, r)), n;
  }
  static decode(t) {
    t = new kl(D(t));
    const r = Ct.getRootAsMessage(t),
      n = r.bodyLength(),
      s = r.version(),
      a = r.headerType(),
      i = new Z(n, s, a);
    return (i._createHeader = $l(r, a)), i;
  }
  static encode(t) {
    let r = new Cl(),
      n = -1;
    return (
      t.isSchema()
        ? (n = R.encode(r, t.header()))
        : t.isRecordBatch()
        ? (n = ot.encode(r, t.header()))
        : t.isDictionaryBatch() && (n = Ft.encode(r, t.header())),
      Ct.startMessage(r),
      Ct.addVersion(r, ft.V4),
      Ct.addHeader(r, n),
      Ct.addHeaderType(r, t.headerType),
      Ct.addBodyLength(r, new Xt(t.bodyLength, 0)),
      Ct.finishMessageBuffer(r, Ct.endMessage(r)),
      r.asUint8Array()
    );
  }
  static from(t, r = 0) {
    if (t instanceof R) return new Z(0, ft.V4, j.Schema, t);
    if (t instanceof ot) return new Z(r, ft.V4, j.RecordBatch, t);
    if (t instanceof Ft) return new Z(r, ft.V4, j.DictionaryBatch, t);
    throw new Error(`Unrecognized Message header: ${t}`);
  }
  get type() {
    return this.headerType;
  }
  get version() {
    return this._version;
  }
  get headerType() {
    return this._headerType;
  }
  get bodyLength() {
    return this._bodyLength;
  }
  header() {
    return this._createHeader();
  }
  isSchema() {
    return this.headerType === j.Schema;
  }
  isRecordBatch() {
    return this.headerType === j.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === j.DictionaryBatch;
  }
}
let ot = class {
  get nodes() {
    return this._nodes;
  }
  get length() {
    return this._length;
  }
  get buffers() {
    return this._buffers;
  }
  constructor(t, r, n) {
    (this._nodes = r),
      (this._buffers = n),
      (this._length = typeof t == "number" ? t : t.low);
  }
};
class Ft {
  get id() {
    return this._id;
  }
  get data() {
    return this._data;
  }
  get isDelta() {
    return this._isDelta;
  }
  get length() {
    return this.data.length;
  }
  get nodes() {
    return this.data.nodes;
  }
  get buffers() {
    return this.data.buffers;
  }
  constructor(t, r, n = !1) {
    (this._data = t),
      (this._isDelta = n),
      (this._id = typeof r == "number" ? r : r.low);
  }
}
class Bt {
  constructor(t, r) {
    (this.offset = typeof t == "number" ? t : t.low),
      (this.length = typeof r == "number" ? r : r.low);
  }
}
class ne {
  constructor(t, r) {
    (this.length = typeof t == "number" ? t : t.low),
      (this.nullCount = typeof r == "number" ? r : r.low);
  }
}
function Pl(e, t) {
  return () => {
    switch (t) {
      case j.Schema:
        return R.fromJSON(e);
      case j.RecordBatch:
        return ot.fromJSON(e);
      case j.DictionaryBatch:
        return Ft.fromJSON(e);
    }
    throw new Error(`Unrecognized Message type: { name: ${j[t]}, type: ${t} }`);
  };
}
function $l(e, t) {
  return () => {
    switch (t) {
      case j.Schema:
        return R.decode(e.header(new xt()));
      case j.RecordBatch:
        return ot.decode(e.header(new kt()), e.version());
      case j.DictionaryBatch:
        return Ft.decode(e.header(new oe()), e.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${j[t]}, type: ${t} }`);
  };
}
L.encode = th;
L.decode = Ql;
L.fromJSON = Rl;
R.encode = Xl;
R.decode = Wl;
R.fromJSON = El;
ot.encode = eh;
ot.decode = Yl;
ot.fromJSON = La;
Ft.encode = rh;
Ft.decode = Hl;
Ft.fromJSON = Ul;
ne.encode = nh;
ne.decode = Jl;
Bt.encode = ih;
Bt.decode = Kl;
function Wl(e, t = new Map()) {
  const r = Zl(e, t);
  return new R(r, yr(e), t);
}
function Yl(e, t = ft.V4) {
  return new ot(e.length(), Gl(e), ql(e, t));
}
function Hl(e, t = ft.V4) {
  return new Ft(ot.decode(e.data(), t), e.id(), e.isDelta());
}
function Kl(e) {
  return new Bt(e.offset(), e.length());
}
function Jl(e) {
  return new ne(e.length(), e.nullCount());
}
function Gl(e) {
  const t = [];
  for (let r, n = -1, s = -1, a = e.nodesLength(); ++n < a; )
    (r = e.nodes(n)) && (t[++s] = ne.decode(r));
  return t;
}
function ql(e, t) {
  const r = [];
  for (let n, s = -1, a = -1, i = e.buffersLength(); ++s < i; )
    (n = e.buffers(s)) &&
      (t < ft.V4 && (n.bb_pos += 8 * (s + 1)), (r[++a] = Bt.decode(n)));
  return r;
}
function Zl(e, t) {
  const r = [];
  for (let n, s = -1, a = -1, i = e.fieldsLength(); ++s < i; )
    (n = e.fields(s)) && (r[++a] = L.decode(n, t));
  return r;
}
function hs(e, t) {
  const r = [];
  for (let n, s = -1, a = -1, i = e.childrenLength(); ++s < i; )
    (n = e.children(s)) && (r[++a] = L.decode(n, t));
  return r;
}
function Ql(e, t) {
  let r, n, s, a, i, o;
  return (
    !t || !(o = e.dictionary())
      ? ((s = ds(e, hs(e, t))), (n = new L(e.name(), s, e.nullable(), yr(e))))
      : t.has((r = o.id().low))
      ? ((a = (a = o.indexType()) ? fs(a) : new qt()),
        (i = new $t(t.get(r), a, r, o.isOrdered())),
        (n = new L(e.name(), i, e.nullable(), yr(e))))
      : ((a = (a = o.indexType()) ? fs(a) : new qt()),
        t.set(r, (s = ds(e, hs(e, t)))),
        (i = new $t(s, a, r, o.isOrdered())),
        (n = new L(e.name(), i, e.nullable(), yr(e)))),
    n || null
  );
}
function yr(e) {
  const t = new Map();
  if (e)
    for (let r, n, s = -1, a = e.customMetadataLength() | 0; ++s < a; )
      (r = e.customMetadata(s)) && (n = r.key()) != null && t.set(n, r.value());
  return t;
}
function fs(e) {
  return new tt(e.isSigned(), e.bitWidth());
}
function ds(e, t) {
  const r = e.typeType();
  switch (r) {
    case H.NONE:
      return new me();
    case H.Null:
      return new me();
    case H.Binary:
      return new Re();
    case H.Utf8:
      return new we();
    case H.Bool:
      return new Ce();
    case H.List:
      return new Ie((t || [])[0]);
    case H.Struct_:
      return new mt(t || []);
  }
  switch (r) {
    case H.Int: {
      const n = e.type(new f.apache.arrow.flatbuf.Int());
      return new tt(n.isSigned(), n.bitWidth());
    }
    case H.FloatingPoint: {
      const n = e.type(new f.apache.arrow.flatbuf.FloatingPoint());
      return new Zt(n.precision());
    }
    case H.Decimal: {
      const n = e.type(new f.apache.arrow.flatbuf.Decimal());
      return new Ar(n.scale(), n.precision());
    }
    case H.Date: {
      const n = e.type(new f.apache.arrow.flatbuf.Date());
      return new ve(n.unit());
    }
    case H.Time: {
      const n = e.type(new f.apache.arrow.flatbuf.Time());
      return new Tr(n.unit(), n.bitWidth());
    }
    case H.Timestamp: {
      const n = e.type(new f.apache.arrow.flatbuf.Timestamp());
      return new Fr(n.unit(), n.timezone());
    }
    case H.Interval: {
      const n = e.type(new f.apache.arrow.flatbuf.Interval());
      return new Or(n.unit());
    }
    case H.Union: {
      const n = e.type(new f.apache.arrow.flatbuf.Union());
      return new ke(n.mode(), n.typeIdsArray() || [], t || []);
    }
    case H.FixedSizeBinary: {
      const n = e.type(new f.apache.arrow.flatbuf.FixedSizeBinary());
      return new Dr(n.byteWidth());
    }
    case H.FixedSizeList: {
      const n = e.type(new f.apache.arrow.flatbuf.FixedSizeList());
      return new je(n.listSize(), (t || [])[0]);
    }
    case H.Map: {
      const n = e.type(new f.apache.arrow.flatbuf.Map());
      return new ze((t || [])[0], n.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${H[r]}" (${r})`);
}
function Xl(e, t) {
  const r = t.fields.map((a) => L.encode(e, a));
  xt.startFieldsVector(e, r.length);
  const n = xt.createFieldsVector(e, r),
    s =
      t.metadata && t.metadata.size > 0
        ? xt.createCustomMetadataVector(
            e,
            [...t.metadata].map(([a, i]) => {
              const o = e.createString(`${a}`),
                c = e.createString(`${i}`);
              return (
                jt.startKeyValue(e),
                jt.addKey(e, o),
                jt.addValue(e, c),
                jt.endKeyValue(e)
              );
            })
          )
        : -1;
  return (
    xt.startSchema(e),
    xt.addFields(e, n),
    xt.addEndianness(e, sh ? ls.Little : ls.Big),
    s !== -1 && xt.addCustomMetadata(e, s),
    xt.endSchema(e)
  );
}
function th(e, t) {
  let r = -1,
    n = -1,
    s = -1,
    a = t.type,
    i = t.typeId;
  A.isDictionary(a)
    ? ((i = a.dictionary.typeId),
      (s = Sn.visit(a, e)),
      (n = Sn.visit(a.dictionary, e)))
    : (n = Sn.visit(a, e));
  const o = (a.children || []).map((d) => L.encode(e, d)),
    c = ht.createChildrenVector(e, o),
    u =
      t.metadata && t.metadata.size > 0
        ? ht.createCustomMetadataVector(
            e,
            [...t.metadata].map(([d, y]) => {
              const F = e.createString(`${d}`),
                M = e.createString(`${y}`);
              return (
                jt.startKeyValue(e),
                jt.addKey(e, F),
                jt.addValue(e, M),
                jt.endKeyValue(e)
              );
            })
          )
        : -1;
  return (
    t.name && (r = e.createString(t.name)),
    ht.startField(e),
    ht.addType(e, n),
    ht.addTypeType(e, i),
    ht.addChildren(e, c),
    ht.addNullable(e, !!t.nullable),
    r !== -1 && ht.addName(e, r),
    s !== -1 && ht.addDictionary(e, s),
    u !== -1 && ht.addCustomMetadata(e, u),
    ht.endField(e)
  );
}
function eh(e, t) {
  const r = t.nodes || [],
    n = t.buffers || [];
  kt.startNodesVector(e, r.length),
    r
      .slice()
      .reverse()
      .forEach((i) => ne.encode(e, i));
  const s = e.endVector();
  kt.startBuffersVector(e, n.length),
    n
      .slice()
      .reverse()
      .forEach((i) => Bt.encode(e, i));
  const a = e.endVector();
  return (
    kt.startRecordBatch(e),
    kt.addLength(e, new Xt(t.length, 0)),
    kt.addNodes(e, s),
    kt.addBuffers(e, a),
    kt.endRecordBatch(e)
  );
}
function rh(e, t) {
  const r = ot.encode(e, t.data);
  return (
    oe.startDictionaryBatch(e),
    oe.addId(e, new Xt(t.id, 0)),
    oe.addIsDelta(e, t.isDelta),
    oe.addData(e, r),
    oe.endDictionaryBatch(e)
  );
}
function nh(e, t) {
  return zl.createFieldNode(e, new Xt(t.length, 0), new Xt(t.nullCount, 0));
}
function ih(e, t) {
  return jl.createBuffer(e, new Xt(t.offset, 0), new Xt(t.length, 0));
}
const sh = (function () {
  const e = new ArrayBuffer(2);
  return new DataView(e).setInt16(0, 256, !0), new Int16Array(e)[0] === 256;
})();
var Ua = h.ByteBuffer;
const mi = (e) =>
    `Expected ${j[e]} Message in stream, but was null or length 0.`,
  gi = (e) =>
    `Header pointer of flatbuffer-encoded ${j[e]} Message is null or length 0.`,
  Na = (e, t) => `Expected to read ${e} metadata bytes, but only read ${t}.`,
  Va = (e, t) =>
    `Expected to read ${e} bytes for message body, but only read ${t}.`;
class Ra {
  constructor(t) {
    this.source = t instanceof Mr ? t : new Mr(t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let t;
    return (t = this.readMetadataLength()).done ||
      (t.value === -1 && (t = this.readMetadataLength()).done) ||
      (t = this.readMetadata(t.value)).done
      ? $
      : t;
  }
  throw(t) {
    return this.source.throw(t);
  }
  return(t) {
    return this.source.return(t);
  }
  readMessage(t) {
    let r;
    if ((r = this.next()).done) return null;
    if (t != null && r.value.headerType !== t) throw new Error(mi(t));
    return r.value;
  }
  readMessageBody(t) {
    if (t <= 0) return new Uint8Array(0);
    const r = D(this.source.read(t));
    if (r.byteLength < t) throw new Error(Va(t, r.byteLength));
    return r.byteOffset % 8 === 0 &&
      r.byteOffset + r.byteLength <= r.buffer.byteLength
      ? r
      : r.slice();
  }
  readSchema(t = !1) {
    const r = j.Schema,
      n = this.readMessage(r),
      s = n && n.header();
    if (t && !s) throw new Error(gi(r));
    return s;
  }
  readMetadataLength() {
    const t = this.source.read(sn),
      r = t && new Ua(t),
      n = (r && r.readInt32(0)) || 0;
    return { done: n === 0, value: n };
  }
  readMetadata(t) {
    const r = this.source.read(t);
    if (!r) return $;
    if (r.byteLength < t) throw new Error(Na(t, r.byteLength));
    return { done: !1, value: Z.decode(r) };
  }
}
class ah {
  constructor(t, r) {
    this.source = t instanceof Qt ? t : $s(t) ? new Er(t, r) : new Qt(t);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async next() {
    let t;
    return (t = await this.readMetadataLength()).done ||
      (t.value === -1 && (t = await this.readMetadataLength()).done) ||
      (t = await this.readMetadata(t.value)).done
      ? $
      : t;
  }
  async throw(t) {
    return await this.source.throw(t);
  }
  async return(t) {
    return await this.source.return(t);
  }
  async readMessage(t) {
    let r;
    if ((r = await this.next()).done) return null;
    if (t != null && r.value.headerType !== t) throw new Error(mi(t));
    return r.value;
  }
  async readMessageBody(t) {
    if (t <= 0) return new Uint8Array(0);
    const r = D(await this.source.read(t));
    if (r.byteLength < t) throw new Error(Va(t, r.byteLength));
    return r.byteOffset % 8 === 0 &&
      r.byteOffset + r.byteLength <= r.buffer.byteLength
      ? r
      : r.slice();
  }
  async readSchema(t = !1) {
    const r = j.Schema,
      n = await this.readMessage(r),
      s = n && n.header();
    if (t && !s) throw new Error(gi(r));
    return s;
  }
  async readMetadataLength() {
    const t = await this.source.read(sn),
      r = t && new Ua(t),
      n = (r && r.readInt32(0)) || 0;
    return { done: n === 0, value: n };
  }
  async readMetadata(t) {
    const r = await this.source.read(t);
    if (!r) return $;
    if (r.byteLength < t) throw new Error(Na(t, r.byteLength));
    return { done: !1, value: Z.decode(r) };
  }
}
class oh extends Ra {
  constructor(t) {
    super(new Uint8Array(0)),
      (this._schema = !1),
      (this._body = []),
      (this._batchIndex = 0),
      (this._dictionaryIndex = 0),
      (this._json = t instanceof Ki ? t : new Ki(t));
  }
  next() {
    const { _json: t } = this;
    if (!this._schema)
      return (
        (this._schema = !0), { done: !1, value: Z.fromJSON(t.schema, j.Schema) }
      );
    if (this._dictionaryIndex < t.dictionaries.length) {
      const r = t.dictionaries[this._dictionaryIndex++];
      return (
        (this._body = r.data.columns),
        { done: !1, value: Z.fromJSON(r, j.DictionaryBatch) }
      );
    }
    if (this._batchIndex < t.batches.length) {
      const r = t.batches[this._batchIndex++];
      return (
        (this._body = r.columns),
        { done: !1, value: Z.fromJSON(r, j.RecordBatch) }
      );
    }
    return (this._body = []), $;
  }
  readMessageBody(t) {
    return r(this._body);
    function r(n) {
      return (n || []).reduce(
        (s, a) => [
          ...s,
          ...((a.VALIDITY && [a.VALIDITY]) || []),
          ...((a.TYPE && [a.TYPE]) || []),
          ...((a.OFFSET && [a.OFFSET]) || []),
          ...((a.DATA && [a.DATA]) || []),
          ...r(a.children),
        ],
        []
      );
    }
  }
  readMessage(t) {
    let r;
    if ((r = this.next()).done) return null;
    if (t != null && r.value.headerType !== t) throw new Error(mi(t));
    return r.value;
  }
  readSchema() {
    const t = j.Schema,
      r = this.readMessage(t),
      n = r && r.header();
    if (!r || !n) throw new Error(gi(t));
    return n;
  }
}
const sn = 4,
  Rn = "ARROW1",
  We = new Uint8Array(Rn.length);
for (let e = 0; e < Rn.length; e += 1) We[e] = Rn.charCodeAt(e);
function _i(e, t = 0) {
  for (let r = -1, n = We.length; ++r < n; ) if (We[r] !== e[t + r]) return !1;
  return !0;
}
const er = We.length,
  Ca = er + sn,
  ch = er * 2 + sn;
class Y extends O {
  constructor() {
    super(),
      (this._byteLength = 0),
      (this._nodes = []),
      (this._buffers = []),
      (this._bufferRegions = []);
  }
  static assemble(...t) {
    const r = new Y(),
      n = Wu(X, t),
      [s = r] = r.visitMany(n);
    return s;
  }
  visit(t) {
    if (!A.isDictionary(t.type)) {
      const { data: r, length: n, nullCount: s } = t;
      if (n > 2147483647)
        throw new RangeError(
          "Cannot write arrays larger than 2^31 - 1 in length"
        );
      A.isNull(t.type) ||
        pt.call(
          this,
          s <= 0 ? new Uint8Array(0) : Zn(r.offset, n, r.nullBitmap)
        ),
        this.nodes.push(new ne(n, s));
    }
    return super.visit(t);
  }
  visitNull(t) {
    return this;
  }
  visitDictionary(t) {
    return this.visit(t.indices);
  }
  get nodes() {
    return this._nodes;
  }
  get buffers() {
    return this._buffers;
  }
  get byteLength() {
    return this._byteLength;
  }
  get bufferRegions() {
    return this._bufferRegions;
  }
}
function pt(e) {
  const t = (e.byteLength + 7) & -8;
  return (
    this.buffers.push(e),
    this.bufferRegions.push(new Bt(this._byteLength, t)),
    (this._byteLength += t),
    this
  );
}
function uh(e) {
  const { type: t, length: r, typeIds: n, valueOffsets: s } = e;
  if ((pt.call(this, n), t.mode === Et.Sparse)) return Cn.call(this, e);
  if (t.mode === Et.Dense) {
    if (e.offset <= 0) return pt.call(this, s), Cn.call(this, e);
    {
      const a = n.reduce((d, y) => Math.max(d, y), n[0]),
        i = new Int32Array(a + 1),
        o = new Int32Array(a + 1).fill(-1),
        c = new Int32Array(r),
        u = qn(-s[0], r, s);
      for (let d, y, F = -1; ++F < r; )
        (y = o[(d = n[F])]) === -1 && (y = o[d] = u[d]),
          (c[F] = u[F] - y),
          ++i[d];
      pt.call(this, c);
      for (let d, y = -1, F = t.children.length; ++y < F; )
        if ((d = e.getChildAt(y))) {
          const M = t.typeIds[y],
            vt = Math.min(r, i[M]);
          this.visit(d.slice(o[M], vt));
        }
    }
  }
  return this;
}
function lh(e) {
  let t;
  return e.nullCount >= e.length
    ? pt.call(this, new Uint8Array(0))
    : (t = e.values) instanceof Uint8Array
    ? pt.call(this, Zn(e.offset, e.length, t))
    : pt.call(this, Br(e));
}
function Ht(e) {
  return pt.call(this, e.values.subarray(0, e.length * e.stride));
}
function ka(e) {
  const { length: t, values: r, valueOffsets: n } = e,
    s = n[0],
    a = n[t],
    i = Math.min(a - s, r.byteLength - s);
  return (
    pt.call(this, qn(-n[0], t, n)), pt.call(this, r.subarray(s, s + i)), this
  );
}
function wi(e) {
  const { length: t, valueOffsets: r } = e;
  return r && pt.call(this, qn(r[0], t, r)), this.visit(e.getChildAt(0));
}
function Cn(e) {
  return this.visitMany(
    e.type.children.map((t, r) => e.getChildAt(r)).filter(Boolean)
  )[0];
}
Y.prototype.visitBool = lh;
Y.prototype.visitInt = Ht;
Y.prototype.visitFloat = Ht;
Y.prototype.visitUtf8 = ka;
Y.prototype.visitBinary = ka;
Y.prototype.visitFixedSizeBinary = Ht;
Y.prototype.visitDate = Ht;
Y.prototype.visitTimestamp = Ht;
Y.prototype.visitTime = Ht;
Y.prototype.visitDecimal = Ht;
Y.prototype.visitList = wi;
Y.prototype.visitStruct = Cn;
Y.prototype.visitUnion = uh;
Y.prototype.visitInterval = Ht;
Y.prototype.visitFixedSizeList = wi;
Y.prototype.visitMap = wi;
class vi extends re {
  constructor(t) {
    super(),
      (this._position = 0),
      (this._started = !1),
      (this._sink = new Ue()),
      (this._schema = null),
      (this._dictionaryBlocks = []),
      (this._recordBatchBlocks = []),
      (this._dictionaryDeltaOffsets = new Map()),
      at(t) || (t = { autoDestroy: !0, writeLegacyIpcFormat: !1 }),
      (this._autoDestroy =
        typeof t.autoDestroy == "boolean" ? t.autoDestroy : !0),
      (this._writeLegacyIpcFormat =
        typeof t.writeLegacyIpcFormat == "boolean"
          ? t.writeLegacyIpcFormat
          : !1);
  }
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  static throughDOM(t, r) {
    throw new Error('"throughDOM" not available in this environment');
  }
  toString(t = !1) {
    return this._sink.toString(t);
  }
  toUint8Array(t = !1) {
    return this._sink.toUint8Array(t);
  }
  writeAll(t) {
    return Pt(t)
      ? t.then((r) => this.writeAll(r))
      : Nt(t)
      ? Ai(this, t)
      : Bi(this, t);
  }
  get closed() {
    return this._sink.closed;
  }
  [Symbol.asyncIterator]() {
    return this._sink[Symbol.asyncIterator]();
  }
  toDOMStream(t) {
    return this._sink.toDOMStream(t);
  }
  toNodeStream(t) {
    return this._sink.toNodeStream(t);
  }
  close() {
    return this.reset()._sink.close();
  }
  abort(t) {
    return this.reset()._sink.abort(t);
  }
  finish() {
    return (
      this._autoDestroy ? this.close() : this.reset(this._sink, this._schema),
      this
    );
  }
  reset(t = this._sink, r = null) {
    return (
      t === this._sink || t instanceof Ue
        ? (this._sink = t)
        : ((this._sink = new Ue()),
          t && vc(t)
            ? this.toDOMStream({ type: "bytes" }).pipeTo(t)
            : t && Ic(t) && this.toNodeStream({ objectMode: !1 }).pipe(t)),
      this._started && this._schema && this._writeFooter(this._schema),
      (this._started = !1),
      (this._dictionaryBlocks = []),
      (this._recordBatchBlocks = []),
      (this._dictionaryDeltaOffsets = new Map()),
      (!r || !r.compareTo(this._schema)) &&
        (r === null
          ? ((this._position = 0), (this._schema = null))
          : ((this._started = !0), (this._schema = r), this._writeSchema(r))),
      this
    );
  }
  write(t) {
    let r = null;
    if (this._sink) {
      if (t == null) return this.finish() && void 0;
      if (t instanceof E && !(r = t.schema)) return this.finish() && void 0;
      if (t instanceof X && !(r = t.schema)) return this.finish() && void 0;
    } else throw new Error("RecordBatchWriter is closed");
    if (r && !r.compareTo(this._schema)) {
      if (this._started && this._autoDestroy) return this.close();
      this.reset(this._sink, r);
    }
    t instanceof X
      ? t instanceof un || this._writeRecordBatch(t)
      : t instanceof E
      ? this.writeAll(t.chunks)
      : bt(t) && this.writeAll(t);
  }
  _writeMessage(t, r = 8) {
    const n = r - 1,
      s = Z.encode(t),
      a = s.byteLength,
      i = this._writeLegacyIpcFormat ? 4 : 8,
      o = (a + i + n) & ~n,
      c = o - a - i;
    return (
      t.headerType === j.RecordBatch
        ? this._recordBatchBlocks.push(new Wt(o, t.bodyLength, this._position))
        : t.headerType === j.DictionaryBatch &&
          this._dictionaryBlocks.push(new Wt(o, t.bodyLength, this._position)),
      this._writeLegacyIpcFormat || this._write(Int32Array.of(-1)),
      this._write(Int32Array.of(o - i)),
      a > 0 && this._write(s),
      this._writePadding(c)
    );
  }
  _write(t) {
    if (this._started) {
      const r = D(t);
      r &&
        r.byteLength > 0 &&
        (this._sink.write(r), (this._position += r.byteLength));
    }
    return this;
  }
  _writeSchema(t) {
    return this._writeMessage(Z.from(t));
  }
  _writeFooter(t) {
    return this._writeLegacyIpcFormat
      ? this._write(Int32Array.of(0))
      : this._write(Int32Array.of(-1, 0));
  }
  _writeMagic() {
    return this._write(We);
  }
  _writePadding(t) {
    return t > 0 ? this._write(new Uint8Array(t)) : this;
  }
  _writeRecordBatch(t) {
    const {
        byteLength: r,
        nodes: n,
        bufferRegions: s,
        buffers: a,
      } = Y.assemble(t),
      i = new ot(t.length, n, s),
      o = Z.from(i, r);
    return this._writeDictionaries(t)._writeMessage(o)._writeBodyBuffers(a);
  }
  _writeDictionaryBatch(t, r, n = !1) {
    this._dictionaryDeltaOffsets.set(
      r,
      t.length + (this._dictionaryDeltaOffsets.get(r) || 0)
    );
    const {
        byteLength: s,
        nodes: a,
        bufferRegions: i,
        buffers: o,
      } = Y.assemble(t),
      c = new ot(t.length, a, i),
      u = new Ft(c, r, n),
      d = Z.from(u, s);
    return this._writeMessage(d)._writeBodyBuffers(o);
  }
  _writeBodyBuffers(t) {
    let r, n, s;
    for (let a = -1, i = t.length; ++a < i; )
      (r = t[a]) &&
        (n = r.byteLength) > 0 &&
        (this._write(r), (s = ((n + 7) & -8) - n) > 0 && this._writePadding(s));
    return this;
  }
  _writeDictionaries(t) {
    for (let [r, n] of t.dictionaries) {
      let s = this._dictionaryDeltaOffsets.get(r) || 0;
      if (s === 0 || (n = n.slice(s)).length > 0) {
        const a = "chunks" in n ? n.chunks : [n];
        for (const i of a)
          this._writeDictionaryBatch(i, r, s > 0), (s += i.length);
      }
    }
    return this;
  }
}
class Ii extends vi {
  static writeAll(t, r) {
    const n = new Ii(r);
    return Pt(t) ? t.then((s) => n.writeAll(s)) : Nt(t) ? Ai(n, t) : Bi(n, t);
  }
}
class Si extends vi {
  constructor() {
    super(), (this._autoDestroy = !0);
  }
  static writeAll(t) {
    const r = new Si();
    return Pt(t) ? t.then((n) => r.writeAll(n)) : Nt(t) ? Ai(r, t) : Bi(r, t);
  }
  _writeSchema(t) {
    return this._writeMagic()._writePadding(2);
  }
  _writeFooter(t) {
    const r = $e.encode(
      new $e(t, ft.V4, this._recordBatchBlocks, this._dictionaryBlocks)
    );
    return super
      ._writeFooter(t)
      ._write(r)
      ._write(Int32Array.of(r.byteLength))
      ._writeMagic();
  }
}
function Bi(e, t) {
  let r = t;
  t instanceof E && ((r = t.chunks), e.reset(void 0, t.schema));
  for (const n of r) e.write(n);
  return e.finish();
}
async function Ai(e, t) {
  for await (const r of t) e.write(r);
  return e.finish();
}
const Bn = new Uint8Array(0),
  ja = (e) => [Bn, Bn, new Uint8Array(e), Bn];
function hh(e, t, r = t.reduce((n, s) => Math.max(n, s.length), 0)) {
  let n,
    s,
    a = -1,
    i = t.length;
  const o = [...e.fields],
    c = [],
    u = ((r + 63) & -64) >> 3;
  for (; ++a < i; )
    (n = t[a]) && n.length === r
      ? (c[a] = n)
      : ((s = o[a]).nullable || (o[a] = o[a].clone({ nullable: !0 })),
        (c[a] = n
          ? n._changeLengthAndBackfillNullBitmap(r)
          : p.new(s.type, 0, r, r, ja(u))));
  return [new R(o), r, c];
}
function fh(e) {
  return za(new R(e.map(({ field: t }) => t)), e);
}
function za(e, t) {
  return dh(
    e,
    t.map((r) => (r instanceof G ? r.chunks.map((n) => n.data) : [r.data]))
  );
}
function dh(e, t) {
  const r = [...e.fields],
    n = [],
    s = { numBatches: t.reduce((y, F) => Math.max(y, F.length), 0) };
  let a = 0,
    i = 0,
    o = -1,
    c = t.length,
    u,
    d = [];
  for (; s.numBatches-- > 0; ) {
    for (i = Number.POSITIVE_INFINITY, o = -1; ++o < c; )
      (d[o] = u = t[o].shift()), (i = Math.min(i, u ? u.length : i));
    isFinite(i) &&
      ((d = ph(r, i, d, t, s)), i > 0 && (n[a++] = [i, d.slice()]));
  }
  return [(e = new R(r, e.metadata)), n.map((y) => new X(e, ...y))];
}
function ph(e, t, r, n, s) {
  let a,
    i,
    o = 0,
    c = -1,
    u = n.length;
  const d = ((t + 63) & -64) >> 3;
  for (; ++c < u; )
    (a = r[c]) && (o = a.length) >= t
      ? o === t
        ? (r[c] = a)
        : ((r[c] = a.slice(0, t)),
          (a = a.slice(t, o - t)),
          (s.numBatches = Math.max(s.numBatches, n[c].unshift(a))))
      : ((i = e[c]).nullable || (e[c] = i.clone({ nullable: !0 })),
        (r[c] = a
          ? a._changeLengthAndBackfillNullBitmap(t)
          : p.new(i.type, 0, t, t, ja(d))));
  return r;
}
class z extends x {
  constructor(t, r) {
    super(),
      (this._children = r),
      (this.numChildren = t.childData.length),
      this._bindDataAccessors((this.data = t));
  }
  get type() {
    return this.data.type;
  }
  get typeId() {
    return this.data.typeId;
  }
  get length() {
    return this.data.length;
  }
  get offset() {
    return this.data.offset;
  }
  get stride() {
    return this.data.stride;
  }
  get nullCount() {
    return this.data.nullCount;
  }
  get byteLength() {
    return this.data.byteLength;
  }
  get VectorName() {
    return `${l[this.typeId]}Vector`;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get values() {
    return this.data.values;
  }
  get typeIds() {
    return this.data.typeIds;
  }
  get nullBitmap() {
    return this.data.nullBitmap;
  }
  get valueOffsets() {
    return this.data.valueOffsets;
  }
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  clone(t, r = this._children) {
    return x.new(t, r);
  }
  concat(...t) {
    return G.concat(this, ...t);
  }
  slice(t, r) {
    return oa(this, t, r, this._sliceInternal);
  }
  isValid(t) {
    if (this.nullCount > 0) {
      const r = this.offset + t;
      return (this.nullBitmap[r >> 3] & (1 << r % 8)) !== 0;
    }
    return !0;
  }
  getChildAt(t) {
    return t < 0 || t >= this.numChildren
      ? null
      : (this._children || (this._children = []))[t] ||
          (this._children[t] = x.new(this.data.childData[t]));
  }
  toJSON() {
    return [...this];
  }
  _sliceInternal(t, r, n) {
    return t.clone(t.data.slice(r, n - r), null);
  }
  _bindDataAccessors(t) {}
}
z.prototype[Symbol.isConcatSpreadable] = !0;
class yh extends z {
  asUtf8() {
    return x.new(this.data.clone(new we()));
  }
}
class bh extends z {
  static from(t) {
    return te(() => new Ce(), t);
  }
}
class Ti extends z {
  static from(...t) {
    return t.length === 2
      ? te(() => (t[1] === Tt.DAY ? new Hc() : new Ji()), t[0])
      : te(() => new Ji(), t[0]);
  }
}
class mh extends Ti {}
class gh extends Ti {}
class _h extends z {}
class Fi extends z {
  constructor(t) {
    super(t), (this.indices = x.new(t.clone(this.type.indices)));
  }
  static from(...t) {
    if (t.length === 3) {
      const [r, n, s] = t,
        a = new $t(r.type, n, null, null);
      return x.new(p.Dictionary(a, 0, s.length, 0, null, s, r));
    }
    return te(() => t[0].type, t[0]);
  }
  get dictionary() {
    return this.data.dictionary;
  }
  reverseLookup(t) {
    return this.dictionary.indexOf(t);
  }
  getKey(t) {
    return this.indices.get(t);
  }
  getValue(t) {
    return this.dictionary.get(t);
  }
  setKey(t, r) {
    return this.indices.set(t, r);
  }
  setValue(t, r) {
    return this.dictionary.set(t, r);
  }
}
Fi.prototype.indices = null;
class wh extends z {}
class vh extends z {}
class an extends z {
  static from(t) {
    let r = Bh(this);
    if (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) {
      let n = Sh(t.constructor) || r;
      if ((r === null && (r = n), r && r === n)) {
        let s = new r(),
          a = t.byteLength / s.ArrayType.BYTES_PER_ELEMENT;
        if (!Ih(r, t.constructor)) return x.new(p.Float(s, 0, a, 0, null, t));
      }
    }
    if (r) return te(() => new r(), t);
    throw t instanceof DataView || t instanceof ArrayBuffer
      ? new TypeError(
          `Cannot infer float type from instance of ${t.constructor.name}`
        )
      : new TypeError("Unrecognized FloatVector input");
  }
}
class Pa extends an {
  toFloat32Array() {
    return new Float32Array(this);
  }
  toFloat64Array() {
    return new Float64Array(this);
  }
}
class $a extends an {}
class Wa extends an {}
const Ih = (e, t) => e === Xr && t !== Uint16Array,
  Sh = (e) => {
    switch (e) {
      case Uint16Array:
        return Xr;
      case Float32Array:
        return ai;
      case Float64Array:
        return oi;
      default:
        return null;
    }
  },
  Bh = (e) => {
    switch (e) {
      case Pa:
        return Xr;
      case $a:
        return ai;
      case Wa:
        return oi;
      default:
        return null;
    }
  };
class Oi extends z {}
class Ah extends Oi {}
class Th extends Oi {}
class wt extends z {
  static from(...t) {
    let [r, n = !1] = t,
      s = Dh(this, n);
    if (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) {
      let a = Oh(r.constructor, n) || s;
      if ((s === null && (s = a), s && s === a)) {
        let i = new s(),
          o = r.byteLength / i.ArrayType.BYTES_PER_ELEMENT;
        return (
          Fh(s, r.constructor) && (o *= 0.5), x.new(p.Int(i, 0, o, 0, null, r))
        );
      }
    }
    if (s) return te(() => new s(), r);
    throw r instanceof DataView || r instanceof ArrayBuffer
      ? new TypeError(
          `Cannot infer integer type from instance of ${r.constructor.name}`
        )
      : new TypeError("Unrecognized IntVector input");
  }
}
class Ya extends wt {}
class Ha extends wt {}
class Ka extends wt {}
class Ja extends wt {
  toBigInt64Array() {
    return Ac(this.values);
  }
  get values64() {
    return this._values64 || (this._values64 = this.toBigInt64Array());
  }
}
class Ga extends wt {}
class qa extends wt {}
class Za extends wt {}
class Qa extends wt {
  toBigUint64Array() {
    return Tc(this.values);
  }
  get values64() {
    return this._values64 || (this._values64 = this.toBigUint64Array());
  }
}
const Fh = (e, t) =>
    (e === ge || e === _e) && (t === Int32Array || t === Uint32Array),
  Oh = (e, t) => {
    switch (e) {
      case Int8Array:
        return ei;
      case Int16Array:
        return ri;
      case Int32Array:
        return t ? ge : qt;
      case Te:
        return ge;
      case Uint8Array:
        return ni;
      case Uint16Array:
        return ii;
      case Uint32Array:
        return t ? _e : si;
      case Ke:
        return _e;
      default:
        return null;
    }
  },
  Dh = (e, t) => {
    switch (e) {
      case Ya:
        return ei;
      case Ha:
        return ri;
      case Ka:
        return t ? ge : qt;
      case Ja:
        return ge;
      case Ga:
        return ni;
      case qa:
        return ii;
      case Za:
        return t ? _e : si;
      case Qa:
        return _e;
      default:
        return null;
    }
  };
class xh extends z {}
class Lh extends z {
  asList() {
    const t = this.type.children[0];
    return x.new(this.data.clone(new Ie(t)));
  }
  bind(t) {
    const r = this.getChildAt(0),
      { [t]: n, [t + 1]: s } = this.valueOffsets;
    return new ia(r.slice(n, s));
  }
}
class Mh extends z {}
const Eh = Symbol.for("rowIndex");
class on extends z {
  bind(t) {
    const r = this._row || (this._row = new sa(this)),
      n = Object.create(r);
    return (n[Eh] = t), n;
  }
}
class rr extends z {}
class Uh extends rr {}
class Nh extends rr {}
class Vh extends rr {}
class Rh extends rr {}
class nr extends z {}
class Ch extends nr {}
class kh extends nr {}
class jh extends nr {}
class zh extends nr {}
class Di extends z {
  get typeIdToChildIndex() {
    return this.data.type.typeIdToChildIndex;
  }
}
class Ph extends Di {
  get valueOffsets() {
    return this.data.valueOffsets;
  }
}
class $h extends Di {}
class Wh extends z {
  static from(t) {
    return te(() => new we(), t);
  }
  asBinary() {
    return x.new(this.data.clone(new Re()));
  }
}
function ps(e) {
  return function () {
    return e(this);
  };
}
function Yh(e) {
  return function (t) {
    return e(this, t);
  };
}
function ys(e) {
  return function (t, r) {
    return e(this, t, r);
  };
}
class g extends O {}
const Hh = (e, t) => 864e5 * e[t],
  xi = (e, t) => 4294967296 * e[t + 1] + (e[t] >>> 0),
  Kh = (e, t) => 4294967296 * (e[t + 1] / 1e3) + (e[t] >>> 0) / 1e3,
  Jh = (e, t) => 4294967296 * (e[t + 1] / 1e6) + (e[t] >>> 0) / 1e6,
  Xa = (e) => new Date(e),
  Gh = (e, t) => Xa(Hh(e, t)),
  qh = (e, t) => Xa(xi(e, t)),
  Zh = (e, t) => null,
  to = (e, t, r) => {
    const { [r]: n, [r + 1]: s } = t;
    return n != null && s != null ? e.subarray(n, s) : null;
  },
  Qh = ({ offset: e, values: t }, r) => {
    const n = e + r;
    return (t[n >> 3] & (1 << n % 8)) !== 0;
  },
  eo = ({ values: e }, t) => Gh(e, t),
  ro = ({ values: e }, t) => qh(e, t * 2),
  Dt = ({ stride: e, values: t }, r) => t[e * r],
  no = ({ stride: e, values: t }, r) => cu(t[e * r]),
  Li = ({ stride: e, values: t, type: r }, n) =>
    Fe.new(t.subarray(e * n, e * (n + 1)), r.isSigned),
  Xh = ({ stride: e, values: t }, r) => t.subarray(e * r, e * (r + 1)),
  tf = ({ values: e, valueOffsets: t }, r) => to(e, t, r),
  ef = ({ values: e, valueOffsets: t }, r) => {
    const n = to(e, t, r);
    return n !== null ? xn(n) : null;
  },
  rf = (e, t) => (e.type.bitWidth < 64 ? Dt(e, t) : Li(e, t)),
  nf = (e, t) => (e.type.precision !== ut.HALF ? Dt(e, t) : no(e, t)),
  sf = (e, t) => (e.type.unit === Tt.DAY ? eo(e, t) : ro(e, t)),
  io = ({ values: e }, t) => 1e3 * xi(e, t * 2),
  so = ({ values: e }, t) => xi(e, t * 2),
  ao = ({ values: e }, t) => Kh(e, t * 2),
  oo = ({ values: e }, t) => Jh(e, t * 2),
  af = (e, t) => {
    switch (e.type.unit) {
      case V.SECOND:
        return io(e, t);
      case V.MILLISECOND:
        return so(e, t);
      case V.MICROSECOND:
        return ao(e, t);
      case V.NANOSECOND:
        return oo(e, t);
    }
  },
  co = ({ values: e, stride: t }, r) => e[t * r],
  uo = ({ values: e, stride: t }, r) => e[t * r],
  lo = ({ values: e }, t) => Fe.signed(e.subarray(2 * t, 2 * (t + 1))),
  ho = ({ values: e }, t) => Fe.signed(e.subarray(2 * t, 2 * (t + 1))),
  of = (e, t) => {
    switch (e.type.unit) {
      case V.SECOND:
        return co(e, t);
      case V.MILLISECOND:
        return uo(e, t);
      case V.MICROSECOND:
        return lo(e, t);
      case V.NANOSECOND:
        return ho(e, t);
    }
  },
  cf = ({ values: e }, t) => Fe.decimal(e.subarray(4 * t, 4 * (t + 1))),
  uf = (e, t) => {
    const r = e.getChildAt(0),
      { valueOffsets: n, stride: s } = e;
    return r.slice(n[t * s], n[t * s + 1]);
  },
  lf = (e, t) => e.bind(t),
  hf = (e, t) => e.bind(t),
  ff = (e, t) => (e.type.mode === Et.Dense ? fo(e, t) : po(e, t)),
  fo = (e, t) => {
    const r = e.typeIdToChildIndex[e.typeIds[t]],
      n = e.getChildAt(r);
    return n ? n.get(e.valueOffsets[t]) : null;
  },
  po = (e, t) => {
    const r = e.typeIdToChildIndex[e.typeIds[t]],
      n = e.getChildAt(r);
    return n ? n.get(t) : null;
  },
  df = (e, t) => e.getValue(e.getKey(t)),
  pf = (e, t) => (e.type.unit === be.DAY_TIME ? yo(e, t) : bo(e, t)),
  yo = ({ values: e }, t) => e.subarray(2 * t, 2 * (t + 1)),
  bo = ({ values: e }, t) => {
    const r = e[t],
      n = new Int32Array(2);
    return (n[0] = (r / 12) | 0), (n[1] = r % 12 | 0), n;
  },
  yf = (e, t) => {
    const r = e.getChildAt(0),
      { stride: n } = e;
    return r.slice(t * n, (t + 1) * n);
  };
g.prototype.visitNull = Zh;
g.prototype.visitBool = Qh;
g.prototype.visitInt = rf;
g.prototype.visitInt8 = Dt;
g.prototype.visitInt16 = Dt;
g.prototype.visitInt32 = Dt;
g.prototype.visitInt64 = Li;
g.prototype.visitUint8 = Dt;
g.prototype.visitUint16 = Dt;
g.prototype.visitUint32 = Dt;
g.prototype.visitUint64 = Li;
g.prototype.visitFloat = nf;
g.prototype.visitFloat16 = no;
g.prototype.visitFloat32 = Dt;
g.prototype.visitFloat64 = Dt;
g.prototype.visitUtf8 = ef;
g.prototype.visitBinary = tf;
g.prototype.visitFixedSizeBinary = Xh;
g.prototype.visitDate = sf;
g.prototype.visitDateDay = eo;
g.prototype.visitDateMillisecond = ro;
g.prototype.visitTimestamp = af;
g.prototype.visitTimestampSecond = io;
g.prototype.visitTimestampMillisecond = so;
g.prototype.visitTimestampMicrosecond = ao;
g.prototype.visitTimestampNanosecond = oo;
g.prototype.visitTime = of;
g.prototype.visitTimeSecond = co;
g.prototype.visitTimeMillisecond = uo;
g.prototype.visitTimeMicrosecond = lo;
g.prototype.visitTimeNanosecond = ho;
g.prototype.visitDecimal = cf;
g.prototype.visitList = uf;
g.prototype.visitStruct = hf;
g.prototype.visitUnion = ff;
g.prototype.visitDenseUnion = fo;
g.prototype.visitSparseUnion = po;
g.prototype.visitDictionary = df;
g.prototype.visitInterval = pf;
g.prototype.visitIntervalDayTime = yo;
g.prototype.visitIntervalYearMonth = bo;
g.prototype.visitFixedSizeList = yf;
g.prototype.visitMap = lf;
const cn = new g();
class _ extends O {}
function bf(e, t) {
  return t === null && e.length > 0 ? 0 : -1;
}
function mf(e, t) {
  const { nullBitmap: r } = e;
  if (!r || e.nullCount <= 0) return -1;
  let n = 0;
  for (const s of Zr(r, e.data.offset + (t || 0), e.length, r, Js)) {
    if (!s) return n;
    ++n;
  }
  return -1;
}
function T(e, t, r) {
  if (t === void 0) return -1;
  if (t === null) return mf(e, r);
  const n = Oe(t);
  for (let s = (r || 0) - 1, a = e.length; ++s < a; ) if (n(e.get(s))) return s;
  return -1;
}
function mo(e, t, r) {
  const n = Oe(t);
  for (let s = (r || 0) - 1, a = e.length; ++s < a; ) if (n(e.get(s))) return s;
  return -1;
}
_.prototype.visitNull = bf;
_.prototype.visitBool = T;
_.prototype.visitInt = T;
_.prototype.visitInt8 = T;
_.prototype.visitInt16 = T;
_.prototype.visitInt32 = T;
_.prototype.visitInt64 = T;
_.prototype.visitUint8 = T;
_.prototype.visitUint16 = T;
_.prototype.visitUint32 = T;
_.prototype.visitUint64 = T;
_.prototype.visitFloat = T;
_.prototype.visitFloat16 = T;
_.prototype.visitFloat32 = T;
_.prototype.visitFloat64 = T;
_.prototype.visitUtf8 = T;
_.prototype.visitBinary = T;
_.prototype.visitFixedSizeBinary = T;
_.prototype.visitDate = T;
_.prototype.visitDateDay = T;
_.prototype.visitDateMillisecond = T;
_.prototype.visitTimestamp = T;
_.prototype.visitTimestampSecond = T;
_.prototype.visitTimestampMillisecond = T;
_.prototype.visitTimestampMicrosecond = T;
_.prototype.visitTimestampNanosecond = T;
_.prototype.visitTime = T;
_.prototype.visitTimeSecond = T;
_.prototype.visitTimeMillisecond = T;
_.prototype.visitTimeMicrosecond = T;
_.prototype.visitTimeNanosecond = T;
_.prototype.visitDecimal = T;
_.prototype.visitList = T;
_.prototype.visitStruct = T;
_.prototype.visitUnion = T;
_.prototype.visitDenseUnion = mo;
_.prototype.visitSparseUnion = mo;
_.prototype.visitDictionary = T;
_.prototype.visitInterval = T;
_.prototype.visitIntervalDayTime = T;
_.prototype.visitIntervalYearMonth = T;
_.prototype.visitFixedSizeList = T;
_.prototype.visitMap = T;
const go = new _();
class w extends O {}
function gf(e) {
  const t = cn.getVisitFn(e);
  return Zr(e.nullBitmap, e.offset, e.length, e, (r, n, s, a) =>
    s & (1 << a) ? t(r, n) : null
  );
}
function S(e) {
  if (e.nullCount > 0) return gf(e);
  const { type: t, typeId: r, length: n } = e;
  return e.stride === 1 &&
    (r === l.Timestamp ||
      (r === l.Int && t.bitWidth !== 64) ||
      (r === l.Time && t.bitWidth !== 64) ||
      (r === l.Float && t.precision > 0))
    ? e.values.subarray(0, n)[Symbol.iterator]()
    : (function* (s) {
        for (let a = -1; ++a < n; ) yield s(e, a);
      })(cn.getVisitFn(e));
}
w.prototype.visitNull = S;
w.prototype.visitBool = S;
w.prototype.visitInt = S;
w.prototype.visitInt8 = S;
w.prototype.visitInt16 = S;
w.prototype.visitInt32 = S;
w.prototype.visitInt64 = S;
w.prototype.visitUint8 = S;
w.prototype.visitUint16 = S;
w.prototype.visitUint32 = S;
w.prototype.visitUint64 = S;
w.prototype.visitFloat = S;
w.prototype.visitFloat16 = S;
w.prototype.visitFloat32 = S;
w.prototype.visitFloat64 = S;
w.prototype.visitUtf8 = S;
w.prototype.visitBinary = S;
w.prototype.visitFixedSizeBinary = S;
w.prototype.visitDate = S;
w.prototype.visitDateDay = S;
w.prototype.visitDateMillisecond = S;
w.prototype.visitTimestamp = S;
w.prototype.visitTimestampSecond = S;
w.prototype.visitTimestampMillisecond = S;
w.prototype.visitTimestampMicrosecond = S;
w.prototype.visitTimestampNanosecond = S;
w.prototype.visitTime = S;
w.prototype.visitTimeSecond = S;
w.prototype.visitTimeMillisecond = S;
w.prototype.visitTimeMicrosecond = S;
w.prototype.visitTimeNanosecond = S;
w.prototype.visitDecimal = S;
w.prototype.visitList = S;
w.prototype.visitStruct = S;
w.prototype.visitUnion = S;
w.prototype.visitDenseUnion = S;
w.prototype.visitSparseUnion = S;
w.prototype.visitDictionary = S;
w.prototype.visitInterval = S;
w.prototype.visitIntervalDayTime = S;
w.prototype.visitIntervalYearMonth = S;
w.prototype.visitFixedSizeList = S;
w.prototype.visitMap = S;
const Mi = new w();
class v extends O {}
function B(e) {
  const { type: t, length: r, stride: n } = e;
  switch (t.typeId) {
    case l.Int:
    case l.Float:
    case l.Decimal:
    case l.Time:
    case l.Timestamp:
      return e.values.subarray(0, r * n);
  }
  return [...Mi.visit(e)];
}
v.prototype.visitNull = B;
v.prototype.visitBool = B;
v.prototype.visitInt = B;
v.prototype.visitInt8 = B;
v.prototype.visitInt16 = B;
v.prototype.visitInt32 = B;
v.prototype.visitInt64 = B;
v.prototype.visitUint8 = B;
v.prototype.visitUint16 = B;
v.prototype.visitUint32 = B;
v.prototype.visitUint64 = B;
v.prototype.visitFloat = B;
v.prototype.visitFloat16 = B;
v.prototype.visitFloat32 = B;
v.prototype.visitFloat64 = B;
v.prototype.visitUtf8 = B;
v.prototype.visitBinary = B;
v.prototype.visitFixedSizeBinary = B;
v.prototype.visitDate = B;
v.prototype.visitDateDay = B;
v.prototype.visitDateMillisecond = B;
v.prototype.visitTimestamp = B;
v.prototype.visitTimestampSecond = B;
v.prototype.visitTimestampMillisecond = B;
v.prototype.visitTimestampMicrosecond = B;
v.prototype.visitTimestampNanosecond = B;
v.prototype.visitTime = B;
v.prototype.visitTimeSecond = B;
v.prototype.visitTimeMillisecond = B;
v.prototype.visitTimeMicrosecond = B;
v.prototype.visitTimeNanosecond = B;
v.prototype.visitDecimal = B;
v.prototype.visitList = B;
v.prototype.visitStruct = B;
v.prototype.visitUnion = B;
v.prototype.visitDenseUnion = B;
v.prototype.visitSparseUnion = B;
v.prototype.visitDictionary = B;
v.prototype.visitInterval = B;
v.prototype.visitIntervalDayTime = B;
v.prototype.visitIntervalYearMonth = B;
v.prototype.visitFixedSizeList = B;
v.prototype.visitMap = B;
const _o = new v(),
  Le = (e, t) => e + t,
  An = (e) => `Cannot compute the byte width of variable-width column ${e}`;
class _f extends O {
  visitNull(t) {
    return 0;
  }
  visitInt(t) {
    return t.bitWidth / 8;
  }
  visitFloat(t) {
    return t.ArrayType.BYTES_PER_ELEMENT;
  }
  visitBinary(t) {
    throw new Error(An(t));
  }
  visitUtf8(t) {
    throw new Error(An(t));
  }
  visitBool(t) {
    return 1 / 8;
  }
  visitDecimal(t) {
    return 16;
  }
  visitDate(t) {
    return (t.unit + 1) * 4;
  }
  visitTime(t) {
    return t.bitWidth / 8;
  }
  visitTimestamp(t) {
    return t.unit === V.SECOND ? 4 : 8;
  }
  visitInterval(t) {
    return (t.unit + 1) * 4;
  }
  visitList(t) {
    throw new Error(An(t));
  }
  visitStruct(t) {
    return this.visitFields(t.children).reduce(Le, 0);
  }
  visitUnion(t) {
    return this.visitFields(t.children).reduce(Le, 0);
  }
  visitFixedSizeBinary(t) {
    return t.byteWidth;
  }
  visitFixedSizeList(t) {
    return t.listSize * this.visitFields(t.children).reduce(Le, 0);
  }
  visitMap(t) {
    return this.visitFields(t.children).reduce(Le, 0);
  }
  visitDictionary(t) {
    return this.visit(t.indices);
  }
  visitFields(t) {
    return (t || []).map((r) => this.visit(r.type));
  }
  visitSchema(t) {
    return this.visitFields(t.fields).reduce(Le, 0);
  }
}
const wo = new _f();
class wf extends O {
  visitNull() {
    return Mh;
  }
  visitBool() {
    return bh;
  }
  visitInt() {
    return wt;
  }
  visitInt8() {
    return Ya;
  }
  visitInt16() {
    return Ha;
  }
  visitInt32() {
    return Ka;
  }
  visitInt64() {
    return Ja;
  }
  visitUint8() {
    return Ga;
  }
  visitUint16() {
    return qa;
  }
  visitUint32() {
    return Za;
  }
  visitUint64() {
    return Qa;
  }
  visitFloat() {
    return an;
  }
  visitFloat16() {
    return Pa;
  }
  visitFloat32() {
    return $a;
  }
  visitFloat64() {
    return Wa;
  }
  visitUtf8() {
    return Wh;
  }
  visitBinary() {
    return yh;
  }
  visitFixedSizeBinary() {
    return wh;
  }
  visitDate() {
    return Ti;
  }
  visitDateDay() {
    return mh;
  }
  visitDateMillisecond() {
    return gh;
  }
  visitTimestamp() {
    return rr;
  }
  visitTimestampSecond() {
    return Uh;
  }
  visitTimestampMillisecond() {
    return Nh;
  }
  visitTimestampMicrosecond() {
    return Vh;
  }
  visitTimestampNanosecond() {
    return Rh;
  }
  visitTime() {
    return nr;
  }
  visitTimeSecond() {
    return Ch;
  }
  visitTimeMillisecond() {
    return kh;
  }
  visitTimeMicrosecond() {
    return jh;
  }
  visitTimeNanosecond() {
    return zh;
  }
  visitDecimal() {
    return _h;
  }
  visitList() {
    return xh;
  }
  visitStruct() {
    return on;
  }
  visitUnion() {
    return Di;
  }
  visitDenseUnion() {
    return Ph;
  }
  visitSparseUnion() {
    return $h;
  }
  visitDictionary() {
    return Fi;
  }
  visitInterval() {
    return Oi;
  }
  visitIntervalDayTime() {
    return Ah;
  }
  visitIntervalYearMonth() {
    return Th;
  }
  visitFixedSizeList() {
    return vh;
  }
  visitMap() {
    return Lh;
  }
}
const vo = new wf();
x.new = vf;
x.from = If;
function vf(e, ...t) {
  return new (vo.getVisitFn(e)())(e, ...t);
}
function te(e, t) {
  if (bt(t))
    return x.from({ nullValues: [null, void 0], type: e(), values: t });
  if (Nt(t))
    return x.from({ nullValues: [null, void 0], type: e(), values: t });
  const {
    values: r = [],
    type: n = e(),
    nullValues: s = [null, void 0],
  } = { ...t };
  return bt(r)
    ? x.from({ nullValues: s, ...t, type: n })
    : x.from({ nullValues: s, ...t, type: n });
}
function If(e) {
  const { values: t = [], ...r } = { nullValues: [null, void 0], ...e };
  if (bt(t)) {
    const n = [...W.throughIterable(r)(t)];
    return n.length === 1 ? n[0] : G.concat(n);
  }
  return (async (n) => {
    const s = W.throughAsyncIterable(r);
    for await (const a of s(t)) n.push(a);
    return n.length === 1 ? n[0] : G.concat(n);
  })([]);
}
z.prototype.get = function (t) {
  return cn.visit(this, t);
};
z.prototype.set = function (t, r) {
  return nn.visit(this, t, r);
};
z.prototype.indexOf = function (t, r) {
  return go.visit(this, t, r);
};
z.prototype.toArray = function () {
  return _o.visit(this);
};
z.prototype.getByteWidth = function () {
  return wo.visit(this.type);
};
z.prototype[Symbol.iterator] = function () {
  return Mi.visit(this);
};
z.prototype._bindDataAccessors = Tf;
Object.keys(l)
  .map((e) => l[e])
  .filter((e) => typeof e == "number")
  .filter((e) => e !== l.NONE)
  .forEach((e) => {
    const t = vo.visit(e);
    (t.prototype.get = Yh(cn.getVisitFn(e))),
      (t.prototype.set = ys(nn.getVisitFn(e))),
      (t.prototype.indexOf = ys(go.getVisitFn(e))),
      (t.prototype.toArray = ps(_o.getVisitFn(e))),
      (t.prototype.getByteWidth = Sf(wo.getVisitFn(e))),
      (t.prototype[Symbol.iterator] = ps(Mi.getVisitFn(e)));
  });
function Sf(e) {
  return function () {
    return e(this.type);
  };
}
function Bf(e) {
  return function (t) {
    return this.isValid(t) ? e.call(this, t) : null;
  };
}
function Af(e) {
  return function (t, r) {
    Rc(this.nullBitmap, this.offset + t, r != null) && e.call(this, t, r);
  };
}
function Tf() {
  const e = this.nullBitmap;
  e &&
    e.byteLength > 0 &&
    ((this.get = Bf(this.get)), (this.set = Af(this.set)));
}
class E extends G {
  constructor(...t) {
    let r = null;
    t[0] instanceof R && (r = t.shift());
    let n = ca(X, t);
    if (!r && !(r = n[0] && n[0].schema))
      throw new TypeError(
        "Table must be initialized with a Schema or at least one RecordBatch"
      );
    n[0] || (n[0] = new un(r)),
      super(new mt(r.fields), n),
      (this._schema = r),
      (this._chunks = n);
  }
  static empty(t = new R([])) {
    return new E(t, []);
  }
  static from(t) {
    if (!t) return E.empty();
    if (typeof t == "object") {
      let n = bt(t.values) ? Ff(t) : Nt(t.values) ? Of(t) : null;
      if (n !== null) return n;
    }
    let r = yt.from(t);
    return Pt(r)
      ? (async () => await E.from(await r))()
      : r.isSync() && (r = r.open())
      ? r.schema
        ? new E(r.schema, [...r])
        : E.empty()
      : (async (n) => {
          const s = await n,
            a = s.schema,
            i = [];
          if (a) {
            for await (let o of s) i.push(o);
            return new E(a, i);
          }
          return E.empty();
        })(r.open());
  }
  static async fromAsync(t) {
    return await E.from(t);
  }
  static fromStruct(t) {
    return E.new(t.data.childData, t.type.children);
  }
  static new(...t) {
    return new E(...fh(Pu(t)));
  }
  get schema() {
    return this._schema;
  }
  get length() {
    return this._length;
  }
  get chunks() {
    return this._chunks;
  }
  get numCols() {
    return this._numChildren;
  }
  clone(t = this._chunks) {
    return new E(this._schema, t);
  }
  getColumn(t) {
    return this.getColumnAt(this.getColumnIndex(t));
  }
  getColumnAt(t) {
    return this.getChildAt(t);
  }
  getColumnIndex(t) {
    return this._schema.fields.findIndex((r) => r.name === t);
  }
  getChildAt(t) {
    if (t < 0 || t >= this.numChildren) return null;
    let r, n;
    const s = this._schema.fields,
      a = this._children || (this._children = []);
    if ((n = a[t])) return n;
    if ((r = s[t])) {
      const i = this._chunks
        .map((o) => o.getChildAt(t))
        .filter((o) => o != null);
      if (i.length > 0) return (a[t] = new dt(r, i));
    }
    return null;
  }
  serialize(t = "binary", r = !0) {
    return (r ? Ii : Si).writeAll(this).toUint8Array(!0);
  }
  count() {
    return this._length;
  }
  select(...t) {
    const r = this._schema.fields.reduce(
      (n, s, a) => n.set(s.name, a),
      new Map()
    );
    return this.selectAt(...t.map((n) => r.get(n)).filter((n) => n > -1));
  }
  selectAt(...t) {
    const r = this._schema.selectAt(...t);
    return new E(
      r,
      this._chunks.map(
        ({ length: n, data: { childData: s } }) =>
          new X(r, n, t.map((a) => s[a]).filter(Boolean))
      )
    );
  }
  assign(t) {
    const r = this._schema.fields,
      [n, s] = t.schema.fields.reduce(
        (o, c, u) => {
          const [d, y] = o,
            F = r.findIndex((M) => M.name === c.name);
          return ~F ? (y[F] = u) : d.push(u), o;
        },
        [[], []]
      ),
      a = this._schema.assign(t.schema),
      i = [
        ...r.map((o, c, u, d = s[c]) =>
          d === void 0 ? this.getColumnAt(c) : t.getColumnAt(d)
        ),
        ...n.map((o) => t.getColumnAt(o)),
      ].filter(Boolean);
    return new E(...za(a, i));
  }
}
function Ff(e) {
  const { type: t } = e;
  return t instanceof mt ? E.fromStruct(on.from(e)) : null;
}
function Of(e) {
  const { type: t } = e;
  return t instanceof mt ? on.from(e).then((r) => E.fromStruct(r)) : null;
}
class X extends on {
  constructor(...t) {
    let r,
      n = t[0],
      s;
    if (t[1] instanceof p) [, r, s] = t;
    else {
      const a = n.fields,
        [, i, o] = t;
      r = p.Struct(new mt(a), 0, i, 0, null, o);
    }
    super(r, s), (this._schema = n);
  }
  static from(t) {
    return bt(t.values), E.from(t);
  }
  static new(...t) {
    const [r, n] = ua(t),
      s = n.filter((a) => a instanceof x);
    return new X(
      ...hh(
        new R(r),
        s.map((a) => a.data)
      )
    );
  }
  clone(t, r = this._children) {
    return new X(this._schema, t, r);
  }
  concat(...t) {
    const r = this._schema,
      n = G.flatten(this, ...t);
    return new E(
      r,
      n.map(({ data: s }) => new X(r, s))
    );
  }
  get schema() {
    return this._schema;
  }
  get numCols() {
    return this._schema.fields.length;
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = Ei.collect(this));
  }
  select(...t) {
    const r = this._schema.fields.reduce(
      (n, s, a) => n.set(s.name, a),
      new Map()
    );
    return this.selectAt(...t.map((n) => r.get(n)).filter((n) => n > -1));
  }
  selectAt(...t) {
    const r = this._schema.selectAt(...t),
      n = t.map((s) => this.data.childData[s]).filter(Boolean);
    return new X(r, this.length, n);
  }
}
class un extends X {
  constructor(t) {
    super(
      t,
      0,
      t.fields.map((r) => p.new(r.type, 0, 0, 0))
    );
  }
}
class Ei extends O {
  constructor() {
    super(...arguments), (this.dictionaries = new Map());
  }
  static collect(t) {
    return new Ei().visit(t.data, new mt(t.schema.fields)).dictionaries;
  }
  visit(t, r) {
    return A.isDictionary(r)
      ? this.visitDictionary(t, r)
      : (t.childData.forEach((n, s) => this.visit(n, r.children[s].type)),
        this);
  }
  visitDictionary(t, r) {
    const n = t.dictionary;
    return n && n.length > 0 && this.dictionaries.set(r.id, n), this;
  }
}
class yt extends re {
  constructor(t) {
    super(), (this._impl = t);
  }
  get closed() {
    return this._impl.closed;
  }
  get schema() {
    return this._impl.schema;
  }
  get autoDestroy() {
    return this._impl.autoDestroy;
  }
  get dictionaries() {
    return this._impl.dictionaries;
  }
  get numDictionaries() {
    return this._impl.numDictionaries;
  }
  get numRecordBatches() {
    return this._impl.numRecordBatches;
  }
  get footer() {
    return this._impl.isFile() ? this._impl.footer : null;
  }
  isSync() {
    return this._impl.isSync();
  }
  isAsync() {
    return this._impl.isAsync();
  }
  isFile() {
    return this._impl.isFile();
  }
  isStream() {
    return this._impl.isStream();
  }
  next() {
    return this._impl.next();
  }
  throw(t) {
    return this._impl.throw(t);
  }
  return(t) {
    return this._impl.return(t);
  }
  cancel() {
    return this._impl.cancel();
  }
  reset(t) {
    return (
      this._impl.reset(t),
      (this._DOMStream = void 0),
      (this._nodeStream = void 0),
      this
    );
  }
  open(t) {
    const r = this._impl.open(t);
    return Pt(r) ? r.then(() => this) : this;
  }
  readRecordBatch(t) {
    return this._impl.isFile() ? this._impl.readRecordBatch(t) : null;
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
  toDOMStream() {
    return it.toDOMStream(
      this.isSync()
        ? { [Symbol.iterator]: () => this }
        : { [Symbol.asyncIterator]: () => this }
    );
  }
  toNodeStream() {
    return it.toNodeStream(
      this.isSync()
        ? { [Symbol.iterator]: () => this }
        : { [Symbol.asyncIterator]: () => this },
      { objectMode: !0 }
    );
  }
  static throughNode(t) {
    throw new Error('"throughNode" not available in this environment');
  }
  static throughDOM(t, r) {
    throw new Error('"throughDOM" not available in this environment');
  }
  static from(t) {
    return t instanceof yt
      ? t
      : Ln(t)
      ? Mf(t)
      : $s(t)
      ? Nf(t)
      : Pt(t)
      ? (async () => await yt.from(await t))()
      : Ws(t) || Jn(t) || Ys(t) || Nt(t)
      ? Uf(new Qt(t))
      : Ef(new Mr(t));
  }
  static readAll(t) {
    return t instanceof yt
      ? t.isSync()
        ? bs(t)
        : ms(t)
      : Ln(t) || ArrayBuffer.isView(t) || bt(t) || Ps(t)
      ? bs(t)
      : ms(t);
  }
}
class Ur extends yt {
  constructor(t) {
    super(t), (this._impl = t);
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  async *[Symbol.asyncIterator]() {
    yield* this[Symbol.iterator]();
  }
}
class Nr extends yt {
  constructor(t) {
    super(t), (this._impl = t);
  }
  [Symbol.iterator]() {
    throw new Error("AsyncRecordBatchStreamReader is not Iterable");
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
}
class Io extends Ur {
  constructor(t) {
    super(t), (this._impl = t);
  }
}
class Df extends Nr {
  constructor(t) {
    super(t), (this._impl = t);
  }
}
class So {
  constructor(t = new Map()) {
    (this.closed = !1),
      (this.autoDestroy = !0),
      (this._dictionaryIndex = 0),
      (this._recordBatchIndex = 0),
      (this.dictionaries = t);
  }
  get numDictionaries() {
    return this._dictionaryIndex;
  }
  get numRecordBatches() {
    return this._recordBatchIndex;
  }
  isSync() {
    return !1;
  }
  isAsync() {
    return !1;
  }
  isFile() {
    return !1;
  }
  isStream() {
    return !1;
  }
  reset(t) {
    return (
      (this._dictionaryIndex = 0),
      (this._recordBatchIndex = 0),
      (this.schema = t),
      (this.dictionaries = new Map()),
      this
    );
  }
  _loadRecordBatch(t, r) {
    return new X(
      this.schema,
      t.length,
      this._loadVectors(t, r, this.schema.fields)
    );
  }
  _loadDictionaryBatch(t, r) {
    const { id: n, isDelta: s, data: a } = t,
      { dictionaries: i, schema: o } = this,
      c = i.get(n);
    if (s || !c) {
      const u = o.dictionaries.get(n);
      return c && s
        ? c.concat(x.new(this._loadVectors(a, r, [u])[0]))
        : x.new(this._loadVectors(a, r, [u])[0]);
    }
    return c;
  }
  _loadVectors(t, r, n) {
    return new xa(r, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
class Vr extends So {
  constructor(t, r) {
    super(r),
      (this._reader = Ln(t)
        ? new oh((this._handle = t))
        : new Ra((this._handle = t)));
  }
  isSync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  cancel() {
    !this.closed &&
      (this.closed = !0) &&
      (this.reset()._reader.return(),
      (this._reader = null),
      (this.dictionaries = null));
  }
  open(t) {
    return (
      this.closed ||
        ((this.autoDestroy = Ao(this, t)),
        this.schema ||
          (this.schema = this._reader.readSchema()) ||
          this.cancel()),
      this
    );
  }
  throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0)
      ? this.reset()._reader.throw(t)
      : $;
  }
  return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0)
      ? this.reset()._reader.return(t)
      : $;
  }
  next() {
    if (this.closed) return $;
    let t,
      { _reader: r } = this;
    for (; (t = this._readNextMessageAndValidate()); )
      if (t.isSchema()) this.reset(t.header());
      else if (t.isRecordBatch()) {
        this._recordBatchIndex++;
        const n = t.header(),
          s = r.readMessageBody(t.bodyLength);
        return { done: !1, value: this._loadRecordBatch(n, s) };
      } else if (t.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const n = t.header(),
          s = r.readMessageBody(t.bodyLength),
          a = this._loadDictionaryBatch(n, s);
        this.dictionaries.set(n.id, a);
      }
    return this.schema && this._recordBatchIndex === 0
      ? (this._recordBatchIndex++, { done: !1, value: new un(this.schema) })
      : this.return();
  }
  _readNextMessageAndValidate(t) {
    return this._reader.readMessage(t);
  }
}
class Rr extends So {
  constructor(t, r) {
    super(r), (this._reader = new ah((this._handle = t)));
  }
  isAsync() {
    return !0;
  }
  isStream() {
    return !0;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async cancel() {
    !this.closed &&
      (this.closed = !0) &&
      (await this.reset()._reader.return(),
      (this._reader = null),
      (this.dictionaries = null));
  }
  async open(t) {
    return (
      this.closed ||
        ((this.autoDestroy = Ao(this, t)),
        this.schema ||
          (this.schema = await this._reader.readSchema()) ||
          (await this.cancel())),
      this
    );
  }
  async throw(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0)
      ? await this.reset()._reader.throw(t)
      : $;
  }
  async return(t) {
    return !this.closed && this.autoDestroy && (this.closed = !0)
      ? await this.reset()._reader.return(t)
      : $;
  }
  async next() {
    if (this.closed) return $;
    let t,
      { _reader: r } = this;
    for (; (t = await this._readNextMessageAndValidate()); )
      if (t.isSchema()) await this.reset(t.header());
      else if (t.isRecordBatch()) {
        this._recordBatchIndex++;
        const n = t.header(),
          s = await r.readMessageBody(t.bodyLength);
        return { done: !1, value: this._loadRecordBatch(n, s) };
      } else if (t.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const n = t.header(),
          s = await r.readMessageBody(t.bodyLength),
          a = this._loadDictionaryBatch(n, s);
        this.dictionaries.set(n.id, a);
      }
    return this.schema && this._recordBatchIndex === 0
      ? (this._recordBatchIndex++, { done: !1, value: new un(this.schema) })
      : await this.return();
  }
  async _readNextMessageAndValidate(t) {
    return await this._reader.readMessage(t);
  }
}
class Bo extends Vr {
  constructor(t, r) {
    super(t instanceof ts ? t : new ts(t), r);
  }
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  isSync() {
    return !0;
  }
  isFile() {
    return !0;
  }
  open(t) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = this._readFooter()).schema;
      for (const r of this._footer.dictionaryBatches())
        r && this._readDictionaryBatch(this._dictionaryIndex++);
    }
    return super.open(t);
  }
  readRecordBatch(t) {
    if (this.closed) return null;
    this._footer || this.open();
    const r = this._footer && this._footer.getRecordBatch(t);
    if (r && this._handle.seek(r.offset)) {
      const n = this._reader.readMessage(j.RecordBatch);
      if (n && n.isRecordBatch()) {
        const s = n.header(),
          a = this._reader.readMessageBody(n.bodyLength);
        return this._loadRecordBatch(s, a);
      }
    }
    return null;
  }
  _readDictionaryBatch(t) {
    const r = this._footer && this._footer.getDictionaryBatch(t);
    if (r && this._handle.seek(r.offset)) {
      const n = this._reader.readMessage(j.DictionaryBatch);
      if (n && n.isDictionaryBatch()) {
        const s = n.header(),
          a = this._reader.readMessageBody(n.bodyLength),
          i = this._loadDictionaryBatch(s, a);
        this.dictionaries.set(s.id, i);
      }
    }
  }
  _readFooter() {
    const { _handle: t } = this,
      r = t.size - Ca,
      n = t.readInt32(r),
      s = t.readAt(r - n, n);
    return $e.decode(s);
  }
  _readNextMessageAndValidate(t) {
    if (
      (this._footer || this.open(),
      this._footer && this._recordBatchIndex < this.numRecordBatches)
    ) {
      const r =
        this._footer && this._footer.getRecordBatch(this._recordBatchIndex);
      if (r && this._handle.seek(r.offset)) return this._reader.readMessage(t);
    }
    return null;
  }
}
class xf extends Rr {
  constructor(t, ...r) {
    const n = typeof r[0] != "number" ? r.shift() : void 0,
      s = r[0] instanceof Map ? r.shift() : void 0;
    super(t instanceof Er ? t : new Er(t, n), s);
  }
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  isFile() {
    return !0;
  }
  isAsync() {
    return !0;
  }
  async open(t) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = await this._readFooter()).schema;
      for (const r of this._footer.dictionaryBatches())
        r && (await this._readDictionaryBatch(this._dictionaryIndex++));
    }
    return await super.open(t);
  }
  async readRecordBatch(t) {
    if (this.closed) return null;
    this._footer || (await this.open());
    const r = this._footer && this._footer.getRecordBatch(t);
    if (r && (await this._handle.seek(r.offset))) {
      const n = await this._reader.readMessage(j.RecordBatch);
      if (n && n.isRecordBatch()) {
        const s = n.header(),
          a = await this._reader.readMessageBody(n.bodyLength);
        return this._loadRecordBatch(s, a);
      }
    }
    return null;
  }
  async _readDictionaryBatch(t) {
    const r = this._footer && this._footer.getDictionaryBatch(t);
    if (r && (await this._handle.seek(r.offset))) {
      const n = await this._reader.readMessage(j.DictionaryBatch);
      if (n && n.isDictionaryBatch()) {
        const s = n.header(),
          a = await this._reader.readMessageBody(n.bodyLength),
          i = this._loadDictionaryBatch(s, a);
        this.dictionaries.set(s.id, i);
      }
    }
  }
  async _readFooter() {
    const { _handle: t } = this;
    t._pending && (await t._pending);
    const r = t.size - Ca,
      n = await t.readInt32(r),
      s = await t.readAt(r - n, n);
    return $e.decode(s);
  }
  async _readNextMessageAndValidate(t) {
    if (
      (this._footer || (await this.open()),
      this._footer && this._recordBatchIndex < this.numRecordBatches)
    ) {
      const r = this._footer.getRecordBatch(this._recordBatchIndex);
      if (r && (await this._handle.seek(r.offset)))
        return await this._reader.readMessage(t);
    }
    return null;
  }
}
class Lf extends Vr {
  constructor(t, r) {
    super(t, r);
  }
  _loadVectors(t, r, n) {
    return new Dl(r, t.nodes, t.buffers, this.dictionaries).visitMany(n);
  }
}
function Ao(e, t) {
  return t && typeof t.autoDestroy == "boolean" ? t.autoDestroy : e.autoDestroy;
}
function* bs(e) {
  const t = yt.from(e);
  try {
    if (!t.open({ autoDestroy: !1 }).closed)
      do yield t;
      while (!t.reset().open().closed);
  } finally {
    t.cancel();
  }
}
async function* ms(e) {
  const t = await yt.from(e);
  try {
    if (!(await t.open({ autoDestroy: !1 })).closed)
      do yield t;
      while (!(await t.reset().open()).closed);
  } finally {
    await t.cancel();
  }
}
function Mf(e) {
  return new Ur(new Lf(e));
}
function Ef(e) {
  const t = e.peek((er + 7) & -8);
  return t && t.byteLength >= 4
    ? _i(t)
      ? new Io(new Bo(e.read()))
      : new Ur(new Vr(e))
    : new Ur(new Vr((function* () {})()));
}
async function Uf(e) {
  const t = await e.peek((er + 7) & -8);
  return t && t.byteLength >= 4
    ? _i(t)
      ? new Io(new Bo(await e.read()))
      : new Nr(new Rr(e))
    : new Nr(new Rr((async function* () {})()));
}
async function Nf(e) {
  const { size: t } = await e.stat(),
    r = new Er(e, t);
  return t >= ch && _i(await r.readAt(0, (er + 7) & -8))
    ? new Df(new xf(r))
    : new Nr(new Rr(r));
}
function Vf(e, t) {
  if (Nt(e)) return Cf(e, t);
  if (bt(e)) return Rf(e, t);
  throw new Error(
    "toDOMStream() must be called with an Iterable or AsyncIterable"
  );
}
function Rf(e, t) {
  let r = null;
  const n = (t && t.type === "bytes") || !1,
    s = (t && t.highWaterMark) || 2 ** 24;
  return new ReadableStream(
    {
      ...t,
      start(i) {
        a(i, r || (r = e[Symbol.iterator]()));
      },
      pull(i) {
        r ? a(i, r) : i.close();
      },
      cancel() {
        ((r && r.return && r.return()) || !0) && (r = null);
      },
    },
    { highWaterMark: n ? s : void 0, ...t }
  );
  function a(i, o) {
    let c,
      u = null,
      d = i.desiredSize || null;
    for (; !(u = o.next(n ? d : null)).done; )
      if (
        (ArrayBuffer.isView(u.value) &&
          (c = D(u.value)) &&
          (d != null && n && (d = d - c.byteLength + 1), (u.value = c)),
        i.enqueue(u.value),
        d != null && --d <= 0)
      )
        return;
    i.close();
  }
}
function Cf(e, t) {
  let r = null;
  const n = (t && t.type === "bytes") || !1,
    s = (t && t.highWaterMark) || 2 ** 24;
  return new ReadableStream(
    {
      ...t,
      async start(i) {
        await a(i, r || (r = e[Symbol.asyncIterator]()));
      },
      async pull(i) {
        r ? await a(i, r) : i.close();
      },
      async cancel() {
        ((r && r.return && (await r.return())) || !0) && (r = null);
      },
    },
    { highWaterMark: n ? s : void 0, ...t }
  );
  async function a(i, o) {
    let c,
      u = null,
      d = i.desiredSize || null;
    for (; !(u = await o.next(n ? d : null)).done; )
      if (
        (ArrayBuffer.isView(u.value) &&
          (c = D(u.value)) &&
          (d != null && n && (d = d - c.byteLength + 1), (u.value = c)),
        i.enqueue(u.value),
        d != null && --d <= 0)
      )
        return;
    i.close();
  }
}
function kf(e) {
  return new jf(e);
}
class jf {
  constructor(t) {
    (this._numChunks = 0), (this._finished = !1), (this._bufferedSize = 0);
    const {
      ["readableStrategy"]: r,
      ["writableStrategy"]: n,
      ["queueingStrategy"]: s = "count",
      ...a
    } = t;
    (this._controller = null),
      (this._builder = W.new(a)),
      (this._getSize = s !== "bytes" ? gs : _s);
    const { ["highWaterMark"]: i = s === "bytes" ? 2 ** 14 : 1e3 } = { ...r },
      { ["highWaterMark"]: o = s === "bytes" ? 2 ** 14 : 1e3 } = { ...n };
    (this.readable = new ReadableStream(
      {
        cancel: () => {
          this._builder.clear();
        },
        pull: (c) => {
          this._maybeFlush(this._builder, (this._controller = c));
        },
        start: (c) => {
          this._maybeFlush(this._builder, (this._controller = c));
        },
      },
      { highWaterMark: i, size: s !== "bytes" ? gs : _s }
    )),
      (this.writable = new WritableStream(
        {
          abort: () => {
            this._builder.clear();
          },
          write: () => {
            this._maybeFlush(this._builder, this._controller);
          },
          close: () => {
            this._maybeFlush(this._builder.finish(), this._controller);
          },
        },
        { highWaterMark: o, size: (c) => this._writeValueAndReturnChunkSize(c) }
      ));
  }
  _writeValueAndReturnChunkSize(t) {
    const r = this._bufferedSize;
    return (
      (this._bufferedSize = this._getSize(this._builder.append(t))),
      this._bufferedSize - r
    );
  }
  _maybeFlush(t, r) {
    r !== null &&
      (this._bufferedSize >= r.desiredSize &&
        ++this._numChunks &&
        this._enqueue(r, t.toVector()),
      t.finished &&
        ((t.length > 0 || this._numChunks === 0) &&
          ++this._numChunks &&
          this._enqueue(r, t.toVector()),
        !this._finished && (this._finished = !0) && this._enqueue(r, null)));
  }
  _enqueue(t, r) {
    (this._bufferedSize = 0),
      (this._controller = null),
      r === null ? t.close() : t.enqueue(r);
  }
}
const gs = (e) => e.length,
  _s = (e) => e.byteLength;
function zf(e, t) {
  const r = new Ue();
  let n = null;
  const s = new ReadableStream({
    async cancel() {
      await r.close();
    },
    async start(o) {
      await i(o, n || (n = await a()));
    },
    async pull(o) {
      n ? await i(o, n) : o.close();
    },
  });
  return {
    writable: new WritableStream(r, { highWaterMark: 2 ** 14, ...e }),
    readable: s,
  };
  async function a() {
    return await (await yt.from(r)).open(t);
  }
  async function i(o, c) {
    let u = o.desiredSize,
      d = null;
    for (; !(d = await c.next()).done; )
      if ((o.enqueue(d.value), u != null && --u <= 0)) return;
    o.close();
  }
}
function Pf(e, t) {
  const r = new this(e),
    n = new Qt(r),
    s = new ReadableStream(
      {
        type: "bytes",
        async cancel() {
          await n.cancel();
        },
        async pull(i) {
          await a(i);
        },
        async start(i) {
          await a(i);
        },
      },
      { highWaterMark: 2 ** 14, ...t }
    );
  return { writable: new WritableStream(r, e), readable: s };
  async function a(i) {
    let o = null,
      c = i.desiredSize;
    for (; (o = await n.read(c || null)); )
      if ((i.enqueue(o), c != null && (c -= o.byteLength) <= 0)) return;
    i.close();
  }
}
class fe {
  eq(t) {
    return t instanceof fe || (t = new de(t)), new $f(this, t);
  }
  le(t) {
    return t instanceof fe || (t = new de(t)), new Wf(this, t);
  }
  ge(t) {
    return t instanceof fe || (t = new de(t)), new Yf(this, t);
  }
  lt(t) {
    return new br(this.ge(t));
  }
  gt(t) {
    return new br(this.le(t));
  }
  ne(t) {
    return new br(this.eq(t));
  }
}
class de extends fe {
  constructor(t) {
    super(), (this.v = t);
  }
}
class To extends fe {
  constructor(t) {
    super(), (this.name = t);
  }
  bind(t) {
    if (!this.colidx) {
      this.colidx = -1;
      const n = t.schema.fields;
      for (let s = -1; ++s < n.length; )
        if (n[s].name === this.name) {
          this.colidx = s;
          break;
        }
      if (this.colidx < 0) throw new Error(`Failed to bind Col "${this.name}"`);
    }
    const r = (this.vector = t.getChildAt(this.colidx));
    return (n) => r.get(n);
  }
}
class Ui {
  and(...t) {
    return new Ri(this, ...t);
  }
  or(...t) {
    return new Ci(this, ...t);
  }
  not() {
    return new br(this);
  }
}
class Ni extends Ui {
  constructor(t, r) {
    super(), (this.left = t), (this.right = r);
  }
  bind(t) {
    return this.left instanceof de
      ? this.right instanceof de
        ? this._bindLitLit(t, this.left, this.right)
        : this._bindLitCol(t, this.left, this.right)
      : this.right instanceof de
      ? this._bindColLit(t, this.left, this.right)
      : this._bindColCol(t, this.left, this.right);
  }
}
class Vi extends Ui {
  constructor(...t) {
    super(), (this.children = t);
  }
}
Vi.prototype.children = Object.freeze([]);
class Ri extends Vi {
  constructor(...t) {
    (t = t.reduce((r, n) => r.concat(n instanceof Ri ? n.children : n), [])),
      super(...t);
  }
  bind(t) {
    const r = this.children.map((n) => n.bind(t));
    return (n, s) => r.every((a) => a(n, s));
  }
}
class Ci extends Vi {
  constructor(...t) {
    (t = t.reduce((r, n) => r.concat(n instanceof Ci ? n.children : n), [])),
      super(...t);
  }
  bind(t) {
    const r = this.children.map((n) => n.bind(t));
    return (n, s) => r.some((a) => a(n, s));
  }
}
class $f extends Ni {
  _bindLitLit(t, r, n) {
    const s = r.v == n.v;
    return () => s;
  }
  _bindColCol(t, r, n) {
    const s = r.bind(t),
      a = n.bind(t);
    return (i, o) => s(i, o) == a(i, o);
  }
  _bindColLit(t, r, n) {
    const s = r.bind(t);
    if (r.vector instanceof Fi) {
      let a;
      const i = r.vector;
      return (
        i.dictionary !== this.lastDictionary
          ? ((a = i.reverseLookup(n.v)),
            (this.lastDictionary = i.dictionary),
            (this.lastKey = a))
          : (a = this.lastKey),
        a === -1 ? () => !1 : (o) => i.getKey(o) === a
      );
    } else return (a, i) => s(a, i) == n.v;
  }
  _bindLitCol(t, r, n) {
    return this._bindColLit(t, n, r);
  }
}
class Wf extends Ni {
  _bindLitLit(t, r, n) {
    const s = r.v <= n.v;
    return () => s;
  }
  _bindColCol(t, r, n) {
    const s = r.bind(t),
      a = n.bind(t);
    return (i, o) => s(i, o) <= a(i, o);
  }
  _bindColLit(t, r, n) {
    const s = r.bind(t);
    return (a, i) => s(a, i) <= n.v;
  }
  _bindLitCol(t, r, n) {
    const s = n.bind(t);
    return (a, i) => r.v <= s(a, i);
  }
}
class Yf extends Ni {
  _bindLitLit(t, r, n) {
    const s = r.v >= n.v;
    return () => s;
  }
  _bindColCol(t, r, n) {
    const s = r.bind(t),
      a = n.bind(t);
    return (i, o) => s(i, o) >= a(i, o);
  }
  _bindColLit(t, r, n) {
    const s = r.bind(t);
    return (a, i) => s(a, i) >= n.v;
  }
  _bindLitCol(t, r, n) {
    const s = n.bind(t);
    return (a, i) => r.v >= s(a, i);
  }
}
class br extends Ui {
  constructor(t) {
    super(), (this.child = t);
  }
  bind(t) {
    const r = this.child.bind(t);
    return (n, s) => !r(n, s);
  }
}
E.prototype.countBy = function (e) {
  return new ir(this.chunks).countBy(e);
};
E.prototype.scan = function (e, t) {
  return new ir(this.chunks).scan(e, t);
};
E.prototype.scanReverse = function (e, t) {
  return new ir(this.chunks).scanReverse(e, t);
};
E.prototype.filter = function (e) {
  return new ir(this.chunks).filter(e);
};
class ir extends E {
  filter(t) {
    return new ki(this.chunks, t);
  }
  scan(t, r) {
    const n = this.chunks,
      s = n.length;
    for (let a = -1; ++a < s; ) {
      const i = n[a];
      r && r(i);
      for (let o = -1, c = i.length; ++o < c; ) t(o, i);
    }
  }
  scanReverse(t, r) {
    const n = this.chunks,
      s = n.length;
    for (let a = s; --a >= 0; ) {
      const i = n[a];
      r && r(i);
      for (let o = i.length; --o >= 0; ) t(o, i);
    }
  }
  countBy(t) {
    const r = this.chunks,
      n = r.length,
      s = typeof t == "string" ? new To(t) : t;
    s.bind(r[n - 1]);
    const a = s.vector;
    if (!A.isDictionary(a.type))
      throw new Error(
        "countBy currently only supports dictionary-encoded columns"
      );
    const i = Math.ceil(Math.log(a.length) / Math.log(256)),
      o = i == 4 ? Uint32Array : i >= 2 ? Uint16Array : Uint8Array,
      c = new o(a.dictionary.length);
    for (let u = -1; ++u < n; ) {
      const d = r[u];
      s.bind(d);
      const y = s.vector.indices;
      for (let F = -1, M = d.length; ++F < M; ) {
        let vt = y.get(F);
        vt !== null && c[vt]++;
      }
    }
    return new Fo(a.dictionary, wt.from(c));
  }
}
class Fo extends E {
  constructor(t, r) {
    const n = new R([new L("values", t.type), new L("counts", r.type)]);
    super(new X(n, r.length, [t, r]));
  }
  toJSON() {
    const t = this.getColumnAt(0),
      r = this.getColumnAt(1),
      n = {};
    for (let s = -1; ++s < this.length; ) n[t.get(s)] = r.get(s);
    return n;
  }
}
class ki extends ir {
  constructor(t, r) {
    super(t), (this._predicate = r);
  }
  scan(t, r) {
    const n = this._chunks,
      s = n.length;
    for (let a = -1; ++a < s; ) {
      const i = n[a],
        o = this._predicate.bind(i);
      let c = !1;
      for (let u = -1, d = i.length; ++u < d; )
        o(u, i) && (r && !c && (r(i), (c = !0)), t(u, i));
    }
  }
  scanReverse(t, r) {
    const n = this._chunks,
      s = n.length;
    for (let a = s; --a >= 0; ) {
      const i = n[a],
        o = this._predicate.bind(i);
      let c = !1;
      for (let u = i.length; --u >= 0; )
        o(u, i) && (r && !c && (r(i), (c = !0)), t(u, i));
    }
  }
  count() {
    let t = 0;
    const r = this._chunks,
      n = r.length;
    for (let s = -1; ++s < n; ) {
      const a = r[s],
        i = this._predicate.bind(a);
      for (let o = -1, c = a.length; ++o < c; ) i(o, a) && ++t;
    }
    return t;
  }
  *[Symbol.iterator]() {
    const t = this._chunks,
      r = t.length;
    for (let n = -1; ++n < r; ) {
      const s = t[n],
        a = this._predicate.bind(s);
      for (let i = -1, o = s.length; ++i < o; ) a(i, s) && (yield s.get(i));
    }
  }
  filter(t) {
    return new ki(this._chunks, this._predicate.and(t));
  }
  countBy(t) {
    const r = this._chunks,
      n = r.length,
      s = typeof t == "string" ? new To(t) : t;
    s.bind(r[n - 1]);
    const a = s.vector;
    if (!A.isDictionary(a.type))
      throw new Error(
        "countBy currently only supports dictionary-encoded columns"
      );
    const i = Math.ceil(Math.log(a.length) / Math.log(256)),
      o = i == 4 ? Uint32Array : i >= 2 ? Uint16Array : Uint8Array,
      c = new o(a.dictionary.length);
    for (let u = -1; ++u < n; ) {
      const d = r[u],
        y = this._predicate.bind(d);
      s.bind(d);
      const F = s.vector.indices;
      for (let M = -1, vt = d.length; ++M < vt; ) {
        let sr = F.get(M);
        sr !== null && y(M, d) && c[sr]++;
      }
    }
    return new Fo(a.dictionary, wt.from(c));
  }
}
it.toDOMStream = Vf;
W.throughDOM = kf;
yt.throughDOM = zf;
vi.throughDOM = Pf;
/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ws = (function () {
  function e(t, r, n, s) {
    var a = this;
    (this.getCell = function (i, o) {
      var c = i < a.headerRows && o < a.headerColumns,
        u = i >= a.headerRows && o < a.headerColumns,
        d = i < a.headerRows && o >= a.headerColumns;
      if (c) {
        var y = ["blank"];
        return (
          o > 0 && y.push("level" + i),
          { type: "blank", classNames: y.join(" "), content: "" }
        );
      } else if (d) {
        var F = o - a.headerColumns,
          y = ["col_heading", "level" + i, "col" + F];
        return {
          type: "columns",
          classNames: y.join(" "),
          content: a.getContent(a.columnsTable, F, i),
        };
      } else if (u) {
        var M = i - a.headerRows,
          y = ["row_heading", "level" + o, "row" + M];
        return {
          type: "index",
          id: "T_" + a.uuid + "level" + o + "_row" + M,
          classNames: y.join(" "),
          content: a.getContent(a.indexTable, M, o),
        };
      } else {
        var M = i - a.headerRows,
          F = o - a.headerColumns,
          y = ["data", "row" + M, "col" + F],
          vt = a.styler
            ? a.getContent(a.styler.displayValuesTable, M, F)
            : a.getContent(a.dataTable, M, F);
        return {
          type: "data",
          id: "T_" + a.uuid + "row" + M + "_col" + F,
          classNames: y.join(" "),
          content: vt,
        };
      }
    }),
      (this.getContent = function (i, o, c) {
        var u = i.getColumnAt(c);
        if (u === null) return "";
        var d = a.getColumnTypeId(i, c);
        switch (d) {
          case l.Timestamp:
            return a.nanosToDate(u.get(o));
          default:
            return u.get(o);
        }
      }),
      (this.dataTable = E.from(t)),
      (this.indexTable = E.from(r)),
      (this.columnsTable = E.from(n)),
      (this.styler = s
        ? {
            caption: s.caption,
            displayValuesTable: E.from(s.displayValues),
            styles: s.styles,
            uuid: s.uuid,
          }
        : void 0);
  }
  return (
    Object.defineProperty(e.prototype, "rows", {
      get: function () {
        return this.indexTable.length + this.columnsTable.numCols;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "columns", {
      get: function () {
        return this.indexTable.numCols + this.columnsTable.length;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "headerRows", {
      get: function () {
        return this.rows - this.dataRows;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "headerColumns", {
      get: function () {
        return this.columns - this.dataColumns;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "dataRows", {
      get: function () {
        return this.dataTable.length;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "dataColumns", {
      get: function () {
        return this.dataTable.numCols;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "uuid", {
      get: function () {
        return this.styler && this.styler.uuid;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "caption", {
      get: function () {
        return this.styler && this.styler.caption;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "styles", {
      get: function () {
        return this.styler && this.styler.styles;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "table", {
      get: function () {
        return this.dataTable;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "index", {
      get: function () {
        return this.indexTable;
      },
      enumerable: !0,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "columnTable", {
      get: function () {
        return this.columnsTable;
      },
      enumerable: !0,
      configurable: !0,
    }),
    (e.prototype.serialize = function () {
      return {
        data: this.dataTable.serialize(),
        index: this.indexTable.serialize(),
        columns: this.columnsTable.serialize(),
      };
    }),
    (e.prototype.getColumnTypeId = function (t, r) {
      return t.schema.fields[r].type.typeId;
    }),
    (e.prototype.nanosToDate = function (t) {
      return new Date(t / 1e6);
    }),
    e
  );
})();
/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ne =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Ne =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) {
              t = arguments[r];
              for (var s in t)
                Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
            }
            return e;
          }),
        Ne.apply(this, arguments)
      );
    },
  Ve;
(function (e) {
  (e.COMPONENT_READY = "streamlit:componentReady"),
    (e.SET_COMPONENT_VALUE = "streamlit:setComponentValue"),
    (e.SET_FRAME_HEIGHT = "streamlit:setFrameHeight");
})(Ve || (Ve = {}));
var ee = (function () {
    function e() {}
    return (
      (e.API_VERSION = 1),
      (e.RENDER_EVENT = "streamlit:render"),
      (e.events = new zt()),
      (e.registeredMessageListener = !1),
      (e.setComponentReady = function () {
        e.registeredMessageListener ||
          (window.addEventListener("message", e.onMessageEvent),
          (e.registeredMessageListener = !0)),
          e.sendBackMsg(Ve.COMPONENT_READY, { apiVersion: e.API_VERSION });
      }),
      (e.setFrameHeight = function (t) {
        // Set default height to 500 pixels if 't' is undefined
        t === void 0 && (t = 500);
        
        // Check if the new height is different from the last recorded height
        if (t !== e.lastFrameHeight) {
          // Update the last frame height with the new height
          e.lastFrameHeight = t;
          // Send a message with the new frame height
          e.sendBackMsg(Ve.SET_FRAME_HEIGHT, { height: t });
        }
      }),
      (e.setComponentValue = function (t) {
        var r;
        t instanceof ws
          ? ((r = "dataframe"), (t = t.serialize()))
          : Kf(t)
          ? ((r = "bytes"), (t = new Uint8Array(t.buffer)))
          : t instanceof ArrayBuffer
          ? ((r = "bytes"), (t = new Uint8Array(t)))
          : (r = "json"),
          e.sendBackMsg(Ve.SET_COMPONENT_VALUE, { value: t, dataType: r });
      }),
      (e.onMessageEvent = function (t) {
        var r = t.data.type;
        switch (r) {
          case e.RENDER_EVENT:
            e.onRenderMessage(t.data);
            break;
        }
      }),
      (e.onRenderMessage = function (t) {
        var r = t.args;
        r == null &&
          (console.error(
            "Got null args in onRenderMessage. This should never happen"
          ),
          (r = {}));
        var n = t.dfs && t.dfs.length > 0 ? e.argsDataframeToObject(t.dfs) : {};
        r = Ne(Ne({}, r), n);
        var s = !!t.disabled,
          a = t.theme;
        a && Hf(a);
        var i = { disabled: s, args: r, theme: a },
          o = new CustomEvent(e.RENDER_EVENT, { detail: i });
        e.events.dispatchEvent(o);
      }),
      (e.argsDataframeToObject = function (t) {
        var r = t.map(function (n) {
          var s = n.key,
            a = n.value;
          return [s, e.toArrowTable(a)];
        });
        return Object.fromEntries(r);
      }),
      (e.toArrowTable = function (t) {
        var r = t.data,
          n = r.data,
          s = r.index,
          a = r.columns,
          i = r.styler;
        return new ws(n, s, a, i);
      }),
      (e.sendBackMsg = function (t, r) {
        window.parent.postMessage(
          Ne({ isStreamlitMessage: !0, type: t }, r),
          "*"
        );
      }),
      e
    );
  })(),
  Hf = function (e) {
    var t = document.createElement("style");
    document.head.appendChild(t),
      (t.innerHTML =
        `
    :root {
      --primary-color: ` +
        e.primaryColor +
        `;
      --background-color: ` +
        e.backgroundColor +
        `;
      --secondary-background-color: ` +
        e.secondaryBackgroundColor +
        `;
      --text-color: ` +
        e.textColor +
        `;
      --font: ` +
        e.font +
        `;
    }

    body {
      background-color: var(--background-color);
      color: var(--text-color);
    }
  `);
  };
function Kf(e) {
  var t = !1;
  try {
    t = e instanceof BigInt64Array || e instanceof BigUint64Array;
  } catch {}
  return (
    e instanceof Int8Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Int16Array ||
    e instanceof Uint16Array ||
    e instanceof Int32Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array ||
    t
  );
}
/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Jf =
  (globalThis && globalThis.__extends) ||
  (function () {
    var e = function (t, r) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (n, s) {
              n.__proto__ = s;
            }) ||
          function (n, s) {
            for (var a in s) s.hasOwnProperty(a) && (n[a] = s[a]);
          }),
        e(t, r)
      );
    };
    return function (t, r) {
      e(t, r);
      function n() {
        this.constructor = t;
      }
      t.prototype =
        r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
    };
  })();
(function (e) {
  Jf(t, e);
  function t() {
    return (e !== null && e.apply(this, arguments)) || this;
  }
  return (
    (t.prototype.componentDidMount = function () {
      ee.setFrameHeight();
    }),
    (t.prototype.componentDidUpdate = function () {
      ee.setFrameHeight();
    }),
    t
  );
})(sc.PureComponent);
function Gf(e) {
  const t = e.detail;
  window.seqviz
    .Viewer("root", {
      name: t.args.name,
      seq: t.args.seq,
      style: t.args.style,
      annotations: t.args.annotations,
      highlights: t.args.highlights,
      enzymes: t.args.enzymes,
    })
    .render(),
    ee.setFrameHeight();
}
ee.events.addEventListener(ee.RENDER_EVENT, Gf);
ee.setComponentReady();