#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# initialize a repo in dist folder
git init

# index and stage files
git add -A

# commit changes
git commit -m 'Deploy to GitHub Pages.'

# push to gh-pages branch
git push -f git@github-personal:ilkrklc/divisor-client.git master:gh-pages

# go back to previous working directory
cd -