function get_list(url, page, tag) {
    fetch(url + "?page=" + page + "&tag=" + tag)
    .then(res => res.json())
    .then((out) => {
        display(out)
    })
    .catch(err => { throw err });
}

function add_item(url, page, tag, name, link) {
    fetch(url + "?page=" + page + "&tag=" + tag + "&name=" + name + "&link=" + link)
    .then(res => res.json())
    .then((out) => {
        display(out)
    })
    .catch(err => { throw err });
}

function display(items) {
    /* Given json, create some React components and display them */
    console.log(JSON.stringify(myJson));

    let names = items["names"];
    let links = items["links"];
    let tags = items["tags"];

    for (let i = 0; i < names.length; i++) {
        ReactDOM.render(
            <ListItem name={names[i]} links={links[i]} tags={tags[i]} />, 
            document.getElementById('output')
        );
    }
}

class ListItem extends React.Component {
    render() {
    return (
            <div>
                <div>props.name</div>
                <div>props.link</div>
            </div>
        );
    }
}
