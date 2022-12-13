const todoForm = document.querySelector('#to-do-form');
const todoInput = document.querySelector('#to-do-input');
const todoList = document.querySelector('#to-do-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const date = document.querySelector('#date');
const todoSubmit = document.querySelector('.to-do-submit');

let oldInputValue;

// date time zone
const dateOfday = new Date();

const formater = Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
});

date.innerHTML = formater.format(dateOfday);


const saveTodo = (text) => {

  const toDo = document.createElement('div');
  toDo.classList.add('to-do');

  const todoTitle = document.createElement('h3');
  todoTitle.innerHTML = text
  toDo.appendChild(todoTitle);


  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-to-do');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  toDo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-to-do');
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square">';
  toDo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-to-do');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  toDo.appendChild(deleteBtn);

  todoList.appendChild(toDo);

  todoInput.value = ''
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle('hidden');
  todoForm.classList.toggle('hidden');
  todoList.classList.toggle('hidden')
};

const updateTodo = (text) => {
  const toDos = document.querySelectorAll('.to-do');
  toDos.forEach((todo) => {

    let todoTitle = todo.querySelector('h3');

    if(todoTitle.innerHTML === oldInputValue) {
      todoTitle.innerHTML = text;
    }

  })
}

todoForm.addEventListener('submit', (e) => {

  e.preventDefault();


  const inputValue = todoInput.value;

  if(todoInput) {
    saveTodo(inputValue);
  }

});

document.addEventListener('click', (e) => {
  
  const targetElement = e.target
  const parantElement = targetElement.closest('div');
  let todoTitle;

  if(parantElement && parantElement.querySelector('h3')) {
    todoTitle = parantElement.querySelector('h3').innerHTML;
  }

  if(targetElement.classList.contains('finish-to-do')) {
    parantElement.classList.toggle('done');
  }

  if(targetElement.classList.contains('remove-to-do')) {
    parantElement.remove();
  }

  if(targetElement.classList.contains('edit-to-do')) {
    toggleForms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }

});

cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault()

  toggleForms();
});

editForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const editInputValue = editInput.value

  if(editInputValue) {
    updateTodo(editInputValue)
  }
  
  toggleForms();
});