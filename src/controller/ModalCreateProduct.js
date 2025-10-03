import { ModalPopUp } from '../models/ModalPopUp.js';
import { Api } from './Api.js';

class ModalCreateProduct {
    static show() {
        const body = document.querySelector('body');

        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modalCreateProduct');

        const modal = document.createElement('div');
        modal.classList.add('modalCreateProduct');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modalCreateProduct-header');

        const modalTitleDiv = document.createElement('div');
        modalTitleDiv.classList.add('modalCreateProduct-title');

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = 'Cadastro de Produto';

        const close = document.createElement('span');
        close.classList.add('close');
        close.innerText = 'X';

        const form = document.createElement('form');
        form.classList.add('formCreateProduct');

        const label = document.createElement('label');
        label.innerText = 'Nome do Produto';
        const input = document.createElement('input');
        input.required = true;
        input.placeholder = 'Digitar o nome';
        input.type = 'text';
        input.name = 'nome';

        const label2 = document.createElement('label');
        label2.innerText = 'Descrição';
        const input2 = document.createElement('input');
        input2.required = true;
        input2.placeholder = 'Digitar a descrição';
        input2.type = 'text';
        input2.name = 'descricao';

        const label3 = document.createElement('label');
        label3.innerText = 'Categorias';
        const input3 = document.createElement('input');
        input3.required = true;
        input3.type = 'hidden';
        input3.name = 'categoria';

        const divButtons = document.createElement('div');
        divButtons.classList.add('divButtons');

        const buttonCategory1 = document.createElement('span');
        buttonCategory1.classList.add('buttonCategory');
        buttonCategory1.innerText = 'Panificadora';
        buttonCategory1.addEventListener('click', () => {
            input3.value = 'Panificadora';
            ModalCreateProduct.categoryVerify();
            buttonCategory1.classList.add('activeCategory');
        });

        const buttonCategory2 = document.createElement('span');
        buttonCategory2.classList.add('buttonCategory');
        buttonCategory2.innerText = 'Frutas';
        buttonCategory2.addEventListener('click', () => {
            input3.value = 'Frutas';
            ModalCreateProduct.categoryVerify();
            buttonCategory2.classList.add('activeCategory');
        });

        const buttonCategory3 = document.createElement('span');
        buttonCategory3.classList.add('buttonCategory');
        buttonCategory3.innerText = 'Bebidas';
        buttonCategory3.addEventListener('click', () => {
            input3.value = 'Bebidas';
            ModalCreateProduct.categoryVerify();
            buttonCategory3.classList.add('activeCategory');
        });

        divButtons.append(buttonCategory1, buttonCategory2, buttonCategory3);

        const label4 = document.createElement('label');
        label4.innerText = 'Valor do Produto';
        const input4 = document.createElement('input');
        input4.placeholder = 'Digitar o valor aqui';
        input4.type = 'number';
        input4.name = 'preco';

        const label5 = document.createElement('label');
        label5.innerText = 'Link da imagem';
        const input5 = document.createElement('input');
        input5.placeholder = 'Inserir link';
        input5.type = 'text';
        input5.name = 'imagem';

        const button = document.createElement('input');
        button.type = 'submit';
        button.value = 'Cadastrar Produto';

        modalTitleDiv.append(modalTitle);

        modalHeader.append(modalTitleDiv, close);

        form.append(label, input, label2, input2, label3, divButtons, input3, label4, input4, label5, input5, button);

        modal.append(modalHeader, form);

        bgModal.appendChild(modal);

        body.appendChild(bgModal);

        close.addEventListener('click', () => {
            bgModal.remove();
        });

        form.addEventListener('submit', (event) => {
            ModalCreateProduct.submit(event);
        });
    }
    static submit(event) {
        event.preventDefault();
        const data = ModalCreateProduct.dataRecive(event);
        ModalCreateProduct.createProduct(data);
    }

    static dataRecive(event) {
        const formItens = [...event.target];
        const values = {};
        formItens.forEach((item) => {
            if (item.name) {
                values[item.name] = item.value;
            }
        });

        return values;
    }

    static async createProduct(data) {
        const { nome, preco, categoria, descricao, imagem } = data;
        if (nome && preco && categoria && descricao && imagem) {
            await Api.postNewProduct(data);
            ModalPopUp.modalGreen('Produto cadastrado com sucesso');
            setTimeout(() => window.location.reload(), 2500);
        } else {
            ModalPopUp.modalRed('Preencha todos os campos!');
        }
    }
    static categoryVerify() {
        const buttons = document.querySelectorAll('.buttonCategory');
        buttons.forEach((button) => {
            button.classList.remove('activeCategory');
        });
    }
}

export { ModalCreateProduct };
