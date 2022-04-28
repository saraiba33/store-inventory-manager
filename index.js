const form = document.querySelector("form")
const table = document.querySelector("table")
const clear = document.querySelector(".clear-button")
const nextDayButton = document.querySelector(".next-day")
const previousDayButton = document.querySelector(".previous-day")

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
        if (items.item.includes("Sulfuras")) {
            createTr.innerHTML = `
        <td>${items.item}</td>
        <td class="sell-in-days">N/A</td>
        <td class="item-quality">80</td>
        `
            table.append(createTr)
        } else {
            createTr.innerHTML = `
        <td>${items.item}</td>
        <td class="sell-in-days">Sell in ${items.sellIn} days</td>
        <td class="item-quality">${items.quality}</td>
        `
            table.append(createTr)
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