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
    fetch('http://localhost:8090/inventario/ActiveTypeStatus/findAll')
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
    const select = document.getElementById('activeTypeStatus');
  
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
  document.getElementById('activeTypeStatus').addEventListener('focus', loadOptions);


  function handleKeyPress(event) {
    if (event.keyCode === 13) { // Verifica si se presionó la tecla Enter
      event.preventDefault(); // Evita el comportamiento por defecto del Enter en un formulario
        
      const codeInput = document.getElementById('code').value;
      const code = codeInput.toUpperCase();
      console.log(code);
      const endpoint = `http://localhost:8090/inventario/active/find/code/${code}`;

      fetch(endpoint)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        })
        .then(data => {
          // Aquí puedes manipular la respuesta del servidor (data)
          // Guarda la respuesta en una variable para usarla de manera general en el archivo
          const myInput = document.getElementById("idActiveStatus");
          const respuesta = data;
          myInput.value = respuesta.id
          console.log(respuesta);
        })
        .catch(error => {
          // Si ocurre un error en la consulta o en la respuesta del servidor
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lo sentimos no fue posible encontrar el registro'
          })
        });
    }
  }


  document.getElementById("create-status").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const form = document.getElementById("create-status");
    const formData = new FormData(form);

    const headers = {
        "content-type": "application/json; charset=UTF-8"
    }


    const activeStatusDto = {
      activeDto:{
        id: formData.get("idActiveStatus")
      },
      activeTypeStatusDto:{
        id: formData.get("activeTypeStatus")
      },
      observation: formData.get("observation")
    };
  

    console.log(activeStatusDto);;

    fetch("http://localhost:8090/inventario/ActiveStatus/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(activeStatusDto)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Buen Trabajo!',
          text: 'El registro ha sido exitoso!',
          icon: 'success'
        }).then(() => {
          window.location.href = 'principal.html'; // Redireccionar a 'principal.html'
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Lo sentimos no fue posible realizar el registro'
        })
      });
});