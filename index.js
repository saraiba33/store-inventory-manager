const form = document.querySelector("form")
const table = document.querySelector("table")

function getInput(inputs) {
    form.addEventListener("submit", event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const itemName = formData.get("item-name")
        const sellIn = formData.get("sell-in")
        const quality = formData.get("quality")
        const date = formData.get("date")


        localStorage.setItem("item-name", itemName)
        localStorage.setItem("sell-in", sellIn)
        localStorage.setItem("quality", quality)
        localStorage.setItem("date", date)
    })

}

function addInputsToList(item, sell, quality, date) {
    const tr = document.createElement("tr")
    const createTr = `
    <td>${item}</td>
    <td>${sell}</td>
    <td>${quality}</td>
    <td>${date}</td>
    
    `

    tr.innerHTML = createTr
    table.append(tr)
}

function getItem(listItems) {
    const itemName = localStorage.getItem("item-name")
    addInputsToList(itemName)

    console.log(itemName)
}