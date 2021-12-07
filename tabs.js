//main tabs_main on left

const tabs_main = document.querySelectorAll("[data-tab-main]");
const tab_contents = document.querySelectorAll("[data-tab-main-content]");
const tab_home = document.getElementById("home");

tabs_main.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabMain);
    tab_contents.forEach((tab_content) => {
      tab_content.classList.remove("active");
    });
    //probably can delete later
    tabs_main.forEach((tab) => {
      tab.classList.remove("active");
    });
    target.classList.add("active");
    //
    tab.classList.add("active");
  });
});

function return_home() {
  tab_contents.forEach((tab_content) => {
    tab_content.classList.remove("active");
  });
  tabs_main.forEach((tab) => {
    tab.classList.remove("active");
  });
  tab_home.classList.add("active");
}

/* dialogue box code */

var text = document.querySelector(".text");
var container = document.querySelector(".dialogue_box");

function generate_characters(i) {
  characters = [];
  dialogue[i].forEach((line, index) => {
    if (index < dialogue[i].length - 1) {
      line.string += " "; //Add a space between lines
    }

    line.string.split("").forEach((character) => {
      var span = document.createElement("span");
      span.textContent = character;
      text.appendChild(span);
      characters.push({
        span: span,
        isSpace: character === " " && !line.pause,
        delayAfter: line.speed,
        classes: line.classes || [],
      });
    });
  });
}

function remove_old_dialogue() {
  var child_nodes = text.childNodes;
  for (var i = child_nodes.length - 1; i >= 0; i--) {
    var child_node = child_nodes[i];
    if (child_node.nodeName == "SPAN") {
      child_node.parentNode.removeChild(child_node);
    }
  }
}

function reveal_one_character(list) {
  var next = list.splice(0, 1)[0];
  next.span.classList.add("revealed");
  next.classes.forEach((c) => {
    next.span.classList.add(c);
  });
  var delay =
    (next.isSpace && !next.pause) || delay_override ? 0 : next.delayAfter;

  dialogue_left = list.length;

  if (list.length > 0) {
    setTimeout(function () {
      reveal_one_character(list);
    }, delay);
  }
}

generate_characters(curr_dialogue);

/* modal for dialogue box */
document.getElementById("tmp_button").addEventListener("click", function () {
  document.querySelector(".dialogue_box").style.display = "block";
  //remove_old_dialogue()
  setTimeout(() => {
    reveal_one_character(characters);
  }, 600);
});

document.querySelector(".next").addEventListener("click", function () {
  console.log(dialogue_left);
  if (dialogue_left <= 0) {
    delay_override = false;
    curr_dialogue++;
    remove_old_dialogue();
    generate_characters(curr_dialogue);
    setTimeout(() => {
      reveal_one_character(characters);
    }, 600);
  } else {
    delay_override = true;
  }
});

var id = null;
document.querySelector(".close").addEventListener("click", function () {
  var elem = document.querySelector(".dialogue_box");
  if (dialogue_closed) {
    var pos = 400;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 300) {
        clearInterval(id);
      } else {
        pos--;
        elem.style.top = pos + "px";
      }
    }
    document.querySelector(".close").innerHTML = "↓";
  } else {
    var pos = 300;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 400) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + "px";
      }
    }
    document.querySelector(".close").innerHTML = "↑";
  }

  dialogue_closed = !dialogue_closed;
});
