/* Globals: */
let assignedTo = [];


/* HTML Templates: */
function templateProfilSelect(i) {
  return /*html*/`
    <div class="profil button-hover" onclick="addUserToTask(${i})">
      <img src="${users[i]['img']}" class="round-img">
      <span>${users[i]['name']}</span>
    </div>
  `;
}


function templateAssignTo(i) {
  return /*html*/ `
    <img src="${users[i]['img']}" onclick="removeUserFromTask(${i})" class="round-img">
  `;
}

function templateAssignToAdd() {
  return /*html*/ `
    <img src="img/icon plus.png" class="img-add-people button-hover" onclick="showProfilSelect()">
  `;
}

function templateProfilSelectAdd() {
  return /*html*/ `
    <div class="profil button-hover" onclick="addNewUser()">
      <img src="img/icon plus.png" class="img-add-people button-hover">
      <span>Add profile</span>
    </div>
  `;
}


/* Funktions: */
async function init() {
  await initBackend();
  includeHTML();
  renderAddTask();
}


function renderAddTask() {
  let assignedList = document.getElementById('task-User');
  let selectUserList = document.getElementById('select-User');
  assignedList.innerHTML = '';
  selectUserList.innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    if (assignedTo.includes(i)) assignedList.innerHTML += templateAssignTo(i);
    else {
      selectUserList.innerHTML += templateProfilSelect(i);
    }
  }
  assignedList.innerHTML += templateAssignToAdd();
}


function addUserToTask(userNum) {
  assignedTo.push(userNum);
  hideProfileSelect();
  renderAddTask();
}

function removeUserFromTask(userNum) {
  assignedTo.splice(assignedTo.findIndex(ele => ele == userNum),1);
  renderAddTask();
}


function showProfilSelect() {
  document.getElementById('section-select').classList.remove('hide');
}


function hideProfileSelect() {
  document.getElementById('section-select').classList.add('hide');
}


function resetAddTask() {
  assignedTo = [];
  document.getElementById('title-input').value = '';
  document.getElementById('date-input').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = 'Work';
  document.getElementById('urgency').value = 'Normal';
  renderAddTask();
}


function createTask() {
  let assigned = [];
  assignedTo.forEach((i) => {
    assigned.push(users[i]);
  });
  console.log(tasks);
  tasks.push({
    'id': tasks.length,
    'title': checkExistence(document.getElementById('title-input').value),
    'category': checkExistence(document.getElementById('category').value),
    'description': checkExistence(document.getElementById('description').value),
    'date': checkExistence(document.getElementById('date-input').value),
    'urgency': checkExistence(document.getElementById('urgency').value),
    'status': '',
    'assigned': assigned 
  });
  console.log(tasks);
  saveInBackend();
  console.log(tasks);
  resetAddTask(); 
}

function checkExistence(element) {
  if(!element) return '';
  return element;
}































