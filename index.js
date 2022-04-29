const form = document.querySelector("form")
const table = document.querySelector("table")
const clear = document.querySelector(".clear-button")
const nextDayButton = document.querySelector(".next-day")
const previousDayButton = document.querySelector(".previous-day")
const placeholder = document.querySelector(".placeholder")


function getInput() {
    form.addEventListener("submit", event => {
        event.preventDefault()
        location.reload();
        const formData = new FormData(event.target)
        const itemName = formData.get("item-name")
        const sellIn = formData.get("sell-in")
        const quality = formData.get("quality")
        const date = formData.get("date")
        const newItemInfoAdded = {
            item: itemName,
            sellIn: sellIn,
            quality: quality,
            date: date
        }
        const encodedItems = localStorage.getItem("allItemsAdded");
        const allItemsAdded = encodedItems ? JSON.parse(encodedItems).allItemsAdded : []
        allItemsAdded.push(newItemInfoAdded)
        const itemsJSON = JSON.stringify({ allItemsAdded })
        localStorage.setItem("allItemsAdded", itemsJSON)
    })

}
getInput()

const encodedItems = localStorage.getItem("allItemsAdded");
if (encodedItems) {
    const parsedItems = JSON.parse(encodedItems)
    const { allItemsAdded } = parsedItems
    allItemsAdded.map((items) => {
        const createTr = document.createElement("tr")
        createTr.classList.add("added-rows")
        if (items.item.toLowerCase().includes("Sulfuras")) {
            createTr.innerHTML = `
            <td>${items.item}</td>
            <td class="sell-in-days">N/A</td>
            <td class="item-quality">80</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("")
        } else if (items.item.includes("sulfuras")) {
            createTr.innerHTML = `
            <td>${items.item}</td>
            <td class="sell-in-days">N/A</td>
            <td class="item-quality">80</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("")
        } else if (items.item.includes("/")) {
            return errorMessage("** You can not add more than one item at a time **")
        } else if (items.quality > 50) {
            createTr.innerHTML = `
            <td>${items.item}</td>
            <td class="sell-in-days"> Sell in ${items.sellIn} days</td>
            <td class="item-quality">50</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("** Quality max is 50 **")
        } else {
            createTr.innerHTML = `
            <td>${items.item}</td>
            <td class="sell-in-days">Sell in ${items.sellIn} days</td>
            <td class="item-quality">${items.quality}</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("")
        }
    })
}


nextDayButton.addEventListener("click", () => {

})

function changeSellInAndQuality() {

}



clear.addEventListener("click", () => {
    localStorage.clear()
    location.reload();
})

function errorMessage(message) {
    const error = document.querySelector(".error")
    error.style.color = "red"
    error.textContent = message
}