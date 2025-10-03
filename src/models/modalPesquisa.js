export class Modal{
    static criarModal(){
        const containerModalSearch = document.createElement('section');
        containerModalSearch.classList.add('modalPesquisa');
        containerModalSearch.id = "searchBarDashboard";
        const inputSearch = document.createElement('input');
        inputSearch.id = 'inputSearch';
        inputSearch.setAttribute("type","text");
        containerModalSearch.appendChild(inputSearch);
        document.getElementById('titleDashboard').appendChild(containerModalSearch);
        const buttonRemoveModal = document.createElement('button');
        buttonRemoveModal.value = 'X';
        buttonRemoveModal.id = 'buttonRemoveModalDashboard';
        buttonRemoveModal.innerText = 'X';
        containerModalSearch.appendChild(buttonRemoveModal);
        buttonRemoveModal.addEventListener("click",()=>{
            document.getElementById('titleDashboard').removeChild(containerModalSearch);
        })
    }
}
