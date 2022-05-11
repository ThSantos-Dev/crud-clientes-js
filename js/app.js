"use strict";

// Import
import { openModal, closeModal } from "./modal.js";
import {
  readClients,
  createClient,
  deleteClient,
  readClient,
  updateClient,
} from "./clients.js";

// Tabela
/**
 * Função que cria nova linha na tabela com os dados do usuário
 * @param {JSON} client - Objeto JSON que contenha:
 *                          id, nome, email, cidade e celular
 * @returns {HTMLTableRowElement} - Linha de uma tabela que é constituída com
 *                                  Table Columns inseridas nela
 */
const createRow = ({nome, foto, email, celular, cidade, id}) => {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td><img src="${foto ? foto : 'https://place-hold.it/300'}" alt="avatar de ${nome}"/></td>
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${id}">editar</button>
            <button type="button" class="button red" id="excluir-${id}">excluir</button>
        </td>
    `;

  return row;
};

const updateTable = async () => {
  const clientsInfo = document.getElementById("clientsInfo");

  // 1º - Ler a API e armazenar o resultado em uma variável
  const clients = await readClients();

  // 2º - Preencher a tabela com as informações obtidas da API
  const rows = clients.map(createRow);
  clientsInfo.replaceChildren(...rows);
};

/**
 * Função para carregar os dados do cliente a editar na modal
 * @param {String} idClient ID do cliente para busca
 * @return {VoidFunction} Sem retorno
 */
const updateModal = async (idClient) => {
  const client = await readClient(idClient);

  // Inserindo dados
  document.getElementById("txtCelular").value = client.celular;
  document.getElementById("txtCidade").value = client.cidade;
  document.getElementById("txtEmail").value = client.email;
  document.getElementById("txtNome").value = client.nome;
  document.getElementById("modalImage").src = client.foto;
};

// CRUD
const saveClient = async () => {
  const form = document.querySelector('.modal-form');

  // 1º Criar um JSON com as informações do cliente
  const client = {
    celular: document.getElementById("txtCelular").value,
    cidade: document.getElementById("txtCidade").value,
    email: document.getElementById("txtEmail").value,
    id: "",
    nome: document.getElementById("txtNome").value,
    foto: document.getElementById("modalImage").src,
  };

  // 2º Enviar o JSON para a Servidor API

  if (form.reportValidity()) {
    const idClient = document.getElementById("modal").dataset.idClient;

    if (!idClient) await createClient(client);
    else await updateClient(client, idClient);

    // 3º Fechar modal
    closeModal();
    document.getElementById("modal").removeAttribute("data-id-client");
  
    // 4º Atualizar tabela
    updateTable();
  }
};

const actionClient = (event) => {
  if (event.target.type == "button") {
    const [action, idClient] = event.target.id.split("-");

    switch (action) {
      case "editar":
        // Função para atualizar cliente
        openModal();

        // Inserindo atributo dataset para diferenciar as operações
        document
          .getElementById("modal")
          .setAttribute("data-id-client", idClient);

        // Chamando função que realiza a atualização dos dados do cliente
        updateModal(idClient);

        break;
      case "excluir":
        // Função para excluir o Cliente
        if (window.confirm("Você realmente deseja exluir este contato?")) {
          if (deleteClient(idClient)) {
            alert("Cliente exluido com sucesso.");
            updateTable();
          }
        }
        break;

      default:
        break;
    }
  }
};

const maskCelular = ({target}) => {
  let text = target.value

  // 1193923-3232
  text = text.replace(/\D/g,"")
  text = text.replace(/^(\d{2})(\d)/g,"($1) $2")
  text = text.replace(/(\d)(\d{4})$/,"$1-$2")

  target.value = text

}


// Executando Funções
updateTable();




// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);
document.getElementById("salvar").addEventListener("click", () => {
  const edit = document.getElementById("modal").dataset.idClient;
  if (!edit !== undefined) saveClient();
  else updateClient();
});

document.getElementById("clientsInfo").addEventListener("click", actionClient);
document.getElementById("txtCelular").addEventListener('keyup', maskCelular)
