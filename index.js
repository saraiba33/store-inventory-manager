const form = document.querySelector("form")
const table = document.querySelector("table")
const clear = document.querySelector(".clear-button")


let stock = [{
    item: "Dexterity Vest",
    sellIn: 10,
    quality: 20,
    catagory: "none"
}, {
    item: "Aged Brie",
    sellIn: 2,
    quality: 0,
    catagory: "aged Brie"
}, {
    item: "Elixir of the Mongoose",
    sellIn: 5,
    quality: 7,
    catagory: "none"
}, {
    item: "Sulfuras",
    sellIn: 0,
    quality: 80,
    catagory: "sulfuras"
}, {
    item: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 15,
    quality: 20,
    catagory: "backstage pass"
}, ]


stock.map(item => {
    const tr = document.createElement("tr")
    tr.classList.add("preset-rows")
    tr.innerHTML = `
    <td>${item.item}</td>
    <td>Sell in ${item.sellIn} days</td>
    <td>${item.quality}</td>
    `
    table.append(tr)
})

const encodedItems = localStorage.getItem("allItemsAdded");
if (encodedItems) {
    const parsedItems = JSON.parse(encodedItems)
    const { allItemsAdded } = parsedItems
    allItemsAdded.map((items) => {
        const createTr = document.createElement("tr")
        createTr.classList.add("added-rows")
        createTr.innerHTML = `
        <td>${items.item}</td>
        <td>Sell in ${items.sellIn} days</td>
        <td>${items.quality}</td>
        <td>${items.date}</td>
        `
        table.append(createTr)

    })
}

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

clear.addEventListener("click", () => {
    localStorage.clear()
    location.reload();
})