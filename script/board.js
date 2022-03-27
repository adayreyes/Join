function init() {

    renderTemplate();
}

function renderTemplate() {
    let taskboard = document.getElementById('task-board');
    taskboard.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        taskboard.innerHTML += `
    <div class="task">
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
    renderTasks(i);
    }

}

function renderTasks(i) {

        document.getElementById(`date-${i}`).innerHTML = tasks[i]['date'];
        document.getElementById(`title-${i}`).innerHTML = tasks[i]['title'];
        document.getElementById(`task-description-${i}`).innerHTML = tasks[i]['description'];
        document.getElementById(`task-category-${i}`).innerHTML = tasks[i]['category'];
        document.getElementById(`person-logo-${i}`).src = tasks[i]['assigned'][0]['img'];
} 