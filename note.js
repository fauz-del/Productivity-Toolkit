const addBtn = document.getElementById("addNoteBtn");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const noteList = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchNote");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  const noteItems = noteList.querySelectorAll("li");

  noteItems.forEach(li => {
    const title = li.querySelector("h4")?.textContent.toLowerCase() || "";
    const content = li.querySelector("p")?.textContent.toLowerCase() || "";

    if (title.includes(searchValue) || content.includes(searchValue)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });

  const visibleNotes = [...noteItems].some(li => li.style.display === "flex");
  if (!visibleNotes && notes.length > 0) {
    noteList.innerHTML = `<li>No matching notes found</li>`;
  } else if (searchValue === "" && notes.length > 0) {
    renderNotes(); 
  }
});

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();

function saveNote() {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();

  if (!title && !content) return; // Prevent empty notes

  const editIndex = addBtn.dataset.editIndex;

  const noteData = {
    title,
    content,
    date: new Date().toLocaleString(), 
  };

  if (editIndex !== undefined) {
    notes[editIndex] = noteData;
    delete addBtn.dataset.editIndex; 
  } else {
    notes.unshift(noteData);
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  renderNotes();

  noteTitleInput.value = "";
  noteContentInput.value = "";
  addBtn.textContent = "Add Note"; 
}

function renderNotes() {
  noteList.innerHTML = "";

  if (notes.length === 0) {
    noteList.innerHTML = `<li>No notes yet</li>`;
    return;
  }

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h4>${note.title}</h4>
      <small>${note.date}</small>
      <p>${note.content}</p>
      <div class="note-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Handle Edit
    li.querySelector(".edit-btn").addEventListener("click", () => {
      noteTitleInput.value = note.title;
      noteContentInput.value = note.content;
      addBtn.dataset.editIndex = index; 
      addBtn.textContent = "Update Note"; 
    });

li.querySelector(".delete-btn").addEventListener("click", () => {
  const modal = document.getElementById("deleteModal");
  const confirmBtn = document.getElementById("confirmDelete");
  const cancelBtn = document.getElementById("cancelDelete");

  modal.classList.add("show");

  confirmBtn.onclick = () => {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    modal.classList.remove("show");
  };

  cancelBtn.onclick = () => modal.classList.remove("show");

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("show");
  };
});

    noteList.appendChild(li);
  });
}

addBtn.addEventListener("click", saveNote);