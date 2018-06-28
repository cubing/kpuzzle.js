(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["kpuzzle"] = factory();
	else
		root["kpuzzle"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var kpuzzle_1 = __webpack_require__(1);
exports.KPuzzleDefinition = kpuzzle_1.KPuzzleDefinition;
exports.Combine = kpuzzle_1.Combine;
exports.Multiply = kpuzzle_1.Multiply;
exports.IdentityTransformation = kpuzzle_1.IdentityTransformation;
exports.Invert = kpuzzle_1.Invert;
exports.EquivalentTransformations = kpuzzle_1.EquivalentTransformations;
exports.EquivalentStates = kpuzzle_1.EquivalentStates;
exports.Transformation = kpuzzle_1.Transformation;
exports.KPuzzle = kpuzzle_1.default;
exports.SVG = kpuzzle_1.SVG;
var puzzle_definitions_1 = __webpack_require__(2);
exports.Puzzles = puzzle_definitions_1.Puzzles;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Properly handle freezing
var OrbitTransformation = /** @class */ (function () {
    function OrbitTransformation() {
    }
    return OrbitTransformation;
}());
exports.OrbitTransformation = OrbitTransformation;
// TODO: Use a list instead of an object for performance?
var Transformation = /** @class */ (function () {
    function Transformation() {
    }
    return Transformation;
}());
exports.Transformation = Transformation;
var OrbitDefinition = /** @class */ (function () {
    function OrbitDefinition() {
    }
    return OrbitDefinition;
}());
exports.OrbitDefinition = OrbitDefinition;
var KPuzzleDefinition = /** @class */ (function () {
    function KPuzzleDefinition() {
    }
    return KPuzzleDefinition;
}());
exports.KPuzzleDefinition = KPuzzleDefinition;
function Combine(def, t1, t2) {
    var newTrans = {};
    for (var orbitName in def.orbits) {
        var oDef = def.orbits[orbitName];
        var o1 = t1[orbitName];
        var o2 = t2[orbitName];
        var newPerm = new Array(oDef.numPieces);
        var newOri = new Array(oDef.numPieces);
        for (var idx = 0; idx < oDef.numPieces; idx++) {
            // We subtract 1 to translate from location to index.
            var prevIdx = o2.permutation[idx] - 1;
            newPerm[idx] = o1.permutation[prevIdx];
            var orientationChange = o2.orientation[idx];
            newOri[idx] = (o1.orientation[prevIdx] + orientationChange) % oDef.orientations;
        }
        newTrans[orbitName] = { permutation: newPerm, orientation: newOri };
    }
    return newTrans;
}
exports.Combine = Combine;
function Multiply(def, t, amount) {
    if (amount < 0) {
        return Multiply(def, Invert(def, t), -amount);
    }
    if (amount === 0) {
        return IdentityTransformation(def);
    }
    if (amount === 1) {
        return t;
    }
    var halfish = Multiply(def, t, Math.floor(amount / 2));
    var twiceHalfish = Combine(def, halfish, halfish);
    if (amount % 2 === 0) {
        return twiceHalfish;
    }
    else {
        return Combine(def, t, twiceHalfish);
    }
}
exports.Multiply = Multiply;
function IdentityTransformation(definition) {
    var transformation = {};
    for (var orbitName in definition.orbits) {
        var orbitDefinition = definition.orbits[orbitName];
        var newPermutation = new Array(orbitDefinition.numPieces);
        var newOrientation = new Array(orbitDefinition.numPieces);
        for (var i = 0; i < orbitDefinition.numPieces; i++) {
            newPermutation[i] = i;
            newOrientation[i] = 0;
        }
        var orbitTransformation = { permutation: newPermutation, orientation: newOrientation };
        transformation[orbitName] = orbitTransformation;
    }
    return transformation;
}
exports.IdentityTransformation = IdentityTransformation;
function Invert(def, t) {
    var newTrans = {};
    for (var orbitName in def.orbits) {
        var oDef = def.orbits[orbitName];
        var o = t[orbitName];
        var newPerm = new Array(oDef.numPieces);
        var newOri = new Array(oDef.numPieces);
        for (var idx = 0; idx < oDef.numPieces; idx++) {
            var fromIdx = o.permutation[idx] - 1;
            newPerm[fromIdx] = idx + 1;
            newOri[fromIdx] = (oDef.orientations - o.orientation[idx]) % oDef.orientations;
        }
        newTrans[orbitName] = { permutation: newPerm, orientation: newOri };
    }
    return newTrans;
}
exports.Invert = Invert;
function EquivalentTransformations(def, t1, t2) {
    for (var orbitName in def.orbits) {
        var oDef = def.orbits[orbitName];
        var o1 = t1[orbitName];
        var o2 = t2[orbitName];
        for (var idx = 0; idx < oDef.numPieces; idx++) {
            if (o1.orientation[idx] !== o2.orientation[idx]) {
                return false;
            }
            if (o1.permutation[idx] !== o2.permutation[idx]) {
                return false;
            }
        }
    }
    return true;
}
exports.EquivalentTransformations = EquivalentTransformations;
function EquivalentStates(def, t1, t2) {
    // Turn transformations into states.
    // This accounts for indistinguishable pieces.
    return EquivalentTransformations(def, Combine(def, def.startPieces, t1), Combine(def, def.startPieces, t2));
}
exports.EquivalentStates = EquivalentStates;
var KPuzzle = /** @class */ (function () {
    function KPuzzle(definition) {
        this.definition = definition;
        this.state = IdentityTransformation(definition);
    }
    KPuzzle.prototype.serialize = function () {
        var output = "";
        for (var orbitName in this.definition.orbits) {
            output += orbitName + "\n";
            output += this.state[orbitName].permutation.join(" ") + "\n";
            output += this.state[orbitName].orientation.join(" ") + "\n";
        }
        output = output.slice(0, output.length - 1); // Trim last newline.
        return output;
    };
    KPuzzle.prototype.applyBlockMove = function (blockMove) {
        var move = this.definition.moves[blockMove.base];
        if (!move) {
            throw "Unknown move: " + blockMove.base;
        }
        var multiple = Multiply(this.definition, move, blockMove.amount);
        this.state = Combine(this.definition, this.state, multiple);
    };
    KPuzzle.prototype.applyMove = function (moveName) {
        var move = this.definition.moves[moveName];
        if (!move) {
            throw "Unknown move: " + moveName;
        }
        this.state = Combine(this.definition, this.state, move);
        return this;
    };
    return KPuzzle;
}());
exports.default = KPuzzle;
var xmlns = "http://www.w3.org/2000/svg";
// Unique ID mechanism to keep SVG gradient element IDs unique. TODO: Is there
// something more performant, and that can't be broken by other elements of the
// page? (And also doesn't break if this library is run in parallel.)
var svgCounter = 0;
function nextSVGID() {
    svgCounter += 1;
    return "svg" + svgCounter.toString();
}
var SVG = /** @class */ (function () {
    function SVG(kPuzzleDefinition) {
        this.kPuzzleDefinition = kPuzzleDefinition;
        this.originalColors = {};
        this.gradients = {};
        if (!kPuzzleDefinition.svg) {
            throw "No SVG definition for puzzle type: " + kPuzzleDefinition.name;
        }
        this.svgID = nextSVGID();
        this.element = document.createElement("div");
        this.element.classList.add("svg-wrapper");
        // TODO: Sanitization.
        this.element.innerHTML = kPuzzleDefinition.svg;
        document.body.appendChild(this.element);
        var svgElem = this.element.querySelector("svg");
        if (!svgElem) {
            throw "Could not get SVG element";
        }
        if (xmlns !== svgElem.namespaceURI) {
            throw "Unexpected XML namespace";
        }
        this.gradientDefs = document.createElementNS(xmlns, "defs");
        svgElem.insertBefore(this.gradientDefs, svgElem.firstChild);
        for (var orbitName in kPuzzleDefinition.orbits) {
            var orbitDefinition = kPuzzleDefinition.orbits[orbitName];
            for (var idx = 0; idx < orbitDefinition.numPieces; idx++) {
                for (var orientation = 0; orientation < orbitDefinition.orientations; orientation++) {
                    var id = this.elementID(orbitName, idx, orientation);
                    var elem = this.elementByID(id);
                    var originalColor = elem.style.fill;
                    this.originalColors[id] = originalColor;
                    this.gradients[id] = this.newGradient(id, originalColor);
                    this.gradientDefs.appendChild(this.gradients[id]);
                    elem.setAttribute("style", "fill: url(#grad-" + this.svgID + "-" + id + ")");
                }
            }
        }
    }
    SVG.prototype.newGradient = function (id, originalColor) {
        var grad = document.createElementNS(xmlns, "radialGradient");
        grad.setAttribute("id", "grad-" + this.svgID + "-" + id);
        grad.setAttribute("r", "70.7107%"); // TODO: Adapt to puzzle.
        var stopDefs = [
            { offset: 0, color: originalColor },
            { offset: 0, color: originalColor },
            { offset: 0, color: "black" },
            { offset: 0, color: "black" },
            { offset: 0, color: originalColor },
            { offset: 100, color: originalColor }
        ];
        for (var _i = 0, stopDefs_1 = stopDefs; _i < stopDefs_1.length; _i++) {
            var stopDef = stopDefs_1[_i];
            var stop = document.createElementNS(xmlns, "stop");
            stop.setAttribute("offset", stopDef.offset + "%");
            stop.setAttribute("stop-color", stopDef.color);
            stop.setAttribute("stop-opacity", "1");
            grad.appendChild(stop);
        }
        return grad;
    };
    SVG.prototype.elementID = function (orbitName, idx, orientation) {
        return orbitName + "-l" + idx + "-o" + orientation;
    };
    SVG.prototype.elementByID = function (id) {
        // TODO: Use classes and scope selector to SVG element.
        return this.element.querySelector("#" + id);
    };
    SVG.prototype.draw = function (definition, state, nextState, fraction) {
        for (var orbitName in definition.orbits) {
            var orbitDefinition = definition.orbits[orbitName];
            var curOrbitState = state[orbitName];
            var nextOrbitState = nextState ? nextState[orbitName] : null;
            for (var idx = 0; idx < orbitDefinition.numPieces; idx++) {
                for (var orientation = 0; orientation < orbitDefinition.orientations; orientation++) {
                    var id = this.elementID(orbitName, idx, orientation);
                    var fromCur = this.elementID(orbitName, curOrbitState.permutation[idx] - 1, (orbitDefinition.orientations - curOrbitState.orientation[idx] + orientation) % orbitDefinition.orientations);
                    var singleColor = false;
                    if (nextOrbitState) {
                        var fromNext = this.elementID(orbitName, nextOrbitState.permutation[idx] - 1, (orbitDefinition.orientations - nextOrbitState.orientation[idx] + orientation) % orbitDefinition.orientations);
                        if (fromCur === fromNext) {
                            singleColor = true; // TODO: Avoid redundant work during move.
                        }
                        fraction = fraction || 0; // TODO Use the type system to tie this to nextState?
                        var easedBackwardsPercent = 100 * (1 - fraction * fraction * (2 - fraction * fraction)); // TODO: Move easing up the stack.
                        this.gradients[id].children[0].setAttribute("stop-color", this.originalColors[fromCur]);
                        this.gradients[id].children[1].setAttribute("stop-color", this.originalColors[fromCur]);
                        this.gradients[id].children[1].setAttribute("offset", Math.max(easedBackwardsPercent - 5, 0) + "%");
                        this.gradients[id].children[2].setAttribute("offset", Math.max(easedBackwardsPercent - 5, 0) + "%");
                        this.gradients[id].children[3].setAttribute("offset", easedBackwardsPercent + "%");
                        this.gradients[id].children[4].setAttribute("offset", easedBackwardsPercent + "%");
                        this.gradients[id].children[4].setAttribute("stop-color", this.originalColors[fromNext]);
                        this.gradients[id].children[5].setAttribute("stop-color", this.originalColors[fromNext]);
                    }
                    else {
                        singleColor = true; // TODO: Avoid redundant work during move.
                    }
                    if (singleColor) {
                        this.gradients[id].children[0].setAttribute("stop-color", this.originalColors[fromCur]);
                        this.gradients[id].children[1].setAttribute("stop-color", this.originalColors[fromCur]);
                        this.gradients[id].children[1].setAttribute("offset", "100%");
                        this.gradients[id].children[2].setAttribute("offset", "100%");
                        this.gradients[id].children[3].setAttribute("offset", "100%");
                        this.gradients[id].children[4].setAttribute("offset", "100%");
                    }
                    // this.gradients[id]
                    // this.elementByID(id).style.fill = this.originalColors[from];
                }
            }
        }
    };
    return SVG;
}());
exports.SVG = SVG;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Puzzles = {
    "222": {
        name: "222",
        orbits: { "CORNERS": { numPieces: 7, orientations: 3 } },
        startPieces: { "CORNERS": { permutation: [1, 2, 3, 4, 5, 6, 7], orientation: [0, 0, 0, 0, 0, 0, 0] } },
        moves: {
            "U": { "CORNERS": { permutation: [4, 1, 2, 3, 5, 6, 7], orientation: [0, 0, 0, 0, 0, 0, 0] } },
            "R": { "CORNERS": { permutation: [1, 3, 6, 4, 2, 5, 7], orientation: [0, 2, 1, 0, 1, 2, 0] } },
            "F": { "CORNERS": { permutation: [1, 2, 4, 7, 5, 3, 6], orientation: [0, 0, 0, 0, 0, 0, 0] } }
        },
        svg: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\"\n       \"http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 490 370\" preserveAspectRatio=\"xMidYMid meet\">\n  <defs>\n  </defs>\n  <title>222</title>\n  <defs>\n    <g id=\"sticker\">\n        <rect x=\"0\" y=\"0\" width=\"1\" height=\"1\" stroke=\"black\" stroke-width=\"0.04px\" />\n    </g>\n  </defs>\n  <g id=\"puzzle\" transform=\"translate(5, 5) scale(60)\">\n    <use id=\"CORNERS-l0-o0\" xlink:href=\"#sticker\" transform=\"translate(2, 0)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l0-o1\" xlink:href=\"#sticker\" transform=\"translate(7, 2)\" style=\"fill: blue\"/>\n    <use id=\"CORNERS-l0-o2\" xlink:href=\"#sticker\" transform=\"translate(0, 2)\" style=\"fill: orange\"/>\n\n    <use id=\"CORNERS-l1-o0\" xlink:href=\"#sticker\" transform=\"translate(3, 0)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l1-o1\" xlink:href=\"#sticker\" transform=\"translate(5, 2)\" style=\"fill: red\"/>\n    <use id=\"CORNERS-l1-o2\" xlink:href=\"#sticker\" transform=\"translate(6, 2)\" style=\"fill: blue\"/>\n\n    <use id=\"CORNERS-l2-o0\" xlink:href=\"#sticker\" transform=\"translate(3, 1)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l2-o1\" xlink:href=\"#sticker\" transform=\"translate(3, 2)\" style=\"fill: green\"/>\n    <use id=\"CORNERS-l2-o2\" xlink:href=\"#sticker\" transform=\"translate(4, 2)\" style=\"fill: red\"/>\n\n    <use id=\"CORNERS-l3-o0\" xlink:href=\"#sticker\" transform=\"translate(2, 1)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l3-o1\" xlink:href=\"#sticker\" transform=\"translate(1, 2)\" style=\"fill: orange\"/>\n    <use id=\"CORNERS-l3-o2\" xlink:href=\"#sticker\" transform=\"translate(2, 2)\" style=\"fill: green\"/>\n\n    <use id=\"CORNERS-l4-o0\" xlink:href=\"#sticker\" transform=\"translate(3, 5)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l4-o1\" xlink:href=\"#sticker\" transform=\"translate(6, 3)\" style=\"fill: blue\"/>\n    <use id=\"CORNERS-l4-o2\" xlink:href=\"#sticker\" transform=\"translate(5, 3)\" style=\"fill: red\"/>\n\n    <use id=\"CORNERS-l5-o0\" xlink:href=\"#sticker\" transform=\"translate(3, 4)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l5-o1\" xlink:href=\"#sticker\" transform=\"translate(4, 3)\" style=\"fill: red\"/>\n    <use id=\"CORNERS-l5-o2\" xlink:href=\"#sticker\" transform=\"translate(3, 3)\" style=\"fill: green\"/>\n\n    <use id=\"CORNERS-l6-o0\" xlink:href=\"#sticker\" transform=\"translate(2, 4)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l6-o1\" xlink:href=\"#sticker\" transform=\"translate(2, 3)\" style=\"fill: green\"/>\n    <use id=\"CORNERS-l6-o2\" xlink:href=\"#sticker\" transform=\"translate(1, 3)\" style=\"fill: orange\"/>\n\n    <use                    xlink:href=\"#sticker\" transform=\"translate(2, 5)\" style=\"fill: yellow\"/>\n    <use                    xlink:href=\"#sticker\" transform=\"translate(0, 3)\" style=\"fill: orange\"/>\n    <use                    xlink:href=\"#sticker\" transform=\"translate(7, 3)\" style=\"fill: blue\"/>\n  </g>\n\n</svg>"
    },
    "333": {
        name: "333",
        orbits: {
            "CORNERS": { numPieces: 8, orientations: 3 },
            "EDGES": { numPieces: 12, orientations: 2 }
        },
        startPieces: {
            "CORNERS": { permutation: [1, 2, 3, 4, 5, 6, 7, 8], orientation: [0, 0, 0, 0, 0, 0, 0, 0] },
            "EDGES": { permutation: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        },
        moves: {
            "U": { "CORNERS": { permutation: [4, 1, 2, 3, 5, 6, 7, 8], orientation: [0, 0, 0, 0, 0, 0, 0, 0] },
                "EDGES": { permutation: [4, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
            "R": { "CORNERS": { permutation: [5, 2, 3, 1, 8, 6, 7, 4], orientation: [1, 0, 0, 2, 2, 0, 0, 1] },
                "EDGES": { permutation: [1, 2, 3, 5, 12, 6, 7, 4, 9, 10, 11, 8], orientation: [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1] } },
            "F": { "CORNERS": { permutation: [2, 6, 3, 4, 1, 5, 7, 8], orientation: [2, 1, 0, 0, 1, 2, 0, 0] },
                "EDGES": { permutation: [6, 2, 3, 4, 1, 9, 7, 8, 5, 10, 11, 12], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
            "D": { "CORNERS": { permutation: [1, 2, 3, 4, 6, 7, 8, 5], orientation: [0, 0, 0, 0, 0, 0, 0, 0] },
                "EDGES": { permutation: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 9], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
            "L": { "CORNERS": { permutation: [1, 3, 7, 4, 5, 2, 6, 8], orientation: [0, 2, 1, 0, 0, 1, 2, 0] },
                "EDGES": { permutation: [1, 7, 3, 4, 5, 2, 10, 8, 9, 6, 11, 12], orientation: [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0] } },
            "B": { "CORNERS": { permutation: [1, 2, 4, 8, 5, 6, 3, 7], orientation: [0, 0, 2, 1, 0, 0, 1, 2] },
                "EDGES": { permutation: [1, 2, 8, 4, 5, 6, 3, 11, 9, 10, 7, 12], orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } }
        },
        svg: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\"\n       \"http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 490 370\" preserveAspectRatio=\"xMidYMid meet\">\n  <defs>\n  </defs>\n  <title>333</title>\n  <defs>\n    <g id=\"sticker\">\n        <rect x=\"0\" y=\"0\" width=\"1\" height=\"1\" stroke=\"black\" stroke-width=\"0.04px\" />\n    </g>\n  </defs>\n\n<!--        0 1 2 3 4 5 6 7 8 9 10 11  -->\n<!--        | | | | | | | | | | | |<-  -->\n<!--    0 -       . . .                -->\n<!--    1 -       . . .                -->\n<!--    2 -       . . .                -->\n<!--    3 - . . . . . . . . . . . .    -->\n<!--    4 - . . . . . . . . . . . .    -->\n<!--    5 - . . . . . . . . . . . .    -->\n<!--    6 -       . . .                -->\n<!--    7 -       . . .                -->\n<!--    8 -       . . .                -->\n\n  <g id=\"puzzle\" transform=\"translate(5, 5) scale(40)\">\n    <!-- CORNERS -->\n    <use id=\"CORNERS-l0-o0\" xlink:href=\"#sticker\" transform=\"translate(5,  2)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l0-o1\" xlink:href=\"#sticker\" transform=\"translate(5,  3)\" style=\"fill: green\"/>\n    <use id=\"CORNERS-l0-o2\" xlink:href=\"#sticker\" transform=\"translate(6,  3)\" style=\"fill: red\"/>\n\n    <use id=\"CORNERS-l1-o0\" xlink:href=\"#sticker\" transform=\"translate(3,  2)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l1-o1\" xlink:href=\"#sticker\" transform=\"translate(2,  3)\" style=\"fill: orange\"/>\n    <use id=\"CORNERS-l1-o2\" xlink:href=\"#sticker\" transform=\"translate(3,  3)\" style=\"fill: green\"/>\n\n    <use id=\"CORNERS-l2-o0\" xlink:href=\"#sticker\" transform=\"translate(3,  0)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l2-o1\" xlink:href=\"#sticker\" transform=\"translate(11, 3)\" style=\"fill: blue\"/>\n    <use id=\"CORNERS-l2-o2\" xlink:href=\"#sticker\" transform=\"translate(0,  3)\" style=\"fill: orange\"/>\n\n    <use id=\"CORNERS-l3-o0\" xlink:href=\"#sticker\" transform=\"translate(5,  0)\" style=\"fill: white\"/>\n    <use id=\"CORNERS-l3-o1\" xlink:href=\"#sticker\" transform=\"translate(8,  3)\" style=\"fill: red\"/>\n    <use id=\"CORNERS-l3-o2\" xlink:href=\"#sticker\" transform=\"translate(9,  3)\" style=\"fill: blue\"/>\n\n    <use id=\"CORNERS-l4-o0\" xlink:href=\"#sticker\" transform=\"translate(5,  6)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l4-o1\" xlink:href=\"#sticker\" transform=\"translate(6,  5)\" style=\"fill: red\"/>\n    <use id=\"CORNERS-l4-o2\" xlink:href=\"#sticker\" transform=\"translate(5,  5)\" style=\"fill: green\"/>\n\n    <use id=\"CORNERS-l5-o0\" xlink:href=\"#sticker\" transform=\"translate(3,  6)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l5-o1\" xlink:href=\"#sticker\" transform=\"translate(3,  5)\" style=\"fill: green\"/>\n    <use id=\"CORNERS-l5-o2\" xlink:href=\"#sticker\" transform=\"translate(2,  5)\" style=\"fill: orange\"/>\n\n    <use id=\"CORNERS-l6-o0\" xlink:href=\"#sticker\" transform=\"translate(3,  8)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l6-o1\" xlink:href=\"#sticker\" transform=\"translate(0,  5)\" style=\"fill: orange\"/>\n    <use id=\"CORNERS-l6-o2\" xlink:href=\"#sticker\" transform=\"translate(11, 5)\" style=\"fill: blue\"/>\n\n    <use id=\"CORNERS-l7-o0\" xlink:href=\"#sticker\" transform=\"translate(5,  8)\" style=\"fill: yellow\"/>\n    <use id=\"CORNERS-l7-o1\" xlink:href=\"#sticker\" transform=\"translate(9,  5)\" style=\"fill: blue\"/>\n    <use id=\"CORNERS-l7-o2\" xlink:href=\"#sticker\" transform=\"translate(8,  5)\" style=\"fill: red\"/>\n\n    <!-- EDGES -->\n    <use id=\"EDGES-l0-o0\"  xlink:href=\"#sticker\" transform=\"translate(4,  2)\" style=\"fill: white\"/>\n    <use id=\"EDGES-l0-o1\"  xlink:href=\"#sticker\" transform=\"translate(4,  3)\" style=\"fill: green\"/>\n\n    <use id=\"EDGES-l1-o0\"  xlink:href=\"#sticker\" transform=\"translate(3,  1)\" style=\"fill: white\"/>\n    <use id=\"EDGES-l1-o1\"  xlink:href=\"#sticker\" transform=\"translate(1,  3)\" style=\"fill: orange\"/>\n\n    <use id=\"EDGES-l2-o0\"  xlink:href=\"#sticker\" transform=\"translate(4,  0)\" style=\"fill: white\"/>\n    <use id=\"EDGES-l2-o1\"  xlink:href=\"#sticker\" transform=\"translate(10, 3)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l3-o0\"  xlink:href=\"#sticker\" transform=\"translate(5,  1)\" style=\"fill: white\"/>\n    <use id=\"EDGES-l3-o1\"  xlink:href=\"#sticker\" transform=\"translate(7,  3)\" style=\"fill: red\"/>\n\n    <use id=\"EDGES-l4-o0\"  xlink:href=\"#sticker\" transform=\"translate(6,  4)\" style=\"fill: red\"/>\n    <use id=\"EDGES-l4-o1\"  xlink:href=\"#sticker\" transform=\"translate(5,  4)\" style=\"fill: green\"/>\n\n    <use id=\"EDGES-l5-o0\"  xlink:href=\"#sticker\" transform=\"translate(2,  4)\" style=\"fill: orange\"/>\n    <use id=\"EDGES-l5-o1\"  xlink:href=\"#sticker\" transform=\"translate(3,  4)\" style=\"fill: green\"/>\n\n    <use id=\"EDGES-l6-o0\"  xlink:href=\"#sticker\" transform=\"translate(0,  4)\" style=\"fill: orange\"/>\n    <use id=\"EDGES-l6-o1\"  xlink:href=\"#sticker\" transform=\"translate(11, 4)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l7-o0\"  xlink:href=\"#sticker\" transform=\"translate(8,  4)\" style=\"fill: red\"/>\n    <use id=\"EDGES-l7-o1\"  xlink:href=\"#sticker\" transform=\"translate(9,  4)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l8-o0\"  xlink:href=\"#sticker\" transform=\"translate(4,  6)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l8-o1\"  xlink:href=\"#sticker\" transform=\"translate(4,  5)\" style=\"fill: green\"/>\n\n    <use id=\"EDGES-l9-o0\"  xlink:href=\"#sticker\" transform=\"translate(3,  7)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l9-o1\"  xlink:href=\"#sticker\" transform=\"translate(1,  5)\" style=\"fill: orange\"/>\n\n    <use id=\"EDGES-l10-o0\" xlink:href=\"#sticker\" transform=\"translate(4,  8)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l10-o1\" xlink:href=\"#sticker\" transform=\"translate(10, 5)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l11-o0\" xlink:href=\"#sticker\" transform=\"translate(5,  7)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l11-o1\" xlink:href=\"#sticker\" transform=\"translate(7,  5)\" style=\"fill: red\"/>\n\n    <!-- CENTERS -->\n    <use id=\"CENTERS-l0-o0\" xlink:href=\"#sticker\" transform=\"translate(4,  1)\" style=\"fill: white\"/>\n    <use id=\"CENTERS-l1-o0\" xlink:href=\"#sticker\" transform=\"translate(1,  4)\" style=\"fill: orange\"/>\n    <use id=\"CENTERS-l2-o0\" xlink:href=\"#sticker\" transform=\"translate(4,  4)\" style=\"fill: green\"/>\n    <use id=\"CENTERS-l3-o0\" xlink:href=\"#sticker\" transform=\"translate(7,  4)\" style=\"fill: red\"/>\n    <use id=\"CENTERS-l4-o0\" xlink:href=\"#sticker\" transform=\"translate(10, 4)\" style=\"fill: blue\"/>\n    <use id=\"CENTERS-l5-o0\" xlink:href=\"#sticker\" transform=\"translate(4,  7)\" style=\"fill: yellow\"/>\n  </g>\n\n</svg>"
    },
    "pyram": {
        name: "pyram",
        orbits: { "CENTERS": { numPieces: 4, orientations: 3 },
            "TIPS": { numPieces: 4, orientations: 3 },
            "EDGES": { numPieces: 6, orientations: 2 } },
        startPieces: { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
            "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
            "EDGES": { permutation: [1, 2, 3, 4, 5, 6], orientation: [0, 0, 0, 0, 0, 0] } },
        moves: {
            "U": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [1, 0, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [1, 0, 0, 0] },
                "EDGES": { permutation: [2, 3, 1, 4, 5, 6], orientation: [1, 0, 1, 0, 0, 0] } },
            "L": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 1, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 1, 0, 0] },
                "EDGES": { permutation: [6, 2, 3, 1, 5, 4], orientation: [1, 0, 0, 0, 0, 1] } },
            "R": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 1, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 1, 0] },
                "EDGES": { permutation: [1, 4, 3, 5, 2, 6], orientation: [0, 0, 0, 1, 1, 0] } },
            "B": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 1] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 1] },
                "EDGES": { permutation: [1, 2, 5, 4, 6, 3], orientation: [0, 0, 0, 0, 1, 1] } },
            "u": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [1, 0, 0, 0] },
                "EDGES": { permutation: [1, 2, 3, 4, 5, 6], orientation: [0, 0, 0, 0, 0, 0] } },
            "l": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 1, 0, 0] },
                "EDGES": { permutation: [1, 2, 3, 4, 5, 6], orientation: [0, 0, 0, 0, 0, 0] } },
            "r": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 1, 0] },
                "EDGES": { permutation: [1, 2, 3, 4, 5, 6], orientation: [0, 0, 0, 0, 0, 0] } },
            "b": { "CENTERS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 0] },
                "TIPS": { permutation: [1, 2, 3, 4], orientation: [0, 0, 0, 1] },
                "EDGES": { permutation: [1, 2, 3, 4, 5, 6], orientation: [0, 0, 0, 0, 0, 0] } }
        },
        svg: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\"\n       \"http://www.w3.org/TR/2001/REC-SVG-20050904/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 490 420.69219392\" preserveAspectRatio=\"xMidYMid meet\">\n  <defs>\n  </defs>\n  <title>222</title>\n  <defs>\n    <g id=\"stickerA\" transform=\"scale(1, 0.577350269)\">\n      <path\n         d=\"m 0,1.732050808 1,-1.732050808 1,1.732050808 z\"\n         stroke=\"black\" stroke-width=\"0.04px\" stroke-linecap=\"butt\" stroke-linejoin=\"round\"\n      />\n    </g>\n    <g id=\"stickerV\" transform=\"scale(1, 0.577350269)\">\n      <path\n         d=\"m 0,0 1,1.732050808 1,-1.732050808 z\"\n         stroke=\"black\" stroke-width=\"0.04px\" stroke-linecap=\"butt\" stroke-linejoin=\"round\"\n      />\n    </g>\n  </defs>\n\n<!--        0 1 2 3 4 5 6 7 8 9 10   -->\n<!--        | | | | | | | | | | |    -->\n<!--    0 - L L L L L F R R R R R    -->\n<!--    1 -   L L L F F F R R R      -->\n<!--    2 -     L F F F F F R        -->\n<!--    3 -       D D D D D          -->\n<!--    4 -         D D D            -->\n<!--    5 -           D              -->\n\n  <g id=\"puzzle\" transform=\"translate(5, 5) scale(40, 69.28203232)\">\n    <!-- CENTERS -->\n    <use id=\"CENTERS-l0-o0\" xlink:href=\"#stickerV\" transform=\"translate(5, 1)\" style=\"fill: yellow\"/>\n    <use id=\"CENTERS-l0-o1\" xlink:href=\"#stickerA\" transform=\"translate(3, 0)\" style=\"fill: blue\"/>\n    <use id=\"CENTERS-l0-o2\" xlink:href=\"#stickerA\" transform=\"translate(7, 0)\" style=\"fill: red\"/>\n\n    <use id=\"CENTERS-l1-o0\" xlink:href=\"#stickerV\" transform=\"translate(4, 2)\" style=\"fill: yellow\"/>\n    <use id=\"CENTERS-l1-o1\" xlink:href=\"#stickerA\" transform=\"translate(4, 3)\" style=\"fill: green\"/>\n    <use id=\"CENTERS-l1-o2\" xlink:href=\"#stickerA\" transform=\"translate(2, 1)\" style=\"fill: blue\"/>\n\n    <use id=\"CENTERS-l2-o0\" xlink:href=\"#stickerV\" transform=\"translate(6, 2)\" style=\"fill: yellow\"/>\n    <use id=\"CENTERS-l2-o1\" xlink:href=\"#stickerA\" transform=\"translate(8, 1)\" style=\"fill: red\"/>\n    <use id=\"CENTERS-l2-o2\" xlink:href=\"#stickerA\" transform=\"translate(6, 3)\" style=\"fill: green\"/>\n\n    <use id=\"CENTERS-l3-o0\" xlink:href=\"#stickerA\" transform=\"translate(9, 0)\" style=\"fill: red\"/>\n    <use id=\"CENTERS-l3-o1\" xlink:href=\"#stickerA\" transform=\"translate(1, 0)\" style=\"fill: blue\"/>\n    <use id=\"CENTERS-l3-o2\" xlink:href=\"#stickerA\" transform=\"translate(5, 4)\" style=\"fill: green\"/>\n\n    <!-- TIPS -->\n    <use id=\"TIPS-l0-o0\" xlink:href=\"#stickerA\" transform=\"translate(5, 0)\" style=\"fill: yellow\"/>\n    <use id=\"TIPS-l0-o1\" xlink:href=\"#stickerV\" transform=\"translate(4, 0)\" style=\"fill: blue\"/>\n    <use id=\"TIPS-l0-o2\" xlink:href=\"#stickerV\" transform=\"translate(6, 0)\" style=\"fill: red\"/>\n\n    <use id=\"TIPS-l1-o0\" xlink:href=\"#stickerA\" transform=\"translate(3, 2)\" style=\"fill: yellow\"/>\n    <use id=\"TIPS-l1-o1\" xlink:href=\"#stickerV\" transform=\"translate(3, 3)\" style=\"fill: green\"/>\n    <use id=\"TIPS-l1-o2\" xlink:href=\"#stickerV\" transform=\"translate(2, 2)\" style=\"fill: blue\"/>\n\n    <use id=\"TIPS-l2-o0\" xlink:href=\"#stickerV\" transform=\"translate(8, 2)\" style=\"fill: red\"/>\n    <use id=\"TIPS-l2-o1\" xlink:href=\"#stickerV\" transform=\"translate(7, 3)\" style=\"fill: green\"/>\n    <use id=\"TIPS-l2-o2\" xlink:href=\"#stickerA\" transform=\"translate(7, 2)\" style=\"fill: yellow\"/>\n\n    <use id=\"TIPS-l3-o0\" xlink:href=\"#stickerV\" transform=\"translate(10,0)\" style=\"fill: red\"/>\n    <use id=\"TIPS-l3-o1\" xlink:href=\"#stickerV\" transform=\"translate(0, 0)\" style=\"fill: blue\"/>\n    <use id=\"TIPS-l3-o2\" xlink:href=\"#stickerV\" transform=\"translate(5, 5)\" style=\"fill: green\"/>\n\n    <!-- EDGES -->\n    <use id=\"EDGES-l0-o0\" xlink:href=\"#stickerA\" transform=\"translate(4, 1)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l0-o1\" xlink:href=\"#stickerV\" transform=\"translate(3, 1)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l1-o0\" xlink:href=\"#stickerA\" transform=\"translate(6, 1)\" style=\"fill: yellow\"/>\n    <use id=\"EDGES-l1-o1\" xlink:href=\"#stickerV\" transform=\"translate(7, 1)\" style=\"fill: red\"/>\n\n    <use id=\"EDGES-l2-o0\" xlink:href=\"#stickerV\" transform=\"translate(8, 0)\" style=\"fill: red\"/>\n    <use id=\"EDGES-l2-o1\" xlink:href=\"#stickerV\" transform=\"translate(2, 0)\" style=\"fill: blue\"/>\n\n    <use id=\"EDGES-l3-o0\" xlink:href=\"#stickerV\" transform=\"translate(5, 3)\" style=\"fill: green\"/>\n    <use id=\"EDGES-l3-o1\" xlink:href=\"#stickerA\" transform=\"translate(5, 2)\" style=\"fill: yellow\"/>\n\n    <use id=\"EDGES-l4-o0\" xlink:href=\"#stickerV\" transform=\"translate(6, 4)\" style=\"fill: green\"/>\n    <use id=\"EDGES-l4-o1\" xlink:href=\"#stickerV\" transform=\"translate(9, 1)\" style=\"fill: red\"/>\n\n    <use id=\"EDGES-l5-o0\" xlink:href=\"#stickerV\" transform=\"translate(4, 4)\" style=\"fill: green\"/>\n    <use id=\"EDGES-l5-o1\" xlink:href=\"#stickerV\" transform=\"translate(1, 1)\" style=\"fill: blue\"/>\n  </g>\n\n</svg>"
    }
};


/***/ })
/******/ ]);
});