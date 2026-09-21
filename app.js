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

capybara.addEventListener("click", (event) => {
    cps_counter++;
    clicks += units_per_click;
    capybara.classList.add("shrink")
    setTimeout(() => capybara.classList.remove("shrink"), 100)
    updateShop()
    updateLocalStorage()
    updateDOMItems()

    const pop = document.createElement("span")
    pop.className = "click-pop"
    pop.textContent = "+" + units_per_click
    pop.style.left = event.clientX + "px"
    pop.style.top = event.clientY + "px"
    document.body.appendChild(pop)
    void pop.offsetHeight
    pop.style.opacity = "0"
    pop.style.transform = "translate(-50%, -150%)"
    const remove = () => pop.remove()
    pop.addEventListener("transitionend", remove, { once: true })
    setTimeout(remove, 800)
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

        case 3:
            shop_function = () => {
                if (clicks >= price && capybara.src.endsWith("images/capybara.png")) {
                    clicks -= price
                    capybara.src = "images/capy-cap.png"
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)

                    item.querySelector(".shop-cover").style.marginBottom = "0"
                    item.querySelector(".shop-cover-container").style.gap = "0"
                    item.querySelector(".shop-price").style.display = "none"
                    item.querySelector("img").src = "images/capy-cap.png"
                    item.querySelector("img").style.margin = "0"
                    item.querySelector("img").style.width = "140px"
                    item.querySelector(".shop-cover").textContent = "Capy Cap"
                    item.querySelector(".shop-desc").style.marginTop = "0px"
                    item.querySelector(".shop-desc").textContent += " (already bought)"

                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
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
            item.style.background = "linear-gradient(135deg, #C9BFE6, #A79CCE)";
        } else {
            item.style.background = "#8F8D99";
        }
        ctr++
    }

    if (items.length > unlocked_items) {
        let item = items[unlocked_items]
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            item.style.background = "linear-gradient(135deg, #C9BFE6, #A79CCE)";
            unlocked_items++

            switch (unlocked_items) {
                case 3: {
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
                    break
                }

                case 4: {
                    item.style.flexDirection = "row"
                    item.style.gap = "0"

                    let cover = item.querySelector(".shop-cover-container").querySelector(".shop-cover")
                    let cover_container = item.querySelector(".shop-cover-container")
                    cover.textContent = "New Skin"
                    cover.style.marginRight = "auto"
                    cover.style.marginLeft = "auto"

                    cover_container.style.flexDirection = "column"
                    cover_container.style.alignItems = "flex-start"
                    cover_container.style.gap = "25px"

                    item.querySelector(".shop-cover-desc").style.display = "none"

                    let desc = item.querySelector(".shop-desc")
                    desc.style.display = "block"
                    desc.style.fontSize = "15px"
                    desc.style.marginLeft = "auto"
                    desc.style.marginRight = "auto"
                    desc.style.marginTop = "-12px"

                    let price = item.querySelector(".shop-price")
                    price.style.display = "block"
                    price.style.fontSize = "25px"
                    price.style.marginRight = "auto"
                    price.style.marginBottom = "-5px"
                    price.style.marginTop = "-5px"

                    const img = document.createElement("img")
                    img.src = "images/question.png"
                    img.style.width = "50px"
                    img.style.alignSelf = "flex-start"

                    item.insertBefore(img, cover_container)
                    break
                }
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

document.getElementById("20000clicks").addEventListener("click", () => {
    clicks += 20000;
    updateDOMItems()
    updateShop()
    updateLocalStorage()
})

