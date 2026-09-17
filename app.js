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
    }
    item.addEventListener("click", shop_function)
    counter++
}

function updateShop() {
    let items = document.getElementsByClassName("shop-item")
    let ctr = 0
    for (const item of items) {
        if (ctr == 2) {
            break
        }
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            item.style.background = "linear-gradient(135deg, #B9AED2, #ABA0C4)";
        } else {
            item.style.background = "#999999";
        }
        ctr++
    }

}
updateShop()

document.getElementById("factory-reset").addEventListener("click", () => {
    clicks = 0;
    units_per_click = 1;
    autoclick = 0;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})


