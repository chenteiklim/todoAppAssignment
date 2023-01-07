// Select DOM Elements
const todoInput=document.querySelector('#todoInput')
const todoList=document.querySelector('#todoList')
const addButton=document.querySelector('#addButton')
const deleteList=document.querySelector('#deleteList')
const removeButton=document.querySelector('#removeButton')
const loadButton = document.querySelector('#loadButton')

let todoListArray= []
console.log(todoListArray)

// Event Listener: Add Todo Button
addButton.addEventListener('click',addTodo)
window.addEventListener('load', displayAddTodo);

function displayAddTodo(){
    
    var storedValue = localStorage.getItem('todoArray');
    storedData=JSON.parse(storedValue)
    todoListArray = [...storedData];
    console.log(todoListArray)
    // Get the index of the object that we want to access
    
    const prioritizedItems = [];
    const nonPrioritizedItems = [];

    for (index=0; index<storedData.length; index++){        
        let priority= storedData[index].priority
        let ID = storedData[index].id;
        // Access the item property of the object at the specified index
        let items = storedData[index].item;
        svgClasses = ""
        if (priority === true){
            svgClasses= 'color'
            prioritizedItems.push({ID,items,svgClasses});
        }
        else {
            nonPrioritizedItems.push({ID,items,svgClasses})
        }  
        removeAll()
        // Insert the prioritized items into the list first
        for (const {ID, items, svgClasses } of prioritizedItems) {
            createTodoItem(ID,items,svgClasses);
        }

        // Then insert the non-prioritized items
        for (const {ID, items, svgClasses} of nonPrioritizedItems) {
            createTodoItem(ID,items,svgClasses);
        }
    }
}


function createTodoItem(ID,items,svgClasses){
    console.log(todoListArray)
    if (!items){return}  
    const newTodo=`
    <li id="${ID}" class='todo-item'>
    <span>${items}</span>
    <button onclick="completeTodo(${ID},'${items}')">Complete</button>
    <button onclick="deleteTodo(${ID})">Delete</button>
    <svg id= "button-${ID}" class='priotize ${svgClasses}' onclick='priotize(${ID})'  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
    `
    //append the new node/append the new node
    todoList.insertAdjacentHTML('beforeend',newTodo)
    console.log(todoList)
    
}
    

   
function priotize(ID){
    
    if (todoListArray[ID].priority === true){
        todoListArray[ID].priority = false
    }
    else{
        todoListArray[ID].priority = true
    }
    const todoString=JSON.stringify(todoListArray)
    localStorage.setItem('todoArray', todoString)
    displayAddTodo()
}
 


function addTodo(){
    let priority= false
    var id= todoListArray.length
    const item=todoInput.value
    todoListArray.push({
        id,
        item,
        priority
    })
    
    
    const todoString=JSON.stringify(todoListArray)
    localStorage.setItem('todoArray', todoString)
    displayAddTodo()
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


function deleteTodo(id){
    const li =document.querySelector(`li[id="${id}"]`)
    console.log(li)
    todoList.removeChild(li);
}


// Feature: Delete Todo
function removeAll(){
    /* localStorage.setItem('todoArray2', todoList.innerHTML);
    console.log(todoList) */
    var child = todoList.lastElementChild; 
    console.log(child)
    while (child) {
        todoList.removeChild(child);
        child = todoList.lastElementChild;
    }
}

function undoDelete() {
    var storedValue = localStorage.getItem('todoArray');
    if(storedValue) {
        todoList.innerHTML = storedValue;
    }
}


function clearData(){
    localStorage.setItem('todoArray',JSON.stringify([]));    
}