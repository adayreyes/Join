let currentDraggedElement;

function init() {
    updateToDo();
    updateInProgress();
    updateTesting();
    updateDone();
    addPriority();
}

function updateToDo() {
    let todo = tasks.filter(t => t['status'] == 'to-do');

    document.getElementById('to-do').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('to-do').innerHTML += generateToDoHTML(i, element);
        //    addPriority(i, element);
    }
}

function updateInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('in-progress').innerHTML += generateToDoHTML(i, element);
        //   addPriority(i, element);
    }
}

function updateTesting() {
    let testing = tasks.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateToDoHTML(i, element);
        //   addPriority(i, element);
    }
}

function updateDone() {
    let done = tasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateToDoHTML(i, element);
        //  addPriority(i, element);
    }

}

function generateToDoHTML(i, element) {
    return `<div class="task" draggable="true" onclick="showTask(${element['id']})" ondragstart="startDragging(${element['id']})" id="task-${element['id']}">
    <div class="task-sub-container">
        <div class="task-date"><span id="date-${element['id']}">${element['date']}</span></div>
        <div class="task-title"><span id="title-${element['id']}">${element['title']}</span></div>
         <div class="description-details"><span id="task-description-${i}">${element['description']}</span></div>
        <div class="task-person">
        <div class="category"><span id="task-category-${element['id']}">${element['category']}</span></div>
        <div class="assigned-count">
        <img class="person-logo" id="person-logo-${element['id']}" src="${element['assigned'][0]['img']}" alt="">
        <div>+ ${element['assigned'].length - 1}  </div
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
    renderperson.innerHTML += renderPerson(i);
}

function generateDetails(i) {

    return `<div class="nav-container">

    <img class="nav-icons" src="img/cross.png" alt="">
    <div>
        <img class="nav-icons" src="img/edit.png" alt="">
        <img class="nav-icons" src="img/move.png" alt="">
        <img class="nav-icons" src="img/garbage.png" alt="">
    </div>
</div>
<div>
    ${tasks[i]['date']}
</div>
<div>
${tasks[i]['title']}
</div>
<div>
${tasks[i]['description']}
</div>
<div class="person-container" id="person-container">
 
</div>`
}

function renderPerson(i){

    for (let j = 0; j < tasks[i]['assigned'].length; j++) {
        const element = tasks[i]['assigned'][j];
        
        return ` <div>
        <img class="person-logo" id="person-${i}" src="img/profile.png" alt="">
        <div>
            category
        </div>
    </div>`

    }

}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    init();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function addPriority() {

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['urgency'] == 'low') {
            document.getElementById(`task-${i}`).classList.add('priority-low');
        }
        if (tasks[i]['urgency'] == 'normal') {
            document.getElementById(`task-${i}`).classList.add('priority-normal');
        }
        if (tasks[i]['urgency'] == 'high') {
            document.getElementById(`task-${i}`).classList.add('priority-high');
        }


    }

}
