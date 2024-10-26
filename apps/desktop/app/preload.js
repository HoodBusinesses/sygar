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

// Listen for the token sent from the main process
electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on('token', (event, data) => {
  const {
    eventName,
    eventData
  } = data;
  if (eventName === 'token') {
    // Save the token in localStorage
    localStorage.setItem('token', eventData);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly9kZXNrdG9wL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2Rlc2t0b3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGVza3RvcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9kZXNrdG9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kZXNrdG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZGVza3RvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Rlc2t0b3AvLi9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCwgc2hlbGwgfSBmcm9tICdlbGVjdHJvbidcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb25BUEknLCB7XG4gIG9wZW5FeHRlcm5hbDogKHVybDogc3RyaW5nKSA9PiBzaGVsbC5vcGVuRXh0ZXJuYWwodXJsKSxcbn0pO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIHtcbiAgb3BlbkV4dGVybmFsOiAodXJsKSA9PiBpcGNSZW5kZXJlci5zZW5kKCdvcGVuLWV4dGVybmFsJywgdXJsKSxcbn0pO1xuXG5cbi8vIExpc3RlbiBmb3IgdGhlIHRva2VuIHNlbnQgZnJvbSB0aGUgbWFpbiBwcm9jZXNzXG5pcGNSZW5kZXJlci5vbigndG9rZW4nLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBldmVudE5hbWUsIGV2ZW50RGF0YSB9ID0gZGF0YTtcbiAgaWYgKGV2ZW50TmFtZSA9PT0gJ3Rva2VuJykge1xuXG4gICAgLy8gU2F2ZSB0aGUgdG9rZW4gaW4gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgZXZlbnREYXRhKTtcbiAgfVxufSk7XG5cbmNvbnN0IGhhbmRsZXIgPSB7XG4gIHNlbmQoY2hhbm5lbDogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikge1xuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgdmFsdWUpXG4gIH0sXG4gIG9uKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6ICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQpIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSAoX2V2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+XG4gICAgICBjYWxsYmFjayguLi5hcmdzKVxuICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIHN1YnNjcmlwdGlvbilcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCBzdWJzY3JpcHRpb24pXG4gICAgfVxuICB9LFxufVxuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIHtcbiAgaXBjUmVuZGVyZXI6IHtcbiAgICBzZW5kOiAoY2hhbm5lbCwgZGF0YSkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCBkYXRhKTtcbiAgICB9XG4gIH0sXG4gIHNlbmROb3RpZmljYXRpb246ICh0aXRsZSwgYm9keSkgPT4gaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1ub3RpZmljYXRpb24nLCB7IHRpdGxlLCBib2R5IH0pLFxuICBzYXZlRmlsZTogKGNvbnRlbnQ6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdzYXZlLWZpbGUnLCBjb250ZW50KSxcbn0pO1xuXG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2lwYycsIGhhbmRsZXIpO1xuXG4vLyBjb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIHtcbi8vICAgc2F2ZUZpbGU6IChjb250ZW50KSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ3NhdmUtZmlsZScsIGNvbnRlbnQpLFxuLy8gfSk7XG5cbmV4cG9ydCB0eXBlIElwY0hhbmRsZXIgPSB0eXBlb2YgaGFuZGxlclxuIl0sIm5hbWVzIjpbImNvbnRleHRCcmlkZ2UiLCJpcGNSZW5kZXJlciIsInNoZWxsIiwiZXhwb3NlSW5NYWluV29ybGQiLCJvcGVuRXh0ZXJuYWwiLCJ1cmwiLCJzZW5kIiwib24iLCJldmVudCIsImRhdGEiLCJldmVudE5hbWUiLCJldmVudERhdGEiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaGFuZGxlciIsImNoYW5uZWwiLCJ2YWx1ZSIsImNhbGxiYWNrIiwic3Vic2NyaXB0aW9uIiwiX2V2ZW50IiwiYXJncyIsInJlbW92ZUxpc3RlbmVyIiwic2VuZE5vdGlmaWNhdGlvbiIsInRpdGxlIiwiYm9keSIsInNhdmVGaWxlIiwiY29udGVudCIsImludm9rZSJdLCJzb3VyY2VSb290IjoiIn0=