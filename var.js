//tabs.js
dialogue_closed = false;

bg_modal = document.querySelector(".bg-modal");

var speeds = {
  pause: 500, //Higher number = longer delay
  slow: 120,
  normal: 90,
  fast: 40,
  superFast: 10,
};

var dialogue = [];
var text_lines_1 = [
  { speed: speeds.slow, string: "Oh, hello!" },
  { speed: speeds.pause, string: "", pause: true },
  { speed: speeds.normal, string: "Have you seen my pet" },
  { speed: speeds.fast, string: "frog", classes: ["green"] },
  { speed: speeds.normal, string: "around?" },
];

var text_lines_2 = [
  { speed: speeds.slow, string: "Oh wow!" },
  { speed: speeds.pause, string: "", pause: true },
  { speed: speeds.normal, string: "You have seen my pet" },
  { speed: speeds.fast, string: "frog", classes: ["green"] },
  { speed: speeds.normal, string: "next door." },
];
dialogue.push(text_lines_1);
dialogue.push(text_lines_2);

curr_dialogue = 0;
dialogue_left = 0;
delay_override = false;

var characters = [];

//ranch.js
class Monster {
  constructor(pow, def, mag, agi, spd, vit) {
    this.pow = pow; //power
    this.def = def; //defence
    this.mag = mag; //magic
    this.agi = agi; //agility
    this.spd = spd; //speed
    this.vit = vit; //vitality
    this.ftg = 0; //fatigue
    this.str = 0; //stress
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

gold = 100;

monster = new Monster(1, 2, 3, 4, 5, 6);

training_range = 1;

ranch_training_options = [];
ranch_training_options.push({
  text: "cart",
  stat: ["Pow"],
  train: [1],
  gold: 5,
  ftg: 1,
});
ranch_training_options.push({
  text: "guard",
  stat: ["Def"],
  train: [1],
  gold: 5,
  ftg: 1,
});
ranch_training_options.push({
  text: "study",
  stat: ["Mag"],
  train: [1],
  gold: 5,
  ftg: 2,
});
ranch_training_options.push({
  text: "hunting",
  stat: ["Agi"],
  train: [1],
  gold: 5,
  ftg: 1,
});
ranch_training_options.push({
  text: "delivery",
  stat: ["Spd"],
  train: [1],
  gold: 5,
  ftg: 1,
});
ranch_training_options.push({
  text: "logging",
  stat: ["Vit"],
  train: [1],
  gold: 5,
  ftg: 1,
});
ranch_training_options.push({
  text: "circus",
  stat: ["Agi", "Spd", "Int"],
  train: [2, 1, -1],
  gold: 10,
  ftg: 2,
});
ranch_training_options.push({
  text: "building",
  stat: ["Vit", "Def", "Agi"],
  train: [2, 1, -1],
  gold: 10,
  ftg: 2,
});
ranch_training_options.push({
  text: "mining",
  stat: ["Pow", "Def", "Spd"],
  train: [2, 1, -1],
  gold: 10,
  ftg: 2,
});
ranch_training_options.push({
  text: "resting",
  stat: [],
  train: [],
  gold: 0,
  ftg: -5,
});

//shrine.js
unlocked_monsters = [];
unlocked_monsters.push({
  name: "Kitty",
  description: "Its a cute kitty cat",
  pow: 2,
  int: 1,
  spd: 3,
  agi: 2,
});
unlocked_monsters.push({
  name: "Doggo",
  description: "Its a loyal dog",
  pow: 3,
  int: 1,
  spd: 2,
  agi: 1,
});
unlocked_monsters.push({
  name: "Bear",
  description: "Its a powerful bear",
  pow: 4,
  int: 0,
  spd: 1,
  agi: 1,
});
unlocked_monsters.push({
  name: "Rat",
  description: "Its a small rat",
  pow: 1,
  int: 1,
  spd: 3,
  agi: 3,
});
unlocked_monsters.push({
  name: "Cow",
  description: "Its a big cow",
  pow: 2,
  int: 2,
  spd: 2,
  agi: 2,
});
unlocked_monsters.push({
  name: "Horse",
  description: "Its a fast horse",
  pow: 3,
  int: 1,
  spd: 4,
  agi: 1,
});
unlocked_monsters.push({
  name: "Fish",
  description: "Its a fishy fish",
  pow: 2,
  int: 2,
  spd: 2,
  agi: 2,
});
