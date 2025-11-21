// classes.js

export class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

export class ClienteService {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  async listar() {
    const resposta = await fetch(this.apiURL);
    return resposta.json();
  }

  async salvar(cliente) {
    await fetch(this.apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
  }

  async excluir(id) {
    await fetch(`${this.apiURL}/${id}`, {
      method: "DELETE",
    });
  }
}
