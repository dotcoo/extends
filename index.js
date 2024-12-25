// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

'use strict';

/* eslint-disable no-extend-native */

// ====== 扩展 ======

function ObjectAssign0(o = { array: false }, a = {}, ...args) {
  const merge = (a, b) => {
    const at = Object.prototype.toString.call(a), bt = Object.prototype.toString.call(b);
    if (at !== bt) {
      return b;
    } else if (at === '[object Array]') {
      return o.array ? a.concat(...b) : b;
    } else if (at === '[object Object]') {
      for (const k in b) {
        a[k] = merge(a[k], b[k]);
      }
      return a;
    } else {
      return b;
    }
  };
  for (const b of args) {
    a = merge(a, b);
  }
  return a;
}

Object.defineProperties(Object, {
  isObject: {
    value: function(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign0: {
    value: function(a = {}, ...args) {
      return ObjectAssign0({ array: false }, a, ...args)
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign1: {
    value: function(a = {}, ...argss) {
      return ObjectAssign0({ array: true }, a, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Object.prototype, {
  length0: {
    value: function() {
      return Object.keys(this).length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries0: {
    value: function() {
      return Object.entries(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  keys0: {
    value: function() {
      return Object.keys(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  values0: {
    value: function() {
      return Object.values(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  clone0: {
    value: function() {
      return JSON.parse(JSON.stringify(this)); // return structuredClone(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign0: {
    value: function(...args) {
      return this.constructor.assign0(this, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  map0: {
    value: function(cb = (k, v, i) => [k, v], i = 0) {
      return Object.entries(this).map(([k, v]) => cb(k, v, i++));
    },
    enumerable: false, configurable: true, writable: true,
  },
  pick0: {
    value: function(...keys) {
      const o = {};
      for (const k of keys) {
        o[k] = this[k];
      }
      return o;
    },
    enumerable: false, configurable: true, writable: true,
  },
  omit0: {
    value: function(...keys) {
      const o = {}, s = new Set(keys);
      for (const k in this) {
        if (!s.has(k)) { o[k] = this[k]; }
      }
      return o;
    },
    enumerable: false, configurable: true, writable: true,
  },
  attr0: {
    value: function(name, ...args) {
      return typeof this != 'object' ? this : typeof name == 'function' ? name(this, ...args) : this[name];
    },
    enumerable: false, configurable: true, writable: true,
  },
  log0: {
    value: function(...args) {
      console.log(...args, this);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  debug0: {
    value: function(...args) {
      console.debug(...args, this);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  // ====== Tree ======
  getParents0: {
    value: function(self = false, depth = -1, parent = 'parent') {
      const ps = self ? [this] : [];
      for (let p = this[parent], i = depth; i != 0 && p; i--) {
        ps.push(p);
        p = p[parent];
      }
      return ps;
    },
    enumerable: false, configurable: true, writable: true,
  },
  getChildrens0: {
    value: function(self = false, depth = -1, children = 'children') {
      this[children] = this[children] || [];
      const cs = self ? [this] : [];
      if (depth == 0) { return cs; }
      for (const c of this[children]) {
        cs.push(...c.getChildrens0(true, depth - 1, children));
      }
      return cs;
    },
    enumerable: false, configurable: true, writable: true,
  },
  treeFind0: {
    value: function(cb, self = false, depth = -1, children = 'children') {
      if (self && depth != 0 && cb(this)) { return this; }
      for (const v of this[children] ?? []) {
        const c = v.treeFind0(cb, true, depth - 1, children);
        if (c) { return c; }
      }
      return null;
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Number.prototype, {
  ceil: {
    value: function() {
      return Math.ceil(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  floor: {
    value: function() {
      return Math.floor(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  round: {
    value: function(precision = 0) {
      return precision == 0 ? Math.round(this) : Math.round(this * 10 ** precision) / 10 ** precision;
    },
    enumerable: false, configurable: true, writable: true,
  },
  trunc: {
    value: function() {
      return Math.trunc(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  abs: {
    value: function() {
      return Math.abs(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  max: {
    value: function(...args) {
      return Math.max(this, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  min: {
    value: function(...args) {
      return Math.min(this, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  b64: {
    value: function() {
      let s = '', n = this, cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      while (n > 0) {
        s = cs.at(n % 64) + s;
        n = Math.floor(n / 64);
      }
      return s;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toFixed0: {
    value: function(...args) {
      return +this.toFixed(...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  toDate: {
    value: function() {
      return Date.new(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(String.prototype, {
  length0: {
    value: function() {
      return this.length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  substring0: {
    value: function(s = 0, e = this.length) {
      s = s >= 0 ? s : this.length + s;
      e = e >= 0 ? e : this.length + e;
      return this.substring(s, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  substr0: {
    value: function(s = 0, e = this.length) {
      s = s >= 0 ? s : this.length + s;
      e = s + e;
      return this.substring(s, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  split0: {
    value: function(s = ',', n = -1) {
      const a = this ? this.split(s) : [];
      return n === -1 ? a : a.push0(a.splice(n-1).join(s));
    },
    enumerable: false, configurable: true, writable: true,
  },
  splitNumber: {
    value: function(s = ',') {
      return this.split0(s).map(v => +v);
    },
    enumerable: false, configurable: true, writable: true,
  },
  splitSegment: {
    value: function(n = 1) {
      const a = [];
      for (let i = 0; i < this.length; i += n) {
        a.push(this.substring(i, n));
      }
      return a;
    },
    enumerable: false, configurable: true, writable: true,
  },
  sprintf: {
    value: function(...args) {
      let [s, ...f] = this.split(/%[sd]/);
      for (let i=0; i < f.length; i++) {
        s += args[i]+f[i];
      }
      return s;
    },
    enumerable: false, configurable: true, writable: true,
  },
  subOf: {
    value: function(begin, end, n = 0, position = 0) {
      for (let i = 0; i < n && position != -1; i++, position++) { position = this.indexOf(begin, position); }
      let b = this.indexOf(begin, position);
      let e = this.indexOf(end, b);
      if (b == -1 || e == -1) { return ''; }
      b += begin.length;
      return this.substring(b, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  lastSubOf: {
    value: function(begin, end, n = 0, position = Infinity) {
      for (let i = 0; i < n && position != -1; i++, position--) { position = this.lastIndexOf(begin, position); }
      let b = this.lastIndexOf(begin, position);
      let e = this.indexOf(end, b);
      if (b == -1 || e == -1) { return ''; }
      b += begin.length;
      return this.substring(b, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  camel2under: {
    value: function() {
      return this.substr(0, 1).toLowerCase() + this.substr(1).replace(/([A-Z])/g, (_, v) => '_' + v.toLowerCase());
    },
    enumerable: false, configurable: true, writable: true,
  },
  under2camel: {
    value: function() {
      return this.replace(/_([a-z])/g, (_, v) => v.toUpperCase());
    },
    enumerable: false, configurable: true, writable: true,
  },
  camel2pascal: {
    value: function() {
      return this.substr(0, 1).toUpperCase() + this.substr(1);
    },
    enumerable: false, configurable: true, writable: true,
  },
  pascal2camel: {
    value: function() {
      return this.substr(0, 1).toLowerCase() + this.substr(1);
    },
    enumerable: false, configurable: true, writable: true,
  },
  under2kebab: {
    value: function() {
      return this.replace(/_/g, '-');
    },
    enumerable: false, configurable: true, writable: true,
  },
  kebab2under: {
    value: function() {
      return this.replace(/-/g, '_');
    },
    enumerable: false, configurable: true, writable: true,
  },
  b64: {
    value: function() {
      let n = 0, cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      for (let i = 0; i < this.length; i++) {
        n = n * 64 + cs.indexOf(this.at(i));
      }
      return n;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toFixed0: {
    value: function(...args) {
      return +(+this).toFixed(...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  toDate: {
    value: function() {
      return Date.new(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  hex2bytes: {
    value: function() {
      const bytes = [];
      for (let i = 0; i < this.length; i += 2) {
        bytes.push(Number.parseInt(this.substring(i, i+2), 16));
      }
      return bytes;
    },
    enumerable: false, configurable: true, writable: true,
  },
  string2bytes: {
    value: function() {
      const bytes = [], e = encodeURIComponent(this);
      for (let i = 0; i < e.length;) {
        bytes.push(e.charAt(i) == '%' ? Number.parseInt(e.substring(i+1, i+=3), 16) : e.charCodeAt(i++));
      }
      return bytes;
    },
    enumerable: false, configurable: true, writable: true,
  },
  base64decode: {
    value: function(url) {
      const bytes = [], maps = {}, chars = url === true ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (let i = 0; i < chars.length; i++) { maps[chars.charAt(i)] = i; }
      const l =  this.charAt(this.length - 1) != '=' ? this.length : this.charAt(this.length - 2) != '=' ? this.length - 1 : this.length - 2;
      for (let i = 3; i < l; i += 4) {
        const n = (maps[this.charAt(i-3)] << 18) + (maps[this.charAt(i-2)] << 12) + (maps[this.charAt(i-1)] << 6) + maps[this.charAt(i)];
        bytes.push((n & 0xFF0000) >> 16, (n & 0xFF00) >> 8, n & 0xFF);
      }
      if (l % 4 == 3) {
        const n = (maps[this.charAt(l-3)] << 18) + (maps[this.charAt(l-2)] << 12) + (maps[this.charAt(l-1)] << 6);
        bytes.push((n & 0xFF0000) >> 16, (n & 0xFF00) >> 8);
      } else if (l % 4 == 2) {
        const n = (maps[this.charAt(l-3)] << 18) + (maps[this.charAt(l-2)] << 12);
        bytes.push((n & 0xFF0000) >> 16);
      }
      return bytes;
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Array.prototype, {
  length0: {
    value: function() {
      return this.length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries0: {
    value: function() {
      return this.entries();
    },
    enumerable: false, configurable: true, writable: true,
  },
  push0: {
    value: function(...args) {
      this.push(...args);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  push1: {
    value: function(...args) {
      this.push(...args);
      return args[0];
    },
    enumerable: false, configurable: true, writable: true,
  },
  push3: {
    value: function(...args) {
      this.push(...args);
      return args;
    },
    enumerable: false, configurable: true, writable: true,
  },
  pop0: {
    value: function(...args) {
      this.pop(...args);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  pop1: {
    value: function(...args) {
      this.pop(...args);
      return args[0];
    },
    enumerable: false, configurable: true, writable: true,
  },
  pop3: {
    value: function(...args) {
      this.pop(...args);
      return args;
    },
    enumerable: false, configurable: true, writable: true,
  },
  unshift0: {
    value: function(...args) {
      this.unshift(...args);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  unshift1: {
    value: function(...args) {
      this.unshift(...args);
      return args[0];
    },
    enumerable: false, configurable: true, writable: true,
  },
  unshift3: {
    value: function(...args) {
      this.unshift(...args);
      return args;
    },
    enumerable: false, configurable: true, writable: true,
  },
  shift0: {
    value: function(...args) {
      this.shift(...args);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  shift1: {
    value: function(...args) {
      this.shift(...args);
      return args[0];
    },
    enumerable: false, configurable: true, writable: true,
  },
  shift3: {
    value: function(...args) {
      this.shift(...args);
      return args;
    },
    enumerable: false, configurable: true, writable: true,
  },
  first: {
    value: function(defval = null) {
      return this.length ? this[0] : defval;
    },
    enumerable: false, configurable: true, writable: true,
  },
  last: {
    value: function(defval = null) {
      return this.length ? this[this.length - 1] : defval;
    },
    enumerable: false, configurable: true, writable: true,
  },
  find0: {
    value: function(cb, defval = null) {
      return this.find(cb) ?? defval;
    },
    enumerable: false, configurable: true, writable: true,
  },
  equals: {
    value: function(a) {
      return this.length === a.length && (this === a || this.length === 0 || this.every((v, i) => v === a[i]));
    },
    enumerable: false, configurable: true, writable: true,
  },
  unique: {
    value: function(cb = v => v) {
      const s = new Set();
      return this.filter(v => s.has(cb(v)) ? false : !!s.add(cb(v)));
    },
    enumerable: false, configurable: true, writable: true,
  },
  each: {
    value: function(cb) {
      this.forEach(cb);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toObject: {
    value: function(cb = (v, i) => [i, v]) {
      return Object.fromEntries(this.map(cb));
    },
    enumerable: false, configurable: true, writable: true,
  },
  toMap: {
    value: function(cb = (v, i) => [i, v]) {
      return new Map(this.map(cb));
    },
    enumerable: false, configurable: true, writable: true,
  },
  toSet: {
    value: function() {
      return new Set(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  toGroup: {
    value: function(cb = v => [v.id, v]) {
      const o = {};
      for (const e of this) {
        const [k, v] = cb(e);
        if (!(k in o)) { o[k] = []; }
        o[k].push(v);
      }
      return o;
    },
    enumerable: false, configurable: true, writable: true,
  },
  bytes2hex: {
    value: function() {
      let s = '';
      for (let i = 0; i < this.length; i++) {
        s += (this[i] < 16 ? '0' : '') + this[i].toString(16);
      }
      return decodeURIComponent(s);
    },
    enumerable: false, configurable: true, writable: true,
  },
  bytes2string: {
    value: function() {
      let s = '';
      for (let i = 0; i < this.length; i++) {
        s += '%' + (this[i] < 16 ? '0' : '') + this[i].toString(16);
      }
      return decodeURIComponent(s);
    },
    enumerable: false, configurable: true, writable: true,
  },
  base64encode: {
    value: function(url, equal) {
      let b64 = '', maps = {}, chars = url === true ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (let i = 0; i < chars.length; i++) { maps[chars.charAt(i)] = i; }
      for (let i = 2; i < this.length; i += 3) {
        const n = (this[i-2] << 16) + (this[i-1] << 8) + this[i];
        b64 += chars.charAt((n & 0xFC0000) >> 18) + chars.charAt((n & 0x3F000) >> 12) + chars.charAt((n & 0xFC0) >> 6) + chars.charAt(n & 0x3F);
      }
      if (this.length % 3 == 2) {
        const n = (this[this.length-2] << 16) + (this[this.length-1] << 8);
        b64 += chars.charAt((n & 0xFC0000) >> 18) + chars.charAt((n & 0x3F000) >> 12) + chars.charAt((n & 0xFC0) >> 6) + (equal === false ? '' : '=');
      } else if (this.length % 3 == 1) {
        const n = this[this.length-1] << 16;
        b64 += chars.charAt((n & 0xFC0000) >> 18) + chars.charAt((n & 0x3F000) >> 12) + (equal === false ? '' : '==');
      }
      return b64;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toUint8Array: {
    value: function() {
      return new Uint8Array(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  // ====== Relational ======
  assoc: {
    value: function(id, prop, assoc = {}) {
      const ids = this.unique(v => v[id]);
      const o = ids.length == 0 ? {} : typeof assoc == 'function' ? assoc(ids) : assoc;
      return this.each(v => v[prop] = o[v[id]] ?? null);
    },
    enumerable: false, configurable: true, writable: true,
  },
  // ====== Tree ======
  toTreeRecursion: {
    value: function(r = null, p = null, o = {}) {
      const c = [], { id = 'id', pid = 'pid', level = 'level', parent = 'parent', children = 'children', root = 'root', empty = null } = o;
      for (const v of this) {
        if (v[pid] !== (p?.[id] ?? 0)) { continue; }
        Object.defineProperties(v, {
          [root]: { value: r, enumerable: false, configurable: true, writable: true },
          [parent]: { value: p, enumerable: false, configurable: true, writable: true },
        });
        v[level] = (p?.[level] ?? -1) + 1;
        v[children] = this.toTreeRecursion(r, v, o);
        c.push(v);
      }
      return c.length ? c : empty;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toTree: {
    value: function(r = null, p = null, o = {}) {
      const c = [], { id = 'id', pid = 'pid', level = 'level', parent = 'parent', children = 'children', root = 'root', empty = null } = o;
      const parents = this.toObject(v => [v[id], v]), childrens = this.toGroup(v => [v[pid], v]);
      for (const v of this) {
        Object.defineProperties(v, {
          [root]: { value: r, enumerable: false, configurable: true, writable: true },
          [parent]: { value: parents[v[pid]] ?? p, enumerable: false, configurable: true, writable: true },
        });
        v[level] = null;
        v[children] = childrens[v[id]] ?? empty;
        if (v[pid] !== (r?.[id] ?? 0)) { continue; }
        c.push(v);
      }
      c.treeEach(v => v[level] = (v[parent]?.[level] ?? -1) +1, { children, empty });
      return c;
    },
    enumerable: false, configurable: true, writable: true,
  },
  treeEach: {
    value: function(cb = v => v, o = {}) {
      const { children = 'children', empty = null } = o;
      return this.each((v, i, a) => {
        v[children] = v[children] || empty;
        cb(v, i, a);
        v[children]?.treeEach(cb, o);
      });
    },
    enumerable: false, configurable: true, writable: true,
  },
  treeMap: {
    value: function(cb = v => v, o = {}) {
      const { children = 'children', empty = null } = o;
      return this.map((v, i, a) => {
        v[children] = v[children] || empty;
        v = cb(v, i, a);
        v[children] = v[children]?.treeMap(cb, o) ?? empty;
        return v;
      });
    },
    enumerable: false, configurable: true, writable: true,
  },
  tree2tree: {
    value: function(r = null, p = null, o = {}) {
      const { id = 'id', pid = 'pid', level = 'level', parent = 'parent', children = 'children', root = 'root', empty = null } = o;
      for (const v of this) {
        Object.defineProperties(v, {
          [root]: { value: r, enumerable: false, configurable: true, writable: true },
          [parent]: { value: p, enumerable: false, configurable: true, writable: true },
        });
        v[pid] = p?.[id] ?? null;
        v[level] = (p?.[level] ?? -1) + 1;
        v[children] = v[children]?.tree2tree(r, v, o) ?? empty;
      }
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  treeFind: {
    value: function(cb, children = 'children') {
      for (const v of this) {
        if (cb(v)) { return v; }
        const c = v[children]?.treeFind(cb, children);
        if (c) { return c; }
      }
      return null;
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(ArrayBuffer.prototype, {
  toUint8Array: {
    value: function() {
      return new Uint8Array(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Uint8Array.prototype, {
  bytes2hex: {
    value: Array.prototype.bytes2hex,
    enumerable: false, configurable: true, writable: true,
  },
  bytes2string: {
    value: Array.prototype.bytes2string,
    enumerable: false, configurable: true, writable: true,
  },
  base64encode: {
    value: Array.prototype.base64encode,
    enumerable: false, configurable: true, writable: true,
  },
  toArray: {
    value: function() {
      return new Array(...this);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Map.prototype, {
  length0: {
    value: function() {
      return this.size;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries0: {
    value: function() {
      return this.entries();
    },
    enumerable: false, configurable: true, writable: true,
  },
  get0: {
    value: function(key, defval = null) {
      return this.has(key) ? this.get(key) : typeof defval == 'function' ? defval(key) : defval;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toArray: {
    value: function() {
      return [...this.values()];
    },
    enumerable: false, configurable: true, writable: true,
  },
  toObject: {
    value: function() {
      return Object.fromEntries(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  toJSON: {
    value: function() {
      return [...this];
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Set.prototype, {
  length0: {
    value: function() {
      return this.size;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries0: {
    value: function() {
      return this.entries();
    },
    enumerable: false, configurable: true, writable: true,
  },
  toArray: {
    value: function() {
      return [...this];
    },
    enumerable: false, configurable: true, writable: true,
  },
  toJSON: {
    value: function() {
      return [...this];
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Date, {
  new: {
    value: function(...args) {
      return args.length != 1 ? new Date(...args) : Number.isNaN(+args[0]) ? new Date(args[0].includes('T') ? args[0] : args[0].replace(/-/g, '/')) : new Date(args[0]>2650000000 ? args[0] : args[0]*1000);
    },
    enumerable: false, configurable: true, writable: true,
  },
  format: {
    value: function(format = 'y-m-d h:i:s') {
      return new Date().format(format);
    },
    enumerable: false, configurable: true, writable: true,
  },
  unix: {
    value: function() {
      return this.now() / 1000 | 0;
    },
    enumerable: false, configurable: true, writable: true,
  },
  fromUnix: {
    value: function(time = 0) {
      return this.new((time || 0) * 1000);
    },
    enumerable: false, configurable: true, writable: true,
  },
  expr: {
    value: function(opts = {}) {
      return new Date().expr(opts);
    },
    enumerable: false, configurable: true, writable: true,
  },
  toDayRange: {
    value: function() {
      const n = new Date();
      const y = n.getFullYear();
      const m = n.getMonth();
      const d = n.getDate();
      const start = new Date(y, m, d).getTime() / 1000 | 0;
      return [start, start + 86400 -1];
    },
    enumerable: false, configurable: true, writable: true,
  },
  toWeekRange: {
    value: function() {
      let n = new Date();
      while (n.getDay() != 1) {
        n = new Date(n.getTime() - 86400);
      }
      const y = n.getFullYear();
      const m = n.getMonth();
      const d = n.getDate();
      const start = new Date(y, m, d).getTime() / 1000 | 0;
      return [start, start + 86400 * 7 - 1];
    },
    enumerable: false, configurable: true, writable: true,
  },
  toMonthRange: {
    value: function() {
      const n = new Date();
      const y = n.getFullYear();
      const m = n.getMonth();
      const start = new Date(y, m, 1).getTime() / 1000 | 0;
      const end = new Date(y, m+1, 0, 23, 59, 59).getTime() / 1000 | 0;
      return [start, end];
    },
    enumerable: false, configurable: true, writable: true,
  },
  toYearRange: {
    value: function() {
      const n = new Date();
      const y = n.getFullYear();
      const start = new Date(y, 1, 1).getTime() / 1000 | 0;
      const end = new Date(y+1, 1, 0, 23, 59, 59).getTime() / 1000 | 0;
      return [start, end];
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Date.prototype, {
  format: {
    value: function(format = 'y-m-d h:i:s') {
      if (this.getTime() === 0) { return '-'; }
      const date = {
        y: this.getFullYear(),
        m: (this.getMonth() + 1),
        d: this.getDate(),
        h: this.getHours(),
        i: this.getMinutes(),
        s: this.getSeconds(),
        l: this.getMilliseconds(),
        e: this.getMonthDay(),
      };
      return format.replace(/([ymdhisle])/ig, (match, key) => key>='A'&&key<='Z' ? date[key.toLowerCase()] : date[key].toString().padStart(key==='l'?3:2, '0'));
    },
    enumerable: false, configurable: true, writable: true,
  },
  unix: {
    value: function() {
      return this.getTime() / 1000 | 0;
    },
    enumerable: false, configurable: true, writable: true,
  },
  isLeapYear: {
    value: function() {
      return this.getFullYear() % 4 === 0 && this.getFullYear() % 400 !== 0;
    },
    enumerable: false, configurable: true, writable: true,
  },
  getMonthDay: {
    value: function() {
      // return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
      return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()] || (this.isLeapYear() ? 29 : 28);
    },
    enumerable: false, configurable: true, writable: true,
  },
  expr: {
    value: function({ y = 0, m = 0, d = 0, h = 0, i = 0, s = 0 }) {
      const mDate = new Date(this.getFullYear() + y, this.getMonth() + m + 1, 0);
      return new Date(this.getFullYear() + y, this.getMonth() + m, Math.min(mDate.getDate(), this.getDate()) + d, this.getHours() + h, this.getMinutes() + i, this.getSeconds() + s);
    },
    enumerable: false, configurable: true, writable: true,
  },
  begin: {
    value: function(n = 3) {
      return new Date(...[this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()].slice(0, n), ...[this.getFullYear(), 0, 1, 0, 0, 0].slice(n));
    },
    enumerable: false, configurable: true, writable: true,
  },
  end: {
    value: function(n = 3) {
      return new Date(...[this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()].slice(0, n), ...[this.getFullYear(), 11, n<2?31:this.getMonthDay(), 23, 59, 59].slice(n));
    },
    enumerable: false, configurable: true, writable: true,
  },
  week: {
    value: function(n, dir = 1) {
      let d = new Date(this.getTime());
      while (d.getDay() !== n) {
        d = new Date(d.getTime() + 86400000 * dir);
      }
      return d;
    },
    enumerable: false, configurable: true, writable: true,
  },
  toJSON: {
    value: function() {
      return this.getTime();
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(RegExp.prototype, {
  toJSON: {
    value: function() {
      return this.toString();
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Promise.prototype, {
  tryCatch: {
    value: function() {
      return new Promise(resolve => this.then(res => resolve([res, null])).catch(err => resolve([null, err])));
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Promise, {
  channel: {
    value: function() {
      let resolve = null, reject = null, promise = new this((res, rej) => { resolve = res; reject = rej; });
      return [promise, resolve, reject];
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(JSON, {
  parse0: {
    value: function(v, defval = null) {
      try {
        return JSON.parse(v);
      } catch(e) {
        return defval;
      }
    },
    enumerable: false, configurable: true, writable: true,
  },
});
