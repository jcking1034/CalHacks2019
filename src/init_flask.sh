#!/bin/bash

export FLASK_APP=run.py

if [ $(cat app/templates/index.html | grep "1280549712" | wc -l) -eq 3 ]; then
    sed -i ".bak" "s/1280549712/1280549711/g" "./app/templates/index.html"
else
    sed -i ".bak" "s/1280549711/1280549712/g" "./app/templates/index.html"
fi

flask run