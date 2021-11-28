const storage = new Map()

market_container = document.getElementById("grid-market-container")

market_items = {
    "apple": 
    {
        gold: 5,
        use: function(x){
            x.ftg -= 1
        }
    },
    "banana":     
    {
        gold: 6,
        use: function(x){
            x.ftg -= 2
        }
    },
    
    "kiwi" :     
    {
        gold: 7,
        use: function(x){
            x.ftg -= 3
        }
    },
    "berry":    
    {
        gold: 8,
        use: function(x){
            x.ftg += 2
        }
    },
    "melon" :     
    {
        gold: 9,
        use: function(x){
            x.ftg += 1
        }
    }
}

function add_storage(key){
    if(!storage.has(key)){
        storage.set(key, 1)
    } else {
        storage.set(key, storage.get(key) + 1)
    }
    
}

for (const [key, value] of Object.entries(market_items)) {
    var btn = document.createElement("button")
    btn.className = "grid-market-item"
    btn.id = key
    tmp = key.charAt(0).toUpperCase() + key.slice(1)
    tmp += "<br/>Gold: " + value.gold
    btn.innerHTML = tmp

    btn.addEventListener("click", e => {
        add_storage(key)
    })

    market_container.appendChild(btn)
}
