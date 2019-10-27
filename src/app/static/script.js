/* Code to get search bar text */
var uSearch;  // uSearch now has the search value

window.onload = function(){
  changeStyle();
  document.getElementById("uInput").onblur = function(evt){
    uSearch = document.getElementById("uInput").value;
    get_list("http://127.0.0.1:5000/", uSearch, curTab);
  }
}

/* Code to change tabs */
var curTab = "visual";  // Stores the current tab

function changeStyle(){
  document.getElementById("see").onclick = function(evt){
    document.getElementById("pSee").style     = "display:visible; transition:all 0.3s;";
    document.getElementById("pHear").style    = "display:none; transition:all 0.3s;";
    document.getElementById("pPhys").style    = "display:none; transition:all 0.3s;";
    document.getElementById("see").style      = "background:#F7E8F3; transition:all 0.3s;";
    document.getElementById("hear").style     = "background:#111C49; transition:all 0.3s;";
    document.getElementById("physical").style = "background:#111C49; transition:all 0.3s;";
    curTab = "visual";
    get_list("http://127.0.0.1:5000/", uSearch, curTab);
  }

  document.getElementById("hear").onclick = function(evt){
    document.getElementById("pSee").style     = "display:none; transition:all 0.3s;";
    document.getElementById("pHear").style    = "display:visible; transition:all 0.3s;";
    document.getElementById("pPhys").style    = "display:none; transition:all 0.3s;";
    document.getElementById("see").style      = "background:#111C49; transition:all 0.3s;";
    document.getElementById("hear").style     = "background:#F7E8F3; transition:all 0.3s;";
    document.getElementById("physical").style = "background:#111C49; transition:all 0.3s;";
    curTab = "auditory";
    get_list("http://127.0.0.1:5000/", uSearch, curTab);
  }

  document.getElementById("physical").onclick = function(evt){
    document.getElementById("pSee").style     = "display:none; transition:all 0.3s;";
    document.getElementById("pHear").style    = "display:none; transition:all 0.3s;";
    document.getElementById("pPhys").style    = "display:visible;; transition:all 0.3s;";
    document.getElementById("see").style      = "background:#111C49; transition:all 0.3s;";
    document.getElementById("hear").style     = "background:#111C49; transition:all 0.3s;";
    document.getElementById("physical").style = "background:#F7E8F3; transition:all 0.3s;";
    curTab = "physical";
    get_list("http://127.0.0.1:5000/", uSearch, curTab);
  }
}

/* Code to interface with backend */
function get_list(url, page, tag) {
  console.log(url + 'list?page=' + page + '&tag=' + tag);
  fetch(url + 'list?page=' + page + '&tag=' + tag)
  .then(f => f.json())
  .then(data => display(data))
  .catch(err => { console.log(err) });
}


function display(items) {
  /* Given json, create some React components and display them */

  let names = items["names"];
  let links = items["links"];

  console.log(names);
  console.log(links);

  // Delete everything inside lol
  var element = document.getElementById("output");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  // Add the goods
  for (let i = 0; i < names.length; i++) {
    var to_add = document.createElement("div");
    to_add.classList.add("listItem");

    var a = document.createElement('a');
    var linkText = document.createTextNode(names[i]);
    a.appendChild(linkText);
    a.title = names[i];
    a.href = links[i];
    to_add.appendChild(a);
    
    element.appendChild(to_add);
  }
}
