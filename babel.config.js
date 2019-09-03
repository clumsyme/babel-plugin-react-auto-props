const presets = ['@babel/preset-react']

const plugins = [
    [
        './dist/index.js',
        {
            p: {
                style: {
                    color: 'grey',
                },
            },
        },
    ],
]

module.exports = { presets, plugins }
