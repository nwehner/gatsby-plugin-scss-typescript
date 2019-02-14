# gatsby-plugin-scss-typescript &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

Includes Gatsby V2 webpack support for SCSS stylesheets modules and generation of accompanying typings.

## Install

`yarn add gatsby-plugin-scss-typescript`

## Usage

1.  Include the plugin in your `gatsby-config.js` file.
2.  Write your SCSS and require or import them as normal.

```javascript
// in gatsby-config.js
plugins: ['gatsby-plugin-scss-typescript'];
```

## Options

If you need to pass options to the underlying css-loader use the plugins options; see [css-loader](https://github.com/webpack-contrib/css-loader)
for all available options.

```javascript
// in gatsby-config.js
plugins: [
    {
        resolve: 'gatsby-plugin-typescript-scss-modules',
        options: {
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]_[emoji:1]',
        },
    },
];
```