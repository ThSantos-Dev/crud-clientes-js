'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    
    // Limpando os dados
    document.getElementById("txtCelular").value = ""
    document.getElementById("txtCidade").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtNome").value = ""
}

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('cancelar').addEventListener('click', closeModal)

// Export 
export { openModal, closeModal }