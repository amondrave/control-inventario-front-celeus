// variables generales

let actives = [];

let typeDocument = [];

function loadDocumentType() {
    if (typeDocument.length > 0) {
      // Si la lista ya existe, utilizarla para formar los options
      createOptions(typeDocument);
      return;
    }
    // Realizar la consulta al endpoint para obtener la lista
    // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
    fetch("http://localhost:8090/inventario/DocumentType/findAll")
      .then((response) => response.json())
      .then((data) => {
        // Almacenar la lista obtenida
        typeDocument = data;
  
        // Formar los options con la lista obtenida
        createOptions(typeDocument);
      })
      .catch((error) => {
        console.error("Error al obtener la lista:", error);
      });
  }

  // Función para formar los options en el select
function createOptions(list) {
    const select = document.getElementById("typeDocumentWorker");
  
    // Limpiar las opciones existentes en el select
    select.innerHTML = "";
  
    // Crear y agregar las nuevas opciones en base a la lista
    list.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.sigle;
      select.appendChild(option);
    });
  }


  document.getElementById('typeDocumentWorker').addEventListener('focus', loadDocumentType);

  function loadActives() {
    if (actives.length > 0) {
        // Si la lista ya existe, utilizarla para formar los options
        createActiveOptions(actives);
        return;
      }
      // Realizar la consulta al endpoint para obtener la lista
      // Puedes utilizar fetch u otra función para realizar la solicitud HTTP
      fetch("http://localhost:8090/inventario/active/findAll/WithoutAssignment")
        .then((response) => response.json())
        .then((data) => {
          // Almacenar la lista obtenida
          actives = data;
    
          // Formar los options con la lista obtenida
          createActiveOptions(actives);
        })
        .catch((error) => {
          console.error("Error al obtener la lista:", error);
        });
    
  }

  function createActiveOptions(list) {
    const select = document.getElementById("activeAssigment");
  
    // Limpiar las opciones existentes en el select
    select.innerHTML = "";
  
    // Crear y agregar las nuevas opciones en base a la lista
    list.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name + "-" + item.code; 
      // Agregar el atributo value y establecer su valor
      option.setAttribute("valueActive", item.value);
      select.appendChild(option);
    });
  }

  function changeValueActive() {
    const select = document.getElementById("activeAssigment");

    // Obtener el valor del atributo seleccionado
    const selectedOption = select.options[select.selectedIndex];
    const attributeValue = selectedOption.getAttribute("valueActive");

    let valueTotal = document.getElementById("totalValue");
    valueTotal.value = attributeValue;

  }

  document.getElementById('activeAssigment').addEventListener('focus', loadActives);
  document.getElementById('activeAssigment').addEventListener('change', changeValueActive);

  function handleKeyPress(event) {
    if (event.keyCode === 13) { // Verifica si se presionó la tecla Enter
      event.preventDefault(); // Evita el comportamiento por defecto del Enter en un formulario
        
      const identification = document.getElementById('workerDoc').value;
      const idDocumentType = document.getElementById('typeDocumentWorker').value;
      
      console.log(identification);
      console.log(idDocumentType);
      const endpoint = `http://localhost:8090/inventario/worker/find/${identification}/${idDocumentType}`;

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
          const myInput = document.getElementById("idWorker");
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

  document.getElementById("create-assigned").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const form = document.getElementById("create-assigned");
    const formData = new FormData(form);
    let userDataString = localStorage.getItem("userData");
    let userData = JSON.parse(userDataString);
    const loan = true;

    const headers = {
        "content-type": "application/json; charset=UTF-8"
    }


    const activeAssignmentDto = {
     workerDto:{
        id: formData.get("idWorker")
      },
      activeDto:{
        id: formData.get("activeAssigment")
      },
      location: formData.get("location"),
      totalValue: formData.get("totalValue"),
      requestDate: formData.get("requestDate"),
      loan: loan,
      userDto:{
        id: userData.id
      }
    };
  



    fetch("http://localhost:8090/inventario/ActiveAssignment/create", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(activeAssignmentDto)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Buen Trabajo!',
          text: 'El registro ha sido exitoso!',
          icon: 'success'
        }).then(() => {
          window.location.href = 'assigned.html'; // Redireccionar a 'principal.html'
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