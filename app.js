capybara = document.getElementById("capybara")
clicks = document.getElementById("capy-clicks-indicator")
cps = document.getElementById("cps-indicator")
click_power = document.getElementById("click-power-indicator")

var cps_counter = 0
var units_per_click = 1

capybara.addEventListener("click", () => {
    cps_counter++;
    clicks.innerText = parseInt(clicks.innerText) + units_per_click;
    capybara.classList.add("shrink")
    setTimeout(() => capybara.classList.remove("shrink"), 100)
    updateShop()
})

setInterval(() => {
    cps.innerText = cps_counter + " cps"
    cps_counter = 0
}, 1000)

shop_items = document.getElementsByClassName("shop-item");
var counter = 0
for (const item of shop_items) {
    var shop_function = () => { }
    switch (counter) {
        case 0:
            shop_function = () => {
                if (parseInt(clicks.innerText) >= 10) {
                    clicks.innerText = parseInt(clicks.innerText) - 10
                    units_per_click++;
                    click_power.innerText = "+" + units_per_click + "/click"
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)
                } else {
                    // Cannot buy
                }
                updateShop()
            }
    }
    item.addEventListener("click", shop_function)
    counter++
}

function updateShop() {
    let items = document.getElementsByClassName("shop-item")
    for (const item of items) {
        if (parseInt(item.querySelector(".shop-price").innerText) <= parseInt(clicks.innerText)) {
            item.style.background = "linear-gradient(135deg, #B9AED2, #ABA0C4)";
        } else {
            item.style.background = "#999999";
        }
    }
}
updateShop()
