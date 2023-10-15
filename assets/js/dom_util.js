const itemsContainer = document.getElementById("items_container");

const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, name, animals, visitors, image }) => `
<li id="${getItemId(id)}" class="card">
    <div class = "card_info">
        <h2 class="card_name">${name}</h2>
        <h2 class="card_amount_of_animals">${animals}</h2>
        <h2 class="card_visitors_per_year">${visitors}</h2>
        <img class="card_zoo_image" src="./assets/images/image.jpg"></img>
    </div>    
</li>`;


export const addItemToPage = ({ id, name, animals, visitors }) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, name, animals, visitors })
    );
};


export const renderItemsList = (zoos) => {
    itemsContainer.innerHTML = "";

    for (const zoo of zoos) {
        addItemToPage(zoo);
    }
};
