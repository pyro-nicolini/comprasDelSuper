const itemStates = {}; // Para almacenar el estado de los ítems
const categories = {}; // Para almacenar las categorías y sus ítems
const categorySelector = document.getElementById('categorySelector');
const categoriesContainer = document.getElementById('categoriesContainer');
const activeItemsList = document.getElementById('activeItemsList');

// Función para crear un interruptor para cada ítem
function createSwitch(category, item) {
    const switchElement = document.createElement('div');
    switchElement.classList.add('switch');
    switchElement.setAttribute('data-category', category);
    switchElement.setAttribute('data-item', item);

    let isActive = false;
    itemStates[category][item] = isActive; // Inicializa el estado del ítem

    // Evento de clic en el interruptor
    switchElement.addEventListener('click', () => {
        isActive = !isActive; // Cambia el estado
        switchElement.classList.toggle('active', isActive);
        itemStates[category][item] = isActive; // Actualiza el estado
        updateSummary(); // Actualiza el resumen
    });

    return switchElement;
}

// Función para agregar una categoría al selector y al contenedor
function addCategory(category) {
    // Crear un contenedor para la nueva categoría
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('container');
    categoryContainer.innerHTML = `<h3>${category}</h3><ul id="${category}List"></ul>`;
    categoriesContainer.appendChild(categoryContainer);

    // Añadir la categoría al selector
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelector.appendChild(option);

    // Inicializar la categoría en los objetos de estado
    categories[category] = [];
    itemStates[category] = {};
}

// Función para agregar un ítem a la categoría seleccionada
function addItemToCategory(category, item) {
    if (category && item) {
        categories[category].push(item); // Añadir el ítem a la categoría

        // Crear un elemento de lista con un interruptor
        const itemListElement = document.createElement('li');
        itemListElement.textContent = item;
        const switchElement = createSwitch(category, item); // Crear el interruptor
        itemListElement.appendChild(switchElement);

        // Añadir el ítem al contenedor de la categoría
        const categoryList = document.getElementById(`${category}List`);
        categoryList.appendChild(itemListElement);
    }
}

// Función para actualizar el resumen de ítems activados
function updateSummary() {
    activeItemsList.innerHTML = ''; // Limpiar la lista anterior

    // Iterar sobre cada categoría y mostrar los ítems activados
    for (const category in itemStates) {
        const activeItems = [];

        for (const item in itemStates[category]) {
            if (itemStates[category][item]) {
                activeItems.push(item);
            }
        }

        if (activeItems.length > 0) {
            const categoryTitle = document.createElement('li');
            categoryTitle.textContent = category;
            categoryTitle.classList.add('category-title');
            activeItemsList.appendChild(categoryTitle);

            activeItems.forEach(item => {
                const listItem = document.createElement('li');
                
                // Crear un checkbox para marcar como comprado
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', function() {
                    listItem.classList.toggle('bought-item', checkbox.checked);
                });
                
                listItem.textContent = item;
                listItem.append(checkbox); // Añadir el checkbox después del texto del ítem
                activeItemsList.appendChild(listItem);
            });
        }
    }

    // Si no hay ítems activados, mostrar un mensaje
    if (activeItemsList.children.length === 0) {
        const noItems = document.createElement('li');
        noItems.textContent = 'No hay elementos activados';
        activeItemsList.appendChild(noItems);
    }
}

// Agregar una nueva categoría
document.getElementById('addCategoryBtn').addEventListener('click', () => {
    const newCategory = document.getElementById('newCategory').value.trim();
    if (newCategory && !categories[newCategory]) {
        addCategory(newCategory); // Agregar la nueva categoría
        document.getElementById('newCategory').value = ''; // Limpiar el campo de categoría
    }
});

// Agregar un nuevo ítem a la categoría seleccionada
document.getElementById('addItemBtn').addEventListener('click', () => {
    const selectedCategory = categorySelector.value;
    const newItem = document.getElementById('newItem').value.trim();
    if (selectedCategory && newItem) {
        addItemToCategory(selectedCategory, newItem); // Agregar el ítem a la categoría
        document.getElementById('newItem').value = ''; // Limpiar el campo de ítem
    }
});

addCategory('Frutas');
addItemToCategory('Frutas', 'Manzana');
addItemToCategory('Frutas', 'Kiwi');
addItemToCategory('Frutas', 'Naranjas');