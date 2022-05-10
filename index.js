const table = document.querySelector("tbody")
const form = document.querySelector("form")
const nextButton = document.querySelector("#next")
const previousButton = document.querySelector("#previous")
const error = document.querySelector(".error")
const placeholder = document.querySelector(".placeholder")

let newItemAdded = {};
let allItems = [];

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    newItemAdded = {
        name: formData.get("item-name"),
        sellIn: +formData.get("sell-in"),
        quality: +formData.get("item-quality"),
        category: addCategory(formData.get("item-name"))
    }
    allItems.push(newItemAdded);

    const displayItem = document.createElement("tr");
    displayItem.classList.add("new-row");
    if (newItemAdded.category.includes("sulfuras")) {
        displayItem.innerHTML = `
        <td class="item-name">${newItemAdded.name}</td>
	    <td class="item-sell-in">0</td>
        <td>80</td>
	    `
        table.append(displayItem);
        form.reset()
        placeholder.remove()
        return errorMessage("")
    } else if (newItemAdded.name.includes("/")) {
        return errorMessage("** Enter a single item at a time **")
    } else if (newItemAdded.quality > 50 ||
        newItemAdded.quality < 0) {
        return errorMessage("** Quality max 50 & minimum 0 **")
    } else {
        displayItem.innerHTML = `
        <td class="item-name">${newItemAdded.name}</td>
	    <td class="sell-in">${newItemAdded.sellIn}</td>
    	<td>${newItemAdded.quality}</td>
    	`
        table.append(displayItem);
        form.reset()
        placeholder.remove()
        return errorMessage("")
    }
})


function addCategory(item) {
    if (item.includes("Aged Brie") ||
        item.includes("Aged brie") ||
        item.includes("aged brie")) {
        return "aged"
    } else if (item.includes("Backstage") ||
        item.includes("backstage")) {
        return "backstage"
    } else if (item.includes("Sulfuras") ||
        item.includes("sulfuras")) {
        return "sulfuras"
    } else if (item.includes("Conjured") ||
        item.includes("conjured")) {
        return "conjured"
    } else {
        return "none"
    }
}

function changeQuality() {
    allItems.forEach(item => {
        if (item.quality > 50) {
            return item.quality = 50
        } else if (item.quality <= 0) {
            return item.quality = 0
        } else if (item.sellIn <= 0 &&
            item.category === "none") {
            item.quality = item.quality - 2
        } else if (item.sellIn <= 5 &&
            item.category === "backstage") {
            item.quality = item.quality + 3
        } else if (item.sellIn <= 10 &&
            item.category === "backstage") {
            item.quality = item.quality + 2
        } else if (item.category === "sulfuras") {
            item.quality = 80
        } else if (item.category === "aged") {
            item.quality = item.quality + 1
        } else {
            item.quality--
        }
    })
}

function changeSellIn() {
    allItems.forEach(item => {
        const addNewItem = document.querySelector(".new-row");
        addNewItem.innerHTML = `
        <td class="item-name">${item.name}</td>
        <td class="item-sell-in">${(item.sellIn - 1)}</td>
        <td>${item.quality}</td>
        `
        item.sellIn--;
        table.append(addNewItem)
    })
}

function quality() {
    allItems.forEach(item => {
        switch (item.category) {
            case "aged":
                item.quality = item.quality + 1
                break;
            case "backstage":
                item.quality = item.quality + 1
                break;
            case "sulfuras":
                item.quality = item.quality
                break;
            case "conjured":
                item.quality = item.quality - 2
                break;
        }
    })
}

nextButton.addEventListener("click", () => {
    quality();
    changeSellIn();
    changeQuality();
})

function errorMessage(message) {
    error.style.color = "red"
    error.textContent = message
}