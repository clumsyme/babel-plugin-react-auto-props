const babel = require('@babel/core')

describe('transform should work well', () => {
    let result = babel.transform('<p>Hello</p>')
    test('p should has color prop', () => {
        expect(result.code.includes('color')).toBe(true)
    })
    test('final code should work well', () => {
        expect(result.code).toBe(
            'React.createElement("p", {\n  "style": {\n    "color": "grey"\n  }\n}, "Hello");',
        )
    })
})
