class Monster {
  constructor(pow, int, spd, agi, hp, ftg) {
    this.pow = pow;
    this.int = int;
    this.spd = spd;
    this.agi = agi;
    this.hp = hp;
    this.ftg = ftg;
  }
}

const storage = new Map();

market_items = new Map();

market_items.set("apple", {
  gold: 5,
  use: function (x) {
    x.ftg -= 1;
  },
});
market_items.set("banana", {
  gold: 6,
  use: function (x) {
    x.ftg -= 2;
  },
});
market_items.set("kiwi", {
  gold: 7,
  use: function (x) {
    x.ftg -= 3;
  },
});
market_items.set("berry", {
  gold: 8,
  use: function (x) {
    x.ftg -= 4;
  },
});
market_items.set("melon", {
  gold: 9,
  use: function (x) {
    x.ftg -= 5;
  },
});

ranch_btn = document.getElementById("ranch_btn");
ranch_info = document.getElementById("ranch_info");
ranch_popup = document.getElementById("ranch_popup");
ranch_container = document.getElementById("grid-ranch-container");
ranch_inventory_container = document.getElementById("grid-inventory-container");

gold = 100;

monster = new Monster(1, 2, 3, 4, 5, 0);

function update_stats() {
  ranch_info.innerHTML =
    "Pow: " +
    monster.pow +
    "<br/>Int: " +
    monster.int +
    "<br/>Spd: " +
    monster.spd +
    "<br/>Agi: " +
    monster.agi +
    "<br/>HP: " +
    monster.hp +
    "<br/>Ftg: " +
    monster.ftg +
    "<br/>Gold: " +
    gold;
}

training_range = 1;

ranch_training_options = [];
ranch_training_options.push({
  text: "boxing",
  stat: ["Pow"],
  train: [2],
  gold: -5,
  ftg: 1,
});
ranch_training_options.push({
  text: "reading",
  stat: ["Int"],
  train: [2],
  gold: -5,
  ftg: 1,
});
ranch_training_options.push({
  text: "dancing",
  stat: ["Spd", "Agi"],
  train: [2, 2],
  gold: -10,
  ftg: 2,
});
ranch_training_options.push({
  text: "meditating",
  stat: ["Int", "Pow"],
  train: [4, -2],
  gold: -5,
  ftg: 1,
});
ranch_training_options.push({
  text: "working",
  stat: [],
  train: [],
  gold: 20,
  ftg: 1,
});
ranch_training_options.push({
  text: "resting",
  stat: [],
  train: [],
  gold: 0,
  ftg: -5,
});

update_stats();

function show_stats(x) {
  ranch_training_options.forEach((element) => {
    if (element.text == x.id) {
      tmp = "";
      for (i = 0; i < element.stat.length; i++) {
        tmp += element.stat[i];
        for (j = 0; j < Math.abs(element.train[i] / 2); j++) {
          tmp += element.train[i] > 0 ? "↑" : "↓";
        }
        tmp += " &nbsp;";
      }
      tmp += "<br/>";
      if (element.gold != 0) {
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
