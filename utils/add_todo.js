export function addTodo() {
    const todo_input = document.getElementById("todo_input");
    const ul_class = document.getElementById("ul_class");

    const text = todo_input.value.trim();
    // check if its empty if yes then ignore
    if (!text) { return; }

    const todos = JSON.parse(globalThis.localStorage.getItem("todos")) || [];

    // update it with todos text
    todos.push(text);


    // save again
    globalThis.localStorage.setItem("todos", JSON.stringify(todos));


    const li = document.createElement("li");
    li.textContent = text;
    li.className = "todos_list"
    ul_class.appendChild(li);

    const del = document.createElement("button");
    del.textContent = "delete";

    // gonna style this via object assign
    Object.assign(del.style, {
        marginLeft: "2vw",
        border: "none",
        padding: "0px 10px",
        borderRadius: "5px",
        cursor: "pointer"
    });
    del.addEventListener("click", () => {
        li.remove();

        // i forgot to parse it before filtering the first time lmao
        const todosNow = JSON.parse(globalThis.localStorage.getItem("todos")) || [];
        const updated_todos = todosNow.filter((t) => t !== text);
        // const updated_todos = todos.filter((t) => t !== text);
        globalThis.localStorage.setItem("todos", JSON.stringify(updated_todos));
    });
    li.appendChild(del);

    const mark = document.createElement("button");
    mark.textContent = "mark";

    Object.assign(mark.style, {
        border: "none",
        marginLeft: "0.7vw",
        padding: "0px 10px",
        borderRadius: "5px",
        cursor: "pointer"
    });

    mark.addEventListener("click", () => {
        li.textContent = "marked as finished";
        li.appendChild(del);
    });
    li.appendChild(mark);

    todo_input.value = "";
}

globalThis.addEventListener("DOMContentLoaded", () => {
    const ul_class = document.getElementById("ul_class");
    const todos = JSON.parse(globalThis.localStorage.getItem("todos")) || [];

    todos.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        li.className = "todos_list";
        ul_class.appendChild(li);

        const del = document.createElement("button");
        del.textContent = "delete";
        Object.assign(del.style, {
            marginLeft: "2vw",
            border: "none",
            padding: "0px 10px",
            borderRadius: "5px",
            cursor: "pointer"
        });
        del.addEventListener("click", () => {
            li.remove();
            const todosNow = JSON.parse(globalThis.localStorage.getItem("todos")) || [];
            const updated_todos = todosNow.filter((t) => t !== text);
            // const updated_todos = todos.filter((t) => t !== text);
            globalThis.localStorage.setItem("todos", JSON.stringify(updated_todos));
        });
        li.appendChild(del);

        const mark = document.createElement("button");
        mark.textContent = "mark";
        Object.assign(mark.style, {
            border: "none",
            marginLeft: "0.7vw",
            padding: "0px 10px",
            borderRadius: "5px",
            cursor: "pointer"
        });
        mark.addEventListener("click", () => {
            li.textContent = "marked as finished";
            li.appendChild(del);
        });
        li.appendChild(mark);
    });
});
