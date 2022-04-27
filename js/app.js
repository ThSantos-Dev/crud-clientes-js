'use strict'

// Import
import { openModal, closeModal } from './modal.js'
import { readClients, createClient, deleteClient } from './clients.js'

// Tabela
/**
 * Parâmetros
 * @param {JSON} client - Objeto JSON que contenha:
 *                          id, nome, email, cidade e celular
 * @returns {HTMLTableRowElement} - Linha de uma tabela que é constituída com 
 *                                  Table Columns inseridas nela
 */
const createRow = (client) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${client.id}">editar</button>
            <button type="button" class="button red" id="excluir-${client.id}">excluir</button>
        </td>
    `

    return row
}

const updateTable = async () =>  {
    const clientsInfo = document.getElementById('clientsInfo')

    // 1º - Ler a API e armazenar o resultado em uma variável
    const clients = await readClients()

    // 2º - Preencher a tabela com as informações obtidas da API
    const rows = clients.map(createRow)
    clientsInfo.replaceChildren(...rows)
}

// CRUD
const saveClient = async () => {
    // 1º Criar um JSON com as informações do cliente
    const client = {
        "celular": document.getElementById('txtCelular').value,
        "cidade": document.getElementById('txtCidade').value,
        "email": document.getElementById('txtEmail').value,
        "id": "",
        "nome": document.getElementById('txtNome').value
    }

    // 2º Enviar o JSON para a Servidor API
    await createClient(client)

    // 3º Fechar modal
    closeModal()

    // 4º Atualizar tabela
    updateTable()

}

const actionClient = (event) => {
    if(event.target.type == 'button'){
        const [action, idClient] = event.target.id.split('-')

        switch (action) {
            case 'editar':
                // Função para editar o Cliente
                break;
            case 'excluir':
                // Função para excluir o Cliente
                if(window.confirm("Você realmente deseja exluir este contato?")){
                    if(deleteClient(idClient)) {
                        alert('Cliente exluido com sucesso.')
                        updateTable()
                    }
                }
                break;
        
            default:
                break;
        }

    }
        
}


// Executando Funções
updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.getElementById('clientsInfo').addEventListener('click', actionClient)
