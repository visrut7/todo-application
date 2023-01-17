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
        const todo: ITodo = {id, text, is_completed: true};
        this.todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    getTodoAsListUI(todo: ITodo): HTMLLIElement {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
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
        deleteButton.setAttribute('id', `d-${todo.id}`)
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', () => {
            for (let i = this.todos.length - 1; i >= 0; i--) {
                if (this.todos[i].id === todo.id) {
                    this.todos.splice(i, 1);
                    this.updateLocal();
                }
            }
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
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

    // render ui
    app.render();

    // form submit event
    document.querySelector("#todo-input-form")!.addEventListener('submit', (event) => {
        event.preventDefault();
        const todoInput = document.querySelector("#todo-input-text")! as HTMLInputElement;
        const todoText = todoInput.value.trim();
        if(todoText !== '' && todoText !== null && todoText !== undefined) {
            console.log(`todoText: "${todoText}"`);
            app.addTodo(todoText);
            app.render();
            todoInput.value = '';
        }
    });
}

main();