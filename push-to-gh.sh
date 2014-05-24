#!/bin/bash
# This script generates the combined JS file, pushes all content to a GitHub pages site
# and then reverts the combined file.

# Exit immediately
set -e

# Produce dygraph-combined.js.
./generate-combined.sh

# Copy generated file into temp file
temp_file=$(mktemp dygraph-combined.XXXX)
cp dygraph-combined.js $temp_file
git checkout dygraph-combined.js

# Switch to gh-pages branch
git checkout gh-pages
mv $temp_file dygraph-combined.js

# Commit and push
git add -A
git commit -m 'Updated dygraph-combined.js'
git push origin gh-pages

# Switch back to master
git checkout master
