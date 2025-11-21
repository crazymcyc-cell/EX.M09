// app.js
import { Cliente, ClienteService } from "./classes.js";
import { isNotEmpty, createElement, limparCampos } from "./utils.js";

// 🔗 SUA CHAVE DO CRUDCRUD
const API = "https://crudcrud.com/api/SUA_API_KEY/clientes";

const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const listaClientes = document.querySelector("#listaClientes");
const btnCadastrar = document.querySelector("#btnCadastrar");

// Service
const clienteService = new ClienteService(API);

// -------------------------------------------
// Funções da Interface
// -------------------------------------------

// Renderizar lista de clientes no DOM
async function atualizarLista() {
  const clientes = await clienteService.listar();

  listaClientes.innerHTML = "";

  clientes.map((cliente) => {
    const li = createElement(
      "li",
      `
            <strong>${cliente.nome}</strong> - ${cliente.email}
        `
    );

    const btnExcluir = createElement("button", "Excluir", "btnExcluir");

    btnExcluir.addEventListener("click", () => removerCliente(cliente._id));

    li.appendChild(btnExcluir);
    listaClientes.appendChild(li);
  });
}

// Cadastrar cliente
async function cadastrarCliente() {
  const nome = nomeInput.value;
  const email = emailInput.value;

  if (!isNotEmpty(nome) || !isNotEmpty(email)) {
    alert("Preencha todos os campos!");
    return;
  }

  const cliente = new Cliente(nome, email);

  await clienteService.salvar(cliente);

  limparCampos(nomeInput, emailInput);

  atualizarLista();
}

// Excluir cliente
async function removerCliente(id) {
  await clienteService.excluir(id);
  atualizarLista();
}

// -------------------------------------------
// Eventos
// -------------------------------------------
btnCadastrar.addEventListener("click", cadastrarCliente);

// Atualiza ao iniciar
atualizarLista();
