// Copyright 2021 The dotcoo <dotcoo@163.com>. All rights reserved.

'use strict';

/* eslint-disable no-extend-native */

// ====== 扩展 ======

Object.defineProperties(Object, {
  isObject: {
    value: function(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign1: {
    value: function(o = { array: false }, a = {}, ...bs) {
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
      for (const b of bs) {
        a = merge(a, b);
      }
      return a;
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign2: {
    value: function(...args) {
      return this.assign1({ array: false }, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign3: {
    value: function(...args) {
      return this.assign1({ array: true }, ...args);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Object.prototype, {
  length2: {
    value: function() {
      return Object.keys(this).length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries2: {
    value: function() {
      return Object.entries(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  keys2: {
    value: function() {
      return Object.keys(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  values2: {
    value: function() {
      return Object.values(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
  clone2: {
    value: function() {
      return JSON.parse(JSON.stringify(this));
    },
    enumerable: false, configurable: true, writable: true,
  },
  assign2: {
    value: function(...bs) {
      return this.constructor.assign2(this, ...bs);
    },
    enumerable: false, configurable: true, writable: true,
  },
  map2: {
    value: function(cb = (k, v) => [v, k]) {
      return Object.entries(this).map(([k, v]) => cb(v, k));
    },
    enumerable: false, configurable: true, writable: true,
  },
  pick2: {
    value: function(...keys) {
      const o = {};
      for (const k of keys) {
        o[k] = this[k];
      }
      return o;
    },
    enumerable: false, configurable: true, writable: true,
  },
  omit2: {
    value: function(...keys) {
      const o = {}, s = new Set(keys);
      for (const k in this) {
        if (!s.has(k)) { o[k] = this[k]; }
      }
      return o;
    },
    enumerable: false, configurable: true, writable: true,
  },
  log2: {
    value: function(...args) {
      console.log(...args, this);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  debug2: {
    value: function(...args) {
      console.debug(...args, this);
      return this;
    },
    enumerable: false, configurable: true, writable: true,
  },
  getParents2: {
    value: function(self = false, depth = 1, parent = 'parent') {
      const ps = self ? [this] : [];
      for (let p = this[parent], i = depth; p && i != 0; i--) {
        ps.push(p);
        p = p[parent];
      }
      return ps;
    },
    enumerable: false, configurable: true, writable: true,
  },
  getChildrens2: {
    value: function(self = false, depth = 1, children = 'children') {
      this[children] = this[children] || [];
      const cs = self ? [this] : [];
      if (depth == 0) { return cs; }
      for (const c of this[children]) {
        cs.push(...c.getChildrens2(true, depth - 1, children));
      }
      return cs;
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
  toDate: {
    value: function() {
      return Date.new(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(String.prototype, {
  length2: {
    value: function() {
      return this.length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  substring2: {
    value: function(s = 0, e = this.length) {
      s = s >= 0 ? s : this.length + s;
      e = e >= 0 ? e : this.length + e;
      return this.substring(s, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  substr2: {
    value: function(s = 0, e = this.length) {
      s = s >= 0 ? s : this.length + s;
      e = s + e;
      return this.substring(s, e);
    },
    enumerable: false, configurable: true, writable: true,
  },
  split2: {
    value: function(s = ',', n = 1) {
      const a = this ? this.split(s) : [];
      return n === 1 ? a : a.push2(a.splice(n-1).join(s));
    },
    enumerable: false, configurable: true, writable: true,
  },
  split2number: {
    value: function(s = ',') {
      return this.split2(s).map(v => +v);
    },
    enumerable: false, configurable: true, writable: true,
  },
  each: {
    value: function(cb = v => v, n = 1) {
      const a = [];
      for (let l = this.length - n + 1, i = 0; i < l; i += n) {
        a.push(cb(this, i, a));
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
  toDate: {
    value: function() {
      return Date.new(this);
    },
    enumerable: false, configurable: true, writable: true,
  },
});

Object.defineProperties(Array.prototype, {
  length2: {
    value: function() {
      return this.length;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries2: {
    value: function() {
      return this.entries();
    },
    enumerable: false, configurable: true, writable: true,
  },
  shift2: {
    value: function(...args) {
      this.shift(...args);
      return this;
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
  shift4: {
    value: function(v, ...args) {
      this.shift(v, ...args);
      return v;
    },
    enumerable: false, configurable: true, writable: true,
  },
  pop2: {
    value: function(...args) {
      this.pop(...args);
      return this;
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
  pop4: {
    value: function(v, ...args) {
      this.pop(v, ...args);
      return v;
    },
    enumerable: false, configurable: true, writable: true,
  },
  unshift2: {
    value: function(...args) {
      this.unshift(...args);
      return this;
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
  unshift4: {
    value: function(v, ...args) {
      this.unshift(v, ...args);
      return v;
    },
    enumerable: false, configurable: true, writable: true,
  },
  push2: {
    value: function(...args) {
      this.push(...args);
      return this;
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
  push4: {
    value: function(v, ...args) {
      this.push(v, ...args);
      return v;
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
  at2: {
    value: function(i, defval = null) {
      return this.at(i) ?? defval;
    },
    enumerable: false, configurable: true, writable: true,
  },
  find2: {
    value: function(cb = v => v, defval = null) {
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
      return this.map(cb).filter(v => s.has(v) ? false : !!s.add(v));
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
});

Object.defineProperties(Map.prototype, {
  length2: {
    value: function() {
      return this.size;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries2: {
    value: function() {
      return this.entries();
    },
    enumerable: false, configurable: true, writable: true,
  },
  get2: {
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
  length2: {
    value: function() {
      return this.size;
    },
    enumerable: false, configurable: true, writable: true,
  },
  entries2: {
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
  parse2: {
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
