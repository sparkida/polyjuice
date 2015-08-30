var expect = require('chai').expect
var jscs = require('../../lib/dictionaries/jscs')

var getFn = function (name, scope) {
  var fn = (typeof jscs[name] === 'function') ? jscs[name] : jscs[name]._truthy

  if (scope !== undefined) {
    return getFn(name).bind({ value: scope });
  }

  return fn;
};

describe('jscs', function () {
  it('converts disallowIdentifierNames correctly', function () {
    var fn = getFn('disallowIdentifierNames')

    expect(fn(['a', 'b'])).to.eql(
      [2, '^(a|b)$', {'properties': true}]
    )
  })

  it('converts disallowImplicitTypeConversion correctly', function () {
    var fn = getFn('disallowImplicitTypeConversion')

    expect(fn(['numeric'])).to.eql(
      [2, { number: true }]
    )
  })

  it('converts disallowKeywordsInComments correctly', function () {
    var fn = getFn('disallowKeywordsInComments')

    expect(fn('x')).to.eql(
      [2, {'terms': ['x'], 'location': 'anywhere'}]
    )

    expect(fn(['x', 'y'])).to.eql(
      [2, {'terms': ['x', 'y'], 'location': 'anywhere'}]
    )

    expect(fn(true)).to.eql(
      [2, {'terms': ['fixme', 'todo'], 'location': 'anywhere'}]
    )
  })

  it('converts disallowKeywords correctly', function () {
    var fn = getFn('disallowKeywords')

    expect(fn(['if', 'else'])).to.eql(0)

    expect(fn(['if', 'else', 'with'])).to.eql(2)
  })

  it('converts disallowKeywords correctly', function () {
    var fn = getFn('disallowKeywords')

    expect(fn(['if', 'else'])).to.eql(0)

    expect(fn(['if', 'else', 'with'])).to.eql(2)
  })

  it('converts disallowMultipleVarDecl correctly', function () {
    var fn = getFn('disallowMultipleVarDecl')

    expect(fn(true)).to.eql([2, 'never'])

    expect(fn({ strict: true })).to.eql([2, 'never'])

    expect(fn({ allExcept: ['require'] })).to.eql(
      [2, { uninitialized: 'always', initialized: 'never' }]
    )
  })

  it('converts disallowSpaceAfterKeywords correctly', function () {
    var fn = getFn('disallowSpaceAfterKeywords')

    expect(fn(true)).to.eql({
      'space-after-keywords': [2, 'never'],
      'space-return-throw-case': 0
    })

    expect(fn(['if', 'else'])).to.eql({
      'space-after-keywords': [2, 'never']
    })

    expect(fn(['return', 'throw'])).to.eql({
      'space-return-throw-case': 0
    })

    expect(fn(['if', 'return'])).to.eql({
      'space-after-keywords': [2, 'never'],
      'space-return-throw-case': 0
    })
  })

  it('converts disallowSpaceAfterObjectKeys correctly', function () {
    var fn = getFn('disallowSpaceAfterObjectKeys')

    expect(fn({ allExcept: ['aligned'] })).to.eql([2, { 'align': 'colon' }])

    expect(fn(true)).to.eql(
      [2, { 'beforeColon': false, 'afterColon': true }]
    )
  })

  it('converts disallowSpaceBeforeObjectValues correctly', function () {
    var fn = getFn('disallowSpaceBeforeObjectValues')
    var fnBound = getFn(
      'disallowSpaceBeforeObjectValues',
      [0, {'afterColon': true, 'x': 2}]
    )

    expect(fn()).to.eql([2, {'afterColon': false}])
    expect(fnBound()).to.eql([0, {'afterColon': false, 'x': 2}])
  })

  it('converts disallowSpacesInFunctionDeclaration correctly', function () {
    var fn = getFn('disallowSpacesInFunctionDeclaration')

    expect(fn({
      'beforeOpeningRoundBrace': true,
      'beforeOpeningCurlyBrace': true
    })).to.eql({ 'space-before-function-paren': [2, 'never'] })

    expect(fn({ 'beforeOpeningCurlyBrace': true })).to.be.empty
  })

  it('converts disallowSpacesInFunctionExpression correctly', function () {
    var fn = getFn('disallowSpacesInFunctionExpression')

    expect(fn({
      'beforeOpeningRoundBrace': true,
      'beforeOpeningCurlyBrace': true
    })).to.eql({ 'space-before-function-paren': [2, 'never'] })

    expect(fn({ 'beforeOpeningCurlyBrace': true })).to.be.empty
  })

  it('converts disallowSpacesInFunction correctly', function () {
    var fn = getFn('disallowSpacesInFunction')

    expect(fn({
      'beforeOpeningRoundBrace': true,
      'beforeOpeningCurlyBrace': true
    })).to.eql({ 'space-before-function-paren': [2, 'never'] })

    expect(fn({ 'beforeOpeningCurlyBrace': true })).to.be.empty
  })

  it('converts disallowSpacesInNamedFunctionExpression correctly', function () {
    var fn = getFn('disallowSpacesInNamedFunctionExpression')

    expect(fn({
      'beforeOpeningRoundBrace': true,
      'beforeOpeningCurlyBrace': true
    })).to.eql({ 'space-before-function-paren': [2, 'never'] })

    expect(fn({ 'beforeOpeningCurlyBrace': true })).to.be.empty
  })

  it('converts disallowSpacesInsideArrayBrackets correctly', function () {
    var fn = getFn('disallowSpacesInsideArrayBrackets')
    var fnBound = getFn(
      'disallowSpacesInsideArrayBrackets',
      [2, 'never', {}]
    )

    expect(fn(true)).to.eql([2, 'always', {'singleValue': true}])

    expect(fn('nested')).to.eql([2, 'always', {
      'singleValue': true,
      'arraysInArrays': true
    }])

    expect(fnBound()).to.eql([2, 'never', {'singleValue': true}])
  })

  it('converts disallowSpacesInsideObjectBrackets correctly', function () {
    var fn = getFn('disallowSpacesInsideObjectBrackets')
    var fnBound = getFn(
      'disallowSpacesInsideObjectBrackets',
      [2, 'never', {}]
    )

    expect(fn(true)).to.eql([2, 'always', {'singleValue': true}])

    expect(fn('nested')).to.eql([2, 'always', {
      'singleValue': true,
      'objectsInArrays': true
    }])

    expect(fnBound()).to.eql([2, 'never', {'singleValue': true}])
  })

  it('converts disallowSpacesInsideParentheses correctly', function () {
    var fn = getFn('disallowSpacesInsideParentheses')

    expect(fn(true)).to.eql([2, 'never'])

    expect(fn({ 'only': [ '{', '}' ] })).to.eql([2, 'never', {
      'exceptions': ['{}']
    }])
  })

  it('converts disallowTrailingWhitespace correctly', function () {
    var fn = getFn('disallowTrailingWhitespace')

    expect(fn(true)).to.eql(2)

    expect(fn('ignoreEmptyLines')).to.eql([2, { 'skipBlankLines': true }])
  })

  it('converts maximumLineLength correctly', function () {
    var fn = getFn('maximumLineLength')

    expect(fn({ value: 42 })).to.eql([2, 42])

    expect(fn(42)).to.eql([2, 42])
  })

  it('converts requireCamelCaseOrUpperCaseIdentifiers correctly', function () {
    var fn = getFn('requireCamelCaseOrUpperCaseIdentifiers')

    expect(fn(true)).to.eql([2, { 'properties': 'never' }])

    expect(fn('ignoreProperties')).to.eql([2, { 'properties': 'always' }])
  })

  it('converts requireCapitalizedConstructors correctly', function () {
    var fn = getFn('requireCapitalizedConstructors')

    expect(fn(true)).to.eql(2)

    expect(fn({ 'allExcept': ['somethingNative'] })).to.eql([2, {
      'newIsCapExceptions': ['somethingNative'],
      'capIsNewExceptions': ['somethingNative']
    }])
  })

  it('converts requireDotNotation correctly', function () {
    var fn = getFn('requireDotNotation')

    expect(fn(true)).to.eql(2)

    expect(fn('except_snake_case')).to.eql([2, {
      'allowPattern': '^[a-z]+(_[a-z]+)+$'
    }])

    expect(fn({ 'allExcept': [ 'keywords' ] })).to.eql([2, {
      'allowKeywords': true
    }])

    expect(fn({ 'allExcept': [ 'snake_case' ] })).to.eql([2, {
      'allowPattern': '^[a-z]+(_[a-z]+)+$'
    }])
  })

  it('converts requireSpaceAfterKeywords correctly', function () {
    var fn = getFn('requireSpaceAfterKeywords')

    expect(fn(true)).to.eql({
      'space-after-keywords': [2, 'always'],
      'space-return-throw-case': 0
    })

    expect(fn(['if', 'else'])).to.eql({
      'space-after-keywords': [2, 'always']
    })

    expect(fn(['return', 'throw'])).to.eql({
      'space-return-throw-case': 0
    })

    expect(fn(['if', 'return'])).to.eql({
      'space-after-keywords': [2, 'always'],
      'space-return-throw-case': 0
    })
  })

  it('converts requireSpaceAfterLineComment correctly', function () {
    var fn = getFn('requireSpaceAfterLineComment')
    var fnBound = getFn(
      'requireSpaceAfterLineComment',
      [2, { 'afterBlockComment': false, 'afterLineComment': false }]
    )

    expect(fn()).to.eql(
      [2, { 'afterBlockComment': true, 'afterLineComment': true }]
    )

    expect(fnBound()).to.eql(
      [2, { 'afterBlockComment': true, 'afterLineComment': true }]
    )

  })

  it('converts requireSpaceAfterObjectKeys correctly', function () {
    var fn = getFn('requireSpaceAfterObjectKeys')
    var fnBound = getFn(
      'requireSpaceAfterObjectKeys',
      [2, { 'beforeColon': false, 'afterColon': false}]
    )

    expect(fn()).to.eql([2, { 'beforeColon': true }])

    expect(fnBound()).to.eql([2, {
      'beforeColon': true,
      'afterColon': false
    }])
  })

  it('converts requireSpaceBeforeComma correctly', function () {
    var fn = getFn('requireSpaceBeforeComma')
    var fnBound = getFn(
      'requireSpaceBeforeComma',
      [2, { 'before': true, 'after': false }]
    )

    expect(fn()).to.eql([2, {'before': true}])

    expect(fnBound()).to.eql([2, { 'before': true, 'after': false }])
  })

  it('converts requireSpaceBeforeObjectValues correctly', function () {
    var fn = getFn('requireSpaceBeforeObjectValues')
    var fnBound = getFn(
      'requireSpaceBeforeObjectValues',
      [2, { 'beforeColon': false, 'afterColon': false }]
    )

    expect(fn()).to.eql([2, { 'afterColon': true }])

    expect(fnBound()).to.eql([2, {
      'afterColon': true,
      'beforeColon': false
    }])
  })

  it('converts requireSpacesInFunctionDeclaration correctly', function () {
    var fn = getFn('requireSpacesInFunctionDeclaration')

    expect(fn(true)).to.be.empty

    expect(fn({ 'beforeOpeningRoundBrace': true })).to.eql({
      'space-before-function-paren': [2, 'always']
    })
  })

  it('converts requireSpacesInFunctionExpression correctly', function () {
    var fn = getFn('requireSpacesInFunctionExpression')

    expect(fn(true)).to.be.empty

    expect(fn({ 'beforeOpeningRoundBrace': true })).to.eql({
      'space-before-function-paren': [2, 'always']
    })
  })

  it('converts requireSpacesInsideArrayBrackets correctly', function () {
    var fn = getFn('requireSpacesInsideArrayBrackets')

    expect(fn(true)).to.eql([2, 'always'])

    expect(fn('all')).to.eql([2, 'always'])

    expect(fn({ 'allExcept': ['{'] })).to.eql(
      [2, 'always', { 'objectsInArrays': false }]
    )

    expect(fn({ 'allExcept': ['['] })).to.eql(
      [2, 'always', { 'arraysInArrays': false }]
    )

    expect(fn({ 'allExcept': ['{', '['] })).to.eql(
      [2, 'always', { 'objectsInArrays': false, 'arraysInArrays': false }]
    )
  })

  it('converts requireSpacesInsideObjectBrackets correctly', function () {
    var fn = getFn('requireSpacesInsideObjectBrackets')

    expect(fn(true)).to.eql([2, 'always'])

    expect(fn('all')).to.eql([2, 'always'])

    expect(fn({ 'allExcept': ['{'] })).to.eql(
      [2, 'always', { 'objectsInArrays': false }]
    )

    expect(fn({ 'allExcept': ['['] })).to.eql(
      [2, 'always', { 'arraysInArrays': false }]
    )

    expect(fn({ 'allExcept': ['{', '['] })).to.eql(
      [2, 'always', { 'objectsInArrays': false, 'arraysInArrays': false }]
    )
  })

  it('converts requireSpacesInsideParentheses correctly', function () {
    var fn = getFn('requireSpacesInsideParentheses')

    expect(fn('all')).to.eql([2, 'always'])

    expect(fn({ except: ['[', ']', '{'] })).to.eql(
      [2, 'always', { 'exceptions': ['{}', '[]'] }]
    )
  })

  it('converts requireTrailingComma correctly', function () {
    var fn = getFn('requireTrailingComma')

    expect(fn(true)).to.eql([2, 'always'])

    expect(fn({ 'ignoreSingleValue': true })).to.eql([2, 'always-multiline'])
  })

  it('converts safeContextKeyword correctly', function () {
    var fn = getFn('safeContextKeyword')

    expect(fn('that')).to.eql([2, 'that'])

    expect(fn(['_', 'that'])).to.eql([2, '_'])
  })

  it('converts validateIndentation correctly', function () {
    var fn = getFn('validateIndentation')

    expect(fn(42)).to.eql([2, 42, {'SwitchCase': 1}])

    expect(fn('\t')).to.eql([2, 'tab', {'SwitchCase': 1}])

    expect(fn({ 'value': '\t', 'includeEmptyLines': true })).to.eql(
      [2, 'tab', {'SwitchCase': 1}]
    )

    expect(fn({ 'value': 42, 'includeEmptyLines': true })).to.eql(
      [2, 42, {'SwitchCase': 1}]
    )
  })

  it('converts validateLineBreaks correctly', function () {
    var fn = getFn('validateLineBreaks')

    expect(fn('CLRF')).to.eql([2, 'windows'])

    expect(fn('LF')).to.eql([2, 'unix'])
  })

  it('converts validateQuoteMarks correctly', function () {
    var fn = getFn('validateQuoteMarks')

    expect(fn('"')).to.eql([2, 'double'])

    expect(fn(true)).to.eql([2, 'double'])

    expect(fn('\'')).to.eql([2, 'single'])

    expect(fn({ 'mark': '"', 'escape': true })).to.eql(
      [2, 'double', 'avoid-escape']
    )

    expect(fn({ 'mark': '"', 'escape': false })).to.eql(
      [2, 'double']
    )
  })
})
