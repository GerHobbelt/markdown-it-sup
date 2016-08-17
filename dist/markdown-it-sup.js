/*! markdown-it-sup 1.0.0 https://github.com/hsk81/markdown-it-sup @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitSup = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Process ^superscript^

'use strict';

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function superscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos,
      parenthesis = 1;

  if (state.src.charCodeAt(start) !== 0x5e/* ^ */) { return false; }
  if (state.src.charCodeAt(start + 1) !== 0x7b/* { */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 3 >= max) { return false; }

  state.pos = start + 2;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7b/* { */) {
      parenthesis += 1;
    }
    if (state.src.charCodeAt(state.pos) === 0x7d/* } */) {
      parenthesis -= 1;
    }
    if (parenthesis === 0) {
      found = true;
      break;
    }
    state.md.inline.skipToken(state);
  }

  if (!found || start + 2 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 2, state.pos);

  // don't allow unescaped newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\n/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  token         = state.push('sup_open', 'sup', 1);
  token.markup  = '^{';
  token         = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');
  token         = state.push('sup_close', 'sup', -1);
  token.markup  = '}';

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


module.exports = function sup_plugin(md) {
  md.inline.ruler.after('emphasis', 'sup', superscript);
};

},{}]},{},[1])(1)
});