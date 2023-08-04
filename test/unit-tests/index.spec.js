/* eslint-env mocha */

import coreTests from './coreTests.spec.js'
import unitTests from './unit-tests.spec.js'
import customTabNamesTests from './cusom-tab-names.spec.js'
import attributeTests from './attributesTests.spec.js'

coreTests()
unitTests()
customTabNamesTests()
attributeTests()

mocha.run()