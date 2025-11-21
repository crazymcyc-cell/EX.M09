// utils.js

// Remover espaços e validar strings
export const isNotEmpty = (str) => str && String(str).trim().length > 0;

// Criar elemento HTML com classes e conteúdo
export const createElement = (tag, content = "", className = "") => {
  const el = document.createElement(tag);
  if (content) el.innerHTML = content;
  if (className) el.classList.add(className);
  return el;
};

// Limpar campos de formulário
export const limparCampos = (...inputs) => {
  inputs.forEach((input) => (input.value = ""));
};
