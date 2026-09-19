capybara = document.getElementById("capybara")
clicks_element = document.getElementById("capy-clicks-indicator")
cps_element = document.getElementById("cps-indicator")
click_power_element = document.getElementById("click-power-indicator")
autoclick_element = document.getElementById("autoclick-indicator")

var cps_counter = 0
var units_per_click = parseInt(localStorage.getItem("units_per_click")) || 1
var clicks = parseInt(localStorage.getItem("clicks")) || 0
var autoclick = parseInt(localStorage.getItem("autoclick")) || 0

click_power_element.innerText = "+" + units_per_click + "/click"

function updateLocalStorage() {
    localStorage.setItem("units_per_click", units_per_click)
    localStorage.setItem("clicks", clicks)
    localStorage.setItem("autoclick", autoclick)
}

function updateDOMItems() {
    clicks_element.innerText = clicks;
    if (units_per_click == 1) {
        click_power_element.innerText = ""
    } else {
        click_power_element.innerText = "+" + units_per_click + "/click"
    }
    if (autoclick == 0) {
        autoclick_element.innerText = ""
    } else {
        autoclick_element.innerText = "+" + autoclick + "/s autoclick"
    }
}
updateDOMItems()

capybara.addEventListener("click", () => {
    cps_counter++;
    clicks += units_per_click;
    capybara.classList.add("shrink")
    setTimeout(() => capybara.classList.remove("shrink"), 100)
    updateShop()
    updateLocalStorage()
    updateDOMItems()
})

setInterval(() => {
    cps_element.innerText = cps_counter + " cps"
    if (autoclick != 0) {
        cps_element.innerText += " (autoclick +" + autoclick + "/s)"
    }
    cps_counter = 0

    clicks += autoclick
    updateShop()
    updateDOMItems()
    updateLocalStorage()
}, 1000)

shop_items = document.getElementsByClassName("shop-item");
var counter = 0
for (const item of shop_items) {
    var shop_function = () => { }
    let price = parseInt(item.querySelector(".shop-price").innerText)
    switch (counter) {
        case 0:
            shop_function = () => {
                if (clicks >= price) {
                    clicks -= price
                    units_per_click++;
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)
                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                } else {
                    // Cannot buy
                }
            }
            break
        case 1:
            shop_function = () => {
                if (clicks >= price) {
                    clicks -= price
                    autoclick++;
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)
                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                } else {
                    // Cannot buy
                }
            }
            break
        case 2:
            shop_function = () => {
                if (clicks >= price) {
                    clicks -= price
                    units_per_click += 50
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)
                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                } else {
                    // Cannot buy
                }
            }
            break
    }
    item.addEventListener("click", shop_function)
    counter++
}

var unlocked_items = 2
function updateShop() {
    let items = document.getElementsByClassName("shop-item")
    let ctr = 0
    for (const item of items) {
        if (ctr == unlocked_items) {
            break
        }
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            item.style.background = "linear-gradient(135deg, #B9AED2, #ABA0C4)";
        } else {
            item.style.background = "#999999";
        }
        ctr++
    }

    if (items.length > unlocked_items) {
        let item = items[unlocked_items]
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            item.style.background = "linear-gradient(135deg, #B9AED2, #ABA0C4)";
            unlocked_items++

            switch (unlocked_items) {
                case 3:
                    item.style.flexDirection = "row"

                    let cover = item.querySelector(".shop-cover-container").querySelector(".shop-cover")
                    let cover_container = item.querySelector(".shop-cover-container")
                    cover.textContent = "Mr Clicker"
                    cover.style.marginRight = "auto"

                    cover_container.style.flexDirection = "column"
                    cover_container.style.alignItems = "flex-start"

                    item.querySelector(".shop-cover-desc").style.display = "none"

                    let desc = item.querySelector(".shop-desc")
                    desc.style.display = "block"
                    desc.style.fontSize = "33px"

                    let price = item.querySelector(".shop-price")
                    price.style.display = "block"
                    price.style.fontSize = "25px"
                    price.style.marginRight = "auto"
                    price.style.marginBottom = "-5px"
                    price.style.marginTop = "-5px"

                    const img = document.createElement("img")
                    img.src = "images/mrclicker.png"
                    img.style.width = "100px"
                    img.style.alignSelf = "flex-start"

                    item.insertBefore(img, cover_container)
            }
        }
    }
}
updateShop()

document.getElementById("factory-reset").addEventListener("click", () => {
    clicks = 0;
    units_per_click = 1;
    autoclick = 0;
    unlocked_items = 2;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

document.getElementById("1000clicks").addEventListener("click", () => {
    clicks += 1000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

