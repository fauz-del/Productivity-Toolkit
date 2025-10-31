export function addTodo() {
    const todo_input = document.getElementById("todo_input");
    const ul_class = document.getElementById("ul_class");

    const text = todo_input.value.trim();
    // check if its empty if yes then ignore
    if (!text) { return; }

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