interface ITodo {
  id: number;
  text: string;
  is_completed: boolean;
}

class TodoApplication {
  todos: ITodo[] = [];
  ul: HTMLUListElement;
  currentId: number = 0;

  constructor(ul: HTMLUListElement) {
    this.ul = ul;
    const localTodos = localStorage.getItem("todos");
    if (localTodos !== null) {
      this.todos = JSON.parse(localTodos);
    }
  }

  getTodos() {
    return this.todos;
  }

  addTodo(text: string) {
    const id = this.currentId;
    const todo: ITodo = { id, text, is_completed: false };
    this.todos.push(todo);
    this.currentId += 1;
    this._addTodoInUI(todo);
  }

  _addTodoInUI(todo: ITodo) {
    const todoUi = this.getTodoAsListUI(todo);
    this.ul.appendChild(todoUi);
  }

  removeTodo(id: number) {
    for (let i = this.todos.length - 1; i >= 0; i--) {
      if (this.todos[i].id === id) {
        this.todos.splice(i, 1);
      }
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this._removeTodoFromUI(id);
  }

  _removeTodoFromUI(id: number) {
    const lis = this.ul.childNodes;
    lis.forEach((li) => {
      if (parseInt(li.id) === id) {
        li.remove();
      }
    });
  }

  checkTodo(id: number) {
    for (let i = this.todos.length - 1; i >= 0; i--) {
      if (this.todos[i].id === id) {
        this.todos[i].is_completed = !this.todos[i].is_completed;
      }
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this._checkTodoInUI(id);
  }

  _checkTodoInUI(id: number) {
    const lis = this.ul.childNodes;
    lis.forEach((li) => {
      if (parseInt(li.id) === id) {
        li.classList.toggle("strike");
      }
    });
  }

  getTodoAsListUI(todo: ITodo): HTMLLIElement {
    const li = document.createElement("li");
    li.setAttribute("id", `${todo.id}`);
    const wrapperSpan = document.createElement("span");
    wrapperSpan.classList.add("left");
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.is_completed;
    checkbox.setAttribute("id", `${todo.id}`);
    checkbox.addEventListener("click", () => {
      this.checkTodo(todo.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.innerHTML = '<i class="bi bi-trash3"></i>';
    deleteButton.addEventListener("click", () => {
      this.removeTodo(todo.id);
    });

    wrapperSpan.appendChild(checkbox);
    wrapperSpan.appendChild(textSpan);
    li.appendChild(wrapperSpan);
    li.appendChild(deleteButton);

    return li;
  }

  render() {
    this.todos.forEach((todo) => {
      const todoUi = this.getTodoAsListUI(todo);
      this.ul.appendChild(todoUi);
    });
  }
}

const main = () => {
  // ul
  const ul = document.querySelector("#todo-list")! as HTMLUListElement;

  // initialize application
  const app = new TodoApplication(ul);

  // initial render
  app.render();

  // form submit event
  document
    .querySelector("#todo-input-form")!
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const todoInput = document.querySelector(
        "#todo-input-text"
      )! as HTMLInputElement;
      const todoText = todoInput.value.trim();
      if (todoText !== "" && todoText !== null && todoText !== undefined) {
        app.addTodo(todoText);
        todoInput.value = "";
      }
    });
};

main();
