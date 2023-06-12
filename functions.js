var usuario = '';

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
  

