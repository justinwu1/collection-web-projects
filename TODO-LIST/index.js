class toDo {
    
    constructor(inputText, ul, addButton, editButton, audio, container) {
        this.inputText = inputText;
        this.ul = ul;
        this.addButton = addButton;
        this.editButton = editButton;
        this.audio = audio;
        this.container = container;
        // Add a new task to the to-do list
        this.inputText.addEventListener('keypress', this.add);
        this.addButton.addEventListener('click', this.add);
        this.editButton.addEventListener('click',this.edit);
    }

    add = (event) => {
        const newLi = this.lis;
        // Validation for input
        if (event.key === 'Enter' || event.type === 'click') {
            if (this.inputText.value === "") {
                this.inputText.classList.add("fillOut")
                this.inputText.placeholder = "Please fill it out";
                return;
            }
            this.inputText.placeholder = "Add a new task";
            this.inputText.classList.remove("fillOut");

            // Add the input text to the to-do list
            newLi.innerText = this.inputText.value;
            if (this.container.clientHeight < this.ul.children.length * 100) this.container.style.height = "auto";

            this.audio[2].play();
            this.ul.appendChild(newLi);
            newLi.insertAdjacentHTML("afterbegin", "<i class='fas fa-edit float-right'></i>");
            newLi.insertAdjacentHTML("afterbegin", "<i class='fas fa-trash float-right'></i>");
            newLi.insertAdjacentHTML("afterbegin", "<i class='fas fa-check'></i>");

            // Watch every button click event
            this.watch(document.querySelectorAll('.fa-check'), this.crossOut);
            this.watch(document.querySelectorAll('.fa-trash'), this.remove);
            this.watch(document.querySelectorAll('.fa-edit'), this.focus);
            this.editButton.disabled = true;
            this.inputText.value = "";
        }
    }
    // Every Current Edit button have this.edit methods
    // this.methods change

    // Cross out the to-do that is done
    crossOut = (event) => {
        if (event.target.tagName === 'I') {
            event.target.parentNode.classList.toggle('crossOut');
            this.audio[0].play();
        }
    }
    // Select every button in the page and add a click event
    watch = (button, methods) => {
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', methods);
        }
    }
    // Fade out and remove the li 
    remove = (event) => {
        const parentLi = event.target.parentNode;
        this.fadeOut(parentLi);
        this.audio[3].play();
        setTimeout(function () {
            parentLi.remove();
        }, 1000)
    }
    // Listen for the Enter event and change 
    edit = (event) => {
        this.audio[1].play();
        li.nodeValue = this.inputText.value;
        editButton.disabled = true;
        }
    focus = (event) =>{
        this.inputText.focus();
        this.editButton.disabled = false;
        this.inputText.placeholder = "Edit and click Edit Button!";
        li = event.target.parentNode.childNodes[3];
    }
    get lis() {
        return document.createElement('li');
    }
    fadeOut(el) {
        el.classList.add('hide');
    }
}
let li;
const button = document.querySelectorAll("button");
const editButton = button[1];
const addButton = button[0];
const inputText = document.querySelector('input');
const ul = document.querySelector('ul');
const audio = document.querySelectorAll("audio");
const container = document.querySelector('.container');
const list = new toDo(inputText, ul, addButton, editButton, audio, container);
