#!/bin/sh
set -eu

mkdir -p dist/assets
cp index.html config.js favicon.ico icon-192.png manifest.json manifest.webmanifest _redirects dist/
cp -R assets/. dist/assets/
