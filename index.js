const form = document.querySelector("form")
const table = document.querySelector("table")
const clear = document.querySelector(".clear-button")
const nextDayButton = document.querySelector(".next-day")
const previousDayButton = document.querySelector(".previous-day")
const placeholder = document.querySelector(".placeholder")
const error = document.querySelector(".error")


function getInput() {
    form.addEventListener("submit", event => {
        event.preventDefault()
        location.reload();
        const formData = new FormData(event.target)
        const item = formData.get("item-name")
        const sellIn = +formData.get("sell-in")
        const quality = +formData.get("quality")
        const category = getCategory(formData.get("item-name"))
        const newItemInfoAdded = {
            item,
            sellIn,
            quality,
            category,
        }
        const encodedItem = localStorage.getItem("itemAdded");
        const itemAdded = encodedItem ? JSON.parse(encodedItem).itemAdded : []
        itemAdded.push(newItemInfoAdded)
        const itemJSON = JSON.stringify({ itemAdded })
        localStorage.setItem("itemAdded", itemJSON)
    })

}
getInput()

const encodedItem = localStorage.getItem("itemAdded");
if (encodedItem) {
    const parsedItem = JSON.parse(encodedItem)
    const { itemAdded } = parsedItem
    itemAdded.map((input) => {
        const createTr = document.createElement("tr")
        createTr.classList.add("added-rows")
        if (input.item.includes("Sulfuras") || input.item.includes("sulfuras")) {
            createTr.innerHTML = `
            <td>${input.item}</td>
            <td class="sell-in-days">N/A</td>
            <td class="item-quality">80</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("")
        } else if (input.item.includes("/")) {
            return errorMessage("** You can not add more than one item at a time **")
        } else if (input.quality > 50 && input.sellIn < 0 || input.quality > 50 || input.sellIn < 0) {
            return errorMessage("** Quality max is 50 and Sell in minimum is 0 **")
        } else {
            createTr.innerHTML = `
            <td>${input.item}</td>
            <td class="sell-in-days">Sell in ${input.sellIn} days</td>
            <td class="item-quality">${input.quality}</td>
            `
            table.append(createTr)
            placeholder.remove()
            return errorMessage("")
        }
    })
}

function getCategory(itemName) {
    if (itemName.includes("Aged Brie") || itemName.includes("aged brie")) {
        return "aged"
    } else if (itemName.includes("Sulfuras") || itemName.includes("sulfuras")) {
        return "sulfuras"
    } else if (itemName.includes("Conjured") || itemName.includes("conjured")) {
        return "conjured"
    } else if (itemName.includes("Backstage Passes") || itemName.includes("backstage passes")) {
        return "backstage"
    } else
        return "none"
}

clear.addEventListener("click", () => {
    localStorage.clear()
    location.reload();
})

function errorMessage(message) {
    error.style.color = "red"
    error.textContent = message
}