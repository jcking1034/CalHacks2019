function get_list(url, page) {
    const response = await fetch(url + "?page=" + page);
    const myJson = await response.json();

    display(myJson)
}

function add_item(url, page, name, link) {
    const response = await fetch(url + "?page=" + page + "&name=" + name + "&link=" + link);
    const myJson = await response.json();
    
    display(myJson)
}

function display(items) {
    /* Given json, create some React components and display them */
    console.log(JSON.stringify(myJson));

    let a = items["names"];
    let b = items["links"];

    for (let i = 0; i < a.length; i++) {
        // new React Component for a[0], b[0]
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
