// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;
// Dans Home.js
var Home = exports.Home = function Home() {
  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  console.log('Page List', argument);
};
},{}],"js/key.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var API_KEY = 'c295fe71a6e64b00bedf972b5b62a854';
var _default = exports.default = API_KEY;
},{}],"js/PageList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageList = void 0;
var _key = _interopRequireDefault(require("./key.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var PageList = exports.PageList = function PageList() {
  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var preparePage = function preparePage() {
    var cleanedArgument = argument.trim().replace(/\s+/g, '-');
    var displayResults = function displayResults(articles) {
      var resultsContent = articles.map(function (article) {
        return "<article class=\"cardGame\">\n            <h1>".concat(article.name, "</h1>\n            <h2>").concat(article.released, "</h2>\n            <img src=\"").concat(article.background_image, "\" alt=\"").concat(article.name, "\" class=\"game-image\">\n            <a href=\"#pagedetail/").concat(article.id, "\">").concat(article.id, "</a>\n          </article>");
      });
      var resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };
    var fetchList = function fetchList(url, argument) {
      var finalURL = argument ? "".concat(url, "&search=").concat(argument) : url;
      fetch(finalURL).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        displayResults(responseData.results);
      });
    };
    fetchList("https://api.rawg.io/api/games?key=".concat(_key.default), cleanedArgument);
  };
  var render = function render() {
    pageContent.innerHTML = "\n        <section class=\"page-list\">\n          <div class=\"articles\">Loading...</div>\n        </section>\n      ";
    preparePage();
  };
  render();
};
},{"./key.js":"js/key.js"}],"js/PageDetail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageDetail = void 0;
var _key = _interopRequireDefault(require("./key.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var PageDetail = exports.PageDetail = function PageDetail(argument) {
  var preparePage = function preparePage() {
    var cleanedArgument = argument.trim().replace(/\s+/g, "-");
    var displayGame = function displayGame(gameData) {
      var name = gameData.name,
        released = gameData.released,
        description = gameData.description;
      var articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.innerHTML += "<a href=\"#pagelist\" class=\"back-button\">Back to List</a>";
    };
    var fetchGame = function fetchGame(url, argument) {
      fetch("".concat(url, "/").concat(argument, "?key=").concat(_key.default)).then(function (response) {
        return response.json();
      }).then(function (responseData) {
        displayGame(responseData);
      });
    };
    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };
  var render = function render() {
    pageContent.innerHTML = "\n        <section class=\"page-detail\">\n          <div class=\"article\">\n            <h1 class=\"title\"></h1>\n            <p class=\"release-date\">Release date : <span></span></p>\n            <p class=\"description\"></p>\n          </div>\n        </section>\n      ";
    preparePage();
  };
  render();
};
},{"./key.js":"js/key.js"}],"js/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;
var _Home = require("./Home.js");
var _PageList = require("./PageList.js");
var _PageDetail = require("./PageDetail.js");
// Importez les modules de vos pages

// Définissez un objet routes qui associe les routes aux modules de vos pages
var routes = exports.routes = {
  '': _Home.Home,
  // Route pour la page d'accueil (Home)
  'pagelist': _PageList.PageList,
  // Route pour la liste des pages (PageList)
  'pagedetail': _PageDetail.PageDetail // Route pour les détails des pages (PageDetail)
  // Ajoutez d'autres routes au besoin
};

// Exportez l'objet routes pour le rendre accessible depuis d'autres fichiers
},{"./Home.js":"js/Home.js","./PageList.js":"js/PageList.js","./PageDetail.js":"js/PageDetail.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callRoute = void 0;
var _routes = require("./routes.js");
var callRoute = exports.callRoute = function callRoute() {
  var hash = window.location.hash;
  var pathParts = hash.substring(1).split('/');
  var pageName = pathParts[0];
  var pageArgument = pathParts[1] || '';
  var pageFunction = _routes.routes[pageName];
  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};
window.addEventListener('hashchange', function () {
  return callRoute();
});
window.addEventListener('DOMContentLoaded', function () {
  return callRoute();
});
},{"./routes.js":"js/routes.js"}],"../../../../../../.nvm/versions/node/v20.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46223" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../../.nvm/versions/node/v20.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map