# babel-plugin-react-auto-props

[English](/README.md) | 中文

## 这是什么

这是一个根据组件类型自动为你的 React 组件添加属性的 babel 插件。

```jsx
// 我们写的代码
<div>
    <button>Click me</button>
    <p>Hello world</p>
</div>

// ⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙

// 编译后我们得到的代码
<div>
    <button className="my-button">Click me</button>
    <p 
        style={
            color: 'grey',
            fontSize: 15,
        }
    >
        Hello world
    </p>
</div>
```

## 怎么使用

首先从 npm 安装：

```
npm install -D babel-plugin-react-auto-props
```

然后，添加到你的 babel 配置文件内：

```js
// babel.config.js
const plugins = [
    // ...其他 babel 插件
    [
        'babel-plugin-react-auto-props',
        {
            Button: {
                className: 'my-button',
            },
            p: {
                style: {
                    color: 'grey',
                    fontSize: 15,
                },
            },
        },
    ],
]
```

即可工作.

## 插件运行代码结果是什么样的？

对于如下的 React 元素：

```jsx
let button = (
    <div>
        <button>Click me</button>
        <p>Hello world</p>
    </div>
)
```

使用该插件后我们会得到：

```js
var button = _react.default.createElement(
    'div',
    null,
    _react.default.createElement(
        Button,
        _defineProperty(
            {
                className: 'my-button',
            },
            'className',
            'my-button',
        ),
        'Click me',
    ),
    _react.default.createElement(
        'p',
        _defineProperty(
            {
                style: {
                    color: 'grey',
                    fontSize: 15,
                },
            },
            'style',
            {
                color: 'grey',
                fontSize: 15,
            },
        ),
        'Hello world',
    ),
)
```

## 我应该使用它吗？

这是一个实验性的项目，自动给 React 组件添加属性是很反模式的。生产中应首先考虑使用[组合组件](https://zh-hans.reactjs.org/docs/components-and-props.html#composing-components)来实现需求，当然，这都取决于你。

## 许可协议

MIT

✨🍰✨