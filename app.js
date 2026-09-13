capybara = document.getElementById("capybara")
clicks = document.getElementById("capy-clicks-indicator")
cps = document.getElementById("cps-indicator")

var cps_counter = 0

capybara.addEventListener("click", () => {
    cps_counter++
    clicks.innerText = parseInt(clicks.innerText) + 1
    capybara.classList.add("shrink")
    setTimeout(() => capybara.classList.remove("shrink"), 100)
})

setInterval(() => {
    cps.innerText = cps_counter + " cps"
    cps_counter = 0
}, 1000)

shop_items = document.getElementsByClassName("shop-item");
var counter = 0
for (const item of shop_items) {
    item.addEventListener("click", () => {
        switch (counter) {
            case 0:
            // +1 Unit per click
        }
    })
    counter++
}
