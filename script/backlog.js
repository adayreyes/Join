async function start() {
  await initBackend();
  includeHTML();
  renderTasks();
}

function renderTasks() {
  if(checkStatus()){
    renderAllTasks();
  } else{
    renderBacklogEmpty()
  }

}

function renderBacklogEmpty(){
  let container = document.getElementById("backlog-list");
  container.innerHTML = `<h2 class="empty-backlog">Backlog is empty</h2>`
}

function renderAllTasks(){
  let backlog = document.getElementById("backlog-list");
  backlog.innerHTML = "";
  addTaskContainer(backlog);
}

function checkStatus(){
  let bool = false;
  tasks.forEach(elem =>{if(!elem["status"])bool = true});
  return bool
  
}

function addTaskContainer(backlog) {
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i]['status'] == ""){
      backlog.innerHTML += taskCardTemplate(i);

      if(tasks[i]['assigned'].length > 0){
        let assigned_container = document.getElementById(`assigned-to-container(${i})`);
        assigned_container.innerHTML += assignedToTemplate(i);
        addNumberOfAssigned(i);
      }
    }
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


function taskCardTemplate(i) {
  return `
    <div onclick="openBacklogTask(${i})" class="backlog-task priority-${tasks[i]["urgency"].toLowerCase()}">
    <div class="assigned-to" id="assigned-to-container(${i})">
    </div>
   <span class="category">${tasks[i]["category"].toUpperCase()}</span>
   <p class="details">${tasks[i]["description"]}</p>
</div>
`;
}

function assignedToTemplate(i){

  return `<img src="${tasks[i]["assigned"][0]["img"]}" alt="">
  <div class="name-container">
      <p>${tasks[i]["assigned"][0]["name"]}</p>
      <a href="" type="email">${tasks[i]["assigned"][0]["email"]}</a>
      <span id="assigned-quantity(${i})"></span>
  </div>`
}

function openBacklogTask(i) {
  showBigContainer();
  renderBigTask(i);
  setOnClick(i);
}

function setOnClick(i){
  let send_icon = document.getElementById("send-to-board");
  send_icon.setAttribute("onclick",`sendToBoard(${i})`);
  let delete_icon = document.getElementById("delete-icon");
  delete_icon.setAttribute("onclick",`deleteBacklogTask(${i})`)
}

function deleteBacklogTask(i){
  tasks.splice(i,1);
  saveInBackend();
  closeBigTask();
  renderTasks();

}

function sendToBoard(i){
  tasks[i]['status'] = "to-do";
  closeBigTask();
  saveInBackend();
  renderTasks();
}
function renderBigTask(i) {
  let tasks_container = document.getElementById("big-task-tasks-container");
  tasks_container.innerHTML = "";
  newBigTaskSection(tasks_container, i, "title");
  newBigTaskSection(tasks_container, i, "category");
  newBigTaskSection(tasks_container, i, "urgency");
  newBigTaskSection(tasks_container, i, "description");
  newBigTaskSection(tasks_container, i, "date");
  setAssignedSection(tasks_container, "assigned");
  newAssignedSection(i);
}

function setAssignedSection(container, section) {
  container.innerHTML += `
  <div>
  <span class="font-title">ASSIGNED TO</span>
  <div id="big-task-assigned-people" class="big-task-assigned-people"></div>
</div>
  `;
}

function newAssignedSection(i) {
  let assigned_container = document.getElementById("big-task-assigned-people");
  tasks[i]["assigned"].forEach((person) => {
    assigned_container.innerHTML += `
    <div class="assigned-to">
    <img src="${person["img"]}" alt="">
    <div class="big-task-name-container">
        <p>${person["name"]}</p>
        <a href="" type="email">${person["email"]}</a>
    </div>
    </div>
    `;
  });
}

function newBigTaskSection(container, i, section) {
  container.innerHTML += `
  <div>
    <span class="font-title">${section.toUpperCase()}</span>
    <p id="big-task-${section}">${tasks[i][section]}</p>
  </div>
  `;
}

function showBigContainer() {
  let big_container = document.getElementById("big-task-container");
  let backlog_list = document.getElementById("backlog-list");
  big_container.classList.remove("d-none");
  backlog_list.classList.add("d-none");
}

function closeBigTask() {
  let big_container = document.getElementById("big-task-container");
  let backlog_list = document.getElementById("backlog-list");
  big_container.classList.add("d-none");
  backlog_list.classList.remove("d-none");
}
