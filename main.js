// task list
let tasks = [];
let currentId = 1;

//show modal
function showModal() {
  $('#createTaskModal').modal('show');
}

// Create New Task Button
const createTaskButton = document.querySelector('.btn-success');
createTaskButton.addEventListener('click', showModal);

// Create NewTask
function addTask() {
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');

  const name = nameInput.value;
  const description = descriptionInput.value;

  if (!name.trim() || !description.trim()) {
    alert('Task dan Deskripsi harus diisi!');
    return;
  }

  const newTask = {
    id: currentId,
    name: name,
    description: description,
  };

  tasks.push(newTask);
  renderTaskTable();

  currentId++;
  nameInput.value = '';
  descriptionInput.value = '';

  $('#createTaskModal').modal('hide');
}

//Show data on Tables
function renderTaskTable() {
  const taskTableBody = $('#taskTableBody');
  taskTableBody.empty();

  tasks.forEach((task, index) => {
    const row = `
      <tr>
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>
          <button type="button" class="btn btn-primary btn-action">Edit</button>
          <button type="button" class="btn btn-danger btn-action"">Hapus</button>
        </td>
      </tr>
    `;

    taskTableBody.append(row);
  });
}

//Save Task
const saveTaskModalButton = document.getElementById('saveTaskModal');
saveTaskModalButton.addEventListener('click', addTask);

//ShowEditModal
function showEditModal(index) {
  const task = tasks[index];
  const nameInput = $('#nameModal');
  const descriptionInput = $('#descriptionModal');

  nameInput.val(task.name);
  descriptionInput.val(task.description);

  $('#editTaskModal').modal('show');

  $('#editTaskModal').data('index', index);
}

//Edit Button
$('#taskTableBody').on('click', '.btn-primary', function () {
  const index = $(this).closest('tr').index();
  showEditModal(index);
});

$('#saveChangesModal').click(function () {
  const index = $('#editTaskModal').data('index');
  saveChanges(index);
});

//Edit Task
function editTask(index) {
  const task = tasks[index];
  const nameInput = $('#nameModal');
  const descriptionInput = $('#descriptionModal');

  const newName = nameInput.val();
  const newDescription = descriptionInput.val();

  if (!newName.trim() || !newDescription.trim()) {
    alert('Task dan Deskripsi harus diisi!');
    return;
  }

  task.name = newName;
  task.description = newDescription;

  renderTaskTable();

  $('#editTaskModal').modal('hide');
}

//Save Changes After Edit
function saveChanges(index) {
  editTask(index);

  $('#editTaskModal').modal('hide');
}

//deleteModal
function showDeleteModal(index) {
  const task = tasks[index];
  const deleteTaskMessage = document.getElementById('deleteTaskMessage');
  deleteTaskMessage.textContent = `Are you sure you want to delete task ${task.name}?`;

  $('#deleteTaskModal').modal('show');

  $('#deleteTaskModal').data('index', index);
}

// Event listener for the "Delete" button inside the table
$('#taskTableBody').on('click', '.btn-danger', function () {
  const index = $(this).closest('tr').index();
  showDeleteModal(index);
});

// Event listener for the "Yes" button inside the delete modal
$('#deleteYes').click(function () {
  const index = $('#deleteTaskModal').data('index');
  deleteTask(index);
  $('#deleteTaskModal').modal('hide');
});

$('#deleteTaskModal').on('hidden.bs.modal', function () {
  $('#deleteTaskModal').removeData('index');
});

// Function to delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTaskTable();
}



