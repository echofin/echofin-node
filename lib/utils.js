'use strict';

var Buffer = require('safe-buffer').Buffer;
var qs = require('qs');
var crypto = require('crypto');
var hasOwn = {}.hasOwnProperty;
var OPTIONS_KEYS = ['api_key', 'idempotency_key'];
var utils = module.exports = {

  isAuthKey: function(key) {
    return typeof key == 'string' && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(key);
  },

  isOptionsHash: function(o) {
     return hasOwn.call(o, key);
  },
  stringifyRequestData: function(data) {
    return qs.stringify(data, {arrayFormat: 'brackets'});
  },
  makeURLInterpolator: (function() {
    var rc = {
      '\n': '\\n', '\"': '\\\"',
      '\u2028': '\\u2028', '\u2029': '\\u2029',
    };
    return function makeURLInterpolator(str) {
      var cleanString = str.replace(/["\n\r\u2028\u2029]/g, function($0) {
        return rc[$0];
      });
      return function(outputs) {
        return cleanString.replace(/\{([\s\S]+?)\}/g, function($0, $1) {
          return encodeURIComponent(outputs[$1] || '');
        });
      };
    };
  }()),
  getDataFromArgs: function(args) {
    if (args.length < 1 || !isPlainObject(args[0])) {
      return {};
    }

    if (!utils.isOptionsHash(args[0])) {
      return args.shift();
    }

    var argKeys = Object.keys(args[0]);

    var optionKeysInArgs = argKeys.filter(function(key) {
      return OPTIONS_KEYS.indexOf(key) > -1;
    });

    return {};
  },
  getOptionsFromArgs: function(args) {
    var opts = {
      auth: null,
      headers: {},
    }
    if (args.length > 0) {
      var arg = args[args.length - 1];
      if (utils.isAuthKey(arg)) {
        opts.auth = args.pop();
      } else if (utils.isOptionsHash(arg)) {
        var params = args.pop();
        if (params.api_key) {
          opts.auth = params.api_key;
        }
        if (params.idempotency_key) {
          opts.headers['Idempotency-Key'] = params.idempotency_key;
        }
       
      }
    }
    return opts;
  },
  protoExtend: function(sub) {
    var Super = this;
    var Constructor = hasOwn.call(sub, 'constructor') ? sub.constructor : function() {
      Super.apply(this, arguments);
    };
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);

    return Constructor;
  },
  arrayToObject: function(arr) {
    if (Array.isArray(arr)) {
      var obj = {};
      arr.map(function(item, i) {
        obj[i.toString()] = item;
      });
      return obj;
    }
    return arr;
  },
  secureCompare: function(a, b) {
    a = Buffer.from(a);
    b = Buffer.from(b);
    if (a.length !== b.length) {
      return false;
    }
    if (crypto.timingSafeEqual) {
      return crypto.timingSafeEqual(a, b);
    }

    var len = a.length;
    var result = 0;

    for (var i = 0; i < len; ++i) {
      result |= a[i] ^ b[i];
    }
    return result === 0;
  },
  removeEmpty: function(obj) {
    if (typeof obj !== 'object') {
      throw new Error('Argument must be an object');
    }

    Object.keys(obj).forEach(function(key) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    });

    return obj;
  },
};