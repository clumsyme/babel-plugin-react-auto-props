# babel-plugin-react-auto-props

English | [中文](/README.zh.md)

## What's this?

This is babel plugin which auto add props to you React Component based on your component type.

```jsx
// what we write
<div>
    <button>Click me</button>
    <p>Hello world</p>
</div>

// ⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙

// what we get after compile
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

## How can I use it?

Firstly, install it from npm:

```
npm install -D babel-plugin-react-auto-props
```

Secondly, use it in you babel config:

```js
// babel.config.js
const plugins = [
    // ...your other babel plugins
    [
        'babel-plugin-react-auto-props',
        {
            button: {
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

That's it.

## What's the result of the plugin

Given the following React element

```jsx
let button = (
    <div>
        <button>Click me</button>
        <p>Hello world</p>
    </div>
)
```

We will get:

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

## Should I use it?

This is an experimental project, and auto add props to React Component is anti-pattern. You should consider to use [Specialization](https://reactjs.org/docs/composition-vs-inheritance.html#specialization) in production. However, it's all up to you.

## License

MIT

✨🍰✨