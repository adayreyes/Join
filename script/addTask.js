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
    <img src="${users[i]['img']}" class="round-img">
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
function init() {
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
  selectUserList.innerHTML += templateProfilSelectAdd();
}


function addUserToTask(userNum) {
  assignedTo.push(userNum);
  hideProfileSelect();
  renderAddTask();
}


function showProfilSelect() {
  document.getElementById('section-select').classList.remove('hide');
}


function hideProfileSelect() {
  document.getElementById('section-select').classList.add('hide');
}


function addNewUser() {
  // Add this function later #############################
  console.log('Add new User');
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
  tasks.push({
    'id': tasks.length,
    'title': document.getElementById('title-input').value,
    'category': document.getElementById('category').value,
    'description': document.getElementById('description').value,
    'date': document.getElementById('date-input').value,
    'urgency': document.getElementById('urgency').value,
    'status': '',
    'assigned': assigned
  });
  resetAddTask();
}
































