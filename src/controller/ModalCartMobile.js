import { CardTemplates } from './CardsTemplate.js';
import { Cart } from './Cart.js';

class ModalCartMobile {
    static show() {
        const body = document.querySelector('body');
        const bgModal = document.createElement('div');
        bgModal.classList.add('bg-modalCart');

        const modal = document.createElement('div');
        modal.classList.add('modalCart');
        modal.classList.add('fadeIn');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modalCart-header');

        const modalTitleDiv = document.createElement('div');
        modalTitleDiv.classList.add('modalCart-title');

        const divProducts = document.createElement('div');
        divProducts.classList.add('divProducts');

        const divTotalPrice = document.createElement('div');
        divTotalPrice.classList.add('divTotalPriceMobile');

        const divTotal = document.createElement('div');
        divTotal.classList.add('resumeTotalMobile');

        const pDivTotal = document.createElement('p');
        pDivTotal.innerText = 'Quantidade';
        const pDivTotal2 = document.createElement('p');
        pDivTotal2.classList.add('totalCartMobile');
        pDivTotal2.innerHTML = Cart.cartArray.length;
        divTotal.append(pDivTotal, pDivTotal2);

        const divPriceTotal = document.createElement('div');
        divPriceTotal.classList.add('resumeTotalMobile');

        const pDivPriceTotal = document.createElement('p');
        pDivPriceTotal.innerText = 'Total';
        const pDivPriceTotal2 = document.createElement('p');
        pDivPriceTotal2.classList.add('priceCartMobile');
        pDivPriceTotal2.innerText = Cart.cartArray
            .reduce((a, b) => a + b.preco, 0)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        divPriceTotal.append(pDivPriceTotal, pDivPriceTotal2);

        divTotalPrice.append(divTotal, divPriceTotal);

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-cart-plus', 'iconCart');

        const modalTitle = document.createElement('h2');
        modalTitle.innerText = 'Carrinho';

        const close = document.createElement('span');
        close.classList.add('close');
        close.innerText = 'X';

        modalTitleDiv.append(icon, modalTitle);

        modalHeader.append(modalTitleDiv, close);

        Cart.cartArray.forEach((elem) => {
            divProducts.append(CardTemplates.cartMobileTemplate(elem));
        });

        modal.append(modalHeader, divProducts, divTotalPrice);

        bgModal.appendChild(modal);

        body.appendChild(bgModal);
        setTimeout(() => modal.classList.remove('fadeIn'), 1000);
        close.addEventListener('click', () => {
            modal.classList.add('fadeOut');
            setTimeout(() => bgModal.remove(), 600);
        });
    }
    static async removeProduct(event) {
        const productId = event.currentTarget.id;

        const findProduct = Cart.cartArray.find((elem) => elem.id === productId);

        const findIndex = Cart.cartArray.findIndex((elem) => elem.id === findProduct.id);

        Cart.cartArray.splice(findIndex, 1);

        localStorage.setItem('products', JSON.stringify(Cart.cartArray));

        document.getElementById('totalPrice').innerText = Cart.sumProductsPrice();

        document.getElementById('totalProduct').innerText = Cart.cartArray.length;
    }
}
export { ModalCartMobile };
