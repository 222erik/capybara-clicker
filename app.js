capybara = document.getElementById("capybara")
clicks_element = document.getElementById("capy-clicks-indicator")
cps_element = document.getElementById("cps-indicator")
click_power_element = document.getElementById("click-power-indicator")

var cps_counter = 0
var units_per_click = parseInt(localStorage.getItem("units_per_click")) || 1
var clicks = parseInt(localStorage.getItem("clicks")) || 0

click_power_element.innerText = "+" + units_per_click + "/click"

function updateLocalStorage() {
    localStorage.setItem("units_per_click", units_per_click)
    localStorage.setItem("clicks", clicks)
}

function updateDOMItems() {
    clicks_element.innerText = clicks + units_per_click;
    click_power_element.innerText = "+" + units_per_click + "/click"
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
    cps_counter = 0
}, 1000)

shop_items = document.getElementsByClassName("shop-item");
var counter = 0
for (const item of shop_items) {
    var shop_function = () => { }
    switch (counter) {
        case 0:
            shop_function = () => {
                if (clicks >= 10) {
                    clicks -= 10
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
    }
    item.addEventListener("click", shop_function)
    counter++
}

function updateShop() {
    let items = document.getElementsByClassName("shop-item")
    for (const item of items) {
        if (item.innerHTML === "item") { continue; } // Test item
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            item.style.background = "linear-gradient(135deg, #B9AED2, #ABA0C4)";
        } else {
            item.style.background = "#999999";
        }
    }
}
updateShop()
