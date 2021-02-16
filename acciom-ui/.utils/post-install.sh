#!/bin/sh
#
# Post install hooks

cp node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js ./public/vendor/custom-elements-es5-adapter.js;
cp node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js ./public/vendor/webcomponents-bundle.js;

npm run build;

exit