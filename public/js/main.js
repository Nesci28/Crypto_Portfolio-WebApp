const url = "https://getbalance-nos.herokuapp.com/api/v1/db";
let totalBTC = 0;
let totalUSD = 0;

fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    const insideData = data.balance;
    const updateTime = document.querySelector("#title");
    const time =
      new Date(insideData.Time)
        .getHours()
        .toString()
        .padStart(2, "0") +
      ":" +
      (new Date(insideData.Time).getMinutes() + 1).toString().padStart(2, "0") +
      ":" +
      new Date(insideData.Time)
        .getSeconds()
        .toString()
        .padStart(2, "0") +
      " - " +
      new Date(insideData.Time)
        .getDate()
        .toString()
        .padStart(2, "0") +
      "/" +
      (new Date(insideData.Time).getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date(insideData.Time).getFullYear();
    updateTime.innerText = time;

    const currentTime = document.querySelector("#title-date");
    const timeCurrent =
      new Date()
        .getHours()
        .toString()
        .padStart(2, "0") +
      ":" +
      (new Date().getMinutes() + 1).toString().padStart(2, "0") +
      ":" +
      new Date()
        .getSeconds()
        .toString()
        .padStart(2, "0") +
      " - " +
      new Date()
        .getDate()
        .toString()
        .padStart(2, "0") +
      "/" +
      (new Date().getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      new Date().getFullYear();
    currentTime.innerText = timeCurrent;

    const plan = document.getElementById("plan");
    Object.keys(insideData).forEach(key => {
      if (typeof data.balance[key] == "object") {
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
          if (value == "total_in_btc") totalBTC += data.balance[key][value];
          if (value == "total_in_usd") totalUSD += data.balance[key][value];

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
    console.log(document.getElementById("#totalBTC"));
    document.querySelector("#totalBTC").innerHTML = parseFloat(
      totalBTC.toFixed(8)
    );
    document.querySelector("#totalUSD").innerHTML = parseFloat(
      totalUSD.toFixed(2)
    );
  })
  .catch(function(err) {
    console.log(err);
  });
