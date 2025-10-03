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

        // Nome do Produto
        const label = document.createElement('label');
        label.setAttribute('for', 'nomeProduto');
        label.innerText = 'Nome do Produto';
        const input = document.createElement('input');
        input.required = true;
        input.placeholder = 'Digitar o nome';
        input.type = 'text';
        input.name = 'nome';
        input.id = 'nomeProduto';
        input.setAttribute('aria-label', 'Nome do produto');

        // Descrição do Produto
        const label2 = document.createElement('label');
        label2.setAttribute('for', 'descricaoProduto');
        label2.innerText = 'Descrição';
        const input2 = document.createElement('input');
        input2.required = true;
        input2.placeholder = 'Digitar a descrição';
        input2.type = 'text';
        input2.name = 'descricao';
        input2.id = 'descricaoProduto';
        input2.setAttribute('aria-label', 'Descrição do produto');

        // Categorias
        const label3 = document.createElement('label');
        label3.innerText = 'Categorias';
        const selectCategory = document.createElement('select');
        selectCategory.required = true;
        selectCategory.name = 'categoria';

        const option1 = document.createElement('option');
        option1.value = 'Panificadora';
        option1.innerText = 'Panificadora';

        const option2 = document.createElement('option');
        option2.value = 'Frutas';
        option2.innerText = 'Frutas';

        const option3 = document.createElement('option');
        option3.value = 'Bebidas';
        option3.innerText = 'Bebidas';

        selectCategory.append(option1, option2, option3);

        // Preço do Produto
        const label4 = document.createElement('label');
        label4.innerText = 'Valor do Produto';
        const input4 = document.createElement('input');
        input4.placeholder = 'Digitar o valor aqui';
        input4.type = 'number';
        input4.name = 'preco';

        // Link da Imagem
        const label5 = document.createElement('label');
        label5.innerText = 'Link da imagem';
        const input5 = document.createElement('input');
        input5.placeholder = 'Inserir link';
        input5.type = 'text';
        input5.name = 'imagem';

        // Botão de Cadastro
        const button = document.createElement('input');
        button.type = 'submit';
        button.value = 'Cadastrar Produto';

        // Adicionando os elementos ao modal
        modalTitleDiv.append(modalTitle);
        modalHeader.append(modalTitleDiv, close);
        form.append(label, input, label2, input2, label3, selectCategory, label4, input4, label5, input5, button);
        modal.append(modalHeader, form);
        bgModal.appendChild(modal);
        body.appendChild(bgModal);

        // Fechar modal ao clicar no 'X'
        close.addEventListener('click', () => {
            bgModal.remove();
        });

        // Submissão do formulário
        form.addEventListener('submit', (event) => {
            ModalCreateProduct.submit(event);
        });
    }

    static submit(event) {
        event.preventDefault();
        const data = ModalCreateProduct.dataRecive(event);

        // Validação dos dados antes de enviar
        const validationResult = ModalCreateProduct.validateData(data);
        if (validationResult) {
            ModalCreateProduct.createProduct(data);
        } else {
            ModalPopUp.modalRed('Preencha todos os campos corretamente!');
        }
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

    static validateData(data) {
        const { nome, preco, categoria, descricao, imagem } = data;

        // Verifica se todos os campos estão preenchidos
        if (!nome || !descricao || !categoria || !preco || !imagem) {
            return false;
        }

        // Verifica se o preço é um valor numérico positivo
        if (isNaN(preco) || parseFloat(preco) <= 0) {
            return false;
        }

        // Verifica se o link da imagem é uma URL válida
        try {
            new URL(imagem);
        } catch (_) {
            return false; // Caso a URL não seja válida
        }

        return true; // Tudo está válido
    }

    static async createProduct(data) {
        const { nome, preco, categoria, descricao, imagem } = data;
        if (nome && preco && categoria && descricao && imagem) {
            await Api.postNewProduct(data);
            ModalPopUp.modalGreen('Produto cadastrado com sucesso');
            
            // Fechar o modal após o sucesso
            const bgModal = document.querySelector('.bg-modalCreateProduct');
            bgModal.remove();

            setTimeout(() => window.location.reload(), 2500); // Recarga da página após o delay
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
