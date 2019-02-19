(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueBase64FileUpload", [], factory);
	else if(typeof exports === 'object')
		exports["VueBase64FileUpload"] = factory();
	else
		root["VueBase64FileUpload"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	if (!window.FileReader) {
	  console.error('Your browser does not support FileReader API!');
	}

	exports.default = {
	  name: 'vue-base64-file-upload',

	  props: {
	    imageClass: {
	      type: String,
	      default: ''
	    },
	    inputClass: {
	      type: String,
	      default: ''
	    },
	    accept: {
	      type: String,
	      default: 'image/png,image/gif,image/jpeg'
	    },
	    maxSize: {
	      type: Number,
	      default: 10 // megabytes
	    },
	    disablePreview: {
	      type: Boolean,
	      default: false
	    },
	    fileName: {
	      type: String,
	      default: ''
	    },
	    placeholder: {
	      type: String,
	      default: 'Click here to upload image'
	    },
	    defaultPreview: {
	      type: String,
	      default: ''
	    }
	  },

	  data: function data() {
	    return {
	      file: null,
	      preview: null,
	      visiblePreview: false,
	      previewImages: []
	    };
	  },


	  computed: {
	    wrapperStyles: function wrapperStyles() {
	      return {
	        'position': 'relative',
	        'width': '100%'
	      };
	    },
	    fileInputStyles: function fileInputStyles() {
	      return {
	        'width': '100%',
	        'position': 'absolute',
	        'top': 0,
	        'left': 0,
	        'right': 0,
	        'bottom': 0,
	        'opacity': 0,
	        'overflow': 'hidden',
	        'outline': 'none',
	        'cursor': 'pointer'
	      };
	    },
	    textInputStyles: function textInputStyles() {
	      return {
	        'width': '100%',
	        'cursor': 'pointer'
	      };
	    },
	    previewImage: function previewImage() {
	      return this.preview || this.defaultPreview;
	    }
	  },

	  methods: {
	    onChange: function onChange(e) {
	      var _this = this;
	      // make sure to clear your files array before uploading new set of data
	      this.$emit('clearArray');

	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length) {
	        return;
	      }

	      function readAndPreview(file) {
	        var reader = new FileReader();

	        var size = file.size && file.size / Math.pow(1000, 2);

	        // check file max size
	        if (size > _this.maxSize) {
	          _this.$emit('size-exceeded', size);
	          return;
	        }

	        reader.onload = function (e) {
	          // update file
	          _this.$emit('file', file);

	          var dataURI = e.target.result;

	          if (dataURI) {
	            _this.$emit('load', dataURI);

	            // _this.preview = dataURI;
	            _this.previewImages.push(dataURI);
	          }
	        };

	        // read blob url from file data
	        reader.readAsDataURL(file);
	      }

	      if (files) {
	        [].forEach.call(files, readAndPreview);
	      }
	    }
	  },

	  template: '\n    <div class="vue-base64-file-upload">\n      <div class="vue-base-64-img-container">\n        <img\n          v-for="previewImg in previewImages"\n          v-show="previewImage && !disablePreview"\n          :src="previewImg"\n          :class="imageClass" />\n      </div>\n      <div class="vue-base64-file-upload-wrapper" :style="wrapperStyles">\n        <input\n          type="file"\n          multiple\n          @change="onChange"\n          :style="fileInputStyles"\n          :accept=accept />\n        <input\n          type="text"\n          :class="inputClass"\n          :style="textInputStyles"\n          :value="fileName || file && file.name"\n          :placeholder="placeholder"\n          disabled />\n      </div>\n    </div>\n  '
	};

/***/ })
/******/ ])
});
;