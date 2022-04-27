'use strict'

// Url Base
const url = 'https://testeleonid.herokuapp.com/'

/**
 * Função que encaminha os dados do usuário para a API
 * @param {JSON} client - Objeto que contém todas as informações do cliente
 * @returns {Boolean}
 */
const createClient = async (client) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(`${url}clientes`, options)
    console.log(response.ok)
}

/**
 * Função que retorna todos os usuários cadastrados
 * @param {VoidFunction}
 * @returns {JSON} - Retorna um JSON com os dados de todos os usuários
 */
const readClients = async () => {
    const response = await fetch(`${url}clientes`)
    const data = await response.json()

    console.log(data)
    return data
}

/**
 * Função que excluí um cliente
 * @param {Number} idClient - ID do cliente a ser excluído
 * @returns {Boolean}
 */
const deleteClient = async (idClient) => {
    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${url}clientes/${idClient}`, options)
    console.log(response.ok)
}

export { readClients, createClient, deleteClient }