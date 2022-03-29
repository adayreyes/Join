function start() {
  initBackend();
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
    <div onclick="openBacklogTask(${i})" class="backlog-task priority-${tasks[
    i
  ]["urgency"].toLowerCase()}">
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

function openBacklogTask(i) {
  showBigContainer();
  renderBigTask(i);
}

function renderBigTask(i) {
  let sub_container = document.getElementById("big-task-subcontainer");
  sub_container.innerHTML = "";
  newBigTaskSection(sub_container, i, "title");
  newBigTaskSection(sub_container, i, "category");
  newBigTaskSection(sub_container, i, "urgency");
  newBigTaskSection(sub_container, i, "description");
  newBigTaskSection(sub_container, i, "date");
  setAssignedSection(sub_container, "assigned");
  newAssignedSection(i);
}

function setAssignedSection(container, section) {
  container.innerHTML += `
  <div>
  <span class="font-title">ASSIGNED TO</span>
  <p id="big-task-assigned-people"></p>
</div>
  `;
}

function newAssignedSection(i) {
  let assigned_container = document.getElementById("big-task-assigned-people");
  tasks[i]["assigned"].forEach((person) => {
    assigned_container.innerHTML += `
    <div class="assigned-to">
    <img src="${person["img"]}" alt="">
    <div class="name-container">
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
