var unlocked_items = 2

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

                    localStorage.setItem("skin", "capycap")
                    applyCapycapStyles()

                    doubleEverything()

                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                    positionSun()
                }
            }
            break

        case 4:
            shop_function = () => {
                if (clicks >= price) {
                    clicks -= price
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)

                    autoclick += 50000

                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                }
            }
            break

        case 5:
            shop_function = () => {
                if (clicks >= price) {
                    clicks -= price
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)

                    units_per_click += 1000000

                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                }
            }
            break

        case 6:
            shop_function = () => {
                if (clicks >= price && capybara.src.endsWith("images/capy-cap.png")) {
                    clicks -= price
                    capybara.src = "images/purple.png"
                    item.classList.add("flash")
                    setTimeout(() => {
                        item.classList.remove("flash");
                    }, 100)

                    localStorage.setItem("skin", "purple")
                    applyPurpleStyles()

                    doubleEverything()

                    updateShop()
                    updateLocalStorage()
                    updateDOMItems()
                    positionSun()
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
        if (ctr == unlocked_items) {
            break
        }
        if (parseInt(item.querySelector(".shop-price").innerText) <= clicks) {
            if (!(ctr == 3 || ctr == 6)) {
                item.style.background = "linear-gradient(135deg, #C9BFE6, #A79CCE)";
            }
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

                case 5: {
                    item.style.flexDirection = "row"
                    item.style.gap = "0"

                    let cover = item.querySelector(".shop-cover-container").querySelector(".shop-cover")
                    let cover_container = item.querySelector(".shop-cover-container")
                    cover.textContent = "Clicker Farm"
                    cover.style.marginRight = "auto"
                    cover.style.marginLeft = "auto"

                    cover_container.style.flexDirection = "column"
                    cover_container.style.alignItems = "flex-start"

                    item.querySelector(".shop-cover-desc").style.display = "none"

                    let desc = item.querySelector(".shop-desc")
                    desc.style.display = "block"
                    desc.style.fontSize = "28px"
                    desc.style.marginLeft = "auto"
                    desc.style.marginRight = "auto"
                    desc.style.marginTop = "2px"

                    let price = item.querySelector(".shop-price")
                    price.style.display = "block"
                    price.style.fontSize = "25px"
                    price.style.marginRight = "auto"
                    price.style.marginTop = "5px"
                    price.style.marginBottom = "0px"

                    const img = document.createElement("img")
                    img.src = "images/clickerfarm.png"
                    img.style.width = "100px"
                    img.style.alignSelf = "flex-start"

                    item.insertBefore(img, cover_container)
                    break
                }

                case 6: {
                    item.style.flexDirection = "row"
                    item.style.gap = "0"

                    let cover = item.querySelector(".shop-cover-container").querySelector(".shop-cover")
                    let cover_container = item.querySelector(".shop-cover-container")
                    cover.textContent = "President Clicker"
                    cover.style.marginRight = "auto"
                    cover.style.marginLeft = "auto"
                    cover.style.marginBottom = "0"
                    cover.style.fontSize = "38px"

                    cover_container.style.flexDirection = "column"
                    cover_container.style.alignItems = "flex-start"
                    cover_container.style.gap = "0px"

                    item.querySelector(".shop-cover-desc").style.display = "none"

                    let desc = item.querySelector(".shop-desc")
                    desc.style.display = "block"
                    desc.style.fontSize = "24px"
                    desc.style.marginLeft = "auto"
                    desc.style.marginRight = "auto"
                    desc.style.marginTop = "-7px"
                    desc.style.marginBottom = "0px"

                    let price = item.querySelector(".shop-price")
                    price.style.display = "block"
                    price.style.fontSize = "25px"
                    price.style.marginRight = "auto"
                    price.style.marginTop = "0px"
                    price.style.marginBottom = "0px"

                    const img = document.createElement("img")
                    img.src = "images/president.png"
                    img.style.width = "100px"
                    img.style.alignSelf = "flex-start"

                    item.insertBefore(img, cover_container)
                    break
                }

                case 7: {
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

