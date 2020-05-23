/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

/**
 * @license
 * Copyright (c) 2015 The ExpandJS authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */
(function () {
    "use strict";

    var _              = require('lodash'),
        assertArgument = require('../assert/assertArgument'),
        toArray        = require('../caster/toArray');

    /**
     * Gets the last element of `array`.
     *
     * ```js
     * XP.last([1, 2, 3]);
     * // => 3
     *
     * XP.last([]);
     * // => undefined
     * ```
     *
     * @function last
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     */
    module.exports = function last(array) {
        assertArgument(array = toArray(array), 1, 'Arrayable');
        return _.last(array);
    };

}());