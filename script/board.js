let currentDraggedElement;

function render() {
    updateToDo();
    updateInProgress();
    updateTesting();
    updateDone();
    addPriority();
}

async function init() {
    await initBackend();
    render();
}

function updateToDo() {
    let todo = tasks.filter(t => t['status'] == 'to-do');
    document.getElementById('to-do').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('to-do').innerHTML += generateToDoHTML(element);
        //    addPriority(i, element);
    }
}

function updateInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('in-progress').innerHTML += generateToDoHTML(element);
        //   addPriority(i, element);
    }
}

function updateTesting() {
    let testing = tasks.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateToDoHTML(element);
        //   addPriority(i, element);
    }
}

function updateDone() {
    let done = tasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateToDoHTML(element);
        //  addPriority(i, element);
    }

}

function tempHTML(element) {
    if (element['assigned'].length == 0) return '';
    return `<img class="person-logo" id="person-logo-${element['id']}" src="${element['assigned'][0]['img']}" alt="">
  <div>+ ${element['assigned'].length - 1}  </div>`;
}

function generateToDoHTML(element) {
    return `<div class="task" draggable="true" onclick="showTask(${element['id']})" ondragstart="startDragging(${element['id']})" id="task-${element['id']}">
    <div class="task-sub-container">
        <div class="task-date"><span id="date-${element['id']}">${element['date']}</span></div>
        <div class="task-title"><span id="title-${element['id']}">${element['title']}</span></div>
         <div class="description-details"><span id="task-description-${element['id']}">${element['description']}</span></div>
        <div class="task-person">
        <div class="category"><span id="task-category-${element['id']}">${element['category']}</span></div>
        <div class="assigned-count">
        ${tempHTML(element)}
        </div>
        </div>
    </div>
</div>`
}

function showTask(i) {

    let taskdetails = document.getElementById('task-details');
    taskdetails.innerHTML = '';
    taskdetails.innerHTML += generateDetails(i);
    let renderperson = document.getElementById('person-container');
    renderperson.innerHTML = '';
    newAssignedSection(i);
    document.getElementById('task-details').classList.remove('d-none');
}


function findi(i) {
    return tasks.indexOf(tasks.filter((ele) => {
        if (ele['id'] === i) return true;
        return false;
    })[0]);
}


function generateDetails(i) {

    return /*html*/ `<div class="nav-container">

    <img class="nav-icons" onclick="closeDetails()" src="img/cross.png" alt="">
    <div>
      
       <!-- <img class="nav-icons" src="img/edit.png" alt=""> -->
        <img class="nav-icons" src="img/move.png" alt="" onclick="moveToBacklog(${findi(i)})">
        <img class="nav-icons" src="img/garbage.png" alt="" onclick="deleteBoardTask(${findi(i)}), render()">
    </div>
</div>
<div class="task-date-details">
    ${tasks[findi(i)]['date']}
</div>

<div class="task-title-category">

<div>
${tasks[findi(i)]['title']}
</div>
<div>
${tasks[findi(i)]['category']}
</div>
</div>

<div class="task-description">

<span>${tasks[findi(i)]['description']}</span>

</div>
<div class="person-container" id="person-container">
 
</div>`
}

function newAssignedSection(i) {
    let assigned_container = document.getElementById("person-container");
    tasks[findi(i)]["assigned"].forEach((person) => {
        assigned_container.innerHTML += `
      <div class="person-container">
      <img class="person-logo" src="${person["img"]}" alt="">
      <div class="name-container">
          <p>${person["name"]}</p>
          <a href="" type="email">${person["email"]}</a>
      </div>
      </div>
      `;
    });
}

function startDragging(id) {
    currentDraggedElement = id;
}

function closeDetails() {
    document.getElementById('task-details').classList.add('d-none')
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[findi(currentDraggedElement)]['status'] = status;
    render();
    saveInBackend();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function addPriority() {

    let mytask = tasks.filter(t => t['status'] != '');

    for (let i = 0; i < mytask.length; i++) {
        if (mytask[i]['urgency'] == 'low') {
            document.getElementById(`task-${mytask[i]['id']}`).classList.add('priority-low');
        }
        if (mytask[i]['urgency'] == 'normal') {
            document.getElementById(`task-${mytask[i]['id']}`).classList.add('priority-normal');
        }
        if (mytask[i]['urgency'] == 'high') {
            document.getElementById(`task-${mytask[i]['id']}`).classList.add('priority-high');
        }


    }

}
function moveToBacklog(i) {
    tasks[i]['status'] = "";
    closeDetails();
    saveInBackend();
    render();
}

function deleteBoardTask(i) {
    tasks.splice(tasks.indexOf(tasks.filter((ele) => {
      if(ele['id'] === i) return true;
      return false;
    })[0]),1);
    closeDetails();
    saveInBackend();
    render();
  }







