const API =
  "https://crudcrud.com/api/c973bf2c4e874685bf9a74e14e4b085a/clientes";

document
  .getElementById("btnCadastrar")
  .addEventListener("click", cadastrarCliente);
listarClientes();

// Cadastrar cliente (POST)
function cadastrarCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  const cliente = { nome, email };

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  })
    .then(() => {
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      listarClientes();
    })
    .catch((err) => console.error("Erro ao cadastrar:", err));
}

// Listar clientes (GET)
function listarClientes() {
  fetch(API)
    .then((resp) => resp.json())
    .then((lista) => {
      const ul = document.getElementById("listaClientes");
      ul.innerHTML = "";

      lista.forEach((cliente) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <strong>${cliente.nome}</strong> - ${cliente.email}
                    <button class="btnExcluir" onclick="excluirCliente('${cliente._id}')">Excluir</button>
                `;
        ul.appendChild(li);
      });
    })
    .catch((err) => console.error("Erro ao listar:", err));
}

// Excluir cliente (DELETE)
function excluirCliente(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  })
    .then(() => listarClientes())
    .catch((err) => console.error("Erro ao excluir:", err));
}
