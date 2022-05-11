'use strict'

/**
 * Função que gera Preview de imagem selecionada
 * @param {String} idInput Id da input de onde virá o arquivo para preview
 * @param {String} idImg Id da tag img que receberá a imagem do input
 */
const imagePreview = (idInput, idImg) => {
    const file = document.getElementById(idInput).files[0]
    const preview  = document.getElementById(idImg)

    if(file) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => preview.src = fileReader.result
        
    }
    // preview.src = URL.createObjectURL(file)
}

export {
    imagePreview
}