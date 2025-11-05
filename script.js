const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const message = document.getElementById('message');

// Função para mostrar mensagem na tela
function mostrarMensagem(texto) {
  message.textContent = texto;
  message.style.display = 'block';

  setTimeout(() => {
    message.style.display = 'none';
  }, 2000);
}

function mostrarMensagem(texto) {
  message.textContent = texto;
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
}

// Adicionar tarefa
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    mostrarMensagem('Digite uma tarefa!');
    return;
  }

  criarTarefa(taskText);
  taskInput.value = '';
});

// Permitir Enter para adicionar
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Criar item da lista
function criarTarefa(taskText) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;

  // Marcar como concluída ao clicar
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Botão editar
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Editar';
  editBtn.classList.add('btn-edit');
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = span.textContent;
    inputEdit.classList.add('edit-input');

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Salvar';
    saveBtn.classList.add('btn-save');

    li.replaceChild(inputEdit, span);
    li.replaceChild(saveBtn, editBtn);

    saveBtn.addEventListener('click', () => {
      const novoTexto = inputEdit.value.trim();
      if (novoTexto === '') {
        mostrarMensagem('Digite um texto válido!');
        return;
      }

      span.textContent = novoTexto;
      li.replaceChild(span, inputEdit);
      li.replaceChild(editBtn, saveBtn);
    });
  });

  // Botão excluir
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.classList.add('btn-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}