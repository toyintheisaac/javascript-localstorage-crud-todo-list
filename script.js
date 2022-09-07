'use strict';

let addNewTodo = document.querySelector("#add");

function checkInput(inputID, errorID){
    let title = document.querySelector('#'+inputID).value.trim();
    if(title.length>0){
        displayMsg(errorID, ""); 
        return true;
    }
        displayMsg(errorID, "Field cannot be Empty"); 
        return false;
}
function clearInput(inputID){
    return document.querySelector('#'+inputID).value = '';
}
 function displayMsg(errorID, errorMsg){
    let message = document.querySelector("#"+errorID);
        message.innerHTML = errorMsg;
            setTimeout(()=>{
                message.innerHTML = '';
            },2000); 
    return true;
} 

addNewTodo.addEventListener('click',()=>{
    if(checkInput('title', 'error')==true){
        let title = document.querySelector('#title').value.trim();
        let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
            allTodoList.unshift(title);

        let strList = JSON.stringify(allTodoList);
        localStorage.setItem('allTodoList', strList);
        displayMsg('error', "Successfully Added");
        clearInput('title');
        getAllList(); 
    }
});

function getAllList(){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
    let allList = '';
    allTodoList.forEach((element, index) => {
        allList += `
        <div class="card mb-2">
           <div class="card-body">
                <form id="">
                    <input type="text" value="${element}" class='d-block title mb-1'  readonly id='title'/>
                    <small class='d-block text-danger' id="error${index}"></small>
                    <input type="button" value="edit" class="btn btn-sm btn-info py-0" />
                    <input type="button" value="delete" class="btn btn-sm btn-danger py-0" onclick="return deleteList(${index})" />
                </form>
           </div>
        </div>
        `;
    });
    totalList();
    document.getElementById("listAll").innerHTML= allList;
}

function deleteList(id){
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) ; 

    allTodoList.splice(id,1);

  let strList = JSON.stringify(allTodoList);
    localStorage.setItem('allTodoList', strList); 
    getAllList();

}

function editList(id){

}

function totalList(){ 
    let allTodoList = JSON.parse(localStorage.getItem('allTodoList')) || []; 
    return document.getElementById("totalList").innerHTML =  `<small>(${allTodoList.length})</small>`; 
}

getAllList();
totalList();