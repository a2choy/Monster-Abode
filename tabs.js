//main tabs_main on left

const tabs_main = document.querySelectorAll('[data-tab-main]')
const tab_contents = document.querySelectorAll('[data-tab-main-content]')
const tab_home = document.getElementById("home")

tabs_main.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabMain)
    tab_contents.forEach(tab_content => {
      tab_content.classList.remove('active')
    })
    //probably can delete later
    tabs_main.forEach(tab => {
      tab.classList.remove('active')
    })
    target.classList.add('active')
    //
    tab.classList.add('active')
  })
})

function return_home(){
  tab_contents.forEach(tab_content => {
    tab_content.classList.remove('active')
  })
  tabs_main.forEach(tab => {
    tab.classList.remove('active')
  })
  tab_home.classList.add('active')
}

/* dialogue box code */

var container = document.querySelector(".text");

var speeds = {
  pause: 500, //Higher number = longer delay
  slow: 120,
  normal: 90,
  fast: 40,
  superFast: 10
}

var dialogue = []
curr_dialogue = 0
dialogue_left = 0
delay_override = false

var text_lines_1 = [
  { speed: speeds.slow, string: "Oh, hello!" },
  { speed: speeds.pause, string: "", pause: true },
  { speed: speeds.normal, string: "Have you seen my pet" },
  { speed: speeds.fast, string: "frog", classes: ["green"] },
  { speed: speeds.normal, string: "around?" }
]

var text_lines_2 = [
  { speed: speeds.slow, string: "Oh wow!" },
  { speed: speeds.pause, string: "", pause: true },
  { speed: speeds.normal, string: "You have seen my pet" },
  { speed: speeds.fast, string: "frog", classes: ["green"] },
  { speed: speeds.normal, string: "next door." }
]

dialogue.push(text_lines_1)
dialogue.push(text_lines_2)

var characters = []

function generate_characters(i){
  characters = []
  dialogue[i].forEach((line, index) => {
    if (index < dialogue[i].length - 1) {
       line.string += " " //Add a space between lines
    }
 
    line.string.split("").forEach((character) => {
       var span = document.createElement("span")
       span.textContent = character
       container.appendChild(span)
       characters.push({
          span: span,
          isSpace: character === " " && !line.pause,
          delayAfter: line.speed,
          classes: line.classes || []
       })
    })
 })
}

function remove_old_dialogue(){
  var child_nodes = container.childNodes
  for(var i = child_nodes.length-1; i >= 0; i--){
    var child_node = child_nodes[i]
    if(child_node.nodeName == 'SPAN'){
      child_node.parentNode.removeChild(child_node)
    }
  }
}

function reveal_one_character(list) {
   var next = list.splice(0, 1)[0]
   next.span.classList.add("revealed")
   next.classes.forEach((c) => {
      next.span.classList.add(c)
   })
   var delay = next.isSpace && !next.pause || delay_override ? 0 : next.delayAfter

   dialogue_left = list.length

   if (list.length > 0) {
      setTimeout(function () {
        reveal_one_character(list)
      }, delay)
   } 
}

generate_characters(curr_dialogue)

/* modal for dialogue box */
document.getElementById('tmp_button').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex"
  document.querySelector(".text").style.display = "block"
  //remove_old_dialogue()
  setTimeout(() => {
    reveal_one_character(characters)  
  }, 600)
})

document.querySelector('.next').addEventListener("click", function() {
  console.log(dialogue_left)
  if(dialogue_left <= 0){
    delay_override = false
    curr_dialogue++
    remove_old_dialogue()
    generate_characters(curr_dialogue)
    setTimeout(() => {
      reveal_one_character(characters)  
    }, 600)
  } else {
    delay_override = true
  }
})

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none"
  document.querySelector(".text").style.display = "none"
})