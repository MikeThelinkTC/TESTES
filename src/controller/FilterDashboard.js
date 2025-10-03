import { Api } from './Api.js';
import { CardTemplates } from '../controller/CardsTemplate.js';

export class FilterDashboard {
    static dashContainer = document.getElementById('dashContainer');

    static async searchBarDashboard(wordKey) {
        const privateProducts = await Api.getPrivateProducts();
        const listSearchCategory = privateProducts.filter((elem) =>
            elem.categoria.toLowerCase().includes(wordKey.toLowerCase())
        );
        const listSearchName = privateProducts.filter((elem) =>
            elem.nome.toLowerCase().includes(wordKey.toLowerCase())
        );
        const productsFound = [...listSearchCategory, ...listSearchName];

        this.dashContainer.innerHTML = '';

        productsFound.forEach((elem) => {
            CardTemplates.dashboardTemplate(elem);
        });
    }

    static async filterTodosDashboard() {
        const privateProducts = await Api.getPrivateProducts();
        const listTodos = privateProducts.filter((elem) => elem);
        this.dashContainer.innerHTML = '';
        listTodos.forEach((elem) => CardTemplates.dashboardTemplate(elem));
    }

    static async filterPanificadoraDashboard() {
        const privateProducts = await Api.getPrivateProducts();
        const listPanificadora = privateProducts.filter((elem) => elem.categoria === 'Panificadora');
        this.dashContainer.innerHTML = '';
        listPanificadora.forEach((elem) => CardTemplates.dashboardTemplate(elem));
    }

    static async filterFrutasDashboard() {
        const privateProducts = await Api.getPrivateProducts();
        const listFrutas = privateProducts.filter((elem) => elem.categoria === 'Frutas');
        this.dashContainer.innerHTML = '';
        listFrutas.forEach((elem) => CardTemplates.dashboardTemplate(elem));
    }

    static async filterBebidasDashboard() {
        const privateProducts = await Api.getPrivateProducts();
        const listBebidas = privateProducts.filter((elem) => elem.categoria === 'Bebidas');
        this.dashContainer.innerHTML = '';
        listBebidas.forEach((elem) => CardTemplates.dashboardTemplate(elem));
    }
}

const searchDashboard = document.getElementById('searchDashboard');

document.getElementById('todosDashboard').addEventListener('click', () => {
    document.getElementById('todosDashboard').classList.add('navigationSelected');
    FilterDashboard.filterTodosDashboard();
});

document.getElementById('panificadoraDashboard').addEventListener('click', () => {
    document.getElementById('panificadoraDashboard').classList.add('navigationSelected');
    FilterDashboard.filterPanificadoraDashboard();
});

document.getElementById('frutasDashboard').addEventListener('click', () => {
    document.getElementById('frutasDashboard').classList.add('navigationSelected');
    FilterDashboard.filterFrutasDashboard();
});

document.getElementById('bebidasDashboard').addEventListener('click', () => {
    document.getElementById('bebidasDashboard').classList.add('navigationSelected');
    FilterDashboard.filterBebidasDashboard();
});

searchDashboard.addEventListener('keyup', () => {
    if (!searchDashboard.value) {
        FilterDashboard.filterTodosDashboard();
    } else {
        FilterDashboard.searchBarDashboard(searchDashboard.value);
    }
});
