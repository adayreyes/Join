let currentDraggedElement;

function init(){
    updateToDo();
    updateInProgress();
    updateTesting();
    updateDone();
}

function updateToDo(){
    let todo = tasks.filter(t => t['status'] == 'to-do');

    document.getElementById('to-do').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('to-do').innerHTML += generateToDoHTML(i, element);
        renderTasks(i);
    }
}

function updateInProgress(){
    let inprogress = tasks.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('in-progress').innerHTML += generateToDoHTML(i, element);
        renderTasks(i);
    }
}

function updateTesting(){
    let testing = tasks.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateToDoHTML(i, element);
        renderTasks(i);
    }
}

function updateDone(){
    let done = tasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateToDoHTML(i, element);
        renderTasks(i);
    }
}


function generateToDoHTML(i, element) {
    return `<div class="task" draggable="true" ondragstart="startDragging(${element['id']})">
    <div class="task-sub-container">
        <div class="task-date"><span id="date-${i}">24.03.2022</span></div>
        <div class="task-title"><span id="title-${i}">Prepare presentation</span></div>
         <div class="description-details"><span id="task-description-${i}">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Officiis, officia. .</span></div>
        <div class="task-person">
        <div class="category"><span id="task-category-${i}">Marketing</span></div>
        <img class="person-logo" id="person-logo-${i}" src="img/profile.png" alt="">
        </div>
    </div>
</div>`;
}

function startDragging(id){
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
  }

function moveTo(status){
    tasks[currentDraggedElement]['status'] = status;
    init();
}

function renderTasks(i) {

    document.getElementById(`date-${i}`).innerHTML = tasks[i]['date'];
    document.getElementById(`title-${i}`).innerHTML = tasks[i]['title'];
    document.getElementById(`task-description-${i}`).innerHTML = tasks[i]['description'];
    document.getElementById(`task-category-${i}`).innerHTML = tasks[i]['category'];
    document.getElementById(`person-logo-${i}`).src = tasks[i]['assigned'][0]['img'];
} 

function highlight(id){
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-highlight');
}