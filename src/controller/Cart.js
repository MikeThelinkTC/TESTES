import { Api } from './Api.js';

class Cart {
    static cartArray = JSON.parse(localStorage.getItem('products')) || [];

    static getId(event) {
        const target = event.target;
        const targetName = target.className;
        if (targetName === 'fa-solid fa-cart-plus') {
            const price = target.parentNode.parentNode;
            const productSection = price.parentNode;
            const id = productSection.id;
            return id;
        } else if (targetName === 'productAddBtn') {
            const productSection = target.parentNode.parentNode;
            const id = productSection.id;
            return id;
        }
    }

    static async getOnePublicProduct(id) {
        const products = await Api.getPublicProducts();

        const selected = products.find((product) => product.id == id);

        return selected;
    }

    static sumProductsPrice() {
        if (localStorage.getItem('products')) {
            let response = JSON.parse(localStorage.getItem('products'))
                .reduce((a, b) => a + b.preco, 0)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
            return response;
        } else {
            return 0;
        }
    }
}

export { Cart };
