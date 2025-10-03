import { Api } from './Api.js';
import { ModalPopUp } from '../models/ModalPopUp.js';
class ModalAuth {
    static login() {
        const body = document.querySelector('body');
        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modalLogin');

        const modal = document.createElement('div');
        modal.classList.add('modalLogin');
        modal.classList.add('fadeIn');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modalLogin-header');

        const modalTitleDiv = document.createElement('div');
        modalTitleDiv.classList.add('modalLogin-title');

        const icon = document.createElement('span');
        icon.classList.add('material-symbols-rounded');
        icon.innerText = 'person';

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = 'Login';

        const close = document.createElement('span');
        close.classList.add('close');
        close.innerText = 'X';

        const form = document.createElement('form');
        form.classList.add('formLogin');

        const label = document.createElement('label');
        label.innerText = 'Email';

        const input = document.createElement('input');
        input.type = 'email';
        input.name = 'email';
        input.placeholder = 'Insira um email valido';

        const label2 = document.createElement('label');
        label2.innerText = 'Senha';

        const input2 = document.createElement('input');
        input2.type = 'password';
        input2.name = 'password';
        input2.placeholder = 'Insira sua senha';

        const button = document.createElement('input');
        button.type = 'submit';
        button.value = 'Login';

        modalTitleDiv.append(icon, modalTitle);

        modalHeader.append(modalTitleDiv, close);

        form.append(label, input, label2, input2, button);

        modal.append(modalHeader, form);

        bgModal.appendChild(modal);

        body.appendChild(bgModal);
        setTimeout(() => modal.classList.remove('fadeIn'), 1000);
        close.addEventListener('click', () => {
            modal.classList.add('fadeOut');
            setTimeout(() => bgModal.remove(), 600);
        });
        form.addEventListener('submit', (event) => {
            ModalAuth.user(event, 'login');
        });
    }

    static register() {
        const body = document.querySelector('body');

        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modalRegister');

        const modal = document.createElement('div');
        modal.classList.add('modalRegister');
        modal.classList.add('fadeIn');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modalRegister-header');

        const modalTitleDiv = document.createElement('div');
        modalTitleDiv.classList.add('modalRegister-title');

        const icon = document.createElement('span');
        icon.classList.add('material-symbols-rounded');
        icon.innerText = 'person_add';

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = 'Cadastro';

        const close = document.createElement('span');
        close.classList.add('close');
        close.innerText = 'X';

        const form = document.createElement('form');
        form.classList.add('formRegister');

        const label = document.createElement('label');
        label.innerText = 'Email';

        const input = document.createElement('input');
        input.type = 'email';
        input.name = 'email';
        input.placeholder = 'Insira um email valido';

        const label2 = document.createElement('label');
        label2.innerText = 'Senha';

        const input2 = document.createElement('input');
        input2.type = 'password';
        input2.name = 'password';
        input2.placeholder = 'Insira sua senha';

        const label3 = document.createElement('label');
        label3.innerText = 'Nome';

        const input3 = document.createElement('input');
        input3.type = 'text';
        input3.name = 'name';
        input3.placeholder = 'Insira seu nome';

        const button = document.createElement('input');
        button.type = 'submit';
        button.value = 'Cadastrar';

        modalTitleDiv.append(icon, modalTitle);

        modalHeader.append(modalTitleDiv, close);

        form.append(label3, input3, label, input, label2, input2, button);

        modal.append(modalHeader, form);

        bgModal.appendChild(modal);

        body.appendChild(bgModal);

        setTimeout(() => modal.classList.remove('fadeIn'), 1000);

        close.addEventListener('click', () => {
            modal.classList.add('fadeOut');
            setTimeout(() => bgModal.remove(), 600);
        });

        form.addEventListener('submit', (event) => {
            ModalAuth.user(event, 'register');
        });
    }
    static user(event, method) {
        event.preventDefault();
        const data = ModalAuth.dataRecive(event);
        if (method === 'login') {
            ModalAuth.checkLogin(data);
        } else {
            ModalAuth.checkRegister(data);
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
    static async checkLogin(data) {
        const response = await Api.loginUser(data);
        if (response.error) {
            const modalLogin = document.querySelector('.modalLogin');
            modalLogin.classList.add('loginFail');
            setTimeout(() => modalLogin.classList.remove('loginFail'), 2000);
            ModalPopUp.modalRed('Email ou senha incorretos');
        } else if (localStorage.getItem('token')) {
            ModalPopUp.modalGreen('Login realizado com sucesso');
            setTimeout(() => {
                window.location.reload();
            }, 2300);
        }
    }
    static async checkRegister(data) {
        if (data.name && data.email && data.password) {
            await Api.registerUser(data);
            ModalPopUp.modalGreen('Cadastro realizado com sucesso');
            setTimeout(() => {
                document.querySelector('.bg-modalRegister').remove();
                ModalAuth.login();
            }, 2000);
        } else {
            ModalPopUp.modalRed('Preencha todos os campos');
        }
    }
}

export { ModalAuth };
