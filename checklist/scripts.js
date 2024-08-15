const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

// Validar se o input escrito é válido ou não
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  console.log(inputIsValid);

  // Mudar a cor do input para vermelho simbolizando que não é válido
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  // Responsável por receber o click do mouse na tarefa desejada para que ela se complete
  taskContent.addEventListener("click", () => handleClick(taskContent));

  // Adicionar o ícone de lixeira para o botão de excluir uma tarefa
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  // Responsável por fazer o click do mouse excluir a tarefa ao clicar no símbolo da lixeira
  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  // Limpar a barra do input após validar a nova tarefa
  inputElement.value = "";

  // Serve para salvar as mudanças da página no Local Storage para manter elas mesmo após recarregar a página
  updateLocalStorage();
};

// Definir a tarefa como completa riscando-a após o clique
const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

// 
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

// Configurando o Local Store para armazenar as informações
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

// Atualizar as tarefas utilizando o Local Sotrage
const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
