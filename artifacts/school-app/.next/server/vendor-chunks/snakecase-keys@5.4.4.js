"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/snakecase-keys@5.4.4";
exports.ids = ["vendor-chunks/snakecase-keys@5.4.4"];
exports.modules = {

/***/ "(action-browser)/../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(action-browser)/../../node_modules/.pnpm/map-obj@4.3.0/node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(action-browser)/../../node_modules/.pnpm/snake-case@3.0.4/node_modules/snake-case/dist.es2015/index.js\")\n\nmodule.exports = function (obj, options) {\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc25ha2VjYXNlLWtleXNANS40LjQvbm9kZV9tb2R1bGVzL3NuYWtlY2FzZS1rZXlzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaLFlBQVksbUJBQU8sQ0FBQyxzR0FBUztBQUM3QixRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLDJIQUFZOztBQUUxQztBQUNBLDRCQUE0Qiw2Q0FBNkM7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2Uvc2Nob29sLWFwcC8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc25ha2VjYXNlLWtleXNANS40LjQvbm9kZV9tb2R1bGVzL3NuYWtlY2FzZS1rZXlzL2luZGV4LmpzPzk5ODMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG1hcCA9IHJlcXVpcmUoJ21hcC1vYmonKVxuY29uc3QgeyBzbmFrZUNhc2UgfSA9IHJlcXVpcmUoJ3NuYWtlLWNhc2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBkZWVwOiB0cnVlLCBleGNsdWRlOiBbXSwgcGFyc2luZ09wdGlvbnM6IHt9IH0sIG9wdGlvbnMpXG5cbiAgcmV0dXJuIG1hcChvYmosIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIHJldHVybiBbXG4gICAgICBtYXRjaGVzKG9wdGlvbnMuZXhjbHVkZSwga2V5KSA/IGtleSA6IHNuYWtlQ2FzZShrZXksIG9wdGlvbnMucGFyc2luZ09wdGlvbnMpLFxuICAgICAgdmFsXG4gICAgXVxuICB9LCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChwYXR0ZXJucywgdmFsdWUpIHtcbiAgcmV0dXJuIHBhdHRlcm5zLnNvbWUoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnXG4gICAgICA/IHBhdHRlcm4gPT09IHZhbHVlXG4gICAgICA6IHBhdHRlcm4udGVzdCh2YWx1ZSlcbiAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(action-browser)/../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(rsc)/../../node_modules/.pnpm/map-obj@4.3.0/node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(rsc)/../../node_modules/.pnpm/snake-case@3.0.4/node_modules/snake-case/dist.es2015/index.js\")\n\nmodule.exports = function (obj, options) {\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3NuYWtlY2FzZS1rZXlzQDUuNC40L25vZGVfbW9kdWxlcy9zbmFrZWNhc2Uta2V5cy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWixZQUFZLG1CQUFPLENBQUMsMkZBQVM7QUFDN0IsUUFBUSxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxnSEFBWTs7QUFFMUM7QUFDQSw0QkFBNEIsNkNBQTZDOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ad29ya3NwYWNlL3NjaG9vbC1hcHAvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3NuYWtlY2FzZS1rZXlzQDUuNC40L25vZGVfbW9kdWxlcy9zbmFrZWNhc2Uta2V5cy9pbmRleC5qcz8xMTE1Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtYXAgPSByZXF1aXJlKCdtYXAtb2JqJylcbmNvbnN0IHsgc25ha2VDYXNlIH0gPSByZXF1aXJlKCdzbmFrZS1jYXNlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgZGVlcDogdHJ1ZSwgZXhjbHVkZTogW10sIHBhcnNpbmdPcHRpb25zOiB7fSB9LCBvcHRpb25zKVxuXG4gIHJldHVybiBtYXAob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbWF0Y2hlcyhvcHRpb25zLmV4Y2x1ZGUsIGtleSkgPyBrZXkgOiBzbmFrZUNhc2Uoa2V5LCBvcHRpb25zLnBhcnNpbmdPcHRpb25zKSxcbiAgICAgIHZhbFxuICAgIF1cbiAgfSwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybnMsIHZhbHVlKSB7XG4gIHJldHVybiBwYXR0ZXJucy5zb21lKGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJ1xuICAgICAgPyBwYXR0ZXJuID09PSB2YWx1ZVxuICAgICAgOiBwYXR0ZXJuLnRlc3QodmFsdWUpXG4gIH0pXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/snakecase-keys@5.4.4/node_modules/snakecase-keys/index.js\n");

/***/ })

};
;