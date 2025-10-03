import { ModalPopUp } from '../models/ModalPopUp.js';
import { Api } from './Api.js';

export class ModalDeleteProduct {
    static createModalDelete(id) {
        const body = document.querySelector('body');

        const divOverflowDelete = document.createElement('div');
        divOverflowDelete.classList.add('divOverflowDelete');

        const containerModalDelete = document.createElement('div');
        containerModalDelete.classList.add('modalDelete');

        const modalTitle = document.createElement('p');
        modalTitle.id = 'modalDeleteTitle';
        modalTitle.innerText = 'Exclusão de produto';

        const closeModalDelete = document.createElement('button');
        closeModalDelete.innerText = 'X';
        closeModalDelete.id = 'buttonModalDelete';

        const modalQuestion = document.createElement('p');
        modalQuestion.innerText = 'Tem certeza que deseja excluir este produto?';
        modalQuestion.id = 'modalDeleteQuestion';

        const buttonYes = document.createElement('button');
        buttonYes.classList.add('buttonQuestion');
        buttonYes.value = true;
        buttonYes.innerText = 'Sim';

        const buttonNo = document.createElement('button');
        buttonNo.classList.add('buttonQuestion');
        buttonNo.value = false;
        buttonNo.innerText = 'Não';

        buttonYes.addEventListener('click', deleteProduct);
        async function deleteProduct() {
            await Api.deletePost(id);
            ModalPopUp.modalGreen('Produto deletado com sucesso');
            await Api.getPrivateProducts();
            body.removeChild(divOverflowDelete);
            setTimeout(() => window.location.reload(), 2500);
        }

        buttonNo.addEventListener('click', () => {
            body.removeChild(divOverflowDelete);
        });

        const headerModalDelete = document.createElement('div');
        headerModalDelete.classList.add('headerModalDelete');

        const buttonsModalDelete = document.createElement('div');
        buttonsModalDelete.classList.add('buttonsModalDelete');

        headerModalDelete.appendChild(modalTitle);
        headerModalDelete.appendChild(closeModalDelete);
        containerModalDelete.appendChild(headerModalDelete);

        containerModalDelete.appendChild(modalQuestion);

        buttonsModalDelete.appendChild(buttonYes);
        buttonsModalDelete.appendChild(buttonNo);
        containerModalDelete.appendChild(buttonsModalDelete);

        divOverflowDelete.appendChild(containerModalDelete);
        body.appendChild(divOverflowDelete);

        closeModalDelete.addEventListener('click', () => {
            body.removeChild(divOverflowDelete);
        });
    }
}
