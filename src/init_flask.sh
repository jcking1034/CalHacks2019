#!/bin/bash

export FLASK_APP=run.py

if [ $(cat app/templates/index.html | grep "1280549712" | wc -l) -eq 3 ]; then
    sed -i ".bak" "s/1280549713/1280549711/g" "./app/templates/index.html"
    sed -i ".bak" "s/1280549713/1280549711/g" "./app/templates/about.html"
else
    sed -i ".bak" "s/1280549711/1280549713/g" "./app/templates/index.html"
    sed -i ".bak" "s/1280549711/1280549713/g" "./app/templates/about.html"
fi

flask run