import "./styls.css"

type Todo = {
    id: string
    title: string
    complete: boolean
}

const form = document.querySelector<HTMLFormElement>("#new-todo-form")! //use <HTMLFormElement> for forms


const todoInput = document.querySelector<HTMLInputElement>("#todo-input")! //use <HTMLInputElement> for input fields

const list = document.querySelector<HTMLUListElement>("#list")! //use <HTMLUListElement> for ul tags

let allTodo: Todo[] = getTodoFromLS();
allTodo.forEach(renderNewTodo)

// ======= attention =============
// TS automatically added a ? mark after form that means if there is no form the code will not execute. But if there is no form the code will not throw error. 
//So, we will put an ! mark in the form element and remove the question mark after form. This means there will always be data here if not this will throw error

// form?.addEventListener("submit", e => {
//     e.preventDefault();
// })

form.addEventListener("submit", e => {
    e.preventDefault();

    const todoTitle = todoInput.value;
    if (todoTitle === "") return

    const newTodo = {
        id: crypto.randomUUID(),
        title: todoTitle,
        complete: false
    }

    allTodo.push(newTodo);
    renderNewTodo(newTodo);
    saveTodo()
    todoInput.value = ""
})



function renderNewTodo(todo: Todo) {
    // create li tag
    const listItem = document.createElement("li")
    listItem.classList.add("list-item");

    // create a label
    const label = document.createElement("label")
    label.classList.add("list-item-label")


    // create a checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("label-input")
    checkbox.checked = todo.complete;
    checkbox.addEventListener("change", () => {
        todo.complete = checkbox.checked
        if (todo.complete === true) {
            textElement.style.color = "gray"
            saveTodo()
        }
        else {
            textElement.style.color = "black"
            saveTodo()
        }
    })


    // create text field for the todo
    const textElement = document.createElement("span")
    textElement.classList.add("label-text")
    textElement.innerText = todo.title


    // create delete button
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-btn")
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener("click", () => {
        listItem.remove();
        allTodo = allTodo.filter(t => t.id !== todo.id)
        saveTodo();
    })


    // append the li tag, input fields, buttons, label inside ul tag
    label.append(checkbox, textElement)
    listItem.append(label, deleteButton)
    list.append(listItem)
}

function saveTodo() {
    localStorage.setItem("allTodo", JSON.stringify(allTodo))
}

function getTodoFromLS() {
    const value = localStorage.getItem("allTodo");
    if (value == null) return []
    return JSON.parse(value) as Todo[]
}