#!/bin/sh

# Find the file matching the pattern "dist/assets/settings-*_m.js"
file=$(find /usr/share/nginx/html/assets -type f -name 'settings-*_m.js')

# Check if the file was found
if [[ -n $file ]]; then
  # Use envsubst to substitute $API_URL and overwrite the file
  envsubst '$API_URL' < "$file" > temp_file && mv temp_file "$file"
  echo "Substitution completed for $file."
else
  echo "No file matching the pattern was found."
  exit 1
fi

nging -g 'daemon off;'