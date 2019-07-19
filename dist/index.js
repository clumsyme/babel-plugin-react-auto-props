"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as babelCore from '@babel/core'
const parser = require("@babel/parser");
const types = require("@babel/types");
function default_1() {
    return {
        visitor: {
            CallExpression(path, state) {
                // return if is not React call createElement expression
                let { callee } = path.node;
                if (!(types.isMemberExpression(callee) &&
                    types.isIdentifier(callee.property) &&
                    callee.property.name === 'createElement')) {
                    return;
                }
                // get the component type name and it's extra props options
                let [element, propsExpression] = path.node.arguments;
                let elementType;
                if (types.isStringLiteral(element)) {
                    elementType = element.value;
                }
                else if (types.isIdentifier(element)) {
                    elementType = element.name;
                }
                const options = state.opts;
                let extraProps = options[elementType];
                if (!extraProps) {
                    return;
                }
                // build the extra props ObjectExpression
                let stringLiteral = JSON.stringify(extraProps);
                let extraPropsExpression = parser.parseExpression(stringLiteral);
                // if the default props is null(empty)
                if (types.isNullLiteral(propsExpression)) {
                    path.node.arguments[1] = extraPropsExpression;
                }
                else {
                    path.node.arguments[1] = types.objectExpression(propsExpression.properties.concat(extraPropsExpression.properties));
                }
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map