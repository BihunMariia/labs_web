import {
    addItemToPage,
    renderItemsList,
    editItem,
} from "./dom_util.js"

const clearButton = document.getElementById("clear_button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search_button");
const calculateButton = document.getElementById("calculate_button");
const resultPlace = document.getElementById("result");
const sortZoos = document.getElementById("sort_button");
const tab1 = document.getElementById("tab-1");
const tab2 = document.getElementById("tab-2");
const formHeader = document.getElementById("form-header");
const id = document.getElementById("id");
const nameInput = document.getElementById("name_input");
const amountOfAnimalsInput = document.getElementById("amount_of_animals_input");
const visitorsPerYearInput = document.getElementById("visitors_per_year_input");






const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(tabLink => {
    tabLink.addEventListener('click', () => {
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        });

        const tabId = tabLink.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        tabContent.classList.add('active');
    });
});


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


function validateForm() {
    if (!document.getElementById('create_zoo').checkValidity()) {
        alert('Please fill in appropriate data.');
        return false;
    }
    return true;
}

document.getElementById('create_zoo').addEventListener('submit', function (event) {
    if (!validateForm()) {
        return;
    }
    event.preventDefault();

    const id = document.getElementById('id').innerHTML;
    const name = document.getElementById('name_input').value;
    const animals = parseInt(document.getElementById('amount_of_animals_input').value);
    const visitors = document.getElementById('visitors_per_year_input').value;

    if (id === "") {
        const object = { id: zoos.length + 1, name: name, animals: animals, visitors: visitors };
        addItemToPage(object);
    } else {
        const itemId = id.replace("item-", "");
        const object = { id: itemId, name: name, animals: animals, visitors: visitors };
        editItem(object);
    }

    const editButtons = document.getElementsByClassName("edit_button");
    Array.prototype.forEach.call(editButtons, function (el) {
        el.addEventListener("click", () => {
            tab1.classList.remove('active');
            tab2.classList.add('active');
            formHeader.textContent = "Edit zoo";
            id.textContent = el.getAttribute("a");
            nameInput.value = el.getAttribute("b");
            amountOfAnimalsInput.value = el.getAttribute("c");
            visitorsPerYearInput.value = el.getAttribute("d");
        });
    });

    const form = document.getElementById('create_zoo');
    form.reset();
    tab2.classList.remove('active');
    tab1.classList.add('active');
    formHeader.textContent = "Create zoo";
    id.textContent = "";
    nameInput.value = "";
    amountOfAnimalsInput.value = "";
    visitorsPerYearInput.value = "";
});



const editButtons = document.getElementsByClassName("edit_button");
Array.prototype.forEach.call(editButtons, function (el) {
    el.addEventListener("click", () => {
        tab1.classList.remove('active');
        tab2.classList.add('active');
        formHeader.textContent = "Edit zoo";
        id.textContent = el.getAttribute("a");
        nameInput.value = el.getAttribute("b");
        amountOfAnimalsInput.value = el.getAttribute("c");
        visitorsPerYearInput.value = el.getAttribute("d");
    });
});
