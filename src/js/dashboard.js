import { Api } from '../controller/Api.js';
import { CardTemplates } from '../controller/CardsTemplate.js';
import { ModalCreateProduct } from '../controller/ModalCreateProduct.js';
import { ModalEditProduct } from '../controller/ModalEditProduct.js';
import { ModalDeleteProduct } from '../controller/ModalDeleteProduct.js';
import { ModalPopUp } from '../models/ModalPopUp.js';

document.querySelector('.addProduct').addEventListener('click', () => {
    ModalCreateProduct.show();
});

if (localStorage.getItem('token')) {
    const myProducts = await Api.getPrivateProducts();
    CardTemplates.updateDashboardScreen(myProducts);
}

const sectionProducts = document.getElementById('dashContainer');
sectionProducts.addEventListener('click', (event) => {
    if (event.target.parentNode.nodeName === 'BUTTON' || event.target.nodeName === 'BUTTON') {
        checkButton(event);
    }
});

function checkButton(event) {
    if (event.target.className === 'editBtn') {
        const id = getId(event);
        ModalEditProduct.show(id);
    }
    if (event.target.className === 'removeBtn') {
        const id = getId(event);
        ModalDeleteProduct.createModalDelete(id);
    }
}

function getId(event) {
    const action = event.target.parentNode.parentNode;
    const section = action.parentNode;
    const id = section.id;
    return id;
}

document.querySelector('.iconProfile').addEventListener('click', () => {
    document.querySelector('.hoverProfile').classList.toggle('profileToggle');
});

document.querySelector('.homeBtn').addEventListener('click', () => {
    location.href = '../../index.html';
});

document.querySelector('.logOutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    ModalPopUp.modalGreen('Deslogado com sucesso!');
    setTimeout(() => (location.href = '../../index.html'), 2000);
});
