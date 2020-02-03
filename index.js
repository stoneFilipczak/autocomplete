window.addEventListener("load", () => {
  createAutocomplete(1, "style1");
  createAutocomplete(2, "style2");
});

const createAutocomplete = (id, className) => {
  // create input
  const input = document.createElement("input");
  input.setAttribute("class", className);
  input.setAttribute("type", "text");
  input.setAttribute("id", id);
  input.setAttribute("autocomplete", "off");
  input.setAttribute("list", `list${id}`);
  document.body.appendChild(input);
  input.addEventListener("input", event => {
    autocomplete(event.target);
  });
  // create corresponding datalist
  const list = document.createElement("datalist");
  list.setAttribute("id", `list${id}`);
  input.appendChild(list);
};

const autocomplete = async input => {
  const json = await getInfo(input.value);
  //json returns as null when there are no matching search results
  if (json) {
    updateList(json, input);
  }
};

const updateList = (json, input) => {
  // grab instance of datalist and clear it out
  const data_list = document.getElementById(`list${input.id}`);
  data_list.innerHTML = "";

  for (let i of json.predictions) {
    // check if first result matches input, break if so
    if (i.name == input.value) {
      break;
    }
    //append items to datalist
    const item = document.createElement("option");
    item.innerHTML = i.description;
    item.value = i.name;
    data_list.appendChild(item);
  }
};

const getInfo = async input => {
  let res;
  try {
    res = await fetch(
      `https://coding-challenge.echoandapex.com/locations?q=${input}`
    );
  } catch (err) {
    console.log(err);
    return null;
  }

  return await res.json();
};
