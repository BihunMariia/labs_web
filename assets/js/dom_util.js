const itemsContainer = document.getElementById("items_container");

const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, name, animals, visitors, image }) => `
<li id="${getItemId(id)}" class="card">
    <div class="card_info">
        <h2 class="card_name">${name}</h2>
        <h2 class="card_amount_of_animals">${animals}</h2>
        <h2 class="card_visitors_per_year">${visitors}</h2>
        <img class="card_zoo_image" src="./assets/images/image.jpg"></img>
        <button class="edit_button" a="${getItemId(id)}" b="${name}" c="${animals}" d="${visitors}">Edit</button>
    </div>    
</li>`;

export const addItemToPage = ({ id, name, animals, visitors }) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, name, animals, visitors })
    );
};

export const editItem = ({ id, name, animals, visitors }) => {
    const card = document.getElementById(getItemId(id));
    if (card) {
        const nameElement = card.querySelector('.card_name');
        const animalsElement = card.querySelector('.card_amount_of_animals');
        const visitorsElement = card.querySelector('.card_visitors_per_year');
        const editButton = card.querySelector('.edit_button');

        if (nameElement) {
            nameElement.textContent = name;
            editButton.setAttribute("b", name);
        }

        if (animalsElement) {
            animalsElement.textContent = animals;
            editButton.setAttribute("c", animals);
        }

        if (visitorsElement) {
            visitorsElement.textContent = visitors;
            editButton.setAttribute("d", visitors);
        }
    }
}


export const renderItemsList = (zoos) => {
    itemsContainer.innerHTML = "";

    for (const zoo of zoos) {
        addItemToPage(zoo);
    }
};
