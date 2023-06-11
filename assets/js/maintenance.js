

// Variable para almacenar la lista
let optionsList = [];

// Función para realizar la consulta al endpoint y formar los options
function loadOptions() {
  // Verificar si la lista ya existe
  console.log(optionsList.length)
  if (optionsList.length > 0) {
    // Si la lista ya existe, utilizarla para formar los options
    createOptions(optionsList);
    return;
  }

  // Realizar la consulta al endpoint para obtener la lista
  // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
  fetch('http://localhost:8090/inventario/MaintenanceType/findAll')
    .then(response => response.json())
    .then(data => {
      // Almacenar la lista obtenida
      optionsList = data;

      // Formar los options con la lista obtenida
      createOptions(optionsList);
    })
    .catch(error => {
      console.error('Error al obtener la lista:', error);
    });
}

// Función para formar los options en el select
function createOptions(list) {
  const select = document.getElementById('maintenanceType');

  // Limpiar las opciones existentes en el select
  select.innerHTML = '';

  // Crear y agregar las nuevas opciones en base a la lista
  list.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.description;
    select.appendChild(option);
  });
}

// Evento onchange del select
document.getElementById('maintenanceType').addEventListener('focus', loadOptions);

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      // Verifica si se presionó la tecla Enter
      event.preventDefault(); // Evita el comportamiento por defecto del Enter en un formulario
  
      const codeInput = document.getElementById("codeActive").value;
      const code = codeInput.toUpperCase();
      console.log(code);
      const endpoint = `http://localhost:8090/inventario/active/find/code/${code}`;
  
      fetch(endpoint)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la respuesta del servidor");
          }
        })
        .then((data) => {
          // Aquí puedes manipular la respuesta del servidor (data)
          // Guarda la respuesta en una variable para usarla de manera general en el archivo
          const myInput = document.getElementById("activeId");
          const nameInput = document.getElementById("nameActive");
          const respuesta = data;
          myInput.value = respuesta.id;
          nameInput.value = respuesta.name;
          codeInput.value = respuesta.code;
          console.log(respuesta);
        })
        .catch((error) => {
          // Si ocurre un error en la consulta o en la respuesta del servidor
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos no fue posible encontrar el registro",
          });
        });
    }
  }


  document.getElementById("create-maintenance").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const form = document.getElementById("create-maintenance");
    const filesInput = document.getElementById("formFile");
    const formData = new FormData(form);
    const files = filesInput.files; // Obtener los archivos seleccionados
    let userDataString = localStorage.getItem("userData");
    let userData = JSON.parse(userDataString);
  
    let observations = [];

    let observationDto = {
        observationText: formData.get("observation")
      };

      observations.push(observationDto);

    const maintenanceDto = {
      activeDto: {
        id: formData.get("activeId")
      },
      maintenanceTypeDto: {
        id: formData.get("maintenanceType")
      },
      userDto: {
        id: userData.id,
      },
      listObservation: observations
    };
  

  
    const requestData = new FormData();
    requestData.append("body", JSON.stringify(maintenanceDto));
    // Agregar cada imagen al FormData individualmente
    for (let i = 0; i < files.length; i++) {
        requestData.append("images", files[i]);
    }
    console.log(requestData.get("body"));
    console.log(requestData.get("images"));
    fetch("http://localhost:8090/inventario/maintenance/create", {
        method: "POST",
        body: requestData,
      })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              title: 'Buen Trabajo!',
              text: 'El registro ha sido exitoso!',
              icon: 'success'
            }).then(() => {
              window.location.href = 'maintenance-table.html'; // Redireccionar a 'principal.html'
            });
          } else {
            throw new Error("Error en la solicitud"); // Lanza un error en caso de respuesta no exitosa
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lo sentimos no fue posible realizar el registro'
          });
        });
});