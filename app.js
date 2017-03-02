/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 182);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 1 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var bind = __webpack_require__(19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


var results = {};

// export const get = (uri) => {
//   if (!results[uri]) {
//     results[uri] = axios.get(uri)
//   }
//   return results[uri]
// }

// export const forget = (uri) => {
//   results[uri] = undefined
//   delete results[uri]
// }

/* harmony default export */ exports["a"] = {
  get: function get(uri) {
    if (!results[uri]) {
      results[uri] = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(uri);
    }
    return results[uri];
  },
  post: function post(uri, jsondata) {
    console.log("jsondata");
    console.log(jsondata);
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(uri, jsondata);
  },

  forget: function forget(uri) {
    results[uri] = undefined;
    delete results[uri];
  }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*!
 * Vue.js v2.0.3
 * (c) 2014-2016 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val, 10);
  return (n || n === 0) ? n : val
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
  /* eslint-enable eqeqeq */
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: null,

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100,

  /**
   * Server rendering?
   */
  _isServer: process.env.VUE_ENV === 'server'
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w\.\$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]';

var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(nextTickHandler);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx); }
      : cb;
    callbacks.push(func);
    if (!pending) {
      pending = true;
      timerFunc();
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] !== undefined
    };
    Set.prototype.add = function add (key) {
      this.set[key] = 1;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/* not type checking this file because flow doesn't play well with Proxy */

var hasProxy;
var proxyHandlers;
var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  proxyHandlers = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warn(
          "Property or method \"" + key + "\" is not defined on the instance but " +
          "referenced during render. Make sure to declare reactive data " +
          "properties in the data option.",
          target
        );
      }
      return has || !isAllowed
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      vm._renderProxy = new Proxy(vm, proxyHandlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */


var uid$2 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$2++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    var watcher = queue[index];
    var id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  if ( options === void 0 ) options = {};

  this.vm = vm;
  vm._watchers.push(this);
  // options
  this.deep = !!options.deep;
  this.user = !!options.user;
  this.lazy = !!options.lazy;
  this.sync = !!options.sync;
  this.expression = expOrFn.toString();
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
      if (
        value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          process.env.NODE_ENV !== 'production' && warn(
            ("Error in watcher \"" + (this.expression) + "\""),
            this.vm
          );
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subcriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val, seen) {
  var i, keys;
  if (!seen) {
    seen = seenObjects;
    seen.clear();
  }
  var isA = Array.isArray(val);
  var isO = isObject(val);
  if ((isA || isO) && Object.isExtensible(val)) {
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      } else {
        seen.add(depId);
      }
    }
    if (isA) {
      i = val.length;
      while (i--) { traverse(val[i], seen); }
    } else if (isO) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { traverse(val[keys[i]], seen); }
    }
  }
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * istanbul ignore next
 */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !config._isServer &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  initProps(vm);
  initData(vm);
  initComputed(vm);
  initMethods(vm);
  initWatch(vm);
}

function initProps (vm) {
  var props = vm.$options.props;
  if (props) {
    var propsData = vm.$options.propsData || {};
    var keys = vm.$options._propKeys = Object.keys(props);
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function ( i ) {
      var key = keys[i];
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
          if (vm.$parent && !observerState.isSettingProps) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      } else {
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
      }
    };

    for (var i = 0; i < keys.length; i++) loop( i );
    observerState.shouldConvert = true;
  }
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object.',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data);
  data.__ob__ && data.__ob__.vmCount++;
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm) {
  var computed = vm.$options.computed;
  if (computed) {
    for (var key in computed) {
      var userDef = computed[key];
      if (typeof userDef === 'function') {
        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
        computedSharedDefinition.set = noop;
      } else {
        computedSharedDefinition.get = userDef.get
          ? userDef.cache !== false
            ? makeComputedGetter(userDef.get, vm)
            : bind$1(userDef.get, vm)
          : noop;
        computedSharedDefinition.set = userDef.set
          ? bind$1(userDef.set, vm)
          : noop;
      }
      Object.defineProperty(vm, key, computedSharedDefinition);
    }
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm) {
  var methods = vm.$options.methods;
  if (methods) {
    for (var key in methods) {
      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
      if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
    }
  }
}

function initWatch (vm) {
  var watch = vm.$options.watch;
  if (watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  ns,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = ns;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.child = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
};

var emptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.ns,
    vnode.context,
    vnode.componentOptions
  );
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, fn, event, capture;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + name + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      capture = name.charAt(0) === '!';
      event = capture ? name.slice(1) : name;
      if (Array.isArray(cur)) {
        add(event, (cur.invoker = arrInvoker(cur)), capture);
      } else {
        if (!cur.invoker) {
          fn = cur;
          cur = on[name] = {};
          cur.fn = fn;
          cur.invoker = fnInvoker(cur);
        }
        add(event, cur.invoker, capture);
      }
    } else if (cur !== old) {
      if (Array.isArray(old)) {
        old.length = cur.length;
        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
        on[name] = old;
      } else {
        old.fn = cur;
        on[name] = old;
      }
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = name.charAt(0) === '!' ? name.slice(1) : name;
      remove$$1(event, oldOn[name].invoker);
    }
  }
}

function arrInvoker (arr) {
  return function (ev) {
    var arguments$1 = arguments;

    var single = arguments.length === 1;
    for (var i = 0; i < arr.length; i++) {
      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
    }
  }
}

function fnInvoker (o) {
  return function (ev) {
    var single = arguments.length === 1;
    single ? o.fn(ev) : o.fn.apply(null, arguments);
  }
}

/*  */

function normalizeChildren (
  children,
  ns,
  nestedIndex
) {
  if (isPrimitive(children)) {
    return [createTextVNode(children)]
  }
  if (Array.isArray(children)) {
    var res = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      var last = res[res.length - 1];
      //  nested
      if (Array.isArray(c)) {
        res.push.apply(res, normalizeChildren(c, ns, ((nestedIndex || '') + "_" + i)));
      } else if (isPrimitive(c)) {
        if (last && last.text) {
          last.text += String(c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else if (c instanceof VNode) {
        if (c.text && last && last.text) {
          last.text += c.text;
        } else {
          // inherit parent namespace
          if (ns) {
            applyNS(c, ns);
          }
          // default key for nested array children (likely generated by v-for)
          if (c.tag && c.key == null && nestedIndex != null) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }
}

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

function applyNS (vnode, ns) {
  if (vnode.tag && !vnode.ns) {
    vnode.ns = ns;
    if (vnode.children) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        applyNS(vnode.children[i], ns);
      }
    }
  }
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = emptyVNode;
      if (process.env.NODE_ENV !== 'production') {
        /* istanbul ignore if */
        if (vm.$options.template) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    var prevVnode = vm._vnode;
    vm._vnode = vnode;
    if (!prevVnode) {
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    if (vm._isMounted) {
      callHook(vm, 'updated');
    }
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = false;
      }
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      vm._updateListeners(listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, vm._renderContext);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  vm.$emit('hook:' + hook);
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  if (isObject(Ctor)) {
    Ctor = Vue$2.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  var vnode = Ctor.options.render.call(
    null,
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    bind$1(createElement, { _self: Object.create(context) }),
    {
      props: props,
      data: data,
      parent: context,
      children: normalizeChildren(children),
      slots: function () { return resolveSlots(children, context); }
    }
  );
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (vnode, hydrating) {
  if (!vnode.child || vnode.child._isDestroyed) {
    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance);
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.child = oldVnode.child;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.child._isMounted) {
    vnode.child._isMounted = true;
    callHook(vnode.child, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.child._inactive = false;
    callHook(vnode.child, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.child._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.child.$destroy();
    } else {
      vnode.child._inactive = true;
      callHook(vnode.child, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = Vue$2.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extrating raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (a, b) {
  // since all hooks have at most two args, use fixed args
  // to avoid having to use fn.apply().
  return function (_, __) {
    a(_, __);
    b(_, __);
  }
}

/*  */

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  tag,
  data,
  children
) {
  if (data && (Array.isArray(data) || typeof data !== 'object')) {
    children = data;
    data = undefined;
  }
  // make sure to use real instance instead of proxy as context
  return _createElement(this._self, tag, data, children)
}

function _createElement (
  context,
  tag,
  data,
  children
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return emptyVNode()
  }
  if (typeof tag === 'string') {
    var Ctor;
    var ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      return new VNode(
        tag, data, normalizeChildren(children, ns),
        undefined, undefined, ns, context
      )
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      return createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      return new VNode(
        tag, data, normalizeChildren(children, ns),
        undefined, undefined, ns, context
      )
    }
  } else {
    // direct component options / constructor
    return createComponent(tag, data, context, children)
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext);
  // bind the public createElement fn to this instance
  // so that we get proper render context inside it.
  vm.$createElement = bind$1(createElement, vm);
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
      }
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        if (config._isServer) {
          throw e
        } else {
          setTimeout(function () { throw e }, 0);
        }
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = emptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // shorthands used in render functions
  Vue.prototype._h = createElement;
  // toString for mustaches
  Vue.prototype._s = _toString;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = emptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (typeof tree[i] !== 'string') {
          tree[i].isStatic = true;
          tree[i].key = "__static__" + index + "_" + i;
        }
      }
    } else {
      tree.isStatic = true;
      tree.key = "__static__" + index;
    }
    return tree
  };

  // filter resolution helper
  var identity = function (_) { return _; };
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback
  ) {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var hash = asProp || config.mustUseProp(key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // expose v-on keyCodes
  Vue.prototype._k = function getKeyCodes (key) {
    return config.keyCodes[key]
  };
}

function resolveSlots (
  renderChildren,
  context
) {
  var slots = {};
  if (!renderChildren) {
    return slots
  }
  var children = normalizeChildren(renderChildren) || [];
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  var on = bind$1(vm.$on, vm);
  var off = bind$1(vm.$off, vm);
  vm._updateListeners = function (listeners, oldListeners) {
    updateListeners(listeners, oldListeners || {}, on, off, vm);
  };
  if (listeners) {
    vm._updateListeners(listeners);
  }
}

function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    initRender(vm);
  };

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(resolveConstructorOptions(vm));
    // doing this because it's faster than dynamic enumeration.
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (vm) {
    var Ctor = vm.constructor;
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = Ctor.super.options;
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed
        Ctor.superOptions = superOptions;
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }
}

function Vue$2 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$2)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$2);
stateMixin(Vue$2);
eventsMixin(Vue$2);
lifecycleMixin(Vue$2);
renderMixin(Vue$2);

var warn = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  var key, toVal, fromVal;
  for (key in from) {
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isObject(toVal) && isObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Make sure component options get converted to actual
 * constructors.
 */
function normalizeComponents (options) {
  if (options.components) {
    var components = options.components;
    var def;
    for (var key in components) {
      var lower = key.toLowerCase();
      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
        process.env.NODE_ENV !== 'production' && warn(
          'Do not use built-in or reserved HTML elements as component ' +
          'id: ' + key
        );
        continue
      }
      def = components[key];
      if (isPlainObject(def)) {
        components[key] = Vue$2.extend(def);
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  normalizeComponents(child);
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$2) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  var res = assets[id] ||
    // camelCase ID
    assets[camelize(id)] ||
    // Pascal Case ID
    assets[capitalize(camelize(id))];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isBooleanType(prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, name) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Invalid default value for prop "' + name + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isBooleanType (fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === 'Boolean'
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === 'Boolean') {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    Vue.options = mergeOptions(Vue.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var isFirstExtend = Super.cid === 0;
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characaters and the hyphen.'
        );
        name = null;
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension
    Sub.extend = Super.extend;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub;
    }
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = Vue.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  created: function created () {
    this.cache = Object.create(null);
  },
  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    if (vnode && vnode.componentOptions) {
      var opts = vnode.componentOptions;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? opts.Ctor.cid + '::' + opts.tag
        : vnode.key;
      if (this.cache[key]) {
        vnode.child = this.cache[key].child;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  },
  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this.cache) {
      var vnode = this$1.cache[key];
      callHook(vnode.child, 'deactivated');
      vnode.child.$destroy();
    }
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$2);

Object.defineProperty(Vue$2.prototype, '$isServer', {
  get: function () { return config._isServer; }
});

Vue$2.version = '2.0.3';

/*  */

// attributes that should be using props for binding
var mustUseProp = makeMap('value,selected,checked,muted');

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var isAttr = makeMap(
  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
  'target,title,type,usemap,value,width,wrap'
);



var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.child) {
    childNode = childNode.child._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function childNodes (node) {
  return node.childNodes
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	childNodes: childNodes,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.child || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key])) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeElement(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeElement (el) {
    var parent = nodeOps.parentNode(el);
    nodeOps.removeChild(parent, el);
  }

  function createElm (vnode, insertedVnodeQueue, nested) {
    var i;
    var data = vnode.data;
    vnode.isRootInsert = !nested;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode); }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(i = vnode.child)) {
        initComponent(vnode, insertedVnodeQueue);
        return vnode.elm
      }
    }
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (
          !vnode.ns &&
          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
    }
    return vnode.elm
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true));
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.child) {
      vnode = vnode.child._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.child.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          nodeOps.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeElement(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (elmToMove.tag !== newStartVnode.tag) {
            // same key but different element. treat as new element
            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        vnode.isCloned) {
      vnode.elm = oldVnode.elm;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.child)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        var childNodes = nodeOps.childNodes(elm);
        // empty element, allow client to pick up and populate children
        if (!childNodes.length) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          if (childNodes.length !== children.length) {
            childrenMatch = false;
          } else {
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
            }
          }
          if (!childrenMatch) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag === nodeOps.tagName(node).toLowerCase()
      )
    } else {
      return _toString(vnode.text) === node.data
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var elm, parent;
    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount, create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        elm = oldVnode.elm;
        parent = nodeOps.parentNode(elm);

        createElm(vnode, insertedVnodeQueue);

        // component root element replaced.
        // update parent placeholder node element.
        if (vnode.parent) {
          vnode.parent.elm = vnode.elm;
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parent !== null) {
          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm));
          removeVnodes(parent, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (
  oldVnode,
  vnode
) {
  if (!oldVnode.data.directives && !vnode.data.directives) {
    return
  }
  var isCreate = oldVnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      dirsWithInsert.forEach(function (dir) {
        callHook$1(dir, 'inserted', vnode, oldVnode);
      });
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      dirsWithPostpatch.forEach(function (dir) {
        callHook$1(dir, 'componentUpdated', vnode, oldVnode);
      });
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

// skip type checking this file because we need to attach private properties
// to elements

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
    vnode.elm.addEventListener(event, handler, capture);
  });
  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
    vnode.elm.removeEventListener(event, handler);
  });
  updateListeners(on, oldOn, add, remove, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = undefined;
    }
  }
  for (key in props) {
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
      vnode.children.length = 0;
    }
    cur = props[key];
    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (elm.value !== strCur && !elm.composing) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
    return
  }
  var cur, name;
  var el = vnode.elm;
  var oldStyle = oldVnode.data.style || {};
  var style = vnode.data.style || {};

  // handle string
  if (typeof style === 'string') {
    el.style.cssText = style;
    return
  }

  var needClone = style.__ob__;

  // handle array syntax
  if (Array.isArray(style)) {
    style = vnode.data.style = toObject(style);
  }

  // clone the style for future updates,
  // in case the user mutates the style object in-place.
  if (needClone) {
    style = vnode.data.style = extend({}, style);
  }

  for (name in oldStyle) {
    if (style[name] == null) {
      el.style[normalize(name)] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      el.style[normalize(name)] = cur == null ? '' : cur;
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var transitionNode = activeInstance.$vnode;
  var context = transitionNode && transitionNode.parent
    ? transitionNode.parent.context
    : activeInstance;

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

var transition = inBrowser ? {
  create: function create (_, vnode) {
    if (!vnode.data.show) {
      enter(vnode);
    }
  },
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_\-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    if (process.env.NODE_ENV !== 'production') {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (
      (vnode.tag === 'textarea' || el.type === 'text') &&
      !binding.modifiers.lazy
    ) {
      if (!isAndroid) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
      }
      /* istanbul ignore if */
      if (isIE9) {
        el.vmodel = true;
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matchig
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.child && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.child._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (value && transition && !isIE9) {
      enter(vnode);
    }
    var originalDisplay = el.style.display === 'none' ? '' : el.style.display;
    el.style.display = value ? originalDisplay : 'none';
    el.__vOriginalDisplay = originalDisplay;
  },
  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      if (value) {
        enter(vnode);
        el.style.display = el.__vOriginalDisplay;
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recrusively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    var key = child.key = child.key == null || child.isStatic
      ? ("__v" + (child.tag + this._uid) + "__")
      : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && oldChild.key !== key) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);

      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$2.config.isUnknownElement = isUnknownElement;
Vue$2.config.isReservedTag = isReservedTag;
Vue$2.config.getTagNamespace = getTagNamespace;
Vue$2.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$2.options.directives, platformDirectives);
extend(Vue$2.options.components, platformComponents);

// install platform patch function
Vue$2.prototype.__patch__ = config._isServer ? noop : patch$1;

// wrap mount
Vue$2.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && !config._isServer ? query(el) : undefined;
  return this._mount(el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2);
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console.log(
        'Download the Vue Devtools for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

module.exports = Vue$2;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "vTaiwan_logo_2017.png";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  return function () {
    vertxNext(flush);
  };
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(13);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

polyfill();
// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

/**
 * vue-router v2.0.1
 * (c) 2016 Evan You
 * @license MIT
 */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueRouter = factory());
}(this, (function () { 'use strict';

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true

    var route = parent.$route
    var cache = parent._routerViewCache || (parent._routerViewCache = {})
    var depth = 0
    var inactive = false

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      if (parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }

    data.routerViewDepth = depth
    var matched = route.matched[depth]
    if (!matched) {
      return h()
    }

    var name = props.name
    var component = inactive
      ? cache[name]
      : (cache[name] = matched.components[name])

    if (!inactive) {
      var hooks = data.hook || (data.hook = {})
      hooks.init = function (vnode) {
        matched.instances[name] = vnode.child
      }
      hooks.destroy = function (vnode) {
        if (matched.instances[name] === vnode.child) {
          matched.instances[name] = undefined
        }
      }
    }

    return h(component, data, children)
  }
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/')
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i]
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop()
    } else {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = ''
  var query = ''

  var hashIndex = path.indexOf('#')
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex)
    path = path.slice(0, hashIndex)
  }

  var queryIndex = path.indexOf('?')
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
  }
}

/*  */

var encode = encodeURIComponent
var decode = decodeURIComponent

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery
    try {
      parsedQuery = parseQuery(query)
    } catch (e) {
      warn(false, e.message)
      parsedQuery = {}
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key]
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = Object.create(null)

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=')
    var key = decode(parts.shift())
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key]

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = []
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key))
        } else {
          result.push(encode(key) + '=' + encode(val2))
        }
      })
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null
  return res ? ("?" + res) : ''
}

/*  */

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom)
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
})

function formatMatch (record) {
  var res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

var trailingSlashRE = /\/$/
function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a)
  var bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.indexOf(target.path) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw
  if (next.name || next._normalized) {
    return next
  }

  var parsedPath = parsePath(next.path || '')
  var basePath = (current && current.path) || '/'
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append)
    : (current && current.path) || '/'
  var query = resolveQuery(parsedPath.query, next.query)
  var hash = next.hash || parsedPath.hash
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object]

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router
    var current = this.$route
    var to = normalizeLocation(this.to, current, this.append)
    var resolved = router.match(to)
    var fullPath = resolved.redirectedFrom || resolved.fullPath
    var base = router.history.base
    var href = base ? cleanPath(base + fullPath) : fullPath
    var classes = {}
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
    var compareTarget = to.path ? createRoute(null, to) : resolved
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget)

    var on = {
      click: function (e) {
        // don't redirect with control keys
        /* istanbul ignore if */
        if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
        // don't redirect when preventDefault called
        /* istanbul ignore if */
        if (e.defaultPrevented) { return }
        // don't redirect on right click
        /* istanbul ignore if */
        if (e.button !== 0) { return }
        e.preventDefault()
        if (this$1.replace) {
          router.replace(to)
        } else {
          router.push(to)
        }
      }
    }

    var data = {
      class: classes
    }

    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href: href }
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default)
      if (a) {
        var aData = a.data || (a.data = {})
        aData.on = on
        var aAttrs = aData.attrs || (aData.attrs = {})
        aAttrs.href = href
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function findAnchor (children) {
  if (children) {
    var child
    for (var i = 0; i < children.length; i++) {
      child = children[i]
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get$1 () { return this.$root._route }
  })

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })

  Vue.component('router-view', View)
  Vue.component('router-link', Link)
}

var __moduleExports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = __moduleExports

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp
var parse_1 = parse
var compile_1 = compile
var tokensToFunction_1 = tokensToFunction
var tokensToRegExp_1 = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string} str
 * @return {!Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @return {!function(Object=, Object=)}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys)
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

function createRouteMap (routes) {
  var pathMap = Object.create(null)
  var nameMap = Object.create(null)

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route)
  })

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  assert(path != null, "\"path\" is required in a route configuration.")

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {}
  }

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {}
    route.children.forEach(function (child) {
      addRouteRecord(pathMap, nameMap, child, record)
    })
  }

  if (route.alias) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
      })
    } else {
      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
    }
  }

  pathMap[record.path] = record
  if (name) { nameMap[name] = record }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '')
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */

var regexpCache = Object.create(null)

var regexpCompileCache = Object.create(null)

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute)
    var name = location.name;

    if (name) {
      var record = nameMap[name]
      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {}
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect

    if (typeof redirect === 'string') {
      redirect = { path: redirect }
    }

    if (!redirect || typeof redirect !== 'object') {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
      return _createRoute(null, location)
    }

    var re = redirect
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query
    hash = re.hasOwnProperty('hash') ? re.hash : hash
    params = re.hasOwnProperty('params') ? re.params : params

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name]
      assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record)
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    })
    if (aliasedMatch) {
      var matched = aliasedMatch.matched
      var aliasedRecord = matched[matched.length - 1]
      location.params = aliasedMatch.params
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return match
}

function matchRoute (
  path,
  params,
  pathname
) {
  var keys, regexp
  var hit = regexpCache[path]
  if (hit) {
    keys = hit.keys
    regexp = hit.regexp
  } else {
    keys = []
    regexp = index(path, keys)
    regexpCache[path] = { keys: keys, regexp: regexp }
  }
  var m = pathname.match(regexp)

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1]
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) { params[key.name] = val }
  }

  return true
}

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path))
    return filler(params || {}, { pretty: true })
  } catch (e) {
    assert(false, ("missing param for " + routeMsg + ": " + (e.message)))
    return ''
  }
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var inBrowser = typeof window !== 'undefined'

var supportsHistory = inBrowser && (function () {
  var ua = window.navigator.userAgent

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})()

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}

/*  */


var History = function History (router, base) {
  this.router = router
  this.base = normalizeBase(base)
  // start with a route object that stands for "nowhere"
  this.current = START
  this.pending = null
};

History.prototype.listen = function listen (cb) {
  this.cb = cb
};

History.prototype.transitionTo = function transitionTo (location, cb) {
    var this$1 = this;

  var route = this.router.match(location, this.current)
  this.confirmTransition(route, function () {
    this$1.updateRoute(route)
    cb && cb(route)
    this$1.ensureURL()
  })
};

History.prototype.confirmTransition = function confirmTransition (route, cb) {
    var this$1 = this;

  var current = this.current
  if (isSameRoute(route, current)) {
    this.ensureURL()
    return
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  )

  this.pending = route
  var iterator = function (hook, next) {
    if (this$1.pending !== route) { return }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL()
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        this$1.push(to)
      } else {
        // confirm transition and pass on the value
        next(to)
      }
    })
  }

  runQueue(queue, iterator, function () {
    var postEnterCbs = []
    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
      return this$1.current === route
    })
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending === route) {
        this$1.pending = null
        cb(route)
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); })
        })
      }
    })
  })
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current
  this.current = route
  this.cb && this.cb(route)
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev)
  })
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base')
      base = baseEl ? baseEl.getAttribute('href') : '/'
    } else {
      base = '/'
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i
  var max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractLeaveGuards (matched) {
  return flatMapComponents(matched, function (def, instance) {
    var guard = def && def.beforeRouteLeave
    if (guard) {
      return function routeLeaveGuard () {
        return guard.apply(instance, arguments)
      }
    }
  }).reverse()
}

function extractEnterGuards (
  matched,
  cbs,
  isValid
) {
  return flatMapComponents(matched, function (def, _, match, key) {
    var guard = def && def.beforeRouteEnter
    if (guard) {
      return function routeEnterGuard (to, from, next) {
        return guard(to, from, function (cb) {
          next(cb)
          if (typeof cb === 'function') {
            cbs.push(function () {
              // #750
              // if a router-view is wrapped with an out-in transition,
              // the instance may not have been registered at this time.
              // we will need to poll for registration until current route
              // is no longer valid.
              poll(cb, match.instances, key, isValid)
            })
          }
        })
      }
    }
  })
}

function poll (cb, instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key])
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid)
    }, 16)
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = function (resolvedDef) {
          match.components[key] = resolvedDef
          next()
        }

        var reject = function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason))
          next(false)
        }

        var res = def(resolve, reject)
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject)
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return Array.prototype.concat.apply([], matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

/*  */

function saveScrollPosition (key) {
  if (!key) { return }
  window.sessionStorage.setItem(key, JSON.stringify({
    x: window.pageXOffset,
    y: window.pageYOffset
  }))
}

function getScrollPosition (key) {
  if (!key) { return }
  return JSON.parse(window.sessionStorage.getItem(key))
}

function getElementPosition (el) {
  var docRect = document.documentElement.getBoundingClientRect()
  var elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */


var genKey = function () { return String(Date.now()); }
var _key = genKey()

var HTML5History = (function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base)

    this.transitionTo(getLocation(this.base))

    var expectScroll = router.options.scrollBehavior
    window.addEventListener('popstate', function (e) {
      _key = e.state && e.state.key
      var current = this$1.current
      this$1.transitionTo(getLocation(this$1.base), function (next) {
        if (expectScroll) {
          this$1.handleScroll(next, current, true)
        }
      })
    })

    if (expectScroll) {
      window.addEventListener('scroll', function () {
        saveScrollPosition(_key)
      })
    }
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n)
  };

  HTML5History.prototype.push = function push (location) {
    var this$1 = this;

    var current = this.current
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath))
      this$1.handleScroll(route, current, false)
    })
  };

  HTML5History.prototype.replace = function replace (location) {
    var this$1 = this;

    var current = this.current
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath))
      this$1.handleScroll(route, current, false)
    })
  };

  HTML5History.prototype.ensureURL = function ensureURL () {
    if (getLocation(this.base) !== this.current.fullPath) {
      replaceState(cleanPath(this.base + this.current.fullPath))
    }
  };

  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
    var router = this.router
    if (!router.app) {
      return
    }

    var behavior = router.options.scrollBehavior
    if (!behavior) {
      return
    }
    assert(typeof behavior === 'function', "scrollBehavior must be a function")

    // wait until re-render finishes before scrolling
    router.app.$nextTick(function () {
      var position = getScrollPosition(_key)
      var shouldScroll = behavior(to, from, isPop ? position : null)
      if (!shouldScroll) {
        return
      }
      var isObject = typeof shouldScroll === 'object'
      if (isObject && typeof shouldScroll.selector === 'string') {
        var el = document.querySelector(shouldScroll.selector)
        if (el) {
          position = getElementPosition(el)
        } else if (isValidPosition(shouldScroll)) {
          position = normalizePosition(shouldScroll)
        }
      } else if (isObject && isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll)
      }

      if (position) {
        window.scrollTo(position.x, position.y)
      }
    })
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

function pushState (url, replace) {
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url)
    } else {
      _key = genKey()
      history.pushState({ key: _key }, '', url)
    }
    saveScrollPosition(_key)
  } catch (e) {
    window.location[replace ? 'assign' : 'replace'](url)
  }
}

function replaceState (url) {
  pushState(url, true)
}

/*  */


var HashHistory = (function (History) {
  function HashHistory (router, base, fallback) {
    var this$1 = this;

    History.call(this, router, base)

    // check history fallback deeplinking
    if (fallback && this.checkFallback()) {
      return
    }

    ensureSlash()
    this.transitionTo(getHash(), function () {
      window.addEventListener('hashchange', function () {
        this$1.onHashChange()
      })
    })
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  HashHistory.prototype.checkFallback = function checkFallback () {
    var location = getLocation(this.base)
    if (!/^\/#/.test(location)) {
      window.location.replace(
        cleanPath(this.base + '/#' + location)
      )
      return true
    }
  };

  HashHistory.prototype.onHashChange = function onHashChange () {
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), function (route) {
      replaceHash(route.fullPath)
    })
  };

  HashHistory.prototype.push = function push (location) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath)
    })
  };

  HashHistory.prototype.replace = function replace (location) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath)
    })
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n)
  };

  HashHistory.prototype.ensureURL = function ensureURL () {
    if (getHash() !== this.current.fullPath) {
      replaceHash(this.current.fullPath)
    }
  };

  return HashHistory;
}(History));

function ensureSlash () {
  var path = getHash()
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path)
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href
  var index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}

/*  */


var AbstractHistory = (function (History) {
  function AbstractHistory (router) {
    History.call(this, router)
    this.stack = []
    this.index = -1
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
      this$1.index++
    })
  };

  AbstractHistory.prototype.replace = function replace (location) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
    })
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex]
    this.confirmTransition(route, function () {
      this$1.index = targetIndex
      this$1.updateRoute(route)
    })
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null
  this.options = options
  this.beforeHooks = []
  this.afterHooks = []
  this.match = createMatcher(options.routes || [])

  var mode = options.mode || 'hash'
  this.fallback = mode === 'history' && !supportsHistory
  if (this.fallback) {
    mode = 'hash'
  }
  if (!inBrowser) {
    mode = 'abstract'
  }
  this.mode = mode
};

var prototypeAccessors = { currentRoute: {} };

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  )

  this.app = app

  var ref = this;
    var mode = ref.mode;
    var options = ref.options;
    var fallback = ref.fallback;
  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this)
      break
    default:
      assert(false, ("invalid mode: " + mode))
  }

  this.history.listen(function (route) {
    this$1.app._route = route
  })
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn)
};

VueRouter.prototype.push = function push (location) {
  this.history.push(location)
};

VueRouter.prototype.replace = function replace (location) {
  this.history.replace(location)
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n)
};

VueRouter.prototype.back = function back () {
  this.go(-1)
};

VueRouter.prototype.forward = function forward () {
  this.go(1)
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents () {
  if (!this.currentRoute) {
    return []
  }
  return [].concat.apply([], this.currentRoute.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

VueRouter.install = install

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}

return VueRouter;

})));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

/**
 * vuex v2.0.0
 * (c) 2016 Evan You
 * @license MIT
 */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuex = factory());
}(this, (function () { 'use strict';

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook

  devtoolHook.emit('vuex:init', store)

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState)
  })

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}

function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options
    // store injection
    if (options.store) {
      this.$store = options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

function mapState (states) {
  var res = {}
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      return typeof val === 'function'
        ? val.call(this, this.$store.state, this.$store.getters)
        : this.$store.state[val]
    }
  })
  return res
}

function mapMutations (mutations) {
  var res = {}
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
}

function mapGetters (getters) {
  var res = {}
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedGetter () {
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val))
      }
      return this.$store.getters[val]
    }
  })
  return res
}

function mapActions (actions) {
  var res = {}
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
}

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Vue // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.")
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.")

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._options = options
  this._committing = false
  this._actions = Object.create(null)
  this._mutations = Object.create(null)
  this._wrappedGetters = Object.create(null)
  this._runtimeModules = Object.create(null)
  this._subscribers = []
  this._watcherVM = new Vue()

    // bind commit and dispatch to self
  var store = this
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  }

  // strict mode
  this.strict = strict

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], options)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state)

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); })
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm.state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.")
};

Store.prototype.commit = function commit (type, payload, options) {
    var this$1 = this;

  // check object-style commit
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }
  var mutation = { type: type, payload: payload }
  var entry = this._mutations[type]
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type))
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload)
    })
  })
  if (!options || !options.silent) {
    this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); })
  }
};

Store.prototype.dispatch = function dispatch (type, payload) {
  // check object-style dispatch
  if (isObject(type) && type.type) {
    payload = type
    type = type.type
  }
  var entry = this._actions[type]
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type))
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers
  if (subs.indexOf(fn) < 0) {
    subs.push(fn)
  }
  return function () {
    var i = subs.indexOf(fn)
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.")
  return this._watcherVM.$watch(function () { return getter(this$1.state); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm.state = state
  })
};

Store.prototype.registerModule = function registerModule (path, module) {
  if (typeof path === 'string') { path = [path] }
  assert(Array.isArray(path), "module path must be a string or an Array.")
  this._runtimeModules[path.join('.')] = module
  installModule(this, this.state, path, module)
  // reset store to update getters...
  resetStoreVM(this, this.state)
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path] }
  assert(Array.isArray(path), "module path must be a string or an Array.")
    delete this._runtimeModules[path.join('.')]
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1))
    Vue.delete(parentState, path[path.length - 1])
  })
  resetStore(this)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  updateModule(this._options, newOptions)
  resetStore(this)
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function updateModule (targetModule, newModule) {
  if (newModule.actions) {
    targetModule.actions = newModule.actions
  }
  if (newModule.mutations) {
    targetModule.mutations = newModule.mutations
  }
  if (newModule.getters) {
    targetModule.getters = newModule.getters
  }
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!(targetModule.modules && targetModule.modules[key])) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        )
        return
      }
      updateModule(targetModule.modules[key], newModule.modules[key])
    }
  }
}

function resetStore (store) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  var state = store.state
  // init root module
  installModule(store, state, [], store._options, true)
  // init all runtime modules
  Object.keys(store._runtimeModules).forEach(function (key) {
    installModule(store, state, key.split('.'), store._runtimeModules[key], true)
  })
  // reset vm
  resetStoreVM(store, state)
}

function resetStoreVM (store, state) {
  var oldVm = store._vm

  // bind store public getters
  store.getters = {}
  var wrappedGetters = store._wrappedGetters
  var computed = {}
  Object.keys(wrappedGetters).forEach(function (key) {
    var fn = wrappedGetters[key]
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); }
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; }
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: { state: state },
    computed: computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    // dispatch changes in all subscribed watchers
    // to force getter re-evaluation.
    store._withCommit(function () {
      oldVm.state = null
    })
    Vue.nextTick(function () { return oldVm.$destroy(); })
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length
  var state = module.state;
  var actions = module.actions;
  var mutations = module.mutations;
  var getters = module.getters;
  var modules = module.modules;

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1))
    var moduleName = path[path.length - 1]
    store._withCommit(function () {
      Vue.set(parentState, moduleName, state || {})
    })
  }

  if (mutations) {
    Object.keys(mutations).forEach(function (key) {
      registerMutation(store, key, mutations[key], path)
    })
  }

  if (actions) {
    Object.keys(actions).forEach(function (key) {
      registerAction(store, key, actions[key], path)
    })
  }

  if (getters) {
    wrapGetters(store, getters, path)
  }

  if (modules) {
    Object.keys(modules).forEach(function (key) {
      installModule(store, rootState, path.concat(key), modules[key], hot)
    })
  }
}

function registerMutation (store, type, handler, path) {
  if ( path === void 0 ) path = [];

  var entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler(getNestedState(store.state, path), payload)
  })
}

function registerAction (store, type, handler, path) {
  if ( path === void 0 ) path = [];

  var entry = store._actions[type] || (store._actions[type] = [])
  var dispatch = store.dispatch;
  var commit = store.commit;
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: dispatch,
      commit: commit,
      getters: store.getters,
      state: getNestedState(store.state, path),
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}

function wrapGetters (store, moduleGetters, modulePath) {
  Object.keys(moduleGetters).forEach(function (getterKey) {
    var rawGetter = moduleGetters[getterKey]
    if (store._wrappedGetters[getterKey]) {
      console.error(("[vuex] duplicate getter key: " + getterKey))
      return
    }
    store._wrappedGetters[getterKey] = function wrappedGetter (store) {
      return rawGetter(
        getNestedState(store.state, modulePath), // local state
        store.getters, // getters
        store.state // root state
      )
    }
  })
}

function enableStrictMode (store) {
  store._vm.$watch('state', function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.")
  }, { deep: true, sync: true })
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    )
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

var index = {
  Store: Store,
  install: install,
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
}

return index;

})));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {'use strict';

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(38);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(15);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(15);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(178)

/* script */
__vue_exports__ = __webpack_require__(47)

/* template */
var __vue_template__ = __webpack_require__(151)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 13 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {'use strict';

var utils = __webpack_require__(2);
var settle = __webpack_require__(30);
var buildURL = __webpack_require__(33);
var parseHeaders = __webpack_require__(39);
var isURLSameOrigin = __webpack_require__(37);
var createError = __webpack_require__(18);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(32);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(35);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var enhanceError = __webpack_require__(29);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["uppercase"] = uppercase;
/* harmony export (immutable) */ exports["host"] = host;
/* harmony export (immutable) */ exports["timeAgo"] = timeAgo;
function uppercase(str) {
  return str.toUpperCase();
}

function host(url) {
  var host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  var parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

function timeAgo(time) {
  var between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

// module.exports = {
//     getiframe: function(article){
//       var parser = new DOMParser ();
//       var xmlDoc = parser.parseFromString (article, "text/html");
//       var slide = xmlDoc.getElementsByTagName("iframe")[0];
//       return slide;
//     }
// };

/* http://www.2ality.com/2014/09/es6-modules-final.html */
/* http://www.2ality.com/2015/07/es6-module-exports.html */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(177)

/* script */
__vue_exports__ = __webpack_require__(59)

/* template */
var __vue_template__ = __webpack_require__(150)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-91a79d22"

module.exports = __vue_exports__


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return app; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








// sync the router with the vuex store.
// this registers `store.state.route`
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */]);

// register global utility filters.
Object.keys(__WEBPACK_IMPORTED_MODULE_5__filters__).forEach(function (key) {
  __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_5__filters__[key]);
});

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(_extends({
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */],
  filters: __WEBPACK_IMPORTED_MODULE_5__filters__
}, __WEBPACK_IMPORTED_MODULE_1__App_vue___default.a));

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
/* unused harmony reexport router */
/* unused harmony reexport store */


/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);
var bind = __webpack_require__(19);
var Axios = __webpack_require__(26);
var defaults = __webpack_require__(11);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(16);
axios.CancelToken = __webpack_require__(25);
axios.isCancel = __webpack_require__(17);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(40);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Cancel = __webpack_require__(16);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var defaults = __webpack_require__(11);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(27);
var dispatchRequest = __webpack_require__(28);
var isAbsoluteURL = __webpack_require__(36);
var combineURLs = __webpack_require__(34);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);
var transformData = __webpack_require__(31);
var isCancel = __webpack_require__(17);
var defaults = __webpack_require__(11);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ },
/* 29 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var createError = __webpack_require__(18);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ },
/* 32 */
/***/ function(module, exports) {

"use strict";
'use strict';

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ },
/* 34 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ },
/* 36 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var utils = __webpack_require__(2);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ },
/* 40 */
/***/ function(module, exports) {

"use strict";
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app_navbar_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app_navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_app_navbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_MyFooter_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_MyFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_MyFooter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//






// import $ from 'jquery'
// import jQuery from 'jquery'
// window.jQuery = jQuery

/* harmony default export */ exports["default"] = {
  components: {
    Navbar: __WEBPACK_IMPORTED_MODULE_0__components_app_navbar_vue___default.a,
    MyFooter: __WEBPACK_IMPORTED_MODULE_1__components_MyFooter_vue___default.a
  },
  data: function data() {
    return {
      myRoutes: [{ en: 'Home', t: '首頁', r: '' }, { en: 'User manual', t: '使用手冊', r: 'how-to-use' }, { en: 'About', t: '關於 vTaiwan', r: 'intro' }],
      catagories: [],
      allTopics: [],
      allNews: []
    };
  },

  methods: {
    pure: function pure(path) {
      var obj = this.myRoutes.filter(function (o) {
        return '/' + o.r == path;
      })[0];
      return obj ? obj.r : '';
    },
    getProgress: function getProgress(raw) {
      // var regex = /(?: (?:init )?)|\n/g;
      // var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      // var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      var re = /[0-9]+-[0-9]+-[0-9]+(\s[0-9]+:[0-9]+:[0-9]*)?/g;
      var start = new Date(raw.match(re)[0]);
      var end = new Date(raw.match(re)[1] || raw.match(re)[0]);
      var now = new Date();
      if (now > end) {
        return (end - start) / (24 * 60 * 60 * 1000); /* Math.floor? */
      } else {
        return (now - start) / (24 * 60 * 60 * 1000);
      }
    },
    getTotal: function getTotal(raw) {
      // var regex = /(?: (?:init )?)|\n/g;
      // var start = new Date(raw.split(regex)[1]+"T00:00:00+08:00");
      // var end = new Date(raw.split(regex)[2]+"T00:00:00+08:00");
      var re = /[0-9]+-[0-9]+-[0-9]+(\s[0-9]+:[0-9]+:[0-9]*)?/g;
      var start = new Date(raw.match(re)[0]);
      var end = new Date(raw.match(re)[1] || raw.match(re)[0]);
      return (end - start) / (24 * 60 * 60 * 1000);
    }
  },
  mounted: function mounted() {
    var _this = this;

    // $('#test0').hide(); // tester

    __WEBPACK_IMPORTED_MODULE_2__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/c/meta-data.json').then(function (response) {
      var topics = response.data.topic_list.topics.slice(1);
      topics.forEach(function (topic) {
        __WEBPACK_IMPORTED_MODULE_2__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + topic.id + '.json?include_raw=1').then(function (response) {
          var topic = response.data;

          var tmp = {};

          tmp['id'] = topic['id'];
          tmp['routeName'] = topic['title'].split(" ")[1];
          tmp['title'] = topic['title'].split(" ")[0];
          tmp['catas'] = topic['tags'];
          tmp['likes'] = 0;

          var firstPost = topic.post_stream.posts[0];
          var lastPost = topic.post_stream.posts.slice(-1)[0];

          tmp['slogan'] = /slogan *: *(.*)/g.exec(firstPost.raw)[1];
          tmp['status'] = firstPost.id === lastPost.id ? "即將開始" : lastPost.raw.split(" ")[0];
          if (tmp['status'] === "意見徵集") {
            tmp['progress'] = _this.getProgress(lastPost.raw);
            tmp['total'] = _this.getTotal(lastPost.raw);
          }

          tmp['owner'] = /@(\w+)/g.exec(firstPost.raw)[1];
          tmp['cover'] = /cover *: *(.*)/g.exec(firstPost.raw)[1];

          _this.allTopics.push(tmp);
        });
      });
    });

    __WEBPACK_IMPORTED_MODULE_2__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/posts/2094.json?include_raw=1').then(function (response) {
      var configs = response.data.raw.split('\n');
      configs.forEach(function (config) {
        var tmp = {};
        tmp['t'] = config.split(" ")[0];
        tmp['routeName'] = config.split(" ")[1];
        tmp['cover'] = config.split(" ")[2];
        _this.catagories.push(tmp);
      });
    });

    __WEBPACK_IMPORTED_MODULE_2__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/facebook/1249/last.json?include_raw=1') //news
    .then(function (response) {
      var news = response.data;
      news = news['post_stream']['posts'].slice(1);

      news.forEach(function (post) {
        var tmp = {};
        var tag = {};
        var tags = [];
        post = post['raw'].split("<br>");
        tmp['title'] = post[1];
        tmp['content'] = post[3];
        tmp['img_link'] = post[5];
        tmp['source'] = post[7];
        if (post[9] != "") {
          tag = post[9].split("\n")[0].replace(/，|#/g, " ");
          tag = tag.split(" ");
          for (var i in tag) {
            if (tag[i] != "") {
              tags.push(tag[i]);
            }
          }
        }
        tmp['tags'] = tags;
        tmp['news_link'] = post[11];
        tmp['source_link'] = post[11].split("/")[2];
        tmp['setup_time'] = post[13];
        _this.allNews.push(tmp);
      });
      console.log(_this.allNews);
    });
  }
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'Home',
  components: {
    Discussion_Comment: __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue___default.a

  },
  props: ['allTopics', 'catagories'],
  data: function data() {
    return {
      subject: "",
      content: "",
      Discussion: [],
      more: [],
      counter: ""
    };
  },


  methods: {
    getContactus: function getContactus(id) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_1__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/c/contactus/l/latest.json?page=' + id)
      //caxios.get('https://talk.pdis.nat.gov.tw/c/pdis-site/how-we-work-track/l/latest.json?page='+ id) //pdis
      .then(function (response) {
        _this.more = response.data['topic_list'];
        var discus = response.data['topic_list'];
        discus = discus['topics'].slice(1); // 取得詳細內容(第一篇)
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = discus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            _this.Discussion.push(i);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    },

    greet: function greet(event) {
      this.counter++;
      this.getContactus(this.counter);
    }
  },
  created: function created() {
    this.getContactus(0);
  },
  updated: function updated() {
    $('.ui.accordion').accordion();
    $('.ui.form').form({
      fields: {
        subject: {
          rules: [{
            type: 'minLength[10]',
            prompt: '標題字數須達10個字以上'
          }]
        },
        content: {
          rules: [{
            type: 'minLength[20]',
            prompt: '內容字數須達10個字以上'
          }]
        }
      },
      onSuccess: function onSuccess(event, fields) {
        window.location.href = "mailto:replies+contactus@vtaiwan.tw?subject=" + fields.subject + "&body=" + fields.content;
      }
    });
  }
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_HotProposal_vue__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_HotProposal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_HotProposal_vue__);
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'Detail_Catagory',
  components: {
    HotProposal: __WEBPACK_IMPORTED_MODULE_0__home_HotProposal_vue___default.a
  },
  props: ['catagories', 'allTopics'],
  data: function data() {
    return {
      //...
    };
  },

  computed: {
    myC: function myC() {
      var rtName = this.$route.params.cRouteName;
      return this.catagories.filter(function (o) {
        return o.routeName == rtName;
      })[0];
      // return this.catagories[this.$route.params.cId]
    },
    cataTopics: function cataTopics() {
      var myCT = this.myC.t;
      return this.allTopics.filter(function (o) {
        return o.catas.indexOf(myCT) > -1;
      });
    }
  }
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Slide_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Slide_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Slide_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Detail_Topic_NextStage_vue__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Detail_Topic_NextStage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Detail_Topic_NextStage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Description_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Description_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Description_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Detail_Topic_Discussion_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Detail_Topic_Discussion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Detail_Topic_Discussion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Detail_Topic_Timeline_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Detail_Topic_Timeline_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Detail_Topic_Timeline_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import axios from 'axios'


// import info from './Detail_info.vue'




/* harmony default export */ exports["default"] = {
  name: 'Detial_Topic',
  props: ['allTopics'],
  components: {
    NextStage: __WEBPACK_IMPORTED_MODULE_1__Detail_Topic_NextStage_vue___default.a,
    Slide: __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Slide_vue___default.a,
    // info,
    Description: __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Description_vue___default.a,
    Discussion: __WEBPACK_IMPORTED_MODULE_3__Detail_Topic_Discussion_vue___default.a,
    Timeline: __WEBPACK_IMPORTED_MODULE_4__Detail_Topic_Timeline_vue___default.a
  },
  data: function data() {
    return {
      myIdx: 0, /* default page */
      tabcontent: ["詳細內容", "議題時間軸", "參與討論"],
      stage: ["即將開始", "意見徵集", "研擬草案", "送交院會", "歷史案件"]
    };
  },

  computed: {
    article: function article() {
      var rtName = this.$route.params.tRouteName;
      var t = this.allTopics.filter(function (o) {
        return o.routeName == rtName;
      })[0];
      if (t === undefined) {
        return new Object();
      } else {
        return t;
      };
    }
  },
  methods: {
    // accordion:function(){
    //   $('.ui.accordion').accordion();
    // },
    showSidebar: function showSidebar() {
      $('.ui.left.sidebar').sidebar('show');
      // $('.ui.left.sidebar').next().remove('.ui.left.sidebar'); 
    },
    hideSidebar: function hideSidebar() {
      $('.ui.left.sidebar').sidebar('hide');
    },
    routename: function routename() {
      return this.$route.params.tRouteName;
    }
  },
  mounted: function mounted() {
    $('.ui.left.sidebar').sidebar({
      context: $('.pushable'),
      dimPage: false,
      transition: 'overlay',
      mobileTransition: 'overlay',
      // scrollLock: true,
      delaySetup: true
    }).sidebar('attach events', '#sidebar .menu');
  },
  watch: {
    article: function article() {
      var meta_img = document.createElement('meta');
      meta_img.setAttribute("property", "og:image");
      meta_img.content = this.article.cover;
      $('meta[property="og:image"]').remove();
      document.getElementsByTagName('head')[0].appendChild(meta_img);

      var meta_title = document.createElement('meta');
      meta_title.setAttribute("property", "og:title");
      meta_title.content = this.article.title + " - vTaiwan.tw";
      $('meta[property="og:title"]').remove();
      document.getElementsByTagName('head')[0].appendChild(meta_title);
    }
  },
  updated: function updated() {
    //$('.ui.accordion').accordion();
  }
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  props: ['article'],
  data: function data() {
    return {
      information: "" // 詳細內容
    };
  },

  methods: {
    getDescription: function getDescription(id) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1').then(function (response) {
        var detail_info = response.data['post_stream']['posts'][0]['cooked'].split("<hr>")[1]; // 取得詳細內容(第一篇)
        _this.information = detail_info.replace(/<if.*slideshare.*e>/, ""); //詳細內容slideshare拿掉
        return _this.information;
      });
    }
  },
  created: function created() {
    this.getDescription(this.article.id);
  },
  updated: function updated() {
    this.getDescription(this.article.id);
  }
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_discourse_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Discussion_Comment_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Discussion_Comment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Discussion_Comment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_chineseSort_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_chineseSort_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__js_chineseSort_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ exports["default"] = {
  props: ['article'],
  components: {
    Discussion_Comment: __WEBPACK_IMPORTED_MODULE_2__Detail_Topic_Discussion_Comment_vue___default.a
  },
  data: function data() {
    return {
      dType: {},
      lastStep: ""
    };
  },

  methods: {
    accordion: function accordion() {
      $('.ui.accordion').accordion();
    },
    discussionType: function discussionType(val) {
      var _this = this;

      var id = val.id; // just for alias
      this.dType = { // initialize dType
        'type': []
      };

      var dType = this.dType; // just for alias
      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1').then(function (response) {
        var detail_info = response.data;
        var regex = /(?: (?:init )?)|\n/g;
        var link = [];
        detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = detail_info[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (i['raw'].indexOf("意見徵集") == 0 || i['raw'].indexOf("研擬草案") == 0) {
              link = i['raw'].split(/\s/); // add link to link[]
            }
            _this.lastStep = i['raw'].split(" ", 1)[0];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = link[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var j = _step2.value;

            if (j.indexOf("pol.is") > -1) {
              //篩出含有polis的連結  
              dType.type.push('polis');
              // dType.polis = j.replace(/.*\//, "")
              dType.polis = "<iframe src=" + j + " frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
            } else if (j.indexOf("sli.do") > -1) {
              //篩出含有slido的連結    
              dType.type.push('slido');
              dType.slido = "<iframe src=" + j + "frameborder='0' width='100%' height='1000px' data-reactid='.0.2.0.0.0'></iframe>";
            } else if (j.indexOf("livehouse") > -1) {
              //篩出含有slido的連結    
              dType.type.push('livehouse');
              dType.livehouse = "<iframe width='100%' height='1000px' src='" + j.replace("livehouse.in/", "livehouse.in/embed/") + "' frameborder='0' allowfullscreen></iframe>";
            } else if (j.indexOf("hackpad.com") > -1) {
              //篩出含有hackpad的連結    
              var hack = j.replace(/https.*-/, "");
              dType.type.push('hackpad');
              dType.hackpad = "<iframe id='hackpad-" + hack + "' src='https://hackpad.com/" + hack + "' scrolling='yes' height='1000px' width='100%' frameborder='0'></iframe>";
              // https://hackpad.com/ep/api/embed-pad?padId=
            } else if (j.indexOf("talk.vtaiwan.tw") > -1) {
              //篩出含有discourse的連結
              j = j.replace(/(.*)\/$/, "$1"); // discard last char '/'
              __WEBPACK_IMPORTED_MODULE_1__js_discourse_js__["a" /* default */].getAllTopics(j + '.json', 0).then(function (response) {
                var topics = response.sort(function (a, b) {
                  return __WEBPACK_IMPORTED_MODULE_3__js_chineseSort_js___default()(a.title, b.title);
                });
                dType.type.push('discourse');
                dType.discourse = topics.map(function (t) {
                  return {
                    'title': t.title,
                    'id': t.id
                  };
                });
                // dType.check = true
                /* "return" cannot return outside axios, so use this.var instead */
              });
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    }
  },
  watch: {
    article: function article(val) {
      this.discussionType(val);
    }
  },
  created: function created() {
    this.discussionType(this.article); /* first time call */
  },
  updated: function updated() {
    $('.ui.accordion').accordion();
  }
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {
  props: ['comment_id', 'slice'],
  data: function data() {
    return {
      comment: [],
      views: [],
      check: []
    };
  },

  methods: {
    getDiscussion_Comment: function getDiscussion_Comment(val) {
      var _this = this;

      this.check = 0;
      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/topic/' + val + '.json').then(function (response_comment) {
        var dcomment = {};
        _this.views = response_comment['data']; //觀看人數
        if (_this.slice == true) {
          _this.comment = response_comment['data']['post_stream']['posts'].slice(1);
        } else if (_this.slice == false) {
          _this.comment = response_comment['data']['post_stream']['posts'];
        }
        for (var i = 0; i < _this.comment.length; i++) {
          if (_this.comment[i]['avatar_template'].indexOf("https:") == -1) {
            //判斷是否含有https網址
            _this.comment[i]['avatar_template'] = _this.comment[i]['avatar_template'].replace(/.*/, 'https://talk.vtaiwan.tw' + _this.comment[i]['avatar_template']); //抓取icon
          }
          _this.comment[i]['avatar_template'] = _this.comment[i]['avatar_template'].replace(/{size}/, "100"); //icon size =100
          _this.comment[i]['created_at'] = _this.comment[i]['created_at'].replace(/T.*/, ""); //發文日期
          if (_this.comment[i]['cooked'].indexOf("htpp") > -1) {
            //判斷從discourse 來的圖片是否為完整網址
            _this.comment[i]['cooked'] = _this.comment[i]['cooked'].replace(/<img src="/, '<img src="https://talk.vtaiwan.tw'); //不完整的話加入https://talk.vtaiwan.tw
          }
        }

        var today = new Date();
        if (_this.views['last_posted_at'] != null) {
          var lastpostday = new Date(_this.views['last_posted_at']);
          var date = (today - lastpostday) / (1000 * 60 * 60 * 24);
          if (date > 1) {
            _this.views['last_posted_at'] = Math.floor(date) + " 天 ";
          } else if (date > 0.041) {
            _this.views['last_posted_at'] = Math.floor(date * 24) + " 小時 ";
          } else if (date < 0.041) {
            _this.views['last_posted_at'] = Math.floor(date * 24 * 60) + " 分鐘 ";
          }
        } else {
          _this.views['last_posted_at'] = "0";
        }
      });
      return this.check = 1;
    }
  },
  created: function created() {
    this.getDiscussion_Comment(this.comment_id);
  },
  watch: {
    comment_id: function comment_id(val) {
      this.getDiscussion_Comment(val);
    }
  }

};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {

  props: ['article'],

  data: function data() {
    return {
      steps: {}
    };
  },

  methods: {
    getProgress: function getProgress(val) {
      var _this = this;

      var id = val.id;
      this.steps = { // initialize dType
        'stage': []
      };
      var step = this.steps; // just for alias
      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1').then(function (response) {
        var detail_info = response.data;
        var steps = [{
          title: "即將開始",
          active: false,
          current: false
        }, {
          title: "意見徵集",
          active: false,
          current: false
        }, {
          title: "研擬草案",
          active: false,
          current: false
        }, {
          title: "送交院會",
          active: false,
          current: false
        }, {
          title: "歷史案件",
          active: false,
          current: false
        }];
        detail_info = detail_info['post_stream']['posts'].slice(1); // 取得簡介底下內容

        var end = detail_info.length - 1;

        var current = detail_info[end]['raw'].split(" ")[0]; //目前進展
        _this.status = current;

        for (var i in detail_info) {
          //簡介底下每篇回文
          var init = detail_info[end]['raw'].split(" ")[1]; // if init

          for (var j in steps) {
            steps[j]['active'] = true;
            if (steps[j]['title'] === current && init === 'init') {
              //如果是"意見徵集 init",就將active啟動並取消visited
              steps[j]['current'] = true;
              steps[j]['active'] = false;
              step.stage = steps;
              return step.stage; // 回傳五階段array
            }
            if (steps[j]['title'] === current) {
              //如果是"意見徵集",就將active啟動並取消visited
              steps[j]['current'] = true;
              steps[j]['active'] = false;
              step.stage = steps;
              return step.stage; // 回傳五階段array
            }
          }
        }
      });
    }
  },
  created: function created() {
    this.getProgress(this.article);
  },
  watch: {
    article: function article(val) {
      this.getProgress(val);
    }
  }

};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  props: ['article'],
  data: function data() {
    return {
      slide: "" // 詳細內容
    };
  },

  methods: {
    getSlide: function getSlide(val) {
      var id = val.id;
      this.slide = { // initialize dType
        'content': ""
      };
      var slide = this.slide; // just for alias
      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1').then(function (response) {
        var detail_info = response.data;
        var parser = new DOMParser();
        detail_info = detail_info['post_stream']['posts'][0]['cooked']; // 取得議題時間軸內容
        var xmlDoc = parser.parseFromString(detail_info, "text/html");
        var result = xmlDoc.getElementsByTagName("iframe")[0].outerHTML;
        slide.content = result;
        return slide.content;
      });
    }
  },
  created: function created() {
    this.getSlide(this.article);
  },
  watch: {
    article: function article(val) {
      this.getSlide(val);
    }
  }
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_request__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ParticipationLink_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ParticipationLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ParticipationLink_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ exports["default"] = {

  props: ['article'],
  components: {
    Plink: __WEBPACK_IMPORTED_MODULE_1__ParticipationLink_vue___default.a
  },
  data: function data() {
    return {
      timeline: {}, // 時間軸
      timeline_title: ["議題時間", "議題階段", "相關連結"]
    };
  },

  methods: {
    getTimeline: function getTimeline(val) {
      var id = val.id;
      this.timeline = { // initialize dType
        'time': []
      };
      var line = this.timeline; // just for alias
      __WEBPACK_IMPORTED_MODULE_0__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1').then(function (response) {
        var detail_info = response.data;
        detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

        for (var i in detail_info) {
          var regex = /(?: (?:init )?)|\n/g; // 用來分開字串
          var date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g; //yyyy-mm-dd(ex:2016-10-31)
          var time_regex = /^(2[0-3]|1[0-9]|0[0-9]|[^0-9][0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/g; // hh:mm:ss(ex:19:00:00)
          var timeline_content = {}; // 時間軸內容
          var comment = {}; // 暫存處理回覆內容
          var links = []; // 回覆中的連結
          timeline_content['title'] = detail_info[i]['raw'].split(regex)[0]; // 進度
          timeline_content['start'] = detail_info[i]['raw'].split(regex)[1]; // 開始日期

          comment = detail_info[i]['raw'].split(regex); // 每一個議題簡介(第一篇)底下回覆內容

          if (timeline_content['start'].length > detail_info[i]['raw'].split(regex)[2].length) {
            // 若為"寫草案" 則無結束日期 僅開始日期
            timeline_content['start'] = timeline_content['start'] + " " + detail_info[i]['raw'].split(regex)[2];
            timeline_content['end'] = null;
          } else {
            // 有結束日期
            timeline_content['end'] = detail_info[i]['raw'].split(regex)[2]; // 結束日期
          }
          if (detail_info[i]['raw'].split(regex)[2].length > 10) {
            // 無結束日期
            timeline_content['end'] = null;
          }
          for (var j = 1; j < comment.length; j++) {
            // 回覆中的連結處理
            if (comment[j].indexOf("http") > -1) {
              // 字串含有"http" -> 連結
              links.push(detail_info[i]['raw'].split(regex)[j]);
            }
            if (comment[j].indexOf("http") == -1 && comment[j].match(date_regex) == null && comment[j].match(time_regex) == null) {
              // 字串不符合網址、日期、時間等格式 ->  簡介
              timeline_content['info'] = comment[j];
            }
          }
          timeline_content['link'] = links;

          line.time.push(timeline_content);
          line.time.sort(function (a, b) {
            return new Date(b.start).getTime() - new Date(a.start).getTime();
          });
        }
        return line.time;
      });
    }
  },
  watch: {
    article: function article(val) {
      this.getTimeline(val);
    }
  },
  created: function created() {
    this.getTimeline(this.article);
  }
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_Slideshow_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_Slideshow_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_Slideshow_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_ProposalTab_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_ProposalTab_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__home_ProposalTab_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_News_vue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_News_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_News_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import StepGuide from './home_StepGuide.vue'
// import HotProposal from './home_HotProposal.vue'

// import Catagories from './home_Catagories.vue'


/* harmony default export */ exports["default"] = {
  name: 'Home',
  components: {
    Slideshow: __WEBPACK_IMPORTED_MODULE_0__home_Slideshow_vue___default.a,
    // StepGuide,
    // HotProposal,
    ProposalTab: __WEBPACK_IMPORTED_MODULE_1__home_ProposalTab_vue___default.a,
    News: __WEBPACK_IMPORTED_MODULE_2__app_News_vue___default.a
    // Catagories,


  },
  props: ['allTopics', 'catagories', 'allNews'],
  data: function data() {
    return {
      n_hot: 5
    };
  },

  computed: {
    hotTopics: function hotTopics() {
      return this.allTopics.sort(function (a, b) {
        return b.likes - a.likes;
      }).slice(0, this.n_hot);
    }
  }
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'HowToUse',
  data: function data() {
    return {
      data: '...'
    };
  }
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'Comment',
  data: function data() {
    return {
      data: '...'
    };
  }
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'Login',
  data: function data() {
    return {
      data: '...'
    };
  }
};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

// import axios from 'axios'
// import $ from 'jQuery'
var main = __webpack_require__(20);
/* harmony default export */ exports["default"] = {
  props: ['urllink'],
  data: function data() {
    return {
      ulinkall: [],
      data_base_non: [{
        icon: "linkify",
        text: "相關"
      }],
      data_base: [{
        key: 'hackpad',
        icon: "pencil",
        text: "共筆"
      }, {
        key: 'sayit',
        icon: "book",
        text: "記錄"
      }, {
        key: 'youtube',
        icon: "youtube play",
        text: "直播"
      }, {
        key: 'livehouse',
        icon: "youtube play",
        text: "直播"
      }, {
        key: 'pol.is',
        icon: "users",
        text: "討論"
      }, {
        key: 'talk.vtaiwan.tw',
        icon: "edit",
        text: "留言"
      }, {
        key: 'app.sli.do',
        icon: "bullhorn",
        text: "提問"
      }, {
        key: 'PDF',
        icon: "download disk",
        text: "PDF"
      }, {
        key: 'g0v.github',
        icon: "github alternate",
        text: "GitBook"
      }]
    };
  },


  created: function created(a, b) {

    for (var i = 0; i < this.urllink.length; i++) {
      var tag = 0;
      for (var j = 0; j < this.data_base.length; j++) {
        if (this.urllink[i].indexOf(this.data_base[j].key) != -1) {

          var item = {};
          item.link = this.urllink[i];
          item.icon = this.data_base[j].icon;
          item.text = this.data_base[j].text;
          this.ulinkall.push(item);
          /* 判斷是否為data_base中的連結 */
          // this.ulinkall 
          //   .push("<a href="+this.urllink[i]+" target='_blank' class='ui teal icon button'>"+
          //     this.data_base[j].icon+
          //     "<span class='fat-only'> "+
          //     this.data_base[j].text+
          //     "</span>"+
          //     "</a>"
          //   );
          tag = 1;
        }
      }
      if (tag != 1) /* 如果不是為data_base的連結 則變成相關連結 */
        {
          var _item = {};
          _item.link = this.urllink[i];
          _item.icon = this.data_base_non[0].icon;
          _item.text = this.data_base_non[0].text;
          this.ulinkall.push(_item);
          // this.ulinkall
          //   .push("<a href="+this.urllink[i]+" target='_blank' class='ui teal icon button'>"+
          //     this.data_base_non[0].icon+
          //     "<span class='fat-only'> "+
          //     this.data_base_non[0].text+
          //     "</span>"+
          //     "</a>"
          //   );
        }
    }
  }
};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_request__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'Home',
  components: {
    Discussion_Comment: __WEBPACK_IMPORTED_MODULE_0__Detail_Topic_Discussion_Comment_vue___default.a

  },
  props: ['allTopics', 'catagories'],
  data: function data() {
    return {
      email: "",
      content: "",
      Discussion: [],
      more: []
    };
  },


  methods: {
    getContactus: function getContactus(id) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_1__js_request__["a" /* default */].get('https://talk.vtaiwan.tw/c/newsletter/l/latest.json?page=' + id).then(function (response) {
        _this.more = response.data['topic_list'];
        var discus = response.data['topic_list'];
        discus = discus['topics'].slice(1); // 取得詳細內容(第一篇)
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = discus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            _this.Discussion.push(i);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    },


    greet: function greet(event) {
      this.counter++;
      this.getContactus(this.counter);
    }
  },
  created: function created() {
    this.getContactus(0);
  },
  updated: function updated() {
    var vm = this;
    $('.ui.accordion').accordion();
    $('.follow.button').api('query');
    $('.ui.form').form({
      fields: {
        email: {
          rules: [{
            type: 'email',
            prompt: '請輸入正確email'
          }]
        }
      },
      onSuccess: function onSuccess(event, fields) {
        $.ajax({
          type: "POST",
          url: "https://talk.vtaiwan.tw/invites?api_key=ee7e1395d767055387db097d51fab90bfee69b806dc276adcf6a22f691fad5df&api_username=vtaiwaninvite",
          data: { "email": fields.email },
          success: function success() {
            alert('成功訂閱');
          },
          error: function error() {
            alert('使用者已註冊過');
          }
        });
      }
    });
  }
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'Track',
  data: function data() {
    return {
      data: '...'
    };
  }
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'News',
  props: ['allNews'],
  mounted: function mounted() {
    /* initialize swiper when document ready */
    var mySwiper1 = new Swiper('.swiper-container1', {
      observer: true,
      direction: 'horizontal',
      //   pagination: '.swiper-pagination',
      //   autoplay: 5000,
      slidesPerView: 5,
      //   paginationClickable: true,
      spaceBetween: 10,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'

    });
    var mySwiper2 = new Swiper('.swiper-container2', {
      observer: true,
      autoplay: 5000,
      direction: 'horizontal',
      //   nextButton: '.swiper-button-next',
      //   prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      scrollbar: '.swiper-scrollbar'
    });
    mySwiper1.on('imagesReady', this.ellipsis);
    mySwiper2.on('imagesReady', this.ellipsis);
  },
  updated: function updated() {
    this.ellipsis();
  },
  methods: {
    ellipsis: function ellipsis() {
      var len = 60; // 超過50個字以"..."取代
      $(".JQellipsis").each(function (i) {
        if ($(this).text().length > len) {
          $(this).attr("title", $(this).text());
          var text = $(this).text().substring(0, len - 1) + "...";
          $(this).text(text);
        }
      });
    }
  }
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'resault',
  props: ['allTopics', 'myKey', 'myIdx'],
  data: function data() {
    return {
      temp: []
    };
  },

  computed: {
    results: function results() {
      var k = this.myKey;
      var reg = new RegExp(k, 'i');
      var result = this.allTopics.filter(function (o) {
        return reg.test(o.title) || reg.test(o.routeName);
      });
      return result;
    },
    stage: function stage() {
      var k = this.myKey;
      var reg = new RegExp(k, 'i');
      this.temp = [];
      var result = this.allTopics.filter(function (o) {
        return reg.test(o.title) || reg.test(o.routeName);
      });
      for (var i = 0; i < result.length; i++) {
        this.temp.push(result[i].status);
      }
      return this.temp.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
      });
    }
  },
  methods: {
    toHTML: function toHTML(str, k) {
      var ans = '' + str;
      var reg = new RegExp(k, 'gi');
      ans = ans.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      ans = ans.replace(reg, '<strong>' + k + '</strong>');
      return ans;
    },
    sHide: function sHide() {
      $("#searchresult").hide();
    }

  }
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'navbar',
  props: ['routes', 'allTopics'],
  components: {
    SearchResult: __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue___default.a
  },
  data: function data() {
    return {
      myKey: '',
      myIdx: 0,
      showDropDown: false
    };
  },

  methods: {
    onKeyDown: function onKeyDown() {
      this.myIdx++;
      this.showDropDown = true;
      // body...
    }
  }
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: "search",
  props: ['routes', 'allTopics'],
  components: {
    SearchResult: __WEBPACK_IMPORTED_MODULE_0__app_nav_SearchResult_vue___default.a
  },
  data: function data() {
    return {
      myKey: '',
      myIdx: 0,
      showDropDown: false
    };
  },

  methods: {
    onKeyDown: function onKeyDown() {
      this.myIdx++;
      this.showDropDown = true;
      // body...
    }
  }

};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'hotProposal',
  props: ['hotProposal', 'header'],
  data: function data() {
    return {
      //...'/step/0'
    };
  }
};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_propTabs_Box_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_propTabs_Box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_propTabs_Box_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {
  name: 'proposalTab',
  props: ['allTopics'],
  components: {
    Box: __WEBPACK_IMPORTED_MODULE_0__home_propTabs_Box_vue___default.a
  },
  data: function data() {
    return {
      myIdx: 1, /* default tab */
      onMobile: false,
      steps: [{
        label: '即將開始',
        description: '在草案未形成前跳脫時間空間限制，擴大搜集利害相關人之意見',
        dataName: 'soon'
      }, {
        label: '意見徵集',
        description: '邀請核心利害相關者參與諮詢會議，加入實體見面討論，一同將意見化為草案',
        dataName: 'discuss'
      }, {
        label: '研擬草案',
        description: '將成熟的草案加強、寫成定案',
        dataName: 'curate'
      }, {
        label: '送交院會',
        description: '送交立法院',
        dataName: 'deploy'
      }, {
        label: '歷史案件',
        description: '追蹤審查進度與結果',
        dataName: 'history'
      }]
    };
  },

  mounted: function mounted() {
    // initialize sticky element
    $("#mobile-step.sticky").sticky({
      context: "#context",
      observeChanges: true,
      silent: true
    });
    // window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    mySort: function mySort(dataName) {
      var boxes = void 0;

      switch (dataName) {
        case "soon":
          boxes = this.allTopics.slice().filter(function (topic) {
            return topic.status === "即將開始";
          }).sort(function (a, b) {
            return 1;
            // replace this by other logic...
          }).slice(0, 8);
          break;

        case "discuss":
          boxes = this.allTopics.slice().filter(function (topic) {
            return topic.status === "意見徵集";
          }).sort(function (a, b) {
            return 1;
            // replace this by other logic...
          }).slice(0, 8);
          break;

        case "curate":
          boxes = this.allTopics.slice().filter(function (topic) {
            return topic.status === "研擬草案";
          }).sort(function (a, b) {
            return 1;
            // replace this by other logic...
          }).slice(0, 8);
          break;

        case "deploy":
          boxes = this.allTopics.slice().filter(function (topic) {
            return topic.status === "送交院會";
          }).sort(function (a, b) {
            return 1;
            // replace this by other logic...
          }).slice(0, 8);
          break;

        case "history":
          boxes = this.allTopics.slice().filter(function (topic) {
            return topic.status === "歷史案件";
          }).sort(function (a, b) {
            return 1;
            // replace this by other logic...
          }).slice(0, 8);
          break;
      }

      return boxes;
    },
    onStickTo: function onStickTo(idx, e) {
      var el = "#mobile-step a[href='#" + e[0] + "']";
      $(el).parent().children().removeClass('active');
      $(el).addClass('active');
      this.myIdx = idx;
    },
    // handleScroll: function(){
    //   var mobile_steps = $("#mobile-step");
    //   if(mobile_steps.length>0)
    //   {
    //     mobile_steps.sticky('refresh');
    //     // mobile_steps[0].style.left="0px"
    //   }
    // },
    handleResize: function handleResize() {
      if (typeof window !== 'undefined') {
        this.onMobile = window.innerWidth < 768;
        this.myIdx = this.onMobile ? 0 : 1; /* default tab for mobile and screen */
      } else this.onMobile = false;
    }
  }
};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import $ from 'jquery'

/* harmony default export */ exports["default"] = {
  name: 'SlideShow',
  props: ['hotTopics', 'allTopics'],
  data: function data() {
    return {
      // c: 0,
      // lastC: 0,
      // isBusy: false
    };
  },

  // computed: {
  // mySlideTopics: function () {
  //   var c = this.c;
  //   var lastC = this.lastC;
  //   var ts = this.hotTopics;
  //   return ts.map(function (o, idx) {
  //     //o.transform = 'translateX('+ (idx-c) * 100 +'%)';
  //     o.transform = 'translateX(0%)';

  //     if (idx == c-1 || (c == 0 && idx == ts.length-1)) {
  //       o.transform = 'translateX(-100%)';
  //     }
  //     if (idx == c+1 || (c == ts.length-1 && idx == 0)) {
  //       o.transform = 'translateX(100%)';
  //     }
  //     o.zIndex = (idx == c || idx == lastC) ? 4 : 3;
  //     o.opacity = (idx == c || idx == lastC) ? 1 : 0;

  //     // combine styles into single 
  //     o.style = {
  //       'z-index': o.zIndex, 
  //       'opacity': o.opacity, 
  //       'transform': o.transform, 
  //       '-ms-transform': o.transform, 
  //       '-webkit-transform': o.transform, 
  //       'background': 'url(' + o.cover + ') 100% 100% / cover'
  //     };

  //     o.new_style = {
  //       'background': 'url(' + o.cover + ') 100% 100% / cover'
  //     }
  //     return o
  //   })
  // },
  // },
  // methods: {
  //   cycle: function (n) {

  //     let c = this.c;
  //     let ts = this.hotTopics;

  //     if (!this.isBusy) {
  //       this.lastC = c;
  //       c = c + n;

  //       if (c < 0) {
  //         c = ts.length + c;
  //       }
  //       if (c >= ts.length) {
  //         c = c - ts.length;
  //       }

  //       this.isBusy = true;
  //       setTimeout(function(){
  //         this.isBusy = false;
  //       }, 500)
  //     }
  //     return c;
  //   }
  // },
  mounted: function mounted() {

    setTimeout(function () {

      /* initialize swiper when document ready */
      new Swiper('.swiper-container', {
        scrollbar: '.swiper-scrollbar',
        autoplay: 8000,
        direction: 'horizontal',
        keyboardControl: true,
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 2,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true
      });

      /* disable loader */
      $('#loader').removeClass('active');
    }, 1000);

    // new Swiper ('.swiper-container', {
    //   // nextButton: '.swiper-button-next',
    //   // prevButton: '.swiper-button-prev',
    //   // pagination: '.swiper-pagination',
    //   scrollbar: '.swiper-scrollbar',
    //   observer: true,
    //   autoplay: 8000,
    //   direction: 'horizontal',
    //   keyboardControl: true,
    //   slidesPerView: 1.2,
    //   centeredSlides: true,
    //   // paginationClickable: true,
    //   spaceBetween: 2,
    //   // loop: true,
    // })
  }
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'box',
  props: ['list', 'desc', 'label', 'name'],
  data: function data() {
    return {
      isSent: false
    };
  },

  mounted: function mounted() {
    /* bind event scroll to window */
    window.addEventListener('scroll', this.mTitleHitEvent);
    // $(window).scroll(this.mTitleHitEvent)
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.mTitleHitEvent);
  },
  methods: {
    mTitleHitEvent: function mTitleHitEvent() {
      var btn_name = this.name;
      var el = $("#" + btn_name);
      if (!el.length) /* check if m-title exist */
        return 0;
      var mTop = el.offset().top; /* m-title's position */
      var mHeight = el.height(); /* m-title's height */
      var wScroll = $(window).scrollTop(); /* length window has scrolled */
      var isSent = this.isSent;
      /* minus 1 to be safer */
      var isScollingOn = wScroll > mTop - 1 && wScroll < mTop + mHeight;
      if (isScollingOn && !isSent) {
        /* do not double sent */
        this.$emit('stickTo', btn_name); /* sent event trigger to parent comp */
        this.isSent = true;
      } else if (!isScollingOn) {
        this.isSent = false;
      }
    },
    progressStyle: function progressStyle(progress, total) {
      var color = '#3fadc7'; /* $main_color */
      var percent = progress / total * 100;
      // let style = {"background": "linear-gradient(to right, "+color+" 0%, "+color+" "+percent+"%, #AAA "+percent+".1%, #AAA 100%)"}
      var style = { "width": percent + "%" };
      return style;
    }
  }
};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function (a, b) {

    var naturalSort = __webpack_require__(99);

    var c2n = { "一": "1", "二": "2", "三": "3", "四": "4", "五": "5", "六": "6", "七": "7", "八": "8", "九": "9", "十": "10" };

    function ChineseToNumber(str) {
        str = str.replace(/一|二|三|四|五|六|七|八|九|十/gi, function (matched) {
            return c2n[matched];
        });
        return str;
    }

    return naturalSort(ChineseToNumber(a), ChineseToNumber(b));
};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(3);


/* harmony default export */ exports["a"] = {
    getAllTopics: function getAllTopics(categoryUri) {

        var allTopics = [];

        function getTopics(categoryUri, page) {
            return __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */].get(categoryUri + "?include_raw=1&page=" + page).then(function (result) {
                var topics = result['data']['topic_list']['topics'];
                allTopics = allTopics.concat(topics);
                if (topics.length > 0) {
                    page += 1;
                    return getTopics(categoryUri, page);
                } else {
                    return allTopics;
                }
            });
        }

        return getTopics(categoryUri, 0);
    },

    getAllPosts: function getAllPosts(categoryUri) {

        var allPosts = [];

        function getPosts(categoryUri, page) {
            return __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */].get(categoryUri + "?include_raw=1&page=" + page).then(function (result) {
                var posts = result['data']['post_stream']['posts'];
                allPosts = allPosts.concat(posts);
                if (posts.length > 0) {
                    page += 1;
                    return getPosts(categoryUri, page);
                } else {
                    return allPosts;
                }
            });
        }

        return getPosts(categoryUri, 0);
    }
};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HowToUse_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HowToUse_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_HowToUse_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Intro_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Intro_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Intro_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Login_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Track_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Track_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_Track_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Detail_Topic_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Detail_Topic_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_Detail_Topic_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Detail_Catagory_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Detail_Catagory_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_Detail_Catagory_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_ContactUs_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_ContactUs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_ContactUs_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_app_navbar_search_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_app_navbar_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_app_navbar_search_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_Subscribe_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_Subscribe_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_Subscribe_vue__);














__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);

/* harmony default export */ exports["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  scrollBehavior: function scrollBehavior() {
    return { y: 0 };
  },
  routes: [{ path: '/',
    name: 'home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home_vue___default.a }, { path: '/how-to-use',
    name: 'howTo',
    component: __WEBPACK_IMPORTED_MODULE_3__components_HowToUse_vue___default.a }, { path: '/intro',
    name: 'intro',
    component: __WEBPACK_IMPORTED_MODULE_4__components_Intro_vue___default.a }, { path: '/login',
    name: 'login',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Login_vue___default.a }, { path: '/track',
    name: 'track',
    component: __WEBPACK_IMPORTED_MODULE_6__components_Track_vue___default.a }, { path: '/topic/:tRouteName',
    name: 'topic',
    component: __WEBPACK_IMPORTED_MODULE_7__components_Detail_Topic_vue___default.a }, { path: '/topic/:tRouteName/step/:sId',
    name: 'topic_step',
    component: __WEBPACK_IMPORTED_MODULE_7__components_Detail_Topic_vue___default.a }, { path: '/catagory/:cRouteName',
    name: 'catagory',
    component: __WEBPACK_IMPORTED_MODULE_8__components_Detail_Catagory_vue___default.a }, { path: '/contactus',
    name: 'contactus',
    component: __WEBPACK_IMPORTED_MODULE_9__components_ContactUs_vue___default.a }, { path: '/search',
    name: 'search',
    component: __WEBPACK_IMPORTED_MODULE_10__components_app_navbar_search_vue___default.a }, { path: '/subscribe',
    name: 'subscribe',
    component: __WEBPACK_IMPORTED_MODULE_11__components_Subscribe_vue___default.a }]
});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  state: {},

  actions: {},

  mutations: {},

  getters: {}
});

/* harmony default export */ exports["a"] = store;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n}\n.fade-leave-active,\n.fade-enter-active {\n  transition: opacity .3s ease;\n}\n.component {\n  position: relative;\n}\n.component h1, .component h2, .component h3, .component h4, .component h5, .component h6, .component p {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a, .component h2 a, .component h3 a, .component h4 a, .component h5 a, .component h6 a, .component p a {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only {\n    display: none !important;\n}\n}\na.ui.icon.button {\n  background-color: #3fadc7;\n}\na.ui.icon.button span {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n", ""]);

// exports


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.component[data-v-0638e068] {\n  position: relative;\n}\np[data-v-0638e068] {\n  text-align: left;\n}\n", ""]);

// exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-0aea0f33] {\n  box-sizing: border-box;\n}\nbody[data-v-0aea0f33] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-0aea0f33],\n.fade-leave-active[data-v-0aea0f33] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-0aea0f33],\n.fade-enter-active[data-v-0aea0f33] {\n  transition: opacity .3s ease;\n}\n.component[data-v-0aea0f33] {\n  position: relative;\n}\n.component h1[data-v-0aea0f33], .component h2[data-v-0aea0f33], .component h3[data-v-0aea0f33], .component h4[data-v-0aea0f33], .component h5[data-v-0aea0f33], .component h6[data-v-0aea0f33], .component p[data-v-0aea0f33] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-0aea0f33], .component h2 a[data-v-0aea0f33], .component h3 a[data-v-0aea0f33], .component h4 a[data-v-0aea0f33], .component h5 a[data-v-0aea0f33], .component h6 a[data-v-0aea0f33], .component p a[data-v-0aea0f33] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-0aea0f33] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-0aea0f33] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-0aea0f33] {\n    display: none !important;\n}\n}\n.component[data-v-0aea0f33] {\n  padding: 1em 0;\n}\n.ui.steps .step[data-v-0aea0f33] {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  overflow: hidden;\n}\n.ui.steps .number[data-v-0aea0f33] {\n  font-family: Lobster, \"Microsoft JhengHei\", \"Heiti TC\", serif;\n  font-weight: 700;\n  position: absolute;\n  font-size: 10rem;\n  color: rgba(219, 79, 79, 0.5);\n  margin: 0 0 0 30%;\n}\n.ui.steps .label[data-v-0aea0f33] {\n  padding: .3em 0 0 .3em;\n  z-index: 100;\n}\n@media only screen and (max-width: 767px) {\n.component[data-v-0aea0f33] {\n    padding: 0px;\n    border: 0px;\n}\n.ui.container[data-v-0aea0f33] {\n    margin: 0 !important;\n}\n.ui.segment.basic[data-v-0aea0f33] {\n    padding: 0;\n    margin-left: 1em;\n    width: 100%;\n}\n.proposalTab[data-v-0aea0f33] {\n    padding: 1em 0;\n    min-height: 72vh;\n}\n.mobile-step[data-v-0aea0f33] {\n    /* do not use #mobile-step, otherwise sticky won't work */\n    position: absolute;\n    top: 1em;\n}\n.mobile-step .ui.menu[data-v-0aea0f33] {\n      width: 2em;\n}\n.mobile-step .ui.menu .item[data-v-0aea0f33] {\n        padding: 1em 0;\n}\n.mobile-step .ui.menu .item.active[data-v-0aea0f33] {\n          color: white;\n          background: #db4f4f;\n}\n}\n", ""]);

// exports


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-1568d51d] {\n  box-sizing: border-box;\n}\nbody[data-v-1568d51d] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-1568d51d],\n.fade-leave-active[data-v-1568d51d] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-1568d51d],\n.fade-enter-active[data-v-1568d51d] {\n  transition: opacity .3s ease;\n}\n.component[data-v-1568d51d] {\n  position: relative;\n}\n.component h1[data-v-1568d51d], .component h2[data-v-1568d51d], .component h3[data-v-1568d51d], .component h4[data-v-1568d51d], .component h5[data-v-1568d51d], .component h6[data-v-1568d51d], .component p[data-v-1568d51d] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-1568d51d], .component h2 a[data-v-1568d51d], .component h3 a[data-v-1568d51d], .component h4 a[data-v-1568d51d], .component h5 a[data-v-1568d51d], .component h6 a[data-v-1568d51d], .component p a[data-v-1568d51d] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-1568d51d] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-1568d51d] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-1568d51d] {\n    display: none !important;\n}\n}\n.step-progress-bar[data-v-1568d51d] {\n  width: 600px;\n  margin: 0 auto;\n  display: block;\n  height: 100px;\n  padding: 10px;\n}\n@media only screen and (max-width: 767px) {\n.step-progress-bar[data-v-1568d51d] {\n      width: 100%;\n}\n.step-progress-bar li[data-v-1568d51d] {\n        font-size: 1rem;\n}\n}\n@media only screen and (min-width: 767px) {\n.step-progress-bar li[data-v-1568d51d] {\n      font-size: 1.2rem;\n}\n}\nul.progress-bar[data-v-1568d51d] {\n  counter-reset: step;\n  padding: 0;\n}\n.step-progress-bar li[data-v-1568d51d] {\n  list-style-type: none;\n  float: left;\n  color: #40B3BF;\n  width: 20%;\n  position: relative;\n  text-align: center;\n  font-weight: 600;\n}\n.step-progress-bar li[data-v-1568d51d]:before {\n  content: counter(step);\n  counter-increment: step;\n  width: 32px;\n  height: 32px;\n  border: 2px solid #40B3BF;\n  border-radius: 50%;\n  display: block;\n  text-align: center;\n  line-height: 31px;\n  margin: 0 auto 10px auto;\n  z-index: 9;\n  background-color: white;\n  font-weight: 600;\n}\n.step-progress-bar li[data-v-1568d51d]:after {\n  content: \"\";\n  width: 100%;\n  position: absolute;\n  height: 2px;\n  background-color: #40B3BF;\n  top: 16px;\n  left: 50%;\n  z-index: -1;\n}\n.step-progress-bar li[data-v-1568d51d]:last-child:after {\n  content: none;\n}\n.step-progress-bar li.active[data-v-1568d51d] {\n  color: gray;\n}\n.step-progress-bar li.current[data-v-1568d51d] {\n  color: #DB5252;\n}\n.step-progress-bar li.active[data-v-1568d51d]:before {\n  border-color: gray;\n}\n.step-progress-bar li.current[data-v-1568d51d]:before {\n  border-color: #DB5252;\n}\n.step-progress-bar li.active[data-v-1568d51d]:after {\n  background-color: gray;\n}\n.step-progress-bar li.current[data-v-1568d51d]:after {\n  background-color: #DB5252;\n}\n", ""]);

// exports


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n}\n.fade-leave-active,\n.fade-enter-active {\n  transition: opacity .3s ease;\n}\n.component {\n  position: relative;\n}\n.component h1, .component h2, .component h3, .component h4, .component h5, .component h6, .component p {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a, .component h2 a, .component h3 a, .component h4 a, .component h5 a, .component h6 a, .component p a {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only {\n    display: none !important;\n}\n}\n.ui.styled.accordion .title {\n  color: rgba(0, 0, 0, 0.6);\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.ui.styled.accordion .active.content {\n  display: block;\n  max-width: 100%;\n}\n", ""]);

// exports


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-1effc5c6] {\n  box-sizing: border-box;\n}\nbody[data-v-1effc5c6] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-1effc5c6],\n.fade-leave-active[data-v-1effc5c6] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-1effc5c6],\n.fade-enter-active[data-v-1effc5c6] {\n  transition: opacity .3s ease;\n}\n.component[data-v-1effc5c6] {\n  position: relative;\n}\n.component h1[data-v-1effc5c6], .component h2[data-v-1effc5c6], .component h3[data-v-1effc5c6], .component h4[data-v-1effc5c6], .component h5[data-v-1effc5c6], .component h6[data-v-1effc5c6], .component p[data-v-1effc5c6] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-1effc5c6], .component h2 a[data-v-1effc5c6], .component h3 a[data-v-1effc5c6], .component h4 a[data-v-1effc5c6], .component h5 a[data-v-1effc5c6], .component h6 a[data-v-1effc5c6], .component p a[data-v-1effc5c6] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-1effc5c6] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-1effc5c6] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-1effc5c6] {\n    display: none !important;\n}\n}\n.component[data-v-1effc5c6] {\n  font-size: 1.5rem;\n  line-height: 1.5em;\n}\n.ui.left.aligned.container[data-v-1effc5c6] {\n  width: 99% !important;\n}\n@media only screen and (max-width: 767px) {\n.ui.left.aligned.container[data-v-1effc5c6] {\n      margin: 0 .1em !important;\n}\n}\n", ""]);

// exports


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-1ffe16c1] {\n  box-sizing: border-box;\n}\nbody[data-v-1ffe16c1] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-1ffe16c1],\n.fade-leave-active[data-v-1ffe16c1] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-1ffe16c1],\n.fade-enter-active[data-v-1ffe16c1] {\n  transition: opacity .3s ease;\n}\n.component[data-v-1ffe16c1] {\n  position: relative;\n}\n.component h1[data-v-1ffe16c1], .component h2[data-v-1ffe16c1], .component h3[data-v-1ffe16c1], .component h4[data-v-1ffe16c1], .component h5[data-v-1ffe16c1], .component h6[data-v-1ffe16c1], .component p[data-v-1ffe16c1] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-1ffe16c1], .component h2 a[data-v-1ffe16c1], .component h3 a[data-v-1ffe16c1], .component h4 a[data-v-1ffe16c1], .component h5 a[data-v-1ffe16c1], .component h6 a[data-v-1ffe16c1], .component p a[data-v-1ffe16c1] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-1ffe16c1] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-1ffe16c1] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-1ffe16c1] {\n    display: none !important;\n}\n}\n.component[data-v-1ffe16c1] {\n  padding: 0 0 2em 0;\n}\n.component h1[data-v-1ffe16c1] {\n    font-size: 4rem;\n    font-family: Lobster, \"Microsoft JhengHei\", \"Heiti TC\", serif;\n    font-weight: normal;\n    text-transform: initial;\n}\n.component .ui.card > .content > .header[data-v-1ffe16c1]:not(.ui), .component .ui.cards > .card > .content > .header[data-v-1ffe16c1]:not(.ui) {\n    font-weight: 700;\n    font-size: 1em;\n    margin-top: -.21425em;\n    line-height: 1.2em;\n}\n.component .ui.cards > .card > .content[data-v-1ffe16c1] {\n    text-align: left;\n}\n.component .ui.cards > .card > .content > .tags .ui.label[data-v-1ffe16c1] {\n      font-size: 0.6em;\n      margin-bottom: .5em;\n      margin-right: 0.8em;\n      padding-left: 1em;\n      padding-right: 1em;\n}\n.component .ui.cards > .card > .image[data-v-1ffe16c1] {\n    max-height: 300px;\n    overflow: hidden;\n}\n.component .ui.cards > .card > .image img#image[data-v-1ffe16c1] {\n      display: block;\n      max-width: 200px;\n      height: auto;\n      margin: auto;\n}\n.component .ui.cards > .card [class*=\"right floated\"][data-v-1ffe16c1] {\n    float: right;\n    font-size: 0.6em;\n}\n.component .ui.cards > .card > .extra.content[data-v-1ffe16c1] {\n    padding: 0 0.5em 0 0;\n    border-top: none !important;\n}\n.component .description[data-v-1ffe16c1] {\n    padding: 0 .5em;\n}\n.component .description > p[data-v-1ffe16c1] {\n      font-size: 0.6em;\n      text-align: left;\n      text-indent: 25px;\n      border-bottom: 1px solid #d7d7d7;\n}\n.component .ui.cards > .card > .content[data-v-1ffe16c1] {\n    padding: .5em;\n}\n.component .ui.cards > .card[data-v-1ffe16c1] {\n    min-height: 300px;\n}\n.thin-only .swiper-container2[data-v-1ffe16c1] {\n  margin: 5em 3em 0 3em;\n}\n.thin-only .swiper-container2 .ui.cards[data-v-1ffe16c1] {\n    margin: 0;\n}\n.thin-only .swiper-container2 .ui.cards > .card[data-v-1ffe16c1] {\n    min-height: 300px;\n}\n.thin-only .swiper-container2 .ui.card > .content > .header[data-v-1ffe16c1]:not(.ui), .thin-only .swiper-container2 .ui.cards > .card > .content > .header[data-v-1ffe16c1]:not(.ui) {\n    font-size: 1.5em;\n}\n", ""]);

// exports


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-27dbf9ac] {\n  box-sizing: border-box;\n}\nbody[data-v-27dbf9ac] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-27dbf9ac],\n.fade-leave-active[data-v-27dbf9ac] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-27dbf9ac],\n.fade-enter-active[data-v-27dbf9ac] {\n  transition: opacity .3s ease;\n}\n.component[data-v-27dbf9ac] {\n  position: relative;\n}\n.component h1[data-v-27dbf9ac], .component h2[data-v-27dbf9ac], .component h3[data-v-27dbf9ac], .component h4[data-v-27dbf9ac], .component h5[data-v-27dbf9ac], .component h6[data-v-27dbf9ac], .component p[data-v-27dbf9ac] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-27dbf9ac], .component h2 a[data-v-27dbf9ac], .component h3 a[data-v-27dbf9ac], .component h4 a[data-v-27dbf9ac], .component h5 a[data-v-27dbf9ac], .component h6 a[data-v-27dbf9ac], .component p a[data-v-27dbf9ac] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-27dbf9ac] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-27dbf9ac] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-27dbf9ac] {\n    display: none !important;\n}\n}\n.component[data-v-27dbf9ac] {\n  padding-top: 1em;\n}\n", ""]);

// exports


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-280eaafe] {\n  box-sizing: border-box;\n}\nbody[data-v-280eaafe] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-280eaafe],\n.fade-leave-active[data-v-280eaafe] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-280eaafe],\n.fade-enter-active[data-v-280eaafe] {\n  transition: opacity .3s ease;\n}\n.component[data-v-280eaafe] {\n  position: relative;\n}\n.component h1[data-v-280eaafe], .component h2[data-v-280eaafe], .component h3[data-v-280eaafe], .component h4[data-v-280eaafe], .component h5[data-v-280eaafe], .component h6[data-v-280eaafe], .component p[data-v-280eaafe] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-280eaafe], .component h2 a[data-v-280eaafe], .component h3 a[data-v-280eaafe], .component h4 a[data-v-280eaafe], .component h5 a[data-v-280eaafe], .component h6 a[data-v-280eaafe], .component p a[data-v-280eaafe] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-280eaafe] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-280eaafe] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-280eaafe] {\n    display: none !important;\n}\n}\n.row.BGgray[data-v-280eaafe] {\n  background-color: #efefef;\n  padding-top: 2em;\n  margin-bottom: 1em;\n}\n.left[data-v-280eaafe] {\n  text-align: left;\n}\n.ui.green.button[data-v-280eaafe] {\n  background-color: #40B3BF;\n  margin-bottom: 1em;\n}\n.componentcontactus[data-v-280eaafe] {\n  min-height: 91vh;\n}\n.ui.form .field > label[data-v-280eaafe] {\n  font-size: 1rem;\n}\n", ""]);

// exports


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-287bb503] {\n  box-sizing: border-box;\n}\nbody[data-v-287bb503] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-287bb503],\n.fade-leave-active[data-v-287bb503] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-287bb503],\n.fade-enter-active[data-v-287bb503] {\n  transition: opacity .3s ease;\n}\n.component[data-v-287bb503] {\n  position: relative;\n}\n.component h1[data-v-287bb503], .component h2[data-v-287bb503], .component h3[data-v-287bb503], .component h4[data-v-287bb503], .component h5[data-v-287bb503], .component h6[data-v-287bb503], .component p[data-v-287bb503] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-287bb503], .component h2 a[data-v-287bb503], .component h3 a[data-v-287bb503], .component h4 a[data-v-287bb503], .component h5 a[data-v-287bb503], .component h6 a[data-v-287bb503], .component p a[data-v-287bb503] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-287bb503] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-287bb503] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-287bb503] {\n    display: none !important;\n}\n}\n.content[data-v-287bb503] {\n  margin: 0 auto;\n}\n", ""]);

// exports


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-30cdb09e] {\n  box-sizing: border-box;\n}\nbody[data-v-30cdb09e] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-30cdb09e],\n.fade-leave-active[data-v-30cdb09e] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-30cdb09e],\n.fade-enter-active[data-v-30cdb09e] {\n  transition: opacity .3s ease;\n}\n.component[data-v-30cdb09e] {\n  position: relative;\n}\n.component h1[data-v-30cdb09e], .component h2[data-v-30cdb09e], .component h3[data-v-30cdb09e], .component h4[data-v-30cdb09e], .component h5[data-v-30cdb09e], .component h6[data-v-30cdb09e], .component p[data-v-30cdb09e] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-30cdb09e], .component h2 a[data-v-30cdb09e], .component h3 a[data-v-30cdb09e], .component h4 a[data-v-30cdb09e], .component h5 a[data-v-30cdb09e], .component h6 a[data-v-30cdb09e], .component p a[data-v-30cdb09e] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-30cdb09e] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-30cdb09e] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-30cdb09e] {\n    display: none !important;\n}\n}\n.component[data-v-30cdb09e] {\n  border-bottom: 1px #DDD solid;\n  background: linear-gradient(to right, lightgray 0%, white 10%, white 90%, lightgray 100%);\n}\n.swiper-container[data-v-30cdb09e] {\n  height: 100vh;\n}\n@media only screen and (max-width: 767px) {\n.swiper-container[data-v-30cdb09e] {\n      height: 70vh;\n}\n}\n.slide-page[data-v-30cdb09e] {\n  height: 100vh;\n}\n@media only screen and (max-width: 767px) {\n.slide-page[data-v-30cdb09e] {\n      height: 70vh;\n}\n}\n.slide-item[data-v-30cdb09e] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  overflow: hidden;\n  height: 100%;\n  transition: all .3s ease;\n}\n.box[data-v-30cdb09e] {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-flow: column;\n      flex-flow: column;\n  -ms-flex-align: center;\n      align-items: center;\n  width: 100%;\n  height: 100%;\n  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);\n  overflow: hidden;\n}\n.box i.background[data-v-30cdb09e] {\n    color: rgba(51, 51, 51, 0.9);\n    text-shadow: 1px 3px 7px;\n    font-size: 40rem;\n    position: absolute;\n    height: initial;\n}\n@media only screen and (max-width: 767px) {\n.box i.background[data-v-30cdb09e] {\n        font-size: 20rem;\n}\n}\n.box .status[data-v-30cdb09e],\n  .box .title[data-v-30cdb09e],\n  .box .slogan[data-v-30cdb09e],\n  .box .ui.button[data-v-30cdb09e] {\n    z-index: 10;\n    font-size: 100%;\n}\n.box .status[data-v-30cdb09e] {\n    color: #db4f4f;\n    border: 1px solid #db4f4f;\n    background: transparent;\n}\n.box .title[data-v-30cdb09e] {\n    color: white;\n}\n.box .slogan[data-v-30cdb09e] {\n    margin: .5em 0;\n    font-size: 3rem;\n    color: white;\n    text-shadow: 0 0 5px gray;\n}\n@media only screen and (max-width: 767px) {\n.box .slogan[data-v-30cdb09e] {\n        font-size: 2rem;\n}\n}\n.box .slogan .sub.header[data-v-30cdb09e] {\n      color: white;\n      text-shadow: 0 0 5px gray;\n}\n", ""]);

// exports


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n}\n.fade-leave-active,\n.fade-enter-active {\n  transition: opacity .3s ease;\n}\n.component {\n  position: relative;\n}\n.component h1, .component h2, .component h3, .component h4, .component h5, .component h6, .component p {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a, .component h2 a, .component h3 a, .component h4 a, .component h5 a, .component h6 a, .component p a {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only {\n    display: none !important;\n}\n}\n.app {\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  transition: border-color 0.5s ease;\n}\n.app.join {\n    border-color: #f4719d;\n}\n.app.intro {\n    border-color: #ec8013;\n}\n.app.live {\n    border-color: #1313ec;\n}\n.app.track {\n    border-color: #8e8e0b;\n}\n.main {\n  position: relative;\n  top: 0;\n  width: 100%;\n  text-align: center;\n}\n.navbar {\n  position: fixed;\n  z-index: 999999;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.footer {\n  position: relative;\n  margin: 0 auto;\n  max-width: 100%;\n}\n", ""]);

// exports


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-3b7b10e8] {\n  box-sizing: border-box;\n}\nbody[data-v-3b7b10e8] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-3b7b10e8],\n.fade-leave-active[data-v-3b7b10e8] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-3b7b10e8],\n.fade-enter-active[data-v-3b7b10e8] {\n  transition: opacity .3s ease;\n}\n.component[data-v-3b7b10e8] {\n  position: relative;\n}\n.component h1[data-v-3b7b10e8], .component h2[data-v-3b7b10e8], .component h3[data-v-3b7b10e8], .component h4[data-v-3b7b10e8], .component h5[data-v-3b7b10e8], .component h6[data-v-3b7b10e8], .component p[data-v-3b7b10e8] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-3b7b10e8], .component h2 a[data-v-3b7b10e8], .component h3 a[data-v-3b7b10e8], .component h4 a[data-v-3b7b10e8], .component h5 a[data-v-3b7b10e8], .component h6 a[data-v-3b7b10e8], .component p a[data-v-3b7b10e8] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-3b7b10e8] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-3b7b10e8] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-3b7b10e8] {\n    display: none !important;\n}\n}\n.component[data-v-3b7b10e8] {\n  padding: 1em 0;\n}\n", ""]);

// exports


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-4144f431] {\n  box-sizing: border-box;\n}\nbody[data-v-4144f431] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-4144f431],\n.fade-leave-active[data-v-4144f431] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-4144f431],\n.fade-enter-active[data-v-4144f431] {\n  transition: opacity .3s ease;\n}\n.component[data-v-4144f431] {\n  position: relative;\n}\n.component h1[data-v-4144f431], .component h2[data-v-4144f431], .component h3[data-v-4144f431], .component h4[data-v-4144f431], .component h5[data-v-4144f431], .component h6[data-v-4144f431], .component p[data-v-4144f431] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-4144f431], .component h2 a[data-v-4144f431], .component h3 a[data-v-4144f431], .component h4 a[data-v-4144f431], .component h5 a[data-v-4144f431], .component h6 a[data-v-4144f431], .component p a[data-v-4144f431] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-4144f431] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-4144f431] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-4144f431] {\n    display: none !important;\n}\n}\n#sidebar.sidebar[data-v-4144f431] {\n  text-align: left;\n}\n#sidebar.sidebar .menu[data-v-4144f431] {\n    margin: 0;\n}\n#sidebar.sidebar .menu .router-link-active[data-v-4144f431] {\n      color: white;\n}\n#opener[data-v-4144f431] {\n  height: 100%;\n  width: 1ch;\n  background: #1B1C1D;\n  /* the color of sidebar */\n  position: fixed;\n  left: 0;\n  z-index: 100;\n}\n.ui.top.menu[data-v-4144f431] {\n  width: 100%;\n}\n#pusher[data-v-4144f431] {\n  min-height: 90vh;\n  padding-bottom: 1em;\n}\n", ""]);

// exports


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-47d63a09] {\n  box-sizing: border-box;\n}\nbody[data-v-47d63a09] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-47d63a09],\n.fade-leave-active[data-v-47d63a09] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-47d63a09],\n.fade-enter-active[data-v-47d63a09] {\n  transition: opacity .3s ease;\n}\n.component[data-v-47d63a09] {\n  position: relative;\n}\n.component h1[data-v-47d63a09], .component h2[data-v-47d63a09], .component h3[data-v-47d63a09], .component h4[data-v-47d63a09], .component h5[data-v-47d63a09], .component h6[data-v-47d63a09], .component p[data-v-47d63a09] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-47d63a09], .component h2 a[data-v-47d63a09], .component h3 a[data-v-47d63a09], .component h4 a[data-v-47d63a09], .component h5 a[data-v-47d63a09], .component h6 a[data-v-47d63a09], .component p a[data-v-47d63a09] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-47d63a09] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-47d63a09] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-47d63a09] {\n    display: none !important;\n}\n}\n", ""]);

// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-5120c3f7] {\n  box-sizing: border-box;\n}\nbody[data-v-5120c3f7] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-5120c3f7],\n.fade-leave-active[data-v-5120c3f7] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-5120c3f7],\n.fade-enter-active[data-v-5120c3f7] {\n  transition: opacity .3s ease;\n}\n.component[data-v-5120c3f7] {\n  position: relative;\n}\n.component h1[data-v-5120c3f7], .component h2[data-v-5120c3f7], .component h3[data-v-5120c3f7], .component h4[data-v-5120c3f7], .component h5[data-v-5120c3f7], .component h6[data-v-5120c3f7], .component p[data-v-5120c3f7] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-5120c3f7], .component h2 a[data-v-5120c3f7], .component h3 a[data-v-5120c3f7], .component h4 a[data-v-5120c3f7], .component h5 a[data-v-5120c3f7], .component h6 a[data-v-5120c3f7], .component p a[data-v-5120c3f7] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-5120c3f7] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-5120c3f7] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-5120c3f7] {\n    display: none !important;\n}\n}\nimg[data-v-5120c3f7] {\n  width: 3.5em;\n  height: auto;\n  vertical-align: bottom;\n}\n.ui.icon[data-v-5120c3f7] {\n  margin: 0 1ch;\n}\na.ui.icon.button[data-v-5120c3f7] {\n  background-color: #333;\n}\n", ""]);

// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-5da6cb6a] {\n  box-sizing: border-box;\n}\nbody[data-v-5da6cb6a] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-5da6cb6a],\n.fade-leave-active[data-v-5da6cb6a] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-5da6cb6a],\n.fade-enter-active[data-v-5da6cb6a] {\n  transition: opacity .3s ease;\n}\n.component[data-v-5da6cb6a] {\n  position: relative;\n}\n.component h1[data-v-5da6cb6a], .component h2[data-v-5da6cb6a], .component h3[data-v-5da6cb6a], .component h4[data-v-5da6cb6a], .component h5[data-v-5da6cb6a], .component h6[data-v-5da6cb6a], .component p[data-v-5da6cb6a] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-5da6cb6a], .component h2 a[data-v-5da6cb6a], .component h3 a[data-v-5da6cb6a], .component h4 a[data-v-5da6cb6a], .component h5 a[data-v-5da6cb6a], .component h6 a[data-v-5da6cb6a], .component p a[data-v-5da6cb6a] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-5da6cb6a] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-5da6cb6a] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-5da6cb6a] {\n    display: none !important;\n}\n}\n.row.BGgray[data-v-5da6cb6a] {\n  background-color: #efefef;\n  padding-top: 2em;\n  margin-bottom: 1em;\n}\n.left[data-v-5da6cb6a] {\n  text-align: left;\n}\n.ui.styled.accordion > .title[data-v-5da6cb6a]:first-child {\n  font-size: 1.5rem;\n}\n.ui.green.button[data-v-5da6cb6a] {\n  background-color: #40B3BF;\n  margin-bottom: 1em;\n}\n.ui.container[data-v-5da6cb6a] {\n  height: 100%;\n}\n.componentsubscribe[data-v-5da6cb6a] {\n  min-height: 91vh;\n}\n.ui.text.container[data-v-5da6cb6a] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 1 rem;\n}\n", ""]);

// exports


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-60640b22] {\n  box-sizing: border-box;\n}\nbody[data-v-60640b22] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-60640b22],\n.fade-leave-active[data-v-60640b22] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-60640b22],\n.fade-enter-active[data-v-60640b22] {\n  transition: opacity .3s ease;\n}\n.component[data-v-60640b22] {\n  position: relative;\n}\n.component h1[data-v-60640b22], .component h2[data-v-60640b22], .component h3[data-v-60640b22], .component h4[data-v-60640b22], .component h5[data-v-60640b22], .component h6[data-v-60640b22], .component p[data-v-60640b22] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-60640b22], .component h2 a[data-v-60640b22], .component h3 a[data-v-60640b22], .component h4 a[data-v-60640b22], .component h5 a[data-v-60640b22], .component h6 a[data-v-60640b22], .component p a[data-v-60640b22] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-60640b22] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-60640b22] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-60640b22] {\n    display: none !important;\n}\n}\n.home[data-v-60640b22] {\n  width: 100%;\n  min-width: 320px;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media screen and (min-width: 767px) {\n.home[data-v-60640b22] {\n      margin-top: calc( -1 * 55px);\n}\n}\np[data-v-60640b22] {\n  font-size: 1rem;\n  text-align: left;\n  line-height: 155%;\n  padding: 5px;\n}\n", ""]);

// exports


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-67d7e20d] {\n  box-sizing: border-box;\n}\nbody[data-v-67d7e20d] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-67d7e20d],\n.fade-leave-active[data-v-67d7e20d] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-67d7e20d],\n.fade-enter-active[data-v-67d7e20d] {\n  transition: opacity .3s ease;\n}\n.component[data-v-67d7e20d] {\n  position: relative;\n}\n.component h1[data-v-67d7e20d], .component h2[data-v-67d7e20d], .component h3[data-v-67d7e20d], .component h4[data-v-67d7e20d], .component h5[data-v-67d7e20d], .component h6[data-v-67d7e20d], .component p[data-v-67d7e20d] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-67d7e20d], .component h2 a[data-v-67d7e20d], .component h3 a[data-v-67d7e20d], .component h4 a[data-v-67d7e20d], .component h5 a[data-v-67d7e20d], .component h6 a[data-v-67d7e20d], .component p a[data-v-67d7e20d] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-67d7e20d] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-67d7e20d] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-67d7e20d] {\n    display: none !important;\n}\n}\n.desc[data-v-67d7e20d] {\n  width: 100%;\n  margin-top: -1em;\n}\n.cards .card[data-v-67d7e20d] {\n  margin: 0 0 1em 0;\n  overflow: hidden;\n}\n.cards .card .content h3.ui.header[data-v-67d7e20d] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.cards .card .progress_bar[data-v-67d7e20d] {\n    background: #AAAAAA;\n    height: 2em;\n    line-height: 2em;\n    position: absolute;\n    top: 0;\n    width: 100%;\n}\n.cards .card .progress_bar .progress_text[data-v-67d7e20d] {\n      color: white;\n      position: absolute;\n      z-index: 200;\n      width: 100%;\n      text-align: center;\n}\n.cards .card .progress_bar .progress_color[data-v-67d7e20d] {\n      background: #3fadc7;\n      position: absolute;\n      z-index: 100;\n      height: 100%;\n}\n\n/********************************* mobile view */\n.m-title[data-v-67d7e20d] {\n  background-color: #E6E6E6;\n  margin: 0 0 1em 0;\n  padding: .5em;\n}\n", ""]);

// exports


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n}\n.fade-leave-active,\n.fade-enter-active {\n  transition: opacity .3s ease;\n}\n.component {\n  position: relative;\n}\n.component h1, .component h2, .component h3, .component h4, .component h5, .component h6, .component p {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a, .component h2 a, .component h3 a, .component h4 a, .component h5 a, .component h6 a, .component p a {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only {\n    display: none !important;\n}\n}\n.fat-only .content {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 1.2rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.fat-only .content h1, .fat-only .content h2, .fat-only .content h3, .fat-only .content h4, .fat-only .content h5, .fat-only .content h6 {\n    text-align: center;\n}\n.fat-only .content p, .fat-only .content li, .fat-only .content ol {\n    text-align: left;\n}\n.fat-only .content p iframe {\n    display: block;\n    margin: 0 auto;\n}\n.fat-only .content blockquote {\n    margin: 0 0 10px 0;\n    text-align: left;\n    padding: 5px;\n    border-left: 5px solid #e9e9e9;\n    background-color: #f8f8f8;\n    font-weight: 600;\n}\n.thin-only .content {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 1rem;\n}\n.thin-only .content iframe {\n    width: 100%;\n}\n.thin-only .content h1, .thin-only .content h2, .thin-only .content h3, .thin-only .content h4, .thin-only .content h5, .thin-only .content h6 {\n    text-align: center;\n}\n.thin-only .content p, .thin-only .content li, .thin-only .content ol {\n    text-align: left;\n}\n.thin-only .content blockquote {\n    margin: 0 0 10px 0;\n    text-align: left;\n    padding: 5px;\n    border-left: 5px solid #e9e9e9;\n    background-color: #f8f8f8;\n    font-weight: 600;\n}\n", ""]);

// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-86ffac4e] {\n  box-sizing: border-box;\n}\nbody[data-v-86ffac4e] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-86ffac4e],\n.fade-leave-active[data-v-86ffac4e] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-86ffac4e],\n.fade-enter-active[data-v-86ffac4e] {\n  transition: opacity .3s ease;\n}\n.component[data-v-86ffac4e] {\n  position: relative;\n}\n.component h1[data-v-86ffac4e], .component h2[data-v-86ffac4e], .component h3[data-v-86ffac4e], .component h4[data-v-86ffac4e], .component h5[data-v-86ffac4e], .component h6[data-v-86ffac4e], .component p[data-v-86ffac4e] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-86ffac4e], .component h2 a[data-v-86ffac4e], .component h3 a[data-v-86ffac4e], .component h4 a[data-v-86ffac4e], .component h5 a[data-v-86ffac4e], .component h6 a[data-v-86ffac4e], .component p a[data-v-86ffac4e] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-86ffac4e] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-86ffac4e] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-86ffac4e] {\n    display: none !important;\n}\n}\n.component[data-v-86ffac4e] {\n  min-height: 47vh;\n}\np[data-v-86ffac4e] {\n  text-align: left;\n  margin-top: 10px;\n  margin-bottom: 0;\n  font-size: 1em;\n  color: gray;\n}\n.ui.icon.input[data-v-86ffac4e] {\n  margin-top: 40px;\n  width: 250px;\n  font-size: 1.5em;\n}\n.ui.icon.input input[data-v-86ffac4e] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.ui.icon.input i.icon[data-v-86ffac4e] {\n    font-size: 1.2em;\n    top: -1px;\n    /*right:5px;*/\n}\n", ""]);

// exports


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-8718f044] {\n  box-sizing: border-box;\n}\nbody[data-v-8718f044] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-8718f044],\n.fade-leave-active[data-v-8718f044] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-8718f044],\n.fade-enter-active[data-v-8718f044] {\n  transition: opacity .3s ease;\n}\n.component[data-v-8718f044] {\n  position: relative;\n}\n.component h1[data-v-8718f044], .component h2[data-v-8718f044], .component h3[data-v-8718f044], .component h4[data-v-8718f044], .component h5[data-v-8718f044], .component h6[data-v-8718f044], .component p[data-v-8718f044] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-8718f044], .component h2 a[data-v-8718f044], .component h3 a[data-v-8718f044], .component h4 a[data-v-8718f044], .component h5 a[data-v-8718f044], .component h6 a[data-v-8718f044], .component p a[data-v-8718f044] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-8718f044] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-8718f044] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-8718f044] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 767px) {\n.component[data-v-8718f044] {\n    height: 55px;\n}\n}\n.component nav.fat-only[data-v-8718f044] {\n  position: fixed;\n  z-index: 999999;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 55px;\n  overflow: visible;\n  background: rgba(255, 255, 255, 0.95);\n  border-bottom: 1px solid lightgray;\n}\n.ui.icon.input[data-v-8718f044] {\n  height: 50px;\n  padding: 10px;\n}\n.ui.icon.input input[data-v-8718f044] {\n    font-size: 1.2rem;\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n    padding: 0.5em 1em;\n}\n.ui.icon.input i.icon[data-v-8718f044] {\n    font-size: 0.8em;\n    top: -1px;\n    right: 10px;\n}\nform.search[data-v-8718f044] {\n  font-size: 1.5rem;\n  position: relative;\n  display: inline-block;\n  line-height: 55px;\n  padding: 0 0 0 1em;\n}\nform.search i.search.icon[data-v-8718f044] {\n    position: absolute;\n    z-index: -1;\n    right: .55em;\n    line-height: 55px;\n    color: gray;\n}\nform.search input[data-v-8718f044] {\n    color: gray;\n    height: calc( 55px * 0.55);\n    border: 1px solid lightgray;\n    border-radius: 1em;\n    padding: 0 .6em;\n    background-color: transparent;\n}\nform.search input[data-v-8718f044]:focus {\n      outline: none;\n}\nform.search.active i.icon[data-v-8718f044] {\n    visibility: hidden;\n}\n.logo[data-v-8718f044] {\n  height: 55px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.logo img[data-v-8718f044] {\n    width: auto;\n    max-height: 75%;\n}\n.logo span[data-v-8718f044] {\n    color: black;\n    font-family: Lobster, \"Microsoft JhengHei\", \"Heiti TC\", serif;\n    font-size: 2rem;\n    margin-left: .3em;\n}\n.right[data-v-8718f044] {\n  text-align: right;\n}\n.right a.item[data-v-8718f044] {\n    font-size: 1.2rem;\n    display: inline-block;\n    line-height: 55px;\n    padding: 0 1em;\n    color: dimgray;\n    cursor: pointer;\n    text-decoration: none;\n    transition: background-color 0.5s ease;\n}\n.right a.item[data-v-8718f044]:hover {\n      color: white;\n      background: #3fadc7;\n}\n.right a.item.active[data-v-8718f044], .right a.item.router-link-active[data-v-8718f044] {\n      background-color: #f4e025;\n}\n@media screen and (max-width: 767px) {\n.thin-only[data-v-8718f044] {\n    border-bottom: 1px solid #ccc;\n}\n}\n.m-logo[data-v-8718f044] {\n  width: 50%;\n  margin: 0 auto;\n  height: 20vh;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n      flex-flow: row nowrap;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.m-logo img[data-v-8718f044] {\n    width: 60px;\n    height: 60px;\n    margin: 0;\n}\n.m-logo span[data-v-8718f044] {\n    color: black;\n    font-family: Lobster, \"Microsoft JhengHei\", \"Heiti TC\", serif;\n    font-size: 1.6rem;\n    padding: 0 0 0 .3em;\n}\n.menu[data-v-8718f044] {\n  height: 10vh;\n  line-height: 10vh;\n  display: -ms-flexbox;\n  display: flex;\n}\n.menu a.m-item[data-v-8718f044], .menu a.item[data-v-8718f044] {\n    cursor: pointer !important;\n    -ms-flex: 1;\n        flex: 1;\n    text-align: center;\n    font-size: 1.3rem;\n    color: dimgray;\n}\n.menu a.m-item[data-v-8718f044]:hover, .menu a.item[data-v-8718f044]:hover {\n      color: white;\n      background: #3fadc7;\n}\n", ""]);

// exports


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-88189242] {\n  box-sizing: border-box;\n}\nbody[data-v-88189242] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-88189242],\n.fade-leave-active[data-v-88189242] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-88189242],\n.fade-enter-active[data-v-88189242] {\n  transition: opacity .3s ease;\n}\n.component[data-v-88189242] {\n  position: relative;\n}\n.component h1[data-v-88189242], .component h2[data-v-88189242], .component h3[data-v-88189242], .component h4[data-v-88189242], .component h5[data-v-88189242], .component h6[data-v-88189242], .component p[data-v-88189242] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-88189242], .component h2 a[data-v-88189242], .component h3 a[data-v-88189242], .component h4 a[data-v-88189242], .component h5 a[data-v-88189242], .component h6 a[data-v-88189242], .component p a[data-v-88189242] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-88189242] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-88189242] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-88189242] {\n    display: none !important;\n}\n}\n.ui.status[data-v-88189242] {\n  color: #db4f4f;\n  border: 1px solid #db4f4f;\n}\n", ""]);

// exports


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n*[data-v-91a79d22] {\n  box-sizing: border-box;\n}\nbody[data-v-91a79d22] {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter[data-v-91a79d22],\n.fade-leave-active[data-v-91a79d22] {\n  opacity: 0;\n}\n.fade-leave-active[data-v-91a79d22],\n.fade-enter-active[data-v-91a79d22] {\n  transition: opacity .3s ease;\n}\n.component[data-v-91a79d22] {\n  position: relative;\n}\n.component h1[data-v-91a79d22], .component h2[data-v-91a79d22], .component h3[data-v-91a79d22], .component h4[data-v-91a79d22], .component h5[data-v-91a79d22], .component h6[data-v-91a79d22], .component p[data-v-91a79d22] {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a[data-v-91a79d22], .component h2 a[data-v-91a79d22], .component h3 a[data-v-91a79d22], .component h4 a[data-v-91a79d22], .component h5 a[data-v-91a79d22], .component h6 a[data-v-91a79d22], .component p a[data-v-91a79d22] {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong[data-v-91a79d22] {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only[data-v-91a79d22] {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only[data-v-91a79d22] {\n    display: none !important;\n}\n}\n.component[data-v-91a79d22] {\n  position: absolute;\n  z-index: 11;\n  margin-top: 5px;\n  height: 90vh;\n  overflow: auto;\n  font-size: 1rem;\n}\n.results[data-v-91a79d22] {\n  background: #FFF;\n  z-index: 998;\n}\n.results .category[data-v-91a79d22] {\n    background: #F3F4F5;\n    border-bottom: 1px solid rgba(34, 36, 38, 0.1);\n}\n.results .name[data-v-91a79d22] {\n    width: 100px;\n    font-size: 1em;\n    float: left;\n    padding: 1em;\n    font-weight: 700;\n    color: rgba(0, 0, 0, 0.4);\n}\n.results .result[data-v-91a79d22] {\n    background: #FFF;\n    margin-left: 100px;\n    border-left: 1px solid rgba(34, 36, 38, 0.15);\n    border-bottom: 1px solid rgba(34, 36, 38, 0.1);\n    transition: background .1s ease,border-color .1s ease;\n    padding: 1em;\n    cursor: pointer;\n    display: block;\n    overflow: hidden;\n    font-size: 1em;\n    color: rgba(0, 0, 0, 0.87);\n}\n.results .result[data-v-91a79d22]:hover {\n      background-color: #f3c7c7;\n}\n.results .result[data-v-91a79d22]:last-child {\n      border-bottom: 0;\n}\n.results .title[data-v-91a79d22] {\n    font-weight: 700;\n    font-size: 1em;\n    color: rgba(0, 0, 0, 0.85);\n}\n.results .description[data-v-91a79d22] {\n    font-size: .92857143em;\n    color: rgba(0, 0, 0, 0.4);\n}\n.message.empty[data-v-91a79d22] {\n  text-align: left;\n  padding: 0.6em;\n  font-size: 1.2rem;\n}\n.message.empty .header[data-v-91a79d22] {\n    padding-bottom: 0.2rem;\n}\n.message.empty .description[data-v-91a79d22] {\n    font-size: 0.8em;\n    color: rgba(0, 0, 0, 0.6);\n}\n@media only screen and (max-width: 768px) {\n.component[data-v-91a79d22] {\n    height: 100%;\n    width: 100%;\n    font-size: 1rem;\n}\n.component .ui.category.search .results[data-v-91a79d22] {\n      width: 95%;\n}\n.component .message.empty[data-v-91a79d22] {\n      font-size: 1.2em;\n}\n}\n", ""]);

// exports


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n  font-size: 2.5vmin;\n  padding: 0;\n  margin: 0;\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.5s ease;\n}\n.fade-enter,\n.fade-leave-active {\n  opacity: 0;\n}\n.fade-leave-active,\n.fade-enter-active {\n  transition: opacity .3s ease;\n}\n.component {\n  position: relative;\n}\n.component h1, .component h2, .component h3, .component h4, .component h5, .component h6, .component p {\n    font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.component h1 a, .component h2 a, .component h3 a, .component h4 a, .component h5 a, .component h6 a, .component p a {\n      cursor: pointer !important;\n      color: dimgray;\n      border-bottom: 1px dashed lightgray;\n}\n.component strong {\n    font-weight: 900;\n    color: black;\n}\n@media only screen and (max-width: 767px) {\n.fat-only {\n    display: none !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.thin-only {\n    display: none !important;\n}\n}\n.Commentcomponent {\n  font-size: 1.2rem;\n  font-family: Roboto, \"Microsoft JhengHei\", \"Heiti TC\", sans-serif;\n}\n.ui.compact.menu {\n  margin-bottom: 2em;\n}\n.ui.menu .item {\n  padding: 0.5em 0.8em;\n}\n.ui.green.button {\n  background-color: #40B3BF;\n}\n.ui.fluid.button {\n  width: 76%;\n  margin: auto;\n  margin-bottom: 1em;\n  font-size: 1.2rem;\n}\n@media only screen and (max-width: 767px) {\n.ui.fluid.button {\n      min-height: 3em;\n      font-size: 1rem;\n      line-height: 3em;\n      margin-left: 2em;\n}\n}\n.commentline {\n  border-bottom: 2px solid rgba(0, 0, 0, 0.1);\n  margin: 2em 0em 2em 0em;\n}\n.ui.comments .comment .text {\n  margin: 0.5em 0em 0em 3em;\n}\n@media only screen and (max-width: 767px) {\n.ui.comments .comment .text {\n      margin: 2em 0em 0em 0.5em;\n}\n}\n.ui.comments {\n  max-width: 93%;\n}\n.discussioncontent blockquote {\n  margin: 0 0 10px 0;\n  text-align: left;\n  padding: 5px;\n  border: 0px;\n}\n.discussioncontent blockquote p {\n    text-align: left;\n    font-weight: normal;\n}\n.ui.comments .comment a.author {\n  margin: 0em 1em 0em 0.5em;\n}\n.ui.comments .comment img.avatar {\n  width: 2em;\n}\n", ""]);

// exports


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.component[data-v-f3276f62] {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n  font-size: 0.8rem;\n}\n.subtitle[data-v-f3276f62] {\n  text-align: left;\n  font-size: 1.2rem;\n}\n.container[data-v-f3276f62] {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n      flex-flow: row wrap;\n  text-align: left;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  margin: 0 -10px;\n}\n.container .item[data-v-f3276f62] {\n    -ms-flex: 1;\n        flex: 1;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: column nowrap;\n        flex-flow: column nowrap;\n    position: relative;\n    margin: 10px;\n    min-width: 22vw;\n    max-width: 40vw;\n}\n@media only screen and (max-width: 420px) {\n.container .item[data-v-f3276f62] {\n        min-width: 40vw;\n}\n}\n.container .item a[data-v-f3276f62] {\n      -ms-flex: 0 0 6em;\n          flex: 0 0 6em;\n}\n.container .item a[data-v-f3276f62]:hover {\n        opacity: 0.5;\n}\n.container .item a img.cover[data-v-f3276f62] {\n        width: 100%;\n        transition: all 0.3s;\n}\n.container .item .null[data-v-f3276f62] {\n      -ms-flex: 1 1 0;\n          flex: 1 1 0;\n}\n.container .item .foot[data-v-f3276f62] {\n      -ms-flex: 0 0 10em;\n          flex: 0 0 10em;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n}\n.container .item .foot .title[data-v-f3276f62] {\n        font-size: 2vw;\n        line-height: 1.1;\n        margin: .5em 0;\n}\n.container .item .foot .owner[data-v-f3276f62] {\n        color: #AAA;\n        margin: 5px;\n}\n.container .item .foot .progress_bar[data-v-f3276f62] {\n        background-color: #CCC;\n        padding: 2px 0;\n        margin-bottom: 4px;\n}\n.container .item .foot .progress_bar .progress[data-v-f3276f62] {\n          height: 6px;\n          background-color: #000;\n          border-radius: 0 5px 0 0;\n}\n", ""]);

// exports


/***/ },
/* 97 */,
/* 98 */,
/* 99 */
/***/ function(module, exports) {

"use strict";
'use strict';

var alphabet;
var alphabetIndexMap;
var alphabetIndexMapLength = 0;

function isNumberCode(code) {
  return code >= 48 && code <= 57;
}

function naturalCompare(a, b) {
  var lengthA = (a += '').length;
  var lengthB = (b += '').length;
  var aIndex = 0;
  var bIndex = 0;

  while (aIndex < lengthA && bIndex < lengthB) {
    var charCodeA = a.charCodeAt(aIndex);
    var charCodeB = b.charCodeAt(bIndex);

    if (isNumberCode(charCodeA)) {
      if (!isNumberCode(charCodeB)) {
        return charCodeA - charCodeB;
      }

      var numStartA = aIndex;
      var numStartB = bIndex;

      while (charCodeA === 48 && ++numStartA < lengthA) {
        charCodeA = a.charCodeAt(numStartA);
      }
      while (charCodeB === 48 && ++numStartB < lengthB) {
        charCodeB = b.charCodeAt(numStartB);
      }

      var numEndA = numStartA;
      var numEndB = numStartB;

      while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
        ++numEndA;
      }
      while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
        ++numEndB;
      }

      var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length
      if (difference) {
        return difference;
      }

      while (numStartA < numEndA) {
        difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
        if (difference) {
          return difference;
        }
      }

      aIndex = numEndA;
      bIndex = numEndB;
      continue;
    }

    if (charCodeA !== charCodeB) {
      if (
        charCodeA < alphabetIndexMapLength &&
        charCodeB < alphabetIndexMapLength &&
        alphabetIndexMap[charCodeA] !== -1 &&
        alphabetIndexMap[charCodeB] !== -1
      ) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function() {
      return alphabet;
    },
    set: function(value) {
      alphabet = value;
      alphabetIndexMap = [];
      var i = 0;
      if (alphabet) {
        for (; i < alphabet.length; i++) {
          alphabetIndexMap[alphabet.charCodeAt(i)] = i;
        }
      }
      alphabetIndexMapLength = alphabetIndexMap.length;
      for (i = 0; i < alphabetIndexMapLength; i++) {
        if (alphabetIndexMap[i] === undefined) {
          alphabetIndexMap[i] = -1;
        }
      }
    },
  },
});

module.exports = naturalCompare;


/***/ },
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(164)

/* script */
__vue_exports__ = __webpack_require__(41)

/* template */
var __vue_template__ = __webpack_require__(137)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(161)

/* script */
__vue_exports__ = __webpack_require__(42)

/* template */
var __vue_template__ = __webpack_require__(134)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-280eaafe"

module.exports = __vue_exports__


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(154)

/* script */
__vue_exports__ = __webpack_require__(43)

/* template */
var __vue_template__ = __webpack_require__(128)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0638e068"

module.exports = __vue_exports__


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(166)

/* script */
__vue_exports__ = __webpack_require__(44)

/* template */
var __vue_template__ = __webpack_require__(139)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4144f431"

module.exports = __vue_exports__


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(173)

/* script */
__vue_exports__ = __webpack_require__(45)

/* template */
var __vue_template__ = __webpack_require__(146)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(158)
__webpack_require__(157)

/* script */
__vue_exports__ = __webpack_require__(46)

/* template */
var __vue_template__ = __webpack_require__(131)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1effc5c6"

module.exports = __vue_exports__


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(156)

/* script */
__vue_exports__ = __webpack_require__(48)

/* template */
var __vue_template__ = __webpack_require__(130)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1568d51d"

module.exports = __vue_exports__


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(162)

/* script */
__vue_exports__ = __webpack_require__(49)

/* template */
var __vue_template__ = __webpack_require__(135)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-287bb503"

module.exports = __vue_exports__


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(176)

/* script */
__vue_exports__ = __webpack_require__(50)

/* template */
var __vue_template__ = __webpack_require__(149)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-88189242"

module.exports = __vue_exports__


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(171)

/* script */
__vue_exports__ = __webpack_require__(51)

/* template */
var __vue_template__ = __webpack_require__(144)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-60640b22"

module.exports = __vue_exports__


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(160)

/* script */
__vue_exports__ = __webpack_require__(52)

/* template */
var __vue_template__ = __webpack_require__(133)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-27dbf9ac"

module.exports = __vue_exports__


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(165)

/* script */
__vue_exports__ = __webpack_require__(53)

/* template */
var __vue_template__ = __webpack_require__(138)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3b7b10e8"

module.exports = __vue_exports__


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(167)

/* script */
__vue_exports__ = __webpack_require__(54)

/* template */
var __vue_template__ = __webpack_require__(140)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-47d63a09"

module.exports = __vue_exports__


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(142)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5120c3f7"

module.exports = __vue_exports__


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(153)

/* script */
__vue_exports__ = __webpack_require__(55)

/* template */
var __vue_template__ = __webpack_require__(127)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(170)

/* script */
__vue_exports__ = __webpack_require__(56)

/* template */
var __vue_template__ = __webpack_require__(143)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5da6cb6a"

module.exports = __vue_exports__


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(168)

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(141)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(159)

/* script */
__vue_exports__ = __webpack_require__(58)

/* template */
var __vue_template__ = __webpack_require__(132)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1ffe16c1"

module.exports = __vue_exports__


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(175)

/* script */
__vue_exports__ = __webpack_require__(60)

/* template */
var __vue_template__ = __webpack_require__(148)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8718f044"

module.exports = __vue_exports__


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(174)

/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(147)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-86ffac4e"

module.exports = __vue_exports__


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(179)

/* script */
__vue_exports__ = __webpack_require__(62)

/* template */
var __vue_template__ = __webpack_require__(152)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-f3276f62"

module.exports = __vue_exports__


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(155)

/* script */
__vue_exports__ = __webpack_require__(63)

/* template */
var __vue_template__ = __webpack_require__(129)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0aea0f33"

module.exports = __vue_exports__


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(163)

/* script */
__vue_exports__ = __webpack_require__(64)

/* template */
var __vue_template__ = __webpack_require__(136)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-30cdb09e"

module.exports = __vue_exports__


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(172)

/* script */
__vue_exports__ = __webpack_require__(65)

/* template */
var __vue_template__ = __webpack_require__(145)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-67d7e20d"

module.exports = __vue_exports__


/***/ },
/* 127 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "ParticipationLink_components"
  }, [(ulinkall.length > 0) ? _h('div', {
    staticClass: "urllink"
  }, [_l((ulinkall), function(item, index) {
    return _h('span', {
      staticClass: "urllink"
    }, [_h('span', [_h('a', {
      staticClass: "ui teal icon button",
      attrs: {
        "href": item.link,
        "target": "_blank"
      }
    }, [_h('i', {
      staticClass: "icon",
      class: item.icon
    }), _m(0, true), _s(item.text)])])])
  })]) : _e()])
}},staticRenderFns: [function (){with(this) {
  return _h('span', {
    staticClass: "fat-only"
  })
}}]}

/***/ },
/* 128 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('h1', {
    staticClass: "ui header"
  }, [_s(myC.t)])]), _h('HotProposal', {
    staticClass: "hotproposal",
    attrs: {
      "hotProposal": cataTopics,
      "header": myC.t
    }
  })])
}},staticRenderFns: []}

/***/ },
/* 129 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component proposalTab"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('div', {
    staticClass: "ui sticky mobile-step thin-only",
    attrs: {
      "id": "mobile-step"
    }
  }, [_h('div', {
    staticClass: "ui vertical menu"
  }, [_l((steps), function(step, idx) {
    return _h('a', {
      staticClass: "fitted item",
      class: {
        'active': idx == myIdx
      },
      attrs: {
        "href": '#' + step.dataName
      },
      on: {
        "click": function($event) {
          myIdx = idx
        }
      }
    }, [_h('p', [_s(step.label)])])
  })])]), _h('div', {
    staticClass: "ui top attached big steps fat-only"
  }, [_l((steps), function(step, idx) {
    return _h('a', {
      staticClass: "step",
      class: {
        'active': idx == myIdx
      },
      on: {
        "click": function($event) {
          myIdx = idx
        }
      }
    }, [_h('div', {
      staticClass: "label"
    }, [_s(step.label)]), _h('div', {
      staticClass: "number"
    }, [_s(idx + 1)])])
  })]), _h('div', {
    staticClass: "ui segment",
    class: {
      'basic': onMobile, 'attached': !onMobile
    },
    attrs: {
      "id": "context"
    }
  }, [(!onMobile) ? _h('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_l((steps), function(step, idx) {
    return (idx == myIdx) ? _h('Box', {
      attrs: {
        "list": mySort(step.dataName),
        "desc": step.description,
        "label": step.label,
        "name": step.dataName
      }
    }) : _e()
  })]) : [_l((steps), function(step, idx) {
    return _h('Box', {
      attrs: {
        "list": mySort(step.dataName),
        "desc": step.description,
        "label": step.label,
        "name": step.dataName
      },
      on: {
        "stickTo": function($event) {
          onStickTo(idx, $event)
        }
      }
    })
  })]])])])
}},staticRenderFns: []}

/***/ },
/* 130 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "step-progress-bar"
  }, [_h('ul', {
    staticClass: "progress-bar"
  }, [_l((steps.stage), function(s, idx) {
    return _h('li', {
      class: {
        active: s.active, current: s.current
      }
    }, [_s(s.title)])
  })])])])
}},staticRenderFns: []}

/***/ },
/* 131 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui left aligned container"
  }, [(dType) ? [(dType.type.includes('slido')) ? _h('div', {
    staticClass: "slido",
    domProps: {
      "innerHTML": _s(dType.slido)
    }
  }) : _e(), (dType.type.includes('polis')) ? _h('div', {
    staticClass: "polis",
    domProps: {
      "innerHTML": _s(dType.polis)
    }
  }) : _e(), (dType.type.includes('livehouse')) ? _h('div', {
    staticClass: "livehouse",
    domProps: {
      "innerHTML": _s(dType.livehouse)
    }
  }) : _e(), _l((dType.discourse), function(disc, index) {
    return (dType.type.includes('discourse')) ? _h('div', {
      staticClass: "discourse ui fluid styled accordion"
    }, [_h('div', {
      staticClass: "title discoursetitle"
    }, [_m(0, true), _s(disc.title)]), _h('div', {
      staticClass: "content"
    }, [_h('Discussion_Comment', {
      attrs: {
        "comment_id": disc.id,
        "slice": false
      }
    })])]) : [(lastStep === '歷史案件') ? _h('div', ["本案已討論結束，詳細歷程可參考「議題時間軸」"]) : _h('div', [(lastStep === '送交院會') ? _h('div', ["本案已擬定草案，送交院會審查中"]) : _h('div', ["本案目前無可線上參與的項目"])])]
  })] : _e()])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "dropdown icon"
  })
}}]}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_m(0), _h('div', {
    staticClass: "fat-only"
  }, [_h('div', {
    staticClass: "swiper-container1"
  }, [_m(1), _m(2), _h('div', {
    staticClass: "swiper-wrapper"
  }, [_l((allNews), function(n, idx) {
    return _h('div', {
      staticClass: "swiper-slide"
    }, [_h('div', {
      staticClass: "ui cards"
    }, [_h('div', {
      staticClass: "card"
    }, [_h('div', {
      staticClass: "image"
    }, [(n.img_link != 'undefined') ? _h('img', {
      attrs: {
        "src": n.img_link
      }
    }) : _h('img', {
      attrs: {
        "id": "image",
        "src": __webpack_require__(6)
      }
    })]), _h('div', {
      staticClass: "content"
    }, [_h('div', {
      staticClass: "tags"
    }, [_l((n.tags), function(t) {
      return _h('div', {
        staticClass: "ui mini label"
      }, [_s(t)])
    })]), _h('a', {
      attrs: {
        "href": n.news_link,
        "target": "_blank"
      }
    }, [_s(n.title)])]), _h('div', {
      staticClass: "description"
    }, [_h('p', {
      staticClass: "JQellipsis"
    }, [_s(n.content)])]), _h('div', {
      staticClass: "extra content"
    }, [_h('div', {
      staticClass: "right floated author"
    }, [_h('a', {
      attrs: {
        "href": n.source_link,
        "target": "_blank"
      }
    }, [_s(n.source)])])])])])])
  })])])]), _h('div', {
    staticClass: "thin-only"
  }, [_h('div', {
    staticClass: "swiper-container2"
  }, [_m(3), _m(4), _h('div', {
    staticClass: "swiper-wrapper"
  }, [_l((allNews), function(n, idx) {
    return _h('div', {
      staticClass: "swiper-slide"
    }, [_h('div', {
      staticClass: "ui cards"
    }, [_h('div', {
      staticClass: "card"
    }, [_h('div', {
      staticClass: "image"
    }, [(n.img_link != 'undefined') ? _h('img', {
      attrs: {
        "src": n.img_link
      }
    }) : _h('img', {
      attrs: {
        "id": "image",
        "src": __webpack_require__(6)
      }
    })]), _h('div', {
      staticClass: "content"
    }, [_h('div', {
      staticClass: "tags"
    }, [_l((n.tags), function(t) {
      return _h('div', {
        staticClass: "ui mini label"
      }, [_s(t)])
    })]), _h('a', {
      attrs: {
        "href": n.news_link,
        "target": "_blank"
      }
    }, [_s(n.title)])]), _h('div', {
      staticClass: "description"
    }, [_h('p', {
      staticClass: "JQellipsis"
    }, [_s(n.content)])]), _h('div', {
      staticClass: "extra content"
    }, [_h('div', {
      staticClass: "right floated author"
    }, [_h('a', {
      attrs: {
        "href": +n.source_link,
        "target": "_blank"
      }
    }, [_s(n.source)])])])])])])
  })])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('h1', {
    staticClass: "ui horizontal divider"
  }, ["News"])
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-button-prev"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-button-next"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-pagination"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-scrollbar"
  })
}}]}

/***/ },
/* 133 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _m(0)
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('h1', {
    staticClass: "ui icon header"
  }, [_h('i', {
    staticClass: "circular talk icon"
  }), "如何有效的發言？"]), _h('div', {
    staticClass: "ui left aligned text container"
  }, [_h('p', ["vTaiwan全部的訊息都是公開閱覽。"]), _h('p', ["基本上，發言沒有任何的資格或內容限制。但若您能夠參考以下的說明來進行發言，將會讓您的發言更容易被行政機關或其他參與者所閱讀及理解："]), _h('p', ["第一，您在提出法規制訂或修改建議時，除了「內容」外，也可以補充說明「理由」，也就是您提出建議前所考量的各種因素。「理由」可以是資訊、案例，或者是具體可行的想法，如果可以附上訊息的來源出處更好，這樣將有助於行政機關或其他參與者更容易理解您的建議。"]), _h('p', ["第二，針對討論主題，也歡迎提出詢問。例如，行政機關的文字說明不夠清晰，或者是為了討論需要，希望行政機關能夠提供更多資訊的時候。"]), _h('p', ["第三，若您單純只是認同某個建議，可以直接為它按「讚」，而不用再說一次一樣的東西。若您不認同某個建議，或是某段說明的內容，可以提出建議或詢問，但請避免加入過多的個人情緒，例如直接的批評或是嘲諷，這樣無助於您意見的被採納。"])]), _h('h1', {
    staticClass: "ui icon header"
  }, [_h('i', {
    staticClass: "circular flag icon"
  }), "為何有些發言被標示？"]), _h('div', {
    staticClass: "ui left aligned text container"
  }, [_h('p', ["用高亮度標示的發言，是版主推薦作為有效發言的範例。這些發言被推薦的原因，不是「內容」寫了什麼，而是具備良好的討論態度及陳述方式。"]), _h('p', ["vTaiwan 的版主團隊為中立性質，不會對個別的發言採取支持或反對立場。"])]), _h('h1', {
    staticClass: "ui center aligned icon header"
  }, [_h('i', {
    staticClass: "circular send icon"
  }), "來提個案吧！"]), _h('div', {
    staticClass: "ui text container"
  }, [_h('p', ["由下而上的提案，經網路連署後由各部會處理並回應"])]), _h('div', {
    staticClass: "ui basic segment"
  }, [_h('a', {
    attrs: {
      "href": "http://join.gov.tw/idea/",
      "target": "_blank"
    }
  }, [_h('div', {
    staticClass: "ui massive teal labeled icon button"
  }, [_h('i', {
    staticClass: "edit icon"
  }), _h('p', ["提案"])])]), _h('h3', [_h('a', {
    attrs: {
      "href": "http://join.gov.tw/idea/",
      "target": "_blank"
    }
  }, ["公共政策網路參與平台 ", _h('i', {
    staticClass: "external link icon"
  })])])])])])
}}]}

/***/ },
/* 134 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "componentcontactus"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('div', {
    staticClass: "row BGgray"
  }, [_h('div', {
    staticClass: "ui left aligned text container"
  }, [_m(0), _m(1), _h('div', {
    staticClass: "ui form"
  }, [_h('div', {
    staticClass: "field"
  }, [_m(2), _h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (subject),
      expression: "subject"
    }],
    attrs: {
      "type": "text",
      "name": "subject",
      "placeholder": "請輸入標題(字數須達10個字以上)..."
    },
    domProps: {
      "value": _s(subject)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        subject = $event.target.value
      }
    }
  })]), _h('div', {
    staticClass: "field"
  }, [_m(3), _h('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (content),
      expression: "content"
    }],
    attrs: {
      "name": "content",
      "style": "margin-top: 0px; margin-bottom: 0px; height: 168px;",
      "placeholder": "請輸入您寶貴的意見(字數須達20個字以上)..."
    },
    domProps: {
      "value": _s(content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        content = $event.target.value
      }
    }
  })]), _m(4), _m(5)]), _m(6)])]), _h('div', {
    staticClass: "row left"
  }, [_h('div', {
    staticClass: "ui segment attached"
  }, [_m(7), _l((Discussion), function(item, index) {
    return _h('div', [_h('div', {
      staticClass: "ui styled accordion"
    }, [_h('div', {
      staticClass: "title"
    }, [_m(8, true), _s(Discussion[index].title)]), _h('div', {
      staticClass: "content"
    }, [_h('Discussion_Comment', {
      attrs: {
        "comment_id": Discussion[index].id,
        "slice": false
      }
    })])])])
  }), (more.more_topics_url != undefined) ? _h('div', {
    staticClass: "ui basic button",
    on: {
      "click": greet
    }
  }, ["閱讀更多..."]) : _e()])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('h2', ["聯絡我們"])
}},function (){with(this) {
  return _h('p', ["vTaiwan 是個由g0v 眾多人維護的開放社群，歡迎給予我們您寶貴的意見與指教，我們將盡速回應。您的意見也將公開於討論區中，供所有讀者參考。"])
}},function (){with(this) {
  return _h('label', ["標題："])
}},function (){with(this) {
  return _h('label', ["內容："])
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui green submit button"
  }, ["送出       "])
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui error message"
  })
}},function (){with(this) {
  return _h('p')
}},function (){with(this) {
  return _h('h2', ["歷史留言"])
}},function (){with(this) {
  return _h('i', {
    staticClass: "dropdown icon"
  })
}}]}

/***/ },
/* 135 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "content ui compact segment",
    domProps: {
      "innerHTML": _s(slide.content)
    }
  })])
}},staticRenderFns: []}

/***/ },
/* 136 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_m(0), _h('div', {
    staticClass: "swiper-container"
  }, [_m(1), _m(2), _h('div', {
    staticClass: "swiper-wrapper"
  }, [_l((hotTopics), function(item, idx) {
    return _h('div', {
      staticClass: "swiper-slide",
      style: ({
        'background': 'url(' + item.cover + ') 100% 100% / cover'
      })
    }, [_h('div', {
      staticClass: "box"
    }, [_h('div', {
      staticClass: "status ui basic huge label"
    }, [" \n" + _s(item.status)]), _h('h1', {
      staticClass: "slogan ui header"
    }, [_s(item.title), _h('div', {
      staticClass: "sub header"
    }, [_s(item.slogan)])]), _h('router-link', {
      staticClass: "ui right labeled icon teal huge button",
      attrs: {
        "to": '/topic/' + item.routeName
      }
    }, [_m(3, true), _m(4, true)]), _m(5, true)])])
  })])])])
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "ui active inverted dimmer",
    attrs: {
      "id": "loader"
    }
  }, [_h('div', {
    staticClass: "ui loader"
  })])
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-scrollbar"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "swiper-pagination"
  })
}},function (){with(this) {
  return _h('i', {
    staticClass: "right arrow icon"
  })
}},function (){with(this) {
  return _h('p', ["進入議題"])
}},function (){with(this) {
  return _h('i', {
    staticClass: "certificate icon background"
  })
}}]}

/***/ },
/* 137 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "app",
    attrs: {
      "id": "app"
    }
  }, [_h('Navbar', {
    attrs: {
      "routes": myRoutes,
      "allTopics": allTopics
    }
  }), _h('div', {
    staticClass: "main",
    attrs: {
      "id": "main"
    }
  }, [_h('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_h('router-view', {
    staticClass: "view",
    attrs: {
      "allTopics": allTopics,
      "catagories": catagories,
      "allNews": allNews
    }
  })])]), _h('MyFooter', {
    staticClass: "footer"
  })])
}},staticRenderFns: []}

/***/ },
/* 138 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _m(0)
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('h1', {
    staticClass: "ui icon header"
  }, [_h('i', {
    staticClass: "circular idea icon"
  }), "vTaiwan 是什麼？"]), _h('div', {
    staticClass: "ui left aligned text container"
  }, [_h('p', ["這是一個討論法規該如何制定或修改的平台，透過彼此的意見交流，希望能夠產出符合各利益關係人期待，也貼近實際需求的法規內容。"])]), _h('h1', {
    staticClass: "ui icon header"
  }, [_h('i', {
    staticClass: "circular hand rock icon"
  }), "為什麼要參與 vTaiwan？"]), _h('div', {
    staticClass: "ui left aligned text container"
  }, [_h('p', ["法律規定了社會上每個人的權利與義務，因此法規應該具備哪些內容，不只是行政機關，或是立法部門的工作，而是與每個人都切身相關。"]), _h('p', ["此外，越多利益關係人加入討論，就能夠讓法規的內容越完整周延，避免出現權益受到影響、但意見又無法表達的矛盾狀況。簡單來說，參與 vTaiwan，不只能夠照顧到自己的權益，同時也是在幫助每一個可能的利益關係人。"])]), _h('h1', {
    staticClass: "ui icon header"
  }, [_h('i', {
    staticClass: "circular announcement icon"
  }), "在 vTaiwan 表達意見有什麼用？"]), _h('div', {
    staticClass: "ui left aligned text container"
  }, [_h('p', ["首先，全部的意見都是公開閱覽，除了行政機關與法規制定機關必須閱讀以外，所有的參與者也可以從不同的意見中，增進彼此的相互理解與建立對議題更深入的思考。"]), _h('p', ["其次，行政機關或法規制定機關必須彙整所有的意見，並納入決策的討論過程。針對意見中的疑問或建議，機關要在一定時間內提出回覆。當法規修改內容確定後，也要說明具體採納了哪些意見。對於未採納的意見，機關也必須回應目前無法實行的理由。"]), _h('p', ["感謝 ", _h('a', {
    attrs: {
      "href": "http://g0v.tw"
    }
  }, ["g0v"]), " vTaiwan.tw 專案參與者的共同建置、國發會法治協調中心與資策會科技法律研究所的協力支援，以及所有參與者的意見貢獻。"])])])])
}}]}

/***/ },
/* 139 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component pushable"
  }, [_h('div', {
    staticClass: "ui left inverted vertical menu sidebar",
    attrs: {
      "id": "sidebar"
    },
    on: {
      "mouseleave": hideSidebar
    }
  }, [_l((stage), function(step, idx) {
    return _h('div', {
      staticClass: "item"
    }, [_h('div', {
      staticClass: "header"
    }, [_h('p', [_s(step) + " "])]), _h('div', {
      staticClass: "menu"
    }, [_l((allTopics), function(obj, idx) {
      return (step === obj.status) ? _h('router-link', {
        staticClass: "item",
        class: {
          'router-link-active': obj.routeName === routename
        },
        attrs: {
          "to": '/topic/' + obj.routeName
        },
        on: {
          "click": function($event) {
            routename = obj.routeName
          }
        }
      }, [_h('p', [_s(obj.title) + "   "])]) : _e()
    })])])
  })]), _h('div', {
    attrs: {
      "id": "opener"
    },
    on: {
      "mouseover": showSidebar
    }
  }), _h('div', {
    staticClass: "ui container pusher",
    attrs: {
      "id": "pusher"
    }
  }, [(article.id !== undefined) ? _h('NextStage', {
    attrs: {
      "article": article
    }
  }) : _e(), _h('h1', {
    staticClass: "ui header"
  }, [_s(article.title)]), (article.id !== undefined) ? _h('Slide', {
    attrs: {
      "article": article
    }
  }) : _e(), _h('div', {
    staticClass: "ui three item big menu"
  }, [_l((tabcontent), function(step, idx) {
    return _h('a', {
      staticClass: "item",
      class: {
        'active': idx == myIdx
      },
      on: {
        "click": function($event) {
          myIdx = idx
        }
      }
    }, [_h('i', {
      staticClass: "icon",
      class: {
        'info circle': step === '詳細內容', 'calendar': step === '議題時間軸', 'comments': step === '參與討論'
      }
    }), _h('p', {
      staticClass: "fat-only"
    }, [_s(step)])])
  })]), (article.id !== undefined) ? _h('div', {
    staticClass: "info"
  }, [_h('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [(myIdx === 0) ? _h('Description', {
    attrs: {
      "article": article
    }
  }) : _e(), (myIdx === 1) ? _h('Timeline', {
    attrs: {
      "article": article
    }
  }) : _e(), (myIdx === 2) ? _h('Discussion', {
    attrs: {
      "article": article
    }
  }) : _e()])]) : _e()])])
}},staticRenderFns: []}

/***/ },
/* 140 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _m(0)
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('h1', [_h('i', {
    staticClass: "user icon"
  }), "登入"]), _h('div', {
    staticClass: "ui huge buttons"
  }, [_h('div', {
    staticClass: "ui orange button"
  }, [_h('i', {
    staticClass: "google icon"
  }), "Google"]), _h('div', {
    staticClass: "or"
  }), _h('div', {
    staticClass: "ui blue button"
  }, [_h('i', {
    staticClass: "facebook icon"
  }), "Facebook"])])])
}}]}

/***/ },
/* 141 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _m(0)
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "track"
  }, [_h('h1', [_h('i', {
    staticClass: "unhide icon"
  }), "來追綜定案"]), _h('h4', ["追綜定案內容和後續發展"])])
}}]}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui inverted vertical footer segment"
  }, [_h('div', {
    staticClass: "ui center aligned container"
  }, [_h('div', {
    staticClass: "ui stackable inverted divided grid"
  }, [_h('div', {
    staticClass: "three wide column"
  }, [_m(0), _h('div', {
    staticClass: "ui inverted link list"
  }, [_m(1), _m(2), _h('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/",
      "exact": "",
      "title": "Home"
    }
  }, ["vTaiwan"])])]), _h('div', {
    staticClass: "three wide column"
  }, [_m(3), _h('div', {
    staticClass: "ui inverted link list"
  }, [_m(4), _m(5), _h('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/subscribe",
      "exact": "",
      "title": "訂閱電子報"
    }
  }, ["訂閱電子報"])])]), _h('div', {
    staticClass: "three wide column"
  }, [_m(6), _h('div', {
    staticClass: "ui inverted link list"
  }, [_h('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/contactus",
      "exact": "",
      "title": "聯絡我們"
    }
  }, ["聯絡我們"]), _h('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/how-to-use",
      "exact": "",
      "title": "使用手冊"
    }
  }, ["使用手冊"]), _h('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/intro",
      "exact": "",
      "title": "關於vTaiwan"
    }
  }, ["關於 vTaiwan"])])]), _m(7)])]), _m(8), _h('div', {
    staticClass: "ui center aligned container"
  }, [_m(9), _m(10), _h('router-link', {
    staticClass: "ui icon",
    attrs: {
      "to": "/",
      "exact": "",
      "title": "Home"
    }
  }, [_m(11)]), _m(12), _h('router-link', {
    staticClass: "ui circular icon orange button",
    attrs: {
      "to": "/Contactus",
      "exact": "",
      "title": "Contact Us"
    }
  }, [_m(13)])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('h4', {
    staticClass: "ui inverted header"
  }, ["相關連結"])
}},function (){with(this) {
  return _h('a', {
    staticClass: "item",
    attrs: {
      "href": "https://talk.vtaiwan.tw/",
      "title": "vTaiwan討論區",
      "target": "_blank"
    }
  }, ["討論區"])
}},function (){with(this) {
  return _h('a', {
    staticClass: "item",
    attrs: {
      "href": "https://github.com/g0v/vue.vtaiwan.tw",
      "title": "Github",
      "target": "_blank"
    }
  }, ["Github"])
}},function (){with(this) {
  return _h('h4', {
    staticClass: "ui inverted header"
  }, ["影音專區"])
}},function (){with(this) {
  return _h('a', {
    staticClass: "item",
    attrs: {
      "href": "https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/",
      "title": "Youtube",
      "target": "_blank"
    }
  }, ["Youtube"])
}},function (){with(this) {
  return _h('a', {
    staticClass: "item",
    attrs: {
      "href": "https://www.facebook.com/vtaiwan.tw/",
      "title": "Fackbook",
      "target": "_blank"
    }
  }, ["Fackbook              "])
}},function (){with(this) {
  return _h('h4', {
    staticClass: "ui inverted header"
  }, ["關於我們"])
}},function (){with(this) {
  return _h('div', {
    staticClass: "seven wide column"
  }, [_h('h4', {
    staticClass: "ui inverted header"
  }, ["vTaiwan"]), _h('p', ["vTaiwan 為討論法規該如何制定或修改的平台，透過彼此的意見交流，希望能夠產出符合各利益關係人期待，也貼近實際需求的法規內容。"])])
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui inverted section divider"
  })
}},function (){with(this) {
  return _h('a', {
    staticClass: "ui circular facebook icon button",
    attrs: {
      "href": "https://www.facebook.com/vtaiwan.tw/",
      "title": "Fackbook",
      "target": "_blank"
    }
  }, [_h('i', {
    staticClass: "big facebook icon"
  })])
}},function (){with(this) {
  return _h('a', {
    staticClass: "ui circular youtube icon button",
    attrs: {
      "href": "https://www.youtube.com/channel/UChC85hbUuDAvFpc7Uuj69DA/",
      "title": "Youtube",
      "target": "_blank"
    }
  }, [_h('i', {
    staticClass: "big youtube icon"
  })])
}},function (){with(this) {
  return _h('img', {
    attrs: {
      "src": __webpack_require__(6),
      "alt": "logo"
    }
  })
}},function (){with(this) {
  return _h('a', {
    staticClass: "ui circular icon grey button",
    attrs: {
      "href": "https://github.com/g0v/vue.vtaiwan.tw",
      "title": "Github",
      "target": "_blank"
    }
  }, [_h('i', {
    staticClass: "big github icon"
  })])
}},function (){with(this) {
  return _h('i', {
    staticClass: "big mail icon"
  })
}}]}

/***/ },
/* 143 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "componentsubscribe"
  }, [_h('div', {
    staticClass: "ui container"
  }, [_h('div', {
    staticClass: "row BGgray"
  }, [_h('div', {
    staticClass: "ui left aligned text container"
  }, [_m(0), _m(1), _m(2), _h('div', {
    staticClass: "ui form"
  }, [_h('div', {
    staticClass: "field"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (email),
      expression: "email"
    }],
    attrs: {
      "type": "text",
      "name": "email",
      "placeholder": "請輸入email"
    },
    domProps: {
      "value": _s(email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        email = $event.target.value
      }
    }
  })]), _m(3), _m(4)]), _m(5)])]), _h('div', {
    staticClass: "row left"
  }, [_h('div', {
    staticClass: "ui segment attached"
  }, [_m(6), _l((Discussion), function(item, index) {
    return _h('div', [_h('div', {
      staticClass: "ui styled accordion"
    }, [_h('div', {
      staticClass: "title"
    }, [_m(7, true), _s(Discussion[index].title)]), _h('div', {
      staticClass: "content"
    }, [_h('Discussion_Comment', {
      attrs: {
        "comment_id": Discussion[index].id,
        "slice": false
      }
    })])])])
  }), (more.more_topics_url != undefined) ? _h('div', {
    staticClass: "ui basic button",
    on: {
      "click": greet
    }
  }, ["閱讀更多...    "]) : _e()])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('h2', ["訂閱電子報"])
}},function (){with(this) {
  return _h('p', [_h('span', ["已註冊過vtaiwan討論區用戶，請至"]), _h('a', {
    attrs: {
      "href": "https://talk.vtaiwan.tw/c/newsletter",
      "title": "電子報",
      "target": "_blank"
    }
  }, ["電子報討論專區"]), _h('span', ["設定監看頭一帖"])])
}},function (){with(this) {
  return _h('p', ["尚未註冊請輸入email："])
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui green submit button"
  }, ["訂閱       "])
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui error message"
  })
}},function (){with(this) {
  return _h('p')
}},function (){with(this) {
  return _h('h2', ["歷史電子報"])
}},function (){with(this) {
  return _h('i', {
    staticClass: "dropdown icon"
  })
}}]}

/***/ },
/* 144 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "home"
  }, [_h('Slideshow', {
    staticClass: "slideshow",
    attrs: {
      "hotTopics": hotTopics,
      "allTopics": allTopics
    }
  }), _h('ProposalTab', {
    staticClass: "proposalTab",
    attrs: {
      "allTopics": allTopics
    }
  }), _h('News', {
    attrs: {
      "allNews": allNews
    }
  })])
}},staticRenderFns: []}

/***/ },
/* 145 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "ui container basic segment",
    attrs: {
      "id": name
    }
  }, [_h('h2', {
    staticClass: "ui header m-title thin-only"
  }, [_s(label)]), _h('div', {
    staticClass: "desc ui basic center aligned segment fat-only"
  }, [_m(0), _s(desc) + " ", _m(1)]), (!list.length) ? _h('div', {
    staticClass: "ui compact info message"
  }, ["目前還沒有正在進行的議案…"]) : _e(), _h('div', {
    staticClass: "ui four stackable cards"
  }, [_l((list), function(item) {
    return _h('router-link', {
      staticClass: "card",
      attrs: {
        "to": '/topic/' + item.routeName
      }
    }, [(name === 'discuss') ? _h('div', {
      staticClass: "progress_bar"
    }, [(item.status === '討論中') ? _h('div', {
      staticClass: "progress_text"
    }, ["還有" + _s(Math.floor(item.total - item.progress)) + "天"]) : _h('div', {
      staticClass: "progress_text"
    }, ["討論已結束"]), _h('div', {
      staticClass: "progress_color",
      style: (progressStyle(item.progress, item.total))
    })]) : _e(), _h('div', {
      staticClass: "image"
    }, [_h('img', {
      staticClass: "ui image",
      attrs: {
        "src": item.cover || 'http://lorempixel.com/320/240/sports'
      }
    })]), _h('div', {
      staticClass: "content"
    }, [_h('h3', {
      staticClass: "ui header"
    }, [_s(item.title)])]), _h('div', {
      staticClass: "extra content"
    }, [_h('p', [_s(item.slogan)])])])
  })])])])
}},staticRenderFns: [function (){with(this) {
  return _h('sup', [_h('i', {
    staticClass: "quote left icon"
  })])
}},function (){with(this) {
  return _h('sub', [_h('i', {
    staticClass: "quote right icon"
  })])
}}]}

/***/ },
/* 146 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "fat-only"
  }, [_h('div', {
    staticClass: "styles content",
    domProps: {
      "innerHTML": _s(information)
    }
  })]), _h('div', {
    staticClass: "thin-only"
  }, [_h('div', {
    staticClass: "styles content",
    domProps: {
      "innerHTML": _s(information)
    }
  })])])
}},staticRenderFns: []}

/***/ },
/* 147 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('div', {
    staticClass: "thin-only"
  }, [_h('div', {
    staticClass: "ui category search",
    class: {
      active: myKey
    },
    on: {
      "keyup": function($event) {
        if ($event.keyCode !== 40) return;
        onKeyDown()
      }
    }
  }, [_h('div', {
    staticClass: "ui icon input"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (myKey),
      expression: "myKey"
    }],
    staticClass: "prompt",
    attrs: {
      "type": "search",
      "placeholder": "搜尋..."
    },
    domProps: {
      "value": _s(myKey)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        myKey = $event.target.value
      }
    }
  }), _m(0)]), _h('SearchResult', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (myKey),
      expression: "myKey"
    }],
    attrs: {
      "allTopics": allTopics,
      "myKey": myKey,
      "myIdx": myIdx
    }
  })])])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "search icon"
  })
}}]}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('nav', {
    staticClass: "fat-only"
  }, [_h('div', {
    staticClass: "ui grid"
  }, [_h('div', {
    staticClass: "seven wide column"
  }, [_h('div', {
    staticClass: "ui category search",
    class: {
      active: myKey
    },
    on: {
      "keyup": function($event) {
        if ($event.keyCode !== 40) return;
        onKeyDown()
      }
    }
  }, [_h('div', {
    staticClass: "ui icon input"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (myKey),
      expression: "myKey"
    }],
    staticClass: "prompt",
    attrs: {
      "type": "search",
      "placeholder": "搜尋..."
    },
    domProps: {
      "value": _s(myKey)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) return;
        myKey = $event.target.value
      }
    }
  }), _m(0)]), _h('SearchResult', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (myKey),
      expression: "myKey"
    }],
    attrs: {
      "allTopics": allTopics,
      "myKey": myKey,
      "myIdx": myIdx
    }
  })])]), _h('div', {
    staticClass: "two wide column"
  }, [_h('router-link', {
    staticClass: "logo",
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_m(1), _m(2)])]), _h('div', {
    staticClass: "seven wide column right"
  }, [_l((routes), function(r) {
    return (r.r) ? _h('router-link', {
      staticClass: "item",
      class: r.r,
      attrs: {
        "to": '/' + r.r,
        "exact": ""
      }
    }, [_s(r.t)]) : _e()
  })])])]), _h('nav', {
    staticClass: "thin-only"
  }, [_h('router-link', {
    staticClass: "m-logo",
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_m(3), _m(4)]), _h('div', {
    staticClass: "menu"
  }, [_h('router-link', {
    staticClass: "m-item",
    attrs: {
      "to": "/how-to-use"
    }
  }, ["使用手冊"]), _h('router-link', {
    staticClass: "m-item",
    attrs: {
      "to": "/"
    }
  }, ["探索議題"]), _h('router-link', {
    staticClass: "m-item",
    attrs: {
      "to": "/search"
    }
  }, ["搜尋議題"])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "search icon"
  })
}},function (){with(this) {
  return _h('img', {
    attrs: {
      "src": __webpack_require__(6),
      "alt": "logo"
    }
  })
}},function (){with(this) {
  return _h('span', ["vTaiwan"])
}},function (){with(this) {
  return _h('img', {
    attrs: {
      "src": __webpack_require__(6),
      "alt": "logo"
    }
  })
}},function (){with(this) {
  return _h('span', ["vTaiwan"])
}}]}

/***/ },
/* 149 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component"
  }, [_h('table', {
    staticClass: "ui fixed striped unstackable table"
  }, [_h('thead', [_h('tr', {
    staticClass: "center aligned"
  }, [_l((timeline_title), function(t) {
    return _h('th', [_h('h3', {
      staticClass: "ui header"
    }, [_s(t)])])
  })])]), _h('tbody', [_l((timeline.time), function(ev, idx) {
    return _h('tr', [_h('td', {
      staticClass: "center aligned"
    }, [_h('div', [_s(ev.start) + " "]), (ev.end != null) ? _h('i', {
      staticClass: "arrow down icon"
    }) : _e(), _h('div', [_s(ev.end)])]), _h('td', [_h('div', {
      staticClass: "status ui basic huge label fat-only"
    }, [_s(ev.title)]), _h('div', {
      staticClass: "status ui basic small label thin-only"
    }, [_s(ev.title)]), (ev.info != null) ? _h('h4', {
      staticClass: "ui header"
    }, [_s(ev.info) + " "]) : _e()]), _h('td', [_h('Plink', {
      attrs: {
        "urllink": ev.link
      }
    })])])
  })])])])
}},staticRenderFns: []}

/***/ },
/* 150 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "component",
    attrs: {
      "id": "searchresult"
    }
  }, [_h('div', {
    staticClass: "results"
  }, [_l((stage), function(s, idx) {
    return (stage.length !== 0) ? _h('div', {
      staticClass: "category",
      on: {
        "click": sHide
      }
    }, [_h('div', {
      staticClass: "name"
    }, [_s(s) + " "]), _l((results), function(r, idx) {
      return (s == r.status) ? _h('router-link', {
        staticClass: "result",
        attrs: {
          "to": '/topic/' + r.routeName
        }
      }, [_h('div', {
        staticClass: "contents"
      }, [_h('div', {
        staticClass: "title",
        domProps: {
          "innerHTML": _s(toHTML(r.title, myKey))
        }
      }), _h('div', {
        staticClass: "description",
        domProps: {
          "innerHTML": _s(toHTML(r.routeName, myKey))
        }
      })])]) : _e()
    })]) : _e()
  }), (stage.length == 0) ? _h('div', {
    staticClass: "message empty"
  }, [_m(0), _h('div', {
    staticClass: "description"
  }, ["找不到符合 " + _s(myKey) + " 的議題"])]) : _e()])])
}},staticRenderFns: [function (){with(this) {
  return _h('div', {
    staticClass: "header"
  }, ["沒有結果"])
}}]}

/***/ },
/* 151 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "Commentcomponent"
  }, [_h('div', {
    staticClass: "ui compact menu"
  }, [_h('a', {
    staticClass: "item",
    attrs: {
      "title": "回復人數"
    }
  }, [_m(0), " " + _s(comment.length)]), _h('a', {
    staticClass: "item",
    attrs: {
      "title": "觀看人數"
    }
  }, [_m(1), " " + _s(views['views'])]), _h('a', {
    staticClass: "item",
    attrs: {
      "title": "用戶人數"
    }
  }, [_m(2), " " + _s(views['participant_count']) + "   "]), _h('a', {
    staticClass: "item",
    attrs: {
      "title": "最新回復"
    }
  }, [_m(3), " " + _s(this.views['last_posted_at']) + " "])]), _l((comment), function(item, index) {
    return _h('div', [_h('div', {
      staticClass: "discussioncomment ui comments"
    }, [_h('div', {
      staticClass: "comment"
    }, [_h('a', {
      staticClass: "avatar"
    }, [_h('img', {
      attrs: {
        "src": comment[index]['avatar_template']
      }
    })]), _h('div', {
      staticClass: "discussioncontent"
    }, [_h('a', {
      staticClass: "author"
    }, [_s(comment[index]['username'])]), _h('div', {
      staticClass: "metadata"
    }, [_h('span', {
      staticClass: "date"
    }, [_h('div', {
      domProps: {
        "innerHTML": _s(comment[index]['created_at'])
      }
    })])]), _h('div', {
      staticClass: "text"
    }, [_h('div', {
      domProps: {
        "innerHTML": _s(comment[index]['cooked'])
      }
    })]), _m(4, true)])])])])
  }), _h('a', {
    attrs: {
      "href": 'https://talk.vtaiwan.tw/t/topic/' + comment_id,
      "target": "_blank"
    }
  }, [_m(5)])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "reply icon"
  })
}},function (){with(this) {
  return _h('i', {
    staticClass: "unhide icon"
  })
}},function (){with(this) {
  return _h('i', {
    staticClass: "user icon"
  })
}},function (){with(this) {
  return _h('i', {
    staticClass: "calendar icon"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "commentline"
  })
}},function (){with(this) {
  return _h('div', {
    staticClass: "ui fluid green labeled submit icon button"
  }, [_h('i', {
    staticClass: "icon edit"
  }), "我要留言"])
}}]}

/***/ },
/* 152 */
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h("div")
}},staticRenderFns: []}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-002a430a!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ParticipationLink.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-002a430a!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ParticipationLink.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0638e068&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Catagory.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0638e068&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Catagory.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0aea0f33&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_ProposalTab.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0aea0f33&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_ProposalTab.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1568d51d&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_NextStage.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1568d51d&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_NextStage.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1effc5c6!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Detail_Topic_Discussion.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1effc5c6!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Detail_Topic_Discussion.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1effc5c6&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Discussion.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1effc5c6&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Discussion.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1ffe16c1&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_News.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1ffe16c1&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_News.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27dbf9ac&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./HowToUse.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27dbf9ac&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./HowToUse.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-280eaafe&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContactUs.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-280eaafe&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContactUs.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-287bb503&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Slide.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-287bb503&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Slide.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-30cdb09e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_Slideshow.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-30cdb09e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_Slideshow.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-33015218!./../node_modules/sass-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-33015218!./../node_modules/sass-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3b7b10e8&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Intro.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3b7b10e8&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Intro.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4144f431&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4144f431&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-47d63a09&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-47d63a09&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Login.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c5f0a2a!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Track.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c5f0a2a!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Track.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(86);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5120c3f7&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyFooter.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5120c3f7&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyFooter.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5da6cb6a&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Subscribe.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5da6cb6a&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Subscribe.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-60640b22&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-60640b22&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-67d7e20d&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_propTabs_Box.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-67d7e20d&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_propTabs_Box.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-71898a4e!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Description.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-71898a4e!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Description.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-86ffac4e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_navbar_search.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-86ffac4e&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_navbar_search.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8718f044&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_navbar.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8718f044&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_navbar.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-88189242&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Timeline.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-88189242&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Timeline.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-91a79d22&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_nav_SearchResult.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-91a79d22&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app_nav_SearchResult.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-cbcf3674!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Discussion_Comment.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-cbcf3674!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Detail_Topic_Discussion_Comment.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f3276f62&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_HotProposal.vue", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f3276f62&scoped=true!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home_HotProposal.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 180 */
/***/ function(module, exports) {

exports.sync = function (store, router) {
  store.registerModule('route', {
    state: {},
    mutations: {
      'router/ROUTE_CHANGED': function (state, to) {
        store.state.route = Object.freeze({
          name: to.name,
          path: to.path,
          hash: to.hash,
          query: to.query,
          params: to.params,
          fullPath: to.fullPath
        })
      }
    }
  })

  var isTimeTraveling = false
  var currentPath

  // sync router on store change
  store.watch(
    function (state) { return state.route },
    function (route) {
      if (route.fullPath === currentPath) {
        return
      }
      isTimeTraveling = true
      currentPath = route.fullPath
      router.push(route)
    },
    { sync: true }
  )

  // sync store on router navigation
  router.afterEach(function (to) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit('router/ROUTE_CHANGED', to)
  })
}


/***/ },
/* 181 */,
/* 182 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(22);
__webpack_require__(7).polyfill();


// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
// store.replaceState(window.__INITIAL_STATE__)
// actually mount to DOM
__WEBPACK_IMPORTED_MODULE_0__app__["a" /* app */].$mount('#app');

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map