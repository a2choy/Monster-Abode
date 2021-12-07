card_1 = document.getElementById("card_1");
card_2 = document.getElementById("card_2");
card_3 = document.getElementById("card_3");

monster_position = 0;

function update_monster_purchase() {
  tmp_pos = monster_position;
  c = card_1.children;
  for (i = 0; i < c.length; i++) {
    if (c[i].className == "card-image") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].name;
    } else if (c[i].className == "card-text") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].description;
    } else if (c[i].className == "card-stats") {
      tmp = "Pow: " + unlocked_monsters[tmp_pos].pow + "<br/>";
      tmp += "Int: " + unlocked_monsters[tmp_pos].int + "<br/>";
      tmp += "Spd: " + unlocked_monsters[tmp_pos].spd + "<br/>";
      tmp += "Agi: " + unlocked_monsters[tmp_pos].agi;
      c[i].innerHTML = tmp;
    }
  }
  tmp_pos++;
  if (tmp_pos > unlocked_monsters.length - 1) {
    tmp_pos = 0;
  }
  c = card_2.children;
  for (i = 0; i < c.length; i++) {
    if (c[i].className == "card-image") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].name;
    } else if (c[i].className == "card-text") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].description;
    } else if (c[i].className == "card-stats") {
      tmp = "Pow: " + unlocked_monsters[tmp_pos].pow + "<br/>";
      tmp += "Int: " + unlocked_monsters[tmp_pos].int + "<br/>";
      tmp += "Spd: " + unlocked_monsters[tmp_pos].spd + "<br/>";
      tmp += "Agi: " + unlocked_monsters[tmp_pos].agi;
      c[i].innerHTML = tmp;
    }
  }
  tmp_pos++;
  if (tmp_pos > unlocked_monsters.length - 1) {
    tmp_pos = 0;
  }
  c = card_3.children;
  for (i = 0; i < c.length; i++) {
    if (c[i].className == "card-image") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].name;
    } else if (c[i].className == "card-text") {
      c[i].innerHTML = unlocked_monsters[tmp_pos].description;
    } else if (c[i].className == "card-stats") {
      tmp = "Pow: " + unlocked_monsters[tmp_pos].pow + "<br/>";
      tmp += "Int: " + unlocked_monsters[tmp_pos].int + "<br/>";
      tmp += "Spd: " + unlocked_monsters[tmp_pos].spd + "<br/>";
      tmp += "Agi: " + unlocked_monsters[tmp_pos].agi;
      c[i].innerHTML = tmp;
    }
  }
}

update_monster_purchase();

function buy_monster(pos) {
  monster = unlocked_monsters[pos];
  document.getElementById("layer_shrine_monster").innerHTML =
    "Your monster is: " + monster.name;
}

card_1.addEventListener("click", (e) => {
  tmp_pos = monster_position;
  buy_monster(tmp_pos);
});
card_2.addEventListener("click", (e) => {
  tmp_pos = monster_position;
  tmp_pos++;
  if (tmp_pos > unlocked_monsters.length - 1) {
    tmp_pos = 0;
  }
  buy_monster(tmp_pos);
});
card_3.addEventListener("click", (e) => {
  tmp_pos = monster_position;
  tmp_pos += 2;
  if (tmp_pos > unlocked_monsters.length - 1) {
    tmp_pos -= unlocked_monsters.length;
  }
  buy_monster(tmp_pos);
});

document.getElementById("layer_shrine_left").addEventListener("click", (e) => {
  monster_position -= 3;
  if (monster_position < 0) {
    monster_position += unlocked_monsters.length;
  }
  update_monster_purchase();
});
document.getElementById("layer_shrine_right").addEventListener("click", (e) => {
  monster_position += 3;
  if (monster_position > unlocked_monsters.length - 1) {
    monster_position -= unlocked_monsters.length;
  }
  update_monster_purchase();
});
