/* Code to interface with backend *****************************************************************************/
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
    /* Given json, create some React components and display them **********************************************/
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

/* Code to select tag *****************************************************************************************/

let selectedTag = "visual"
function setTag(tag) {
    selectedTag = tag;
}

/* Code to interface with backend *****************************************************************************/
var uSearch;//Global Variable to detect user's input

window.onload = function(){
  changeStyle();
  document.getElementById("uInput").onblur = function(evt){
    uSearch = document.getElementById("uInput").value;
    alert("User Says: "+uSearch); //uSearch now has the search value; can comment this out
  }
}

function changeStyle(){
  document.getElementById("see").onclick = function(evt){
    document.getElementById("pSee").style = "display:visible";
    document.getElementById("pHear").style = "display:none";
    document.getElementById("pPhys").style = "display:none";
    document.getElementById("see").style = "background:#F7E8F3";
    document.getElementById("hear").style = "background:#111C49";
    document.getElementById("physical").style = "background:#111C49";
  }

  document.getElementById("hear").onclick = function(evt){
    document.getElementById("pSee").style = "display:none";
    document.getElementById("pHear").style = "display:visible";
    document.getElementById("pPhys").style = "display:none";
    document.getElementById("see").style = "background:#111C49";
    document.getElementById("hear").style = "background:#F7E8F3";
    document.getElementById("physical").style = "background:#111C49";
  }

  document.getElementById("physical").onclick = function(evt){
    document.getElementById("pSee").style = "display:none";
    document.getElementById("pHear").style = "display:none";
    document.getElementById("pPhys").style = "display:visible;";
    document.getElementById("see").style = "background:#111C49";
    document.getElementById("hear").style = "background:#111C49";
    document.getElementById("physical").style = "background:#F7E8F3";
  }
}
