market_container = document.getElementById("grid-market-container");

function add_storage(key) {
  if (!storage.has(key)) {
    storage.set(key, 1);
  } else {
    storage.set(key, storage.get(key) + 1);
  }
}

for (const key of market_items.keys()) {
  var btn = document.createElement("button");
  btn.className = "grid-market-item";
  btn.id = key;
  tmp = key.charAt(0).toUpperCase() + key.slice(1);
  tmp += "<br/>Gold: " + market_items.get(key).gold;
  btn.innerHTML = tmp;

  btn.addEventListener("click", (e) => {
    add_storage(key);
  });

  market_container.appendChild(btn);
}
