// Select DOM Elements
const todoInput=document.querySelector('#todoInput')
const todoListElement=document.querySelector('#todoList')
const addButton=document.querySelector('#addButton')
const deleteList=document.querySelector('#deleteList')
const removeButton=document.querySelector('#removeButton')
const loadButton = document.querySelector('#loadButton')
const displayButton= document.querySelector('#displayButton')


const todoListArray= []


// Event Listener: Add Todo Button
addButton.addEventListener('click',addTodo)
displayButton.addEventListener('click',displayAddTodo)

function displayAddTodo(){
    var storedValue = localStorage.getItem('todoArray2');
    const storedData=JSON.parse(storedValue)
    // Get the index of the object that we want to access
    
    for (index=0; index<storedData.length; index++){
        let ID=storedData[index].id
        priority= storedData[index.priority]
        // Access the item property of the object at the specified index
        const items = storedData[index].item;
  

    if (!items){return}  
    const newTodo=`
    <li id="${ID}" class='todo-item'>
    <span>${items}</span>
    <button onclick="completeTodo(${ID},'${items}')">Complete</button>
    <button onclick="deleteTodo(${ID})">Delete</button>
    <svg id=(${ID}) class='priotize' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>

   `
    //append the new node/append the new node
    
    todoList.insertAdjacentHTML('beforeend',newTodo)
    const image=document.querySelector('.priotize')
    console.log(image)
    image.addEventListener('click', function() {
   
        image.classList.toggle('color');
      })
    }  

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
    
    console.log(todoListArray)
    console.log(id)
    const todoString=JSON.stringify(todoListArray)
    localStorage.setItem('todoArray2', todoString)

    }
   


//change into object
function objects(id,item){
    console.log(item)
    console.log(id)
    const object={ID:id,ITEM:item} 
    console.log(document.getElementById(id))
}


function get() {
    var storedValue = localStorage.getItem('todoArray2');
    const storedData=JSON.parse(storedValue)
    if(storedData) {
        console.log(storedData[0].item)
    }
}

function init(){
    get()
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

function undoDelete() {
    var storedValue = localStorage.getItem('todoArray');
    if(storedValue) {
        todoList.innerHTML = storedValue;
    }
}


function clearData(){
    localStorage.clear();
}