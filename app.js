// Select DOM Elements
const todoInput=document.querySelector('#todoInput')
const todoList=document.querySelector('#todoList')
const addButton=document.querySelector('#addButton')
const deleteList=document.querySelector('#deleteList')
const removeButton=document.querySelector('#removeButton')
const loadButton = document.querySelector('#loadButton')


// Event Listener: Add Todo Button
addButton.addEventListener('click',addTodo)
let nextId= 0
function addTodo(){
    //id
    id=nextId++
    //value
    const item=todoInput.value
    if (!item){return}  
    const newTodo=`
    <li id="${id}">
    <span>${item}</span>
    <button onclick="completeTodo(${id},'${item}')">Complete</button>
    <button onclick="priotize(${id})">Priotize</button>
    <button onclick="deleteTodo(${id})">Delete</button>
    <button onclick="objects(${id}'${item}')">Object</button>
    </li>`

    //append the new node
    
    todoList.insertAdjacentHTML('beforeend',newTodo)
    localStorage.setItem('todoArray', todoList.innerHTML)
    return item
}

//change into object
function objects(id,item){
    console.log(item)
    console.log(id)
    const object={ID:id,ITEM:item}
    console.log(object.ITEM)   
}



// Feature: Complete Todo
function completeTodo(id){
    
    const todoItem= document.querySelector(`li[id="${id}"]`)
    itemSpan=todoItem.children[0]
    itemSpan.toggleAttribute('done')
    const completeStatus=itemSpan.getAttribute('done')===null?false:true
    const completebutton=todoItem.children[1]
    completebutton.innerText=completeStatus?'Undo':'Complete'
}

function priotize(id){
    console.log(id)
    const todoItem =document.querySelector(`li[id="${id}"]`)
    todoItem.toggleAttribute('priority')
    const prioStatus=todoItem.classList.contains('priority')
    const priobutton=todoItem.children[2]
    priobutton.innerText=prioStatus?'Undo':'prioritize'   
}


function deleteTodo(id){
    const li =document.querySelector(`li[id="${id}"]`)
    todoList.removeChild(li);
}


// Feature: Delete Todo
function removeAll(){
    localStorage.setItem('todoArray', todoList.innerHTML);
    console.log(todoList)
    var child = todoList.lastElementChild; 
    while (child) {
        todoList.removeChild(child);
        child = todoList.lastElementChild;
    }
}

function get() {
    var storedValue = localStorage.getItem('todoArray');
    if(storedValue) {
        todoList.innerHTML = storedValue;
    }
}

function undoDelete() {
    var storedValue = localStorage.getItem('todoArray');
    if(storedValue) {
        todoList.innerHTML = storedValue;
    }
}


function clearData(){
    localStorage.clear();
}