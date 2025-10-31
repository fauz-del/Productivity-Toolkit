import { addTodo } from "./add_todo.js";

export function handle_submit(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("todo_add")?.click();
        addTodo();
    }
}