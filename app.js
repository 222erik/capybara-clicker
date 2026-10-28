capybara = document.getElementById("capybara")
clicks_element = document.getElementById("capy-clicks-indicator")
cps_element = document.getElementById("cps-indicator")
click_power_element = document.getElementById("click-power-indicator")
autoclick_element = document.getElementById("autoclick-indicator")

const SCALES = ["", "", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"]

var cps_counter = 0
var units_per_click = parseInt(localStorage.getItem("units_per_click")) || 1
var clicks = parseInt(localStorage.getItem("clicks")) || 0
var autoclick = parseInt(localStorage.getItem("autoclick")) || 0

click_power_element.innerText = "+" + format(units_per_click) + "/click"

function updateLocalStorage() {
    localStorage.setItem("units_per_click", units_per_click)
    localStorage.setItem("clicks", clicks)
    localStorage.setItem("autoclick", autoclick)
}

function format(n) {
    if (n < 1000000) return String(Math.floor(n))
    const tier = Math.min(Math.floor(Math.log10(n) / 3), SCALES.length - 1)
    const scaled = n / Math.pow(10, tier * 3)
    const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2
    return scaled.toFixed(digits) + SCALES[tier]
}

function spawnPop(text, anchorElement) {
    const rect = anchorElement.getBoundingClientRect()
    const pop = document.createElement("span")
    pop.className = "capycap-skin-pop"
    pop.textContent = text
    pop.style.left = rect.right + 60 + "px"
    pop.style.top = rect.top + rect.height / 2 + "px"
    pop.style.fontSize = getComputedStyle(anchorElement).fontSize;
    document.body.appendChild(pop)
    void pop.offsetHeight
    pop.style.opacity = "0"
    pop.style.transform = "translate(-50%, -150%)"
    const remove = () => pop.remove()
    pop.addEventListener("transitionend", remove, { once: true })
    setTimeout(remove, 800)
}

function doubleEverything() {
    spawnPop("x2", document.getElementById("capy-clicks-indicator"))
    spawnPop("x2", document.getElementById("click-power-indicator"))
    spawnPop("x2", document.getElementById("autoclick-indicator"))

    clicks *= 2;
    units_per_click *= 2;
    autoclick *= 2;
}

function updateDOMItems() {
    clicks_element.innerText = format(clicks);
    if (units_per_click == 1) {
        click_power_element.innerText = ""
    } else {
        click_power_element.innerText = "+" + format(units_per_click) + "/click"
    }
    if (autoclick == 0) {
        autoclick_element.innerText = ""
    } else {
        autoclick_element.innerText = "+" + format(autoclick) + "/s autoclick"
    }
}
updateDOMItems()

setInterval(() => {
    cps_element.innerText = format(cps_counter) + " cps"
    if (autoclick != 0) {
        cps_element.innerText += " (autoclick +" + format(autoclick) + "/s)"
    }
    cps_counter = 0

    updateShop()
    updateDOMItems()
    updateLocalStorage()
}, 1000)

var autoclick_remainder = 0.0
setInterval(() => {
    if (autoclick == 0) {
        return
    }
    let whole = Math.floor(autoclick / 20 + autoclick_remainder)
    autoclick_remainder += (autoclick / 20) - whole
    clicks += whole
    updateDOMItems()
}, 50)

setTimeout(() => updateCapybara(), 1000)

document.getElementById("factory-reset").addEventListener("click", () => {
    clicks = 0;
    units_per_click = 1;
    autoclick = 0;
    unlocked_items = 2;
    localStorage.setItem("skin", null)
    updateDOMItems()
    updateShop()
    updateLocalStorage()
    updateCapybara()
})

document.getElementById("1000clicks").addEventListener("click", () => {
    clicks += 1000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

document.getElementById("50000clicks").addEventListener("click", () => {
    clicks += 50000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

document.getElementById("5000000clicks").addEventListener("click", () => {
    clicks += 5000000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

document.getElementById("1000000000clicks").addEventListener("click", () => {
    clicks += 1000000000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

let sun = document.getElementById("sun")

function positionSun() {
    let capyRect = capybara.getBoundingClientRect()
    let sunRect = sun.getBoundingClientRect()
    sun.style.left = (capyRect.left + capyRect.width / 2 - sunRect.width / 2) + "px"
    sun.style.top = (capyRect.top + capyRect.height / 2 - sunRect.height / 2) + "px"
    console.log("hello!")
}

window.addEventListener("load", positionSun)

