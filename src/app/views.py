from flask import render_template
from flask import request
from flask import jsonify

import pandas as pd

from app import app

@app.route('/')
def index():
    return render_template("index.html")

# @app.route('/about')
# def about():
#         return render_template("about.html")

# Example: http://127.0.0.1:5000/list?page=good

@app.route('/list')
def get_list():
    page = request.args.get('page', None)
    if not page:
        return "No page given"
    return get_list_dict(page)

def get_list_dict(page):
    """ This function needs to get the names and links for page """
    data = pd.read_csv("./data.csv")
    p = data[data['page'] == page]
    names = list(p['name'])
    links = list(p['link'])

    return {
        "names": names,
        "links": links,
        }

# Example: http://127.0.0.1:5000/list?page=good&name=abc&link=qqq
@app.route('/add')
def add_item():
    page = request.args.get('page', None)
    name = request.args.get('name', None)
    link = request.args.get('link', None)
    if not page:
        return "No page given"
    elif not name:
        return "No name given"
    elif not link:
        return "No link given"

    new_item = pd.DataFrame({"page": [page], "name": [name], "link": [link]})
    
    data = pd.read_csv("./data.csv")
    data = data.append(new_item)
    data = data.drop_duplicates(["page", "name", "link"])
    data = data.reset_index()
    data = data[["page", "name", "link"]]

    data.to_csv("./data.csv")

    return get_list_dict(page)