import {
    addItemToPage,
    renderItemsList
} from "./dom_util.js"

const clearButton = document.getElementById("clear_button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search_button");
const calculateButton = document.getElementById("calculate_button");
const resultPlace = document.getElementById("result");
const sortZoos = document.getElementById("sort_button");

let zoos = [
    { id: 1, name: "Loro Parque", animals: 4000, visitors: 500000 },
    { id: 2, name: "Chester Zoo", animals: 2000, visitors: 450000 },
    { id: 3, name: "Biopark", animals: 2500, visitors: 300000 }
];

zoos.forEach(zoo => addItemToPage(zoo));

searchButton.addEventListener("click", () => {
    const search_zoos_by_name = zoos.filter(zoo => zoo.name.search(searchInput.value) !== -1);

    renderItemsList(search_zoos_by_name);
})

clearButton.addEventListener("click", () => {
    renderItemsList(zoos);

    searchInput.value = "";
})


function calculateTotalVisitors(zoos) {
    let totalVisitors = 0;
    for (let i = 0; i < zoos.length; i++) {
        totalVisitors += zoos[i].visitors;
    }
    return totalVisitors;
}

calculateButton.addEventListener("click", () => {
    let totalVisitors = calculateTotalVisitors(zoos);
    resultPlace.textContent = totalVisitors;
});

sortZoos.addEventListener("click", () => {
    zoos.sort((a, b) => a.animals - b.animals);
    renderItemsList(zoos);
});

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    const filteredZoos = zoos.filter(zoo => zoo.name.toLowerCase().includes(searchValue));
    renderItemsList(filteredZoos);
});

clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchInput.value = "";
    renderItemsList(zoos);
});