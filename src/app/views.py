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
    page = request.args.get('page', default = "1", type = str)
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
    page = request.args.get('page', default = "1", type = str)
    name = request.args.get('name', default = "1", type = str)
    link = request.args.get('link', default = "1", type = str)

    data = pd.read_csv("./data.csv")
    new_item = pd.DataFrame({"page": [page], "name": [name], "link": [link]})
    new_item.to_csv("NEW.csv")
    data = data.append(new_item)
    data = data.drop_duplicates(["page", "name", "link"])
    data = data.reset_index()
    data = data[["page", "name", "link"]]

    data.to_csv("./data.csv")

    return get_list_dict(page)