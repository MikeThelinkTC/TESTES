import { Api } from './Api.js';
import { CardTemplates } from '../controller/CardsTemplate.js';

export class Filter {
    static container = document.getElementById('container');

    static async filterTodos() {
        const publicProducts = await Api.getPublicProducts();
        const listTodos = publicProducts.filter((elem) => elem);
        this.container.innerHTML = '';
        listTodos.forEach((elem) => CardTemplates.productsTemplate(elem));
    }

    static async filterFrutas() {
        const publicProducts = await Api.getPublicProducts();
        const listFruits = publicProducts.filter((elem) => elem.categoria === 'Frutas');
        this.container.innerHTML = '';
        listFruits.forEach((elem) => CardTemplates.productsTemplate(elem));
    }

    static async filterPanificadora() {
        const publicProducts = await Api.getPublicProducts();
        const listPanificadora = publicProducts.filter((elem) => elem.categoria === 'Panificadora');
        this.container.innerHTML = '';
        listPanificadora.forEach((elem) => CardTemplates.productsTemplate(elem));
    }

    static async filterBebidas() {
        const publicProducts = await Api.getPublicProducts();
        const listBebidas = publicProducts.filter((elem) => elem.categoria === 'Bebidas');
        this.container.innerHTML = '';
        listBebidas.forEach((elem) => CardTemplates.productsTemplate(elem));
    }

    static async searchBar(wordKey) {
        const publicProducts = await Api.getPublicProducts();
        const listSearchCategory = publicProducts.filter((elem) =>
            elem.categoria.toLowerCase().includes(wordKey.toLowerCase())
        );
        const listSearchName = publicProducts.filter((elem) => elem.nome.toLowerCase().includes(wordKey.toLowerCase()));
        const productsFound = [...listSearchCategory, ...listSearchName];

        Filter.container.innerHTML = '';

        productsFound.forEach((elem) => {
            CardTemplates.productsTemplate(elem);
        });
    }

    static categoryVerify() {
        const buttons = document.querySelectorAll('.btnCategory');
        buttons.forEach((button) => {
            button.classList.remove('navigationSelected');
        });
    }
}

const searchBarWord = document.getElementById('search-bar');

document.getElementById('todos').addEventListener('click', () => {
    Filter.categoryVerify();
    document.getElementById('todos').classList.add('navigationSelected');
    Filter.filterTodos();
});

document.getElementById('panificadora').addEventListener('click', () => {
    Filter.categoryVerify();
    document.getElementById('panificadora').classList.add('navigationSelected');
    Filter.filterPanificadora();
});

document.getElementById('frutas').addEventListener('click', () => {
    Filter.categoryVerify();
    document.getElementById('frutas').classList.add('navigationSelected');
    Filter.filterFrutas();
});

document.getElementById('bebidas').addEventListener('click', () => {
    Filter.categoryVerify();
    document.getElementById('bebidas').classList.add('navigationSelected');
    Filter.filterBebidas();
});

searchBarWord.addEventListener('keyup', () => {
    Filter.searchBar(searchBarWord.value);
});
