'use strict'

// Imports
import { imagePreview } from "./imagePreview.js";

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    
    // Limpando os dados
    document.getElementById("txtCelular").value = ""
    document.getElementById("txtCidade").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtNome").value = ""
}

const loadImage = () => imagePreview('modalImageInput', 'modalImage')



document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('cancelar').addEventListener('click', closeModal)

document.getElementById('modalImageInput').addEventListener('change', loadImage)

// Export 
export { openModal, closeModal }