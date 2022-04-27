const form = document.querySelector("form")
const table = document.querySelector("table")




const encodedItems = localStorage.getItem("allItemsAdded");
if (encodedItems) {
    const parsedItems = JSON.parse(encodedItems)
    const { allItemsAdded } = parsedItems
    allItemsAdded.map((items) => {
        const createTr = document.createElement("tr")
        createTr.classList.add("added-rows")
        createTr.innerHTML = `
        <td>${items.item}</td>
        <td>${items.sellIn}</td>
        <td>${items.quality}</td>
        <td>${items.date}</td>
        `
        table.append(createTr)
    })
}


function getInput() {
    form.addEventListener("submit", event => {
        event.preventDefault()
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