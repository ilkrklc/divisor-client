#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# re index files
git add -A

# commit changes
git commit -m 'Deploy to GitHub Pages.'

# push to gh-pages branch
git push -f git@github-personal/divisor-client.git main:gh-pages

# go back to previous working directory
cd -