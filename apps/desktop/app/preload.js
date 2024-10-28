(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./main/preload.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: url => electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(url)
});
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', {
  openExternal: url => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send('open-external', url)
});
const handler = {
  send(channel, value) {
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, value);
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, subscription);
    return () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, subscription);
    };
  }
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, data);
    }
  },
  sendNotification: (title, body) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send('show-notification', {
    title,
    body
  }),
  saveFile: content => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('save-file', content)
});
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('ipc', handler);

// contextBridge.exposeInMainWorld('electron', {
//   saveFile: (content) => ipcRenderer.invoke('save-file', content),
// });
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7QUNOOEU7QUFFOUVBLG1EQUFhLENBQUNHLGlCQUFpQixDQUFDLGFBQWEsRUFBRTtFQUM3Q0MsWUFBWSxFQUFHQyxHQUFXLElBQUtILDJDQUFLLENBQUNFLFlBQVksQ0FBQ0MsR0FBRztBQUN2RCxDQUFDLENBQUM7QUFFRkwsbURBQWEsQ0FBQ0csaUJBQWlCLENBQUMsVUFBVSxFQUFFO0VBQzFDQyxZQUFZLEVBQUdDLEdBQUcsSUFBS0osaURBQVcsQ0FBQ0ssSUFBSSxDQUFDLGVBQWUsRUFBRUQsR0FBRztBQUM5RCxDQUFDLENBQUM7QUFHRixNQUFNRSxPQUFPLEdBQUc7RUFDZEQsSUFBSUEsQ0FBQ0UsT0FBZSxFQUFFQyxLQUFjLEVBQUU7SUFDcENSLGlEQUFXLENBQUNLLElBQUksQ0FBQ0UsT0FBTyxFQUFFQyxLQUFLLENBQUM7RUFDbEMsQ0FBQztFQUNEQyxFQUFFQSxDQUFDRixPQUFlLEVBQUVHLFFBQXNDLEVBQUU7SUFDMUQsTUFBTUMsWUFBWSxHQUFHQSxDQUFDQyxNQUF3QixFQUFFLEdBQUdDLElBQWUsS0FDaEVILFFBQVEsQ0FBQyxHQUFHRyxJQUFJLENBQUM7SUFDbkJiLGlEQUFXLENBQUNTLEVBQUUsQ0FBQ0YsT0FBTyxFQUFFSSxZQUFZLENBQUM7SUFFckMsT0FBTyxNQUFNO01BQ1hYLGlEQUFXLENBQUNjLGNBQWMsQ0FBQ1AsT0FBTyxFQUFFSSxZQUFZLENBQUM7SUFDbkQsQ0FBQztFQUNIO0FBQ0YsQ0FBQztBQUVEWixtREFBYSxDQUFDRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7RUFDMUNGLFdBQVcsRUFBRTtJQUNYSyxJQUFJLEVBQUVBLENBQUNFLE9BQU8sRUFBRVEsSUFBSSxLQUFLO01BQ3ZCZixpREFBVyxDQUFDSyxJQUFJLENBQUNFLE9BQU8sRUFBRVEsSUFBSSxDQUFDO0lBQ2pDO0VBQ0YsQ0FBQztFQUNEQyxnQkFBZ0IsRUFBRUEsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUtsQixpREFBVyxDQUFDSyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7SUFBRVksS0FBSztJQUFFQztFQUFLLENBQUMsQ0FBQztFQUN6RkMsUUFBUSxFQUFHQyxPQUFlLElBQUtwQixpREFBVyxDQUFDcUIsTUFBTSxDQUFDLFdBQVcsRUFBRUQsT0FBTztBQUN4RSxDQUFDLENBQUM7QUFHRnJCLG1EQUFhLENBQUNHLGlCQUFpQixDQUFDLEtBQUssRUFBRUksT0FBTyxDQUFDOztBQUUvQztBQUNBO0FBQ0EsTSIsInNvdXJjZXMiOlsid2VicGFjazovL1N5Z2FyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeWdhci9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9TeWdhci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TeWdhci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9TeWdhci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vU3lnYXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TeWdhci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1N5Z2FyLy4vbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQsIHNoZWxsIH0gZnJvbSAnZWxlY3Ryb24nXG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uQVBJJywge1xuICBvcGVuRXh0ZXJuYWw6ICh1cmw6IHN0cmluZykgPT4gc2hlbGwub3BlbkV4dGVybmFsKHVybCksXG59KTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCB7XG4gIG9wZW5FeHRlcm5hbDogKHVybCkgPT4gaXBjUmVuZGVyZXIuc2VuZCgnb3Blbi1leHRlcm5hbCcsIHVybCksXG59KTtcblxuXG5jb25zdCBoYW5kbGVyID0ge1xuICBzZW5kKGNoYW5uZWw6IHN0cmluZywgdmFsdWU6IHVua25vd24pIHtcbiAgICBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIHZhbHVlKVxuICB9LFxuICBvbihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkKSB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gKF9ldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PlxuICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCBzdWJzY3JpcHRpb24pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgc3Vic2NyaXB0aW9uKVxuICAgIH1cbiAgfSxcbn1cblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCB7XG4gIGlwY1JlbmRlcmVyOiB7XG4gICAgc2VuZDogKGNoYW5uZWwsIGRhdGEpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgZGF0YSk7XG4gICAgfVxuICB9LFxuICBzZW5kTm90aWZpY2F0aW9uOiAodGl0bGUsIGJvZHkpID0+IGlwY1JlbmRlcmVyLnNlbmQoJ3Nob3ctbm90aWZpY2F0aW9uJywgeyB0aXRsZSwgYm9keSB9KSxcbiAgc2F2ZUZpbGU6IChjb250ZW50OiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnc2F2ZS1maWxlJywgY29udGVudCksXG59KTtcblxuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdpcGMnLCBoYW5kbGVyKTtcblxuLy8gY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCB7XG4vLyAgIHNhdmVGaWxlOiAoY29udGVudCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdzYXZlLWZpbGUnLCBjb250ZW50KSxcbi8vIH0pO1xuXG5leHBvcnQgdHlwZSBJcGNIYW5kbGVyID0gdHlwZW9mIGhhbmRsZXIiXSwibmFtZXMiOlsiY29udGV4dEJyaWRnZSIsImlwY1JlbmRlcmVyIiwic2hlbGwiLCJleHBvc2VJbk1haW5Xb3JsZCIsIm9wZW5FeHRlcm5hbCIsInVybCIsInNlbmQiLCJoYW5kbGVyIiwiY2hhbm5lbCIsInZhbHVlIiwib24iLCJjYWxsYmFjayIsInN1YnNjcmlwdGlvbiIsIl9ldmVudCIsImFyZ3MiLCJyZW1vdmVMaXN0ZW5lciIsImRhdGEiLCJzZW5kTm90aWZpY2F0aW9uIiwidGl0bGUiLCJib2R5Iiwic2F2ZUZpbGUiLCJjb250ZW50IiwiaW52b2tlIl0sInNvdXJjZVJvb3QiOiIifQ==