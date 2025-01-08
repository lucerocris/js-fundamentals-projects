//DOM Elements
const itemForm = document.getElementById('item-form');
const itemInput = itemForm.querySelector('input');
const itemList = document.getElementById('item-list');
const items = itemList.querySelectorAll('li');
const inputFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const addItem = itemForm.querySelector('button');
let editMode = false;

// EventListener

function init() {
  itemForm.addEventListener('submit', onAddItem);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', onClear);
  document.addEventListener('DOMContentLoaded', displayItems);
  inputFilter.addEventListener('input', filterItems);
  resetUI();
}

// Dispay Items from Storage

function displayItems() {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addElementToDOM(item));
  resetUI();
}

// ADDING ITEMS

function onAddItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an Item');
    return;
  }

  if (editMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textcontent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    editMode = false;
  }

  addElementToDOM(newItem);
  addItemsToStorage(newItem);

  itemInput.value = '';
  resetUI();
}

function addElementToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.classList = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.classList = classes;
  return icon;
}

// REMOVING ITEMS

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function removeItem(item) {
  if (confirm('Are you Sure?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    resetUI();
  }
}

// Clear Items

function onClear() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');
  resetUI();
}

// Reset UI

function resetUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    inputFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    inputFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }

    addItem.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    addItem.style.backgroundColor = '#333';
    editMode = false;
}

// LOCAL STORAGE

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function addItemsToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// FILTER ITEMS

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Set Item to Edit Mode

function setItemToEdit(item) {
  editMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');

  addItem.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  addItem.style.backgroundColor = 'green';

  itemInput.value = item.textContent;
}
init();
