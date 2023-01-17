interface ITodo {
    id: number;
    text: string;
    is_completed: boolean;
}

class TodoApplication {
    todos: ITodo[] = [];
    ul: HTMLUListElement;

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
        const id = this.todos.length;
        const todo: ITodo = {id, text, is_completed: false};
        this.todos.push(todo);
        this.updateLocal();
    }

    getTodoAsListUI(todo: ITodo): HTMLLIElement {
        const li = document.createElement('li');
        const wrapperSpan = document.createElement('span');
        wrapperSpan.classList.add('left');
        const textSpan = document.createElement('span');
        if(todo.is_completed) {
            textSpan.classList.add('strike');
        }
        textSpan.textContent = todo.text;

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.is_completed;
        checkbox.setAttribute('id', `${todo.id}`);
        checkbox.addEventListener('click', () => {
            for (let i = this.todos.length - 1; i >= 0; i--) {
                if (this.todos[i].id === todo.id) {
                    this.todos[i].is_completed = !this.todos[i].is_completed;
                    this.updateLocal();
                }
            }
        })

        const deleteButton = document.createElement('button');
        deleteButton.classList.add("delete-button");
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.innerHTML = '<i class="bi bi-trash3"></i>';
        deleteButton.addEventListener('click', () => {
            for (let i = this.todos.length - 1; i >= 0; i--) {
                if (this.todos[i].id === todo.id) {
                    this.todos.splice(i, 1);
                    this.updateLocal();
                }
            }
        })

        wrapperSpan.appendChild(checkbox);
        wrapperSpan.appendChild(textSpan);
        li.appendChild(wrapperSpan);
        li.appendChild(deleteButton);

        return li;
    }

    updateLocal() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.render();
    }

    render() {
        this.ul.innerHTML = '';
        this.todos.forEach(todo => {
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
    document.querySelector("#todo-input-form")!.addEventListener('submit', (event) => {
        event.preventDefault();
        const todoInput = document.querySelector("#todo-input-text")! as HTMLInputElement;
        const todoText = todoInput.value.trim();
        if(todoText !== '' && todoText !== null && todoText !== undefined) {
            console.log(`todoText: "${todoText}"`);
            app.addTodo(todoText);
            todoInput.value = '';
        }
    });
}

main();