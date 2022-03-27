function start(){
    includeHTML();
    renderTasks();

}

function renderTasks(){
    let backlog = document.getElementById("backlog-list");
    backlog.innerHTML = "";
    addTaskContainer(backlog);
}

function addTaskContainer(backlog){
    for(let i = 0; i < tasks.length; i++){
        backlog.innerHTML += taskCardTemplate(i);
        addAssignedToSection(i);
    } 
}

function addAssignedToSection(i){
    for(let j = 0; j < tasks[i]["assigned"].length; j++){
        let container = document.getElementById(`assigned-to-container(${i})`);
        container.innerHTML += taskCardAssignedToTemplate(i,j);
    }
}

function taskCardTemplate(i){
    return `
    <div class="backlog-task ${tasks[i]["category"].toLowerCase()}">
    <div class="assigned-to" id="assigned-to-container(${i})">
    </div>
   <span class="category">${tasks[i]["category"].toUpperCase()}</span>
   <p class="details">${tasks[i]["description"]}</p>
</div>
    `
}


function taskCardAssignedToTemplate(i,j){
    return `
    <img src="${tasks[i]["assigned"][j]["img"]}" id="user(${j})" alt="">
    <div class="name-container">
        <p>${tasks[i]["assigned"][j]["name"]}</p>
        <a href="" type="email">${tasks[i]["assigned"][j]["email"]}</a>
    </div>
    `
    
}