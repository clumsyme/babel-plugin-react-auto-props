// import * as babelCore from '@babel/core'
import * as parser from '@babel/parser'
import * as types from '@babel/types'
import traverse, { NodePath } from '@babel/traverse'

export default function() {
    return {
        visitor: {
            CallExpression(path: NodePath<types.CallExpression>, state) {
                // return if is not React call createElement expression
                let { callee } = path.node
                if (
                    !(
                        types.isMemberExpression(callee) &&
                        types.isIdentifier(callee.property) &&
                        callee.property.name === 'createElement'
                    )
                ) {
                    return
                }

                // get the component type name and it's extra props options
                let [element, propsExpression] = path.node.arguments
                let elementType: string
                if (types.isStringLiteral(element)) {
                    elementType = element.value
                } else if (types.isIdentifier(element)) {
                    elementType = element.name
                }

                const options: Object = state.opts
                let extraProps: Object | undefined = options[elementType]

                if (!extraProps) {
                    return
                }

                // build the extra props ObjectExpression
                let stringLiteral = JSON.stringify(extraProps)
                let extraPropsExpression = parser.parseExpression(stringLiteral)

                // if the default props is null(empty)
                if (types.isNullLiteral(propsExpression)) {
                    path.node.arguments[1] = extraPropsExpression
                } else {
                    path.node.arguments[1] = types.objectExpression(
                        (<types.ObjectExpression>propsExpression).properties.concat(
                            (<types.ObjectExpression>extraPropsExpression).properties,
                        ),
                    )
                }
            },
        },
    }
}