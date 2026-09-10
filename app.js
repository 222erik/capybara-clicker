capybara = document.getElementById("capybara")
clicks = document.getElementById("capy-clicks-indicator")

capybara.addEventListener("click", () => {
    clicks.innerText = parseInt(clicks.innerText) + 1
    capybara.classList.add("shrink")
    setTimeout(() => capybara.classList.remove("shrink"), 100)
})
