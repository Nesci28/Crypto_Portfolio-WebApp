const url = "https://getbalance-nos.herokuapp.com/api/v1/db";

const h1Date = document.querySelector("#title");
h1Date.innerHTML =
  new Date().getHours() +
  ":" +
  new Date().getHours() +
  ":" +
  new Date().getSeconds() +
  " - " +
  new Date().getDate() +
  "/" +
  new Date().getMonth() +
  "/" +
  new Date().getFullYear();

fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    const insideData = data.balance;
    const container = document.getElementById("container");
    const plan = document.getElementById("plan");
    Object.keys(insideData).forEach(key => {
      if (typeof data.balance[key] == "object") {
        console.log(data.balance[key]);

        // Creation of a container
        let container = document.createElement("div");
        container.classList.add("container");

        // Creation of the border box
        let box = document.createElement("div");
        box.classList.add("box");

        // Creation of the text inside
        // Title
        let ticker = document.createElement("h3");
        ticker.classList.add("title");
        ticker.innerHTML = key;

        // Creation of the Grid Div
        let grid = document.createElement("div");
        grid.classList.add("grid");
        for (let i = 0; i < Object.keys(data.balance[key]).length; i++) {
          let value = Object.keys(data.balance[key])[i];

          let category = document.createElement("p");
          category.innerHTML = value + " : ";
          let result = document.createElement("p");
          result.innerHTML = data.balance[key][value];

          grid.appendChild(category);
          grid.appendChild(result);
        }
        // Appending the new stuff
        box.appendChild(ticker);
        box.appendChild(grid);
        container.appendChild(box);
        plan.appendChild(container);
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  });
