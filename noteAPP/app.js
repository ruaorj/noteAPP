const button = document.querySelector("#button");  
const theDiv = document.querySelector("#createdThings");

button.addEventListener('click', function() {
    const textAreaContent = document.querySelector("#textArea").value;

    if (textAreaContent.trim() !== "") {  
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.push({ content: textAreaContent });
        localStorage.setItem('notes', JSON.stringify(notes));

        document.querySelector('#textArea').value = '';

        displayNotes();
    } else {
        alert("Please type something!");
    }
});

window.onload = function() {
    displayNotes();
};

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];  
    theDiv.innerHTML = '';  

    notes.forEach(function(note) {
        createNote(note.content);
    });
}

function createNote(noteContent) {
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    let deleteButton = document.createElement("button");
    let setButton = document.createElement("button");

    newP.innerHTML = noteContent;

    setButton.className = "btn btn-success";
    deleteButton.className = "btn btn-danger";

    setButton.addEventListener('click', function() {
        newP.contentEditable = true;  
        newP.focus();
    newP.addEventListener('blur', function() {
        newP.contentEditable = false;
        const updatedContent = newP.innerHTML

        let notes = JSON.parse(localStorage.getItem('notes')) || [];    

        notes = notes.map(function(note) {
            if(note.content === noteContent){
                note.content = updatedContent;
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(notes));

        displayNotes();
    });  
    });

    deleteButton.addEventListener('click', function() {
        newDiv.remove();

        const noteContent = newP.innerHTML;

        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes = notes.filter(function(note) {
            return note.content !== noteContent;
        });

        localStorage.setItem('notes', JSON.stringify(notes));

        displayNotes();
    });

    newDiv.appendChild(setButton);
    newDiv.appendChild(newP);
    newDiv.appendChild(deleteButton);

    theDiv.appendChild(newDiv);
}
