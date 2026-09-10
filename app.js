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
