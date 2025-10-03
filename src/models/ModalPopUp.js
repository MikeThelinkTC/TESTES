class ModalPopUp {
    static modalGreen(content) {
        const body = document.querySelector('body');
        const caontainerModal = document.createElement('div');
        caontainerModal.classList.add('containerModalPopUp');
        const modal = document.createElement('div');
        modal.classList.add('modalPopUp');
        const headerModal = document.createElement('div');
        headerModal.classList.add('headerModalPopUp');
        const titleModal = document.createElement('h1');
        const contents = document.createElement('span');
        contents.innerText = content;

        titleModal.innerText = 'Status';
        const load = document.createElement('div');
        load.classList.add('loadGreen');
        headerModal.appendChild(titleModal);
        modal.append(headerModal, contents, load);
        caontainerModal.append(modal);
        body.append(caontainerModal);
        load.addEventListener('animationend', (event) => {
            if (event.animationName === 'load') {
                this.modalClose();
            }
        });
    }
    static modalRed(content) {
        const body = document.querySelector('body');
        const caontainerModal = document.createElement('div');
        caontainerModal.classList.add('containerModalPopUp');
        const modal = document.createElement('div');
        modal.classList.add('modalPopUp');
        const headerModal = document.createElement('div');
        headerModal.classList.add('headerModalPopUp');
        const titleModal = document.createElement('h1');
        const contents = document.createElement('span');
        contents.innerText = content;

        titleModal.innerText = 'Status';
        const load = document.createElement('div');
        load.classList.add('loadRed');
        headerModal.appendChild(titleModal);
        modal.append(headerModal, contents, load);
        caontainerModal.append(modal);
        body.append(caontainerModal);
        load.addEventListener('animationend', (event) => {
            if (event.animationName === 'load') {
                this.modalClose();
            }
        });
    }
    static modalClose() {
        const containerModal = document.querySelector('.containerModalPopUp');
        containerModal.classList.add('modalClose');

        containerModal.addEventListener('animationend', (event) => {
            if (event.animationName === 'modalClose') {
                containerModal.remove();
            }
        });
    }
}
export { ModalPopUp };
