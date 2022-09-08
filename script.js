'use strict';


// function to check for valid input
function checkInput(inputID, errorID){
    let title = document.querySelector('#'+inputID).value.trim();
    if(title.length>0){
        displayMsg(errorID, ""); 
        return true;
    }
        displayMsg(errorID, "Field cannot be Empty"); 
        return false;
}

// function to display error message
function displayMsg(errorID, errorMsg){
    let message = document.querySelector("#"+errorID);
        message.innerHTML = errorMsg;
            setTimeout(()=>{
                message.innerHTML = '';
            },2000); 
    return true;
} 

// Event to save the new list
let addNewTodo = document.querySelector("#add");
addNewTodo.addEventListener('click',()=>{
    if(checkInput('title', 'error')==true){
        let title = document.querySelector('#title').value.trim();
        let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
            allTodoList.unshift(title);

        let strList = JSON.stringify(allTodoList);
        localStorage.setItem('allTodoList', strList);
        displayMsg('error', "Successfully Added");
        document.querySelector('#title').value = '';
        getAllList(); 
    }
});

// function to get all list
function getAllList(){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
    let allList = '';
    allTodoList.forEach((element, index) => {
        allList += `
        <div class="card mb-2">
           <div class="card-body">
                <form >
                    <input type="text" value="${element}" class='d-block border-remove title2 mb-1' readonly id='title${index}'/>
                    <div id='options${index}' class='options'>
                    <small id='error${index}' class='d-block text-danger'></small>
                        <input type="button" value="edit" id="edit${index}" class="btn btn-sm btn-info py-0" onclick="return editList(${index})" />
                        <input type="button" value="delete" class="btn btn-sm btn-danger py-0" onclick="return deleteList(${index})" />
                    </div>
                </form>
           </div>
        </div>
        `;
    });
    totalList();
    document.getElementById("listAll").innerHTML= allList;
}

// function to delete list items
function deleteList(id){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) ; 

    allTodoList.splice(id,1);

    let strList = JSON.stringify(allTodoList);
        localStorage.setItem('allTodoList', strList); 
    getAllList();

}

// function to make list editable
function editList(id){
    let saveStatus = document.querySelector(`#edit${id}`);
    if(saveStatus.value=='SAVE'){
        return saveList(id);
    }
        saveStatus.value = 'SAVE';
    let title = document.querySelector(`#title${id}`);
        title.removeAttribute('readonly');
        title.classList.toggle('border-remove');
    let options = document.querySelector(`#options${id}`);
        options.classList.toggle('d-block');
    
}

// function to save the edited list
function saveList(id){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList'));
    let title = document.querySelector(`#title${id}`).value;

        if(checkInput(`title${id}`, `error${id}`)==true){
            allTodoList[id]=title; 
            let strList = JSON.stringify(allTodoList);
            localStorage.setItem('allTodoList', strList);
            getAllList();
        }
}

// Return the total number of Todo
function totalList(){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
    return document.getElementById("totalList").innerHTML =  `<small>(${allTodoList.length})</small>`; 
}

getAllList();
totalList();