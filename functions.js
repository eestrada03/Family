var usuario = '';
let tareasRealizadas;
function cargauser(user){
    //Función que se ejecuta al hacer click en el usuario.
    usuario = user.textContent.trim();
    console.log(usuario);
    userselec(usuario);
}

function userselec(usuario) {
    switch (usuario) {
        case 'Papá':
            console.log('Usuario seleccionado: ' + usuario)
            window.location.href = "portal.html?user=Papá";
            break;
        case 'Kike':
            console.log('Usuario seleccionado: ' + usuario)
            window.location.href = "portal.html?user=Kike";
            break;
        case 'Álvaro':
            console.log('Usuario seleccionado: ' + usuario)
            window.location.href = "portal.html?user=Álvaro";
            break;

        default:
            break;
    }
}

//Papelera

function showConfirmationDialog() {
    const dialog = document.getElementById('confirmationDialog');
    dialog.style.display = 'block';
  }
  
  function cancelDeletion() {
    const dialog = document.getElementById('confirmationDialog');
    dialog.style.display = 'none';
  }
  
  function confirmDeletion() {
    // Eliminar todas las tareas de Firebase y actualizar la pizarra
    const tasksRef = firebase.database().ref('tasks');
    tasksRef.remove();
  
    // Cerrar el diálogo de confirmación
    const dialog = document.getElementById('confirmationDialog');
    dialog.style.display = 'none';
  }

  
  //LogOut

  function logout() {
    // Redireccionar a la página de selección de usuarios
    window.location.href = "index.html";
  }

  // FIREBASE

  // Configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDO9DorELMkRYt0mwCrlaUEamyenU17axo",

    authDomain: "family-56779.firebaseapp.com",

    databaseURL: "https://family-56779-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "family-56779",

    storageBucket: "family-56779.appspot.com",

    messagingSenderId: "121915702066",

    appId: "1:121915702066:web:3a4d14f362bed6e502752b",

    measurementId: "G-RXCYDKB60Y" 
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Obtener referencia a la lista de tareas en Firebase
  const database = firebase.database();
  const tasksRef = database.ref('tasks');

  // Contador de tareas
  function contadorTareas() {
    tasksRef.once('value')
        .then(snapshot => {
            const tasks = snapshot.val();
            const usersCount = {};

            // Contar las tareas realizadas por cada usuario
            Object.values(tasks).forEach(task => {
                const userId = task.user;
                if (task.completed) {
                    if (!usersCount[userId]) {
                        usersCount[userId] = 1;
                    } else {
                        usersCount[userId]++;
                    }
                }
            });

            // Mostrar el número de tareas realizadas por cada usuario en la consola
            console.log('Tareas realizadas por cada usuario:', usersCount);
            tareasRealizadas = usersCount;
        
        })
        .catch(error => {
            console.error('Error al consultar las tareas:', error);
        });
}

  // Función para agregar una nueva tarea a Firebase
  function addTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const newTaskTitle = newTaskInput.value.trim();

    if (newTaskTitle !== '') {
        const newTask = {
            title: newTaskTitle,
            completed: false,
            user: WHOAMI,
        };

        tasksRef.push().set(newTask)
       
        .then(() => {
            console.log('Tarea agregada:', newTask);
        })
        .catch(error => {
            console.error('Error al agregar la tarea:', error);
        });

        newTaskInput.value = '';
        
    }
}

  //Función para borrar una tarea
  function deleteTask(taskId) {
    tasksRef.child(taskId).remove();
}

  // Función para actualizar la lista de tareas en la interfaz
  function updateTaskList(snapshot) {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';

      snapshot.forEach(childSnapshot => {
          const task = childSnapshot.val();
          const taskId = childSnapshot.key;

          const taskItem = document.createElement('li');
          taskItem.innerHTML = `
              <div>
                  <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="updateTaskStatus('${taskId}', this.checked)">
                  <label>${task.title}</label>
                  <span>[${task.user}]</span> <!-- Agrega el nombre de usuario -->
                  <button class="delete-task" onclick="deleteTask('${taskId}')">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          `;

          taskList.appendChild(taskItem);
      });
  }

  // Función para actualizar el estado de una tarea en Firebase
  function updateTaskStatus(taskId, completed) {
      tasksRef.child(taskId).update({ completed });
      contadorTareas();
  }

  // Suscribirse a los cambios en la lista de tareas en Firebase
  tasksRef.on('value', snapshot => {
      updateTaskList(snapshot);
  });

  function whiteboardtasks(tareasRealizadas) {
  console.log('AQUI!',tareasRealizadas);
  }
  