console.log('in js');

$(readyNow);

function readyNow() {
    console.log('JQ');
    //establish click listeners
    setUpClickListeners();
} // end readyNow

function setUpClickListeners() {
    //on click of add button do addTaskHandler function
    $('#addButton').on('click' , postTask);

    //on click of complete button do completeTask function
    $('#viewTasks').on('click' , '.completeButton' , completeTaskHandler);

    //on click of delete button do deleteTaskHandler function
    $('#viewTasks').on('click' , '.deleteButton' , deleteTaskHandler);
}//end setUpClickListeners

//post new task to server
function postTask (){
    console.log('add button clicked');

    //get user input and put in object
    let newTask = {
        task: ('#task').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then( function (response) {
        $('#task').val(''),
        getTasks();
    });
}

//get tasks from server 
function getTasks
