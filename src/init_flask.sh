#!/bin/bash

export FLASK_APP=run.py
sed -i "bak" "s/1280549712/1280549711/g" "./templates/index.html"
sed -i "bak" "s/1280549711/1280549712/g" "./templates/index.html"
flask run