console.log('in js');

$(readyNow);

function readyNow() {
    console.log('JQ');
    //render tasks on DOM on page load
    getTasks();
    //establish click listeners
    setUpClickListeners();
} // end readyNow

function setUpClickListeners() {
    //on click of add button do addTaskHandler function
    $('#addButton').on('click', postTask);

    //on click of complete button do completeTask function
    $('#viewTasks').on('click', '.completeButton', completeTaskHandler);

    //on click of delete button do deleteTaskHandler function
    $('#viewTasks').on('click', '.deleteButton', deleteTaskHandler);
}//end setUpClickListeners

//post new task to server
function postTask() {
    console.log('add button clicked');

    //get user input and put in object
    let newTask = {
        task: $('#taskIn').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
        .then(function (response) {
            $('#taskIn').val(''),
                getTasks();
        });
}//end postTask

//get tasks from server 
function getTasks() {
    $('#viewTasks').empty();

    $.ajax({
        type: 'GET',
        url: '/tasks',
    })
        .then(function (response) {
            console.log('getting tasks from server', response);
            //append tasks to DOM
            for (let i = 0; i < response.length; i++) {
                $('#viewTasks').append(`
                    <tr>
                        <td id="${response[i].complete}">${response[i].task}</td>
                        <td>
                            <button type="button" class="completeButton" data-id="${response[i].id}">Complete</button>
                        </td>
                        <td>
                            <button class="deleteButton" data-id="${response[i].id}">Delete</button>
                        </td>
                    </tr>
                `);
            }

        });
}//end getTasks

function completeTaskHandler() {
    console.log('complete button clicked');
    completeTask($(this).data("id"));
}//end completeTaskHandler

function completeTask(taskId) {
    //update task to signify complete when button clicked

    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
    })
        .then(function (response) {
            getTasks();
        })
        .catch(function (error) {
            alert('error on put route client', error);
        })
}//end completeTask

function deleteTaskHandler() {
    console.log('delete button clicked');
    deleteTask($(this).data("id"));
}//end deleteTaskHandler

function deleteTask(taskId) {
    //delete task when delete button clicked
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
        .then(function (response) {
            //refresh task list
            getTasks();
        })
        .catch(function (error) {
            alert('error on deleting task', error);
        });
}//end deleteTask