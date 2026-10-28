function applyCapycapStyles() {
    document.getElementById("body").classList = "capycap"
    let item = document.getElementById("shop-item-capycap")
    item.querySelector(".shop-cover").style.marginBottom = "0"
    item.querySelector(".shop-cover-container").style.gap = "0"
    item.querySelector(".shop-price").style.display = "none"
    let img = item.querySelector("img")
    if (img) {
        img.src = "images/capy-cap.png"
        img.style.margin = "0"
        img.style.width = "140px"
    }
    item.querySelector(".shop-cover").textContent = "Capy Cap"
    item.querySelector(".shop-desc").style.marginTop = "0px"
    item.querySelector(".shop-desc").textContent += " (already bought)"
}

function applyPurpleStyles() {
    document.getElementById("body").classList = "purple"
    let item = document.getElementById("shop-item-purple")
    item.querySelector(".shop-cover").style.marginBottom = "0"
    item.querySelector(".shop-cover-container").style.gap = "0"
    item.querySelector(".shop-price").style.display = "none"
    let img = item.querySelector("img")
    if (img) {
        img.src = "images/purple.png"
        img.style.margin = "0"
        img.style.width = "140px"
    }
    item.querySelector(".shop-cover").textContent = "Purple Skin"
    item.querySelector(".shop-desc").style.marginTop = "0px"
    item.querySelector(".shop-desc").textContent += " (already bought)"
}

function updateCapybara() {
    let skin = localStorage.getItem("skin");
    if (skin == "capycap") {
        capybara.src = "images/capy-cap.png"
        applyCapycapStyles()
    } else if (skin == "purple") {
        capybara.src = "images/purple.png"
        applyPurpleStyles()
    }
}

capybara.addEventListener("click", (event) => {
    cps_counter++;
    clicks += units_per_click;
    capybara.classList.add("shrink")
    setTimeout(() => {
        capybara.classList.remove("shrink")
    }, 100)
    updateShop()
    updateLocalStorage()
    updateDOMItems()

    const pop = document.createElement("span")
    pop.className = "click-pop"
    pop.textContent = "+" + format(units_per_click)
    pop.style.left = event.clientX + "px"
    pop.style.top = event.clientY + "px"
    document.body.appendChild(pop)
    void pop.offsetHeight // Process change in layout
    pop.style.opacity = "0"
    pop.style.transform = "translate(-50%, -150%)"
    let remove = () => pop.remove()
    pop.addEventListener("transitionend", remove, { once: true })
    setTimeout(remove, 800)
})
