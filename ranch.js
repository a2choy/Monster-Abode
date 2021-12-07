ranch_btn = document.getElementById("ranch_btn");
ranch_info = document.getElementById("ranch_info");
ranch_popup = document.getElementById("ranch_popup");
ranch_back = document.getElementById("ranch_back");
ranch_container = document.getElementById("grid-ranch-container");
ranch_inventory_container = document.getElementById("grid-inventory-container");
ranch_flex_container = document.getElementById("flex-ranch-container");

function return_ranch(){
  ranch_flex_container.style.display = "block"
  ranch_back.style.display = "none"
  ranch_container.style.display = "none"
  ranch_inventory_container.style.display = "none"
  ranch_info.style.display = "none"
}

function show_work(){
  ranch_flex_container.style.display = "none"
  ranch_back.style.display = "block"
  ranch_container.style.display = "grid"
  ranch_inventory_container.style.display = "none"
  ranch_info.style.display = "none"
}

function show_item(){
  ranch_flex_container.style.display = "none"
  ranch_back.style.display = "block"
  ranch_container.style.display = "none"
  ranch_inventory_container.style.display = "block"
  ranch_info.style.display = "none"
}

function show_monster(){
  ranch_flex_container.style.display = "none"
  ranch_back.style.display = "block"
  ranch_container.style.display = "none"
  ranch_inventory_container.style.display = "none"
  ranch_info.style.display = "block"
}

function update_stats() {
  ranch_info.innerHTML =
    "Pow: " +
    monster.pow +
    "<br/>Def: " +
    monster.def +
    "<br/>Mag: " +
    monster.mag +
    "<br/>Agi: " +
    monster.agi +
    "<br/>Spd: " +
    monster.spd +
    "<br/>Vit: " +
    monster.vit +
    "<br/>Ftg: " +
    monster.ftg +
    "<br/>Gold: " +
    gold;
}

update_stats();

function show_stats(x) {
  ranch_training_options.forEach((element) => {
    if (element.text == x.id) {
      tmp = "";
      for (i = 0; i < element.stat.length; i++) {
        tmp += element.stat[i];
        for (j = 0; j < Math.abs(element.train[i]); j++) {
          tmp += element.train[i] > 0 ? "↑" : "↓";
        }
        tmp += " &nbsp;";
      }
      if (element.gold != 0) {
        tmp += "<br/>";
        tmp += "Gold";
        for (j = 0; j < Math.abs(element.gold / 5); j++) {
          tmp += element.gold > 0 ? "↑" : "↓";
        }
        tmp += " &nbsp;";
      }
      tmp += "Ftg";
      tmp += element.ftg > 0 ? "↑" : "↓";
      ranch_popup.innerHTML = tmp;
      ranch_popup.style.display = "flex";
    }
  });
}

function hide_stats() {
  ranch_popup.style.display = "none";
}

function add_stats(x) {
  ranch_training_options.forEach((element) => {
    if (element.text == x.id) {
      for (i = 0; i < element.stat.length; i++) {
        switch (element.stat[i]) {
          case "Pow":
            monster.pow += element.train[i];
            if (monster.pow < 0) monster.pow = 0;
            break;
          case "Int":
            monster.int += element.train[i];
            if (monster.int < 0) monster.int = 0;
            break;
          case "Spd":
            monster.spd += element.train[i];
            if (monster.spd < 0) monster.spd = 0;
            break;
          case "Agi":
            monster.agi += element.train[i];
            if (monster.agi < 0) monster.agi = 0;
            break;
          default:
            break;
        }
      }
      gold += element.gold;
      monster.ftg += element.ftg;
    }
  });
  update_stats();
}

ranch_training_options.forEach((element) => {
  var btn = document.createElement("button");
  btn.className = "grid-ranch-item";
  btn.id = element.text;
  btn.innerHTML = element.text.charAt(0).toUpperCase() + element.text.slice(1);

  btn.addEventListener("mouseover", (e) => {
    show_stats(btn);
  });
  btn.addEventListener("mouseout", (e) => {
    hide_stats();
  });
  btn.addEventListener("click", (e) => {
    add_stats(btn);
  });
  ranch_container.appendChild(btn);
});

ranch_btn.addEventListener("click", (e) => {
  for (const key of storage.keys()) {
    var btn = document.createElement("button");
    btn.className = "grid-inventory-item";
    btn.id = key + "_ranch";
    btn.innerHTML = key + " x " + storage.get(key);

    btn.addEventListener("click", (e) => {
      market_items.get(key).use(monster);
      update_stats();

      if (storage.get(key) - 1 <= 0) {
        storage.delete(key);
        document.getElementById(key + "_ranch").remove();
      } else {
        storage.set(key, storage.get(key) - 1);
        document.getElementById(key + "_ranch").innerHTML =
          key + " x " + storage.get(key);
      }
    });

    ranch_inventory_container.appendChild(btn);
  }
});

