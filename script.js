/*
    ................. CRUD App    ...............       

    create a note                   #####finished
    dipaly list of task             #####finished
    delete a task                   #####finished
    edit(update) a task and save    #####finished
    delete selected tasks          #####finished

    search task                     #####finished
    using API for task list 
    data returnation//local storage #####finished

*/
let tasksStored=[];
tasksStored=JSON.parse(localStorage.getItem('tasks')) || [];

function updateTasks(){
    tasksStored.forEach((Element)=> {
        let newTaskName=Element.taskName;
        let newTaskDate=Element.taskDate;

        let newTaskItem=document.createElement("li");
        newTaskItem.innerHTML = `<span>${newTaskName}</span> 
        <span>${newTaskDate}</span> 
        <button id="edit-btn" onclick="editTaskFunction(event)">Edit</button>
        <button id="delete-btn" onclick="deleteTaskFunction(event)">X</button>
        <input type="checkbox" class="task-checkbox" />`;
        document.getElementById("task-list").append(newTaskItem);
        
    });
}

/**********************************   add local storage    ***********************************************/
function updateStorage(){
    let tasksArray=[];

    let tasks=document.getElementsByTagName("li");
    let tasksList=Array.from(tasks);
    
    tasksList.forEach((Element) => {
        let obj={};
        obj.taskName = Element.children[0].innerText;
        obj.taskDate = Element.children[1].innerText;
        tasksArray.push(obj);
    });

    localStorage.setItem("tasks",JSON.stringify(tasksArray));
    tasksStored=JSON.parse(localStorage.getItem('tasks'));
}



/**********************************   add task    ***********************************************/
function addTaskFunction(){
    let newTaskName=document.getElementById("task-name");
    let newTaskDate=document.getElementById("task-date");

    if(newTaskName.value.trim() === ""){
        alert("Enter Valid Task Name");
        return;
    }
    else if(newTaskDate.value === ""){
        alert("Enter Valid Date");
        return;
    }

    let newTaskItem=document.createElement("li");
    newTaskItem.innerHTML = `<span>${newTaskName.value}</span> 
    <span>${newTaskDate.value}</span> 
    <button id="edit-btn" onclick="editTaskFunction(event)">Edit</button>
    <button id="delete-btn" onclick="deleteTaskFunction(event)">X</button>
    <input type="checkbox" class="task-checkbox" />`;

    document.getElementById("task-list").append(newTaskItem);
    updateStorage();

    // newTaskName.value="";
    // newTaskDate.value="";
   
}


/**********************************   delete task    ***********************************************/
function deleteTaskFunction(event){
    let parentNodeOfItem = event.target.parentNode;
    console.log(parentNodeOfItem);

    if(parentNodeOfItem){
        parentNodeOfItem.remove();
    }
    updateStorage();

}

/**********************************   edit task    ***********************************************/
function editTaskFunction(event){
    let currItem = event.target.parentNode;

    let currTaskName=currItem.children[0];
    let currTaskDate=currItem.children[1];

    currItem.innerHTML=`
    <span>${currItem.children[0].innerText}</span>            
    <span>${currItem.children[1].innerText}</span> 
    <input id="curr-item-TaskName" type="text" placeholder="${currTaskName.innerText}" />
    <input id="curr-item-TaskDate" type="date" placeholder="${currTaskDate.innerText}" />
    <button id="edit-btn" onclick="saveTaskFunction(event)">Save</button>
    <button id="delete-btn" onclick="deleteTaskFunction(event)">X</button>
    <input type="checkbox" class="task-checkbox" />`;  
    
    currItem.children[0].style.display = "none";
    currItem.children[1].style.display = "none"; 
    updateStorage();

}

/**********************************   save task    ***********************************************/
function saveTaskFunction(event){
    let currItem=event.target.parentNode;
    
    let currTaskName=currItem.children[0];
    let currTaskDate=currItem.children[1];

    let editedTaskName=currItem.children[2];
    let editedTaskDate=currItem.children[3];
    
    currTaskName.innerText = editedTaskName.value;
    currTaskDate.innerText = editedTaskDate.value;
    
    if(currTaskName.innerText==""){
        alert("Enter Valid Task Name");
        return;
    }
    else if(currTaskDate.innerText==""){
        alert("Enter Valid Date");
        return;
    }

    editedTaskName.remove();
    editedTaskDate.remove();

    currTaskName.style.display='inline';
    currTaskDate.style.display='inline';
 
    currItem.children[2].setAttribute("onclick","editTaskFunction(event)");  // bcoz edited child[2],[3] are removed ..so save button occupied child[2]
    currItem.children[2].innerText="Edit";

    updateStorage();

}

/**********************************   search task    ***********************************************/

function searchTask(event){
    // let searchInput=event.target.parentNode;
    let searchInput=document.getElementById("search-task").value.trim();
    document.getElementById("search-list-container").classList.add("hidden-serach-list");
    

    document.getElementById("search-list").innerHTML="";
    
    if(searchInput==""){
        return;
    }

    document.getElementById("search-list-container").classList.remove("hidden-serach-list");
    let resultTask=tasksStored.filter((task) => task.taskName.toLowerCase().includes(searchInput) );
    console.log(">>>>>>>>>",resultTask);
   
    if(resultTask.length===0){
        let newTaskItem=document.createElement("li");
        newTaskItem.innerHTML = ` <span>No Items Found</span> `;
        document.getElementById("search-list").append(newTaskItem);
    }
   
    resultTask.forEach((Element)=> {
        
        let newTaskName=Element.taskName;
        let newTaskDate=Element.taskDate;

        let newTaskItem=document.createElement("li");
        newTaskItem.innerHTML = `<span>${newTaskName}</span> 
        <span>${newTaskDate}</span> `;
        // <button id="edit-btn" onclick="editTaskFunction(event)">Edit</button>
        // <button id="delete-btn" onclick="deleteTaskFunction(event)">X</button>`;
        
        document.getElementById("search-list").append(newTaskItem);
        
    });
}

/**********************************   multiple task delete    ***********************************************/

/*************** select all tasks  *******************/
function selectAllTasks(){
    let selectAllCheckbox=document.getElementById("select-all-checkbox");
    let selectedTasks=document.querySelectorAll(".task-checkbox");
    
    selectedTasks.forEach(Element =>{
        if(selectAllCheckbox.checked){
            Element.checked=true;
        }
        else{
            Element.checked=false;
        }
    });
}

/*************** delete selected tasks  *******************/
function deleteSelectedTasks(event){
    let selectedTasks=document.querySelectorAll(".task-checkbox");

    selectedTasks.forEach(Element=>{
        if(Element.checked){
            Element.parentNode.remove();
        }
    });
}





