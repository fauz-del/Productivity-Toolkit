const todo_add_btn = document.getElementById("todo_add");

import { handle_submit } from "./utils/submit.js";
import { addTodo } from "./utils/add_todo.js";

// add todos both ways, when user clicks on enter or clicks on the button
document.addEventListener("keydown", (e) => { handle_submit(e) });

todo_add_btn.addEventListener("click", () => { addTodo(); });