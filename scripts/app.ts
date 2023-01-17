interface ITodo {
    id: number;
    text: string;
    is_completed: boolean;
}

class TodoApplication {
    todos: ITodo[] = [];

    constructor() {
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
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}

const main = () => {
    const todoApp = new TodoApplication();
}

document.addEventListener('load', () => {
    main();
});