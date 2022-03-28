function start() {
  includeHTML();
  renderTasks();
}

function renderTasks() {
  let backlog = document.getElementById("backlog-list");
  backlog.innerHTML = "";
  addTaskContainer(backlog);
}

function addTaskContainer(backlog) {
  for (let i = 0; i < tasks.length; i++) {
    backlog.innerHTML += taskCardTemplate(i);
    /*  addAssignedToSection(i); */
    addNumberOfAssigned(i);
  }
}

function addNumberOfAssigned(i) {
  let count = 0;
  for (let j = 0; j < tasks[i]["assigned"].length; j++) {
    let container = document.getElementById(`assigned-quantity(${i})`);
    count++;
    if (count > 1) {
      container.innerHTML = "+ " + count;
    }
  }
}

/* function addAssignedToSection(i){
    for(let j = 0; j < tasks[i]["assigned"].length; j++){
        let container = document.getElementById(`assigned-to-container(${i})`);
        container.innerHTML += taskCardAssignedToTemplate(i,j);
    } 
    let count = 0;
    let container = document.getElementById(`assigned-to-container(${i})`);
    container.innerHTML += taskCardAssignedToTemplate(0);
} */

function taskCardTemplate(i) {
  return `
    <div onclick="showBacklogTask(${i})" class="backlog-task priority-${tasks[i]["urgency"].toLowerCase()}">
    <div class="assigned-to" id="assigned-to-container(${i})">
    <img src="${tasks[i]["assigned"][0]["img"]}" alt="">
    <div class="name-container">
        <p>${tasks[i]["assigned"][0]["name"]}</p>
        <a href="" type="email">${tasks[i]["assigned"][0]["email"]}</a>
        <span id="assigned-quantity(${i})"></span>
    </div>
    </div>
   <span class="category">${tasks[i]["category"].toUpperCase()}</span>
   <p class="details">${tasks[i]["description"]}</p>
</div>
`;
}

/* function taskCardAssignedToTemplate(i,j){
    return `
    <div class="name-container">
        <p>${tasks[i]["assigned"][0]["name"]}</p>
        <a href="" type="email">${tasks[i]["assigned"][0]["email"]}</a>
        <span id="assigned-quantity(${i})"></span>
    </div>
    ` 
} */

function showBacklogTask(i){
    let big_container = document.getElementById("big-task-container");
    big_container.classList.remove("d-none");
}