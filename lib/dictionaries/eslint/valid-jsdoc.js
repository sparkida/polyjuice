/**
* @fileoverview Translation for `valid-jsdoc` (ESLint) to JSCS
* @author Breno Lima de Freitas <https://breno.io>
* @copyright 2016 Breno Lima de Freitas. All rights reserved.
* See LICENSE file in root directory for full license.
*/

'use strict'

//------------------------------------------------------------------------------
// Rule Translation Definition
//------------------------------------------------------------------------------

module.exports = {
  'target': 'jscs',
  'truthy': {
  'requireReturnTypes': true,
  'requireReturnDescription': true,
  'requireParamDescription': true
  }
};