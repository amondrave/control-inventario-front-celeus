document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("header-container");
    const sidebarContainer = document.getElementById("sidebar-container");
   
    
    
  
    // Carga el contenido del encabezado
    function loadHeader() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "componentes/header.html", true);
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          headerContainer.innerHTML = xhr.responseText;
          const toggleButton = headerContainer.querySelector("#toggle-button");
          const username = headerContainer.querySelector("#username");
          const logout =  headerContainer.querySelector("#logout");
          loadSidebar(toggleButton);
          addProfileProperties(username.id);
          logoutApp(logout);
        }
      };
  
      xhr.send();
    }
  
    // Carga el contenido de la barra lateral
    function loadSidebar(toggleSidebar) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "componentes/sidebar.html", true);
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          sidebarContainer.innerHTML = xhr.responseText;
          addToggleFunctionality(toggleSidebar);
        }
      };
  
      xhr.send();
    }
  
    // Agrega la funcionalidad de alternar la visibilidad
    function addToggleFunctionality(toggleButton) {
        console.log(toggleButton)
  
      // Función para alternar la visibilidad de la barra lateral
      function toggleSidebar() {
        if (sidebarContainer.style.display === "none") {
          sidebarContainer.style.display = "block";
        } else {
          sidebarContainer.style.display = "none";
        }
      }
  
      // Asigna la función al evento click del botón
      toggleButton.addEventListener("click", toggleSidebar);
    }

    function addProfileProperties(element){
        let userDataString = localStorage.getItem('userData');
        console.log(element);
        // Comprobar si la variable existe en localStorage
        if (userDataString !== null) {
          // La variable existe, puedes utilizar su valor aquí
          // Obtener el valor almacenado en localStorage para la clave "userData"
          // Parsear el valor JSON a un objeto JavaScript
          let userData = JSON.parse(userDataString);
      
          // Acceder a las propiedades del objeto userData
      
          let usernameTogle = document.getElementById(element);
          console.log(usernameTogle);
          usernameTogle.textContent = userData.username;
        } else {
          // La variable no existe en localStorage
          console.log('La variable no existe en localStorage');
        }
    }

    function logoutApp(logout){
        logout.addEventListener('click', cleanLocalStorageAndRedirect);
    }

    function cleanLocalStorageAndRedirect() {
        // Eliminar todos los datos del localStorage
        localStorage.clear();
      
        // Redirigir a la página login.html
        window.location.href = 'index.html';
      }
  
    // Carga el contenido del encabezado y la barra lateral al cargar la página
    loadHeader();
  });
  