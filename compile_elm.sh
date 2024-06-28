#!/bin/bash
# Run this script when logged in to the Moodle container to quickly compile Elm to JS
# Initially delete the files to avoid confusion due to old files
rm assets/roadmap.js
rm -rf amd/src
npx elm-esm make src/Main.elm --output=assets/roadmap.js
mkdir -p amd/src
cat shim.js assets/roadmap.js > amd/src/roadmap.js
# force because generated JS has lots of ESLint issues
grunt amd --force
